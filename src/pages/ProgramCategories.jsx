import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import SEOHead from '../components/SEO/SEOHead';
import StructuredData from '../components/SEO/StructuredData';
import Breadcrumbs from '../components/Common/Breadcrumbs';
import { generateBreadcrumbSchema } from '../components/SEO/StructuredData';
import { getAllCourseGroups } from '../data/courseGroups';
import { getProgramsForGroup } from '../utils/courseGrouping';

export default function ProgramCategories() {
  const { allPrograms, loading } = useData();
  const courseGroups = getAllCourseGroups();

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Program Categories', url: '/program-categories' }
  ];

  // Group by degree level
  const categories = {
    'Engineering': courseGroups.filter(g => g.id.startsWith('btech-') || g.id.startsWith('mtech-')),
    'Business': courseGroups.filter(g => g.id === 'bba' || g.id === 'mba'),
    'Computer Science': courseGroups.filter(g => g.id.includes('cse') || g.id === 'bca' || g.id.includes('computer')),
    'Other': courseGroups.filter(g => !g.id.startsWith('btech-') && !g.id.startsWith('mtech-') && g.id !== 'bba' && g.id !== 'mba' && !g.id.includes('cse') && g.id !== 'bca' && !g.id.includes('computer'))
  };

  if (loading) {
    return <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">Loading program categories...</div>;
  }

  return (
    <>
      <SEOHead
        title="Program Categories - Engineering, Business, Computer Science & More | Study in India BD | WBE"
        description="Browse all program categories available at top Indian universities for Bangladeshi students. Engineering (B.Tech, M.Tech), Business (BBA, MBA), Computer Science (BCA, MCA), Law, Medical, and more. Compare courses, fees, scholarships, and rankings. Free counseling by WBE."
        keywords={[
          'program categories India',
          'engineering programs India',
          'business programs India',
          'computer science programs India',
          'B.Tech programs',
          'MBA programs',
          'BBA programs',
          'BCA programs',
          'M.Tech programs',
          'study in India program categories',
          'course categories Indian universities',
          'degree programs India',
          'WBE program categories',
          'Western Bangla Education programs'
        ]}
        url="/program-categories"
        canonical="/program-categories"
      />
      {generateBreadcrumbSchema(breadcrumbs) && <StructuredData data={generateBreadcrumbSchema(breadcrumbs)} />}
      <Breadcrumbs items={breadcrumbs} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-4xl font-bold mb-4">Program Categories</h1>
        <p className="text-lg text-gray-600 mb-8">
          Explore all program categories available at top Indian universities for Bangladeshi students. 
          Compare courses, fees, rankings, and scholarships across different fields of study.
        </p>

        {Object.entries(categories).map(([categoryName, groups]) => {
          if (groups.length === 0) return null;

          return (
            <section key={categoryName} className="mb-12">
              <h2 className="text-3xl font-bold mb-6">{categoryName} Programs</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {groups.map(group => {
                  const groupPrograms = getProgramsForGroup(allPrograms, group.id);
                  return (
                    <Link
                      key={group.id}
                      to={`/courses/compare/${group.id}`}
                      className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200"
                    >
                      <h3 className="text-xl font-bold mb-2">{group.name}</h3>
                      <p className="text-gray-600 mb-4 text-sm">{group.description}</p>
                      <div className="flex justify-between items-center">
                        <div className="text-blue-600 font-semibold">
                          {groupPrograms.length} {groupPrograms.length === 1 ? 'program' : 'programs'}
                        </div>
                        <span className="text-blue-600">→</span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>
          );
        })}

        {/* CTA Section */}
        <section className="bg-blue-50 p-8 rounded-lg text-center mt-12">
          <h2 className="text-2xl font-bold mb-4">Need Help Choosing a Program?</h2>
          <p className="text-gray-600 mb-6">
            Get free counseling from Western Bangla Education to find the best program for your career goals.
          </p>
          <Link
            to="/apply"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-block"
          >
            Get Free Counseling
          </Link>
        </section>
      </div>
    </>
  );
}

