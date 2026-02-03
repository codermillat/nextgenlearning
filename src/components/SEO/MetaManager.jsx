import { useEffect } from 'react';

/**
 * MetaManager component for optimized meta descriptions and title tags
 * Implements the formula: [EMOJI] + [BENEFIT] + [SOCIAL PROOF] + [PRICE] + [URGENCY] + [CTA]
 * 
 * @component
 * @param {Object} props - Component props
 * @param {string} [props.emoji] - Emoji relevant to content (1-2 chars)
 * @param {string} props.benefit - Clear benefit statement (20-30 chars)
 * @param {string} [props.socialProof] - Student numbers, ratings (15-25 chars)
 * @param {string} [props.price] - Pricing information (10-15 chars)
 * @param {string} [props.urgency] - Deadline or scarcity (15-20 chars)
 * @param {string} props.cta - Call to action (10-15 chars)
 * @param {string} [props.baseTitle] - Base title without year/urgency
 * @param {string} [props.brandName='NextGen Learning'] - Brand name for title
 * @param {string} [props.url] - Canonical URL
 * @param {string} [props.image] - OG image URL
 * @param {string} [props.type='website'] - OG type
 * 
 * @example
 * <MetaManager
 *   emoji="🎓"
 *   benefit="Study in India's Top Universities"
 *   socialProof="10,000+ students enrolled"
 *   price="From ₹1.2L/year"
 *   urgency="Apply by March 2026"
 *   cta="Apply Now"
 *   baseTitle="Sharda University Admissions"
 * />
 */
export default function MetaManager({
  emoji,
  benefit,
  socialProof,
  price,
  urgency,
  cta,
  baseTitle,
  brandName = 'NextGen Learning',
  url,
  image,
  type = 'website',
}) {
  const siteUrl = 'https://www.nextgenlearning.dev';
  
  // Generate optimized meta description
  const description = generateDescription({
    emoji,
    benefit,
    socialProof,
    price,
    urgency,
    cta,
  });
  
  // Generate optimized title
  const title = generateTitle({
    baseTitle,
    urgency,
    brandName,
  });
  
  // Build full URLs
  const fullUrl = url ? `${siteUrl}${url}` : siteUrl;
  const fullImage = image
    ? (image.startsWith('http') ? image : `${siteUrl}${image}`)
    : `${siteUrl}/og-image.svg`;

  useEffect(() => {
    // Update document title
    if (title) {
      document.title = title;
    }

    // Helper function to update or create meta tags
    const updateMetaTag = (name, content, isProperty = false) => {
      if (!content) return;
      
      const selector = isProperty ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let meta = document.querySelector(selector);
      
      if (!meta) {
        meta = document.createElement('meta');
        if (isProperty) {
          meta.setAttribute('property', name);
        } else {
          meta.setAttribute('name', name);
        }
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    // Primary Meta Tags
    updateMetaTag('title', title);
    updateMetaTag('description', description);
    
    // Open Graph Tags
    updateMetaTag('og:type', type, true);
    updateMetaTag('og:url', fullUrl, true);
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:image', fullImage, true);
    updateMetaTag('og:site_name', brandName, true);
    
    // Twitter Card Tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:url', fullUrl);
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', fullImage);
  }, [title, description, fullUrl, fullImage, type, brandName]);

  // This component doesn't render anything visible
  return null;
}

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
