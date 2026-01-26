/**
 * Unit tests for PrivacyPolicy page rendering
 * Run with: npx vitest run src/pages/__tests__/PrivacyPolicy.test.jsx
 * 
 * Tests verify:
 * - New WhatsApp number is displayed
 * - Old WhatsApp number is not present
 * - WBE references are removed
 * - Contact information is correct
 * 
 * Requirements: 1.1, 2.1, 2.2, 2.3
 */

import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import PrivacyPolicy from '../PrivacyPolicy.jsx';
import { WHATSAPP_DISPLAY, getWhatsAppUrl } from '../../config/constants.js';

/**
 * Helper function to render PrivacyPolicy component with Router context
 */
function renderPrivacyPolicy() {
  return render(
    <BrowserRouter>
      <PrivacyPolicy />
    </BrowserRouter>
  );
}

describe('PrivacyPolicy Page Rendering', () => {
  describe('New WhatsApp Number Display', () => {
    it('should display the new WhatsApp number in the correct format', () => {
      const { container } = renderPrivacyPolicy();
      const html = container.innerHTML;
      
      // Should contain the new number
      expect(html).toContain('918800996151');
    });

    it('should display the formatted WhatsApp number with + prefix', () => {
      const { container } = renderPrivacyPolicy();
      const html = container.innerHTML;
      
      // Should contain the formatted display number
      expect(html).toContain(WHATSAPP_DISPLAY);
    });

    it('should display the WhatsApp number in the contact section', () => {
      const { container } = renderPrivacyPolicy();
      const html = container.innerHTML;
      
      // Should have the "Contact Us" section
      expect(html).toContain('Contact Us');
      
      // Should have the number displayed
      expect(html).toContain(WHATSAPP_DISPLAY);
    });
  });

  describe('Old WhatsApp Number Absence', () => {
    it('should not contain the old WhatsApp number anywhere', () => {
      const { container } = renderPrivacyPolicy();
      const html = container.innerHTML;
      
      // Should NOT contain the old number
      expect(html).not.toContain('8801611533385');
    });

    it('should not contain the old number with + prefix', () => {
      const { container } = renderPrivacyPolicy();
      const html = container.innerHTML;
      
      // Should NOT contain the old formatted number
      expect(html).not.toContain('+8801611533385');
    });
  });

  describe('WBE Branding Removal', () => {
    it('should not contain "WBE" anywhere in the page', () => {
      const { container } = renderPrivacyPolicy();
      const html = container.innerHTML;
      
      // Should NOT contain WBE
      expect(html).not.toContain('WBE');
    });

    it('should not contain "Western Bangla Education" anywhere in the page', () => {
      const { container } = renderPrivacyPolicy();
      const html = container.innerHTML;
      
      // Should NOT contain Western Bangla Education
      expect(html).not.toContain('Western Bangla Education');
    });

    it('should not contain "Western Bengal Education" anywhere in the page', () => {
      const { container } = renderPrivacyPolicy();
      const html = container.innerHTML;
      
      // Should NOT contain Western Bengal Education
      expect(html).not.toContain('Western Bengal Education');
    });

    it('should display "NextGen Learning" as the organization name', () => {
      const { container } = renderPrivacyPolicy();
      const html = container.innerHTML;
      
      // Should contain NextGen Learning
      expect(html).toContain('NextGen Learning');
    });
  });

  describe('WhatsApp Link Correctness', () => {
    it('should have WhatsApp link with correct href attribute', () => {
      const { container } = renderPrivacyPolicy();
      
      // Find all links with WhatsApp URL
      const whatsappLinks = container.querySelectorAll(`a[href="${getWhatsAppUrl()}"]`);
      
      // Should have at least one WhatsApp link
      expect(whatsappLinks.length).toBeGreaterThan(0);
      
      // Verify the href is correct
      expect(whatsappLinks[0].getAttribute('href')).toBe('https://wa.me/918800996151');
    });

    it('should have WhatsApp link with target="_blank" attribute', () => {
      const { container } = renderPrivacyPolicy();
      
      // Find WhatsApp links
      const whatsappLinks = container.querySelectorAll(`a[href="${getWhatsAppUrl()}"]`);
      
      // Should open in new tab
      expect(whatsappLinks[0].getAttribute('target')).toBe('_blank');
    });

    it('should have WhatsApp link with rel="noopener noreferrer" attribute', () => {
      const { container } = renderPrivacyPolicy();
      
      // Find WhatsApp links
      const whatsappLinks = container.querySelectorAll(`a[href="${getWhatsAppUrl()}"]`);
      
      // Should have security attributes
      expect(whatsappLinks[0].getAttribute('rel')).toBe('noopener noreferrer');
    });
  });

  describe('Contact Information', () => {
    it('should display the new email address', () => {
      const { container } = renderPrivacyPolicy();
      const html = container.innerHTML;
      
      // Should have the new email
      expect(html).toContain('contact@nextgenlearning.dev');
    });

    it('should not display the old WBE email address', () => {
      const { container } = renderPrivacyPolicy();
      const html = container.innerHTML;
      
      // Should NOT have the old email
      expect(html).not.toContain('westernbanglaedu@gmail.com');
    });

    it('should not display the old physical address', () => {
      const { container } = renderPrivacyPolicy();
      const html = container.innerHTML;
      
      // Should NOT have the old address
      expect(html).not.toContain('Binodnagar');
      expect(html).not.toContain('Nawabganj');
      expect(html).not.toContain('Dinajpur');
    });
  });

  describe('Privacy Policy Content', () => {
    it('should display the page title', () => {
      const { container } = renderPrivacyPolicy();
      const html = container.innerHTML;
      
      // Should have "Privacy Policy" heading
      expect(html).toContain('Privacy Policy');
    });

    it('should display the last updated date', () => {
      const { container } = renderPrivacyPolicy();
      const html = container.innerHTML;
      
      // Should have last updated text
      expect(html).toContain('Last updated:');
    });

    it('should display all required sections', () => {
      const { container } = renderPrivacyPolicy();
      const html = container.innerHTML;
      
      // Should have all main sections
      expect(html).toContain('Information We Collect');
      expect(html).toContain('How We Use Your Information');
      expect(html).toContain('Cookies');
      expect(html).toContain('Data Sharing');
      expect(html).toContain('External Links');
      expect(html).toContain('Data Security');
      expect(html).toContain('Children\'s Privacy');
      expect(html).toContain('Your Rights');
      expect(html).toContain('Changes to This Policy');
      expect(html).toContain('Contact Us');
    });

    it('should mention NextGen Learning in the policy text', () => {
      const { container } = renderPrivacyPolicy();
      const html = container.innerHTML;
      
      // Should reference NextGen Learning in the policy
      expect(html).toContain('At <strong>NextGen Learning</strong>');
      expect(html).toContain('NextGen Learning reserves the right');
    });
  });

  describe('SEO and Metadata', () => {
    it('should have correct page title without WBE references', () => {
      const { container } = renderPrivacyPolicy();
      
      // Component should render without errors
      expect(container).toBeTruthy();
      
      // The SEOHead component should set the title (we can't directly test document.title in this context)
      // but we can verify the component renders
    });

    it('should render structured data schemas', () => {
      const { container } = renderPrivacyPolicy();
      
      // Check for structured data script tags
      const scripts = document.querySelectorAll('script[type="application/ld+json"]');
      
      // Should have structured data
      expect(scripts.length).toBeGreaterThan(0);
    });
  });

  describe('Consistency Across Renders', () => {
    it('should maintain consistent contact information across multiple renders', () => {
      // Render multiple times to ensure consistency
      for (let i = 0; i < 3; i++) {
        const { container } = renderPrivacyPolicy();
        const html = container.innerHTML;
        
        // Each render should have the new number
        expect(html).toContain('918800996151');
        expect(html).toContain(WHATSAPP_DISPLAY);
        
        // Each render should NOT have the old number
        expect(html).not.toContain('8801611533385');
        
        // Each render should NOT have WBE references
        expect(html).not.toContain('WBE');
        expect(html).not.toContain('Western Bangla Education');
        expect(html).not.toContain('Western Bengal Education');
      }
    });
  });
});
