/**
 * Unit tests for GA4 Configuration
 * Feature: sharda-university-content-enhancement
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import {
  GA4_EVENTS,
  GA4_DIMENSIONS,
  GA4_CONVERSIONS,
  GA4_DASHBOARD_CONFIG,
  initGA4,
  trackConversion,
  trackCTAConversion,
  trackWhatsAppConversion,
  trackCalculatorConversion,
  setupConversionFunnel,
  trackFunnelStep,
  exportGA4Config,
} from '../ga4Config';
import { GA_TRACKING_ID } from '../../config/constants';

// Mock window.gtag
const mockGtag = vi.fn();
const mockConsoleLog = vi.fn();
const mockConsoleWarn = vi.fn();

describe('GA4 Configuration', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockGtag.mockClear();
    mockConsoleLog.mockClear();
    mockConsoleWarn.mockClear();

    global.window = {
      gtag: mockGtag,
    };
    global.console = {
      ...console,
      log: mockConsoleLog,
      warn: mockConsoleWarn,
    };
  });

  afterEach(() => {
    delete global.window;
    vi.restoreAllMocks();
  });

  describe('Constants', () => {
    it('should define all GA4 event names', () => {
      expect(GA4_EVENTS.PAGE_VIEW).toBe('page_view');
      expect(GA4_EVENTS.GENERATE_LEAD).toBe('generate_lead');
      expect(GA4_EVENTS.CTA_CLICK).toBe('cta_click');
      expect(GA4_EVENTS.WHATSAPP_CLICK).toBe('whatsapp_click');
      expect(GA4_EVENTS.CALCULATOR_USE).toBe('calculator_use');
      expect(GA4_EVENTS.SCROLL_DEPTH).toBe('scroll_depth');
      expect(GA4_EVENTS.TIME_ON_PAGE).toBe('time_on_page');
    });

    it('should define all GA4 custom dimensions', () => {
      expect(GA4_DIMENSIONS.CONTENT_TYPE).toBe('content_type');
      expect(GA4_DIMENSIONS.PROGRAM).toBe('program');
      expect(GA4_DIMENSIONS.CATEGORY).toBe('category');
      expect(GA4_DIMENSIONS.CTA_TYPE).toBe('cta_type');
      expect(GA4_DIMENSIONS.CTA_LOCATION).toBe('cta_location');
    });

    it('should define conversion events', () => {
      expect(GA4_CONVERSIONS).toContain(GA4_EVENTS.CTA_CLICK);
      expect(GA4_CONVERSIONS).toContain(GA4_EVENTS.WHATSAPP_CLICK);
      expect(GA4_CONVERSIONS).toContain(GA4_EVENTS.GENERATE_LEAD);
      expect(GA4_CONVERSIONS).toContain(GA4_EVENTS.CALCULATOR_USE);
    });

    it('should define dashboard configuration', () => {
      expect(GA4_DASHBOARD_CONFIG).toHaveProperty('metrics');
      expect(GA4_DASHBOARD_CONFIG).toHaveProperty('dimensions');
      expect(GA4_DASHBOARD_CONFIG).toHaveProperty('reports');
      expect(GA4_DASHBOARD_CONFIG).toHaveProperty('audiences');
    });
  });

  describe('initGA4', () => {
    it('should initialize GA4 with custom configuration', () => {
      initGA4();

      expect(mockGtag).toHaveBeenCalledWith('config', GA_TRACKING_ID, {
        send_page_view: true,
        anonymize_ip: false,
        cookie_flags: 'SameSite=None;Secure',
        custom_map: {
          dimension1: 'content_type',
          dimension2: 'program',
          dimension3: 'category',
          dimension4: 'user_country',
          dimension5: 'cta_type',
          dimension6: 'cta_location',
        },
      });

      expect(mockConsoleLog).toHaveBeenCalledWith(
        'GA4: Initialized with tracking ID:',
        GA_TRACKING_ID
      );
    });

    it('should handle missing gtag gracefully', () => {
      delete global.window.gtag;

      initGA4();

      expect(mockConsoleWarn).toHaveBeenCalledWith('GA4: gtag not available');
    });

    it('should handle server-side rendering', () => {
      delete global.window;

      expect(() => initGA4()).not.toThrow();
      expect(mockConsoleWarn).toHaveBeenCalledWith('GA4: gtag not available');
    });
  });

  describe('trackConversion', () => {
    it('should track conversion event with parameters', () => {
      trackConversion('test_event', { test_param: 'value' }, 5);

      expect(mockGtag).toHaveBeenCalledTimes(2);
      
      // First call: main event
      expect(mockGtag).toHaveBeenNthCalledWith(1, 'event', 'test_event', {
        test_param: 'value',
        value: 5,
        currency: 'USD',
      });

      // Second call: conversion event
      expect(mockGtag).toHaveBeenNthCalledWith(2, 'event', 'conversion', {
        send_to: GA_TRACKING_ID,
        event_category: 'Conversion',
        event_label: 'test_event',
        value: 5,
      });
    });

    it('should use default value of 1', () => {
      trackConversion('test_event', {});

      expect(mockGtag).toHaveBeenNthCalledWith(1, 'event', 'test_event', {
        value: 1,
        currency: 'USD',
      });
    });

    it('should handle missing gtag', () => {
      delete global.window.gtag;

      expect(() => trackConversion('test_event', {})).not.toThrow();
      expect(mockGtag).not.toHaveBeenCalled();
    });

    it('should log conversion tracking', () => {
      trackConversion('test_event', { param: 'value' });

      expect(mockConsoleLog).toHaveBeenCalledWith(
        'GA4: Conversion tracked:',
        'test_event',
        { param: 'value' }
      );
    });
  });

  describe('trackCTAConversion', () => {
    it('should track CTA click conversion', () => {
      trackCTAConversion({
        ctaType: 'apply-now',
        ctaLocation: 'hero',
        program: 'btech-cse',
        targetUrl: 'https://global.sharda.ac.in/',
      });

      expect(mockGtag).toHaveBeenCalledWith(
        'event',
        GA4_EVENTS.CTA_CLICK,
        expect.objectContaining({
          cta_type: 'apply-now',
          cta_location: 'hero',
          program: 'btech-cse',
          target_url: 'https://global.sharda.ac.in/',
          event_category: 'Lead Generation',
          event_label: 'CTA Click - apply-now',
        })
      );
    });

    it('should work without optional parameters', () => {
      trackCTAConversion({
        ctaType: 'learn-more',
        ctaLocation: 'footer',
      });

      expect(mockGtag).toHaveBeenCalledWith(
        'event',
        GA4_EVENTS.CTA_CLICK,
        expect.objectContaining({
          cta_type: 'learn-more',
          cta_location: 'footer',
        })
      );
    });
  });

  describe('trackWhatsAppConversion', () => {
    it('should track WhatsApp click conversion', () => {
      trackWhatsAppConversion({
        phoneNumber: '+91 88009 96151',
        context: 'landing-page',
        program: 'btech-cse',
      });

      expect(mockGtag).toHaveBeenCalledWith(
        'event',
        GA4_EVENTS.WHATSAPP_CLICK,
        expect.objectContaining({
          phone_number: '+91 88009 96151',
          click_context: 'landing-page',
          program: 'btech-cse',
          event_category: 'Lead Generation',
          event_label: 'WhatsApp Click',
        })
      );
    });

    it('should work without program parameter', () => {
      trackWhatsAppConversion({
        phoneNumber: '+91 88009 96151',
        context: 'footer',
      });

      expect(mockGtag).toHaveBeenCalledWith(
        'event',
        GA4_EVENTS.WHATSAPP_CLICK,
        expect.objectContaining({
          phone_number: '+91 88009 96151',
          click_context: 'footer',
        })
      );
    });
  });

  describe('trackCalculatorConversion', () => {
    it('should track calculator usage conversion', () => {
      trackCalculatorConversion({
        program: 'B.Tech CSE',
        scholarshipPercentage: 50,
        finalAmount: 200000,
      });

      expect(mockGtag).toHaveBeenCalledWith(
        'event',
        GA4_EVENTS.CALCULATOR_USE,
        expect.objectContaining({
          program: 'B.Tech CSE',
          scholarship_percentage: 50,
          final_amount: 200000,
          event_category: 'Tool Usage',
          event_label: 'Fee Calculator',
          value: 200, // finalAmount / 1000
        })
      );
    });

    it('should calculate value correctly', () => {
      trackCalculatorConversion({
        program: 'MBA',
        scholarshipPercentage: 20,
        finalAmount: 500000,
      });

      const eventCall = mockGtag.mock.calls.find(
        call => call[0] === 'event' && call[1] === GA4_EVENTS.CALCULATOR_USE
      );

      expect(eventCall[2].value).toBe(500); // 500000 / 1000
    });
  });

  describe('setupConversionFunnel', () => {
    it('should return funnel steps configuration', () => {
      const funnelSteps = setupConversionFunnel();

      expect(funnelSteps).toHaveLength(5);
      expect(funnelSteps[0]).toEqual({
        step: 1,
        name: 'Landing Page View',
        event: GA4_EVENTS.PAGE_VIEW,
      });
      expect(funnelSteps[4]).toEqual({
        step: 5,
        name: 'Application Submit',
        event: GA4_EVENTS.FORM_SUBMIT,
      });
    });

    it('should log funnel configuration', () => {
      setupConversionFunnel();

      expect(mockConsoleLog).toHaveBeenCalledWith(
        'GA4: Conversion funnel configured:',
        expect.any(Array)
      );
    });

    it('should handle missing gtag', () => {
      delete global.window.gtag;

      const result = setupConversionFunnel();

      expect(result).toBeUndefined();
    });
  });

  describe('trackFunnelStep', () => {
    it('should track funnel step completion', () => {
      trackFunnelStep(2, 'Program View', { program: 'btech-cse' });

      expect(mockGtag).toHaveBeenCalledWith('event', 'funnel_step', {
        funnel_name: 'Sharda Application Funnel',
        funnel_step: 2,
        step_name: 'Program View',
        program: 'btech-cse',
      });

      expect(mockConsoleLog).toHaveBeenCalledWith(
        'GA4: Funnel step tracked:',
        2,
        'Program View'
      );
    });

    it('should work without additional parameters', () => {
      trackFunnelStep(1, 'Landing Page View');

      expect(mockGtag).toHaveBeenCalledWith('event', 'funnel_step', {
        funnel_name: 'Sharda Application Funnel',
        funnel_step: 1,
        step_name: 'Landing Page View',
      });
    });

    it('should handle missing gtag', () => {
      delete global.window.gtag;

      expect(() => trackFunnelStep(1, 'Test Step')).not.toThrow();
      expect(mockGtag).not.toHaveBeenCalled();
    });
  });

  describe('exportGA4Config', () => {
    it('should export complete GA4 configuration', () => {
      const config = exportGA4Config();

      expect(config).toHaveProperty('trackingId', GA_TRACKING_ID);
      expect(config).toHaveProperty('events', GA4_EVENTS);
      expect(config).toHaveProperty('dimensions', GA4_DIMENSIONS);
      expect(config).toHaveProperty('conversions', GA4_CONVERSIONS);
      expect(config).toHaveProperty('dashboards', GA4_DASHBOARD_CONFIG);
      expect(config).toHaveProperty('funnelSteps');
    });

    it('should include all required configuration sections', () => {
      const config = exportGA4Config();

      expect(config.events).toBeDefined();
      expect(config.dimensions).toBeDefined();
      expect(config.conversions).toBeInstanceOf(Array);
      expect(config.dashboards).toHaveProperty('metrics');
      expect(config.dashboards).toHaveProperty('reports');
      expect(config.dashboards).toHaveProperty('audiences');
    });
  });

  describe('Dashboard Configuration', () => {
    it('should define all required metrics', () => {
      expect(GA4_DASHBOARD_CONFIG.metrics).toContain('Total Users');
      expect(GA4_DASHBOARD_CONFIG.metrics).toContain('Conversions');
      expect(GA4_DASHBOARD_CONFIG.metrics).toContain('Conversion Rate');
    });

    it('should define all required dimensions', () => {
      expect(GA4_DASHBOARD_CONFIG.dimensions).toContain('Page Path');
      expect(GA4_DASHBOARD_CONFIG.dimensions).toContain('Content Type');
      expect(GA4_DASHBOARD_CONFIG.dimensions).toContain('Program');
    });

    it('should define recommended reports', () => {
      expect(GA4_DASHBOARD_CONFIG.reports).toBeInstanceOf(Array);
      expect(GA4_DASHBOARD_CONFIG.reports.length).toBeGreaterThan(0);
      
      const reportNames = GA4_DASHBOARD_CONFIG.reports.map(r => r.name);
      expect(reportNames).toContain('Sharda Content Performance');
      expect(reportNames).toContain('Conversion Funnel');
      expect(reportNames).toContain('Program Interest');
    });

    it('should define remarketing audiences', () => {
      expect(GA4_DASHBOARD_CONFIG.audiences).toBeInstanceOf(Array);
      expect(GA4_DASHBOARD_CONFIG.audiences.length).toBeGreaterThan(0);
      
      const audienceNames = GA4_DASHBOARD_CONFIG.audiences.map(a => a.name);
      expect(audienceNames).toContain('Sharda Landing Page Visitors');
      expect(audienceNames).toContain('Calculator Users');
      expect(audienceNames).toContain('High Intent Users');
    });

    it('should have complete report configurations', () => {
      GA4_DASHBOARD_CONFIG.reports.forEach(report => {
        expect(report).toHaveProperty('name');
        expect(report).toHaveProperty('description');
        expect(report.name).toBeTruthy();
        expect(report.description).toBeTruthy();
      });
    });

    it('should have complete audience configurations', () => {
      GA4_DASHBOARD_CONFIG.audiences.forEach(audience => {
        expect(audience).toHaveProperty('name');
        expect(audience).toHaveProperty('description');
        expect(audience).toHaveProperty('conditions');
        expect(audience.conditions).toBeInstanceOf(Array);
        expect(audience.conditions.length).toBeGreaterThan(0);
      });
    });
  });

  describe('Integration scenarios', () => {
    it('should track complete conversion flow', () => {
      // Initialize GA4
      initGA4();
      expect(mockGtag).toHaveBeenCalledWith('config', GA_TRACKING_ID, expect.any(Object));

      // Track CTA click
      trackCTAConversion({
        ctaType: 'apply-now',
        ctaLocation: 'hero',
        program: 'btech-cse',
      });
      expect(mockGtag).toHaveBeenCalledWith('event', GA4_EVENTS.CTA_CLICK, expect.any(Object));

      // Track calculator use
      trackCalculatorConversion({
        program: 'B.Tech CSE',
        scholarshipPercentage: 50,
        finalAmount: 200000,
      });
      expect(mockGtag).toHaveBeenCalledWith('event', GA4_EVENTS.CALCULATOR_USE, expect.any(Object));

      // Track WhatsApp click
      trackWhatsAppConversion({
        phoneNumber: '+91 88009 96151',
        context: 'landing',
      });
      expect(mockGtag).toHaveBeenCalledWith('event', GA4_EVENTS.WHATSAPP_CLICK, expect.any(Object));
    });

    it('should track funnel progression', () => {
      setupConversionFunnel();

      trackFunnelStep(1, 'Landing Page View');
      trackFunnelStep(2, 'Program View', { program: 'btech-cse' });
      trackFunnelStep(3, 'Calculator Use');
      trackFunnelStep(4, 'CTA Click');

      expect(mockGtag).toHaveBeenCalledWith('event', 'funnel_step', expect.objectContaining({
        funnel_step: 1,
      }));
      expect(mockGtag).toHaveBeenCalledWith('event', 'funnel_step', expect.objectContaining({
        funnel_step: 4,
      }));
    });
  });
});
