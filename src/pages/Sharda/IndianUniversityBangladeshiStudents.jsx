import React from 'react';
import { Link } from 'react-router-dom';
import SEOMetaTags from '../../components/SEO/SEOMetaTags';
import StructuredData from '../../components/SEO/StructuredData';
import ApplicationCTA from '../../components/Sharda/ApplicationCTA';
import WhatsAppCTA from '../../components/Sharda/WhatsAppCTA';

/**
 * Indian University for Bangladeshi Students Page
 * SEO-optimized page targeting "indian university for bangladeshi students" keyword
 * Requirements: 3.2
 */
const IndianUniversityBangladeshiStudents = () => {
  const pageTitle = 'Best Indian University for Bangladeshi Students 2026-27 | Sharda University';
  const pageDescription = 'Sharda University - #1 Indian university for international students with 95+ countries. Get 50% scholarship, NAAC A+ accreditation, and dedicated support for Bangladeshi students.';
  const canonicalUrl = 'https://nextgenlearning.com/sharda-university/indian-university-bangladeshi-students';

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Which is the best Indian university for Bangladeshi students?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Sharda University is ranked #1 in India for international students with learners from 95+ countries. It offers NAAC A+ accreditation, up to 50% scholarship for Bangladeshi students, and dedicated International Relations Division support.',
        },
      },
      {
        '@type': 'Question',
        name: 'How many Bangladeshi students study at Sharda University?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Sharda University has a significant Bangladeshi student community as part of its 95+ country international student body. The university provides dedicated support through its International Relations Division.',
        },
      },
      {
        '@type': 'Question',
        name: 'What makes Sharda University good for Bangladeshi students?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Sharda offers cultural familiarity, generous scholarships (up to 50%), NAAC A+ accreditation, 135+ programs, on-campus hospital, strong placements with 600+ companies, and comprehensive support for international students.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is Sharda University degree valid in Bangladesh?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, Sharda University is UGC recognized, NAAC A+ accredited, and a member of the Association of Commonwealth Universities (ACU). Degrees are internationally recognized and valid in Bangladesh for employment and further studies.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I apply to Sharda University from Bangladesh?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Apply online at bangladesh.shardauniversity.org with your HSC documents. After document verification and interview, receive offer letter, pay advance fee, and get admission and visa invitation letters for Indian student visa.',
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
          'indian university for bangladeshi students',
          'best university in india for bangladesh',
          'sharda university bangladesh',
          'study in india from bangladesh',
          'indian university admission bangladesh',
        ]}
        canonicalUrl={canonicalUrl}
      />

      <StructuredData data={faqSchema} />

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-indigo-600 to-indigo-800 text-white py-16">
          <div className="container mx-auto px-4">
            <nav className="text-sm mb-4" aria-label="Breadcrumb">
              <ol className="flex flex-wrap items-center space-x-2">
                <li><Link to="/" className="hover:underline">Home</Link></li>
                <li className="before:content-['/'] before:mx-2">
                  <Link to="/sharda-university" className="hover:underline">Sharda University</Link>
                </li>
                <li className="before:content-['/'] before:mx-2">Indian University for Bangladeshi Students</li>
              </ol>
            </nav>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Best Indian University for Bangladeshi Students: Sharda University
            </h1>
            <p className="text-xl mb-8 max-w-3xl">
              Ranked #1 in India for international students. Join 95+ countries at NAAC A+ accredited Sharda University 
              with up to 50% scholarship and world-class facilities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <ApplicationCTA 
                variant="primary"
                source="indian-university-bd-page"
                context="hero"
              />
              <WhatsAppCTA 
                context="Indian University for Bangladeshi Students - Hero Section"
                variant="button"
              />
            </div>
          </div>
        </section>

        {/* Why Sharda is #1 Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Why Sharda University is #1 for International Students</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg shadow-md">
                <div className="text-4xl mb-4">🌍</div>
                <h3 className="text-xl font-semibold mb-3">Most International University</h3>
                <p className="text-gray-700">
                  Ranked #1 in India with students from 95+ countries. Experience true global diversity 
                  and multicultural learning environment.
                </p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg shadow-md">
                <div className="text-4xl mb-4">🏆</div>
                <h3 className="text-xl font-semibold mb-3">NAAC A+ Accredited</h3>
                <p className="text-gray-700">
                  Highest quality accreditation from India's National Assessment Council. 
                  NIRF ranked #151-200 among all Indian universities.
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg shadow-md">
                <div className="text-4xl mb-4">💰</div>
                <h3 className="text-xl font-semibold mb-3">Up to 50% Scholarship</h3>
                <p className="text-gray-700">
                  Generous merit-based scholarships for Bangladeshi students. Save up to ₹5.4 Lakhs 
                  on your degree with GPA 3.5+ eligibility.
                </p>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-lg shadow-md">
                <div className="text-4xl mb-4">🏥</div>
                <h3 className="text-xl font-semibold mb-3">1600+ Bed Hospital</h3>
                <p className="text-gray-700">
                  On-campus Sharda Hospital provides world-class healthcare and practical training 
                  for medical and nursing students.
                </p>
              </div>

              <div className="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-lg shadow-md">
                <div className="text-4xl mb-4">🎓</div>
                <h3 className="text-xl font-semibold mb-3">135+ Programs</h3>
                <p className="text-gray-700">
                  Wide range of UGC-approved programs in Engineering, Business, Medicine, Nursing, 
                  Law, and more - find your perfect fit.
                </p>
              </div>

              <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-6 rounded-lg shadow-md">
                <div className="text-4xl mb-4">💼</div>
                <h3 className="text-xl font-semibold mb-3">600+ Recruiters</h3>
                <p className="text-gray-700">
                  Strong placement record with companies like TCS, Infosys, Wipro, Deloitte, and Amazon. 
                  Highest package: ₹1.7 Crore.
                </p>
              </div>
            </div>

            <div className="bg-indigo-50 p-8 rounded-lg">
              <h3 className="text-2xl font-bold mb-4">What Makes Sharda Different?</h3>
              <div className="grid md:grid-cols-2 gap-6 text-gray-700">
                <div>
                  <h4 className="font-semibold mb-2">🤝 Dedicated International Support</h4>
                  <p>
                    International Relations Division provides end-to-end support from admission to graduation, 
                    including airport pickup, hostel allotment, and FRRO registration.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">🏛️ State-of-the-Art Infrastructure</h4>
                  <p>
                    63-acre green campus with modern facilities, 1.4 Lac+ books in library, 
                    1Gbps internet, and fully air-conditioned smart classrooms.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">🌐 Global Collaborations</h4>
                  <p>
                    Partnerships with universities worldwide for exchange programs, dual degrees, 
                    and international exposure opportunities.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">🚀 Startup Ecosystem</h4>
                  <p>
                    Sharda Launchpad incubator has supported 85+ startups with mentorship, 
                    funding, and resources for entrepreneurial students.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Rankings & Recognition Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Rankings & Global Recognition</h2>
            
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
                  <h3 className="text-xl font-semibold mb-3">National Rankings</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span><strong>NIRF 2024:</strong> Ranked #151-200 (University Category)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span><strong>NAAC:</strong> A+ Grade Accreditation</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span><strong>NBA:</strong> Accredited Engineering Programs</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
                  <h3 className="text-xl font-semibold mb-3">International Rankings</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">•</span>
                      <span><strong>QS Asia 2024:</strong> Ranked #651-700</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">•</span>
                      <span><strong>THE World:</strong> Ranked #801-1000</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">•</span>
                      <span><strong>ACU Member:</strong> Association of Commonwealth Universities</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4">Official Recognitions & Approvals</h3>
                <div className="grid md:grid-cols-3 gap-4 text-gray-700">
                  <div>
                    <h4 className="font-semibold mb-2">Government Recognition</h4>
                    <ul className="space-y-1 text-sm">
                      <li>✓ UGC Recognized (Section 2f & 22)</li>
                      <li>✓ State Private University (UP Act 14/2009)</li>
                      <li>✓ AIU Member</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Professional Councils</h4>
                    <ul className="space-y-1 text-sm">
                      <li>✓ NMC (Medical)</li>
                      <li>✓ DCI (Dental)</li>
                      <li>✓ BCI (Law)</li>
                      <li>✓ PCI (Pharmacy)</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Quality Assurance</h4>
                    <ul className="space-y-1 text-sm">
                      <li>✓ NAAC A+ Grade</li>
                      <li>✓ NBA Accredited Programs</li>
                      <li>✓ ISO Certified</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mt-8 text-center">
                <Link 
                  to="/sharda-university/nirf-ranking" 
                  className="text-blue-600 hover:underline font-medium text-lg"
                >
                  View detailed NIRF ranking information →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Bangladesh-Specific Benefits Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Special Benefits for Bangladeshi Students</h2>
            
            <div className="max-w-5xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <div className="bg-green-50 p-6 rounded-lg border-2 border-green-500">
                  <h3 className="text-2xl font-semibold mb-4 text-green-700">💰 Generous Scholarships</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2 text-xl">✓</span>
                      <span><strong>50% Scholarship:</strong> For GPA 3.5-5.0 in HSC</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2 text-xl">✓</span>
                      <span><strong>20% Scholarship:</strong> For GPA 3.0-3.4 in HSC</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2 text-xl">✓</span>
                      <span><strong>25% Nursing Scholarship:</strong> Flat rate for all B.Sc. Nursing students</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2 text-xl">✓</span>
                      <span><strong>Save ₹5.4 Lakhs:</strong> Over 4 years with 50% scholarship</span>
                    </li>
                  </ul>
                  <div className="mt-4">
                    <Link 
                      to="/sharda-university/scholarship-bangladeshi-students-india" 
                      className="text-green-600 hover:underline font-medium"
                    >
                      Learn more about scholarships →
                    </Link>
                  </div>
                </div>

                <div className="bg-blue-50 p-6 rounded-lg border-2 border-blue-500">
                  <h3 className="text-2xl font-semibold mb-4 text-blue-700">🤝 Dedicated Support</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2 text-xl">✓</span>
                      <span><strong>Bangladesh Portal:</strong> Dedicated admission portal for easy application</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2 text-xl">✓</span>
                      <span><strong>WhatsApp Support:</strong> Direct contact with admissions team (+91 88009 96151)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2 text-xl">✓</span>
                      <span><strong>AIU Equivalence:</strong> Assistance with certificate equivalence process</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2 text-xl">✓</span>
                      <span><strong>Airport Pickup:</strong> Free pickup service for new students</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-purple-50 p-6 rounded-lg border-2 border-purple-500">
                  <h3 className="text-2xl font-semibold mb-4 text-purple-700">🏠 Cultural Comfort</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-purple-600 mr-2 text-xl">✓</span>
                      <span><strong>Similar Culture:</strong> Shared heritage and traditions make adaptation easy</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-600 mr-2 text-xl">✓</span>
                      <span><strong>Familiar Food:</strong> Multiple canteens with South Asian cuisine</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-600 mr-2 text-xl">✓</span>
                      <span><strong>Prayer Facilities:</strong> On-campus facilities for all religions</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-600 mr-2 text-xl">✓</span>
                      <span><strong>Close Proximity:</strong> Easy travel to/from Bangladesh</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-orange-50 p-6 rounded-lg border-2 border-orange-500">
                  <h3 className="text-2xl font-semibold mb-4 text-orange-700">🎓 Academic Excellence</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-orange-600 mr-2 text-xl">✓</span>
                      <span><strong>Global Curriculum:</strong> Industry-aligned programs with international standards</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-orange-600 mr-2 text-xl">✓</span>
                      <span><strong>Expert Faculty:</strong> Professors with international experience and research</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-orange-600 mr-2 text-xl">✓</span>
                      <span><strong>Modern Labs:</strong> State-of-the-art facilities for practical learning</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-orange-600 mr-2 text-xl">✓</span>
                      <span><strong>Research Opportunities:</strong> Access to research projects and publications</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-indigo-50 p-8 rounded-lg">
                <h3 className="text-2xl font-bold mb-4 text-center">Academic Connections with Bangladesh</h3>
                <p className="text-gray-700 mb-4 text-center">
                  Sharda University maintains strong academic ties with premier Bangladeshi institutions:
                </p>
                <div className="grid md:grid-cols-2 gap-6 text-gray-700">
                  <div className="bg-white p-4 rounded">
                    <h4 className="font-semibold mb-2">Prof. Md. Abu Bin Hasan Susan</h4>
                    <p className="text-sm">Department of Chemistry, Dhaka University</p>
                    <p className="text-sm text-indigo-600">Advisory Board Member, Sharda University Journal</p>
                  </div>
                  <div className="bg-white p-4 rounded">
                    <h4 className="font-semibold mb-2">Dr. Sinthia Shabnam Mou</h4>
                    <p className="text-sm">Dept. of EEE, University of Rajshahi</p>
                    <p className="text-sm text-indigo-600">Presented at National Conference, Sharda University</p>
                  </div>
                </div>
                <p className="text-gray-700 mt-4 text-center text-sm">
                  These connections demonstrate Sharda's commitment to fostering academic collaboration with Bangladesh's top universities.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Popular Programs Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Top Programs for Bangladeshi Students</h2>
            
            <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold mb-3 text-blue-600">Engineering</h3>
                <ul className="space-y-2 text-gray-700 text-sm mb-4">
                  <li>• B.Tech Computer Science</li>
                  <li>• B.Tech AI & Machine Learning</li>
                  <li>• B.Tech Electronics & Communication</li>
                  <li>• B.Tech Mechanical Engineering</li>
                </ul>
                <Link 
                  to="/sharda-university/btech-cse-fees" 
                  className="text-blue-600 hover:underline text-sm font-medium"
                >
                  View B.Tech CSE fees →
                </Link>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold mb-3 text-green-600">Business & Management</h3>
                <ul className="space-y-2 text-gray-700 text-sm mb-4">
                  <li>• BBA (All Specializations)</li>
                  <li>• MBA (Finance, Marketing, HR)</li>
                  <li>• BBA with ACCA Integration</li>
                  <li>• International Business</li>
                </ul>
                <Link 
                  to="/sharda-university/mba-fees" 
                  className="text-green-600 hover:underline text-sm font-medium"
                >
                  View MBA fees →
                </Link>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold mb-3 text-purple-600">Medical & Healthcare</h3>
                <ul className="space-y-2 text-gray-700 text-sm mb-4">
                  <li>• MBBS (via NEET)</li>
                  <li>• B.Sc. Nursing</li>
                  <li>• BDS (Dental)</li>
                  <li>• B.Pharm (Pharmacy)</li>
                </ul>
                <Link 
                  to="/sharda-university" 
                  className="text-purple-600 hover:underline text-sm font-medium"
                >
                  Explore medical programs →
                </Link>
              </div>
            </div>

            <div className="mt-12 text-center">
              <p className="text-lg text-gray-700 mb-4">
                <strong>135+ programs</strong> across Engineering, Business, Medicine, Law, Arts, and more
              </p>
              <ApplicationCTA 
                variant="primary"
                source="indian-university-bd-page"
                context="programs"
              />
            </div>
          </div>
        </section>

        {/* Student Testimonials Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">What Bangladeshi Students Say</h2>
            
            <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
              <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-blue-500">
                <div className="flex items-start mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-xl mr-4">
                    SB
                  </div>
                  <div>
                    <h4 className="font-semibold">Sourav Biswas</h4>
                    <p className="text-sm text-gray-600">B.Tech, 2020-24</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "My experience at Sharda University was excellent. I discovered a lot about my career line, 
                  different cultures, and living independently. I gathered lots of heartwarming experiences 
                  that I will carry forward in life. It was worth it."
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-green-500">
                <div className="flex items-start mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold text-xl mr-4">
                    ND
                  </div>
                  <div>
                    <h4 className="font-semibold">Nobonita Devi</h4>
                    <p className="text-sm text-gray-600">B.Sc. Bio Chemistry</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "Studying B.Sc. Bio Chemistry at Sharda University from Bangladesh has been amazing. 
                  The diverse cultural experiences on campus are helping me prepare for the corporate world. 
                  The international environment is truly enriching."
                </p>
              </div>
            </div>

            <div className="mt-8 text-center">
              <p className="text-gray-600">
                Join hundreds of successful Bangladeshi students at Sharda University
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
            
            <div className="max-w-3xl mx-auto space-y-6">
              <details className="bg-white p-6 rounded-lg shadow-md">
                <summary className="font-semibold text-lg cursor-pointer">
                  Which is the best Indian university for Bangladeshi students?
                </summary>
                <p className="mt-4 text-gray-700">
                  Sharda University is ranked #1 in India for international students with learners from 95+ countries. 
                  It offers NAAC A+ accreditation, up to 50% scholarship for Bangladeshi students, comprehensive support 
                  through the International Relations Division, and a truly global campus environment.
                </p>
              </details>

              <details className="bg-white p-6 rounded-lg shadow-md">
                <summary className="font-semibold text-lg cursor-pointer">
                  How many Bangladeshi students study at Sharda University?
                </summary>
                <p className="mt-4 text-gray-700">
                  Sharda University has a significant Bangladeshi student community as part of its 95+ country international 
                  student body. The university provides dedicated support through its International Relations Division and 
                  maintains strong academic connections with premier Bangladeshi institutions like Dhaka University and Rajshahi University.
                </p>
              </details>

              <details className="bg-white p-6 rounded-lg shadow-md">
                <summary className="font-semibold text-lg cursor-pointer">
                  What makes Sharda University good for Bangladeshi students?
                </summary>
                <p className="mt-4 text-gray-700">
                  Sharda offers cultural familiarity with similar food and traditions, generous scholarships (up to 50%), 
                  NAAC A+ accreditation, 135+ programs, on-campus 1600+ bed hospital, strong placements with 600+ companies, 
                  and comprehensive support for international students including airport pickup and FRRO registration assistance.
                </p>
              </details>

              <details className="bg-white p-6 rounded-lg shadow-md">
                <summary className="font-semibold text-lg cursor-pointer">
                  Is Sharda University degree valid in Bangladesh?
                </summary>
                <p className="mt-4 text-gray-700">
                  Yes, Sharda University is UGC recognized under Section 2(f) and 22, NAAC A+ accredited, and a member of 
                  the Association of Commonwealth Universities (ACU). Degrees are internationally recognized and valid in 
                  Bangladesh for both employment and further studies.
                </p>
              </details>

              <details className="bg-white p-6 rounded-lg shadow-md">
                <summary className="font-semibold text-lg cursor-pointer">
                  How do I apply to Sharda University from Bangladesh?
                </summary>
                <p className="mt-4 text-gray-700">
                  Apply online at bangladesh.shardauniversity.org with your HSC documents and passport. After document 
                  verification and interview, you'll receive an offer letter. Pay the advance fee through Bangladesh Bank's 
                  Student File system, then receive admission and visa invitation letters for applying for an Indian student visa at IVAC.
                </p>
              </details>

              <details className="bg-white p-6 rounded-lg shadow-md">
                <summary className="font-semibold text-lg cursor-pointer">
                  What is the total cost of studying at Sharda University?
                </summary>
                <p className="mt-4 text-gray-700">
                  With 50% scholarship, B.Tech CSE costs ₹1,35,000/year tuition + ₹1,20,000-₹2,00,000/year hostel. 
                  Total 4-year cost ranges from ₹10-15 Lakhs including all expenses, which is 70-80% cheaper than 
                  studying in USA, UK, or Canada.
                </p>
              </details>

              <details className="bg-white p-6 rounded-lg shadow-md">
                <summary className="font-semibold text-lg cursor-pointer">
                  Does Sharda University help with visa process?
                </summary>
                <p className="mt-4 text-gray-700">
                  Yes, Sharda University provides the required Admission Letter and Visa Invitation Letter for your 
                  Indian student visa application. The International Relations Division guides you through the entire 
                  process and assists with FRRO registration after arrival in India.
                </p>
              </details>

              <details className="bg-white p-6 rounded-lg shadow-md">
                <summary className="font-semibold text-lg cursor-pointer">
                  What career support does Sharda provide?
                </summary>
                <p className="mt-4 text-gray-700">
                  Sharda has strong placement support with 600+ companies including TCS, Infosys, Wipro, Deloitte, and Amazon. 
                  The highest package offered is ₹1.7 Crore. Additionally, the Sharda Launchpad incubator supports 
                  entrepreneurial students with mentorship and funding for startups.
                </p>
              </details>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-16 bg-gradient-to-r from-indigo-600 to-indigo-800 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Join India's #1 International University</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Start your journey at Sharda University with up to 50% scholarship. Apply now for 2026-27 admission.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <ApplicationCTA 
                variant="primary"
                source="indian-university-bd-page"
                context="final-cta"
              />
              <WhatsAppCTA 
                context="Indian University for Bangladeshi Students - Final CTA"
                variant="button"
              />
            </div>
            <div className="mt-8 text-sm">
              <p>📞 WhatsApp: +91 88009 96151 | 📧 Email: global@sharda.ac.in</p>
              <p className="mt-2">🌐 Apply at: <a href="https://bangladesh.shardauniversity.org" className="underline hover:text-indigo-200" target="_blank" rel="noopener noreferrer">bangladesh.shardauniversity.org</a></p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default IndianUniversityBangladeshiStudents;
