import { useState, useMemo, useEffect } from 'react';
import { useData } from '../context/DataContext';
import SEOHead from '../components/SEO/SEOHead';
import StructuredData from '../components/SEO/StructuredData';
import Breadcrumbs from '../components/Common/Breadcrumbs';
import FAQSection from '../components/SEO/FAQSection';
import CourseFilters from '../components/Compare/CourseFilters';
import { calculateTotalFees } from '../utils/rankings';
import { filterPrograms } from '../utils/filterPrograms';
import { generateBreadcrumbSchema } from '../components/SEO/StructuredData';
import { Link } from 'react-router-dom';
import { redirectToWhatsApp, generateApplicationMessage } from '../utils/whatsappRedirect';
import { trackComparison, trackFilter } from '../utils/analytics';

export default function Compare() {
  const { allPrograms, universities } = useData();
  const [selectedPrograms, setSelectedPrograms] = useState([]);
  const [filters, setFilters] = useState({
    degreeLevel: '',
    universityId: '',
    field: '',
    search: ''
  });

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Compare', url: '/compare' }
  ];

  // Filter programs based on active filters and exclude already selected ones
  const filteredPrograms = useMemo(() => {
    const filtered = filterPrograms(allPrograms, filters);
    // Exclude already selected programs from the dropdown
    const selectedIds = new Set(selectedPrograms.map(p => p.id));
    return filtered.filter(program => !selectedIds.has(program.id));
  }, [allPrograms, filters, selectedPrograms]);

  const handleAddProgram = (programId) => {
    const program = allPrograms.find(p => p.id === programId);
    if (program && selectedPrograms.length < 5 && !selectedPrograms.find(p => p.id === programId)) {
      setSelectedPrograms([...selectedPrograms, program]);
    }
  };

  const handleRemoveProgram = (programId) => {
    setSelectedPrograms(selectedPrograms.filter(p => p.id !== programId));
  };
  
  // Track comparison when programs are selected
  useEffect(() => {
    if (selectedPrograms.length > 0) {
      const uniqueUniversities = [...new Set(selectedPrograms.map(p => {
        const uni = universities.find(u => u.id === p.universityId);
        return uni?.name || '';
      }).filter(Boolean))];
      trackComparison(selectedPrograms.length, uniqueUniversities);
    }
  }, [selectedPrograms, universities]);
  
  // Track filter usage
  useEffect(() => {
    if (filters.degreeLevel) {
      trackFilter('degree_level', filters.degreeLevel);
    }
    if (filters.universityId) {
      const uni = universities.find(u => u.id === filters.universityId);
      trackFilter('university', uni?.name || filters.universityId);
    }
    if (filters.field) {
      trackFilter('field', filters.field);
    }
  }, [filters.degreeLevel, filters.universityId, filters.field, universities]);

  // Generate structured data for comparison page
  const comparisonStructuredData = useMemo(() => {
    const siteUrl = 'https://www.nextgenlearning.dev';
    
    // WebPage schema
    const webPageSchema = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Compare Tech & IT Courses - Side-by-Side Comparison",
      "description": "Compare up to 5 tech and IT courses side-by-side. Filter by degree level (B.Tech, M.Tech, BCA, MCA), university, specialization. Compare fees, scholarships, rankings, and curriculum. Free comparison tool for tech education.",
      "url": `${siteUrl}/compare`,
      "inLanguage": "en",
      "about": {
        "@type": "Thing",
        "name": "Tech Course Comparison Tool"
      }
    };

    // ItemList schema for comparison tool
    const itemListSchema = selectedPrograms.length > 0 ? {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "Course Comparison",
      "description": `Comparing ${selectedPrograms.length} courses side-by-side`,
      "itemListElement": selectedPrograms.map((program, index) => {
        const university = universities.find(u => u.id === program.universityId);
        return {
          "@type": "ListItem",
          "position": index + 1,
          "item": {
            "@type": "Course",
            "name": program.name,
            "provider": {
              "@type": "EducationalOrganization",
              "name": university?.name || "Unknown"
            }
          }
        };
      })
    } : null;

    return [webPageSchema, itemListSchema].filter(Boolean);
  }, [selectedPrograms, universities]);

  // FAQ data for comparison page
  const faqs = [
    {
      question: "How do I compare courses on this page?",
      answer: "Use the filters at the top to narrow down courses by degree level (UG, PG, Diploma, Lateral Entry), university, or stream/department. You can also search by course name. Then select up to 5 courses from the dropdown to compare them side-by-side. The comparison table shows fees, scholarships, rankings, and other important details."
    },
    {
      question: "Can I compare courses from different universities?",
      answer: "Yes! You can compare courses from any university. Simply select courses from different universities using the dropdown. The comparison table will show all selected courses side-by-side, making it easy to compare fees, rankings, and other factors across universities."
    },
    {
      question: "What information is shown in the comparison?",
      answer: "The comparison table displays: program name and specialization, university name, duration, annual fee, scholarship percentage, total cost (with maximum scholarship applied), NIRF ranking, and action buttons to apply or remove courses. All fees are calculated using the maximum available scholarship for Bangladeshi students."
    },
    {
      question: "How many courses can I compare at once?",
      answer: "You can compare up to 5 courses simultaneously. This allows you to evaluate multiple options side-by-side and make an informed decision. If you need to compare more courses, you can remove some and add others, or create multiple comparison sessions."
    },
    {
      question: "Are the fees shown accurate?",
      answer: "Yes, all fees are calculated using the maximum available scholarship for Bangladeshi students. However, actual scholarship eligibility may vary based on your GPA and other criteria. For detailed scholarship tiers and eligibility requirements, visit the individual course pages."
    },
    {
      question: "How do I filter courses by degree level?",
      answer: "Use the 'Degree Level' filter dropdown. Options include: UG (Undergraduate) for Bachelor's programs like B.Tech, BBA, BCA; PG (Postgraduate) for Master's programs like M.Tech, MBA; Diploma for diploma programs; and Lateral Entry for lateral entry programs. You can combine this with other filters like university or stream for more specific results."
    },
    {
      question: "Can I filter by specific university?",
      answer: "Yes, use the 'University' filter dropdown to show only courses from a specific university. Options include Sharda University, Noida International University (NIU), Chandigarh University, and Galgotias University. You can combine this with degree level and stream filters for precise results."
    },
    {
      question: "What is the difference between annual fee and total cost?",
      answer: "Annual fee is the tuition fee per year before scholarships. Total cost includes all fees (tuition after maximum scholarship, one-time admission fees, and recurring fees) for the entire duration of the program. The total cost gives you a complete picture of what you'll pay over the course of your studies."
    }
  ];

  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);
  // FAQ schema is generated by FAQSection component, no need to duplicate here

  return (
    <>
      <SEOHead
        title="Compare Courses & Universities - Side-by-Side Comparison Tool | NextGen Learning"
        description="Compare up to 5 tech and IT courses side-by-side. Filter by degree level (B.Tech, M.Tech, BCA, MCA), university (Chandigarh, Sharda, NIU, Galgotias), specialization. Compare fees, scholarships, rankings, and curriculum. Free comparison tool for tech education at NextGen Learning."
        keywords={[
          'compare tech courses',
          'compare IT courses',
          'course comparison tool',
          'compare B.Tech courses',
          'compare M.Tech programs',
          'fee comparison India',
          'scholarship comparison',
          'tech course comparison',
          'compare computer science courses',
          'compare data science courses',
          'compare AI ML courses',
          'university ranking comparison',
          'course fee calculator',
          'NextGen Learning',
          'tech education comparison'
        ]}
        url="/compare"
        canonical="/compare"
      />
      {comparisonStructuredData.map((schema, index) => (
        <StructuredData key={index} data={schema} />
      ))}
      {breadcrumbSchema && <StructuredData data={breadcrumbSchema} />}
      {/* FAQ schema is generated by FAQSection component below */}
      <Breadcrumbs items={breadcrumbs} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 md:py-8 overflow-x-hidden">
        {/* SEO-Optimized Header */}
        <header className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 leading-tight">
            Compare Courses & Universities - Side-by-Side Comparison Tool
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-700 mb-3 sm:mb-4 leading-relaxed">
            Compare up to 5 courses or universities side-by-side to make informed decisions about your study in India. 
            Our comprehensive comparison tool allows you to filter by degree level (UG, PG, Diploma, Lateral Entry), 
            university, stream/department, and search by course name. Compare fees, rankings, scholarships, duration, 
            and other important factors across top Indian universities including Sharda University, Noida International University (NIU), 
            Chandigarh University, and Galgotias University.
          </p>
          <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">
            <strong>Perfect for Bangladeshi students</strong> planning to study in India. All fees are calculated with maximum 
            available scholarships for Bangladeshi students. Get free counseling and application assistance from Western Bangla Education (WBE).
          </p>
        </header>

        {/* Course Filters */}
        <CourseFilters
          allPrograms={allPrograms}
          universities={universities}
          filters={filters}
          onFiltersChange={setFilters}
        />

        {/* Info Note */}
        <div className="mb-4 sm:mb-6 bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4">
          <p className="text-xs sm:text-sm text-gray-700">
            <strong>Note:</strong> Fees shown below are calculated using the maximum available scholarship for each course. 
            Scholarship percentages vary by university and program. Check individual course pages for detailed scholarship tiers and eligibility criteria.
          </p>
        </div>

        {/* Program Selection */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl sm:text-2xl font-bold">Select Programs to Compare</h2>
            {selectedPrograms.length > 0 && (
              <span className="text-sm text-gray-600">
                {selectedPrograms.length} / 5 selected
              </span>
            )}
          </div>
          <select
            key={`filter-${JSON.stringify(filters)}-${selectedPrograms.length}`}
            onChange={(e) => {
              if (e.target.value) {
                handleAddProgram(e.target.value);
                e.target.value = '';
              }
            }}
            className="w-full md:w-2/3 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
            disabled={selectedPrograms.length >= 5}
            value=""
          >
            <option value="">
              {selectedPrograms.length >= 5 
                ? 'Maximum 5 programs selected' 
                : filteredPrograms.length === 0
                ? 'No courses match your filters'
                : `Select a program to add... (${filteredPrograms.length} available)`}
            </option>
            {filteredPrograms.length > 0 ? (
              filteredPrograms.map(program => (
                <option key={program.id} value={program.id}>
                  {program.name}{program.specialization ? ` - ${program.specialization}` : ''} - {program.university?.shortName || program.university?.name || 'Unknown'}
                </option>
              ))
            ) : (
              <option value="" disabled>No courses available with current filters</option>
            )}
          </select>
          {selectedPrograms.length >= 5 && (
            <p className="text-sm text-gray-600 mt-2">Maximum 5 programs can be compared at once. Remove a program to add another.</p>
          )}
          {filteredPrograms.length === 0 && filters && Object.values(filters).some(v => v !== '') && (
            <p className="text-sm text-blue-600 mt-2">
              No courses match your current filters. Try adjusting your filters or{' '}
              <button
                onClick={() => setFilters({ degreeLevel: '', universityId: '', field: '', search: '' })}
                className="underline font-medium"
              >
                clear all filters
              </button>
              .
            </p>
          )}
        </div>

        {/* Comparison Table */}
        {selectedPrograms.length > 0 && (
          <>
            {/* Mobile Card View */}
            <div className="block md:hidden space-y-4">
              {selectedPrograms.map((program) => {
                const university = universities.find(u => u.id === program.universityId);
                const fees = calculateTotalFees(program, university);
                const nirfRank = university?.profile?.rankings?.nirf || 'N/A';
                
                return (
                  <div key={program.id} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                    <div className="mb-3">
                      <div className="font-bold text-lg">{program.name}</div>
                      {program.specialization && (
                        <div className="text-sm text-gray-600 mt-1">{program.specialization}</div>
                      )}
                      <div className="text-sm text-gray-600 mt-1">{university?.name}</div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3 mb-3 text-sm">
                      <div>
                        <span className="text-gray-600">Duration:</span>
                        <span className="font-semibold ml-1">{program.duration} years</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Annual Fee:</span>
                        <span className="font-semibold ml-1">₹{program.annualFees?.[0]?.toLocaleString() || 'N/A'}</span>
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
                    </div>
                    
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          let programDisplayName = program.name;
                          if (program.specialization && !programDisplayName.includes(program.specialization)) {
                            programDisplayName += ` - ${program.specialization}`;
                          }
                          const message = generateApplicationMessage({
                            courseInterest: program.name,
                            universityPreference: university?.name,
                            programDetails: programDisplayName
                          });
                          redirectToWhatsApp(message, 'compare_page_mobile', program.name || '', university?.name || '');
                        }}
                        className="flex-1 bg-blue-600 text-white px-4 py-3 rounded hover:bg-blue-700 transition-colors font-semibold min-h-[44px]"
                      >
                        Apply
                      </button>
                      <button
                        onClick={() => handleRemoveProgram(program.id)}
                        className="px-4 py-3 text-red-600 hover:text-red-800 font-semibold min-h-[44px] border border-red-600 rounded"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
            
            {/* Desktop Table View */}
            <div className="hidden lg:block w-full">
              <div className="w-full overflow-hidden">
                <table className="w-full bg-white border border-gray-200 table-auto">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase w-[22%]">Program</th>
                    <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase w-[15%]">University</th>
                    <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase w-[8%]">Duration</th>
                    <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase w-[10%]">Annual Fee</th>
                    <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase w-[9%]">Scholarship</th>
                    <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase w-[12%]">Total Cost</th>
                    <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase w-[10%]">Ranking</th>
                    <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase w-[14%]">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {selectedPrograms.map((program) => {
                    const university = universities.find(u => u.id === program.universityId);
                    const fees = calculateTotalFees(program, university);
                    const nirfRank = university?.profile?.rankings?.nirf || 'N/A';
                    
                    let programDisplayName = program.name;
                    if (program.specialization && !programDisplayName.includes(program.specialization)) {
                      programDisplayName += ` - ${program.specialization}`;
                    }
                    
                    return (
                      <tr key={program.id} className="hover:bg-gray-50">
                        <td className="px-2 py-3">
                          <div className="font-semibold text-xs leading-tight break-words">{programDisplayName}</div>
                        </td>
                        <td className="px-2 py-3">
                          <div className="font-medium text-xs">{university?.shortName}</div>
                          <div className="text-[10px] text-gray-500 mt-0.5 leading-tight">{university?.name}</div>
                        </td>
                        <td className="px-2 py-3 text-xs">{program.duration} yrs</td>
                        <td className="px-2 py-3 text-xs">₹{((program.annualFees?.[0] || 0) / 1000).toFixed(0)}K</td>
                        <td className="px-2 py-3">
                          <span className="text-green-600 font-semibold text-xs">{fees.scholarshipPercent}%</span>
                        </td>
                        <td className="px-2 py-3">
                          <div className="font-semibold text-xs">₹{(fees.grandTotal / 1000).toFixed(0)}K</div>
                        </td>
                        <td className="px-2 py-3">
                          <div className="text-xs">NIRF {nirfRank}</div>
                          {university?.profile?.rankings?.naac && (
                            <div className="text-[10px] text-gray-500 mt-0.5">NAAC {university.profile.rankings.naac}</div>
                          )}
                        </td>
                        <td className="px-2 py-3">
                          <div className="flex flex-col gap-1">
                            <button
                              onClick={() => {
                                const message = generateApplicationMessage({
                                  courseInterest: program.name,
                                  universityPreference: university?.name,
                                  programDetails: programDisplayName
                                });
                                redirectToWhatsApp(message, 'compare_page_desktop', program.name || '', university?.name || '');
                              }}
                              className="bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700 transition-colors text-xs font-semibold min-h-[32px]"
                            >
                              Apply
                            </button>
                            <button
                              onClick={() => handleRemoveProgram(program.id)}
                              className="text-red-600 hover:text-red-800 text-xs px-2 py-1 min-h-[32px]"
                            >
                              Remove
                            </button>
                          </div>
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
                {selectedPrograms.map((program) => {
                  const university = universities.find(u => u.id === program.universityId);
                  const fees = calculateTotalFees(program, university);
                  const nirfRank = university?.profile?.rankings?.nirf || 'N/A';
                  
                  let programDisplayName = program.name;
                  if (program.specialization && !programDisplayName.includes(program.specialization)) {
                    programDisplayName += ` - ${program.specialization}`;
                  }
                  
                  return (
                    <div key={program.id} className="bg-white border border-gray-200 rounded-lg p-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="font-semibold text-sm mb-1">{programDisplayName}</div>
                          <div className="text-xs text-blue-600 mb-2">{university?.shortName} - {university?.name}</div>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div>
                            <span className="text-gray-600">Duration:</span>
                            <div className="font-semibold">{program.duration} years</div>
                          </div>
                          <div>
                            <span className="text-gray-600">Annual Fee:</span>
                            <div className="font-semibold">₹{program.annualFees?.[0]?.toLocaleString() || 'N/A'}</div>
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
                            {university?.profile?.rankings?.naac && (
                              <div className="text-xs text-gray-500">NAAC {university.profile.rankings.naac}</div>
                            )}
                          </div>
                          <div className="flex flex-col gap-1">
                            <button
                              onClick={() => {
                                const message = generateApplicationMessage({
                                  courseInterest: program.name,
                                  universityPreference: university?.name,
                                  programDetails: programDisplayName
                                });
                                redirectToWhatsApp(message, 'compare_page_tablet', program.name || '', university?.name || '');
                              }}
                              className="bg-blue-600 text-white px-3 py-1.5 rounded hover:bg-blue-700 transition-colors text-xs font-semibold min-h-[36px]"
                            >
                              Apply
                            </button>
                            <button
                              onClick={() => handleRemoveProgram(program.id)}
                              className="text-red-600 hover:text-red-800 text-xs px-2 py-1 min-h-[32px] border border-red-600 rounded"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}

        {selectedPrograms.length === 0 && (
          <div className="bg-gray-50 p-8 rounded-lg text-center">
            <h2 className="text-xl font-bold mb-4">Start Comparing Courses</h2>
            <p className="text-gray-600 mb-4">
              Select programs from the dropdown above to start comparing. Use the filters to narrow down your options 
              by degree level, university, or stream/department.
            </p>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
              <div className="bg-white p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Filter by Degree Level</h3>
                <p className="text-sm text-gray-600">
                  Choose from UG (Undergraduate), PG (Postgraduate), Diploma, or Lateral Entry programs.
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Filter by University</h3>
                <p className="text-sm text-gray-600">
                  Compare courses from Sharda, NIU, Chandigarh University, or Galgotias.
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Filter by Stream</h3>
                <p className="text-sm text-gray-600">
                  Narrow down by Engineering, Business, Health Sciences, or other fields.
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Search Courses</h3>
                <p className="text-sm text-gray-600">
                  Use the search box to find specific courses by name or specialization.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* FAQ Section */}
        <section className="mt-12">
          <FAQSection faqs={faqs} title="Frequently Asked Questions about Course Comparison" />
        </section>

        {/* Related Links Section for SEO */}
        <section className="mt-12 bg-blue-50 p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Explore More Options</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link
              to="/courses"
              className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold mb-2 text-blue-600">Browse All Courses</h3>
              <p className="text-sm text-gray-600">
                Explore all available courses across all universities. Find detailed information about each program.
              </p>
            </Link>
            <Link
              to="/universities"
              className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold mb-2 text-blue-600">View Universities</h3>
              <p className="text-sm text-gray-600">
                Learn more about each university, their rankings, facilities, and placement records.
              </p>
            </Link>
            <Link
              to="/scholarships"
              className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold mb-2 text-blue-600">Scholarship Information</h3>
              <p className="text-sm text-gray-600">
                Understand all available scholarships, eligibility criteria, and how to apply.
              </p>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}

