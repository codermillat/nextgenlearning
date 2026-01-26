import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import SEOHead from '../components/SEO/SEOHead';
import StructuredData from '../components/SEO/StructuredData';
import Breadcrumbs from '../components/Common/Breadcrumbs';
import FAQSection from '../components/SEO/FAQSection';
import Card from '../components/Common/Card';
import { generateBreadcrumbSchema } from '../components/SEO/StructuredData';
import { calculateTotalFees } from '../utils/rankings';
import { typography, spacing } from '../utils/designTokens';

export default function FeesAndScholarships() {
  const { universities, allPrograms, loading } = useData();

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Fees & Scholarships', url: '/fees-scholarships' }
  ];

  // Generate structured data
  const feesSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "B.Tech CSE Fees & Scholarships 2025-26 - Complete Guide",
    "description": "Complete guide to B.Tech CSE fees and scholarships at top Indian universities. Compare fees: Galgotias (₹3.5L/year), Sharda (₹3L/year), Chandigarh (₹3-4L/year), NIU (₹2.5L/year). Scholarships: 20-60% for Bangladeshi students. Total fees 4 years breakdown.",
    "url": "https://www.nextgenlearning.dev/fees-scholarships",
    "inLanguage": "en"
  };

  const faqs = [
    {
      question: "What is the total fee for B.Tech CSE 4 years at these universities?",
      answer: "Total fees for B.Tech CSE 4 years vary by university and scholarship: Galgotias University: ₹14-16 lakh (after 50-60% scholarship), Sharda University: ₹12-15 lakh (after 20-50% scholarship), Chandigarh University: ₹12-16 lakh (after 35-50% scholarship), Noida International University: ₹10-12 lakh (after 50% flat scholarship). All fees include tuition, admission fees, and other charges. Scholarships are automatically applied for Bangladeshi students."
    },
    {
      question: "What scholarships are available for Bangladeshi students?",
      answer: "Bangladeshi students can avail generous scholarships: Noida International University offers 50% flat scholarship (no GPA requirement), Sharda University offers 20-50% GPA-based scholarships (50% for GPA 3.5+, 30% for GPA 3.0-3.49, 20% for GPA 3.0+), Chandigarh University offers 35-50% GPA-based scholarships, and Galgotias University offers 50-60% program-based scholarships. All scholarships are automatically applied and renewable annually."
    },
    {
      question: "How are fees calculated with scholarships?",
      answer: "Fees are calculated by applying the maximum available scholarship percentage to the annual tuition fee. For example, if annual fee is ₹7 lakh and scholarship is 50%, you pay ₹3.5 lakh per year. Total cost includes: (Annual fee after scholarship × Duration) + One-time admission fees. All featured universities automatically apply scholarships for Bangladeshi students, so you don't need to apply separately."
    },
    {
      question: "Can I pay fees year-wise?",
      answer: "Yes, all universities allow year-wise fee payment. Payment structure: Year 1 includes one-time admission fees + annual tuition fee. Years 2-4 include only annual tuition fee. This flexible payment structure makes it easier to manage finances. Fees can be paid at the beginning of each academic year."
    },
    {
      question: "What is included in the total fee?",
      answer: "Total fee includes: Annual tuition fee (after scholarship), One-time admission/registration fees (charged in first year only), Library fees, Laboratory fees, Examination fees, and other recurring charges. Hostel fees, mess charges, and personal expenses are separate. All universities provide detailed fee breakdowns before admission."
    },
    {
      question: "Do scholarships apply to all years?",
      answer: "Yes, scholarships are renewable annually throughout the program duration, provided you maintain satisfactory academic performance. For GPA-based scholarships (Sharda, Chandigarh), you need to maintain minimum GPA requirements. For flat scholarships (NIU), they continue automatically. Galgotias program-based scholarships also continue automatically."
    },
    {
      question: "Are there any hidden costs?",
      answer: "No hidden costs. All fees are clearly mentioned in the fee structure. However, you should budget separately for: Hostel accommodation (₹50,000-1,00,000/year), Mess/food expenses (₹30,000-50,000/year), Books and study materials (₹10,000-20,000/year), Personal expenses, and Travel expenses. These are standard student expenses and not included in tuition fees."
    },
    {
      question: "How do I know if I'm eligible for scholarships?",
      answer: "Scholarship eligibility varies by university: NIU offers 50% flat scholarship to ALL Bangladeshi students (no minimum GPA). Sharda University requires minimum GPA 3.0+ for 20% scholarship, GPA 3.0-3.49 for 30%, and GPA 3.5+ for 50%. Chandigarh University offers 35-50% based on GPA. Galgotias offers 50-60% based on program type. Contact us for free counseling to determine your exact scholarship eligibility based on your academic transcripts."
    }
  ];

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" aria-live="polite" aria-busy="true">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4" role="status" aria-label="Loading">
              <span className="sr-only">Loading fees and scholarships...</span>
            </div>
            <p className="text-gray-700" aria-live="polite">Loading fees and scholarships...</p>
          </div>
        </div>
      </div>
    );
  }

  // Get B.Tech CSE programs for each university
  const getBtechCsePrograms = (universityId) => {
    return allPrograms.filter(p => 
      p.universityId === universityId && 
      (p.name.toLowerCase().includes('btech') || p.name.toLowerCase().includes('b.tech')) &&
      (p.name.toLowerCase().includes('cse') || p.name.toLowerCase().includes('computer science'))
    );
  };

  return (
    <>
      <SEOHead
        title="B.Tech CSE Fees 2025 | ₹10-16L Total | 20-60% Off"
        description="B.Tech CSE fees guide: Sharda University ₹3L/year, Galgotias ₹3.5L/year. 20-60% scholarships for Bangladeshi students. Total fees 4 years ₹10-16L."
        keywords={[
          'btech cse fees',
          'btech cse total fees',
          'btech cse total fees 4 years',
          'galgotias university btech cse fees',
          'galgotias university btech cse total fees 4 years',
          'galgotias university b.tech cse fees',
          'galgotias university b.tech cse total fees',
          'sharda university btech cse fees',
          'sharda university btech cse total fees 4 years',
          'sharda university b.tech cse fees',
          'sharda university b.tech cse total fees',
          'chandigarh university btech cse fees',
          'chandigarh university cyber security fees',
          'noida international university btech fees',
          'btech fees in india',
          'btech cse fees with scholarship',
          'scholarship for btech students',
          'scholarship for bangladeshi students',
          'university fees comparison',
          'btech course fees'
        ]}
        url="/fees-scholarships"
        canonical="/fees-scholarships"
      />
      {feesSchema && <StructuredData data={feesSchema} />}
      {generateBreadcrumbSchema(breadcrumbs) && <StructuredData data={generateBreadcrumbSchema(breadcrumbs)} />}
      <Breadcrumbs items={breadcrumbs} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <header className="mb-8">
          <h1 className={`${typography.sectionTitle} mb-4 text-gray-900`}>
            B.Tech CSE Fees & Scholarships 2025-26 - Complete Guide
          </h1>
          <p className={`${typography.bodyLarge} mb-4 text-gray-700 leading-relaxed`}>
            Comprehensive guide to B.Tech CSE fees and scholarships at top Indian universities. 
            Compare total fees for 4 years, annual fees, scholarship percentages, and eligibility criteria. 
            All fees shown include maximum available scholarships for Bangladeshi students.
          </p>
          <p className={`${typography.body} text-gray-600`}>
            <strong>Quick Summary:</strong> Total B.Tech CSE fees range from ₹10-16 lakh for 4 years (after scholarships). 
            Scholarships range from 20% to 60% depending on university and eligibility. All universities offer flexible year-wise payment options.
          </p>
        </header>

        {/* University Fees Comparison Table */}
        <section className="mb-8 sm:mb-12">
          <h2 className={`${typography.sectionTitle} mb-6 text-gray-900`}>B.Tech CSE Fees Comparison - All Universities</h2>
          
          <div className="overflow-x-auto mb-6">
            <table className="w-full border-collapse bg-white border border-gray-300 rounded-lg shadow-sm">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="border border-gray-300 px-4 py-4 text-left font-semibold">University</th>
                  <th className="border border-gray-300 px-4 py-4 text-left font-semibold">Annual Fee (After Scholarship)</th>
                  <th className="border border-gray-300 px-4 py-4 text-left font-semibold">Total Fees (4 Years)</th>
                  <th className="border border-gray-300 px-4 py-4 text-left font-semibold">Scholarship</th>
                  <th className="border border-gray-300 px-4 py-4 text-left font-semibold">Eligibility</th>
                  <th className="border border-gray-300 px-4 py-4 text-left font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {universities.map((university) => {
                  const btechCsePrograms = getBtechCsePrograms(university.id);
                  const sampleProgram = btechCsePrograms[0];
                  let fees = null;
                  if (sampleProgram) {
                    fees = calculateTotalFees(sampleProgram, university);
                  }
                  
                  // Fallback fees if no program found
                  const annualFee = fees ? Math.round(fees.totalAfterScholarship / 4) : 
                    (university.id === 'niu' ? 250000 : 
                     university.id === 'sharda' ? 300000 : 
                     university.id === 'chandigarh' ? 350000 : 350000);
                  const totalFee = fees ? fees.grandTotal : 
                    (university.id === 'niu' ? 1100000 : 
                     university.id === 'sharda' ? 1300000 : 
                     university.id === 'chandigarh' ? 1400000 : 1500000);
                  const scholarship = fees ? fees.scholarshipPercent : 
                    (university.id === 'niu' ? 50 : 
                     university.id === 'sharda' ? 30 : 
                     university.id === 'chandigarh' ? 40 : 55);
                  const eligibility = university.id === 'niu' ? 'All Bangladeshi students' : 
                    university.id === 'sharda' ? 'GPA 3.0+ (20-50% based on GPA)' : 
                    university.id === 'chandigarh' ? 'GPA-based (35-50%)' : 'Program-based (50-60%)';

                  return (
                    <tr key={university.id} className="hover:bg-gray-50 transition-colors">
                      <td className="border border-gray-300 px-4 py-4 font-semibold">
                        <Link to={`/universities/${university.slug}`} className="text-blue-600 hover:underline">
                          {university.shortName}
                        </Link>
                      </td>
                      <td className="border border-gray-300 px-4 py-4">
                        <span className="font-semibold text-gray-900">₹{annualFee.toLocaleString()}/year</span>
                      </td>
                      <td className="border border-gray-300 px-4 py-4">
                        <span className="font-semibold text-blue-600">₹{totalFee.toLocaleString()}</span>
                        <span className="text-sm text-gray-500 ml-2">(4 years)</span>
                      </td>
                      <td className="border border-gray-300 px-4 py-4">
                        <span className="font-semibold text-green-600 bg-green-50 px-2 py-1 rounded">
                          {scholarship}%
                        </span>
                      </td>
                      <td className="border border-gray-300 px-4 py-4 text-sm text-gray-600">{eligibility}</td>
                      <td className="border border-gray-300 px-4 py-4">
                        <Link
                          to={`/universities/${university.slug}`}
                          className="text-blue-600 hover:text-blue-800 font-semibold text-sm"
                        >
                          View Details →
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* Detailed Fee Breakdown by University */}
        <section className="mb-8 sm:mb-12">
          <h2 className={`${typography.sectionTitle} mb-6 text-gray-900`}>Detailed Fee Breakdown by University</h2>
          
          <div className={`grid grid-cols-1 md:grid-cols-2 ${spacing.gapLarge}`}>
            {universities.map((university) => {
              const btechCsePrograms = getBtechCsePrograms(university.id);
              const sampleProgram = btechCsePrograms[0];
              let fees = null;
              if (sampleProgram) {
                fees = calculateTotalFees(sampleProgram, university);
              }
              
              const annualFee = fees ? Math.round(fees.totalAfterScholarship / 4) : 
                (university.id === 'niu' ? 250000 : 
                 university.id === 'sharda' ? 300000 : 
                 university.id === 'chandigarh' ? 350000 : 350000);
              const totalFee = fees ? fees.grandTotal : 
                (university.id === 'niu' ? 1100000 : 
                 university.id === 'sharda' ? 1300000 : 
                 university.id === 'chandigarh' ? 1400000 : 1500000);
              const scholarship = fees ? fees.scholarshipPercent : 
                (university.id === 'niu' ? 50 : 
                 university.id === 'sharda' ? 30 : 
                 university.id === 'chandigarh' ? 40 : 55);

              return (
                <Card key={university.id} variant="default" className="p-6">
                  <h3 className={`${typography.cardTitle} mb-4 text-gray-900`}>
                    {university.shortName} - B.Tech CSE Fees
                  </h3>
                  
                  <div className="space-y-4 mb-6">
                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-600">Annual Fee (After Scholarship):</span>
                        <span className="font-bold text-blue-600 text-lg">₹{annualFee.toLocaleString()}/year</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Total Fees (4 Years):</span>
                        <span className="font-bold text-blue-600 text-lg">₹{totalFee.toLocaleString()}</span>
                      </div>
                    </div>

                    <div className="bg-green-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Scholarship:</span>
                        <span className="font-bold text-green-600 text-lg">{scholarship}%</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-2">
                        {university.id === 'niu' ? 'Flat 50% scholarship for all Bangladeshi students (no GPA requirement)' :
                         university.id === 'sharda' ? 'GPA-based: 50% for GPA 3.5+, 30% for GPA 3.0-3.49, 20% for GPA 3.0+' :
                         university.id === 'chandigarh' ? 'GPA-based scholarships ranging from 35% to 50%' :
                         'Program-based scholarships ranging from 50% to 60%'}
                      </p>
                    </div>

                    <div className="border-t pt-4">
                      <h4 className="font-semibold mb-2 text-gray-900">Fee Structure:</h4>
                      <ul className="space-y-1 text-sm text-gray-600">
                        <li>• Year 1: ₹{(annualFee + (fees?.oneTimeFees || 50000)).toLocaleString()} (includes one-time fees)</li>
                        <li>• Year 2-4: ₹{annualFee.toLocaleString()} per year</li>
                        <li>• Payment: Year-wise payment available</li>
                        <li>• Scholarship: Renewable annually</li>
                      </ul>
                    </div>
                  </div>

                  <Link
                    to={`/universities/${university.slug}`}
                    className="text-blue-600 hover:text-blue-800 font-semibold text-sm inline-flex items-center"
                  >
                    View All Courses & Detailed Fees →
                  </Link>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Scholarship Details */}
        <section className="mb-8 sm:mb-12 bg-gradient-to-br from-green-50 to-blue-50 border border-green-200 rounded-xl p-6 sm:p-8">
          <h2 className={`${typography.sectionTitle} mb-6 text-gray-900`}>Scholarship Details & Eligibility</h2>
          
          <div className="space-y-6">
            {universities.map((university) => {
              return (
                <div key={university.id} className="bg-white rounded-lg p-6 border border-gray-200">
                  <h3 className={`${typography.cardTitle} mb-4 text-gray-900`}>
                    {university.shortName} - Scholarship Information
                  </h3>
                  
                  {university.id === 'niu' ? (
                    <div className="space-y-3">
                      <p className={typography.body}>
                        <strong>Scholarship:</strong> <span className="text-green-600 font-semibold">50% Flat Scholarship</span>
                      </p>
                      <p className={typography.body}>
                        <strong>Eligibility:</strong> All Bangladeshi students are eligible for 50% scholarship regardless of GPA. 
                        No minimum GPA requirement. Scholarship is automatically applied and renewable annually.
                      </p>
                      <p className={typography.body}>
                        <strong>Benefits:</strong> Most generous scholarship policy - every Bangladeshi student gets 50% off tuition fees. 
                        No separate scholarship application needed.
                      </p>
                    </div>
                  ) : university.id === 'sharda' ? (
                    <div className="space-y-3">
                      <p className={typography.body}>
                        <strong>Scholarship:</strong> <span className="text-green-600 font-semibold">20-50% GPA-Based</span>
                      </p>
                      <p className={typography.body}>
                        <strong>Eligibility Tiers:</strong>
                      </p>
                      <ul className="list-disc list-inside space-y-1 ml-4">
                        <li><strong>50% Scholarship:</strong> GPA 3.5+ (HSC/SSC)</li>
                        <li><strong>30% Scholarship:</strong> GPA 3.0-3.49</li>
                        <li><strong>20% Scholarship:</strong> GPA 3.0+</li>
                      </ul>
                      <p className={typography.body}>
                        <strong>Benefits:</strong> Scholarships are automatically calculated based on academic transcripts. 
                        Renewable annually based on academic performance.
                      </p>
                    </div>
                  ) : university.id === 'chandigarh' ? (
                    <div className="space-y-3">
                      <p className={typography.body}>
                        <strong>Scholarship:</strong> <span className="text-green-600 font-semibold">35-50% GPA-Based</span>
                      </p>
                      <p className={typography.body}>
                        <strong>Eligibility:</strong> Scholarships range from 35% to 50% based on HSC/SSC GPA and program type. 
                        Higher GPA and specific programs qualify for higher scholarships.
                      </p>
                      <p className={typography.body}>
                        <strong>Benefits:</strong> Competitive scholarship rates. Automatically applied and renewable annually.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <p className={typography.body}>
                        <strong>Scholarship:</strong> <span className="text-green-600 font-semibold">50-60% Program-Based</span>
                      </p>
                      <p className={typography.body}>
                        <strong>Eligibility:</strong> Scholarships vary by program type, ranging from 50% to 60%. 
                        Tech programs typically qualify for higher scholarships.
                      </p>
                      <p className={typography.body}>
                        <strong>Benefits:</strong> Generous scholarship rates. Automatically applied based on program selection. 
                        Renewable annually.
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Payment Structure */}
        <section className="mb-8 sm:mb-12 bg-white border border-gray-200 rounded-xl p-6 sm:p-8">
          <h2 className={`${typography.sectionTitle} mb-6 text-gray-900`}>Payment Structure & Options</h2>
          
          <div className="space-y-4">
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="font-semibold mb-3 text-gray-900">Year-wise Payment Structure</h3>
              <p className={`${typography.body} mb-4`}>
                All universities offer flexible year-wise payment options, making it easier to manage finances:
              </p>
              <ul className="space-y-2 ml-4">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span><strong>Year 1:</strong> One-time admission/registration fees + Annual tuition fee (after scholarship)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span><strong>Year 2-4:</strong> Annual tuition fee only (after scholarship)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Fees are payable at the beginning of each academic year</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Scholarships are applied automatically and renewable annually</span>
                </li>
              </ul>
            </div>

            <div className="bg-green-50 rounded-lg p-6">
              <h3 className="font-semibold mb-3 text-gray-900">Additional Costs to Consider</h3>
              <p className={`${typography.body} mb-4`}>
                While tuition fees are covered, you should budget separately for:
              </p>
              <ul className="space-y-2 ml-4">
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  <span><strong>Hostel Accommodation:</strong> ₹50,000 - ₹1,00,000 per year</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  <span><strong>Mess/Food Expenses:</strong> ₹30,000 - ₹50,000 per year</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  <span><strong>Books & Study Materials:</strong> ₹10,000 - ₹20,000 per year</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  <span><strong>Personal Expenses:</strong> ₹20,000 - ₹40,000 per year</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  <span><strong>Travel Expenses:</strong> Varies based on location</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-8 sm:mb-12">
          <FAQSection faqs={faqs} title="Frequently Asked Questions about Fees & Scholarships" />
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white rounded-xl p-8 sm:p-12 text-center shadow-large relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
          <div className="relative z-10">
            <h2 className={`${typography.sectionTitle} mb-4 sm:mb-6`}>Need Help with Fees & Scholarships?</h2>
            <p className={`${typography.bodyLarge} mb-6 sm:mb-8 text-blue-50 max-w-2xl mx-auto`}>
              Get free counseling to understand fees, calculate scholarships, and receive guidance through the application process.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/apply"
                className="bg-white text-blue-600 px-6 sm:px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors min-h-[44px] flex items-center justify-center text-sm sm:text-base shadow-md"
              >
                Apply Now - Free Consultation
              </Link>
              <Link
                to="/universities"
                className="bg-blue-700 text-white px-6 sm:px-8 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors border-2 border-white min-h-[44px] flex items-center justify-center text-sm sm:text-base"
              >
                Compare All Universities
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
