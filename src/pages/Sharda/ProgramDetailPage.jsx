/**
 * Reusable Program Detail Page Template
 * Feature: sharda-university-content-enhancement
 * 
 * Generic template for individual program pages with SEO optimization
 * Requirements: 3.7, 4.1, 4.4, 14.4
 */

import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import SEOMetaTags from '../../components/SEO/SEOMetaTags';
import StructuredData from '../../components/SEO/StructuredData';
import ApplicationCTA from '../../components/Sharda/ApplicationCTA';
import WhatsAppCTA from '../../components/Sharda/WhatsAppCTA';
import FeeCalculator from '../../components/Sharda/FeeCalculator';
import { shardaPrograms, scholarshipRules } from '../../data/shardaData';

/**
 * ProgramDetailPage Component
 * 
 * Reusable template for displaying detailed program information
 * Includes: Overview, Curriculum, Fees, Eligibility, Career Prospects
 * 
 * @param {Object} props
 * @param {string} props.programId - Program ID from shardaData
 * @param {string} props.pageTitle - SEO page title
 * @param {string} props.metaDescription - SEO meta description
 * @param {string[]} props.keywords - SEO keywords
 * @param {string} props.canonicalPath - Canonical URL path
 * @param {string} props.overview - Program overview content (800+ words)
 * @param {Object} props.careerProspects - Career prospects information
 * @param {string[]} props.careerProspects.roles - Job roles
 * @param {string[]} props.careerProspects.industries - Industries
 * @param {string[]} props.careerProspects.skills - Key skills
 * @param {Object[]} props.highlights - Program highlights
 * @param {Object[]} props.faqs - Frequently asked questions
 */
const ProgramDetailPage = ({
  programId,
  pageTitle,
  metaDescription,
  keywords,
  canonicalPath,
  overview,
  careerProspects,
  highlights,
  faqs,
}) => {
  // Get program data
  const program = shardaPrograms.find(p => p.id === programId);
  
  if (!program) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Program Not Found</h1>
        <p className="text-gray-600 mb-8">The requested program could not be found.</p>
        <Link to="/sharda-university" className="text-blue-600 hover:text-blue-700 font-semibold">
          Return to Sharda University
        </Link>
      </div>
    );
  }

  // Generate structured data
  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: program.name,
    description: metaDescription,
    provider: {
      '@type': 'EducationalOrganization',
      name: 'Sharda University',
      url: 'https://global.sharda.ac.in/',
    },
    offers: {
      '@type': 'Offer',
      category: 'Tuition Fees',
      price: program.fees.tuitionPerYear,
      priceCurrency: 'INR',
    },
    educationalCredentialAwarded: program.level === 'undergraduate' ? 'Bachelor Degree' : 'Master Degree',
    timeToComplete: `P${program.duration.split(' ')[0]}Y`,
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://www.nextgenlearning.dev',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Sharda University',
        item: 'https://www.nextgenlearning.dev/sharda-university',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: program.name,
        item: `https://www.nextgenlearning.dev${canonicalPath}`,
      },
    ],
  };

  const faqSchema = faqs && faqs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  } : null;

  return (
    <>
      <SEOMetaTags
        title={pageTitle}
        description={metaDescription}
        keywords={keywords}
        canonicalUrl={canonicalPath}
      />
      
      <StructuredData data={courseSchema} />
      <StructuredData data={breadcrumbSchema} />
      {faqSchema && <StructuredData data={faqSchema} />}

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
              <Link to="/sharda-university" className="hover:text-blue-600 transition-colors">
                Sharda University
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-gray-900 font-medium" aria-current="page">
              {program.name}
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
                {program.name}
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-blue-100">
                {program.duration} • {program.discipline} • Sharda University
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <ApplicationCTA
                  variant="secondary"
                  source={`${programId}-page`}
                  context="hero-section"
                  program={program.name}
                />
                <WhatsAppCTA
                  context={`${program.name} - Want to know more about this program`}
                  variant="button"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Quick Stats */}
        <section className="py-12 bg-white border-b">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                    {program.duration}
                  </div>
                  <p className="text-gray-600 text-sm md:text-base">Duration</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                    ₹{(program.fees.tuitionPerYear / 100000).toFixed(1)}L
                  </div>
                  <p className="text-gray-600 text-sm md:text-base">Annual Fee</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                    50%
                  </div>
                  <p className="text-gray-600 text-sm md:text-base">Max Scholarship</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                    {program.accreditation ? 'NBA' : 'UGC'}
                  </div>
                  <p className="text-gray-600 text-sm md:text-base">Accreditation</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Program Overview */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
                Program Overview
              </h2>
              <div className="prose prose-lg max-w-none text-gray-700">
                {overview.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Curriculum */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
                Curriculum Highlights
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                {program.curriculum.map((subject, index) => (
                  <div key={index} className="bg-blue-50 rounded-lg p-6 flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{subject}</h3>
                    </div>
                  </div>
                ))}
              </div>

              {program.specializations && program.specializations.length > 0 && (
                <div className="mt-12 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Specializations Available
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {program.specializations.map((spec, index) => (
                      <span
                        key={index}
                        className="bg-white px-4 py-2 rounded-full text-gray-700 font-medium shadow-sm"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Fees Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
                Fee Structure
              </h2>
              
              <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-blue-600 text-white">
                      <tr>
                        <th className="px-6 py-4 text-left font-semibold">Fee Component</th>
                        <th className="px-6 py-4 text-right font-semibold">Amount (INR)</th>
                        <th className="px-6 py-4 text-right font-semibold">Frequency</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr className="hover:bg-gray-50">
                        <td className="px-6 py-4 font-semibold text-gray-900">Tuition Fee</td>
                        <td className="px-6 py-4 text-right text-gray-700">
                          ₹{program.fees.tuitionPerYear.toLocaleString('en-IN')}
                        </td>
                        <td className="px-6 py-4 text-right text-gray-600">Per Year</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-6 py-4 font-semibold text-gray-900">Hostel Fee</td>
                        <td className="px-6 py-4 text-right text-gray-700">
                          ₹{program.fees.hostel.toLocaleString('en-IN')}
                        </td>
                        <td className="px-6 py-4 text-right text-gray-600">Per Year</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-6 py-4 font-semibold text-gray-900">Mess Fee</td>
                        <td className="px-6 py-4 text-right text-gray-700">
                          ₹{program.fees.mess.toLocaleString('en-IN')}
                        </td>
                        <td className="px-6 py-4 text-right text-gray-600">Per Year</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-6 py-4 font-semibold text-gray-900">Registration Fee</td>
                        <td className="px-6 py-4 text-right text-gray-700">
                          ₹{program.fees.registration.toLocaleString('en-IN')}
                        </td>
                        <td className="px-6 py-4 text-right text-gray-600">One-time</td>
                      </tr>
                      <tr className="bg-blue-50 font-bold">
                        <td className="px-6 py-4 text-gray-900">Total Cost</td>
                        <td className="px-6 py-4 text-right text-blue-600 text-lg">
                          ₹{program.fees.total.toLocaleString('en-IN')}
                        </td>
                        <td className="px-6 py-4 text-right text-gray-600">{program.duration}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="bg-yellow-50 rounded-lg p-6 border-l-4 border-yellow-500 mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  💰 Scholarship Opportunities
                </h3>
                <p className="text-gray-700 mb-4">
                  Bangladeshi students can receive up to 50% scholarship on tuition fees based on HSC GPA. 
                  Students with GPA 3.5-5.0 get 50% off, and GPA 3.0-3.49 get 20% off.
                </p>
                <Link
                  to="/sharda-university/scholarship-bangladeshi-students-india"
                  className="text-blue-600 hover:text-blue-700 font-semibold"
                >
                  Learn more about scholarships →
                </Link>
              </div>

              {/* Fee Calculator */}
              <div className="mt-12">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                  Calculate Your Fees
                </h3>
                <FeeCalculator
                  programs={shardaPrograms}
                  scholarshipRules={scholarshipRules}
                  defaultProgram={programId}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Eligibility */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
                Eligibility Criteria
              </h2>
              
              <div className="space-y-6">
                {program.eligibility.map((criteria, index) => (
                  <div key={index} className="bg-blue-50 rounded-lg p-6 border-l-4 border-blue-600">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {criteria.type} Requirements
                    </h3>
                    <p className="text-gray-700">{criteria.description}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 bg-green-50 rounded-lg p-6 border-l-4 border-green-600">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  For Bangladeshi Students
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span>HSC certificate with required percentage/GPA</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span>Valid passport (minimum 6 months validity)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span>English proficiency (IELTS/TOEFL or equivalent)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span>Medical fitness certificate</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Career Prospects */}
        {careerProspects && (
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
                  Career Prospects
                </h2>
                
                <div className="grid md:grid-cols-3 gap-8">
                  {/* Job Roles */}
                  <div className="bg-white rounded-lg p-6 shadow-lg">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mb-4">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Job Roles</h3>
                    <ul className="space-y-2">
                      {careerProspects.roles.map((role, index) => (
                        <li key={index} className="text-gray-700 flex items-start">
                          <span className="text-blue-600 mr-2">•</span>
                          <span>{role}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Industries */}
                  <div className="bg-white rounded-lg p-6 shadow-lg">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mb-4">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Industries</h3>
                    <ul className="space-y-2">
                      {careerProspects.industries.map((industry, index) => (
                        <li key={index} className="text-gray-700 flex items-start">
                          <span className="text-blue-600 mr-2">•</span>
                          <span>{industry}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Key Skills */}
                  <div className="bg-white rounded-lg p-6 shadow-lg">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mb-4">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Key Skills</h3>
                    <ul className="space-y-2">
                      {careerProspects.skills.map((skill, index) => (
                        <li key={index} className="text-gray-700 flex items-start">
                          <span className="text-blue-600 mr-2">•</span>
                          <span>{skill}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-12 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                    Placement Statistics
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                    <div>
                      <div className="text-3xl font-bold text-blue-600 mb-2">85%+</div>
                      <p className="text-gray-700">Placement Rate</p>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-blue-600 mb-2">₹4.5L</div>
                      <p className="text-gray-700">Average Package</p>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-blue-600 mb-2">₹17L</div>
                      <p className="text-gray-700">Highest Package</p>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-blue-600 mb-2">600+</div>
                      <p className="text-gray-700">Companies</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Program Highlights */}
        {highlights && highlights.length > 0 && (
          <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
                  Why Choose This Program?
                </h2>
                
                <div className="grid md:grid-cols-3 gap-8">
                  {highlights.map((highlight, index) => (
                    <div key={index} className="bg-blue-50 rounded-lg p-6 text-center">
                      <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl text-white">{highlight.icon}</span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">{highlight.title}</h3>
                      <p className="text-gray-700">{highlight.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* FAQs */}
        {faqs && faqs.length > 0 && (
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
                  Frequently Asked Questions
                </h2>
                
                <div className="space-y-4">
                  {faqs.map((faq, index) => (
                    <details key={index} className="bg-white rounded-lg p-6 group">
                      <summary className="font-bold text-gray-900 cursor-pointer list-none flex justify-between items-center">
                        <span>{faq.question}</span>
                        <span className="text-blue-600 group-open:rotate-180 transition-transform">▼</span>
                      </summary>
                      <p className="mt-4 text-gray-700">{faq.answer}</p>
                    </details>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Final CTA */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Start Your Journey?
              </h2>
              <p className="text-xl mb-8 text-blue-100">
                Apply now for 2026-27 admissions and get up to 50% scholarship
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <ApplicationCTA
                  variant="secondary"
                  source={`${programId}-page`}
                  context="bottom-cta"
                  program={program.name}
                />
                <WhatsAppCTA
                  context={`${program.name} - Ready to apply`}
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

ProgramDetailPage.propTypes = {
  programId: PropTypes.string.isRequired,
  pageTitle: PropTypes.string.isRequired,
  metaDescription: PropTypes.string.isRequired,
  keywords: PropTypes.arrayOf(PropTypes.string).isRequired,
  canonicalPath: PropTypes.string.isRequired,
  overview: PropTypes.string.isRequired,
  careerProspects: PropTypes.shape({
    roles: PropTypes.arrayOf(PropTypes.string).isRequired,
    industries: PropTypes.arrayOf(PropTypes.string).isRequired,
    skills: PropTypes.arrayOf(PropTypes.string).isRequired,
  }),
  highlights: PropTypes.arrayOf(PropTypes.shape({
    icon: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  })),
  faqs: PropTypes.arrayOf(PropTypes.shape({
    question: PropTypes.string.isRequired,
    answer: PropTypes.string.isRequired,
  })),
};

export default ProgramDetailPage;
