import { describe, it, expect, beforeEach } from 'vitest';
import {
  contentMetadataRegistry,
  getContentMetadata,
  getContentMetadataByPath,
  getContentByType,
  getContentDueForReview,
  getContentByQuarter,
  updateContentMetadata,
  getReviewSchedule,
  isContentOverdue,
  getDaysUntilReview,
  type ContentMetadata
} from '../contentMetadata';

describe('Content Metadata System', () => {
  describe('Registry', () => {
    it('should have content metadata entries', () => {
      expect(contentMetadataRegistry).toBeDefined();
      expect(contentMetadataRegistry.length).toBeGreaterThan(0);
    });

    it('should have required fields for each entry', () => {
      contentMetadataRegistry.forEach(item => {
        expect(item.id).toBeDefined();
        expect(item.type).toBeDefined();
        expect(item.path).toBeDefined();
        expect(item.lastUpdated).toBeDefined();
        expect(item.nextReview).toBeDefined();
        expect(item.reviewFrequency).toBeDefined();
        expect(item.owner).toBeDefined();
      });
    });

    it('should have unique IDs', () => {
      const ids = contentMetadataRegistry.map(item => item.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });

    it('should have valid date formats', () => {
      contentMetadataRegistry.forEach(item => {
        const lastUpdated = new Date(item.lastUpdated);
        const nextReview = new Date(item.nextReview);
        
        expect(isNaN(lastUpdated.getTime())).toBe(false);
        expect(isNaN(nextReview.getTime())).toBe(false);
      });
    });
  });

  describe('getContentMetadata', () => {
    it('should return metadata by ID', () => {
      const metadata = getContentMetadata('sharda-landing');
      
      expect(metadata).toBeDefined();
      expect(metadata?.id).toBe('sharda-landing');
      expect(metadata?.type).toBe('general');
    });

    it('should return undefined for non-existent ID', () => {
      const metadata = getContentMetadata('non-existent');
      expect(metadata).toBeUndefined();
    });
  });

  describe('getContentMetadataByPath', () => {
    it('should return metadata by path', () => {
      const metadata = getContentMetadataByPath('/sharda-university');
      
      expect(metadata).toBeDefined();
      expect(metadata?.path).toBe('/sharda-university');
    });

    it('should return undefined for non-existent path', () => {
      const metadata = getContentMetadataByPath('/non-existent');
      expect(metadata).toBeUndefined();
    });
  });

  describe('getContentByType', () => {
    it('should return all fees content', () => {
      const feesContent = getContentByType('fees');
      
      expect(feesContent.length).toBeGreaterThan(0);
      feesContent.forEach(item => {
        expect(item.type).toBe('fees');
      });
    });

    it('should return all rankings content', () => {
      const rankingsContent = getContentByType('rankings');
      
      expect(rankingsContent.length).toBeGreaterThan(0);
      rankingsContent.forEach(item => {
        expect(item.type).toBe('rankings');
      });
    });

    it('should return all programs content', () => {
      const programsContent = getContentByType('programs');
      
      expect(programsContent.length).toBeGreaterThan(0);
      programsContent.forEach(item => {
        expect(item.type).toBe('programs');
      });
    });

    it('should return empty array for non-existent type', () => {
      const content = getContentByType('non-existent' as any);
      expect(content).toEqual([]);
    });
  });

  describe('getContentDueForReview', () => {
    it('should return content due for review before a specific date', () => {
      const checkDate = new Date('2026-12-31');
      const dueContent = getContentDueForReview(checkDate);
      
      expect(Array.isArray(dueContent)).toBe(true);
      
      dueContent.forEach(item => {
        const reviewDate = new Date(item.nextReview);
        expect(reviewDate <= checkDate).toBe(true);
      });
    });

    it('should return content due for review today', () => {
      const dueContent = getContentDueForReview();
      
      expect(Array.isArray(dueContent)).toBe(true);
    });

    it('should not return content with future review dates', () => {
      const checkDate = new Date('2026-01-01');
      const dueContent = getContentDueForReview(checkDate);
      
      dueContent.forEach(item => {
        const reviewDate = new Date(item.nextReview);
        expect(reviewDate <= checkDate).toBe(true);
      });
    });
  });

  describe('getContentByQuarter', () => {
    it('should return content for Q1', () => {
      const q1Content = getContentByQuarter('Q1', 2026);
      
      expect(Array.isArray(q1Content)).toBe(true);
      
      q1Content.forEach(item => {
        const reviewDate = new Date(item.nextReview);
        const month = reviewDate.getMonth();
        expect([0, 1, 2]).toContain(month); // Jan, Feb, Mar
      });
    });

    it('should return content for Q2', () => {
      const q2Content = getContentByQuarter('Q2', 2026);
      
      expect(Array.isArray(q2Content)).toBe(true);
      
      q2Content.forEach(item => {
        const reviewDate = new Date(item.nextReview);
        const month = reviewDate.getMonth();
        expect([3, 4, 5]).toContain(month); // Apr, May, Jun
      });
    });

    it('should return content for Q3', () => {
      const q3Content = getContentByQuarter('Q3', 2026);
      
      expect(Array.isArray(q3Content)).toBe(true);
      
      q3Content.forEach(item => {
        const reviewDate = new Date(item.nextReview);
        const month = reviewDate.getMonth();
        expect([6, 7, 8]).toContain(month); // Jul, Aug, Sep
      });
    });

    it('should return content for Q4', () => {
      const q4Content = getContentByQuarter('Q4', 2026);
      
      expect(Array.isArray(q4Content)).toBe(true);
      
      q4Content.forEach(item => {
        const reviewDate = new Date(item.nextReview);
        const month = reviewDate.getMonth();
        expect([9, 10, 11]).toContain(month); // Oct, Nov, Dec
      });
    });

    it('should return empty array for invalid quarter', () => {
      const content = getContentByQuarter('Q5', 2026);
      expect(content).toEqual([]);
    });

    it('should filter by year correctly', () => {
      const content = getContentByQuarter('Q1', 2027);
      
      content.forEach(item => {
        const reviewDate = new Date(item.nextReview);
        expect(reviewDate.getFullYear()).toBe(2027);
      });
    });
  });

  describe('updateContentMetadata', () => {
    it('should update last updated date', () => {
      const newDate = '2026-02-01';
      const updated = updateContentMetadata('sharda-landing', newDate);
      
      expect(updated).toBeDefined();
      expect(updated?.lastUpdated).toBe(newDate);
    });

    it('should calculate next review date based on frequency', () => {
      const metadata = getContentMetadata('sharda-landing');
      const frequency = metadata?.reviewFrequency || 3;
      
      const newDate = '2026-02-01';
      const updated = updateContentMetadata('sharda-landing', newDate);
      
      const expectedReviewDate = new Date('2026-02-01');
      expectedReviewDate.setMonth(expectedReviewDate.getMonth() + frequency);
      
      const actualReviewDate = new Date(updated?.nextReview || '');
      
      expect(actualReviewDate.getMonth()).toBe(expectedReviewDate.getMonth());
      expect(actualReviewDate.getFullYear()).toBe(expectedReviewDate.getFullYear());
    });

    it('should return null for non-existent ID', () => {
      const updated = updateContentMetadata('non-existent', '2026-02-01');
      expect(updated).toBeNull();
    });
  });

  describe('getReviewSchedule', () => {
    it('should return review schedule for a quarter', () => {
      const schedule = getReviewSchedule('Q1', 2026);
      
      expect(schedule).toBeDefined();
      expect(schedule.quarter).toBe('Q1');
      expect(schedule.year).toBe(2026);
      expect(Array.isArray(schedule.items)).toBe(true);
      expect(schedule.status).toBe('pending');
    });

    it('should include correct items for the quarter', () => {
      const schedule = getReviewSchedule('Q2', 2026);
      
      schedule.items.forEach(item => {
        const reviewDate = new Date(item.nextReview);
        const month = reviewDate.getMonth();
        expect([3, 4, 5]).toContain(month);
      });
    });
  });

  describe('isContentOverdue', () => {
    it('should return false for content with future review date', () => {
      // Assuming some content has future review dates
      const futureContent = contentMetadataRegistry.find(item => {
        const reviewDate = new Date(item.nextReview);
        return reviewDate > new Date();
      });
      
      if (futureContent) {
        const isOverdue = isContentOverdue(futureContent.id);
        expect(isOverdue).toBe(false);
      }
    });

    it('should return false for non-existent ID', () => {
      const isOverdue = isContentOverdue('non-existent');
      expect(isOverdue).toBe(false);
    });
  });

  describe('getDaysUntilReview', () => {
    it('should return number of days until review', () => {
      const days = getDaysUntilReview('sharda-landing');
      
      expect(typeof days).toBe('number');
    });

    it('should return null for non-existent ID', () => {
      const days = getDaysUntilReview('non-existent');
      expect(days).toBeNull();
    });

    it('should return negative number for overdue content', () => {
      // Create a test scenario with past review date
      const pastContent = contentMetadataRegistry.find(item => {
        const reviewDate = new Date(item.nextReview);
        return reviewDate < new Date();
      });
      
      if (pastContent) {
        const days = getDaysUntilReview(pastContent.id);
        expect(days).toBeLessThan(0);
      }
    });

    it('should return positive number for future review', () => {
      const futureContent = contentMetadataRegistry.find(item => {
        const reviewDate = new Date(item.nextReview);
        return reviewDate > new Date();
      });
      
      if (futureContent) {
        const days = getDaysUntilReview(futureContent.id);
        expect(days).toBeGreaterThan(0);
      }
    });
  });

  describe('Content Types', () => {
    it('should have fees content', () => {
      const feesContent = getContentByType('fees');
      expect(feesContent.length).toBeGreaterThan(0);
    });

    it('should have rankings content', () => {
      const rankingsContent = getContentByType('rankings');
      expect(rankingsContent.length).toBeGreaterThan(0);
    });

    it('should have programs content', () => {
      const programsContent = getContentByType('programs');
      expect(programsContent.length).toBeGreaterThan(0);
    });

    it('should have placements content', () => {
      const placementsContent = getContentByType('placements');
      expect(placementsContent.length).toBeGreaterThan(0);
    });

    it('should have scholarships content', () => {
      const scholarshipsContent = getContentByType('scholarships');
      expect(scholarshipsContent.length).toBeGreaterThan(0);
    });

    it('should have admissions content', () => {
      const admissionsContent = getContentByType('admissions');
      expect(admissionsContent.length).toBeGreaterThan(0);
    });

    it('should have general content', () => {
      const generalContent = getContentByType('general');
      expect(generalContent.length).toBeGreaterThan(0);
    });
  });

  describe('Review Frequencies', () => {
    it('should have appropriate frequencies for fees content', () => {
      const feesContent = getContentByType('fees');
      
      feesContent.forEach(item => {
        expect(item.reviewFrequency).toBeGreaterThanOrEqual(6);
      });
    });

    it('should have appropriate frequencies for rankings content', () => {
      const rankingsContent = getContentByType('rankings');
      
      rankingsContent.forEach(item => {
        expect(item.reviewFrequency).toBeGreaterThanOrEqual(6);
      });
    });

    it('should have appropriate frequencies for admissions content', () => {
      const admissionsContent = getContentByType('admissions');
      
      admissionsContent.forEach(item => {
        expect(item.reviewFrequency).toBeGreaterThanOrEqual(3);
      });
    });
  });
});
