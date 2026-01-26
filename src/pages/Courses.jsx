import { useState, useMemo } from 'react';
import { useData } from '../context/DataContext';
import SEOHead from '../components/SEO/SEOHead';
import StructuredData from '../components/SEO/StructuredData';
import Breadcrumbs from '../components/Common/Breadcrumbs';
import CourseFilters from '../components/Compare/CourseFilters';
import Card from '../components/Common/Card';
import { SkeletonPage } from '../components/Common/Skeleton';
import { generateBreadcrumbSchema, generateItemListSchema } from '../components/SEO/StructuredData';
import { getAllCourseGroups } from '../data/courseGroups';
import { getProgramsForGroup } from '../utils/courseGrouping';
import { filterPrograms } from '../utils/filterPrograms';
import { calculateTotalFees } from '../utils/rankings';
import { typography, spacing } from '../utils/designTokens';

// Icon and color mapping for course categories
const COURSE_GROUP_STYLES = {
  'btech-cse': { icon: '💻', bgColor: 'from-blue-50 to-blue-100', borderColor: 'border-blue-200', hoverBorder: 'hover:border-blue-300', textColor: 'group-hover:text-blue-600' },
  'btech-ai-ml': { icon: '🤖', bgColor: 'from-purple-50 to-purple-100', borderColor: 'border-purple-200', hoverBorder: 'hover:border-purple-300', textColor: 'group-hover:text-purple-600' },
  'btech-data-science': { icon: '📊', bgColor: 'from-green-50 to-green-100', borderColor: 'border-green-200', hoverBorder: 'hover:border-green-300', textColor: 'group-hover:text-green-600' },
  'btech-cyber-security': { icon: '🔒', bgColor: 'from-red-50 to-red-100', borderColor: 'border-red-200', hoverBorder: 'hover:border-red-300', textColor: 'group-hover:text-red-600' },
  'btech-it': { icon: '🖥️', bgColor: 'from-cyan-50 to-cyan-100', borderColor: 'border-cyan-200', hoverBorder: 'hover:border-cyan-300', textColor: 'group-hover:text-cyan-600' },
  'btech-cloud-computing': { icon: '☁️', bgColor: 'from-indigo-50 to-indigo-100', borderColor: 'border-indigo-200', hoverBorder: 'hover:border-indigo-300', textColor: 'group-hover:text-indigo-600' },
  'btech-full-stack': { icon: '🌐', bgColor: 'from-yellow-50 to-yellow-100', borderColor: 'border-yellow-200', hoverBorder: 'hover:border-yellow-300', textColor: 'group-hover:text-yellow-600' },
  'btech-blockchain': { icon: '⛓️', bgColor: 'from-gray-50 to-gray-100', borderColor: 'border-gray-200', hoverBorder: 'hover:border-gray-300', textColor: 'group-hover:text-gray-700' },
  'btech-iot': { icon: '📡', bgColor: 'from-teal-50 to-teal-100', borderColor: 'border-teal-200', hoverBorder: 'hover:border-teal-300', textColor: 'group-hover:text-teal-600' },
  'btech-ece': { icon: '📶', bgColor: 'from-orange-50 to-orange-100', borderColor: 'border-orange-200', hoverBorder: 'hover:border-orange-300', textColor: 'group-hover:text-orange-600' },
  'bca': { icon: '📱', bgColor: 'from-pink-50 to-pink-100', borderColor: 'border-pink-200', hoverBorder: 'hover:border-pink-300', textColor: 'group-hover:text-pink-600' },
  'bsc-computer-science': { icon: '🔬', bgColor: 'from-violet-50 to-violet-100', borderColor: 'border-violet-200', hoverBorder: 'hover:border-violet-300', textColor: 'group-hover:text-violet-600' },
  'btech-lateral-cse': { icon: '🚀', bgColor: 'from-blue-50 to-indigo-100', borderColor: 'border-blue-200', hoverBorder: 'hover:border-blue-300', textColor: 'group-hover:text-blue-600' },
  'btech-lateral-aiml': { icon: '🎯', bgColor: 'from-purple-50 to-pink-100', borderColor: 'border-purple-200', hoverBorder: 'hover:border-purple-300', textColor: 'group-hover:text-purple-600' },
  'btech-lateral-data-science': { icon: '📈', bgColor: 'from-green-50 to-teal-100', borderColor: 'border-green-200', hoverBorder: 'hover:border-green-300', textColor: 'group-hover:text-green-600' },
  'mtech-cse': { icon: '🎓', bgColor: 'from-slate-50 to-slate-100', borderColor: 'border-slate-200', hoverBorder: 'hover:border-slate-300', textColor: 'group-hover:text-slate-600' },
  'mca': { icon: '💼', bgColor: 'from-amber-50 to-amber-100', borderColor: 'border-amber-200', hoverBorder: 'hover:border-amber-300', textColor: 'group-hover:text-amber-600' },
  'btech-lateral-it': { icon: '⚡', bgColor: 'from-cyan-50 to-blue-100', borderColor: 'border-cyan-200', hoverBorder: 'hover:border-cyan-300', textColor: 'group-hover:text-cyan-600' },
};

const getGroupStyle = (groupId) => {
  return COURSE_GROUP_STYLES[groupId] || { 
    icon: '📚', 
    bgColor: 'from-gray-50 to-gray-100', 
    borderColor: 'border-gray-200', 
    hoverBorder: 'hover:border-gray-300', 
    textColor: 'group-hover:text-gray-700' 
  };
};

export default function Courses() {
  const { allPrograms, universities, loading } = useData();
  const courseGroups = getAllCourseGroups();
  const [filters, setFilters] = useState({
    degreeLevel: '',
    universityId: '',
    field: '',
    search: ''
  });

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Courses', url: '/courses' }
  ];

  // Filter courses based on active filters
  // Pass universities for comparison scoring to ensure Sharda appears favorably
  const filteredCourses = useMemo(() => {
    return filterPrograms(allPrograms, filters, universities);
  }, [allPrograms, filters, universities]);

  if (loading) {
    return (
      <div aria-live="polite" aria-busy="true">
        <span className="sr-only">Loading courses...</span>
        <SkeletonPage showFilters={true} cardCount={9} />
      </div>
    );
  }

  // Show all courses (each university-course combination is unique)
  const allCourses = allPrograms;

  return (
    <>
      <SEOHead
        title={`${allCourses.length}+ Tech Courses | B.Tech, BCA, MCA 2025`}
        description="Browse 600+ B.Tech CSE, AI/ML, Data Science courses at Sharda University & NIRF ranked universities. Fees ₹2-8L/year. 20-60% scholarships for Bangladeshi."
        keywords={[
          'galgotias university btech cse fees',
          'galgotias university btech cse total fees 4 years',
          'galgotias university b.tech cse fees',
          'galgotias university b.tech cse total fees',
          'sharda university btech cse fees',
          'sharda university btech cse total fees 4 years',
          'sharda university b.tech cse fees',
          'chandigarh university cyber security fees',
          'chandigarh university bsc forensic science fees',
          'chandigarh university bba llb fees',
          'b tech cse cloud computing lateral entry',
          'b tech ai and ml lateral entry',
          'B.Tech CSE fees India',
          'B.Tech AI ML fees',
          'B.Tech data science fees',
          'B.Tech cybersecurity fees',
          'BCA courses fees',
          'MCA courses fees',
          'tech courses India',
          'computer science courses India',
          'best engineering colleges India',
          'scholarship for tech courses India'
        ]}
        url="/courses"
        canonical="/courses"
      />
      {generateBreadcrumbSchema(breadcrumbs) && <StructuredData data={generateBreadcrumbSchema(breadcrumbs)} />}
      {(() => {
        const itemListData = generateItemListSchema(
          allCourses.slice(0, 50).map(course => {
            // Find university for this course
            const university = universities.find(u => 
              u.programs?.some(p => p.id === course.id)
            );
            const universitySlug = university ? 
              (university.slug || university.id === 'niu' ? 'noida-international-university' : 
               university.id === 'sharda' ? 'sharda-university' :
               university.id === 'chandigarh' ? 'chandigarh-university' :
               university.id === 'galgotias' ? 'galgotias-university' : 'university') : 'university';
            const courseSlug = course.slug || course.id || 'course';
            return {
              name: course.name,
              url: `/universities/${universitySlug}/courses/${courseSlug}`
            };
          }),
          `All Tech & IT Courses - ${allCourses.length}+ Programs`,
          `Browse ${allCourses.length}+ tech and IT courses across top universities`,
          '/courses'
        );
        return itemListData && <StructuredData data={itemListData} id="courses-item-list" />;
      })()}
      <Breadcrumbs items={breadcrumbs} />

      <div className={`max-w-7xl mx-auto ${spacing.container} ${spacing.sectionSmall}`}>
        <div className="mb-6 sm:mb-8">
          <h1 className={`${typography.sectionTitle} mb-3 sm:mb-4`}>All Tech & IT Courses</h1>
          <p className={typography.body}>
            Explore {allCourses.length} tech and IT courses offered by top universities. Compare computer science, data science, AI/ML, cybersecurity, and more. Find the best tech program for your career.
          </p>
        </div>

        {/* Course Filters */}
        <CourseFilters
          allPrograms={allCourses}
          universities={universities}
          filters={filters}
          onFiltersChange={setFilters}
        />

        {/* Course Groups */}
        <section className="mb-8 sm:mb-12">
          <h2 className={`${typography.cardTitle} mb-4 sm:mb-6`}>Popular Course Categories</h2>
          <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 ${spacing.gap}`}>
            {courseGroups.map(group => {
              const groupPrograms = getProgramsForGroup(allPrograms, group.id);
              const style = getGroupStyle(group.id);
              return (
                <Card
                  key={group.id}
                  to={`/courses/compare/${group.id}`}
                  variant="gradient"
                  gradientColors={style.bgColor}
                  borderColor={style.borderColor}
                  hoverBorderColor={style.hoverBorder.replace('hover:', '')}
                  hoverTextColor={style.textColor}
                >
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform" aria-hidden="true">{style.icon}</div>
                  <h3 className={`${typography.bodySmall} font-bold mb-2 text-gray-900 ${style.textColor} transition-colors`}>{group.name}</h3>
                  <p className={`${typography.caption} mb-4 line-clamp-2`}>{group.description}</p>
                  <div className="text-blue-600 font-semibold text-sm">
                    {groupPrograms.length} {groupPrograms.length === 1 ? 'program' : 'programs'} →
                  </div>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Filtered Courses List */}
        <section>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-2">
            <div>
              <h2 className={typography.cardTitle}>
                {filters.search || filters.degreeLevel || filters.universityId || filters.field
                  ? `Filtered Courses (${filteredCourses.length})`
                  : `All Available Courses (${allCourses.length})`}
              </h2>
              <p className={`${typography.caption} mt-1`}>
                {filters.search || filters.degreeLevel || filters.universityId || filters.field
                  ? `Showing ${filteredCourses.length} of ${allCourses.length} courses`
                  : `Browse all ${allCourses.length} tech and IT courses across ${universities.length} universities`}
              </p>
            </div>
          </div>

          {filteredCourses.length > 0 ? (
            <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 ${spacing.gap}`}>
              {filteredCourses
                .filter(course => {
                  const universitySlug = course.universitySlug || course.university?.slug;
                  const courseSlug = course.slug;
                  return universitySlug && courseSlug;
                })
                .map(course => {
                  const universitySlug = course.universitySlug || course.university?.slug;
                  const courseSlug = course.slug;
                  const university = universities.find(u => u.id === course.universityId);
                  const fees = university ? calculateTotalFees(course, university) : null;
                  
                  return (
                    <Card
                      key={course.id}
                      to={`/universities/${universitySlug}/courses/${courseSlug}`}
                      variant="default"
                      hoverTextColor="group-hover:text-blue-600"
                      className="group"
                    >
                      <div className="mb-3">
                        <h3 className={`${typography.bodySmall} font-bold mb-2 group-hover:text-blue-600 transition-colors line-clamp-2`}>
                          {course.name || 'Unnamed Course'}
                        </h3>
                        {course.specialization && (
                          <p className={`${typography.caption} mb-2 line-clamp-1`}>{course.specialization}</p>
                        )}
                        <p className={`${typography.caption} text-blue-600 font-semibold mb-3`}>
                          {course.university?.name || course.universityName || 'Unknown University'}
                        </p>
                      </div>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between text-sm">
                          <span className={typography.caption}>Degree:</span>
                          <span className="font-semibold">{course.degree || 'N/A'}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className={typography.caption}>Duration:</span>
                          <span className="font-semibold">{course.duration || 'N/A'} years</span>
                        </div>
                        {fees && (
                          <>
                            <div className="flex justify-between text-sm">
                              <span className={typography.caption}>Scholarship:</span>
                              <span className="font-semibold text-green-700">{fees.scholarshipPercent}%</span>
                            </div>
                            <div className="flex justify-between text-sm border-t pt-2">
                              <span className={typography.caption}>Total Cost:</span>
                              <span className="font-bold text-blue-700">₹{fees.grandTotal.toLocaleString()}</span>
                            </div>
                          </>
                        )}
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                        <span className={typography.caption}>{course.field || 'Tech'}</span>
                        <span className={`${typography.caption} text-blue-600 font-semibold group-hover:underline`}>
                          View Details →
                        </span>
                      </div>
                    </Card>
                  );
                })}
            </div>
          ) : (
            <div className="col-span-full text-center py-12 sm:py-16 bg-gray-50 rounded-lg border border-gray-200" role="status" aria-live="polite">
              <svg className="mx-auto h-12 w-12 text-gray-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className={`${typography.bodySmall} font-semibold text-gray-900 mb-2`}>No courses found</h3>
              <p className={`${typography.body} mb-4`}>
                {filters.search || filters.degreeLevel || filters.universityId || filters.field
                  ? 'Try adjusting your filters to see more results.'
                  : 'No courses available at the moment.'}
              </p>
              {(filters.search || filters.degreeLevel || filters.universityId || filters.field) && (
                <button
                  type="button"
                  onClick={() => setFilters({ degreeLevel: '', universityId: '', field: '', search: '' })}
                  className="text-blue-600 hover:text-blue-800 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded px-2 py-1"
                >
                  Clear all filters
                </button>
              )}
            </div>
          )}
          
          {filteredCourses.length > 0 && (
            <p className={`${typography.caption} mt-6 text-center`}>
              All course pages are fully indexed by search engines. Each course has detailed information about fees, scholarships, eligibility, and career prospects.
            </p>
          )}
        </section>
      </div>
    </>
  );
}

