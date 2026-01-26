import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import SEOHead from '../components/SEO/SEOHead';
import StructuredData from '../components/SEO/StructuredData';
import Breadcrumbs from '../components/Common/Breadcrumbs';
import Card from '../components/Common/Card';
import { generateBreadcrumbSchema } from '../components/SEO/StructuredData';
import { getAllCourseGroups } from '../data/courseGroups';
import { getProgramsForGroup } from '../utils/courseGrouping';
import { typography, spacing } from '../utils/designTokens';

// Icon and color mapping for course categories (same as Courses.jsx)
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
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" aria-live="polite" aria-busy="true">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4" role="status" aria-label="Loading">
              <span className="sr-only">Loading program categories...</span>
            </div>
            <p className="text-gray-700" aria-live="polite">Loading program categories...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEOHead
        title="Program Categories - Engineering, Business, Computer Science & More | Study in India BD"
        description="Browse all program categories available at top Indian universities for Bangladeshi students. Engineering (B.Tech, M.Tech), Business (BBA, MBA), Computer Science (BCA, MCA), Law, Medical, and more. Compare courses, fees, scholarships, and rankings. Free counseling available."
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
          'degree programs India'
        ]}
        url="/program-categories"
        canonical="/program-categories"
      />
      {generateBreadcrumbSchema(breadcrumbs) && <StructuredData data={generateBreadcrumbSchema(breadcrumbs)} />}
      <Breadcrumbs items={breadcrumbs} />

      <div className={`max-w-7xl mx-auto ${spacing.container} ${spacing.sectionSmall}`}>
        <h1 className={`${typography.sectionTitle} mb-4`}>Program Categories</h1>
        <p className={`${typography.body} mb-8`}>
          Explore all program categories available at top Indian universities for Bangladeshi students. 
          Compare courses, fees, rankings, and scholarships across different fields of study.
        </p>

        {Object.entries(categories).map(([categoryName, groups]) => {
          // Filter out groups with 0 programs and ensure groups have names
          const groupsWithPrograms = groups
            .map(group => {
              const groupPrograms = getProgramsForGroup(allPrograms, group.id);
              return { ...group, programCount: groupPrograms.length };
            })
            .filter(group => group.programCount > 0 && group.name); // Only show groups with programs and valid names

          if (groupsWithPrograms.length === 0) return null;

          return (
            <section key={categoryName} className="mb-12">
              <h2 className={`${typography.sectionTitle} mb-6`}>{categoryName} Programs</h2>
              <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ${spacing.gap}`}>
                {groupsWithPrograms.map(group => {
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
                      <h3 className={`${typography.bodySmall} font-bold mb-2 text-gray-900 ${style.textColor} transition-colors`}>
                        {group.name || 'Unnamed Program'}
                      </h3>
                      <p className={`${typography.caption} mb-4 line-clamp-2`}>{group.description || 'No description available'}</p>
                      <div className="text-blue-600 font-semibold text-sm">
                        {group.programCount} {group.programCount === 1 ? 'program' : 'programs'} →
                      </div>
                    </Card>
                  );
                })}
              </div>
            </section>
          );
        })}

        {/* CTA Section */}
        <section className={`bg-blue-50 ${spacing.card} rounded-lg text-center mt-12`}>
          <h2 className={`${typography.cardTitle} mb-4`}>Need Help Choosing a Program?</h2>
          <p className={`${typography.body} mb-6`}>
            Get free counseling to find the best program for your career goals and admission guidance.
          </p>
          <Link
            to="/apply"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-block focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600 min-h-[44px] flex items-center justify-center"
          >
            Get Free Counseling
          </Link>
        </section>
      </div>
    </>
  );
}

