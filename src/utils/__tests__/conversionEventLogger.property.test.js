/**
 * Property-based tests for Conversion Event Logger utility
 * Feature: sharda-university-content-enhancement
 * 
 * Tests Properties 13-17 (UTM tracking) and 63-65 (conversion event logging)
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import fc from 'fast-check';
import {
  logConversionEvent,
  logCTAClick,
  logWhatsAppClick,
  logCalculatorUsage,
  logPageView,
  logScrollDepth,
  logTimeOnPage,
  EVENT_TYPES,
} from '../conversionEventLogger';

// Mock window and document for testing
const mockWindow = {
  location: {
    href: 'https://example.com/test-page',
    pathname: '/test-page',
  },
  gtag: vi.fn(),
  sessionStorage: {
    getItem: vi.fn(),
    setItem: vi.fn(),
  },
  localStorage: {
    getItem: vi.fn(),
  },
};

const mockDocument = {
  title: 'Test Page Title',
  referrer: 'https://google.com',
};

describe('Conversion Event Logger - Property-Based Tests', () => {
  beforeEach(() => {
    // Setup global mocks
    global.window = mockWindow;
    global.document = mockDocument;
    global.sessionStorage = mockWindow.sessionStorage;
    global.localStorage = mockWindow.localStorage;
    
    // Reset mocks
    vi.clearAllMocks();
    mockWindow.sessionStorage.getItem.mockReturnValue('test-session-id');
    mockWindow.localStorage.getItem.mockReturnValue('test-user-id');
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  /**
   * Property 63: Conversion Event Logging
   * Feature: sharda-university-content-enhancement, Property 63
   * 
   * For any user interaction with a conversion element (CTA click, WhatsApp click,
   * calculator use), the system should log an event with interaction details.
   * 
   * Validates: Requirements 17.1
   */
  it('Property 63: Conversion Event Logging', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(
          EVENT_TYPES.CTA_CLICK,
          EVENT_TYPES.WHATSAPP_CLICK,
          EVENT_TYPES.CALCULATOR_USE
        ),
        fc.record({
          key1: fc.string({ minLength: 1, maxLength: 50 }),
          key2: fc.integer({ min: 0, max: 1000 }),
        }),
        (eventType, context) => {
          const result = logConversionEvent({
            eventType,
            context,
          });

          // Verify event data structure
          expect(result).toBeDefined();
          expect(result.event_type).toBe(eventType);
          expect(result.timestamp).toBeDefined();
          expect(result.session_id).toBeDefined();
          
          // Verify page context is included
          expect(result.page_url).toBeDefined();
          expect(result.page_path).toBeDefined();
          expect(result.page_title).toBeDefined();
          
          // Verify custom context is included
          expect(result.key1).toBe(context.key1);
          expect(result.key2).toBe(context.key2);
          
          // Verify GA4 was called
          expect(mockWindow.gtag).toHaveBeenCalledWith('event', eventType, expect.any(Object));
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property 64: Page View Tracking
   * Feature: sharda-university-content-enhancement, Property 64
   * 
   * For any Sharda content page loaded, the system should track and log the page view.
   * 
   * Validates: Requirements 17.2
   */
  it('Property 64: Page View Tracking', () => {
    fc.assert(
      fc.property(
        fc.option(fc.constantFrom('landing', 'program', 'fees', 'calculator', 'comparison')),
        fc.option(fc.constantFrom('btech-cse', 'mba', 'bcom', 'btech-ai')),
        fc.option(fc.constantFrom('engineering', 'management', 'commerce')),
        (contentType, program, category) => {
          const result = logPageView({
            contentType: contentType || undefined,
            program: program || undefined,
            category: category || undefined,
          });

          // Verify event type is PAGE_VIEW
          expect(result.event_type).toBe(EVENT_TYPES.PAGE_VIEW);
          
          // Verify page context is captured
          expect(result.page_url).toBeDefined();
          expect(result.page_path).toBeDefined();
          expect(result.page_title).toBeDefined();
          expect(result.timestamp).toBeDefined();
          expect(result.session_id).toBeDefined();
          
          // Verify optional parameters are included when provided
          if (contentType) {
            expect(result.content_type).toBe(contentType);
          }
          if (program) {
            expect(result.program).toBe(program);
          }
          if (category) {
            expect(result.category).toBe(category);
          }
          
          // Verify GA4 was called
          expect(mockWindow.gtag).toHaveBeenCalledWith(
            'event',
            EVENT_TYPES.PAGE_VIEW,
            expect.any(Object)
          );
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property 65: Application Click Context Logging
   * Feature: sharda-university-content-enhancement, Property 65
   * 
   * For any application link click, the system should log the click with page context
   * (page URL, content type, program if applicable).
   * 
   * Validates: Requirements 17.3
   */
  it('Property 65: Application Click Context Logging', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('apply-now', 'learn-more', 'download-brochure'),
        fc.constantFrom('hero', 'footer', 'floating', 'inline'),
        fc.webUrl(),
        fc.option(fc.constantFrom('btech-cse', 'mba', 'bcom')),
        fc.option(fc.constantFrom('landing', 'program', 'fees', 'calculator')),
        (ctaType, ctaLocation, targetUrl, program, contentType) => {
          const result = logCTAClick({
            ctaType,
            ctaLocation,
            targetUrl,
            program: program || undefined,
            contentType: contentType || undefined,
          });

          // Verify event type is CTA_CLICK
          expect(result.event_type).toBe(EVENT_TYPES.CTA_CLICK);
          
          // Verify page context is captured
          expect(result.page_url).toBeDefined();
          expect(result.page_path).toBeDefined();
          expect(result.page_title).toBeDefined();
          expect(result.timestamp).toBeDefined();
          expect(result.session_id).toBeDefined();
          
          // Verify CTA-specific context
          expect(result.cta_type).toBe(ctaType);
          expect(result.cta_location).toBe(ctaLocation);
          expect(result.target_url).toBe(targetUrl);
          
          // Verify optional parameters
          if (program) {
            expect(result.program).toBe(program);
          }
          if (contentType) {
            expect(result.content_type).toBe(contentType);
          }
          
          // Verify GA4 was called
          expect(mockWindow.gtag).toHaveBeenCalledWith(
            'event',
            EVENT_TYPES.CTA_CLICK,
            expect.any(Object)
          );
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * WhatsApp Click Logging Property
   * 
   * For any WhatsApp CTA click, the system should log the event with
   * phone number, message preview, and context.
   */
  it('should log WhatsApp clicks with complete context', () => {
    fc.assert(
      fc.property(
        fc.constant('+91 88009 96151'),
        fc.string({ minLength: 10, maxLength: 200 }),
        fc.string({ minLength: 1, maxLength: 100 }),
        fc.option(fc.constantFrom('btech-cse', 'mba', 'bcom')),
        fc.option(fc.constantFrom('landing', 'program', 'fees')),
        (phoneNumber, message, context, program, contentType) => {
          const result = logWhatsAppClick({
            phoneNumber,
            message,
            context,
            program: program || undefined,
            contentType: contentType || undefined,
          });

          // Verify event type
          expect(result.event_type).toBe(EVENT_TYPES.WHATSAPP_CLICK);
          
          // Verify WhatsApp-specific context
          expect(result.phone_number).toBe(phoneNumber);
          expect(result.message_preview).toBeDefined();
          expect(result.message_preview.length).toBeLessThanOrEqual(100);
          expect(result.click_context).toBe(context);
          
          // Verify page context
          expect(result.page_url).toBeDefined();
          expect(result.timestamp).toBeDefined();
          expect(result.session_id).toBeDefined();
          
          // Verify GA4 was called
          expect(mockWindow.gtag).toHaveBeenCalledWith(
            'event',
            EVENT_TYPES.WHATSAPP_CLICK,
            expect.any(Object)
          );
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Calculator Usage Logging Property
   * 
   * For any fee calculator calculation, the system should log the program,
   * GPA, scholarship percentage, and final amount.
   */
  it('should log calculator usage with calculation details', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('B.Tech CSE', 'MBA', 'B.Com', 'B.Tech AI'),
        fc.double({ min: 2.0, max: 5.0 }),
        fc.constantFrom('Bangladesh', 'Nepal', 'India'),
        fc.integer({ min: 100000, max: 500000 }),
        fc.constantFrom(0, 20, 50),
        fc.constantFrom('calculate', 'apply'),
        (program, gpa, country, baseFee, scholarshipPercentage, action) => {
          const finalAmount = baseFee * (1 - scholarshipPercentage / 100);
          
          const result = logCalculatorUsage({
            program,
            gpa,
            country,
            baseFee,
            scholarshipPercentage,
            finalAmount,
            action,
          });

          // Verify event type
          expect(result.event_type).toBe(EVENT_TYPES.CALCULATOR_USE);
          
          // Verify calculator-specific context
          expect(result.program).toBe(program);
          expect(result.gpa).toBe(gpa);
          expect(result.country).toBe(country);
          expect(result.base_fee).toBe(baseFee);
          expect(result.scholarship_percentage).toBe(scholarshipPercentage);
          expect(result.final_amount).toBe(finalAmount);
          expect(result.calculator_action).toBe(action);
          
          // Verify page context
          expect(result.page_url).toBeDefined();
          expect(result.timestamp).toBeDefined();
          expect(result.session_id).toBeDefined();
          
          // Verify GA4 was called
          expect(mockWindow.gtag).toHaveBeenCalledWith(
            'event',
            EVENT_TYPES.CALCULATOR_USE,
            expect.any(Object)
          );
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Scroll Depth Tracking Property
   * 
   * For any scroll depth event, the system should log the depth percentage
   * and content type.
   */
  it('should log scroll depth with percentage and content type', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(25, 50, 75, 100),
        fc.option(fc.constantFrom('landing', 'program', 'fees', 'calculator')),
        (depth, contentType) => {
          const result = logScrollDepth({
            depth,
            contentType: contentType || undefined,
          });

          // Verify event type
          expect(result.event_type).toBe(EVENT_TYPES.SCROLL_DEPTH);
          
          // Verify scroll depth context
          expect(result.scroll_depth).toBe(depth);
          if (contentType) {
            expect(result.content_type).toBe(contentType);
          }
          
          // Verify page context
          expect(result.page_url).toBeDefined();
          expect(result.timestamp).toBeDefined();
          expect(result.session_id).toBeDefined();
          
          // Verify GA4 was called
          expect(mockWindow.gtag).toHaveBeenCalledWith(
            'event',
            EVENT_TYPES.SCROLL_DEPTH,
            expect.any(Object)
          );
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Time on Page Tracking Property
   * 
   * For any time on page event, the system should log the time in seconds
   * and content type.
   */
  it('should log time on page with seconds and content type', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 1, max: 3600 }),
        fc.option(fc.constantFrom('landing', 'program', 'fees', 'calculator')),
        (seconds, contentType) => {
          const result = logTimeOnPage({
            seconds,
            contentType: contentType || undefined,
          });

          // Verify event type
          expect(result.event_type).toBe(EVENT_TYPES.TIME_ON_PAGE);
          
          // Verify time tracking context
          expect(result.time_seconds).toBe(seconds);
          if (contentType) {
            expect(result.content_type).toBe(contentType);
          }
          
          // Verify page context
          expect(result.page_url).toBeDefined();
          expect(result.timestamp).toBeDefined();
          expect(result.session_id).toBeDefined();
          
          // Verify GA4 was called
          expect(mockWindow.gtag).toHaveBeenCalledWith(
            'event',
            EVENT_TYPES.TIME_ON_PAGE,
            expect.any(Object)
          );
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Session ID Consistency Property
   * 
   * For any sequence of events in the same session, the session ID
   * should remain consistent.
   */
  it('should maintain consistent session ID across events', () => {
    fc.assert(
      fc.property(
        fc.array(
          fc.constantFrom(
            EVENT_TYPES.PAGE_VIEW,
            EVENT_TYPES.CTA_CLICK,
            EVENT_TYPES.WHATSAPP_CLICK,
            EVENT_TYPES.SCROLL_DEPTH
          ),
          { minLength: 2, maxLength: 5 }
        ),
        (eventTypes) => {
          const sessionId = 'consistent-session-id';
          mockWindow.sessionStorage.getItem.mockReturnValue(sessionId);

          const results = eventTypes.map(eventType =>
            logConversionEvent({ eventType, context: {} })
          );

          // All events should have the same session ID
          const sessionIds = results.map(r => r.session_id);
          const uniqueSessionIds = [...new Set(sessionIds)];
          expect(uniqueSessionIds.length).toBe(1);
          expect(uniqueSessionIds[0]).toBe(sessionId);
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Timestamp Validity Property
   * 
   * For any logged event, the timestamp should be a valid ISO 8601 date string
   * and represent a time close to when the event was logged.
   */
  it('should generate valid timestamps for all events', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(
          EVENT_TYPES.PAGE_VIEW,
          EVENT_TYPES.CTA_CLICK,
          EVENT_TYPES.WHATSAPP_CLICK,
          EVENT_TYPES.CALCULATOR_USE,
          EVENT_TYPES.SCROLL_DEPTH,
          EVENT_TYPES.TIME_ON_PAGE
        ),
        (eventType) => {
          const beforeTime = new Date();
          const result = logConversionEvent({ eventType, context: {} });
          const afterTime = new Date();

          // Verify timestamp is defined and valid
          expect(result.timestamp).toBeDefined();
          expect(() => new Date(result.timestamp)).not.toThrow();

          // Verify timestamp is within reasonable range
          const eventTime = new Date(result.timestamp);
          expect(eventTime.getTime()).toBeGreaterThanOrEqual(beforeTime.getTime());
          expect(eventTime.getTime()).toBeLessThanOrEqual(afterTime.getTime());
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * UTM Parameter Preservation Property
   * 
   * When a target URL with UTM parameters is provided, those parameters
   * should be extracted and included in the event data.
   */
  it('should preserve UTM parameters from target URLs', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('apply-now', 'learn-more'),
        fc.constantFrom('hero', 'footer'),
        fc.constantFrom('studyatsharda_youtube', 'organic', 'social'),
        fc.constantFrom('NextGenLearning', 'referral', 'email'),
        fc.constantFrom('SU_AdmissionsBD_2026', 'SU_AdmissionsIntl_2026'),
        fc.string({ minLength: 1, maxLength: 50 }).filter(s => s.trim().length > 0),
        (ctaType, ctaLocation, utmSource, utmMedium, utmCampaign, utmContent) => {
          // URL encode the parameters to handle special characters
          const encodedContent = encodeURIComponent(utmContent);
          const targetUrl = `https://global.sharda.ac.in/?utm_source=${encodeURIComponent(utmSource)}&utm_medium=${encodeURIComponent(utmMedium)}&utm_campaign=${encodeURIComponent(utmCampaign)}&utm_content=${encodedContent}`;
          
          const result = logCTAClick({
            ctaType,
            ctaLocation,
            targetUrl,
          });

          // Verify target UTM parameters are extracted
          // Note: URL parsing will decode the parameters
          expect(result.target_utm_source).toBe(utmSource);
          expect(result.target_utm_medium).toBe(utmMedium);
          expect(result.target_utm_campaign).toBe(utmCampaign);
          expect(result.target_utm_content).toBe(utmContent);
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Page Context Completeness Property
   * 
   * For any event logged, the page context should always include
   * URL, path, title, and referrer information.
   */
  it('should include complete page context in all events', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(
          EVENT_TYPES.PAGE_VIEW,
          EVENT_TYPES.CTA_CLICK,
          EVENT_TYPES.WHATSAPP_CLICK,
          EVENT_TYPES.CALCULATOR_USE,
          EVENT_TYPES.SCROLL_DEPTH,
          EVENT_TYPES.TIME_ON_PAGE
        ),
        fc.record({
          customKey: fc.string({ minLength: 1, maxLength: 50 }),
        }),
        (eventType, context) => {
          const result = logConversionEvent({ eventType, context });

          // Verify all page context fields are present
          expect(result.page_url).toBeDefined();
          expect(result.page_path).toBeDefined();
          expect(result.page_title).toBeDefined();
          expect(result.referrer).toBeDefined();
          
          // Verify they match the mock values
          expect(result.page_url).toBe(mockWindow.location.href);
          expect(result.page_path).toBe(mockWindow.location.pathname);
          expect(result.page_title).toBe(mockDocument.title);
          expect(result.referrer).toBe(mockDocument.referrer);
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * GA4 Integration Property
   * 
   * For any event logged, the system should call window.gtag with
   * the correct event name and parameters.
   */
  it('should call GA4 gtag for all events', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(
          EVENT_TYPES.PAGE_VIEW,
          EVENT_TYPES.CTA_CLICK,
          EVENT_TYPES.WHATSAPP_CLICK,
          EVENT_TYPES.CALCULATOR_USE
        ),
        (eventType) => {
          vi.clearAllMocks();
          
          logConversionEvent({ eventType, context: {} });

          // Verify gtag was called exactly once
          expect(mockWindow.gtag).toHaveBeenCalledTimes(1);
          
          // Verify gtag was called with correct parameters
          expect(mockWindow.gtag).toHaveBeenCalledWith(
            'event',
            eventType,
            expect.objectContaining({
              event_type: eventType,
              timestamp: expect.any(String),
              session_id: expect.any(String),
              page_url: expect.any(String),
            })
          );
        }
      ),
      { numRuns: 100 }
    );
  });
});
