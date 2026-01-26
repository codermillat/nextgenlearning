import WhatsAppCTA from './WhatsAppCTA';

/**
 * WhatsAppCTA Component Examples
 * Feature: sharda-university-content-enhancement
 * 
 * This file demonstrates various usage patterns for the WhatsAppCTA component.
 */

// Example 1: Basic Usage - Landing Page
export function BasicWhatsAppCTA() {
  return (
    <div className="p-8 bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">Basic WhatsApp CTA</h2>
      <WhatsAppCTA
        context="landing"
        contentType="landing"
      />
    </div>
  );
}

// Example 2: Program-Specific WhatsApp CTA
export function ProgramWhatsAppCTA() {
  return (
    <div className="p-8 bg-white">
      <h2 className="text-2xl font-bold mb-4">B.Tech Computer Science Engineering</h2>
      <p className="mb-4">Duration: 4 Years | Fees: ₹2,50,000/year</p>
      <WhatsAppCTA
        variant="button"
        context="program-btech-cse"
        program="B.Tech Computer Science Engineering"
        contentType="program"
        position="content"
      />
    </div>
  );
}

// Example 3: Floating WhatsApp Button
export function FloatingWhatsAppCTA() {
  return (
    <div className="relative h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="p-8">
        <h1 className="text-4xl font-bold mb-4">Sharda University</h1>
        <p className="text-lg">Scroll down to see the floating WhatsApp button...</p>
      </div>
      
      {/* Floating button - appears at bottom-left */}
      <WhatsAppCTA
        variant="floating"
        context="landing"
        contentType="landing"
        position="sticky"
      />
    </div>
  );
}

// Example 4: Inline Style (Light Background)
export function InlineWhatsAppCTA() {
  return (
    <div className="p-8 bg-white">
      <h2 className="text-2xl font-bold mb-4">Fee Calculator Results</h2>
      <div className="bg-gray-50 p-6 rounded-lg mb-4">
        <p className="text-lg font-semibold">Total Fees: ₹8,00,000 (4 years)</p>
        <p className="text-sm text-gray-600">After 50% scholarship</p>
      </div>
      <div className="flex gap-4">
        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg">
          Apply Now
        </button>
        <WhatsAppCTA
          variant="inline"
          context="fee-calculator"
          contentType="calculator"
          position="content"
        >
          Discuss Fees on WhatsApp
        </WhatsAppCTA>
      </div>
    </div>
  );
}

// Example 5: Bangladesh-Specific Section
export function BangladeshWhatsAppCTA() {
  return (
    <div className="p-8 bg-gradient-to-r from-green-50 to-blue-50">
      <h2 className="text-3xl font-bold mb-4">Study at Sharda from Bangladesh</h2>
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Special Scholarships</h3>
        <ul className="list-disc list-inside space-y-1 text-gray-700">
          <li>50% scholarship for GPA 3.5-5.0</li>
          <li>20% scholarship for GPA 3.0-3.4</li>
        </ul>
      </div>
      <WhatsAppCTA
        variant="button"
        context="bangladesh"
        contentType="bangladesh-section"
        position="content"
      >
        Connect with Bangladesh Admissions Team
      </WhatsAppCTA>
      <p className="text-sm text-gray-600 mt-2">
        WhatsApp: +91 88009 96151
      </p>
    </div>
  );
}

// Example 6: Multiple CTAs on Same Page
export function MultipleWhatsAppCTAs() {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-12">
        <h1 className="text-4xl font-bold mb-4">Welcome to Sharda University</h1>
        <p className="text-xl mb-6">Join students from 95+ countries</p>
        <div className="flex gap-4">
          <button className="px-8 py-3 bg-white text-blue-600 rounded-lg font-bold">
            Apply Now
          </button>
          <WhatsAppCTA
            variant="button"
            context="landing"
            contentType="landing"
            position="hero"
          />
        </div>
      </section>

      {/* Programs Section */}
      <section className="p-8 bg-white">
        <h2 className="text-3xl font-bold mb-6">Explore Our Programs</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="border rounded-lg p-4">
            <h3 className="font-bold">Engineering</h3>
            <p className="text-sm text-gray-600">20+ programs</p>
          </div>
          <div className="border rounded-lg p-4">
            <h3 className="font-bold">Management</h3>
            <p className="text-sm text-gray-600">15+ programs</p>
          </div>
          <div className="border rounded-lg p-4">
            <h3 className="font-bold">Medical</h3>
            <p className="text-sm text-gray-600">10+ programs</p>
          </div>
        </div>
        <WhatsAppCTA
          variant="inline"
          context="program-finder"
          contentType="landing"
          position="content"
        >
          Need Help Choosing? Chat with Us
        </WhatsAppCTA>
      </section>

      {/* Testimonials Section */}
      <section className="p-8 bg-gray-50">
        <h2 className="text-3xl font-bold mb-6">Student Success Stories</h2>
        <div className="bg-white p-6 rounded-lg mb-4">
          <p className="italic mb-2">"Sharda University changed my life..."</p>
          <p className="text-sm text-gray-600">- Ahmed, Bangladesh, B.Tech CSE 2023</p>
        </div>
        <WhatsAppCTA
          variant="button"
          context="testimonial"
          contentType="landing"
          position="content"
        >
          Share Your Story
        </WhatsAppCTA>
      </section>

      {/* Floating Button */}
      <WhatsAppCTA
        variant="floating"
        context="landing"
        contentType="landing"
        position="sticky"
      />
    </div>
  );
}

// Example 7: Custom Styled WhatsApp CTA
export function CustomStyledWhatsAppCTA() {
  return (
    <div className="p-8 bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">Custom Styled WhatsApp CTA</h2>
      <WhatsAppCTA
        variant="button"
        context="landing"
        contentType="landing"
        className="!bg-purple-600 hover:!bg-purple-700 !text-white"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
        <span>Custom Purple WhatsApp</span>
      </WhatsAppCTA>
    </div>
  );
}

// Example 8: Comparison Page WhatsApp CTA
export function ComparisonWhatsAppCTA() {
  return (
    <div className="p-8 bg-white">
      <h2 className="text-2xl font-bold mb-4">University Comparison</h2>
      <table className="w-full mb-6 border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Feature</th>
            <th className="p-2 border">Sharda University</th>
            <th className="p-2 border">Other University</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="p-2 border">NIRF Ranking</td>
            <td className="p-2 border font-bold">151-200</td>
            <td className="p-2 border">201-250</td>
          </tr>
          <tr>
            <td className="p-2 border">International Students</td>
            <td className="p-2 border font-bold">95+ countries</td>
            <td className="p-2 border">50+ countries</td>
          </tr>
        </tbody>
      </table>
      <div className="flex gap-4">
        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg">
          Apply to Sharda
        </button>
        <WhatsAppCTA
          variant="inline"
          context="comparison"
          contentType="comparison"
          position="content"
        >
          Compare with Counselor
        </WhatsAppCTA>
      </div>
    </div>
  );
}

// Example 9: Ranking Page WhatsApp CTA
export function RankingWhatsAppCTA() {
  return (
    <div className="p-8 bg-gradient-to-b from-blue-50 to-white">
      <h1 className="text-3xl font-bold mb-4">Sharda University Rankings</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="font-bold text-lg mb-2">NIRF Ranking 2024</h3>
          <p className="text-3xl font-bold text-blue-600">151-200</p>
          <p className="text-sm text-gray-600">Overall Category</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="font-bold text-lg mb-2">QS Asia 2024</h3>
          <p className="text-3xl font-bold text-blue-600">351-400</p>
          <p className="text-sm text-gray-600">Asian Universities</p>
        </div>
      </div>
      <WhatsAppCTA
        variant="button"
        context="ranking"
        contentType="ranking"
        position="content"
      >
        Learn More About Our Rankings
      </WhatsAppCTA>
    </div>
  );
}

// Example 10: Scholarship Page WhatsApp CTA
export function ScholarshipWhatsAppCTA() {
  return (
    <div className="p-8 bg-white">
      <h2 className="text-2xl font-bold mb-4">Scholarship Opportunities</h2>
      <div className="space-y-4 mb-6">
        <div className="border-l-4 border-green-500 pl-4">
          <h3 className="font-bold">Merit Scholarship</h3>
          <p className="text-sm text-gray-600">Up to 50% tuition fee waiver</p>
        </div>
        <div className="border-l-4 border-blue-500 pl-4">
          <h3 className="font-bold">Sports Scholarship</h3>
          <p className="text-sm text-gray-600">For national/international players</p>
        </div>
        <div className="border-l-4 border-purple-500 pl-4">
          <h3 className="font-bold">Need-Based Scholarship</h3>
          <p className="text-sm text-gray-600">Financial assistance available</p>
        </div>
      </div>
      <WhatsAppCTA
        variant="button"
        context="scholarship"
        contentType="scholarship"
        position="content"
      >
        Check Your Scholarship Eligibility
      </WhatsAppCTA>
    </div>
  );
}

// Export all examples
export default {
  BasicWhatsAppCTA,
  ProgramWhatsAppCTA,
  FloatingWhatsAppCTA,
  InlineWhatsAppCTA,
  BangladeshWhatsAppCTA,
  MultipleWhatsAppCTAs,
  CustomStyledWhatsAppCTA,
  ComparisonWhatsAppCTA,
  RankingWhatsAppCTA,
  ScholarshipWhatsAppCTA,
};
