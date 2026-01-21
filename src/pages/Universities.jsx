import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import SEOHead from '../components/SEO/SEOHead';
import StructuredData from '../components/SEO/StructuredData';
import Breadcrumbs from '../components/Common/Breadcrumbs';
import FAQSection from '../components/SEO/FAQSection';
import Button from '../components/Common/Button';
import Card from '../components/Common/Card';
import { SkeletonUniversityCard } from '../components/Common/Skeleton';
import { generateBreadcrumbSchema } from '../components/SEO/StructuredData';
import { typography, spacing } from '../utils/designTokens';

export default function Universities() {
  const { universities, loading } = useData();

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Universities', url: '/universities' }
  ];

  // Generate structured data for universities list
  const universitiesListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Top Indian Universities for Bangladeshi Students",
    "description": "Comprehensive list of top-ranked Indian universities offering courses for Bangladeshi students. Compare NIRF rankings, NAAC accreditation, fees, and programs.",
    "itemListElement": universities.map((university, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "EducationalOrganization",
        "name": university.name,
        "alternateName": university.shortName,
        "url": `https://www.nextgenlearning.dev/universities/${university.slug}`,
        "address": {
          "@type": "PostalAddress",
          "addressLocality": university.location?.split(',')[0] || "",
          "addressRegion": university.location?.split(',')[1] || "",
          "addressCountry": "IN"
        }
      }
    }))
  };

  // FAQ data for universities page
  const faqs = [
    {
      question: "Which Indian universities are best for Bangladeshi students?",
      answer: "Top Indian universities for Bangladeshi students include Chandigarh University (NIRF 2025: 32nd Overall, NAAC A+), Sharda University (NIRF 2025: 101-150, NAAC A+), Galgotias University (NIRF 2025: 101-150, NAAC A+), and Noida International University (NIRF 2025: 201-250, NAAC A+). All these universities offer generous scholarships (20-60%) and have excellent infrastructure, industry partnerships, and placement records."
    },
    {
      question: "What is NIRF ranking and why is it important?",
      answer: "NIRF (National Institutional Ranking Framework) is the official ranking system for Indian universities by the Ministry of Education. Rankings range from 1-200+ and indicate overall quality, teaching, research, and industry engagement. Higher rankings generally mean better infrastructure, faculty, placements, and recognition. Our featured universities have excellent NIRF 2025 rankings: Chandigarh University (32nd), Sharda University (101-150), Galgotias University (101-150), and Noida International University (201-250), all indicating quality education."
    },
    {
      question: "What is NAAC accreditation and what do the grades mean?",
      answer: "NAAC (National Assessment and Accreditation Council) accredits Indian universities based on quality parameters. Grades range from A++ (highest) to C. A+ and A grades indicate excellent quality education, infrastructure, and academic standards. All universities on this page have NAAC A+ or A accreditation, ensuring quality education and recognition."
    },
    {
      question: "How many programs do these universities offer?",
      answer: "These top Indian universities offer a wide range of programs: Sharda University offers 163+ programs, Noida International University offers 102+ programs, Chandigarh University offers 154+ programs, and Galgotias University offers 238+ programs. Programs span Engineering, Business, Computer Science, Health Sciences, Arts, Law, and more, giving Bangladeshi students diverse options."
    },
    {
      question: "What scholarships are available for Bangladeshi students?",
      answer: "Bangladeshi students can avail generous scholarships: NIU offers 50% flat scholarship, Sharda offers 20-50% based on GPA, Chandigarh University offers 35-50% based on GPA, and Galgotias offers 50-60% based on program type. Scholarships are automatically applied and renewable annually. Visit individual university pages for detailed scholarship information."
    },
    {
      question: "How do I compare universities?",
      answer: "Use our comparison tool to compare universities side-by-side. Consider factors like NIRF ranking, NAAC accreditation, program availability, fees (with scholarships), location, infrastructure, industry partnerships, and placement records. Each university page provides detailed information to help you make an informed decision."
    },
    {
      question: "Can I apply to multiple universities?",
      answer: "Yes, you can apply to multiple universities. We recommend applying to 2-3 universities based on your preferences, program availability, and budget. Western Bangla Education (WBE) provides free counseling to help you choose the best universities and programs for your career goals."
    },
    {
      question: "What is the admission process for Bangladeshi students?",
      answer: "The admission process typically includes: submitting academic documents (SSC/HSC transcripts), filling application forms, paying application fees, and obtaining student visa. Western Bangla Education (WBE) provides free assistance with the entire process including document verification, visa application, and admission support. Contact WBE via WhatsApp at +8801611533385 for free counseling."
    }
  ];

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" aria-live="polite" aria-busy="true">
        <span className="sr-only">Loading universities...</span>
        {/* Skeleton header */}
        <div className="mb-8">
          <div className="animate-pulse bg-gray-200 h-10 w-2/3 rounded mb-4" />
          <div className="animate-pulse bg-gray-200 h-5 w-full rounded mb-2" />
          <div className="animate-pulse bg-gray-200 h-5 w-3/4 rounded" />
        </div>
        {/* Skeleton cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <SkeletonUniversityCard key={i} />
          ))}
        </div>
      </div>
    );
  }

  const totalPrograms = universities.reduce((sum, uni) => sum + (uni.programs?.length || 0), 0);

  return (
    <>
      <SEOHead
        title="Top Universities 2025 | NIRF Rankings, Fees & Scholarships"
        description={`Compare ${universities.length} NIRF ranked universities 2025: Chandigarh University (NIRF 32), Galgotias University (NIRF 101-150), Sharda University (NIRF 101-150), Noida International University (NIU 201-250). All NAAC A+ accredited with ${totalPrograms}+ programs. B.Tech CSE fees: ₹2-8 lakh/year after 20-60% scholarship. Check university rankings, placements (avg ₹5-8 LPA), course comparison. Free counseling for Bangladeshi students.`}
        keywords={[
          'galgotias university nirf ranking',
          'galgotias university nirf ranking 2025',
          'nirf ranking galgotias university',
          'sharda university nirf ranking',
          'sharda university nirf ranking 2025',
          'nirf ranking sharda university',
          'sharda university nirf 2025',
          'sharda university nirf 2024',
          'chandigarh university nirf ranking',
          'noida international university rankings',
          'noida international university nirf ranking',
          'noida international university ranking nirf',
          'noida international university ranking in india',
          'galgotias university naac grade',
          'sharda university naac grade',
          'chandigarh university naac accreditation',
          'NIRF ranking universities India 2025',
          'NAAC A+ universities India',
          'best universities for Bangladeshi students',
          'study in India from Bangladesh',
          'Indian universities ranking 2025',
          'top private universities India',
          'university fees comparison India',
          'scholarship for Bangladeshi students in India'
        ]}
        url="/universities"
        canonical="/universities"
      />
      {generateBreadcrumbSchema(breadcrumbs) && <StructuredData data={generateBreadcrumbSchema(breadcrumbs)} />}
      {universitiesListSchema && <StructuredData data={universitiesListSchema} />}
      {/* FAQ schema is generated by FAQSection component below */}
      <Breadcrumbs items={breadcrumbs} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* SEO-Optimized Header */}
        <header className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            Top Indian Universities for Bangladeshi Students 2025-26
          </h1>
          <p className="text-base sm:text-lg text-gray-700 mb-4 leading-relaxed">
            Compare {universities.length} top-ranked Indian universities offering {totalPrograms}+ programs for Bangladeshi students. 
            Featured universities include Chandigarh University (NIRF 2025: 32nd), Sharda University (NIRF 2025: 101-150), 
            Galgotias University (NIRF 2025: 101-150), and Noida International University (NIRF 2025: 201-250). All have NAAC A+ accreditation 
            and offer generous scholarships ranging from 20% to 60% for Bangladeshi students. Compare rankings, fees, placements, infrastructure, 
            and find the perfect university for your higher education journey in India.
          </p>
          <p className="text-sm text-gray-600 mb-4">
            <strong>Why Choose These Universities?</strong> All featured universities are recognized by UGC, have excellent infrastructure, 
            strong industry partnerships, high placement rates, and offer comprehensive support for international students including 
            accommodation assistance, visa support, and cultural integration programs.
          </p>
        </header>

        {/* Key Statistics */}
        <section className="mb-8 sm:mb-12 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6 sm:p-8 shadow-soft">
          <h2 className="text-xl sm:text-2xl font-bold mb-6 text-gray-900">Quick Statistics</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            <div className="text-center bg-white rounded-lg p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-3xl sm:text-4xl font-bold text-blue-600 mb-2">{universities.length}</div>
              <div className="text-sm text-gray-600 font-medium">Universities</div>
            </div>
            <div className="text-center bg-white rounded-lg p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-3xl sm:text-4xl font-bold text-green-600 mb-2">{totalPrograms}+</div>
              <div className="text-sm text-gray-600 font-medium">Programs</div>
            </div>
            <div className="text-center bg-white rounded-lg p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-3xl sm:text-4xl font-bold text-purple-600 mb-2">20-60%</div>
              <div className="text-sm text-gray-600 font-medium">Scholarships</div>
            </div>
            <div className="text-center bg-white rounded-lg p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-3xl sm:text-4xl font-bold text-orange-600 mb-2">32-250</div>
              <div className="text-sm text-gray-600 font-medium">NIRF 2025 Ranking</div>
            </div>
          </div>
        </section>

        {/* NIRF Rankings & Fees Detailed Section - SEO Optimized */}
        <section className="mb-8 sm:mb-12 bg-white border border-gray-200 rounded-xl p-6 sm:p-8">
          <h2 className={`${typography.sectionTitle} mb-6 text-gray-900`}>NIRF Ranking 2025 & B.Tech CSE Fees - Complete Comparison</h2>
          
          <div className="space-y-6 mb-8">
            <div>
              <h3 className={`${typography.cardTitle} mb-3 text-gray-900`}>Galgotias University NIRF Ranking 2025</h3>
              <p className={`${typography.body} mb-3`}>
                <strong>NIRF Ranking:</strong> Galgotias University ranks 101-150 in NIRF 2025 overall rankings, making it one of the top private universities in India. 
                The university also ranks 36th in Law, 55th in Pharmacy, and is in the Top 50 for Innovation. 
                <Link to="/universities/galgotias-university" className="text-blue-600 font-semibold hover:underline ml-1">View complete Galgotias University details →</Link>
              </p>
              <p className={`${typography.body} mb-3`}>
                <strong>B.Tech CSE Fees:</strong> Galgotias University B.Tech CSE total fees for 4 years is approximately ₹14-16 lakh (after 50-60% scholarship for Bangladeshi students). 
                Annual fee is around ₹3.5 lakh per year. The university offers generous scholarships based on program type and academic performance.
              </p>
              <p className={`${typography.body}`}>
                <strong>NAAC Accreditation:</strong> Galgotias University has NAAC A+ accreditation with a score of 3.37/4, making it the only private university in Uttar Pradesh with A+ in the first cycle.
              </p>
            </div>

            <div>
              <h3 className={`${typography.cardTitle} mb-3 text-gray-900`}>Sharda University NIRF Ranking 2025</h3>
              <p className={`${typography.body} mb-3`}>
                <strong>NIRF Ranking:</strong> Sharda University ranks 101-150 in NIRF 2025 overall rankings. The university has shown consistent improvement in rankings and is recognized for quality education and industry partnerships.
                <Link to="/universities/sharda-university" className="text-blue-600 font-semibold hover:underline ml-1">View complete Sharda University details →</Link>
              </p>
              <p className={`${typography.body} mb-3`}>
                <strong>B.Tech CSE Fees:</strong> Sharda University B.Tech CSE total fees for 4 years is approximately ₹12-15 lakh (after 20-50% GPA-based scholarship). 
                Annual fee is around ₹3 lakh per year. Scholarships are automatically applied based on HSC/SSC GPA: up to 50% for GPA 3.5+, 30% for GPA 3.0-3.49, and 20% for GPA 3.0+.
              </p>
              <p className={`${typography.body}`}>
                <strong>NAAC Accreditation:</strong> Sharda University has NAAC A+ accreditation, ensuring quality education and global recognition of degrees.
              </p>
            </div>

            <div>
              <h3 className={`${typography.cardTitle} mb-3 text-gray-900`}>Chandigarh University NIRF Ranking 2025</h3>
              <p className={`${typography.body} mb-3`}>
                <strong>NIRF Ranking:</strong> Chandigarh University ranks 32nd in NIRF 2025 overall rankings, making it one of the top-ranked private universities in India. 
                This exceptional ranking reflects the university's commitment to excellence in teaching, research, and industry engagement.
                <Link to="/universities/chandigarh-university" className="text-blue-600 font-semibold hover:underline ml-1">View complete Chandigarh University details →</Link>
              </p>
              <p className={`${typography.body} mb-3`}>
                <strong>B.Tech CSE Fees:</strong> Chandigarh University B.Tech CSE total fees for 4 years is approximately ₹12-16 lakh (after 35-50% GPA-based scholarship). 
                Annual fee ranges from ₹3-4 lakh per year depending on specialization. The university offers competitive scholarships for Bangladeshi students.
              </p>
              <p className={`${typography.body}`}>
                <strong>NAAC Accreditation:</strong> Chandigarh University has NAAC A+ accreditation, confirming its status as a premier educational institution.
              </p>
            </div>

            <div>
              <h3 className={`${typography.cardTitle} mb-3 text-gray-900`}>Noida International University (NIU) Rankings</h3>
              <p className={`${typography.body} mb-3`}>
                <strong>NIRF Ranking:</strong> Noida International University ranks 201-250 in NIRF 2025 overall rankings. The university is rapidly growing and offers excellent value with generous scholarships.
                <Link to="/universities/noida-international-university" className="text-blue-600 font-semibold hover:underline ml-1">View complete NIU details →</Link>
              </p>
              <p className={`${typography.body} mb-3`}>
                <strong>B.Tech CSE Fees:</strong> Noida International University B.Tech CSE total fees for 4 years is approximately ₹10-12 lakh (after 50% flat scholarship for all Bangladeshi students). 
                Annual fee is around ₹2.5 lakh per year. NIU offers the most generous flat scholarship - 50% off for all Bangladeshi students regardless of GPA.
              </p>
              <p className={`${typography.body}`}>
                <strong>NAAC Accreditation:</strong> Noida International University has NAAC A+ accreditation, ensuring quality education and recognition.
              </p>
            </div>
          </div>

          {/* Comparison Table */}
          <div className="overflow-x-auto mb-6">
            <table className="w-full border-collapse bg-white border border-gray-300 rounded-lg">
              <thead>
                <tr className="bg-blue-50">
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold">University</th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold">NIRF Ranking 2025</th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold">NAAC Grade</th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold">B.Tech CSE Annual Fee</th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold">B.Tech CSE Total Fees (4 Years)</th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Scholarship</th>
                </tr>
              </thead>
              <tbody>
                {universities.map((uni) => {
                  const btechCseFee = uni.id === 'niu' ? '₹2.5L/year' : uni.id === 'sharda' ? '₹3L/year' : uni.id === 'chandigarh' ? '₹3-4L/year' : '₹3.5L/year';
                  const totalFee = uni.id === 'niu' ? '₹10-12L' : uni.id === 'sharda' ? '₹12-15L' : uni.id === 'chandigarh' ? '₹12-16L' : '₹14-16L';
                  const scholarship = uni.id === 'niu' ? '50% Flat' : uni.id === 'sharda' ? '20-50%' : uni.id === 'chandigarh' ? '35-50%' : '50-60%';
                  return (
                    <tr key={uni.id} className="hover:bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3 font-semibold">
                        <Link to={`/universities/${uni.slug}`} className="text-blue-600 hover:underline">
                          {uni.shortName}
                        </Link>
                      </td>
                      <td className="border border-gray-300 px-4 py-3">{uni.profile?.rankings?.nirf || 'N/A'}</td>
                      <td className="border border-gray-300 px-4 py-3">{uni.profile?.rankings?.naac || 'A+'}</td>
                      <td className="border border-gray-300 px-4 py-3">{btechCseFee}</td>
                      <td className="border border-gray-300 px-4 py-3">{totalFee}</td>
                      <td className="border border-gray-300 px-4 py-3 text-green-600 font-semibold">{scholarship}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Quick Links to Rankings and Fees */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <Link
              to="/rankings"
              className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center">
                <div className="text-3xl mr-4">🏆</div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">View Complete NIRF Rankings</h3>
                  <p className="text-sm text-gray-600">Detailed NIRF ranking guide with all universities</p>
                </div>
              </div>
            </Link>
            <Link
              to="/fees-scholarships"
              className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center">
                <div className="text-3xl mr-4">💵</div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Complete Fees & Scholarships Guide</h3>
                  <p className="text-sm text-gray-600">Detailed fee breakdown and scholarship information</p>
                </div>
              </div>
            </Link>
          </div>
        </section>

        {/* Universities Grid */}
        <section className="mb-12">
          <h2 className={`${typography.sectionTitle} mb-6 sm:mb-8 text-gray-900`}>Featured Universities</h2>
          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 ${spacing.gapLarge}`}>
            {universities.map(university => (
              <Card
                key={university.id}
                to={`/universities/${university.slug}`}
                variant="default"
                hoverTextColor="group-hover:text-blue-600"
                className="group"
              >
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                      <span className="text-white font-bold text-lg">{university.shortName.charAt(0)}</span>
                    </div>
                    {university.profile?.rankings?.nirf && (
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-md text-xs font-semibold">
                        NIRF {university.profile.rankings.nirf}
                      </span>
                    )}
                  </div>
                  <h2 className={`${typography.cardTitle} mb-2 group-hover:text-blue-600 transition-colors`}>
                    {university.shortName}
                  </h2>
                  <p className={`${typography.caption} mb-3 leading-relaxed line-clamp-2`}>{university.name}</p>
                  <p className="text-xs text-gray-500 flex items-center">
                    <span className="mr-1">📍</span>
                    {university.location}
                  </p>
                </div>
                
                <div className="space-y-3 mb-6 pb-6 border-b border-gray-100">
                  {university.profile?.rankings?.naac && (
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">NAAC:</span>
                      <span className="font-semibold text-green-600 bg-green-50 px-2 py-1 rounded">{university.profile.rankings.naac}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">Programs:</span>
                    <span className="font-bold text-blue-600">{university.programs?.length || 0}+</span>
                  </div>
                  {university.established && (
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">Established:</span>
                      <span className="font-semibold text-gray-900">{university.established}</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-blue-600 font-semibold text-sm group-hover:text-blue-700 transition-colors flex items-center">
                    View Details
                    <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Comparison Section */}
        <section className="mb-12 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 sm:p-8 border border-blue-200 shadow-soft">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-900">Compare Universities</h2>
          <p className="text-gray-700 mb-6 leading-relaxed text-base sm:text-lg">
            Need help choosing between universities? Use our comparison tool to compare multiple universities side-by-side. 
            Compare fees, rankings, programs, scholarships, and more to make an informed decision.
          </p>
          <Button to="/compare" variant="primary" size="md">
            Compare Universities →
          </Button>
        </section>

        {/* Why Study in India Section */}
        <section className="mb-12">
          <h2 className={`${typography.sectionTitle} mb-6 sm:mb-8 text-gray-900`}>Why Study in India?</h2>
          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ${spacing.gapLarge}`}>
            <Card variant="feature" hoverTextColor="group-hover:text-blue-600">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform" aria-hidden="true">🏆</div>
              <h3 className={`${typography.bodySmall} font-bold mb-3 text-gray-900 group-hover:text-blue-600 transition-colors`}>World-Class Education</h3>
              <p className={`${typography.body} leading-relaxed`}>
                Indian universities are globally recognized with NIRF rankings and NAAC accreditation. Quality education at affordable costs.
              </p>
            </Card>
            <Card variant="feature" hoverTextColor="group-hover:text-green-600">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform" aria-hidden="true">💰</div>
              <h3 className={`${typography.bodySmall} font-bold mb-3 text-gray-900 group-hover:text-green-600 transition-colors`}>Generous Scholarships</h3>
              <p className={`${typography.body} leading-relaxed`}>
                Bangladeshi students can avail 20-60% scholarships on tuition fees. No separate scholarship application needed.
              </p>
            </Card>
            <Card variant="feature" hoverTextColor="group-hover:text-purple-600">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform" aria-hidden="true">🌍</div>
              <h3 className={`${typography.bodySmall} font-bold mb-3 text-gray-900 group-hover:text-purple-600 transition-colors`}>Cultural Similarity</h3>
              <p className={`${typography.body} leading-relaxed`}>
                Similar culture and language make adaptation easier. Strong Bangladeshi student communities on campuses.
              </p>
            </Card>
            <Card variant="feature" hoverTextColor="group-hover:text-blue-600">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform" aria-hidden="true">💼</div>
              <h3 className={`${typography.bodySmall} font-bold mb-3 text-gray-900 group-hover:text-blue-600 transition-colors`}>Excellent Placements</h3>
              <p className={`${typography.body} leading-relaxed`}>
                Top companies recruit from these universities. High placement rates with competitive salary packages.
              </p>
            </Card>
            <Card variant="feature" hoverTextColor="group-hover:text-indigo-600">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform" aria-hidden="true">🏢</div>
              <h3 className={`${typography.bodySmall} font-bold mb-3 text-gray-900 group-hover:text-indigo-600 transition-colors`}>Industry Partnerships</h3>
              <p className={`${typography.body} leading-relaxed`}>
                Strong ties with Microsoft, Oracle, TCS, IBM, and other leading companies. Industry-oriented curriculum.
              </p>
            </Card>
            <Card variant="feature" hoverTextColor="group-hover:text-teal-600">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform" aria-hidden="true">📍</div>
              <h3 className={`${typography.bodySmall} font-bold mb-3 text-gray-900 group-hover:text-teal-600 transition-colors`}>Proximity</h3>
              <p className={`${typography.body} leading-relaxed`}>
                Close to Bangladesh, making travel and communication convenient. Easy to visit home during breaks.
              </p>
            </Card>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-12">
          <FAQSection faqs={faqs} title="Frequently Asked Questions about Indian Universities" />
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white rounded-xl p-8 sm:p-12 text-center shadow-large relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
          <div className="relative z-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">Ready to Start Your Journey?</h2>
            <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 text-blue-50 max-w-2xl mx-auto">
              Get free counseling and application assistance from Western Bangla Education. 
              We'll help you choose the right university and guide you through the entire admission process.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button to="/apply" variant="white" size="md">
                Apply Now - Free Consultation
              </Button>
              <Button to="/courses" variant="secondary" size="md">
                Browse All Courses
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

