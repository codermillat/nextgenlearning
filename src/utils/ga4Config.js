/**
 * Google Analytics 4 Configuration for Sharda University
 * Feature: sharda-university-content-enhancement
 * 
 * Configures GA4 events, conversion tracking, and custom dimensions
 * for comprehensive analytics tracking of Sharda University content.
 * 
 * Validates: Requirements 17.1, 17.2, 17.3, 17.5
 */

import { GA_TRACKING_ID } from '../config/constants';

/**
 * GA4 Event Names
 * Standard and custom events for tracking user interactions
 */
export const GA4_EVENTS = {
  // Standard GA4 events
  PAGE_VIEW: 'page_view',
  GENERATE_LEAD: 'generate_lead',
  CLICK: 'click',
  
  // Custom conversion events
  CTA_CLICK: 'cta_click',
  WHATSAPP_CLICK: 'whatsapp_click',
  CALCULATOR_USE: 'calculator_use',
  PROGRAM_VIEW: 'program_view',
  COMPARISON_VIEW: 'comparison_view',
  
  // Engagement events
  SCROLL_DEPTH: 'scroll_depth',
  TIME_ON_PAGE: 'time_on_page',
  VIDEO_PLAY: 'video_play',
  DOWNLOAD: 'download',
  
  // Form events
  FORM_START: 'form_start',
  FORM_SUBMIT: 'form_submit',
  FORM_ERROR: 'form_error',
};

/**
 * GA4 Custom Dimensions
 * Custom dimensions for enhanced tracking and segmentation
 */
export const GA4_DIMENSIONS = {
  CONTENT_TYPE: 'content_type',
  PROGRAM: 'program',
  CATEGORY: 'category',
  USER_COUNTRY: 'user_country',
  CTA_TYPE: 'cta_type',
  CTA_LOCATION: 'cta_location',
  SCROLL_DEPTH: 'scroll_depth',
  TIME_SECONDS: 'time_seconds',
};

/**
 * GA4 Conversion Events
 * Events that should be marked as conversions in GA4
 */
export const GA4_CONVERSIONS = [
  GA4_EVENTS.CTA_CLICK,
  GA4_EVENTS.WHATSAPP_CLICK,
  GA4_EVENTS.GENERATE_LEAD,
  GA4_EVENTS.FORM_SUBMIT,
  GA4_EVENTS.CALCULATOR_USE,
];

/**
 * Initialize GA4 with custom configuration
 * Call this once when the app loads
 */
export function initGA4() {
  if (typeof window === 'undefined' || !window.gtag) {
    console.warn('GA4: gtag not available');
    return;
  }

  // Configure GA4 with custom settings
  window.gtag('config', GA_TRACKING_ID, {
    send_page_view: true,
    anonymize_ip: false,
    cookie_flags: 'SameSite=None;Secure',
    // Custom configuration
    custom_map: {
      dimension1: GA4_DIMENSIONS.CONTENT_TYPE,
      dimension2: GA4_DIMENSIONS.PROGRAM,
      dimension3: GA4_DIMENSIONS.CATEGORY,
      dimension4: GA4_DIMENSIONS.USER_COUNTRY,
      dimension5: GA4_DIMENSIONS.CTA_TYPE,
      dimension6: GA4_DIMENSIONS.CTA_LOCATION,
    },
  });

  console.log('GA4: Initialized with tracking ID:', GA_TRACKING_ID);
}

/**
 * Track a conversion event in GA4
 * Automatically marks the event as a conversion
 * 
 * @param {string} eventName - Name of the conversion event
 * @param {Object} eventParams - Event parameters
 * @param {number} [value=1] - Conversion value
 */
export function trackConversion(eventName, eventParams = {}, value = 1) {
  if (typeof window === 'undefined' || !window.gtag) {
    return;
  }

  // Send the main event
  window.gtag('event', eventName, {
    ...eventParams,
    value,
    currency: 'USD',
  });

  // Mark as conversion
  window.gtag('event', 'conversion', {
    send_to: GA_TRACKING_ID,
    event_category: 'Conversion',
    event_label: eventName,
    value,
  });

  console.log('GA4: Conversion tracked:', eventName, eventParams);
}

/**
 * Track CTA click as conversion
 * 
 * @param {Object} params - CTA parameters
 * @param {string} params.ctaType - Type of CTA
 * @param {string} params.ctaLocation - Location on page
 * @param {string} [params.program] - Program name
 * @param {string} [params.targetUrl] - Target URL
 */
export function trackCTAConversion({ ctaType, ctaLocation, program, targetUrl }) {
  trackConversion(GA4_EVENTS.CTA_CLICK, {
    cta_type: ctaType,
    cta_location: ctaLocation,
    program,
    target_url: targetUrl,
    event_category: 'Lead Generation',
    event_label: `CTA Click - ${ctaType}`,
  });
}

/**
 * Track WhatsApp click as conversion
 * 
 * @param {Object} params - WhatsApp parameters
 * @param {string} params.phoneNumber - Phone number
 * @param {string} params.context - Click context
 * @param {string} [params.program] - Program name
 */
export function trackWhatsAppConversion({ phoneNumber, context, program }) {
  trackConversion(GA4_EVENTS.WHATSAPP_CLICK, {
    phone_number: phoneNumber,
    click_context: context,
    program,
    event_category: 'Lead Generation',
    event_label: 'WhatsApp Click',
  });
}

/**
 * Track calculator usage as conversion
 * 
 * @param {Object} params - Calculator parameters
 * @param {string} params.program - Selected program
 * @param {number} params.scholarshipPercentage - Scholarship percentage
 * @param {number} params.finalAmount - Final calculated amount
 */
export function trackCalculatorConversion({ program, scholarshipPercentage, finalAmount }) {
  trackConversion(GA4_EVENTS.CALCULATOR_USE, {
    program,
    scholarship_percentage: scholarshipPercentage,
    final_amount: finalAmount,
    event_category: 'Tool Usage',
    event_label: 'Fee Calculator',
  }, finalAmount / 1000); // Value in thousands
}

/**
 * Set up conversion funnel tracking
 * Defines the steps in the conversion funnel
 */
export function setupConversionFunnel() {
  if (typeof window === 'undefined' || !window.gtag) {
    return;
  }

  // Define funnel steps
  const funnelSteps = [
    { step: 1, name: 'Landing Page View', event: GA4_EVENTS.PAGE_VIEW },
    { step: 2, name: 'Program View', event: GA4_EVENTS.PROGRAM_VIEW },
    { step: 3, name: 'Calculator Use', event: GA4_EVENTS.CALCULATOR_USE },
    { step: 4, name: 'CTA Click', event: GA4_EVENTS.CTA_CLICK },
    { step: 5, name: 'Application Submit', event: GA4_EVENTS.FORM_SUBMIT },
  ];

  console.log('GA4: Conversion funnel configured:', funnelSteps);
  
  return funnelSteps;
}

/**
 * Track funnel step completion
 * 
 * @param {number} step - Funnel step number (1-5)
 * @param {string} stepName - Name of the step
 * @param {Object} [additionalParams] - Additional parameters
 */
export function trackFunnelStep(step, stepName, additionalParams = {}) {
  if (typeof window === 'undefined' || !window.gtag) {
    return;
  }

  window.gtag('event', 'funnel_step', {
    funnel_name: 'Sharda Application Funnel',
    funnel_step: step,
    step_name: stepName,
    ...additionalParams,
  });

  console.log('GA4: Funnel step tracked:', step, stepName);
}

/**
 * GA4 Dashboard Configuration
 * Recommended metrics and dimensions for custom dashboards
 */
export const GA4_DASHBOARD_CONFIG = {
  // Key metrics to track
  metrics: [
    'Total Users',
    'New Users',
    'Sessions',
    'Engagement Rate',
    'Average Engagement Time',
    'Conversions',
    'Conversion Rate',
    'Event Count',
  ],
  
  // Key dimensions for segmentation
  dimensions: [
    'Page Path',
    'Content Type',
    'Program',
    'Traffic Source',
    'Medium',
    'Campaign',
    'Device Category',
    'Country',
  ],
  
  // Recommended reports
  reports: [
    {
      name: 'Sharda Content Performance',
      description: 'Performance metrics for all Sharda University content',
      primaryDimension: 'Page Path',
      metrics: ['Page Views', 'Users', 'Engagement Rate', 'Conversions'],
      filters: ['Page Path contains /sharda'],
    },
    {
      name: 'Conversion Funnel',
      description: 'User journey from landing to application',
      type: 'Funnel Exploration',
      steps: [
        'Landing Page View',
        'Program View',
        'Calculator Use',
        'CTA Click',
        'Application Submit',
      ],
    },
    {
      name: 'Program Interest',
      description: 'Which programs generate the most interest',
      primaryDimension: 'Program',
      metrics: ['Program Views', 'Calculator Uses', 'CTA Clicks'],
    },
    {
      name: 'CTA Performance',
      description: 'Performance of different CTAs',
      primaryDimension: 'CTA Type',
      secondaryDimension: 'CTA Location',
      metrics: ['Clicks', 'Conversion Rate'],
    },
    {
      name: 'Traffic Source Analysis',
      description: 'Which traffic sources drive conversions',
      primaryDimension: 'Source / Medium',
      metrics: ['Users', 'Sessions', 'Conversions', 'Conversion Rate'],
    },
    {
      name: 'Engagement Metrics',
      description: 'User engagement with content',
      primaryDimension: 'Page Path',
      metrics: ['Average Engagement Time', 'Scroll Depth', 'Bounce Rate'],
    },
  ],
  
  // Custom audiences for remarketing
  audiences: [
    {
      name: 'Sharda Landing Page Visitors',
      description: 'Users who visited Sharda landing page',
      conditions: ['Page Path contains /sharda'],
    },
    {
      name: 'Calculator Users',
      description: 'Users who used the fee calculator',
      conditions: ['Event: calculator_use'],
    },
    {
      name: 'High Intent Users',
      description: 'Users who clicked CTAs but didn\'t convert',
      conditions: ['Event: cta_click', 'NOT Event: form_submit'],
    },
    {
      name: 'Program Researchers',
      description: 'Users who viewed multiple program pages',
      conditions: ['Event: program_view', 'Event Count >= 3'],
    },
  ],
};

/**
 * Export GA4 configuration for setup in GA4 interface
 * Returns JSON configuration that can be imported into GA4
 */
export function exportGA4Config() {
  return {
    trackingId: GA_TRACKING_ID,
    events: GA4_EVENTS,
    dimensions: GA4_DIMENSIONS,
    conversions: GA4_CONVERSIONS,
    dashboards: GA4_DASHBOARD_CONFIG,
    funnelSteps: setupConversionFunnel(),
  };
}

export default {
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
};
