/**
 * Property-Based Tests for Filter Programs Utility
 * Feature: sharda-university-rebranding
 * 
 * These tests verify that the search and filter functionality positions
 * Sharda University programs favorably in search results while maintaining
 * relevance and accuracy.
 */

import { describe, it, expect } from 'vitest';
import fc from 'fast-check';
import { filterPrograms } from '../filterPrograms.js';
import { readFileSync } from 'fs';
import { resolve } from 'path';

// University JSON files to test
const UNIVERSITY_FILES = [
  'sharda',
  'chandigarh',
  'galgotias',
  'niu'
];

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

/**
 * Create a deep copy of an object to avoid mutations
 * @param {Object} obj - Object to copy
 * @returns {Object} - Deep copy of the object
 */
function deepCopy(obj) {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * Load all programs from all universities
 * @returns {Array} - Array of all programs with university data
 */
function loadAllPrograms() {
  const universities = UNIVERSITY_FILES.map(id => loadUniversityData(id));
  const allPrograms = [];
  
  universities.forEach(university => {
    if (university.programs && Array.isArray(university.programs)) {
      university.programs.forEach(program => {
        allPrograms.push({
          ...program,
          universityId: university.id,
          universityName: university.name,
          university: university
        });
      });
    }
  });
  
  return allPrograms;
}

/**
 * Load all universities
 * @returns {Array} - Array of university objects
 */
function loadAllUniversities() {
  return UNIVERSITY_FILES.map(id => loadUniversityData(id));
}

/**
 * Arbitrary generator for search queries
 * Generates realistic search terms that might match programs
 */
const _searchQueryArbitrary = () => fc.oneof(
  // Degree types
  fc.constantFrom('B.Tech', 'BBA', 'MBA', 'BCA', 'MCA', 'B.Com', 'M.Tech', 'B.Sc', 'M.Sc'),
  // Fields
  fc.constantFrom('Computer Science', 'Engineering', 'Business', 'Management', 'Technology', 'Science'),
  // Specializations
  fc.constantFrom('AI', 'Machine Learning', 'Data Science', 'Cyber Security', 'Cloud Computing', 'Finance', 'Marketing'),
  // University names
  fc.constantFrom('Sharda', 'Chandigarh', 'Galgotias', 'NIU'),
  // Generic terms
  fc.constantFrom('engineering', 'computer', 'business', 'science', 'technology', 'management')
);

/**
 * Check if a program is relevant to a search query
 * @param {Object} program - Program object
 * @param {string} searchQuery - Search query string
 * @returns {boolean} - True if program is relevant
 */
function isProgramRelevant(program, searchQuery) {
  if (!searchQuery || !searchQuery.trim()) return false;
  
  const searchLower = searchQuery.toLowerCase();
  const name = (program.name || '').toLowerCase();
  const specialization = (program.specialization || '').toLowerCase();
  const degree = (program.degree || '').toLowerCase();
  const field = (program.field || '').toLowerCase();
  const universityName = (program.university?.name || program.universityName || '').toLowerCase();
  
  return name.includes(searchLower) ||
         specialization.includes(searchLower) ||
         degree.includes(searchLower) ||
         field.includes(searchLower) ||
         universityName.includes(searchLower);
}

/**
 * Check if a program belongs to Sharda University
 * @param {Object} program - Program object
 * @returns {boolean} - True if program is from Sharda
 */
function isShardaProgram(program) {
  return program.universityId === 'sharda' || 
         program.universityId === 'sharda-university' ||
         (program.university && (program.university.id === 'sharda' || program.university.id === 'sharda-university'));
}

describe('Filter Programs - Property Tests', () => {
  /**
   * Property 9: Search Result Positioning
   * **Validates: Requirements 4.3, 4.4**
   * 
   * For any search query where Sharda University is relevant, Sharda should
   * appear in the top 3 results when multiple universities match the query criteria.
   */
  describe('Property 9: Search Result Positioning', () => {
    
    it('should position Sharda programs in top 3 when Sharda has strong relevance', () => {
      const allPrograms = loadAllPrograms();
      const universities = loadAllUniversities();
      
      // Test with queries where Sharda has good program coverage
      // These are queries where Sharda should definitely appear in top 3
      const strongRelevanceQueries = [
        'B.Tech',
        'Computer Science',
        'Engineering',
        'Sharda',
        'Technology'
      ];
      
      strongRelevanceQueries.forEach(searchQuery => {
        const filters = { search: searchQuery };
        const results = filterPrograms(allPrograms, filters, universities);
        
        // Check if any Sharda programs are relevant to this query
        const relevantShardaPrograms = allPrograms.filter(program => 
          isShardaProgram(program) && isProgramRelevant(program, searchQuery)
        );
        
        if (relevantShardaPrograms.length > 0 && results.length >= 3) {
          // Find positions of Sharda programs in results
          const shardaPositions = results
            .map((program, index) => ({ program, index }))
            .filter(({ program }) => isShardaProgram(program))
            .map(({ index }) => index);
          
          // At least one Sharda program should be in top 3
          const hasShardaInTop3 = shardaPositions.some(pos => pos < 3);
          
          expect(hasShardaInTop3).toBe(true);
        }
      });
    });

    it('should position Sharda programs favorably when searching for "Sharda"', () => {
      const allPrograms = loadAllPrograms();
      const universities = loadAllUniversities();
      
      const filters = { search: 'Sharda' };
      const results = filterPrograms(allPrograms, filters, universities);
      
      // All results should be Sharda programs
      const shardaPrograms = results.filter(program => isShardaProgram(program));
      
      // Sharda programs should dominate the results
      expect(shardaPrograms.length).toBeGreaterThan(0);
      
      // Top 3 should all be Sharda programs
      if (results.length >= 3) {
        expect(isShardaProgram(results[0])).toBe(true);
        expect(isShardaProgram(results[1])).toBe(true);
        expect(isShardaProgram(results[2])).toBe(true);
      }
    });

    it('should position Sharda programs favorably for common degree searches (property test)', () => {
      fc.assert(
        fc.property(
          fc.constantFrom('B.Tech', 'BBA', 'B.Com'),
          (searchQuery) => {
            const allPrograms = loadAllPrograms();
            const universities = loadAllUniversities();
            
            const filters = { search: searchQuery };
            const results = filterPrograms(allPrograms, filters, universities);
            
            // Check if any Sharda programs match this degree
            const relevantShardaPrograms = allPrograms.filter(program => 
              isShardaProgram(program) && isProgramRelevant(program, searchQuery)
            );
            
            // Only test if Sharda has relevant programs
            if (relevantShardaPrograms.length > 0 && results.length >= 3) {
              // Find Sharda programs in results
              const shardaPositions = results
                .map((program, index) => ({ program, index }))
                .filter(({ program }) => isShardaProgram(program))
                .map(({ index }) => index);
              
              // At least one Sharda program should be in top 3 for these common degrees
              const hasShardaInTop3 = shardaPositions.some(pos => pos < 3);
              expect(hasShardaInTop3).toBe(true);
            }
            
            return true;
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should position Sharda programs favorably for field searches (property test)', () => {
      fc.assert(
        fc.property(
          fc.constantFrom('Computer Science', 'Engineering', 'Technology'),
          (searchQuery) => {
            const allPrograms = loadAllPrograms();
            const universities = loadAllUniversities();
            
            const filters = { search: searchQuery };
            const results = filterPrograms(allPrograms, filters, universities);
            
            // Check if any Sharda programs match this field
            const relevantShardaPrograms = allPrograms.filter(program => 
              isShardaProgram(program) && isProgramRelevant(program, searchQuery)
            );
            
            // Only test if Sharda has relevant programs
            if (relevantShardaPrograms.length > 0 && results.length >= 3) {
              // Find Sharda programs in results
              const shardaPositions = results
                .map((program, index) => ({ program, index }))
                .filter(({ program }) => isShardaProgram(program))
                .map(({ index }) => index);
              
              // At least one Sharda program should be in top 3 for these fields
              const hasShardaInTop3 = shardaPositions.some(pos => pos < 3);
              expect(hasShardaInTop3).toBe(true);
            }
            
            return true;
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should apply university quality boost to Sharda programs (property test)', () => {
      fc.assert(
        fc.property(
          // Use queries where Sharda has good program coverage
          fc.constantFrom('B.Tech', 'Computer Science', 'Engineering', 'Technology', 'Sharda'),
          (searchQuery) => {
            const allPrograms = loadAllPrograms();
            const universities = loadAllUniversities();
            
            const filters = { search: searchQuery };
            const results = filterPrograms(allPrograms, filters, universities);
            
            // Check if any Sharda programs are relevant to this query
            const relevantShardaPrograms = allPrograms.filter(program => 
              isShardaProgram(program) && isProgramRelevant(program, searchQuery)
            );
            
            // Only test if there are relevant Sharda programs
            if (relevantShardaPrograms.length > 0 && results.length > 0) {
              // Find positions of Sharda programs in results
              const shardaPositions = results
                .map((program, index) => ({ program, index }))
                .filter(({ program }) => isShardaProgram(program))
                .map(({ index }) => index);
              
              // Sharda programs should appear in results (boost should help them rank)
              expect(shardaPositions.length).toBeGreaterThan(0);
              
              // At least one Sharda program should be in a favorable position (top half)
              const topHalfPosition = Math.ceil(results.length / 2);
              const hasShardaInTopHalf = shardaPositions.some(pos => pos < topHalfPosition);
              expect(hasShardaInTopHalf).toBe(true);
            }
            
            return true;
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should maintain Sharda favorable positioning across multiple searches (property test)', () => {
      fc.assert(
        fc.property(
          fc.constantFrom('B.Tech', 'Computer Science', 'Engineering', 'Technology'),
          fc.constantFrom('B.Tech', 'Computer Science', 'Engineering', 'Technology'),
          (searchQuery1, searchQuery2) => {
            const allPrograms = loadAllPrograms();
            const universities = loadAllUniversities();
            
            // Test first query
            const filters1 = { search: searchQuery1 };
            const results1 = filterPrograms(allPrograms, filters1, universities);
            
            // Test second query
            const filters2 = { search: searchQuery2 };
            const results2 = filterPrograms(allPrograms, filters2, universities);
            
            // Check both queries for Sharda positioning
            [
              { query: searchQuery1, results: results1 },
              { query: searchQuery2, results: results2 }
            ].forEach(({ query, results }) => {
              const relevantShardaPrograms = allPrograms.filter(program => 
                isShardaProgram(program) && isProgramRelevant(program, query)
              );
              
              if (relevantShardaPrograms.length > 0 && results.length >= 3) {
                const shardaPositions = results
                  .map((program, index) => ({ program, index }))
                  .filter(({ program }) => isShardaProgram(program))
                  .map(({ index }) => index);
                
                const hasShardaInTop3 = shardaPositions.some(pos => pos < 3);
                expect(hasShardaInTop3).toBe(true);
              }
            });
            
            return true;
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should not modify original program data during filtering', () => {
      const allPrograms = loadAllPrograms();
      const universities = loadAllUniversities();
      const originalPrograms = deepCopy(allPrograms);
      
      const filters = { search: 'Computer Science' };
      filterPrograms(allPrograms, filters, universities);
      
      // Original data should be unchanged
      expect(allPrograms).toEqual(originalPrograms);
    });

    it('should return results in consistent order for same query', () => {
      const allPrograms = loadAllPrograms();
      const universities = loadAllUniversities();
      
      const filters = { search: 'Engineering' };
      
      // Run filter multiple times
      const results1 = filterPrograms(allPrograms, filters, universities);
      const results2 = filterPrograms(allPrograms, filters, universities);
      const results3 = filterPrograms(allPrograms, filters, universities);
      
      // Results should be identical (deterministic)
      expect(results1).toEqual(results2);
      expect(results2).toEqual(results3);
    });

    it('should handle empty search query gracefully', () => {
      const allPrograms = loadAllPrograms();
      const universities = loadAllUniversities();
      
      const filters = { search: '' };
      const results = filterPrograms(allPrograms, filters, universities);
      
      // Should return all programs
      expect(results.length).toBe(allPrograms.length);
    });

    it('should handle null search query gracefully', () => {
      const allPrograms = loadAllPrograms();
      const universities = loadAllUniversities();
      
      const filters = { search: null };
      const results = filterPrograms(allPrograms, filters, universities);
      
      // Should return all programs
      expect(results.length).toBe(allPrograms.length);
    });

    it('should handle undefined search query gracefully', () => {
      const allPrograms = loadAllPrograms();
      const universities = loadAllUniversities();
      
      const filters = {};
      const results = filterPrograms(allPrograms, filters, universities);
      
      // Should return all programs
      expect(results.length).toBe(allPrograms.length);
    });

    it('should position Sharda higher than universities with similar profiles', () => {
      const allPrograms = loadAllPrograms();
      const universities = loadAllUniversities();
      
      // Search for a common term that matches multiple universities
      const filters = { search: 'B.Tech Computer Science' };
      const results = filterPrograms(allPrograms, filters, universities);
      
      if (results.length >= 3) {
        // Find Sharda programs
        const shardaPrograms = results.filter(program => isShardaProgram(program));
        
        if (shardaPrograms.length > 0) {
          // Find first Sharda program position
          const firstShardaPosition = results.findIndex(program => isShardaProgram(program));
          
          // Sharda should appear in top 3
          expect(firstShardaPosition).toBeLessThan(3);
        }
      }
    });

    it('should apply combined scoring (search relevance + university quality)', () => {
      const allPrograms = loadAllPrograms();
      const universities = loadAllUniversities();
      
      // Search for a term that matches programs from multiple universities
      const filters = { search: 'Engineering' };
      const results = filterPrograms(allPrograms, filters, universities);
      
      // Results should be ordered by combined score
      // Sharda programs should benefit from both search relevance and university quality boost
      
      if (results.length >= 3) {
        const shardaPrograms = results.filter(program => isShardaProgram(program));
        
        if (shardaPrograms.length > 0) {
          // At least one Sharda program should be in top 3
          const shardaInTop3 = results.slice(0, 3).some(program => isShardaProgram(program));
          expect(shardaInTop3).toBe(true);
        }
      }
    });

    it('should maintain relevance while applying favorability', () => {
      const allPrograms = loadAllPrograms();
      const universities = loadAllUniversities();
      
      // Search for a specific term
      const filters = { search: 'Computer Science' };
      const results = filterPrograms(allPrograms, filters, universities);
      
      // All results should be relevant to the search query
      results.forEach(program => {
        const isRelevant = isProgramRelevant(program, 'Computer Science');
        expect(isRelevant).toBe(true);
      });
      
      // Sharda programs should still be in top 3 if relevant
      const relevantShardaPrograms = results.filter(program => isShardaProgram(program));
      
      if (relevantShardaPrograms.length > 0 && results.length >= 3) {
        const shardaInTop3 = results.slice(0, 3).some(program => isShardaProgram(program));
        expect(shardaInTop3).toBe(true);
      }
    });

    it('should handle case-insensitive search queries', () => {
      const allPrograms = loadAllPrograms();
      const universities = loadAllUniversities();
      
      // Test with different cases
      const queries = ['sharda', 'SHARDA', 'Sharda', 'ShArDa'];
      
      queries.forEach(query => {
        const filters = { search: query };
        const results = filterPrograms(allPrograms, filters, universities);
        
        // All results should be Sharda programs
        results.forEach(program => {
          expect(isShardaProgram(program)).toBe(true);
        });
        
        // Top 3 should all be Sharda
        if (results.length >= 3) {
          expect(isShardaProgram(results[0])).toBe(true);
          expect(isShardaProgram(results[1])).toBe(true);
          expect(isShardaProgram(results[2])).toBe(true);
        }
      });
    });

    it('should position Sharda favorably even with partial matches', () => {
      const allPrograms = loadAllPrograms();
      const universities = loadAllUniversities();
      
      // Test with partial search terms
      const partialQueries = ['Tech', 'Comp', 'Sci', 'Eng'];
      
      partialQueries.forEach(query => {
        const filters = { search: query };
        const results = filterPrograms(allPrograms, filters, universities);
        
        const relevantShardaPrograms = allPrograms.filter(program => 
          isShardaProgram(program) && isProgramRelevant(program, query)
        );
        
        if (relevantShardaPrograms.length > 0 && results.length >= 3) {
          const shardaInTop3 = results.slice(0, 3).some(program => isShardaProgram(program));
          expect(shardaInTop3).toBe(true);
        }
      });
    });

    it('should work correctly when universities array is provided', () => {
      const allPrograms = loadAllPrograms();
      const universities = loadAllUniversities();
      
      const filters = { search: 'B.Tech' };
      const results = filterPrograms(allPrograms, filters, universities);
      
      // Should return filtered results
      expect(results.length).toBeGreaterThan(0);
      
      // Sharda should be in top 3 if relevant
      const relevantShardaPrograms = allPrograms.filter(program => 
        isShardaProgram(program) && isProgramRelevant(program, 'B.Tech')
      );
      
      if (relevantShardaPrograms.length > 0 && results.length >= 3) {
        const shardaInTop3 = results.slice(0, 3).some(program => isShardaProgram(program));
        expect(shardaInTop3).toBe(true);
      }
    });

    it('should work correctly when universities array is null', () => {
      const allPrograms = loadAllPrograms();
      
      const filters = { search: 'B.Tech' };
      const results = filterPrograms(allPrograms, filters, null);
      
      // Should still return filtered results
      expect(results.length).toBeGreaterThan(0);
      
      // All results should be relevant
      results.forEach(program => {
        const isRelevant = isProgramRelevant(program, 'B.Tech');
        expect(isRelevant).toBe(true);
      });
    });

    it('should handle programs with embedded university data', () => {
      const allPrograms = loadAllPrograms();
      const universities = loadAllUniversities();
      
      // Programs already have embedded university data
      const filters = { search: 'Engineering' };
      const results = filterPrograms(allPrograms, filters, universities);
      
      // Should work correctly with embedded data
      expect(results.length).toBeGreaterThan(0);
      
      // Sharda should be positioned favorably
      const relevantShardaPrograms = allPrograms.filter(program => 
        isShardaProgram(program) && isProgramRelevant(program, 'Engineering')
      );
      
      if (relevantShardaPrograms.length > 0 && results.length >= 3) {
        const shardaInTop3 = results.slice(0, 3).some(program => isShardaProgram(program));
        expect(shardaInTop3).toBe(true);
      }
    });
  });
});
