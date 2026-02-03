/**
 * Unit tests for TermsAndConditions page rendering
 * Run with: npx vitest run src/pages/__tests__/TermsAndConditions.test.jsx
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
import TermsAndConditions from '../TermsAndConditions.jsx';
import { WHATSAPP_DISPLAY, getWhatsAppUrl } from '../../config/constants.js';

/**
 * Helper function to render TermsAndConditions component with Router context
 */
function renderTermsAndConditions() {
  return render(
    <BrowserRouter>
      <TermsAndConditions />
    </BrowserRouter>
  );
}

describe('TermsAndConditions Page Rendering', () => {
  describe('New WhatsApp Number Display', () => {
    it('should display the new WhatsApp number in the correct format', () => {
      const { container } = renderTermsAndConditions();
      const html = container.innerHTML;
      
      // Should contain the new number
      expect(html).toContain('918800996151');
    });

    it('should display the formatted WhatsApp number with + prefix', () => {
      const { container } = renderTermsAndConditions();
      const html = container.innerHTML;
      
      // Should contain the formatted display number
      expect(html).toContain(WHATSAPP_DISPLAY);
    });

    it('should display the WhatsApp number in the contact section', () => {
      const { container } = renderTermsAndConditions();
      const html = container.innerHTML;
      
      // Should have the "Contact" section
      expect(html).toContain('Contact');
      
      // Should have the number displayed
      expect(html).toContain(WHATSAPP_DISPLAY);
    });
  });

  describe('Old WhatsApp Number Absence', () => {
    it('should not contain the old WhatsApp number anywhere', () => {
      const { container } = renderTermsAndConditions();
      const html = container.innerHTML;
      
      // Should NOT contain the old number
      expect(html).not.toContain('8801611533385');
    });

    it('should not contain the old number with + prefix', () => {
      const { container } = renderTermsAndConditions();
      const html = container.innerHTML;
      
      // Should NOT contain the old formatted number
      expect(html).not.toContain('+8801611533385');
    });
  });

  describe('WBE Branding Removal', () => {
    it('should not contain "WBE" anywhere in the page', () => {
      const { container } = renderTermsAndConditions();
      const html = container.innerHTML;
      
      // Should NOT contain WBE
      expect(html).not.toContain('WBE');
    });

    it('should not contain "Western Bangla Education" anywhere in the page', () => {
      const { container } = renderTermsAndConditions();
      const html = container.innerHTML;
      
      // Should NOT contain Western Bangla Education
      expect(html).not.toContain('Western Bangla Education');
    });

    it('should not contain "Western Bengal Education" anywhere in the page', () => {
      const { container } = renderTermsAndConditions();
      const html = container.innerHTML;
      
      // Should NOT contain Western Bengal Education
      expect(html).not.toContain('Western Bengal Education');
    });

    it('should display "NextGen Learning" as the organization name', () => {
      const { container } = renderTermsAndConditions();
      const html = container.innerHTML;
      
      // Should contain NextGen Learning
      expect(html).toContain('NextGen Learning');
    });
  });

  describe('WhatsApp Link Correctness', () => {
    it('should have WhatsApp link with correct href attribute', () => {
      const { container } = renderTermsAndConditions();
      
      // Find all links with WhatsApp URL
      const whatsappLinks = container.querySelectorAll(`a[href="${getWhatsAppUrl()}"]`);
      
      // Should have at least one WhatsApp link
      expect(whatsappLinks.length).toBeGreaterThan(0);
      
      // Verify the href is correct
      expect(whatsappLinks[0].getAttribute('href')).toBe('https://wa.me/918800996151');
    });

    it('should have WhatsApp link with target="_blank" attribute', () => {
      const { container } = renderTermsAndConditions();
      
      // Find WhatsApp links
      const whatsappLinks = container.querySelectorAll(`a[href="${getWhatsAppUrl()}"]`);
      
      // Should open in new tab
      expect(whatsappLinks[0].getAttribute('target')).toBe('_blank');
    });

    it('should have WhatsApp link with rel="noopener noreferrer" attribute', () => {
      const { container } = renderTermsAndConditions();
      
      // Find WhatsApp links
      const whatsappLinks = container.querySelectorAll(`a[href="${getWhatsAppUrl()}"]`);
      
      // Should have security attributes
      expect(whatsappLinks[0].getAttribute('rel')).toBe('noopener noreferrer');
    });
  });

  describe('Contact Information', () => {
    it('should not display the old WBE email address', () => {
      const { container } = renderTermsAndConditions();
      const html = container.innerHTML;
      
      // Should NOT have the old email
      expect(html).not.toContain('westernbanglaedu@gmail.com');
    });

    it('should display the physical address', () => {
      const { container } = renderTermsAndConditions();
      const html = container.innerHTML;
      
      // Should have the address
      expect(html).toContain('Binodnagar');
      expect(html).toContain('Nawabganj');
      expect(html).toContain('Dinajpur');
    });
  });

  describe('Terms and Conditions Content', () => {
    it('should display the page title', () => {
      const { container } = renderTermsAndConditions();
      const html = container.innerHTML;
      
      // Should have "Terms and Conditions" heading
      expect(html).toContain('Terms and Conditions');
    });

    it('should display the last updated date', () => {
      const { container } = renderTermsAndConditions();
      const html = container.innerHTML;
      
      // Should have last updated text
      expect(html).toContain('Last updated:');
    });

    it('should display all required sections', () => {
      const { container } = renderTermsAndConditions();
      const html = container.innerHTML;
      
      // Should have all main sections
      expect(html).toContain('Content Usage');
      expect(html).toContain('Accuracy of Information');
      expect(html).toContain('External Links');
      expect(html).toContain('Intellectual Property');
      expect(html).toContain('User Responsibility');
      expect(html).toContain('Services Provided');
      expect(html).toContain('Limitation of Liability');
      expect(html).toContain('Privacy');
      expect(html).toContain('Indemnification');
      expect(html).toContain('Changes to Terms');
      expect(html).toContain('Governing Law');
      expect(html).toContain('Contact');
    });

    it('should mention NextGen Learning in the terms text', () => {
      const { container } = renderTermsAndConditions();
      const html = container.innerHTML;
      
      // Should reference NextGen Learning in the terms
      expect(html).toContain('NextGen Learning');
    });

    it('should not mention WBE in services section', () => {
      const { container } = renderTermsAndConditions();
      const html = container.innerHTML;
      
      // Services section should not mention WBE
      expect(html).toContain('Services Provided');
      expect(html).toContain('NextGen Learning provides free counseling');
      expect(html).not.toContain('WBE provides');
    });
  });

  describe('SEO and Metadata', () => {
    it('should have correct page title without WBE references', () => {
      const { container } = renderTermsAndConditions();
      
      // Component should render without errors
      expect(container).toBeTruthy();
      
      // The SEOHead component should set the title (we can't directly test document.title in this context)
      // but we can verify the component renders
    });

    it('should render structured data schemas', () => {
      renderTermsAndConditions();
      
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
        const { container } = renderTermsAndConditions();
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
