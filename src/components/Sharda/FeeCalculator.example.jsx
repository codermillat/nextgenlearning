import FeeCalculator from './FeeCalculator';
import { shardaPrograms, scholarshipRules } from '../../data/shardaData';

/**
 * FeeCalculator Component Examples
 * Feature: sharda-university-content-enhancement
 * 
 * Demonstrates various usage scenarios for the FeeCalculator component.
 */

// Example 1: Basic Usage with Default Country
export const BasicFeeCalculator = () => (
  <div className="max-w-4xl mx-auto p-6">
    <FeeCalculator
      programs={shardaPrograms}
      scholarshipRules={scholarshipRules}
    />
  </div>
);

// Example 2: Fee Calculator for Bangladeshi Students
export const BangladeshiFeeCalculator = () => (
  <div className="max-w-4xl mx-auto p-6">
    <FeeCalculator
      programs={shardaPrograms}
      scholarshipRules={scholarshipRules}
      userCountry="Bangladesh"
    />
  </div>
);

// Example 3: Fee Calculator for Indian Students
export const IndianFeeCalculator = () => (
  <div className="max-w-4xl mx-auto p-6">
    <FeeCalculator
      programs={shardaPrograms}
      scholarshipRules={scholarshipRules}
      userCountry="India"
    />
  </div>
);

// Example 4: Fee Calculator with Custom Styling
export const StyledFeeCalculator = () => (
  <div className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-blue-50 to-indigo-50 min-h-screen">
    <FeeCalculator
      programs={shardaPrograms}
      scholarshipRules={scholarshipRules}
      userCountry="Bangladesh"
      className="shadow-3xl"
    />
  </div>
);

// Example 5: Fee Calculator in a Landing Page Section
export const LandingPageFeeCalculator = () => (
  <section className="py-16 bg-gray-50">
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Calculate Your Investment
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Get an instant estimate of your total fees including scholarship benefits
        </p>
      </div>
      
      <div className="max-w-4xl mx-auto">
        <FeeCalculator
          programs={shardaPrograms}
          scholarshipRules={scholarshipRules}
          userCountry="Bangladesh"
        />
      </div>
      
      <div className="mt-12 text-center">
        <p className="text-gray-600">
          Have questions about fees? <a href="#contact" className="text-blue-600 hover:underline">Contact our admissions team</a>
        </p>
      </div>
    </div>
  </section>
);

// Example 6: Fee Calculator with Limited Programs (Engineering Only)
export const EngineeringFeeCalculator = () => {
  const engineeringPrograms = shardaPrograms.filter(p => p.discipline === 'Engineering');
  
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">
        Engineering Programs Fee Calculator
      </h2>
      <FeeCalculator
        programs={engineeringPrograms}
        scholarshipRules={scholarshipRules}
        userCountry="Bangladesh"
      />
    </div>
  );
};

// Example 7: Side-by-Side Comparison (Two Calculators)
export const ComparisonCalculators = () => (
  <div className="container mx-auto p-6">
    <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
      Compare Fees by Country
    </h2>
    <div className="grid md:grid-cols-2 gap-8">
      <div>
        <h3 className="text-xl font-semibold mb-4 text-center">Bangladesh Students</h3>
        <FeeCalculator
          programs={shardaPrograms}
          scholarshipRules={scholarshipRules}
          userCountry="Bangladesh"
        />
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-4 text-center">Indian Students</h3>
        <FeeCalculator
          programs={shardaPrograms}
          scholarshipRules={scholarshipRules}
          userCountry="India"
        />
      </div>
    </div>
  </div>
);

// Example 8: Mobile-Optimized Layout
export const MobileFeeCalculator = () => (
  <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-4">
    <div className="max-w-lg mx-auto">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Fee Calculator
        </h1>
        <p className="text-gray-600">
          Calculate your fees on the go
        </p>
      </div>
      
      <FeeCalculator
        programs={shardaPrograms}
        scholarshipRules={scholarshipRules}
        userCountry="Bangladesh"
      />
    </div>
  </div>
);

export default {
  BasicFeeCalculator,
  BangladeshiFeeCalculator,
  IndianFeeCalculator,
  StyledFeeCalculator,
  LandingPageFeeCalculator,
  EngineeringFeeCalculator,
  ComparisonCalculators,
  MobileFeeCalculator,
};
