/**
 * UTM Generator Usage Examples
 * Feature: sharda-university-content-enhancement
 * 
 * This file demonstrates how to use the UTM generator utility
 * for tracking conversions across Sharda University content.
 */

import {
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
  generateUTMLink,
} from './utmGenerator';

// ============================================================================
// EXAMPLE 1: Landing Page CTA
// ============================================================================

// Bangladesh student visiting landing page
const bangladeshLandingCTA = generateLandingPageLink('Bangladesh');
console.log('Bangladesh Landing CTA:', bangladeshLandingCTA);
// Output: https://global.sharda.ac.in/bangladesh/?utm_source=studyatsharda_youtube&utm_medium=NextGenLearning&utm_campaign=SU_AdmissionsBD_2026&utm_content=landing_apply-now

// International student (Nepal) visiting landing page
const nepalLandingCTA = generateLandingPageLink('Nepal');
console.log('Nepal Landing CTA:', nepalLandingCTA);
// Output: https://global.sharda.ac.in/?utm_source=studyatsharda_youtube&utm_medium=NextGenLearning&utm_campaign=SU_AdmissionsIntl_2026&utm_content=landing_apply-now

// ============================================================================
// EXAMPLE 2: Program Page CTA
// ============================================================================

// Bangladesh student on B.Tech CSE program page
const btechCSEBangladesh = generateProgramPageLink('Bangladesh', 'btech-cse');
console.log('B.Tech CSE Bangladesh:', btechCSEBangladesh);
// Output: https://global.sharda.ac.in/bangladesh/?utm_source=studyatsharda_youtube&utm_medium=NextGenLearning&utm_campaign=SU_AdmissionsBD_2026&utm_content=program_btech-cse_apply-now

// Indian student on MBA program page
const mbaIndia = generateProgramPageLink('India', 'mba');
console.log('MBA India:', mbaIndia);
// Output: https://global.sharda.ac.in/?utm_source=studyatsharda_youtube&utm_medium=NextGenLearning&utm_campaign=SU_AdmissionsIntl_2026&utm_content=program_mba_apply-now

// ============================================================================
// EXAMPLE 3: Fee Calculator CTA
// ============================================================================

// Bangladesh student using fee calculator for B.Tech CSE
const feeCalculatorBD = generateFeeCalculatorLink('Bangladesh', 'btech-cse');
console.log('Fee Calculator Bangladesh:', feeCalculatorBD);
// Output: https://global.sharda.ac.in/bangladesh/?utm_source=studyatsharda_youtube&utm_medium=NextGenLearning&utm_campaign=SU_AdmissionsBD_2026&utm_content=calculator_btech-cse_apply-with-calculation

// ============================================================================
// EXAMPLE 4: Comparison Page CTA
// ============================================================================

// Bangladesh student on Sharda vs Amity comparison page
const comparisonBD = generateComparisonPageLink('Bangladesh', 'sharda-vs-amity');
console.log('Comparison Bangladesh:', comparisonBD);
// Output: https://global.sharda.ac.in/bangladesh/?utm_source=studyatsharda_youtube&utm_medium=NextGenLearning&utm_campaign=SU_AdmissionsBD_2026&utm_content=comparison_apply-now

// ============================================================================
// EXAMPLE 5: Ranking Page CTA
// ============================================================================

// Bangladesh student on NIRF ranking page
const rankingBD = generateRankingPageLink('Bangladesh');
console.log('Ranking Bangladesh:', rankingBD);
// Output: https://global.sharda.ac.in/bangladesh/?utm_source=studyatsharda_youtube&utm_medium=NextGenLearning&utm_campaign=SU_AdmissionsBD_2026&utm_content=rankings_apply-now

// ============================================================================
// EXAMPLE 6: Fee Page CTA
// ============================================================================

// Bangladesh student on B.Tech CSE fees page
const feePageBD = generateFeePageLink('Bangladesh', 'btech-cse');
console.log('Fee Page Bangladesh:', feePageBD);
// Output: https://global.sharda.ac.in/bangladesh/?utm_source=studyatsharda_youtube&utm_medium=NextGenLearning&utm_campaign=SU_AdmissionsBD_2026&utm_content=fees_btech-cse_apply-now

// ============================================================================
// EXAMPLE 7: Bangladesh-Specific Content CTA
// ============================================================================

// Bangladesh scholarship section
const scholarshipCTA = generateBangladeshContentLink('scholarship');
console.log('Scholarship CTA:', scholarshipCTA);
// Output: https://global.sharda.ac.in/bangladesh/?utm_source=studyatsharda_youtube&utm_medium=NextGenLearning&utm_campaign=SU_AdmissionsBD_2026&utm_content=bangladesh_scholarship

// Bangladesh admission process section
const admissionProcessCTA = generateBangladeshContentLink('admission-process');
console.log('Admission Process CTA:', admissionProcessCTA);
// Output: https://global.sharda.ac.in/bangladesh/?utm_source=studyatsharda_youtube&utm_medium=NextGenLearning&utm_campaign=SU_AdmissionsBD_2026&utm_content=bangladesh_admission-process

// Bangladesh testimonials section
const testimonialsCTA = generateBangladeshContentLink('testimonials');
console.log('Testimonials CTA:', testimonialsCTA);
// Output: https://global.sharda.ac.in/bangladesh/?utm_source=studyatsharda_youtube&utm_medium=NextGenLearning&utm_campaign=SU_AdmissionsBD_2026&utm_content=bangladesh_testimonials

// ============================================================================
// EXAMPLE 8: Blog/Article CTA
// ============================================================================

// Bangladesh student reading blog article
const blogCTA = generateBlogLink('Bangladesh', 'study-in-india-guide');
console.log('Blog CTA:', blogCTA);
// Output: https://global.sharda.ac.in/bangladesh/?utm_source=studyatsharda_youtube&utm_medium=NextGenLearning&utm_campaign=SU_AdmissionsBD_2026&utm_content=blog_apply-now

// ============================================================================
// EXAMPLE 9: FAQ Section CTA
// ============================================================================

// Bangladesh student on FAQ page - admission category
const faqAdmissionCTA = generateFAQLink('Bangladesh', 'admission');
console.log('FAQ Admission CTA:', faqAdmissionCTA);
// Output: https://global.sharda.ac.in/bangladesh/?utm_source=studyatsharda_youtube&utm_medium=NextGenLearning&utm_campaign=SU_AdmissionsBD_2026&utm_content=faq_admission

// FAQ page - fees category
const faqFeesCTA = generateFAQLink('Bangladesh', 'fees');
console.log('FAQ Fees CTA:', faqFeesCTA);
// Output: https://global.sharda.ac.in/bangladesh/?utm_source=studyatsharda_youtube&utm_medium=NextGenLearning&utm_campaign=SU_AdmissionsBD_2026&utm_content=faq_fees

// ============================================================================
// EXAMPLE 10: Floating CTA (Sticky Button)
// ============================================================================

// Floating CTA on program page
const floatingCTA = generateFloatingCTALink('Bangladesh', 'program-btech-cse');
console.log('Floating CTA:', floatingCTA);
// Output: https://global.sharda.ac.in/bangladesh/?utm_source=studyatsharda_youtube&utm_medium=NextGenLearning&utm_campaign=SU_AdmissionsBD_2026&utm_content=floating-cta_apply-now

// ============================================================================
// EXAMPLE 11: Header CTA
// ============================================================================

// Header "Apply Now" button
const headerCTA = generateHeaderCTALink('Bangladesh');
console.log('Header CTA:', headerCTA);
// Output: https://global.sharda.ac.in/bangladesh/?utm_source=studyatsharda_youtube&utm_medium=NextGenLearning&utm_campaign=SU_AdmissionsBD_2026&utm_content=header-cta_apply-now

// ============================================================================
// EXAMPLE 12: Footer CTA
// ============================================================================

// Footer "Apply Now" button
const footerCTA = generateFooterCTALink('Bangladesh');
console.log('Footer CTA:', footerCTA);
// Output: https://global.sharda.ac.in/bangladesh/?utm_source=studyatsharda_youtube&utm_medium=NextGenLearning&utm_campaign=SU_AdmissionsBD_2026&utm_content=footer-cta_apply-now

// ============================================================================
// EXAMPLE 13: Custom UTM Link with All Parameters
// ============================================================================

// Custom link with program and specific action
const customLink = generateUTMLink({
  country: 'Bangladesh',
  page: 'program-btech-ai',
  contentType: 'program',
  program: 'btech-ai',
  action: 'download-brochure'
});
console.log('Custom Link:', customLink);
// Output: https://global.sharda.ac.in/bangladesh/?utm_source=studyatsharda_youtube&utm_medium=NextGenLearning&utm_campaign=SU_AdmissionsBD_2026&utm_content=program_btech-ai_download-brochure

// ============================================================================
// EXAMPLE 14: React Component Usage
// ============================================================================

// Example: ApplicationCTA component
function ApplicationCTA({ country, program, page }) {
  const applicationLink = program
    ? generateProgramPageLink(country, program)
    : generateLandingPageLink(country);

  return (
    <a
      href={applicationLink}
      className="btn btn-primary"
      target="_blank"
      rel="noopener noreferrer"
    >
      Apply Now
    </a>
  );
}

// Example: FeeCalculator component
function FeeCalculatorCTA({ country, program }) {
  const calculatorLink = generateFeeCalculatorLink(country, program);

  return (
    <a
      href={calculatorLink}
      className="btn btn-secondary"
      target="_blank"
      rel="noopener noreferrer"
    >
      Apply with This Calculation
    </a>
  );
}

// Example: FloatingCTA component
function FloatingCTA({ country, currentPage }) {
  const floatingLink = generateFloatingCTALink(country, currentPage);

  return (
    <div className="fixed bottom-4 right-4">
      <a
        href={floatingLink}
        className="btn btn-primary btn-lg"
        target="_blank"
        rel="noopener noreferrer"
      >
        Apply Now
      </a>
    </div>
  );
}

// ============================================================================
// EXAMPLE 15: Dynamic Country Detection
// ============================================================================

// Detect user's country and generate appropriate link
function getApplicationLinkForUser(userCountry, programCode) {
  // Normalize country name
  const country = userCountry || 'International';
  
  if (programCode) {
    return generateProgramPageLink(country, programCode);
  }
  
  return generateLandingPageLink(country);
}

// Usage
const userCountry = 'Bangladesh'; // From IP detection or user selection
const programCode = 'btech-cse';
const applicationLink = getApplicationLinkForUser(userCountry, programCode);
console.log('Dynamic Link:', applicationLink);

// ============================================================================
// EXAMPLE 16: Multiple Countries
// ============================================================================

// Generate links for different countries
const countries = ['Bangladesh', 'Nepal', 'India', 'Sri Lanka', 'Bhutan'];
const programLinks = countries.map(country => ({
  country,
  link: generateProgramPageLink(country, 'btech-cse')
}));

console.log('Program Links by Country:', programLinks);
// Output:
// [
//   { country: 'Bangladesh', link: 'https://global.sharda.ac.in/bangladesh/?...' },
//   { country: 'Nepal', link: 'https://global.sharda.ac.in/?...' },
//   { country: 'India', link: 'https://global.sharda.ac.in/?...' },
//   { country: 'Sri Lanka', link: 'https://global.sharda.ac.in/?...' },
//   { country: 'Bhutan', link: 'https://global.sharda.ac.in/?...' }
// ]

// ============================================================================
// TRACKING BEST PRACTICES
// ============================================================================

/**
 * 1. Always use the appropriate generator function for the context
 * 2. Pass the user's country for proper URL routing
 * 3. Include program code when on program-specific pages
 * 4. Use descriptive actions for better tracking
 * 5. Test links before deployment
 * 6. Monitor UTM parameters in Google Analytics
 * 7. Keep utm_source consistent (studyatsharda_youtube)
 * 8. Use utm_campaign to differentiate Bangladesh vs International
 * 9. Use utm_content for precise page/action tracking
 * 10. Always open links in new tab with rel="noopener noreferrer"
 */

export {
  ApplicationCTA,
  FeeCalculatorCTA,
  FloatingCTA,
  getApplicationLinkForUser,
};
