/**
 * ApplicationCTA Component Examples
 * Feature: sharda-university-content-enhancement
 * 
 * This file demonstrates various use cases for the ApplicationCTA component.
 * Copy and adapt these examples for your specific needs.
 */

import ApplicationCTA from './ApplicationCTA';

// ============================================================================
// Example 1: Landing Page Hero CTA
// ============================================================================
export function LandingPageHeroExample() {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Study at Sharda University
        </h1>
        <p className="text-xl md:text-2xl mb-8">
          Join students from 95+ countries in India's leading international university
        </p>
        <ApplicationCTA
          variant="secondary"
          source="landing"
          context="landing"
          location="hero"
          country="Bangladesh"
        >
          Start Your Application
        </ApplicationCTA>
      </div>
    </div>
  );
}

// ============================================================================
// Example 2: Program Page CTA
// ============================================================================
export function ProgramPageExample() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-4">
        B.Tech Computer Science Engineering
      </h2>
      <div className="bg-gray-100 p-6 rounded-lg mb-6">
        <p className="text-lg mb-2"><strong>Duration:</strong> 4 Years</p>
        <p className="text-lg mb-2"><strong>Fees:</strong> ₹2,50,000/year</p>
        <p className="text-lg mb-2"><strong>Eligibility:</strong> 60% in 12th with Physics, Chemistry, Mathematics</p>
      </div>
      <ApplicationCTA
        variant="primary"
        source="program-btech-cse"
        context="program"
        program="btech-cse"
        location="content"
        country="Nepal"
      >
        Apply for B.Tech CSE
      </ApplicationCTA>
    </div>
  );
}

// ============================================================================
// Example 3: Fee Calculator Result CTA
// ============================================================================
export function FeeCalculatorResultExample() {
  const calculatedFees = {
    baseFee: 250000,
    scholarship: 50,
    finalAmount: 125000,
    program: 'btech-cse',
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h3 className="text-2xl font-bold mb-4">Your Fee Calculation</h3>
      <div className="space-y-3 mb-6">
        <div className="flex justify-between">
          <span>Base Tuition Fee:</span>
          <span className="font-semibold">₹{calculatedFees.baseFee.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-green-600">
          <span>Scholarship ({calculatedFees.scholarship}%):</span>
          <span className="font-semibold">-₹{(calculatedFees.baseFee * calculatedFees.scholarship / 100).toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-xl font-bold border-t pt-3">
          <span>Final Amount:</span>
          <span>₹{calculatedFees.finalAmount.toLocaleString()}</span>
        </div>
      </div>
      <ApplicationCTA
        variant="primary"
        source="fee-calculator"
        context="calculator"
        program={calculatedFees.program}
        action="apply-with-calculation"
        location="calculator-result"
        country="Bangladesh"
      >
        Apply with This Program
      </ApplicationCTA>
    </div>
  );
}

// ============================================================================
// Example 4: Comparison Page CTA
// ============================================================================
export function ComparisonPageExample() {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">University Comparison</h2>
      <div className="overflow-x-auto mb-6">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-3 text-left">Feature</th>
              <th className="border p-3 text-left bg-blue-50">Sharda University</th>
              <th className="border p-3 text-left">Other University</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border p-3">NIRF Ranking</td>
              <td className="border p-3 bg-blue-50 font-semibold">101-150</td>
              <td className="border p-3">151-200</td>
            </tr>
            <tr>
              <td className="border p-3">International Students</td>
              <td className="border p-3 bg-blue-50 font-semibold">95+ countries</td>
              <td className="border p-3">50+ countries</td>
            </tr>
            <tr>
              <td className="border p-3">Hospital Facility</td>
              <td className="border p-3 bg-blue-50 font-semibold">1600+ beds</td>
              <td className="border p-3">Not available</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="text-center">
        <ApplicationCTA
          variant="primary"
          source="comparison-sharda-vs-others"
          context="comparison"
          location="comparison-result"
          country="Bangladesh"
        >
          Apply to Sharda University
        </ApplicationCTA>
      </div>
    </div>
  );
}

// ============================================================================
// Example 5: Multiple CTAs on Same Page
// ============================================================================
export function MultipleCtasExample() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Hero Section */}
      <section className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Welcome to Sharda University</h1>
        <p className="text-lg mb-6">Discover world-class education in India</p>
        <ApplicationCTA
          variant="primary"
          source="landing"
          context="landing"
          location="hero"
          country="Bangladesh"
        >
          Apply Now
        </ApplicationCTA>
      </section>

      {/* Content Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-4">Why Choose Sharda?</h2>
        <ul className="list-disc list-inside mb-6 space-y-2">
          <li>Students from 95+ countries</li>
          <li>NIRF Ranked 101-150</li>
          <li>1600+ bed hospital facility</li>
          <li>600+ recruiting companies</li>
        </ul>
        <ApplicationCTA
          variant="primary"
          source="landing"
          context="landing"
          location="content"
          country="Bangladesh"
        >
          Start Your Journey
        </ApplicationCTA>
      </section>

      {/* Footer Section */}
      <section className="bg-gray-100 p-6 rounded-lg">
        <h3 className="text-2xl font-bold mb-4">Ready to Apply?</h3>
        <p className="mb-4">Join thousands of international students at Sharda University</p>
        <ApplicationCTA
          variant="primary"
          source="landing"
          context="landing"
          location="footer"
          country="Bangladesh"
        >
          Apply Now
        </ApplicationCTA>
      </section>

      {/* Floating CTA (always visible) */}
      <ApplicationCTA
        variant="floating"
        source="landing"
        context="landing"
        location="floating"
        country="Bangladesh"
      />
    </div>
  );
}

// ============================================================================
// Example 6: Bangladesh-Specific Content
// ============================================================================
export function BangladeshSectionExample() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Study at Sharda from Bangladesh</h2>
      
      <div className="bg-green-50 border-l-4 border-green-500 p-6 mb-6">
        <h3 className="text-xl font-bold mb-3">Special Scholarships for Bangladeshi Students</h3>
        <ul className="space-y-2">
          <li>✓ <strong>50% scholarship</strong> for GPA 3.5-5.0</li>
          <li>✓ <strong>20% scholarship</strong> for GPA 3.0-3.4</li>
          <li>✓ Easy HSC certificate equivalence process</li>
          <li>✓ Dedicated Bangladesh admissions support</li>
        </ul>
      </div>

      <div className="mb-6">
        <h3 className="text-2xl font-bold mb-4">Why Bangladeshi Students Choose Sharda</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <h4 className="font-bold mb-2">🌍 Cultural Compatibility</h4>
            <p>Similar climate, halal food, prayer facilities</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h4 className="font-bold mb-2">📍 Proximity</h4>
            <p>Close to Bangladesh, easy travel</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h4 className="font-bold mb-2">🎓 Quality Education</h4>
            <p>NIRF ranked, internationally recognized</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h4 className="font-bold mb-2">💼 Career Opportunities</h4>
            <p>600+ recruiting companies</p>
          </div>
        </div>
      </div>

      <ApplicationCTA
        variant="primary"
        source="bangladesh-section"
        context="bangladesh"
        action="scholarship"
        location="content"
        country="Bangladesh"
      >
        Apply with Scholarship
      </ApplicationCTA>
    </div>
  );
}

// ============================================================================
// Example 7: Ranking Page CTA
// ============================================================================
export function RankingPageExample() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-6">Sharda University Rankings</h1>
      
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-bold mb-2">NIRF Ranking 2024</h3>
          <p className="text-4xl font-bold text-blue-600 mb-2">101-150</p>
          <p className="text-gray-600">National Institutional Ranking Framework</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-bold mb-2">QS Asia Ranking</h3>
          <p className="text-4xl font-bold text-blue-600 mb-2">351-400</p>
          <p className="text-gray-600">Among top universities in Asia</p>
        </div>
      </div>

      <div className="text-center">
        <p className="text-lg mb-6">
          Join a top-ranked university with students from 95+ countries
        </p>
        <ApplicationCTA
          variant="primary"
          source="rankings"
          context="rankings"
          location="content"
          country="Bangladesh"
        >
          Apply to Sharda University
        </ApplicationCTA>
      </div>
    </div>
  );
}

// ============================================================================
// Example 8: FAQ Section with CTA
// ============================================================================
export function FaqSectionExample() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
      
      <div className="space-y-4 mb-8">
        <details className="bg-white p-4 rounded-lg shadow">
          <summary className="font-bold cursor-pointer">
            What are the admission requirements?
          </summary>
          <p className="mt-3 text-gray-700">
            For undergraduate programs, you need 60% in 12th grade with relevant subjects. 
            International students should have equivalent qualifications.
          </p>
        </details>

        <details className="bg-white p-4 rounded-lg shadow">
          <summary className="font-bold cursor-pointer">
            Are scholarships available for international students?
          </summary>
          <p className="mt-3 text-gray-700">
            Yes! Bangladeshi students can get up to 50% scholarship based on their GPA. 
            Other international students may also qualify for merit-based scholarships.
          </p>
          <div className="mt-4">
            <ApplicationCTA
              variant="primary"
              source="faq"
              context="faq"
              action="scholarship"
              location="faq-answer"
              country="Bangladesh"
              className="text-sm"
            >
              Apply for Scholarship
            </ApplicationCTA>
          </div>
        </details>

        <details className="bg-white p-4 rounded-lg shadow">
          <summary className="font-bold cursor-pointer">
            What is the application process?
          </summary>
          <p className="mt-3 text-gray-700">
            The application process is simple: submit your documents online, get your 
            eligibility verified, receive your offer letter, and complete visa formalities.
          </p>
          <div className="mt-4">
            <ApplicationCTA
              variant="primary"
              source="faq"
              context="faq"
              action="admission"
              location="faq-answer"
              country="Bangladesh"
              className="text-sm"
            >
              Start Application
            </ApplicationCTA>
          </div>
        </details>
      </div>
    </div>
  );
}

// ============================================================================
// Example 9: Custom Styled CTA
// ============================================================================
export function CustomStyledExample() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Custom Styled CTAs</h2>
      
      <div className="space-y-6">
        {/* Large CTA */}
        <ApplicationCTA
          variant="primary"
          source="landing"
          context="landing"
          location="hero"
          country="Bangladesh"
          className="w-full text-2xl py-6"
        >
          🎓 Apply Now - Limited Seats Available
        </ApplicationCTA>

        {/* Compact CTA */}
        <ApplicationCTA
          variant="secondary"
          source="landing"
          context="landing"
          location="content"
          country="Bangladesh"
          className="text-sm px-4 py-2"
        >
          Learn More →
        </ApplicationCTA>

        {/* Full Width CTA */}
        <ApplicationCTA
          variant="primary"
          source="landing"
          context="landing"
          location="footer"
          country="Bangladesh"
          className="w-full justify-center"
        >
          Start Your Application Today
        </ApplicationCTA>
      </div>
    </div>
  );
}

// ============================================================================
// Example 10: Accessibility-Focused CTA
// ============================================================================
export function AccessibilityExample() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Accessible CTA Examples</h2>
      
      <div className="space-y-6">
        {/* With custom aria-label */}
        <ApplicationCTA
          variant="primary"
          source="program-btech-cse"
          context="program"
          program="btech-cse"
          location="content"
          country="Bangladesh"
          ariaLabel="Apply for Bachelor of Technology in Computer Science Engineering at Sharda University"
        >
          Apply for B.Tech CSE
        </ApplicationCTA>

        {/* With descriptive text */}
        <ApplicationCTA
          variant="primary"
          source="landing"
          context="landing"
          location="content"
          country="Bangladesh"
          ariaLabel="Start your application process for Sharda University admission 2026-27"
        >
          Apply for Admission 2026-27
        </ApplicationCTA>
      </div>
    </div>
  );
}
