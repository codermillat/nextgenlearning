import { memo } from 'react';
import PropTypes from 'prop-types';
import WhatsAppCTA from './WhatsAppCTA';

/**
 * BangladeshSection Component
 * Feature: sharda-university-content-enhancement
 * 
 * Displays Bangladesh-specific content for Sharda University including:
 * - Scholarship information for Bangladeshi students
 * - Admission process steps
 * - Cultural compatibility information
 * - Visa and financial guidance
 * - WhatsApp contact for Bangladesh-specific queries
 * 
 * Validates: Requirements 2.1, 2.2, 2.3, 2.5, 2.6
 * 
 * @param {Object} props - Component props
 * @param {Object} props.bangladeshContent - Bangladesh-specific content data
 * @param {string} [props.className] - Additional CSS classes
 */
const BangladeshSection = memo(function BangladeshSection({
  bangladeshContent,
  className = '',
}) {
  if (!bangladeshContent) {
    return null;
  }

  const {
    scholarships = [],
    admissionProcess = [],
    culturalInfo = {},
    visaGuidance = {},
    financialGuidance = {},
  } = bangladeshContent;

  return (
    <section
      className={`py-16 bg-gradient-to-br from-green-50 via-white to-blue-50 ${className}`}
      data-section="bangladesh"
      aria-labelledby="bangladesh-heading"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="text-4xl" role="img" aria-label="Bangladesh flag">
              🇧🇩
            </span>
            <h2
              id="bangladesh-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900"
            >
              Study at Sharda from Bangladesh
            </h2>
          </div>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Join thousands of Bangladeshi students who have chosen Sharda University for world-class education
          </p>
        </div>

        {/* Scholarship Information */}
        {scholarships.length > 0 && (
          <div className="mb-16">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 text-center">
              🎓 Exclusive Scholarships for Bangladeshi Students
            </h3>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {scholarships.map((scholarship, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-lg p-6 border-2 border-green-100 hover:border-green-300 transition-all duration-300 hover:shadow-xl"
                  data-testid="scholarship-card"
                >
                  <div className="text-center mb-4">
                    <div className="inline-block bg-green-100 text-green-800 px-4 py-2 rounded-full font-bold text-2xl mb-2">
                      {scholarship.percentage}% OFF
                    </div>
                    <p className="text-gray-700 font-semibold">
                      For HSC GPA {scholarship.gpaMin} - {scholarship.gpaMax}
                    </p>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Eligibility:</h4>
                      <ul className="space-y-1">
                        {scholarship.eligibility.map((item, idx) => (
                          <li key={idx} className="text-gray-600 text-sm flex items-start gap-2">
                            <span className="text-green-600 mt-1">✓</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">How to Apply:</h4>
                      <ul className="space-y-1">
                        {scholarship.applicationProcess.map((step, idx) => (
                          <li key={idx} className="text-gray-600 text-sm flex items-start gap-2">
                            <span className="text-blue-600 font-bold">{idx + 1}.</span>
                            <span>{step}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Admission Process Steps */}
        {admissionProcess.length > 0 && (
          <div className="mb-16">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">
              📋 Step-by-Step Admission Process
            </h3>
            <div className="max-w-4xl mx-auto">
              <div className="space-y-6">
                {admissionProcess.map((step, index) => (
                  <div
                    key={step.stepNumber}
                    className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
                    data-testid="admission-step"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                          {step.stepNumber}
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xl font-bold text-gray-900 mb-2">
                          {step.title}
                        </h4>
                        <p className="text-gray-600 mb-3">{step.description}</p>
                        
                        {step.documents && step.documents.length > 0 && (
                          <div className="mb-3">
                            <p className="font-semibold text-gray-700 text-sm mb-1">
                              Required Documents:
                            </p>
                            <ul className="space-y-1">
                              {step.documents.map((doc, idx) => (
                                <li key={idx} className="text-gray-600 text-sm flex items-start gap-2">
                                  <span className="text-blue-600">•</span>
                                  <span>{doc}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        <div className="flex flex-wrap gap-4 text-sm">
                          {step.timeline && (
                            <div className="flex items-center gap-2 text-gray-600">
                              <span className="font-semibold">⏱️ Timeline:</span>
                              <span>{step.timeline}</span>
                            </div>
                          )}
                        </div>

                        {step.tips && step.tips.length > 0 && (
                          <div className="mt-3 bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded">
                            <p className="font-semibold text-yellow-800 text-sm mb-1">
                              💡 Pro Tips:
                            </p>
                            <ul className="space-y-1">
                              {step.tips.map((tip, idx) => (
                                <li key={idx} className="text-yellow-700 text-sm">
                                  • {tip}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Cultural Compatibility */}
        {culturalInfo && Object.keys(culturalInfo).length > 0 && (
          <div className="mb-16">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">
              🌏 Why Bangladeshi Students Love Sharda
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {culturalInfo.proximity && (
                <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
                  <div className="text-3xl mb-3">✈️</div>
                  <h4 className="font-bold text-gray-900 mb-2">Close to Home</h4>
                  <p className="text-gray-600 text-sm">{culturalInfo.proximity}</p>
                </div>
              )}

              {culturalInfo.climate && (
                <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
                  <div className="text-3xl mb-3">🌤️</div>
                  <h4 className="font-bold text-gray-900 mb-2">Familiar Climate</h4>
                  <p className="text-gray-600 text-sm">{culturalInfo.climate}</p>
                </div>
              )}

              {culturalInfo.food && culturalInfo.food.length > 0 && (
                <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
                  <div className="text-3xl mb-3">🍛</div>
                  <h4 className="font-bold text-gray-900 mb-2">Halal Food Available</h4>
                  <ul className="space-y-1">
                    {culturalInfo.food.map((item, idx) => (
                      <li key={idx} className="text-gray-600 text-sm flex items-start gap-2">
                        <span className="text-green-600">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {culturalInfo.religiousFacilities && culturalInfo.religiousFacilities.length > 0 && (
                <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
                  <div className="text-3xl mb-3">🕌</div>
                  <h4 className="font-bold text-gray-900 mb-2">Prayer Facilities</h4>
                  <ul className="space-y-1">
                    {culturalInfo.religiousFacilities.map((item, idx) => (
                      <li key={idx} className="text-gray-600 text-sm flex items-start gap-2">
                        <span className="text-green-600">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {culturalInfo.language && (
                <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
                  <div className="text-3xl mb-3">💬</div>
                  <h4 className="font-bold text-gray-900 mb-2">Language</h4>
                  <p className="text-gray-600 text-sm">{culturalInfo.language}</p>
                </div>
              )}

              {culturalInfo.community && (
                <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
                  <div className="text-3xl mb-3">👥</div>
                  <h4 className="font-bold text-gray-900 mb-2">Bangladeshi Community</h4>
                  <p className="text-gray-600 text-sm">{culturalInfo.community}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Visa Guidance */}
        {visaGuidance && Object.keys(visaGuidance).length > 0 && (
          <div className="mb-16">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">
              🛂 Visa Guidance for Bangladeshi Students
            </h3>
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <span className="text-blue-600">📄</span>
                    Visa Type & Duration
                  </h4>
                  {visaGuidance.type && (
                    <p className="text-gray-600 mb-2">
                      <span className="font-semibold">Type:</span> {visaGuidance.type}
                    </p>
                  )}
                  {visaGuidance.duration && (
                    <p className="text-gray-600 mb-2">
                      <span className="font-semibold">Duration:</span> {visaGuidance.duration}
                    </p>
                  )}
                  {visaGuidance.timeline && (
                    <p className="text-gray-600">
                      <span className="font-semibold">Processing Time:</span> {visaGuidance.timeline}
                    </p>
                  )}
                </div>

                {visaGuidance.requirements && visaGuidance.requirements.length > 0 && (
                  <div>
                    <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <span className="text-blue-600">📋</span>
                      Requirements
                    </h4>
                    <ul className="space-y-2">
                      {visaGuidance.requirements.map((req, idx) => (
                        <li key={idx} className="text-gray-600 text-sm flex items-start gap-2">
                          <span className="text-green-600 mt-1">✓</span>
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {visaGuidance.process && visaGuidance.process.length > 0 && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <span className="text-blue-600">🔄</span>
                    Application Process
                  </h4>
                  <ol className="space-y-2">
                    {visaGuidance.process.map((step, idx) => (
                      <li key={idx} className="text-gray-600 text-sm flex items-start gap-2">
                        <span className="text-blue-600 font-bold">{idx + 1}.</span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Financial Guidance */}
        {financialGuidance && Object.keys(financialGuidance).length > 0 && (
          <div className="mb-16">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">
              💰 Financial Guidance
            </h3>
            <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
              {financialGuidance.currencyTransfer && financialGuidance.currencyTransfer.length > 0 && (
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <span className="text-green-600">💵</span>
                    Currency Transfer
                  </h4>
                  <ul className="space-y-2">
                    {financialGuidance.currencyTransfer.map((item, idx) => (
                      <li key={idx} className="text-gray-600 text-sm flex items-start gap-2">
                        <span className="text-green-600">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {financialGuidance.bankAccounts && financialGuidance.bankAccounts.length > 0 && (
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <span className="text-blue-600">🏦</span>
                    Bank Accounts
                  </h4>
                  <ul className="space-y-2">
                    {financialGuidance.bankAccounts.map((item, idx) => (
                      <li key={idx} className="text-gray-600 text-sm flex items-start gap-2">
                        <span className="text-blue-600">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {financialGuidance.scholarships && financialGuidance.scholarships.length > 0 && (
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <span className="text-yellow-600">🎓</span>
                    Scholarship Opportunities
                  </h4>
                  <ul className="space-y-2">
                    {financialGuidance.scholarships.map((item, idx) => (
                      <li key={idx} className="text-gray-600 text-sm flex items-start gap-2">
                        <span className="text-yellow-600">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {financialGuidance.costOfLiving && (
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <span className="text-purple-600">🏠</span>
                    Cost of Living
                  </h4>
                  <p className="text-gray-600 text-sm">{financialGuidance.costOfLiving}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* WhatsApp CTA for Bangladesh-specific queries */}
        <div className="text-center bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl shadow-xl p-8 sm:p-12">
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Have Questions About Studying from Bangladesh?
          </h3>
          <p className="text-white/90 text-lg mb-6 max-w-2xl mx-auto">
            Connect with our admissions team on WhatsApp for personalized guidance on scholarships, visa process, and more!
          </p>
          <WhatsAppCTA
            context="bangladesh"
            variant="button"
            className="bg-white text-green-600 hover:bg-gray-100 shadow-lg hover:shadow-xl"
            contentType="bangladesh-section"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            <span>Chat with Bangladesh Admissions Team</span>
          </WhatsAppCTA>
          <p className="text-white/80 text-sm mt-4">
            📞 Direct Line: +91 88009 96151
          </p>
        </div>
      </div>
    </section>
  );
});

BangladeshSection.propTypes = {
  bangladeshContent: PropTypes.shape({
    scholarships: PropTypes.arrayOf(
      PropTypes.shape({
        gpaMin: PropTypes.number,
        gpaMax: PropTypes.number,
        percentage: PropTypes.number,
        eligibility: PropTypes.arrayOf(PropTypes.string),
        applicationProcess: PropTypes.arrayOf(PropTypes.string),
      })
    ),
    admissionProcess: PropTypes.arrayOf(
      PropTypes.shape({
        stepNumber: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        documents: PropTypes.arrayOf(PropTypes.string),
        timeline: PropTypes.string,
        tips: PropTypes.arrayOf(PropTypes.string),
      })
    ),
    culturalInfo: PropTypes.shape({
      proximity: PropTypes.string,
      climate: PropTypes.string,
      food: PropTypes.arrayOf(PropTypes.string),
      religiousFacilities: PropTypes.arrayOf(PropTypes.string),
      language: PropTypes.string,
      community: PropTypes.string,
    }),
    visaGuidance: PropTypes.shape({
      type: PropTypes.string,
      duration: PropTypes.string,
      requirements: PropTypes.arrayOf(PropTypes.string),
      process: PropTypes.arrayOf(PropTypes.string),
      timeline: PropTypes.string,
    }),
    financialGuidance: PropTypes.shape({
      currencyTransfer: PropTypes.arrayOf(PropTypes.string),
      bankAccounts: PropTypes.arrayOf(PropTypes.string),
      scholarships: PropTypes.arrayOf(PropTypes.string),
      costOfLiving: PropTypes.string,
    }),
  }).isRequired,
  className: PropTypes.string,
};

export default BangladeshSection;
