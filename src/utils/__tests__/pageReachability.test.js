/**
 * Page Reachability Tests
 * Feature: seo-overhaul
 * Task: 14.1 Write unit test for page reachability
 * 
 * Tests that all 393 pages in the sitemap are reachable within 3 clicks from homepage
 * Requirements: 5.6
 */

import { describe, it, expect, beforeAll } from 'vitest';
import { ensurePageReachability } from '../linkingStrategy';
import { readFileSync } from 'fs';
import { join } from 'path';

describe('Page Reachability - All 393 Pages', () => {
  let sitemapUrls = [];

  beforeAll(() => {
    // Read and parse sitemap.xml to get all page URLs
    const sitemapPath = join(process.cwd(), 'public', 'sitemap.xml');
    const sitemapContent = readFileSync(sitemapPath, 'utf-8');
    
    // Extract all <loc> URLs from sitemap
    const locRegex = /<loc>(.*?)<\/loc>/g;
    const matches = [...sitemapContent.matchAll(locRegex)];
    
    sitemapUrls = matches.map(match => {
      const fullUrl = match[1];
      // Extract path from full URL (remove domain)
      const url = new URL(fullUrl);
      return url.pathname;
    });
  });

  it('should have at least 393 pages in sitemap', () => {
    expect(sitemapUrls.length).toBeGreaterThanOrEqual(393);
  });

  it('should verify all 393 pages are reachable within 3 clicks', () => {
    const unreachablePages = [];
    
    sitemapUrls.forEach(pageUrl => {
      const isReachable = ensurePageReachability(pageUrl);
      
      if (!isReachable) {
        unreachablePages.push(pageUrl);
      }
    });

    // All pages should be reachable
    expect(unreachablePages).toEqual([]);
    
    // If there are unreachable pages, log them for debugging
    if (unreachablePages.length > 0) {
      console.log('Unreachable pages:', unreachablePages);
    }
  });

  it('should verify homepage is reachable (0 clicks)', () => {
    const homepage = sitemapUrls.find(url => url === '/');
    expect(homepage).toBeDefined();
    expect(ensurePageReachability(homepage)).toBe(true);
  });

  it('should verify main navigation pages are reachable (1 click)', () => {
    const mainNavPages = [
      '/courses',
      '/universities',
      '/compare',
      '/scholarships',
      '/apply',
      '/about',
      '/contact',
      '/guides',
      '/faq'
    ];

    mainNavPages.forEach(page => {
      const pageInSitemap = sitemapUrls.includes(page);
      if (pageInSitemap) {
        expect(ensurePageReachability(page)).toBe(true);
      }
    });
  });

  it('should verify university detail pages are reachable (2 clicks)', () => {
    const universityPages = sitemapUrls.filter(url => 
      url.match(/^\/universities\/[^/]+$/) && !url.includes('/courses')
    );

    expect(universityPages.length).toBeGreaterThan(0);

    universityPages.forEach(page => {
      expect(ensurePageReachability(page)).toBe(true);
    });
  });

  it('should verify course detail pages are reachable (2-3 clicks)', () => {
    const coursePages = sitemapUrls.filter(url => 
      url.match(/^\/universities\/[^/]+\/courses\/[^/]+$/)
    );

    expect(coursePages.length).toBeGreaterThan(0);

    coursePages.forEach(page => {
      expect(ensurePageReachability(page)).toBe(true);
    });
  });

  it('should verify course comparison pages are reachable (2 clicks)', () => {
    const comparisonPages = sitemapUrls.filter(url => 
      url.match(/^\/courses\/compare\/[^/]+$/)
    );

    expect(comparisonPages.length).toBeGreaterThan(0);

    comparisonPages.forEach(page => {
      expect(ensurePageReachability(page)).toBe(true);
    });
  });

  it('should verify Sharda-specific pages are reachable (2-3 clicks)', () => {
    const shardaPages = sitemapUrls.filter(url => 
      url.startsWith('/sharda')
    );

    expect(shardaPages.length).toBeGreaterThan(0);

    shardaPages.forEach(page => {
      expect(ensurePageReachability(page)).toBe(true);
    });
  });

  it('should verify guide pages are reachable (2 clicks)', () => {
    const guidePages = sitemapUrls.filter(url => 
      url.match(/^\/guides\/[^/]+$/)
    );

    expect(guidePages.length).toBeGreaterThan(0);

    guidePages.forEach(page => {
      expect(ensurePageReachability(page)).toBe(true);
    });
  });

  it('should verify all pages have valid URL format', () => {
    sitemapUrls.forEach(url => {
      // All URLs should start with /
      expect(url).toMatch(/^\//);
      
      // URLs should not have trailing slashes (except homepage)
      if (url !== '/') {
        expect(url).not.toMatch(/\/$/);
      }
      
      // URLs should not contain query parameters or fragments
      expect(url).not.toContain('?');
      expect(url).not.toContain('#');
    });
  });

  it('should categorize pages by URL segment depth', () => {
    const pagesByDepth = {
      0: [], // Homepage
      1: [], // Main navigation
      2: [], // Second level
      3: [], // Third level
      4: []  // Fourth level or deeper
    };

    sitemapUrls.forEach(url => {
      const segments = url.split('/').filter(Boolean);
      const depth = segments.length;
      
      if (depth === 0) {
        pagesByDepth[0].push(url);
      } else if (depth === 1) {
        pagesByDepth[1].push(url);
      } else if (depth === 2) {
        pagesByDepth[2].push(url);
      } else if (depth === 3) {
        pagesByDepth[3].push(url);
      } else {
        pagesByDepth[4].push(url);
      }
    });

    // Log distribution for debugging
    console.log('Page URL segment depth distribution:');
    console.log('  0 segments (homepage):', pagesByDepth[0].length);
    console.log('  1 segment (main nav):', pagesByDepth[1].length);
    console.log('  2 segments:', pagesByDepth[2].length);
    console.log('  3 segments:', pagesByDepth[3].length);
    console.log('  4+ segments:', pagesByDepth[4].length);

    // All pages should exist in sitemap
    const totalPages = pagesByDepth[0].length + pagesByDepth[1].length + 
                       pagesByDepth[2].length + pagesByDepth[3].length + 
                       pagesByDepth[4].length;
    expect(totalPages).toBeGreaterThanOrEqual(393);
    
    // Note: URL segment depth doesn't directly correlate to click depth
    // A page with 4 segments can still be reachable in 2-3 clicks via navigation
  });

  it('should verify no duplicate URLs in sitemap', () => {
    const uniqueUrls = new Set(sitemapUrls);
    expect(uniqueUrls.size).toBe(sitemapUrls.length);
  });

  it('should verify all pages match expected route patterns', () => {
    const validPatterns = [
      /^\/$/,                                           // Homepage
      /^\/[a-z-]+$/,                                    // Main pages
      /^\/universities\/[a-z-]+$/,                      // University detail
      /^\/universities\/[a-z-]+\/courses$/,             // University courses list
      /^\/universities\/[a-z-]+\/courses\/[a-z0-9-]+$/, // Course detail
      /^\/courses\/compare\/[a-z-]+$/,                  // Course comparison
      /^\/guides\/[a-z-]+$/,                            // Guide detail
      /^\/sharda[a-z-/]*$/,                             // Sharda pages
      /^\/best-[a-z-]+$/                                // Best universities pages
    ];

    const unmatchedUrls = [];

    sitemapUrls.forEach(url => {
      const matches = validPatterns.some(pattern => pattern.test(url));
      if (!matches) {
        unmatchedUrls.push(url);
      }
    });

    // Log unmatched URLs for debugging
    if (unmatchedUrls.length > 0) {
      console.log('URLs not matching expected patterns:', unmatchedUrls.slice(0, 10));
    }

    // Most URLs should match expected patterns
    expect(unmatchedUrls.length).toBeLessThan(10);
  });
});
