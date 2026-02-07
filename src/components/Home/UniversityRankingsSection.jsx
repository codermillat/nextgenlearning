import { memo } from 'react';
import { Link } from 'react-router-dom';
import Card from '../Common/Card';
import { typography, spacing } from '../../utils/designTokens';

/**
 * University Rankings Section Component for Home Page
 * Displays NIRF rankings and university information
 */
const UniversityRankingsSection = memo(function UniversityRankingsSection() {
  const universities = [
    { icon: '🏆', name: 'Chandigarh University', nirf: 'NIRF Ranking: 32', naac: 'NAAC: A+', fees: 'B.Tech CSE Fees: ₹3-4L/year', scholarship: 'Scholarship: 35-50%', link: '/universities/chandigarh-university' },
    { icon: '🎓', name: 'Galgotias University', nirf: 'NIRF Ranking: 101-150', naac: 'NAAC: A+', fees: 'B.Tech CSE Fees: ₹3.5L/year', scholarship: 'Scholarship: 50-60%', link: '/universities/galgotias-university' },
    { icon: '🌟', name: 'Sharda University', nirf: 'NIRF Ranking: 101-150', naac: 'NAAC: A+', fees: 'B.Tech CSE Fees: ₹3L/year', scholarship: 'Scholarship: 20-50%', link: '/sharda-university' },
    { icon: '✨', name: 'Noida International University', nirf: 'NIRF Ranking: 201-250', naac: 'NAAC: A+', fees: 'B.Tech CSE Fees: ₹2.5L/year', scholarship: 'Scholarship: 50% Flat', link: '/universities/noida-international-university' },
  ];

  return (
    <section className={`${spacing.sectionMedium} px-4 bg-white`}>
      <div className={`max-w-6xl mx-auto ${spacing.container}`}>
        <div className="text-center mb-12 sm:mb-16">
          <h2 className={`${typography.sectionTitle} mb-4 text-gray-900`}>NIRF Ranking 2025 & Course Fees</h2>
          <p className={`${typography.body} max-w-3xl mx-auto`}>
            Compare NIRF rankings, fees, and scholarships across top Indian universities. All universities are NAAC A+ accredited with excellent placement records.
          </p>
        </div>
        
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 ${spacing.gapLarge} mb-8`}>
          {universities.map((uni) => (
            <Card key={uni.name} variant="default" className="text-center">
              <div className="text-4xl mb-4">{uni.icon}</div>
              <h3 className={`${typography.bodySmall} font-bold mb-2`}>{uni.name}</h3>
              <p className={`${typography.caption} mb-3`}>{uni.nirf}</p>
              <p className={`${typography.caption} mb-3`}>{uni.naac}</p>
              <p className={`${typography.caption} mb-3`}>{uni.fees}</p>
              <p className={`${typography.caption} text-green-600 font-semibold`}>{uni.scholarship}</p>
              <Link to={uni.link} className="text-blue-600 text-sm font-semibold mt-2 inline-block">
                View Details →
              </Link>
            </Card>
          ))}
        </div>

        {/* Info Box */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6 sm:p-8 mb-8">
          <h3 className={`${typography.cardTitle} mb-4 text-gray-900`}>Understanding NIRF Rankings & Course Fees</h3>
          <div className="space-y-4 text-gray-700">
            <div>
              <h4 className="font-semibold mb-2">What is NIRF Ranking?</h4>
              <p className={`${typography.body} mb-2`}>
                NIRF (National Institutional Ranking Framework) is the official ranking system for Indian universities by the Ministry of Education. 
                Rankings are published annually and consider factors like teaching, research, graduation outcomes, outreach, and perception.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">B.Tech CSE Total Fees 4 Years</h4>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li><strong>Galgotias University:</strong> Total fees ₹14-16 lakh for 4 years (after 50-60% scholarship)</li>
                <li><strong>Sharda University:</strong> Total fees ₹12-15 lakh for 4 years (after 20-50% scholarship)</li>
                <li><strong>Chandigarh University:</strong> Total fees ₹12-16 lakh for 4 years (after 35-50% scholarship)</li>
                <li><strong>NIU:</strong> Total fees ₹10-12 lakh for 4 years (after 50% flat scholarship)</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link to="/universities/galgotias-university" className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <h4 className="font-semibold mb-2">Galgotias University NIRF Ranking</h4>
            <p className="text-sm text-gray-600">NIRF 101-150 | NAAC A+ | B.Tech CSE Fees & Details</p>
          </Link>
          <Link to="/sharda-university" className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <h4 className="font-semibold mb-2">Sharda University NIRF Ranking</h4>
            <p className="text-sm text-gray-600">NIRF 101-150 | NAAC A+ | B.Tech CSE Fees & Details</p>
          </Link>
          <Link to="/universities" className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <h4 className="font-semibold mb-2">Compare All Universities</h4>
            <p className="text-sm text-gray-600">NIRF Rankings, Fees, Scholarships Side-by-Side</p>
          </Link>
        </div>
      </div>
    </section>
  );
});

export default UniversityRankingsSection;
