/**
 * Property-Based Tests for WBE Branding Absence
 * Feature: sharda-university-rebranding
 * 
 * These tests verify that no WBE branding appears in any rendered page content.
 * 
 * **Property 4: WBE Branding Absence in Rendered Content**
 * **Validates: Requirements 2.1, 2.2, 2.3, 2.4, 9.3, 9.5**
 * 
 * For any page rendered by the system, the HTML output should not contain 
 * the strings "WBE", "Western Bengal Education", or "Western Bangla Education".
 */

import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import fc from 'fast-check';
import { DataProvider } from '../../context/DataContext.jsx';

// Import all page components
import Home from '../Home.jsx';
import About from '../About.jsx';
import Apply from '../Apply.jsx';
import Contact from '../Contact.jsx';
import Universities from '../Universities.jsx';
import Courses from '../Courses.jsx';
import Guides from '../Guides.jsx';
import FAQ from '../FAQ.jsx';
import PrivacyPolicy from '../PrivacyPolicy.jsx';
import TermsAndConditions from '../TermsAndConditions.jsx';
import Scholarships from '../Scholarships.jsx';
import FeesAndScholarships from '../FeesAndScholarships.jsx';
import Rankings from '../Rankings.jsx';
import ProgramCategories from '../ProgramCategories.jsx';

/**
 * Helper function to render a page component with Router and Data context
 */
function renderPage(PageComponent) {
  return render(
    <BrowserRouter>
      <DataProvider>
        <PageComponent />
      </DataProvider>
    </BrowserRouter>
  );
}

/**
 * List of all page components to test
 * Note: Excluding pages that require route parameters (UniversityDetail, CourseDetail, etc.)
 * as they need specific data to render properly
 */
const pageComponents = [
  { name: 'Home', component: Home },
  { name: 'About', component: About },
  { name: 'Apply', component: Apply },
  { name: 'Contact', component: Contact },
  { name: 'Universities', component: Universities },
  { name: 'Courses', component: Courses },
  { name: 'Guides', component: Guides },
  { name: 'FAQ', component: FAQ },
  { name: 'PrivacyPolicy', component: PrivacyPolicy },
  { name: 'TermsAndConditions', component: TermsAndConditions },
  { name: 'Scholarships', component: Scholarships },
  { name: 'FeesAndScholarships', component: FeesAndScholarships },
  { name: 'Rankings', component: Rankings },
  { name: 'ProgramCategories', component: ProgramCategories }
];

describe('WBE Branding Absence - Property Tests', () => {
  /**
   * Property 4: WBE Branding Absence in Rendered Content
   * **Validates: Requirements 2.1, 2.2, 2.3, 2.4, 9.3, 9.5**
   */
  describe('Property 4: WBE Branding Absence in Rendered Content', () => {
    it('should not contain "WBE" text in any page', { timeout: 10000 }, () => {
      fc.assert(
        fc.property(
          fc.constantFrom(...pageComponents),
          (pageInfo) => {
            const { container } = renderPage(pageInfo.component);
            const html = container.innerHTML;
            
            // Convert to lowercase for case-insensitive search
            const htmlLower = html.toLowerCase();
            
            // Should NOT contain "wbe" (case-insensitive)
            // We check for word boundaries to avoid false positives
            const wbePattern = /\bwbe\b/i;
            expect(wbePattern.test(html)).toBe(false);
            
            // Additional check: should not contain "wbe" in any context
            if (htmlLower.includes('wbe')) {
              // If it does contain 'wbe', fail with a helpful message
              const context = html.substring(
                Math.max(0, htmlLower.indexOf('wbe') - 50),
                Math.min(html.length, htmlLower.indexOf('wbe') + 50)
              );
              throw new Error(`Found "WBE" in ${pageInfo.name} page. Context: ...${context}...`);
            }
          }
        ),
        { numRuns: 20 }
      );
    });

    it('should not contain "Western Bengal Education" text in any page', { timeout: 10000 }, () => {
      fc.assert(
        fc.property(
          fc.constantFrom(...pageComponents),
          (pageInfo) => {
            const { container } = renderPage(pageInfo.component);
            const html = container.innerHTML;
            const htmlLower = html.toLowerCase();
            
            // Should NOT contain "western bengal education" (case-insensitive)
            expect(htmlLower).not.toContain('western bengal education');
            
            if (htmlLower.includes('western bengal')) {
              const context = html.substring(
                Math.max(0, htmlLower.indexOf('western bengal') - 50),
                Math.min(html.length, htmlLower.indexOf('western bengal') + 100)
              );
              throw new Error(`Found "Western Bengal Education" in ${pageInfo.name} page. Context: ...${context}...`);
            }
          }
        ),
        { numRuns: 20 }
      );
    });

    it('should not contain "Western Bangla Education" text in any page', { timeout: 10000 }, () => {
      fc.assert(
        fc.property(
          fc.constantFrom(...pageComponents),
          (pageInfo) => {
            const { container } = renderPage(pageInfo.component);
            const html = container.innerHTML;
            const htmlLower = html.toLowerCase();
            
            // Should NOT contain "western bangla education" (case-insensitive)
            expect(htmlLower).not.toContain('western bangla education');
            
            if (htmlLower.includes('western bangla')) {
              const context = html.substring(
                Math.max(0, htmlLower.indexOf('western bangla') - 50),
                Math.min(html.length, htmlLower.indexOf('western bangla') + 100)
              );
              throw new Error(`Found "Western Bangla Education" in ${pageInfo.name} page. Context: ...${context}...`);
            }
          }
        ),
        { numRuns: 20 }
      );
    });

    it('should not contain old WhatsApp number in any page', { timeout: 10000 }, () => {
      fc.assert(
        fc.property(
          fc.constantFrom(...pageComponents),
          (pageInfo) => {
            const { container } = renderPage(pageInfo.component);
            const html = container.innerHTML;
            
            // Should NOT contain old WhatsApp number in any format
            expect(html).not.toContain('8801611533385');
            expect(html).not.toContain('+8801611533385');
            expect(html).not.toContain('880 161 153 3385');
            expect(html).not.toContain('880-161-153-3385');
            
            if (html.includes('8801611533385')) {
              const context = html.substring(
                Math.max(0, html.indexOf('8801611533385') - 50),
                Math.min(html.length, html.indexOf('8801611533385') + 50)
              );
              throw new Error(`Found old WhatsApp number in ${pageInfo.name} page. Context: ...${context}...`);
            }
          }
        ),
        { numRuns: 20 }
      );
    });

    it('should not contain WBE email address in any page', { timeout: 10000 }, () => {
      fc.assert(
        fc.property(
          fc.constantFrom(...pageComponents),
          (pageInfo) => {
            const { container } = renderPage(pageInfo.component);
            const html = container.innerHTML;
            const htmlLower = html.toLowerCase();
            
            // Should NOT contain WBE email addresses
            expect(htmlLower).not.toContain('westernbanglaedu@gmail.com');
            expect(htmlLower).not.toContain('westernbanglaedu');
            
            if (htmlLower.includes('westernbanglaedu')) {
              const context = html.substring(
                Math.max(0, htmlLower.indexOf('westernbanglaedu') - 50),
                Math.min(html.length, htmlLower.indexOf('westernbanglaedu') + 50)
              );
              throw new Error(`Found WBE email in ${pageInfo.name} page. Context: ...${context}...`);
            }
          }
        ),
        { numRuns: 20 }
      );
    });

    it('should contain new WhatsApp number instead of old one', { timeout: 10000 }, () => {
      fc.assert(
        fc.property(
          fc.constantFrom(...pageComponents),
          (pageInfo) => {
            const { container } = renderPage(pageInfo.component);
            const html = container.innerHTML;
            
            // If the page displays contact information, it should have the new number
            // We check if the page has any WhatsApp-related content
            const hasWhatsAppContent = html.toLowerCase().includes('whatsapp') || 
                                      html.includes('wa.me');
            
            if (hasWhatsAppContent) {
              // Should contain new number
              const hasNewNumber = html.includes('918800996151') || 
                                  html.includes('+918800996151');
              
              // Should NOT contain old number
              const hasOldNumber = html.includes('8801611533385');
              
              expect(hasOldNumber).toBe(false);
              
              // If it has WhatsApp links, it should use the new number
              if (html.includes('wa.me')) {
                expect(hasNewNumber).toBe(true);
              }
            }
          }
        ),
        { numRuns: 20 }
      );
    });

    it('should not contain WBE branding in meta tags or SEO content', { timeout: 10000 }, () => {
      fc.assert(
        fc.property(
          fc.constantFrom(...pageComponents),
          (pageInfo) => {
            const { container } = renderPage(pageInfo.component);
            
            // Check meta tags in the document head
            const metaTags = document.querySelectorAll('meta');
            const titleTag = document.querySelector('title');
            
            metaTags.forEach(meta => {
              const content = (meta.getAttribute('content') || '').toLowerCase();
              const name = (meta.getAttribute('name') || '').toLowerCase();
              
              // Should not contain WBE in meta content
              expect(content).not.toContain('wbe');
              expect(content).not.toContain('western bengal education');
              expect(content).not.toContain('western bangla education');
              expect(content).not.toContain('westernbanglaedu');
              
              // Should not contain old number
              expect(content).not.toContain('8801611533385');
            });
            
            if (titleTag) {
              const titleText = titleTag.textContent.toLowerCase();
              expect(titleText).not.toContain('wbe');
              expect(titleText).not.toContain('western bengal education');
              expect(titleText).not.toContain('western bangla education');
            }
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should not contain WBE branding in structured data schemas', () => {
      fc.assert(
        fc.property(
          fc.constantFrom(...pageComponents),
          (pageInfo) => {
            renderPage(pageInfo.component);
            
            // Check structured data scripts
            const structuredDataScripts = document.querySelectorAll('script[type="application/ld+json"]');
            
            structuredDataScripts.forEach(script => {
              const content = script.textContent.toLowerCase();
              
              // Should not contain WBE branding
              expect(content).not.toContain('wbe');
              expect(content).not.toContain('western bengal education');
              expect(content).not.toContain('western bangla education');
              expect(content).not.toContain('westernbanglaedu');
              
              // Should not contain old number
              expect(content).not.toContain('8801611533385');
              
              // Should contain new number if it has contact info
              if (content.includes('telephone')) {
                expect(content).toContain('918800996151');
              }
            });
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should maintain consistency across multiple renders of the same page', () => {
      fc.assert(
        fc.property(
          fc.constantFrom(...pageComponents),
          (pageInfo) => {
            // Render the same page multiple times
            for (let i = 0; i < 3; i++) {
              const { container } = renderPage(pageInfo.component);
              const html = container.innerHTML.toLowerCase();
              
              // Each render should not contain WBE branding
              expect(html).not.toContain('wbe');
              expect(html).not.toContain('western bengal education');
              expect(html).not.toContain('western bangla education');
              expect(html).not.toContain('8801611533385');
            }
          }
        ),
        { numRuns: 50 }
      );
    });

    it('should not contain WBE-related service descriptions', () => {
      fc.assert(
        fc.property(
          fc.constantFrom(...pageComponents),
          (pageInfo) => {
            const { container } = renderPage(pageInfo.component);
            const html = container.innerHTML.toLowerCase();
            
            // Should not contain WBE-specific service descriptions
            const wbeServicePatterns = [
              'wbe comprehensive package',
              'wbe annual fees',
              'wbe services',
              'wbe additional fees',
              'wbe recurring',
              'wbe enhanced'
            ];
            
            wbeServicePatterns.forEach(pattern => {
              expect(html).not.toContain(pattern);
            });
          }
        ),
        { numRuns: 100 }
      );
    });
  });

  /**
   * Additional validation tests for specific pages known to have had WBE content
   */
  describe('Specific Page Validation', () => {
    it('Universities page should not contain WBE references in FAQ answers', () => {
      const { container } = renderPage(Universities);
      const html = container.innerHTML.toLowerCase();
      
      expect(html).not.toContain('wbe');
      expect(html).not.toContain('western bengal education');
      expect(html).not.toContain('western bangla education');
      expect(html).not.toContain('8801611533385');
    });

    it('PrivacyPolicy page should not contain WBE organization name', () => {
      const { container } = renderPage(PrivacyPolicy);
      const html = container.innerHTML.toLowerCase();
      
      expect(html).not.toContain('wbe');
      expect(html).not.toContain('western bengal education');
      expect(html).not.toContain('western bangla education');
    });

    it('Scholarships page should not contain WBE scholarship references', () => {
      const { container } = renderPage(Scholarships);
      const html = container.innerHTML.toLowerCase();
      
      expect(html).not.toContain('wbe');
      expect(html).not.toContain('western bengal education');
      expect(html).not.toContain('western bangla education');
      expect(html).not.toContain('wbe scholarships');
    });

    it('ProgramCategories page should not contain WBE in title or description', () => {
      const { container } = renderPage(ProgramCategories);
      const html = container.innerHTML.toLowerCase();
      
      expect(html).not.toContain('wbe');
      expect(html).not.toContain('western bengal education');
      expect(html).not.toContain('western bangla education');
    });

    it('FeesAndScholarships page should not contain WBE fee structures', () => {
      const { container } = renderPage(FeesAndScholarships);
      const html = container.innerHTML.toLowerCase();
      
      expect(html).not.toContain('wbe');
      expect(html).not.toContain('western bengal education');
      expect(html).not.toContain('western bangla education');
      expect(html).not.toContain('wbe additional fees');
      expect(html).not.toContain('wbe recurring');
    });
  });
});
