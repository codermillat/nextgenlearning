import { useParams, Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import SEOHead from '../components/SEO/SEOHead';
import StructuredData from '../components/SEO/StructuredData';
import Breadcrumbs from '../components/Common/Breadcrumbs';
import FAQSection from '../components/SEO/FAQSection';
import { generateOrganizationSchema, generateBreadcrumbSchema } from '../components/SEO/StructuredData';
import { calculateTotalFees } from '../utils/rankings';

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

  const faqs = [
    {
      question: `What is ${university.name}'s ranking?`,
      answer: `${university.name} has a NIRF ranking of ${university.profile?.rankings?.nirf || 'N/A'}. ${university.profile?.rankings?.naac ? `It is also accredited by NAAC with ${university.profile.rankings.naac} grade.` : ''} The university is recognized for its quality education and industry partnerships.`
    },
    {
      question: `What scholarships are available for Bangladeshi students at ${university.name}?`,
      answer: `${university.name} offers scholarships for Bangladeshi students. ${university.id === 'niu' ? 'NIU provides a flat 50% scholarship to all Bangladeshi students.' : university.id === 'sharda' ? 'Sharda University offers GPA-based scholarships (up to 50% for GPA 3.5+).' : 'Scholarship details vary by program. Check individual course pages for specific scholarship information.'}`
    },
    {
      question: `What is the location of ${university.name}?`,
      answer: `${university.name} is located in ${university.location}. The campus offers modern facilities, well-equipped labs, libraries, hostels, and recreational facilities for students.`
    },
    {
      question: `How do I apply to ${university.name}?`,
      answer: `You can apply to ${university.name} through Western Bangla Education (WBE) for free counseling and application assistance. WBE provides visa assistance, document verification, and admission support. Click the "Apply Now" button to get started.`
    }
  ];

  return (
    <>
      <SEOHead
        title={`${university.name} ${university.profile?.rankings?.nirf ? `NIRF Ranking ${university.profile.rankings.nirf}` : ''} 2025-26 | ${programs.length}+ Courses, Fees ₹${university.id === 'niu' ? '2-5L' : university.id === 'sharda' ? '2-6L' : university.id === 'chandigarh' ? '2-8L' : '2-6L'}/year, Scholarships ${university.id === 'niu' ? '50%' : university.id === 'sharda' ? '20-50%' : university.id === 'chandigarh' ? '35-50%' : '50-60%'} | ${university.profile?.rankings?.naac || 'NAAC A+'}`}
        description={`${university.name} 2025-26: Complete Guide with NIRF Ranking ${university.profile?.rankings?.nirf || 'Top 250'}, NAAC ${university.profile?.rankings?.naac || 'A+'} accreditation. Explore ${programs.length}+ courses including B.Tech CSE, AI/ML, Data Science. Total fees after ${university.id === 'niu' ? '50%' : university.id === 'sharda' ? '20-50%' : university.id === 'chandigarh' ? '35-50%' : '50-60%'} scholarship for Bangladeshi students. ${university.profile?.facilities?.placement?.packages?.averageBtech ? `Average placement: ${university.profile.facilities.placement.packages.averageBtech}. ` : ''}Industry partnerships with ${university.profile?.facilities?.academic?.industryPartnerships?.slice(0,3).join(', ') || 'TCS, Infosys, Wipro'}. Location: ${university.location}.`}
        keywords={[
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
          'study in India from Bangladesh',
          'Indian universities for Bangladeshi students',
          'NIRF ranking universities India',
          'NAAC A+ universities India'
        ]}
        url={`/universities/${universitySlug}`}
        canonical={`/universities/${universitySlug}`}
      />
      <StructuredData data={orgSchema} />
      {generateBreadcrumbSchema(breadcrumbs) && <StructuredData data={generateBreadcrumbSchema(breadcrumbs)} />}
      {/* FAQ schema is generated by FAQSection component below */}
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
            Get free counseling and application assistance from Western Bangla Education
          </p>
          <Link
            to="/apply"
            className="bg-blue-600 text-white px-6 sm:px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-block min-h-[44px] flex items-center justify-center text-sm sm:text-base w-full sm:w-auto shadow-md"
          >
            Apply Now - Free Consultation
          </Link>
        </section>
      </div>
    </>
  );
}

