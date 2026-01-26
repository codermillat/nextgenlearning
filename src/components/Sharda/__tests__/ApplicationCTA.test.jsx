/**
 * Unit tests for ApplicationCTA component
 * Feature: sharda-university-content-enhancement
 * 
 * Tests verify:
 * - Button variants render correctly (primary, secondary, floating)
 * - UTM link generation with correct parameters
 * - Click event logging
 * - Accessibility attributes
 * - Responsive design classes
 * 
 * Validates: Requirements 1.3, 5.1, 5.5
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import ApplicationCTA from '../ApplicationCTA.jsx';
import * as utmGenerator from '../../../utils/utmGenerator.js';
import * as conversionEventLogger from '../../../utils/conversionEventLogger.js';

// Mock the utilities
vi.mock('../../../utils/utmGenerator.js');
vi.mock('../../../utils/conversionEventLogger.js');

describe('ApplicationCTA Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    
    // Default mock implementation
    utmGenerator.generateUTMLink.mockReturnValue('https://global.sharda.ac.in/?utm_source=test&utm_medium=test&utm_campaign=test&utm_content=test');
    conversionEventLogger.logCTAClick.mockReturnValue({});
  });

  describe('Rendering', () => {
    it('renders with default props', () => {
      const { container } = render(
        <ApplicationCTA
          source="landing"
          context="landing"
        />
      );

      const button = container.querySelector('[data-testid="application-cta"]');
      expect(button).toBeTruthy();
      expect(button.textContent).toBe('Apply Now');
    });

    it('renders with custom children', () => {
      const { container } = render(
        <ApplicationCTA
          source="landing"
          context="landing"
        >
          Start Your Journey
        </ApplicationCTA>
      );

      const button = container.querySelector('[data-testid="application-cta"]');
      expect(button.textContent).toBe('Start Your Journey');
    });

    it('renders primary variant with correct styles', () => {
      const { container } = render(
        <ApplicationCTA
          variant="primary"
          source="landing"
          context="landing"
        />
      );

      const button = container.querySelector('[data-testid="application-cta"]');
      expect(button.className).toContain('from-blue-600');
      expect(button.className).toContain('to-indigo-600');
      expect(button.getAttribute('data-variant')).toBe('primary');
    });

    it('renders secondary variant with correct styles', () => {
      const { container } = render(
        <ApplicationCTA
          variant="secondary"
          source="landing"
          context="landing"
        />
      );

      const button = container.querySelector('[data-testid="application-cta"]');
      expect(button.className).toContain('bg-white/10');
      expect(button.className).toContain('backdrop-blur-sm');
      expect(button.getAttribute('data-variant')).toBe('secondary');
    });

    it('renders floating variant with correct styles', () => {
      const { container } = render(
        <ApplicationCTA
          variant="floating"
          source="landing"
          context="landing"
        />
      );

      const button = container.querySelector('[data-testid="application-cta"]');
      expect(button.className).toContain('fixed');
      expect(button.className).toContain('bottom-6');
      expect(button.className).toContain('right-6');
      expect(button.className).toContain('z-50');
      expect(button.className).toContain('rounded-full');
      expect(button.getAttribute('data-variant')).toBe('floating');
    });

    it('applies custom className', () => {
      const { container } = render(
        <ApplicationCTA
          source="landing"
          context="landing"
          className="custom-class"
        />
      );

      const button = container.querySelector('[data-testid="application-cta"]');
      expect(button.className).toContain('custom-class');
    });

    it('includes data attributes for testing and analytics', () => {
      const { container } = render(
        <ApplicationCTA
          variant="primary"
          source="program-btech-cse"
          context="program"
          program="btech-cse"
        />
      );

      const button = container.querySelector('[data-testid="application-cta"]');
      expect(button.getAttribute('data-variant')).toBe('primary');
      expect(button.getAttribute('data-context')).toBe('program');
      expect(button.getAttribute('data-program')).toBe('btech-cse');
    });
  });

  describe('UTM Link Generation', () => {
    it('generates UTM link with correct parameters for landing page', () => {
      render(
        <ApplicationCTA
          source="landing"
          context="landing"
          country="Bangladesh"
        />
      );

      expect(utmGenerator.generateUTMLink).toHaveBeenCalledWith({
        country: 'Bangladesh',
        page: 'landing',
        contentType: 'landing',
        program: undefined,
        action: 'apply-now',
      });
    });

    it('generates UTM link with program information', () => {
      render(
        <ApplicationCTA
          source="program-btech-cse"
          context="program"
          program="btech-cse"
          country="Nepal"
        />
      );

      expect(utmGenerator.generateUTMLink).toHaveBeenCalledWith({
        country: 'Nepal',
        page: 'program-btech-cse',
        contentType: 'program',
        program: 'btech-cse',
        action: 'apply-now',
      });
    });

    it('generates UTM link with custom action', () => {
      render(
        <ApplicationCTA
          source="fee-calculator"
          context="calculator"
          program="btech-cse"
          action="apply-with-calculation"
        />
      );

      expect(utmGenerator.generateUTMLink).toHaveBeenCalledWith({
        country: 'International',
        page: 'fee-calculator',
        contentType: 'calculator',
        program: 'btech-cse',
        action: 'apply-with-calculation',
      });
    });

    it('uses generated URL as href', () => {
      const mockUrl = 'https://global.sharda.ac.in/bangladesh/?utm_source=test&utm_medium=test&utm_campaign=test&utm_content=test';
      utmGenerator.generateUTMLink.mockReturnValue(mockUrl);

      const { container } = render(
        <ApplicationCTA
          source="landing"
          context="landing"
        />
      );

      const button = container.querySelector('[data-testid="application-cta"]');
      expect(button.getAttribute('href')).toBe(mockUrl);
    });

    it('defaults to International country when not specified', () => {
      render(
        <ApplicationCTA
          source="landing"
          context="landing"
        />
      );

      expect(utmGenerator.generateUTMLink).toHaveBeenCalledWith(
        expect.objectContaining({
          country: 'International',
        })
      );
    });
  });

  describe('Click Event Logging', () => {
    it('logs CTA click event when clicked', () => {
      const mockUrl = 'https://global.sharda.ac.in/?utm_test=true';
      utmGenerator.generateUTMLink.mockReturnValue(mockUrl);

      const { container } = render(
        <ApplicationCTA
          source="landing"
          context="landing"
          location="hero"
        />
      );

      const button = container.querySelector('[data-testid="application-cta"]');
      fireEvent.click(button);

      expect(conversionEventLogger.logCTAClick).toHaveBeenCalledWith({
        ctaType: 'apply-now',
        ctaLocation: 'hero',
        targetUrl: mockUrl,
        program: undefined,
        contentType: 'landing',
      });
    });

    it('logs click with program information', () => {
      const mockUrl = 'https://global.sharda.ac.in/?utm_test=true';
      utmGenerator.generateUTMLink.mockReturnValue(mockUrl);

      const { container } = render(
        <ApplicationCTA
          source="program-btech-cse"
          context="program"
          program="btech-cse"
          location="content"
        />
      );

      const button = container.querySelector('[data-testid="application-cta"]');
      fireEvent.click(button);

      expect(conversionEventLogger.logCTAClick).toHaveBeenCalledWith({
        ctaType: 'apply-now',
        ctaLocation: 'content',
        targetUrl: mockUrl,
        program: 'btech-cse',
        contentType: 'program',
      });
    });

    it('logs click with custom action', () => {
      const mockUrl = 'https://global.sharda.ac.in/?utm_test=true';
      utmGenerator.generateUTMLink.mockReturnValue(mockUrl);

      const { container } = render(
        <ApplicationCTA
          source="calculator"
          context="calculator"
          action="apply-with-calculation"
          location="calculator-result"
        />
      );

      const button = container.querySelector('[data-testid="application-cta"]');
      fireEvent.click(button);

      expect(conversionEventLogger.logCTAClick).toHaveBeenCalledWith({
        ctaType: 'apply-with-calculation',
        ctaLocation: 'calculator-result',
        targetUrl: mockUrl,
        program: undefined,
        contentType: 'calculator',
      });
    });

    it('defaults location to "content" when not specified', () => {
      const { container } = render(
        <ApplicationCTA
          source="landing"
          context="landing"
        />
      );

      const button = container.querySelector('[data-testid="application-cta"]');
      fireEvent.click(button);

      expect(conversionEventLogger.logCTAClick).toHaveBeenCalledWith(
        expect.objectContaining({
          ctaLocation: 'content',
        })
      );
    });
  });

  describe('Accessibility', () => {
    it('has proper aria-label by default', () => {
      const { container } = render(
        <ApplicationCTA
          source="landing"
          context="landing"
        />
      );

      const button = container.querySelector('[data-testid="application-cta"]');
      expect(button.getAttribute('aria-label')).toBe('Apply to Sharda University');
    });

    it('includes program in aria-label when provided', () => {
      const { container } = render(
        <ApplicationCTA
          source="program-btech-cse"
          context="program"
          program="btech-cse"
        />
      );

      const button = container.querySelector('[data-testid="application-cta"]');
      expect(button.getAttribute('aria-label')).toBe('Apply to Sharda University for btech-cse');
    });

    it('uses custom aria-label when provided', () => {
      const { container } = render(
        <ApplicationCTA
          source="landing"
          context="landing"
          ariaLabel="Start your application to Sharda University"
        />
      );

      const button = container.querySelector('[data-testid="application-cta"]');
      expect(button.getAttribute('aria-label')).toBe('Start your application to Sharda University');
    });

    it('opens in new tab with proper security attributes', () => {
      const { container } = render(
        <ApplicationCTA
          source="landing"
          context="landing"
        />
      );

      const button = container.querySelector('[data-testid="application-cta"]');
      expect(button.getAttribute('target')).toBe('_blank');
      expect(button.getAttribute('rel')).toBe('noopener noreferrer');
    });

    it('has minimum touch target size (44px)', () => {
      const { container } = render(
        <ApplicationCTA
          source="landing"
          context="landing"
        />
      );

      const button = container.querySelector('[data-testid="application-cta"]');
      expect(button.className).toContain('min-h-[44px]');
    });
  });

  describe('Responsive Design', () => {
    it('includes responsive padding classes', () => {
      const { container } = render(
        <ApplicationCTA
          variant="primary"
          source="landing"
          context="landing"
        />
      );

      const button = container.querySelector('[data-testid="application-cta"]');
      expect(button.className).toMatch(/px-6|sm:px-8/);
    });

    it('includes responsive text size classes', () => {
      const { container } = render(
        <ApplicationCTA
          variant="primary"
          source="landing"
          context="landing"
        />
      );

      const button = container.querySelector('[data-testid="application-cta"]');
      expect(button.className).toMatch(/text-base|sm:text-lg/);
    });

    it('floating variant has fixed positioning', () => {
      const { container } = render(
        <ApplicationCTA
          variant="floating"
          source="landing"
          context="landing"
        />
      );

      const button = container.querySelector('[data-testid="application-cta"]');
      expect(button.className).toContain('fixed');
      expect(button.className).toContain('z-50');
    });
  });

  describe('Edge Cases', () => {
    it('handles missing optional props gracefully', () => {
      const { container } = render(
        <ApplicationCTA
          source="landing"
          context="landing"
        />
      );

      const button = container.querySelector('[data-testid="application-cta"]');
      expect(button).toBeTruthy();
      expect(button.getAttribute('href')).toBeTruthy();
    });

    it('handles empty program string', () => {
      render(
        <ApplicationCTA
          source="landing"
          context="landing"
          program=""
        />
      );

      expect(utmGenerator.generateUTMLink).toHaveBeenCalledWith(
        expect.objectContaining({
          program: '',
        })
      );
    });

    it('passes through additional props', () => {
      const { container } = render(
        <ApplicationCTA
          source="landing"
          context="landing"
          data-custom="test-value"
          id="custom-id"
        />
      );

      const button = container.querySelector('[data-testid="application-cta"]');
      expect(button.getAttribute('data-custom')).toBe('test-value');
      expect(button.getAttribute('id')).toBe('custom-id');
    });
  });

  describe('Integration', () => {
    it('integrates UTM generation and event logging correctly', () => {
      const mockUrl = 'https://global.sharda.ac.in/bangladesh/?utm_source=studyatsharda_youtube&utm_medium=NextGenLearning&utm_campaign=SU_AdmissionsBD_2026&utm_content=landing_apply-now';
      utmGenerator.generateUTMLink.mockReturnValue(mockUrl);

      const { container } = render(
        <ApplicationCTA
          source="landing"
          context="landing"
          country="Bangladesh"
          location="hero"
        />
      );

      // Check URL generation
      expect(utmGenerator.generateUTMLink).toHaveBeenCalledWith({
        country: 'Bangladesh',
        page: 'landing',
        contentType: 'landing',
        program: undefined,
        action: 'apply-now',
      });

      const button = container.querySelector('[data-testid="application-cta"]');
      expect(button.getAttribute('href')).toBe(mockUrl);

      // Click and check logging
      fireEvent.click(button);

      expect(conversionEventLogger.logCTAClick).toHaveBeenCalledWith({
        ctaType: 'apply-now',
        ctaLocation: 'hero',
        targetUrl: mockUrl,
        program: undefined,
        contentType: 'landing',
      });
    });
  });
});
