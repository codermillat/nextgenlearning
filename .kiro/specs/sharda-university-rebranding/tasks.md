# Implementation Plan: Sharda University Rebranding

## Overview

This implementation plan breaks down the rebranding effort into discrete, manageable tasks. The approach follows a systematic pattern: update configuration first, then components, then data files, then documentation. Each task builds on previous work to ensure consistency and minimize errors.

The implementation will be executed in phases:
1. **Configuration Updates**: Centralize new contact information
2. **Component Updates**: Update all React components to use new configuration
3. **Data Structure Cleanup**: Remove WBE-specific fields from university data
4. **Sharda Positioning**: Implement soft-sell comparison logic
5. **SEO and Documentation**: Update metadata and documentation files
6. **Testing and Validation**: Verify all changes are correct

## Tasks

- [x] 1. Update Configuration and Constants
  - Update `src/config/constants.js` with new WhatsApp number (918800996151)
  - Add `SHARDA_APPLY_URL` constant (https://bit.ly/4pZTRTs)
  - Add `UNIVERSITY_APPLY_URLS` mapping object
  - Update `.env` and `.env.example` files with new `VITE_WHATSAPP_NUMBER`
  - _Requirements: 1.1, 1.2, 3.3, 10.1, 10.3_

- [x] 1.1 Write property test for configuration constants
  - **Property 22: Environment Variable Correctness**
  - **Validates: Requirements 10.3**

- [x] 2. Update Footer Component
  - [x] 2.1 Update Footer to import contact constants from config
    - Remove hardcoded WhatsApp number
    - Import `WHATSAPP_NUMBER`, `WHATSAPP_DISPLAY`, `getWhatsAppUrl` from constants
    - Update WhatsApp link href to use `getWhatsAppUrl()`
    - Update displayed number to use `WHATSAPP_DISPLAY`
    - _Requirements: 1.1, 1.2, 1.5, 9.1, 10.2_

  - [x] 2.2 Write property test for Footer contact information
    - **Property 1: Contact Number Consistency**
    - **Validates: Requirements 1.1, 1.2, 9.1**

- [ ] 3. Update SEO Structured Data Component
  - [x] 3.1 Update structured data functions
    - Update `generateLocalBusinessSchema()` to use new contact number
    - Remove or rename `generateWBESchema()` function to `generateOrganizationSchema()`
    - Update all organization schemas to use new contact information
    - Remove WBE email references (westernbanglaedu@gmail.com)
    - _Requirements: 1.4, 2.1, 2.2, 2.3, 7.3_

  - [x] 3.2 Write property test for structured data contact information
    - **Property 3: Structured Data Contact Information**
    - **Validates: Requirements 1.4, 7.3**

  - [x] 3.3 Write property test for structured data schema validity
    - **Property 16: Structured Data Schema Validity**
    - **Validates: Requirements 7.3, 13.3**

- [ ] 4. Update Contact Page Component
  - [x] 4.1 Update Contact page with new contact information
    - Import contact constants from config
    - Update SEO description with new WhatsApp number
    - Update WhatsApp link href
    - Update displayed phone number
    - Remove any WBE references from content
    - _Requirements: 1.1, 1.2, 2.1, 2.2, 2.3, 9.2_

  - [x] 4.2 Write unit test for Contact page rendering
    - Test that new number is displayed
    - Test that old number is not present
    - Test that WhatsApp link is correct
    - _Requirements: 9.2_

- [ ] 5. Update Apply Page Component
  - [x] 5.1 Remove WBE references from Apply page
    - Update SEO title and description to remove "WBE" mentions
    - Remove WBE branding from page content
    - Update WhatsApp links to use config constants
    - Update any service descriptions to remove WBE references
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 9.5_

  - [x] 5.2 Write property test for WBE branding absence
    - **Property 4: WBE Branding Absence in Rendered Content**
    - **Validates: Requirements 2.1, 2.2, 2.3, 2.4, 9.3, 9.5**

- [ ] 6. Update University-Related Pages
  - [x] 6.1 Update Universities page
    - Remove WBE references from FAQ answers
    - Update contact information in content
    - Update SEO metadata
    - _Requirements: 2.1, 2.2, 2.3, 9.3_

  - [x] 6.2 Update UniversityDetail page
    - Remove WBE references
    - Add Sharda University apply button with direct link
    - Update contact information
    - _Requirements: 2.1, 2.2, 2.3, 3.1, 3.2, 9.3_

  - [x] 6.3 Update CourseDetail page
    - Remove WBE references from FAQ answers
    - Update WhatsApp contact information
    - Add Sharda apply link for Sharda courses
    - _Requirements: 2.1, 2.2, 2.3, 3.5_

  - [x] 6.4 Update CourseGroupCompare page
    - Remove WBE references
    - Update contact information
    - _Requirements: 2.1, 2.2, 2.3, 9.4_

- [ ] 7. Checkpoint - Verify Component Updates
  - Run all component tests
  - Manually verify pages render correctly
  - Check that no WBE branding appears
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 8. Update Guide Pages
  - [x] 8.1 Update Guides page
    - Remove WBE references from content
    - Update WhatsApp contact information
    - _Requirements: 2.1, 2.2, 2.3_

  - [x] 8.2 Update GuideDetail page
    - Remove WBE references from guide content
    - Update contact information in guides
    - Update any WBE-specific guidance
    - _Requirements: 2.1, 2.2, 2.3, 2.4_

- [ ] 9. Update Policy and Info Pages
  - [x] 9.1 Update PrivacyPolicy page
    - Update contact information
    - Remove WBE references
    - _Requirements: 1.1, 2.1, 2.2, 2.3_

  - [x] 9.2 Update TermsAndConditions page
    - Update contact information
    - Remove WBE references
    - _Requirements: 1.1, 2.1, 2.2, 2.3_

  - [x] 9.3 Update Home page
    - Update SEO metadata
    - Ensure Sharda University is prominently featured
    - Remove any WBE references
    - _Requirements: 2.1, 2.2, 2.3, 7.1, 7.5_

- [ ] 10. Clean Up University Data Files
  - [x] 10.1 Update Sharda University JSON file
    - Remove `wbeAdditionalFees` object
    - Remove `wbeRecurring` object
    - Remove `wbeEnhanced` from scholarship categories
    - Add `applyUrl` field with value "https://bit.ly/4pZTRTs"
    - Simplify fee structure to standard categories only
    - _Requirements: 2.6, 3.3, 8.3, 8.4_

  - [x] 10.2 Update other university JSON files
    - Remove any WBE-specific fields if present
    - Ensure consistent schema across all files
    - _Requirements: 8.3, 8.5_

  - [x] 10.3 Write property test for WBE data structure absence
    - **Property 6: WBE Data Structure Absence**
    - **Validates: Requirements 2.6, 8.3, 15.3**

  - [x] 10.4 Write property test for data schema consistency
    - **Property 20: University Data Schema Consistency**
    - **Validates: Requirements 8.5**

- [ ] 11. Create University Comparison Utility
  - [x] 11.1 Create universityComparison.js utility module
    - Implement `calculateComparisonScore()` function with Sharda favorability
    - Implement `sortUniversitiesForDisplay()` function
    - Implement `generateRecommendationText()` function
    - Apply 7% score boost for Sharda University
    - Ensure factual accuracy is maintained
    - _Requirements: 4.1, 4.2, 4.6, 5.1, 5.6_

  - [x] 11.2 Write property test for comparison score favorability
    - **Property 8: Comparison Score Favorability**
    - **Validates: Requirements 4.2, 4.6, 5.6**

  - [x] 11.3 Write property test for comparison criteria consistency
    - **Property 10: Comparison Criteria Consistency**
    - **Validates: Requirements 5.1**

  - [x] 11.4 Write unit tests for comparison functions
    - Test score calculation with various inputs
    - Test sorting behavior
    - Test recommendation text generation
    - _Requirements: 4.1, 4.2, 5.1_

- [ ] 12. Create ApplyButton Component
  - [x] 12.1 Create reusable ApplyButton component
    - Accept `universityId` prop
    - Use `UNIVERSITY_APPLY_URLS` mapping for URL
    - Include proper attributes (target="_blank", rel="noopener noreferrer")
    - Support variant and size props for styling
    - _Requirements: 3.1, 3.2, 3.3, 14.3_

  - [x] 12.2 Write property test for Sharda apply link
    - **Property 7: Sharda Apply Link Presence**
    - **Validates: Requirements 3.1, 3.2, 3.3, 3.4, 3.5, 14.3**

  - [x] 12.3 Write unit tests for ApplyButton component
    - Test with Sharda university ID
    - Test with other university IDs
    - Test fallback behavior
    - _Requirements: 3.1, 3.2, 3.3_

- [ ] 13. Integrate Comparison Logic into Pages
  - [x] 13.1 Update Compare page to use comparison utility
    - Import and use `sortUniversitiesForDisplay()`
    - Display recommendation badges for Sharda
    - Highlight Sharda advantages subtly
    - _Requirements: 4.1, 4.3, 4.4, 4.5_

  - [x] 13.2 Update Universities page to use comparison utility
    - Apply sorting with Sharda favorability
    - Display Sharda prominently in listings
    - _Requirements: 4.1, 4.3_

  - [x] 13.3 Update search functionality
    - Ensure Sharda appears in top 3 results when relevant
    - Apply comparison scoring to search results
    - _Requirements: 4.3, 4.4_

  - [x] 13.4 Write property test for search result positioning
    - **Property 9: Search Result Positioning**
    - **Validates: Requirements 4.3, 4.4**

- [x] 14. Checkpoint - Verify Sharda Positioning
  - Test comparison pages with multiple universities
  - Verify Sharda appears favorably but naturally
  - Check that positioning is subtle and credible
  - Ensure all tests pass, ask the user if questions arise.

- [x] 15. Update SEO Metadata
  - [x] 15.1 Update meta descriptions across pages
    - Include target keywords for Bangladeshi students
    - Mention Sharda University in high-value pages
    - Ensure descriptions are 150-160 characters
    - _Requirements: 7.1, 7.5_

  - [x] 15.2 Update page titles
    - Optimize titles for search visibility
    - Keep titles between 30-60 characters
    - Include relevant keywords
    - _Requirements: 7.2_

  - [x] 15.3 Write property test for SEO metadata
    - **Property 14: SEO Metadata Keyword Presence**
    - **Property 15: Page Title Length**
    - **Validates: Requirements 7.1, 7.2, 7.5**

- [ ] 16. Update Documentation Files
  - [x] 16.1 Update README.md
    - Replace old contact number with new number
    - Remove WBE references
    - Update project description if needed
    - _Requirements: 11.1, 11.3_

  - [x] 16.2 Update public/llms.txt
    - Update contact information
    - Remove WBE references
    - Update organization description
    - _Requirements: 11.2, 11.4_

  - [ ] 16.3 Update any other documentation
    - Check for API documentation
    - Update code comments if needed
    - _Requirements: 11.5_

  - [ ] 16.4 Write property test for documentation contact information
    - **Property 23: Documentation Contact Information**
    - **Validates: Requirements 11.1, 11.2, 11.3, 11.4, 11.5**

- [ ] 17. Update Sitemap
  - [ ] 17.1 Verify sitemap includes all Sharda pages
    - Check that all Sharda course pages are in sitemap
    - Verify Sharda university detail page is included
    - Regenerate sitemap if needed
    - _Requirements: 7.6_

  - [ ] 17.2 Write property test for sitemap completeness
    - **Property 17: Sitemap Completeness**
    - **Validates: Requirements 7.6**

- [ ] 18. Comprehensive Codebase Cleanup
  - [x] 18.1 Search and remove all WBE code references
    - Search for "wbe" (case-insensitive) in all source files
    - Remove or rename WBE-related variables and functions
    - Update any WBE-related comments
    - _Requirements: 2.7, 15.1_

  - [x] 18.2 Search and remove all old contact number references
    - Search for "8801611533385" in all files
    - Replace with config import or new number
    - Verify no hardcoded instances remain
    - _Requirements: 1.3, 10.5, 15.7_

  - [ ] 18.3 Write property test for code identifier cleanliness
    - **Property 5: WBE Code Identifier Absence**
    - **Validates: Requirements 2.7, 15.1**

  - [ ] 18.4 Write property test for codebase search cleanliness
    - **Property 27: Codebase Search Cleanliness**
    - **Validates: Requirements 15.6, 15.7**

- [ ] 19. Final Testing and Validation
  - [x] 19.1 Run all property-based tests
    - Execute all 27 property tests with 100 iterations each
    - Verify all properties pass
    - _Requirements: All_

  - [x] 19.2 Run all unit tests
    - Execute complete unit test suite
    - Verify code coverage meets 80% threshold
    - _Requirements: All_

  - [ ] 19.3 Write property tests for remaining properties
    - **Property 2: WhatsApp Link Correctness**
    - **Property 11: Scholarship Calculation Accuracy**
    - **Property 12: Fee Display Format**
    - **Property 13: Bangladesh Content Presence**
    - **Property 18: Data Loading Correctness**
    - **Property 19: Fee Structure Standardization**
    - **Property 21: Configuration Import Usage**
    - **Property 24: FAQ Structure Validity**
    - **Property 25: University Metadata Completeness**
    - **Property 26: CTA Link Functionality**
    - **Validates: Various requirements**

- [ ] 20. Manual Testing and QA
  - [ ] 20.1 Visual inspection of all pages
    - Check that no WBE branding appears
    - Verify new contact number is displayed correctly
    - Ensure Sharda positioning looks natural
    - Test on desktop and mobile viewports
    - _Requirements: All_

  - [ ] 20.2 Functional testing
    - Click all WhatsApp links to verify they work
    - Click Sharda apply buttons to verify redirect
    - Test search functionality
    - Test comparison features
    - _Requirements: 1.2, 3.2, 4.3, 14.1, 14.2, 14.3_

  - [ ] 20.3 SEO validation
    - Use Google Rich Results Test for structured data
    - Verify meta descriptions and titles
    - Check sitemap validity
    - _Requirements: 7.1, 7.2, 7.3, 7.6_

  - [ ] 20.4 Cross-browser testing
    - Test on Chrome, Firefox, Safari
    - Test on mobile browsers (iOS Safari, Chrome Mobile)
    - Verify WhatsApp links work on all platforms
    - _Requirements: 1.2, 3.2_

- [ ] 21. Final Checkpoint - Complete Verification
  - All property tests passing (100 iterations each)
  - All unit tests passing (80%+ coverage)
  - Manual testing complete
  - No WBE references found in codebase
  - No old contact number found in codebase
  - Sharda positioning verified as subtle and natural
  - SEO validation complete
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- All tasks are required for comprehensive rebranding coverage
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation at key milestones
- Property tests validate universal correctness across all inputs (100 iterations each)
- Unit tests validate specific examples and edge cases
- The implementation follows a logical order: config → components → data → positioning → SEO → testing
- Sharda positioning should be subtle and maintain credibility
- All changes must maintain factual accuracy of university data
- Test coverage goal: 80%+ for modified files
- All 27 correctness properties must pass before completion
