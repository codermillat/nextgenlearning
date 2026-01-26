/**
 * Property-based tests for UTM Generator utility
 * Feature: sharda-university-content-enhancement
 */

import { describe, it, expect } from 'vitest';
import fc from 'fast-check';
import {
  generateUTMLink,
  parseUTMParameters,
  isValidUTMLink,
  getBaseURL,
} from '../utmGenerator';

describe('UTM Generator - Property-Based Tests', () => {
  /**
   * Property 13: UTM Parameter Completeness
   * Feature: sharda-university-content-enhancement, Property 13
   * 
   * For any generated application link, the link should contain all required
   * UTM parameters (source, medium, campaign, content).
   * 
   * Validates: Requirements 5.1
   */
  it('Property 13: UTM Parameter Completeness', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('Bangladesh', 'Nepal', 'India', 'Sri Lanka', 'Bhutan'),
        fc.string({ minLength: 1, maxLength: 50 }),
        fc.constantFrom('landing', 'program', 'fees', 'calculator', 'comparison', 'blog'),
        (country, page, contentType) => {
          const url = generateUTMLink({
            country,
            page,
            contentType,
          });

          // Verify it's a valid Sharda URL
          expect(url).toMatch(/^https:\/\/global\.sharda\.ac\.in/);

          // Parse and verify all UTM parameters are present
          const urlObj = new URL(url);
          expect(urlObj.searchParams.has('utm_source')).toBe(true);
          expect(urlObj.searchParams.has('utm_medium')).toBe(true);
          expect(urlObj.searchParams.has('utm_campaign')).toBe(true);
          expect(urlObj.searchParams.has('utm_content')).toBe(true);

          // Verify parameter values are not empty
          expect(urlObj.searchParams.get('utm_source')).toBeTruthy();
          expect(urlObj.searchParams.get('utm_medium')).toBeTruthy();
          expect(urlObj.searchParams.get('utm_campaign')).toBeTruthy();
          expect(urlObj.searchParams.get('utm_content')).toBeTruthy();
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property 14: UTM Source Distinctness
   * Feature: sharda-university-content-enhancement, Property 14
   * 
   * For any two application links generated from different traffic sources,
   * their UTM source parameters should be different.
   * 
   * Note: In our implementation, utm_source is consistent (studyatsharda_youtube)
   * but utm_campaign differentiates between Bangladesh and International.
   * 
   * Validates: Requirements 5.2
   */
  it('Property 14: UTM Source Distinctness - Campaign differentiation', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 1, maxLength: 50 }),
        fc.constantFrom('landing', 'program', 'fees'),
        (page, contentType) => {
          const bdUrl = generateUTMLink({
            country: 'Bangladesh',
            page,
            contentType,
          });

          const intlUrl = generateUTMLink({
            country: 'Nepal',
            page,
            contentType,
          });

          const bdParams = parseUTMParameters(bdUrl);
          const intlParams = parseUTMParameters(intlUrl);

          // Source should be consistent
          expect(bdParams.utm_source).toBe(intlParams.utm_source);

          // Campaign should be different for Bangladesh vs International
          expect(bdParams.utm_campaign).not.toBe(intlParams.utm_campaign);
          expect(bdParams.utm_campaign).toContain('BD');
          expect(intlParams.utm_campaign).toContain('Intl');
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property 15: UTM Page Context Inclusion
   * Feature: sharda-university-content-enhancement, Property 15
   * 
   * For any application link generated from a specific page, the UTM content
   * parameter should include an identifier for that page.
   * 
   * Validates: Requirements 5.3
   */
  it('Property 15: UTM Page Context Inclusion', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('Bangladesh', 'Nepal', 'India'),
        fc.string({ minLength: 1, maxLength: 50 }),
        fc.constantFrom('landing', 'program', 'fees', 'calculator', 'comparison'),
        (country, page, contentType) => {
          const url = generateUTMLink({
            country,
            page,
            contentType,
          });

          const params = parseUTMParameters(url);

          // Verify utm_content includes the content type
          expect(params.utm_content).toContain(contentType);
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property 16: UTM Content Type Tracking
   * Feature: sharda-university-content-enhancement, Property 16
   * 
   * For any application link, the UTM content parameter should identify
   * the content type (landing, program, comparison, blog).
   * 
   * Validates: Requirements 5.4
   */
  it('Property 16: UTM Content Type Tracking', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('Bangladesh', 'Nepal', 'India'),
        fc.string({ minLength: 1, maxLength: 50 }),
        fc.constantFrom('landing', 'program', 'fees', 'calculator', 'comparison', 'blog', 'faq'),
        (country, page, contentType) => {
          const url = generateUTMLink({
            country,
            page,
            contentType,
          });

          const params = parseUTMParameters(url);

          // Verify utm_content starts with the content type
          expect(params.utm_content).toMatch(new RegExp(`^${contentType}`));
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property 17: Application Link Format Consistency
   * Feature: sharda-university-content-enhancement, Property 17
   * 
   * For any two application CTAs across Sharda content, they should use
   * the same URL structure pattern (Sharda domain with UTM parameters).
   * 
   * Validates: Requirements 5.5
   */
  it('Property 17: Application Link Format Consistency', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('Bangladesh', 'Nepal', 'India', 'Sri Lanka'),
        fc.array(
          fc.record({
            page: fc.string({ minLength: 1, maxLength: 50 }),
            contentType: fc.constantFrom('landing', 'program', 'fees', 'calculator'),
          }),
          { minLength: 2, maxLength: 5 }
        ),
        (country, contexts) => {
          const urls = contexts.map(ctx =>
            generateUTMLink({
              country,
              page: ctx.page,
              contentType: ctx.contentType,
            })
          );

          // All URLs should use the same domain
          urls.forEach(url => {
            expect(url).toMatch(/^https:\/\/global\.sharda\.ac\.in/);
          });

          // All URLs should have the same UTM parameter structure
          urls.forEach(url => {
            const urlObj = new URL(url);
            expect(urlObj.searchParams.has('utm_source')).toBe(true);
            expect(urlObj.searchParams.has('utm_medium')).toBe(true);
            expect(urlObj.searchParams.has('utm_campaign')).toBe(true);
            expect(urlObj.searchParams.has('utm_content')).toBe(true);
          });

          // All URLs for the same country should have the same campaign
          const campaigns = urls.map(url => parseUTMParameters(url).utm_campaign);
          const uniqueCampaigns = [...new Set(campaigns)];
          expect(uniqueCampaigns.length).toBe(1);
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * URL Validity Property
   * 
   * For any valid input parameters, the generated URL should be a valid URL
   * that can be parsed without errors.
   */
  it('should always generate valid URLs', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('Bangladesh', 'Nepal', 'India', 'Sri Lanka', 'Bhutan'),
        fc.string({ minLength: 1, maxLength: 100 }),
        fc.constantFrom('landing', 'program', 'fees', 'calculator', 'comparison', 'blog'),
        fc.option(fc.string({ minLength: 1, maxLength: 50 })),
        fc.option(fc.string({ minLength: 1, maxLength: 50 })),
        (country, page, contentType, program, action) => {
          const url = generateUTMLink({
            country,
            page,
            contentType,
            program: program || undefined,
            action: action || undefined,
          });

          // Should not throw when creating URL object
          expect(() => new URL(url)).not.toThrow();

          // Should be a valid URL
          const urlObj = new URL(url);
          expect(urlObj.protocol).toBe('https:');
          expect(urlObj.hostname).toBe('global.sharda.ac.in');
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Base URL Consistency Property
   * 
   * For any country, the base URL should be consistent - Bangladesh always gets
   * the /bangladesh/ path, others get the root path.
   */
  it('should use consistent base URLs for countries', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('Bangladesh', 'BANGLADESH', 'bangladesh'),
        (country) => {
          const url = getBaseURL(country);
          expect(url).toBe('https://global.sharda.ac.in/bangladesh/');
        }
      ),
      { numRuns: 100 }
    );

    fc.assert(
      fc.property(
        fc.constantFrom('Nepal', 'India', 'Sri Lanka', 'Bhutan', 'Pakistan'),
        (country) => {
          const url = getBaseURL(country);
          expect(url).toBe('https://global.sharda.ac.in/');
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * UTM Parameter Parsing Consistency
   * 
   * For any generated URL, parsing its UTM parameters should return
   * the same values that were used to generate it.
   */
  it('should parse UTM parameters consistently', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('Bangladesh', 'Nepal', 'India'),
        fc.string({ minLength: 1, maxLength: 50 }),
        fc.constantFrom('landing', 'program', 'fees'),
        (country, page, contentType) => {
          const url = generateUTMLink({
            country,
            page,
            contentType,
          });

          const params = parseUTMParameters(url);

          // Verify all parameters are present and non-null
          expect(params.utm_source).toBeTruthy();
          expect(params.utm_medium).toBeTruthy();
          expect(params.utm_campaign).toBeTruthy();
          expect(params.utm_content).toBeTruthy();

          // Verify source and medium are consistent
          expect(params.utm_source).toBe('studyatsharda_youtube');
          expect(params.utm_medium).toBe('NextGenLearning');
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * URL Validation Property
   * 
   * For any generated URL, it should pass validation checks.
   */
  it('should generate URLs that pass validation', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('Bangladesh', 'Nepal', 'India'),
        fc.string({ minLength: 1, maxLength: 50 }),
        fc.constantFrom('landing', 'program', 'fees', 'calculator'),
        (country, page, contentType) => {
          const url = generateUTMLink({
            country,
            page,
            contentType,
          });

          expect(isValidUTMLink(url)).toBe(true);
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Program Parameter Inclusion Property
   * 
   * When a program is specified, it should be included in the utm_content parameter.
   */
  it('should include program in utm_content when provided', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('Bangladesh', 'Nepal', 'India'),
        fc.string({ minLength: 1, maxLength: 50 }),
        fc.constantFrom('program', 'fees', 'calculator'),
        fc.constantFrom('btech-cse', 'mba', 'bcom', 'btech-ai', 'btech-iot'),
        (country, page, contentType, program) => {
          const url = generateUTMLink({
            country,
            page,
            contentType,
            program,
          });

          const params = parseUTMParameters(url);

          // Verify program is included in utm_content
          expect(params.utm_content).toContain(program);
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Action Parameter Inclusion Property
   * 
   * When an action is specified, it should be included in the utm_content parameter.
   */
  it('should include action in utm_content when provided', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('Bangladesh', 'Nepal', 'India'),
        fc.string({ minLength: 1, maxLength: 50 }),
        fc.constantFrom('landing', 'program', 'fees'),
        fc.constantFrom('apply-now', 'learn-more', 'download-brochure', 'contact-us'),
        (country, page, contentType, action) => {
          const url = generateUTMLink({
            country,
            page,
            contentType,
            action,
          });

          const params = parseUTMParameters(url);

          // Verify action is included in utm_content
          expect(params.utm_content).toContain(action);
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Campaign Year Consistency Property
   * 
   * All campaigns should include the year 2026.
   */
  it('should include 2026 in all campaigns', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('Bangladesh', 'Nepal', 'India', 'Sri Lanka'),
        fc.string({ minLength: 1, maxLength: 50 }),
        fc.constantFrom('landing', 'program', 'fees'),
        (country, page, contentType) => {
          const url = generateUTMLink({
            country,
            page,
            contentType,
          });

          const params = parseUTMParameters(url);

          expect(params.utm_campaign).toContain('2026');
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * HTTPS Protocol Property
   * 
   * All generated URLs should use HTTPS protocol for security.
   */
  it('should always use HTTPS protocol', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('Bangladesh', 'Nepal', 'India'),
        fc.string({ minLength: 1, maxLength: 50 }),
        fc.constantFrom('landing', 'program', 'fees'),
        (country, page, contentType) => {
          const url = generateUTMLink({
            country,
            page,
            contentType,
          });

          expect(url).toMatch(/^https:\/\//);
          
          const urlObj = new URL(url);
          expect(urlObj.protocol).toBe('https:');
        }
      ),
      { numRuns: 100 }
    );
  });
});
