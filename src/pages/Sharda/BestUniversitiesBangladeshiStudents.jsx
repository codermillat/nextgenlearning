import React, { useEffect, useState } from 'react';
import UniversityComparison from '../../components/Sharda/UniversityComparison';
import SEOMetaTags from '../../components/SEO/SEOMetaTags';
import StructuredData from '../../components/SEO/StructuredData';
import ApplicationCTA from '../../components/Sharda/ApplicationCTA';
import WhatsAppCTA from '../../components/Sharda/WhatsAppCTA';

/**
 * Best Universities for Bangladeshi Students in India
 * 
 * SEO-optimized comparison page targeting "best universities for bangladeshi students in india"
 * Highlights Sharda's strengths for Bangladeshi students
 * 
 * Requirements: 10.6
 */
const BestUniversitiesBangladeshiStudents = () => {
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load university data
    const loadData = async () => {
      try {
        const shardaResponse = await fetch('/data/universities/sharda.json');
        const sharda = await shardaResponse.json();

        const chandigarhResponse = await fetch('/data/universities/chandigarh.json');
        const chandigarh = await chandigarhResponse.json();

        const galgotiasResponse = await fetch('/data/universities/galgotias.json');
        const galgotias = await galgotiasResponse.json();

        setUniversities([sharda, chandigarh, galgotias]);
      } catch (error) {
        console.error('Error loading university data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading comparison...</p>
        </div>
      </div>
    );
  }

  if (universities.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Unable to load comparison data.</p>
        </div>
      </div>
    );
  }

  const pageTitle = 'Best Universities for Bangladeshi Students in India 2026 | Top Choices';
  const pageDescription = 'Discover the best universities in India for Bangladeshi students. Compare Sharda, Chandigarh, and Galgotias universities - scholarships, support services, rankings, and placements.';
  const canonicalUrl = 'https://www.nextgenlearning.dev/best-universities-bangladeshi-students-india';
  const universityUrls = {
    sharda: 'https://www.nextgenlearning.dev/sharda-university',
    chandigarh: 'https://www.nextgenlearning.dev/universities/chandigarh-university',
    galgotias: 'https://www.nextgenlearning.dev/universities/galgotias-university',
  };

  // Structured data for comparison
  const comparisonSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: pageTitle,
    description: pageDescription,
    url: canonicalUrl,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: universities.map((uni, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'EducationalOrganization',
          name: uni.name,
          url: universityUrls[uni.id] || 'https://www.nextgenlearning.dev/universities',
          address: {
            '@type': 'PostalAddress',
            addressLocality: uni.location
          }
        }
      }))
    }
  };

  // FAQ Schema
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Which is the best university in India for Bangladeshi students?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Sharda University is ranked #1 among private universities in India for international students, with 2000+ students from 85+ countries including a large Bangladeshi community. The university offers 50% scholarships for Bangladeshi students with GPA 3.5+, comprehensive support services, and excellent placement opportunities.'
        }
      },
      {
        '@type': 'Question',
        name: 'What scholarships are available for Bangladeshi students in India?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Sharda University offers 50% scholarship for Bangladeshi students with GPA 3.5-5.0 and 20% scholarship for GPA 3.0-3.4. Chandigarh University offers 50% for GPA 3.5+ and 35% for below 3.5. Galgotias University offers 60% scholarship for all B.Tech courses with no GPA requirement.'
        }
      },
      {
        '@type': 'Question',
        name: 'How much does it cost for a Bangladeshi student to study in India?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'After scholarships, Bangladeshi students can expect to pay ₹1.35-1.5 lakh per year for tuition at Sharda University (with 50% scholarship), plus accommodation (₹80,000-1 lakh per year) and living expenses (₹30,000-50,000 per year). Total annual cost ranges from ₹2.5-3 lakh including all expenses.'
        }
      },
      {
        '@type': 'Question',
        name: 'What support services are available for Bangladeshi students?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Sharda University provides comprehensive support including airport reception, FRRO registration assistance, visa guidance, HSC certificate equivalence help, dedicated international student office, cultural integration programs, halal food options, prayer facilities, and 24/7 medical care through on-campus hospital.'
        }
      }
    ]
  };

  return (
    <>
      <SEOMetaTags
        title={pageTitle}
        description={pageDescription}
        keywords={[
          'best universities for bangladeshi students in india',
          'top universities for bangladeshi students',
          'bangladeshi students in india',
          'study in india from bangladesh',
          'indian universities for bangladeshi students',
          'scholarship for bangladeshi students in india'
        ]}
        canonicalUrl={canonicalUrl}
        ogImage="/og-image.svg"
      />

      <StructuredData data={comparisonSchema} />
      <StructuredData data={faqSchema} />

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
          <div className="max-w-7xl mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Best Universities for Bangladeshi Students in India
            </h1>
            <p className="text-xl md:text-2xl mb-6 text-blue-100">
              Compare top universities offering excellent education, generous scholarships, and comprehensive support for Bangladeshi students
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <ApplicationCTA
                variant="secondary"
                source="bangladeshi-comparison-hero"
                context="best-universities-bangladeshi-hero"
              />
              <WhatsAppCTA
                context="Best Universities for Bangladeshi Students - Hero"
                variant="button"
              />
            </div>
          </div>
        </div>

        {/* Why Study in India Section */}
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="bg-white rounded-lg shadow-md p-8 mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Why Indian Universities are Perfect for Bangladeshi Students
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6 text-gray-700">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Affordable Education</h3>
                  <p>Quality education at a fraction of the cost compared to Western countries, with generous scholarships up to 60% for Bangladeshi students.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Cultural Similarity</h3>
                  <p>Similar climate, food culture, and religious facilities. Easy adaptation with halal food options and prayer facilities on campus.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Recognized Degrees</h3>
                  <p>UGC-approved universities with degrees recognized globally and in Bangladesh. NAAC A+ accreditation ensures quality education.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Excellent Placements</h3>
                  <p>Strong placement records with packages up to ₹1 crore per annum. Access to Indian and international job markets.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* University Comparison */}
        <UniversityComparison
          universities={universities}
          highlightUniversity="sharda"
          title="Compare Top Universities for Bangladeshi Students"
          description="Side-by-side comparison of leading universities in India that welcome Bangladeshi students with excellent scholarships and support services."
        />

        {/* Scholarship Comparison Section */}
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Scholarship Comparison for Bangladeshi Students
            </h2>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">University</th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">GPA 3.5-5.0</th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">GPA 3.0-3.4</th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Special Benefits</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-blue-50">
                    <td className="border border-gray-300 px-4 py-3 font-semibold text-gray-900">
                      Sharda University
                      <span className="ml-2 inline-block px-2 py-1 text-xs font-semibold text-white bg-blue-600 rounded-full">
                        Recommended
                      </span>
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-blue-700 font-semibold">50% Scholarship</td>
                    <td className="border border-gray-300 px-4 py-3 text-blue-700 font-semibold">20% Scholarship</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-700">
                      #1 for international students, on-campus hospital, airport reception
                    </td>
                  </tr>
                  <tr className="bg-white">
                    <td className="border border-gray-300 px-4 py-3 font-medium text-gray-900">Chandigarh University</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-700">50% Scholarship</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-700">35% Scholarship</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-700">
                      Large campus, smart infrastructure
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3 font-medium text-gray-900">Galgotias University</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-700">60% for B.Tech</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-700">60% for B.Tech</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-700">
                      No GPA requirement for B.Tech, AACSB business school
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-gray-700">
                <strong>Note:</strong> Sharda University offers the best overall package for Bangladeshi students with 
                its #1 ranking for international students, comprehensive support services, on-campus hospital, and 
                excellent placement record. The 50% scholarship combined with these facilities makes it the top choice.
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Which is the best university in India for Bangladeshi students?
                </h3>
                <p className="text-gray-700">
                  Sharda University is ranked #1 among private universities in India for international students, 
                  with 2000+ students from 85+ countries including a large Bangladeshi community. The university 
                  offers 50% scholarships for Bangladeshi students with GPA 3.5+, comprehensive support services 
                  including airport reception and FRRO registration, and excellent placement opportunities with 
                  packages up to ₹1 crore per annum.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  What scholarships are available for Bangladeshi students in India?
                </h3>
                <p className="text-gray-700">
                  Sharda University offers 50% scholarship for Bangladeshi students with GPA 3.5-5.0 and 20% 
                  scholarship for GPA 3.0-3.4. Chandigarh University offers 50% for GPA 3.5+ and 35% for below 3.5. 
                  Galgotias University offers 60% scholarship for all B.Tech courses with no GPA requirement. These 
                  scholarships significantly reduce the cost of education.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  How much does it cost for a Bangladeshi student to study in India?
                </h3>
                <p className="text-gray-700">
                  After scholarships, Bangladeshi students can expect to pay ₹1.35-1.5 lakh per year for tuition 
                  at Sharda University (with 50% scholarship), plus accommodation (₹80,000-1 lakh per year) and 
                  living expenses (₹30,000-50,000 per year). Total annual cost ranges from ₹2.5-3 lakh including 
                  all expenses, making it very affordable compared to Western countries.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  What support services are available for Bangladeshi students?
                </h3>
                <p className="text-gray-700">
                  Sharda University provides comprehensive support including airport reception, FRRO registration 
                  assistance, visa guidance, HSC certificate equivalence help, dedicated international student office, 
                  cultural integration programs, halal food options, prayer facilities, and 24/7 medical care through 
                  its on-campus 1,200-bed hospital. The university also has a large Bangladeshi student community 
                  for peer support.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Are Indian university degrees recognized in Bangladesh?
                </h3>
                <p className="text-gray-700">
                  Yes, degrees from UGC-approved Indian universities are recognized in Bangladesh. Sharda University, 
                  Chandigarh University, and Galgotias University are all UGC-approved with NAAC A+ accreditation, 
                  ensuring their degrees are recognized globally and in Bangladesh. Many Bangladeshi students have 
                  successfully returned to Bangladesh or pursued international careers after graduating from these 
                  universities.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  What is the admission process for Bangladeshi students?
                </h3>
                <p className="text-gray-700">
                  The admission process involves: 1) Submitting HSC certificates and transcripts, 2) Meeting minimum 
                  GPA requirements (varies by program), 3) Applying for admission through the university portal, 
                  4) Receiving admission offer letter, 5) Applying for student visa, 6) Completing FRRO registration 
                  after arrival. Sharda University provides guidance and support throughout this process, including 
                  airport reception and documentation assistance.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              Join thousands of Bangladeshi students who have chosen Sharda University for their higher education
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <ApplicationCTA
                variant="secondary"
                source="bangladeshi-comparison-footer"
                context="best-universities-bangladeshi-footer"
              />
              <WhatsAppCTA
                context="Best Universities for Bangladeshi Students - Footer"
                variant="button"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BestUniversitiesBangladeshiStudents;
