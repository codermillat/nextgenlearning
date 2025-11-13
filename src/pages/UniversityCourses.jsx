import { useParams, Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import SEOHead from '../components/SEO/SEOHead';
import StructuredData from '../components/SEO/StructuredData';
import Breadcrumbs from '../components/Common/Breadcrumbs';
import { generateOrganizationSchema, generateBreadcrumbSchema } from '../components/SEO/StructuredData';
import { calculateTotalFees } from '../utils/rankings';

export default function UniversityCourses() {
  const { universitySlug } = useParams();
  const { getUniversityBySlug, getProgramsByUniversity, loading } = useData();
  
  const university = getUniversityBySlug(universitySlug);
  const programs = university ? getProgramsByUniversity(university.id) : [];

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Universities', url: '/universities' },
    { name: university?.name || 'University', url: `/universities/${universitySlug}` },
    { name: 'Courses', url: `/universities/${universitySlug}/courses` }
  ];

  if (loading) {
    return <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">Loading courses...</div>;
  }

  if (!university) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold mb-4">University Not Found</h1>
        <Link to="/universities" className="text-blue-600">← Back to Universities</Link>
      </div>
    );
  }

  // Group programs by degree
  const programsByDegree = programs.reduce((acc, program) => {
    const degree = program.degree || 'Other';
    if (!acc[degree]) {
      acc[degree] = [];
    }
    acc[degree].push(program);
    return acc;
  }, {});

  const orgSchema = generateOrganizationSchema(university, `/universities/${universitySlug}/courses`);

  return (
    <>
      <SEOHead
        title={`All Courses at ${university.name} - Complete Course List | WBE`}
        description={`Browse all ${programs.length} courses offered by ${university.name}. Compare fees, scholarships, and find the perfect program for your career. Apply through WBE.`}
        keywords={[university.name, 'courses', 'programs', 'fees', 'scholarships', 'admission']}
        url={`/universities/${universitySlug}/courses`}
        canonical={`/universities/${universitySlug}/courses`}
      />
      <StructuredData data={orgSchema} />
      {generateBreadcrumbSchema(breadcrumbs) && <StructuredData data={generateBreadcrumbSchema(breadcrumbs)} />}
      <Breadcrumbs items={breadcrumbs} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <section className="mb-8">
          <h1 className="text-4xl font-bold mb-4">All Courses at {university.name}</h1>
          <p className="text-lg text-gray-600 mb-4">
            {university.shortName} offers {programs.length} programs across various fields. 
            Each course page provides detailed information including fees, scholarships, eligibility, and career prospects.
          </p>
          <Link
            to={`/universities/${universitySlug}`}
            className="text-blue-600 hover:text-blue-800 font-semibold"
          >
            ← Back to University Profile
          </Link>
        </section>

        {/* Courses by Degree */}
        {Object.entries(programsByDegree).map(([degree, degreePrograms]) => (
          <section key={degree} className="mb-12">
            <h2 className="text-3xl font-bold mb-6 border-b-2 border-gray-200 pb-2">
              {degree} Programs ({degreePrograms.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {degreePrograms.map(program => {
                const fees = calculateTotalFees(program, university);
                return (
                  <Link
                    key={program.id}
                    to={`/universities/${universitySlug}/courses/${program.slug}`}
                    className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200 group"
                  >
                    <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">
                      {program.name}
                    </h3>
                    {program.specialization && (
                      <p className="text-sm text-gray-600 mb-4">{program.specialization}</p>
                    )}
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Duration:</span>
                        <span className="font-semibold">{program.duration} years</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Annual Fee:</span>
                        <span className="font-semibold">₹{program.annualFees?.[0]?.toLocaleString() || 'N/A'}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Scholarship:</span>
                        <span className="font-semibold text-green-600">{fees.scholarshipPercent}%</span>
                      </div>
                      <div className="flex justify-between text-sm border-t pt-2">
                        <span className="text-gray-600">Total Cost:</span>
                        <span className="font-bold text-blue-600">₹{fees.grandTotal.toLocaleString()}</span>
                      </div>
                    </div>

                    {program.highlights && program.highlights.length > 0 && (
                      <div className="mb-4">
                        <div className="text-xs font-semibold text-gray-500 mb-1">Key Features:</div>
                        <ul className="text-xs text-gray-600 space-y-1">
                          {program.highlights.slice(0, 2).map((highlight, i) => (
                            <li key={i}>• {highlight}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="text-blue-600 font-semibold text-sm group-hover:underline">
                      View Full Details →
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        ))}

        {/* Quick Stats */}
        <section className="bg-gray-50 p-6 rounded-lg mb-8">
          <h2 className="text-2xl font-bold mb-4">Quick Statistics</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <div className="text-3xl font-bold text-blue-600">{programs.length}</div>
              <div className="text-sm text-gray-600">Total Programs</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600">{Object.keys(programsByDegree).length}</div>
              <div className="text-sm text-gray-600">Degree Types</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600">{university.profile?.rankings?.nirf || 'N/A'}</div>
              <div className="text-sm text-gray-600">NIRF Ranking</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600">
                {programs.length > 0 ? calculateTotalFees(programs[0], university).scholarshipPercent : 0}%
              </div>
              <div className="text-sm text-gray-600">Avg Scholarship</div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-blue-50 p-8 rounded-lg text-center">
          <h2 className="text-2xl font-bold mb-4">Interested in {university.name}?</h2>
          <p className="text-gray-600 mb-6">
            Get free counseling and application assistance from Western Bangla Education
          </p>
          <Link
            to="/apply"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-block"
          >
            Apply Now - Free Consultation
          </Link>
        </section>
      </div>
    </>
  );
}

