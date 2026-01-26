/**
 * Property-Based Tests for University Data Structure
 * Feature: sharda-university-rebranding
 * 
 * These tests verify that no WBE-specific fields exist in university data files
 * and that the data structure is clean and consistent.
 */

import { describe, it, expect } from 'vitest';
import fc from 'fast-check';
import { readFileSync } from 'fs';
import { resolve } from 'path';

// University JSON files to test
const UNIVERSITY_FILES = [
  'sharda',
  'chandigarh',
  'galgotias',
  'niu'
];

// WBE-specific field names that should NOT exist
const WBE_FIELD_PATTERNS = [
  'wbeAdditionalFees',
  'wbeRecurring',
  'wbeEnhanced',
  'wbeServices',
  'wbe_',
  'wbe-'
];

/**
 * Helper function to recursively check for WBE fields in an object
 * @param {Object} obj - The object to check
 * @param {string} path - Current path in the object (for error reporting)
 * @returns {Array<string>} - Array of paths where WBE fields were found
 */
function findWBEFields(obj, path = '') {
  const wbeFields = [];
  
  if (obj === null || obj === undefined) {
    return wbeFields;
  }
  
  if (typeof obj !== 'object') {
    return wbeFields;
  }
  
  // Check if this is an array
  if (Array.isArray(obj)) {
    obj.forEach((item, index) => {
      const itemPath = `${path}[${index}]`;
      wbeFields.push(...findWBEFields(item, itemPath));
    });
    return wbeFields;
  }
  
  // Check object keys
  for (const key of Object.keys(obj)) {
    const currentPath = path ? `${path}.${key}` : key;
    
    // Check if the key matches any WBE pattern
    const keyLower = key.toLowerCase();
    const hasWBEPattern = WBE_FIELD_PATTERNS.some(pattern => 
      keyLower.includes(pattern.toLowerCase())
    );
    
    if (hasWBEPattern) {
      wbeFields.push(currentPath);
    }
    
    // Recursively check nested objects
    wbeFields.push(...findWBEFields(obj[key], currentPath));
  }
  
  return wbeFields;
}

/**
 * Helper function to load and parse a university JSON file
 * @param {string} universityId - The university identifier (e.g., 'sharda')
 * @returns {Object} - Parsed JSON object
 */
function loadUniversityData(universityId) {
  const filePath = resolve(process.cwd(), `data/universities/${universityId}.json`);
  const fileContent = readFileSync(filePath, 'utf-8');
  return JSON.parse(fileContent);
}

describe('University Data - Property Tests', () => {
  /**
   * Property 6: WBE Data Structure Absence
   * **Validates: Requirements 2.6, 8.3, 15.3**
   * 
   * For any university JSON data file, the parsed object should not contain 
   * keys named "wbeAdditionalFees", "wbeRecurring", "wbeEnhanced", "wbeServices", 
   * or any other keys starting with "wbe".
   */
  describe('Property 6: WBE Data Structure Absence', () => {
    // Test each university file individually
    UNIVERSITY_FILES.forEach(universityId => {
      it(`should not contain WBE-specific fields in ${universityId}.json`, () => {
        const universityData = loadUniversityData(universityId);
        const wbeFields = findWBEFields(universityData);
        
        expect(wbeFields).toEqual([]);
        
        if (wbeFields.length > 0) {
          console.error(`Found WBE fields in ${universityId}.json:`, wbeFields);
        }
      });
    });

    // Property-based test: Test all universities with 100 iterations
    it('should not contain WBE-specific fields in any university file (property test)', () => {
      fc.assert(
        fc.property(
          fc.constantFrom(...UNIVERSITY_FILES),
          (universityId) => {
            const universityData = loadUniversityData(universityId);
            const wbeFields = findWBEFields(universityData);
            
            // Assert no WBE fields found
            expect(wbeFields).toEqual([]);
            
            return wbeFields.length === 0;
          }
        ),
        { numRuns: 100 }
      );
    });

    // Test specific WBE field patterns
    it('should not contain "wbeAdditionalFees" in any university file', () => {
      UNIVERSITY_FILES.forEach(universityId => {
        const universityData = loadUniversityData(universityId);
        const jsonString = JSON.stringify(universityData);
        
        expect(jsonString).not.toContain('wbeAdditionalFees');
      });
    });

    it('should not contain "wbeRecurring" in any university file', () => {
      UNIVERSITY_FILES.forEach(universityId => {
        const universityData = loadUniversityData(universityId);
        const jsonString = JSON.stringify(universityData);
        
        expect(jsonString).not.toContain('wbeRecurring');
      });
    });

    it('should not contain "wbeEnhanced" in any university file', () => {
      UNIVERSITY_FILES.forEach(universityId => {
        const universityData = loadUniversityData(universityId);
        const jsonString = JSON.stringify(universityData);
        
        expect(jsonString).not.toContain('wbeEnhanced');
      });
    });

    it('should not contain "wbeServices" in any university file', () => {
      UNIVERSITY_FILES.forEach(universityId => {
        const universityData = loadUniversityData(universityId);
        const jsonString = JSON.stringify(universityData);
        
        expect(jsonString).not.toContain('wbeServices');
      });
    });

    // Test that standard fee structure exists (not WBE-specific)
    it('should have standard fee structure without WBE fields in university files', () => {
      UNIVERSITY_FILES.forEach(universityId => {
        const universityData = loadUniversityData(universityId);
        
        // Check if additionalFees exists
        if (universityData.additionalFees) {
          // Should have at least oneTime field
          expect(universityData.additionalFees).toHaveProperty('oneTime');
          
          // Should NOT have WBE fields
          expect(universityData.additionalFees).not.toHaveProperty('wbeAdditionalFees');
          expect(universityData.additionalFees).not.toHaveProperty('wbeRecurring');
        }
      });
    });

    // Test that scholarship tiers don't have WBE fields
    it('should not have "wbeEnhanced" in scholarship tiers', () => {
      UNIVERSITY_FILES.forEach(universityId => {
        const universityData = loadUniversityData(universityId);
        
        if (universityData.scholarships?.bangladeshStudents?.categories) {
          const categories = universityData.scholarships.bangladeshStudents.categories;
          
          Object.values(categories).forEach(category => {
            if (category.tiers && Array.isArray(category.tiers)) {
              category.tiers.forEach(tier => {
                expect(tier).not.toHaveProperty('wbeEnhanced');
              });
            }
          });
        }
      });
    });

    // Property-based test: Verify no keys start with "wbe" (case-insensitive)
    it('should not have any keys starting with "wbe" (case-insensitive)', () => {
      fc.assert(
        fc.property(
          fc.constantFrom(...UNIVERSITY_FILES),
          (universityId) => {
            const universityData = loadUniversityData(universityId);
            const jsonString = JSON.stringify(universityData).toLowerCase();
            
            // Check for any occurrence of "wbe" as a key prefix
            // This regex looks for "wbe" followed by common key patterns
            const wbeKeyPattern = /"wbe[a-z_-]/gi;
            const matches = jsonString.match(wbeKeyPattern);
            
            expect(matches).toBeNull();
            
            return matches === null;
          }
        ),
        { numRuns: 100 }
      );
    });
  });

  /**
   * Property 20: University Data Schema Consistency
   * **Validates: Requirements 8.5**
   * 
   * For any two university JSON files, both should have the same top-level keys:
   * ["id", "name", "shortName", "location", "established", "profile", "scholarships", "additionalFees", "programs"].
   * 
   * Note: Optional fields like "applyUrl" are allowed but all required fields must be present.
   */
  describe('Property 20: University Data Schema Consistency', () => {
    // Required top-level fields that must exist in all university files
    const REQUIRED_SCHEMA_FIELDS = [
      'id',
      'name',
      'shortName',
      'location',
      'established',
      'profile',
      'scholarships',
      'additionalFees',
      'programs'
    ];

    // Optional fields that may exist in some universities
    const OPTIONAL_SCHEMA_FIELDS = [
      'applyUrl'
    ];

    it('should have all required top-level fields in every university file', () => {
      UNIVERSITY_FILES.forEach(universityId => {
        const universityData = loadUniversityData(universityId);
        const actualKeys = Object.keys(universityData);
        
        REQUIRED_SCHEMA_FIELDS.forEach(requiredField => {
          expect(actualKeys).toContain(requiredField);
        });
      });
    });

    it('should only have known fields (required or optional) in university files', () => {
      const allowedFields = [...REQUIRED_SCHEMA_FIELDS, ...OPTIONAL_SCHEMA_FIELDS];
      
      UNIVERSITY_FILES.forEach(universityId => {
        const universityData = loadUniversityData(universityId);
        const actualKeys = Object.keys(universityData);
        
        actualKeys.forEach(key => {
          expect(allowedFields).toContain(key);
        });
      });
    });

    // Property-based test: Test schema consistency across all university pairs
    it('should have consistent schema across all university files (property test)', () => {
      fc.assert(
        fc.property(
          fc.constantFrom(...UNIVERSITY_FILES),
          fc.constantFrom(...UNIVERSITY_FILES),
          (universityId1, universityId2) => {
            const data1 = loadUniversityData(universityId1);
            const data2 = loadUniversityData(universityId2);
            
            const keys1 = Object.keys(data1);
            const keys2 = Object.keys(data2);
            
            // Both should have all required fields
            REQUIRED_SCHEMA_FIELDS.forEach(field => {
              expect(keys1).toContain(field);
              expect(keys2).toContain(field);
            });
            
            // All keys should be either required or optional
            const allowedFields = [...REQUIRED_SCHEMA_FIELDS, ...OPTIONAL_SCHEMA_FIELDS];
            keys1.forEach(key => {
              expect(allowedFields).toContain(key);
            });
            keys2.forEach(key => {
              expect(allowedFields).toContain(key);
            });
            
            return true;
          }
        ),
        { numRuns: 100 }
      );
    });

    // Test that each required field has the correct type
    it('should have correct data types for required fields', () => {
      UNIVERSITY_FILES.forEach(universityId => {
        const universityData = loadUniversityData(universityId);
        
        // id should be a string
        expect(typeof universityData.id).toBe('string');
        expect(universityData.id.length).toBeGreaterThan(0);
        
        // name should be a string
        expect(typeof universityData.name).toBe('string');
        expect(universityData.name.length).toBeGreaterThan(0);
        
        // shortName should be a string
        expect(typeof universityData.shortName).toBe('string');
        expect(universityData.shortName.length).toBeGreaterThan(0);
        
        // location should be a string
        expect(typeof universityData.location).toBe('string');
        expect(universityData.location.length).toBeGreaterThan(0);
        
        // established should be a number
        expect(typeof universityData.established).toBe('number');
        expect(universityData.established).toBeGreaterThan(1900);
        expect(universityData.established).toBeLessThanOrEqual(new Date().getFullYear());
        
        // profile should be an object
        expect(typeof universityData.profile).toBe('object');
        expect(universityData.profile).not.toBeNull();
        expect(Array.isArray(universityData.profile)).toBe(false);
        
        // scholarships should be an object
        expect(typeof universityData.scholarships).toBe('object');
        expect(universityData.scholarships).not.toBeNull();
        expect(Array.isArray(universityData.scholarships)).toBe(false);
        
        // additionalFees should be an object
        expect(typeof universityData.additionalFees).toBe('object');
        expect(universityData.additionalFees).not.toBeNull();
        expect(Array.isArray(universityData.additionalFees)).toBe(false);
        
        // programs should be an array
        expect(Array.isArray(universityData.programs)).toBe(true);
      });
    });

    // Property-based test: Verify data type consistency
    it('should have consistent data types across all universities (property test)', () => {
      fc.assert(
        fc.property(
          fc.constantFrom(...UNIVERSITY_FILES),
          (universityId) => {
            const data = loadUniversityData(universityId);
            
            // Verify types
            const typeChecks = [
              typeof data.id === 'string',
              typeof data.name === 'string',
              typeof data.shortName === 'string',
              typeof data.location === 'string',
              typeof data.established === 'number',
              typeof data.profile === 'object' && !Array.isArray(data.profile),
              typeof data.scholarships === 'object' && !Array.isArray(data.scholarships),
              typeof data.additionalFees === 'object' && !Array.isArray(data.additionalFees),
              Array.isArray(data.programs)
            ];
            
            // All type checks should pass
            expect(typeChecks.every(check => check === true)).toBe(true);
            
            return typeChecks.every(check => check === true);
          }
        ),
        { numRuns: 100 }
      );
    });

    // Test nested structure consistency for profile
    it('should have consistent profile structure across all universities', () => {
      UNIVERSITY_FILES.forEach(universityId => {
        const universityData = loadUniversityData(universityId);
        
        // profile should have rankings
        expect(universityData.profile).toHaveProperty('rankings');
        expect(typeof universityData.profile.rankings).toBe('object');
        
        // profile should have highlights
        expect(universityData.profile).toHaveProperty('highlights');
        expect(Array.isArray(universityData.profile.highlights)).toBe(true);
        
        // profile should have facilities
        expect(universityData.profile).toHaveProperty('facilities');
        expect(typeof universityData.profile.facilities).toBe('object');
      });
    });

    // Test that Sharda has the applyUrl field
    it('should have Sharda University with applyUrl field', () => {
      const shardaData = loadUniversityData('sharda');
      
      expect(shardaData).toHaveProperty('applyUrl');
      expect(shardaData.applyUrl).toBe('https://bit.ly/4pZTRTs');
      expect(typeof shardaData.applyUrl).toBe('string');
    });

    // Test that applyUrl is a valid URL when present
    it('should have valid applyUrl format when present', () => {
      UNIVERSITY_FILES.forEach(universityId => {
        const universityData = loadUniversityData(universityId);
        
        if (universityData.applyUrl) {
          expect(typeof universityData.applyUrl).toBe('string');
          expect(universityData.applyUrl).toMatch(/^https?:\/\/.+/);
        }
      });
    });
  });

  /**
   * Additional validation tests for data structure integrity
   */
  describe('Data Structure Validation', () => {
    it('should have valid JSON structure in all university files', () => {
      UNIVERSITY_FILES.forEach(universityId => {
        expect(() => {
          loadUniversityData(universityId);
        }).not.toThrow();
      });
    });
  });
});
