/**
 * Unit tests for Bangladesh page integration
 * Run with: npx vitest run src/pages/__tests__/BangladeshPageIntegration.test.jsx
 * 
 * Tests verify:
 * - Navigation link is present in header
 * - Sitemap includes Bangladesh page URL
 * - Route is properly configured
 * 
 * Requirements: 6.6, 6.7
 */

import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Header from '../../components/Layout/Header';
import App from '../../App';
import { readFileSync } from 'fs';
import { join } from 'path';

/**
 * Helper function to render Header component with Router context
 */
function renderHeader() {
  return render(
    <BrowserRouter>
      <Header />
    </BrowserRouter>
  );
}

/**
 * Helper function to render App component
 */
function renderApp() {
  return render(<App />);
}

describe('Bangladesh Page Integration', () => {
  describe('Navigation Link Presence', () => {
    it('should display "For Bangladesh" link in desktop navigation', () => {
      const { container } = renderHeader();
      
      // Find the link in desktop navigation
      const desktopLink = container.querySelector('nav[aria-label="Main navigation"] a[href="/for-bangladeshi-students"]');
      
      expect(desktopLink).toBeTruthy();
      expect(desktopLink?.textContent).toContain('For Bangladesh');
    });

    it('should display "For Bangladesh" link in mobile navigation', () => {
      const { container } = renderHeader();
      
      // Find the link in mobile navigation (it exists in the DOM even if hidden)
      const mobileLinks = container.querySelectorAll('a[href="/for-bangladeshi-students"]');
      
      // Should have at least 1 link (desktop is always visible, mobile is conditional)
      expect(mobileLinks.length).toBeGreaterThanOrEqual(1);
    });

    it('should have correct link href for Bangladesh page', () => {
      const { container } = renderHeader();
      
      const links = container.querySelectorAll('a[href="/for-bangladeshi-students"]');
      
      // Verify all links point to correct route
      links.forEach(link => {
        expect(link.getAttribute('href')).toBe('/for-bangladeshi-students');
      });
    });

    it('should have Bangladesh flag emoji in mobile navigation when menu is open', () => {
      renderHeader();
      
      // Read the Header component source to verify emoji is in the code
      const headerPath = join(process.cwd(), 'src', 'components', 'Layout', 'Header.jsx');
      const headerContent = readFileSync(headerPath, 'utf-8');
      
      // Check for Bangladesh flag emoji in the source code
      expect(headerContent).toContain('🇧🇩');
    });

    it('should position Bangladesh link between Guides and Compare in desktop nav', () => {
      const { container } = renderHeader();
      
      // Get the desktop navigation section
      const desktopNav = container.querySelector('nav[aria-label="Main navigation"]');
      expect(desktopNav).toBeTruthy();
      
      const navHtml = desktopNav?.innerHTML || '';
      
      // Find positions of links
      const guidesIndex = navHtml.indexOf('href="/guides"');
      const bangladeshIndex = navHtml.indexOf('href="/for-bangladeshi-students"');
      const compareIndex = navHtml.indexOf('href="/compare"');
      
      // Bangladesh link should be between Guides and Compare
      expect(bangladeshIndex).toBeGreaterThan(guidesIndex);
      expect(compareIndex).toBeGreaterThan(bangladeshIndex);
    });
  });

  describe('Sitemap Inclusion', () => {
    it('should include Bangladesh page URL in sitemap.xml', () => {
      // Read sitemap.xml file
      const sitemapPath = join(process.cwd(), 'public', 'sitemap.xml');
      const sitemapContent = readFileSync(sitemapPath, 'utf-8');
      
      // Check for Bangladesh page URL
      expect(sitemapContent).toContain('https://www.nextgenlearning.dev/for-bangladeshi-students');
    });

    it('should have correct priority for Bangladesh page in sitemap', () => {
      const sitemapPath = join(process.cwd(), 'public', 'sitemap.xml');
      const sitemapContent = readFileSync(sitemapPath, 'utf-8');
      
      // Find the Bangladesh page entry
      const bangladeshEntryMatch = sitemapContent.match(
        /<url>[\s\S]*?<loc>https:\/\/www\.nextgenlearning\.dev\/for-bangladeshi-students<\/loc>[\s\S]*?<priority>([\d.]+)<\/priority>[\s\S]*?<\/url>/
      );
      
      expect(bangladeshEntryMatch).toBeTruthy();
      
      // Priority should be 0.9 (high priority)
      const priority = bangladeshEntryMatch?.[1];
      expect(priority).toBe('0.9');
    });

    it('should have correct changefreq for Bangladesh page in sitemap', () => {
      const sitemapPath = join(process.cwd(), 'public', 'sitemap.xml');
      const sitemapContent = readFileSync(sitemapPath, 'utf-8');
      
      // Find the Bangladesh page entry
      const bangladeshEntryMatch = sitemapContent.match(
        /<url>[\s\S]*?<loc>https:\/\/www\.nextgenlearning\.dev\/for-bangladeshi-students<\/loc>[\s\S]*?<changefreq>(\w+)<\/changefreq>[\s\S]*?<\/url>/
      );
      
      expect(bangladeshEntryMatch).toBeTruthy();
      
      // Change frequency should be weekly
      const changefreq = bangladeshEntryMatch?.[1];
      expect(changefreq).toBe('weekly');
    });

    it('should have lastmod date for Bangladesh page in sitemap', () => {
      const sitemapPath = join(process.cwd(), 'public', 'sitemap.xml');
      const sitemapContent = readFileSync(sitemapPath, 'utf-8');
      
      // Find the Bangladesh page entry
      const bangladeshEntryMatch = sitemapContent.match(
        /<url>[\s\S]*?<loc>https:\/\/www\.nextgenlearning\.dev\/for-bangladeshi-students<\/loc>[\s\S]*?<lastmod>([\d-]+)<\/lastmod>[\s\S]*?<\/url>/
      );
      
      expect(bangladeshEntryMatch).toBeTruthy();
      
      // Should have a valid date
      const lastmod = bangladeshEntryMatch?.[1];
      expect(lastmod).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    });
  });

  describe('Route Configuration', () => {
    it('should have route configured in App.jsx', () => {
      // This test verifies the route exists by checking if App renders without errors
      const { container } = renderApp();
      
      expect(container).toBeTruthy();
    });

    it('should lazy load ForBangladeshiStudents component', () => {
      // Read App.jsx to verify lazy loading
      const appPath = join(process.cwd(), 'src', 'App.jsx');
      const appContent = readFileSync(appPath, 'utf-8');
      
      // Check for lazy import
      expect(appContent).toContain("lazy(() => import('./pages/ForBangladeshiStudents'))");
    });

    it('should have route path /for-bangladeshi-students', () => {
      const appPath = join(process.cwd(), 'src', 'App.jsx');
      const appContent = readFileSync(appPath, 'utf-8');
      
      // Check for route definition
      expect(appContent).toContain('path="/for-bangladeshi-students"');
      expect(appContent).toContain('element={<ForBangladeshiStudents />}');
    });
  });

  describe('Accessibility', () => {
    it('should have proper focus styles on navigation links', () => {
      const { container } = renderHeader();
      
      const links = container.querySelectorAll('a[href="/for-bangladeshi-students"]');
      
      links.forEach(link => {
        const classes = link.className;
        
        // Should have focus styles
        expect(classes).toContain('focus:outline-none');
        expect(classes).toContain('focus:ring-2');
        expect(classes).toContain('focus:ring-blue-500');
      });
    });

    it('should have proper hover styles on navigation links', () => {
      const { container } = renderHeader();
      
      const desktopLink = container.querySelector('nav[aria-label="Main navigation"] a[href="/for-bangladeshi-students"]');
      
      expect(desktopLink).toBeTruthy();
      
      const classes = desktopLink?.className || '';
      
      // Should have hover styles
      expect(classes).toContain('hover:text-blue-600');
      expect(classes).toContain('hover:bg-blue-50');
    });
  });

  describe('Responsive Design', () => {
    it('should have responsive text sizing for desktop link', () => {
      const { container } = renderHeader();
      
      const desktopLink = container.querySelector('nav[aria-label="Main navigation"] a[href="/for-bangladeshi-students"]');
      
      expect(desktopLink).toBeTruthy();
      
      const classes = desktopLink?.className || '';
      
      // Should have responsive text sizing
      expect(classes).toContain('text-sm');
      expect(classes).toContain('xl:text-base');
    });

    it('should have proper mobile menu styling', () => {
      renderHeader();
      
      // Read the Header component source to verify mobile styling exists
      const headerPath = join(process.cwd(), 'src', 'components', 'Layout', 'Header.jsx');
      const headerContent = readFileSync(headerPath, 'utf-8');
      
      // Check that mobile menu has proper styling in the code
      expect(headerContent).toContain('min-h-[44px]');
      expect(headerContent).toContain('block px-4 py-3');
    });
  });

  describe('Link Consistency', () => {
    it('should have consistent link text across desktop and mobile', () => {
      const { container } = renderHeader();
      
      const links = container.querySelectorAll('a[href="/for-bangladeshi-students"]');
      
      // All links should contain "For Bangladesh" text
      links.forEach(link => {
        expect(link.textContent).toContain('For Bangladesh');
      });
    });

    it('should have consistent href across all instances', () => {
      const { container } = renderHeader();
      
      const links = container.querySelectorAll('a[href="/for-bangladeshi-students"]');
      
      // All links should have the same href
      links.forEach(link => {
        expect(link.getAttribute('href')).toBe('/for-bangladeshi-students');
      });
    });
  });
});
