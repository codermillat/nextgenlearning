/**
 * Application Constants
 * Centralized configuration using environment variables with fallbacks
 */

// Google Analytics
export const GA_TRACKING_ID = import.meta.env.VITE_GA_TRACKING_ID || 'G-B1MLPB5SJB';

// WhatsApp Contact
export const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || '8801611533385';

// Site URL
export const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://www.nextgenlearning.dev';

// WhatsApp URL helper
export const getWhatsAppUrl = (number = WHATSAPP_NUMBER) => `https://wa.me/${number}`;

// Formatted WhatsApp number for display
export const WHATSAPP_DISPLAY = `+${WHATSAPP_NUMBER}`;
