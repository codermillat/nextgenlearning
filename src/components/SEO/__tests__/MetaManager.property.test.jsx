import { describe, it, expect } from 'vitest';
import fc from 'fast-check';
import { generateDescription, generateTitle } from '../MetaManager';

// Feature: seo-overhaul, Property 1: Meta Description Completeness and Length Constraint
describe('Property 1: Meta Description Completeness and Length Constraint', () => {
  it('should include all available elements and respect length constraint', () => {
    fc.assert(
      fc.property(
        fc.record({
          emoji: fc.option(fc.string({ minLength: 1, maxLength: 2 })),
          benefit: fc.string({ minLength: 10, maxLength: 30 }),
          socialProof: fc.option(fc.string({ minLength: 10, maxLength: 25 })),
          price: fc.option(fc.string({ minLength: 5, maxLength: 15 })),
          urgency: fc.option(fc.string({ minLength: 10, maxLength: 20 })),
          cta: fc.string({ minLength: 5, maxLength: 15 }),
        }),
        (pageData) => {
          const description = generateDescription(pageData);
          
          // Check all available elements are included
          if (pageData.emoji) {
            expect(description).toContain(pageData.emoji);
          }
          
          expect(description).toContain(pageData.benefit);
          expect(description).toContain(pageData.cta);
          
          if (pageData.socialProof) {
            expect(description).toContain(pageData.socialProof);
          }
          
          if (pageData.price) {
            expect(description).toContain(pageData.price);
          }
          
          if (pageData.urgency) {
            expect(description).toContain(pageData.urgency);
          }
          
          // Check length constraint
          expect(description.length).toBeGreaterThanOrEqual(0);
          expect(description.length).toBeLessThanOrEqual(160);
        }
      ),
      { numRuns: 100 }
    );
  });
  
  it('should handle missing optional elements gracefully', () => {
    fc.assert(
      fc.property(
        fc.record({
          benefit: fc.string({ minLength: 10, maxLength: 30 }),
          cta: fc.string({ minLength: 5, maxLength: 15 }),
        }),
        (pageData) => {
          const description = generateDescription(pageData);
          
          // Should still generate a valid description with just required fields
          expect(description).toContain(pageData.benefit);
          expect(description).toContain(pageData.cta);
          expect(description.length).toBeGreaterThanOrEqual(0);
          expect(description.length).toBeLessThanOrEqual(160);
        }
      ),
      { numRuns: 100 }
    );
  });
  
  it('should never exceed 160 characters even with very long inputs', () => {
    fc.assert(
      fc.property(
        fc.record({
          emoji: fc.string({ minLength: 1, maxLength: 5 }),
          benefit: fc.string({ minLength: 50, maxLength: 100 }),
          socialProof: fc.string({ minLength: 30, maxLength: 50 }),
          price: fc.string({ minLength: 20, maxLength: 40 }),
          urgency: fc.string({ minLength: 30, maxLength: 50 }),
          cta: fc.string({ minLength: 20, maxLength: 40 }),
        }),
        (pageData) => {
          const description = generateDescription(pageData);
          
          // Even with very long inputs, should never exceed 160 chars
          expect(description.length).toBeLessThanOrEqual(160);
        }
      ),
      { numRuns: 100 }
    );
  });
});

// Feature: seo-overhaul, Property 6: Title Tag Completeness and Length Constraint
describe('Property 6: Title Tag Completeness and Length Constraint', () => {
  it('should include year 2026 and respect 60 character limit', () => {
    fc.assert(
      fc.property(
        fc.record({
          baseTitle: fc.string({ minLength: 10, maxLength: 40 }),
          urgency: fc.option(fc.string({ minLength: 5, maxLength: 15 })),
          brandName: fc.constant('NextGen Learning'),
        }),
        (titleData) => {
          const title = generateTitle(titleData);
          const currentYear = new Date().getFullYear();
          
          // Should include the current year
          expect(title).toContain(currentYear.toString());
          
          // Should not exceed 60 characters
          expect(title.length).toBeLessThanOrEqual(60);
          
          // Should be non-empty
          expect(title.length).toBeGreaterThan(0);
        }
      ),
      { numRuns: 100 }
    );
  });
  
  it('should include urgency when space permits', () => {
    fc.assert(
      fc.property(
        fc.record({
          baseTitle: fc.string({ minLength: 5, maxLength: 15 }),
          urgency: fc.string({ minLength: 3, maxLength: 8 }),
          brandName: fc.constant('NextGen Learning'),
        }),
        (titleData) => {
          const title = generateTitle(titleData);
          
          // With short base title and urgency, urgency should be included if space permits
          // We check if urgency is in title OR if title is at/near 60 char limit
          const hasUrgency = title.includes(titleData.urgency);
          const isNearLimit = title.length >= 50;
          
          // Either urgency is included, or we're near the character limit
          expect(hasUrgency || isNearLimit).toBe(true);
          
          // Should not exceed 60 characters
          expect(title.length).toBeLessThanOrEqual(60);
        }
      ),
      { numRuns: 100 }
    );
  });
  
  it('should include brand name when space permits', () => {
    fc.assert(
      fc.property(
        fc.record({
          baseTitle: fc.string({ minLength: 5, maxLength: 15 }),
          brandName: fc.constant('NextGen Learning'),
        }),
        (titleData) => {
          const title = generateTitle(titleData);
          
          // With short base title, brand name should be included if space permits
          const hasBrand = title.includes(titleData.brandName);
          const isNearLimit = title.length >= 50;
          
          // Either brand is included, or we're near the character limit
          expect(hasBrand || isNearLimit).toBe(true);
          
          // Should not exceed 60 characters
          expect(title.length).toBeLessThanOrEqual(60);
        }
      ),
      { numRuns: 100 }
    );
  });
  
  it('should never exceed 60 characters even with very long inputs', () => {
    fc.assert(
      fc.property(
        fc.record({
          baseTitle: fc.string({ minLength: 50, maxLength: 100 }),
          urgency: fc.string({ minLength: 20, maxLength: 40 }),
          brandName: fc.string({ minLength: 20, maxLength: 40 }),
        }),
        (titleData) => {
          const title = generateTitle(titleData);
          
          // Even with very long inputs, should never exceed 60 chars
          expect(title.length).toBeLessThanOrEqual(60);
        }
      ),
      { numRuns: 100 }
    );
  });
  
  it('should handle missing baseTitle gracefully', () => {
    fc.assert(
      fc.property(
        fc.record({
          brandName: fc.constant('NextGen Learning'),
        }),
        (titleData) => {
          const title = generateTitle(titleData);
          
          // Should return brand name when no base title
          expect(title).toBe(titleData.brandName);
        }
      ),
      { numRuns: 100 }
    );
  });
});
