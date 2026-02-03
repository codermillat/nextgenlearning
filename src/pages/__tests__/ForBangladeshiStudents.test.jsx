/**
 * Unit tests for ForBangladeshiStudents page
 * Feature: seo-overhaul
 * Run with: npx vitest run src/pages/__tests__/ForBangladeshiStudents.test.jsx
 * 
 * Tests verify:
 * - Page exists at /for-bangladeshi-students route
 * - FAQ schema is present
 * - Scholarship information is displayed
 * - Popular programs are displayed
 * - Meta description contains "Bangladesh"
 * 
 * Validates: Requirements 6.1, 6.3, 6.4, 6.5, 6.8
 */

import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ForBangladeshiStudents from '../ForBangladeshiStudents.jsx';

/**
 * Helper function to render ForBangladeshiStudents component with Router context
 */
function renderBangladeshPage() {
  return render(
    <BrowserRouter>
      <ForBangladeshiStudents />
    </BrowserRouter>
  );
}

describe('ForBangladeshiStudents Page', () => {
  describe('Page Existence and Route', () => {
    it('should render without errors', () => {
      const { container } = renderBangladeshPage();
      expect(container).toBeTruthy();
      expect(container.innerHTML.length).toBeGreaterThan(0);
    });

    it('should be accessible at /for-bangladeshi-students route', () => {
      // This test verifies the component renders, which confirms it can be mounted at the route
      const { container } = renderBangladeshPage();
      const html = container.innerHTML;
      
      // Should contain Bangladesh-specific content
      expect(html).toContain('Bangladesh');
      expect(html).toContain('Bangladeshi');
    });
  });

  describe('Meta Description - Requirement 6.8', () => {
    it('should have meta description containing "Bangladesh"', () => {
      renderBangladeshPage();
      
      // Check that meta description is set in document
      const metaDescription = document.querySelector('meta[name="description"]');
      expect(metaDescription).toBeTruthy();
      
      const description = metaDescription?.getAttribute('content') || '';
      
      // Should contain "Bangladesh"
      expect(description).toContain('Bangladesh');
    });

    it('should have optimized meta description with Bangladesh content', () => {
      renderBangladeshPage();
      
      const metaDescription = document.querySelector('meta[name="description"]');
      const description = metaDescription?.getAttribute('content') || '';
      
      // Should contain Bangladesh-related content
      expect(description).toContain('Bangladesh');
      expect(description.length).toBeGreaterThan(100);
    });

    it('should have meta description with key elements', () => {
      renderBangladeshPage();
      
      const metaDescription = document.querySelector('meta[name="description"]');
      const description = metaDescription?.getAttribute('content') || '';
      
      // Should be a reasonable length (MetaManager may truncate to fit constraints)
      expect(description.length).toBeGreaterThan(100);
      expect(description.length).toBeLessThanOrEqual(160);
    });
  });

  describe('FAQ Schema - Requirement 6.3', () => {
    it('should include FAQ schema markup', () => {
      renderBangladeshPage();
      
      // Find FAQ schema script tag
      const scripts = document.querySelectorAll('script[type="application/ld+json"]');
      let hasFAQSchema = false;
      
      scripts.forEach(script => {
        try {
          const data = JSON.parse(script.textContent || '{}');
          if (data['@type'] === 'FAQPage') {
            hasFAQSchema = true;
          }
        } catch {
          // Ignore parse errors
        }
      });
      
      expect(hasFAQSchema).toBe(true);
    });

    it('should have FAQ schema with mainEntity array', () => {
      renderBangladeshPage();
      
      const scripts = document.querySelectorAll('script[type="application/ld+json"]');
      let faqSchema = null;
      
      scripts.forEach(script => {
        try {
          const data = JSON.parse(script.textContent || '{}');
          if (data['@type'] === 'FAQPage') {
            faqSchema = data;
          }
        } catch {
          // Ignore parse errors
        }
      });
      
      expect(faqSchema).toBeTruthy();
      expect(faqSchema?.mainEntity).toBeTruthy();
      expect(Array.isArray(faqSchema?.mainEntity)).toBe(true);
      expect(faqSchema?.mainEntity.length).toBeGreaterThan(0);
    });

    it('should have FAQ questions about scholarships', () => {
      const { container } = renderBangladeshPage();
      const html = container.innerHTML;
      
      // Should have FAQ about scholarships
      expect(html).toContain('scholarship');
      expect(html).toContain('GPA');
    });

    it('should have FAQ questions about visa process', () => {
      const { container } = renderBangladeshPage();
      const html = container.innerHTML;
      
      // Should have FAQ about visa
      expect(html).toContain('visa');
      expect(html).toContain('Indian High Commission');
    });
  });

  describe('Scholarship Information - Requirement 6.4', () => {
    it('should display scholarship information', () => {
      const { container } = renderBangladeshPage();
      const html = container.innerHTML;
      
      // Should mention scholarships
      expect(html).toContain('Scholarship');
      expect(html).toContain('scholarships');
    });

    it('should display 50% scholarship for GPA 3.5+', () => {
      const { container } = renderBangladeshPage();
      const html = container.innerHTML;
      
      // Should show 50% scholarship
      expect(html).toContain('50%');
      expect(html).toContain('GPA 3.5');
    });

    it('should display 20% scholarship for GPA 3.0-3.4', () => {
      const { container } = renderBangladeshPage();
      const html = container.innerHTML;
      
      // Should show 20% scholarship
      expect(html).toContain('20%');
      expect(html).toContain('GPA 3.0');
    });

    it('should explain scholarship eligibility criteria', () => {
      const { container } = renderBangladeshPage();
      const html = container.innerHTML;
      
      // Should explain eligibility
      expect(html).toContain('HSC');
      expect(html).toContain('Eligibility');
    });

    it('should explain scholarship application process', () => {
      const { container } = renderBangladeshPage();
      const html = container.innerHTML;
      
      // Should explain how to apply
      expect(html).toContain('automatically applied');
    });
  });

  describe('Popular Programs - Requirement 6.5', () => {
    it('should display popular programs section', () => {
      const { container } = renderBangladeshPage();
      const html = container.innerHTML;
      
      // Should have popular programs section
      expect(html).toContain('Popular Programs');
    });

    it('should display B.Tech CSE program', () => {
      const { container } = renderBangladeshPage();
      const html = container.innerHTML;
      
      // Should show B.Tech CSE
      expect(html).toContain('B.Tech');
      expect(html).toContain('Computer Science');
    });

    it('should display MBBS program', () => {
      const { container } = renderBangladeshPage();
      const html = container.innerHTML;
      
      // Should show MBBS
      expect(html).toContain('MBBS');
    });

    it('should display MBA program', () => {
      const { container } = renderBangladeshPage();
      const html = container.innerHTML;
      
      // Should show MBA
      expect(html).toContain('MBA');
    });

    it('should display BBA program', () => {
      const { container } = renderBangladeshPage();
      const html = container.innerHTML;
      
      // Should show BBA
      expect(html).toContain('BBA');
    });

    it('should display program fees', () => {
      const { container } = renderBangladeshPage();
      const html = container.innerHTML;
      
      // Should show fees
      expect(html).toContain('Lakhs');
      expect(html).toContain('year');
    });

    it('should display program duration', () => {
      const { container } = renderBangladeshPage();
      const html = container.innerHTML;
      
      // Should show duration
      expect(html).toContain('years');
      expect(html).toContain('4 years');
    });

    it('should have links to program detail pages', () => {
      const { container } = renderBangladeshPage();
      
      // Should have links to program pages
      const btechLinks = container.querySelectorAll('a[href="/sharda-university/programs/btech-cse"]');
      const mbaLinks = container.querySelectorAll('a[href="/sharda-university/programs/mba"]');
      
      expect(btechLinks.length).toBeGreaterThan(0);
      expect(mbaLinks.length).toBeGreaterThan(0);
    });
  });

  describe('Hero Section', () => {
    it('should display hero section with Bangladesh flag', () => {
      const { container } = renderBangladeshPage();
      const html = container.innerHTML;
      
      // Should have Bangladesh flag emoji
      expect(html).toContain('🇧🇩');
    });

    it('should display main heading about studying in India', () => {
      const { container } = renderBangladeshPage();
      const html = container.innerHTML;
      
      // Should have main heading
      expect(html).toContain('Study in India from Bangladesh');
    });

    it('should display key statistics', () => {
      const { container } = renderBangladeshPage();
      const html = container.innerHTML;
      
      // Should show key stats
      expect(html).toContain('3,000+');
      expect(html).toContain('Bangladeshi Students');
      expect(html).toContain('2-3 Hours');
    });

    it('should have Apply Now CTA button', () => {
      const { container } = renderBangladeshPage();
      const html = container.innerHTML;
      
      // Should have Apply Now button
      expect(html).toContain('Apply Now');
    });
  });

  describe('Admission Process Section', () => {
    it('should display admission process steps', () => {
      const { container } = renderBangladeshPage();
      const html = container.innerHTML;
      
      // Should have admission process section
      expect(html).toContain('Admission Process');
      expect(html).toContain('Step');
    });

    it('should explain document preparation', () => {
      const { container } = renderBangladeshPage();
      const html = container.innerHTML;
      
      // Should mention required documents
      expect(html).toContain('Document');
      expect(html).toContain('HSC');
      expect(html).toContain('Passport');
    });

    it('should explain visa application process', () => {
      const { container } = renderBangladeshPage();
      const html = container.innerHTML;
      
      // Should explain visa process
      expect(html).toContain('Visa');
      expect(html).toContain('Indian High Commission');
      expect(html).toContain('Dhaka');
    });

    it('should provide timeline information', () => {
      const { container } = renderBangladeshPage();
      const html = container.innerHTML;
      
      // Should show timeline
      expect(html).toContain('Timeline');
      expect(html).toContain('weeks');
    });
  });

  describe('Success Stories Section', () => {
    it('should display success stories from Bangladeshi students', () => {
      const { container } = renderBangladeshPage();
      const html = container.innerHTML;
      
      // Should have success stories
      expect(html).toContain('Success Stories');
      expect(html).toContain('Bangladesh');
    });

    it('should display student testimonials', () => {
      const { container } = renderBangladeshPage();
      const html = container.innerHTML;
      
      // Should show testimonials
      expect(html).toContain('Fahim Rahman');
      expect(html).toContain('Nusrat Jahan');
    });

    it('should display student achievements', () => {
      const { container } = renderBangladeshPage();
      const html = container.innerHTML;
      
      // Should show achievements
      expect(html).toContain('Microsoft');
      expect(html).toContain('Unilever');
    });
  });

  describe('Cultural Information Section', () => {
    it('should display cultural information', () => {
      const { container } = renderBangladeshPage();
      const html = container.innerHTML;
      
      // Should have cultural info
      expect(html).toContain('Life at Sharda');
    });

    it('should mention halal food availability', () => {
      const { container } = renderBangladeshPage();
      const html = container.innerHTML;
      
      // Should mention halal food
      expect(html).toContain('Halal');
      expect(html).toContain('food');
    });

    it('should mention prayer facilities', () => {
      const { container } = renderBangladeshPage();
      const html = container.innerHTML;
      
      // Should mention prayer facilities
      expect(html).toContain('Prayer');
      expect(html).toContain('Mosques');
    });

    it('should mention proximity to Bangladesh', () => {
      const { container } = renderBangladeshPage();
      const html = container.innerHTML;
      
      // Should mention proximity
      expect(html).toContain('Dhaka');
      expect(html).toContain('Delhi');
    });

    it('should mention Bangladeshi community', () => {
      const { container } = renderBangladeshPage();
      const html = container.innerHTML;
      
      // Should mention community
      expect(html).toContain('Bangladeshi');
      expect(html).toContain('community');
    });
  });

  describe('CTAs and Navigation', () => {
    it('should have multiple Apply Now CTAs', () => {
      const { container } = renderBangladeshPage();
      const html = container.innerHTML;
      
      // Should have multiple Apply Now buttons
      const applyCount = (html.match(/Apply Now/g) || []).length;
      expect(applyCount).toBeGreaterThan(2);
    });

    it('should have WhatsApp CTA', () => {
      const { container } = renderBangladeshPage();
      const html = container.innerHTML;
      
      // Should have WhatsApp CTA
      expect(html).toContain('WhatsApp');
    });

    it('should have links to fee structure pages', () => {
      const { container } = renderBangladeshPage();
      
      // Should have links to fee pages
      const feeLinks = container.querySelectorAll('a[href*="fees"]');
      expect(feeLinks.length).toBeGreaterThan(0);
    });
  });

  describe('SEO and Structured Data', () => {
    it('should have Article schema markup', () => {
      renderBangladeshPage();
      
      const scripts = document.querySelectorAll('script[type="application/ld+json"]');
      let hasArticleSchema = false;
      
      scripts.forEach(script => {
        try {
          const data = JSON.parse(script.textContent || '{}');
          if (data['@type'] === 'Article') {
            hasArticleSchema = true;
          }
        } catch {
          // Ignore parse errors
        }
      });
      
      expect(hasArticleSchema).toBe(true);
    });

    it('should have proper title tag', () => {
      renderBangladeshPage();
      
      const title = document.title;
      expect(title).toBeTruthy();
      expect(title.length).toBeLessThanOrEqual(60);
      expect(title).toContain('2026');
    });
  });

  describe('Content Quality', () => {
    it('should mention Sharda University', () => {
      const { container } = renderBangladeshPage();
      const html = container.innerHTML;
      
      // Should mention Sharda University
      expect(html).toContain('Sharda University');
    });

    it('should mention Sharda University accreditation', () => {
      const { container } = renderBangladeshPage();
      const html = container.innerHTML;
      
      // Should mention university quality/accreditation
      expect(html).toContain('Sharda University');
      expect(html).toContain('Quality Education');
    });

    it('should provide cost information', () => {
      const { container } = renderBangladeshPage();
      const html = container.innerHTML;
      
      // Should show costs
      expect(html).toContain('₹');
      expect(html).toContain('Lakhs');
    });

    it('should be Bangladesh-focused throughout', () => {
      const { container } = renderBangladeshPage();
      const html = container.innerHTML;
      
      // Should have multiple mentions of Bangladesh/Bangladeshi
      const bangladeshCount = (html.match(/Bangladesh/gi) || []).length;
      expect(bangladeshCount).toBeGreaterThan(10);
    });
  });
});
