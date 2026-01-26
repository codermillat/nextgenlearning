import React from 'react';
import { Link } from 'react-router-dom';
import SEOMetaTags from '../../components/SEO/SEOMetaTags';
import StructuredData from '../../components/SEO/StructuredData';
import ApplicationCTA from '../../components/Sharda/ApplicationCTA';
import WhatsAppCTA from '../../components/Sharda/WhatsAppCTA';
import FeeCalculator from '../../components/Sharda/FeeCalculator';

/**
 * Scholarship for Bangladeshi Students in India Page
 * SEO-optimized page targeting "scholarship for bangladeshi students in india" keyword
 * Requirements: 3.2
 */
const ScholarshipBangladeshiStudents = () => {
  const pageTitle = 'Scholarship for Bangladeshi Students in India 2026-27 | Up to 50% at Sharda University';
  const pageDescription = 'Get up to 50% scholarship at Sharda University India for Bangladeshi students. Merit-based tuition fee waiver for GPA 3.5+. NAAC A+ accredited programs. Apply now for 2026-27 admission.';
  const canonicalUrl = 'https://nextgenlearning.com/sharda-university/scholarship-bangladeshi-students-india';

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What scholarships are available for Bangladeshi students at Sharda University?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Sharda University offers merit-based scholarships: 50% tuition fee waiver for GPA 3.5-5.0, 20% for GPA 3.0-3.4, and 25% flat scholarship for B.Sc. Nursing students.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I qualify for 50% scholarship at Sharda University?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Bangladeshi students with GPA 3.5 to 5.0 in their HSC examination automatically qualify for 50% scholarship on tuition fees for programs like B.Tech, BBA, and MBA.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I keep my scholarship for all years at Sharda University?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, scholarships continue if you pass all subjects without backlog and maintain 75% attendance. Failure to meet these conditions results in loss of scholarship for subsequent years.',
        },
      },
      {
        '@type': 'Question',
        name: 'Which programs are eligible for scholarship at Sharda University?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'B.Tech, BBA, MBA, and BCA programs offer up to 50% scholarship. B.Sc. Nursing offers 25% flat scholarship. MBBS, BDS, Pharmacy, and M.Sc. Nursing do not offer scholarships.',
        },
      },
      {
        '@type': 'Question',
        name: 'How much money can I save with Sharda University scholarship?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'With 50% scholarship on B.Tech CSE (₹2,70,000/year), you save ₹1,35,000 annually or ₹5,40,000 over 4 years. This makes quality education highly affordable.',
        },
      },
    ],
  };

  return (
    <>
      <SEOMetaTags
        title={pageTitle}
        description={pageDescription}
        keywords={[
          'scholarship for bangladeshi students in india',
          'sharda university scholarship bangladesh',
          'india scholarship bangladesh',
          'merit scholarship india',
          'study in india scholarship',
        ]}
        canonicalUrl={canonicalUrl}
      />

      <StructuredData data={faqSchema} />

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-green-600 to-green-800 text-white py-16">
          <div className="container mx-auto px-4">
            <nav className="text-sm mb-4" aria-label="Breadcrumb">
              <ol className="flex flex-wrap items-center space-x-2">
                <li><Link to="/" className="hover:underline">Home</Link></li>
                <li className="before:content-['/'] before:mx-2">
                  <Link to="/sharda-university" className="hover:underline">Sharda University</Link>
                </li>
                <li className="before:content-['/'] before:mx-2">Scholarship for Bangladeshi Students</li>
              </ol>
            </nav>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Scholarship for Bangladeshi Students in India: Up to 50% at Sharda University
            </h1>
            <p className="text-xl mb-8 max-w-3xl">
              Make your dream of studying in India affordable with generous merit-based scholarships. 
              Save up to ₹5.4 Lakhs on your degree at NAAC A+ accredited Sharda University.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <ApplicationCTA 
                variant="primary"
                source="scholarship-bd-page"
                context="hero"
              />
              <WhatsAppCTA 
                context="Scholarship for Bangladeshi Students - Hero Section"
                variant="button"
              />
            </div>
          </div>
        </section>

        {/* Scholarship Overview Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Sharda University Scholarships for Bangladesh</h2>
            
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-lg border-2 border-green-500 shadow-lg">
                <div className="text-center mb-4">
                  <div className="text-5xl font-bold text-green-600 mb-2">50%</div>
                  <div className="text-xl font-semibold">Premium Scholarship</div>
                </div>
                <div className="space-y-3 text-gray-700">
                  <p><strong>Eligibility:</strong> GPA 3.5 to 5.0</p>
                  <p><strong>Applies to:</strong> B.Tech, BBA, MBA, BCA</p>
                  <p><strong>Savings:</strong> Up to ₹5.4 Lakhs over 4 years</p>
                  <p className="text-sm text-green-700 font-medium">Most popular scholarship tier</p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-lg border-2 border-blue-500 shadow-lg">
                <div className="text-center mb-4">
                  <div className="text-5xl font-bold text-blue-600 mb-2">25%</div>
                  <div className="text-xl font-semibold">Nursing Scholarship</div>
                </div>
                <div className="space-y-3 text-gray-700">
                  <p><strong>Eligibility:</strong> All B.Sc. Nursing students</p>
                  <p><strong>Applies to:</strong> B.Sc. Nursing only</p>
                  <p><strong>Savings:</strong> ₹60,000 per year</p>
                  <p className="text-sm text-blue-700 font-medium">Flat rate for all nursing students</p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-lg border-2 border-purple-500 shadow-lg">
                <div className="text-center mb-4">
                  <div className="text-5xl font-bold text-purple-600 mb-2">20%</div>
                  <div className="text-xl font-semibold">Merit Scholarship</div>
                </div>
                <div className="space-y-3 text-gray-700">
                  <p><strong>Eligibility:</strong> GPA 3.0 to 3.4</p>
                  <p><strong>Applies to:</strong> B.Tech, BBA, MBA, BCA</p>
                  <p><strong>Savings:</strong> Up to ₹2.16 Lakhs over 4 years</p>
                  <p className="text-sm text-purple-700 font-medium">Good value for solid performers</p>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-8">
              <h3 className="font-semibold text-lg mb-2">⚠️ Important: Programs Without Scholarships</h3>
              <p className="text-gray-700 mb-2">
                The following professional programs do NOT offer scholarships:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>MBBS (Bachelor of Medicine & Bachelor of Surgery)</li>
                <li>BDS (Bachelor of Dental Surgery)</li>
                <li>B.Pharm & D.Pharm (Pharmacy programs)</li>
                <li>M.Sc. Nursing</li>
                <li>MPT (Master of Physiotherapy)</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Savings Calculator Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Calculate Your Scholarship Savings</h2>
            
            <div className="max-w-5xl mx-auto mb-12">
              <FeeCalculator />
            </div>

            <div className="max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold mb-6 text-center">Real Savings Examples</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h4 className="text-xl font-semibold mb-4 text-green-600">B.Tech CSE with 50% Scholarship</h4>
                  <div className="space-y-3 text-gray-700">
                    <div className="flex justify-between">
                      <span>Original Annual Fee:</span>
                      <span className="font-semibold">₹2,70,000</span>
                    </div>
                    <div className="flex justify-between text-green-600">
                      <span>50% Scholarship:</span>
                      <span className="font-semibold">-₹1,35,000</span>
                    </div>
                    <div className="flex justify-between border-t pt-2">
                      <span className="font-semibold">You Pay Per Year:</span>
                      <span className="font-bold text-lg">₹1,35,000</span>
                    </div>
                    <div className="flex justify-between bg-green-50 p-2 rounded">
                      <span className="font-semibold">4-Year Total Savings:</span>
                      <span className="font-bold text-xl text-green-600">₹5,40,000</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h4 className="text-xl font-semibold mb-4 text-blue-600">MBA with 50% Scholarship</h4>
                  <div className="space-y-3 text-gray-700">
                    <div className="flex justify-between">
                      <span>Original Annual Fee:</span>
                      <span className="font-semibold">₹2,80,000</span>
                    </div>
                    <div className="flex justify-between text-blue-600">
                      <span>50% Scholarship:</span>
                      <span className="font-semibold">-₹1,40,000</span>
                    </div>
                    <div className="flex justify-between border-t pt-2">
                      <span className="font-semibold">You Pay Per Year:</span>
                      <span className="font-bold text-lg">₹1,40,000</span>
                    </div>
                    <div className="flex justify-between bg-blue-50 p-2 rounded">
                      <span className="font-semibold">2-Year Total Savings:</span>
                      <span className="font-bold text-xl text-blue-600">₹2,80,000</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h4 className="text-xl font-semibold mb-4 text-purple-600">BBA with 20% Scholarship</h4>
                  <div className="space-y-3 text-gray-700">
                    <div className="flex justify-between">
                      <span>Original Annual Fee:</span>
                      <span className="font-semibold">₹2,31,000</span>
                    </div>
                    <div className="flex justify-between text-purple-600">
                      <span>20% Scholarship:</span>
                      <span className="font-semibold">-₹46,200</span>
                    </div>
                    <div className="flex justify-between border-t pt-2">
                      <span className="font-semibold">You Pay Per Year:</span>
                      <span className="font-bold text-lg">₹1,84,800</span>
                    </div>
                    <div className="flex justify-between bg-purple-50 p-2 rounded">
                      <span className="font-semibold">3-Year Total Savings:</span>
                      <span className="font-bold text-xl text-purple-600">₹1,38,600</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h4 className="text-xl font-semibold mb-4 text-indigo-600">B.Sc. Nursing with 25% Scholarship</h4>
                  <div className="space-y-3 text-gray-700">
                    <div className="flex justify-between">
                      <span>Original Annual Fee:</span>
                      <span className="font-semibold">₹2,40,000</span>
                    </div>
                    <div className="flex justify-between text-indigo-600">
                      <span>25% Scholarship:</span>
                      <span className="font-semibold">-₹60,000</span>
                    </div>
                    <div className="flex justify-between border-t pt-2">
                      <span className="font-semibold">You Pay Per Year:</span>
                      <span className="font-bold text-lg">₹1,80,000</span>
                    </div>
                    <div className="flex justify-between bg-indigo-50 p-2 rounded">
                      <span className="font-semibold">4-Year Total Savings:</span>
                      <span className="font-bold text-xl text-indigo-600">₹2,40,000</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Scholarship Continuation Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">How to Keep Your Scholarship</h2>
            
            <div className="max-w-3xl mx-auto">
              <div className="bg-blue-50 p-8 rounded-lg mb-8">
                <h3 className="text-2xl font-semibold mb-4">Scholarship Continuation Requirements</h3>
                <p className="text-gray-700 mb-6">
                  Your scholarship automatically continues from year 2 onwards if you meet these simple conditions:
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">
                      ✓
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-1">Pass All Subjects</h4>
                      <p className="text-gray-700">
                        You must pass all subjects in your current year with no backlogs or failed courses. 
                        Clear all exams on the first attempt to maintain your scholarship.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">
                      ✓
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-1">Maintain 75% Attendance</h4>
                      <p className="text-gray-700">
                        Attend at least 75% of all classes, labs, and tutorials. Regular attendance is mandatory 
                        for scholarship continuation and is tracked throughout the semester.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-red-50 border-l-4 border-red-500 p-6 mb-8">
                <h4 className="font-semibold text-lg mb-2 text-red-700">⚠️ Important Warning</h4>
                <p className="text-gray-700 mb-3">
                  If you fail to meet either condition (passing all subjects OR 75% attendance), you will 
                  <strong> lose your scholarship for all subsequent years</strong>. This means:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Your tuition fee will increase to the full amount (no discount)</li>
                  <li>The scholarship cannot be reinstated even if you improve later</li>
                  <li>Your total education cost could double unexpectedly</li>
                </ul>
                <p className="text-gray-700 mt-3 font-medium">
                  Plan your finances carefully and commit to maintaining good academic performance and attendance.
                </p>
              </div>

              <div className="bg-green-50 p-6 rounded-lg">
                <h4 className="font-semibold text-lg mb-3">💡 Tips to Keep Your Scholarship</h4>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">•</span>
                    <span>Attend all classes regularly - don't skip even if attendance seems comfortable</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">•</span>
                    <span>Start exam preparation early - don't wait until the last minute</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">•</span>
                    <span>Seek help from professors or tutors if you're struggling with any subject</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">•</span>
                    <span>Join study groups with serious students to stay motivated</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">•</span>
                    <span>Track your attendance regularly - don't assume you're above 75%</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Compare: India vs Other Study Destinations</h2>
            
            <div className="max-w-5xl mx-auto overflow-x-auto">
              <table className="w-full bg-white rounded-lg shadow-md">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-4 text-left">Factor</th>
                    <th className="p-4 text-left bg-green-50">India (Sharda)</th>
                    <th className="p-4 text-left">USA</th>
                    <th className="p-4 text-left">UK</th>
                    <th className="p-4 text-left">Canada</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr>
                    <td className="p-4 font-semibold">Annual Tuition</td>
                    <td className="p-4 bg-green-50">₹1.35L - ₹2.7L<br/><span className="text-sm text-green-600">(with scholarship)</span></td>
                    <td className="p-4">₹20L - ₹40L</td>
                    <td className="p-4">₹18L - ₹35L</td>
                    <td className="p-4">₹15L - ₹30L</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold">Living Costs</td>
                    <td className="p-4 bg-green-50">₹1.2L - ₹2L/year</td>
                    <td className="p-4">₹12L - ₹18L/year</td>
                    <td className="p-4">₹10L - ₹15L/year</td>
                    <td className="p-4">₹8L - ₹12L/year</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold">Total 4-Year Cost</td>
                    <td className="p-4 bg-green-50 font-bold text-green-600">₹10L - ₹19L</td>
                    <td className="p-4">₹1.28Cr - ₹2.32Cr</td>
                    <td className="p-4">₹1.12Cr - ₹2Cr</td>
                    <td className="p-4">₹92L - ₹1.68Cr</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold">Scholarship Availability</td>
                    <td className="p-4 bg-green-50">Up to 50% guaranteed<br/><span className="text-sm text-green-600">(merit-based)</span></td>
                    <td className="p-4">Highly competitive<br/><span className="text-sm text-gray-500">(rare for international)</span></td>
                    <td className="p-4">Limited<br/><span className="text-sm text-gray-500">(very competitive)</span></td>
                    <td className="p-4">Moderate<br/><span className="text-sm text-gray-500">(competitive)</span></td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold">Cultural Adaptation</td>
                    <td className="p-4 bg-green-50">Easy<br/><span className="text-sm text-green-600">(similar culture)</span></td>
                    <td className="p-4">Challenging</td>
                    <td className="p-4">Challenging</td>
                    <td className="p-4">Moderate</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold">Visa Process</td>
                    <td className="p-4 bg-green-50">Simple<br/><span className="text-sm text-green-600">(high approval rate)</span></td>
                    <td className="p-4">Complex<br/><span className="text-sm text-gray-500">(lower approval)</span></td>
                    <td className="p-4">Moderate</td>
                    <td className="p-4">Moderate</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-8 text-center">
              <p className="text-xl text-gray-700 mb-6">
                <strong>Save 70-80% on education costs</strong> while getting the same quality education at Sharda University!
              </p>
              <ApplicationCTA 
                variant="primary"
                source="scholarship-bd-page"
                context="comparison"
              />
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Scholarship FAQs</h2>
            
            <div className="max-w-3xl mx-auto space-y-6">
              <details className="bg-gray-50 p-6 rounded-lg">
                <summary className="font-semibold text-lg cursor-pointer">
                  What scholarships are available for Bangladeshi students at Sharda University?
                </summary>
                <p className="mt-4 text-gray-700">
                  Sharda University offers merit-based scholarships: 50% tuition fee waiver for GPA 3.5-5.0, 20% for GPA 3.0-3.4, 
                  and 25% flat scholarship for B.Sc. Nursing students. These apply to most undergraduate and postgraduate programs.
                </p>
              </details>

              <details className="bg-gray-50 p-6 rounded-lg">
                <summary className="font-semibold text-lg cursor-pointer">
                  How do I qualify for 50% scholarship at Sharda University?
                </summary>
                <p className="mt-4 text-gray-700">
                  Bangladeshi students with GPA 3.5 to 5.0 in their HSC examination automatically qualify for 50% scholarship 
                  on tuition fees for programs like B.Tech, BBA, MBA, and BCA. No separate application needed - it's applied 
                  automatically based on your HSC results.
                </p>
              </details>

              <details className="bg-gray-50 p-6 rounded-lg">
                <summary className="font-semibold text-lg cursor-pointer">
                  Can I keep my scholarship for all years at Sharda University?
                </summary>
                <p className="mt-4 text-gray-700">
                  Yes, scholarships continue from year 2 onwards if you pass all subjects without backlog and maintain 75% attendance. 
                  Failure to meet these conditions results in permanent loss of scholarship for all subsequent years.
                </p>
              </details>

              <details className="bg-gray-50 p-6 rounded-lg">
                <summary className="font-semibold text-lg cursor-pointer">
                  Which programs are eligible for scholarship at Sharda University?
                </summary>
                <p className="mt-4 text-gray-700">
                  B.Tech, BBA, MBA, and BCA programs offer up to 50% scholarship. B.Sc. Nursing offers 25% flat scholarship. 
                  MBBS, BDS, Pharmacy (B.Pharm, D.Pharm), M.Sc. Nursing, and MPT do not offer any scholarships.
                </p>
              </details>

              <details className="bg-gray-50 p-6 rounded-lg">
                <summary className="font-semibold text-lg cursor-pointer">
                  How much money can I save with Sharda University scholarship?
                </summary>
                <p className="mt-4 text-gray-700">
                  With 50% scholarship on B.Tech CSE (₹2,70,000/year), you save ₹1,35,000 annually or ₹5,40,000 over 4 years. 
                  For MBA, you save ₹2,80,000 over 2 years. This makes quality education highly affordable compared to Western universities.
                </p>
              </details>

              <details className="bg-gray-50 p-6 rounded-lg">
                <summary className="font-semibold text-lg cursor-pointer">
                  Do I need to apply separately for the scholarship?
                </summary>
                <p className="mt-4 text-gray-700">
                  No separate application is required. The scholarship is automatically calculated and applied based on your 
                  HSC GPA when you submit your admission application. The scholarship amount will be reflected in your offer letter.
                </p>
              </details>

              <details className="bg-gray-50 p-6 rounded-lg">
                <summary className="font-semibold text-lg cursor-pointer">
                  Is the scholarship applicable on hostel and other fees?
                </summary>
                <p className="mt-4 text-gray-700">
                  No, the scholarship applies only to tuition fees. Hostel fees, mess charges, registration fees, and other 
                  miscellaneous charges are not covered by the scholarship and must be paid in full.
                </p>
              </details>

              <details className="bg-gray-50 p-6 rounded-lg">
                <summary className="font-semibold text-lg cursor-pointer">
                  Can I get scholarship if my GPA is below 3.0?
                </summary>
                <p className="mt-4 text-gray-700">
                  Unfortunately, no. The minimum GPA requirement for any scholarship is 3.0. Students with GPA below 3.0 
                  must pay the full tuition fee without any discount.
                </p>
              </details>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-16 bg-gradient-to-r from-green-600 to-green-800 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Claim Your Scholarship Today!</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Don't miss out on up to 50% scholarship. Apply now for 2026-27 admission and start your journey to success.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <ApplicationCTA 
                variant="primary"
                source="scholarship-bd-page"
                context="final-cta"
              />
              <WhatsAppCTA 
                context="Scholarship for Bangladeshi Students - Final CTA"
                variant="button"
              />
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ScholarshipBangladeshiStudents;
