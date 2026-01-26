/**
 * Comprehensive Property-Based Tests for SEO Components
 * Feature: sharda-university-content-enhancement
 * 
 * This file contains property tests for:
 * - Property 2: Structured Data Validity
 * - Property 4: Heading Hierarchy Compliance
 * 
 * These tests validate SEO correctness properties across all inputs.
 */

import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { describe, it, expect, afterEach } from 'vitest';
import fc from 'fast-check';
import SEOMetaTags from '../SEOMetaTags';
import {
  validateSchema,
  generateCourseSchema,
  generateOrganizationSchema,
  generateFAQSchema,
  generateReviewSchema,
  generateBreadcrumbSchema,
  generateArticleSchema,
  generateHowToSchema,
  generateWebsiteSchema,
  generateItemListSchema,
  generateLocalBusinessSchema,
  generateSiteOrganizationSchema
} from '../StructuredData.jsx';

describe('SEO Components - Comprehensive Property Tests', () => {
  afterEach(() => {
    cleanup();
    
    // Clean up meta tags
    document.querySelectorAll('meta').forEach(meta => {
      const name = meta.getAttribute('name') || meta.getAttribute('property');
      if (name && (
        name.startsWith('og:') || 
        name.startsWith('twitter:') ||
        ['title', 'description', 'keywords', 'robots', 'author'].includes(name)
      )) {
        meta.remove();
      }
    });
    
    // Clean up canonical links
    document.querySelectorAll('link[rel="canonical"]').forEach(link => link.remove());
    
    // Clean up structured data scripts
    document.querySelectorAll('script[type="application/ld+json"]').forEach(script => script.remove());
    
    // Reset document title
    document.title = '';
  });

  /**
   * Property 2: Structured Data Validity
   * Feature: sharda-university-content-enhancement, Property 2
   * **Validates: Requirements 1.5, 12.6, 12.7**
   * 
   * For any page with structured data markup, the JSON-LD should be valid according to 
   * schema.org specifications and include all required properties for its type.
   */
  describe('Property 2: Structured Data Validity', () => {
    // Arbitraries for generating test data
    const universityArbitrary = fc.record({
      name: fc.string({ minLength: 5, maxLength: 50 }),
      shortName: fc.string({ minLength: 2, maxLength: 10 }),
      location: fc.string({ minLength: 5, maxLength: 50 }),
      established: fc.integer({ min: 1900, max: 2024 }),
      website: fc.webUrl(),
      profile: fc.record({
        rankings: fc.record({
          nirf: fc.oneof(
            fc.constant('100'),
            fc.constant('101-150'),
            fc.constant('151-200')
          ),
          naac: fc.oneof(
            fc.constant('A++'),
            fc.constant('A+'),
            fc.constant('A')
          )
        })
      }),
      programs: fc.array(
        fc.record({
          name: fc.string({ minLength: 5, maxLength: 50 })
        }),
        { maxLength: 5 }
      )
    });

    const courseArbitrary = fc.record({
      name: fc.string({ minLength: 5, maxLength: 50 }),
      specialization: fc.string({ minLength: 5, maxLength: 50 }),
      id: fc.string({ minLength: 3, maxLength: 20 }),
      degree: fc.oneof(
        fc.constant('B.Tech'),
        fc.constant('M.Tech'),
        fc.constant('BCA'),
        fc.constant('MCA')
      ),
      duration: fc.integer({ min: 2, max: 5 }),
      annualFees: fc.array(fc.integer({ min: 50000, max: 500000 }), { minLength: 1, maxLength: 4 }),
      scholarships: fc.array(
        fc.record({
          percentage: fc.integer({ min: 10, max: 50 })
        }),
        { maxLength: 3 }
      ),
      eligibility: fc.string({ minLength: 10, maxLength: 100 })
    });

    const faqArbitrary = fc.array(
      fc.record({
        question: fc.string({ minLength: 10, maxLength: 100 }),
        answer: fc.string({ minLength: 20, maxLength: 200 })
      }),
      { minLength: 1, maxLength: 10 }
    );

    it('should generate valid Course schema for any valid course and university data', () => {
      fc.assert(
        fc.property(courseArbitrary, universityArbitrary, (course, university) => {
          const schema = generateCourseSchema(course, university, '/courses/test');
          const validation = validateSchema(schema);
          
          // Schema should be valid
          expect(validation.isValid).toBe(true);
          expect(validation.errors).toHaveLength(0);
          
          // Should have required fields
          expect(schema['@context']).toBe('https://schema.org');
          expect(schema['@type']).toBe('Course');
          expect(schema.name).toBeDefined();
          expect(schema.description).toBeDefined();
          expect(schema.provider).toBeDefined();
          expect(schema.provider['@type']).toContain('Organization');
          expect(schema.provider.name).toBeDefined();
        }),
        { numRuns: 100 }
      );
    });

    it('should generate valid Organization schema for any valid university data', () => {
      fc.assert(
        fc.property(universityArbitrary, (university) => {
          const schema = generateOrganizationSchema(university, '/universities/test');
          const validation = validateSchema(schema);
          
          // Schema should be valid
          expect(validation.isValid).toBe(true);
          expect(validation.errors).toHaveLength(0);
          
          // Should have required fields
          expect(schema['@context']).toBe('https://schema.org');
          expect(schema['@type']).toBe('EducationalOrganization');
          expect(schema.name).toBeDefined();
          expect(schema.url).toBeDefined();
          
          // URL should be valid
          expect(() => new URL(schema.url)).not.toThrow();
        }),
        { numRuns: 100 }
      );
    });

    it('should generate valid FAQPage schema for any valid FAQ data', () => {
      fc.assert(
        fc.property(faqArbitrary, (faqs) => {
          const schema = generateFAQSchema(faqs);
          
          // Schema should not be null when FAQs are provided
          expect(schema).not.toBeNull();
          
          const validation = validateSchema(schema);
          
          // Schema should be valid
          expect(validation.isValid).toBe(true);
          expect(validation.errors).toHaveLength(0);
          
          // Should have required fields
          expect(schema['@context']).toBe('https://schema.org');
          expect(schema['@type']).toBe('FAQPage');
          expect(schema.mainEntity).toBeDefined();
          expect(Array.isArray(schema.mainEntity)).toBe(true);
          expect(schema.mainEntity.length).toBeGreaterThan(0);
          
          // Each question should have required structure
          schema.mainEntity.forEach(question => {
            expect(question['@type']).toBe('Question');
            expect(question.name).toBeDefined();
            expect(question.acceptedAnswer).toBeDefined();
            expect(question.acceptedAnswer['@type']).toBe('Answer');
            expect(question.acceptedAnswer.text).toBeDefined();
          });
        }),
        { numRuns: 100 }
      );
    });

    it('should generate valid structured data that can be serialized and parsed', () => {
      fc.assert(
        fc.property(courseArbitrary, universityArbitrary, (course, university) => {
          const schemas = [
            generateCourseSchema(course, university, '/test'),
            generateOrganizationSchema(university, '/test'),
            generateLocalBusinessSchema(),
            generateSiteOrganizationSchema(),
            generateWebsiteSchema()
          ];
          
          schemas.forEach(schema => {
            // Should be valid JSON
            expect(() => JSON.stringify(schema)).not.toThrow();
            
            // Should parse back correctly
            const jsonString = JSON.stringify(schema);
            const parsed = JSON.parse(jsonString);
            
            // Should maintain required fields after round-trip
            expect(parsed['@context']).toBe('https://schema.org');
            expect(parsed['@type']).toBeDefined();
            
            // Validate parsed schema
            const validation = validateSchema(parsed);
            expect(validation.isValid).toBe(true);
          });
        }),
        { numRuns: 100 }
      );
    });

    it('should inject valid structured data into SEOMetaTags component', () => {
      fc.assert(
        fc.property(
          fc.string({ minLength: 5, maxLength: 50 }).filter(s => s.trim().length >= 5),
          fc.string({ minLength: 10, maxLength: 100 }).filter(s => s.trim().length >= 10),
          fc.constantFrom('Course', 'Organization', 'FAQPage', 'Article'),
          (title, description, schemaType) => {
            const structuredData = {
              "@context": "https://schema.org",
              "@type": schemaType,
              "name": title.trim(),
              "description": description.trim()
            };
            
            // Add required fields based on type
            if (schemaType === 'Course') {
              structuredData.provider = {
                "@type": "EducationalOrganization",
                "name": "Test University"
              };
            } else if (schemaType === 'Organization') {
              structuredData.url = "https://example.com";
            } else if (schemaType === 'FAQPage') {
              structuredData.mainEntity = [
                {
                  "@type": "Question",
                  "name": "Test Question?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Test Answer"
                  }
                }
              ];
            } else if (schemaType === 'Article') {
              structuredData.headline = title.trim();
              structuredData.author = {
                "@type": "Organization",
                "name": "Test Author"
              };
              structuredData.datePublished = new Date().toISOString();
              structuredData.publisher = {
                "@type": "Organization",
                "name": "Test Publisher"
              };
            }
            
            render(
              <SEOMetaTags
                title={title}
                description={description}
                structuredData={structuredData}
              />
            );
            
            const script = document.querySelector('script[type="application/ld+json"]#seo-structured-data');
            expect(script).toBeTruthy();
            
            // Should be valid JSON
            const scriptContent = JSON.parse(script?.textContent || '{}');
            
            // Validate the injected schema
            const validation = validateSchema(scriptContent);
            
            // If validation fails, it might be due to whitespace-only strings
            // which is acceptable for this test
            if (!validation.isValid && title.trim().length >= 5 && description.trim().length >= 10) {
              // Only fail if we have valid non-whitespace content
              expect(validation.isValid).toBe(true);
              expect(validation.errors).toHaveLength(0);
            }
            
            cleanup();
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should not have circular references in any generated schema', () => {
      fc.assert(
        fc.property(courseArbitrary, universityArbitrary, (course, university) => {
          const schemas = [
            generateCourseSchema(course, university, '/test'),
            generateOrganizationSchema(university, '/test'),
            generateLocalBusinessSchema(),
            generateSiteOrganizationSchema(),
            generateWebsiteSchema()
          ];
          
          schemas.forEach(schema => {
            // Should be able to stringify without circular reference errors
            expect(() => JSON.stringify(schema)).not.toThrow();
            
            // Manual circular reference check
            const seen = new WeakSet();
            const checkCircular = (obj) => {
              if (obj && typeof obj === 'object') {
                if (seen.has(obj)) {
                  throw new Error('Circular reference detected');
                }
                seen.add(obj);
                Object.values(obj).forEach(checkCircular);
              }
            };
            expect(() => checkCircular(schema)).not.toThrow();
          });
        }),
        { numRuns: 100 }
      );
    });

    it('should have @context as https://schema.org for all schemas', () => {
      fc.assert(
        fc.property(courseArbitrary, universityArbitrary, faqArbitrary, (course, university, faqs) => {
          const schemas = [
            generateCourseSchema(course, university, '/test'),
            generateOrganizationSchema(university, '/test'),
            generateFAQSchema(faqs),
            generateLocalBusinessSchema(),
            generateSiteOrganizationSchema(),
            generateWebsiteSchema()
          ].filter(s => s !== null);
          
          schemas.forEach(schema => {
            expect(schema['@context']).toBe('https://schema.org');
          });
        }),
        { numRuns: 100 }
      );
    });

    it('should have valid @type for all schemas', () => {
      fc.assert(
        fc.property(courseArbitrary, universityArbitrary, (course, university) => {
          const schemas = [
            generateCourseSchema(course, university, '/test'),
            generateOrganizationSchema(university, '/test'),
            generateLocalBusinessSchema(),
            generateSiteOrganizationSchema(),
            generateWebsiteSchema()
          ];
          
          schemas.forEach(schema => {
            expect(schema['@type']).toBeDefined();
            expect(typeof schema['@type']).toBe('string');
            expect(schema['@type'].length).toBeGreaterThan(0);
            // @type should start with capital letter (schema.org convention)
            expect(schema['@type']).toMatch(/^[A-Z]/);
          });
        }),
        { numRuns: 100 }
      );
    });

    it('should not have undefined values in any schema field', () => {
      fc.assert(
        fc.property(courseArbitrary, universityArbitrary, (course, university) => {
          const schemas = [
            generateCourseSchema(course, university, '/test'),
            generateOrganizationSchema(university, '/test'),
            generateLocalBusinessSchema(),
            generateSiteOrganizationSchema(),
            generateWebsiteSchema()
          ];
          
          schemas.forEach(schema => {
            const jsonString = JSON.stringify(schema);
            
            // Should not contain the string "undefined"
            expect(jsonString).not.toContain('undefined');
            
            // Parse and verify no null values for required fields
            const parsed = JSON.parse(jsonString);
            expect(parsed['@context']).not.toBeNull();
            expect(parsed['@context']).not.toBeUndefined();
            expect(parsed['@type']).not.toBeNull();
            expect(parsed['@type']).not.toBeUndefined();
          });
        }),
        { numRuns: 100 }
      );
    });

    it('should validate all required properties for Course schema', () => {
      fc.assert(
        fc.property(courseArbitrary, universityArbitrary, (course, university) => {
          const schema = generateCourseSchema(course, university, '/test');
          
          // Required Course properties
          expect(schema.name).toBeDefined();
          expect(schema.description).toBeDefined();
          expect(schema.provider).toBeDefined();
          
          // Provider must be an Organization
          expect(schema.provider['@type']).toContain('Organization');
          expect(schema.provider.name).toBeDefined();
          
          // Validate the schema
          const validation = validateSchema(schema);
          expect(validation.isValid).toBe(true);
        }),
        { numRuns: 100 }
      );
    });

    it('should validate all required properties for Organization schema', () => {
      fc.assert(
        fc.property(universityArbitrary, (university) => {
          const schema = generateOrganizationSchema(university, '/test');
          
          // Required Organization properties
          expect(schema.name).toBeDefined();
          expect(schema.url).toBeDefined();
          
          // URL must be valid
          expect(() => new URL(schema.url)).not.toThrow();
          
          // Validate the schema
          const validation = validateSchema(schema);
          expect(validation.isValid).toBe(true);
        }),
        { numRuns: 100 }
      );
    });

    it('should validate all required properties for FAQPage schema', () => {
      fc.assert(
        fc.property(faqArbitrary, (faqs) => {
          const schema = generateFAQSchema(faqs);
          
          expect(schema).not.toBeNull();
          
          // Required FAQPage properties
          expect(schema.mainEntity).toBeDefined();
          expect(Array.isArray(schema.mainEntity)).toBe(true);
          expect(schema.mainEntity.length).toBeGreaterThan(0);
          
          // Each question must have required properties
          schema.mainEntity.forEach(question => {
            expect(question['@type']).toBe('Question');
            expect(question.name).toBeDefined();
            expect(question.acceptedAnswer).toBeDefined();
            expect(question.acceptedAnswer['@type']).toBe('Answer');
            expect(question.acceptedAnswer.text).toBeDefined();
          });
          
          // Validate the schema
          const validation = validateSchema(schema);
          expect(validation.isValid).toBe(true);
        }),
        { numRuns: 100 }
      );
    });
  });

  /**
   * Property 4: Heading Hierarchy Compliance
   * Feature: sharda-university-content-enhancement, Property 4
   * **Validates: Requirements 3.4**
   * 
   * For any content page, the heading structure should follow proper HTML hierarchy 
   * without skipping levels (H1 → H2 → H3, never H1 → H3).
   * 
   * Note: This property is tested at the component level by checking that components
   * render headings in proper hierarchy. Full page-level testing would be done in
   * integration tests.
   */
  describe('Property 4: Heading Hierarchy Compliance', () => {
    /**
     * Helper function to check heading hierarchy in a DOM element
     */
    const checkHeadingHierarchy = (container) => {
      const headings = Array.from(container.querySelectorAll('h1, h2, h3, h4, h5, h6'));
      
      if (headings.length === 0) {
        return { valid: true, errors: [] };
      }
      
      const errors = [];
      let previousLevel = 0;
      
      headings.forEach((heading, index) => {
        const currentLevel = parseInt(heading.tagName.substring(1));
        
        // First heading should be H1 or H2 (H2 if it's a section within a page)
        if (index === 0 && currentLevel > 2) {
          errors.push(`First heading is H${currentLevel}, should be H1 or H2`);
        }
        
        // Check for skipped levels
        if (previousLevel > 0 && currentLevel > previousLevel + 1) {
          errors.push(
            `Heading level skipped: H${previousLevel} followed by H${currentLevel} at position ${index}`
          );
        }
        
        previousLevel = currentLevel;
      });
      
      return {
        valid: errors.length === 0,
        errors
      };
    };

    /**
     * Test component that renders headings in proper hierarchy
     */
    const ProperHeadingComponent = ({ levels }) => {
      return (
        <div>
          {levels.includes(1) && <h1>Main Heading</h1>}
          {levels.includes(2) && <h2>Section Heading</h2>}
          {levels.includes(3) && <h3>Subsection Heading</h3>}
          {levels.includes(4) && <h4>Sub-subsection Heading</h4>}
        </div>
      );
    };

    /**
     * Test component that renders headings in improper hierarchy
     */
    const ImproperHeadingComponent = ({ skipFrom, skipTo }) => {
      return (
        <div>
          {skipFrom === 1 && <h1>Main Heading</h1>}
          {skipFrom === 2 && <h2>Section Heading</h2>}
          {skipTo && React.createElement(`h${skipTo}`, {}, 'Skipped Level Heading')}
        </div>
      );
    };

    it('should validate proper heading hierarchy for sequential levels', () => {
      fc.assert(
        fc.property(
          fc.array(fc.integer({ min: 1, max: 4 }), { minLength: 1, maxLength: 4 })
            .map(arr => [...new Set(arr)].sort())
            .filter(arr => arr[0] <= 2), // First heading should be H1 or H2
          (levels) => {
            const { container } = render(<ProperHeadingComponent levels={levels} />);
            
            const hierarchy = checkHeadingHierarchy(container);
            
            // If levels are sequential (no gaps), hierarchy should be valid
            const hasGaps = levels.some((level, index) => {
              if (index === 0) return false;
              return level > levels[index - 1] + 1;
            });
            
            if (!hasGaps) {
              expect(hierarchy.valid).toBe(true);
              expect(hierarchy.errors).toHaveLength(0);
            }
            
            cleanup();
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should detect heading hierarchy violations when levels are skipped', () => {
      // Test specific cases where hierarchy is violated
      const violations = [
        { skipFrom: 1, skipTo: 3 }, // H1 → H3 (skips H2)
        { skipFrom: 1, skipTo: 4 }, // H1 → H4 (skips H2, H3)
        { skipFrom: 2, skipTo: 4 }, // H2 → H4 (skips H3)
      ];
      
      violations.forEach(({ skipFrom, skipTo }) => {
        const { container } = render(
          <ImproperHeadingComponent skipFrom={skipFrom} skipTo={skipTo} />
        );
        
        const hierarchy = checkHeadingHierarchy(container);
        
        // Should detect the violation
        expect(hierarchy.valid).toBe(false);
        expect(hierarchy.errors.length).toBeGreaterThan(0);
        expect(hierarchy.errors[0]).toContain('skipped');
        
        cleanup();
      });
    });

    it('should validate that first heading is H1 or H2', () => {
      fc.assert(
        fc.property(
          fc.integer({ min: 1, max: 2 }),
          (firstLevel) => {
            const { container } = render(
              <div>
                {React.createElement(`h${firstLevel}`, {}, 'First Heading')}
                <h2>Second Heading</h2>
              </div>
            );
            
            const hierarchy = checkHeadingHierarchy(container);
            
            // First heading as H1 or H2 should be valid
            expect(hierarchy.valid).toBe(true);
            
            cleanup();
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should detect when first heading is not H1 or H2', () => {
      const invalidFirstLevels = [3, 4, 5, 6];
      
      invalidFirstLevels.forEach(level => {
        const { container } = render(
          <div>
            {React.createElement(`h${level}`, {}, 'First Heading')}
          </div>
        );
        
        const hierarchy = checkHeadingHierarchy(container);
        
        // Should detect invalid first heading
        expect(hierarchy.valid).toBe(false);
        expect(hierarchy.errors.length).toBeGreaterThan(0);
        
        cleanup();
      });
    });

    it('should allow proper nesting: H1 → H2 → H3 → H4', () => {
      const { container } = render(
        <div>
          <h1>Main Title</h1>
          <h2>Section</h2>
          <h3>Subsection</h3>
          <h4>Sub-subsection</h4>
        </div>
      );
      
      const hierarchy = checkHeadingHierarchy(container);
      
      expect(hierarchy.valid).toBe(true);
      expect(hierarchy.errors).toHaveLength(0);
      
      cleanup();
    });

    it('should allow same level headings consecutively', () => {
      const { container } = render(
        <div>
          <h1>Main Title</h1>
          <h2>Section 1</h2>
          <h2>Section 2</h2>
          <h2>Section 3</h2>
          <h3>Subsection 1</h3>
          <h3>Subsection 2</h3>
        </div>
      );
      
      const hierarchy = checkHeadingHierarchy(container);
      
      expect(hierarchy.valid).toBe(true);
      expect(hierarchy.errors).toHaveLength(0);
      
      cleanup();
    });

    it('should allow going back to previous levels', () => {
      const { container } = render(
        <div>
          <h1>Main Title</h1>
          <h2>Section 1</h2>
          <h3>Subsection 1.1</h3>
          <h2>Section 2</h2>
          <h3>Subsection 2.1</h3>
          <h4>Sub-subsection 2.1.1</h4>
          <h2>Section 3</h2>
        </div>
      );
      
      const hierarchy = checkHeadingHierarchy(container);
      
      expect(hierarchy.valid).toBe(true);
      expect(hierarchy.errors).toHaveLength(0);
      
      cleanup();
    });

    it('should handle empty content with no headings', () => {
      const { container } = render(<div>No headings here</div>);
      
      const hierarchy = checkHeadingHierarchy(container);
      
      // No headings is valid (component might not need headings)
      expect(hierarchy.valid).toBe(true);
      expect(hierarchy.errors).toHaveLength(0);
      
      cleanup();
    });

    it('should validate heading hierarchy in nested components', () => {
      const NestedComponent = () => (
        <div>
          <h1>Page Title</h1>
          <section>
            <h2>Section Title</h2>
            <article>
              <h3>Article Title</h3>
              <p>Content</p>
            </article>
          </section>
        </div>
      );
      
      const { container } = render(<NestedComponent />);
      
      const hierarchy = checkHeadingHierarchy(container);
      
      expect(hierarchy.valid).toBe(true);
      expect(hierarchy.errors).toHaveLength(0);
      
      cleanup();
    });
  });
});
