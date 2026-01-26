/**
 * Sharda University B.Tech CSE Fees Page
 * Feature: sharda-university-content-enhancement
 * 
 * SEO-optimized page targeting "sharda university b.tech cse fees" keyword
 * Requirements: 3.1, 3.7
 */

import { Link } from 'react-router-dom';
import { shardaPrograms, scholarshipRules } from '../../data/shardaData';
import SEOMetaTags from '../../components/SEO/SEOMetaTags';
import StructuredData from '../../components/SEO/StructuredData';
import ApplicationCTA from '../../components/Sharda/ApplicationCTA';
import WhatsAppCTA from '../../components/Sharda/WhatsAppCTA';
import FeeCalculator from '../../components/Sharda/FeeCalculator';

const ShardaBTechCSEFees = () => {
  // Get B.Tech CSE program data
  const btechCSE = shardaPrograms.find(p => p.id === 'btech-cse');
  
  if (!btechCSE) {
    return <div>Program not found</div>;
  }

  // Structured data for the page
  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: btechCSE.name,
    description: 'B.Tech in Computer Science and Engineering at Sharda University with comprehensive fee structure and scholarship opportunities',
    provider: {
      '@type': 'EducationalOrganization',
      name: 'Sharda University',
      url: 'https://global.sharda.ac.in/',
    },
    offers: {
      '@type': 'Offer',
      category: 'Tuition Fees',
      price: btechCSE.fees.tuitionPerYear,
      priceCurrency: 'INR',
    },
    educationalCredentialAwarded: 'Bachelor of Technology',
    timeToComplete: 'P4Y',
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: window.location.origin,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Sharda University',
        item: `${window.location.origin}/sharda`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'B.Tech CSE Fees',
        item: window.location.href,
      },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is the total fee for B.Tech CSE at Sharda University?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The total 4-year fee for B.Tech CSE is ₹10.6 Lakhs, which includes tuition (₹8.8L), hostel (₹3.2L), mess (₹2.4L), registration (₹25K), and other fees (₹60K). Bangladeshi students can get up to 50% scholarship on tuition fees.',
        },
      },
      {
        '@type': 'Question',
        name: 'How much scholarship can Bangladeshi students get?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Bangladeshi students with HSC GPA 3.5-5.0 receive 50% scholarship (₹4.4L savings over 4 years), and those with GPA 3.0-3.49 receive 20% scholarship (₹1.76L savings). Scholarships are automatically applied based on your HSC marks.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is hostel accommodation mandatory?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Hostel is not mandatory, but highly recommended for international students. The hostel fee includes 24/7 security, Wi-Fi, laundry facilities, and comfortable accommodation. Students can also opt for off-campus housing.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the fee payment schedule?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Fees can be paid semester-wise or annually. First semester fee must be paid at the time of admission. Subsequent fees are due at the beginning of each semester. International students can pay through wire transfer or online payment.',
        },
      },
      {
        '@type': 'Question',
        name: 'Are there any additional costs not included in the fee?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The fee structure covers tuition, hostel, mess, and basic facilities. Additional costs may include textbooks (₹5-10K per year), personal expenses (₹5-8K per month), travel, and optional activities. Budget approximately ₹60-80K per year for miscellaneous expenses.',
        },
      },
      {
        '@type': 'Question',
        name: 'What are the placement opportunities after B.Tech CSE?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'B.Tech CSE graduates have excellent placement opportunities with 85%+ placement rate. Top companies like Microsoft, Amazon, Google, Infosys, TCS recruit from campus. Average package is ₹4.5 LPA and highest package goes up to ₹17 LPA.',
        },
      },
    ],
  };

  return (
    <>
      <SEOMetaTags
        title="Sharda University B.Tech CSE Fees 2026-27 | Computer Science Fee Structure"
        description="Sharda University B.Tech CSE fees: ₹2.2 Lakhs/year tuition. Total 4-year cost ₹10.6 Lakhs. Up to 50% scholarship for Bangladeshi students. Check complete fee breakdown."
        keywords={[
          'sharda university b.tech cse fees',
          'sharda university computer science fees',
          'sharda btech cse fee structure',
          'sharda university engineering fees',
          'sharda cse fees 2026',
          'sharda university fees for bangladeshi students',
        ]}
        canonicalUrl={`${window.location.origin}/sharda/btech-cse-fees`}
      />
      
      <StructuredData data={courseSchema} />
      <StructuredData data={breadcrumbSchema} />
      <StructuredData data={faqSchema} />

      <div className="bg-white">
        {/* Breadcrumb Navigation */}
        <nav className="container mx-auto px-4 py-4" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            <li>
              <Link to="/" className="hover:text-blue-600 transition-colors">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link to="/sharda" className="hover:text-blue-600 transition-colors">
                Sharda University
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-gray-900 font-medium" aria-current="page">
              B.Tech CSE Fees
            </li>
          </ol>
        </nav>

        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-block bg-yellow-400 text-gray-900 px-4 py-2 rounded-full font-bold mb-4">
                Admissions Open 2026-27
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Sharda University B.Tech CSE Fees 2026-27
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-blue-100">
                Complete Fee Structure with Scholarship Details
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <ApplicationCTA
                  variant="secondary"
                  source="btech-cse-fees-page"
                  context="hero-section"
                  program="B.Tech CSE"
                />
                <WhatsAppCTA
                  context="B.Tech CSE Fees - Want to know more about fees and scholarships"
                  variant="button"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Quick Fee Overview */}
        <section className="py-12 bg-white border-b">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                    ₹{(btechCSE.fees.tuitionPerYear / 100000).toFixed(1)}L
                  </div>
                  <p className="text-gray-600 text-sm md:text-base">Annual Tuition</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                    ₹{(btechCSE.fees.total / 100000).toFixed(1)}L
                  </div>
                  <p className="text-gray-600 text-sm md:text-base">Total 4-Year Cost</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                    50%
                  </div>
                  <p className="text-gray-600 text-sm md:text-base">Max Scholarship</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                    4 Years
                  </div>
                  <p className="text-gray-600 text-sm md:text-base">Program Duration</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Fee Breakdown */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
                Complete Fee Breakdown
              </h2>
              
              <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-blue-600 text-white">
                      <tr>
                        <th className="px-6 py-4 text-left font-semibold">Fee Component</th>
                        <th className="px-6 py-4 text-right font-semibold">Amount (INR)</th>
                        <th className="px-6 py-4 text-right font-semibold">Per Year</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr className="hover:bg-gray-50">
                        <td className="px-6 py-4 font-semibold text-gray-900">Tuition Fee</td>
                        <td className="px-6 py-4 text-right text-gray-700">
                          ₹{btechCSE.fees.tuitionPerYear.toLocaleString('en-IN')}
                        </td>
                        <td className="px-6 py-4 text-right text-gray-600">Per Year</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-6 py-4 font-semibold text-gray-900">Hostel Fee</td>
                        <td className="px-6 py-4 text-right text-gray-700">
                          ₹{btechCSE.fees.hostel.toLocaleString('en-IN')}
                        </td>
                        <td className="px-6 py-4 text-right text-gray-600">Per Year</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-6 py-4 font-semibold text-gray-900">Mess Fee</td>
                        <td className="px-6 py-4 text-right text-gray-700">
                          ₹{btechCSE.fees.mess.toLocaleString('en-IN')}
                        </td>
                        <td className="px-6 py-4 text-right text-gray-600">Per Year</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-6 py-4 font-semibold text-gray-900">Registration Fee</td>
                        <td className="px-6 py-4 text-right text-gray-700">
                          ₹{btechCSE.fees.registration.toLocaleString('en-IN')}
                        </td>
                        <td className="px-6 py-4 text-right text-gray-600">One-time</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-6 py-4 font-semibold text-gray-900">Other Fees</td>
                        <td className="px-6 py-4 text-right text-gray-700">
                          ₹{btechCSE.fees.other.toLocaleString('en-IN')}
                        </td>
                        <td className="px-6 py-4 text-right text-gray-600">Per Year</td>
                      </tr>
                      <tr className="bg-blue-50 font-bold">
                        <td className="px-6 py-4 text-gray-900">Total 4-Year Cost</td>
                        <td className="px-6 py-4 text-right text-blue-600 text-lg">
                          ₹{btechCSE.fees.total.toLocaleString('en-IN')}
                        </td>
                        <td className="px-6 py-4 text-right text-gray-600">4 Years</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Mobile-friendly fee cards */}
              <div className="md:hidden space-y-4">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="font-bold text-gray-900 mb-4">Fee Components</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center pb-2 border-b">
                      <span className="text-gray-700">Tuition Fee (per year)</span>
                      <span className="font-semibold text-gray-900">
                        ₹{(btechCSE.fees.tuitionPerYear / 100000).toFixed(1)}L
                      </span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b">
                      <span className="text-gray-700">Hostel Fee (per year)</span>
                      <span className="font-semibold text-gray-900">
                        ₹{(btechCSE.fees.hostel / 1000).toFixed(0)}K
                      </span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b">
                      <span className="text-gray-700">Mess Fee (per year)</span>
                      <span className="font-semibold text-gray-900">
                        ₹{(btechCSE.fees.mess / 1000).toFixed(0)}K
                      </span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b">
                      <span className="text-gray-700">Registration (one-time)</span>
                      <span className="font-semibold text-gray-900">
                        ₹{(btechCSE.fees.registration / 1000).toFixed(0)}K
                      </span>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t-2 border-blue-600">
                      <span className="font-bold text-gray-900">Total 4-Year Cost</span>
                      <span className="font-bold text-blue-600 text-lg">
                        ₹{(btechCSE.fees.total / 100000).toFixed(1)}L
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 bg-blue-50 rounded-lg p-6 border-l-4 border-blue-600">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  What's Included in the Fees?
                </h3>
                <div className="grid md:grid-cols-2 gap-4 text-gray-700">
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">✓</span>
                      <span>World-class faculty and teaching</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">✓</span>
                      <span>State-of-the-art computer labs</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">✓</span>
                      <span>Library access with digital resources</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">✓</span>
                      <span>Sports and recreational facilities</span>
                    </li>
                  </ul>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">✓</span>
                      <span>Industry internship opportunities</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">✓</span>
                      <span>Placement assistance and training</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">✓</span>
                      <span>24/7 hostel accommodation</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">✓</span>
                      <span>Medical facilities and insurance</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Scholarship Information */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
                Scholarship Opportunities
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8 mb-12">
                {/* Bangladesh Scholarships */}
                <div className="bg-gradient-to-br from-green-50 to-white rounded-lg shadow-lg p-8 border-t-4 border-green-600">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <span className="mr-2">🇧🇩</span>
                    For Bangladeshi Students
                  </h3>
                  <div className="space-y-4">
                    <div className="bg-white rounded-lg p-6 border-l-4 border-green-600">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-lg font-bold text-gray-900">GPA 3.5 - 5.0</span>
                        <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full font-bold text-xl">
                          50% OFF
                        </span>
                      </div>
                      <p className="text-gray-700 mb-3">
                        Students with HSC GPA 3.5 or above receive 50% scholarship on tuition fees
                      </p>
                      <div className="bg-green-50 rounded p-3">
                        <p className="text-sm text-gray-700">
                          <strong>Annual Fee After Scholarship:</strong> ₹{((btechCSE.fees.tuitionPerYear * 0.5) / 100000).toFixed(1)} Lakhs
                        </p>
                        <p className="text-sm text-gray-700 mt-1">
                          <strong>4-Year Total Savings:</strong> ₹{((btechCSE.fees.totalTuition * 0.5) / 100000).toFixed(1)} Lakhs
                        </p>
                      </div>
                    </div>

                    <div className="bg-white rounded-lg p-6 border-l-4 border-blue-600">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-lg font-bold text-gray-900">GPA 3.0 - 3.49</span>
                        <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full font-bold text-xl">
                          20% OFF
                        </span>
                      </div>
                      <p className="text-gray-700 mb-3">
                        Students with HSC GPA 3.0 to 3.49 receive 20% scholarship on tuition fees
                      </p>
                      <div className="bg-blue-50 rounded p-3">
                        <p className="text-sm text-gray-700">
                          <strong>Annual Fee After Scholarship:</strong> ₹{((btechCSE.fees.tuitionPerYear * 0.8) / 100000).toFixed(1)} Lakhs
                        </p>
                        <p className="text-sm text-gray-700 mt-1">
                          <strong>4-Year Total Savings:</strong> ₹{((btechCSE.fees.totalTuition * 0.2) / 100000).toFixed(1)} Lakhs
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Other Scholarships */}
                <div className="bg-gradient-to-br from-purple-50 to-white rounded-lg shadow-lg p-8 border-t-4 border-purple-600">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    Other Scholarship Options
                  </h3>
                  <div className="space-y-4">
                    <div className="bg-white rounded-lg p-6 border-l-4 border-purple-600">
                      <h4 className="font-bold text-gray-900 mb-2">Merit-Based Scholarships</h4>
                      <p className="text-gray-700 text-sm">
                        Up to 30% scholarship for international students based on academic performance
                      </p>
                    </div>

                    <div className="bg-white rounded-lg p-6 border-l-4 border-purple-600">
                      <h4 className="font-bold text-gray-900 mb-2">Sports Scholarships</h4>
                      <p className="text-gray-700 text-sm">
                        Special scholarships for students with achievements in sports at state/national level
                      </p>
                    </div>

                    <div className="bg-white rounded-lg p-6 border-l-4 border-purple-600">
                      <h4 className="font-bold text-gray-900 mb-2">Need-Based Financial Aid</h4>
                      <p className="text-gray-700 text-sm">
                        Financial assistance available for deserving students based on family income
                      </p>
                    </div>

                    <div className="bg-white rounded-lg p-6 border-l-4 border-purple-600">
                      <h4 className="font-bold text-gray-900 mb-2">Early Bird Discount</h4>
                      <p className="text-gray-700 text-sm">
                        Additional benefits for students who apply and confirm admission early
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 rounded-lg p-6 border-l-4 border-yellow-500">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  💡 Scholarship Application Process
                </h3>
                <p className="text-gray-700 mb-4">
                  Scholarships are automatically applied based on your HSC/academic marks. No separate application needed! Simply submit your academic documents during the admission process.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <ApplicationCTA
                    variant="primary"
                    source="btech-cse-fees-page"
                    context="scholarship-section"
                    program="B.Tech CSE"
                  />
                  <WhatsAppCTA
                    context="B.Tech CSE Fees - Want to know about scholarship eligibility"
                    variant="button"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Fee Calculator Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-center">
                Calculate Your Fees
              </h2>
              <p className="text-center text-gray-600 mb-8">
                Use our interactive calculator to estimate your total fees with scholarship
              </p>
              
              <FeeCalculator
                programs={shardaPrograms}
                scholarshipRules={scholarshipRules}
                defaultProgram="btech-cse"
              />
            </div>
          </div>
        </section>

        {/* Program Highlights */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
                Why Choose B.Tech CSE at Sharda?
              </h2>
              
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-blue-50 rounded-lg p-6 text-center">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">NBA Accredited</h3>
                  <p className="text-gray-700">
                    Program accredited by National Board of Accreditation ensuring quality education
                  </p>
                </div>

                <div className="bg-blue-50 rounded-lg p-6 text-center">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Excellent Placements</h3>
                  <p className="text-gray-700">
                    Top companies like Microsoft, Amazon, Google recruit from campus with packages up to ₹17 LPA
                  </p>
                </div>

                <div className="bg-blue-50 rounded-lg p-6 text-center">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Modern Curriculum</h3>
                  <p className="text-gray-700">
                    Industry-aligned curriculum with AI, ML, Cloud Computing, and latest technologies
                  </p>
                </div>

                <div className="bg-blue-50 rounded-lg p-6 text-center">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">State-of-Art Labs</h3>
                  <p className="text-gray-700">
                    Advanced computer labs with latest hardware and software for hands-on learning
                  </p>
                </div>

                <div className="bg-blue-50 rounded-lg p-6 text-center">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Expert Faculty</h3>
                  <p className="text-gray-700">
                    Learn from experienced professors with industry and research background
                  </p>
                </div>

                <div className="bg-blue-50 rounded-lg p-6 text-center">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Global Exposure</h3>
                  <p className="text-gray-700">
                    Study with students from 95+ countries and access international exchange programs
                  </p>
                </div>
              </div>

              <div className="mt-12 text-center">
                <Link
                  to="/sharda"
                  className="inline-block text-blue-600 hover:text-blue-700 font-semibold text-lg"
                >
                  Learn more about Sharda University →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
                Frequently Asked Questions
              </h2>
              
              <div className="space-y-4">
                <details className="bg-white rounded-lg p-6 group">
                  <summary className="font-bold text-gray-900 cursor-pointer list-none flex justify-between items-center">
                    <span>What is the total fee for B.Tech CSE at Sharda University?</span>
                    <span className="text-blue-600 group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <p className="mt-4 text-gray-700">
                    The total 4-year fee for B.Tech CSE is ₹10.6 Lakhs, which includes tuition (₹8.8L), hostel (₹3.2L), mess (₹2.4L), registration (₹25K), and other fees (₹60K). Bangladeshi students can get up to 50% scholarship on tuition fees.
                  </p>
                </details>

                <details className="bg-white rounded-lg p-6 group">
                  <summary className="font-bold text-gray-900 cursor-pointer list-none flex justify-between items-center">
                    <span>How much scholarship can Bangladeshi students get?</span>
                    <span className="text-blue-600 group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <p className="mt-4 text-gray-700">
                    Bangladeshi students with HSC GPA 3.5-5.0 receive 50% scholarship (₹4.4L savings over 4 years), and those with GPA 3.0-3.49 receive 20% scholarship (₹1.76L savings). Scholarships are automatically applied based on your HSC marks.
                  </p>
                </details>

                <details className="bg-white rounded-lg p-6 group">
                  <summary className="font-bold text-gray-900 cursor-pointer list-none flex justify-between items-center">
                    <span>Is hostel accommodation mandatory?</span>
                    <span className="text-blue-600 group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <p className="mt-4 text-gray-700">
                    Hostel is not mandatory, but highly recommended for international students. The hostel fee includes 24/7 security, Wi-Fi, laundry facilities, and comfortable accommodation. Students can also opt for off-campus housing.
                  </p>
                </details>

                <details className="bg-white rounded-lg p-6 group">
                  <summary className="font-bold text-gray-900 cursor-pointer list-none flex justify-between items-center">
                    <span>What is the fee payment schedule?</span>
                    <span className="text-blue-600 group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <p className="mt-4 text-gray-700">
                    Fees can be paid semester-wise or annually. First semester fee must be paid at the time of admission. Subsequent fees are due at the beginning of each semester. International students can pay through wire transfer or online payment.
                  </p>
                </details>

                <details className="bg-white rounded-lg p-6 group">
                  <summary className="font-bold text-gray-900 cursor-pointer list-none flex justify-between items-center">
                    <span>Are there any additional costs not included in the fee?</span>
                    <span className="text-blue-600 group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <p className="mt-4 text-gray-700">
                    The fee structure covers tuition, hostel, mess, and basic facilities. Additional costs may include textbooks (₹5-10K per year), personal expenses (₹5-8K per month), travel, and optional activities. Budget approximately ₹60-80K per year for miscellaneous expenses.
                  </p>
                </details>

                <details className="bg-white rounded-lg p-6 group">
                  <summary className="font-bold text-gray-900 cursor-pointer list-none flex justify-between items-center">
                    <span>What are the placement opportunities after B.Tech CSE?</span>
                    <span className="text-blue-600 group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <p className="mt-4 text-gray-700">
                    B.Tech CSE graduates have excellent placement opportunities with 85%+ placement rate. Top companies like Microsoft, Amazon, Google, Infosys, TCS recruit from campus. Average package is ₹4.5 LPA and highest package goes up to ₹17 LPA.
                  </p>
                </details>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Start Your B.Tech CSE Journey?
              </h2>
              <p className="text-xl mb-8 text-blue-100">
                Apply now for 2026-27 admissions and get up to 50% scholarship on tuition fees
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <ApplicationCTA
                  variant="secondary"
                  source="btech-cse-fees-page"
                  context="bottom-cta"
                  program="B.Tech CSE"
                />
                <WhatsAppCTA
                  context="B.Tech CSE Fees - Ready to apply for B.Tech CSE"
                  variant="button"
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ShardaBTechCSEFees;
