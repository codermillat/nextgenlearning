import React, { memo, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ApplicationCTA from '../../components/Sharda/ApplicationCTA';
import WhatsAppCTA from '../../components/Sharda/WhatsAppCTA';
import SEOMetaTags from '../../components/SEO/SEOMetaTags';
import StructuredData from '../../components/SEO/StructuredData';
import shardaUniversityData from '../../data/shardaData';
import { useShardaAnalytics } from '../../hooks/useAnalytics';

/**
 * ShardaLandingPage Component
 * Feature: sharda-university-content-enhancement
 * 
 * Comprehensive landing page for Sharda University with all key sections.
 * Integrates ApplicationCTA and WhatsAppCTA components throughout.
 * Includes automatic analytics tracking for page views, scroll depth, and time on page.
 * 
 * Validates: Requirements 1.1, 1.2, 1.3, 1.4, 17.1, 17.2, 17.4, 17.6
 * 
 * @param {Object} props - Component props
 * @param {string} [props.userCountry] - User's country for personalization
 * @param {string} [props.utmSource] - UTM source for tracking
 */
const ShardaLandingPage = memo(function ShardaLandingPage({
  userCountry = 'International',
  utmSource = 'organic',
}) {
  // Initialize analytics tracking for this page
  useShardaAnalytics({ contentType: 'landing' });

  const { profile, rankings, accreditations, programs, placements, campus, international, admissions } = shardaUniversityData;

  // SEO Configuration
  const pageTitle = 'Sharda University - Study in India | Admissions 2026-27 | NAAC A+ Accredited';
  const pageDescription = 'Sharda University: NAAC A+ accredited, NIRF ranked university with students from 95+ countries. Explore B.Tech, MBA, MBBS programs with scholarships up to 50%. Apply now for 2026-27 admissions.';
  const pageKeywords = [
    'sharda university',
    'sharda university admission',
    'sharda university fees',
    'sharda university ranking',
    'sharda university nirf ranking',
    'study in india',
    'indian university for international students',
    'b.tech in india',
    'engineering colleges in india',
    'naac a+ university',
  ];
  const canonicalUrl = '/sharda';

  // Organization Structured Data
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: profile.name,
    alternateName: 'Sharda University',
    url: 'https://www.sharda.ac.in',
    logo: 'https://www.sharda.ac.in/images/logo.png',
    description: 'Sharda University is a leading private university in India with NAAC A+ accreditation, offering diverse programs to students from 95+ countries.',
    foundingDate: profile.established.toString(),
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Plot No. 32-34, Knowledge Park III',
      addressLocality: 'Greater Noida',
      addressRegion: 'Uttar Pradesh',
      postalCode: '201310',
      addressCountry: 'IN',
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+91-88009-96151',
        contactType: 'Admissions',
        availableLanguage: ['English', 'Hindi', 'Bengali'],
        areaServed: ['IN', 'BD', 'NP', 'LK'],
      },
    ],
    sameAs: [
      'https://www.facebook.com/ShardaUniversity',
      'https://twitter.com/ShardaUniv',
      'https://www.linkedin.com/school/sharda-university',
      'https://www.instagram.com/shardauniversity',
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.5',
      bestRating: '5',
      worstRating: '1',
      ratingCount: '2500',
    },
    hasCredential: [
      {
        '@type': 'EducationalOccupationalCredential',
        credentialCategory: 'NAAC A+ Accreditation',
        recognizedBy: {
          '@type': 'Organization',
          name: 'National Assessment and Accreditation Council',
        },
      },
      {
        '@type': 'EducationalOccupationalCredential',
        credentialCategory: 'NIRF Ranking 151-200',
        recognizedBy: {
          '@type': 'Organization',
          name: 'National Institutional Ranking Framework',
        },
      },
    ],
    numberOfStudents: {
      '@type': 'QuantitativeValue',
      value: 25000,
    },
    alumni: [
      {
        '@type': 'Person',
        name: 'International Alumni Network',
        description: 'Students from 95+ countries',
      },
    ],
  };

  // FAQ Structured Data
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is the admission process for international students?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'International students can apply online through our website. Submit your academic documents, passport copy, and complete the application form. Our admissions team will guide you through the visa process and other formalities.',
        },
      },
      {
        '@type': 'Question',
        name: 'Are scholarships available for Bangladeshi students?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! Bangladeshi students with HSC GPA 3.5-5.0 receive 50% scholarship, and those with GPA 3.0-3.4 receive 20% scholarship on tuition fees. Scholarships are automatically applied based on your academic performance.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the total cost of studying at Sharda University?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The total cost varies by program. For example, B.Tech CSE costs approximately ₹10.6 lakhs for 4 years including tuition, hostel, and mess. Use our fee calculator to get an accurate estimate for your chosen program.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is hostel accommodation available?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, we have modern hostel facilities with a capacity of 5,000 students. Hostels are equipped with all necessary amenities including Wi-Fi, mess facilities, recreation rooms, and 24/7 security.',
        },
      },
      {
        '@type': 'Question',
        name: 'What are the placement opportunities?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Sharda University has an excellent placement record with 600+ companies visiting campus annually. Our highest package is ₹1.7 Crore, and 85% of students get placed. Top recruiters include Microsoft, Amazon, Google, and more.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is the university recognized internationally?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, Sharda University is UGC recognized and NAAC A+ accredited. We are ranked by NIRF, QS Asia, and Times Higher Education. Our degrees are recognized globally.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the medium of instruction?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'All programs are taught in English. This makes it easy for international students to adapt and learn effectively.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I apply for a student visa?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'After receiving your admission offer letter, you can apply for an Indian student visa at the Indian High Commission in your country. We provide complete guidance and support throughout the visa application process.',
        },
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* SEO Meta Tags */}
      <SEOMetaTags
        title={pageTitle}
        description={pageDescription}
        keywords={pageKeywords}
        canonicalUrl={canonicalUrl}
        ogImage="/images/sharda-university-og.jpg"
        ogType="website"
      />

      {/* Organization Structured Data */}
      <StructuredData data={organizationSchema} id="sharda-organization-schema" />

      {/* FAQ Structured Data */}
      <StructuredData data={faqSchema} id="sharda-faq-schema" />

      {/* Hero Section */}
      <HeroSection profile={profile} userCountry={userCountry} />

      {/* About Section */}
      <AboutSection profile={profile} accreditations={accreditations} />

      {/* Rankings Section */}
      <RankingsSection rankings={rankings} />

      {/* Programs Highlight Section */}
      <ProgramsSection programs={programs} userCountry={userCountry} />

      {/* Placements Section */}
      <PlacementsSection placements={placements} />

      {/* Campus Section */}
      <CampusSection campus={campus} />

      {/* Testimonials Section */}
      <TestimonialsSection userCountry={userCountry} />

      {/* FAQ Section */}
      <FAQSection />

      {/* Floating CTAs */}
      <ApplicationCTA
        variant="floating"
        source="landing-page"
        context="landing"
        country={userCountry}
        location="floating"
      />
      <WhatsAppCTA
        variant="floating"
        context="landing"
        contentType="landing"
      />
    </div>
  );
});

/**
 * Hero Section Component
 * Displays university name, tagline, key statistics, and primary CTAs
 */
const HeroSection = memo(function HeroSection({ profile, userCountry }) {
  return (
    <section 
      data-section="hero" 
      className="relative bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 text-white py-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')]"></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div className="text-center">
          {/* University Name and Tagline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-4 animate-fade-in">
            {profile.name}
          </h1>
          <p className="text-xl sm:text-2xl lg:text-3xl font-light mb-8 text-blue-200">
            {profile.tagline}
          </p>

          {/* Key Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 max-w-5xl mx-auto">
            <StatCard 
              number="95+" 
              label="Countries Represented" 
              icon="🌍"
            />
            <StatCard 
              number="1,600+" 
              label="Bed Hospital" 
              icon="🏥"
            />
            <StatCard 
              number="600+" 
              label="Recruiting Companies" 
              icon="🏢"
            />
            <StatCard 
              number="₹1.7 Cr" 
              label="Highest Package" 
              icon="💰"
            />
          </div>

          {/* Primary CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <ApplicationCTA
              variant="primary"
              source="landing-page-hero"
              context="landing"
              country={userCountry}
              location="hero"
            >
              Apply Now for 2026-27
            </ApplicationCTA>
            <WhatsAppCTA
              variant="button"
              context="landing"
              position="hero"
              contentType="landing"
            />
          </div>
        </div>
      </div>
    </section>
  );
});

/**
 * Stat Card Component
 * Displays a single statistic with icon
 */
const StatCard = memo(function StatCard({ number, label, icon }) {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 transform hover:scale-105 transition-transform duration-200">
      <div className="text-4xl mb-2">{icon}</div>
      <div className="text-3xl font-bold mb-1">{number}</div>
      <div className="text-sm text-blue-200">{label}</div>
    </div>
  );
});

/**
 * About Section Component
 * Displays university profile and accreditations
 */
const AboutSection = memo(function AboutSection({ profile, accreditations }) {
  return (
    <section data-section="about" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8 text-center">
          About Sharda University
        </h2>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* University Profile */}
          <div>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Established in <strong>{profile.established}</strong>, {profile.name} is a leading {profile.type.toLowerCase()} 
              located in {profile.location}. With a commitment to inspiring excellence, Sharda University has become 
              a preferred destination for students from around the world seeking quality education in{' '}
              <a href="/sharda/programs" className="text-blue-600 hover:text-blue-800 underline font-semibold">
                engineering, management, medical sciences, and more
              </a>.
            </p>
            
            <div className="space-y-3 mb-6">
              <InfoItem label="Chancellor" value={profile.chancellor} />
              <InfoItem label="Vice Chancellor" value={profile.vicechancellor} />
              <InfoItem label="Type" value={profile.type} />
              <InfoItem label="Location" value={profile.location} />
            </div>

            <p className="text-gray-700 mb-6">
              Sharda University is consistently{' '}
              <a href="/sharda/rankings" className="text-blue-600 hover:text-blue-800 underline font-semibold">
                ranked among India's top universities
              </a>{' '}
              by NIRF, QS Asia, and Times Higher Education. Our{' '}
              <a href="/sharda/fees" className="text-blue-600 hover:text-blue-800 underline font-semibold">
                competitive fee structure
              </a>{' '}
              and generous scholarship programs make quality education accessible to deserving students.
            </p>

            <ApplicationCTA
              variant="secondary"
              source="landing-page-about"
              context="landing"
              location="about-section"
              className="bg-blue-600 text-white hover:bg-blue-700 border-0"
            >
              Explore Programs
            </ApplicationCTA>
          </div>

          {/* Accreditations */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Accreditations & Recognition
            </h3>
            <div className="space-y-4">
              {accreditations.map((accreditation, index) => (
                <div 
                  key={index}
                  className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border-l-4 border-blue-600"
                >
                  <h4 className="text-xl font-bold text-gray-900 mb-2">
                    {accreditation.name}
                  </h4>
                  <p className="text-gray-700 mb-1">{accreditation.body}</p>
                  <p className="text-sm text-gray-600">
                    Awarded: {accreditation.year}
                    {accreditation.validity && ` • Valid for ${accreditation.validity}`}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

/**
 * Info Item Component
 * Displays a label-value pair
 */
const InfoItem = memo(function InfoItem({ label, value }) {
  return (
    <div className="flex items-start">
      <span className="font-semibold text-gray-900 min-w-[140px]">{label}:</span>
      <span className="text-gray-700">{value}</span>
    </div>
  );
});

/**
 * Rankings Section Component
 * Displays NIRF, QS, and other rankings
 */
const RankingsSection = memo(function RankingsSection({ rankings }) {
  return (
    <section data-section="rankings" className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 text-center">
          Rankings & Recognition
        </h2>
        <p className="text-lg text-gray-600 mb-12 text-center max-w-3xl mx-auto">
          Sharda University is consistently{' '}
          <a href="/sharda/rankings" className="text-blue-600 hover:text-blue-800 underline font-semibold">
            ranked among India's top universities
          </a>{' '}
          by prestigious ranking organizations including NIRF, QS Asia, and Times Higher Education.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {rankings.map((ranking, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-200 border-t-4 border-blue-600"
            >
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  {ranking.rank}
                </div>
                <div className="text-lg font-semibold text-gray-900 mb-1">
                  {ranking.organization}
                </div>
                {ranking.category && (
                  <div className="text-sm text-gray-600 mb-1">
                    {ranking.category}
                  </div>
                )}
                <div className="text-xs text-gray-500">
                  {ranking.year} • {ranking.scope === 'national' ? '🇮🇳 National' : '🌍 International'}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-700 mb-6">
            Learn more about our{' '}
            <a href="/sharda/rankings" className="text-blue-600 hover:text-blue-800 underline font-semibold">
              NIRF ranking
            </a>,{' '}
            <a href="/sharda/rankings" className="text-blue-600 hover:text-blue-800 underline font-semibold">
              QS Asia ranking
            </a>, and other recognitions.
          </p>
        </div>

        <div className="mt-12 text-center">
          <WhatsAppCTA
            variant="inline"
            context="ranking"
            contentType="landing"
            position="content"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            <span>Learn More About Rankings</span>
          </WhatsAppCTA>
        </div>
      </div>
    </section>
  );
});

/**
 * Programs Section Component
 * Highlights key programs with fees and details
 */
const ProgramsSection = memo(function ProgramsSection({ programs, userCountry }) {
  // Show first 4 programs as highlights
  const highlightPrograms = programs.slice(0, 4);

  // Map program IDs to their detail page routes
  const programRoutes = {
    'btech-cse': '/sharda-university/programs/btech-cse',
    'mba': '/sharda-university/programs/mba',
    'mbbs': '/sharda-university/programs/mbbs',
    'bba': '/sharda-university/programs/bba',
  };

  return (
    <section data-section="programs" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 text-center">
          Popular Programs
        </h2>
        <p className="text-lg text-gray-600 mb-12 text-center max-w-3xl mx-auto">
          Choose from a wide range of undergraduate, postgraduate, and doctoral programs
          across various disciplines. Explore our{' '}
          <Link to="/sharda-university/programs/btech-cse" className="text-blue-600 hover:text-blue-800 underline font-semibold">
            B.Tech CSE
          </Link>
          ,{' '}
          <Link to="/sharda-university/programs/mba" className="text-blue-600 hover:text-blue-800 underline font-semibold">
            MBA
          </Link>
          ,{' '}
          <Link to="/sharda-university/programs/mbbs" className="text-blue-600 hover:text-blue-800 underline font-semibold">
            MBBS
          </Link>
          , and{' '}
          <Link to="/sharda-university/programs/bba" className="text-blue-600 hover:text-blue-800 underline font-semibold">
            BBA
          </Link>
          {' '}programs.
        </p>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {highlightPrograms.map((program) => (
            <div 
              key={program.id}
              className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-200 hover:border-blue-400"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {programRoutes[program.id] ? (
                      <Link 
                        to={programRoutes[program.id]}
                        className="hover:text-blue-600 transition-colors"
                      >
                        {program.name}
                      </Link>
                    ) : (
                      program.name
                    )}
                  </h3>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">
                      {program.discipline}
                    </span>
                    <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">
                      {program.duration}
                    </span>
                    {program.accreditation && (
                      <span className="px-3 py-1 bg-purple-100 text-purple-800 text-xs font-semibold rounded-full">
                        {program.accreditation}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <div className="text-2xl font-bold text-blue-600 mb-1">
                  ₹{(program.fees.tuitionPerYear / 100000).toFixed(2)} Lakhs/year
                </div>
                <div className="text-sm text-gray-600">
                  Total: ₹{(program.fees.total / 100000).toFixed(2)} Lakhs ({program.duration})
                </div>
              </div>

              {program.specializations && program.specializations.length > 0 && (
                <div className="mb-4">
                  <div className="text-sm font-semibold text-gray-700 mb-2">Specializations:</div>
                  <div className="flex flex-wrap gap-2">
                    {program.specializations.slice(0, 3).map((spec, idx) => (
                      <span key={idx} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-3">
                {programRoutes[program.id] && (
                  <Link
                    to={programRoutes[program.id]}
                    className="flex-1 text-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                  >
                    Learn More
                  </Link>
                )}
                <ApplicationCTA
                  variant="secondary"
                  program={program.code}
                  source={`landing-page-program-${program.id}`}
                  context="landing"
                  country={userCountry}
                  location="programs-section"
                  className="flex-1 bg-blue-600 text-white hover:bg-blue-700 border-0"
                >
                  Apply Now
                </ApplicationCTA>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <ApplicationCTA
            variant="primary"
            source="landing-page-programs-all"
            context="landing"
            country={userCountry}
            location="programs-section"
          >
            View All Programs
          </ApplicationCTA>
        </div>
      </div>
    </section>
  );
});

/**
 * Placements Section Component
 * Displays placement statistics and top recruiters
 */
const PlacementsSection = memo(function PlacementsSection({ placements }) {
  return (
    <section data-section="placements" className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-900 to-indigo-900 text-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-center">
          Excellent Placement Record
        </h2>
        <p className="text-lg text-blue-200 mb-12 text-center max-w-3xl mx-auto">
          Our students are recruited by top companies across various industries with excellent packages.
        </p>

        {/* Placement Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <PlacementStat 
            number={placements.companiesVisited}
            label="Companies Visited"
            suffix="+"
          />
          <PlacementStat 
            number={placements.studentsPlaced}
            label="Students Placed"
            suffix="+"
          />
          <PlacementStat 
            number={`₹${(placements.highestPackage / 10000000).toFixed(1)} Cr`}
            label="Highest Package"
          />
          <PlacementStat 
            number={`${placements.placementPercentage}%`}
            label="Placement Rate"
          />
        </div>

        {/* Top Recruiters */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8">
          <h3 className="text-2xl font-bold mb-6 text-center">Top Recruiters</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {placements.topRecruiters.map((company, index) => (
              <div 
                key={index}
                className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center hover:bg-white/30 transition-colors duration-200"
              >
                <div className="font-semibold text-sm">{company}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <WhatsAppCTA
            variant="button"
            context="placement"
            contentType="landing"
            position="content"
          />
        </div>
      </div>
    </section>
  );
});

/**
 * Placement Stat Component
 * Displays a single placement statistic
 */
const PlacementStat = memo(function PlacementStat({ number, label, suffix = '' }) {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
      <div className="text-3xl sm:text-4xl font-bold mb-2">
        {number}{suffix}
      </div>
      <div className="text-sm text-blue-200">{label}</div>
    </div>
  );
});

/**
 * Campus Section Component
 * Displays campus facilities and hospital information
 */
const CampusSection = memo(function CampusSection({ campus }) {
  return (
    <section data-section="campus" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 text-center">
          World-Class Campus & Facilities
        </h2>
        <p className="text-lg text-gray-600 mb-12 text-center max-w-3xl mx-auto">
          Experience a vibrant campus life with state-of-the-art infrastructure and modern facilities.
        </p>

        {/* Campus Overview */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 text-center">
            <div className="text-4xl mb-3">🏫</div>
            <div className="text-3xl font-bold text-blue-600 mb-2">{campus.area}</div>
            <div className="text-gray-700 font-semibold">Green Campus</div>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 text-center">
            <div className="text-4xl mb-3">🏢</div>
            <div className="text-3xl font-bold text-green-600 mb-2">{campus.buildings}</div>
            <div className="text-gray-700 font-semibold">Buildings</div>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 text-center">
            <div className="text-4xl mb-3">🏠</div>
            <div className="text-3xl font-bold text-purple-600 mb-2">{campus.hostelCapacity}</div>
            <div className="text-gray-700 font-semibold">Hostel Capacity</div>
          </div>
        </div>

        {/* Facilities */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {campus.facilities.map((facility, index) => (
            <div 
              key={index}
              className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow duration-200"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {facility.name}
              </h3>
              <p className="text-gray-700 text-sm mb-2">
                {facility.description}
              </p>
              {facility.capacity && (
                <p className="text-xs text-blue-600 font-semibold">
                  Capacity: {facility.capacity}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Hospital Highlight */}
        <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-xl p-8 border-l-4 border-red-600">
          <div className="flex items-start gap-6">
            <div className="text-6xl">🏥</div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                {campus.hospital.name}
              </h3>
              <p className="text-lg text-gray-700 mb-4">
                A state-of-the-art <strong>{campus.hospital.beds}+ bed</strong> multi-specialty hospital 
                providing world-class healthcare and hands-on clinical training for medical students.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Specialties:</h4>
                  <ul className="space-y-1">
                    {campus.hospital.specialties.slice(0, 4).map((specialty, idx) => (
                      <li key={idx} className="text-sm text-gray-700">• {specialty}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Facilities:</h4>
                  <ul className="space-y-1">
                    {campus.hospital.facilities.slice(0, 4).map((facility, idx) => (
                      <li key={idx} className="text-sm text-gray-700">• {facility}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <ApplicationCTA
            variant="primary"
            source="landing-page-campus"
            context="landing"
            location="campus-section"
          >
            Schedule Campus Visit
          </ApplicationCTA>
        </div>
      </div>
    </section>
  );
});

/**
 * Testimonials Section Component
 * Displays student testimonials with focus on Bangladeshi students
 */
const TestimonialsSection = memo(function TestimonialsSection({ userCountry }) {
  const { bangladeshContent } = shardaUniversityData;
  const testimonials = bangladeshContent.testimonials;

  return (
    <section data-section="testimonials" className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 text-center">
          Student Success Stories
        </h2>
        <p className="text-lg text-gray-600 mb-12 text-center max-w-3xl mx-auto">
          Hear from our students who have achieved remarkable success in their careers.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.slice(0, 6).map((testimonial) => (
            <div 
              key={testimonial.id}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-200"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  {testimonial.studentName.charAt(0)}
                </div>
                <div>
                  <div className="font-bold text-gray-900">{testimonial.studentName}</div>
                  <div className="text-sm text-gray-600">
                    {testimonial.country} 🇧🇩
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <div className="text-sm font-semibold text-blue-600 mb-1">
                  {testimonial.program}
                </div>
                <div className="text-xs text-gray-500">
                  Class of {testimonial.graduationYear}
                </div>
              </div>

              <p className="text-gray-700 text-sm mb-4 italic">
                "{testimonial.testimonialText}"
              </p>

              <div className="pt-4 border-t border-gray-200">
                <div className="text-xs font-semibold text-green-600">
                  ✓ {testimonial.achievement}
                </div>
                <div className="text-xs text-gray-600 mt-1">
                  Currently: {testimonial.currentPosition}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <WhatsAppCTA
            variant="inline"
            context="testimonial"
            contentType="landing"
            position="content"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            <span>Connect with Alumni</span>
          </WhatsAppCTA>
        </div>
      </div>
    </section>
  );
});

/**
 * FAQ Section Component
 * Displays frequently asked questions with accordion functionality
 */
const FAQSection = memo(function FAQSection() {
  const faqs = [
    {
      question: "What is the admission process for international students?",
      answer: "International students can apply online through our website. Submit your academic documents, passport copy, and complete the application form. Our admissions team will guide you through the visa process and other formalities."
    },
    {
      question: "Are scholarships available for Bangladeshi students?",
      answer: "Yes! Bangladeshi students with HSC GPA 3.5-5.0 receive 50% scholarship, and those with GPA 3.0-3.4 receive 20% scholarship on tuition fees. Scholarships are automatically applied based on your academic performance."
    },
    {
      question: "What is the total cost of studying at Sharda University?",
      answer: "The total cost varies by program. For example, B.Tech CSE costs approximately ₹10.6 lakhs for 4 years including tuition, hostel, and mess. Use our fee calculator to get an accurate estimate for your chosen program."
    },
    {
      question: "Is hostel accommodation available?",
      answer: "Yes, we have modern hostel facilities with a capacity of 5,000 students. Hostels are equipped with all necessary amenities including Wi-Fi, mess facilities, recreation rooms, and 24/7 security."
    },
    {
      question: "What are the placement opportunities?",
      answer: "Sharda University has an excellent placement record with 600+ companies visiting campus annually. Our highest package is ₹1.7 Crore, and 85% of students get placed. Top recruiters include Microsoft, Amazon, Google, and more."
    },
    {
      question: "Is the university recognized internationally?",
      answer: "Yes, Sharda University is UGC recognized and NAAC A+ accredited. We are ranked by NIRF, QS Asia, and Times Higher Education. Our degrees are recognized globally."
    },
    {
      question: "What is the medium of instruction?",
      answer: "All programs are taught in English. This makes it easy for international students to adapt and learn effectively."
    },
    {
      question: "How do I apply for a student visa?",
      answer: "After receiving your admission offer letter, you can apply for an Indian student visa at the Indian High Commission in your country. We provide complete guidance and support throughout the visa application process."
    }
  ];

  return (
    <section data-section="faq" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 text-center">
          Frequently Asked Questions
        </h2>
        <p className="text-lg text-gray-600 mb-12 text-center">
          Find answers to common questions about{' '}
          <a href="/sharda/admissions" className="text-blue-600 hover:text-blue-800 underline font-semibold">
            admissions
          </a>,{' '}
          <a href="/sharda/programs" className="text-blue-600 hover:text-blue-800 underline font-semibold">
            programs
          </a>,{' '}
          <a href="/sharda/fees" className="text-blue-600 hover:text-blue-800 underline font-semibold">
            fees
          </a>, and campus life.
        </p>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>

        <div className="mt-12 text-center bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Still Have Questions?
          </h3>
          <p className="text-gray-700 mb-6">
            Our admissions team is here to help you with any questions about studying at Sharda University.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <WhatsAppCTA
              variant="button"
              context="faq"
              contentType="landing"
              position="content"
            />
            <ApplicationCTA
              variant="secondary"
              source="landing-page-faq"
              context="landing"
              location="faq-section"
              className="bg-blue-600 text-white hover:bg-blue-700 border-0"
            >
              Apply Now
            </ApplicationCTA>
          </div>
        </div>
      </div>
    </section>
  );
});

/**
 * FAQ Item Component
 * Individual FAQ with accordion functionality
 */
const FAQItem = memo(function FAQItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 text-left bg-white hover:bg-gray-50 transition-colors duration-200 flex items-center justify-between"
        aria-expanded={isOpen}
      >
        <span className="font-semibold text-gray-900 pr-4">{question}</span>
        <svg
          className={`w-5 h-5 text-blue-600 transform transition-transform duration-200 flex-shrink-0 ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          <p className="text-gray-700">{answer}</p>
        </div>
      )}
    </div>
  );
});

// PropTypes
ShardaLandingPage.propTypes = {
  userCountry: PropTypes.string,
  utmSource: PropTypes.string,
};

HeroSection.propTypes = {
  profile: PropTypes.object.isRequired,
  userCountry: PropTypes.string,
};

StatCard.propTypes = {
  number: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
};

AboutSection.propTypes = {
  profile: PropTypes.object.isRequired,
  accreditations: PropTypes.array.isRequired,
};

InfoItem.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

RankingsSection.propTypes = {
  rankings: PropTypes.array.isRequired,
};

ProgramsSection.propTypes = {
  programs: PropTypes.array.isRequired,
  userCountry: PropTypes.string,
};

PlacementsSection.propTypes = {
  placements: PropTypes.object.isRequired,
};

PlacementStat.propTypes = {
  number: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  label: PropTypes.string.isRequired,
  suffix: PropTypes.string,
};

CampusSection.propTypes = {
  campus: PropTypes.object.isRequired,
};

TestimonialsSection.propTypes = {
  userCountry: PropTypes.string,
};

FAQItem.propTypes = {
  question: PropTypes.string.isRequired,
  answer: PropTypes.string.isRequired,
};

export default ShardaLandingPage;
