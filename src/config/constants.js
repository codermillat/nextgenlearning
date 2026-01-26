/**
 * Application Constants
 * Centralized configuration using environment variables with fallbacks
 */

// Google Analytics
export const GA_TRACKING_ID = import.meta.env.VITE_GA_TRACKING_ID || 'G-B1MLPB5SJB';

// WhatsApp Contact - Updated for new branding
export const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || '918800996151';

// Sharda University Direct Apply Link
export const SHARDA_APPLY_URL = 'https://bit.ly/4pZTRTs';

// Site URL
export const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://www.nextgenlearning.dev';

// WhatsApp URL helper
export const getWhatsAppUrl = (number = WHATSAPP_NUMBER) => `https://wa.me/${number}`;

// Formatted WhatsApp number for display
export const WHATSAPP_DISPLAY = `+${WHATSAPP_NUMBER}`;

// University-specific apply URLs
export const UNIVERSITY_APPLY_URLS = {
  'sharda': SHARDA_APPLY_URL,
  'sharda-university': SHARDA_APPLY_URL
};
