# Implementation Plan: CLS Fix

## Overview

This implementation plan breaks down the CLS fixes into discrete, incremental tasks. Each task builds on previous work and includes validation through tests. The plan follows a systematic approach: fix layout issues first, then animations, then add monitoring.

## Tasks

- [x] 1. Create skeleton loader component and CLS utilities
  - [x] 1.1 Create SkeletonLoader component with variants
    - Implement card, text, title, circle, and button variants
    - Add count prop for rendering multiple skeletons
    - Include aria-hidden for accessibility
    - _Requirements: 4.1, 4.2_
  
  - [x] 1.2 Create useFontLoading hook
    - Implement font loading detection using document.fonts API
    - Add 3-second timeout fallback
    - Handle browsers without Font Loading API
    - _Requirements: 3.1, 3.3_
  
  - [x] 1.3 Create CLS measurement utility
    - Implement PerformanceObserver for layout-shift entries
    - Filter out shifts with recent user input
    - Add error handling for unsupported browsers
    - _Requirements: 1.1, 1.3, 1.5_

- [-] 2. Fix hero section height stability
  - [x] 2.1 Update HeroSection component with fixed heights
    - Add min-h-[500px] sm:min-h-[600px] lg:min-h-[700px] classes
    - Add flex items-center for vertical centering
    - Ensure gradient overlays don't affect height
    - _Requirements: 6.1, 6.5_
  
  - [x] 2.2 Update Home page hero section
    - Apply same height fixes to inline hero in Home.jsx
    - Ensure consistent spacing with design tokens
    - _Requirements: 6.1, 6.5_
  
  - [ ] 2.3 Write property test for hero height stability
    - **Property 1: Hero Section Height Stability**
    - **Validates: Requirements 6.1, 6.5**
  
  - [ ] 2.4 Write unit tests for hero section
    - Test minimum height rendering
    - Test height consistency across viewport changes
    - _Requirements: 6.1, 6.5_

- [-] 3. Fix mobile menu layout shifts
  - [x] 3.1 Update Header component mobile menu positioning
    - Change mobile menu to use absolute positioning
    - Add top-full left-0 right-0 classes
    - Add z-40 for proper stacking
    - Remove animate-fade-in from mobile menu (causes shift)
    - _Requirements: 6.5_
  
  - [ ] 3.2 Write property test for mobile menu position independence
    - **Property 3: Mobile Menu Position Independence**
    - **Validates: Requirements 6.5**
  
  - [ ] 3.3 Write unit tests for mobile menu
    - Test absolute positioning
    - Test content below doesn't shift when menu opens
    - _Requirements: 6.5_

- [ ] 4. Checkpoint - Verify layout fixes
  - Ensure all tests pass, ask the user if questions arise.

- [-] 5. Fix animation-related layout shifts
  - [x] 5.1 Update animation keyframes with will-change hints
    - Add will-change: opacity to animate-fade-in
    - Add will-change: transform, opacity to animate-slide-up
    - Ensure animations only use transform and opacity
    - _Requirements: 6.2_
  
  - [x] 5.2 Fix card hover scale effects
    - Add transform-origin: center to scaled elements
    - Ensure parent cards have overflow handling
    - Add will-change: transform to hover elements
    - Update all instances in Home.jsx, Courses.jsx, Universities.jsx, ProgramCategories.jsx
    - _Requirements: 6.2_
  
  - [ ] 5.3 Write property test for animation transform isolation
    - **Property 2: Animation Transform Isolation**
    - **Validates: Requirements 6.2**
  
  - [ ] 5.4 Write property test for card hover transform containment
    - **Property 4: Card Hover Transform Containment**
    - **Validates: Requirements 6.2**
  
  - [ ] 5.5 Write unit tests for animations
    - Test reduced motion preferences respected
    - Test animations don't affect layout properties
    - _Requirements: 6.2_

- [-] 6. Implement font loading optimization
  - [x] 6.1 Update index.html with font preloading
    - Add preload link for Inter font
    - Add font-display: swap to font URL
    - _Requirements: 3.1, 3.3_
  
  - [x] 6.2 Create metric-matched fallback font
    - Add @font-face for Inter Fallback
    - Configure size-adjust, ascent-override, descent-override
    - Update body font-family stack
    - _Requirements: 3.2_
  
  - [x] 6.3 Add font loading detection to App component
    - Use useFontLoading hook
    - Add font-loaded class to body when ready
    - _Requirements: 3.1, 3.4_
  
  - [ ] 6.4 Write property test for font loading fallback consistency
    - **Property 5: Font Loading Fallback Consistency**
    - **Validates: Requirements 3.1, 3.2, 3.4**
  
  - [ ] 6.5 Write unit tests for font loading hook
    - Test successful font loading
    - Test timeout fallback
    - Test browsers without Font Loading API
    - _Requirements: 3.1, 3.3_

- [ ] 7. Add skeleton loaders to dynamic content
  - [ ] 7.1 Add skeleton loaders to course listings
    - Update Courses page with loading state
    - Show skeleton cards while data loads
    - _Requirements: 4.1, 4.2_
  
  - [ ] 7.2 Add skeleton loaders to university listings
    - Update Universities page with loading state
    - Show skeleton cards while data loads
    - _Requirements: 4.1, 4.2_
  
  - [ ] 7.3 Add skeleton loaders to comparison pages
    - Update Compare page with loading state
    - Show skeleton comparison tables while data loads
    - _Requirements: 4.1, 4.2_
  
  - [ ] 7.4 Write property test for skeleton loader dimension matching
    - **Property 6: Skeleton Loader Dimension Matching**
    - **Validates: Requirements 4.1, 4.2**
  
  - [ ] 7.5 Write unit tests for skeleton loaders
    - Test correct number of skeletons rendered
    - Test variant classes applied correctly
    - _Requirements: 4.1, 4.2_

- [ ] 8. Checkpoint - Verify all CLS fixes
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 9. Fix gradient background heights
  - [ ] 9.1 Add explicit heights to gradient sections
    - Update all sections with gradient backgrounds
    - Add min-height values to prevent shifts
    - Ensure gradient overlays are absolutely positioned
    - _Requirements: 6.1_
  
  - [ ] 9.2 Write property test for gradient container height specification
    - **Property 7: Gradient Container Height Specification**
    - **Validates: Requirements 6.1**

- [-] 10. Add CLS monitoring and measurement
  - [x] 10.1 Implement CLS measurement in production
    - Add PerformanceObserver to main.jsx
    - Report CLS scores to Google Analytics
    - Include page path in measurements
    - _Requirements: 1.1, 1.3, 1.5, 7.5_
  
  - [ ] 10.2 Create CLS testing script
    - Add Puppeteer-based CLS measurement
    - Test all critical pages (home, courses, universities, compare)
    - Test both desktop and mobile viewports
    - _Requirements: 8.1, 8.2, 8.3, 8.4_
  
  - [ ] 10.3 Write property test for CLS score threshold compliance
    - **Property 8: CLS Score Threshold Compliance**
    - **Validates: Requirements 7.1, 7.2, 7.3**
  
  - [ ] 10.4 Write integration tests for CLS measurements
    - Test CLS < 0.1 on home page (desktop)
    - Test CLS < 0.1 on home page (mobile)
    - Test CLS < 0.1 on courses page
    - Test CLS < 0.1 on universities page
    - _Requirements: 7.1, 7.2, 7.3, 8.1, 8.2, 8.3_

- [ ] 11. Handle images and media
  - [ ] 11.1 Audit all image elements for dimensions
    - Find all img tags without width/height
    - Find all background images without container heights
    - _Requirements: 2.1, 2.4, 2.5_
  
  - [ ] 11.2 Add explicit dimensions to images
    - Add width and height attributes to img tags
    - Add aspect-ratio CSS where needed
    - Add loading="lazy" for below-fold images
    - _Requirements: 2.1, 2.2, 2.3_
  
  - [ ] 11.3 Add fallback placeholders for failed images
    - Implement error handling for image loading
    - Maintain reserved space on error
    - _Requirements: 2.4_
  
  - [ ] 11.4 Write property test for image dimension preservation
    - **Property 9: Image Dimension Preservation**
    - **Validates: Requirements 2.1, 2.2, 2.3**
  
  - [ ] 11.5 Write unit tests for image handling
    - Test images have explicit dimensions
    - Test aspect-ratio preservation
    - Test fallback placeholder on error
    - _Requirements: 2.1, 2.2, 2.3, 2.4_

- [ ] 12. Add dynamic content space reservation
  - [ ] 12.1 Implement min-height for unknown content
    - Add min-height to containers with dynamic content
    - Use approximate heights based on typical content
    - _Requirements: 4.3_
  
  - [ ] 12.2 Add smooth transitions for content size changes
    - Implement CSS transitions for height changes
    - Ensure transitions don't cause jarring shifts
    - _Requirements: 4.4_
  
  - [ ] 12.3 Write property test for dynamic content space reservation
    - **Property 10: Dynamic Content Space Reservation**
    - **Validates: Requirements 4.1, 4.2, 4.3**
  
  - [ ] 12.4 Write unit tests for dynamic content
    - Test min-height reservation
    - Test smooth transitions
    - Test timeout handling
    - _Requirements: 4.1, 4.2, 4.3, 4.4_

- [ ] 13. Final checkpoint and validation
  - [ ] 13.1 Run full test suite
    - Execute all unit tests
    - Execute all property tests
    - Execute all integration tests
    - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5_
  
  - [ ] 13.2 Run Lighthouse audits
    - Test home page (desktop and mobile)
    - Test courses page (desktop and mobile)
    - Test universities page (desktop and mobile)
    - Verify CLS < 0.1 on all pages
    - _Requirements: 7.1, 7.2, 7.3_
  
  - [ ] 13.3 Verify CLS improvements in production
    - Deploy to staging environment
    - Measure CLS scores using real user monitoring
    - Verify 75th percentile CLS < 0.1
    - _Requirements: 7.1, 7.2, 7.4_

- [ ] 14. Documentation and cleanup
  - [ ] 14.1 Document CLS fixes in CHANGES.md
    - List all CLS issues fixed
    - Document before/after CLS scores
    - Include testing methodology
    - _Requirements: 7.5_
  
  - [ ] 14.2 Update performance documentation
    - Add CLS monitoring guide
    - Document best practices for maintaining CLS
    - Add troubleshooting guide
    - _Requirements: 7.5_

## Notes

- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties with minimum 100 iterations
- Unit tests validate specific examples and edge cases
- Integration tests use Puppeteer to measure actual CLS scores
- All CLS fixes must maintain accessibility and reduced motion support
- Target CLS score: < 0.1 on both desktop and mobile
