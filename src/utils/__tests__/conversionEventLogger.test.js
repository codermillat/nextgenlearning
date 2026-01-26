/**
 * Unit tests for ConversionEventLogger
 * Feature: sharda-university-content-enhancement
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import {
  EVENT_TYPES,
  logConversionEvent,
  logCTAClick,
  logWhatsAppClick,
  logCalculatorUsage,
  logPageView,
  logScrollDepth,
  logTimeOnPage,
  initScrollDepthTracking,
  initTimeOnPageTracking,
  initPageTracking,
} from '../conversionEventLogger';

// Mock window.gtag
const mockGtag = vi.fn();

describe('ConversionEventLogger', () => {
  beforeEach(() => {
    // Reset mocks
    vi.clearAllMocks();
    mockGtag.mockClear();

    // Setup window.gtag with full window mock
    global.window = {
      gtag: mockGtag,
      location: {
        href: 'https://example.com/sharda/landing?utm_source=test&utm_medium=organic',
        pathname: '/sharda/landing',
      },
      sessionStorage: {
        getItem: vi.fn(() => 'test-session-123'),
        setItem: vi.fn(),
      },
      localStorage: {
        getItem: vi.fn(() => 'test-user-456'),
      },
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      requestAnimationFrame: vi.fn((cb) => {
        cb();
        return 1;
      }),
      pageYOffset: 0,
      innerHeight: 800,
    };

    global.document = {
      title: 'Sharda University - Test Page',
      referrer: 'https://google.com',
      documentElement: {
        scrollHeight: 2000,
        scrollTop: 0,
      },
    };
  });

  afterEach(() => {
    delete global.window;
    delete global.document;
  });

  describe('EVENT_TYPES', () => {
    it('should define all required event types', () => {
      expect(EVENT_TYPES.CTA_CLICK).toBe('cta_click');
      expect(EVENT_TYPES.WHATSAPP_CLICK).toBe('whatsapp_click');
      expect(EVENT_TYPES.CALCULATOR_USE).toBe('calculator_use');
      expect(EVENT_TYPES.PAGE_VIEW).toBe('page_view');
      expect(EVENT_TYPES.SCROLL_DEPTH).toBe('scroll_depth');
      expect(EVENT_TYPES.TIME_ON_PAGE).toBe('time_on_page');
    });
  });

  describe('logConversionEvent', () => {
    it('should log event with page context', () => {
      const result = logConversionEvent({
        eventType: EVENT_TYPES.CTA_CLICK,
        context: { test: 'data' },
      });

      expect(result).toMatchObject({
        event_type: EVENT_TYPES.CTA_CLICK,
        page_url: 'https://example.com/sharda/landing?utm_source=test&utm_medium=organic',
        page_path: '/sharda/landing',
        page_title: 'Sharda University - Test Page',
        referrer: 'https://google.com',
        test: 'data',
      });
      
      // Session ID and user ID should be present
      expect(result.session_id).toBeDefined();
      expect(result.user_id).toBeDefined();
    });

    it('should include UTM parameters from current URL', () => {
      const result = logConversionEvent({
        eventType: EVENT_TYPES.PAGE_VIEW,
        context: {},
      });

      expect(result.utm_source).toBe('test');
      expect(result.utm_medium).toBe('organic');
    });

    it('should include target URL UTM parameters when provided', () => {
      const targetUrl =
        'https://global.sharda.ac.in/?utm_source=studyatsharda_youtube&utm_medium=NextGenLearning&utm_campaign=SU_AdmissionsIntl_2026&utm_content=landing_apply-now';

      const result = logConversionEvent({
        eventType: EVENT_TYPES.CTA_CLICK,
        targetUrl,
        context: {},
      });

      expect(result.target_utm_source).toBe('studyatsharda_youtube');
      expect(result.target_utm_medium).toBe('NextGenLearning');
      expect(result.target_utm_campaign).toBe('SU_AdmissionsIntl_2026');
      expect(result.target_utm_content).toBe('landing_apply-now');
    });

    it('should send event to Google Analytics 4', () => {
      logConversionEvent({
        eventType: EVENT_TYPES.CTA_CLICK,
        context: { cta_type: 'apply-now' },
      });

      expect(mockGtag).toHaveBeenCalledWith(
        'event',
        EVENT_TYPES.CTA_CLICK,
        expect.objectContaining({
          event_type: EVENT_TYPES.CTA_CLICK,
          cta_type: 'apply-now',
        })
      );
    });

    it('should include timestamp in ISO format', () => {
      const result = logConversionEvent({
        eventType: EVENT_TYPES.PAGE_VIEW,
        context: {},
      });

      expect(result.timestamp).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/);
    });
  });

  describe('logCTAClick', () => {
    it('should log CTA click with all parameters', () => {
      const result = logCTAClick({
        ctaType: 'apply-now',
        ctaLocation: 'hero',
        targetUrl: 'https://global.sharda.ac.in/',
        program: 'btech-cse',
        contentType: 'landing',
      });

      expect(result.event_type).toBe(EVENT_TYPES.CTA_CLICK);
      expect(result.cta_type).toBe('apply-now');
      expect(result.cta_location).toBe('hero');
      expect(result.target_url).toBe('https://global.sharda.ac.in/');
      expect(result.program).toBe('btech-cse');
      expect(result.content_type).toBe('landing');
    });

    it('should send CTA click event to GA4', () => {
      logCTAClick({
        ctaType: 'learn-more',
        ctaLocation: 'footer',
        targetUrl: 'https://global.sharda.ac.in/',
      });

      expect(mockGtag).toHaveBeenCalledWith(
        'event',
        EVENT_TYPES.CTA_CLICK,
        expect.objectContaining({
          cta_type: 'learn-more',
          cta_location: 'footer',
        })
      );
    });
  });

  describe('logWhatsAppClick', () => {
    it('should log WhatsApp click with all parameters', () => {
      const result = logWhatsAppClick({
        phoneNumber: '+91 88009 96151',
        message: "I'm interested in B.Tech CSE at Sharda University",
        context: 'program-page',
        program: 'btech-cse',
        contentType: 'program',
      });

      expect(result.event_type).toBe(EVENT_TYPES.WHATSAPP_CLICK);
      expect(result.phone_number).toBe('+91 88009 96151');
      expect(result.message_preview).toBe("I'm interested in B.Tech CSE at Sharda University");
      expect(result.click_context).toBe('program-page');
      expect(result.program).toBe('btech-cse');
      expect(result.content_type).toBe('program');
    });

    it('should truncate long messages to 100 characters', () => {
      const longMessage = 'A'.repeat(150);
      const result = logWhatsAppClick({
        phoneNumber: '+91 88009 96151',
        message: longMessage,
        context: 'landing',
      });

      expect(result.message_preview).toHaveLength(100);
      expect(result.message_preview).toBe('A'.repeat(100));
    });

    it('should handle empty message', () => {
      const result = logWhatsAppClick({
        phoneNumber: '+91 88009 96151',
        message: '',
        context: 'landing',
      });

      expect(result.message_preview).toBe('');
    });
  });

  describe('logCalculatorUsage', () => {
    it('should log calculator usage with all parameters', () => {
      const result = logCalculatorUsage({
        program: 'B.Tech CSE',
        gpa: 4.5,
        country: 'Bangladesh',
        baseFee: 400000,
        scholarshipPercentage: 50,
        finalAmount: 200000,
        action: 'calculate',
      });

      expect(result.event_type).toBe(EVENT_TYPES.CALCULATOR_USE);
      expect(result.program).toBe('B.Tech CSE');
      expect(result.gpa).toBe(4.5);
      expect(result.country).toBe('Bangladesh');
      expect(result.base_fee).toBe(400000);
      expect(result.scholarship_percentage).toBe(50);
      expect(result.final_amount).toBe(200000);
      expect(result.calculator_action).toBe('calculate');
    });

    it('should default action to "calculate"', () => {
      const result = logCalculatorUsage({
        program: 'B.Tech CSE',
        gpa: 3.5,
        country: 'Nepal',
        baseFee: 400000,
        scholarshipPercentage: 20,
        finalAmount: 320000,
      });

      expect(result.calculator_action).toBe('calculate');
    });

    it('should track apply action from calculator', () => {
      const result = logCalculatorUsage({
        program: 'MBA',
        gpa: 3.8,
        country: 'Bangladesh',
        baseFee: 500000,
        scholarshipPercentage: 50,
        finalAmount: 250000,
        action: 'apply',
      });

      expect(result.calculator_action).toBe('apply');
    });
  });

  describe('logPageView', () => {
    it('should log page view with content type', () => {
      const result = logPageView({
        contentType: 'landing',
        category: 'sharda-content',
      });

      expect(result.event_type).toBe(EVENT_TYPES.PAGE_VIEW);
      expect(result.content_type).toBe('landing');
      expect(result.category).toBe('sharda-content');
    });

    it('should log page view with program', () => {
      const result = logPageView({
        contentType: 'program',
        program: 'btech-cse',
      });

      expect(result.event_type).toBe(EVENT_TYPES.PAGE_VIEW);
      expect(result.content_type).toBe('program');
      expect(result.program).toBe('btech-cse');
    });

    it('should handle page view without parameters', () => {
      const result = logPageView();

      expect(result.event_type).toBe(EVENT_TYPES.PAGE_VIEW);
      expect(result.content_type).toBeUndefined();
    });
  });

  describe('logScrollDepth', () => {
    it('should log scroll depth at 25%', () => {
      const result = logScrollDepth({
        depth: 25,
        contentType: 'landing',
      });

      expect(result.event_type).toBe(EVENT_TYPES.SCROLL_DEPTH);
      expect(result.scroll_depth).toBe(25);
      expect(result.content_type).toBe('landing');
    });

    it('should log scroll depth at 100%', () => {
      const result = logScrollDepth({
        depth: 100,
        contentType: 'program',
      });

      expect(result.event_type).toBe(EVENT_TYPES.SCROLL_DEPTH);
      expect(result.scroll_depth).toBe(100);
    });
  });

  describe('logTimeOnPage', () => {
    it('should log time on page in seconds', () => {
      const result = logTimeOnPage({
        seconds: 45,
        contentType: 'landing',
      });

      expect(result.event_type).toBe(EVENT_TYPES.TIME_ON_PAGE);
      expect(result.time_seconds).toBe(45);
      expect(result.content_type).toBe('landing');
    });

    it('should log extended time on page', () => {
      const result = logTimeOnPage({
        seconds: 300,
        contentType: 'program',
      });

      expect(result.time_seconds).toBe(300);
    });
  });

  describe('initScrollDepthTracking', () => {
    it('should return cleanup function', () => {
      const cleanup = initScrollDepthTracking('landing');
      expect(typeof cleanup).toBe('function');
    });

    it('should handle server-side rendering', () => {
      delete global.window;
      const cleanup = initScrollDepthTracking('landing');
      expect(typeof cleanup).toBe('function');
      cleanup(); // Should not throw
    });
  });

  describe('initTimeOnPageTracking', () => {
    it('should return cleanup function', () => {
      const cleanup = initTimeOnPageTracking('landing', 30);
      expect(typeof cleanup).toBe('function');
    });

    it('should handle server-side rendering', () => {
      delete global.window;
      const cleanup = initTimeOnPageTracking('landing');
      expect(typeof cleanup).toBe('function');
      cleanup(); // Should not throw
    });
  });

  describe('initPageTracking', () => {
    it('should initialize all tracking and return cleanup function', () => {
      const cleanup = initPageTracking({
        contentType: 'landing',
        program: 'btech-cse',
        category: 'sharda',
      });

      // Should log initial page view
      expect(mockGtag).toHaveBeenCalledWith(
        'event',
        EVENT_TYPES.PAGE_VIEW,
        expect.objectContaining({
          content_type: 'landing',
          program: 'btech-cse',
          category: 'sharda',
        })
      );

      expect(typeof cleanup).toBe('function');
    });

    it('should work without parameters', () => {
      const cleanup = initPageTracking();
      expect(typeof cleanup).toBe('function');
      expect(mockGtag).toHaveBeenCalled();
    });
  });

  describe('Edge cases', () => {
    it('should handle missing window.gtag gracefully', () => {
      delete global.window.gtag;

      expect(() => {
        logCTAClick({
          ctaType: 'apply-now',
          ctaLocation: 'hero',
          targetUrl: 'https://global.sharda.ac.in/',
        });
      }).not.toThrow();
    });

    it('should handle missing sessionStorage', () => {
      delete global.window.sessionStorage;

      const result = logPageView({ contentType: 'landing' });
      expect(result.session_id).toBeDefined();
    });

    it('should handle missing localStorage', () => {
      global.window.localStorage.getItem = vi.fn(() => null);

      const result = logPageView({ contentType: 'landing' });
      expect(result.user_id).toBeNull();
    });

    it('should handle invalid target URL', () => {
      const result = logConversionEvent({
        eventType: EVENT_TYPES.CTA_CLICK,
        targetUrl: 'not-a-valid-url',
        context: {},
      });

      expect(result.target_utm_source).toBeUndefined();
    });

    it('should handle URL without UTM parameters', () => {
      global.window.location.href = 'https://example.com/sharda/landing';

      const result = logPageView({ contentType: 'landing' });

      expect(result.utm_source).toBeNull();
      expect(result.utm_medium).toBeNull();
    });
  });

  describe('Integration with GA4', () => {
    it('should send properly formatted events to GA4', () => {
      logCTAClick({
        ctaType: 'apply-now',
        ctaLocation: 'hero',
        targetUrl: 'https://global.sharda.ac.in/',
        program: 'btech-cse',
        contentType: 'landing',
      });

      expect(mockGtag).toHaveBeenCalledTimes(1);
      expect(mockGtag).toHaveBeenCalledWith('event', EVENT_TYPES.CTA_CLICK, expect.any(Object));

      const eventData = mockGtag.mock.calls[0][2];
      expect(eventData).toHaveProperty('event_type');
      expect(eventData).toHaveProperty('timestamp');
      expect(eventData).toHaveProperty('session_id');
      expect(eventData).toHaveProperty('page_url');
      expect(eventData).toHaveProperty('page_path');
    });

    it('should include all required GA4 parameters', () => {
      logWhatsAppClick({
        phoneNumber: '+91 88009 96151',
        message: 'Test message',
        context: 'landing',
      });

      const eventData = mockGtag.mock.calls[0][2];
      
      // Required parameters
      expect(eventData.event_type).toBeDefined();
      expect(eventData.timestamp).toBeDefined();
      expect(eventData.session_id).toBeDefined();
      expect(eventData.page_url).toBeDefined();
      expect(eventData.page_path).toBeDefined();
      expect(eventData.page_title).toBeDefined();
    });
  });
});
