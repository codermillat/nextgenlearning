import { useParams, Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import SEOHead from '../components/SEO/SEOHead';
import StructuredData from '../components/SEO/StructuredData';
import Breadcrumbs from '../components/Common/Breadcrumbs';
import FAQSection from '../components/SEO/FAQSection';
import DetailedFeeBreakdown from '../components/Course/DetailedFeeBreakdown';
import { getCourseGroupInfo, getProgramsForGroup } from '../utils/courseGrouping';
import { rankProgramsByValue, calculateTotalFees } from '../utils/rankings';
import { generateBreadcrumbSchema } from '../components/SEO/StructuredData';
import { redirectToWhatsApp, generateApplicationMessage } from '../utils/whatsappRedirect';
import { getTopUniversities } from '../utils/linkingStrategy';

export default function CourseGroupCompare() {
  const { groupId } = useParams();
  const { allPrograms, universities, loading } = useData();
  
  const groupInfo = getCourseGroupInfo(groupId);
  const groupPrograms = getProgramsForGroup(allPrograms, groupId);
  const rankedPrograms = rankProgramsByValue(groupPrograms, universities);

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Courses', url: '/courses' },
    { name: groupInfo?.name || 'Compare', url: `/courses/compare/${groupId}` }
  ];

  // Generate structured data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": `${groupInfo?.name} - University Comparison`,
    "description": groupInfo?.description,
    "itemListElement": rankedPrograms.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Course",
        "name": item.program.name,
        "provider": {
          "@type": "Organization",
          "name": item.university.name
        }
      }
    }))
  };

  const faqs = [
    {
      question: `Which university offers the best ${groupInfo?.name} program?`,
      answer: `The best ${groupInfo?.name} program depends on your priorities. Consider factors like total fees (including scholarships), university ranking (NIRF), placement records, and campus facilities. Use our comparison table above to see all options side-by-side.`
    },
    {
      question: `What is the total cost for ${groupInfo?.name} including all fees?`,
      answer: `Total costs vary by university and include tuition fees, admission fees, examination fees, and other charges. Bangladeshi students are eligible for scholarships (up to 50% at NIU, and GPA-based scholarships at Sharda). Check the detailed fee breakdown in the comparison table above.`
    },
    {
      question: `How do I apply for ${groupInfo?.name} programs?`,
      answer: `You can apply for free counseling and application assistance. Click the "Apply Now" button on any program to get started. We provide visa assistance, document verification, and admission support at no extra cost.`
    },
    {
      question: `What scholarships are available for Bangladeshi students?`,
      answer: `NIU offers a flat 50% scholarship to all Bangladeshi students. Sharda University offers GPA-based scholarships (up to 50% for GPA 3.5+). Other universities may have different scholarship schemes. Check each university's details in the comparison table.`
    }
  ];

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" aria-live="polite" aria-busy="true">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4" role="status" aria-label="Loading">
              <span className="sr-only">Loading comparison...</span>
            </div>
            <p className="text-gray-700" aria-live="polite">Loading comparison...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!groupInfo || groupPrograms.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold mb-4">Course Group Not Found</h1>
        <Link to="/courses" className="text-blue-600">← Back to Courses</Link>
      </div>
    );
  }

  return (
    <>
      <SEOHead
        title={`${groupInfo.name} 2025-26 - Compare Top Universities, Fees, Rankings & Scholarships`}
        description={`Compare ${groupInfo.name} at Sharda University & top universities. Fees, scholarships (20-60%), NIRF rankings for Bangladeshi students. ${rankedPrograms.length} programs available.`}
        keywords={[
          ...groupInfo.keywords,
          `${groupInfo.name} comparison`,
          `${groupInfo.name} fees`,
          `${groupInfo.name} scholarships`,
          `${groupInfo.name} ranking`,
          `${groupInfo.name} for Bangladeshi students`,
          'compare universities India',
          'course comparison India',
          'best university for ' + groupInfo.name.toLowerCase(),
          'affordable ' + groupInfo.name.toLowerCase(),
          'course comparison',
          'university comparison India'
        ]}
        url={`/courses/compare/${groupId}`}
        canonical={`/courses/compare/${groupId}`}
      />
      <StructuredData data={structuredData} />
      {generateBreadcrumbSchema(breadcrumbs) && <StructuredData data={generateBreadcrumbSchema(breadcrumbs)} />}
      {/* FAQ schema is generated by FAQSection component below */}
      <Breadcrumbs items={breadcrumbs} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 overflow-x-hidden">
        {/* Page Intro */}
        <section className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{groupInfo.name} - University Comparison</h1>
          <p className="text-lg text-gray-600 mb-6">
            {groupInfo.description} Compare fees, rankings, placements, and scholarships across all universities offering this program.
          </p>
        </section>

        {/* Comparison Table */}
        <section className="mb-12 overflow-x-hidden">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Compare All Universities</h2>
          
          {/* Mobile Card View */}
          <div className="block md:hidden space-y-4 mb-6">
            {rankedPrograms.map((item, index) => {
              const fees = calculateTotalFees(item.program, item.university);
              const nirfRank = item.university.profile?.rankings?.nirf || 'N/A';
              const avgAnnualFee = item.program.annualFees?.[0] || 0;
              
              return (
                <div key={index} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                  <div className="mb-3">
                    <div className="font-bold text-lg text-blue-600">{item.university.shortName}</div>
                    <div className="text-sm text-gray-600">{item.university.name}</div>
                  </div>
                  
                  <div className="mb-3">
                    {(() => {
                      let programDisplayName = item.program.name;
                      if (item.program.specialization && !programDisplayName.includes(item.program.specialization)) {
                        programDisplayName += ` - ${item.program.specialization}`;
                      }
                      return (
                        <div className="font-semibold text-base">{programDisplayName}</div>
                      );
                    })()}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 mb-3 text-sm">
                    <div>
                      <span className="text-gray-600">Duration:</span>
                      <span className="font-semibold ml-1">{item.program.duration} years</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Annual Fee:</span>
                      <span className="font-semibold ml-1">₹{avgAnnualFee.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Scholarship:</span>
                      <span className="font-semibold text-green-600 ml-1">{fees.scholarshipPercent}%</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Ranking:</span>
                      <span className="font-semibold ml-1">NIRF {nirfRank}</span>
                    </div>
                  </div>
                  
                  <div className="border-t pt-3 mb-3">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600">Total Cost:</span>
                      <span className="font-bold text-lg">₹{fees.grandTotal.toLocaleString()}</span>
                    </div>
                    <div className="text-xs text-gray-500">With {fees.scholarshipPercent}% scholarship</div>
                  </div>
                  
                  <button
                    onClick={() => {
                      let programDisplayName = item.program.name;
                      if (item.program.specialization && !programDisplayName.includes(item.program.specialization)) {
                        programDisplayName += ` - ${item.program.specialization}`;
                      }
                      const message = generateApplicationMessage({
                        courseInterest: item.program.name,
                        universityPreference: item.university.name,
                        programDetails: programDisplayName
                      });
                      redirectToWhatsApp(message, 'course_group_compare_mobile', item.program.name || '', item.university.name || '');
                    }}
                    className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold min-h-[44px]"
                  >
                    Apply Now
                  </button>
                </div>
              );
            })}
          </div>
          
          {/* Desktop Table View */}
          <div className="hidden lg:block w-full overflow-x-hidden">
            <div className="w-full overflow-hidden">
              <table className="w-full bg-white border border-gray-200 divide-y divide-gray-200" style={{ tableLayout: 'fixed' }}>
              <colgroup>
                <col style={{ width: '12%' }} />
                <col style={{ width: '25%' }} />
                <col style={{ width: '7%' }} />
                <col style={{ width: '10%' }} />
                <col style={{ width: '9%' }} />
                <col style={{ width: '12%' }} />
                <col style={{ width: '10%' }} />
                <col style={{ width: '15%' }} />
              </colgroup>
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">University</th>
                  <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Program</th>
                  <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                  <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Annual Fee</th>
                  <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Scholarship</th>
                  <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Cost</th>
                  <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ranking</th>
                  <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {rankedPrograms.map((item, index) => {
                  const fees = calculateTotalFees(item.program, item.university);
                  const nirfRank = item.university.profile?.rankings?.nirf || 'N/A';
                  const avgAnnualFee = item.program.annualFees?.[0] || 0;
                  
                  // Build program display name without duplication
                  let programDisplayName = item.program.name;
                  if (item.program.specialization && !programDisplayName.includes(item.program.specialization)) {
                    programDisplayName += ` - ${item.program.specialization}`;
                  }
                  
                  return (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-2 py-3 overflow-hidden">
                        <div className="font-semibold text-xs truncate">{item.university.shortName}</div>
                        <div className="text-[10px] text-gray-500 mt-0.5 leading-tight truncate">{item.university.name}</div>
                      </td>
                      <td className="px-2 py-3 overflow-hidden">
                        <div className="font-medium text-xs leading-tight break-words line-clamp-2">{programDisplayName}</div>
                      </td>
                      <td className="px-2 py-3 text-xs whitespace-nowrap">{item.program.duration} yrs</td>
                      <td className="px-2 py-3 text-xs whitespace-nowrap">₹{(avgAnnualFee / 1000).toFixed(0)}K</td>
                      <td className="px-2 py-3 whitespace-nowrap">
                        <span className="text-green-600 font-semibold text-xs">{fees.scholarshipPercent}%</span>
                      </td>
                      <td className="px-2 py-3 overflow-hidden">
                        <div className="font-semibold text-xs">₹{(fees.grandTotal / 1000).toFixed(0)}K</div>
                        <div className="text-[10px] text-gray-500 mt-0.5 leading-tight truncate">{fees.scholarshipPercent}% off</div>
                      </td>
                      <td className="px-2 py-3 overflow-hidden">
                        <div className="font-medium text-xs truncate">NIRF {nirfRank}</div>
                        {item.university.profile?.rankings?.naac && (
                          <div className="text-[10px] text-gray-500 mt-0.5 leading-tight truncate">NAAC {item.university.profile.rankings.naac}</div>
                        )}
                      </td>
                      <td className="px-2 py-3 overflow-hidden">
                        <button
                          onClick={() => {
                            const message = generateApplicationMessage({
                              courseInterest: item.program.name,
                              universityPreference: item.university.name,
                              programDetails: programDisplayName
                            });
                            redirectToWhatsApp(message, 'course_group_compare_desktop', item.program.name || '', item.university.name || '');
                          }}
                          className="bg-blue-600 text-white px-2 py-1.5 rounded hover:bg-blue-700 transition-colors text-xs font-semibold min-h-[36px] w-full whitespace-nowrap"
                        >
                          Apply
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              </table>
            </div>
          </div>
          
          {/* Tablet View (md to lg) */}
          <div className="hidden md:block lg:hidden w-full">
            <div className="space-y-4">
              {rankedPrograms.map((item, index) => {
                const fees = calculateTotalFees(item.program, item.university);
                const nirfRank = item.university.profile?.rankings?.nirf || 'N/A';
                const avgAnnualFee = item.program.annualFees?.[0] || 0;
                
                let programDisplayName = item.program.name;
                if (item.program.specialization && !programDisplayName.includes(item.program.specialization)) {
                  programDisplayName += ` - ${item.program.specialization}`;
                }
                
                return (
                  <div key={index} className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="font-semibold text-sm text-blue-600 mb-1">{item.university.shortName}</div>
                        <div className="text-xs text-gray-600 mb-2">{item.university.name}</div>
                        <div className="font-medium text-sm mb-1">{programDisplayName}</div>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <span className="text-gray-600">Duration:</span>
                          <div className="font-semibold">{item.program.duration} years</div>
                        </div>
                        <div>
                          <span className="text-gray-600">Annual Fee:</span>
                          <div className="font-semibold">₹{avgAnnualFee.toLocaleString()}</div>
                        </div>
                        <div>
                          <span className="text-gray-600">Scholarship:</span>
                          <div className="font-semibold text-green-600">{fees.scholarshipPercent}%</div>
                        </div>
                        <div>
                          <span className="text-gray-600">Total Cost:</span>
                          <div className="font-semibold">₹{fees.grandTotal.toLocaleString()}</div>
                        </div>
                        <div>
                          <span className="text-gray-600">Ranking:</span>
                          <div className="font-semibold">NIRF {nirfRank}</div>
                          {item.university.profile?.rankings?.naac && (
                            <div className="text-xs text-gray-500">NAAC {item.university.profile.rankings.naac}</div>
                          )}
                        </div>
                        <div className="flex items-end">
                          <button
                            onClick={() => {
                              const message = generateApplicationMessage({
                                courseInterest: item.program.name,
                                universityPreference: item.university.name,
                                programDetails: programDisplayName
                              });
                              redirectToWhatsApp(message, 'course_group_compare_tablet', item.program.name || '', item.university.name || '');
                            }}
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors text-xs font-semibold min-h-[36px] w-full"
                          >
                            Apply
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Detailed Fee Breakdowns for Each Program */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Detailed Fee Structure & Scholarships</h2>
          <div className="space-y-8">
            {rankedPrograms.map((item, index) => (
              <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                  <h3 className="text-xl font-bold">{item.university.shortName} - {item.program.name}</h3>
                  {item.program.specialization && (
                    <p className="text-gray-600 text-sm">{item.program.specialization}</p>
                  )}
                </div>
                <div className="p-6">
                  <DetailedFeeBreakdown program={item.program} university={item.university} />
                  <div className="mt-4 flex gap-4">
                    <Link
                      to={`/universities/${item.university.slug}/courses/${item.program.slug}`}
                      className="text-blue-600 hover:text-blue-800 font-semibold"
                    >
                      View Full Course Details →
                    </Link>
                    <Link
                      to={`/universities/${item.university.slug}`}
                      className="text-blue-600 hover:text-blue-800 font-semibold"
                    >
                      View University Profile →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <FAQSection faqs={faqs} title={`Frequently Asked Questions about ${groupInfo.name}`} />

        {/* Top Universities - Strategic Internal Linking */}
        <section className="mb-12" data-testid="top-universities-section">
          <h2 className="text-2xl font-bold mb-6">Explore Top Universities</h2>
          <p className="text-gray-600 mb-6">
            Discover more programs and information about India's leading universities offering {groupInfo.name}.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {getTopUniversities(4, universities).map((university, index) => (
              <Link
                key={index}
                to={university.url}
                className="bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 border border-gray-200 group hover:border-blue-300"
              >
                <div className="text-3xl mb-3" aria-hidden="true">🎓</div>
                <h3 className="font-semibold text-lg mb-2 group-hover:text-blue-600 transition-colors">
                  {university.title}
                </h3>
                <p className="text-sm text-gray-600 mb-3">
                  {university.anchorText.split(' - ')[1] || 'Quality Education'}
                </p>
                <div className="flex items-center text-blue-600 text-sm font-semibold group-hover:underline">
                  View University →
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-blue-50 p-8 rounded-lg text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Apply?</h2>
          <p className="text-gray-600 mb-6">
            Get free counseling and application assistance
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

