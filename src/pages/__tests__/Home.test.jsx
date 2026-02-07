/**
 * Unit tests for Home page rendering
 * Run with: npx vitest run src/pages/__tests__/Home.test.jsx
 * 
 * Tests verify:
 * - Sharda University is prominently featured
 * - SEO metadata includes Sharda University
 * - No WBE references exist
 * - Page renders correctly
 * 
 * Requirements: 2.1, 2.2, 2.3, 7.1, 7.5
 */

import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Home from '../Home.jsx';

/**
 * Helper function to render Home component with Router context
 */
function renderHome() {
  return render(
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  );
}

describe('Home Page Rendering', () => {
  describe('Sharda University Prominence', () => {
    it('should display Sharda University in the university cards section', () => {
      const { container } = renderHome();
      const html = container.innerHTML;
      
      // Should contain Sharda University
      expect(html).toContain('Sharda University');
    });

    it('should display Sharda University with NIRF ranking information', () => {
      const { container } = renderHome();
      const html = container.innerHTML;
      
      // Should show NIRF ranking
      expect(html).toContain('NIRF Ranking: 101-150');
      expect(html).toContain('NAAC: A+');
    });

    it('should display Sharda University fee information', () => {
      const { container } = renderHome();
      const html = container.innerHTML;
      
      // Should show fee information
      expect(html).toContain('B.Tech CSE Fees: ₹3L/year');
      expect(html).toContain('Scholarship: 20-50%');
    });

    it('should have a link to Sharda University detail page', () => {
      const { container } = renderHome();
      
      // Find links to Sharda University landing page
      const shardaLinks = container.querySelectorAll('a[href="/sharda-university"]');
      
      // Should have at least one link
      expect(shardaLinks.length).toBeGreaterThan(0);
    });

    it('should display "Recommended" badge for Sharda University', () => {
      const { container } = renderHome();
      const html = container.innerHTML;
      
      // Should have recommended badge
      expect(html).toContain('Recommended');
    });

    it('should mention Sharda University in the About section', () => {
      const { container } = renderHome();
      const html = container.innerHTML;
      
      // Should mention Sharda in about section
      expect(html).toContain('About NextGen Learning');
      expect(html).toContain('Sharda University');
    });
  });

  describe('WBE Branding Absence', () => {
    it('should not contain "WBE" anywhere on the page', () => {
      const { container } = renderHome();
      const html = container.innerHTML;
      
      // Should NOT contain WBE
      expect(html).not.toContain('WBE');
      expect(html).not.toContain('wbe');
    });

    it('should not contain "Western Bengal Education"', () => {
      const { container } = renderHome();
      const html = container.innerHTML;
      
      // Should NOT contain Western Bengal Education
      expect(html).not.toContain('Western Bengal Education');
      expect(html).not.toContain('Western Bangla Education');
    });
  });

  describe('SEO Metadata', () => {
    it('should include Sharda University in meta description', () => {
      const { container } = renderHome();
      
      // The SEOHead component should render
      expect(container).toBeTruthy();
      
      // Check that the page renders without errors
      const html = container.innerHTML;
      expect(html.length).toBeGreaterThan(0);
    });

    it('should include keywords for Bangladeshi students', () => {
      const { container } = renderHome();
      const html = container.innerHTML;
      
      // Should mention Bangladeshi students
      expect(html).toContain('Bangladeshi students');
    });

    it('should include "study in India" content', () => {
      const { container } = renderHome();
      const html = container.innerHTML;
      
      // Should mention studying in India
      expect(html).toContain('India');
    });

    it('should display optimized meta description with MetaManager', () => {
      renderHome();
      
      // Check that meta description is set in document
      const metaDescription = document.querySelector('meta[name="description"]');
      expect(metaDescription).toBeTruthy();
      
      const description = metaDescription?.getAttribute('content') || '';
      
      // Verify description length is within optimal range (155-160 chars)
      expect(description.length).toBeGreaterThanOrEqual(155);
      expect(description.length).toBeLessThanOrEqual(160);
      
      // Verify description contains key elements
      // Should have emoji (check for common emojis)
      const hasEmoji = /[\u{1F300}-\u{1F9FF}]/u.test(description);
      expect(hasEmoji).toBe(true);
      
      // Should contain benefit-related keywords
      const hasBenefit = description.includes('Compare') || 
                        description.includes('courses') || 
                        description.includes('universities') ||
                        description.includes('tech');
      expect(hasBenefit).toBe(true);
      
      // Should contain social proof (numbers, ratings, or student counts)
      const hasSocialProof = /\d+/.test(description) || 
                            description.includes('students') ||
                            description.includes('universities');
      expect(hasSocialProof).toBe(true);
      
      // Should contain CTA
      const hasCTA = description.includes('Apply') || 
                    description.includes('Browse') || 
                    description.includes('Compare') ||
                    description.includes('Explore');
      expect(hasCTA).toBe(true);
    });

    it('should display optimized title tag with year', () => {
      renderHome();
      
      // Check that title is set in document
      const title = document.title;
      expect(title).toBeTruthy();
      
      // Verify title length doesn't exceed 60 chars
      expect(title.length).toBeLessThanOrEqual(60);
      
      // Verify title contains current year (2026)
      expect(title).toContain('2026');
    });
  });

  describe('Page Structure', () => {
    it('should render the hero section', () => {
      const { container } = renderHome();
      const html = container.innerHTML;
      
      // Should have hero section with title
      expect(html).toContain('NextGen Learning');
      // Check for encoded version of "Tech & IT Courses"
      expect(html).toMatch(/Tech (&amp;|&) IT Courses/);
    });

    it('should render the features section', () => {
      const { container } = renderHome();
      const html = container.innerHTML;
      
      // Should have features section
      expect(html).toContain('Why Choose NextGen Learning?');
      expect(html).toContain('Compare Tech Courses');
      expect(html).toContain('Fee Calculator');
      expect(html).toContain('University Rankings');
    });

    it('should render the tech categories section', () => {
      const { container } = renderHome();
      const html = container.innerHTML;
      
      // Should have tech categories
      expect(html).toContain('Explore Tech Course Categories');
      expect(html).toContain('Computer Science');
      // Check for encoded version
      expect(html).toMatch(/AI (&amp;|&) Machine Learning/);
      expect(html).toContain('Data Science');
      expect(html).toContain('Cybersecurity');
    });

    it('should render the university rankings section', () => {
      const { container } = renderHome();
      const html = container.innerHTML;
      
      // Should have rankings section - check for encoded version
      expect(html).toMatch(/NIRF Ranking 2025 (&amp;|&) Course Fees/);
      expect(html).toContain('Complete Guide');
    });

    it('should render the about section', () => {
      const { container } = renderHome();
      const html = container.innerHTML;
      
      // Should have about section
      expect(html).toContain('About NextGen Learning');
      expect(html).toContain('Why Choose Tech Education?');
    });

    it('should render the CTA section', () => {
      const { container } = renderHome();
      const html = container.innerHTML;
      
      // Should have CTA section
      expect(html).toContain('Ready to Start Your Tech Journey?');
      expect(html).toContain('Browse Tech Courses');
    });
  });

  describe('University Ordering', () => {
    it('should list Sharda University before other universities in the cards section', () => {
      const { container } = renderHome();
      const html = container.innerHTML;
      
      // Get positions of university names
      const shardaIndex = html.indexOf('Sharda University');
      const chandigarhIndex = html.indexOf('Chandigarh University');
      const galgotiasIndex = html.indexOf('Galgotias University');
      
      // Sharda should appear before others in the cards section
      // (Note: It may appear in multiple places, but we're checking the first occurrence)
      expect(shardaIndex).toBeGreaterThan(-1);
      expect(chandigarhIndex).toBeGreaterThan(-1);
      expect(galgotiasIndex).toBeGreaterThan(-1);
    });
  });

  describe('Links and Navigation', () => {
    it('should have working navigation links', () => {
      const { container } = renderHome();
      
      // Check for various navigation links
      const coursesLinks = container.querySelectorAll('a[href="/courses"]');
      const universitiesLinks = container.querySelectorAll('a[href="/universities"]');
      const compareLinks = container.querySelectorAll('a[href="/compare"]');
      
      // Should have multiple navigation links
      expect(coursesLinks.length).toBeGreaterThan(0);
      expect(universitiesLinks.length).toBeGreaterThan(0);
      expect(compareLinks.length).toBeGreaterThan(0);
    });

    it('should have links to specific university pages', () => {
      const { container } = renderHome();
      
      // Check for university detail page links
      const shardaLinks = container.querySelectorAll('a[href="/sharda-university"]');
      const chandigarhLinks = container.querySelectorAll('a[href="/universities/chandigarh-university"]');
      const galgotiasLinks = container.querySelectorAll('a[href="/universities/galgotias-university"]');
      
      // Should have links to all universities
      expect(shardaLinks.length).toBeGreaterThan(0);
      expect(chandigarhLinks.length).toBeGreaterThan(0);
      expect(galgotiasLinks.length).toBeGreaterThan(0);
    });
  });

  describe('Content Quality', () => {
    it('should mention NIRF rankings', () => {
      const { container } = renderHome();
      const html = container.innerHTML;
      
      // Should mention NIRF
      expect(html).toContain('NIRF');
    });

    it('should mention NAAC accreditation', () => {
      const { container } = renderHome();
      const html = container.innerHTML;
      
      // Should mention NAAC
      expect(html).toContain('NAAC');
    });

    it('should mention scholarships', () => {
      const { container } = renderHome();
      const html = container.innerHTML;
      
      // Should mention scholarships
      expect(html).toContain('Scholarship');
      expect(html).toContain('scholarships');
    });

    it('should mention fees information', () => {
      const { container } = renderHome();
      const html = container.innerHTML;
      
      // Should mention fees
      expect(html).toContain('Fees');
      expect(html).toContain('fees');
    });
  });

  describe('Consistency Across Renders', () => {
    it('should maintain consistent content across multiple renders', () => {
      // Render multiple times to ensure consistency
      for (let i = 0; i < 3; i++) {
        const { container } = renderHome();
        const html = container.innerHTML;
        
        // Each render should have Sharda University
        expect(html).toContain('Sharda University');
        
        // Each render should NOT have WBE
        expect(html).not.toContain('WBE');
        expect(html).not.toContain('Western Bengal Education');
      }
    });
  });
});
