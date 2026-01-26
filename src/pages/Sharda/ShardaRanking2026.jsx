/**
 * Sharda University Ranking 2026 Page
 * Feature: sharda-university-content-enhancement
 * 
 * SEO-optimized page targeting "sharda university ranking 2026" keyword
 * Requirements: 3.1, 3.2
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { shardaRankings, shardaProfile, shardaAccreditations, shardaPlacements } from '../../data/shardaData';
import SEOMetaTags from '../../components/SEO/SEOMetaTags';
import StructuredData from '../../components/SEO/StructuredData';
import ApplicationCTA from '../../components/Sharda/ApplicationCTA';
import WhatsAppCTA from '../../components/Sharda/WhatsAppCTA';

const ShardaRanking2026 = () => {
  // Structured data for the page
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: shardaProfile.name,
    url: 'https://global.sharda.ac.in/',
    description: `${shardaProfile.name} - Rankings, Accreditations & Achievements 2026`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Greater Noida',
      addressRegion: 'Uttar Pradesh',
      addressCountry: 'IN',
    },
    award: shardaRankings.map(r => `${r.organization} Ranking ${r.rank} (${r.year})`),
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
        name: 'Ranking 2026',
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
        name: "What is Sharda University's NIRF ranking?",
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Sharda University is ranked 151-200 in the University category and 201-250 in the Engineering category by NIRF (National Institutional Ranking Framework) 2024.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is Sharda University internationally recognized?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, Sharda University is ranked 651-700 in QS Asia Rankings and 801-1000 in Times Higher Education World University Rankings, demonstrating international recognition.',
        },
      },
      {
        '@type': 'Question',
        name: 'What accreditations does Sharda University have?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Sharda University holds NAAC A+ Grade accreditation, UGC recognition, and NBA accreditation for engineering programs, ensuring quality education standards.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the placement rate at Sharda University?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Sharda University has an 85% placement rate with over 600 companies recruiting on campus. The highest package offered is ₹1.7 Crore and average package is ₹4.5 LPA.',
        },
      },
      {
        '@type': 'Question',
        name: 'Are scholarships available for international students?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, Bangladeshi students can receive up to 50% scholarship based on HSC GPA (50% for GPA 3.5-5.0, 20% for GPA 3.0-3.4). Other international students also have scholarship opportunities.',
        },
      },
    ],
  };

  return (
    <>
      <SEOMetaTags
        title="Sharda University Ranking 2026 | NIRF, QS, THE Rankings & Accreditations"
        description="Sharda University Ranking 2026: NIRF 151-200, QS Asia 651-700, THE 801-1000. NAAC A+ accredited. Explore complete rankings, placements, and admission details for 2026-27."
        keywords={[
          'sharda university ranking 2026',
          'sharda university ranking',
          'sharda ranking 2026',
          'sharda university 2026',
          'sharda university admission 2026',
          'sharda university placement 2026',
        ]}
        canonicalUrl={`${window.location.origin}/sharda/ranking-2026`}
      />
      
      <StructuredData data={organizationSchema} />
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
              Ranking 2026
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
                Sharda University Ranking 2026
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-blue-100">
                Nationally & Internationally Ranked University | NAAC A+ Accredited
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <ApplicationCTA
                  variant="secondary"
                  source="ranking-2026-page"
                  context="hero-section"
                />
                <WhatsAppCTA
                  context="Ranking 2026 - Want to know more about Sharda University"
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
                    151-200
                  </div>
                  <p className="text-gray-600 text-sm md:text-base">NIRF University Ranking</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                    A+
                  </div>
                  <p className="text-gray-600 text-sm md:text-base">NAAC Grade</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                    95+
                  </div>
                  <p className="text-gray-600 text-sm md:text-base">Countries Represented</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                    85%
                  </div>
                  <p className="text-gray-600 text-sm md:text-base">Placement Rate</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* All Rankings Overview */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
                Sharda University Rankings 2024-2026
              </h2>
              
              <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-blue-600 text-white">
                      <tr>
                        <th className="px-6 py-4 text-left font-semibold">Ranking Body</th>
                        <th className="px-6 py-4 text-left font-semibold">Category</th>
                        <th className="px-6 py-4 text-left font-semibold">Rank</th>
                        <th className="px-6 py-4 text-left font-semibold">Year</th>
                        <th className="px-6 py-4 text-left font-semibold">Scope</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {shardaRankings.map((ranking, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-6 py-4 font-semibold text-gray-900">
                            {ranking.organization}
                          </td>
                          <td className="px-6 py-4 text-gray-700">
                            {ranking.category || 'Overall'}
                          </td>
                          <td className="px-6 py-4">
                            <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-semibold">
                              {ranking.rank}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-gray-700">{ranking.year}</td>
                          <td className="px-6 py-4">
                            <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                              ranking.scope === 'national' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-purple-100 text-purple-800'
                            }`}>
                              {ranking.scope.charAt(0).toUpperCase() + ranking.scope.slice(1)}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Mobile-friendly cards for rankings */}
              <div className="md:hidden space-y-4">
                {shardaRankings.map((ranking, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-bold text-gray-900 text-lg">
                        {ranking.organization}
                      </h3>
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-semibold text-sm">
                        {ranking.rank}
                      </span>
                    </div>
                    <div className="space-y-2 text-sm">
                      <p className="text-gray-700">
                        <span className="font-medium">Category:</span> {ranking.category || 'Overall'}
                      </p>
                      <p className="text-gray-700">
                        <span className="font-medium">Year:</span> {ranking.year}
                      </p>
                      <p>
                        <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                          ranking.scope === 'national' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-purple-100 text-purple-800'
                        }`}>
                          {ranking.scope.charAt(0).toUpperCase() + ranking.scope.slice(1)}
                        </span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Accreditations */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
                Accreditations & Recognition
              </h2>
              
              <div className="grid md:grid-cols-3 gap-6 mb-12">
                {shardaAccreditations.map((accreditation, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-blue-50 to-white rounded-lg shadow-md p-6 border border-blue-100 text-center"
                  >
                    <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg
                        className="w-8 h-8 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {accreditation.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-2">
                      {accreditation.body}
                    </p>
                    <p className="text-blue-600 font-semibold">
                      {accreditation.year}
                      {accreditation.validity && ` (${accreditation.validity})`}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Placement Statistics */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
                Placement Achievements 2024
              </h2>
              
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white rounded-lg shadow-md p-6 text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">
                    ₹{(shardaPlacements.highestPackage / 10000000).toFixed(1)} Cr
                  </div>
                  <p className="text-gray-600">Highest Package</p>
                </div>
                <div className="bg-white rounded-lg shadow-md p-6 text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">
                    ₹{(shardaPlacements.averagePackage / 100000).toFixed(1)} LPA
                  </div>
                  <p className="text-gray-600">Average Package</p>
                </div>
                <div className="bg-white rounded-lg shadow-md p-6 text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">
                    {shardaPlacements.companiesVisited}+
                  </div>
                  <p className="text-gray-600">Recruiting Companies</p>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                  Top Recruiters
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {shardaPlacements.topRecruiters.map((recruiter, index) => (
                    <div
                      key={index}
                      className="bg-gray-50 rounded-lg p-4 text-center font-semibold text-gray-700 hover:bg-blue-50 transition-colors"
                    >
                      {recruiter}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Rankings Matter */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
                Why University Rankings Matter
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-blue-50 rounded-lg p-6 border-l-4 border-blue-600">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    Quality Assurance
                  </h3>
                  <p className="text-gray-700">
                    Rankings provide an objective measure of educational quality, infrastructure, faculty expertise, and research output. A ranked university ensures you receive education that meets national and international standards.
                  </p>
                </div>

                <div className="bg-blue-50 rounded-lg p-6 border-l-4 border-blue-600">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    Career Advantages
                  </h3>
                  <p className="text-gray-700">
                    Employers prefer graduates from ranked universities. Better placement opportunities, higher starting salaries, and faster career progression are common benefits for students from well-ranked institutions.
                  </p>
                </div>

                <div className="bg-blue-50 rounded-lg p-6 border-l-4 border-blue-600">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    Global Recognition
                  </h3>
                  <p className="text-gray-700">
                    International rankings like QS and THE enhance your degree's value globally. This is crucial for students planning to pursue higher studies abroad or work in international companies.
                  </p>
                </div>

                <div className="bg-blue-50 rounded-lg p-6 border-l-4 border-blue-600">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    Research Excellence
                  </h3>
                  <p className="text-gray-700">
                    Ranked universities invest heavily in research infrastructure and faculty development. Students benefit from exposure to cutting-edge research, modern laboratories, and industry collaborations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Admission 2026-27 */}
        <section className="py-16 bg-gradient-to-br from-blue-50 to-purple-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-lg shadow-xl p-8 md:p-12">
                <div className="text-center mb-8">
                  <div className="inline-block bg-yellow-400 text-gray-900 px-4 py-2 rounded-full font-bold mb-4">
                    Applications Open Now
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    Admissions 2026-27
                  </h2>
                  <p className="text-xl text-gray-700">
                    Join a nationally and internationally ranked university
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="font-bold text-gray-900 mb-3">For Bangladeshi Students</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-2">✓</span>
                        <span>50% scholarship for GPA 3.5-5.0</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-2">✓</span>
                        <span>20% scholarship for GPA 3.0-3.4</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-2">✓</span>
                        <span>Easy visa process</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-2">✓</span>
                        <span>Large Bangladeshi community</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="font-bold text-gray-900 mb-3">Key Benefits</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-2">✓</span>
                        <span>NAAC A+ accredited programs</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-2">✓</span>
                        <span>85% placement rate</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-2">✓</span>
                        <span>600+ recruiting companies</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-2">✓</span>
                        <span>Students from 95+ countries</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <ApplicationCTA
                    variant="primary"
                    source="ranking-2026-page"
                    context="admission-section"
                  />
                  <WhatsAppCTA
                    context="Ranking 2026 - I want to apply for 2026-27 admission"
                    variant="button"
                  />
                </div>
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
                    <span>What is Sharda University's NIRF ranking?</span>
                    <span className="text-blue-600 group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <p className="mt-4 text-gray-700">
                    Sharda University is ranked 151-200 in the University category and 201-250 in the Engineering category by NIRF (National Institutional Ranking Framework) 2024.
                  </p>
                </details>

                <details className="bg-gray-50 rounded-lg p-6 group">
                  <summary className="font-bold text-gray-900 cursor-pointer list-none flex justify-between items-center">
                    <span>Is Sharda University internationally recognized?</span>
                    <span className="text-blue-600 group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <p className="mt-4 text-gray-700">
                    Yes, Sharda University is ranked 651-700 in QS Asia Rankings and 801-1000 in Times Higher Education World University Rankings, demonstrating international recognition.
                  </p>
                </details>

                <details className="bg-gray-50 rounded-lg p-6 group">
                  <summary className="font-bold text-gray-900 cursor-pointer list-none flex justify-between items-center">
                    <span>What accreditations does Sharda University have?</span>
                    <span className="text-blue-600 group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <p className="mt-4 text-gray-700">
                    Sharda University holds NAAC A+ Grade accreditation, UGC recognition, and NBA accreditation for engineering programs, ensuring quality education standards.
                  </p>
                </details>

                <details className="bg-gray-50 rounded-lg p-6 group">
                  <summary className="font-bold text-gray-900 cursor-pointer list-none flex justify-between items-center">
                    <span>What is the placement rate at Sharda University?</span>
                    <span className="text-blue-600 group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <p className="mt-4 text-gray-700">
                    Sharda University has an 85% placement rate with over 600 companies recruiting on campus. The highest package offered is ₹1.7 Crore and average package is ₹4.5 LPA.
                  </p>
                </details>

                <details className="bg-gray-50 rounded-lg p-6 group">
                  <summary className="font-bold text-gray-900 cursor-pointer list-none flex justify-between items-center">
                    <span>Are scholarships available for international students?</span>
                    <span className="text-blue-600 group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <p className="mt-4 text-gray-700">
                    Yes, Bangladeshi students can receive up to 50% scholarship based on HSC GPA (50% for GPA 3.5-5.0, 20% for GPA 3.0-3.4). Other international students also have scholarship opportunities.
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
                Ready to Join Sharda University?
              </h2>
              <p className="text-xl mb-8 text-blue-100">
                Apply now for 2026-27 admissions and be part of a nationally ranked institution with global recognition.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <ApplicationCTA
                  variant="secondary"
                  source="ranking-2026-page"
                  context="bottom-cta"
                />
                <WhatsAppCTA
                  context="Ranking 2026 - Ready to apply to Sharda University"
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

export default ShardaRanking2026;
