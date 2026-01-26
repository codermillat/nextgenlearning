import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import FeeCalculator from '../FeeCalculator';
import * as conversionLogger from '../../../utils/conversionEventLogger';

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

describe('FeeCalculator Component', () => {
  const mockPrograms = [
    {
      id: 'btech-cse',
      name: 'B.Tech Computer Science',
      duration: '4 years',
      level: 'undergraduate',
      fees: {
        tuitionPerYear: 220000,
        hostel: 80000,
        mess: 60000,
        registration: 25000,
        other: 15000,
      },
    },
    {
      id: 'mba',
      name: 'MBA',
      duration: '2 years',
      level: 'postgraduate',
      fees: {
        tuitionPerYear: 300000,
        hostel: 80000,
        mess: 60000,
        registration: 25000,
        other: 15000,
      },
    },
    {
      id: 'bcom',
      name: 'B.Com',
      duration: '3 years',
      level: 'undergraduate',
      fees: {
        tuitionPerYear: 150000,
        hostel: 80000,
        mess: 60000,
        registration: 25000,
        other: 10000,
      },
    },
  ];

  const mockScholarshipRules = [
    { country: 'Bangladesh', gpaMin: 3.5, gpaMax: 5.0, percentage: 50 },
    { country: 'Bangladesh', gpaMin: 3.0, gpaMax: 3.49, percentage: 20 },
    { country: 'India', gpaMin: 90, gpaMax: 100, percentage: 50 },
    { country: 'India', gpaMin: 80, gpaMax: 89, percentage: 25 },
    { country: 'International', gpaMin: 85, gpaMax: 100, percentage: 30 },
    { country: 'International', gpaMin: 75, gpaMax: 84, percentage: 15 },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders the fee calculator component', () => {
      render(
        <FeeCalculator
          programs={mockPrograms}
          scholarshipRules={mockScholarshipRules}
        />
      );

      expect(screen.getByTestId('fee-calculator')).toBeInTheDocument();
      expect(screen.getByText('Fee Calculator')).toBeInTheDocument();
    });

    it('renders program selection dropdown', () => {
      render(
        <FeeCalculator
          programs={mockPrograms}
          scholarshipRules={mockScholarshipRules}
        />
      );

      const programSelect = screen.getByTestId('program-select');
      expect(programSelect).toBeInTheDocument();
      expect(screen.getByText('-- Choose a program --')).toBeInTheDocument();
    });

    it('renders all programs in dropdown', () => {
      render(
        <FeeCalculator
          programs={mockPrograms}
          scholarshipRules={mockScholarshipRules}
        />
      );

      expect(screen.getByText(/B\.Tech Computer Science/)).toBeInTheDocument();
      expect(screen.getByText(/MBA/)).toBeInTheDocument();
      expect(screen.getByText(/B\.Com/)).toBeInTheDocument();
    });

    it('renders country selection dropdown', () => {
      render(
        <FeeCalculator
          programs={mockPrograms}
          scholarshipRules={mockScholarshipRules}
        />
      );

      const countrySelect = screen.getByTestId('country-select');
      expect(countrySelect).toBeInTheDocument();
    });

    it('renders GPA input field', () => {
      render(
        <FeeCalculator
          programs={mockPrograms}
          scholarshipRules={mockScholarshipRules}
        />
      );

      const gpaInput = screen.getByTestId('gpa-input');
      expect(gpaInput).toBeInTheDocument();
    });

    it('renders calculate button', () => {
      render(
        <FeeCalculator
          programs={mockPrograms}
          scholarshipRules={mockScholarshipRules}
        />
      );

      const calculateButton = screen.getByTestId('calculate-button');
      expect(calculateButton).toBeInTheDocument();
      expect(calculateButton).toHaveTextContent('Calculate Fees');
    });

    it('shows empty state initially', () => {
      render(
        <FeeCalculator
          programs={mockPrograms}
          scholarshipRules={mockScholarshipRules}
        />
      );

      expect(screen.getByText(/Select a program and enter your GPA/i)).toBeInTheDocument();
    });
  });

  describe('User Interactions', () => {
    it('allows program selection', () => {
      render(
        <FeeCalculator
          programs={mockPrograms}
          scholarshipRules={mockScholarshipRules}
        />
      );

      const programSelect = screen.getByTestId('program-select');
      fireEvent.change(programSelect, { target: { value: 'btech-cse' } });

      expect(programSelect.value).toBe('btech-cse');
    });

    it('allows country selection', () => {
      render(
        <FeeCalculator
          programs={mockPrograms}
          scholarshipRules={mockScholarshipRules}
        />
      );

      const countrySelect = screen.getByTestId('country-select');
      fireEvent.change(countrySelect, { target: { value: 'Bangladesh' } });

      expect(countrySelect.value).toBe('Bangladesh');
    });

    it('allows GPA input', () => {
      render(
        <FeeCalculator
          programs={mockPrograms}
          scholarshipRules={mockScholarshipRules}
        />
      );

      const gpaInput = screen.getByTestId('gpa-input');
      fireEvent.change(gpaInput, { target: { value: '4.5' } });

      expect(gpaInput.value).toBe('4.5');
    });

    it('validates GPA input to allow only numbers and decimal', () => {
      render(
        <FeeCalculator
          programs={mockPrograms}
          scholarshipRules={mockScholarshipRules}
        />
      );

      const gpaInput = screen.getByTestId('gpa-input');
      
      // Valid inputs
      fireEvent.change(gpaInput, { target: { value: '4.5' } });
      expect(gpaInput.value).toBe('4.5');

      fireEvent.change(gpaInput, { target: { value: '85' } });
      expect(gpaInput.value).toBe('85');

      // Invalid input (letters) should not update
      fireEvent.change(gpaInput, { target: { value: 'abc' } });
      expect(gpaInput.value).toBe('85'); // Remains previous valid value
    });

    it('disables calculate button when inputs are incomplete', () => {
      render(
        <FeeCalculator
          programs={mockPrograms}
          scholarshipRules={mockScholarshipRules}
        />
      );

      const calculateButton = screen.getByTestId('calculate-button');
      expect(calculateButton).toBeDisabled();
    });

    it('enables calculate button when all inputs are provided', () => {
      render(
        <FeeCalculator
          programs={mockPrograms}
          scholarshipRules={mockScholarshipRules}
        />
      );

      const programSelect = screen.getByTestId('program-select');
      const gpaInput = screen.getByTestId('gpa-input');
      const calculateButton = screen.getByTestId('calculate-button');

      fireEvent.change(programSelect, { target: { value: 'btech-cse' } });
      fireEvent.change(gpaInput, { target: { value: '4.5' } });

      expect(calculateButton).not.toBeDisabled();
    });
  });

  describe('Fee Calculation - Bangladesh Students', () => {
    it('calculates fees with 50% scholarship for GPA 3.5-5.0', () => {
      render(
        <FeeCalculator
          programs={mockPrograms}
          scholarshipRules={mockScholarshipRules}
          userCountry="Bangladesh"
        />
      );

      // Select program and enter GPA
      fireEvent.change(screen.getByTestId('program-select'), { target: { value: 'btech-cse' } });
      fireEvent.change(screen.getByTestId('gpa-input'), { target: { value: '4.5' } });
      fireEvent.click(screen.getByTestId('calculate-button'));

      // Check scholarship badge
      expect(screen.getByText('50% Scholarship Applied!')).toBeInTheDocument();

      // Check base fee
      expect(screen.getByText('₹2,20,000')).toBeInTheDocument();

      // Check scholarship amount (50% of 220000 = 110000)
      expect(screen.getByText('- ₹1,10,000')).toBeInTheDocument();

      // Check discounted tuition (220000 - 110000 = 110000)
      expect(screen.getByText('₹1,10,000')).toBeInTheDocument();
    });

    it('calculates fees with 20% scholarship for GPA 3.0-3.4', () => {
      render(
        <FeeCalculator
          programs={mockPrograms}
          scholarshipRules={mockScholarshipRules}
          userCountry="Bangladesh"
        />
      );

      fireEvent.change(screen.getByTestId('program-select'), { target: { value: 'btech-cse' } });
      fireEvent.change(screen.getByTestId('gpa-input'), { target: { value: '3.2' } });
      fireEvent.click(screen.getByTestId('calculate-button'));

      expect(screen.getByText('20% Scholarship Applied!')).toBeInTheDocument();
    });

    it('calculates fees with no scholarship for GPA below 3.0', () => {
      render(
        <FeeCalculator
          programs={mockPrograms}
          scholarshipRules={mockScholarshipRules}
          userCountry="Bangladesh"
        />
      );

      fireEvent.change(screen.getByTestId('program-select'), { target: { value: 'btech-cse' } });
      fireEvent.change(screen.getByTestId('gpa-input'), { target: { value: '2.8' } });
      fireEvent.click(screen.getByTestId('calculate-button'));

      expect(screen.queryByText(/Scholarship Applied/)).not.toBeInTheDocument();
    });

    it('shows Bangladesh-specific scholarship hint', () => {
      render(
        <FeeCalculator
          programs={mockPrograms}
          scholarshipRules={mockScholarshipRules}
          userCountry="Bangladesh"
        />
      );

      expect(screen.getByText(/50% scholarship for GPA 3.5-5.0/)).toBeInTheDocument();
      expect(screen.getByText(/20% scholarship for GPA 3.0-3.4/)).toBeInTheDocument();
    });
  });

  describe('Fee Calculation - Additional Costs', () => {
    it('displays all additional costs in breakdown', () => {
      render(
        <FeeCalculator
          programs={mockPrograms}
          scholarshipRules={mockScholarshipRules}
        />
      );

      fireEvent.change(screen.getByTestId('program-select'), { target: { value: 'btech-cse' } });
      fireEvent.change(screen.getByTestId('gpa-input'), { target: { value: '4.5' } });
      fireEvent.click(screen.getByTestId('calculate-button'));

      expect(screen.getByText('Hostel')).toBeInTheDocument();
      expect(screen.getByText('Mess')).toBeInTheDocument();
      expect(screen.getByText(/Registration/)).toBeInTheDocument();
      expect(screen.getByText('Other Fees')).toBeInTheDocument();
    });

    it('calculates first year total correctly', () => {
      render(
        <FeeCalculator
          programs={mockPrograms}
          scholarshipRules={mockScholarshipRules}
          userCountry="Bangladesh"
        />
      );

      fireEvent.change(screen.getByTestId('program-select'), { target: { value: 'btech-cse' } });
      fireEvent.change(screen.getByTestId('gpa-input'), { target: { value: '4.5' } });
      fireEvent.click(screen.getByTestId('calculate-button'));

      // Discounted tuition: 220000 - 110000 = 110000
      // Additional: 80000 + 60000 + 25000 + 15000 = 180000
      // Total: 110000 + 180000 = 290000
      expect(screen.getByText('First Year Total')).toBeInTheDocument();
      expect(screen.getByText('₹2,90,000')).toBeInTheDocument();
    });
  });

  describe('4-Year Total for Undergraduate Programs', () => {
    it('shows 4-year total for undergraduate programs', () => {
      render(
        <FeeCalculator
          programs={mockPrograms}
          scholarshipRules={mockScholarshipRules}
          userCountry="Bangladesh"
        />
      );

      fireEvent.change(screen.getByTestId('program-select'), { target: { value: 'btech-cse' } });
      fireEvent.change(screen.getByTestId('gpa-input'), { target: { value: '4.5' } });
      fireEvent.click(screen.getByTestId('calculate-button'));

      expect(screen.getByText('4-Year Total Cost')).toBeInTheDocument();
    });

    it('calculates 4-year total correctly', () => {
      render(
        <FeeCalculator
          programs={mockPrograms}
          scholarshipRules={mockScholarshipRules}
          userCountry="Bangladesh"
        />
      );

      fireEvent.change(screen.getByTestId('program-select'), { target: { value: 'btech-cse' } });
      fireEvent.change(screen.getByTestId('gpa-input'), { target: { value: '4.5' } });
      fireEvent.click(screen.getByTestId('calculate-button'));

      // Discounted tuition per year: 110000
      // 4 years tuition: 110000 * 4 = 440000
      // Registration (one-time): 25000
      // Recurring costs per year: 80000 + 60000 + 15000 = 155000
      // 4 years recurring: 155000 * 4 = 620000
      // Total: 440000 + 25000 + 620000 = 1085000
      expect(screen.getByText('₹10,85,000')).toBeInTheDocument();
    });

    it('does not show 4-year total for postgraduate programs', () => {
      render(
        <FeeCalculator
          programs={mockPrograms}
          scholarshipRules={mockScholarshipRules}
        />
      );

      fireEvent.change(screen.getByTestId('program-select'), { target: { value: 'mba' } });
      fireEvent.change(screen.getByTestId('gpa-input'), { target: { value: '85' } });
      fireEvent.click(screen.getByTestId('calculate-button'));

      expect(screen.queryByText(/Year Total Cost/)).not.toBeInTheDocument();
    });
  });

  describe('Application CTA Integration', () => {
    it('shows application CTA after calculation', () => {
      render(
        <FeeCalculator
          programs={mockPrograms}
          scholarshipRules={mockScholarshipRules}
        />
      );

      fireEvent.change(screen.getByTestId('program-select'), { target: { value: 'btech-cse' } });
      fireEvent.change(screen.getByTestId('gpa-input'), { target: { value: '4.5' } });
      fireEvent.click(screen.getByTestId('calculate-button'));

      const cta = screen.getByTestId('application-cta');
      expect(cta).toBeInTheDocument();
    });

    it('passes correct program to application CTA', () => {
      render(
        <FeeCalculator
          programs={mockPrograms}
          scholarshipRules={mockScholarshipRules}
        />
      );

      fireEvent.change(screen.getByTestId('program-select'), { target: { value: 'btech-cse' } });
      fireEvent.change(screen.getByTestId('gpa-input'), { target: { value: '4.5' } });
      fireEvent.click(screen.getByTestId('calculate-button'));

      const cta = screen.getByTestId('application-cta');
      expect(cta).toHaveAttribute('data-program', 'btech-cse');
      expect(cta).toHaveAttribute('data-source', 'fee-calculator');
      expect(cta).toHaveAttribute('data-context', 'calculator');
    });

    it('includes program name in CTA text', () => {
      render(
        <FeeCalculator
          programs={mockPrograms}
          scholarshipRules={mockScholarshipRules}
        />
      );

      fireEvent.change(screen.getByTestId('program-select'), { target: { value: 'btech-cse' } });
      fireEvent.change(screen.getByTestId('gpa-input'), { target: { value: '4.5' } });
      fireEvent.click(screen.getByTestId('calculate-button'));

      expect(screen.getByText(/Apply for B\.Tech Computer Science/)).toBeInTheDocument();
    });
  });

  describe('Analytics Tracking', () => {
    it('logs calculator usage when calculate button is clicked', () => {
      render(
        <FeeCalculator
          programs={mockPrograms}
          scholarshipRules={mockScholarshipRules}
          userCountry="Bangladesh"
        />
      );

      fireEvent.change(screen.getByTestId('program-select'), { target: { value: 'btech-cse' } });
      fireEvent.change(screen.getByTestId('gpa-input'), { target: { value: '4.5' } });
      fireEvent.click(screen.getByTestId('calculate-button'));

      expect(conversionLogger.logCalculatorUse).toHaveBeenCalledWith(
        expect.objectContaining({
          program: 'btech-cse',
          country: 'Bangladesh',
          gpa: 4.5,
          scholarshipPercentage: 50,
        })
      );
    });
  });

  describe('Edge Cases', () => {
    it('handles empty programs array', () => {
      render(
        <FeeCalculator
          programs={[]}
          scholarshipRules={mockScholarshipRules}
        />
      );

      const programSelect = screen.getByTestId('program-select');
      expect(programSelect.children.length).toBe(1); // Only the placeholder option
    });

    it('handles missing fee components gracefully', () => {
      const programWithMissingFees = [{
        id: 'test-program',
        name: 'Test Program',
        duration: '4 years',
        level: 'undergraduate',
        fees: {
          tuitionPerYear: 200000,
          // Missing other fee components
        },
      }];

      render(
        <FeeCalculator
          programs={programWithMissingFees}
          scholarshipRules={mockScholarshipRules}
        />
      );

      fireEvent.change(screen.getByTestId('program-select'), { target: { value: 'test-program' } });
      fireEvent.change(screen.getByTestId('gpa-input'), { target: { value: '4.5' } });
      fireEvent.click(screen.getByTestId('calculate-button'));

      // Should still calculate without errors
      expect(screen.getByTestId('calculation-results')).toBeInTheDocument();
    });

    it('handles zero GPA input', () => {
      render(
        <FeeCalculator
          programs={mockPrograms}
          scholarshipRules={mockScholarshipRules}
        />
      );

      fireEvent.change(screen.getByTestId('program-select'), { target: { value: 'btech-cse' } });
      fireEvent.change(screen.getByTestId('gpa-input'), { target: { value: '0' } });

      const calculateButton = screen.getByTestId('calculate-button');
      expect(calculateButton).toBeDisabled();
    });

    it('handles invalid GPA input', () => {
      render(
        <FeeCalculator
          programs={mockPrograms}
          scholarshipRules={mockScholarshipRules}
        />
      );

      const gpaInput = screen.getByTestId('gpa-input');
      
      fireEvent.change(gpaInput, { target: { value: '-5' } });
      expect(gpaInput.value).toBe(''); // Should not accept negative
    });

    describe('Invalid GPA Inputs', () => {
      it('rejects negative GPA values', () => {
        render(
          <FeeCalculator
            programs={mockPrograms}
            scholarshipRules={mockScholarshipRules}
          />
        );

        const gpaInput = screen.getByTestId('gpa-input');
        fireEvent.change(gpaInput, { target: { value: '-3.5' } });
        
        // Should not accept negative values
        expect(gpaInput.value).toBe('');
      });

      it('rejects alphabetic characters in GPA input', () => {
        render(
          <FeeCalculator
            programs={mockPrograms}
            scholarshipRules={mockScholarshipRules}
          />
        );

        const gpaInput = screen.getByTestId('gpa-input');
        
        // Set a valid value first
        fireEvent.change(gpaInput, { target: { value: '4.5' } });
        expect(gpaInput.value).toBe('4.5');
        
        // Try to enter letters
        fireEvent.change(gpaInput, { target: { value: 'abc' } });
        expect(gpaInput.value).toBe('4.5'); // Should remain unchanged
      });

      it('rejects special characters in GPA input', () => {
        render(
          <FeeCalculator
            programs={mockPrograms}
            scholarshipRules={mockScholarshipRules}
          />
        );

        const gpaInput = screen.getByTestId('gpa-input');
        
        fireEvent.change(gpaInput, { target: { value: '4.5' } });
        expect(gpaInput.value).toBe('4.5');
        
        // Try special characters
        fireEvent.change(gpaInput, { target: { value: '4.5@#$' } });
        expect(gpaInput.value).toBe('4.5'); // Should remain unchanged
      });

      it('rejects multiple decimal points in GPA input', () => {
        render(
          <FeeCalculator
            programs={mockPrograms}
            scholarshipRules={mockScholarshipRules}
          />
        );

        const gpaInput = screen.getByTestId('gpa-input');
        
        fireEvent.change(gpaInput, { target: { value: '4.5' } });
        expect(gpaInput.value).toBe('4.5');
        
        // Try multiple decimals
        fireEvent.change(gpaInput, { target: { value: '4.5.5' } });
        expect(gpaInput.value).toBe('4.5'); // Should remain unchanged
      });

      it('accepts valid decimal GPA values', () => {
        render(
          <FeeCalculator
            programs={mockPrograms}
            scholarshipRules={mockScholarshipRules}
          />
        );

        const gpaInput = screen.getByTestId('gpa-input');
        
        fireEvent.change(gpaInput, { target: { value: '3.75' } });
        expect(gpaInput.value).toBe('3.75');
        
        fireEvent.change(gpaInput, { target: { value: '4.0' } });
        expect(gpaInput.value).toBe('4.0');
      });

      it('accepts valid integer GPA values', () => {
        render(
          <FeeCalculator
            programs={mockPrograms}
            scholarshipRules={mockScholarshipRules}
          />
        );

        const gpaInput = screen.getByTestId('gpa-input');
        
        fireEvent.change(gpaInput, { target: { value: '85' } });
        expect(gpaInput.value).toBe('85');
        
        fireEvent.change(gpaInput, { target: { value: '100' } });
        expect(gpaInput.value).toBe('100');
      });

      it('handles extremely high GPA values gracefully', () => {
        render(
          <FeeCalculator
            programs={mockPrograms}
            scholarshipRules={mockScholarshipRules}
            userCountry="Bangladesh"
          />
        );

        fireEvent.change(screen.getByTestId('program-select'), { target: { value: 'btech-cse' } });
        fireEvent.change(screen.getByTestId('gpa-input'), { target: { value: '999' } });
        fireEvent.click(screen.getByTestId('calculate-button'));

        // Should calculate but not apply scholarship (out of range)
        expect(screen.getByTestId('calculation-results')).toBeInTheDocument();
        expect(screen.queryByText(/Scholarship Applied/)).not.toBeInTheDocument();
      });

      it('handles very small positive GPA values', () => {
        render(
          <FeeCalculator
            programs={mockPrograms}
            scholarshipRules={mockScholarshipRules}
            userCountry="Bangladesh"
          />
        );

        fireEvent.change(screen.getByTestId('program-select'), { target: { value: 'btech-cse' } });
        fireEvent.change(screen.getByTestId('gpa-input'), { target: { value: '0.1' } });
        fireEvent.click(screen.getByTestId('calculate-button'));

        // Should calculate but not apply scholarship
        expect(screen.getByTestId('calculation-results')).toBeInTheDocument();
        expect(screen.queryByText(/Scholarship Applied/)).not.toBeInTheDocument();
      });
    });

    describe('Missing Program Data', () => {
      it('handles program with only tuition fee', () => {
        const minimalProgram = [{
          id: 'minimal-program',
          name: 'Minimal Program',
          duration: '4 years',
          level: 'undergraduate',
          fees: {
            tuitionPerYear: 200000,
          },
        }];

        render(
          <FeeCalculator
            programs={minimalProgram}
            scholarshipRules={mockScholarshipRules}
          />
        );

        fireEvent.change(screen.getByTestId('program-select'), { target: { value: 'minimal-program' } });
        fireEvent.change(screen.getByTestId('gpa-input'), { target: { value: '4.5' } });
        fireEvent.click(screen.getByTestId('calculate-button'));

        // Should calculate with zero for missing fees
        expect(screen.getByTestId('calculation-results')).toBeInTheDocument();
        expect(screen.getByText('First Year Total')).toBeInTheDocument();
      });

      it('handles program with zero tuition fee', () => {
        const freeProgram = [{
          id: 'free-program',
          name: 'Free Program',
          duration: '2 years',
          level: 'postgraduate',
          fees: {
            tuitionPerYear: 0,
            hostel: 80000,
            mess: 60000,
          },
        }];

        render(
          <FeeCalculator
            programs={freeProgram}
            scholarshipRules={mockScholarshipRules}
          />
        );

        fireEvent.change(screen.getByTestId('program-select'), { target: { value: 'free-program' } });
        fireEvent.change(screen.getByTestId('gpa-input'), { target: { value: '4.5' } });
        fireEvent.click(screen.getByTestId('calculate-button'));

        // Should calculate with only additional costs
        expect(screen.getByTestId('calculation-results')).toBeInTheDocument();
        // Check that base tuition is 0
        expect(screen.getByText('Base Tuition Fee (per year)')).toBeInTheDocument();
        // Total should only include additional costs (80000 + 60000 = 140000)
        expect(screen.getByText('₹1,40,000')).toBeInTheDocument();
      });

      it('handles program with missing duration', () => {
        const noDurationProgram = [{
          id: 'no-duration',
          name: 'No Duration Program',
          duration: '',
          level: 'undergraduate',
          fees: {
            tuitionPerYear: 200000,
            hostel: 80000,
          },
        }];

        render(
          <FeeCalculator
            programs={noDurationProgram}
            scholarshipRules={mockScholarshipRules}
          />
        );

        fireEvent.change(screen.getByTestId('program-select'), { target: { value: 'no-duration' } });
        fireEvent.change(screen.getByTestId('gpa-input'), { target: { value: '4.5' } });
        fireEvent.click(screen.getByTestId('calculate-button'));

        // Should still calculate (defaults to 4 years)
        expect(screen.getByTestId('calculation-results')).toBeInTheDocument();
      });

      it('handles empty scholarship rules array', () => {
        render(
          <FeeCalculator
            programs={mockPrograms}
            scholarshipRules={[]}
          />
        );

        fireEvent.change(screen.getByTestId('program-select'), { target: { value: 'btech-cse' } });
        fireEvent.change(screen.getByTestId('gpa-input'), { target: { value: '4.5' } });
        fireEvent.click(screen.getByTestId('calculate-button'));

        // Should calculate without scholarship
        expect(screen.getByTestId('calculation-results')).toBeInTheDocument();
        expect(screen.queryByText(/Scholarship Applied/)).not.toBeInTheDocument();
      });

      it('handles country with no scholarship rules', () => {
        render(
          <FeeCalculator
            programs={mockPrograms}
            scholarshipRules={mockScholarshipRules}
            userCountry="Nepal"
          />
        );

        // Nepal is not in scholarship rules, should fall back to International
        fireEvent.change(screen.getByTestId('country-select'), { target: { value: 'International' } });
        fireEvent.change(screen.getByTestId('program-select'), { target: { value: 'btech-cse' } });
        fireEvent.change(screen.getByTestId('gpa-input'), { target: { value: '85' } });
        fireEvent.click(screen.getByTestId('calculate-button'));

        expect(screen.getByTestId('calculation-results')).toBeInTheDocument();
      });
    });

    describe('Calculation Accuracy with Specific Values', () => {
      it('calculates correctly at Bangladesh scholarship boundary (GPA 3.5)', () => {
        render(
          <FeeCalculator
            programs={mockPrograms}
            scholarshipRules={mockScholarshipRules}
            userCountry="Bangladesh"
          />
        );

        fireEvent.change(screen.getByTestId('program-select'), { target: { value: 'btech-cse' } });
        fireEvent.change(screen.getByTestId('gpa-input'), { target: { value: '3.5' } });
        fireEvent.click(screen.getByTestId('calculate-button'));

        // Should get 50% scholarship at exactly 3.5
        expect(screen.getByText('50% Scholarship Applied!')).toBeInTheDocument();
        expect(screen.getByText('- ₹1,10,000')).toBeInTheDocument(); // 50% of 220000
      });

      it('calculates correctly at Bangladesh scholarship boundary (GPA 3.49)', () => {
        render(
          <FeeCalculator
            programs={mockPrograms}
            scholarshipRules={mockScholarshipRules}
            userCountry="Bangladesh"
          />
        );

        fireEvent.change(screen.getByTestId('program-select'), { target: { value: 'btech-cse' } });
        fireEvent.change(screen.getByTestId('gpa-input'), { target: { value: '3.49' } });
        fireEvent.click(screen.getByTestId('calculate-button'));

        // Should get 20% scholarship at 3.49
        expect(screen.getByText('20% Scholarship Applied!')).toBeInTheDocument();
        expect(screen.getByText('- ₹44,000')).toBeInTheDocument(); // 20% of 220000
      });

      it('calculates correctly at Bangladesh scholarship boundary (GPA 3.0)', () => {
        render(
          <FeeCalculator
            programs={mockPrograms}
            scholarshipRules={mockScholarshipRules}
            userCountry="Bangladesh"
          />
        );

        fireEvent.change(screen.getByTestId('program-select'), { target: { value: 'btech-cse' } });
        fireEvent.change(screen.getByTestId('gpa-input'), { target: { value: '3.0' } });
        fireEvent.click(screen.getByTestId('calculate-button'));

        // Should get 20% scholarship at exactly 3.0
        expect(screen.getByText('20% Scholarship Applied!')).toBeInTheDocument();
      });

      it('calculates correctly at Bangladesh scholarship boundary (GPA 2.99)', () => {
        render(
          <FeeCalculator
            programs={mockPrograms}
            scholarshipRules={mockScholarshipRules}
            userCountry="Bangladesh"
          />
        );

        fireEvent.change(screen.getByTestId('program-select'), { target: { value: 'btech-cse' } });
        fireEvent.change(screen.getByTestId('gpa-input'), { target: { value: '2.99' } });
        fireEvent.click(screen.getByTestId('calculate-button'));

        // Should get no scholarship at 2.99
        expect(screen.queryByText(/Scholarship Applied/)).not.toBeInTheDocument();
      });

      it('calculates correctly at Bangladesh scholarship boundary (GPA 5.0)', () => {
        render(
          <FeeCalculator
            programs={mockPrograms}
            scholarshipRules={mockScholarshipRules}
            userCountry="Bangladesh"
          />
        );

        fireEvent.change(screen.getByTestId('program-select'), { target: { value: 'btech-cse' } });
        fireEvent.change(screen.getByTestId('gpa-input'), { target: { value: '5.0' } });
        fireEvent.click(screen.getByTestId('calculate-button'));

        // Should get 50% scholarship at exactly 5.0
        expect(screen.getByText('50% Scholarship Applied!')).toBeInTheDocument();
      });

      it('calculates 4-year total correctly with scholarship', () => {
        render(
          <FeeCalculator
            programs={mockPrograms}
            scholarshipRules={mockScholarshipRules}
            userCountry="Bangladesh"
          />
        );

        fireEvent.change(screen.getByTestId('program-select'), { target: { value: 'btech-cse' } });
        fireEvent.change(screen.getByTestId('gpa-input'), { target: { value: '4.5' } });
        fireEvent.click(screen.getByTestId('calculate-button'));

        // Discounted tuition: 110000 per year * 4 = 440000
        // Registration (one-time): 25000
        // Recurring (hostel + mess + other): (80000 + 60000 + 15000) * 4 = 620000
        // Total: 440000 + 25000 + 620000 = 1085000
        expect(screen.getByText('₹10,85,000')).toBeInTheDocument();
      });

      it('calculates first year total correctly without scholarship', () => {
        render(
          <FeeCalculator
            programs={mockPrograms}
            scholarshipRules={mockScholarshipRules}
            userCountry="Bangladesh"
          />
        );

        fireEvent.change(screen.getByTestId('program-select'), { target: { value: 'btech-cse' } });
        fireEvent.change(screen.getByTestId('gpa-input'), { target: { value: '2.5' } });
        fireEvent.click(screen.getByTestId('calculate-button'));

        // Full tuition: 220000
        // Additional: 80000 + 60000 + 25000 + 15000 = 180000
        // Total: 220000 + 180000 = 400000
        expect(screen.getByText('₹4,00,000')).toBeInTheDocument();
      });

      it('calculates correctly for India scholarship rules', () => {
        render(
          <FeeCalculator
            programs={mockPrograms}
            scholarshipRules={mockScholarshipRules}
            userCountry="India"
          />
        );

        fireEvent.change(screen.getByTestId('program-select'), { target: { value: 'btech-cse' } });
        fireEvent.change(screen.getByTestId('gpa-input'), { target: { value: '90' } });
        fireEvent.click(screen.getByTestId('calculate-button'));

        // Should get 50% scholarship for 90%
        expect(screen.getByText('50% Scholarship Applied!')).toBeInTheDocument();
      });

      it('calculates correctly for International scholarship rules', () => {
        render(
          <FeeCalculator
            programs={mockPrograms}
            scholarshipRules={mockScholarshipRules}
            userCountry="International"
          />
        );

        fireEvent.change(screen.getByTestId('program-select'), { target: { value: 'btech-cse' } });
        fireEvent.change(screen.getByTestId('gpa-input'), { target: { value: '85' } });
        fireEvent.click(screen.getByTestId('calculate-button'));

        // Should get 30% scholarship for 85
        expect(screen.getByText('30% Scholarship Applied!')).toBeInTheDocument();
        expect(screen.getByText('- ₹66,000')).toBeInTheDocument(); // 30% of 220000
      });

      it('rounds scholarship amounts correctly', () => {
        const programWithOddFee = [{
          id: 'odd-fee',
          name: 'Odd Fee Program',
          duration: '4 years',
          level: 'undergraduate',
          fees: {
            tuitionPerYear: 333333, // Will result in fractional scholarship
            hostel: 80000,
          },
        }];

        render(
          <FeeCalculator
            programs={programWithOddFee}
            scholarshipRules={mockScholarshipRules}
            userCountry="Bangladesh"
          />
        );

        fireEvent.change(screen.getByTestId('program-select'), { target: { value: 'odd-fee' } });
        fireEvent.change(screen.getByTestId('gpa-input'), { target: { value: '4.5' } });
        fireEvent.click(screen.getByTestId('calculate-button'));

        // 50% of 333333 = 166666.5, should be rounded
        expect(screen.getByText('- ₹1,66,667')).toBeInTheDocument();
      });

      it('calculates correctly for 3-year undergraduate program', () => {
        render(
          <FeeCalculator
            programs={mockPrograms}
            scholarshipRules={mockScholarshipRules}
            userCountry="Bangladesh"
          />
        );

        fireEvent.change(screen.getByTestId('program-select'), { target: { value: 'bcom' } });
        fireEvent.change(screen.getByTestId('gpa-input'), { target: { value: '4.5' } });
        fireEvent.click(screen.getByTestId('calculate-button'));

        // Should show 3-year total for B.Com
        expect(screen.getByText('3-Year Total Cost')).toBeInTheDocument();
      });
    });

    describe('State Management Edge Cases', () => {
      it('resets calculation when program changes', () => {
        render(
          <FeeCalculator
            programs={mockPrograms}
            scholarshipRules={mockScholarshipRules}
          />
        );

        // Calculate for first program
        fireEvent.change(screen.getByTestId('program-select'), { target: { value: 'btech-cse' } });
        fireEvent.change(screen.getByTestId('gpa-input'), { target: { value: '4.5' } });
        fireEvent.click(screen.getByTestId('calculate-button'));

        expect(screen.getByTestId('calculation-results')).toBeInTheDocument();

        // Change program
        fireEvent.change(screen.getByTestId('program-select'), { target: { value: 'mba' } });

        // Results should be hidden
        expect(screen.queryByTestId('calculation-results')).not.toBeInTheDocument();
      });

      it('resets calculation when GPA changes', () => {
        render(
          <FeeCalculator
            programs={mockPrograms}
            scholarshipRules={mockScholarshipRules}
          />
        );

        // Calculate
        fireEvent.change(screen.getByTestId('program-select'), { target: { value: 'btech-cse' } });
        fireEvent.change(screen.getByTestId('gpa-input'), { target: { value: '4.5' } });
        fireEvent.click(screen.getByTestId('calculate-button'));

        expect(screen.getByTestId('calculation-results')).toBeInTheDocument();

        // Change GPA
        fireEvent.change(screen.getByTestId('gpa-input'), { target: { value: '3.5' } });

        // Results should be hidden
        expect(screen.queryByTestId('calculation-results')).not.toBeInTheDocument();
      });

      it('resets calculation when country changes', () => {
        render(
          <FeeCalculator
            programs={mockPrograms}
            scholarshipRules={mockScholarshipRules}
            userCountry="Bangladesh"
          />
        );

        // Calculate
        fireEvent.change(screen.getByTestId('program-select'), { target: { value: 'btech-cse' } });
        fireEvent.change(screen.getByTestId('gpa-input'), { target: { value: '4.5' } });
        fireEvent.click(screen.getByTestId('calculate-button'));

        expect(screen.getByTestId('calculation-results')).toBeInTheDocument();

        // Change country
        fireEvent.change(screen.getByTestId('country-select'), { target: { value: 'India' } });

        // Results should be hidden
        expect(screen.queryByTestId('calculation-results')).not.toBeInTheDocument();
      });
    });
  });

  describe('Important Notes Display', () => {
    it('shows important notes after calculation', () => {
      render(
        <FeeCalculator
          programs={mockPrograms}
          scholarshipRules={mockScholarshipRules}
        />
      );

      fireEvent.change(screen.getByTestId('program-select'), { target: { value: 'btech-cse' } });
      fireEvent.change(screen.getByTestId('gpa-input'), { target: { value: '4.5' } });
      fireEvent.click(screen.getByTestId('calculate-button'));

      expect(screen.getByText('Important Notes:')).toBeInTheDocument();
      expect(screen.getByText(/Scholarship is applied to tuition fees only/)).toBeInTheDocument();
      expect(screen.getByText(/Hostel and mess charges are optional/)).toBeInTheDocument();
    });
  });

  describe('Responsive Behavior', () => {
    it('applies responsive classes', () => {
      const { container } = render(
        <FeeCalculator
          programs={mockPrograms}
          scholarshipRules={mockScholarshipRules}
        />
      );

      const calculator = container.querySelector('[data-testid="fee-calculator"]');
      expect(calculator).toHaveClass('p-6', 'sm:p-8');
    });
  });

  describe('Accessibility', () => {
    it('has proper labels for all inputs', () => {
      render(
        <FeeCalculator
          programs={mockPrograms}
          scholarshipRules={mockScholarshipRules}
        />
      );

      expect(screen.getByLabelText(/Select Program/)).toBeInTheDocument();
      expect(screen.getByLabelText(/Your Country/)).toBeInTheDocument();
      expect(screen.getByLabelText(/GPA\/Percentage/)).toBeInTheDocument();
    });

    it('has proper input types for mobile optimization', () => {
      render(
        <FeeCalculator
          programs={mockPrograms}
          scholarshipRules={mockScholarshipRules}
        />
      );

      const gpaInput = screen.getByTestId('gpa-input');
      expect(gpaInput).toHaveAttribute('inputMode', 'decimal');
    });
  });
});
