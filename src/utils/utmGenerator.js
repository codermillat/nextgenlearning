/**
 * UTM Generator Utility for Sharda University
 * Feature: sharda-university-content-enhancement
 * 
 * Generates UTM-tracked links for conversion tracking.
 * Uses actual Sharda University URLs with precise tracking parameters.
 */

/**
 * Base URLs for different student segments
 */
const BASE_URLS = {
  bangladesh: 'https://global.sharda.ac.in/bangladesh/',
  international: 'https://global.sharda.ac.in/',
};

/**
 * UTM Source - consistent across all links
 */
const UTM_SOURCE = 'studyatsharda_youtube';

/**
 * UTM Medium - identifies the referring platform
 */
const UTM_MEDIUM = 'NextGenLearning';

/**
 * Generate UTM-tracked application link
 * 
 * @param {Object} params - UTM parameters
 * @param {string} params.country - User's country (e.g., 'Bangladesh', 'Nepal', 'International')
 * @param {string} params.page - Current page context (e.g., 'landing', 'program-btech-cse', 'fees')
 * @param {string} params.contentType - Type of content (e.g., 'landing', 'program', 'comparison', 'blog', 'calculator')
 * @param {string} [params.program] - Program name if applicable (e.g., 'btech-cse', 'mba')
 * @param {string} [params.action] - Specific action (e.g., 'apply-now', 'learn-more', 'calculate-fees')
 * @returns {string} - Full URL with UTM parameters
 * 
 * @example
 * // Bangladesh student on landing page
 * generateUTMLink({
 *   country: 'Bangladesh',
 *   page: 'landing',
 *   contentType: 'landing',
 *   action: 'apply-now'
 * })
 * // Returns: https://global.sharda.ac.in/bangladesh/?utm_source=studyatsharda_youtube&utm_medium=NextGenLearning&utm_campaign=SU_AdmissionsBD_2026&utm_content=landing_apply-now
 * 
 * @example
 * // International student on B.Tech CSE program page
 * generateUTMLink({
 *   country: 'Nepal',
 *   page: 'program-btech-cse',
 *   contentType: 'program',
 *   program: 'btech-cse',
 *   action: 'apply-now'
 * })
 * // Returns: https://global.sharda.ac.in/?utm_source=studyatsharda_youtube&utm_medium=NextGenLearning&utm_campaign=SU_AdmissionsIntl_2026&utm_content=program_btech-cse_apply-now
 */
export function generateUTMLink({ country, page, contentType, program, action = 'apply-now' }) {
  // Determine base URL based on country
  const isBangladesh = country?.toLowerCase() === 'bangladesh';
  const baseUrl = isBangladesh ? BASE_URLS.bangladesh : BASE_URLS.international;
  
  // Generate campaign name
  const campaignSuffix = isBangladesh ? 'BD' : 'Intl';
  const utmCampaign = `SU_Admissions${campaignSuffix}_2026`;
  
  // Generate content parameter for precise tracking
  const contentParts = [contentType];
  if (program) {
    contentParts.push(program);
  }
  if (action) {
    contentParts.push(action);
  }
  const utmContent = contentParts.join('_');
  
  // Build URL with UTM parameters
  const url = new URL(baseUrl);
  url.searchParams.set('utm_source', UTM_SOURCE);
  url.searchParams.set('utm_medium', UTM_MEDIUM);
  url.searchParams.set('utm_campaign', utmCampaign);
  url.searchParams.set('utm_content', utmContent);
  
  return url.toString();
}

/**
 * Generate UTM link for landing page CTA
 */
export function generateLandingPageLink(country) {
  return generateUTMLink({
    country,
    page: 'landing',
    contentType: 'landing',
    action: 'apply-now'
  });
}

/**
 * Generate UTM link for program page CTA
 */
export function generateProgramPageLink(country, programCode) {
  return generateUTMLink({
    country,
    page: `program-${programCode}`,
    contentType: 'program',
    program: programCode,
    action: 'apply-now'
  });
}

/**
 * Generate UTM link for fee calculator
 */
export function generateFeeCalculatorLink(country, programCode) {
  return generateUTMLink({
    country,
    page: 'fee-calculator',
    contentType: 'calculator',
    program: programCode,
    action: 'apply-with-calculation'
  });
}

/**
 * Generate UTM link for comparison page
 */
export function generateComparisonPageLink(country, comparisonType) {
  return generateUTMLink({
    country,
    page: `comparison-${comparisonType}`,
    contentType: 'comparison',
    action: 'apply-now'
  });
}

/**
 * Generate UTM link for ranking page
 */
export function generateRankingPageLink(country) {
  return generateUTMLink({
    country,
    page: 'rankings',
    contentType: 'rankings',
    action: 'apply-now'
  });
}

/**
 * Generate UTM link for fee page
 */
export function generateFeePageLink(country, programCode) {
  return generateUTMLink({
    country,
    page: `fees-${programCode}`,
    contentType: 'fees',
    program: programCode,
    action: 'apply-now'
  });
}

/**
 * Generate UTM link for Bangladesh-specific content
 */
export function generateBangladeshContentLink(contentSection) {
  return generateUTMLink({
    country: 'Bangladesh',
    page: 'bangladesh-section',
    contentType: 'bangladesh',
    action: contentSection // e.g., 'scholarship', 'admission-process', 'testimonials'
  });
}

/**
 * Generate UTM link for blog/article
 */
export function generateBlogLink(country, articleSlug) {
  return generateUTMLink({
    country,
    page: `blog-${articleSlug}`,
    contentType: 'blog',
    action: 'apply-now'
  });
}

/**
 * Generate UTM link for FAQ section
 */
export function generateFAQLink(country, faqCategory) {
  return generateUTMLink({
    country,
    page: 'faq',
    contentType: 'faq',
    action: faqCategory // e.g., 'admission', 'fees', 'scholarships'
  });
}

/**
 * Generate UTM link for floating CTA
 */
export function generateFloatingCTALink(country, currentPage) {
  return generateUTMLink({
    country,
    page: currentPage,
    contentType: 'floating-cta',
    action: 'apply-now'
  });
}

/**
 * Generate UTM link for header CTA
 */
export function generateHeaderCTALink(country) {
  return generateUTMLink({
    country,
    page: 'header',
    contentType: 'header-cta',
    action: 'apply-now'
  });
}

/**
 * Generate UTM link for footer CTA
 */
export function generateFooterCTALink(country) {
  return generateUTMLink({
    country,
    page: 'footer',
    contentType: 'footer-cta',
    action: 'apply-now'
  });
}

/**
 * Parse UTM parameters from a URL
 * Useful for analytics and tracking
 */
export function parseUTMParameters(url) {
  try {
    const urlObj = new URL(url);
    return {
      utm_source: urlObj.searchParams.get('utm_source'),
      utm_medium: urlObj.searchParams.get('utm_medium'),
      utm_campaign: urlObj.searchParams.get('utm_campaign'),
      utm_content: urlObj.searchParams.get('utm_content'),
      utm_term: urlObj.searchParams.get('utm_term'),
    };
  } catch (error) {
    console.error('Error parsing UTM parameters:', error);
    return null;
  }
}

/**
 * Get base URL for a country
 */
export function getBaseURL(country) {
  const isBangladesh = country?.toLowerCase() === 'bangladesh';
  return isBangladesh ? BASE_URLS.bangladesh : BASE_URLS.international;
}

/**
 * Validate UTM link format
 */
export function isValidUTMLink(url) {
  try {
    const urlObj = new URL(url);
    
    // Check if it's a Sharda URL
    if (!urlObj.hostname.includes('sharda.ac.in')) {
      return false;
    }
    
    // Check if all required UTM parameters are present
    const hasSource = urlObj.searchParams.has('utm_source');
    const hasMedium = urlObj.searchParams.has('utm_medium');
    const hasCampaign = urlObj.searchParams.has('utm_campaign');
    const hasContent = urlObj.searchParams.has('utm_content');
    
    return hasSource && hasMedium && hasCampaign && hasContent;
  } catch (error) {
    return false;
  }
}

export default {
  generateUTMLink,
  generateLandingPageLink,
  generateProgramPageLink,
  generateFeeCalculatorLink,
  generateComparisonPageLink,
  generateRankingPageLink,
  generateFeePageLink,
  generateBangladeshContentLink,
  generateBlogLink,
  generateFAQLink,
  generateFloatingCTALink,
  generateHeaderCTALink,
  generateFooterCTALink,
  parseUTMParameters,
  getBaseURL,
  isValidUTMLink,
};
