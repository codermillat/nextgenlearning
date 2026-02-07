/**
 * Google Analytics tracking utility
 * Tracks all traffic and lead generation events
 */

import { GA_TRACKING_ID } from '../config/constants';

function sendGtag(...args) {
  if (typeof window === 'undefined') return;

  if (typeof window.gtag === 'function') {
    window.gtag(...args);
    return;
  }

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(args);
}

/**
 * Initialize Google Analytics
 */
export function initGA() {
  if (typeof window === 'undefined') return;
  sendGtag('config', GA_TRACKING_ID, {
    send_page_view: false,
    page_path: window.location.pathname,
  });
}

/**
 * Track page view
 * Call this on route changes in React Router
 */
export function trackPageView(path) {
  if (typeof window === 'undefined') return;
  sendGtag('event', 'page_view', {
    page_title: document.title,
    page_location: window.location.href,
    page_path: path,
    send_to: GA_TRACKING_ID,
  });
}

/**
 * Track event
 */
export function trackEvent(action, category, label, value) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
}

/**
 * Track WhatsApp click (Lead Generation)
 */
export function trackWhatsAppClick(source, programName = '', universityName = '') {
  trackEvent('whatsapp_click', 'Lead Generation', `${source} - ${programName} - ${universityName}`, 1);
  
  // Track as conversion/lead
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'generate_lead', {
      event_category: 'Lead Generation',
      event_label: `WhatsApp Click - ${source}`,
      value: 1,
      currency: 'USD',
      source: source,
      program_name: programName,
      university_name: universityName
    });
    
    // Also track as custom conversion event
    window.gtag('event', 'conversion', {
      send_to: GA_TRACKING_ID,
      event_category: 'Lead Generation',
      event_label: 'WhatsApp Click',
      value: 1,
    });
  }
}

/**
 * Track form submission (Lead Generation)
 */
export function trackFormSubmission(formType, formData = {}) {
  trackEvent('form_submit', 'Lead Generation', formType, 1);
  
  // Track as conversion/lead
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'generate_lead', {
      event_category: 'Lead Generation',
      event_label: `Form Submit - ${formType}`,
      value: 1,
      currency: 'USD',
      form_type: formType,
      has_name: formData.hasName || false,
      has_phone: formData.hasPhone || false,
      has_email: formData.hasEmail || false,
      course_interest: formData.courseInterest || '',
      university_preference: formData.universityPreference || ''
    });
    
    // Also track as custom conversion event
    window.gtag('event', 'conversion', {
      send_to: GA_TRACKING_ID,
      event_category: 'Lead Generation',
      event_label: `Form Submit - ${formType}`,
      value: 1,
    });
  }
}

/**
 * Track course view
 */
export function trackCourseView(courseName, universityName) {
  trackEvent('course_view', 'Content Engagement', `${courseName} - ${universityName}`, 1);
}

/**
 * Track comparison action
 */
export function trackComparison(courseCount, universities) {
  trackEvent('comparison', 'User Engagement', `${courseCount} courses from ${universities.join(', ')}`, courseCount);
}

/**
 * Track filter usage
 */
export function trackFilter(filterType, filterValue) {
  trackEvent('filter_use', 'User Engagement', `${filterType}: ${filterValue}`, 1);
}

/**
 * Track search query
 */
export function trackSearch(query) {
  trackEvent('search', 'User Engagement', query, 1);
}

/**
 * Track external link click
 */
export function trackExternalLink(url, linkText) {
  trackEvent('external_link', 'Outbound', `${linkText} - ${url}`, 1);
}

/**
 * Track time on page (call periodically)
 */
export function trackTimeOnPage(page, seconds) {
  trackEvent('time_on_page', 'Engagement', page, seconds);
}

/**
 * Track button click (for CTA tracking)
 */
export function trackButtonClick(buttonName, location, additionalData = {}) {
  trackEvent('button_click', 'User Engagement', `${buttonName} - ${location}`, 1);
  
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'click', {
      event_category: 'Button Click',
      event_label: buttonName,
      location: location,
      ...additionalData
    });
  }
}

/**
 * Track email click
 */
export function trackEmailClick(email, source) {
  trackEvent('email_click', 'Lead Generation', `${email} - ${source}`, 1);
  
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'generate_lead', {
      event_category: 'Lead Generation',
      event_label: 'Email Click',
      value: 1,
      source: source,
      email: email
    });
  }
}

/**
 * Track phone number click
 */
export function trackPhoneClick(phone, source) {
  trackEvent('phone_click', 'Lead Generation', `${phone} - ${source}`, 1);
  
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'generate_lead', {
      event_category: 'Lead Generation',
      event_label: 'Phone Click',
      value: 1,
      source: source,
      phone: phone
    });
  }
}
