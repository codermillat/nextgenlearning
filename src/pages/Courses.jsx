import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import SEOHead from '../components/SEO/SEOHead';
import StructuredData from '../components/SEO/StructuredData';
import Breadcrumbs from '../components/Common/Breadcrumbs';
import { generateBreadcrumbSchema, generateItemListSchema } from '../components/SEO/StructuredData';
import { getAllCourseGroups } from '../data/courseGroups';
import { getProgramsForGroup } from '../utils/courseGrouping';

export default function Courses() {
  const { allPrograms, universities, loading } = useData();
  const courseGroups = getAllCourseGroups();

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Courses', url: '/courses' }
  ];

  if (loading) {
    return <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">Loading courses...</div>;
  }

  // Show all courses (each university-course combination is unique)
  const allCourses = allPrograms;

  return (
    <>
      <SEOHead
        title={`All Tech & IT Courses - ${allCourses.length}+ Programs | NextGen Learning`}
        description={`Browse all ${allCourses.length} tech and IT courses available at top universities. Compare computer science, data science, AI/ML, cybersecurity, cloud computing, and more tech programs with detailed fees, scholarships, rankings, and eligibility.`}
        keywords={[
          'tech courses',
          'IT courses',
          'computer science courses',
          'data science courses',
          'AI ML courses',
          'cybersecurity courses',
          'cloud computing courses',
          'B.Tech CSE',
          'B.Tech IT',
          'BCA courses',
          'MCA courses',
          'M.Tech courses',
          'tech programs',
          'IT programs',
          'computer science programs',
          'programming courses',
          'software engineering courses',
          'full stack development courses',
          'blockchain courses',
          'IoT courses'
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8">All Tech & IT Courses</h1>
        
        <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8">
          Explore tech and IT courses offered by top universities. Compare computer science, data science, AI/ML, cybersecurity, and more. Find the best tech program for your career.
        </p>

        {/* Course Groups */}
        <section className="mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Popular Course Categories</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {courseGroups.map(group => {
              const groupPrograms = getProgramsForGroup(allPrograms, group.id);
              return (
                <Link
                  key={group.id}
                  to={`/courses/compare/${group.id}`}
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200"
                >
                  <h3 className="text-xl font-bold mb-2">{group.name}</h3>
                  <p className="text-gray-600 mb-4 text-sm">{group.description}</p>
                  <div className="text-blue-600 font-semibold">
                    {groupPrograms.length} {groupPrograms.length === 1 ? 'program' : 'programs'} →
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* All Courses List */}
        <section>
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">All Available Courses</h2>
          <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
            Browse all {allCourses.length} tech and IT courses available across {universities.length} universities. 
            Each course has a dedicated page with detailed information, fees, scholarships, and eligibility criteria.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {allCourses.length > 0 ? (
              allCourses
                .filter(course => {
                  const universitySlug = course.universitySlug || course.university?.slug;
                  const courseSlug = course.slug;
                  return universitySlug && courseSlug;
                })
                .map(course => {
                  const universitySlug = course.universitySlug || course.university?.slug;
                  const courseSlug = course.slug;
                  return (
                    <Link
                      key={course.id}
                      to={`/universities/${universitySlug}/courses/${courseSlug}`}
                      className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow border border-gray-200"
                    >
                      <h3 className="font-semibold mb-1">{course.name || 'Unnamed Course'}</h3>
                      <p className="text-sm text-gray-600 mb-2">{course.university?.name || course.universityName || 'Unknown University'}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-500">{course.degree || 'N/A'} • {course.duration || 'N/A'} years</span>
                        <span className="text-sm text-blue-600 font-semibold">View Details →</span>
                      </div>
                    </Link>
                  );
                })
            ) : (
              <div className="col-span-full text-center py-8">
                <p className="text-gray-600">No courses available at the moment.</p>
                {loading && <p className="text-sm text-gray-500 mt-2">Loading courses...</p>}
              </div>
            )}
          </div>
          <p className="text-sm text-gray-600 mt-6 text-center">
            All course pages are fully indexed by search engines. Use the search bar or filters to find specific courses.
          </p>
        </section>
      </div>
    </>
  );
}

