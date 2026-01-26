import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import fc from 'fast-check';
import UrgencyBanner from '../UrgencyBanner';

/**
 * UrgencyBanner Component Property-Based Tests
 * Feature: sharda-university-content-enhancement
 * 
 * Tests universal properties that should hold across all valid inputs.
 */

describe('UrgencyBanner - Property-Based Tests', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  /**
   * Property 42: Urgency Messaging Timing
   * 
   * For any page viewed when current date is within 30 days of a scholarship deadline,
   * urgency messaging (countdown or deadline notice) should be displayed.
   * 
   * Validates: Requirement 11.1
   */
  it('Property 42: displays urgency messaging within 30 days of deadline', () => {
    fc.assert(
      fc.property(
        // Generate days until deadline between 1 and 30
        fc.integer({ min: 1, max: 30 }),
        (daysUntilDeadline) => {
          const deadline = new Date(Date.now() + daysUntilDeadline * 24 * 60 * 60 * 1000);
          
          const { container } = render(
            <UrgencyBanner
              type="deadline"
              deadline={deadline}
              showCountdown={true}
            />
          );
          
          // Banner should be displayed
          const banner = container.querySelector('[data-testid="urgency-banner"]');
          expect(banner).not.toBeNull();
          
          // Cleanup
          container.remove();
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property 42 (Inverse): No urgency messaging beyond 30 days
   * 
   * For any page viewed when current date is more than 30 days from deadline,
   * urgency messaging should NOT be displayed.
   * 
   * Validates: Requirement 11.1
   */
  it('Property 42 (Inverse): does not display urgency messaging beyond 30 days', () => {
    fc.assert(
      fc.property(
        // Generate days until deadline between 31 and 365
        fc.integer({ min: 31, max: 365 }),
        (daysUntilDeadline) => {
          const deadline = new Date(Date.now() + daysUntilDeadline * 24 * 60 * 60 * 1000);
          
          const { container } = render(
            <UrgencyBanner
              type="deadline"
              deadline={deadline}
              showCountdown={true}
            />
          );
          
          // Banner should NOT be displayed
          const banner = container.querySelector('[data-testid="urgency-banner"]');
          expect(banner).toBeNull();
          
          // Cleanup
          container.remove();
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property 43: Urgency Messaging Truthfulness
   * 
   * For any urgency message displayed, the message should only appear when
   * the stated condition (deadline, limited seats) is actually true.
   * 
   * Validates: Requirement 11.5
   */
  it('Property 43: urgency messaging only displays when condition is true', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: -10, max: 40 }), // Days from now (negative = past, positive = future)
        (daysFromNow) => {
          const deadline = new Date(Date.now() + daysFromNow * 24 * 60 * 60 * 1000);
          
          const { container } = render(
            <UrgencyBanner
              type="deadline"
              deadline={deadline}
              showCountdown={true}
            />
          );
          
          const banner = container.querySelector('[data-testid="urgency-banner"]');
          
          // Banner should only display if deadline is within 30 days and hasn't passed
          const shouldDisplay = daysFromNow > 0 && daysFromNow <= 30;
          
          if (shouldDisplay) {
            expect(banner).not.toBeNull();
          } else {
            expect(banner).toBeNull();
          }
          
          // Cleanup
          container.remove();
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property 44: Dynamic Urgency Updates
   * 
   * For any urgency message, the message content should change appropriately
   * based on the current date relative to admission cycle dates.
   * 
   * Validates: Requirement 11.6
   */
  it('Property 44: admission year updates based on current date', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 2024, max: 2030 }), // Test years
        (year) => {
          // Mock the current year
          const mockDate = new Date(year, 0, 1); // January 1st of the year
          vi.setSystemTime(mockDate);
          
          const { container } = render(
            <UrgencyBanner type="admission-open" />
          );
          
          const banner = container.querySelector('[data-testid="urgency-banner"]');
          expect(banner).not.toBeNull();
          
          // Check that the message contains the correct year range
          const nextYear = year + 1;
          const expectedYearRange = `${year}-${nextYear.toString().slice(-2)}`;
          expect(banner.textContent).toContain(expectedYearRange);
          
          // Cleanup
          container.remove();
          vi.useRealTimers();
          vi.useFakeTimers();
        }
      ),
      { numRuns: 10 } // Fewer runs since we're mocking system time
    );
  });

  /**
   * Property: Banner Type Consistency
   * 
   * For any banner type, the component should render with the correct data-type attribute.
   */
  it('Property: banner renders with correct type attribute', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('admission-open', 'deadline', 'scholarship-deadline', 'early-bird'),
        (bannerType) => {
          const deadline = bannerType.includes('deadline') 
            ? new Date(Date.now() + 10 * 24 * 60 * 60 * 1000) 
            : undefined;
          
          const { container } = render(
            <UrgencyBanner type={bannerType} deadline={deadline} />
          );
          
          const banner = container.querySelector('[data-testid="urgency-banner"]');
          
          if (banner) {
            expect(banner.getAttribute('data-type')).toBe(bannerType);
          }
          
          // Cleanup
          container.remove();
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property: Variant Consistency
   * 
   * For any variant, the component should render with the correct data-variant attribute.
   */
  it('Property: banner renders with correct variant attribute', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('info', 'warning', 'success', 'urgent'),
        (variant) => {
          const { container } = render(
            <UrgencyBanner variant={variant} />
          );
          
          const banner = container.querySelector('[data-testid="urgency-banner"]');
          expect(banner).not.toBeNull();
          expect(banner.getAttribute('data-variant')).toBe(variant);
          
          // Cleanup
          container.remove();
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property: Custom Message Display
   * 
   * For any custom message provided, the banner should display that exact message.
   */
  it('Property: displays custom message when provided', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 10, maxLength: 100 }),
        (customMessage) => {
          const { container } = render(
            <UrgencyBanner message={customMessage} />
          );
          
          const banner = container.querySelector('[data-testid="urgency-banner"]');
          expect(banner).not.toBeNull();
          expect(banner.textContent).toContain(customMessage);
          
          // Cleanup
          container.remove();
        }
      ),
      { numRuns: 50 }
    );
  });

  /**
   * Property: Countdown Display Logic
   * 
   * For any banner with showCountdown=true and a valid deadline,
   * countdown elements should be present.
   */
  it('Property: countdown displays when enabled with valid deadline', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 1, max: 30 }), // Days until deadline
        (daysUntilDeadline) => {
          const deadline = new Date(Date.now() + daysUntilDeadline * 24 * 60 * 60 * 1000);
          
          const { container } = render(
            <UrgencyBanner
              deadline={deadline}
              showCountdown={true}
            />
          );
          
          const banner = container.querySelector('[data-testid="urgency-banner"]');
          
          if (banner) {
            // Should contain countdown elements
            const hasCountdown = banner.textContent.includes('Hours') || 
                                banner.textContent.includes('Mins');
            expect(hasCountdown).toBe(true);
          }
          
          // Cleanup
          container.remove();
        }
      ),
      { numRuns: 50 }
    );
  });

  /**
   * Property: Countdown Hidden When Disabled
   * 
   * For any banner with showCountdown=false, countdown elements should not be present.
   */
  it('Property: countdown hidden when showCountdown is false', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 1, max: 30 }),
        (daysUntilDeadline) => {
          const deadline = new Date(Date.now() + daysUntilDeadline * 24 * 60 * 60 * 1000);
          
          const { container } = render(
            <UrgencyBanner
              deadline={deadline}
              showCountdown={false}
            />
          );
          
          const banner = container.querySelector('[data-testid="urgency-banner"]');
          
          if (banner) {
            // Should NOT contain countdown elements
            expect(banner.textContent).not.toContain('Days');
            expect(banner.textContent).not.toContain('Hours');
            expect(banner.textContent).not.toContain('Mins');
          }
          
          // Cleanup
          container.remove();
        }
      ),
      { numRuns: 50 }
    );
  });

  /**
   * Property: Accessibility Attributes
   * 
   * For any banner rendered, it should have proper accessibility attributes.
   */
  it('Property: banner has required accessibility attributes', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('admission-open', 'deadline', 'scholarship-deadline', 'early-bird'),
        fc.constantFrom('info', 'warning', 'success', 'urgent'),
        (bannerType, variant) => {
          const deadline = bannerType.includes('deadline')
            ? new Date(Date.now() + 10 * 24 * 60 * 60 * 1000)
            : undefined;
          
          const { container } = render(
            <UrgencyBanner type={bannerType} variant={variant} deadline={deadline} />
          );
          
          const banner = container.querySelector('[data-testid="urgency-banner"]');
          
          if (banner) {
            // Should have role="alert"
            expect(banner.getAttribute('role')).toBe('alert');
            
            // Should have aria-live
            expect(banner.getAttribute('aria-live')).toBe('polite');
          }
          
          // Cleanup
          container.remove();
        }
      ),
      { numRuns: 50 }
    );
  });

  /**
   * Property: Dismissible Button Presence
   * 
   * For any banner with dismissible=true, a dismiss button should be present.
   * For any banner with dismissible=false, no dismiss button should be present.
   */
  it('Property: dismiss button presence matches dismissible prop', () => {
    fc.assert(
      fc.property(
        fc.boolean(),
        (dismissible) => {
          const { container } = render(
            <UrgencyBanner dismissible={dismissible} />
          );
          
          const banner = container.querySelector('[data-testid="urgency-banner"]');
          
          if (banner) {
            const dismissButton = container.querySelector('[data-testid="dismiss-button"]');
            
            if (dismissible) {
              expect(dismissButton).not.toBeNull();
            } else {
              expect(dismissButton).toBeNull();
            }
          }
          
          // Cleanup
          container.remove();
        }
      ),
      { numRuns: 100 }
    );
  });
});
