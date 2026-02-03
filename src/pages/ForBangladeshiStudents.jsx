import React, { memo, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import MetaManager from '../components/SEO/MetaManager';
import StructuredData, { generateFAQSchema, generateArticleSchema } from '../components/SEO/StructuredData';
import ApplicationCTA from '../components/Sharda/ApplicationCTA';
import WhatsAppCTA from '../components/Sharda/WhatsAppCTA';
import shardaUniversityData from '../data/shardaData';

/**
 * ForBangladeshiStudents Component
 * Feature: seo-overhaul
 * 
 * Dedicated landing page for Bangladeshi students with localized content,
 * scholarship information, admission process, and FAQ schema markup.
 * 
 * Validates: Requirements 6.1, 6.2, 6.3, 6.4, 6.5, 6.8
 */
const ForBangladeshiStudents = memo(function ForBangladeshiStudents() {
  const { bangladeshContent, programs } = shardaUniversityData;

  // Popular programs for Bangladeshi students
  const popularPrograms = [
    programs.find(p => p.id === 'btech-cse'),
    programs.find(p => p.id === 'mbbs'),
    programs.find(p => p.id === 'mba'),
    programs.find(p => p.id === 'bba'),
  ].filter(Boolean);

  // FAQ data
  const faqs = [
    {
      question: "What scholarships are available for Bangladeshi students?",
      answer: "Bangladeshi students with HSC GPA 3.5-5.0 receive 50% scholarship on tuition fees. Students with GPA 3.0-3.4 receive 20% scholarship. Scholarships are automatically applied based on your HSC results."
    },
    {
      question: "How do I apply for admission from Bangladesh?",
      answer: "Apply online through our website by submitting your HSC certificate, SSC certificate, passport copy, and photographs. After receiving your admission offer, apply for an Indian student visa at the Indian High Commission in Dhaka."
    },
    {
      question: "What is the visa process for Bangladeshi students?",
      answer: "After receiving your admission offer letter, apply for an Indian student visa (X Visa) at the Indian High Commission in Dhaka. Required documents include passport, admission letter, financial proof, medical certificate, and police clearance. The process typically takes 2-4 weeks."
    },
    {
      question: "Is halal food available on campus?",
      answer: "Yes, halal food is available in campus cafeterias. The hostel mess serves rice and curry, and there are Bengali restaurants nearby in Greater Noida. Multiple food options cater to international students."
    },
    {
      question: "How much does it cost to study at Sharda University?",
      answer: "Costs vary by program. B.Tech CSE costs approximately ₹10.6 lakhs for 4 years including tuition, hostel, and mess. With a 50% scholarship, this reduces to ₹6.5 lakhs. Monthly living expenses are around ₹5,000-8,000."
    },
    {
      question: "Are there prayer facilities on campus?",
      answer: "Yes, prayer rooms are available on campus. There are mosques nearby in Greater Noida, and Friday prayers are organized. The university respects all religions and provides facilities for students of all faiths."
    },
    {
      question: "How far is Sharda University from Dhaka?",
      answer: "Sharda University is just 2-3 hours flight from Dhaka to Delhi, then 1 hour drive to the campus in Greater Noida. The proximity makes it easy for students to visit home during breaks."
    },
    {
      question: "Can I work part-time while studying?",
      answer: "International students on student visas can work part-time on campus (up to 20 hours per week during semester). You'll need to open an Indian bank account after arrival to receive payments."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* SEO Meta Tags */}
      <MetaManager
        emoji="🇧🇩"
        benefit="Study in India from Bangladesh"
        socialProof="3,000+ Bangladeshi students"
        price="50% scholarship available"
        urgency="Apply by June 2026"
        cta="Apply Now"
        baseTitle="Study in India for Bangladeshi Students"
        url="/for-bangladeshi-students"
      />

      {/* Article Structured Data */}
      <StructuredData
        data={generateArticleSchema({
          title: "Study in India for Bangladeshi Students - Sharda University 2026",
          description: "Complete guide for Bangladeshi students: 50% scholarships, admission process, visa guidance, and popular programs at Sharda University. Apply now for 2026-27.",
          author: "NextGen Learning",
          datePublished: "2026-01-01",
          dateModified: new Date().toISOString(),
          url: "/for-bangladeshi-students",
          keywords: ["Bangladesh students India", "study in India from Bangladesh", "Sharda University Bangladesh", "scholarships for Bangladeshi students"],
          articleSection: "Education"
        })}
        id="bangladesh-article-schema"
      />

      {/* FAQ Structured Data */}
      <StructuredData
        data={generateFAQSchema(faqs)}
        id="bangladesh-faq-schema"
      />

      {/* Hero Section */}
      <HeroSection />

      {/* Scholarship Section */}
      <ScholarshipSection scholarships={bangladeshContent.scholarships} />

      {/* Popular Programs Section */}
      <PopularProgramsSection programs={popularPrograms} />

      {/* Admission Process Section */}
      <AdmissionProcessSection steps={bangladeshContent.admissionProcess} />

      {/* Success Stories Section */}
      <SuccessStoriesSection testimonials={bangladeshContent.testimonials} />

      {/* Cultural Information Section */}
      <CulturalInfoSection culturalInfo={bangladeshContent.culturalInfo} />

      {/* FAQ Section */}
      <FAQSection faqs={faqs} />

      {/* Floating CTAs */}
      <ApplicationCTA
        variant="floating"
        source="bangladesh-page"
        context="bangladesh"
        country="Bangladesh"
        location="floating"
      />
      <WhatsAppCTA
        variant="floating"
        context="bangladesh"
        contentType="bangladesh"
      />
    </div>
  );
});

/**
 * Hero Section Component
 */
const HeroSection = memo(function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-green-900 via-emerald-900 to-teal-900 text-white py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')]"></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div className="text-center">
          {/* Flag and Title */}
          <div className="text-6xl mb-4">🇧🇩</div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-4 animate-fade-in">
            Study in India from Bangladesh
          </h1>
          <p className="text-xl sm:text-2xl lg:text-3xl font-light mb-8 text-green-200">
            Your Gateway to Quality Education at Sharda University
          </p>

          {/* Key Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-5xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-4xl mb-2">🎓</div>
              <div className="text-3xl font-bold mb-1">50%</div>
              <div className="text-sm text-green-200">Scholarship for GPA 3.5+</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-4xl mb-2">✈️</div>
              <div className="text-3xl font-bold mb-1">2-3 Hours</div>
              <div className="text-sm text-green-200">Flight from Dhaka</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-4xl mb-2">👥</div>
              <div className="text-3xl font-bold mb-1">3,000+</div>
              <div className="text-sm text-green-200">Bangladeshi Students</div>
            </div>
          </div>

          {/* Primary CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <ApplicationCTA
              variant="primary"
              source="bangladesh-page-hero"
              context="bangladesh"
              country="Bangladesh"
              location="hero"
            >
              Apply Now for 2026-27
            </ApplicationCTA>
            <WhatsAppCTA
              variant="button"
              context="bangladesh"
              position="hero"
              contentType="bangladesh"
            />
          </div>
        </div>
      </div>
    </section>
  );
});

/**
 * Scholarship Section Component
 */
const ScholarshipSection = memo(function ScholarshipSection({ scholarships }) {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 text-center">
          Scholarships for Bangladeshi Students
        </h2>
        <p className="text-lg text-gray-600 mb-12 text-center max-w-3xl mx-auto">
          Sharda University offers generous scholarships based on your HSC results. 
          Scholarships are automatically applied when you submit your application.
        </p>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {scholarships.map((scholarship, index) => (
            <div 
              key={index}
              className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-8 border-l-4 border-green-600 shadow-lg"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <div className="text-5xl font-bold text-green-600 mb-2">
                    {scholarship.percentage}%
                  </div>
                  <div className="text-lg font-semibold text-gray-900">
                    Scholarship on Tuition Fees
                  </div>
                </div>
                <div className="text-6xl">🎓</div>
              </div>

              <div className="mb-6">
                <div className="text-sm font-semibold text-gray-700 mb-2">Eligibility:</div>
                <div className="bg-white rounded-lg p-4">
                  <div className="text-2xl font-bold text-gray-900 mb-1">
                    HSC GPA {scholarship.gpaMin} - {scholarship.gpaMax}
                  </div>
                  <ul className="space-y-1 mt-3">
                    {scholarship.eligibility.map((req, idx) => (
                      <li key={idx} className="text-sm text-gray-700">• {req}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div>
                <div className="text-sm font-semibold text-gray-700 mb-2">How to Apply:</div>
                <ol className="space-y-2">
                  {scholarship.applicationProcess.map((step, idx) => (
                    <li key={idx} className="text-sm text-gray-700">
                      {idx + 1}. {step}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-blue-50 rounded-xl p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Calculate Your Scholarship
          </h3>
          <p className="text-gray-700 mb-6">
            With a 50% scholarship, B.Tech CSE costs only ₹5.3 lakhs for 4 years (tuition only).
            Total cost including hostel and mess: ₹6.5 lakhs for 4 years.
          </p>
          <Link
            to="/sharda-university/btech-cse-fees"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            View Detailed Fee Structure
          </Link>
        </div>
      </div>
    </section>
  );
});

/**
 * Popular Programs Section Component
 */
const PopularProgramsSection = memo(function PopularProgramsSection({ programs }) {
  const programRoutes = {
    'btech-cse': '/sharda-university/programs/btech-cse',
    'mba': '/sharda-university/programs/mba',
    'mbbs': '/sharda-university/programs/mbbs',
    'bba': '/sharda-university/programs/bba',
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-green-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 text-center">
          Popular Programs Among Bangladeshi Students
        </h2>
        <p className="text-lg text-gray-600 mb-12 text-center max-w-3xl mx-auto">
          Choose from highly sought-after programs with excellent career prospects and placement opportunities.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {programs.map((program) => (
            <div 
              key={program.id}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-200"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {programRoutes[program.id] ? (
                  <Link 
                    to={programRoutes[program.id]}
                    className="hover:text-green-600 transition-colors"
                  >
                    {program.name}
                  </Link>
                ) : (
                  program.name
                )}
              </h3>

              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">
                  {program.duration}
                </span>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">
                  {program.discipline}
                </span>
              </div>

              <div className="mb-4">
                <div className="text-sm text-gray-600 mb-2">Tuition Fee (per year):</div>
                <div className="text-2xl font-bold text-gray-900">
                  ₹{(program.fees.tuitionPerYear / 100000).toFixed(2)} Lakhs
                </div>
                <div className="text-sm text-green-600 font-semibold mt-1">
                  With 50% scholarship: ₹{(program.fees.tuitionPerYear / 200000).toFixed(2)} Lakhs/year
                </div>
              </div>

              {program.eligibility && program.eligibility.length > 0 && (
                <div className="mb-4">
                  <div className="text-sm font-semibold text-gray-700 mb-2">Eligibility:</div>
                  <ul className="space-y-1">
                    {program.eligibility.slice(0, 2).map((req, idx) => (
                      <li key={idx} className="text-sm text-gray-600">• {req.description}</li>
                    ))}
                  </ul>
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
                  source={`bangladesh-page-program-${program.id}`}
                  context="bangladesh"
                  country="Bangladesh"
                  location="programs-section"
                  className="flex-1 bg-green-600 text-white hover:bg-green-700 border-0"
                >
                  Apply Now
                </ApplicationCTA>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

/**
 * Admission Process Section Component
 */
const AdmissionProcessSection = memo(function AdmissionProcessSection({ steps }) {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 text-center">
          Step-by-Step Admission Process
        </h2>
        <p className="text-lg text-gray-600 mb-12 text-center max-w-3xl mx-auto">
          Follow these simple steps to secure your admission at Sharda University from Bangladesh.
        </p>

        <div className="space-y-6">
          {steps.map((step) => (
            <div 
              key={step.stepNumber}
              className="bg-gradient-to-r from-white to-gray-50 rounded-xl p-6 shadow-md border-l-4 border-green-600"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
                  {step.stepNumber}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-700 mb-4">
                    {step.description}
                  </p>

                  {step.documents && step.documents.length > 0 && (
                    <div className="mb-3">
                      <div className="text-sm font-semibold text-gray-700 mb-2">Required Documents:</div>
                      <ul className="grid sm:grid-cols-2 gap-2">
                        {step.documents.map((doc, idx) => (
                          <li key={idx} className="text-sm text-gray-600">• {doc}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-2 text-blue-600">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="font-semibold">Timeline: {step.timeline}</span>
                    </div>
                  </div>

                  {step.tips && step.tips.length > 0 && (
                    <div className="mt-4 bg-yellow-50 rounded-lg p-4">
                      <div className="text-sm font-semibold text-gray-700 mb-2">💡 Pro Tips:</div>
                      <ul className="space-y-1">
                        {step.tips.map((tip, idx) => (
                          <li key={idx} className="text-sm text-gray-600">• {tip}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <ApplicationCTA
            variant="primary"
            source="bangladesh-page-admission-process"
            context="bangladesh"
            country="Bangladesh"
            location="admission-process-section"
          >
            Start Your Application
          </ApplicationCTA>
        </div>
      </div>
    </section>
  );
});

/**
 * Success Stories Section Component
 */
const SuccessStoriesSection = memo(function SuccessStoriesSection({ testimonials }) {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-green-50 to-emerald-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 text-center">
          Success Stories from Bangladesh
        </h2>
        <p className="text-lg text-gray-600 mb-12 text-center max-w-3xl mx-auto">
          Hear from Bangladeshi students who have achieved remarkable success after studying at Sharda University.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.slice(0, 6).map((testimonial) => (
            <div 
              key={testimonial.id}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-200"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  {testimonial.studentName.charAt(0)}
                </div>
                <div>
                  <div className="font-bold text-gray-900">{testimonial.studentName}</div>
                  <div className="text-sm text-gray-600 flex items-center gap-1">
                    <span>🇧🇩</span>
                    <span>{testimonial.country}</span>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <div className="text-sm font-semibold text-green-600 mb-1">
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
                <div className="text-xs font-semibold text-green-600 mb-1">
                  ✓ {testimonial.achievement}
                </div>
                <div className="text-xs text-gray-600">
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
            contentType="bangladesh"
            position="content"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            <span>Connect with Bangladeshi Alumni</span>
          </WhatsAppCTA>
        </div>
      </div>
    </section>
  );
});

/**
 * Cultural Information Section Component
 */
const CulturalInfoSection = memo(function CulturalInfoSection({ culturalInfo }) {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 text-center">
          Life at Sharda for Bangladeshi Students
        </h2>
        <p className="text-lg text-gray-600 mb-12 text-center max-w-3xl mx-auto">
          Feel at home with a supportive community, familiar food, and cultural facilities.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Proximity */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6">
            <div className="text-4xl mb-3">✈️</div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Close to Home</h3>
            <p className="text-gray-700">{culturalInfo.proximity}</p>
          </div>

          {/* Climate */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6">
            <div className="text-4xl mb-3">🌤️</div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Familiar Climate</h3>
            <p className="text-gray-700">{culturalInfo.climate}</p>
          </div>

          {/* Food */}
          <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6">
            <div className="text-4xl mb-3">🍛</div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Halal Food Available</h3>
            <ul className="space-y-2">
              {culturalInfo.food.map((item, idx) => (
                <li key={idx} className="text-gray-700 text-sm">• {item}</li>
              ))}
            </ul>
          </div>

          {/* Religious Facilities */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6">
            <div className="text-4xl mb-3">🕌</div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Prayer Facilities</h3>
            <ul className="space-y-2">
              {culturalInfo.religiousFacilities.map((item, idx) => (
                <li key={idx} className="text-gray-700 text-sm">• {item}</li>
              ))}
            </ul>
          </div>

          {/* Language */}
          <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-xl p-6">
            <div className="text-4xl mb-3">🗣️</div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Language</h3>
            <p className="text-gray-700">{culturalInfo.language}</p>
          </div>

          {/* Community */}
          <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl p-6">
            <div className="text-4xl mb-3">👥</div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Bangladeshi Community</h3>
            <p className="text-gray-700">{culturalInfo.community}</p>
          </div>
        </div>
      </div>
    </section>
  );
});

/**
 * FAQ Section Component
 */
const FAQSection = memo(function FAQSection({ faqs }) {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-green-50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 text-center">
          Frequently Asked Questions
        </h2>
        <p className="text-lg text-gray-600 mb-12 text-center">
          Get answers to common questions from Bangladeshi students about studying at Sharda University.
        </p>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>

        <div className="mt-12 text-center bg-white rounded-xl p-8 shadow-lg">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Still Have Questions?
          </h3>
          <p className="text-gray-700 mb-6">
            Our admissions team is here to help Bangladeshi students with any questions about studying at Sharda University.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <WhatsAppCTA
              variant="button"
              context="faq"
              contentType="bangladesh"
              position="content"
            />
            <ApplicationCTA
              variant="secondary"
              source="bangladesh-page-faq"
              context="bangladesh"
              country="Bangladesh"
              location="faq-section"
              className="bg-green-600 text-white hover:bg-green-700 border-0"
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
 */
const FAQItem = memo(function FAQItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 text-left hover:bg-gray-50 transition-colors duration-200 flex items-center justify-between"
        aria-expanded={isOpen}
      >
        <span className="font-semibold text-gray-900 pr-4">{question}</span>
        <svg
          className={`w-5 h-5 text-green-600 transform transition-transform duration-200 flex-shrink-0 ${
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
ForBangladeshiStudents.propTypes = {};

ScholarshipSection.propTypes = {
  scholarships: PropTypes.array.isRequired,
};

PopularProgramsSection.propTypes = {
  programs: PropTypes.array.isRequired,
};

AdmissionProcessSection.propTypes = {
  steps: PropTypes.array.isRequired,
};

SuccessStoriesSection.propTypes = {
  testimonials: PropTypes.array.isRequired,
};

CulturalInfoSection.propTypes = {
  culturalInfo: PropTypes.object.isRequired,
};

FAQSection.propTypes = {
  faqs: PropTypes.array.isRequired,
};

FAQItem.propTypes = {
  question: PropTypes.string.isRequired,
  answer: PropTypes.string.isRequired,
};

export default ForBangladeshiStudents;
