/**
 * Unit tests for WhatsAppCTA component
 * Feature: sharda-university-content-enhancement
 * 
 * Tests verify:
 * - Phone number consistency (+91 88009 96151 for all students)
 * - Contextual message generation
 * - Mobile vs desktop link format
 * - Button variants (button, floating, inline)
 * - Event logging
 * - Accessibility
 * 
 * Validates: Requirements 2.6, 6.1, 6.2, 6.3, 6.4, 6.5, 6.6
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import WhatsAppCTA from '../WhatsAppCTA.jsx';
import * as conversionEventLogger from '../../../utils/conversionEventLogger.js';

// Mock the conversion event logger
vi.mock('../../../utils/conversionEventLogger.js', () => ({
  logWhatsAppClick: vi.fn(),
}));

describe('WhatsAppCTA Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    document.body.classList.remove('has-floating-cta');
    document.documentElement.classList.remove('has-floating-cta');
    document.body.removeAttribute('data-floating-cta-count');
  });

  describe('Basic Rendering', () => {
    it('renders with default props', () => {
      const { getByTestId } = render(<WhatsAppCTA />);
      const button = getByTestId('whatsapp-cta');
      expect(button).toBeTruthy();
      expect(button.getAttribute('href')).toBeTruthy();
    });

    it('renders with custom children', () => {
      const { getByText } = render(<WhatsAppCTA>Chat with Us</WhatsAppCTA>);
      expect(getByText('Chat with Us')).toBeTruthy();
    });

    it('renders default content for button variant', () => {
      const { getByText } = render(<WhatsAppCTA variant="button" />);
      expect(getByText('Connect on WhatsApp')).toBeTruthy();
    });

    it('renders icon only for floating variant', () => {
      const { getByTestId, queryByText } = render(<WhatsAppCTA variant="floating" />);
      const button = getByTestId('whatsapp-cta');
      expect(button.querySelector('svg')).toBeTruthy();
      expect(queryByText('Connect on WhatsApp')).toBeFalsy();
    });
  });

  describe('Phone Number Consistency - Requirement 6.1', () => {
    it('uses +91 88009 96151 for all students', () => {
      const { getByTestId } = render(<WhatsAppCTA context="landing" />);
      const button = getByTestId('whatsapp-cta');
      expect(button.getAttribute('data-phone')).toBe('+91 88009 96151');
    });

    it('uses same phone number for Bangladeshi context', () => {
      const { getByTestId } = render(<WhatsAppCTA context="bangladesh" />);
      const button = getByTestId('whatsapp-cta');
      expect(button.getAttribute('data-phone')).toBe('+91 88009 96151');
    });

    it('uses same phone number for international context', () => {
      const { getByTestId } = render(<WhatsAppCTA context="landing" />);
      const button = getByTestId('whatsapp-cta');
      expect(button.getAttribute('data-phone')).toBe('+91 88009 96151');
    });

    it('formats phone number correctly in WhatsApp link', () => {
      const { getByTestId } = render(<WhatsAppCTA context="landing" />);
      const button = getByTestId('whatsapp-cta');
      const href = button.getAttribute('href');
      // Should contain phone number without + and spaces
      expect(href).toMatch(/918800996151/);
    });
  });

  describe('Contextual Message Generation - Requirement 6.2', () => {
    it('generates program-specific message when program prop is provided', () => {
      const { getByTestId } = render(
        <WhatsAppCTA
          context="program-btech-cse"
          program="B.Tech Computer Science Engineering"
        />
      );
      const button = getByTestId('whatsapp-cta');
      const href = button.getAttribute('href');
      expect(href).toContain(encodeURIComponent('B.Tech Computer Science Engineering'));
    });

    it('generates landing page message for landing context', () => {
      const { getByTestId } = render(<WhatsAppCTA context="landing" />);
      const button = getByTestId('whatsapp-cta');
      const href = button.getAttribute('href');
      expect(href).toContain(encodeURIComponent('interested in studying at Sharda University'));
    });

    it('generates fee calculator message for fee-calculator context', () => {
      const { getByTestId } = render(<WhatsAppCTA context="fee-calculator" />);
      const button = getByTestId('whatsapp-cta');
      const href = button.getAttribute('href');
      expect(href).toContain(encodeURIComponent('fee calculator'));
    });

    it('generates Bangladesh-specific message for bangladesh context', () => {
      const { getByTestId } = render(<WhatsAppCTA context="bangladesh" />);
      const button = getByTestId('whatsapp-cta');
      const href = button.getAttribute('href');
      expect(href).toContain(encodeURIComponent('from Bangladesh'));
    });

    it('generates general message for unknown context', () => {
      const { getByTestId } = render(<WhatsAppCTA context="unknown-context" />);
      const button = getByTestId('whatsapp-cta');
      const href = button.getAttribute('href');
      expect(href).toContain(encodeURIComponent('interested in studying at Sharda University'));
    });

    it('matches context intelligently with partial matches', () => {
      const { getByTestId } = render(<WhatsAppCTA context="program-btech-cse-ranking" />);
      const button = getByTestId('whatsapp-cta');
      const href = button.getAttribute('href');
      // Should match 'ranking' from the context
      expect(href).toContain(encodeURIComponent('rankings'));
    });
  });

  describe('Mobile vs Desktop Link Format - Requirements 6.3, 6.4', () => {
    let originalUserAgent;

    beforeEach(() => {
      originalUserAgent = navigator.userAgent;
    });

    afterEach(() => {
      Object.defineProperty(navigator, 'userAgent', {
        value: originalUserAgent,
        writable: true,
      });
    });

    it('uses wa.me format for mobile devices', () => {
      // Mock mobile user agent
      Object.defineProperty(navigator, 'userAgent', {
        value: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X)',
        writable: true,
      });

      const { getByTestId } = render(<WhatsAppCTA context="landing" />);
      const button = getByTestId('whatsapp-cta');
      const href = button.getAttribute('href');
      expect(href).toMatch(/^https:\/\/wa\.me\//);
    });

    it('uses web.whatsapp.com format for desktop devices', () => {
      // Mock desktop user agent
      Object.defineProperty(navigator, 'userAgent', {
        value: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        writable: true,
      });

      const { getByTestId } = render(<WhatsAppCTA context="landing" />);
      const button = getByTestId('whatsapp-cta');
      const href = button.getAttribute('href');
      expect(href).toMatch(/^https:\/\/web\.whatsapp\.com\/send/);
    });
  });

  describe('Button Variants', () => {
    it('renders button variant with correct styles', () => {
      const { getByTestId } = render(<WhatsAppCTA variant="button" />);
      const button = getByTestId('whatsapp-cta');
      expect(button.className).toContain('bg-[#25D366]');
      expect(button.className).not.toContain('fixed');
    });

    it('renders floating variant with correct styles', () => {
      const { getByTestId } = render(<WhatsAppCTA variant="floating" />);
      const button = getByTestId('whatsapp-cta');
      expect(button.className).toContain('fixed');
      expect(button.className).toContain('bottom-6');
      expect(button.className).toContain('left-6');
      expect(button.className).toContain('rounded-full');
    });

    it('adds and removes floating CTA body spacing class', () => {
      const { unmount } = render(<WhatsAppCTA variant="floating" />);

      expect(document.body.classList.contains('has-floating-cta')).toBe(true);
      expect(document.documentElement.classList.contains('has-floating-cta')).toBe(true);

      unmount();

      expect(document.body.classList.contains('has-floating-cta')).toBe(false);
      expect(document.documentElement.classList.contains('has-floating-cta')).toBe(false);
    });

    it('renders inline variant with correct styles', () => {
      const { getByTestId } = render(<WhatsAppCTA variant="inline" />);
      const button = getByTestId('whatsapp-cta');
      expect(button.className).toContain('border-2');
      expect(button.className).toContain('border-[#25D366]');
    });

    it('applies custom className', () => {
      const { getByTestId } = render(<WhatsAppCTA className="custom-class" />);
      const button = getByTestId('whatsapp-cta');
      expect(button.className).toContain('custom-class');
    });
  });

  describe('Accessibility - Requirement 6.6', () => {
    it('has proper aria-label by default', () => {
      const { getByTestId } = render(<WhatsAppCTA context="landing" />);
      const button = getByTestId('whatsapp-cta');
      expect(button.getAttribute('aria-label')).toBe(
        'Connect with Sharda University admissions team on WhatsApp'
      );
    });

    it('includes program in aria-label when provided', () => {
      const { getByTestId } = render(<WhatsAppCTA program="B.Tech CSE" />);
      const button = getByTestId('whatsapp-cta');
      expect(button.getAttribute('aria-label')).toBe(
        'Connect with Sharda University admissions team on WhatsApp about B.Tech CSE'
      );
    });

    it('accepts custom aria-label', () => {
      const { getByTestId } = render(<WhatsAppCTA ariaLabel="Custom WhatsApp label" />);
      const button = getByTestId('whatsapp-cta');
      expect(button.getAttribute('aria-label')).toBe('Custom WhatsApp label');
    });

    it('has minimum touch target height', () => {
      const { getByTestId } = render(<WhatsAppCTA />);
      const button = getByTestId('whatsapp-cta');
      expect(button.className).toContain('min-h-[44px]');
    });

    it('opens in new tab with security attributes', () => {
      const { getByTestId } = render(<WhatsAppCTA />);
      const button = getByTestId('whatsapp-cta');
      expect(button.getAttribute('target')).toBe('_blank');
      expect(button.getAttribute('rel')).toBe('noopener noreferrer');
    });

    it('has focus ring styles', () => {
      const { getByTestId } = render(<WhatsAppCTA />);
      const button = getByTestId('whatsapp-cta');
      expect(button.className).toContain('focus:outline-none');
      expect(button.className).toContain('focus:ring-2');
    });

    it('marks icon as aria-hidden', () => {
      const { getByTestId } = render(<WhatsAppCTA variant="button" />);
      const icon = getByTestId('whatsapp-cta').querySelector('svg');
      expect(icon.getAttribute('aria-hidden')).toBe('true');
    });
  });

  describe('Event Logging', () => {
    it('logs WhatsApp click event on click', () => {
      const { getByTestId } = render(
        <WhatsAppCTA
          context="landing"
          contentType="landing"
          program="B.Tech CSE"
        />
      );
      const button = getByTestId('whatsapp-cta');
      
      fireEvent.click(button);

      expect(conversionEventLogger.logWhatsAppClick).toHaveBeenCalledTimes(1);
      expect(conversionEventLogger.logWhatsAppClick).toHaveBeenCalledWith(
        expect.objectContaining({
          phoneNumber: '+91 88009 96151',
          context: 'landing',
          program: 'B.Tech CSE',
          contentType: 'landing',
        })
      );
    });

    it('includes message in event log', () => {
      const { getByTestId } = render(<WhatsAppCTA context="landing" />);
      const button = getByTestId('whatsapp-cta');
      
      fireEvent.click(button);

      expect(conversionEventLogger.logWhatsAppClick).toHaveBeenCalledWith(
        expect.objectContaining({
          message: expect.stringContaining('interested in studying at Sharda University'),
        })
      );
    });

    it('logs event without program when not provided', () => {
      const { getByTestId } = render(<WhatsAppCTA context="landing" contentType="landing" />);
      const button = getByTestId('whatsapp-cta');
      
      fireEvent.click(button);

      expect(conversionEventLogger.logWhatsAppClick).toHaveBeenCalledWith(
        expect.objectContaining({
          phoneNumber: '+91 88009 96151',
          context: 'landing',
          program: undefined,
          contentType: 'landing',
        })
      );
    });
  });

  describe('Data Attributes', () => {
    it('includes variant data attribute', () => {
      const { getByTestId } = render(<WhatsAppCTA variant="floating" />);
      const button = getByTestId('whatsapp-cta');
      expect(button.getAttribute('data-variant')).toBe('floating');
    });

    it('includes context data attribute', () => {
      const { getByTestId } = render(<WhatsAppCTA context="landing" />);
      const button = getByTestId('whatsapp-cta');
      expect(button.getAttribute('data-context')).toBe('landing');
    });

    it('includes program data attribute when provided', () => {
      const { getByTestId } = render(<WhatsAppCTA program="B.Tech CSE" />);
      const button = getByTestId('whatsapp-cta');
      expect(button.getAttribute('data-program')).toBe('B.Tech CSE');
    });

    it('includes phone data attribute', () => {
      const { getByTestId } = render(<WhatsAppCTA />);
      const button = getByTestId('whatsapp-cta');
      expect(button.getAttribute('data-phone')).toBe('+91 88009 96151');
    });
  });

  describe('Edge Cases', () => {
    it('handles empty context gracefully', () => {
      const { getByTestId } = render(<WhatsAppCTA context="" />);
      const button = getByTestId('whatsapp-cta');
      expect(button).toBeTruthy();
      const href = button.getAttribute('href');
      expect(href).toContain('text=');
    });

    it('handles special characters in program name', () => {
      const { getByTestId } = render(<WhatsAppCTA program="B.Tech (Hons.) CSE & AI" />);
      const button = getByTestId('whatsapp-cta');
      const href = button.getAttribute('href');
      // Should be URL encoded
      expect(href).toContain(encodeURIComponent('B.Tech (Hons.) CSE & AI'));
    });

    it('handles very long program names', () => {
      const longProgram = 'Bachelor of Technology in Computer Science Engineering with Specialization in Artificial Intelligence and Machine Learning';
      const { getByTestId } = render(<WhatsAppCTA program={longProgram} />);
      const button = getByTestId('whatsapp-cta');
      const href = button.getAttribute('href');
      expect(href).toContain(encodeURIComponent(longProgram));
    });

    it('handles undefined program prop', () => {
      const { getByTestId } = render(<WhatsAppCTA program={undefined} />);
      const button = getByTestId('whatsapp-cta');
      expect(button).toBeTruthy();
    });

    it('handles null children', () => {
      const { getByTestId } = render(<WhatsAppCTA>{null}</WhatsAppCTA>);
      const button = getByTestId('whatsapp-cta');
      expect(button).toBeTruthy();
    });
  });

  describe('Responsive Design', () => {
    it('includes responsive padding classes', () => {
      const { getByTestId } = render(<WhatsAppCTA variant="button" />);
      const button = getByTestId('whatsapp-cta');
      expect(button.className).toMatch(/px-6|sm:px-8/);
    });

    it('includes responsive text size classes', () => {
      const { getByTestId } = render(<WhatsAppCTA variant="button" />);
      const button = getByTestId('whatsapp-cta');
      expect(button.className).toMatch(/text-base|sm:text-lg/);
    });

    it('floating variant has fixed positioning', () => {
      const { getByTestId } = render(<WhatsAppCTA variant="floating" />);
      const button = getByTestId('whatsapp-cta');
      expect(button.className).toContain('fixed');
      expect(button.className).toContain('z-50');
    });
  });

  describe('Integration with Other Props', () => {
    it('passes through additional props', () => {
      const { getByTestId } = render(<WhatsAppCTA data-custom="test" id="custom-id" />);
      const button = getByTestId('whatsapp-cta');
      expect(button.getAttribute('data-custom')).toBe('test');
      expect(button.getAttribute('id')).toBe('custom-id');
    });

    it('combines position and contentType props correctly', () => {
      const { getByTestId } = render(
        <WhatsAppCTA
          position="hero"
          contentType="landing"
          context="landing"
        />
      );
      const button = getByTestId('whatsapp-cta');
      expect(button).toBeTruthy();
      
      fireEvent.click(button);
      
      expect(conversionEventLogger.logWhatsAppClick).toHaveBeenCalledWith(
        expect.objectContaining({
          contentType: 'landing',
        })
      );
    });
  });
});
