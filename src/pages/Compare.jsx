import { useState, useMemo, useEffect } from 'react';
import { useData } from '../context/DataContext';
import SEOHead from '../components/SEO/SEOHead';
import MetaManager from '../components/SEO/MetaManager';
import StructuredData from '../components/SEO/StructuredData';
import Breadcrumbs from '../components/Common/Breadcrumbs';
import FAQSection from '../components/SEO/FAQSection';
import CourseFilters from '../components/Compare/CourseFilters';
import Button from '../components/Common/Button';
import Card from '../components/Common/Card';
import { calculateTotalFees } from '../utils/rankings';
import { filterPrograms } from '../utils/filterPrograms';
import { generateBreadcrumbSchema } from '../components/SEO/StructuredData';
import { Link } from 'react-router-dom';
import { redirectToWhatsApp, generateApplicationMessage } from '../utils/whatsappRedirect';
import { trackComparison, trackFilter } from '../utils/analytics';
import { typography, spacing } from '../utils/designTokens';
import { generateRecommendationText } from '../utils/universityComparison';

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

  // Calculate recommendations for selected programs
  const programRecommendations = useMemo(() => {
    return selectedPrograms.map(program => {
      const university = universities.find(u => u.id === program.universityId);
      return {
        programId: program.id,
        recommendation: generateRecommendationText(university)
      };
    });
  }, [selectedPrograms, universities]);

  // Filter programs based on active filters and exclude already selected ones
  // Sort by university comparison score to prioritize Sharda
  const filteredPrograms = useMemo(() => {
    const filtered = filterPrograms(allPrograms, filters, universities);
    // Exclude already selected programs from the dropdown
    const selectedIds = new Set(selectedPrograms.map(p => p.id));
    const available = filtered.filter(program => !selectedIds.has(program.id));
    
    // Programs are already sorted by filterPrograms with comparison scoring
    // This ensures Sharda programs appear higher in the list
    return available;
  }, [allPrograms, filters, selectedPrograms, universities]);

  const handleAddProgram = (programId) => {
    const program = allPrograms.find(p => p.id === programId);
    if (program) {
      setSelectedPrograms(prev => {
        if (prev.length >= 5 || prev.find(p => p.id === programId)) {
          return prev;
        }
        return [...prev, program];
      });
    }
  };

  const handleRemoveProgram = (programId) => {
    setSelectedPrograms(prev => prev.filter(p => p.id !== programId));
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
      <MetaManager
        emoji="⚖️"
        benefit="Compare Courses Side-by-Side"
        socialProof="500+ programs"
        price="From ₹2.5L/year"
        urgency="Apply by March 2026"
        cta="Compare Now"
        baseTitle="Compare Courses"
        url="/compare"
        image="/og-image.svg"
      />
      <SEOHead
        title="Compare Courses Between Universities - Side-by-Side Comparison Tool | Fees, Rankings, Scholarships 2025-26"
        description="Compare courses at Sharda University & top universities side-by-side. Compare fees, scholarships (20-60%), NIRF rankings. Free tool for Bangladeshi students."
        keywords={[
          'compare courses between universities',
          'compare courses',
          'course comparison',
          'compare colleges side by side',
          'compare degrees',
          'university course comparison',
          'compare courses universities',
          'compare tech courses',
          'compare IT courses',
          'course comparison tool',
          'compare B.Tech courses',
          'compare B.Tech CSE fees',
          'compare M.Tech programs',
          'fee comparison India',
          'scholarship comparison',
          'tech course comparison',
          'compare computer science courses',
          'compare data science courses',
          'compare AI ML courses',
          'university ranking comparison',
          'course fee calculator',
          'uni comparisons',
          'compare courses side by side'
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

      <div className={`max-w-7xl mx-auto ${spacing.container} ${spacing.sectionSmall} overflow-x-hidden`}>
        {/* SEO-Optimized Header */}
        <header className="mb-6 sm:mb-8">
          <h1 className={`${typography.sectionTitle} mb-3 sm:mb-4 leading-tight`}>
            Compare Courses & Universities - Side-by-Side Comparison Tool
          </h1>
          <p className={`${typography.body} mb-3 sm:mb-4 leading-relaxed`}>
            Compare up to 5 courses or universities side-by-side to make informed decisions about your study in India. 
            Our comprehensive comparison tool allows you to filter by degree level (UG, PG, Diploma, Lateral Entry), 
            university, stream/department, and search by course name. Compare fees, rankings, scholarships, duration, 
            and other important factors across top Indian universities including Sharda University, Noida International University (NIU), 
            Chandigarh University, and Galgotias University.
          </p>
          <p className={`${typography.caption} mb-3 sm:mb-4`}>
            <strong>Perfect for Bangladeshi students</strong> planning to study in India. All fees are calculated with maximum 
            available scholarships for Bangladeshi students. Get free counseling and application assistance.
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
        <div className="mb-4 sm:mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500 rounded-lg p-4 sm:p-5 shadow-sm">
          <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
            <strong className="text-blue-900">📌 Note:</strong> Fees shown below are calculated using the maximum available scholarship for each course. 
            Scholarship percentages vary by university and program. Check individual course pages for detailed scholarship tiers and eligibility criteria.
          </p>
        </div>

        {/* Program Selection */}
        <Card variant="default" className="mb-8">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h2 className={typography.cardTitle}>Select Programs to Compare</h2>
            {selectedPrograms.length > 0 && (
              <span 
                className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold"
                aria-live="polite"
                aria-atomic="true"
              >
                {selectedPrograms.length} / 5 selected
              </span>
            )}
          </div>
          <label htmlFor="program-select" className="block text-sm font-medium text-gray-700 mb-2">
            Select Programs to Compare
          </label>
          <select
            id="program-select"
            key={`filter-${JSON.stringify(filters)}-${selectedPrograms.length}`}
            onChange={(e) => {
              if (e.target.value) {
                handleAddProgram(e.target.value);
                e.target.value = '';
              }
            }}
            className="w-full md:w-2/3 px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base shadow-sm hover:border-blue-400 transition-colors"
            disabled={selectedPrograms.length >= 5}
            value=""
            aria-describedby="program-select-help"
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
          <div id="program-select-help" className="mt-2 space-y-2">
            {selectedPrograms.length >= 5 && (
              <p className="text-sm text-gray-600" role="alert" aria-live="polite">
                Maximum 5 programs can be compared at once. Remove a program to add another.
              </p>
            )}
            {filteredPrograms.length === 0 && filters && Object.values(filters).some(v => v !== '') && (
              <p className="text-sm text-blue-600" role="alert" aria-live="polite">
                No courses match your current filters. Try adjusting your filters or{' '}
                <button
                  type="button"
                  onClick={() => setFilters({ degreeLevel: '', universityId: '', field: '', search: '' })}
                  className="underline font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
                >
                  clear all filters
                </button>
                .
              </p>
            )}
          </div>
        </Card>

        {/* Comparison Table */}
        {selectedPrograms.length > 0 && (
          <>
            {/* Mobile Card View */}
            <div className="block md:hidden space-y-4">
              {selectedPrograms.map((program) => {
                const university = universities.find(u => u.id === program.universityId);
                const fees = calculateTotalFees(program, university);
                const nirfRank = university?.profile?.rankings?.nirf || 'N/A';
                const recommendation = programRecommendations.find(r => r.programId === program.id)?.recommendation;
                
                return (
                  <div key={program.id} className="bg-white border-2 border-gray-200 rounded-xl p-5 shadow-soft hover:shadow-medium transition-all">
                    {/* Recommendation Badges */}
                    {recommendation && recommendation.badges.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-3">
                        {recommendation.badges.map((badge, idx) => (
                          <span
                            key={idx}
                            className={`px-2 py-1 text-xs font-semibold rounded-full ${
                              recommendation.emphasis === 'high'
                                ? 'bg-blue-100 text-blue-700 border border-blue-300'
                                : 'bg-gray-100 text-gray-700 border border-gray-300'
                            }`}
                          >
                            {badge}
                          </span>
                        ))}
                      </div>
                    )}
                    
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
                    
                    <div className="flex gap-3">
                      <Button
                        variant="primary"
                        size="sm"
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
                        className="flex-1"
                        aria-label={`Apply for ${program.name} at ${university?.name || 'university'}`}
                      >
                        Apply
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleRemoveProgram(program.id)}
                        className="px-4 py-3 text-red-600 hover:text-red-800 hover:bg-red-50 border-2 border-red-600"
                        aria-label={`Remove ${program.name} from comparison`}
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
            
            {/* Desktop Table View */}
            <div className="hidden lg:block w-full">
              <div className="w-full overflow-hidden rounded-xl shadow-soft border border-gray-200">
                <table className="w-full bg-white table-auto">
                <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
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
                    const recommendation = programRecommendations.find(r => r.programId === program.id)?.recommendation;
                    
                    let programDisplayName = program.name;
                    if (program.specialization && !programDisplayName.includes(program.specialization)) {
                      programDisplayName += ` - ${program.specialization}`;
                    }
                    
                    return (
                      <tr 
                        key={program.id} 
                        className={`hover:bg-gray-50 ${
                          recommendation?.emphasis === 'high' ? 'bg-blue-50/30' : ''
                        }`}
                      >
                        <td className="px-2 py-3">
                          <div className="font-semibold text-xs leading-tight break-words">{programDisplayName}</div>
                          {/* Recommendation Badges */}
                          {recommendation && recommendation.badges.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-1">
                              {recommendation.badges.map((badge, idx) => (
                                <span
                                  key={idx}
                                  className={`px-1.5 py-0.5 text-[10px] font-semibold rounded ${
                                    recommendation.emphasis === 'high'
                                      ? 'bg-blue-100 text-blue-700'
                                      : 'bg-gray-100 text-gray-600'
                                  }`}
                                >
                                  {badge}
                                </span>
                              ))}
                            </div>
                          )}
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
                          <div className="flex flex-col gap-2">
                            <Button
                              variant="primary"
                              size="sm"
                              onClick={() => {
                                const message = generateApplicationMessage({
                                  courseInterest: program.name,
                                  universityPreference: university?.name,
                                  programDetails: programDisplayName
                                });
                                redirectToWhatsApp(message, 'compare_page_desktop', program.name || '', university?.name || '');
                              }}
                              className="text-xs"
                              aria-label={`Apply for ${program.name} at ${university?.name || 'university'}`}
                            >
                              Apply
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleRemoveProgram(program.id)}
                              className="text-red-600 hover:text-red-800 hover:bg-red-50 border-red-200 text-xs"
                              aria-label={`Remove ${program.name} from comparison`}
                            >
                              Remove
                            </Button>
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
                  const recommendation = programRecommendations.find(r => r.programId === program.id)?.recommendation;
                  
                  let programDisplayName = program.name;
                  if (program.specialization && !programDisplayName.includes(program.specialization)) {
                    programDisplayName += ` - ${program.specialization}`;
                  }
                  
                  return (
                    <div 
                      key={program.id} 
                      className={`border border-gray-200 rounded-lg p-4 ${
                        recommendation?.emphasis === 'high' ? 'bg-blue-50/30 border-blue-200' : 'bg-white'
                      }`}
                    >
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="font-semibold text-sm mb-1">{programDisplayName}</div>
                          <div className="text-xs text-blue-600 mb-2">{university?.shortName} - {university?.name}</div>
                          {/* Recommendation Badges */}
                          {recommendation && recommendation.badges.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-2">
                              {recommendation.badges.map((badge, idx) => (
                                <span
                                  key={idx}
                                  className={`px-2 py-0.5 text-xs font-semibold rounded ${
                                    recommendation.emphasis === 'high'
                                      ? 'bg-blue-100 text-blue-700'
                                      : 'bg-gray-100 text-gray-600'
                                  }`}
                                >
                                  {badge}
                                </span>
                              ))}
                            </div>
                          )}
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
                              type="button"
                              onClick={() => {
                                const message = generateApplicationMessage({
                                  courseInterest: program.name,
                                  universityPreference: university?.name,
                                  programDetails: programDisplayName
                                });
                                redirectToWhatsApp(message, 'compare_page_tablet', program.name || '', university?.name || '');
                              }}
                              className="bg-blue-600 text-white px-3 py-1.5 rounded hover:bg-blue-700 transition-colors text-xs font-semibold min-h-[36px] focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600"
                              aria-label={`Apply for ${program.name} at ${university?.name || 'university'}`}
                            >
                              Apply
                            </button>
                            <button
                              type="button"
                              onClick={() => handleRemoveProgram(program.id)}
                              className="text-red-600 hover:text-red-800 text-xs px-2 py-1 min-h-[32px] border border-red-600 rounded focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                              aria-label={`Remove ${program.name} from comparison`}
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
          <Card variant="gradient" gradientColors="from-gray-50 to-blue-50" className="text-center">
            <div className="max-w-2xl mx-auto">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-6 text-4xl" aria-hidden="true">
                ⚖️
              </div>
              <h2 className={`${typography.sectionTitle} mb-4 text-gray-900`}>Start Comparing Courses</h2>
              <p className={`${typography.body} mb-8`}>
                Select programs from the dropdown above to start comparing. Use the filters to narrow down your options 
                by degree level, university, or stream/department.
              </p>
              <div className={`mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 ${spacing.gap} text-left`}>
                <Card variant="default" className="text-left">
                  <h3 className={`${typography.bodySmall} font-semibold mb-2 text-gray-900`}>Filter by Degree Level</h3>
                  <p className={`${typography.caption} leading-relaxed`}>
                    Choose from UG (Undergraduate), PG (Postgraduate), Diploma, or Lateral Entry programs.
                  </p>
                </Card>
                <Card variant="default" className="text-left">
                  <h3 className={`${typography.bodySmall} font-semibold mb-2 text-gray-900`}>Filter by University</h3>
                  <p className={`${typography.caption} leading-relaxed`}>
                    Compare courses from Sharda, NIU, Chandigarh University, or Galgotias.
                  </p>
                </Card>
                <Card variant="default" className="text-left">
                  <h3 className={`${typography.bodySmall} font-semibold mb-2 text-gray-900`}>Filter by Stream</h3>
                  <p className={`${typography.caption} leading-relaxed`}>
                    Narrow down by Engineering, Business, Health Sciences, or other fields.
                  </p>
                </Card>
                <Card variant="default" className="text-left">
                  <h3 className={`${typography.bodySmall} font-semibold mb-2 text-gray-900`}>Search Courses</h3>
                  <p className={`${typography.caption} leading-relaxed`}>
                    Use the search box to find specific courses by name or specialization.
                  </p>
                </Card>
              </div>
            </div>
          </Card>
        )}

        {/* FAQ Section */}
        <section className="mt-12">
          <FAQSection faqs={faqs} title="Frequently Asked Questions about Course Comparison" />
        </section>

        {/* Related Links Section for SEO */}
        <Card variant="gradient" gradientColors="from-blue-50 to-indigo-50" borderColor="border-blue-200" className="mt-12">
          <h2 className={`${typography.sectionTitle} mb-6 text-gray-900`}>Explore More Options</h2>
          <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 ${spacing.gap}`}>
            <Card 
              to="/courses"
              variant="default"
              hoverTextColor="group-hover:text-blue-700"
            >
              <h3 className={`${typography.bodySmall} font-semibold mb-2 text-blue-600 group-hover:text-blue-700 transition-colors`}>Browse All Courses</h3>
              <p className={`${typography.caption} leading-relaxed`}>
                Explore all available courses across all universities. Find detailed information about each program.
              </p>
            </Card>
            <Card 
              to="/universities"
              variant="default"
              hoverTextColor="group-hover:text-blue-700"
            >
              <h3 className={`${typography.bodySmall} font-semibold mb-2 text-blue-600 group-hover:text-blue-700 transition-colors`}>View Universities</h3>
              <p className={`${typography.caption} leading-relaxed`}>
                Learn more about each university, their rankings, facilities, and placement records.
              </p>
            </Card>
            <Card 
              to="/scholarships"
              variant="default"
              hoverTextColor="group-hover:text-blue-700"
            >
              <h3 className={`${typography.bodySmall} font-semibold mb-2 text-blue-600 group-hover:text-blue-700 transition-colors`}>Scholarship Information</h3>
              <p className={`${typography.caption} leading-relaxed`}>
                Understand all available scholarships, eligibility criteria, and how to apply.
              </p>
            </Card>
          </div>
        </Card>
      </div>
    </>
  );
}

