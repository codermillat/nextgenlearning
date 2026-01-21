import { memo } from 'react';
import Card from '../Common/Card';
import { typography, spacing } from '../../utils/designTokens';

/**
 * Tech Categories Section Component for Home Page
 * Displays grid of tech course categories
 */
const TechCategoriesSection = memo(function TechCategoriesSection() {
  const categories = [
    { to: '/courses/compare/btech-cse', icon: '💻', title: 'Computer Science', subtitle: 'B.Tech CSE programs', gradient: 'from-blue-50 to-blue-100', border: 'border-blue-200', hoverBorder: 'hover:border-blue-300', hoverText: 'group-hover:text-blue-600' },
    { to: '/courses/compare/btech-ai-ml', icon: '🤖', title: 'AI & Machine Learning', subtitle: 'AI/ML programs', gradient: 'from-purple-50 to-purple-100', border: 'border-purple-200', hoverBorder: 'hover:border-purple-300', hoverText: 'group-hover:text-purple-600' },
    { to: '/courses/compare/btech-data-science', icon: '📊', title: 'Data Science', subtitle: 'Data analytics programs', gradient: 'from-green-50 to-green-100', border: 'border-green-200', hoverBorder: 'hover:border-green-300', hoverText: 'group-hover:text-green-600' },
    { to: '/courses/compare/btech-cyber-security', icon: '🔒', title: 'Cybersecurity', subtitle: 'Security programs', gradient: 'from-red-50 to-red-100', border: 'border-red-200', hoverBorder: 'hover:border-red-300', hoverText: 'group-hover:text-red-600' },
    { to: '/courses/compare/btech-cloud-computing', icon: '☁️', title: 'Cloud Computing', subtitle: 'Cloud technology programs', gradient: 'from-indigo-50 to-indigo-100', border: 'border-indigo-200', hoverBorder: 'hover:border-indigo-300', hoverText: 'group-hover:text-indigo-600' },
    { to: '/courses/compare/btech-full-stack', icon: '🌐', title: 'Full Stack Dev', subtitle: 'Web development programs', gradient: 'from-yellow-50 to-yellow-100', border: 'border-yellow-200', hoverBorder: 'hover:border-yellow-300', hoverText: 'group-hover:text-yellow-600' },
    { to: '/courses/compare/btech-blockchain', icon: '⛓️', title: 'Blockchain', subtitle: 'Blockchain technology', gradient: 'from-gray-50 to-gray-100', border: 'border-gray-200', hoverBorder: 'hover:border-gray-300', hoverText: 'group-hover:text-gray-700' },
    { to: '/courses/compare/bca', icon: '📱', title: 'BCA', subtitle: 'Computer applications', gradient: 'from-teal-50 to-teal-100', border: 'border-teal-200', hoverBorder: 'hover:border-teal-300', hoverText: 'group-hover:text-teal-600' },
  ];

  return (
    <section className={`${spacing.sectionMedium} px-4 bg-white`}>
      <div className={`max-w-6xl mx-auto ${spacing.container}`}>
        <div className="text-center mb-12 sm:mb-16">
          <h2 className={`${typography.sectionTitle} mb-4 text-gray-900`}>Explore Tech Course Categories</h2>
          <p className={`${typography.body} max-w-2xl mx-auto`}>
            Discover specialized tech programs across top universities
          </p>
        </div>
        <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 ${spacing.gap}`}>
          {categories.map((cat) => (
            <Card
              key={cat.to}
              to={cat.to}
              variant="gradient"
              gradientColors={cat.gradient}
              borderColor={cat.border}
              hoverBorderColor={cat.hoverBorder}
              hoverTextColor={cat.hoverText}
              className="text-center"
            >
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform" aria-hidden="true">
                {cat.icon}
              </div>
              <h3 className={`font-bold ${typography.bodySmall} mb-2 text-gray-900 ${cat.hoverText} transition-colors`}>
                {cat.title}
              </h3>
              <p className={typography.caption}>{cat.subtitle}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
});

export default TechCategoriesSection;
