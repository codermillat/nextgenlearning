import { useState, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import ApplicationCTA from './ApplicationCTA';
import { logCalculatorUse } from '../../utils/conversionEventLogger';

/**
 * FeeCalculator Component
 * Feature: sharda-university-content-enhancement
 * 
 * Interactive fee calculator with scholarship adjustments and real-time calculations.
 * Displays comprehensive fee breakdown including base fee, scholarship, additional costs,
 * and total payable amount. Shows 4-year total for undergraduate programs.
 * 
 * Validates: Requirements 7.1, 7.2, 7.3, 7.4, 7.5, 7.6, 7.7
 * 
 * @param {Object} props - Component props
 * @param {Array} props.programs - Array of program objects with fee information
 * @param {Array} props.scholarshipRules - Array of scholarship rules by country and GPA
 * @param {string} [props.userCountry='International'] - User's country for scholarship rules
 * @param {string} [props.className] - Additional CSS classes
 */
const FeeCalculator = ({ programs = [], scholarshipRules = [], userCountry = 'International', className = '' }) => {
  // State management
  const [selectedProgramId, setSelectedProgramId] = useState('');
  const [gpaInput, setGpaInput] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(userCountry);
  const [hasCalculated, setHasCalculated] = useState(false);

  // Get selected program
  const selectedProgram = useMemo(() => {
    return programs.find(p => p.id === selectedProgramId);
  }, [programs, selectedProgramId]);

  // Calculate scholarship percentage based on GPA and country
  const calculateScholarship = useCallback((gpa, country) => {
    if (!gpa || gpa <= 0) return 0;

    // Find applicable scholarship rules for the country
    const countryRules = scholarshipRules.filter(rule => rule.country === country);
    
    // If no country-specific rules, try International rules
    const applicableRules = countryRules.length > 0 
      ? countryRules 
      : scholarshipRules.filter(rule => rule.country === 'International');

    // Sort rules by percentage descending to prioritize higher scholarships
    const sortedRules = [...applicableRules].sort((a, b) => b.percentage - a.percentage);

    // Find the first matching rule based on GPA range
    // This ensures that if a GPA matches multiple rules, the highest scholarship is applied
    const matchingRule = sortedRules.find(rule => 
      gpa >= rule.gpaMin && gpa <= rule.gpaMax
    );

    return matchingRule ? matchingRule.percentage : 0;
  }, [scholarshipRules]);

  // Calculate fee breakdown
  const feeCalculation = useMemo(() => {
    if (!selectedProgram || !gpaInput) {
      return null;
    }

    const gpa = parseFloat(gpaInput);
    if (isNaN(gpa) || gpa <= 0) {
      return null;
    }

    const scholarshipPercentage = calculateScholarship(gpa, selectedCountry);
    const baseFee = selectedProgram.fees.tuitionPerYear;
    const scholarshipAmount = Math.round((baseFee * scholarshipPercentage) / 100);
    const discountedTuition = baseFee - scholarshipAmount;

    // Additional costs (per year)
    const additionalCosts = {
      hostel: selectedProgram.fees.hostel || 0,
      mess: selectedProgram.fees.mess || 0,
      registration: selectedProgram.fees.registration || 0,
      other: selectedProgram.fees.other || 0,
    };

    const totalAdditionalCosts = Object.values(additionalCosts).reduce((sum, cost) => sum + cost, 0);
    const totalFirstYear = discountedTuition + totalAdditionalCosts;

    // Calculate total for program duration
    const durationYears = parseInt(selectedProgram.duration) || 4;
    const isUndergraduate = selectedProgram.level === 'undergraduate';
    
    // For multi-year calculation, registration is typically one-time
    const recurringAnnualCosts = additionalCosts.hostel + additionalCosts.mess + additionalCosts.other;
    const totalProgramCost = (discountedTuition * durationYears) + 
                             additionalCosts.registration + 
                             (recurringAnnualCosts * durationYears);

    return {
      baseFee,
      scholarshipPercentage,
      scholarshipAmount,
      discountedTuition,
      additionalCosts,
      totalAdditionalCosts,
      totalFirstYear,
      durationYears,
      isUndergraduate,
      totalProgramCost,
    };
  }, [selectedProgram, gpaInput, selectedCountry, calculateScholarship]);

  // Handle program selection
  const handleProgramChange = (e) => {
    setSelectedProgramId(e.target.value);
    setHasCalculated(false);
  };

  // Handle GPA input
  const handleGpaChange = (e) => {
    const value = e.target.value;
    // Allow only numbers and decimal point
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setGpaInput(value);
      setHasCalculated(false);
    }
  };

  // Handle country selection
  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);
    setHasCalculated(false);
  };

  // Handle calculate button click
  const handleCalculate = () => {
    if (selectedProgram && gpaInput && feeCalculation) {
      setHasCalculated(true);
      
      // Log calculator usage
      logCalculatorUse({
        program: selectedProgram.id,
        gpa: parseFloat(gpaInput),
        country: selectedCountry,
        baseFee: feeCalculation.baseFee,
        scholarshipPercentage: feeCalculation.scholarshipPercentage,
        finalAmount: feeCalculation.totalFirstYear,
      });
    }
  };

  // Get unique countries from scholarship rules
  const availableCountries = useMemo(() => {
    const countries = [...new Set(scholarshipRules.map(rule => rule.country))];
    return countries.sort();
  }, [scholarshipRules]);

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Check if calculation is ready
  const canCalculate = selectedProgramId && gpaInput && parseFloat(gpaInput) > 0;

  return (
    <div className={`bg-white rounded-xl shadow-2xl p-6 sm:p-8 ${className}`} data-testid="fee-calculator">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
          Fee Calculator
        </h2>
        <p className="text-gray-600">
          Calculate your total fees with scholarship adjustments
        </p>
      </div>

      {/* Input Section */}
      <div className="space-y-4 mb-6">
        {/* Program Selection */}
        <div>
          <label htmlFor="program-select" className="block text-sm font-semibold text-gray-700 mb-2">
            Select Program *
          </label>
          <select
            id="program-select"
            value={selectedProgramId}
            onChange={handleProgramChange}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white text-gray-900"
            data-testid="program-select"
          >
            <option value="">-- Choose a program --</option>
            {programs.map(program => (
              <option key={program.id} value={program.id}>
                {program.name} ({program.duration})
              </option>
            ))}
          </select>
        </div>

        {/* Country Selection */}
        <div>
          <label htmlFor="country-select" className="block text-sm font-semibold text-gray-700 mb-2">
            Your Country *
          </label>
          <select
            id="country-select"
            value={selectedCountry}
            onChange={handleCountryChange}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white text-gray-900"
            data-testid="country-select"
          >
            {availableCountries.map(country => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>

        {/* GPA/Percentage Input */}
        <div>
          <label htmlFor="gpa-input" className="block text-sm font-semibold text-gray-700 mb-2">
            {selectedCountry === 'Bangladesh' ? 'HSC GPA (out of 5.0)' : 
             selectedCountry === 'India' ? 'Percentage (out of 100)' : 
             'GPA/Percentage'} *
          </label>
          <input
            id="gpa-input"
            type="text"
            inputMode="decimal"
            value={gpaInput}
            onChange={handleGpaChange}
            placeholder={selectedCountry === 'Bangladesh' ? 'e.g., 4.5' : 
                        selectedCountry === 'India' ? 'e.g., 85' : 
                        'Enter your score'}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            data-testid="gpa-input"
          />
          {selectedCountry === 'Bangladesh' && (
            <p className="mt-1 text-sm text-gray-500">
              50% scholarship for GPA 3.5-5.0 | 20% scholarship for GPA 3.0-3.4
            </p>
          )}
        </div>

        {/* Calculate Button */}
        <button
          onClick={handleCalculate}
          disabled={!canCalculate}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold py-3 px-6 rounded-lg hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none"
          data-testid="calculate-button"
        >
          Calculate Fees
        </button>
      </div>

      {/* Results Section */}
      {hasCalculated && feeCalculation && (
        <div className="border-t-2 border-gray-200 pt-6 animate-fadeIn" data-testid="calculation-results">
          {/* Scholarship Badge */}
          {feeCalculation.scholarshipPercentage > 0 && (
            <div className="mb-4 p-4 bg-green-50 border-2 border-green-200 rounded-lg">
              <div className="flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-lg font-bold text-green-800">
                  {feeCalculation.scholarshipPercentage}% Scholarship Applied!
                </span>
              </div>
            </div>
          )}

          {/* Fee Breakdown */}
          <div className="space-y-3 mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Fee Breakdown</h3>
            
            {/* Base Fee */}
            <div className="flex justify-between items-center py-2 border-b border-gray-200">
              <span className="text-gray-700">Base Tuition Fee (per year)</span>
              <span className="font-semibold text-gray-900">{formatCurrency(feeCalculation.baseFee)}</span>
            </div>

            {/* Scholarship Discount */}
            {feeCalculation.scholarshipPercentage > 0 && (
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="text-green-600">
                  Scholarship Discount ({feeCalculation.scholarshipPercentage}%)
                </span>
                <span className="font-semibold text-green-600">
                  - {formatCurrency(feeCalculation.scholarshipAmount)}
                </span>
              </div>
            )}

            {/* Discounted Tuition */}
            <div className="flex justify-between items-center py-2 border-b border-gray-200">
              <span className="text-gray-700 font-medium">Tuition After Scholarship</span>
              <span className="font-semibold text-gray-900">{formatCurrency(feeCalculation.discountedTuition)}</span>
            </div>

            {/* Additional Costs */}
            <div className="mt-4">
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Additional Costs (per year)</h4>
              
              {feeCalculation.additionalCosts.hostel > 0 && (
                <div className="flex justify-between items-center py-1 text-sm">
                  <span className="text-gray-600">Hostel</span>
                  <span className="text-gray-900">{formatCurrency(feeCalculation.additionalCosts.hostel)}</span>
                </div>
              )}
              
              {feeCalculation.additionalCosts.mess > 0 && (
                <div className="flex justify-between items-center py-1 text-sm">
                  <span className="text-gray-600">Mess</span>
                  <span className="text-gray-900">{formatCurrency(feeCalculation.additionalCosts.mess)}</span>
                </div>
              )}
              
              {feeCalculation.additionalCosts.registration > 0 && (
                <div className="flex justify-between items-center py-1 text-sm">
                  <span className="text-gray-600">Registration (one-time)</span>
                  <span className="text-gray-900">{formatCurrency(feeCalculation.additionalCosts.registration)}</span>
                </div>
              )}
              
              {feeCalculation.additionalCosts.other > 0 && (
                <div className="flex justify-between items-center py-1 text-sm">
                  <span className="text-gray-600">Other Fees</span>
                  <span className="text-gray-900">{formatCurrency(feeCalculation.additionalCosts.other)}</span>
                </div>
              )}
            </div>

            {/* First Year Total */}
            <div className="flex justify-between items-center py-3 border-t-2 border-gray-300 mt-4">
              <span className="text-lg font-bold text-gray-900">First Year Total</span>
              <span className="text-xl font-bold text-blue-600">{formatCurrency(feeCalculation.totalFirstYear)}</span>
            </div>

            {/* Program Total (for undergraduate) */}
            {feeCalculation.isUndergraduate && (
              <div className="flex justify-between items-center py-3 bg-blue-50 px-4 rounded-lg border-2 border-blue-200">
                <span className="text-lg font-bold text-blue-900">
                  {feeCalculation.durationYears}-Year Total Cost
                </span>
                <span className="text-xl font-bold text-blue-600">
                  {formatCurrency(feeCalculation.totalProgramCost)}
                </span>
              </div>
            )}
          </div>

          {/* Important Notes */}
          <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <h4 className="text-sm font-semibold text-yellow-900 mb-2">Important Notes:</h4>
            <ul className="text-sm text-yellow-800 space-y-1 list-disc list-inside">
              <li>Scholarship is applied to tuition fees only</li>
              <li>Hostel and mess charges are optional</li>
              <li>Fees are subject to annual revision</li>
              <li>Additional costs may vary based on choices</li>
            </ul>
          </div>

          {/* Application CTA */}
          <div className="text-center">
            <ApplicationCTA
              variant="primary"
              program={selectedProgram.id}
              source="fee-calculator"
              context="calculator"
              country={selectedCountry}
              className="w-full sm:w-auto"
            >
              Apply for {selectedProgram.name}
            </ApplicationCTA>
            <p className="mt-3 text-sm text-gray-600">
              Start your application with pre-filled program details
            </p>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!hasCalculated && (
        <div className="text-center py-8 text-gray-500">
          <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
          <p className="text-lg">Select a program and enter your GPA to calculate fees</p>
        </div>
      )}
    </div>
  );
};

FeeCalculator.propTypes = {
  programs: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    duration: PropTypes.string.isRequired,
    level: PropTypes.string.isRequired,
    fees: PropTypes.shape({
      tuitionPerYear: PropTypes.number.isRequired,
      hostel: PropTypes.number,
      mess: PropTypes.number,
      registration: PropTypes.number,
      other: PropTypes.number,
    }).isRequired,
  })).isRequired,
  scholarshipRules: PropTypes.arrayOf(PropTypes.shape({
    country: PropTypes.string.isRequired,
    gpaMin: PropTypes.number.isRequired,
    gpaMax: PropTypes.number.isRequired,
    percentage: PropTypes.number.isRequired,
  })).isRequired,
  userCountry: PropTypes.string,
  className: PropTypes.string,
};

export default FeeCalculator;
