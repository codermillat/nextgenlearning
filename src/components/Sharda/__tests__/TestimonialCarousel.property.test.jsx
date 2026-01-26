/**
 * Property-based tests for TestimonialCarousel component
 * Feature: sharda-university-content-enhancement
 * 
 * Tests Properties 35-40 for testimonial display
 * 
 * Validates: Requirements 9.2, 9.3, 9.4, 9.5, 9.6, 9.7
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, cleanup } from '@testing-library/react';
import fc from 'fast-check';
import TestimonialCarousel from '../TestimonialCarousel.jsx';

describe('TestimonialCarousel - Property-Based Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  // Helper function to wrap property tests with proper cleanup
  const withCleanup = (testFn) => {
    return (...args) => {
      try {
        return testFn(...args);
      } finally {
        cleanup();
      }
    };
  };

  // Arbitraries for generating test data
  const testimonialArbitrary = fc.record({
    id: fc.uuid(),
    studentName: fc.string({ minLength: 3, maxLength: 50 }).filter(s => s.trim().length > 0),
    country: fc.constantFrom('Bangladesh', 'India', 'Nepal', 'Sri Lanka', 'Afghanistan', 'Bhutan'),
    program: fc.constantFrom(
      'B.Tech Computer Science',
      'B.Tech AI/ML',
      'MBA',
      'B.Com',
      'B.Sc Physics',
      'M.Tech',
      'BBA'
    ),
    graduationYear: fc.integer({ min: 2015, max: 2025 }),
    currentPosition: fc.string({ minLength: 5, maxLength: 100 }).filter(s => s.trim().length > 0),
    testimonialText: fc.string({ minLength: 20, maxLength: 500 }).filter(s => s.trim().length > 0),
    achievement: fc.string({ minLength: 5, maxLength: 200 }).filter(s => s.trim().length > 0),
    photo: fc.option(fc.webUrl(), { nil: undefined }),
    videoUrl: fc.option(
      fc.constantFrom(
        'https://www.youtube.com/embed/test123',
        'https://www.youtube.com/embed/test456',
        'https://www.youtube.com/embed/test789'
      ),
      { nil: undefined }
    ),
  });

  /**
   * Property 35: Testimonial Field Completeness
   * Feature: sharda-university-content-enhancement, Property 35
   * 
   * For any testimonial displayed, it should include student name, program,
   * graduation year, and current position/achievement.
   * 
   * Validates: Requirements 9.2
   */
  it('Property 35: Testimonial Field Completeness', () => {
    fc.assert(
      fc.property(
        fc.array(testimonialArbitrary, { minLength: 1, maxLength: 10 }),
        withCleanup((testimonials) => {
          const { container } = render(
            <TestimonialCarousel testimonials={testimonials} />
          );

          // Get the currently displayed testimonial (first one by default)
          const currentTestimonial = testimonials[0];

          // Verify student name is displayed
          expect(container.textContent).toContain(currentTestimonial.studentName);

          // Verify program is displayed
          expect(container.textContent).toContain(currentTestimonial.program);

          // Verify graduation year is displayed
          expect(container.textContent).toContain(`Class of ${currentTestimonial.graduationYear}`);

          // Verify current position is displayed
          expect(container.textContent).toContain(currentTestimonial.currentPosition);

          // Verify all required fields are present in the DOM
          const section = container.querySelector('[data-section="testimonials"]');
          expect(section).toBeTruthy();
        })
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property 36: Testimonial Media Inclusion
   * Feature: sharda-university-content-enhancement, Property 36
   * 
   * For any testimonial with available photo or video, that media should be
   * included in the rendered testimonial.
   * 
   * Validates: Requirements 9.3
   */
  it('Property 36: Testimonial Media Inclusion', () => {
    fc.assert(
      fc.property(
        testimonialArbitrary,
        fc.boolean(),
        fc.boolean(),
        withCleanup((baseTestimonial, hasPhoto, hasVideo) => {
          // Create testimonial with or without media based on flags
          const testimonial = {
            ...baseTestimonial,
            photo: hasPhoto ? 'https://example.com/photo.jpg' : undefined,
            videoUrl: hasVideo && !hasPhoto ? 'https://www.youtube.com/embed/test123' : undefined,
          };

          const { container } = render(
            <TestimonialCarousel testimonials={[testimonial]} />
          );

          if (hasVideo && !hasPhoto) {
            // If video is available, verify iframe is rendered
            const iframe = container.querySelector('iframe');
            expect(iframe).toBeTruthy();
            expect(iframe.getAttribute('src')).toBe(testimonial.videoUrl);
            expect(iframe.getAttribute('title')).toContain(testimonial.studentName);
          } else if (hasPhoto) {
            // If photo is available, verify image is rendered
            const img = container.querySelector('img[alt*="student"]');
            expect(img).toBeTruthy();
            expect(img.getAttribute('src')).toBe(testimonial.photo);
            expect(img.getAttribute('alt')).toContain(testimonial.studentName);
            expect(img.getAttribute('alt')).toContain(testimonial.program);
          } else {
            // If no media, verify initials avatar is displayed
            const initialsElement = container.querySelector('.rounded-full');
            expect(initialsElement).toBeTruthy();
            expect(container.textContent).toContain(testimonial.studentName.charAt(0));
          }
        })
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property 37: Testimonial Organization
   * Feature: sharda-university-content-enhancement, Property 37
   * 
   * For any testimonial display, testimonials should be grouped or filterable
   * by program category.
   * 
   * Validates: Requirements 9.4
   */
  it('Property 37: Testimonial Organization', () => {
    fc.assert(
      fc.property(
        fc.array(testimonialArbitrary, { minLength: 3, maxLength: 10 }),
        withCleanup((testimonials) => {
          const { container } = render(
            <TestimonialCarousel testimonials={testimonials} />
          );

          // Verify program filter exists
          const programFilter = container.querySelector('#program-filter');
          expect(programFilter).toBeTruthy();
          expect(programFilter.getAttribute('aria-label')).toContain('Filter testimonials by program');

          // Verify all unique programs are available as filter options
          const uniquePrograms = [...new Set(testimonials.map(t => t.program))];
          const filterOptions = Array.from(programFilter.querySelectorAll('option'))
            .map(opt => opt.value)
            .filter(val => val !== ''); // Exclude "All Programs" option

          uniquePrograms.forEach(program => {
            expect(filterOptions).toContain(program);
          });

          // Verify country filter also exists for additional organization
          const countryFilter = container.querySelector('#country-filter');
          expect(countryFilter).toBeTruthy();
        })
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property 38: Bangladesh Testimonial Prioritization
   * Feature: sharda-university-content-enhancement, Property 38
   * 
   * For any testimonial list viewed by a Bangladeshi user, testimonials from
   * Bangladeshi students should appear before others.
   * 
   * Validates: Requirements 9.5
   */
  it('Property 38: Bangladesh Testimonial Prioritization', () => {
    fc.assert(
      fc.property(
        fc.array(testimonialArbitrary, { minLength: 5, maxLength: 15 }),
        withCleanup((testimonials) => {
          // Ensure we have at least one Bangladeshi and one non-Bangladeshi testimonial
          const hasBangladeshi = testimonials.some(t => t.country === 'Bangladesh');
          const hasNonBangladeshi = testimonials.some(t => t.country !== 'Bangladesh');
          
          fc.pre(hasBangladeshi && hasNonBangladeshi);

          const { container } = render(
            <TestimonialCarousel
              testimonials={testimonials}
              userCountry="Bangladesh"
            />
          );

          // Get the first displayed testimonial
          const section = container.querySelector('[data-section="testimonials"]');
          expect(section).toBeTruthy();

          // The first testimonial should be from Bangladesh
          const firstTestimonialCountry = container.querySelector('[role="img"][aria-label*="From"]');
          expect(firstTestimonialCountry).toBeTruthy();
          
          // Check that the displayed testimonial is from Bangladesh
          const displayedCountry = firstTestimonialCountry.parentElement.textContent;
          expect(displayedCountry).toContain('Bangladesh');
        })
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property 39: Testimonial Achievement Inclusion
   * Feature: sharda-university-content-enhancement, Property 39
   * 
   * For any testimonial, the content should include specific achievement
   * information (placement, higher studies, or entrepreneurship).
   * 
   * Validates: Requirements 9.6
   */
  it('Property 39: Testimonial Achievement Inclusion', () => {
    fc.assert(
      fc.property(
        fc.array(testimonialArbitrary, { minLength: 1, maxLength: 10 }),
        withCleanup((testimonials) => {
          const { container } = render(
            <TestimonialCarousel testimonials={testimonials} />
          );

          // Get the currently displayed testimonial (first one by default)
          const currentTestimonial = testimonials[0];

          // Verify achievement is displayed
          expect(container.textContent).toContain(currentTestimonial.achievement);

          // Verify achievement section exists with proper styling
          const achievementSection = container.querySelector('.bg-yellow-50');
          if (currentTestimonial.achievement) {
            expect(achievementSection).toBeTruthy();
            expect(achievementSection.textContent).toContain('Achievement');
            expect(achievementSection.textContent).toContain(currentTestimonial.achievement);
          }
        })
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property 40: Video Testimonial Optimization
   * Feature: sharda-university-content-enhancement, Property 40
   * 
   * For any video testimonial, the video element should use lazy loading or
   * similar optimization attributes.
   * 
   * Validates: Requirements 9.7
   */
  it('Property 40: Video Testimonial Optimization', () => {
    fc.assert(
      fc.property(
        testimonialArbitrary,
        withCleanup((baseTestimonial) => {
          // Create testimonial with video
          const testimonial = {
            ...baseTestimonial,
            videoUrl: 'https://www.youtube.com/embed/test123',
            photo: undefined, // Ensure video takes precedence
          };

          const { container } = render(
            <TestimonialCarousel testimonials={[testimonial]} />
          );

          // Verify iframe exists
          const iframe = container.querySelector('iframe');
          expect(iframe).toBeTruthy();

          // Verify lazy loading attribute is present
          expect(iframe.getAttribute('loading')).toBe('lazy');

          // Verify proper video attributes for optimization
          expect(iframe.getAttribute('src')).toBe(testimonial.videoUrl);
          expect(iframe.getAttribute('title')).toContain(testimonial.studentName);

          // Verify iframe has proper allow attributes for security and performance
          const allowAttr = iframe.getAttribute('allow');
          expect(allowAttr).toBeTruthy();
          expect(allowAttr).toContain('autoplay');
          expect(allowAttr).toContain('encrypted-media');
        })
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Additional Property: Testimonial Filter Consistency
   * 
   * For any testimonial list with filters applied, only testimonials matching
   * ALL filter criteria should be displayed.
   */
  it('should display only testimonials matching all filter criteria', () => {
    fc.assert(
      fc.property(
        fc.array(testimonialArbitrary, { minLength: 5, maxLength: 15 }),
        fc.constantFrom('Bangladesh', 'India', 'Nepal'),
        withCleanup((testimonials, selectedCountry) => {
          // Ensure we have testimonials from the selected country
          const hasSelectedCountry = testimonials.some(t => t.country === selectedCountry);
          fc.pre(hasSelectedCountry);

          const { container } = render(
            <TestimonialCarousel
              testimonials={testimonials}
              filterByCountry={selectedCountry}
            />
          );

          // Verify the displayed testimonial is from the selected country
          const countryElement = container.querySelector('[role="img"][aria-label*="From"]');
          expect(countryElement).toBeTruthy();
          
          const displayedCountry = countryElement.parentElement.textContent;
          expect(displayedCountry).toContain(selectedCountry);

          // Verify the count reflects filtered testimonials
          const filteredCount = testimonials.filter(t => t.country === selectedCountry).length;
          expect(container.textContent).toContain(`of ${filteredCount} testimonial`);
        })
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Additional Property: Testimonial Navigation Consistency
   * 
   * For any testimonial carousel with multiple testimonials, navigation controls
   * should be present and functional.
   */
  it('should provide navigation controls for multiple testimonials', () => {
    fc.assert(
      fc.property(
        fc.array(testimonialArbitrary, { minLength: 2, maxLength: 10 }),
        withCleanup((testimonials) => {
          const { container } = render(
            <TestimonialCarousel testimonials={testimonials} />
          );

          // Verify navigation arrows exist
          const prevButton = container.querySelector('[aria-label="Previous testimonial"]');
          const nextButton = container.querySelector('[aria-label="Next testimonial"]');

          expect(prevButton).toBeTruthy();
          expect(nextButton).toBeTruthy();

          // Verify dot navigation exists
          const dots = container.querySelectorAll('[aria-label*="Go to testimonial"]');
          expect(dots.length).toBe(testimonials.length);

          // Verify first dot is marked as current
          expect(dots[0].getAttribute('aria-current')).toBe('true');

          // Verify testimonial count is displayed
          expect(container.textContent).toContain(`Showing 1 of ${testimonials.length}`);
        })
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Additional Property: Single Testimonial Display
   * 
   * For any testimonial carousel with only one testimonial, navigation controls
   * should not be displayed.
   */
  it('should not display navigation for single testimonial', () => {
    fc.assert(
      fc.property(
        testimonialArbitrary,
        withCleanup((testimonial) => {
          const { container } = render(
            <TestimonialCarousel testimonials={[testimonial]} />
          );

          // Verify navigation arrows do not exist
          const prevButton = container.querySelector('[aria-label="Previous testimonial"]');
          const nextButton = container.querySelector('[aria-label="Next testimonial"]');

          expect(prevButton).toBeFalsy();
          expect(nextButton).toBeFalsy();

          // Verify dot navigation does not exist
          const dots = container.querySelectorAll('[aria-label*="Go to testimonial"]');
          expect(dots.length).toBe(0);

          // Verify testimonial count shows 1 of 1
          expect(container.textContent).toContain('Showing 1 of 1');
        })
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Additional Property: Empty Testimonial Handling
   * 
   * For any testimonial carousel with no testimonials or filtered to zero results,
   * an appropriate empty state message should be displayed.
   */
  it('should display empty state when no testimonials match filters', () => {
    fc.assert(
      fc.property(
        fc.array(testimonialArbitrary, { minLength: 1, maxLength: 10 }),
        fc.constantFrom('USA', 'UK', 'Canada'), // Countries not in our test data
        withCleanup((testimonials, nonExistentCountry) => {
          // Ensure none of the testimonials are from the selected country
          const hasCountry = testimonials.some(t => t.country === nonExistentCountry);
          fc.pre(!hasCountry);

          const { container } = render(
            <TestimonialCarousel
              testimonials={testimonials}
              filterByCountry={nonExistentCountry}
            />
          );

          // Since the UI only shows countries that exist in the data,
          // we can't actually select a non-existent country through the UI.
          // This test verifies the component handles the edge case gracefully
          // when filterByCountry prop is set programmatically.
          
          // When filtering by a non-existent country, the component shows empty state
          // Verify the component renders without crashing
          expect(container).toBeTruthy();
          
          // Verify empty state message is shown
          expect(container.textContent).toContain('No testimonials available');
        })
      ),
      { numRuns: 50 }
    );
  });

  /**
   * Additional Property: Testimonial Accessibility
   * 
   * For any testimonial displayed, it should meet accessibility requirements
   * with proper ARIA labels and semantic HTML.
   */
  it('should meet accessibility requirements for testimonials', () => {
    fc.assert(
      fc.property(
        fc.array(testimonialArbitrary, { minLength: 1, maxLength: 5 }),
        withCleanup((testimonials) => {
          const { container } = render(
            <TestimonialCarousel testimonials={testimonials} />
          );

          // Verify section has proper ARIA labeling
          const section = container.querySelector('[data-section="testimonials"]');
          expect(section.getAttribute('aria-labelledby')).toBe('testimonials-heading');

          // Verify heading exists with correct id
          const heading = container.querySelector('#testimonials-heading');
          expect(heading).toBeTruthy();
          expect(heading.textContent).toContain('Student Success Stories');

          // Verify filter selects have proper labels
          const countryFilter = container.querySelector('#country-filter');
          const programFilter = container.querySelector('#program-filter');
          
          expect(countryFilter.getAttribute('aria-label')).toContain('Filter testimonials by country');
          expect(programFilter.getAttribute('aria-label')).toContain('Filter testimonials by program');

          // If multiple testimonials, verify navigation has proper ARIA labels
          if (testimonials.length > 1) {
            const prevButton = container.querySelector('[aria-label="Previous testimonial"]');
            const nextButton = container.querySelector('[aria-label="Next testimonial"]');
            
            expect(prevButton).toBeTruthy();
            expect(nextButton).toBeTruthy();
          }
        })
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Additional Property: Testimonial Image Lazy Loading
   * 
   * For any testimonial with a photo, the image should use lazy loading attributes.
   */
  it('should apply lazy loading to testimonial images', () => {
    fc.assert(
      fc.property(
        testimonialArbitrary,
        withCleanup((baseTestimonial) => {
          // Create testimonial with photo
          const testimonial = {
            ...baseTestimonial,
            photo: 'https://example.com/photo.jpg',
            videoUrl: undefined,
          };

          const { container } = render(
            <TestimonialCarousel testimonials={[testimonial]} />
          );

          // Verify image exists
          const img = container.querySelector('img[alt*="student"]');
          expect(img).toBeTruthy();

          // Verify lazy loading attribute
          expect(img.getAttribute('loading')).toBe('lazy');

          // Verify proper alt text
          expect(img.getAttribute('alt')).toContain(testimonial.studentName);
          expect(img.getAttribute('alt')).toContain(testimonial.program);
        })
      ),
      { numRuns: 100 }
    );
  });
});
