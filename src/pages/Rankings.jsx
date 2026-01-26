import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import SEOHead from '../components/SEO/SEOHead';
import StructuredData from '../components/SEO/StructuredData';
import Breadcrumbs from '../components/Common/Breadcrumbs';
import FAQSection from '../components/SEO/FAQSection';
import Card from '../components/Common/Card';
import { generateBreadcrumbSchema } from '../components/SEO/StructuredData';
import { typography, spacing } from '../utils/designTokens';

export default function Rankings() {
  const { universities, loading } = useData();

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'NIRF Rankings', url: '/rankings' }
  ];

  // Generate structured data for rankings
  const rankingsSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "NIRF Ranking 2025 - Top Indian Universities Rankings",
    "description": "Complete guide to NIRF Ranking 2025 for top Indian universities. Compare Chandigarh University (NIRF 32), Galgotias University (NIRF 101-150), Sharda University (NIRF 101-150), Noida International University (NIRF 201-250). All universities have NAAC A+ accreditation.",
    "url": "https://www.nextgenlearning.dev/rankings",
    "inLanguage": "en"
  };

  const faqs = [
    {
      question: "What is NIRF ranking and why is it important?",
      answer: "NIRF (National Institutional Ranking Framework) is the official ranking system for Indian universities by the Ministry of Education, Government of India. Rankings are published annually and consider five key parameters: Teaching, Learning & Resources (TLR), Research and Professional Practice (RP), Graduation Outcomes (GO), Outreach and Inclusivity (OI), and Perception. Higher NIRF rankings indicate better quality education, infrastructure, faculty, research output, and placement records. All universities featured on this page have excellent NIRF 2025 rankings ranging from 32nd to 201-250, ensuring quality education."
    },
    {
      question: "What is the difference between NIRF overall ranking and subject-wise ranking?",
      answer: "NIRF provides both overall rankings and subject-specific rankings. Overall ranking considers all parameters across all disciplines. Subject-wise rankings (like Engineering, Law, Pharmacy) focus on specific fields. For example, Galgotias University ranks 101-150 overall but ranks 36th in Law and 55th in Pharmacy. When choosing a university, consider both overall ranking (for general reputation) and subject-specific ranking (for your field of study)."
    },
    {
      question: "How do NIRF rankings compare to NAAC accreditation?",
      answer: "NIRF rankings and NAAC accreditation are complementary but different. NIRF ranks universities annually based on performance metrics, while NAAC accredits universities based on quality parameters and gives grades (A++, A+, A, B++, B+, B, C). NIRF rankings change yearly, while NAAC accreditation is valid for 5 years. Both are important: NIRF shows current performance, while NAAC confirms quality standards. All universities on this page have both excellent NIRF rankings (32-201-250) and NAAC A+ accreditation."
    },
    {
      question: "Which university has the best NIRF ranking among the featured universities?",
      answer: "Chandigarh University has the best NIRF ranking at 32nd overall in NIRF 2025, making it one of the top-ranked private universities in India. Galgotias University and Sharda University both rank in the 101-150 band, indicating excellent quality. Noida International University ranks 201-250, showing strong growth. All four universities have NAAC A+ accreditation, ensuring quality education regardless of ranking position."
    },
    {
      question: "Do NIRF rankings affect placement opportunities?",
      answer: "Yes, NIRF rankings can influence placement opportunities. Higher-ranked universities often attract more recruiters, offer better placement packages, and have stronger industry partnerships. However, rankings are just one factor. Other important factors include: program quality, industry partnerships, location, and individual student performance. All featured universities have strong placement records with average packages ranging from ₹5-8 lakh per annum for B.Tech graduates."
    },
    {
      question: "How often are NIRF rankings updated?",
      answer: "NIRF rankings are published annually, typically in June. The rankings are based on data from the previous academic year. For example, NIRF 2025 rankings are based on 2023-24 academic year data. Rankings can change each year based on university performance, so it's important to check the latest rankings when making decisions."
    },
    {
      question: "Can I trust NIRF rankings for choosing a university?",
      answer: "Yes, NIRF rankings are reliable as they are published by the Ministry of Education, Government of India, and use standardized parameters. However, rankings should be used as one factor among many when choosing a university. Also consider: program-specific quality, fees, scholarships, location, infrastructure, faculty, industry partnerships, and placement records. All featured universities have excellent NIRF rankings (32-201-250) and NAAC A+ accreditation, ensuring quality education."
    }
  ];

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" aria-live="polite" aria-busy="true">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4" role="status" aria-label="Loading">
              <span className="sr-only">Loading rankings...</span>
            </div>
            <p className="text-gray-700" aria-live="polite">Loading rankings...</p>
          </div>
        </div>
      </div>
    );
  }

  // Sort universities by NIRF ranking
  const sortedUniversities = [...universities].sort((a, b) => {
    const rankA = a.profile?.rankings?.nirf || '';
    const rankB = b.profile?.rankings?.nirf || '';
    
    // Extract numeric rank for comparison
    const numA = rankA.includes('-') ? parseInt(rankA.split('-')[0]) : parseInt(rankA) || 999;
    const numB = rankB.includes('-') ? parseInt(rankB.split('-')[0]) : parseInt(rankB) || 999;
    
    return numA - numB;
  });

  return (
    <>
      <SEOHead
        title="NIRF Rankings 2025 | Sharda, Chandigarh & Top Unis"
        description="NIRF Rankings 2025: Sharda University (101-150), Chandigarh (32), Galgotias (101-150). Compare rankings, fees, scholarships for Bangladeshi students."
        keywords={[
          'nirf ranking',
          'nirf ranking 2025',
          'nirf ranking universities',
          'nirf ranking of indian universities',
          'galgotias university nirf ranking',
          'galgotias university nirf ranking 2025',
          'nirf ranking galgotias university',
          'sharda university nirf ranking',
          'sharda university nirf ranking 2025',
          'nirf ranking sharda university',
          'chandigarh university nirf ranking',
          'chandigarh university nirf ranking 2025',
          'noida international university nirf ranking',
          'noida international university rankings',
          'top nirf ranked universities',
          'best nirf ranked universities',
          'nirf ranking vs naac',
          'university ranking india',
          'indian universities ranking 2025'
        ]}
        url="/rankings"
        canonical="/rankings"
      />
      {rankingsSchema && <StructuredData data={rankingsSchema} />}
      {generateBreadcrumbSchema(breadcrumbs) && <StructuredData data={generateBreadcrumbSchema(breadcrumbs)} />}
      <Breadcrumbs items={breadcrumbs} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <header className="mb-8">
          <h1 className={`${typography.sectionTitle} mb-4 text-gray-900`}>
            NIRF Ranking 2025 - Top Indian Universities Rankings
          </h1>
          <p className={`${typography.bodyLarge} mb-4 text-gray-700 leading-relaxed`}>
            Complete guide to NIRF (National Institutional Ranking Framework) Ranking 2025 for top Indian universities. 
            Compare rankings, understand ranking parameters, and discover why NIRF rankings matter for your higher education journey.
          </p>
          <p className={`${typography.body} text-gray-600`}>
            All featured universities have excellent NIRF 2025 rankings (32nd to 201-250) and NAAC A+ accreditation, 
            ensuring quality education and global recognition of degrees.
          </p>
        </header>

        {/* What is NIRF Section */}
        <section className="mb-8 sm:mb-12 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6 sm:p-8">
          <h2 className={`${typography.cardTitle} mb-4 text-gray-900`}>What is NIRF Ranking?</h2>
          <div className="space-y-4 text-gray-700">
            <p className={typography.body}>
              <strong>NIRF (National Institutional Ranking Framework)</strong> is the official ranking system for Indian universities 
              established by the Ministry of Education, Government of India. Launched in 2016, NIRF provides a comprehensive 
              framework to rank institutions across the country based on multiple parameters.
            </p>
            <div>
              <h3 className="font-semibold mb-2">NIRF Ranking Parameters (2025):</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Teaching, Learning & Resources (TLR) - 30%:</strong> Student strength, faculty-student ratio, faculty qualifications, financial resources</li>
                <li><strong>Research and Professional Practice (RP) - 30%:</strong> Publications, citations, patents, research projects, industry income</li>
                <li><strong>Graduation Outcomes (GO) - 20%:</strong> Placement rate, median salary, higher studies, PhD outcomes</li>
                <li><strong>Outreach and Inclusivity (OI) - 10%:</strong> Regional diversity, women participation, economically disadvantaged students</li>
                <li><strong>Perception (PR) - 10%:</strong> Peer perception, employer perception, public perception</li>
              </ul>
            </div>
            <p className={typography.body}>
              Rankings are published annually, typically in June, and help students make informed decisions about higher education 
              institutions in India.
            </p>
          </div>
        </section>

        {/* University Rankings Table */}
        <section className="mb-8 sm:mb-12">
          <h2 className={`${typography.sectionTitle} mb-6 text-gray-900`}>NIRF Ranking 2025 - Featured Universities</h2>
          
          <div className="overflow-x-auto mb-6">
            <table className="w-full border-collapse bg-white border border-gray-300 rounded-lg shadow-sm">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="border border-gray-300 px-4 py-4 text-left font-semibold">Rank</th>
                  <th className="border border-gray-300 px-4 py-4 text-left font-semibold">University</th>
                  <th className="border border-gray-300 px-4 py-4 text-left font-semibold">NIRF Ranking 2025</th>
                  <th className="border border-gray-300 px-4 py-4 text-left font-semibold">NAAC Grade</th>
                  <th className="border border-gray-300 px-4 py-4 text-left font-semibold">Location</th>
                  <th className="border border-gray-300 px-4 py-4 text-left font-semibold">Programs</th>
                  <th className="border border-gray-300 px-4 py-4 text-left font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {sortedUniversities.map((university, index) => (
                  <tr key={university.id} className="hover:bg-gray-50 transition-colors">
                    <td className="border border-gray-300 px-4 py-4 font-bold text-blue-600">{index + 1}</td>
                    <td className="border border-gray-300 px-4 py-4 font-semibold">
                      <Link to={`/universities/${university.slug}`} className="text-blue-600 hover:underline">
                        {university.shortName}
                      </Link>
                    </td>
                    <td className="border border-gray-300 px-4 py-4">
                      <span className="font-semibold text-gray-900">{university.profile?.rankings?.nirf || 'N/A'}</span>
                      {university.profile?.rankings?.nirf2025 && university.profile.rankings.nirf2025 !== university.profile.rankings.nirf && (
                        <span className="text-sm text-gray-500 ml-2">(2025: {university.profile.rankings.nirf2025})</span>
                      )}
                    </td>
                    <td className="border border-gray-300 px-4 py-4">
                      <span className="font-semibold text-green-600 bg-green-50 px-2 py-1 rounded">
                        {university.profile?.rankings?.naac || 'A+'}
                      </span>
                    </td>
                    <td className="border border-gray-300 px-4 py-4 text-gray-600">{university.location}</td>
                    <td className="border border-gray-300 px-4 py-4">
                      <span className="font-semibold text-blue-600">{university.programs?.length || 0}+</span>
                    </td>
                    <td className="border border-gray-300 px-4 py-4">
                      <Link
                        to={`/universities/${university.slug}`}
                        className="text-blue-600 hover:text-blue-800 font-semibold text-sm"
                      >
                        View Details →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Subject-wise Rankings */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {sortedUniversities.map((university) => {
              const subjectRankings = [];
              if (university.profile?.rankings?.nirfLaw2025) {
                subjectRankings.push({ subject: 'Law', rank: university.profile.rankings.nirfLaw2025 });
              }
              if (university.profile?.rankings?.nirfPharmacy2025) {
                subjectRankings.push({ subject: 'Pharmacy', rank: university.profile.rankings.nirfPharmacy2025 });
              }
              if (university.profile?.rankings?.nirfInnovation2025) {
                subjectRankings.push({ subject: 'Innovation', rank: university.profile.rankings.nirfInnovation2025 });
              }

              if (subjectRankings.length === 0) return null;

              return (
                <Card key={university.id} variant="default" className="p-4">
                  <h3 className={`${typography.bodySmall} font-bold mb-3 text-gray-900`}>
                    {university.shortName} - Subject Rankings
                  </h3>
                  <div className="space-y-2">
                    {subjectRankings.map((ranking, idx) => (
                      <div key={idx} className="flex justify-between text-sm">
                        <span className="text-gray-600">{ranking.subject}:</span>
                        <span className="font-semibold text-blue-600">{ranking.rank}</span>
                      </div>
                    ))}
                  </div>
                  <Link
                    to={`/universities/${university.slug}`}
                    className="text-blue-600 text-sm font-semibold mt-3 inline-block"
                  >
                    View All Rankings →
                  </Link>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Why NIRF Rankings Matter */}
        <section className="mb-8 sm:mb-12 bg-white border border-gray-200 rounded-xl p-6 sm:p-8">
          <h2 className={`${typography.sectionTitle} mb-6 text-gray-900`}>Why NIRF Rankings Matter</h2>
          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ${spacing.gap}`}>
            <Card variant="feature" hoverTextColor="group-hover:text-blue-600">
              <div className="text-4xl mb-4" aria-hidden="true">🎓</div>
              <h3 className={`${typography.bodySmall} font-bold mb-3 text-gray-900`}>Quality Indicator</h3>
              <p className={typography.body}>
                Higher NIRF rankings indicate better quality education, infrastructure, faculty, and academic standards.
              </p>
            </Card>
            <Card variant="feature" hoverTextColor="group-hover:text-green-600">
              <div className="text-4xl mb-4" aria-hidden="true">💼</div>
              <h3 className={`${typography.bodySmall} font-bold mb-3 text-gray-900`}>Placement Opportunities</h3>
              <p className={typography.body}>
                Top-ranked universities attract better recruiters and offer higher placement packages.
              </p>
            </Card>
            <Card variant="feature" hoverTextColor="group-hover:text-purple-600">
              <div className="text-4xl mb-4" aria-hidden="true">🌍</div>
              <h3 className={`${typography.bodySmall} font-bold mb-3 text-gray-900`}>Global Recognition</h3>
              <p className={typography.body}>
                NIRF rankings help international students identify quality institutions in India.
              </p>
            </Card>
            <Card variant="feature" hoverTextColor="group-hover:text-orange-600">
              <div className="text-4xl mb-4" aria-hidden="true">🔬</div>
              <h3 className={`${typography.bodySmall} font-bold mb-3 text-gray-900`}>Research Quality</h3>
              <p className={typography.body}>
                Rankings reflect research output, publications, and industry collaborations.
              </p>
            </Card>
            <Card variant="feature" hoverTextColor="group-hover:text-teal-600">
              <div className="text-4xl mb-4" aria-hidden="true">📈</div>
              <h3 className={`${typography.bodySmall} font-bold mb-3 text-gray-900`}>Career Growth</h3>
              <p className={typography.body}>
                Degrees from highly-ranked universities open doors to better career opportunities.
              </p>
            </Card>
            <Card variant="feature" hoverTextColor="group-hover:text-indigo-600">
              <div className="text-4xl mb-4" aria-hidden="true">✅</div>
              <h3 className={`${typography.bodySmall} font-bold mb-3 text-gray-900`}>Government Recognition</h3>
              <p className={typography.body}>
                Official rankings by Ministry of Education ensure credibility and transparency.
              </p>
            </Card>
          </div>
        </section>

        {/* NIRF vs NAAC */}
        <section className="mb-8 sm:mb-12 bg-gradient-to-br from-green-50 to-blue-50 border border-green-200 rounded-xl p-6 sm:p-8">
          <h2 className={`${typography.sectionTitle} mb-6 text-gray-900`}>NIRF Ranking vs NAAC Accreditation</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className={`${typography.cardTitle} mb-4 text-gray-900`}>NIRF Ranking</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Published annually by Ministry of Education</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Ranks universities based on performance metrics</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Shows relative position (1st, 2nd, 101-150, etc.)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Changes yearly based on performance</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Helps compare universities</span>
                </li>
              </ul>
            </div>
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className={`${typography.cardTitle} mb-4 text-gray-900`}>NAAC Accreditation</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  <span>Accreditation by National Assessment and Accreditation Council</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  <span>Grades universities (A++, A+, A, B++, B+, B, C)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  <span>Valid for 5 years</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  <span>Confirms quality standards and infrastructure</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  <span>All featured universities have NAAC A+</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-6 bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
            <p className={typography.body}>
              <strong>💡 Important:</strong> Both NIRF rankings and NAAC accreditation are important. 
              NIRF shows current performance and helps compare universities, while NAAC confirms quality standards. 
              All featured universities have excellent NIRF rankings (32-201-250) and NAAC A+ accreditation, 
              ensuring quality education and global recognition.
            </p>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-8 sm:mb-12">
          <FAQSection faqs={faqs} title="Frequently Asked Questions about NIRF Rankings" />
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white rounded-xl p-8 sm:p-12 text-center shadow-large relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
          <div className="relative z-10">
            <h2 className={`${typography.sectionTitle} mb-4 sm:mb-6`}>Ready to Choose Your University?</h2>
            <p className={`${typography.bodyLarge} mb-6 sm:mb-8 text-blue-50 max-w-2xl mx-auto`}>
              Compare universities, check detailed rankings, fees, scholarships, and programs. 
              Get free counseling and expert guidance for your study abroad journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/universities"
                className="bg-white text-blue-600 px-6 sm:px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors min-h-[44px] flex items-center justify-center text-sm sm:text-base shadow-md"
              >
                Compare All Universities
              </Link>
              <Link
                to="/apply"
                className="bg-blue-700 text-white px-6 sm:px-8 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors border-2 border-white min-h-[44px] flex items-center justify-center text-sm sm:text-base"
              >
                Apply Now - Free Consultation
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
