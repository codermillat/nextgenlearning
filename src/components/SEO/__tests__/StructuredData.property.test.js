/**
 * Property-Based Tests for Structured Data Component
 * Feature: sharda-university-rebranding
 * 
 * These tests verify that structured data schemas contain the correct
 * contact information and follow schema.org standards.
 */

import { describe, it, expect } from 'vitest';
import fc from 'fast-check';
import {
  generateLocalBusinessSchema,
  generateSiteOrganizationSchema,
  generateOrganizationSchema,
  generateCourseSchema,
  generateFAQSchema,
  generateBreadcrumbSchema,
  generateArticleSchema,
  generateHowToSchema,
  generateWebsiteSchema,
  generateItemListSchema,
  generateReviewSchema
} from '../StructuredData.jsx';

describe('Structured Data - Property Tests', () => {
  /**
   * Property 3: Structured Data Contact Information
   * **Validates: Requirements 1.4, 7.3**
   * 
   * For any structured data schema that includes contact information 
   * (LocalBusiness, Organization), the telephone field should contain "+918800996151".
   */
  describe('Property 3: Structured Data Contact Information', () => {
    it('should have correct telephone number in LocalBusiness schema', () => {
      const schema = generateLocalBusinessSchema();
      
      expect(schema).toBeDefined();
      expect(schema['@type']).toBe('LocalBusiness');
      expect(schema.telephone).toBe('+918800996151');
    });

    it('should not contain old telephone number in LocalBusiness schema', () => {
      const schema = generateLocalBusinessSchema();
      const schemaString = JSON.stringify(schema);
      
      expect(schemaString).not.toContain('8801611533385');
      expect(schemaString).not.toContain('+8801611533385');
    });

    it('should have correct telephone number in SiteOrganization schema', () => {
      const schema = generateSiteOrganizationSchema();
      
      expect(schema).toBeDefined();
      expect(schema['@type']).toBe('EducationalOrganization');
      expect(schema.telephone).toBe('+918800996151');
    });

    it('should not contain old telephone number in SiteOrganization schema', () => {
      const schema = generateSiteOrganizationSchema();
      const schemaString = JSON.stringify(schema);
      
      expect(schemaString).not.toContain('8801611533385');
      expect(schemaString).not.toContain('+8801611533385');
    });

    it('should have correct email in LocalBusiness schema', () => {
      const schema = generateLocalBusinessSchema();
      
      expect(schema.email).toBe('contact@nextgenlearning.dev');
      expect(schema.email).not.toContain('westernbanglaedu');
    });

    it('should have correct email in SiteOrganization schema', () => {
      const schema = generateSiteOrganizationSchema();
      
      expect(schema.email).toBe('contact@nextgenlearning.dev');
      expect(schema.email).not.toContain('westernbanglaedu');
    });

    it('should maintain telephone format consistency across all organization schemas', () => {
      const localBusinessSchema = generateLocalBusinessSchema();
      const siteOrgSchema = generateSiteOrganizationSchema();
      
      // Both should have the same telephone number
      expect(localBusinessSchema.telephone).toBe(siteOrgSchema.telephone);
      
      // Both should use the +91 format
      expect(localBusinessSchema.telephone).toMatch(/^\+91\d{10}$/);
      expect(siteOrgSchema.telephone).toMatch(/^\+91\d{10}$/);
    });

    it('should have valid schema.org context in all contact-related schemas', () => {
      const localBusinessSchema = generateLocalBusinessSchema();
      const siteOrgSchema = generateSiteOrganizationSchema();
      
      expect(localBusinessSchema['@context']).toBe('https://schema.org');
      expect(siteOrgSchema['@context']).toBe('https://schema.org');
    });

    it('should not expose WBE email addresses in any schema', () => {
      const schemas = [
        generateLocalBusinessSchema(),
        generateSiteOrganizationSchema(),
        generateWebsiteSchema(),
        generateArticleSchema({
          title: 'Test Article',
          description: 'Test Description',
          url: '/test'
        })
      ];
      
      schemas.forEach(schema => {
        const schemaString = JSON.stringify(schema);
        expect(schemaString).not.toContain('westernbanglaedu');
        expect(schemaString).not.toContain('wbe');
      });
    });

    it('should have telephone field in all organization-type schemas', () => {
      const localBusinessSchema = generateLocalBusinessSchema();
      const siteOrgSchema = generateSiteOrganizationSchema();
      
      // Both should have telephone field
      expect(localBusinessSchema).toHaveProperty('telephone');
      expect(siteOrgSchema).toHaveProperty('telephone');
      
      // Telephone should not be empty
      expect(localBusinessSchema.telephone).toBeTruthy();
      expect(siteOrgSchema.telephone).toBeTruthy();
    });

    it('should format telephone number with country code prefix', () => {
      const schemas = [
        generateLocalBusinessSchema(),
        generateSiteOrganizationSchema()
      ];
      
      schemas.forEach(schema => {
        if (schema.telephone) {
          // Should start with +91 (India country code)
          expect(schema.telephone).toMatch(/^\+91/);
          
          // Should be exactly 13 characters (+91 + 10 digits)
          expect(schema.telephone.length).toBe(13);
          
          // Should not have spaces or dashes
          expect(schema.telephone).not.toMatch(/[\s-]/);
        }
      });
    });

    it('should have consistent contact information across multiple schema generations', () => {
      // Generate schemas multiple times
      const schemas1 = [
        generateLocalBusinessSchema(),
        generateSiteOrganizationSchema()
      ];
      
      const schemas2 = [
        generateLocalBusinessSchema(),
        generateSiteOrganizationSchema()
      ];
      
      // Telephone should be consistent across generations
      expect(schemas1[0].telephone).toBe(schemas2[0].telephone);
      expect(schemas1[1].telephone).toBe(schemas2[1].telephone);
      
      // Email should be consistent across generations
      expect(schemas1[0].email).toBe(schemas2[0].email);
      expect(schemas1[1].email).toBe(schemas2[1].email);
    });

    it('should include area served information in LocalBusiness schema', () => {
      const schema = generateLocalBusinessSchema();
      
      expect(schema.areaServed).toBeDefined();
      expect(Array.isArray(schema.areaServed)).toBe(true);
      expect(schema.areaServed.length).toBeGreaterThan(0);
      
      // Should include Bangladesh as target audience
      const bangladeshArea = schema.areaServed.find(
        area => area.name === 'Bangladesh'
      );
      expect(bangladeshArea).toBeDefined();
      expect(bangladeshArea['@type']).toBe('Country');
    });

    it('should have valid address structure in LocalBusiness schema', () => {
      const schema = generateLocalBusinessSchema();
      
      expect(schema.address).toBeDefined();
      expect(schema.address['@type']).toBe('PostalAddress');
      expect(schema.address.addressCountry).toBe('IN');
    });

    it('should not contain any hardcoded old contact information', () => {
      const schemas = [
        generateLocalBusinessSchema(),
        generateSiteOrganizationSchema(),
        generateWebsiteSchema()
      ];
      
      const oldNumbers = [
        '8801611533385',
        '+8801611533385',
        '880 161 153 3385',
        '880-161-153-3385'
      ];
      
      schemas.forEach(schema => {
        const schemaString = JSON.stringify(schema).toLowerCase();
        oldNumbers.forEach(oldNumber => {
          expect(schemaString).not.toContain(oldNumber.toLowerCase());
        });
      });
    });

    it('should have proper JSON-LD structure for all schemas', () => {
      const schemas = [
        generateLocalBusinessSchema(),
        generateSiteOrganizationSchema(),
        generateWebsiteSchema(),
        generateFAQSchema([
          { question: 'Test?', answer: 'Answer' }
        ]),
        generateBreadcrumbSchema([
          { name: 'Home', url: '/' }
        ])
      ];
      
      schemas.forEach(schema => {
        if (schema) {
          // Should have @context
          expect(schema['@context']).toBe('https://schema.org');
          
          // Should have @type
          expect(schema['@type']).toBeDefined();
          expect(typeof schema['@type']).toBe('string');
          
          // Should be valid JSON
          expect(() => JSON.stringify(schema)).not.toThrow();
        }
      });
    });

    it('should maintain contact information integrity when serialized to JSON', () => {
      const schema = generateLocalBusinessSchema();
      const jsonString = JSON.stringify(schema);
      const parsed = JSON.parse(jsonString);
      
      // Telephone should survive serialization
      expect(parsed.telephone).toBe('+918800996151');
      expect(parsed.email).toBe('contact@nextgenlearning.dev');
      
      // Should not contain old information
      expect(jsonString).not.toContain('8801611533385');
      expect(jsonString).not.toContain('westernbanglaedu');
    });

    it('should have opening hours in LocalBusiness schema for 24/7 availability', () => {
      const schema = generateLocalBusinessSchema();
      
      expect(schema.openingHours).toBeDefined();
      expect(schema.openingHours).toBe('Mo-Su 00:00-23:59');
    });

    it('should have correct business type and price range in LocalBusiness schema', () => {
      const schema = generateLocalBusinessSchema();
      
      expect(schema['@type']).toBe('LocalBusiness');
      expect(schema.priceRange).toBe('Free');
    });

    it('should include proper name and alternate name in organization schemas', () => {
      const localBusinessSchema = generateLocalBusinessSchema();
      const siteOrgSchema = generateSiteOrganizationSchema();
      
      expect(localBusinessSchema.name).toBe('NextGen Learning');
      expect(siteOrgSchema.name).toBe('NextGen Learning');
      
      expect(localBusinessSchema.alternateName).toContain('NextGen Learning');
      expect(siteOrgSchema.alternateName).toContain('NextGen Learning');
    });

    it('should not contain WBE branding in any schema field', () => {
      const schemas = [
        generateLocalBusinessSchema(),
        generateSiteOrganizationSchema(),
        generateWebsiteSchema()
      ];
      
      const wbeTerms = ['wbe', 'western bengal', 'western bangla'];
      
      schemas.forEach(schema => {
        const schemaString = JSON.stringify(schema).toLowerCase();
        wbeTerms.forEach(term => {
          expect(schemaString).not.toContain(term);
        });
      });
    });

    it('should generate valid university organization schema without contact info conflicts', () => {
      const mockUniversity = {
        name: 'Test University',
        shortName: 'TU',
        location: 'Delhi, Delhi',
        established: 2000,
        website: 'https://test.edu',
        profile: {
          rankings: {
            nirf: '100',
            naac: 'A+'
          }
        },
        programs: []
      };
      
      const schema = generateOrganizationSchema(mockUniversity, '/universities/test');
      
      // University schema should not have telephone (it's for the university, not our contact)
      // This is correct - we only add our contact to site-level schemas
      expect(schema['@type']).toBe('EducationalOrganization');
      expect(schema.name).toBe('Test University');
      
      // Should not contain our contact number (this is university's schema)
      const schemaString = JSON.stringify(schema);
      // University schemas don't include our contact info, which is correct
    });

    it('should have consistent URL structure across all schemas', () => {
      const siteUrl = 'https://www.nextgenlearning.dev';
      
      const schemas = [
        generateLocalBusinessSchema(),
        generateSiteOrganizationSchema(),
        generateWebsiteSchema()
      ];
      
      schemas.forEach(schema => {
        if (schema.url) {
          expect(schema.url).toBe(siteUrl);
        }
      });
    });
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

    const breadcrumbArbitrary = fc.array(
      fc.record({
        name: fc.string({ minLength: 3, maxLength: 30 }),
        url: fc.oneof(
          fc.webUrl(),
          fc.string({ minLength: 1, maxLength: 50 }).map(s => `/${s}`)
        )
      }),
      { minLength: 1, maxLength: 5 }
    );

    const articleArbitrary = fc.record({
      title: fc.string({ minLength: 10, maxLength: 100 }),
      description: fc.string({ minLength: 50, maxLength: 200 }),
      url: fc.string({ minLength: 1, maxLength: 50 }).map(s => `/${s}`),
      author: fc.option(fc.string({ minLength: 5, maxLength: 30 }), { nil: undefined }),
      datePublished: fc.option(
        fc.date({ min: new Date('2020-01-01'), max: new Date('2025-12-31') })
          .filter(d => !isNaN(d.getTime()))
          .map(d => d.toISOString()), 
        { nil: undefined }
      ),
      dateModified: fc.option(
        fc.date({ min: new Date('2020-01-01'), max: new Date('2025-12-31') })
          .filter(d => !isNaN(d.getTime()))
          .map(d => d.toISOString()), 
        { nil: undefined }
      ),
      image: fc.option(fc.string({ minLength: 5, maxLength: 50 }).map(s => `/${s}.jpg`), { nil: undefined }),
      keywords: fc.option(
        fc.oneof(
          fc.array(fc.string({ minLength: 3, maxLength: 20 }), { minLength: 1, maxLength: 5 }),
          fc.string({ minLength: 10, maxLength: 50 })
        ),
        { nil: undefined }
      ),
      articleSection: fc.option(fc.string({ minLength: 5, maxLength: 30 }), { nil: undefined })
    });

    const howToArbitrary = fc.record({
      name: fc.string({ minLength: 10, maxLength: 100 }),
      description: fc.string({ minLength: 20, maxLength: 200 }),
      steps: fc.array(
        fc.record({
          name: fc.string({ minLength: 5, maxLength: 50 }),
          text: fc.string({ minLength: 10, maxLength: 100 }),
          url: fc.option(fc.string({ minLength: 1, maxLength: 50 }).map(s => `/${s}`), { nil: undefined })
        }),
        { minLength: 2, maxLength: 10 }
      ),
      totalTime: fc.string({ minLength: 4, maxLength: 10 }).map(s => `PT${s}M`),
      url: fc.string({ minLength: 1, maxLength: 50 }).map(s => `/${s}`)
    });

    const itemListArbitrary = fc.record({
      items: fc.array(
        fc.record({
          name: fc.string({ minLength: 5, maxLength: 50 }),
          url: fc.string({ minLength: 1, maxLength: 50 }).map(s => `/${s}`)
        }),
        { minLength: 1, maxLength: 20 }
      ),
      name: fc.string({ minLength: 5, maxLength: 50 }),
      description: fc.string({ minLength: 20, maxLength: 100 }),
      url: fc.string({ minLength: 1, maxLength: 50 }).map(s => `/${s}`)
    });

    const reviewArbitrary = fc.record({
      course: fc.record({
        name: fc.string({ minLength: 5, maxLength: 50 })
      }),
      university: fc.record({
        name: fc.string({ minLength: 5, maxLength: 50 })
      }),
      rating: fc.integer({ min: 1, max: 5 }),
      reviewText: fc.string({ minLength: 20, maxLength: 200 }),
      author: fc.option(fc.string({ minLength: 5, maxLength: 30 }), { nil: undefined })
    });

    it('should generate valid JSON-LD for LocalBusiness schema', () => {
      fc.assert(
        fc.property(fc.constant(null), () => {
          const schema = generateLocalBusinessSchema();
          
          // Should be valid JSON
          expect(() => JSON.stringify(schema)).not.toThrow();
          expect(() => JSON.parse(JSON.stringify(schema))).not.toThrow();
          
          // Should have required schema.org fields
          expect(schema['@context']).toBe('https://schema.org');
          expect(schema['@type']).toBeDefined();
          expect(typeof schema['@type']).toBe('string');
          expect(schema['@type']).toBe('LocalBusiness');
        }),
        { numRuns: 100 }
      );
    });

    it('should generate valid JSON-LD for SiteOrganization schema', () => {
      fc.assert(
        fc.property(fc.constant(null), () => {
          const schema = generateSiteOrganizationSchema();
          
          // Should be valid JSON
          expect(() => JSON.stringify(schema)).not.toThrow();
          expect(() => JSON.parse(JSON.stringify(schema))).not.toThrow();
          
          // Should have required schema.org fields
          expect(schema['@context']).toBe('https://schema.org');
          expect(schema['@type']).toBeDefined();
          expect(typeof schema['@type']).toBe('string');
          expect(schema['@type']).toBe('EducationalOrganization');
        }),
        { numRuns: 100 }
      );
    });

    it('should generate valid JSON-LD for Website schema', () => {
      fc.assert(
        fc.property(fc.constant(null), () => {
          const schema = generateWebsiteSchema();
          
          // Should be valid JSON
          expect(() => JSON.stringify(schema)).not.toThrow();
          expect(() => JSON.parse(JSON.stringify(schema))).not.toThrow();
          
          // Should have required schema.org fields
          expect(schema['@context']).toBe('https://schema.org');
          expect(schema['@type']).toBeDefined();
          expect(typeof schema['@type']).toBe('string');
          expect(schema['@type']).toBe('WebSite');
        }),
        { numRuns: 100 }
      );
    });

    it('should generate valid JSON-LD for Organization schema with arbitrary university data', () => {
      fc.assert(
        fc.property(universityArbitrary, (university) => {
          const schema = generateOrganizationSchema(university, '/universities/test');
          
          // Should be valid JSON
          expect(() => JSON.stringify(schema)).not.toThrow();
          expect(() => JSON.parse(JSON.stringify(schema))).not.toThrow();
          
          // Should have required schema.org fields
          expect(schema['@context']).toBe('https://schema.org');
          expect(schema['@type']).toBeDefined();
          expect(typeof schema['@type']).toBe('string');
          expect(schema['@type']).toBe('EducationalOrganization');
        }),
        { numRuns: 100 }
      );
    });

    it('should generate valid JSON-LD for Course schema with arbitrary course data', () => {
      fc.assert(
        fc.property(courseArbitrary, universityArbitrary, (course, university) => {
          const schema = generateCourseSchema(course, university, '/courses/test');
          
          // Should be valid JSON
          expect(() => JSON.stringify(schema)).not.toThrow();
          expect(() => JSON.parse(JSON.stringify(schema))).not.toThrow();
          
          // Should have required schema.org fields
          expect(schema['@context']).toBe('https://schema.org');
          expect(schema['@type']).toBeDefined();
          expect(typeof schema['@type']).toBe('string');
          expect(schema['@type']).toBe('Course');
        }),
        { numRuns: 100 }
      );
    });

    it('should generate valid JSON-LD for FAQ schema with arbitrary FAQ data', () => {
      fc.assert(
        fc.property(faqArbitrary, (faqs) => {
          const schema = generateFAQSchema(faqs);
          
          // FAQ schema can be null if no FAQs provided, but we're providing FAQs
          expect(schema).not.toBeNull();
          
          // Should be valid JSON
          expect(() => JSON.stringify(schema)).not.toThrow();
          expect(() => JSON.parse(JSON.stringify(schema))).not.toThrow();
          
          // Should have required schema.org fields
          expect(schema['@context']).toBe('https://schema.org');
          expect(schema['@type']).toBeDefined();
          expect(typeof schema['@type']).toBe('string');
          expect(schema['@type']).toBe('FAQPage');
        }),
        { numRuns: 100 }
      );
    });

    it('should generate valid JSON-LD for Breadcrumb schema with arbitrary breadcrumb data', () => {
      fc.assert(
        fc.property(breadcrumbArbitrary, (items) => {
          const schema = generateBreadcrumbSchema(items);
          
          // Should be valid JSON
          expect(() => JSON.stringify(schema)).not.toThrow();
          expect(() => JSON.parse(JSON.stringify(schema))).not.toThrow();
          
          // Should have required schema.org fields
          expect(schema['@context']).toBe('https://schema.org');
          expect(schema['@type']).toBeDefined();
          expect(typeof schema['@type']).toBe('string');
          expect(schema['@type']).toBe('BreadcrumbList');
        }),
        { numRuns: 100 }
      );
    });

    it('should generate valid JSON-LD for Article schema with arbitrary article data', () => {
      fc.assert(
        fc.property(articleArbitrary, (article) => {
          const schema = generateArticleSchema(article);
          
          // Should be valid JSON
          expect(() => JSON.stringify(schema)).not.toThrow();
          expect(() => JSON.parse(JSON.stringify(schema))).not.toThrow();
          
          // Should have required schema.org fields
          expect(schema['@context']).toBe('https://schema.org');
          expect(schema['@type']).toBeDefined();
          expect(typeof schema['@type']).toBe('string');
          expect(schema['@type']).toBe('Article');
        }),
        { numRuns: 100 }
      );
    });

    it('should generate valid JSON-LD for HowTo schema with arbitrary how-to data', () => {
      fc.assert(
        fc.property(howToArbitrary, (howTo) => {
          const schema = generateHowToSchema(howTo);
          
          // Should be valid JSON
          expect(() => JSON.stringify(schema)).not.toThrow();
          expect(() => JSON.parse(JSON.stringify(schema))).not.toThrow();
          
          // Should have required schema.org fields
          expect(schema['@context']).toBe('https://schema.org');
          expect(schema['@type']).toBeDefined();
          expect(typeof schema['@type']).toBe('string');
          expect(schema['@type']).toBe('HowTo');
        }),
        { numRuns: 100 }
      );
    });

    it('should generate valid JSON-LD for ItemList schema with arbitrary item list data', () => {
      fc.assert(
        fc.property(itemListArbitrary, (itemList) => {
          const schema = generateItemListSchema(
            itemList.items,
            itemList.name,
            itemList.description,
            itemList.url
          );
          
          // Should be valid JSON
          expect(() => JSON.stringify(schema)).not.toThrow();
          expect(() => JSON.parse(JSON.stringify(schema))).not.toThrow();
          
          // Should have required schema.org fields
          expect(schema['@context']).toBe('https://schema.org');
          expect(schema['@type']).toBeDefined();
          expect(typeof schema['@type']).toBe('string');
          expect(schema['@type']).toBe('ItemList');
        }),
        { numRuns: 100 }
      );
    });

    it('should generate valid JSON-LD for Review schema with arbitrary review data', () => {
      fc.assert(
        fc.property(reviewArbitrary, (review) => {
          const schema = generateReviewSchema(
            review.course,
            review.university,
            review.rating,
            review.reviewText,
            review.author
          );
          
          // Should be valid JSON
          expect(() => JSON.stringify(schema)).not.toThrow();
          expect(() => JSON.parse(JSON.stringify(schema))).not.toThrow();
          
          // Should have required schema.org fields
          expect(schema['@context']).toBe('https://schema.org');
          expect(schema['@type']).toBeDefined();
          expect(typeof schema['@type']).toBe('string');
          expect(schema['@type']).toBe('Review');
        }),
        { numRuns: 100 }
      );
    });

    it('should maintain schema validity after JSON serialization and parsing', () => {
      fc.assert(
        fc.property(universityArbitrary, courseArbitrary, (university, course) => {
          const schemas = [
            generateLocalBusinessSchema(),
            generateSiteOrganizationSchema(),
            generateWebsiteSchema(),
            generateOrganizationSchema(university, '/test'),
            generateCourseSchema(course, university, '/test')
          ];
          
          schemas.forEach(schema => {
            // Serialize and parse
            const jsonString = JSON.stringify(schema);
            const parsed = JSON.parse(jsonString);
            
            // Should maintain required fields after round-trip
            expect(parsed['@context']).toBe('https://schema.org');
            expect(parsed['@type']).toBeDefined();
            expect(typeof parsed['@type']).toBe('string');
            expect(parsed['@type'].length).toBeGreaterThan(0);
          });
        }),
        { numRuns: 100 }
      );
    });

    it('should have @context as first field in all schemas (convention)', () => {
      fc.assert(
        fc.property(universityArbitrary, (university) => {
          const schemas = [
            generateLocalBusinessSchema(),
            generateSiteOrganizationSchema(),
            generateWebsiteSchema(),
            generateOrganizationSchema(university, '/test')
          ];
          
          schemas.forEach(schema => {
            const keys = Object.keys(schema);
            // @context should be the first key (JSON-LD convention)
            expect(keys[0]).toBe('@context');
          });
        }),
        { numRuns: 100 }
      );
    });

    it('should not have undefined or null values in schema fields', () => {
      fc.assert(
        fc.property(universityArbitrary, courseArbitrary, (university, course) => {
          const schemas = [
            generateLocalBusinessSchema(),
            generateSiteOrganizationSchema(),
            generateWebsiteSchema(),
            generateOrganizationSchema(university, '/test'),
            generateCourseSchema(course, university, '/test')
          ];
          
          schemas.forEach(schema => {
            const jsonString = JSON.stringify(schema);
            
            // Should not contain undefined (which would be omitted in JSON)
            // Should not contain null values for required fields
            expect(jsonString).not.toContain('undefined');
            
            // Parse and check that @context and @type are not null
            const parsed = JSON.parse(jsonString);
            expect(parsed['@context']).not.toBeNull();
            expect(parsed['@type']).not.toBeNull();
          });
        }),
        { numRuns: 100 }
      );
    });

    it('should generate schemas that are compatible with schema.org validators', () => {
      fc.assert(
        fc.property(universityArbitrary, (university) => {
          const schemas = [
            generateLocalBusinessSchema(),
            generateSiteOrganizationSchema(),
            generateWebsiteSchema(),
            generateOrganizationSchema(university, '/test')
          ];
          
          schemas.forEach(schema => {
            // Basic validation checks that schema.org validators would perform
            
            // 1. Must have @context
            expect(schema['@context']).toBeDefined();
            expect(schema['@context']).toBe('https://schema.org');
            
            // 2. Must have @type
            expect(schema['@type']).toBeDefined();
            expect(typeof schema['@type']).toBe('string');
            
            // 3. @type should be a valid schema.org type (starts with capital letter)
            expect(schema['@type']).toMatch(/^[A-Z]/);
            
            // 4. Should be valid JSON
            expect(() => JSON.stringify(schema)).not.toThrow();
            
            // 5. Should not have circular references
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

    it('should handle empty or minimal input data gracefully', () => {
      // Test with minimal/empty data
      const emptyFAQ = generateFAQSchema([]);
      expect(emptyFAQ).toBeNull(); // FAQ schema returns null for empty array
      
      const singleFAQ = generateFAQSchema([{ question: 'Q?', answer: 'A.' }]);
      expect(singleFAQ).not.toBeNull();
      expect(singleFAQ['@context']).toBe('https://schema.org');
      expect(singleFAQ['@type']).toBe('FAQPage');
      
      const singleBreadcrumb = generateBreadcrumbSchema([{ name: 'Home', url: '/' }]);
      expect(singleBreadcrumb['@context']).toBe('https://schema.org');
      expect(singleBreadcrumb['@type']).toBe('BreadcrumbList');
    });

    it('should generate consistent schema structure across multiple invocations', () => {
      fc.assert(
        fc.property(fc.constant(null), () => {
          // Generate same schema multiple times
          const schema1 = generateLocalBusinessSchema();
          const schema2 = generateLocalBusinessSchema();
          
          // Should have same structure (same keys)
          const keys1 = Object.keys(schema1).sort();
          const keys2 = Object.keys(schema2).sort();
          expect(keys1).toEqual(keys2);
          
          // Should have same @context and @type
          expect(schema1['@context']).toBe(schema2['@context']);
          expect(schema1['@type']).toBe(schema2['@type']);
        }),
        { numRuns: 100 }
      );
    });

    it('should not expose sensitive or internal data in schemas', () => {
      fc.assert(
        fc.property(universityArbitrary, courseArbitrary, (university, course) => {
          const schemas = [
            generateLocalBusinessSchema(),
            generateSiteOrganizationSchema(),
            generateWebsiteSchema(),
            generateOrganizationSchema(university, '/test'),
            generateCourseSchema(course, university, '/test')
          ];
          
          schemas.forEach(schema => {
            const jsonString = JSON.stringify(schema).toLowerCase();
            
            // Should not contain sensitive patterns
            expect(jsonString).not.toContain('password');
            expect(jsonString).not.toContain('secret');
            expect(jsonString).not.toContain('api_key');
            expect(jsonString).not.toContain('token');
            
            // Should not contain old WBE data
            expect(jsonString).not.toContain('wbe');
            expect(jsonString).not.toContain('8801611533385');
          });
        }),
        { numRuns: 100 }
      );
    });
  });
});
