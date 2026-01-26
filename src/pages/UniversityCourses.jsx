import { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import SEOHead from '../components/SEO/SEOHead';
import StructuredData from '../components/SEO/StructuredData';
import Breadcrumbs from '../components/Common/Breadcrumbs';
import CourseFilters from '../components/Compare/CourseFilters';
import { generateOrganizationSchema, generateBreadcrumbSchema } from '../components/SEO/StructuredData';
import { calculateTotalFees } from '../utils/rankings';
import { filterPrograms } from '../utils/filterPrograms';

export default function UniversityCourses() {
  const { universitySlug } = useParams();
  const { getUniversityBySlug, getProgramsByUniversity, universities, loading } = useData();
  
  const university = getUniversityBySlug(universitySlug);
  
  const [filters, setFilters] = useState({
    degreeLevel: '',
    universityId: '',
    field: '',
    search: ''
  });

  // Get programs for this university - memoized to avoid recalculation
  const allPrograms = useMemo(() => {
    return university ? getProgramsByUniversity(university.id) : [];
  }, [university, getProgramsByUniversity]);

  // Filter programs - but university filter is already applied, so we only use other filters
  const filteredPrograms = useMemo(() => {
    const filtersToApply = { ...filters, universityId: '' }; // Don't filter by university since we're already on a university page
    // Pass universities array for comparison scoring (though less relevant on single university page)
    return filterPrograms(allPrograms, filtersToApply, universities);
  }, [allPrograms, filters, universities]);

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Universities', url: '/universities' },
    { name: university?.name || 'University', url: `/universities/${universitySlug}` },
    { name: 'Courses', url: `/universities/${universitySlug}/courses` }
  ];

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" aria-live="polite" aria-busy="true">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4" role="status" aria-label="Loading">
              <span className="sr-only">Loading courses...</span>
            </div>
            <p className="text-gray-700" aria-live="polite">Loading courses...</p>
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

  // Group filtered programs by degree
  const programsByDegree = filteredPrograms.reduce((acc, program) => {
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
        title={`All Courses at ${university.name} - Complete Course List`}
        description={`Browse all ${allPrograms.length} courses offered by ${university.name}. Compare fees, scholarships, and find the perfect program for your career. Free counseling available.`}
        keywords={[university.name, 'courses', 'programs', 'fees', 'scholarships', 'admission']}
        url={`/universities/${universitySlug}/courses`}
        canonical={`/universities/${universitySlug}/courses`}
      />
      <StructuredData data={orgSchema} />
      {generateBreadcrumbSchema(breadcrumbs) && <StructuredData data={generateBreadcrumbSchema(breadcrumbs)} />}
      <Breadcrumbs items={breadcrumbs} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <section className="mb-6 sm:mb-8">
          <div className="mb-4">
            <Link
              to={`/universities/${universitySlug}`}
              className="text-blue-600 hover:text-blue-800 font-semibold text-sm sm:text-base inline-flex items-center mb-3"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to University Profile
            </Link>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4">All Courses at {university.name}</h1>
          <p className="text-base sm:text-lg text-gray-600 mb-4">
            {university.shortName} offers {allPrograms.length} programs across various fields. 
            {filters.search || filters.degreeLevel || filters.field
              ? ` Showing ${filteredPrograms.length} filtered results.`
              : ' Each course page provides detailed information including fees, scholarships, eligibility, and career prospects.'}
          </p>
        </section>

        {/* Course Filters */}
        <CourseFilters
          allPrograms={allPrograms}
          universities={universities}
          filters={filters}
          onFiltersChange={setFilters}
        />

        {/* Courses by Degree or Filtered Results */}
        {filteredPrograms.length > 0 ? (
          Object.keys(programsByDegree).length > 0 ? (
            Object.entries(programsByDegree).map(([degree, degreePrograms]) => (
              <section key={degree} className="mb-10 sm:mb-12">
                <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 border-b-2 border-gray-200 pb-2">
                  {degree} Programs ({degreePrograms.length})
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {degreePrograms.map(program => {
                    const fees = calculateTotalFees(program, university);
                    return (
                      <Link
                        key={program.id}
                        to={`/universities/${universitySlug}/courses/${program.slug}`}
                        className="bg-white p-5 sm:p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 border border-gray-200 group hover:border-blue-300"
                      >
                        <h3 className="text-lg sm:text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                          {program.name}
                        </h3>
                        {program.specialization && (
                          <p className="text-xs sm:text-sm text-gray-500 mb-3 line-clamp-1">{program.specialization}</p>
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

                        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                          <span className="text-xs text-gray-500">{program.field || 'Tech'}</span>
                          <span className="text-sm text-blue-600 font-semibold group-hover:underline">
                            View Details →
                          </span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </section>
            ))
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {filteredPrograms.map(program => {
                const fees = calculateTotalFees(program, university);
                return (
                  <Link
                    key={program.id}
                    to={`/universities/${universitySlug}/courses/${program.slug}`}
                    className="bg-white p-5 sm:p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 border border-gray-200 group hover:border-blue-300"
                  >
                    <h3 className="text-lg sm:text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {program.name}
                    </h3>
                    {program.specialization && (
                      <p className="text-xs sm:text-sm text-gray-500 mb-3 line-clamp-1">{program.specialization}</p>
                    )}
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Duration:</span>
                        <span className="font-semibold">{program.duration} years</span>
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

                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <span className="text-xs text-gray-500">{program.degree || 'N/A'}</span>
                      <span className="text-sm text-blue-600 font-semibold group-hover:underline">
                        View Details →
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          )
        ) : (
          <div className="col-span-full text-center py-12 sm:py-16 bg-gray-50 rounded-lg border border-gray-200">
            <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No courses found</h3>
            <p className="text-gray-600 mb-4">
              {filters.search || filters.degreeLevel || filters.field
                ? 'Try adjusting your filters to see more results.'
                : 'No courses available at this university.'}
            </p>
            {(filters.search || filters.degreeLevel || filters.field) && (
              <button
                onClick={() => setFilters({ degreeLevel: '', universityId: '', field: '', search: '' })}
                className="text-blue-600 hover:text-blue-800 font-semibold"
              >
                Clear all filters
              </button>
            )}
          </div>
        )}

        {/* Quick Stats */}
        {filteredPrograms.length > 0 && (
          <section className="bg-gray-50 p-5 sm:p-6 rounded-lg mb-8">
            <h2 className="text-xl sm:text-2xl font-bold mb-4">Quick Statistics</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-blue-600">{allPrograms.length}</div>
                <div className="text-xs sm:text-sm text-gray-600">Total Programs</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-blue-600">{Object.keys(programsByDegree).length}</div>
                <div className="text-xs sm:text-sm text-gray-600">Degree Types</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-blue-600">{university.profile?.rankings?.nirf || 'N/A'}</div>
                <div className="text-xs sm:text-sm text-gray-600">NIRF Ranking</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-blue-600">
                  {allPrograms.length > 0 ? calculateTotalFees(allPrograms[0], university).scholarshipPercent : 0}%
                </div>
                <div className="text-xs sm:text-sm text-gray-600">Avg Scholarship</div>
              </div>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="bg-blue-50 p-8 rounded-lg text-center">
          <h2 className="text-2xl font-bold mb-4">Interested in {university.name}?</h2>
          <p className="text-gray-600 mb-6">
            Get free counseling and application assistance for your admission
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

