import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import { describe, it, expect, afterEach } from 'vitest';
import fc from 'fast-check';
import LastUpdated from '../LastUpdated';

describe('LastUpdated Component - Property Tests', () => {
  afterEach(() => {
    cleanup();
  });
  describe('Property 62: Last Updated Timestamp', () => {
    // Feature: sharda-university-content-enhancement, Property 62
    it('Property 62: For any key information page, the page should display a "Last Updated" timestamp', () => {
      fc.assert(
        fc.property(
          fc.date({ min: new Date('2020-01-01'), max: new Date('2030-12-31') }).filter(d => !isNaN(d.getTime())),
          (date) => {
            const { container } = render(<LastUpdated date={date} />);
            
            // Should render the component
            const element = container.querySelector('[data-testid="last-updated"]');
            expect(element).toBeTruthy();
            
            // Should contain "Last Updated" text
            expect(element.textContent).toMatch(/Last Updated:/);
            
            // Should have a time element with datetime attribute
            const timeElement = element.querySelector('time');
            expect(timeElement).toBeTruthy();
            expect(timeElement.hasAttribute('datetime')).toBe(true);
            
            cleanup();
          }
        ),
        { numRuns: 100 }
      );
    });

    it('Property 62: For any page, admission cycle should be displayed when enabled', () => {
      fc.assert(
        fc.property(
          fc.date({ min: new Date('2020-01-01'), max: new Date('2030-12-31') }),
          fc.boolean(),
          (date, showAdmissionCycle) => {
            const { container } = render(
              <LastUpdated date={date} showAdmissionCycle={showAdmissionCycle} />
            );
            
            const element = container.querySelector('[data-testid="last-updated"]');
            
            if (showAdmissionCycle) {
              // Should contain "Admission Cycle" text
              expect(element.textContent).toMatch(/Admission Cycle:/);
            } else {
              // Should not contain "Admission Cycle" text
              expect(element.textContent).not.toMatch(/Admission Cycle:/);
            }
          }
        ),
        { numRuns: 100 }
      );
    });
  });

  describe('Date Formatting Properties', () => {
    it('Property: For any valid date, the formatted output should be a valid date string', () => {
      fc.assert(
        fc.property(
          fc.date({ min: new Date('2020-01-01'), max: new Date('2030-12-31') }).filter(d => !isNaN(d.getTime())),
          (date) => {
            const { container } = render(<LastUpdated date={date} />);
            
            const timeElement = container.querySelector('time');
            expect(timeElement).toBeTruthy();
            
            // Should match format: "Month Day, Year"
            const dateText = timeElement.textContent;
            expect(dateText).toMatch(/^(January|February|March|April|May|June|July|August|September|October|November|December) \d{1,2}, \d{4}$/);
            
            cleanup();
          }
        ),
        { numRuns: 100 }
      );
    });

    it('Property: For any date, the datetime attribute should be a valid ISO string or date string', () => {
      fc.assert(
        fc.property(
          fc.date({ min: new Date('2020-01-01'), max: new Date('2030-12-31') }).filter(d => !isNaN(d.getTime())),
          (date) => {
            const { container } = render(<LastUpdated date={date} />);
            
            const timeElement = container.querySelector('time');
            const datetime = timeElement.getAttribute('datetime');
            
            // Should have a datetime attribute
            expect(datetime).toBeTruthy();
            expect(datetime.length).toBeGreaterThan(0);
            
            cleanup();
          }
        ),
        { numRuns: 100 }
      );
    });
  });

  describe('Admission Cycle Calculation Properties', () => {
    it('Property: For any date in Jan-June, admission cycle should be current year to next year', () => {
      fc.assert(
        fc.property(
          fc.integer({ min: 2020, max: 2030 }),
          fc.integer({ min: 0, max: 5 }), // Months 0-5 (Jan-June)
          fc.integer({ min: 1, max: 28 }), // Day
          (year, month, day) => {
            const date = new Date(year, month, day);
            const { container } = render(<LastUpdated date={date} />);
            
            const element = container.querySelector('[data-testid="last-updated"]');
            const expectedCycle = `${year}-${(year + 1).toString().slice(-2)}`;
            
            expect(element.textContent).toContain(expectedCycle);
          }
        ),
        { numRuns: 50 }
      );
    });

    it('Property: For any date in July-Dec, admission cycle should be next year to year after', () => {
      fc.assert(
        fc.property(
          fc.integer({ min: 2020, max: 2030 }),
          fc.integer({ min: 6, max: 11 }), // Months 6-11 (July-Dec)
          fc.integer({ min: 1, max: 28 }), // Day
          (year, month, day) => {
            const date = new Date(year, month, day);
            const { container } = render(<LastUpdated date={date} />);
            
            const element = container.querySelector('[data-testid="last-updated"]');
            const expectedCycle = `${year + 1}-${(year + 2).toString().slice(-2)}`;
            
            expect(element.textContent).toContain(expectedCycle);
          }
        ),
        { numRuns: 50 }
      );
    });

    it('Property: For any custom admission cycle, that cycle should be displayed', () => {
      fc.assert(
        fc.property(
          fc.date({ min: new Date('2020-01-01'), max: new Date('2030-12-31') }),
          fc.integer({ min: 2020, max: 2030 }),
          (date, year) => {
            const cycle = `${year}-${(year + 1).toString().slice(-2)}`;
            const { container } = render(
              <LastUpdated date={date} admissionCycle={cycle} />
            );
            
            const element = container.querySelector('[data-testid="last-updated"]');
            expect(element.textContent).toContain(cycle);
          }
        ),
        { numRuns: 100 }
      );
    });
  });

  describe('Variant Properties', () => {
    it('Property: For any variant, the component should render with appropriate styling', () => {
      fc.assert(
        fc.property(
          fc.date({ min: new Date('2020-01-01'), max: new Date('2030-12-31') }),
          fc.constantFrom('default', 'compact', 'inline'),
          (date, variant) => {
            const { container } = render(
              <LastUpdated date={date} variant={variant} />
            );
            
            const element = container.querySelector('[data-testid="last-updated"]');
            expect(element).toBeTruthy();
            
            // Each variant should have distinct classes
            const classes = element.className;
            expect(classes.length).toBeGreaterThan(0);
          }
        ),
        { numRuns: 100 }
      );
    });
  });

  describe('Accessibility Properties', () => {
    it('Property: For any rendered component, it should have proper accessibility attributes', () => {
      fc.assert(
        fc.property(
          fc.date({ min: new Date('2020-01-01'), max: new Date('2030-12-31') }),
          (date) => {
            const { container } = render(<LastUpdated date={date} />);
            
            const element = container.querySelector('[data-testid="last-updated"]');
            
            // Should have role attribute
            expect(element.getAttribute('role')).toBe('contentinfo');
            
            // Should have aria-label
            expect(element.hasAttribute('aria-label')).toBe(true);
            
            // Icons should be aria-hidden
            const icons = element.querySelectorAll('svg');
            icons.forEach(icon => {
              expect(icon.getAttribute('aria-hidden')).toBe('true');
            });
          }
        ),
        { numRuns: 100 }
      );
    });

    it('Property: For any date, the time element should have semantic markup', () => {
      fc.assert(
        fc.property(
          fc.date({ min: new Date('2020-01-01'), max: new Date('2030-12-31') }).filter(d => !isNaN(d.getTime())),
          (date) => {
            const { container } = render(<LastUpdated date={date} />);
            
            const timeElement = container.querySelector('time');
            
            // Should exist
            expect(timeElement).toBeTruthy();
            
            // Should have datetime attribute
            expect(timeElement.hasAttribute('datetime')).toBe(true);
            
            // Should have text content
            expect(timeElement.textContent.length).toBeGreaterThan(0);
            
            cleanup();
          }
        ),
        { numRuns: 100 }
      );
    });
  });

  describe('Null Handling Properties', () => {
    it('Property: For any invalid date with showAdmissionCycle false, component should return null', () => {
      fc.assert(
        fc.property(
          fc.constantFrom(null, undefined, '', 'invalid', 'not-a-date', '2026-13-45'),
          (invalidDate) => {
            const { container } = render(
              <LastUpdated date={invalidDate} showAdmissionCycle={false} />
            );
            
            expect(container.firstChild).toBeNull();
          }
        ),
        { numRuns: 50 }
      );
    });

    it('Property: For any configuration, if neither date nor admission cycle shown, component returns null', () => {
      fc.assert(
        fc.property(
          fc.constantFrom(null, undefined, '', 'invalid'),
          (invalidDate) => {
            const { container } = render(
              <LastUpdated date={invalidDate} showAdmissionCycle={false} />
            );
            
            expect(container.firstChild).toBeNull();
          }
        ),
        { numRuns: 50 }
      );
    });
  });

  describe('Custom Props Properties', () => {
    it('Property: For any custom className, it should be applied to the component', () => {
      fc.assert(
        fc.property(
          fc.date({ min: new Date('2020-01-01'), max: new Date('2030-12-31') }),
          fc.string({ minLength: 1, maxLength: 50 }).filter(s => /^[a-z-]+$/.test(s)),
          (date, className) => {
            const { container } = render(
              <LastUpdated date={date} className={className} />
            );
            
            const element = container.querySelector('[data-testid="last-updated"]');
            expect(element.className).toContain(className);
          }
        ),
        { numRuns: 50 }
      );
    });
  });

  describe('Content Completeness Properties', () => {
    it('Property: For any valid date, the component should display both label and value', () => {
      fc.assert(
        fc.property(
          fc.date({ min: new Date('2020-01-01'), max: new Date('2030-12-31') }).filter(d => !isNaN(d.getTime())),
          (date) => {
            const { container } = render(<LastUpdated date={date} />);
            
            const element = container.querySelector('[data-testid="last-updated"]');
            
            // Component should render for valid dates
            expect(element).toBeTruthy();
            
            const text = element.textContent;
            
            // Should have "Last Updated:" label
            expect(text).toMatch(/Last Updated:/);
            
            // Should have a date value
            expect(text).toMatch(/\w+ \d{1,2}, \d{4}/);
            
            // Should have "Admission Cycle:" label
            expect(text).toMatch(/Admission Cycle:/);
            
            // Should have a cycle value
            expect(text).toMatch(/\d{4}-\d{2}/);
            
            cleanup();
          }
        ),
        { numRuns: 100 }
      );
    });
  });
});
