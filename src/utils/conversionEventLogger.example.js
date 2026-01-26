/**
 * Example usage of ConversionEventLogger
 * Feature: sharda-university-content-enhancement
 * 
 * This file demonstrates how to use the ConversionEventLogger utility
 * in various components and scenarios.
 */

import React, { useEffect, useState } from 'react';
import {
  logCTAClick,
  logWhatsAppClick,
  logCalculatorUsage,
  logPageView,
  initPageTracking,
  initScrollDepthTracking,
  initTimeOnPageTracking,
} from './conversionEventLogger';
import { generateProgramPageLink } from './utmGenerator';

// ============================================================================
// Example 1: Landing Page with Full Tracking
// ============================================================================

export function ShardaLandingPageExample() {
  useEffect(() => {
    // Initialize all tracking for the landing page
    // This will:
    // 1. Log initial page view
    // 2. Track scroll depth (25%, 50%, 75%, 100%)
    // 3. Track time on page every 30 seconds
    const cleanup = initPageTracking({
      contentType: 'landing',
      category: 'sharda-content',
    });

    // Cleanup on unmount
    return cleanup;
  }, []);

  return (
    <div>
      <h1>Sharda University - Study in India</h1>
      {/* Page content */}
    </div>
  );
}

// ============================================================================
// Example 2: Application CTA Button with Click Tracking
// ============================================================================

export function ApplicationCTAExample({ program = 'btech-cse', location = 'hero' }) {
  const handleClick = () => {
    // Generate UTM-tracked link
    const targetUrl = generateProgramPageLink('Bangladesh', program);

    // Log the CTA click
    logCTAClick({
      ctaType: 'apply-now',
      ctaLocation: location,
      targetUrl: targetUrl,
      program: program,
      contentType: 'landing',
    });

    // Navigate to the application page
    window.open(targetUrl, '_blank');
  };

  return (
    <button
      onClick={handleClick}
      className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
    >
      Apply Now
    </button>
  );
}

// ============================================================================
// Example 3: WhatsApp CTA with Context-Aware Tracking
// ============================================================================

export function WhatsAppCTAExample({ program, context = 'landing' }) {
  const phoneNumber = '+91 88009 96151';
  const message = program
    ? `I'm interested in ${program} at Sharda University`
    : "I'm interested in studying at Sharda University";

  const handleWhatsAppClick = () => {
    // Log WhatsApp click
    logWhatsAppClick({
      phoneNumber: phoneNumber,
      message: message,
      context: context,
      program: program,
      contentType: context,
    });

    // Open WhatsApp
    const whatsappUrl = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <button
      onClick={handleWhatsAppClick}
      className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 flex items-center gap-2"
    >
      <span>💬</span>
      <span>Chat on WhatsApp</span>
    </button>
  );
}

// ============================================================================
// Example 4: Fee Calculator with Usage Tracking
// ============================================================================

export function FeeCalculatorExample() {
  const [program, setProgram] = useState('B.Tech CSE');
  const [gpa, setGpa] = useState('');
  const [country, setCountry] = useState('Bangladesh');
  const [result, setResult] = useState(null);

  const calculateFees = () => {
    // Perform calculation
    const baseFee = 400000;
    const gpaValue = parseFloat(gpa);
    let scholarshipPercentage = 0;

    if (country === 'Bangladesh') {
      if (gpaValue >= 3.5) {
        scholarshipPercentage = 50;
      } else if (gpaValue >= 3.0) {
        scholarshipPercentage = 20;
      }
    }

    const scholarshipAmount = (baseFee * scholarshipPercentage) / 100;
    const finalAmount = baseFee - scholarshipAmount;

    const calculationResult = {
      baseFee,
      scholarshipPercentage,
      scholarshipAmount,
      finalAmount,
    };

    setResult(calculationResult);

    // Log calculator usage
    logCalculatorUsage({
      program: program,
      gpa: gpaValue,
      country: country,
      baseFee: baseFee,
      scholarshipPercentage: scholarshipPercentage,
      finalAmount: finalAmount,
      action: 'calculate',
    });
  };

  const handleApply = () => {
    if (!result) return;

    // Log calculator usage with apply action
    logCalculatorUsage({
      program: program,
      gpa: parseFloat(gpa),
      country: country,
      baseFee: result.baseFee,
      scholarshipPercentage: result.scholarshipPercentage,
      finalAmount: result.finalAmount,
      action: 'apply',
    });

    // Generate and open application link
    const targetUrl = generateProgramPageLink(country, 'btech-cse');
    window.open(targetUrl, '_blank');
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Fee Calculator</h2>

      <div className="space-y-4">
        <div>
          <label className="block mb-2">Program</label>
          <select
            value={program}
            onChange={(e) => setProgram(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option>B.Tech CSE</option>
            <option>B.Tech AI & IoT</option>
            <option>MBA</option>
          </select>
        </div>

        <div>
          <label className="block mb-2">GPA</label>
          <input
            type="number"
            step="0.1"
            value={gpa}
            onChange={(e) => setGpa(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Enter your GPA"
          />
        </div>

        <div>
          <label className="block mb-2">Country</label>
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option>Bangladesh</option>
            <option>Nepal</option>
            <option>Other</option>
          </select>
        </div>

        <button
          onClick={calculateFees}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Calculate Fees
        </button>

        {result && (
          <div className="mt-4 p-4 bg-gray-50 rounded">
            <h3 className="font-bold mb-2">Calculation Result</h3>
            <p>Base Fee: ₹{result.baseFee.toLocaleString()}</p>
            <p>Scholarship: {result.scholarshipPercentage}%</p>
            <p>Discount: ₹{result.scholarshipAmount.toLocaleString()}</p>
            <p className="font-bold text-lg mt-2">
              Final Amount: ₹{result.finalAmount.toLocaleString()}
            </p>

            <button
              onClick={handleApply}
              className="w-full mt-4 bg-green-600 text-white py-2 rounded hover:bg-green-700"
            >
              Apply Now
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================================
// Example 5: Program Page with Specific Tracking
// ============================================================================

export function ProgramPageExample({ programCode = 'btech-cse' }) {
  useEffect(() => {
    // Log page view with program context
    logPageView({
      contentType: 'program',
      program: programCode,
      category: 'sharda-programs',
    });

    // Initialize scroll depth tracking
    const cleanupScroll = initScrollDepthTracking('program');

    // Initialize time on page tracking (log every 30 seconds)
    const cleanupTime = initTimeOnPageTracking('program', 30);

    // Cleanup on unmount
    return () => {
      cleanupScroll();
      cleanupTime();
    };
  }, [programCode]);

  return (
    <div>
      <h1>B.Tech Computer Science Engineering</h1>
      {/* Program details */}
    </div>
  );
}

// ============================================================================
// Example 6: Multiple CTAs on Same Page
// ============================================================================

export function MultiCTAPageExample() {
  const program = 'btech-cse';

  const handleHeroCTA = () => {
    const targetUrl = generateProgramPageLink('Bangladesh', program);
    logCTAClick({
      ctaType: 'apply-now',
      ctaLocation: 'hero',
      targetUrl: targetUrl,
      program: program,
      contentType: 'landing',
    });
    window.open(targetUrl, '_blank');
  };

  const handleFooterCTA = () => {
    const targetUrl = generateProgramPageLink('Bangladesh', program);
    logCTAClick({
      ctaType: 'apply-now',
      ctaLocation: 'footer',
      targetUrl: targetUrl,
      program: program,
      contentType: 'landing',
    });
    window.open(targetUrl, '_blank');
  };

  const handleFloatingCTA = () => {
    const targetUrl = generateProgramPageLink('Bangladesh', program);
    logCTAClick({
      ctaType: 'apply-now',
      ctaLocation: 'floating',
      targetUrl: targetUrl,
      program: program,
      contentType: 'landing',
    });
    window.open(targetUrl, '_blank');
  };

  return (
    <div>
      {/* Hero CTA */}
      <section className="hero">
        <button onClick={handleHeroCTA}>Apply Now - Hero</button>
      </section>

      {/* Content */}
      <section className="content">{/* Page content */}</section>

      {/* Footer CTA */}
      <footer>
        <button onClick={handleFooterCTA}>Apply Now - Footer</button>
      </footer>

      {/* Floating CTA */}
      <div className="fixed bottom-4 right-4">
        <button onClick={handleFloatingCTA}>Apply Now</button>
      </div>
    </div>
  );
}

// ============================================================================
// Example 7: Manual Scroll Depth Tracking (Custom Implementation)
// ============================================================================

export function CustomScrollTrackingExample() {
  useEffect(() => {
    // If you need custom scroll tracking logic
    const cleanup = initScrollDepthTracking('custom-page');

    // The utility automatically tracks 25%, 50%, 75%, 100%
    // But you can also log custom scroll events if needed

    return cleanup;
  }, []);

  return <div>{/* Page content */}</div>;
}

// ============================================================================
// Example 8: Comparison Page with Multiple University CTAs
// ============================================================================

export function ComparisonPageExample() {
  const handleShardaCTA = () => {
    const targetUrl = generateProgramPageLink('Bangladesh', 'btech-cse');
    logCTAClick({
      ctaType: 'apply-now',
      ctaLocation: 'comparison-table',
      targetUrl: targetUrl,
      program: 'btech-cse',
      contentType: 'comparison',
    });
    window.open(targetUrl, '_blank');
  };

  useEffect(() => {
    // Track comparison page view
    logPageView({
      contentType: 'comparison',
      category: 'university-comparison',
    });
  }, []);

  return (
    <div>
      <h1>University Comparison</h1>
      <table>
        <thead>
          <tr>
            <th>Feature</th>
            <th>Sharda University</th>
            <th>Other University</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Ranking</td>
            <td>NIRF Band 101-150</td>
            <td>NIRF Band 151-200</td>
          </tr>
          {/* More rows */}
        </tbody>
      </table>

      <button onClick={handleShardaCTA} className="mt-4 bg-blue-600 text-white px-6 py-3 rounded">
        Apply to Sharda University
      </button>
    </div>
  );
}

// ============================================================================
// Example 9: Bangladesh-Specific Content with Tracking
// ============================================================================

export function BangladeshSectionExample() {
  useEffect(() => {
    // Track Bangladesh-specific content view
    logPageView({
      contentType: 'bangladesh',
      category: 'country-specific',
    });
  }, []);

  const handleScholarshipCTA = () => {
    const targetUrl = generateProgramPageLink('Bangladesh', 'btech-cse');
    logCTAClick({
      ctaType: 'learn-more',
      ctaLocation: 'scholarship-section',
      targetUrl: targetUrl,
      contentType: 'bangladesh',
    });
    window.open(targetUrl, '_blank');
  };

  return (
    <div>
      <h2>Study at Sharda from Bangladesh</h2>
      <p>Special scholarships for Bangladeshi students:</p>
      <ul>
        <li>50% scholarship for GPA 3.5-5.0</li>
        <li>20% scholarship for GPA 3.0-3.4</li>
      </ul>
      <button onClick={handleScholarshipCTA}>Learn More</button>
    </div>
  );
}

// ============================================================================
// Example 10: Error Handling and Graceful Degradation
// ============================================================================

export function RobustTrackingExample() {
  const handleCTAClick = () => {
    try {
      // Tracking should never break the application
      logCTAClick({
        ctaType: 'apply-now',
        ctaLocation: 'hero',
        targetUrl: 'https://global.sharda.ac.in/',
        program: 'btech-cse',
        contentType: 'landing',
      });
    } catch (error) {
      // Log error but don't break the flow
      console.error('Tracking error:', error);
    }

    // Continue with the actual action
    window.open('https://global.sharda.ac.in/', '_blank');
  };

  return <button onClick={handleCTAClick}>Apply Now</button>;
}

export default {
  ShardaLandingPageExample,
  ApplicationCTAExample,
  WhatsAppCTAExample,
  FeeCalculatorExample,
  ProgramPageExample,
  MultiCTAPageExample,
  CustomScrollTrackingExample,
  ComparisonPageExample,
  BangladeshSectionExample,
  RobustTrackingExample,
};
