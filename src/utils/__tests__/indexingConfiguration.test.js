/**
 * Indexing Configuration Tests
 * Task: 18.1 Write unit tests for indexing configuration
 * 
 * Tests verify:
 * - Sitemap contains all 393 pages
 * - robots.txt allows public page crawling
 * - No pages are blocked unintentionally
 * 
 * Requirements: 8.1, 8.2, 8.6
 */

import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'fs';
import { join } from 'path';

describe('Indexing Configuration', () => {
  let sitemapContent;
  let robotsContent;
  let sitemapUrls;

  beforeAll(() => {
    // Read sitemap.xml
    const sitemapPath = join(process.cwd(), 'public', 'sitemap.xml');
    sitemapContent = readFileSync(sitemapPath, 'utf-8');

    // Read robots.txt
    const robotsPath = join(process.cwd(), 'public', 'robots.txt');
    robotsContent = readFileSync(robotsPath, 'utf-8');

    // Extract all URLs from sitemap
    const locRegex = /<loc>(.*?)<\/loc>/g;
    const matches = [...sitemapContent.matchAll(locRegex)];
    sitemapUrls = matches.map(match => {
      const fullUrl = match[1];
      // Extract path from full URL
      return fullUrl.replace('https://www.nextgenlearning.dev', '');
    });
  });

  describe('Sitemap Completeness (Requirement 8.1)', () => {
    it('should contain at least 393 pages', () => {
      // The requirement states 393 pages, but we may have more
      expect(sitemapUrls.length).toBeGreaterThanOrEqual(393);
    });

    it('should be valid XML format', () => {
      // Check for XML declaration
      expect(sitemapContent).toContain('<?xml version="1.0" encoding="UTF-8"?>');
      
      // Check for urlset namespace
      expect(sitemapContent).toContain('xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"');
      
      // Check for closing urlset tag
      expect(sitemapContent).toContain('</urlset>');
    });

    it('should include homepage', () => {
      expect(sitemapUrls).toContain('/');
    });

    it('should include main navigation pages', () => {
      const mainPages = [
        '/courses',
        '/universities',
        '/scholarships',
        '/compare',
        '/apply',
        '/about',
        '/contact'
      ];

      mainPages.forEach(page => {
        expect(sitemapUrls).toContain(page);
      });
    });

    it('should include Bangladesh landing page', () => {
      expect(sitemapUrls).toContain('/for-bangladeshi-students');
    });

    it('should include university detail pages', () => {
      const universities = [
        '/sharda-university',
        '/universities/noida-international-university',
        '/universities/chandigarh-university',
        '/universities/galgotias-university'
      ];

      universities.forEach(uni => {
        expect(sitemapUrls).toContain(uni);
      });
    });

    it('should include Sharda-specific SEO pages', () => {
      const shardaPages = [
        '/sharda-university',
        '/sharda-university/nirf-ranking',
        '/sharda-university/ranking-2026',
        '/sharda-university/btech-cse-fees',
        '/sharda-university/mba-fees'
      ];

      shardaPages.forEach(page => {
        expect(sitemapUrls).toContain(page);
      });
    });

    it('should include course comparison pages', () => {
      // Check for at least some comparison pages
      const comparisonPages = sitemapUrls.filter(url => 
        url.startsWith('/courses/compare/')
      );

      expect(comparisonPages.length).toBeGreaterThan(0);
    });

    it('should include individual course pages', () => {
      // Check for at least some course detail pages
      const coursePages = sitemapUrls.filter(url => 
        url.match(/^\/universities\/[^/]+\/courses\/[^/]+$/)
      );

      expect(coursePages.length).toBeGreaterThan(0);
    });

    it('should have proper URL structure for all entries', () => {
      const urlRegex = /<url>[\s\S]*?<loc>.*?<\/loc>[\s\S]*?<lastmod>.*?<\/lastmod>[\s\S]*?<changefreq>.*?<\/changefreq>[\s\S]*?<priority>.*?<\/priority>[\s\S]*?<\/url>/g;
      const urlEntries = sitemapContent.match(urlRegex);

      expect(urlEntries).toBeTruthy();
      expect(urlEntries.length).toBe(sitemapUrls.length);
    });

    it('should have valid lastmod dates', () => {
      const lastmodRegex = /<lastmod>([\d-]+)<\/lastmod>/g;
      const dates = [...sitemapContent.matchAll(lastmodRegex)];

      dates.forEach(match => {
        const dateStr = match[1];
        // Check format YYYY-MM-DD
        expect(dateStr).toMatch(/^\d{4}-\d{2}-\d{2}$/);
        
        // Check it's a valid date
        const date = new Date(dateStr);
        expect(date.toString()).not.toBe('Invalid Date');
      });
    });

    it('should have valid priority values', () => {
      const priorityRegex = /<priority>([\d.]+)<\/priority>/g;
      const priorities = [...sitemapContent.matchAll(priorityRegex)];

      priorities.forEach(match => {
        const priority = parseFloat(match[1]);
        // Priority should be between 0.0 and 1.0
        expect(priority).toBeGreaterThanOrEqual(0.0);
        expect(priority).toBeLessThanOrEqual(1.0);
      });
    });

    it('should have valid changefreq values', () => {
      const changefreqRegex = /<changefreq>(\w+)<\/changefreq>/g;
      const changefreqs = [...sitemapContent.matchAll(changefreqRegex)];
      const validFreqs = ['always', 'hourly', 'daily', 'weekly', 'monthly', 'yearly', 'never'];

      changefreqs.forEach(match => {
        const freq = match[1];
        expect(validFreqs).toContain(freq);
      });
    });
  });

  describe('Robots.txt Configuration (Requirements 8.2, 8.6)', () => {
    it('should exist and be readable', () => {
      expect(robotsContent).toBeTruthy();
      expect(robotsContent.length).toBeGreaterThan(0);
    });

    it('should allow all user agents by default', () => {
      expect(robotsContent).toContain('User-agent: *');
      expect(robotsContent).toContain('Allow: /');
    });

    it('should reference sitemap location', () => {
      expect(robotsContent).toContain('Sitemap: https://www.nextgenlearning.dev/sitemap.xml');
    });

    it('should specify host', () => {
      expect(robotsContent).toContain('Host: https://www.nextgenlearning.dev');
    });

    it('should block only intended paths', () => {
      // Check that API and admin paths are blocked
      expect(robotsContent).toContain('Disallow: /api/');
      expect(robotsContent).toContain('Disallow: /admin/');
    });

    it('should not block public pages unintentionally', () => {
      const publicPaths = [
        '/courses',
        '/universities',
        '/scholarships',
        '/compare',
        '/apply',
        '/about',
        '/contact',
        '/for-bangladeshi-students',
        '/sharda-university',
        '/guides'
      ];

      publicPaths.forEach(path => {
        // Check that these paths are not explicitly disallowed
        const disallowPattern = new RegExp(`Disallow:\\s*${path.replace(/\//g, '\\/')}(?:\\s|$)`, 'i');
        expect(robotsContent).not.toMatch(disallowPattern);
      });
    });

    it('should allow major search engine bots', () => {
      const searchBots = [
        'Googlebot',
        'Bingbot',
        'Slurp', // Yahoo
        'DuckDuckBot',
        'Baiduspider'
      ];

      searchBots.forEach(bot => {
        expect(robotsContent).toContain(`User-agent: ${bot}`);
      });
    });

    it('should allow AI/LLM crawlers', () => {
      const aiCrawlers = [
        'GPTBot',
        'ChatGPT-User',
        'CCBot',
        'anthropic-ai',
        'Claude-Web',
        'PerplexityBot'
      ];

      aiCrawlers.forEach(crawler => {
        expect(robotsContent).toContain(`User-agent: ${crawler}`);
      });
    });

    it('should not have conflicting rules', () => {
      // Check that we don't have both Allow and Disallow for the same path
      const lines = robotsContent.split('\n');
      const allowPaths = new Set();
      const disallowPaths = new Set();

      lines.forEach(line => {
        const allowMatch = line.match(/^Allow:\s*(.+)$/);
        const disallowMatch = line.match(/^Disallow:\s*(.+)$/);

        if (allowMatch) {
          allowPaths.add(allowMatch[1].trim());
        }
        if (disallowMatch) {
          disallowPaths.add(disallowMatch[1].trim());
        }
      });

      // Check for exact path conflicts (Allow: / and Disallow: / would conflict)
      // But Allow: / and Disallow: /api/ is fine
      allowPaths.forEach(path => {
        if (disallowPaths.has(path)) {
          throw new Error(`Conflicting rules for path: ${path}`);
        }
      });
    });
  });

  describe('Cross-validation (Requirements 8.1, 8.2, 8.6)', () => {
    it('should not have sitemap URLs blocked by robots.txt', () => {
      // Extract disallow patterns from robots.txt
      const disallowRegex = /Disallow:\s*(.+)/g;
      const disallowMatches = [...robotsContent.matchAll(disallowRegex)];
      const disallowPatterns = disallowMatches.map(match => match[1].trim());

      // Check each sitemap URL against disallow patterns
      sitemapUrls.forEach(url => {
        disallowPatterns.forEach(pattern => {
          // Simple pattern matching (not full regex support)
          if (pattern.endsWith('*')) {
            const prefix = pattern.slice(0, -1);
            if (url.startsWith(prefix)) {
              throw new Error(`Sitemap URL ${url} is blocked by robots.txt pattern ${pattern}`);
            }
          } else if (pattern.includes('*')) {
            // Handle wildcards in the middle
            const regexPattern = pattern.replace(/\*/g, '.*').replace(/\//g, '\\/');
            if (new RegExp(`^${regexPattern}`).test(url)) {
              throw new Error(`Sitemap URL ${url} is blocked by robots.txt pattern ${pattern}`);
            }
          } else {
            // Exact match or prefix match
            if (url === pattern || url.startsWith(pattern)) {
              throw new Error(`Sitemap URL ${url} is blocked by robots.txt pattern ${pattern}`);
            }
          }
        });
      });
    });

    it('should have all public pages in sitemap accessible', () => {
      // This is a sanity check that our main pages are both in sitemap and not blocked
      const criticalPages = [
        '/',
        '/courses',
        '/universities',
        '/scholarships',
        '/for-bangladeshi-students',
        '/sharda-university'
      ];

      criticalPages.forEach(page => {
        expect(sitemapUrls).toContain(page);
        
        // Check it's not explicitly disallowed (exact match only, not as part of pattern)
        // We need to be careful because "Disallow: /" might appear but "Allow: /" takes precedence
        const lines = robotsContent.split('\n');
        const exactDisallow = lines.some(line => {
          const trimmed = line.trim();
          return trimmed === `Disallow: ${page}` || trimmed === `Disallow: ${page}/`;
        });
        
        expect(exactDisallow).toBe(false);
      });
    });

    it('should have proper sitemap reference in robots.txt', () => {
      const sitemapLine = robotsContent.match(/Sitemap:\s*(.+)/);
      expect(sitemapLine).toBeTruthy();
      
      const sitemapUrl = sitemapLine[1].trim();
      expect(sitemapUrl).toBe('https://www.nextgenlearning.dev/sitemap.xml');
    });
  });

  describe('SEO Best Practices', () => {
    it('should have homepage with highest priority', () => {
      const homepageEntry = sitemapContent.match(
        /<url>[\s\S]*?<loc>https:\/\/www\.nextgenlearning\.dev\/<\/loc>[\s\S]*?<priority>([\d.]+)<\/priority>[\s\S]*?<\/url>/
      );

      expect(homepageEntry).toBeTruthy();
      const priority = parseFloat(homepageEntry[1]);
      expect(priority).toBe(1.0);
    });

    it('should have appropriate priorities for different page types', () => {
      // Homepage should be 1.0
      const homepagePriority = sitemapContent.match(
        /<url>[\s\S]*?<loc>https:\/\/www\.nextgenlearning\.dev\/<\/loc>[\s\S]*?<priority>([\d.]+)<\/priority>/
      );
      expect(parseFloat(homepagePriority[1])).toBe(1.0);

      // Main pages should be high priority (0.8-0.9)
      const coursesEntry = sitemapContent.match(
        /<url>[\s\S]*?<loc>https:\/\/www\.nextgenlearning\.dev\/courses<\/loc>[\s\S]*?<priority>([\d.]+)<\/priority>/
      );
      if (coursesEntry) {
        const priority = parseFloat(coursesEntry[1]);
        expect(priority).toBeGreaterThanOrEqual(0.8);
      }
    });

    it('should have recent lastmod dates for dynamic content', () => {
      const today = new Date();
      const sixMonthsAgo = new Date();
      sixMonthsAgo.setMonth(today.getMonth() - 6);

      // Check that at least some pages have recent updates
      const lastmodRegex = /<lastmod>([\d-]+)<\/lastmod>/g;
      const dates = [...sitemapContent.matchAll(lastmodRegex)];
      
      let recentDates = 0;
      dates.forEach(match => {
        const dateStr = match[1];
        const date = new Date(dateStr);
        if (date >= sixMonthsAgo) {
          recentDates++;
        }
      });

      // At least 50% of pages should have recent updates
      expect(recentDates).toBeGreaterThan(dates.length * 0.5);
    });
  });
});
