/**
 * Sharda University NIRF Ranking Page
 * Feature: sharda-university-content-enhancement
 * 
 * SEO-optimized page targeting "sharda university nirf ranking" keyword
 * Requirements: 3.1, 3.2
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { shardaRankings, shardaProfile, shardaAccreditations } from '../../data/shardaData';
import SEOMetaTags from '../../components/SEO/SEOMetaTags';
import StructuredData from '../../components/SEO/StructuredData';
import ApplicationCTA from '../../components/Sharda/ApplicationCTA';
import WhatsAppCTA from '../../components/Sharda/WhatsAppCTA';

const ShardaNIRFRanking = () => {
  // Filter NIRF rankings
  const nirfRankings = shardaRankings.filter(r => r.organization === 'NIRF');
  
  // Structured data for the page
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: shardaProfile.name,
    url: 'https://global.sharda.ac.in/',
    description: `${shardaProfile.name} - NIRF Ranked University in India`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Greater Noida',
      addressRegion: 'Uttar Pradesh',
      addressCountry: 'IN',
    },
    award: nirfRankings.map(r => `NIRF ${r.category || 'University'} Ranking ${r.rank} (${r.year})`),
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
        name: 'NIRF Ranking',
        item: 'https://www.nextgenlearning.dev/sharda-university/nirf-ranking',
      },
    ],
  };

  return (
    <>
      <SEOMetaTags
        title="Sharda University NIRF Ranking 2024 | National Rankings & Accreditations"
        description="Sharda University NIRF Ranking 2024: Ranked 151-200 in University category, 201-250 in Engineering. NAAC A+ accredited. Explore detailed rankings and achievements."
        keywords={[
          'sharda university nirf ranking',
          'sharda university ranking',
          'nirf ranking sharda',
          'sharda university 2024 ranking',
          'sharda university national ranking',
          'sharda university accreditation',
        ]}
        canonicalUrl={`/sharda-university/nirf-ranking`}
      />
      
      <StructuredData data={organizationSchema} />
      <StructuredData data={breadcrumbSchema} />

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
              NIRF Ranking
            </li>
          </ol>
        </nav>

        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Sharda University NIRF Ranking 2024
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-blue-100">
                Nationally Recognized Excellence in Higher Education
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <ApplicationCTA
                  variant="secondary"
                  source="nirf-ranking-page"
                  context="hero-section"
                />
                <WhatsAppCTA
                  context="NIRF Ranking - Want to know more about Sharda University rankings"
                  variant="button"
                />
              </div>
            </div>
          </div>
        </section>

        {/* NIRF Rankings Overview */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
                NIRF Rankings 2024
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8 mb-12">
                {nirfRankings.map((ranking, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg shadow-lg p-8 border-t-4 border-blue-600"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-2xl font-bold text-gray-900">
                        {ranking.category || 'University'} Category
                      </h3>
                      <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full font-bold text-lg">
                        {ranking.year}
                      </span>
                    </div>
                    <div className="text-center py-6">
                      <div className="text-5xl font-bold text-blue-600 mb-2">
                        {ranking.rank}
                      </div>
                      <p className="text-gray-600 text-lg">
                        National Ranking
                      </p>
                    </div>
                    <p className="text-gray-700 mt-4">
                      Sharda University has been ranked <strong>{ranking.rank}</strong> in the{' '}
                      <strong>{ranking.category || 'University'}</strong> category by NIRF (National Institutional Ranking Framework) in {ranking.year}.
                    </p>
                  </div>
                ))}
              </div>

              {/* What is NIRF */}
              <div className="bg-white rounded-lg shadow-md p-8 mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  What is NIRF Ranking?
                </h3>
                <p className="text-gray-700 mb-4">
                  The <strong>National Institutional Ranking Framework (NIRF)</strong> is India's official ranking system launched by the Ministry of Education, Government of India. NIRF evaluates institutions across multiple parameters to provide comprehensive rankings.
                </p>
                <div className="grid md:grid-cols-2 gap-6 mt-6">
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">Evaluation Parameters:</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-2">•</span>
                        <span>Teaching, Learning & Resources (30%)</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-2">•</span>
                        <span>Research and Professional Practice (30%)</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-2">•</span>
                        <span>Graduation Outcomes (20%)</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-2">•</span>
                        <span>Outreach and Inclusivity (10%)</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-2">•</span>
                        <span>Perception (10%)</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">Why NIRF Matters:</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-2">•</span>
                        <span>Official government ranking system</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-2">•</span>
                        <span>Transparent and data-driven methodology</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-2">•</span>
                        <span>Comprehensive evaluation across all aspects</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-2">•</span>
                        <span>Recognized by students, employers, and institutions</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Accreditations Section */}
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
                    className="bg-gradient-to-br from-blue-50 to-white rounded-lg shadow-md p-6 border border-blue-100"
                  >
                    <div className="text-center">
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
                  </div>
                ))}
              </div>

              <div className="bg-blue-50 rounded-lg p-8 border-l-4 border-blue-600">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Why Choose a NIRF Ranked University?
                </h3>
                <div className="grid md:grid-cols-2 gap-6 text-gray-700">
                  <div>
                    <h4 className="font-bold mb-2">Academic Excellence</h4>
                    <p>NIRF rankings reflect quality of education, faculty expertise, and research output, ensuring you receive world-class education.</p>
                  </div>
                  <div>
                    <h4 className="font-bold mb-2">Better Career Prospects</h4>
                    <p>Graduates from NIRF ranked universities are preferred by top employers and have better placement opportunities.</p>
                  </div>
                  <div>
                    <h4 className="font-bold mb-2">Quality Infrastructure</h4>
                    <p>Ranked universities maintain high standards in infrastructure, laboratories, libraries, and learning resources.</p>
                  </div>
                  <div>
                    <h4 className="font-bold mb-2">Global Recognition</h4>
                    <p>NIRF rankings enhance the university's reputation internationally, benefiting students pursuing higher studies abroad.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Key Highlights */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
                What Makes Sharda University Stand Out
              </h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {shardaProfile.keyHighlights.map((highlight, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow"
                  >
                    <p className="text-gray-900 font-semibold">{highlight}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* International Rankings */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
                International Rankings
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                {shardaRankings
                  .filter(r => r.scope === 'international')
                  .map((ranking, index) => (
                    <div
                      key={index}
                      className="bg-gradient-to-br from-purple-50 to-white rounded-lg shadow-md p-6 border border-purple-100"
                    >
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {ranking.organization}
                      </h3>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-3xl font-bold text-purple-600">
                            {ranking.rank}
                          </p>
                          <p className="text-gray-600">{ranking.year}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-600 capitalize">
                            {ranking.scope} Ranking
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>

              <div className="mt-8 text-center">
                <p className="text-gray-700 mb-6">
                  Sharda University's consistent performance in both national and international rankings demonstrates its commitment to academic excellence and global standards.
                </p>
                <Link
                  to="/sharda-university"
                  className="inline-block text-blue-600 hover:text-blue-700 font-semibold"
                >
                  Learn more about Sharda University →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Join a NIRF Ranked University
              </h2>
              <p className="text-xl mb-8 text-blue-100">
                Be part of an institution recognized for academic excellence, quality education, and outstanding placements.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <ApplicationCTA
                  variant="secondary"
                  source="nirf-ranking-page"
                  context="bottom-cta"
                />
                <WhatsAppCTA
                  context="NIRF Ranking - I want to apply to Sharda University"
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

export default ShardaNIRFRanking;
