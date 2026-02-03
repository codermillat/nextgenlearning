import React from 'react';
import { Link } from 'react-router-dom';
import SEOMetaTags from '../../components/SEO/SEOMetaTags';
import StructuredData from '../../components/SEO/StructuredData';
import ApplicationCTA from '../../components/Sharda/ApplicationCTA';
import WhatsAppCTA from '../../components/Sharda/WhatsAppCTA';

/**
 * Study in India from Bangladesh Page
 * SEO-optimized page targeting "study in india from bangladesh" keyword
 * Requirements: 3.2
 */
const StudyInIndiaFromBangladesh = () => {
  const pageTitle = 'Study in India from Bangladesh 2026-27 | Sharda University Admission Guide';
  const pageDescription = 'Complete guide for Bangladeshi students to study in India at Sharda University. Learn about admission process, scholarships up to 50%, visa requirements, and career opportunities.';
  const canonicalUrl = 'https://nextgenlearning.com/sharda-university/study-in-india-from-bangladesh';

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Why should Bangladeshi students study in India?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'India offers world-class education with cultural familiarity, affordable costs, and globally recognized degrees. Indian universities like Sharda provide NAAC A+ accreditation and strong career prospects at a fraction of the cost compared to Western countries.',
        },
      },
      {
        '@type': 'Question',
        name: 'What scholarships are available for Bangladeshi students at Sharda University?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Sharda University offers merit-based scholarships: 50% tuition fee waiver for GPA 3.5-5.0 and 20% for GPA 3.0-3.4. B.Sc. Nursing students receive 25% scholarship.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the admission process for Bangladeshi students?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Apply online at bangladesh.shardauniversity.org, submit HSC documents, attend an interview, receive offer letter, pay advance fee, and obtain admission and visa invitation letters for Indian student visa application.',
        },
      },
      {
        '@type': 'Question',
        name: 'How much does it cost to study at Sharda University from Bangladesh?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'B.Tech CSE costs ₹2,70,000/year, BBA ₹2,31,000/year, with hostel from ₹1,20,000/year. With 50% scholarship, costs are significantly reduced, making it highly affordable.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can Bangladeshi students work part-time in India?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No, Indian student visa regulations prohibit part-time work. Only mandatory curriculum-based internships are permitted.',
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
          'study in india from bangladesh',
          'bangladeshi students in india',
          'sharda university bangladesh',
          'india education for bangladesh',
          'study abroad india',
        ]}
        canonicalUrl={canonicalUrl}
      />

      <StructuredData data={faqSchema} />

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
          <div className="container mx-auto px-4">
            <nav className="text-sm mb-4" aria-label="Breadcrumb">
              <ol className="flex flex-wrap items-center space-x-2">
                <li><Link to="/" className="hover:underline">Home</Link></li>
                <li className="before:content-['/'] before:mx-2">
                  <Link to="/sharda-university" className="hover:underline">Sharda University</Link>
                </li>
                <li className="before:content-['/'] before:mx-2">Study in India from Bangladesh</li>
              </ol>
            </nav>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Study in India from Bangladesh: Your Complete Guide to Sharda University
            </h1>
            <p className="text-xl mb-8 max-w-3xl">
              Discover why thousands of Bangladeshi students choose India for world-class education. 
              Get up to 50% scholarship at Sharda University with NAAC A+ accreditation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <ApplicationCTA 
                variant="primary"
                source="study-in-india-bd-page"
                context="hero"
              />
              <WhatsAppCTA 
                context="Study in India from Bangladesh - Hero Section"
                variant="button"
              />
            </div>
          </div>
        </section>

        {/* Why India Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Why Bangladeshi Students Choose India for Higher Education</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              <div className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Affordable Education</h3>
                <p className="text-gray-600">70% lower costs than USA, UK, or Canada with equal quality education</p>
              </div>

              <div className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Cultural Proximity</h3>
                <p className="text-gray-600">Similar culture, language, food, and climate - feel at home</p>
              </div>

              <div className="text-center">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Global Recognition</h3>
                <p className="text-gray-600">UGC recognized, NAAC A+ accredited degrees valued worldwide</p>
              </div>

              <div className="text-center">
                <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Career Opportunities</h3>
                <p className="text-gray-600">600+ companies recruit, ₹1.7 Cr highest package</p>
              </div>
            </div>

            <div className="bg-blue-50 p-8 rounded-lg">
              <h3 className="text-2xl font-bold mb-4">The India Advantage for Bangladeshi Students</h3>
              <p className="text-gray-700 mb-4">
                India has emerged as the premier destination for Bangladeshi students seeking quality higher education abroad. 
                With over 10,000 Bangladeshi students currently studying in India, the pathway is well-established and proven.
              </p>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span><strong>Academic Excellence:</strong> Indian universities rank among Asia's top institutions with modern curricula aligned to global industry standards</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span><strong>Seamless Adaptation:</strong> Shared cultural heritage, similar climate, and availability of familiar food make the transition smooth</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span><strong>Value for Money:</strong> Complete education costs 60-70% less than Western countries while maintaining international standards</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span><strong>Growing Economy:</strong> India's booming tech and business sectors offer excellent internship and career opportunities</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Why Sharda Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Why Sharda University is the Top Choice for Bangladeshi Students</h2>
            
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-3 text-blue-600">🌍 Most International University</h3>
                <p className="text-gray-700">
                  Ranked #1 in India for international students with learners from 95+ countries. 
                  You'll be part of a truly global community.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-3 text-blue-600">🏆 NAAC A+ Accredited</h3>
                <p className="text-gray-700">
                  Highest quality accreditation from India's National Assessment Council. 
                  NIRF ranked #151-200 among all universities.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-3 text-blue-600">💰 Generous Scholarships</h3>
                <p className="text-gray-700">
                  Up to 50% tuition fee waiver for Bangladeshi students with GPA 3.5+. 
                  Make quality education even more affordable.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-3 text-blue-600">🏥 On-Campus Hospital</h3>
                <p className="text-gray-700">
                  1600+ bed Sharda Hospital on campus provides world-class healthcare 
                  and practical training for medical students.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-3 text-blue-600">🎓 135+ Programs</h3>
                <p className="text-gray-700">
                  Wide range of programs in Engineering, Business, Medicine, Nursing, 
                  and more - find your perfect fit.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-3 text-blue-600">🤝 Dedicated Support</h3>
                <p className="text-gray-700">
                  International Relations Division provides end-to-end support from 
                  admission to graduation for all foreign students.
                </p>
              </div>
            </div>

            <div className="text-center">
              <ApplicationCTA 
                variant="primary"
                source="study-in-india-bd-page"
                context="why-sharda"
              />
            </div>
          </div>
        </section>

        {/* Popular Programs Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Popular Programs for Bangladeshi Students</h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-2xl font-semibold mb-3">B.Tech Computer Science & Engineering</h3>
                <div className="space-y-2 mb-4">
                  <p className="text-gray-700"><strong>Duration:</strong> 4 years</p>
                  <p className="text-gray-700"><strong>Annual Fee:</strong> ₹2,70,000 (₹1,35,000 with 50% scholarship)</p>
                  <p className="text-gray-700"><strong>Eligibility:</strong> HSC with Physics, Chemistry, Mathematics</p>
                  <p className="text-gray-700"><strong>Specializations:</strong> AI & ML, Blockchain, Data Science, Cloud Computing</p>
                </div>
                <Link 
                  to="/sharda-university/btech-cse-fees" 
                  className="text-blue-600 hover:underline font-medium"
                >
                  View detailed fee breakdown →
                </Link>
              </div>

              <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-2xl font-semibold mb-3">BBA (Bachelor of Business Administration)</h3>
                <div className="space-y-2 mb-4">
                  <p className="text-gray-700"><strong>Duration:</strong> 3 years</p>
                  <p className="text-gray-700"><strong>Annual Fee:</strong> ₹2,31,000 (₹1,15,500 with 50% scholarship)</p>
                  <p className="text-gray-700"><strong>Eligibility:</strong> HSC from any stream</p>
                  <p className="text-gray-700"><strong>Specializations:</strong> International Business, Marketing, Finance & ACCA</p>
                </div>
                <Link 
                  to="/sharda-university" 
                  className="text-blue-600 hover:underline font-medium"
                >
                  Learn more about BBA →
                </Link>
              </div>

              <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-2xl font-semibold mb-3">MBA (Master of Business Administration)</h3>
                <div className="space-y-2 mb-4">
                  <p className="text-gray-700"><strong>Duration:</strong> 2 years</p>
                  <p className="text-gray-700"><strong>Annual Fee:</strong> ₹2,80,000 (₹1,40,000 with 50% scholarship)</p>
                  <p className="text-gray-700"><strong>Eligibility:</strong> Bachelor's degree in any discipline</p>
                  <p className="text-gray-700"><strong>Specializations:</strong> Finance, Marketing, HR, International Business</p>
                </div>
                <Link 
                  to="/sharda-university/mba-fees" 
                  className="text-blue-600 hover:underline font-medium"
                >
                  View MBA fee details →
                </Link>
              </div>

              <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-2xl font-semibold mb-3">B.Sc. Nursing</h3>
                <div className="space-y-2 mb-4">
                  <p className="text-gray-700"><strong>Duration:</strong> 4 years</p>
                  <p className="text-gray-700"><strong>Annual Fee:</strong> ₹2,40,000 (₹1,80,000 with 25% scholarship)</p>
                  <p className="text-gray-700"><strong>Eligibility:</strong> HSC with Physics, Chemistry, Biology</p>
                  <p className="text-gray-700"><strong>Advantage:</strong> Training at 1600+ bed Sharda Hospital</p>
                </div>
                <Link 
                  to="/sharda-university" 
                  className="text-blue-600 hover:underline font-medium"
                >
                  Explore Nursing program →
                </Link>
              </div>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-8">
              <h4 className="font-semibold text-lg mb-2">💡 Scholarship Eligibility</h4>
              <ul className="space-y-2 text-gray-700">
                <li><strong>50% Scholarship:</strong> GPA 3.5 to 5.0 in HSC</li>
                <li><strong>20% Scholarship:</strong> GPA 3.0 to 3.4 in HSC</li>
                <li><strong>B.Sc. Nursing:</strong> Flat 25% scholarship for all students</li>
              </ul>
            </div>

            <div className="text-center">
              <WhatsAppCTA 
                context="Study in India - Program Inquiry"
                variant="button"
              />
            </div>
          </div>
        </section>

        {/* Admission Process Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Simple Admission Process for Bangladeshi Students</h2>
            
            <div className="max-w-4xl mx-auto">
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                    1
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">Apply Online</h3>
                    <p className="text-gray-700">
                      Visit <a href="https://bangladesh.shardauniversity.org" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">bangladesh.shardauniversity.org</a> and 
                      complete the application form. Upload scanned copies of your SSC/HSC mark sheets, certificates, and passport.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                    2
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">Document Verification & Interview</h3>
                    <p className="text-gray-700">
                      The admissions team reviews your documents and conducts a brief online or telephone interview 
                      with a faculty member to assess your suitability for the program.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                    3
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">Receive Offer Letter</h3>
                    <p className="text-gray-700">
                      Upon successful evaluation, you'll receive a Provisional Offer Letter via email 
                      detailing your program, fees, and scholarship (if applicable).
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                    4
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">Accept & Pay Advance Fee</h3>
                    <p className="text-gray-700">
                      Accept the offer and pay the initial advance fee through your bank's Student File system 
                      as per Bangladesh Bank regulations for educational remittances.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                    5
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">Get Visa Documents</h3>
                    <p className="text-gray-700">
                      After payment confirmation, receive your final Admission Letter and Visa Invitation Letter 
                      required for applying for an Indian Student Visa at IVAC in Bangladesh.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                    6
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">Apply for Student Visa</h3>
                    <p className="text-gray-700">
                      Submit your visa application at the Indian Visa Application Centre (IVAC) in Dhaka or Chittagong 
                      with all required documents including university letters and financial proof.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                    7
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">Arrive & Register</h3>
                    <p className="text-gray-700">
                      Once your visa is approved, travel to India. The International Relations Division will assist 
                      with airport pickup, hostel allotment, and FRRO registration.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-12 bg-blue-50 p-6 rounded-lg">
                <h4 className="font-semibold text-lg mb-3">📞 Need Help with Admissions?</h4>
                <p className="text-gray-700 mb-4">
                  Our dedicated Bangladesh admissions team is here to guide you through every step.
                </p>
                <div className="space-y-2 text-gray-700">
                  <p><strong>WhatsApp:</strong> +91 88009 96151</p>
                  <p><strong>Email:</strong> global@sharda.ac.in</p>
                  <p><strong>Portal:</strong> <a href="https://bangladesh.shardauniversity.org" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">bangladesh.shardauniversity.org</a></p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
            
            <div className="max-w-3xl mx-auto space-y-6">
              <details className="bg-gray-50 p-6 rounded-lg">
                <summary className="font-semibold text-lg cursor-pointer">
                  Why should Bangladeshi students study in India?
                </summary>
                <p className="mt-4 text-gray-700">
                  India offers world-class education with cultural familiarity, affordable costs, and globally recognized degrees. 
                  Indian universities like Sharda provide NAAC A+ accreditation and strong career prospects at a fraction of the 
                  cost compared to Western countries. The shared cultural heritage makes adaptation seamless.
                </p>
              </details>

              <details className="bg-gray-50 p-6 rounded-lg">
                <summary className="font-semibold text-lg cursor-pointer">
                  What scholarships are available for Bangladeshi students at Sharda University?
                </summary>
                <p className="mt-4 text-gray-700">
                  Sharda University offers merit-based scholarships: 50% tuition fee waiver for GPA 3.5-5.0 and 20% for GPA 3.0-3.4. 
                  B.Sc. Nursing students receive a flat 25% scholarship. These scholarships significantly reduce the cost of education.
                </p>
              </details>

              <details className="bg-gray-50 p-6 rounded-lg">
                <summary className="font-semibold text-lg cursor-pointer">
                  What is the admission process for Bangladeshi students?
                </summary>
                <p className="mt-4 text-gray-700">
                  Apply online at bangladesh.shardauniversity.org, submit HSC documents, attend an interview, receive offer letter, 
                  pay advance fee through Bangladesh Bank's Student File system, and obtain admission and visa invitation letters 
                  for Indian student visa application at IVAC.
                </p>
              </details>

              <details className="bg-gray-50 p-6 rounded-lg">
                <summary className="font-semibold text-lg cursor-pointer">
                  How much does it cost to study at Sharda University from Bangladesh?
                </summary>
                <p className="mt-4 text-gray-700">
                  B.Tech CSE costs ₹2,70,000/year, BBA ₹2,31,000/year, MBA ₹2,80,000/year, with hostel from ₹1,20,000/year. 
                  With 50% scholarship, tuition costs are halved, making it highly affordable compared to Western universities.
                </p>
              </details>

              <details className="bg-gray-50 p-6 rounded-lg">
                <summary className="font-semibold text-lg cursor-pointer">
                  Can Bangladeshi students work part-time in India?
                </summary>
                <p className="mt-4 text-gray-700">
                  No, Indian student visa regulations strictly prohibit part-time work. Only mandatory curriculum-based internships 
                  that are part of the academic program are permitted. Students should plan finances accordingly.
                </p>
              </details>

              <details className="bg-gray-50 p-6 rounded-lg">
                <summary className="font-semibold text-lg cursor-pointer">
                  Is Sharda University degree recognized in Bangladesh?
                </summary>
                <p className="mt-4 text-gray-700">
                  Yes, Sharda University is UGC recognized and NAAC A+ accredited. Degrees are internationally recognized and 
                  accepted in Bangladesh for employment and further studies. The university is also a member of the Association 
                  of Commonwealth Universities (ACU).
                </p>
              </details>

              <details className="bg-gray-50 p-6 rounded-lg">
                <summary className="font-semibold text-lg cursor-pointer">
                  What support does Sharda provide to international students?
                </summary>
                <p className="mt-4 text-gray-700">
                  The International Relations Division provides comprehensive support including airport pickup, hostel allotment, 
                  FRRO registration assistance, AIU equivalence certificate guidance, and ongoing academic and personal support 
                  throughout your studies.
                </p>
              </details>

              <details className="bg-gray-50 p-6 rounded-lg">
                <summary className="font-semibold text-lg cursor-pointer">
                  How do I transfer fees from Bangladesh to India?
                </summary>
                <p className="mt-4 text-gray-700">
                  Use the official "Student File" system through an Authorized Dealer (AD) bank in Bangladesh as per Bangladesh Bank 
                  regulations. Submit the university's admission letter and fee invoice to your bank, which will directly remit 
                  the fees to Sharda University's account in India.
                </p>
              </details>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join thousands of Bangladeshi students who have chosen Sharda University for world-class education in India.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <ApplicationCTA 
                variant="primary"
                source="study-in-india-bd-page"
                context="final-cta"
              />
              <WhatsAppCTA 
                context="Study in India from Bangladesh - Final CTA"
                variant="button"
              />
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default StudyInIndiaFromBangladesh;
