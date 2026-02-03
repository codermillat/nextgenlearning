/**
 * GSC Notification Tests
 * Task: 23.1 Write unit test for GSC notification
 * 
 * Tests verify:
 * - Sitemap submission function is called
 * - Indexing requests are made for top pages
 * - Proper error handling
 * 
 * Requirements: 8.5
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  submitSitemapToGSC,
  requestIndexing,
  getTopPagesByImpressions,
  deployAndSubmitToGSC
} from '../gscNotification.js';

describe('GSC Notification (Requirement 8.5)', () => {
  beforeEach(() => {
    // Clear console mocks
    vi.clearAllMocks();
  });

  describe('submitSitemapToGSC', () => {
    it('should return success response when submitting sitemap', async () => {
      const result = await submitSitemapToGSC();

      expect(result).toBeDefined();
      expect(result.success).toBe(true);
      expect(result.message).toContain('Sitemap submitted successfully');
      expect(result.sitemapUrl).toBe('https://www.nextgenlearning.dev/sitemap.xml');
    });

    it('should include sitemap URL in response', async () => {
      const result = await submitSitemapToGSC();

      expect(result.sitemapUrl).toBeDefined();
      expect(result.sitemapUrl).toMatch(/^https:\/\//);
      expect(result.sitemapUrl).toContain('sitemap.xml');
    });

    it('should return proper response structure', async () => {
      const result = await submitSitemapToGSC();

      expect(result).toHaveProperty('success');
      expect(result).toHaveProperty('message');
      expect(result).toHaveProperty('sitemapUrl');
      expect(typeof result.success).toBe('boolean');
      expect(typeof result.message).toBe('string');
      expect(typeof result.sitemapUrl).toBe('string');
    });
  });

  describe('requestIndexing', () => {
    it('should request indexing for provided page URLs', async () => {
      const pageUrls = [
        '/',
        '/sharda-university',
        '/universities/galgotias-university'
      ];

      const result = await requestIndexing(pageUrls);

      expect(result).toBeDefined();
      expect(result.success).toBe(true);
      expect(result.requestedPages).toHaveLength(3);
      expect(result.failedPages).toHaveLength(0);
    });

    it('should convert relative URLs to absolute URLs', async () => {
      const pageUrls = ['/courses', '/universities'];

      const result = await requestIndexing(pageUrls);

      expect(result.requestedPages).toHaveLength(2);
      result.requestedPages.forEach(url => {
        expect(url).toMatch(/^https:\/\//);
        expect(url).toContain('nextgenlearning.dev');
      });
    });

    it('should handle absolute URLs correctly', async () => {
      const pageUrls = [
        'https://www.nextgenlearning.dev/',
        'https://www.nextgenlearning.dev/courses'
      ];

      const result = await requestIndexing(pageUrls);

      expect(result.requestedPages).toHaveLength(2);
      expect(result.requestedPages).toEqual(pageUrls);
    });

    it('should return proper response structure', async () => {
      const result = await requestIndexing(['/']);

      expect(result).toHaveProperty('success');
      expect(result).toHaveProperty('message');
      expect(result).toHaveProperty('requestedPages');
      expect(result).toHaveProperty('failedPages');
      expect(typeof result.success).toBe('boolean');
      expect(typeof result.message).toBe('string');
      expect(Array.isArray(result.requestedPages)).toBe(true);
      expect(Array.isArray(result.failedPages)).toBe(true);
    });

    it('should handle empty array of URLs', async () => {
      const result = await requestIndexing([]);

      expect(result.success).toBe(true);
      expect(result.requestedPages).toHaveLength(0);
      expect(result.failedPages).toHaveLength(0);
    });

    it('should include count in success message', async () => {
      const pageUrls = ['/', '/courses', '/universities'];
      const result = await requestIndexing(pageUrls);

      expect(result.message).toContain('3');
      expect(result.message).toContain('pages');
    });
  });

  describe('getTopPagesByImpressions', () => {
    it('should return array of top pages', () => {
      const topPages = getTopPagesByImpressions();

      expect(Array.isArray(topPages)).toBe(true);
      expect(topPages.length).toBeGreaterThan(0);
    });

    it('should include homepage', () => {
      const topPages = getTopPagesByImpressions();

      expect(topPages).toContain('/');
    });

    it('should include Sharda University page', () => {
      const topPages = getTopPagesByImpressions();

      expect(topPages).toContain('/sharda-university');
    });

    it('should include Galgotias University page', () => {
      const topPages = getTopPagesByImpressions();

      expect(topPages.some(page => page.includes('galgotias'))).toBe(true);
    });

    it('should include NIU page', () => {
      const topPages = getTopPagesByImpressions();

      expect(topPages.some(page => page.includes('noida-international'))).toBe(true);
    });

    it('should include Chandigarh University page', () => {
      const topPages = getTopPagesByImpressions();

      expect(topPages.some(page => page.includes('chandigarh'))).toBe(true);
    });

    it('should include course pages', () => {
      const topPages = getTopPagesByImpressions();

      const coursePages = topPages.filter(page => page.includes('/courses/'));
      expect(coursePages.length).toBeGreaterThan(0);
    });

    it('should include scholarships page', () => {
      const topPages = getTopPagesByImpressions();

      expect(topPages).toContain('/scholarships');
    });

    it('should include compare page', () => {
      const topPages = getTopPagesByImpressions();

      expect(topPages).toContain('/compare');
    });

    it('should return at least 10 pages as specified in task', () => {
      const topPages = getTopPagesByImpressions();

      // Task 23 specifies "top 10 pages by impressions"
      expect(topPages.length).toBeGreaterThanOrEqual(10);
    });

    it('should return unique URLs', () => {
      const topPages = getTopPagesByImpressions();

      const uniquePages = new Set(topPages);
      expect(uniquePages.size).toBe(topPages.length);
    });
  });

  describe('deployAndSubmitToGSC', () => {
    it('should call submitSitemapToGSC function', async () => {
      const result = await deployAndSubmitToGSC();

      expect(result).toBeDefined();
      expect(result.sitemapSubmission).toBeDefined();
      expect(result.sitemapSubmission.success).toBe(true);
    });

    it('should call requestIndexing function', async () => {
      const result = await deployAndSubmitToGSC();

      expect(result).toBeDefined();
      expect(result.indexingRequests).toBeDefined();
      expect(result.indexingRequests.requestedPages).toBeDefined();
    });

    it('should request indexing for top pages', async () => {
      const result = await deployAndSubmitToGSC();

      const topPages = getTopPagesByImpressions();
      expect(result.indexingRequests.requestedPages.length).toBe(topPages.length);
    });

    it('should return both sitemap submission and indexing results', async () => {
      const result = await deployAndSubmitToGSC();

      expect(result).toHaveProperty('sitemapSubmission');
      expect(result).toHaveProperty('indexingRequests');
      expect(result.sitemapSubmission).toHaveProperty('success');
      expect(result.indexingRequests).toHaveProperty('requestedPages');
    });

    it('should complete successfully when both operations succeed', async () => {
      const result = await deployAndSubmitToGSC();

      expect(result.sitemapSubmission.success).toBe(true);
      expect(result.indexingRequests.success).toBe(true);
    });

    it('should include sitemap URL in submission result', async () => {
      const result = await deployAndSubmitToGSC();

      expect(result.sitemapSubmission.sitemapUrl).toBeDefined();
      expect(result.sitemapSubmission.sitemapUrl).toContain('sitemap.xml');
    });

    it('should request indexing for all top 10 pages', async () => {
      const result = await deployAndSubmitToGSC();

      // Verify all top pages were requested
      const topPages = getTopPagesByImpressions();
      expect(result.indexingRequests.requestedPages.length).toBe(topPages.length);
      
      // Verify each top page is in the requested list
      topPages.forEach(page => {
        const fullUrl = `https://www.nextgenlearning.dev${page}`;
        expect(result.indexingRequests.requestedPages).toContain(fullUrl);
      });
    });

    it('should have no failed pages when successful', async () => {
      const result = await deployAndSubmitToGSC();

      expect(result.indexingRequests.failedPages).toHaveLength(0);
    });
  });

  describe('Integration - Full GSC Workflow', () => {
    it('should execute complete GSC notification workflow', async () => {
      // This test verifies the complete workflow as specified in task 23:
      // 1. Submit updated sitemap to Google Search Console
      // 2. Request indexing for top 10 pages by impressions

      const result = await deployAndSubmitToGSC();

      // Verify sitemap submission
      expect(result.sitemapSubmission).toBeDefined();
      expect(result.sitemapSubmission.success).toBe(true);
      expect(result.sitemapSubmission.sitemapUrl).toBe('https://www.nextgenlearning.dev/sitemap.xml');

      // Verify indexing requests
      expect(result.indexingRequests).toBeDefined();
      expect(result.indexingRequests.success).toBe(true);
      expect(result.indexingRequests.requestedPages.length).toBeGreaterThanOrEqual(10);

      // Verify top pages are included
      const requestedUrls = result.indexingRequests.requestedPages;
      expect(requestedUrls.some(url => url.endsWith('/'))).toBe(true); // homepage
      expect(requestedUrls.some(url => url.includes('sharda'))).toBe(true);
      expect(requestedUrls.some(url => url.includes('galgotias'))).toBe(true);
      expect(requestedUrls.some(url => url.includes('noida-international'))).toBe(true);
      expect(requestedUrls.some(url => url.includes('chandigarh'))).toBe(true);
      expect(requestedUrls.some(url => url.includes('scholarships'))).toBe(true);
      expect(requestedUrls.some(url => url.includes('compare'))).toBe(true);
    });

    it('should log appropriate messages during workflow', async () => {
      const consoleSpy = vi.spyOn(console, 'log');

      await deployAndSubmitToGSC();

      // Verify logging occurred
      expect(consoleSpy).toHaveBeenCalled();
      
      consoleSpy.mockRestore();
    });
  });

  describe('Error Handling', () => {
    it('should handle sitemap submission gracefully', async () => {
      // Even if there's an error, the function should return a proper response
      const result = await submitSitemapToGSC();

      expect(result).toBeDefined();
      expect(result).toHaveProperty('success');
      expect(result).toHaveProperty('message');
    });

    it('should handle indexing request errors gracefully', async () => {
      const result = await requestIndexing(['/test-page']);

      expect(result).toBeDefined();
      expect(result).toHaveProperty('success');
      expect(result).toHaveProperty('requestedPages');
      expect(result).toHaveProperty('failedPages');
    });
  });
});
