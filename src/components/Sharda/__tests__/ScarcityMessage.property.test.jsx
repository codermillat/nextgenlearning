import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import fc from 'fast-check';
import ScarcityMessage from '../ScarcityMessage';

/**
 * ScarcityMessage Component Property-Based Tests
 * Feature: sharda-university-content-enhancement
 * 
 * Tests universal properties that should hold across all valid inputs.
 */

describe('ScarcityMessage - Property-Based Tests', () => {
  /**
   * Property 43: Urgency Messaging Truthfulness
   * 
   * For any urgency message displayed, the message should only appear when
   * the stated condition (deadline, limited seats) is actually true.
   * 
   * Validates: Requirement 11.5
   */
  it('Property 43: limited-seats only displays with valid seatsRemaining', () => {
    fc.assert(
      fc.property(
        fc.oneof(
          fc.integer({ min: 1, max: 1000 }), // Valid positive numbers
          fc.constant(0), // Invalid: zero
          fc.integer({ min: -100, max: -1 }), // Invalid: negative
          fc.constant(null), // Invalid: null
          fc.constant(undefined), // Invalid: undefined
        ),
        (seatsRemaining) => {
          const { container } = render(
            <ScarcityMessage
              type="limited-seats"
              seatsRemaining={seatsRemaining}
            />
          );
          
          const message = container.querySelector('[data-testid="scarcity-message"]');
          
          // Should only render if seatsRemaining is a positive number
          const shouldRender = typeof seatsRemaining === 'number' && seatsRemaining > 0;
          
          if (shouldRender) {
            expect(message).not.toBeNull();
          } else {
            expect(message).toBeNull();
          }
          
          // Cleanup
          container.remove();
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property: Message Type Consistency
   * 
   * For any message type, the component should render with the correct data-type attribute.
   */
  it('Property: message renders with correct type attribute', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('limited-seats', 'early-bird', 'scholarship-priority', 'hostel-priority'),
        (messageType) => {
          // For limited-seats, provide valid seatsRemaining
          const seatsRemaining = messageType === 'limited-seats' ? 10 : undefined;
          
          const { container } = render(
            <ScarcityMessage
              type={messageType}
              seatsRemaining={seatsRemaining}
            />
          );
          
          const message = container.querySelector('[data-testid="scarcity-message"]');
          
          if (message) {
            expect(message.getAttribute('data-type')).toBe(messageType);
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
  it('Property: message renders with correct variant attribute', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('info', 'warning', 'urgent'),
        (variant) => {
          const { container } = render(
            <ScarcityMessage
              type="early-bird"
              variant={variant}
            />
          );
          
          const message = container.querySelector('[data-testid="scarcity-message"]');
          expect(message).not.toBeNull();
          expect(message.getAttribute('data-variant')).toBe(variant);
          
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
   * For any custom message provided, the component should display that message.
   */
  it('Property: displays custom message when provided', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 10, maxLength: 100 }),
        (customMessage) => {
          const { container } = render(
            <ScarcityMessage
              type="early-bird"
              message={customMessage}
            />
          );
          
          const message = container.querySelector('[data-testid="scarcity-message"]');
          expect(message).not.toBeNull();
          expect(message.textContent).toContain(customMessage);
          
          // Cleanup
          container.remove();
        }
      ),
      { numRuns: 50 }
    );
  });

  /**
   * Property: Seats Remaining Display
   * 
   * For any valid positive number of seats, the message should display that number.
   */
  it('Property: displays correct seats remaining number', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 1, max: 500 }),
        (seatsRemaining) => {
          const { container } = render(
            <ScarcityMessage
              type="limited-seats"
              seatsRemaining={seatsRemaining}
            />
          );
          
          const message = container.querySelector('[data-testid="scarcity-message"]');
          expect(message).not.toBeNull();
          
          // Should display the number
          expect(message.textContent).toContain(seatsRemaining.toString());
          
          // Should have correct data attribute
          expect(message.getAttribute('data-seats-remaining')).toBe(seatsRemaining.toString());
          
          // Cleanup
          container.remove();
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property: Singular vs Plural Grammar
   * 
   * For 1 seat, use "seat" (singular). For any other number, use "seats" (plural).
   */
  it('Property: uses correct singular/plural grammar for seats', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 1, max: 100 }),
        (seatsRemaining) => {
          const { container } = render(
            <ScarcityMessage
              type="limited-seats"
              seatsRemaining={seatsRemaining}
            />
          );
          
          const message = container.querySelector('[data-testid="scarcity-message"]');
          expect(message).not.toBeNull();
          
          if (seatsRemaining === 1) {
            // Should use singular "seat"
            expect(message.textContent).toMatch(/1 seat/i);
            expect(message.textContent).not.toMatch(/1 seats/i);
          } else {
            // Should use plural "seats"
            expect(message.textContent).toMatch(new RegExp(`${seatsRemaining} seats`, 'i'));
          }
          
          // Cleanup
          container.remove();
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property: High Demand Message Threshold
   * 
   * For any seats remaining <= 10, show high demand message.
   * For any seats remaining > 10, don't show high demand message.
   */
  it('Property: high demand message appears only for 10 or fewer seats', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 1, max: 50 }),
        (seatsRemaining) => {
          const { container } = render(
            <ScarcityMessage
              type="limited-seats"
              seatsRemaining={seatsRemaining}
            />
          );
          
          const message = container.querySelector('[data-testid="scarcity-message"]');
          expect(message).not.toBeNull();
          
          const hasHighDemandMessage = message.textContent.toLowerCase().includes('high demand');
          
          if (seatsRemaining <= 10) {
            expect(hasHighDemandMessage).toBe(true);
          } else {
            expect(hasHighDemandMessage).toBe(false);
          }
          
          // Cleanup
          container.remove();
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property: Program Name Inclusion
   * 
   * For any program name provided, it should appear in the message.
   */
  it('Property: includes program name in message when provided', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 3, maxLength: 50 }),
        fc.integer({ min: 1, max: 100 }),
        (programName, seatsRemaining) => {
          const { container } = render(
            <ScarcityMessage
              type="limited-seats"
              seatsRemaining={seatsRemaining}
              program={programName}
            />
          );
          
          const message = container.querySelector('[data-testid="scarcity-message"]');
          expect(message).not.toBeNull();
          expect(message.textContent).toContain(programName);
          
          // Cleanup
          container.remove();
        }
      ),
      { numRuns: 50 }
    );
  });

  /**
   * Property: Icon Display Control
   * 
   * For any message with showIcon=true, icon should be present.
   * For any message with showIcon=false, icon should not be present.
   */
  it('Property: icon presence matches showIcon prop', () => {
    fc.assert(
      fc.property(
        fc.boolean(),
        (showIcon) => {
          const { container } = render(
            <ScarcityMessage
              type="early-bird"
              showIcon={showIcon}
            />
          );
          
          const message = container.querySelector('[data-testid="scarcity-message"]');
          expect(message).not.toBeNull();
          
          const icon = message.querySelector('[aria-hidden="true"]');
          
          if (showIcon) {
            expect(icon).not.toBeNull();
          } else {
            expect(icon).toBeNull();
          }
          
          // Cleanup
          container.remove();
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property: Non-Limited-Seats Types Always Render
   * 
   * For any non-limited-seats type, the message should always render
   * (no data validation required).
   */
  it('Property: non-limited-seats types always render', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('early-bird', 'scholarship-priority', 'hostel-priority'),
        (messageType) => {
          const { container } = render(
            <ScarcityMessage type={messageType} />
          );
          
          const message = container.querySelector('[data-testid="scarcity-message"]');
          expect(message).not.toBeNull();
          
          // Cleanup
          container.remove();
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property: Accessibility Attributes
   * 
   * For any message rendered, it should have proper accessibility attributes.
   */
  it('Property: message has required accessibility attributes', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('early-bird', 'scholarship-priority', 'hostel-priority'),
        fc.constantFrom('info', 'warning', 'urgent'),
        (messageType, variant) => {
          const { container } = render(
            <ScarcityMessage
              type={messageType}
              variant={variant}
            />
          );
          
          const message = container.querySelector('[data-testid="scarcity-message"]');
          expect(message).not.toBeNull();
          
          // Should have role="status"
          expect(message.getAttribute('role')).toBe('status');
          
          // Should have aria-live
          expect(message.getAttribute('aria-live')).toBe('polite');
          
          // Cleanup
          container.remove();
        }
      ),
      { numRuns: 50 }
    );
  });

  /**
   * Property: Early Bird Benefits List
   * 
   * For any early-bird message, it should include the benefits list.
   */
  it('Property: early-bird type includes benefits list', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('info', 'warning', 'urgent'),
        (variant) => {
          const { container } = render(
            <ScarcityMessage
              type="early-bird"
              variant={variant}
            />
          );
          
          const message = container.querySelector('[data-testid="scarcity-message"]');
          expect(message).not.toBeNull();
          
          // Should contain benefits
          const text = message.textContent.toLowerCase();
          expect(text).toContain('scholarship');
          expect(text).toContain('hostel');
          expect(text).toContain('registration');
          
          // Cleanup
          container.remove();
        }
      ),
      { numRuns: 50 }
    );
  });
});
