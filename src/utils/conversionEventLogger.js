/**
 * Conversion Event Logger for Sharda University
 * Feature: sharda-university-content-enhancement
 * 
 * Logs conversion events (CTA clicks, WhatsApp clicks, calculator usage)
 * with Google Analytics 4 integration, page context, and UTM parameter tracking.
 * 
 * Validates: Requirements 17.1, 17.2, 17.3, 17.4, 17.5, 17.6
 */

import { parseUTMParameters } from './utmGenerator';

/**
 * Event types for conversion tracking
 */
export const EVENT_TYPES = {
  CTA_CLICK: 'cta_click',
  WHATSAPP_CLICK: 'whatsapp_click',
  CALCULATOR_USE: 'calculator_use',
  PAGE_VIEW: 'page_view',
  SCROLL_DEPTH: 'scroll_depth',
  TIME_ON_PAGE: 'time_on_page',
};

/**
 * Get current page context information
 * @returns {Object} Page context with URL, path, title, and referrer
 */
function getPageContext() {
  if (typeof window === 'undefined') {
    return {
      url: '',
      path: '',
      title: '',
      referrer: '',
    };
  }

  return {
    url: window.location.href,
    path: window.location.pathname,
    title: document.title,
    referrer: document.referrer,
  };
}

/**
 * Get UTM parameters from current URL or provided URL
 * @param {string} [url] - Optional URL to parse (defaults to current URL)
 * @returns {Object|null} UTM parameters or null if none found
 */
function getUTMParameters(url) {
  const targetUrl = url || (typeof window !== 'undefined' ? window.location.href : '');
  if (!targetUrl) return null;

  return parseUTMParameters(targetUrl);
}

/**
 * Get session ID from sessionStorage or generate new one
 * @returns {string} Session ID
 */
function getSessionId() {
  if (typeof window === 'undefined') return 'server-session';

  let sessionId = sessionStorage.getItem('sharda_session_id');
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem('sharda_session_id', sessionId);
  }
  return sessionId;
}

/**
 * Get user ID from localStorage if available
 * @returns {string|null} User ID or null
 */
function getUserId() {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('sharda_user_id') || null;
}

/**
 * Send event to Google Analytics 4
 * @param {string} eventName - GA4 event name
 * @param {Object} eventParams - Event parameters
 */
function sendToGA4(eventName, eventParams) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, eventParams);
  }
}

/**
 * Log conversion event with full context
 * @param {Object} event - Event details
 * @param {string} event.eventType - Type of event (from EVENT_TYPES)
 * @param {Object} event.context - Additional context data
 * @param {string} [event.targetUrl] - Target URL if applicable (for link clicks)
 */
export function logConversionEvent({ eventType, context = {}, targetUrl }) {
  const timestamp = new Date().toISOString();
  const pageContext = getPageContext();
  const utmParameters = getUTMParameters();
  const sessionId = getSessionId();
  const userId = getUserId();

  // Build complete event data
  const eventData = {
    event_type: eventType,
    timestamp,
    session_id: sessionId,
    user_id: userId,
    page_url: pageContext.url,
    page_path: pageContext.path,
    page_title: pageContext.title,
    referrer: pageContext.referrer,
    ...context,
  };

  // Add UTM parameters if available
  if (utmParameters) {
    eventData.utm_source = utmParameters.utm_source;
    eventData.utm_medium = utmParameters.utm_medium;
    eventData.utm_campaign = utmParameters.utm_campaign;
    eventData.utm_content = utmParameters.utm_content;
    eventData.utm_term = utmParameters.utm_term;
  }

  // Add target URL UTM parameters if provided
  if (targetUrl) {
    const targetUtm = parseUTMParameters(targetUrl);
    if (targetUtm) {
      eventData.target_utm_source = targetUtm.utm_source;
      eventData.target_utm_medium = targetUtm.utm_medium;
      eventData.target_utm_campaign = targetUtm.utm_campaign;
      eventData.target_utm_content = targetUtm.utm_content;
    }
  }

  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log('[ConversionEventLogger]', eventType, eventData);
  }

  // Send to Google Analytics 4
  sendToGA4(eventType, eventData);

  return eventData;
}

/**
 * Log CTA click event
 * @param {Object} params - CTA click parameters
 * @param {string} params.ctaType - Type of CTA (e.g., 'apply-now', 'learn-more')
 * @param {string} params.ctaLocation - Location on page (e.g., 'hero', 'footer', 'floating')
 * @param {string} params.targetUrl - URL the CTA links to
 * @param {string} [params.program] - Program name if applicable
 * @param {string} [params.contentType] - Type of content (e.g., 'landing', 'program', 'comparison')
 */
export function logCTAClick({ ctaType, ctaLocation, targetUrl, program, contentType }) {
  return logConversionEvent({
    eventType: EVENT_TYPES.CTA_CLICK,
    targetUrl,
    context: {
      cta_type: ctaType,
      cta_location: ctaLocation,
      program,
      content_type: contentType,
      target_url: targetUrl,
    },
  });
}

/**
 * Log WhatsApp click event
 * @param {Object} params - WhatsApp click parameters
 * @param {string} params.phoneNumber - WhatsApp phone number
 * @param {string} params.message - Pre-filled message
 * @param {string} params.context - Context where WhatsApp button was clicked
 * @param {string} [params.program] - Program name if applicable
 * @param {string} [params.contentType] - Type of content
 */
export function logWhatsAppClick({ phoneNumber, message, context, program, contentType }) {
  return logConversionEvent({
    eventType: EVENT_TYPES.WHATSAPP_CLICK,
    context: {
      phone_number: phoneNumber,
      message_preview: message ? message.substring(0, 100) : '',
      click_context: context,
      program,
      content_type: contentType,
    },
  });
}

/**
 * Log fee calculator usage
 * @param {Object} params - Calculator usage parameters
 * @param {string} params.program - Selected program
 * @param {number} params.gpa - Entered GPA/percentage
 * @param {string} params.country - Selected country
 * @param {number} params.baseFee - Base tuition fee
 * @param {number} params.scholarshipPercentage - Applied scholarship percentage
 * @param {number} params.finalAmount - Final calculated amount
 * @param {string} [params.action] - Action taken (e.g., 'calculate', 'apply')
 */
export function logCalculatorUsage({
  program,
  gpa,
  country,
  baseFee,
  scholarshipPercentage,
  finalAmount,
  action = 'calculate',
}) {
  return logConversionEvent({
    eventType: EVENT_TYPES.CALCULATOR_USE,
    context: {
      program,
      gpa,
      country,
      base_fee: baseFee,
      scholarship_percentage: scholarshipPercentage,
      final_amount: finalAmount,
      calculator_action: action,
    },
  });
}

/**
 * Log page view event
 * @param {Object} params - Page view parameters
 * @param {string} [params.contentType] - Type of content being viewed
 * @param {string} [params.program] - Program name if viewing program page
 * @param {string} [params.category] - Content category
 */
export function logPageView({ contentType, program, category } = {}) {
  return logConversionEvent({
    eventType: EVENT_TYPES.PAGE_VIEW,
    context: {
      content_type: contentType,
      program,
      category,
    },
  });
}

/**
 * Log scroll depth event
 * @param {Object} params - Scroll depth parameters
 * @param {number} params.depth - Scroll depth percentage (25, 50, 75, 100)
 * @param {string} [params.contentType] - Type of content
 */
export function logScrollDepth({ depth, contentType }) {
  return logConversionEvent({
    eventType: EVENT_TYPES.SCROLL_DEPTH,
    context: {
      scroll_depth: depth,
      content_type: contentType,
    },
  });
}

/**
 * Log time on page event
 * @param {Object} params - Time on page parameters
 * @param {number} params.seconds - Time spent on page in seconds
 * @param {string} [params.contentType] - Type of content
 */
export function logTimeOnPage({ seconds, contentType }) {
  return logConversionEvent({
    eventType: EVENT_TYPES.TIME_ON_PAGE,
    context: {
      time_seconds: seconds,
      content_type: contentType,
    },
  });
}

/**
 * Initialize scroll depth tracking for current page
 * Automatically tracks 25%, 50%, 75%, and 100% scroll depths
 * @param {string} [contentType] - Type of content being tracked
 * @returns {Function} Cleanup function to remove event listeners
 */
export function initScrollDepthTracking(contentType) {
  if (typeof window === 'undefined') return () => {};

  const trackedDepths = new Set();
  const depths = [25, 50, 75, 100];

  const handleScroll = () => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollPercentage = ((scrollTop + windowHeight) / documentHeight) * 100;

    depths.forEach((depth) => {
      if (scrollPercentage >= depth && !trackedDepths.has(depth)) {
        trackedDepths.add(depth);
        logScrollDepth({ depth, contentType });
      }
    });
  };

  // Throttle scroll events
  let ticking = false;
  const throttledScroll = () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        handleScroll();
        ticking = false;
      });
      ticking = true;
    }
  };

  window.addEventListener('scroll', throttledScroll, { passive: true });

  // Return cleanup function
  return () => {
    window.removeEventListener('scroll', throttledScroll);
  };
}

/**
 * Initialize time on page tracking
 * Tracks time spent on page and logs at intervals
 * @param {string} [contentType] - Type of content being tracked
 * @param {number} [intervalSeconds=30] - Interval to log time (default 30 seconds)
 * @returns {Function} Cleanup function to stop tracking
 */
export function initTimeOnPageTracking(contentType, intervalSeconds = 30) {
  if (typeof window === 'undefined') return () => {};

  const startTime = Date.now();
  let lastLoggedTime = 0;

  const logTime = () => {
    const currentTime = Math.floor((Date.now() - startTime) / 1000);
    if (currentTime - lastLoggedTime >= intervalSeconds) {
      logTimeOnPage({ seconds: currentTime, contentType });
      lastLoggedTime = currentTime;
    }
  };

  // Log time at intervals
  const intervalId = setInterval(logTime, intervalSeconds * 1000);

  // Log final time on page unload
  const handleUnload = () => {
    const finalTime = Math.floor((Date.now() - startTime) / 1000);
    logTimeOnPage({ seconds: finalTime, contentType });
  };

  window.addEventListener('beforeunload', handleUnload);

  // Return cleanup function
  return () => {
    clearInterval(intervalId);
    window.removeEventListener('beforeunload', handleUnload);
    // Log final time when cleanup is called
    handleUnload();
  };
}

/**
 * Initialize all tracking for a page
 * Convenience function to set up page view, scroll depth, and time tracking
 * @param {Object} params - Tracking parameters
 * @param {string} [params.contentType] - Type of content
 * @param {string} [params.program] - Program name if applicable
 * @param {string} [params.category] - Content category
 * @returns {Function} Cleanup function to stop all tracking
 */
export function initPageTracking({ contentType, program, category } = {}) {
  // Log initial page view
  logPageView({ contentType, program, category });

  // Initialize scroll depth tracking
  const cleanupScroll = initScrollDepthTracking(contentType);

  // Initialize time on page tracking
  const cleanupTime = initTimeOnPageTracking(contentType);

  // Return combined cleanup function
  return () => {
    cleanupScroll();
    cleanupTime();
  };
}

// Alias for backward compatibility
export const logCalculatorUse = logCalculatorUsage;

export default {
  EVENT_TYPES,
  logConversionEvent,
  logCTAClick,
  logWhatsAppClick,
  logCalculatorUsage,
  logCalculatorUse,
  logPageView,
  logScrollDepth,
  logTimeOnPage,
  initScrollDepthTracking,
  initTimeOnPageTracking,
  initPageTracking,
};
