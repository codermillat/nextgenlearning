import { memo } from 'react';
import Card from '../Common/Card';
import { typography, spacing } from '../../utils/designTokens';

/**
 * Features Section Component for Home Page
 * Displays key features/benefits of the platform
 */
const FeaturesSection = memo(function FeaturesSection() {
  const features = [
    {
      icon: '💻',
      iconBg: 'from-blue-500 to-blue-600',
      title: 'Compare Tech Courses',
      description: 'Compare similar tech courses across multiple universities. See fees, rankings, and placements side-by-side.',
      hoverColor: 'group-hover:text-blue-600',
    },
    {
      icon: '💰',
      iconBg: 'from-green-500 to-green-600',
      title: 'Fee Calculator',
      description: 'Calculate total fees with scholarships. See year-wise breakdown and understand all costs upfront.',
      hoverColor: 'group-hover:text-green-600',
    },
    {
      icon: '🏆',
      iconBg: 'from-yellow-500 to-orange-500',
      title: 'University Rankings',
      description: 'View NIRF rankings, NAAC accreditation, placement records, and more to make informed decisions.',
      hoverColor: 'group-hover:text-orange-600',
    },
  ];

  return (
    <section className={`features ${spacing.sectionMedium} px-4 bg-gradient-to-b from-gray-50 to-white`}>
      <div className={`max-w-6xl mx-auto ${spacing.container}`}>
        <div className="text-center mb-12 sm:mb-16">
          <h2 className={`${typography.sectionTitle} mb-4 text-gray-900`}>Why Choose NextGen Learning?</h2>
          <p className={`${typography.body} max-w-2xl mx-auto`}>
            Everything you need to make informed decisions about your tech education journey
          </p>
        </div>
        <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 ${spacing.gapLarge}`}>
          {features.map((feature, index) => (
            <Card key={index} variant="feature" hoverTextColor={feature.hoverColor}>
              <div className={`w-16 h-16 bg-gradient-to-br ${feature.iconBg} rounded-xl flex items-center justify-center mb-6 text-3xl group-hover:scale-110 transition-transform`}>
                {feature.icon}
              </div>
              <h3 className={`${typography.cardTitle} mb-3 text-gray-900 ${feature.hoverColor} transition-colors`}>
                {feature.title}
              </h3>
              <p className={`${typography.body} leading-relaxed`}>
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
});

export default FeaturesSection;
