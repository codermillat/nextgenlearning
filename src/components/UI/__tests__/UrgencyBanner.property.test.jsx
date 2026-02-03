import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import fc from 'fast-check';
import UrgencyBanner from '../UrgencyBanner';

// Feature: seo-overhaul, Property 10: Urgency Component CTA Presence
describe('Property 10: Urgency Component CTA Presence', () => {
  afterEach(() => {
    cleanup();
  });

  it('should include a CTA button with non-empty text and valid link for any rendered urgency banner', () => {
    fc.assert(
      fc.property(
        fc.record({
          deadline: fc.option(
            fc.date({ min: new Date(), max: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000) })
          ),
          seatsLeft: fc.option(fc.integer({ min: 0, max: 100 })),
          ctaText: fc.string({ minLength: 3, maxLength: 30 }).filter(s => s.trim().length > 0),
          ctaLink: fc.webUrl(),
          variant: fc.constantFrom('homepage', 'university', 'course'),
        }),
        (props) => {
          // Check if deadline is valid (not NaN)
          const hasValidDeadline = props.deadline && !isNaN(new Date(props.deadline).getTime());
          const hasValidSeats = props.seatsLeft !== null && props.seatsLeft !== undefined;
          
          // Only test when component should render (has valid deadline or seatsLeft)
          if (!hasValidDeadline && !hasValidSeats) {
            return true; // Skip this case as component returns null
          }

          const { unmount } = render(<UrgencyBanner {...props} />);
          
          try {
            // Component should render
            const banner = screen.queryByTestId('urgency-banner');
            expect(banner).not.toBeNull();
            
            // CTA button should be present
            const ctaButton = screen.getByTestId('urgency-cta');
            expect(ctaButton).toBeTruthy();
            
            // CTA should have non-empty text
            expect(ctaButton.textContent).toBe(props.ctaText);
            expect(ctaButton.textContent.length).toBeGreaterThan(0);
            
            // CTA should have a valid link
            expect(ctaButton.getAttribute('href')).toBe(props.ctaLink);
            expect(ctaButton.getAttribute('href')).toBeTruthy();
            expect(ctaButton.getAttribute('href').length).toBeGreaterThan(0);
            
            // CTA should be an anchor element
            expect(ctaButton.tagName).toBe('A');
          } finally {
            unmount();
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should always render CTA when deadline is provided', () => {
    fc.assert(
      fc.property(
        fc.record({
          deadline: fc.date({ min: new Date(), max: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000) }),
          ctaText: fc.string({ minLength: 3, maxLength: 30 }).filter(s => s.trim().length > 0),
          ctaLink: fc.webUrl(),
          variant: fc.constantFrom('homepage', 'university', 'course'),
        }),
        (props) => {
          // Skip if deadline is invalid (NaN)
          if (isNaN(new Date(props.deadline).getTime())) {
            return true;
          }
          
          const { unmount } = render(<UrgencyBanner {...props} />);
          
          try {
            // CTA button should always be present when deadline is provided
            const ctaButton = screen.getByTestId('urgency-cta');
            expect(ctaButton).toBeTruthy();
            expect(ctaButton.textContent).toBe(props.ctaText);
            expect(ctaButton.getAttribute('href')).toBe(props.ctaLink);
          } finally {
            unmount();
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should always render CTA when seatsLeft is provided', () => {
    fc.assert(
      fc.property(
        fc.record({
          seatsLeft: fc.integer({ min: 0, max: 100 }),
          ctaText: fc.string({ minLength: 3, maxLength: 30 }).filter(s => s.trim().length > 0),
          ctaLink: fc.webUrl(),
          variant: fc.constantFrom('homepage', 'university', 'course'),
        }),
        (props) => {
          const { unmount } = render(<UrgencyBanner {...props} />);
          
          try {
            // CTA button should always be present when seatsLeft is provided
            const ctaButton = screen.getByTestId('urgency-cta');
            expect(ctaButton).toBeTruthy();
            expect(ctaButton.textContent).toBe(props.ctaText);
            expect(ctaButton.getAttribute('href')).toBe(props.ctaLink);
          } finally {
            unmount();
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should render CTA with appropriate urgency styling based on deadline and seats', () => {
    fc.assert(
      fc.property(
        fc.record({
          deadline: fc.option(
            fc.date({ min: new Date(), max: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) })
          ),
          seatsLeft: fc.option(fc.integer({ min: 0, max: 50 })),
          ctaText: fc.string({ minLength: 3, maxLength: 30 }).filter(s => s.trim().length > 0),
          ctaLink: fc.webUrl(),
          variant: fc.constantFrom('homepage', 'university', 'course'),
        }),
        (props) => {
          // Only test when component should render
          if (!props.deadline && (props.seatsLeft === null || props.seatsLeft === undefined)) {
            return true;
          }

          const { unmount } = render(<UrgencyBanner {...props} />);
          
          try {
            const ctaButton = screen.getByTestId('urgency-cta');
            
            // CTA should have styling classes
            const classes = ctaButton.className;
            expect(classes).toBeTruthy();
            expect(classes.length).toBeGreaterThan(0);
            
            // Should have one of the urgency level colors
            const hasUrgencyColor = 
              classes.includes('bg-red-600') || 
              classes.includes('bg-orange-600') || 
              classes.includes('bg-blue-600');
            expect(hasUrgencyColor).toBe(true);
          } finally {
            unmount();
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should not render when both deadline and seatsLeft are missing', () => {
    fc.assert(
      fc.property(
        fc.record({
          ctaText: fc.string({ minLength: 3, maxLength: 30 }),
          ctaLink: fc.webUrl(),
          variant: fc.constantFrom('homepage', 'university', 'course'),
        }),
        (props) => {
          const { container } = render(<UrgencyBanner {...props} />);
          
          // Component should not render when no urgency data
          const banner = screen.queryByTestId('urgency-banner');
          expect(banner).toBeNull();
          
          // Container should be empty
          expect(container.firstChild).toBeNull();
        }
      ),
      { numRuns: 100 }
    );
  });
});
