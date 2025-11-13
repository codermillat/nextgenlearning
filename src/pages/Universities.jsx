import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import SEOHead from '../components/SEO/SEOHead';
import StructuredData from '../components/SEO/StructuredData';
import Breadcrumbs from '../components/Common/Breadcrumbs';
import FAQSection from '../components/SEO/FAQSection';
import { generateBreadcrumbSchema } from '../components/SEO/StructuredData';

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
        "url": `https://nextgenlearning.dev/universities/${university.slug}`,
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
    return <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">Loading universities...</div>;
  }

  const totalPrograms = universities.reduce((sum, uni) => sum + (uni.programs?.length || 0), 0);

  return (
    <>
      <SEOHead
        title="Top Indian Universities for Bangladeshi Students 2025-26 - Compare Rankings, Fees & Programs | WBE"
        description={`Compare ${universities.length} top-ranked Indian universities for Bangladeshi students. View NIRF 2025 rankings: Chandigarh University (32nd), Sharda University (101-150), Galgotias University (101-150), NIU (201-250). All universities have NAAC A+ accreditation, ${totalPrograms}+ programs, fees with scholarships (20-60% off), placements, and facilities. Free counseling by Western Bangla Education.`}
        keywords={[
          'Indian universities for Bangladeshi students',
          'top Indian universities',
          'NIRF ranking universities',
          'NAAC accredited universities',
          'Sharda University',
          'Noida International University',
          'Chandigarh University',
          'Galgotias University',
          'study in India from Bangladesh',
          'best universities in India',
          'Indian universities ranking',
          'universities in India with scholarships',
          'Bangladeshi students India',
          'compare Indian universities',
          'university admission India',
          'Western Bangla Education',
          'WBE universities'
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
        <section className="mb-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Quick Statistics</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-blue-600">{universities.length}</div>
              <div className="text-sm text-gray-600 mt-1">Universities</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-blue-600">{totalPrograms}+</div>
              <div className="text-sm text-gray-600 mt-1">Programs</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-blue-600">20-60%</div>
              <div className="text-sm text-gray-600 mt-1">Scholarships</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-blue-600">32-250</div>
              <div className="text-sm text-gray-600 mt-1">NIRF 2025 Ranking</div>
            </div>
          </div>
        </section>

        {/* Universities Grid */}
        <section className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">Featured Universities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {universities.map(university => (
              <Link
                key={university.id}
                to={`/universities/${university.slug}`}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-blue-300 group"
              >
                <div className="mb-4">
                  <h2 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">
                    {university.shortName}
                  </h2>
                  <p className="text-gray-600 mb-3 text-sm leading-relaxed">{university.name}</p>
                  <p className="text-xs text-gray-500">{university.location}</p>
                </div>
                
                <div className="space-y-2 mb-4 pb-4 border-b border-gray-100">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">NIRF Rank:</span>
                    <span className="font-semibold text-gray-900">{university.profile?.rankings?.nirf || 'N/A'}</span>
                  </div>
                  {university.profile?.rankings?.naac && (
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">NAAC:</span>
                      <span className="font-semibold text-gray-900">{university.profile.rankings.naac}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">Programs:</span>
                    <span className="font-semibold text-blue-600">{university.programs?.length || 0}+</span>
                  </div>
                  {university.established && (
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">Established:</span>
                      <span className="font-semibold text-gray-900">{university.established}</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-blue-600 font-semibold text-sm group-hover:text-blue-700 transition-colors">
                    View Details →
                  </span>
                  <Link
                    to={`/universities/${university.slug}/courses`}
                    onClick={(e) => e.stopPropagation()}
                    className="text-xs text-gray-500 hover:text-blue-600 transition-colors"
                  >
                    View Courses
                  </Link>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Comparison Section */}
        <section className="mb-12 bg-gray-50 rounded-lg p-6 border border-gray-200">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Compare Universities</h2>
          <p className="text-gray-700 mb-6 leading-relaxed">
            Need help choosing between universities? Use our comparison tool to compare multiple universities side-by-side. 
            Compare fees, rankings, programs, scholarships, and more to make an informed decision.
          </p>
          <Link
            to="/compare"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors min-h-[44px]"
          >
            Compare Universities →
          </Link>
        </section>

        {/* Why Study in India Section */}
        <section className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">Why Study in India?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <h3 className="font-bold text-lg mb-2">🏆 World-Class Education</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Indian universities are globally recognized with NIRF rankings and NAAC accreditation. Quality education at affordable costs.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <h3 className="font-bold text-lg mb-2">💰 Generous Scholarships</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Bangladeshi students can avail 20-60% scholarships on tuition fees. No separate scholarship application needed.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <h3 className="font-bold text-lg mb-2">🌍 Cultural Similarity</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Similar culture and language make adaptation easier. Strong Bangladeshi student communities on campuses.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <h3 className="font-bold text-lg mb-2">💼 Excellent Placements</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Top companies recruit from these universities. High placement rates with competitive salary packages.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <h3 className="font-bold text-lg mb-2">🏢 Industry Partnerships</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Strong ties with Microsoft, Oracle, TCS, IBM, and other leading companies. Industry-oriented curriculum.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <h3 className="font-bold text-lg mb-2">📍 Proximity</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Close to Bangladesh, making travel and communication convenient. Easy to visit home during breaks.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-12">
          <FAQSection faqs={faqs} title="Frequently Asked Questions about Indian Universities" />
        </section>

        {/* CTA Section */}
        <section className="bg-blue-600 text-white rounded-lg p-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
          <p className="text-lg mb-6 text-blue-100">
            Get free counseling and application assistance from Western Bangla Education. 
            We'll help you choose the right university and guide you through the entire admission process.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/apply"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors min-h-[44px] flex items-center justify-center"
            >
              Apply Now - Free Consultation
            </Link>
            <Link
              to="/courses"
              className="bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors border-2 border-white min-h-[44px] flex items-center justify-center"
            >
              Browse All Courses
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}

