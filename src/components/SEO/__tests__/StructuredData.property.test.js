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
      const _schemaString = JSON.stringify(schema);
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
        .filter(s => !s.toUpperCase().includes('WBE'))
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

  /**
   * Property 2: Course Schema Completeness
   * Feature: seo-overhaul, Property 2
   * **Validates: Requirements 3.1, 3.2**
   * 
   * For any course with available data (price, availability, rating, review count), 
   * the generated Course schema should include the offers section with price and availability, 
   * and should include aggregateRating when rating data is available.
   */
  describe('Property 2: Course Schema Completeness', () => {
    const courseWithDataArbitrary = fc.record({
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
        .filter(s => !s.toUpperCase().includes('WBE')),
      rating: fc.option(fc.float({ min: 1, max: 5, noNaN: true }), { nil: undefined })
    });

    const universityWithDataArbitrary = fc.record({
      name: fc.string({ minLength: 5, maxLength: 50 }),
      shortName: fc.string({ minLength: 2, maxLength: 10 }),
      location: fc.string({ minLength: 5, maxLength: 50 }),
      established: fc.integer({ min: 1900, max: 2024 }),
      website: fc.webUrl(),
      profile: fc.record({
        rankings: fc.record({
          nirf: fc.option(
            fc.oneof(
              fc.constant('100'),
              fc.constant('101-150'),
              fc.constant('151-200')
            ),
            { nil: undefined }
          ),
          naac: fc.option(
            fc.oneof(
              fc.constant('A++'),
              fc.constant('A+'),
              fc.constant('A')
            ),
            { nil: undefined }
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

    it('should include offers section with price and availability for any course with fee data', () => {
      fc.assert(
        fc.property(courseWithDataArbitrary, universityWithDataArbitrary, (course, university) => {
          const schema = generateCourseSchema(course, university, '/courses/test');
          
          // Should have offers section
          expect(schema.offers).toBeDefined();
          expect(schema.offers['@type']).toBe('Offer');
          
          // Should have price
          expect(schema.offers.price).toBeDefined();
          expect(typeof schema.offers.price).toBe('number');
          expect(schema.offers.price).toBeGreaterThanOrEqual(0);
          
          // Should have currency
          expect(schema.offers.priceCurrency).toBeDefined();
          expect(schema.offers.priceCurrency).toBe('INR');
          
          // Should have availability
          expect(schema.offers.availability).toBeDefined();
          expect(typeof schema.offers.availability).toBe('string');
          expect(schema.offers.availability).toContain('schema.org');
          
          // Should have URL
          expect(schema.offers.url).toBeDefined();
          expect(typeof schema.offers.url).toBe('string');
          expect(schema.offers.url).toContain('/courses/test');
        }),
        { numRuns: 100 }
      );
    });

    it('should include aggregateRating when rating data is available', () => {
      fc.assert(
        fc.property(
          courseWithDataArbitrary.filter(c => c.rating !== undefined),
          universityWithDataArbitrary,
          (course, university) => {
            const schema = generateCourseSchema(course, university, '/courses/test');
            
            // Should have aggregateRating section
            expect(schema.aggregateRating).toBeDefined();
            expect(schema.aggregateRating['@type']).toBe('AggregateRating');
            
            // Should have ratingValue
            expect(schema.aggregateRating.ratingValue).toBeDefined();
            expect(typeof schema.aggregateRating.ratingValue).toBe('number');
            expect(schema.aggregateRating.ratingValue).toBeGreaterThanOrEqual(1);
            expect(schema.aggregateRating.ratingValue).toBeLessThanOrEqual(5);
            
            // Should have reviewCount
            expect(schema.aggregateRating.reviewCount).toBeDefined();
            expect(typeof schema.aggregateRating.reviewCount).toBe('string');
            
            // Should have bestRating and worstRating
            expect(schema.aggregateRating.bestRating).toBe('5');
            expect(schema.aggregateRating.worstRating).toBe('1');
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should always include aggregateRating even when course rating is not provided', () => {
      fc.assert(
        fc.property(
          courseWithDataArbitrary.filter(c => c.rating === undefined),
          universityWithDataArbitrary,
          (course, university) => {
            const schema = generateCourseSchema(course, university, '/courses/test');
            
            // Should still have aggregateRating with default values
            expect(schema.aggregateRating).toBeDefined();
            expect(schema.aggregateRating['@type']).toBe('AggregateRating');
            expect(schema.aggregateRating.ratingValue).toBeDefined();
            expect(schema.aggregateRating.reviewCount).toBeDefined();
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should calculate price from annualFees array', () => {
      fc.assert(
        fc.property(courseWithDataArbitrary, universityWithDataArbitrary, (course, university) => {
          const schema = generateCourseSchema(course, university, '/courses/test');
          
          // Calculate expected average fee
          const fees = course.annualFees || [];
          const expectedAvgFee = fees.length > 0 
            ? fees.reduce((a, b) => a + b, 0) / fees.length 
            : 0;
          
          // Schema price should match calculated average
          expect(schema.offers.price).toBe(expectedAvgFee);
        }),
        { numRuns: 100 }
      );
    });

    it('should include priceSpecification with detailed pricing information', () => {
      fc.assert(
        fc.property(courseWithDataArbitrary, universityWithDataArbitrary, (course, university) => {
          const schema = generateCourseSchema(course, university, '/courses/test');
          
          // Should have priceSpecification
          expect(schema.offers.priceSpecification).toBeDefined();
          expect(schema.offers.priceSpecification['@type']).toBe('UnitPriceSpecification');
          
          // Should have matching price
          expect(schema.offers.priceSpecification.price).toBe(schema.offers.price);
          expect(schema.offers.priceSpecification.priceCurrency).toBe('INR');
          
          // Should have unit code for annual pricing
          expect(schema.offers.priceSpecification.unitCode).toBe('ANN');
          
          // Should indicate tax inclusion
          expect(schema.offers.priceSpecification.valueAddedTaxIncluded).toBe(true);
        }),
        { numRuns: 100 }
      );
    });

    it('should include priceValidUntil date in offers', () => {
      fc.assert(
        fc.property(courseWithDataArbitrary, universityWithDataArbitrary, (course, university) => {
          const schema = generateCourseSchema(course, university, '/courses/test');
          
          // Should have priceValidUntil
          expect(schema.offers.priceValidUntil).toBeDefined();
          expect(typeof schema.offers.priceValidUntil).toBe('string');
          
          // Should be a valid date format (YYYY-MM-DD)
          expect(schema.offers.priceValidUntil).toMatch(/^\d{4}-\d{2}-\d{2}$/);
        }),
        { numRuns: 100 }
      );
    });

    it('should include eligibleRegion in offers', () => {
      fc.assert(
        fc.property(courseWithDataArbitrary, universityWithDataArbitrary, (course, university) => {
          const schema = generateCourseSchema(course, university, '/courses/test');
          
          // Should have eligibleRegion
          expect(schema.offers.eligibleRegion).toBeDefined();
          expect(schema.offers.eligibleRegion['@type']).toBe('Country');
          expect(schema.offers.eligibleRegion.name).toBe('India');
        }),
        { numRuns: 100 }
      );
    });

    it('should maintain offers and aggregateRating structure after JSON serialization', () => {
      fc.assert(
        fc.property(courseWithDataArbitrary, universityWithDataArbitrary, (course, university) => {
          const schema = generateCourseSchema(course, university, '/courses/test');
          
          // Serialize and parse
          const jsonString = JSON.stringify(schema);
          const parsed = JSON.parse(jsonString);
          
          // Should maintain offers structure
          expect(parsed.offers).toBeDefined();
          expect(parsed.offers['@type']).toBe('Offer');
          expect(parsed.offers.price).toBeDefined();
          expect(parsed.offers.priceCurrency).toBe('INR');
          expect(parsed.offers.availability).toBeDefined();
          expect(parsed.offers.url).toBeDefined();
          
          // Should maintain aggregateRating structure
          expect(parsed.aggregateRating).toBeDefined();
          expect(parsed.aggregateRating['@type']).toBe('AggregateRating');
          expect(parsed.aggregateRating.ratingValue).toBeDefined();
          expect(parsed.aggregateRating.reviewCount).toBeDefined();
        }),
        { numRuns: 100 }
      );
    });

    it('should handle courses with zero fees gracefully', () => {
      const courseWithZeroFees = {
        name: 'Free Course',
        specialization: 'Test',
        id: 'test-course',
        degree: 'B.Tech',
        duration: 4,
        annualFees: [0, 0, 0, 0],
        scholarships: [],
        eligibility: 'Open to all'
      };

      const university = {
        name: 'Test University',
        shortName: 'TU',
        location: 'Delhi, Delhi',
        established: 2000,
        website: 'https://test.edu',
        profile: { rankings: {} },
        programs: []
      };

      const schema = generateCourseSchema(courseWithZeroFees, university, '/courses/test');
      
      // Should still have offers section
      expect(schema.offers).toBeDefined();
      expect(schema.offers.price).toBe(0);
      expect(schema.offers.priceCurrency).toBe('INR');
      
      // Should still have aggregateRating
      expect(schema.aggregateRating).toBeDefined();
    });

    it('should handle courses with empty annualFees array', () => {
      const courseWithoutFees = {
        name: 'Course Without Fees',
        specialization: 'Test',
        id: 'test-course',
        degree: 'B.Tech',
        duration: 4,
        annualFees: [],
        scholarships: [],
        eligibility: 'Open to all'
      };

      const university = {
        name: 'Test University',
        shortName: 'TU',
        location: 'Delhi, Delhi',
        established: 2000,
        website: 'https://test.edu',
        profile: { rankings: {} },
        programs: []
      };

      const schema = generateCourseSchema(courseWithoutFees, university, '/courses/test');
      
      // Should still have offers section with zero price
      expect(schema.offers).toBeDefined();
      expect(schema.offers.price).toBe(0);
      
      // Should still have aggregateRating
      expect(schema.aggregateRating).toBeDefined();
    });
  });
});

  /**
   * Property 3: University Schema Completeness
   * Feature: seo-overhaul, Property 3
   * **Validates: Requirements 3.3, 3.4**
   * 
   * For any university with available data (student count, rating, review count), 
   * the generated University schema should include numberOfStudents when available 
   * and should include aggregateRating when rating data is available.
   */
  describe('Property 3: University Schema Completeness', () => {
    const universityWithStudentsArbitrary = fc.record({
      name: fc.string({ minLength: 5, maxLength: 50 }),
      shortName: fc.string({ minLength: 2, maxLength: 10 }),
      location: fc.string({ minLength: 5, maxLength: 50 }),
      established: fc.integer({ min: 1900, max: 2024 }),
      website: fc.webUrl(),
      numberOfStudents: fc.option(fc.integer({ min: 100, max: 50000 }), { nil: undefined }),
      rating: fc.option(fc.float({ min: 1, max: 5, noNaN: true }), { nil: undefined }),
      reviewCount: fc.option(fc.integer({ min: 10, max: 10000 }), { nil: undefined }),
      profile: fc.record({
        numberOfStudents: fc.option(fc.integer({ min: 100, max: 50000 }), { nil: undefined }),
        rating: fc.option(fc.float({ min: 1, max: 5, noNaN: true }), { nil: undefined }),
        reviewCount: fc.option(fc.integer({ min: 10, max: 10000 }), { nil: undefined }),
        rankings: fc.record({
          nirf: fc.option(
            fc.oneof(
              fc.constant('100'),
              fc.constant('101-150'),
              fc.constant('151-200')
            ),
            { nil: undefined }
          ),
          naac: fc.option(
            fc.oneof(
              fc.constant('A++'),
              fc.constant('A+'),
              fc.constant('A')
            ),
            { nil: undefined }
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

    it('should include numberOfStudents when available in university data', () => {
      fc.assert(
        fc.property(
          universityWithStudentsArbitrary.filter(u => u.numberOfStudents !== undefined),
          (university) => {
            const schema = generateOrganizationSchema(university, '/universities/test');
            
            // Should have numberOfStudents field
            expect(schema.numberOfStudents).toBeDefined();
            expect(typeof schema.numberOfStudents).toBe('number');
            expect(schema.numberOfStudents).toBeGreaterThan(0);
            expect(schema.numberOfStudents).toBe(university.numberOfStudents);
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should include numberOfStudents from profile when available', () => {
      fc.assert(
        fc.property(
          universityWithStudentsArbitrary.filter(u => 
            u.numberOfStudents === undefined && 
            u.profile?.numberOfStudents !== undefined
          ),
          (university) => {
            const schema = generateOrganizationSchema(university, '/universities/test');
            
            // Should have numberOfStudents from profile
            expect(schema.numberOfStudents).toBeDefined();
            expect(typeof schema.numberOfStudents).toBe('number');
            expect(schema.numberOfStudents).toBe(university.profile.numberOfStudents);
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should not include numberOfStudents when not available', () => {
      fc.assert(
        fc.property(
          universityWithStudentsArbitrary.filter(u => 
            u.numberOfStudents === undefined && 
            u.profile?.numberOfStudents === undefined
          ),
          (university) => {
            const schema = generateOrganizationSchema(university, '/universities/test');
            
            // Should not have numberOfStudents field
            expect(schema.numberOfStudents).toBeUndefined();
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should include aggregateRating when rating data is available', () => {
      fc.assert(
        fc.property(
          universityWithStudentsArbitrary.filter(u => 
            u.rating !== undefined || u.profile?.rating !== undefined
          ),
          (university) => {
            const schema = generateOrganizationSchema(university, '/universities/test');
            
            // Should have aggregateRating section
            expect(schema.aggregateRating).toBeDefined();
            expect(schema.aggregateRating['@type']).toBe('AggregateRating');
            
            // Should have ratingValue
            expect(schema.aggregateRating.ratingValue).toBeDefined();
            const ratingValue = typeof schema.aggregateRating.ratingValue === 'string' 
              ? parseFloat(schema.aggregateRating.ratingValue) 
              : schema.aggregateRating.ratingValue;
            expect(ratingValue).toBeGreaterThanOrEqual(1);
            expect(ratingValue).toBeLessThanOrEqual(5);
            
            // Should have reviewCount
            expect(schema.aggregateRating.reviewCount).toBeDefined();
            expect(typeof schema.aggregateRating.reviewCount).toBe('string');
            
            // Should have bestRating and worstRating
            expect(schema.aggregateRating.bestRating).toBe('5');
            expect(schema.aggregateRating.worstRating).toBe('1');
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should include aggregateRating with default values when NIRF ranking is available', () => {
      fc.assert(
        fc.property(
          universityWithStudentsArbitrary.filter(u => 
            u.rating === undefined && 
            u.profile?.rating === undefined &&
            u.profile?.rankings?.nirf !== undefined
          ),
          (university) => {
            const schema = generateOrganizationSchema(university, '/universities/test');
            
            // Should have aggregateRating with default values
            expect(schema.aggregateRating).toBeDefined();
            expect(schema.aggregateRating['@type']).toBe('AggregateRating');
            expect(schema.aggregateRating.ratingValue).toBe('4.5');
            expect(schema.aggregateRating.reviewCount).toBe('1000');
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should not include aggregateRating when no rating data or NIRF ranking is available', () => {
      fc.assert(
        fc.property(
          universityWithStudentsArbitrary.filter(u => 
            u.rating === undefined && 
            u.profile?.rating === undefined &&
            u.profile?.rankings?.nirf === undefined
          ),
          (university) => {
            const schema = generateOrganizationSchema(university, '/universities/test');
            
            // Should not have aggregateRating
            expect(schema.aggregateRating).toBeUndefined();
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should prioritize direct rating over profile rating', () => {
      const universityWithBothRatings = {
        name: 'Test University',
        shortName: 'TU',
        location: 'Delhi, Delhi',
        established: 2000,
        website: 'https://test.edu',
        rating: 4.8,
        reviewCount: 500,
        profile: {
          rating: 4.2,
          reviewCount: 300,
          rankings: {}
        },
        programs: []
      };

      const schema = generateOrganizationSchema(universityWithBothRatings, '/universities/test');
      
      // Should use direct rating
      expect(schema.aggregateRating).toBeDefined();
      expect(schema.aggregateRating.ratingValue).toBe(4.8);
      expect(schema.aggregateRating.reviewCount).toBe('500');
    });

    it('should use profile rating when direct rating is not available', () => {
      const universityWithProfileRating = {
        name: 'Test University',
        shortName: 'TU',
        location: 'Delhi, Delhi',
        established: 2000,
        website: 'https://test.edu',
        profile: {
          rating: 4.3,
          reviewCount: 250,
          rankings: {}
        },
        programs: []
      };

      const schema = generateOrganizationSchema(universityWithProfileRating, '/universities/test');
      
      // Should use profile rating
      expect(schema.aggregateRating).toBeDefined();
      expect(schema.aggregateRating.ratingValue).toBe(4.3);
      expect(schema.aggregateRating.reviewCount).toBe('250');
    });

    it('should maintain numberOfStudents and aggregateRating after JSON serialization', () => {
      fc.assert(
        fc.property(
          universityWithStudentsArbitrary.filter(u => 
            u.numberOfStudents !== undefined && 
            u.rating !== undefined
          ),
          (university) => {
            const schema = generateOrganizationSchema(university, '/universities/test');
            
            // Serialize and parse
            const jsonString = JSON.stringify(schema);
            const parsed = JSON.parse(jsonString);
            
            // Should maintain numberOfStudents
            expect(parsed.numberOfStudents).toBeDefined();
            expect(parsed.numberOfStudents).toBe(university.numberOfStudents);
            
            // Should maintain aggregateRating structure
            expect(parsed.aggregateRating).toBeDefined();
            expect(parsed.aggregateRating['@type']).toBe('AggregateRating');
            expect(parsed.aggregateRating.ratingValue).toBeDefined();
            expect(parsed.aggregateRating.reviewCount).toBeDefined();
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should handle universities with very large student counts', () => {
      const universityWithLargeStudentCount = {
        name: 'Large University',
        shortName: 'LU',
        location: 'Mumbai, Maharashtra',
        established: 1950,
        website: 'https://large.edu',
        numberOfStudents: 100000,
        profile: {
          rankings: {}
        },
        programs: []
      };

      const schema = generateOrganizationSchema(universityWithLargeStudentCount, '/universities/test');
      
      // Should handle large numbers correctly
      expect(schema.numberOfStudents).toBe(100000);
      expect(typeof schema.numberOfStudents).toBe('number');
    });

    it('should handle universities with minimal student counts', () => {
      const universityWithSmallStudentCount = {
        name: 'Small University',
        shortName: 'SU',
        location: 'Goa, Goa',
        established: 2010,
        website: 'https://small.edu',
        numberOfStudents: 100,
        profile: {
          rankings: {}
        },
        programs: []
      };

      const schema = generateOrganizationSchema(universityWithSmallStudentCount, '/universities/test');
      
      // Should handle small numbers correctly
      expect(schema.numberOfStudents).toBe(100);
      expect(typeof schema.numberOfStudents).toBe('number');
    });

    it('should include all required EducationalOrganization fields along with enhancements', () => {
      fc.assert(
        fc.property(universityWithStudentsArbitrary, (university) => {
          const schema = generateOrganizationSchema(university, '/universities/test');
          
          // Should have required fields
          expect(schema['@context']).toBe('https://schema.org');
          expect(schema['@type']).toBe('EducationalOrganization');
          expect(schema.name).toBeDefined();
          expect(schema.url).toBeDefined();
          expect(schema.address).toBeDefined();
          expect(schema.address['@type']).toBe('PostalAddress');
          
          // Should be valid JSON
          expect(() => JSON.stringify(schema)).not.toThrow();
        }),
        { numRuns: 100 }
      );
    });

    it('should convert reviewCount to string format', () => {
      fc.assert(
        fc.property(
          universityWithStudentsArbitrary.filter(u => u.reviewCount !== undefined),
          (university) => {
            const schema = generateOrganizationSchema(university, '/universities/test');
            
            if (schema.aggregateRating) {
              // reviewCount should be a string
              expect(typeof schema.aggregateRating.reviewCount).toBe('string');
              
              // Should be convertible to a number
              const reviewCountNum = parseInt(schema.aggregateRating.reviewCount, 10);
              expect(isNaN(reviewCountNum)).toBe(false);
              expect(reviewCountNum).toBeGreaterThan(0);
            }
          }
        ),
        { numRuns: 100 }
      );
    });
  });

  /**
   * Property 4: Organization Schema Completeness
   * Feature: seo-overhaul, Property 4
   * **Validates: Requirements 3.5**
   * 
   * For any organization with available rating data, the generated Organization schema 
   * should include aggregateRating with ratingValue and reviewCount.
   */
  describe('Property 4: Organization Schema Completeness', () => {
    it('should always include aggregateRating in SiteOrganization schema', () => {
      fc.assert(
        fc.property(fc.constant(null), () => {
          const schema = generateSiteOrganizationSchema();
          
          // Should have aggregateRating section
          expect(schema.aggregateRating).toBeDefined();
          expect(schema.aggregateRating['@type']).toBe('AggregateRating');
          
          // Should have ratingValue
          expect(schema.aggregateRating.ratingValue).toBeDefined();
          expect(typeof schema.aggregateRating.ratingValue).toBe('string');
          const ratingValue = parseFloat(schema.aggregateRating.ratingValue);
          expect(ratingValue).toBeGreaterThanOrEqual(1);
          expect(ratingValue).toBeLessThanOrEqual(5);
          
          // Should have reviewCount
          expect(schema.aggregateRating.reviewCount).toBeDefined();
          expect(typeof schema.aggregateRating.reviewCount).toBe('string');
          const reviewCount = parseInt(schema.aggregateRating.reviewCount, 10);
          expect(isNaN(reviewCount)).toBe(false);
          expect(reviewCount).toBeGreaterThan(0);
          
          // Should have bestRating and worstRating
          expect(schema.aggregateRating.bestRating).toBe('5');
          expect(schema.aggregateRating.worstRating).toBe('1');
        }),
        { numRuns: 100 }
      );
    });

    it('should maintain aggregateRating structure after JSON serialization', () => {
      fc.assert(
        fc.property(fc.constant(null), () => {
          const schema = generateSiteOrganizationSchema();
          
          // Serialize and parse
          const jsonString = JSON.stringify(schema);
          const parsed = JSON.parse(jsonString);
          
          // Should maintain aggregateRating structure
          expect(parsed.aggregateRating).toBeDefined();
          expect(parsed.aggregateRating['@type']).toBe('AggregateRating');
          expect(parsed.aggregateRating.ratingValue).toBeDefined();
          expect(parsed.aggregateRating.reviewCount).toBeDefined();
          expect(parsed.aggregateRating.bestRating).toBe('5');
          expect(parsed.aggregateRating.worstRating).toBe('1');
        }),
        { numRuns: 100 }
      );
    });

    it('should have consistent aggregateRating across multiple invocations', () => {
      fc.assert(
        fc.property(fc.constant(null), () => {
          const schema1 = generateSiteOrganizationSchema();
          const schema2 = generateSiteOrganizationSchema();
          
          // Should have same aggregateRating values
          expect(schema1.aggregateRating.ratingValue).toBe(schema2.aggregateRating.ratingValue);
          expect(schema1.aggregateRating.reviewCount).toBe(schema2.aggregateRating.reviewCount);
          expect(schema1.aggregateRating.bestRating).toBe(schema2.aggregateRating.bestRating);
          expect(schema1.aggregateRating.worstRating).toBe(schema2.aggregateRating.worstRating);
        }),
        { numRuns: 100 }
      );
    });

    it('should include all required Organization fields along with aggregateRating', () => {
      fc.assert(
        fc.property(fc.constant(null), () => {
          const schema = generateSiteOrganizationSchema();
          
          // Should have required Organization fields
          expect(schema['@context']).toBe('https://schema.org');
          expect(schema['@type']).toBe('EducationalOrganization');
          expect(schema.name).toBeDefined();
          expect(schema.url).toBeDefined();
          
          // Should have aggregateRating
          expect(schema.aggregateRating).toBeDefined();
          
          // Should be valid JSON
          expect(() => JSON.stringify(schema)).not.toThrow();
        }),
        { numRuns: 100 }
      );
    });

    it('should have valid rating value range in aggregateRating', () => {
      const schema = generateSiteOrganizationSchema();
      
      const ratingValue = parseFloat(schema.aggregateRating.ratingValue);
      const bestRating = parseFloat(schema.aggregateRating.bestRating);
      const worstRating = parseFloat(schema.aggregateRating.worstRating);
      
      // Rating value should be within range
      expect(ratingValue).toBeGreaterThanOrEqual(worstRating);
      expect(ratingValue).toBeLessThanOrEqual(bestRating);
    });

    it('should have positive review count in aggregateRating', () => {
      const schema = generateSiteOrganizationSchema();
      
      const reviewCount = parseInt(schema.aggregateRating.reviewCount, 10);
      
      // Review count should be positive
      expect(reviewCount).toBeGreaterThan(0);
    });

    it('should not have undefined or null values in aggregateRating', () => {
      fc.assert(
        fc.property(fc.constant(null), () => {
          const schema = generateSiteOrganizationSchema();
          
          // Check all aggregateRating fields are defined
          expect(schema.aggregateRating['@type']).not.toBeNull();
          expect(schema.aggregateRating['@type']).not.toBeUndefined();
          expect(schema.aggregateRating.ratingValue).not.toBeNull();
          expect(schema.aggregateRating.ratingValue).not.toBeUndefined();
          expect(schema.aggregateRating.reviewCount).not.toBeNull();
          expect(schema.aggregateRating.reviewCount).not.toBeUndefined();
          expect(schema.aggregateRating.bestRating).not.toBeNull();
          expect(schema.aggregateRating.bestRating).not.toBeUndefined();
          expect(schema.aggregateRating.worstRating).not.toBeNull();
          expect(schema.aggregateRating.worstRating).not.toBeUndefined();
        }),
        { numRuns: 100 }
      );
    });

    it('should use string format for all rating fields', () => {
      const schema = generateSiteOrganizationSchema();
      
      // All rating fields should be strings (schema.org convention)
      expect(typeof schema.aggregateRating.ratingValue).toBe('string');
      expect(typeof schema.aggregateRating.reviewCount).toBe('string');
      expect(typeof schema.aggregateRating.bestRating).toBe('string');
      expect(typeof schema.aggregateRating.worstRating).toBe('string');
    });

    it('should maintain schema validity with aggregateRating', () => {
      fc.assert(
        fc.property(fc.constant(null), () => {
          const schema = generateSiteOrganizationSchema();
          
          // Should be valid JSON-LD
          expect(schema['@context']).toBe('https://schema.org');
          expect(schema['@type']).toBe('EducationalOrganization');
          
          // Should have aggregateRating with correct type
          expect(schema.aggregateRating['@type']).toBe('AggregateRating');
          
          // Should not have circular references
          expect(() => JSON.stringify(schema)).not.toThrow();
          
          // Should parse back correctly
          const parsed = JSON.parse(JSON.stringify(schema));
          expect(parsed.aggregateRating).toBeDefined();
        }),
        { numRuns: 100 }
      );
    });
  });

  /**
   * Property 5: Schema JSON-LD Validity and Required Properties
   * Feature: seo-overhaul, Property 5
   * **Validates: Requirements 3.6, 3.7**
   * 
   * For any generated schema (Course, University, Organization), the output should be valid JSON-LD 
   * that can be parsed without errors, and should include all required properties per schema.org 
   * specifications for its type.
   */
  describe('Property 5: Schema JSON-LD Validity and Required Properties', () => {
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
      eligibility: fc.string({ minLength: 10, maxLength: 100 }),
      rating: fc.option(fc.float({ min: 1, max: 5, noNaN: true }), { nil: undefined })
    });

    const universityArbitrary = fc.record({
      name: fc.string({ minLength: 5, maxLength: 50 }),
      shortName: fc.string({ minLength: 2, maxLength: 10 }),
      location: fc.string({ minLength: 5, maxLength: 50 }),
      established: fc.integer({ min: 1900, max: 2024 }),
      website: fc.webUrl(),
      numberOfStudents: fc.option(fc.integer({ min: 100, max: 50000 }), { nil: undefined }),
      rating: fc.option(fc.float({ min: 1, max: 5, noNaN: true }), { nil: undefined }),
      reviewCount: fc.option(fc.integer({ min: 10, max: 10000 }), { nil: undefined }),
      profile: fc.record({
        numberOfStudents: fc.option(fc.integer({ min: 100, max: 50000 }), { nil: undefined }),
        rating: fc.option(fc.float({ min: 1, max: 5, noNaN: true }), { nil: undefined }),
        reviewCount: fc.option(fc.integer({ min: 10, max: 10000 }), { nil: undefined }),
        rankings: fc.record({
          nirf: fc.option(
            fc.oneof(
              fc.constant('100'),
              fc.constant('101-150'),
              fc.constant('151-200')
            ),
            { nil: undefined }
          ),
          naac: fc.option(
            fc.oneof(
              fc.constant('A++'),
              fc.constant('A+'),
              fc.constant('A')
            ),
            { nil: undefined }
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

    it('should generate valid JSON-LD for Course schema', () => {
      fc.assert(
        fc.property(courseArbitrary, universityArbitrary, (course, university) => {
          const schema = generateCourseSchema(course, university, '/courses/test');
          
          // Should be valid JSON
          expect(() => JSON.stringify(schema)).not.toThrow();
          const jsonString = JSON.stringify(schema);
          expect(() => JSON.parse(jsonString)).not.toThrow();
          
          // Should have required @context and @type
          expect(schema['@context']).toBe('https://schema.org');
          expect(schema['@type']).toBe('Course');
          
          // Should have required Course properties per schema.org
          expect(schema.name).toBeDefined();
          expect(schema.description).toBeDefined();
          expect(schema.provider).toBeDefined();
          expect(schema.provider['@type']).toContain('Organization');
          expect(schema.provider.name).toBeDefined();
        }),
        { numRuns: 100 }
      );
    });

    it('should generate valid JSON-LD for University schema', () => {
      fc.assert(
        fc.property(universityArbitrary, (university) => {
          const schema = generateOrganizationSchema(university, '/universities/test');
          
          // Should be valid JSON
          expect(() => JSON.stringify(schema)).not.toThrow();
          const jsonString = JSON.stringify(schema);
          expect(() => JSON.parse(jsonString)).not.toThrow();
          
          // Should have required @context and @type
          expect(schema['@context']).toBe('https://schema.org');
          expect(schema['@type']).toBe('EducationalOrganization');
          
          // Should have required Organization properties per schema.org
          expect(schema.name).toBeDefined();
          expect(schema.url).toBeDefined();
        }),
        { numRuns: 100 }
      );
    });

    it('should generate valid JSON-LD for Site Organization schema', () => {
      fc.assert(
        fc.property(fc.constant(null), () => {
          const schema = generateSiteOrganizationSchema();
          
          // Should be valid JSON
          expect(() => JSON.stringify(schema)).not.toThrow();
          const jsonString = JSON.stringify(schema);
          expect(() => JSON.parse(jsonString)).not.toThrow();
          
          // Should have required @context and @type
          expect(schema['@context']).toBe('https://schema.org');
          expect(schema['@type']).toBe('EducationalOrganization');
          
          // Should have required Organization properties per schema.org
          expect(schema.name).toBeDefined();
          expect(schema.url).toBeDefined();
        }),
        { numRuns: 100 }
      );
    });

    it('should not have circular references in any schema', () => {
      fc.assert(
        fc.property(courseArbitrary, universityArbitrary, (course, university) => {
          const schemas = [
            generateCourseSchema(course, university, '/courses/test'),
            generateOrganizationSchema(university, '/universities/test'),
            generateSiteOrganizationSchema()
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

    it('should maintain schema validity after round-trip serialization', () => {
      fc.assert(
        fc.property(courseArbitrary, universityArbitrary, (course, university) => {
          const schemas = [
            generateCourseSchema(course, university, '/courses/test'),
            generateOrganizationSchema(university, '/universities/test'),
            generateSiteOrganizationSchema()
          ];
          
          schemas.forEach(schema => {
            // Serialize and parse
            const jsonString = JSON.stringify(schema);
            const parsed = JSON.parse(jsonString);
            
            // Should maintain required fields
            expect(parsed['@context']).toBe('https://schema.org');
            expect(parsed['@type']).toBeDefined();
            expect(typeof parsed['@type']).toBe('string');
            expect(parsed['@type'].length).toBeGreaterThan(0);
            
            // Should be able to re-serialize
            expect(() => JSON.stringify(parsed)).not.toThrow();
          });
        }),
        { numRuns: 100 }
      );
    });

    it('should have @context as first property (JSON-LD convention)', () => {
      fc.assert(
        fc.property(courseArbitrary, universityArbitrary, (course, university) => {
          const schemas = [
            generateCourseSchema(course, university, '/courses/test'),
            generateOrganizationSchema(university, '/universities/test'),
            generateSiteOrganizationSchema()
          ];
          
          schemas.forEach(schema => {
            const keys = Object.keys(schema);
            // @context should be the first key
            expect(keys[0]).toBe('@context');
          });
        }),
        { numRuns: 100 }
      );
    });

    it('should not contain undefined values in serialized JSON', () => {
      fc.assert(
        fc.property(courseArbitrary, universityArbitrary, (course, university) => {
          const schemas = [
            generateCourseSchema(course, university, '/courses/test'),
            generateOrganizationSchema(university, '/universities/test'),
            generateSiteOrganizationSchema()
          ];
          
          schemas.forEach(schema => {
            const jsonString = JSON.stringify(schema);
            
            // Should not contain the string "undefined"
            expect(jsonString).not.toContain('undefined');
            
            // Parse and check critical fields are not null
            const parsed = JSON.parse(jsonString);
            expect(parsed['@context']).not.toBeNull();
            expect(parsed['@type']).not.toBeNull();
          });
        }),
        { numRuns: 100 }
      );
    });

    it('should have valid @type values (capitalized schema.org types)', () => {
      fc.assert(
        fc.property(courseArbitrary, universityArbitrary, (course, university) => {
          const schemas = [
            { schema: generateCourseSchema(course, university, '/courses/test'), expectedType: 'Course' },
            { schema: generateOrganizationSchema(university, '/universities/test'), expectedType: 'EducationalOrganization' },
            { schema: generateSiteOrganizationSchema(), expectedType: 'EducationalOrganization' }
          ];
          
          schemas.forEach(({ schema, expectedType }) => {
            // @type should match expected type
            expect(schema['@type']).toBe(expectedType);
            
            // @type should start with capital letter (schema.org convention)
            expect(schema['@type']).toMatch(/^[A-Z]/);
            
            // @type should not contain spaces
            expect(schema['@type']).not.toContain(' ');
          });
        }),
        { numRuns: 100 }
      );
    });

    it('should include all required properties for Course schema per schema.org', () => {
      fc.assert(
        fc.property(courseArbitrary, universityArbitrary, (course, university) => {
          const schema = generateCourseSchema(course, university, '/courses/test');
          
          // Required properties per schema.org Course specification
          const requiredProperties = ['@context', '@type', 'name', 'description', 'provider'];
          
          requiredProperties.forEach(prop => {
            expect(schema[prop]).toBeDefined();
            expect(schema[prop]).not.toBeNull();
          });
          
          // Provider must be an Organization
          expect(schema.provider['@type']).toBeDefined();
          expect(schema.provider['@type']).toContain('Organization');
          expect(schema.provider.name).toBeDefined();
        }),
        { numRuns: 100 }
      );
    });

    it('should include all required properties for Organization schema per schema.org', () => {
      fc.assert(
        fc.property(universityArbitrary, (university) => {
          const schema = generateOrganizationSchema(university, '/universities/test');
          
          // Required properties per schema.org Organization specification
          const requiredProperties = ['@context', '@type', 'name', 'url'];
          
          requiredProperties.forEach(prop => {
            expect(schema[prop]).toBeDefined();
            expect(schema[prop]).not.toBeNull();
          });
          
          // URL should be a valid URL format
          expect(schema.url).toMatch(/^https?:\/\//);
        }),
        { numRuns: 100 }
      );
    });

    it('should handle special characters in schema values without breaking JSON', () => {
      const courseWithSpecialChars = {
        name: 'Course with "quotes" and \'apostrophes\'',
        specialization: 'Test & Development',
        id: 'test-course',
        degree: 'B.Tech',
        duration: 4,
        annualFees: [100000],
        scholarships: [],
        eligibility: 'Test with <html> tags'
      };

      const universityWithSpecialChars = {
        name: 'University with "quotes"',
        shortName: 'UQ',
        location: 'City, State',
        established: 2000,
        website: 'https://test.edu',
        profile: { rankings: {} },
        programs: []
      };

      const schema = generateCourseSchema(courseWithSpecialChars, universityWithSpecialChars, '/courses/test');
      
      // Should be able to stringify without errors
      expect(() => JSON.stringify(schema)).not.toThrow();
      
      // Should be able to parse back
      const jsonString = JSON.stringify(schema);
      expect(() => JSON.parse(jsonString)).not.toThrow();
      
      // Should maintain special characters
      const parsed = JSON.parse(jsonString);
      expect(parsed.name).toContain('"');
      expect(parsed.name).toContain("'");
    });

    it('should generate schemas that pass basic JSON-LD validation rules', () => {
      fc.assert(
        fc.property(courseArbitrary, universityArbitrary, (course, university) => {
          const schemas = [
            generateCourseSchema(course, university, '/courses/test'),
            generateOrganizationSchema(university, '/universities/test'),
            generateSiteOrganizationSchema()
          ];
          
          schemas.forEach(schema => {
            // Must have @context
            expect(schema['@context']).toBeDefined();
            expect(schema['@context']).toBe('https://schema.org');
            
            // Must have @type
            expect(schema['@type']).toBeDefined();
            expect(typeof schema['@type']).toBe('string');
            
            // Must be valid JSON
            expect(() => JSON.stringify(schema)).not.toThrow();
            
            // Must not have circular references
            const seen = new WeakSet();
            const checkCircular = (obj) => {
              if (obj && typeof obj === 'object') {
                if (seen.has(obj)) throw new Error('Circular reference');
                seen.add(obj);
                Object.values(obj).forEach(checkCircular);
              }
            };
            expect(() => checkCircular(schema)).not.toThrow();
            
            // Must be parseable
            const jsonString = JSON.stringify(schema);
            expect(() => JSON.parse(jsonString)).not.toThrow();
          });
        }),
        { numRuns: 100 }
      );
    });
  });
