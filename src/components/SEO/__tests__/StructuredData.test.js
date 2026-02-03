/**
 * Unit Tests for Structured Data Component
 * Tests specific examples and edge cases for schema generation and validation
 */

import { describe, it, expect } from 'vitest';
import {
  generateOrganizationSchema,
  generateCourseSchema,
  generateFAQSchema,
  generateReviewSchema,
  generateBreadcrumbSchema,
  generateArticleSchema,
  generateHowToSchema,
  generateWebsiteSchema,
  generateItemListSchema,
  generateLocalBusinessSchema,
  generateSiteOrganizationSchema,
  validateSchema
} from '../StructuredData.jsx';

describe('StructuredData - Unit Tests', () => {
  describe('Schema Validation Function', () => {
    it('should validate a valid Course schema', () => {
      const course = {
        name: 'B.Tech Computer Science',
        specialization: 'Computer Science',
        id: 'btech-cs',
        degree: 'B.Tech',
        duration: 4,
        annualFees: [200000, 200000, 200000, 200000],
        scholarships: [{ percentage: 50 }],
        eligibility: 'HSC with 50% marks'
      };
      
      const university = {
        name: 'Sharda University',
        shortName: 'SU',
        location: 'Greater Noida, Uttar Pradesh',
        established: 2009,
        website: 'https://www.sharda.ac.in',
        profile: {
          rankings: {
            nirf: '101-150',
            naac: 'A'
          }
        },
        programs: []
      };
      
      const schema = generateCourseSchema(course, university, '/courses/btech-cs');
      const validation = validateSchema(schema);
      
      expect(validation.isValid).toBe(true);
      expect(validation.errors).toHaveLength(0);
    });

    it('should validate a valid Organization schema', () => {
      const university = {
        name: 'Sharda University',
        shortName: 'SU',
        location: 'Greater Noida, Uttar Pradesh',
        established: 2009,
        website: 'https://www.sharda.ac.in',
        profile: {
          rankings: {
            nirf: '101-150',
            naac: 'A'
          }
        },
        programs: []
      };
      
      const schema = generateOrganizationSchema(university, '/universities/sharda');
      const validation = validateSchema(schema);
      
      expect(validation.isValid).toBe(true);
      expect(validation.errors).toHaveLength(0);
    });

    it('should validate a valid FAQPage schema', () => {
      const faqs = [
        {
          question: 'What is the admission process?',
          answer: 'The admission process involves submitting an application form, providing required documents, and paying the application fee.'
        },
        {
          question: 'What are the eligibility criteria?',
          answer: 'Eligibility criteria vary by program. Generally, HSC with 50% marks is required for undergraduate programs.'
        }
      ];
      
      const schema = generateFAQSchema(faqs);
      const validation = validateSchema(schema);
      
      expect(validation.isValid).toBe(true);
      expect(validation.errors).toHaveLength(0);
    });

    it('should validate a valid Review schema', () => {
      const course = { name: 'B.Tech Computer Science' };
      const university = { name: 'Sharda University' };
      const schema = generateReviewSchema(
        course,
        university,
        5,
        'Excellent program with great faculty and placement opportunities.',
        'John Doe'
      );
      
      const validation = validateSchema(schema);
      
      expect(validation.isValid).toBe(true);
      expect(validation.errors).toHaveLength(0);
    });

    it('should validate a valid BreadcrumbList schema', () => {
      const items = [
        { name: 'Home', url: '/' },
        { name: 'Universities', url: '/universities' },
        { name: 'Sharda University', url: '/universities/sharda' }
      ];
      
      const schema = generateBreadcrumbSchema(items);
      const validation = validateSchema(schema);
      
      expect(validation.isValid).toBe(true);
      expect(validation.errors).toHaveLength(0);
    });

    it('should validate a valid Article schema', () => {
      const schema = generateArticleSchema({
        title: 'Complete Guide to Studying at Sharda University',
        description: 'A comprehensive guide covering admissions, fees, scholarships, and campus life at Sharda University.',
        url: '/guides/sharda-university',
        author: 'NextGen Learning',
        datePublished: '2025-01-01T00:00:00Z',
        keywords: ['sharda university', 'admissions', 'fees']
      });
      
      const validation = validateSchema(schema);
      
      expect(validation.isValid).toBe(true);
      expect(validation.errors).toHaveLength(0);
    });

    it('should validate a valid HowTo schema', () => {
      const schema = generateHowToSchema({
        name: 'How to Apply to Sharda University',
        description: 'Step-by-step guide to applying to Sharda University',
        steps: [
          { name: 'Visit Website', text: 'Go to the Sharda University admissions portal' },
          { name: 'Fill Application', text: 'Complete the online application form' },
          { name: 'Submit Documents', text: 'Upload required documents' }
        ],
        totalTime: 'PT30M',
        url: '/guides/how-to-apply'
      });
      
      const validation = validateSchema(schema);
      
      expect(validation.isValid).toBe(true);
      expect(validation.errors).toHaveLength(0);
    });

    it('should validate a valid WebSite schema', () => {
      const schema = generateWebsiteSchema();
      const validation = validateSchema(schema);
      
      expect(validation.isValid).toBe(true);
      expect(validation.errors).toHaveLength(0);
    });

    it('should validate a valid ItemList schema', () => {
      const items = [
        { name: 'B.Tech Computer Science', url: '/courses/btech-cs' },
        { name: 'B.Tech AI & ML', url: '/courses/btech-ai-ml' }
      ];
      
      const schema = generateItemListSchema(
        items,
        'Computer Science Programs',
        'List of computer science programs at Sharda University',
        '/programs/computer-science'
      );
      
      const validation = validateSchema(schema);
      
      expect(validation.isValid).toBe(true);
      expect(validation.errors).toHaveLength(0);
    });

    it('should validate a valid LocalBusiness schema', () => {
      const schema = generateLocalBusinessSchema();
      const validation = validateSchema(schema);
      
      expect(validation.isValid).toBe(true);
      expect(validation.errors).toHaveLength(0);
    });

    it('should validate a valid SiteOrganization schema', () => {
      const schema = generateSiteOrganizationSchema();
      const validation = validateSchema(schema);
      
      expect(validation.isValid).toBe(true);
      expect(validation.errors).toHaveLength(0);
    });

    it('should detect missing @context field', () => {
      const invalidSchema = {
        '@type': 'Course',
        name: 'Test Course'
      };
      
      const validation = validateSchema(invalidSchema);
      
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('Missing required field: @context');
    });

    it('should detect invalid @context value', () => {
      const invalidSchema = {
        '@context': 'https://example.com',
        '@type': 'Course',
        name: 'Test Course'
      };
      
      const validation = validateSchema(invalidSchema);
      
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('Invalid @context: must be "https://schema.org"');
    });

    it('should detect missing @type field', () => {
      const invalidSchema = {
        '@context': 'https://schema.org',
        name: 'Test Course'
      };
      
      const validation = validateSchema(invalidSchema);
      
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('Missing required field: @type');
    });

    it('should detect missing required Course fields', () => {
      const invalidSchema = {
        '@context': 'https://schema.org',
        '@type': 'Course',
        name: 'Test Course'
        // Missing description and provider
      };
      
      const validation = validateSchema(invalidSchema);
      
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('Course schema missing required field: description');
      expect(validation.errors).toContain('Course schema missing required field: provider');
    });

    it('should detect invalid Course provider', () => {
      const invalidSchema = {
        '@context': 'https://schema.org',
        '@type': 'Course',
        name: 'Test Course',
        description: 'Test Description',
        provider: {
          '@type': 'Person', // Should be Organization
          name: 'Test'
        }
      };
      
      const validation = validateSchema(invalidSchema);
      
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('Course provider must be an Organization type');
    });

    it('should detect missing required Organization fields', () => {
      const invalidSchema = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Test University'
        // Missing url
      };
      
      const validation = validateSchema(invalidSchema);
      
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('Organization schema missing required field: url');
    });

    it('should detect invalid Organization URL', () => {
      const invalidSchema = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Test University',
        url: 'not-a-valid-url'
      };
      
      const validation = validateSchema(invalidSchema);
      
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('Organization URL must be a valid URL');
    });

    it('should detect missing FAQPage mainEntity', () => {
      const invalidSchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage'
        // Missing mainEntity
      };
      
      const validation = validateSchema(invalidSchema);
      
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('FAQPage schema missing required field: mainEntity');
    });

    it('should detect empty FAQPage mainEntity', () => {
      const invalidSchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: []
      };
      
      const validation = validateSchema(invalidSchema);
      
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('FAQPage mainEntity must contain at least one question');
    });

    it('should detect invalid FAQPage question structure', () => {
      const invalidSchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Test Question?'
            // Missing acceptedAnswer
          }
        ]
      };
      
      const validation = validateSchema(invalidSchema);
      
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('FAQPage question 1 missing required field: acceptedAnswer');
    });

    it('should detect missing Review required fields', () => {
      const invalidSchema = {
        '@context': 'https://schema.org',
        '@type': 'Review',
        reviewBody: 'Great course!'
        // Missing itemReviewed, reviewRating, author
      };
      
      const validation = validateSchema(invalidSchema);
      
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('Review schema missing required field: itemReviewed');
      expect(validation.errors).toContain('Review schema missing required field: reviewRating');
      expect(validation.errors).toContain('Review schema missing required field: author');
    });

    it('should detect invalid Review rating structure', () => {
      const invalidSchema = {
        '@context': 'https://schema.org',
        '@type': 'Review',
        itemReviewed: { '@type': 'Course', name: 'Test' },
        reviewRating: {
          '@type': 'Rating'
          // Missing ratingValue
        },
        author: { '@type': 'Person', name: 'Test' }
      };
      
      const validation = validateSchema(invalidSchema);
      
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('Review reviewRating missing required field: ratingValue');
    });

    it('should detect empty BreadcrumbList', () => {
      const invalidSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: []
      };
      
      const validation = validateSchema(invalidSchema);
      
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('BreadcrumbList itemListElement must contain at least one item');
    });

    it('should detect invalid BreadcrumbList item structure', () => {
      const invalidSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1
            // Missing name
          }
        ]
      };
      
      const validation = validateSchema(invalidSchema);
      
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('BreadcrumbList item 1 missing required field: name');
    });

    it('should detect missing Article required fields', () => {
      const invalidSchema = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: 'Test Article'
        // Missing author, datePublished
      };
      
      const validation = validateSchema(invalidSchema);
      
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('Article schema missing required field: author');
      expect(validation.errors).toContain('Article schema missing required field: datePublished');
    });

    it('should detect missing HowTo steps', () => {
      const invalidSchema = {
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        name: 'How to do something'
        // Missing step
      };
      
      const validation = validateSchema(invalidSchema);
      
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('HowTo schema missing required field: step');
    });

    it('should detect empty HowTo steps', () => {
      const invalidSchema = {
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        name: 'How to do something',
        step: []
      };
      
      const validation = validateSchema(invalidSchema);
      
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('HowTo step must contain at least one step');
    });

    it('should handle null schema', () => {
      const validation = validateSchema(null);
      
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('Schema must be a valid object');
    });

    it('should handle undefined schema', () => {
      const validation = validateSchema(undefined);
      
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('Schema must be a valid object');
    });

    it('should handle non-object schema', () => {
      const validation = validateSchema('not an object');
      
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('Schema must be a valid object');
    });

    it('should validate unknown schema types without errors', () => {
      const unknownSchema = {
        '@context': 'https://schema.org',
        '@type': 'UnknownType',
        name: 'Test'
      };
      
      const validation = validateSchema(unknownSchema);
      
      // Should pass basic validation even if type is unknown
      expect(validation.isValid).toBe(true);
      expect(validation.errors).toHaveLength(0);
    });
  });

  describe('Schema Generation Edge Cases', () => {
    it('should handle FAQSchema with empty array', () => {
      const schema = generateFAQSchema([]);
      expect(schema).toBeNull();
    });

    it('should handle FAQSchema with null', () => {
      const schema = generateFAQSchema(null);
      expect(schema).toBeNull();
    });

    it('should handle FAQSchema with undefined', () => {
      const schema = generateFAQSchema(undefined);
      expect(schema).toBeNull();
    });

    it('should generate Course schema with minimal data', () => {
      const course = {
        name: 'Test Course',
        id: 'test',
        duration: 4,
        annualFees: [100000]
      };
      
      const university = {
        name: 'Test University',
        location: 'Test City'
      };
      
      const schema = generateCourseSchema(course, university, '/test');
      
      expect(schema['@context']).toBe('https://schema.org');
      expect(schema['@type']).toBe('Course');
      expect(schema.name).toBe('Test Course');
    });

    it('should generate Organization schema with minimal data', () => {
      const university = {
        name: 'Test University',
        location: 'Test City'
      };
      
      const schema = generateOrganizationSchema(university, '/test');
      
      expect(schema['@context']).toBe('https://schema.org');
      expect(schema['@type']).toBe('EducationalOrganization');
      expect(schema.name).toBe('Test University');
    });

    it('should generate Review schema with default author', () => {
      const course = { name: 'Test Course' };
      const university = { name: 'Test University' };
      
      const schema = generateReviewSchema(
        course,
        university,
        5,
        'Great course!',
        undefined // No author provided
      );
      
      expect(schema.author.name).toBe('Student');
    });
  });
});

  describe('Schema Generation Edge Cases - SEO Overhaul Enhancements', () => {
    describe('Course Schema Edge Cases', () => {
      it('should handle missing optional fields in Course schema', () => {
        const course = {
          name: 'Test Course',
          id: 'test',
          duration: 4,
          annualFees: []
        };
        
        const university = {
          name: 'Test University',
          location: 'Test City'
        };
        
        const schema = generateCourseSchema(course, university, '/test');
        
        // Should still generate valid schema
        expect(schema['@context']).toBe('https://schema.org');
        expect(schema['@type']).toBe('Course');
        expect(schema.offers).toBeDefined();
        expect(schema.offers.price).toBe(0);
        expect(schema.aggregateRating).toBeDefined();
      });

      it('should handle invalid data types in Course schema', () => {
        const course = {
          name: 'Test Course',
          id: 'test',
          duration: 'four', // Invalid type
          annualFees: ['not a number'], // Invalid type
          rating: 'five' // Invalid type
        };
        
        const university = {
          name: 'Test University',
          location: 'Test City'
        };
        
        const schema = generateCourseSchema(course, university, '/test');
        
        // Should still generate schema without crashing
        expect(schema['@context']).toBe('https://schema.org');
        expect(schema['@type']).toBe('Course');
      });

      it('should handle Course with zero fees', () => {
        const course = {
          name: 'Free Course',
          id: 'free',
          duration: 1,
          annualFees: [0, 0, 0, 0]
        };
        
        const university = {
          name: 'Test University',
          location: 'Test City'
        };
        
        const schema = generateCourseSchema(course, university, '/test');
        
        expect(schema.offers.price).toBe(0);
        expect(schema.offers.priceCurrency).toBe('INR');
      });

      it('should handle Course with very high fees', () => {
        const course = {
          name: 'Premium Course',
          id: 'premium',
          duration: 4,
          annualFees: [10000000, 10000000, 10000000, 10000000]
        };
        
        const university = {
          name: 'Test University',
          location: 'Test City'
        };
        
        const schema = generateCourseSchema(course, university, '/test');
        
        expect(schema.offers.price).toBe(10000000);
        expect(typeof schema.offers.price).toBe('number');
      });

      it('should validate Course schema against schema.org specs', () => {
        const course = {
          name: 'B.Tech CS',
          id: 'btech-cs',
          duration: 4,
          annualFees: [200000]
        };
        
        const university = {
          name: 'Test University',
          location: 'Test City'
        };
        
        const schema = generateCourseSchema(course, university, '/test');
        const validation = validateSchema(schema);
        
        expect(validation.isValid).toBe(true);
        expect(validation.errors).toHaveLength(0);
      });
    });

    describe('University Schema Edge Cases', () => {
      it('should handle missing optional fields in University schema', () => {
        const university = {
          name: 'Test University',
          location: 'Test City'
        };
        
        const schema = generateOrganizationSchema(university, '/test');
        
        // Should still generate valid schema
        expect(schema['@context']).toBe('https://schema.org');
        expect(schema['@type']).toBe('EducationalOrganization');
        expect(schema.numberOfStudents).toBeUndefined();
        expect(schema.aggregateRating).toBeUndefined();
      });

      it('should handle invalid data types in University schema', () => {
        const university = {
          name: 'Test University',
          location: 'Test City',
          numberOfStudents: 'many', // Invalid type
          rating: 'high', // Invalid type
          reviewCount: 'lots' // Invalid type
        };
        
        const schema = generateOrganizationSchema(university, '/test');
        
        // Should still generate schema without crashing
        expect(schema['@context']).toBe('https://schema.org');
        expect(schema['@type']).toBe('EducationalOrganization');
      });

      it('should handle University with zero students', () => {
        const university = {
          name: 'New University',
          location: 'Test City',
          numberOfStudents: 0
        };
        
        const schema = generateOrganizationSchema(university, '/test');
        
        // Zero is falsy, so it should be undefined
        expect(schema.numberOfStudents).toBeUndefined();
      });

      it('should handle University with very large student count', () => {
        const university = {
          name: 'Large University',
          location: 'Test City',
          numberOfStudents: 1000000
        };
        
        const schema = generateOrganizationSchema(university, '/test');
        
        expect(schema.numberOfStudents).toBe(1000000);
        expect(typeof schema.numberOfStudents).toBe('number');
      });

      it('should validate University schema against schema.org specs', () => {
        const university = {
          name: 'Test University',
          location: 'Test City',
          website: 'https://test.edu',
          numberOfStudents: 5000,
          rating: 4.5,
          reviewCount: 100
        };
        
        const schema = generateOrganizationSchema(university, '/test');
        const validation = validateSchema(schema);
        
        expect(validation.isValid).toBe(true);
        expect(validation.errors).toHaveLength(0);
      });
    });

    describe('Organization Schema Edge Cases', () => {
      it('should always include aggregateRating in SiteOrganization schema', () => {
        const schema = generateSiteOrganizationSchema();
        
        expect(schema.aggregateRating).toBeDefined();
        expect(schema.aggregateRating['@type']).toBe('AggregateRating');
        expect(schema.aggregateRating.ratingValue).toBeDefined();
        expect(schema.aggregateRating.reviewCount).toBeDefined();
      });

      it('should validate SiteOrganization schema against schema.org specs', () => {
        const schema = generateSiteOrganizationSchema();
        const validation = validateSchema(schema);
        
        expect(validation.isValid).toBe(true);
        expect(validation.errors).toHaveLength(0);
      });

      it('should have consistent aggregateRating values', () => {
        const schema1 = generateSiteOrganizationSchema();
        const schema2 = generateSiteOrganizationSchema();
        
        expect(schema1.aggregateRating.ratingValue).toBe(schema2.aggregateRating.ratingValue);
        expect(schema1.aggregateRating.reviewCount).toBe(schema2.aggregateRating.reviewCount);
      });
    });

    describe('Schema Validation Edge Cases', () => {
      it('should handle schema with circular references', () => {
        const circularSchema = {
          '@context': 'https://schema.org',
          '@type': 'Course',
          name: 'Test'
        };
        circularSchema.self = circularSchema; // Create circular reference
        
        const validation = validateSchema(circularSchema);
        
        expect(validation.isValid).toBe(false);
        expect(validation.errors).toContain('Schema contains circular references');
      });

      it('should handle schema with nested objects', () => {
        const nestedSchema = {
          '@context': 'https://schema.org',
          '@type': 'Course',
          name: 'Test Course',
          description: 'Test',
          provider: {
            '@type': 'Organization',
            name: 'Test University',
            address: {
              '@type': 'PostalAddress',
              addressCountry: 'IN'
            }
          }
        };
        
        const validation = validateSchema(nestedSchema);
        
        expect(validation.isValid).toBe(true);
        expect(validation.errors).toHaveLength(0);
      });

      it('should handle schema with arrays', () => {
        const arraySchema = {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: [
            {
              '@type': 'Question',
              name: 'Q1?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'A1'
              }
            },
            {
              '@type': 'Question',
              name: 'Q2?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'A2'
              }
            }
          ]
        };
        
        const validation = validateSchema(arraySchema);
        
        expect(validation.isValid).toBe(true);
        expect(validation.errors).toHaveLength(0);
      });

      it('should handle schema with special characters', () => {
        const specialCharSchema = {
          '@context': 'https://schema.org',
          '@type': 'Course',
          name: 'Course with "quotes" and \'apostrophes\'',
          description: 'Test & Development <html>',
          provider: {
            '@type': 'Organization',
            name: 'Test'
          }
        };
        
        const validation = validateSchema(specialCharSchema);
        
        expect(validation.isValid).toBe(true);
        expect(validation.errors).toHaveLength(0);
      });

      it('should handle schema with unicode characters', () => {
        const unicodeSchema = {
          '@context': 'https://schema.org',
          '@type': 'Course',
          name: 'Course with émojis 🎓 and ünïcödé',
          description: 'Test',
          provider: {
            '@type': 'Organization',
            name: 'Test'
          }
        };
        
        const validation = validateSchema(unicodeSchema);
        
        expect(validation.isValid).toBe(true);
        expect(validation.errors).toHaveLength(0);
      });

      it('should handle schema with empty strings', () => {
        const emptyStringSchema = {
          '@context': 'https://schema.org',
          '@type': 'Course',
          name: '',
          description: '',
          provider: {
            '@type': 'Organization',
            name: ''
          }
        };
        
        const validation = validateSchema(emptyStringSchema);
        
        // Should still validate structure even with empty strings
        expect(validation.isValid).toBe(true);
      });

      it('should handle schema with null values in optional fields', () => {
        const nullValueSchema = {
          '@context': 'https://schema.org',
          '@type': 'Course',
          name: 'Test',
          description: 'Test',
          provider: {
            '@type': 'Organization',
            name: 'Test'
          },
          rating: null,
          reviewCount: null
        };
        
        const validation = validateSchema(nullValueSchema);
        
        expect(validation.isValid).toBe(true);
      });

      it('should handle schema with very long strings', () => {
        const longString = 'A'.repeat(10000);
        const longStringSchema = {
          '@context': 'https://schema.org',
          '@type': 'Course',
          name: 'Test',
          description: longString,
          provider: {
            '@type': 'Organization',
            name: 'Test'
          }
        };
        
        const validation = validateSchema(longStringSchema);
        
        expect(validation.isValid).toBe(true);
        expect(validation.errors).toHaveLength(0);
      });

      it('should handle schema with deeply nested objects', () => {
        const deeplyNestedSchema = {
          '@context': 'https://schema.org',
          '@type': 'Course',
          name: 'Test',
          description: 'Test',
          provider: {
            '@type': 'Organization',
            name: 'Test',
            address: {
              '@type': 'PostalAddress',
              addressCountry: 'IN',
              addressRegion: {
                name: 'State',
                containedIn: {
                  name: 'Country'
                }
              }
            }
          }
        };
        
        const validation = validateSchema(deeplyNestedSchema);
        
        expect(validation.isValid).toBe(true);
      });
    });
  });
