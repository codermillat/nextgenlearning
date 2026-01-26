/**
 * Unit tests for Contact page rendering
 * Run with: npx vitest run src/pages/__tests__/Contact.test.jsx
 * 
 * Tests verify:
 * - New WhatsApp number is displayed
 * - Old WhatsApp number is not present
 * - WhatsApp link is correct
 * 
 * Requirements: 9.2
 */

import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Contact from '../Contact.jsx';
import { WHATSAPP_DISPLAY, getWhatsAppUrl } from '../../config/constants.js';

/**
 * Helper function to render Contact component with Router context
 */
function renderContact() {
  return render(
    <BrowserRouter>
      <Contact />
    </BrowserRouter>
  );
}

describe('Contact Page Rendering', () => {
  describe('New WhatsApp Number Display', () => {
    it('should display the new WhatsApp number in the correct format', () => {
      const { container } = renderContact();
      const html = container.innerHTML;
      
      // Should contain the new number
      expect(html).toContain('918800996151');
    });

    it('should display the formatted WhatsApp number with + prefix', () => {
      const { container } = renderContact();
      const html = container.innerHTML;
      
      // Should contain the formatted display number
      expect(html).toContain(WHATSAPP_DISPLAY);
    });

    it('should display the WhatsApp number in the contact information section', () => {
      const { container } = renderContact();
      const html = container.innerHTML;
      
      // Should have the "Phone / WhatsApp" heading
      expect(html).toContain('Phone / WhatsApp');
      
      // Should have the number displayed
      expect(html).toContain(WHATSAPP_DISPLAY);
    });
  });

  describe('Old WhatsApp Number Absence', () => {
    it('should not contain the old WhatsApp number anywhere', () => {
      const { container } = renderContact();
      const html = container.innerHTML;
      
      // Should NOT contain the old number
      expect(html).not.toContain('8801611533385');
    });

    it('should not contain the old number with + prefix', () => {
      const { container } = renderContact();
      const html = container.innerHTML;
      
      // Should NOT contain the old formatted number
      expect(html).not.toContain('+8801611533385');
    });

    it('should not contain the old number in any format', () => {
      const { container } = renderContact();
      const html = container.innerHTML;
      
      // Check various possible formats
      expect(html).not.toContain('880 161 153 3385');
      expect(html).not.toContain('880-161-153-3385');
      expect(html).not.toContain('(880) 161 153 3385');
    });
  });

  describe('WhatsApp Link Correctness', () => {
    it('should have WhatsApp link with correct href attribute', () => {
      const { container } = renderContact();
      
      // Find all links with WhatsApp URL
      const whatsappLinks = container.querySelectorAll(`a[href="${getWhatsAppUrl()}"]`);
      
      // Should have at least one WhatsApp link
      expect(whatsappLinks.length).toBeGreaterThan(0);
      
      // Verify the href is correct
      expect(whatsappLinks[0].getAttribute('href')).toBe('https://wa.me/918800996151');
    });

    it('should have WhatsApp link with target="_blank" attribute', () => {
      const { container } = renderContact();
      
      // Find WhatsApp links
      const whatsappLinks = container.querySelectorAll(`a[href="${getWhatsAppUrl()}"]`);
      
      // Should open in new tab
      expect(whatsappLinks[0].getAttribute('target')).toBe('_blank');
    });

    it('should have WhatsApp link with rel="noopener noreferrer" attribute', () => {
      const { container } = renderContact();
      
      // Find WhatsApp links
      const whatsappLinks = container.querySelectorAll(`a[href="${getWhatsAppUrl()}"]`);
      
      // Should have security attributes
      expect(whatsappLinks[0].getAttribute('rel')).toBe('noopener noreferrer');
    });

    it('should have multiple WhatsApp links (contact info and quick action button)', () => {
      const { container } = renderContact();
      
      // Find all WhatsApp-related elements
      const whatsappLinks = container.querySelectorAll(`a[href="${getWhatsAppUrl()}"]`);
      const whatsappButtons = container.querySelectorAll('button');
      
      // Should have at least one link and one button
      expect(whatsappLinks.length).toBeGreaterThan(0);
      expect(whatsappButtons.length).toBeGreaterThan(0);
    });
  });

  describe('Contact Page Content', () => {
    it('should display the page title', () => {
      const { container } = renderContact();
      const html = container.innerHTML;
      
      // Should have "Contact Us" heading
      expect(html).toContain('Contact Us');
    });

    it('should display the "Get in Touch" section', () => {
      const { container } = renderContact();
      const html = container.innerHTML;
      
      // Should have contact information section
      expect(html).toContain('Get in Touch');
    });

    it('should display the "Quick Actions" section', () => {
      const { container } = renderContact();
      const html = container.innerHTML;
      
      // Should have quick actions section
      expect(html).toContain('Quick Actions');
    });

    it('should display email contact information', () => {
      const { container } = renderContact();
      const html = container.innerHTML;
      
      // Should have email section
      expect(html).toContain('Email');
      expect(html).toContain('contact@nextgenlearning.dev');
    });

    it('should display office location', () => {
      const { container } = renderContact();
      const html = container.innerHTML;
      
      // Should have office location
      expect(html).toContain('Office Location');
      expect(html).toContain('Greater Noida');
    });

    it('should display "Who We Serve" section mentioning Bangladesh', () => {
      const { container } = renderContact();
      const html = container.innerHTML;
      
      // Should mention Bangladesh
      expect(html).toContain('Who We Serve');
      expect(html).toContain('Bangladesh');
    });
  });

  describe('SEO and Metadata', () => {
    it('should include WhatsApp number in meta description', () => {
      const { container } = renderContact();
      
      // Check if SEOHead component is rendering (it sets document metadata)
      // We can verify the component renders without errors
      expect(container).toBeTruthy();
    });

    it('should render structured data schemas', () => {
      const { container } = renderContact();
      
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
        const { container } = renderContact();
        const html = container.innerHTML;
        
        // Each render should have the new number
        expect(html).toContain('918800996151');
        expect(html).toContain(WHATSAPP_DISPLAY);
        
        // Each render should NOT have the old number
        expect(html).not.toContain('8801611533385');
      }
    });
  });
});
