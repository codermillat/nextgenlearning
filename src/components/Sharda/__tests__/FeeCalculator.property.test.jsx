/**
 * Property-based tests for FeeCalculator component
 * Feature: sharda-university-content-enhancement
 * 
 * Tests Properties 25-31 for fee calculator functionality
 * 
 * Validates: Requirements 7.1, 7.2, 7.3, 7.4, 7.5, 7.6, 7.7
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, fireEvent, cleanup } from '@testing-library/react';
import fc from 'fast-check';
import FeeCalculator from '../FeeCalculator.jsx';

// Mock the conversion event logger
vi.mock('../../../utils/conversionEventLogger', () => ({
  logCalculatorUse: vi.fn(),
}));

// Mock ApplicationCTA component
vi.mock('../ApplicationCTA', () => ({
  default: ({ children, program, source, context, country }) => (
    <button
      data-testid="application-cta"
      data-program={program}
      data-source={source}
      data-context={context}
      data-country={country}
    >
      {children}
    </button>
  ),
}));

describe('FeeCalculator - Property-Based Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  // Arbitraries for generating test data
  const programArbitrary = fc.record({
    id: fc.string({ minLength: 5, maxLength: 20 }).map(s => s.toLowerCase().replace(/[^a-z]/g, '-')),
    name: fc.constantFrom(
      'B.Tech Computer Science',
      'B.Tech AI/ML',
      'MBA',
      'B.Com',
      'B.Sc Physics',
      'M.Tech',
      'BBA',
      'B.Tech Civil Engineering'
    ),
    duration: fc.constantFrom('2 years', '3 years', '4 years', '5 years'),
    level: fc.constantFrom('undergraduate', 'postgraduate', 'doctoral'),
    fees: fc.record({
      tuitionPerYear: fc.integer({ min: 100000, max: 500000 }),
      hostel: fc.integer({ min: 50000, max: 150000 }),
      mess: fc.integer({ min: 40000, max: 100000 }),
      registration: fc.integer({ min: 10000, max: 50000 }),
      other: fc.integer({ min: 5000, max: 30000 }),
    }),
  });

  const scholarshipRuleArbitrary = fc.record({
    country: fc.constantFrom('Bangladesh', 'India', 'International', 'Nepal', 'Sri Lanka'),
    gpaMin: fc.float({ min: Math.fround(0), max: Math.fround(4.5), noNaN: true }),
    gpaMax: fc.float({ min: Math.fround(0.1), max: Math.fround(5.0), noNaN: true }),
    percentage: fc.integer({ min: 0, max: 50 }),
  }).filter(rule => rule.gpaMin < rule.gpaMax);

  const bangladeshScholarshipRules = [
    { country: 'Bangladesh', gpaMin: 3.5, gpaMax: 5.0, percentage: 50 },
    { country: 'Bangladesh', gpaMin: 3.0, gpaMax: 3.5, percentage: 20 },
  ];

  /**
   * Property 25: Fee Calculator Program Display
   * Feature: sharda-university-content-enhancement, Property 25
   * 
   * For any program selected in the fee calculator, the calculator should
   * display that program's base tuition fee.
   * 
   * Validates: Requirements 7.1
   */
  it('Property 25: Fee Calculator Program Display', () => {
    fc.assert(
      fc.property(
        fc.array(programArbitrary, { minLength: 1, maxLength: 10 }),
        fc.array(scholarshipRuleArbitrary, { minLength: 1, maxLength: 5 }),
        fc.nat({ max: 9 }), // Index to select a program
        fc.float({ min: Math.fround(1), max: Math.fround(5), noNaN: true }),
        (programs, scholarshipRules, programIndex, gpa) => {
          // Select a program from the generated list
          const selectedProgram = programs[programIndex % programs.length];

          const { getByTestId, container } = render(
            <FeeCalculator
              programs={programs}
              scholarshipRules={scholarshipRules}
            />
          );

          // Select the program
          const programSelect = getByTestId('program-select');
          fireEvent.change(programSelect, { target: { value: selectedProgram.id } });

          // Enter GPA
          const gpaInput = getByTestId('gpa-input');
          fireEvent.change(gpaInput, { target: { value: gpa.toString() } });

          // Calculate
          const calculateButton = getByTestId('calculate-button');
          fireEvent.click(calculateButton);

          // Verify the base tuition fee is displayed
          const baseFeeFormatted = new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0,
          }).format(selectedProgram.fees.tuitionPerYear);

          expect(container.textContent).toContain(baseFeeFormatted);
          expect(container.textContent).toContain('Base Tuition Fee');

          cleanup();
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property 26: Fee Calculator Scholarship Calculation
   * Feature: sharda-university-content-enhancement, Property 26
   * 
   * For any GPA/percentage entered in the fee calculator, the calculator should
   * compute and display the correct scholarship percentage based on the rules.
   * 
   * Validates: Requirements 7.2
   */
  it('Property 26: Fee Calculator Scholarship Calculation', () => {
    fc.assert(
      fc.property(
        programArbitrary,
        fc.float({ min: Math.fround(0.1), max: Math.fround(5.0), noNaN: true }),
        fc.constantFrom('Bangladesh', 'India', 'International'),
        (program, gpa, country) => {
          // Create scholarship rules with clear ranges
          const scholarshipRules = [
            { country: 'Bangladesh', gpaMin: 3.5, gpaMax: 5.0, percentage: 50 },
            { country: 'Bangladesh', gpaMin: 3.0, gpaMax: 3.49, percentage: 20 },
            { country: 'India', gpaMin: 90, gpaMax: 100, percentage: 50 },
            { country: 'India', gpaMin: 80, gpaMax: 89, percentage: 25 },
            { country: 'International', gpaMin: 85, gpaMax: 100, percentage: 30 },
            { country: 'International', gpaMin: 75, gpaMax: 84, percentage: 15 },
          ];

          const { getByTestId, container } = render(
            <FeeCalculator
              programs={[program]}
              scholarshipRules={scholarshipRules}
              userCountry={country}
            />
          );

          // Select program
          fireEvent.change(getByTestId('program-select'), { target: { value: program.id } });

          // Enter GPA
          fireEvent.change(getByTestId('gpa-input'), { target: { value: gpa.toString() } });

          // Calculate
          fireEvent.click(getByTestId('calculate-button'));

          // Determine expected scholarship percentage
          const applicableRule = scholarshipRules.find(
            rule => rule.country === country && gpa >= rule.gpaMin && gpa <= rule.gpaMax
          );

          if (applicableRule && applicableRule.percentage > 0) {
            // Verify scholarship percentage is displayed
            expect(container.textContent).toContain(`${applicableRule.percentage}% Scholarship Applied`);
            expect(container.textContent).toContain(`Scholarship Discount (${applicableRule.percentage}%)`);
          } else {
            // No scholarship should be applied
            expect(container.textContent).not.toContain('Scholarship Applied');
          }

          cleanup();
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property 27: Fee Calculator Breakdown Completeness
   * Feature: sharda-university-content-enhancement, Property 27
   * 
   * For any fee calculation result, the output should include base fee,
   * scholarship discount amount, and final payable amount.
   * 
   * Validates: Requirements 7.3
   */
  it('Property 27: Fee Calculator Breakdown Completeness', () => {
    fc.assert(
      fc.property(
        programArbitrary,
        fc.array(scholarshipRuleArbitrary, { minLength: 1, maxLength: 5 }),
        fc.float({ min: Math.fround(1), max: Math.fround(5), noNaN: true }),
        (program, scholarshipRules, gpa) => {
          const { getByTestId, container } = render(
            <FeeCalculator
              programs={[program]}
              scholarshipRules={scholarshipRules}
            />
          );

          // Select program and enter GPA
          fireEvent.change(getByTestId('program-select'), { target: { value: program.id } });
          fireEvent.change(getByTestId('gpa-input'), { target: { value: gpa.toString() } });
          fireEvent.click(getByTestId('calculate-button'));

          // Verify base fee is displayed
          expect(container.textContent).toContain('Base Tuition Fee');

          // Verify final payable amount is displayed
          expect(container.textContent).toContain('First Year Total');

          // Verify the results section is rendered
          const resultsSection = getByTestId('calculation-results');
          expect(resultsSection).toBeTruthy();

          // Verify breakdown includes tuition after scholarship
          expect(container.textContent).toContain('Tuition After Scholarship');

          cleanup();
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property 28: Bangladesh Scholarship Rule Application
   * Feature: sharda-university-content-enhancement, Property 28
   * 
   * For any fee calculation with country set to Bangladesh and GPA in range
   * 3.5-5.0, the scholarship percentage should be 50%; for GPA 3.0-3.4, it
   * should be 20%.
   * 
   * Validates: Requirements 7.4
   */
  it('Property 28: Bangladesh Scholarship Rule Application', () => {
    fc.assert(
      fc.property(
        programArbitrary,
        fc.float({ min: Math.fround(3.0), max: Math.fround(5.0), noNaN: true }),
        (program, gpa) => {
          let unmount;
          try {
            const renderResult = render(
              <FeeCalculator
                programs={[program]}
                scholarshipRules={bangladeshScholarshipRules}
                userCountry="Bangladesh"
              />
            );
            unmount = renderResult.unmount;
            const { getByTestId, container } = renderResult;

            // Select program and enter GPA
            fireEvent.change(getByTestId('program-select'), { target: { value: program.id } });
            fireEvent.change(getByTestId('gpa-input'), { target: { value: gpa.toString() } });
            fireEvent.click(getByTestId('calculate-button'));

            // Verify correct scholarship percentage based on GPA
            if (gpa >= 3.5 && gpa <= 5.0) {
              expect(container.textContent).toContain('50% Scholarship Applied');
            } else if (gpa >= 3.0 && gpa < 3.5) {
              expect(container.textContent).toContain('20% Scholarship Applied');
            }
          } finally {
            // Ensure cleanup happens even if assertions fail
            if (unmount) {
              unmount();
            }
            cleanup();
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property 29: Fee Calculator Total Cost Inclusion
   * Feature: sharda-university-content-enhancement, Property 29
   * 
   * For any fee calculation, the total should include tuition, hostel, mess,
   * and registration costs.
   * 
   * Validates: Requirements 7.5
   */
  it('Property 29: Fee Calculator Total Cost Inclusion', () => {
    fc.assert(
      fc.property(
        programArbitrary,
        fc.array(scholarshipRuleArbitrary, { minLength: 1, maxLength: 5 }),
        fc.float({ min: Math.fround(1), max: Math.fround(5), noNaN: true }),
        (program, scholarshipRules, gpa) => {
          const { getByTestId, container } = render(
            <FeeCalculator
              programs={[program]}
              scholarshipRules={scholarshipRules}
            />
          );

          // Select program and enter GPA
          fireEvent.change(getByTestId('program-select'), { target: { value: program.id } });
          fireEvent.change(getByTestId('gpa-input'), { target: { value: gpa.toString() } });
          fireEvent.click(getByTestId('calculate-button'));

          // Verify additional costs section is displayed
          expect(container.textContent).toContain('Additional Costs');

          // Verify individual cost components are displayed if they exist
          if (program.fees.hostel > 0) {
            expect(container.textContent).toContain('Hostel');
          }
          if (program.fees.mess > 0) {
            expect(container.textContent).toContain('Mess');
          }
          if (program.fees.registration > 0) {
            expect(container.textContent).toContain('Registration');
          }

          // Verify first year total is displayed (which includes all costs)
          expect(container.textContent).toContain('First Year Total');

          cleanup();
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property 30: Undergraduate Four-Year Total
   * Feature: sharda-university-content-enhancement, Property 30
   * 
   * For any fee calculation for an undergraduate program, the result should
   * include a 4-year total cost.
   * 
   * Validates: Requirements 7.6
   */
  it('Property 30: Undergraduate Four-Year Total', () => {
    fc.assert(
      fc.property(
        programArbitrary,
        fc.array(scholarshipRuleArbitrary, { minLength: 1, maxLength: 5 }),
        fc.float({ min: Math.fround(1), max: Math.fround(5), noNaN: true }),
        (baseProgram, scholarshipRules, gpa) => {
          // Force the program to be undergraduate
          const program = {
            ...baseProgram,
            level: 'undergraduate',
            duration: '4 years',
          };

          const { getByTestId, container } = render(
            <FeeCalculator
              programs={[program]}
              scholarshipRules={scholarshipRules}
            />
          );

          // Select program and enter GPA
          fireEvent.change(getByTestId('program-select'), { target: { value: program.id } });
          fireEvent.change(getByTestId('gpa-input'), { target: { value: gpa.toString() } });
          fireEvent.click(getByTestId('calculate-button'));

          // Verify 4-year total is displayed for undergraduate programs
          expect(container.textContent).toContain('4-Year Total Cost');

          // Verify the total is highlighted (in blue styling)
          const totalSection = container.querySelector('.bg-blue-50');
          expect(totalSection).toBeTruthy();
          expect(totalSection.textContent).toContain('Year Total Cost');

          cleanup();
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property 31: Fee Calculator CTA Presence
   * Feature: sharda-university-content-enhancement, Property 31
   * 
   * For any fee calculation result display, there should be an application CTA
   * with the selected program pre-filled.
   * 
   * Validates: Requirements 7.7
   */
  it('Property 31: Fee Calculator CTA Presence', () => {
    fc.assert(
      fc.property(
        programArbitrary,
        fc.array(scholarshipRuleArbitrary, { minLength: 1, maxLength: 5 }),
        fc.float({ min: Math.fround(1), max: Math.fround(5), noNaN: true }),
        fc.constantFrom('Bangladesh', 'India', 'International'),
        (program, scholarshipRules, gpa, country) => {
          const { getByTestId } = render(
            <FeeCalculator
              programs={[program]}
              scholarshipRules={scholarshipRules}
              userCountry={country}
            />
          );

          // Select program and enter GPA
          fireEvent.change(getByTestId('program-select'), { target: { value: program.id } });
          fireEvent.change(getByTestId('gpa-input'), { target: { value: gpa.toString() } });
          fireEvent.click(getByTestId('calculate-button'));

          // Verify application CTA is present
          const cta = getByTestId('application-cta');
          expect(cta).toBeTruthy();

          // Verify CTA has correct program pre-filled
          expect(cta.getAttribute('data-program')).toBe(program.id);

          // Verify CTA has correct source and context
          expect(cta.getAttribute('data-source')).toBe('fee-calculator');
          expect(cta.getAttribute('data-context')).toBe('calculator');

          // Verify CTA has country information
          expect(cta.getAttribute('data-country')).toBe(country);

          // Verify CTA text includes program name
          expect(cta.textContent).toContain(program.name);

          cleanup();
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Additional Property: Fee Calculation Accuracy
   * 
   * For any fee calculation, the computed values should be mathematically
   * correct based on the input parameters.
   */
  it('should calculate fees accurately with correct mathematical operations', () => {
    fc.assert(
      fc.property(
        programArbitrary,
        fc.float({ min: Math.fround(3.5), max: Math.fround(5.0), noNaN: true }),
        (program, gpa) => {
          const scholarshipRules = [
            { country: 'Bangladesh', gpaMin: 3.5, gpaMax: 5.0, percentage: 50 },
          ];

          const { getByTestId, container } = render(
            <FeeCalculator
              programs={[program]}
              scholarshipRules={scholarshipRules}
              userCountry="Bangladesh"
            />
          );

          // Select program and enter GPA
          fireEvent.change(getByTestId('program-select'), { target: { value: program.id } });
          fireEvent.change(getByTestId('gpa-input'), { target: { value: gpa.toString() } });
          fireEvent.click(getByTestId('calculate-button'));

          // Calculate expected values
          const baseFee = program.fees.tuitionPerYear;
          const scholarshipAmount = Math.round((baseFee * 50) / 100);
          const discountedTuition = baseFee - scholarshipAmount;
          const additionalCosts = 
            (program.fees.hostel || 0) +
            (program.fees.mess || 0) +
            (program.fees.registration || 0) +
            (program.fees.other || 0);
          const firstYearTotal = discountedTuition + additionalCosts;

          // Format expected values
          const formatCurrency = (amount) => {
            return new Intl.NumberFormat('en-IN', {
              style: 'currency',
              currency: 'INR',
              maximumFractionDigits: 0,
            }).format(amount);
          };

          // Verify calculated values are displayed correctly
          expect(container.textContent).toContain(formatCurrency(baseFee));
          expect(container.textContent).toContain(formatCurrency(scholarshipAmount));
          expect(container.textContent).toContain(formatCurrency(firstYearTotal));

          cleanup();
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Additional Property: Postgraduate Program Handling
   * 
   * For any postgraduate program, the calculator should not display a
   * multi-year total (only undergraduate programs show 4-year total).
   */
  it('should not display multi-year total for postgraduate programs', () => {
    fc.assert(
      fc.property(
        programArbitrary,
        fc.array(scholarshipRuleArbitrary, { minLength: 1, maxLength: 5 }),
        fc.float({ min: Math.fround(1), max: Math.fround(5), noNaN: true }),
        (baseProgram, scholarshipRules, gpa) => {
          // Force the program to be postgraduate
          const program = {
            ...baseProgram,
            level: 'postgraduate',
            duration: '2 years',
          };

          const { getByTestId, container } = render(
            <FeeCalculator
              programs={[program]}
              scholarshipRules={scholarshipRules}
            />
          );

          // Select program and enter GPA
          fireEvent.change(getByTestId('program-select'), { target: { value: program.id } });
          fireEvent.change(getByTestId('gpa-input'), { target: { value: gpa.toString() } });
          fireEvent.click(getByTestId('calculate-button'));

          // Verify multi-year total is NOT displayed for postgraduate programs
          expect(container.textContent).not.toContain('Year Total Cost');

          // Verify only first year total is shown
          expect(container.textContent).toContain('First Year Total');

          cleanup();
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Additional Property: Calculate Button State
   * 
   * For any state of the calculator, the calculate button should only be
   * enabled when all required inputs are provided and valid.
   */
  it('should enable calculate button only when all inputs are valid', () => {
    fc.assert(
      fc.property(
        fc.array(programArbitrary, { minLength: 1, maxLength: 5 }),
        fc.array(scholarshipRuleArbitrary, { minLength: 1, maxLength: 5 }),
        fc.option(fc.nat({ max: 4 })), // Optional program index
        fc.option(fc.float({ min: Math.fround(0.1), max: Math.fround(5), noNaN: true })), // Optional GPA
        (programs, scholarshipRules, programIndex, gpa) => {
          const { getByTestId } = render(
            <FeeCalculator
              programs={programs}
              scholarshipRules={scholarshipRules}
            />
          );

          const calculateButton = getByTestId('calculate-button');

          // Initially, button should be disabled
          expect(calculateButton).toBeDisabled();

          // If program is selected
          if (programIndex !== null) {
            const selectedProgram = programs[programIndex % programs.length];
            fireEvent.change(getByTestId('program-select'), { target: { value: selectedProgram.id } });
          }

          // If GPA is entered
          if (gpa !== null && gpa > 0) {
            fireEvent.change(getByTestId('gpa-input'), { target: { value: gpa.toString() } });
          }

          // Button should only be enabled if both program and valid GPA are provided
          if (programIndex !== null && gpa !== null && gpa > 0) {
            expect(calculateButton).not.toBeDisabled();
          } else {
            expect(calculateButton).toBeDisabled();
          }

          cleanup();
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Additional Property: Country-Specific Scholarship Rules
   * 
   * For any country selection, the calculator should apply scholarship rules
   * specific to that country, falling back to International rules if no
   * country-specific rules exist.
   */
  it('should apply country-specific scholarship rules correctly', () => {
    fc.assert(
      fc.property(
        programArbitrary,
        fc.constantFrom('Bangladesh', 'India', 'International', 'Nepal'),
        fc.float({ min: Math.fround(3.5), max: Math.fround(5.0), noNaN: true }),
        (program, country, gpa) => {
          const scholarshipRules = [
            { country: 'Bangladesh', gpaMin: 3.5, gpaMax: 5.0, percentage: 50 },
            { country: 'India', gpaMin: 90, gpaMax: 100, percentage: 50 },
            { country: 'International', gpaMin: 3.5, gpaMax: 5.0, percentage: 30 },
          ];

          const { getByTestId, container } = render(
            <FeeCalculator
              programs={[program]}
              scholarshipRules={scholarshipRules}
              userCountry={country}
            />
          );

          // Select program and enter GPA
          fireEvent.change(getByTestId('program-select'), { target: { value: program.id } });
          fireEvent.change(getByTestId('gpa-input'), { target: { value: gpa.toString() } });
          fireEvent.click(getByTestId('calculate-button'));

          // Find applicable rule
          const countryRules = scholarshipRules.filter(rule => rule.country === country);
          const applicableRules = countryRules.length > 0 
            ? countryRules 
            : scholarshipRules.filter(rule => rule.country === 'International');

          const matchingRule = applicableRules.find(rule => 
            gpa >= rule.gpaMin && gpa <= rule.gpaMax
          );

          if (matchingRule && matchingRule.percentage > 0) {
            expect(container.textContent).toContain(`${matchingRule.percentage}% Scholarship Applied`);
          }

          cleanup();
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Additional Property: Important Notes Display
   * 
   * For any fee calculation result, important notes about the calculation
   * should be displayed to inform the user.
   */
  it('should display important notes with every calculation result', () => {
    fc.assert(
      fc.property(
        programArbitrary,
        fc.array(scholarshipRuleArbitrary, { minLength: 1, maxLength: 5 }),
        fc.float({ min: Math.fround(1), max: Math.fround(5), noNaN: true }),
        (program, scholarshipRules, gpa) => {
          const { getByTestId, container } = render(
            <FeeCalculator
              programs={[program]}
              scholarshipRules={scholarshipRules}
            />
          );

          // Select program and enter GPA
          fireEvent.change(getByTestId('program-select'), { target: { value: program.id } });
          fireEvent.change(getByTestId('gpa-input'), { target: { value: gpa.toString() } });
          fireEvent.click(getByTestId('calculate-button'));

          // Verify important notes section is displayed
          expect(container.textContent).toContain('Important Notes:');
          expect(container.textContent).toContain('Scholarship is applied to tuition fees only');
          expect(container.textContent).toContain('Hostel and mess charges are optional');
          expect(container.textContent).toContain('Fees are subject to annual revision');

          cleanup();
        }
      ),
      { numRuns: 100 }
    );
  });
});
