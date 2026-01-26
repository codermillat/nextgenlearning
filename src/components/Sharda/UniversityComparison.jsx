import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ApplicationCTA from './ApplicationCTA';
import WhatsAppCTA from './WhatsAppCTA';

/**
 * UniversityComparison Component
 * 
 * Displays side-by-side comparison of universities with Sharda University
 * Highlights Sharda's strengths while maintaining factual accuracy
 * Responsive design with mobile card layout
 * 
 * Requirements: 10.1, 10.2, 10.3, 10.4, 10.5
 */
const UniversityComparison = ({ universities, highlightUniversity = 'sharda', title, description }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!universities || universities.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">No universities available for comparison.</p>
      </div>
    );
  }

  // Comparison metrics to display
  const metrics = [
    {
      key: 'nirf',
      label: 'NIRF Ranking 2025',
      getValue: (uni) => uni.profile?.rankings?.nirf2025 || uni.profile?.rankings?.nirf || 'Not Ranked',
      type: 'text'
    },
    {
      key: 'naac',
      label: 'NAAC Accreditation',
      getValue: (uni) => {
        const naac = uni.profile?.rankings?.naac;
        const score = uni.profile?.rankings?.naacScore;
        return score ? `${naac} (${score})` : naac || 'Not Accredited';
      },
      type: 'badge'
    },
    {
      key: 'established',
      label: 'Established',
      getValue: (uni) => uni.established || 'N/A',
      type: 'text'
    },
    {
      key: 'location',
      label: 'Location',
      getValue: (uni) => uni.location || 'N/A',
      type: 'text'
    },
    {
      key: 'campus',
      label: 'Campus Size',
      getValue: (uni) => uni.profile?.facilities?.campus?.size || 'N/A',
      type: 'text'
    },
    {
      key: 'international',
      label: 'International Students',
      getValue: (uni) => {
        const students = uni.profile?.facilities?.international?.students;
        const countries = uni.profile?.facilities?.international?.countriesRepresented;
        if (students && countries) {
          return `${students} from ${countries} countries`;
        }
        return students || 'N/A';
      },
      type: 'text'
    },
    {
      key: 'hospital',
      label: 'On-Campus Hospital',
      getValue: (uni) => {
        const hospital = uni.profile?.facilities?.healthcare?.hospital;
        return hospital || 'No';
      },
      type: 'text',
      highlight: (value) => value !== 'No'
    },
    {
      key: 'placement',
      label: 'Placement Rate',
      getValue: (uni) => {
        const rate = uni.profile?.facilities?.placement?.rate;
        return rate ? `${rate}` : 'N/A';
      },
      type: 'text'
    },
    {
      key: 'recruiters',
      label: 'Recruiting Companies',
      getValue: (uni) => uni.profile?.facilities?.placement?.recruiters || 'N/A',
      type: 'text'
    },
    {
      key: 'highestPackage',
      label: 'Highest Package',
      getValue: (uni) => {
        const packages = uni.profile?.facilities?.placement?.packages;
        if (packages?.highestInternational) {
          return packages.highestInternational;
        }
        if (packages?.highestDomestic) {
          return packages.highestDomestic;
        }
        return 'N/A';
      },
      type: 'text'
    },
    {
      key: 'industryPartnerships',
      label: 'Industry Partnerships',
      getValue: (uni) => {
        const partnerships = uni.profile?.facilities?.academic?.industryPartnerships;
        if (Array.isArray(partnerships) && partnerships.length > 0) {
          return partnerships.slice(0, 5).join(', ') + (partnerships.length > 5 ? '...' : '');
        }
        return 'N/A';
      },
      type: 'text'
    }
  ];

  // Desktop table view
  const renderDesktopTable = () => (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-50">
            <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">
              Criteria
            </th>
            {universities.map((uni) => (
              <th
                key={uni.id}
                className={`border border-gray-300 px-4 py-3 text-center font-semibold ${
                  uni.id === highlightUniversity
                    ? 'bg-blue-50 text-blue-900'
                    : 'text-gray-700'
                }`}
              >
                <div className="flex flex-col items-center gap-2">
                  <span>{uni.name}</span>
                  {uni.id === highlightUniversity && (
                    <span className="inline-block px-3 py-1 text-xs font-semibold text-white bg-blue-600 rounded-full">
                      Recommended
                    </span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {metrics.map((metric, index) => (
            <tr key={metric.key} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
              <td className="border border-gray-300 px-4 py-3 font-medium text-gray-700">
                {metric.label}
              </td>
              {universities.map((uni) => {
                const value = metric.getValue(uni);
                const shouldHighlight = metric.highlight ? metric.highlight(value) : false;
                const isHighlightedUni = uni.id === highlightUniversity;

                return (
                  <td
                    key={uni.id}
                    className={`border border-gray-300 px-4 py-3 text-center ${
                      isHighlightedUni ? 'bg-blue-50' : ''
                    } ${shouldHighlight && isHighlightedUni ? 'font-semibold text-blue-700' : 'text-gray-600'}`}
                  >
                    {metric.type === 'badge' && value !== 'Not Accredited' ? (
                      <span className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${
                        isHighlightedUni ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {value}
                      </span>
                    ) : (
                      value
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  // Mobile card view
  const renderMobileCards = () => (
    <div className="space-y-6">
      {universities.map((uni) => {
        const isHighlighted = uni.id === highlightUniversity;
        
        return (
          <div
            key={uni.id}
            className={`border rounded-lg overflow-hidden ${
              isHighlighted ? 'border-blue-500 shadow-lg' : 'border-gray-300'
            }`}
          >
            <div className={`px-4 py-3 ${isHighlighted ? 'bg-blue-600' : 'bg-gray-100'}`}>
              <h3 className={`text-lg font-bold ${isHighlighted ? 'text-white' : 'text-gray-900'}`}>
                {uni.name}
              </h3>
              {isHighlighted && (
                <span className="inline-block mt-2 px-3 py-1 text-xs font-semibold text-blue-600 bg-white rounded-full">
                  Recommended
                </span>
              )}
            </div>
            <div className="divide-y divide-gray-200">
              {metrics.map((metric) => {
                const value = metric.getValue(uni);
                const shouldHighlight = metric.highlight ? metric.highlight(value) : false;

                return (
                  <div key={metric.key} className="px-4 py-3 flex justify-between items-start">
                    <span className="font-medium text-gray-700 text-sm">{metric.label}</span>
                    <span className={`text-sm text-right ml-4 ${
                      shouldHighlight && isHighlighted ? 'font-semibold text-blue-700' : 'text-gray-600'
                    }`}>
                      {metric.type === 'badge' && value !== 'Not Accredited' ? (
                        <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
                          isHighlighted ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {value}
                        </span>
                      ) : (
                        value
                      )}
                    </span>
                  </div>
                );
              })}
            </div>
            {isHighlighted && (
              <div className="px-4 py-4 bg-blue-50 border-t border-blue-200">
                <ApplicationCTA
                  variant="primary"
                  source="comparison-page"
                  context={`comparison-${uni.id}`}
                  className="w-full mb-3"
                />
                <WhatsAppCTA
                  context={`Interested in ${uni.name} - Comparison Page`}
                  variant="button"
                  className="w-full"
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      {title && (
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {title}
          </h1>
          {description && (
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {description}
            </p>
          )}
        </div>
      )}

      {/* Comparison Table/Cards */}
      <div className="mb-8">
        {isMobile ? renderMobileCards() : renderDesktopTable()}
      </div>

      {/* CTA Section for highlighted university */}
      {!isMobile && (
        <div className="mt-12 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Apply to {universities.find(u => u.id === highlightUniversity)?.name}?
          </h2>
          <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
            Join thousands of international students who have chosen excellence. Start your application today!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <ApplicationCTA
              variant="primary"
              source="comparison-page-footer"
              context={`comparison-${highlightUniversity}-footer`}
            />
            <WhatsAppCTA
              context="Comparison Page - Ready to Apply"
              variant="button"
            />
          </div>
        </div>
      )}

      {/* Additional Information */}
      <div className="mt-12 bg-gray-50 rounded-lg p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Need Help Choosing?</h3>
        <p className="text-gray-700 mb-4">
          Our admissions counselors are here to help you make the right decision. Contact us via WhatsApp or explore individual university pages for more detailed information.
        </p>
        <div className="flex flex-wrap gap-4">
          {universities.map((uni) => (
            <Link
              key={uni.id}
              to={`/universities/${uni.id}`}
              className="inline-block px-4 py-2 text-sm font-medium text-blue-600 bg-white border border-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-colors"
            >
              Learn More About {uni.shortName || uni.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UniversityComparison;
