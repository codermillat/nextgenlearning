import { describe, it, expect } from 'vitest';
import fc from 'fast-check';
import {
  getRelatedCourses,
  getPopularComparisons,
  getTopUniversities,
  calculateRelevance,
  ensurePageReachability
} from '../linkingStrategy';

// Feature: seo-overhaul, Property 7: Related Courses Minimum Count
describe('Property 7: Related Courses Minimum Count', () => {
  it('should always return at least 3 related courses when sufficient courses exist', () => {
    fc.assert(
      fc.property(
        // Generate a course ID
        fc.string({ minLength: 3, maxLength: 20 }),
        // Generate an array of at least 5 courses
        fc.array(
          fc.record({
            id: fc.string({ minLength: 3, maxLength: 20 }),
            name: fc.string({ minLength: 10, maxLength: 50 }),
            degree: fc.constantFrom('B.Tech', 'M.Tech', 'BCA', 'MCA', 'MBA', 'B.Sc'),
            field: fc.constantFrom('Engineering', 'Management', 'Science', 'Commerce'),
            discipline: fc.constantFrom('Computer Science', 'Information Technology', 'Business', 'Data Science'),
            university: fc.string({ minLength: 5, maxLength: 30 }),
            universityId: fc.string({ minLength: 3, maxLength: 15 })
          }),
          { minLength: 5, maxLength: 20 }
        ),
        (courseId, allCourses) => {
          // Ensure the source course exists in the array
          const sourceCourse = {
            id: courseId,
            name: 'Test Course',
            degree: 'B.Tech',
            field: 'Engineering',
            discipline: 'Computer Science',
            university: 'Test University',
            universityId: 'test-uni'
          };
          
          const coursesWithSource = [sourceCourse, ...allCourses];
          
          // Get related courses
          const relatedCourses = getRelatedCourses(courseId, 3, coursesWithSource);
          
          // Should return at least 3 courses
          expect(relatedCourses.length).toBeGreaterThanOrEqual(3);
          
          // Each related course should have required properties
          relatedCourses.forEach(course => {
            expect(course).toHaveProperty('title');
            expect(course).toHaveProperty('url');
            expect(course).toHaveProperty('anchorText');
            expect(course).toHaveProperty('relevanceScore');
            expect(course).toHaveProperty('category');
            
            // Title and anchor text should be non-empty strings
            expect(typeof course.title).toBe('string');
            expect(course.title.length).toBeGreaterThan(0);
            expect(typeof course.anchorText).toBe('string');
            expect(course.anchorText.length).toBeGreaterThan(0);
            
            // URL should be a valid path
            expect(course.url).toMatch(/^\/universities\/.+\/courses\/.+$/);
          });
        }
      ),
      { numRuns: 100 }
    );
  });
  
  it('should return at least 3 courses even with limit parameter variations', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 3, maxLength: 20 }),
        fc.integer({ min: 1, max: 10 }), // limit parameter
        fc.array(
          fc.record({
            id: fc.string({ minLength: 3, maxLength: 20 }),
            name: fc.string({ minLength: 10, maxLength: 50 }),
            degree: fc.constantFrom('B.Tech', 'MBA', 'BCA'),
            field: fc.constantFrom('Engineering', 'Management'),
            university: fc.string({ minLength: 5, maxLength: 30 }),
            universityId: fc.string({ minLength: 3, maxLength: 15 })
          }),
          { minLength: 5, maxLength: 15 }
        ),
        (courseId, limit, allCourses) => {
          const sourceCourse = {
            id: courseId,
            name: 'Source Course',
            degree: 'B.Tech',
            field: 'Engineering',
            university: 'Test University',
            universityId: 'test-uni'
          };
          
          const coursesWithSource = [sourceCourse, ...allCourses];
          const relatedCourses = getRelatedCourses(courseId, limit, coursesWithSource);
          
          // Should return at least 3 courses regardless of limit
          expect(relatedCourses.length).toBeGreaterThanOrEqual(Math.min(3, coursesWithSource.length - 1));
        }
      ),
      { numRuns: 100 }
    );
  });
  
  it('should handle edge case with insufficient courses gracefully', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 3, maxLength: 20 }),
        fc.array(
          fc.record({
            id: fc.string({ minLength: 3, maxLength: 20 }),
            name: fc.string({ minLength: 10, maxLength: 50 }),
            degree: fc.constantFrom('B.Tech', 'MBA'),
            field: fc.constantFrom('Engineering', 'Management'),
            university: fc.string({ minLength: 5, maxLength: 30 }),
            universityId: fc.string({ minLength: 3, maxLength: 15 })
          }),
          { minLength: 0, maxLength: 2 } // Very few courses
        ),
        (courseId, allCourses) => {
          const sourceCourse = {
            id: courseId,
            name: 'Source Course',
            degree: 'B.Tech',
            field: 'Engineering',
            university: 'Test University',
            universityId: 'test-uni'
          };
          
          const coursesWithSource = [sourceCourse, ...allCourses];
          const relatedCourses = getRelatedCourses(courseId, 3, coursesWithSource);
          
          // Should return as many as available (up to 3)
          expect(relatedCourses.length).toBeLessThanOrEqual(3);
          expect(relatedCourses.length).toBeLessThanOrEqual(coursesWithSource.length - 1);
        }
      ),
      { numRuns: 100 }
    );
  });
});

// Feature: seo-overhaul, Property 8: Internal Link Anchor Text Quality
describe('Property 8: Internal Link Anchor Text Quality', () => {
  it('should generate non-empty anchor text with at least 3 characters for all links', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 3, maxLength: 20 }),
        fc.array(
          fc.record({
            id: fc.string({ minLength: 3, maxLength: 20 }),
            name: fc.string({ minLength: 10, maxLength: 50 }),
            degree: fc.constantFrom('B.Tech', 'MBA', 'BCA', 'MCA'),
            field: fc.constantFrom('Engineering', 'Management', 'Science'),
            discipline: fc.constantFrom('Computer Science', 'Business', 'Data Science'),
            university: fc.string({ minLength: 5, maxLength: 30 }),
            universityId: fc.string({ minLength: 3, maxLength: 15 })
          }),
          { minLength: 5, maxLength: 15 }
        ),
        (courseId, allCourses) => {
          const sourceCourse = {
            id: courseId,
            name: 'Test Course Name',
            degree: 'B.Tech',
            field: 'Engineering',
            university: 'Test University',
            universityId: 'test-uni'
          };
          
          const coursesWithSource = [sourceCourse, ...allCourses];
          const relatedCourses = getRelatedCourses(courseId, 5, coursesWithSource);
          
          // Check anchor text quality for all returned links
          relatedCourses.forEach(course => {
            expect(course.anchorText).toBeDefined();
            expect(typeof course.anchorText).toBe('string');
            expect(course.anchorText.length).toBeGreaterThanOrEqual(3);
            
            // Anchor text should not be just whitespace
            expect(course.anchorText.trim().length).toBeGreaterThanOrEqual(3);
          });
        }
      ),
      { numRuns: 100 }
    );
  });
  
  it('should generate descriptive anchor text for popular comparisons', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 1, max: 10 }),
        (limit) => {
          const comparisons = getPopularComparisons(limit);
          
          // All comparisons should have quality anchor text
          comparisons.forEach(comparison => {
            expect(comparison.anchorText).toBeDefined();
            expect(typeof comparison.anchorText).toBe('string');
            expect(comparison.anchorText.length).toBeGreaterThanOrEqual(3);
            
            // Should contain descriptive words
            expect(comparison.anchorText.toLowerCase()).toMatch(/compare|programs?|courses?/);
          });
        }
      ),
      { numRuns: 100 }
    );
  });
  
  it('should generate descriptive anchor text for top universities', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 1, max: 10 }),
        fc.array(
          fc.record({
            id: fc.string({ minLength: 3, maxLength: 15 }),
            name: fc.string({ minLength: 10, maxLength: 40 }),
            profile: fc.record({
              rankings: fc.record({
                nirf: fc.option(fc.string({ minLength: 3, maxLength: 10 })),
                naac: fc.option(fc.constantFrom('A+', 'A++', 'A', 'B+'))
              })
            })
          }),
          { minLength: 3, maxLength: 10 }
        ),
        (limit, universities) => {
          const topUniversities = getTopUniversities(limit, universities);
          
          // All universities should have quality anchor text
          topUniversities.forEach(university => {
            expect(university.anchorText).toBeDefined();
            expect(typeof university.anchorText).toBe('string');
            expect(university.anchorText.length).toBeGreaterThanOrEqual(3);
            
            // Should not be just whitespace
            expect(university.anchorText.trim().length).toBeGreaterThanOrEqual(3);
          });
        }
      ),
      { numRuns: 100 }
    );
  });
});

// Feature: seo-overhaul, Property 9: Link Relevance Ordering
describe('Property 9: Link Relevance Ordering', () => {
  it('should order related courses by relevance score (highest first)', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 3, maxLength: 20 }),
        fc.array(
          fc.record({
            id: fc.string({ minLength: 3, maxLength: 20 }),
            name: fc.string({ minLength: 10, maxLength: 50 }),
            degree: fc.constantFrom('B.Tech', 'M.Tech', 'BCA', 'MCA', 'MBA'),
            field: fc.constantFrom('Engineering', 'Management', 'Science'),
            discipline: fc.constantFrom('Computer Science', 'Information Technology', 'Business', 'Data Science'),
            university: fc.string({ minLength: 5, maxLength: 30 }),
            universityId: fc.string({ minLength: 3, maxLength: 15 })
          }),
          { minLength: 5, maxLength: 15 }
        ),
        (courseId, allCourses) => {
          const sourceCourse = {
            id: courseId,
            name: 'Source Course',
            degree: 'B.Tech',
            field: 'Engineering',
            discipline: 'Computer Science',
            university: 'Source University',
            universityId: 'source-uni'
          };
          
          const coursesWithSource = [sourceCourse, ...allCourses];
          const relatedCourses = getRelatedCourses(courseId, 10, coursesWithSource);
          
          // Check that courses are ordered by relevance score (descending)
          for (let i = 0; i < relatedCourses.length - 1; i++) {
            const currentScore = relatedCourses[i].relevanceScore;
            const nextScore = relatedCourses[i + 1].relevanceScore;
            
            // Current score should be >= next score (descending order)
            expect(currentScore).toBeGreaterThanOrEqual(nextScore);
          }
        }
      ),
      { numRuns: 100 }
    );
  });
  
  it('should prioritize relevance over recency (no date-based ordering)', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 3, maxLength: 20 }),
        fc.array(
          fc.record({
            id: fc.string({ minLength: 3, maxLength: 20 }),
            name: fc.string({ minLength: 10, maxLength: 50 }),
            degree: fc.constantFrom('B.Tech', 'MBA'),
            field: fc.constantFrom('Engineering', 'Management'),
            discipline: fc.constantFrom('Computer Science', 'Business'),
            university: fc.string({ minLength: 5, maxLength: 30 }),
            universityId: fc.string({ minLength: 3, maxLength: 15 }),
            // Add date fields that should NOT affect ordering
            createdAt: fc.date(),
            updatedAt: fc.date()
          }),
          { minLength: 5, maxLength: 15 }
        ),
        (courseId, allCourses) => {
          const sourceCourse = {
            id: courseId,
            name: 'Source Course',
            degree: 'B.Tech',
            field: 'Engineering',
            discipline: 'Computer Science',
            university: 'Source University',
            universityId: 'source-uni',
            createdAt: new Date('2020-01-01')
          };
          
          const coursesWithSource = [sourceCourse, ...allCourses];
          const relatedCourses = getRelatedCourses(courseId, 10, coursesWithSource);
          
          // Verify ordering is by relevance score, not by date
          for (let i = 0; i < relatedCourses.length - 1; i++) {
            const currentScore = relatedCourses[i].relevanceScore;
            const nextScore = relatedCourses[i + 1].relevanceScore;
            
            // Relevance-based ordering should be maintained
            expect(currentScore).toBeGreaterThanOrEqual(nextScore);
          }
        }
      ),
      { numRuns: 100 }
    );
  });
  
  it('should calculate relevance scores consistently', () => {
    fc.assert(
      fc.property(
        fc.record({
          id: fc.string({ minLength: 3, maxLength: 20 }),
          name: fc.string({ minLength: 10, maxLength: 50 }),
          degree: fc.constantFrom('B.Tech', 'MBA', 'BCA'),
          field: fc.constantFrom('Engineering', 'Management'),
          discipline: fc.constantFrom('Computer Science', 'Business'),
          university: fc.string({ minLength: 5, maxLength: 30 }),
          universityId: fc.string({ minLength: 3, maxLength: 15 })
        }),
        fc.record({
          id: fc.string({ minLength: 3, maxLength: 20 }),
          name: fc.string({ minLength: 10, maxLength: 50 }),
          degree: fc.constantFrom('B.Tech', 'MBA', 'BCA'),
          field: fc.constantFrom('Engineering', 'Management'),
          discipline: fc.constantFrom('Computer Science', 'Business'),
          university: fc.string({ minLength: 5, maxLength: 30 }),
          universityId: fc.string({ minLength: 3, maxLength: 15 })
        }),
        (sourceCourse, targetCourse) => {
          // Calculate relevance score twice
          const score1 = calculateRelevance(sourceCourse, targetCourse);
          const score2 = calculateRelevance(sourceCourse, targetCourse);
          
          // Should be consistent (same inputs = same output)
          expect(score1).toBe(score2);
          
          // Score should be a number between 0 and 100
          expect(typeof score1).toBe('number');
          expect(score1).toBeGreaterThanOrEqual(0);
          expect(score1).toBeLessThanOrEqual(100);
        }
      ),
      { numRuns: 100 }
    );
  });
});

// Additional property test for page reachability
describe('Property: Page Reachability', () => {
  it('should correctly identify reachable pages', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(
          '/',
          '/home',
          '/courses',
          '/universities',
          '/compare',
          '/scholarships',
          '/universities/sharda',
          '/universities/sharda/courses/btech-cse',
          '/courses/compare/btech-cse',
          '/sharda-university',
          '/guides/study-in-india'
        ),
        (pageUrl) => {
          const isReachable = ensurePageReachability(pageUrl);
          
          // All these standard pages should be reachable
          expect(isReachable).toBe(true);
        }
      ),
      { numRuns: 100 }
    );
  });
  
  it('should handle various URL formats', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 1, maxLength: 50 }),
        (urlPath) => {
          // Normalize to valid URL format
          const normalizedUrl = urlPath.startsWith('/') ? urlPath : `/${urlPath}`;
          
          const isReachable = ensurePageReachability(normalizedUrl);
          
          // Should return a boolean
          expect(typeof isReachable).toBe('boolean');
        }
      ),
      { numRuns: 100 }
    );
  });
});
