/**
 * WhatsApp redirect utility
 * WBE WhatsApp number: +8801611533385
 */

import { trackWhatsAppClick } from './analytics';

const WBE_WHATSAPP_NUMBER = '8801611533385';

/**
 * Generate WhatsApp URL with pre-filled message
 */
export function getWhatsAppUrl(message) {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${WBE_WHATSAPP_NUMBER}?text=${encodedMessage}`;
}

/**
 * Redirect to WhatsApp with message
 */
export function redirectToWhatsApp(message, source = 'unknown', programName = '', universityName = '') {
  // Track WhatsApp click as lead generation
  trackWhatsAppClick(source, programName, universityName);
  
  const url = getWhatsAppUrl(message);
  window.open(url, '_blank');
}

/**
 * Generate application message for WhatsApp
 */
export function generateApplicationMessage(formData) {
  const { name, phone, email, gpa, courseInterest, universityPreference, programDetails } = formData;
  
  let message = `Hello! I'm interested in studying in India.\n\n`;
  
  // Only include name if it's provided and not the default "Student"
  if (name && name !== 'Student' && name.trim() !== '') {
    message += `Name: ${name}\n`;
  }
  
  if (phone && phone !== 'undefined' && phone.trim() !== '') {
    message += `Phone: ${phone}\n`;
  }
  if (email && email.trim() !== '') {
    message += `Email: ${email}\n`;
  }
  if (gpa && gpa.trim() !== '') {
    message += `GPA: ${gpa}\n`;
  }
  
  // Add course/program information
  if (courseInterest || programDetails) {
    message += `\n*Course Interest:* ${courseInterest || programDetails || 'Not specified'}\n`;
  }
  if (programDetails && programDetails !== courseInterest) {
    message += `Program: ${programDetails}\n`;
  }
  if (universityPreference && universityPreference.trim() !== '') {
    message += `*Preferred University:* ${universityPreference}\n`;
  }
  message += `\nPlease help me with admission process and scholarship information.`;
  
  return message;
}

