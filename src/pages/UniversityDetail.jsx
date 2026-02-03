import { useParams, Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import MetaManager from '../components/SEO/MetaManager';
import StructuredData from '../components/SEO/StructuredData';
import UrgencyBanner from '../components/UI/UrgencyBanner';
import Breadcrumbs from '../components/Common/Breadcrumbs';
import FAQSection from '../components/SEO/FAQSection';
import { generateOrganizationSchema, generateBreadcrumbSchema } from '../components/SEO/StructuredData';
import { calculateTotalFees } from '../utils/rankings';
import { SHARDA_APPLY_URL, WHATSAPP_DISPLAY } from '../config/constants';

export default function UniversityDetail() {
  const { universitySlug } = useParams();
  const { getUniversityBySlug, getProgramsByUniversity, loading } = useData();
  
  const university = getUniversityBySlug(universitySlug);
  const programs = university ? getProgramsByUniversity(university.id) : [];

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Universities', url: '/universities' },
    { name: university?.name || 'University', url: `/universities/${universitySlug}` }
  ];

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" aria-live="polite" aria-busy="true">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4" role="status" aria-label="Loading">
              <span className="sr-only">Loading university details...</span>
            </div>
            <p className="text-gray-700" aria-live="polite">Loading university details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!university) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold mb-4">University Not Found</h1>
        <Link to="/universities" className="text-blue-600">← Back to Universities</Link>
      </div>
    );
  }

  const orgSchema = generateOrganizationSchema(university, `/universities/${universitySlug}`);

  // Generate optimized meta description data
  const getUniversityMetaData = () => {
    const studentCount = university.profile?.facilities?.international?.students || '17,000+';
    const nirfRank = university.profile?.rankings?.nirf || 'Top 250';
    const naacGrade = university.profile?.rankings?.naac || 'A+';
    
    // Determine scholarship range based on university
    let scholarshipRange = '20-50%';
    let feeRange = '₹2-6L/year';
    
    if (university.id === 'niu') {
      scholarshipRange = '50%';
      feeRange = '₹2-5L/year';
    } else if (university.id === 'chandigarh') {
      scholarshipRange = '35-50%';
      feeRange = '₹2-8L/year';
    } else if (university.id === 'galgotias') {
      scholarshipRange = '50-60%';
      feeRange = '₹2-6L/year';
    }
    
    return {
      emoji: '🎓',
      benefit: `${university.name} NIRF ${nirfRank}`,
      socialProof: `${studentCount} students, ${naacGrade} rated`,
      price: `Fees ${feeRange}`,
      urgency: `${scholarshipRange} scholarships`,
      cta: 'Apply now',
      baseTitle: `${university.name} ${nirfRank} 2026`,
      url: `/universities/${universitySlug}`,
    };
  };

  const metaData = getUniversityMetaData();

  const faqs = [
    {
      question: `What is ${university.name}'s ranking?`,
      answer: `${university.name} has a NIRF ranking of ${university.profile?.rankings?.nirf || 'N/A'}. ${university.profile?.rankings?.naac ? `It is also accredited by NAAC with ${university.profile.rankings.naac} grade.` : ''} ${university.id !== 'sharda' && university.id !== 'sharda-university' ? `For comparison, Sharda University ranks 101-150 in NIRF 2025 and also has NAAC A+ accreditation, offering similar quality education with 20-50% scholarships for Bangladeshi students.` : 'The university is recognized for its quality education and industry partnerships.'}`
    },
    {
      question: `What scholarships are available for Bangladeshi students at ${university.name}?`,
      answer: `${university.name} offers scholarships for Bangladeshi students. ${university.id === 'niu' ? 'NIU provides a flat 50% scholarship to all Bangladeshi students.' : university.id === 'sharda' ? 'Sharda University offers GPA-based scholarships (up to 50% for GPA 3.5+, 30% for GPA 3.0-3.49, and 20% for GPA 3.0+).' : university.id === 'chandigarh' ? 'Chandigarh University offers 35-50% GPA-based scholarships.' : 'Scholarship details vary by program. Check individual course pages for specific scholarship information.'} ${university.id !== 'sharda' && university.id !== 'sharda-university' ? 'Sharda University also offers competitive 20-50% GPA-based scholarships with automatic renewal annually.' : ''}`
    },
    {
      question: `What is the location of ${university.name}?`,
      answer: `${university.name} is located in ${university.location}. The campus offers modern facilities, well-equipped labs, libraries, hostels, and recreational facilities for students. ${university.id !== 'sharda' && university.id !== 'sharda-university' ? 'Sharda University is located in Greater Noida, NCR, offering excellent connectivity and modern infrastructure.' : ''}`
    },
    {
      question: `How do I apply to ${university.name}?`,
      answer: `You can apply to ${university.name} through our free counseling and application assistance service. We provide visa assistance, document verification, and admission support. Contact us on WhatsApp at ${WHATSAPP_DISPLAY} or click the "Apply Now" button to get started. ${university.id !== 'sharda' && university.id !== 'sharda-university' ? 'We can also help you compare with Sharda University and other top universities to find the best fit for your career goals.' : ''}`
    }
  ];

  return (
    <>
      <MetaManager
        emoji={metaData.emoji}
        benefit={metaData.benefit}
        socialProof={metaData.socialProof}
        price={metaData.price}
        urgency={metaData.urgency}
        cta={metaData.cta}
        baseTitle={metaData.baseTitle}
        url={metaData.url}
      />
      {/* Keywords meta tag */}
      <meta
        name="keywords"
        content={[
          university.name,
          university.shortName,
          `${university.shortName} nirf ranking`,
          `${university.shortName} nirf ranking 2025`,
          `${university.shortName} nirf 2025`,
          `${university.name} ranking`,
          `${university.name} ranking in india`,
          `nirf ranking ${university.shortName}`,
          `${university.name} naac grade`,
          `${university.name} naac accreditation`,
          `${university.name} btech cse fees`,
          `${university.name} btech cse total fees`,
          `${university.name} btech cse total fees 4 years`,
          `${university.name} courses`,
          `${university.name} fees`,
          `${university.name} scholarships`,
          `${university.name} admission`,
          `${university.name} placements`,
          `${university.name} for Bangladeshi students`,
          // Sharda comparison keywords (only for non-Sharda pages)
          ...(university.id !== 'sharda' && university.id !== 'sharda-university' ? [
            `${university.shortName} vs sharda university`,
            `sharda university vs ${university.shortName}`,
            `${university.name} vs sharda`,
            `compare ${university.shortName} and sharda`,
            `${university.shortName} or sharda university`,
            `sharda university better than ${university.shortName}`,
            `${university.shortName} vs sharda fees`,
            `${university.shortName} vs sharda ranking`,
            `${university.shortName} vs sharda for bangladeshi students`
          ] : []),
          'study in India from Bangladesh',
          'Indian universities for Bangladeshi students',
          'NIRF ranking universities India',
          'NAAC A+ universities India'
        ].join(', ')}
      />
      {/* Canonical link */}
      <link rel="canonical" href={`https://www.nextgenlearning.dev/universities/${universitySlug}`} />
      <StructuredData data={orgSchema} />
      {generateBreadcrumbSchema(breadcrumbs) && <StructuredData data={generateBreadcrumbSchema(breadcrumbs)} />}
      {/* FAQ schema is generated by FAQSection component below */}
      
      {/* Urgency Banner */}
      <UrgencyBanner
        deadline="2026-03-31"
        seatsLeft={32}
        ctaText="Apply Now"
        ctaLink={university.id === 'sharda' || university.id === 'sharda-university' ? SHARDA_APPLY_URL : '/apply'}
        variant="university"
      />
      
      <Breadcrumbs items={breadcrumbs} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
        {/* Page Intro */}
        <section className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 leading-tight">{university.name}</h1>
          <p className="text-base sm:text-lg text-gray-600 mb-3 sm:mb-4">{university.location}</p>
          {university.established && (
            <p className="text-sm sm:text-base text-gray-600">Established: {university.established}</p>
          )}
        </section>

        {/* Rankings */}
        <section className="mb-6 sm:mb-8 bg-gray-50 p-4 sm:p-6 rounded-lg">
          <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">University Rankings & Accreditation</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            <div>
              <div className="text-sm text-gray-600 mb-1">NIRF Ranking</div>
              <div className="text-2xl font-bold">{university.profile?.rankings?.nirf || 'N/A'}</div>
            </div>
            {university.profile?.rankings?.naac && (
              <div>
                <div className="text-sm text-gray-600 mb-1">NAAC Accreditation</div>
                <div className="text-2xl font-bold">{university.profile.rankings.naac}</div>
              </div>
            )}
            <div>
              <div className="text-sm text-gray-600 mb-1">Total Programs</div>
              <div className="text-2xl font-bold">{programs.length}</div>
            </div>
          </div>
        </section>

        {/* Highlights */}
        {university.profile?.highlights && university.profile.highlights.length > 0 && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">University Highlights</h2>
            <ul className="list-disc list-inside space-y-2 bg-white border border-gray-200 p-6 rounded-lg">
              {university.profile.highlights.map((highlight, index) => (
                <li key={index} className="text-gray-700">{highlight}</li>
              ))}
            </ul>
          </section>
        )}

        {/* Sharda University Comparison Section - Only show on competitor pages */}
        {university.id !== 'sharda' && university.id !== 'sharda-university' && (
          <section className="mb-8 bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-300 rounded-xl p-6 shadow-md">
            <div className="flex items-start gap-3 mb-4">
              <div className="text-3xl">⭐</div>
              <div>
                <h2 className="text-2xl font-bold mb-2 text-gray-900">
                  Compare {university.shortName} vs Sharda University
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  Considering {university.name}? Also explore <strong>Sharda University</strong> (NIRF 101-150, NAAC A+) 
                  which offers 163+ programs with <strong>20-50% scholarships</strong> for Bangladeshi students. 
                  Sharda is known for its excellent infrastructure, industry partnerships, and strong placement record.
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
                <h3 className="font-bold text-lg mb-3 text-gray-900">{university.shortName}</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <span className="text-blue-600">🏆</span>
                    <span><strong>NIRF Ranking:</strong> {university.profile?.rankings?.nirf || 'N/A'}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-600">📚</span>
                    <span><strong>Programs:</strong> {programs.length}+</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-purple-600">💰</span>
                    <span><strong>Scholarship:</strong> {university.id === 'niu' ? '50% Flat' : university.id === 'chandigarh' ? '35-50%' : '50-60%'}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-orange-600">⭐</span>
                    <span><strong>NAAC:</strong> {university.profile?.rankings?.naac || 'A+'}</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-gradient-to-br from-blue-100 to-indigo-100 p-5 rounded-lg border-2 border-blue-500 shadow-md relative">
                <div className="absolute -top-3 -right-3 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                  FEATURED
                </div>
                <h3 className="font-bold text-lg mb-3 text-blue-900">⭐ Sharda University</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <span className="text-blue-600">🏆</span>
                    <span><strong>NIRF Ranking:</strong> 101-150</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-600">📚</span>
                    <span><strong>Programs:</strong> 163+</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-purple-600">💰</span>
                    <span><strong>Scholarship:</strong> 20-50% (GPA-based)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-orange-600">⭐</span>
                    <span><strong>NAAC:</strong> A+</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to="/sharda"
                className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-center shadow-md"
              >
                Explore Sharda University →
              </Link>
              <Link
                to={`/compare?universities=${university.id},sharda`}
                className="flex-1 bg-white text-blue-600 border-2 border-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors text-center"
              >
                Compare Side-by-Side
              </Link>
            </div>
          </section>
        )}

        {/* Programs Offered */}
        <section className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 sm:mb-4 gap-2">
            <h2 className="text-xl sm:text-2xl font-bold">Programs Offered ({programs.length})</h2>
            <Link
              to={`/universities/${universitySlug}/courses`}
              className="text-blue-600 hover:text-blue-800 font-semibold text-sm sm:text-base"
            >
              View All Courses →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {programs.slice(0, 12).map(program => {
              const fees = calculateTotalFees(program, university);
              return (
                <Link
                  key={program.id}
                  to={`/universities/${universitySlug}/courses/${program.slug}`}
                  className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow border border-gray-200"
                >
                  <h3 className="font-semibold mb-1">{program.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{program.degree} • {program.duration} years</p>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-500">Scholarship: <span className="text-green-600 font-semibold">{fees.scholarshipPercent}%</span></span>
                    <span className="text-blue-600 font-semibold">View Details →</span>
                  </div>
                </Link>
              );
            })}
          </div>
          {programs.length > 12 && (
            <div className="text-center mt-6">
              <Link
                to={`/universities/${universitySlug}/courses`}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-block"
              >
                View All {programs.length} Courses
              </Link>
            </div>
          )}
        </section>

        {/* FAQ Section */}
        <FAQSection faqs={faqs} title={`Frequently Asked Questions about ${university.name}`} />

        {/* CTA Section */}
        <section className="bg-blue-50 p-4 sm:p-6 md:p-8 rounded-lg text-center">
          <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Interested in {university.name}?</h2>
          <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
            Get free counseling and application assistance. Contact us on WhatsApp at {WHATSAPP_DISPLAY}
          </p>
          {(university.id === 'sharda' || university.id === 'sharda-university') ? (
            <a
              href={SHARDA_APPLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 text-white px-6 sm:px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-block min-h-[44px] flex items-center justify-center text-sm sm:text-base w-full sm:w-auto shadow-md"
            >
              Apply Now - Free Consultation
            </a>
          ) : (
            <Link
              to="/apply"
              className="bg-blue-600 text-white px-6 sm:px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-block min-h-[44px] flex items-center justify-center text-sm sm:text-base w-full sm:w-auto shadow-md"
            >
              Apply Now - Free Consultation
            </Link>
          )}
        </section>
      </div>
    </>
  );
}

