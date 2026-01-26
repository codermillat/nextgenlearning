/**
 * Sharda University MBA Fees Page
 * Feature: sharda-university-content-enhancement
 * 
 * SEO-optimized page targeting "sharda university mba fees" keyword
 * Requirements: 3.1, 3.7
 */

import { Link } from 'react-router-dom';
import { shardaPrograms, scholarshipRules } from '../../data/shardaData';
import SEOMetaTags from '../../components/SEO/SEOMetaTags';
import StructuredData from '../../components/SEO/StructuredData';
import ApplicationCTA from '../../components/Sharda/ApplicationCTA';
import WhatsAppCTA from '../../components/Sharda/WhatsAppCTA';
import FeeCalculator from '../../components/Sharda/FeeCalculator';

const ShardaMBAFees = () => {
  // Get MBA program data
  const mbaProgram = shardaPrograms.find(p => p.id === 'mba');
  
  if (!mbaProgram) {
    return <div>Program not found</div>;
  }

  // Structured data for the page
  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: mbaProgram.name,
    description: 'MBA program at Sharda University with comprehensive fee structure and scholarship opportunities for management education',
    provider: {
      '@type': 'EducationalOrganization',
      name: 'Sharda University',
      url: 'https://global.sharda.ac.in/',
    },
    offers: {
      '@type': 'Offer',
      category: 'Tuition Fees',
      price: mbaProgram.fees.tuitionPerYear,
      priceCurrency: 'INR',
    },
    educationalCredentialAwarded: 'Master of Business Administration',
    timeToComplete: 'P2Y',
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
        name: 'MBA Fees',
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
        name: 'What is the total fee for MBA at Sharda University?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The total 2-year fee for MBA is ₹7.8 Lakhs, which includes tuition (₹6L), hostel (₹1.6L), mess (₹1.2L), registration (₹25K), and other fees (₹30K). Bangladeshi students can get up to 50% scholarship on tuition fees.',
        },
      },
      {
        '@type': 'Question',
        name: 'What specializations are available in MBA?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Sharda University offers MBA specializations in Marketing, Finance, Human Resource Management, Operations Management, and International Business. Students can choose their specialization at the end of the first semester.',
        },
      },
      {
        '@type': 'Question',
        name: 'What are the eligibility criteria for MBA admission?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Candidates must have a Bachelor\'s degree with minimum 50% marks from a recognized university. Entrance test scores (CAT/MAT/XAT/CMAT) or Sharda University Entrance Test are required. Work experience is preferred but not mandatory.',
        },
      },
      {
        '@type': 'Question',
        name: 'How much scholarship can Bangladeshi students get for MBA?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Bangladeshi students with Bachelor\'s degree GPA 3.5-5.0 receive 50% scholarship (₹3L savings over 2 years), and those with GPA 3.0-3.49 receive 20% scholarship (₹1.2L savings). Scholarships are automatically applied based on your undergraduate marks.',
        },
      },
      {
        '@type': 'Question',
        name: 'What are the placement opportunities after MBA?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'MBA graduates have excellent placement opportunities with companies like Deloitte, KPMG, Ernst & Young, PwC, and other top firms. Average package ranges from ₹6-8 LPA. The placement cell provides comprehensive training and support.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is work experience required for MBA admission?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Work experience is not mandatory but is preferred. Fresh graduates can apply directly after completing their Bachelor\'s degree. Candidates with work experience may be eligible for additional scholarships and benefits.',
        },
      },
    ],
  };

  return (
    <>
      <SEOMetaTags
        title="Sharda University MBA Fees 2026-27 | Complete Fee Structure & Scholarships"
        description="Sharda University MBA fees: ₹3 Lakhs/year tuition. Total 2-year cost ₹7.8 Lakhs. Up to 50% scholarship for Bangladeshi students. Check complete MBA fee breakdown and specializations."
        keywords={[
          'sharda university mba fees',
          'sharda mba fee structure',
          'sharda university mba cost',
          'mba fees in sharda university',
          'sharda mba fees 2026',
          'sharda university mba fees for bangladeshi students',
        ]}
        canonicalUrl={`${window.location.origin}/sharda/mba-fees`}
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
              MBA Fees
            </li>
          </ol>
        </nav>

        {/* Hero Section */}
        <section className="bg-gradient-to-r from-purple-600 to-purple-800 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-block bg-yellow-400 text-gray-900 px-4 py-2 rounded-full font-bold mb-4">
                Admissions Open 2026-27
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Sharda University MBA Fees 2026-27
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-purple-100">
                Complete Fee Structure with Scholarship Details
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <ApplicationCTA
                  variant="secondary"
                  source="mba-fees-page"
                  context="hero-section"
                  program="MBA"
                />
                <WhatsAppCTA
                  context="MBA Fees - Want to know more about MBA fees and scholarships"
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
                  <div className="text-3xl md:text-4xl font-bold text-purple-600 mb-2">
                    ₹{(mbaProgram.fees.tuitionPerYear / 100000).toFixed(1)}L
                  </div>
                  <p className="text-gray-600 text-sm md:text-base">Annual Tuition</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-purple-600 mb-2">
                    ₹{(mbaProgram.fees.total / 100000).toFixed(1)}L
                  </div>
                  <p className="text-gray-600 text-sm md:text-base">Total 2-Year Cost</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-purple-600 mb-2">
                    50%
                  </div>
                  <p className="text-gray-600 text-sm md:text-base">Max Scholarship</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-purple-600 mb-2">
                    2 Years
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
                    <thead className="bg-purple-600 text-white">
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
                          ₹{mbaProgram.fees.tuitionPerYear.toLocaleString('en-IN')}
                        </td>
                        <td className="px-6 py-4 text-right text-gray-600">Per Year</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-6 py-4 font-semibold text-gray-900">Hostel Fee</td>
                        <td className="px-6 py-4 text-right text-gray-700">
                          ₹{mbaProgram.fees.hostel.toLocaleString('en-IN')}
                        </td>
                        <td className="px-6 py-4 text-right text-gray-600">Per Year</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-6 py-4 font-semibold text-gray-900">Mess Fee</td>
                        <td className="px-6 py-4 text-right text-gray-700">
                          ₹{mbaProgram.fees.mess.toLocaleString('en-IN')}
                        </td>
                        <td className="px-6 py-4 text-right text-gray-600">Per Year</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-6 py-4 font-semibold text-gray-900">Registration Fee</td>
                        <td className="px-6 py-4 text-right text-gray-700">
                          ₹{mbaProgram.fees.registration.toLocaleString('en-IN')}
                        </td>
                        <td className="px-6 py-4 text-right text-gray-600">One-time</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-6 py-4 font-semibold text-gray-900">Other Fees</td>
                        <td className="px-6 py-4 text-right text-gray-700">
                          ₹{mbaProgram.fees.other.toLocaleString('en-IN')}
                        </td>
                        <td className="px-6 py-4 text-right text-gray-600">Per Year</td>
                      </tr>
                      <tr className="bg-purple-50 font-bold">
                        <td className="px-6 py-4 text-gray-900">Total 2-Year Cost</td>
                        <td className="px-6 py-4 text-right text-purple-600 text-lg">
                          ₹{mbaProgram.fees.total.toLocaleString('en-IN')}
                        </td>
                        <td className="px-6 py-4 text-right text-gray-600">2 Years</td>
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
                        ₹{(mbaProgram.fees.tuitionPerYear / 100000).toFixed(1)}L
                      </span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b">
                      <span className="text-gray-700">Hostel Fee (per year)</span>
                      <span className="font-semibold text-gray-900">
                        ₹{(mbaProgram.fees.hostel / 1000).toFixed(0)}K
                      </span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b">
                      <span className="text-gray-700">Mess Fee (per year)</span>
                      <span className="font-semibold text-gray-900">
                        ₹{(mbaProgram.fees.mess / 1000).toFixed(0)}K
                      </span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b">
                      <span className="text-gray-700">Registration (one-time)</span>
                      <span className="font-semibold text-gray-900">
                        ₹{(mbaProgram.fees.registration / 1000).toFixed(0)}K
                      </span>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t-2 border-purple-600">
                      <span className="font-bold text-gray-900">Total 2-Year Cost</span>
                      <span className="font-bold text-purple-600 text-lg">
                        ₹{(mbaProgram.fees.total / 100000).toFixed(1)}L
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 bg-purple-50 rounded-lg p-6 border-l-4 border-purple-600">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  What's Included in the Fees?
                </h3>
                <div className="grid md:grid-cols-2 gap-4 text-gray-700">
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="text-purple-600 mr-2">✓</span>
                      <span>Expert faculty with industry experience</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-600 mr-2">✓</span>
                      <span>Case study based learning methodology</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-600 mr-2">✓</span>
                      <span>Industry visits and guest lectures</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-600 mr-2">✓</span>
                      <span>Access to business journals and databases</span>
                    </li>
                  </ul>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="text-purple-600 mr-2">✓</span>
                      <span>Summer internship opportunities</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-600 mr-2">✓</span>
                      <span>Placement assistance and training</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-600 mr-2">✓</span>
                      <span>24/7 hostel accommodation</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-600 mr-2">✓</span>
                      <span>Sports and recreational facilities</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* MBA Specializations */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
                MBA Specializations Available
              </h2>
              
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                {mbaProgram.specializations?.map((spec, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-purple-50 to-white rounded-lg shadow-md p-6 border-t-4 border-purple-600 text-center hover:shadow-lg transition-shadow"
                  >
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{spec}</h3>
                    <p className="text-gray-600 text-sm">
                      Specialized curriculum with industry-relevant skills
                    </p>
                  </div>
                ))}
              </div>

              <div className="bg-purple-50 rounded-lg p-6 border-l-4 border-purple-600">
                <p className="text-gray-700">
                  <strong>Note:</strong> All specializations have the same fee structure. Students can choose their specialization at the end of the first semester based on their interests and career goals.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Scholarship Information */}
        <section className="py-16 bg-gray-50">
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
                        Students with Bachelor's degree GPA 3.5 or above receive 50% scholarship on tuition fees
                      </p>
                      <div className="bg-green-50 rounded p-3">
                        <p className="text-sm text-gray-700">
                          <strong>Annual Fee After Scholarship:</strong> ₹{((mbaProgram.fees.tuitionPerYear * 0.5) / 100000).toFixed(1)} Lakhs
                        </p>
                        <p className="text-sm text-gray-700 mt-1">
                          <strong>2-Year Total Savings:</strong> ₹{((mbaProgram.fees.totalTuition * 0.5) / 100000).toFixed(1)} Lakhs
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
                        Students with Bachelor's degree GPA 3.0 to 3.49 receive 20% scholarship on tuition fees
                      </p>
                      <div className="bg-blue-50 rounded p-3">
                        <p className="text-sm text-gray-700">
                          <strong>Annual Fee After Scholarship:</strong> ₹{((mbaProgram.fees.tuitionPerYear * 0.8) / 100000).toFixed(1)} Lakhs
                        </p>
                        <p className="text-sm text-gray-700 mt-1">
                          <strong>2-Year Total Savings:</strong> ₹{((mbaProgram.fees.totalTuition * 0.2) / 100000).toFixed(1)} Lakhs
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
                        Up to 30% scholarship for international students based on undergraduate academic performance
                      </p>
                    </div>

                    <div className="bg-white rounded-lg p-6 border-l-4 border-purple-600">
                      <h4 className="font-bold text-gray-900 mb-2">Work Experience Scholarships</h4>
                      <p className="text-gray-700 text-sm">
                        Special scholarships for candidates with 2+ years of relevant work experience
                      </p>
                    </div>

                    <div className="bg-white rounded-lg p-6 border-l-4 border-purple-600">
                      <h4 className="font-bold text-gray-900 mb-2">Entrance Test Scholarships</h4>
                      <p className="text-gray-700 text-sm">
                        Scholarships based on CAT/MAT/XAT/CMAT scores for exceptional performers
                      </p>
                    </div>

                    <div className="bg-white rounded-lg p-6 border-l-4 border-purple-600">
                      <h4 className="font-bold text-gray-900 mb-2">Women in Business Scholarships</h4>
                      <p className="text-gray-700 text-sm">
                        Special scholarships to encourage women entrepreneurs and business leaders
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
                  Scholarships are automatically applied based on your undergraduate marks. No separate application needed! Simply submit your academic documents during the admission process.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <ApplicationCTA
                    variant="primary"
                    source="mba-fees-page"
                    context="scholarship-section"
                    program="MBA"
                  />
                  <WhatsAppCTA
                    context="MBA Fees - Want to know about scholarship eligibility"
                    variant="button"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Fee Calculator Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-center">
                Calculate Your MBA Fees
              </h2>
              <p className="text-center text-gray-600 mb-8">
                Use our interactive calculator to estimate your total fees with scholarship
              </p>
              
              <FeeCalculator
                programs={shardaPrograms}
                scholarshipRules={scholarshipRules}
                defaultProgram="mba"
              />
            </div>
          </div>
        </section>

        {/* Program Highlights */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
                Why Choose MBA at Sharda?
              </h2>
              
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-shadow">
                  <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Industry-Aligned Curriculum</h3>
                  <p className="text-gray-700">
                    Updated curriculum with latest business trends, case studies, and practical applications
                  </p>
                </div>

                <div className="bg-white rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-shadow">
                  <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Excellent Placements</h3>
                  <p className="text-gray-700">
                    Top companies recruit MBA graduates with average package of ₹6-8 LPA
                  </p>
                </div>

                <div className="bg-white rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-shadow">
                  <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Expert Faculty</h3>
                  <p className="text-gray-700">
                    Learn from professors with extensive industry and academic experience
                  </p>
                </div>

                <div className="bg-white rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-shadow">
                  <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Industry Exposure</h3>
                  <p className="text-gray-700">
                    Regular industry visits, guest lectures, and summer internships with top companies
                  </p>
                </div>

                <div className="bg-white rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-shadow">
                  <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Multiple Specializations</h3>
                  <p className="text-gray-700">
                    Choose from Marketing, Finance, HR, Operations, and International Business
                  </p>
                </div>

                <div className="bg-white rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-shadow">
                  <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Global Perspective</h3>
                  <p className="text-gray-700">
                    Diverse student community from 95+ countries providing global business insights
                  </p>
                </div>
              </div>

              <div className="mt-12 text-center">
                <Link
                  to="/sharda"
                  className="inline-block text-purple-600 hover:text-purple-700 font-semibold text-lg"
                >
                  Learn more about Sharda University →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
                Frequently Asked Questions
              </h2>
              
              <div className="space-y-4">
                <details className="bg-gray-50 rounded-lg p-6 group">
                  <summary className="font-bold text-gray-900 cursor-pointer list-none flex justify-between items-center">
                    <span>What is the total fee for MBA at Sharda University?</span>
                    <span className="text-purple-600 group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <p className="mt-4 text-gray-700">
                    The total 2-year fee for MBA is ₹7.8 Lakhs, which includes tuition (₹6L), hostel (₹1.6L), mess (₹1.2L), registration (₹25K), and other fees (₹30K). Bangladeshi students can get up to 50% scholarship on tuition fees.
                  </p>
                </details>

                <details className="bg-gray-50 rounded-lg p-6 group">
                  <summary className="font-bold text-gray-900 cursor-pointer list-none flex justify-between items-center">
                    <span>What specializations are available in MBA?</span>
                    <span className="text-purple-600 group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <p className="mt-4 text-gray-700">
                    Sharda University offers MBA specializations in Marketing, Finance, Human Resource Management, Operations Management, and International Business. Students can choose their specialization at the end of the first semester.
                  </p>
                </details>

                <details className="bg-gray-50 rounded-lg p-6 group">
                  <summary className="font-bold text-gray-900 cursor-pointer list-none flex justify-between items-center">
                    <span>What are the eligibility criteria for MBA admission?</span>
                    <span className="text-purple-600 group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <p className="mt-4 text-gray-700">
                    Candidates must have a Bachelor's degree with minimum 50% marks from a recognized university. Entrance test scores (CAT/MAT/XAT/CMAT) or Sharda University Entrance Test are required. Work experience is preferred but not mandatory.
                  </p>
                </details>

                <details className="bg-gray-50 rounded-lg p-6 group">
                  <summary className="font-bold text-gray-900 cursor-pointer list-none flex justify-between items-center">
                    <span>How much scholarship can Bangladeshi students get for MBA?</span>
                    <span className="text-purple-600 group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <p className="mt-4 text-gray-700">
                    Bangladeshi students with Bachelor's degree GPA 3.5-5.0 receive 50% scholarship (₹3L savings over 2 years), and those with GPA 3.0-3.49 receive 20% scholarship (₹1.2L savings). Scholarships are automatically applied based on your undergraduate marks.
                  </p>
                </details>

                <details className="bg-gray-50 rounded-lg p-6 group">
                  <summary className="font-bold text-gray-900 cursor-pointer list-none flex justify-between items-center">
                    <span>What are the placement opportunities after MBA?</span>
                    <span className="text-purple-600 group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <p className="mt-4 text-gray-700">
                    MBA graduates have excellent placement opportunities with companies like Deloitte, KPMG, Ernst & Young, PwC, and other top firms. Average package ranges from ₹6-8 LPA. The placement cell provides comprehensive training and support.
                  </p>
                </details>

                <details className="bg-gray-50 rounded-lg p-6 group">
                  <summary className="font-bold text-gray-900 cursor-pointer list-none flex justify-between items-center">
                    <span>Is work experience required for MBA admission?</span>
                    <span className="text-purple-600 group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <p className="mt-4 text-gray-700">
                    Work experience is not mandatory but is preferred. Fresh graduates can apply directly after completing their Bachelor's degree. Candidates with work experience may be eligible for additional scholarships and benefits.
                  </p>
                </details>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 bg-gradient-to-r from-purple-600 to-purple-800 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Start Your MBA Journey?
              </h2>
              <p className="text-xl mb-8 text-purple-100">
                Apply now for 2026-27 admissions and get up to 50% scholarship on tuition fees
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <ApplicationCTA
                  variant="secondary"
                  source="mba-fees-page"
                  context="bottom-cta"
                  program="MBA"
                />
                <WhatsAppCTA
                  context="MBA Fees - Ready to apply for MBA"
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

export default ShardaMBAFees;
