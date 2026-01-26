/**
 * Property-Based Tests for Footer Component
 * Feature: sharda-university-rebranding
 * 
 * These tests verify that the Footer component displays the correct
 * contact information and does not contain old branding.
 */

import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Footer from '../Footer.jsx';
import { WHATSAPP_NUMBER, WHATSAPP_DISPLAY } from '../../../config/constants.js';

/**
 * Helper function to render Footer component with Router context
 */
function renderFooter() {
  return render(
    <BrowserRouter>
      <Footer />
    </BrowserRouter>
  );
}

describe('Footer Component - Property Tests', () => {
  /**
   * Property 1: Contact Number Consistency
   * **Validates: Requirements 1.1, 1.2, 9.1**
   * 
   * For any page or component that displays contact information, 
   * the rendered output should contain the new WhatsApp number 918800996151 
   * and should not contain the old number 8801611533385.
   */
  describe('Property 1: Contact Number Consistency', () => {
    it('should display the new WhatsApp number in the correct format', () => {
      const { container } = renderFooter();
      const html = container.innerHTML;
      
      // Should contain the new WhatsApp number
      expect(html).toContain('918800996151');
      
      // Should display the formatted number
      expect(html).toContain(WHATSAPP_DISPLAY);
    });

    it('should not contain the old WhatsApp number anywhere', () => {
      const { container } = renderFooter();
      const html = container.innerHTML;
      
      // Should NOT contain the old number in any format
      expect(html).not.toContain('8801611533385');
      expect(html).not.toContain('+8801611533385');
      expect(html).not.toContain('880 161 153 3385');
    });

    it('should have WhatsApp link with correct href attribute', () => {
      const { container } = renderFooter();
      
      // Find the WhatsApp link
      const whatsappLink = container.querySelector('a[href*="wa.me"]');
      
      expect(whatsappLink).toBeTruthy();
      expect(whatsappLink.getAttribute('href')).toBe(`https://wa.me/${WHATSAPP_NUMBER}`);
    });

    it('should have WhatsApp link with correct security attributes', () => {
      const { container } = renderFooter();
      
      // Find the WhatsApp link
      const whatsappLink = container.querySelector('a[href*="wa.me"]');
      
      expect(whatsappLink).toBeTruthy();
      expect(whatsappLink.getAttribute('target')).toBe('_blank');
      expect(whatsappLink.getAttribute('rel')).toBe('noopener noreferrer');
    });

    it('should display the WhatsApp number with the emoji indicator', () => {
      const { container } = renderFooter();
      const html = container.innerHTML;
      
      // Should have the WhatsApp emoji (💬) near the number
      expect(html).toContain('💬');
      
      // The emoji should be in the same link as the number
      const whatsappLink = container.querySelector('a[href*="wa.me"]');
      expect(whatsappLink).toBeTruthy();
      expect(whatsappLink.textContent).toContain('💬');
      expect(whatsappLink.textContent).toContain(WHATSAPP_DISPLAY);
    });

    it('should have "WhatsApp Support" label near the contact number', () => {
      const { container } = renderFooter();
      const html = container.innerHTML;
      
      // Should have the WhatsApp Support label
      expect(html).toContain('WhatsApp Support');
    });

    it('should use constants from config file, not hardcoded values', () => {
      const { container } = renderFooter();
      
      // The displayed number should match the constant
      expect(container.textContent).toContain(WHATSAPP_DISPLAY);
      
      // The link should use the constant
      const whatsappLink = container.querySelector('a[href*="wa.me"]');
      expect(whatsappLink.getAttribute('href')).toContain(WHATSAPP_NUMBER);
    });

    it('should render contact information in the Contact & Support section', () => {
      const { container } = renderFooter();
      const html = container.innerHTML;
      
      // Should have the Contact & Support heading (HTML encoded)
      expect(html).toContain('Contact &amp; Support');
      
      // The WhatsApp number should be in the same section
      const contactSection = Array.from(container.querySelectorAll('h3'))
        .find(h3 => h3.textContent === 'Contact & Support')
        ?.closest('div');
      
      expect(contactSection).toBeTruthy();
      expect(contactSection.textContent).toContain(WHATSAPP_DISPLAY);
    });

    it('should maintain consistency across multiple renders', () => {
      // Render multiple times to ensure consistency
      for (let i = 0; i < 5; i++) {
        const { container } = renderFooter();
        const html = container.innerHTML;
        
        // Each render should have the new number
        expect(html).toContain('918800996151');
        
        // Each render should NOT have the old number
        expect(html).not.toContain('8801611533385');
      }
    });
  });
});
