/**
 * Meta utilities for SEO optimization
 * These helper functions support the MetaManager component
 */

/**
 * Generate optimized meta description using the formula:
 * [EMOJI] + [BENEFIT] + [SOCIAL PROOF] + [PRICE] + [URGENCY] + [CTA]
 * 
 * @param {Object} params - Description parameters
 * @param {string} [params.emoji] - Emoji relevant to content
 * @param {string} params.benefit - Clear benefit statement
 * @param {string} [params.socialProof] - Student numbers, ratings
 * @param {string} [params.price] - Pricing information
 * @param {string} [params.urgency] - Deadline or scarcity
 * @param {string} params.cta - Call to action
 * @returns {string} Optimized meta description (155-160 chars)
 */
export function generateDescription({
  emoji,
  benefit,
  socialProof,
  price,
  urgency,
  cta,
}) {
  // Build description parts
  const parts = [];
  
  if (emoji) parts.push(emoji);
  if (benefit) parts.push(benefit);
  if (socialProof) parts.push(socialProof);
  if (price) parts.push(price);
  if (urgency) parts.push(urgency);
  if (cta) parts.push(cta);
  
  // Join with appropriate separators
  let description = parts.join(' • ');
  
  // Validate and truncate if needed
  return validateLength(description, 155, 160);
}

/**
 * Generate optimized title tag with year and urgency
 * 
 * @param {Object} params - Title parameters
 * @param {string} [params.baseTitle] - Base title without year/urgency
 * @param {string} [params.urgency] - Urgency element to include
 * @param {string} [params.brandName='NextGen Learning'] - Brand name
 * @returns {string} Optimized title (max 60 chars)
 */
export function generateTitle({
  baseTitle,
  urgency,
  brandName = 'NextGen Learning',
}) {
  if (!baseTitle) {
    return brandName;
  }
  
  const currentYear = new Date().getFullYear();
  const parts = [baseTitle];
  
  // Add year
  parts.push(currentYear.toString());
  
  // Try to add urgency if space permits
  let title = parts.join(' ');
  
  if (urgency && (title.length + urgency.length + 3) <= 60) {
    title = `${title} - ${urgency}`;
  }
  
  // Try to add brand name if space permits
  if ((title.length + brandName.length + 3) <= 60) {
    title = `${title} | ${brandName}`;
  }
  
  // Ensure title doesn't exceed 60 characters
  return validateLength(title, 0, 60);
}

/**
 * Validate and truncate text to fit within character limits
 * Truncates at word boundaries to maintain readability
 * 
 * @param {string} text - Text to validate
 * @param {number} minLength - Minimum length (0 for no minimum)
 * @param {number} maxLength - Maximum length
 * @returns {string} Validated text within length constraints
 */
export function validateLength(text, minLength, maxLength) {
  if (!text) return '';
  
  // If text is within bounds, return as-is
  if (text.length <= maxLength && text.length >= minLength) {
    return text;
  }
  
  // If text is too long, truncate at word boundary
  if (text.length > maxLength) {
    // Find last space before maxLength
    let truncated = text.substring(0, maxLength);
    const lastSpace = truncated.lastIndexOf(' ');
    
    // If we found a space and it's not too far back, truncate there
    if (lastSpace > maxLength * 0.8) {
      truncated = truncated.substring(0, lastSpace);
    }
    
    // Add ellipsis if we truncated
    if (truncated.length < text.length) {
      // Make sure ellipsis doesn't push us over the limit
      if (truncated.length + 3 <= maxLength) {
        truncated += '...';
      } else {
        // Remove characters to make room for ellipsis
        truncated = truncated.substring(0, maxLength - 3) + '...';
      }
    }
    
    return truncated;
  }
  
  // If text is too short but we have a minimum, return as-is
  // (we don't pad, just return what we have)
  return text;
}
