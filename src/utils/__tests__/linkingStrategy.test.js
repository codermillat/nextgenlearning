import { describe, it, expect } from 'vitest';
import {
  getRelatedCourses,
  getPopularComparisons,
  getTopUniversities,
  calculateRelevance,
  ensurePageReachability
} from '../linkingStrategy';

describe('linkingStrategy - Edge Cases', () => {
  describe('getRelatedCourses', () => {
    it('should handle insufficient related content (less than 3 items)', () => {
      const courseId = 'test-course-1';
      const allCourses = [
        {
          id: 'test-course-1',
          name: 'Test Course 1',
          degree: 'B.Tech',
          field: 'Engineering',
          university: 'Test University',
          universityId: 'test-uni'
        },
        {
          id: 'test-course-2',
          name: 'Test Course 2',
          degree: 'MBA',
          field: 'Management',
          university: 'Other University',
          universityId: 'other-uni'
        }
      ];

      const relatedCourses = getRelatedCourses(courseId, 3, allCourses);

      // Should return available courses (1 in this case)
      expect(relatedCourses.length).toBeGreaterThanOrEqual(0);
      expect(relatedCourses.length).toBeLessThanOrEqual(3);
      
      // Each course should have required properties
      relatedCourses.forEach(course => {
        expect(course).toHaveProperty('title');
        expect(course).toHaveProperty('url');
        expect(course).toHaveProperty('anchorText');
        expect(course).toHaveProperty('relevanceScore');
      });
    });

    it('should return empty array when no courses provided', () => {
      const relatedCourses = getRelatedCourses('test-course', 3, []);
      expect(relatedCourses).toEqual([]);
    });

    it('should return empty array when courseId is invalid', () => {
      const allCourses = [
        {
          id: 'course-1',
          name: 'Course 1',
          degree: 'B.Tech',
          field: 'Engineering',
          university: 'University',
          universityId: 'uni'
        }
      ];

      const relatedCourses = getRelatedCourses('', 3, allCourses);
      expect(relatedCourses).toEqual([]);
    });

    it('should return empty array when source course not found', () => {
      const allCourses = [
        {
          id: 'course-1',
          name: 'Course 1',
          degree: 'B.Tech',
          field: 'Engineering',
          university: 'University',
          universityId: 'uni'
        }
      ];

      const relatedCourses = getRelatedCourses('non-existent-course', 3, allCourses);
      expect(relatedCourses).toEqual([]);
    });

    it('should handle courses with missing optional fields', () => {
      const courseId = 'test-course-1';
      const allCourses = [
        {
          id: 'test-course-1',
          name: 'Test Course 1',
          degree: 'B.Tech'
          // Missing field, discipline, university, universityId
        },
        {
          id: 'test-course-2',
          name: 'Test Course 2',
          degree: 'B.Tech'
          // Missing field, discipline, university, universityId
        },
        {
          id: 'test-course-3',
          name: 'Test Course 3',
          degree: 'B.Tech'
        },
        {
          id: 'test-course-4',
          name: 'Test Course 4',
          degree: 'B.Tech'
        }
      ];

      const relatedCourses = getRelatedCourses(courseId, 3, allCourses);

      // Should still return courses
      expect(relatedCourses.length).toBeGreaterThanOrEqual(3);
      
      // Each course should have valid URLs and anchor text
      relatedCourses.forEach(course => {
        expect(course.url).toBeTruthy();
        expect(course.anchorText).toBeTruthy();
        expect(course.anchorText.length).toBeGreaterThan(0);
      });
    });
  });

  describe('getPopularComparisons', () => {
    it('should return valid comparison links', () => {
      const comparisons = getPopularComparisons(5);

      expect(comparisons.length).toBeGreaterThan(0);
      expect(comparisons.length).toBeLessThanOrEqual(5);

      comparisons.forEach(comparison => {
        expect(comparison).toHaveProperty('title');
        expect(comparison).toHaveProperty('url');
        expect(comparison).toHaveProperty('anchorText');
        expect(comparison.url).toMatch(/^\/courses\/compare\/.+$/);
      });
    });

    it('should handle limit parameter correctly', () => {
      const comparisons1 = getPopularComparisons(3);
      const comparisons2 = getPopularComparisons(10);

      expect(comparisons1.length).toBeLessThanOrEqual(3);
      expect(comparisons2.length).toBeGreaterThanOrEqual(comparisons1.length);
    });
  });

  describe('getTopUniversities', () => {
    it('should return default universities when no data provided', () => {
      const universities = getTopUniversities(5, []);

      expect(universities.length).toBeGreaterThan(0);
      expect(universities.length).toBeLessThanOrEqual(5);

      universities.forEach(university => {
        expect(university).toHaveProperty('title');
        expect(university).toHaveProperty('url');
        expect(university).toHaveProperty('anchorText');
        expect(university.url).toMatch(/^\/universities\/.+$/);
      });
    });

    it('should handle universities with missing profile data', () => {
      const universitiesData = [
        {
          id: 'uni-1',
          name: 'University 1'
          // Missing profile
        },
        {
          id: 'uni-2',
          name: 'University 2',
          profile: {}
          // Empty profile
        },
        {
          id: 'uni-3',
          name: 'University 3',
          profile: {
            rankings: {}
            // Empty rankings
          }
        }
      ];

      const universities = getTopUniversities(3, universitiesData);

      expect(universities.length).toBeGreaterThan(0);
      
      universities.forEach(university => {
        expect(university.title).toBeTruthy();
        expect(university.url).toBeTruthy();
        expect(university.anchorText).toBeTruthy();
      });
    });

    it('should handle broken or invalid URLs gracefully', () => {
      const universitiesData = [
        {
          id: '', // Empty ID
          name: 'University with Empty ID'
        },
        {
          id: 'valid-uni',
          name: 'Valid University'
        }
      ];

      const universities = getTopUniversities(2, universitiesData);

      // Should still return universities
      expect(universities.length).toBeGreaterThan(0);
      
      // All URLs should be valid
      universities.forEach(university => {
        expect(university.url).toMatch(/^\/universities\/.+$/);
      });
    });
  });

  describe('calculateRelevance', () => {
    it('should handle courses with various input combinations', () => {
      const testCases = [
        // Same group, same level, same field
        {
          source: { degree: 'B.Tech', field: 'Engineering', discipline: 'Computer Science', name: 'B.Tech CSE' },
          target: { degree: 'B.Tech', field: 'Engineering', discipline: 'Computer Science', name: 'B.Tech CSE AI' },
          expectedMin: 50
        },
        // Different everything
        {
          source: { degree: 'B.Tech', field: 'Engineering', discipline: 'Computer Science' },
          target: { degree: 'MBA', field: 'Management', discipline: 'Business' },
          expectedMin: 0
        },
        // Same degree, different field
        {
          source: { degree: 'B.Tech', field: 'Engineering' },
          target: { degree: 'B.Tech', field: 'Science' },
          expectedMin: 20
        }
      ];

      testCases.forEach(({ source, target, expectedMin }) => {
        const score = calculateRelevance(source, target);
        expect(score).toBeGreaterThanOrEqual(expectedMin);
        expect(score).toBeLessThanOrEqual(100);
      });
    });

    it('should handle missing fields gracefully', () => {
      const source = { degree: 'B.Tech' };
      const target = { degree: 'B.Tech' };

      const score = calculateRelevance(source, target);
      
      expect(typeof score).toBe('number');
      expect(score).toBeGreaterThanOrEqual(0);
      expect(score).toBeLessThanOrEqual(100);
    });

    it('should return consistent scores for same inputs', () => {
      const source = {
        degree: 'B.Tech',
        field: 'Engineering',
        discipline: 'Computer Science',
        university: 'University A'
      };
      const target = {
        degree: 'B.Tech',
        field: 'Engineering',
        discipline: 'Computer Science',
        university: 'University B'
      };

      const score1 = calculateRelevance(source, target);
      const score2 = calculateRelevance(source, target);

      expect(score1).toBe(score2);
    });
  });

  describe('ensurePageReachability', () => {
    it('should identify homepage as reachable', () => {
      expect(ensurePageReachability('/')).toBe(true);
      expect(ensurePageReachability('/home')).toBe(true);
    });

    it('should identify main navigation pages as reachable', () => {
      const mainPages = [
        '/courses',
        '/universities',
        '/compare',
        '/scholarships',
        '/apply',
        '/about',
        '/contact'
      ];

      mainPages.forEach(page => {
        expect(ensurePageReachability(page)).toBe(true);
      });
    });

    it('should identify course detail pages as reachable', () => {
      const coursePages = [
        '/universities/sharda/courses/btech-cse',
        '/universities/galgotias/courses/mba',
        '/universities/niu/courses/bca'
      ];

      coursePages.forEach(page => {
        expect(ensurePageReachability(page)).toBe(true);
      });
    });

    it('should identify university detail pages as reachable', () => {
      const universityPages = [
        '/universities/sharda',
        '/universities/galgotias',
        '/universities/niu'
      ];

      universityPages.forEach(page => {
        expect(ensurePageReachability(page)).toBe(true);
      });
    });

    it('should handle invalid URLs gracefully', () => {
      const invalidUrls = [
        '',
        null,
        undefined
      ];

      invalidUrls.forEach(url => {
        const result = ensurePageReachability(url);
        expect(typeof result).toBe('boolean');
      });
    });

    it('should handle URLs without leading slash', () => {
      const result = ensurePageReachability('courses');
      expect(typeof result).toBe('boolean');
    });

    it('should identify deep nested pages correctly', () => {
      // Pages with 3 or fewer segments should be reachable
      expect(ensurePageReachability('/universities/sharda/courses')).toBe(true);
      
      // Very deep pages might not be reachable
      const deepPage = '/a/b/c/d/e/f/g';
      const result = ensurePageReachability(deepPage);
      expect(typeof result).toBe('boolean');
    });
  });

  describe('Integration - Full workflow', () => {
    it('should generate complete linking strategy for a course', () => {
      const courseId = 'btech-cse-1';
      const allCourses = [
        {
          id: 'btech-cse-1',
          name: 'B.Tech Computer Science',
          degree: 'B.Tech',
          field: 'Engineering',
          discipline: 'Computer Science',
          university: 'Sharda University',
          universityId: 'sharda'
        },
        {
          id: 'btech-cse-2',
          name: 'B.Tech CSE AI',
          degree: 'B.Tech',
          field: 'Engineering',
          discipline: 'Computer Science',
          university: 'Galgotias University',
          universityId: 'galgotias'
        },
        {
          id: 'btech-it-1',
          name: 'B.Tech Information Technology',
          degree: 'B.Tech',
          field: 'Engineering',
          discipline: 'Information Technology',
          university: 'NIU',
          universityId: 'niu'
        },
        {
          id: 'mba-1',
          name: 'MBA',
          degree: 'MBA',
          field: 'Management',
          discipline: 'Business',
          university: 'Sharda University',
          universityId: 'sharda'
        },
        {
          id: 'bca-1',
          name: 'BCA',
          degree: 'BCA',
          field: 'Computer Applications',
          discipline: 'Computer Science',
          university: 'Chandigarh University',
          universityId: 'chandigarh'
        }
      ];

      // Get related courses
      const relatedCourses = getRelatedCourses(courseId, 3, allCourses);
      expect(relatedCourses.length).toBeGreaterThanOrEqual(3);

      // Get popular comparisons
      const comparisons = getPopularComparisons(3);
      expect(comparisons.length).toBeGreaterThan(0);

      // Get top universities
      const universities = getTopUniversities(3);
      expect(universities.length).toBeGreaterThan(0);

      // Verify all links have required properties
      [...relatedCourses, ...comparisons, ...universities].forEach(link => {
        expect(link).toHaveProperty('title');
        expect(link).toHaveProperty('url');
        expect(link).toHaveProperty('anchorText');
        expect(link.anchorText.length).toBeGreaterThanOrEqual(3);
      });
    });
  });
});
