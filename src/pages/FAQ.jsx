import SEOHead from '../components/SEO/SEOHead';
import StructuredData from '../components/SEO/StructuredData';
import Breadcrumbs from '../components/Common/Breadcrumbs';
import FAQSection from '../components/SEO/FAQSection';
import { generateBreadcrumbSchema, generateFAQSchema } from '../components/SEO/StructuredData';
import { Link } from 'react-router-dom';

export default function FAQ() {
  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'FAQ', url: '/faq' }
  ];

  const faqs = [
    {
      question: 'How can I apply to study in India from Bangladesh?',
      answer: 'You can apply through Western Bangla Education (WBE) for free counseling and application assistance. We help you with the entire process including university selection, document preparation, application submission, and visa assistance. Click "Apply Now" on any course page to get started.'
    },
    {
      question: 'What are the admission requirements for Indian universities?',
      answer: 'Admission requirements vary by university and course. Generally, you need: (1) Completed higher secondary education (HSC) with minimum 50% marks, (2) Valid passport, (3) Academic transcripts and certificates, (4) English proficiency proof (if required), (5) Passport-size photographs. Some universities may require entrance exam scores. WBE provides detailed guidance for each university.'
    },
    {
      question: 'What scholarships are available for Bangladeshi students?',
      answer: 'Multiple scholarships are available: (1) NIU offers 50% flat scholarship to all Bangladeshi students, (2) Sharda University offers GPA-based scholarships (up to 50% for GPA 3.5+), (3) Chandigarh University offers merit-based scholarships, (4) Galgotias University provides various scholarship schemes. Check individual course pages for detailed scholarship information.'
    },
    {
      question: 'What is the total cost of studying in India including all fees?',
      answer: 'Total costs include: (1) Tuition fees (varies by university and course), (2) One-time admission fees (₹30,000-₹52,000), (3) Examination fees (₹5,000-₹10,000 per year), (4) Living expenses (₹30,000-₹50,000 per month), (5) Visa and travel costs. Use our fee calculator on course pages to see detailed year-wise breakdown with scholarships applied.'
    },
    {
      question: 'How long does the visa process take?',
      answer: 'Student visa processing typically takes 4-6 weeks after submitting all required documents. The process includes: (1) University admission letter, (2) Visa application submission, (3) Document verification, (4) Interview (if required), (5) Visa approval. WBE provides complete visa assistance and document preparation support.'
    },
    {
      question: 'Which universities are best for B.Tech in India?',
      answer: 'Top universities for B.Tech include: (1) Chandigarh University (NIRF 32, NAAC A+), (2) Sharda University (NIRF 101-150, NAAC A+), (3) Galgotias University (NIRF 101-150, NAAC A+), (4) Noida International University (NIRF 201-250, NAAC A+). All offer excellent placement records and modern facilities. Compare courses on our platform to find the best fit.'
    },
    {
      question: 'What is NAAC accreditation and why is it important?',
      answer: 'NAAC (National Assessment and Accreditation Council) is India\'s quality assurance body for higher education. NAAC A+ accreditation indicates excellent quality in teaching, infrastructure, research, and student support. All universities on our platform (Chandigarh, Sharda, Galgotias, NIU) have NAAC A+ accreditation, ensuring quality education and better career prospects.'
    },
    {
      question: 'Can I work part-time while studying in India?',
      answer: 'International students in India can work part-time on campus with university permission. Off-campus work requires special permission and is generally limited. However, internships during summer breaks are common and encouraged. Many universities have strong placement cells that help students secure internships and full-time jobs.'
    },
    {
      question: 'What documents do I need for the application?',
      answer: 'Required documents include: (1) Passport (valid for at least 6 months), (2) Academic transcripts (SSC and HSC), (3) Character certificate, (4) Medical fitness certificate, (5) Passport-size photographs, (6) Proof of financial support, (7) English proficiency certificate (if required). WBE helps you prepare and verify all documents.'
    },
    {
      question: 'How do I choose the right course and university?',
      answer: 'Consider these factors: (1) Your career goals and interests, (2) University ranking (NIRF) and accreditation (NAAC), (3) Total cost including scholarships, (4) Placement records and average salary, (5) Campus facilities and location, (6) Course curriculum and specializations. Use our comparison tool to compare multiple courses side-by-side. WBE provides free counseling to help you make the right choice.'
    },
    {
      question: 'Is there any entrance exam required?',
      answer: 'Entrance exam requirements vary by university and course. Some universities require JEE Main, JEE Advanced, or university-specific entrance exams for engineering programs. MBA programs may require CAT, MAT, or university-specific tests. Many universities also offer direct admission based on academic merit. Check individual course pages for specific requirements.'
    },
    {
      question: 'What is the difference between B.Tech and B.E.?',
      answer: 'B.Tech (Bachelor of Technology) and B.E. (Bachelor of Engineering) are essentially equivalent degrees in India. Both are 4-year undergraduate engineering programs. The main difference is in curriculum focus: B.Tech emphasizes practical application and technology, while B.E. focuses more on theoretical foundations. Both degrees are recognized equally by employers and for higher studies.'
    },
    {
      question: 'How can Western Bangla Education help me?',
      answer: 'WBE provides comprehensive support: (1) Free career counseling and course selection, (2) University and course comparison, (3) Application processing and document verification, (4) Scholarship guidance and application support, (5) Visa assistance and documentation, (6) Pre-departure orientation, (7) Ongoing support throughout your journey. All services are free for students.'
    }
  ];

  const faqSchema = generateFAQSchema(faqs);

  return (
    <>
      <SEOHead
        title="Frequently Asked Questions (FAQ) - Study in India from Bangladesh | WBE"
        description="Find answers to common questions about studying in India from Bangladesh. Admission process, visa requirements, scholarships, fees, universities, and more. Get expert answers from Western Bangla Education."
        keywords={[
          'study in India FAQ',
          'Bangladeshi students India questions',
          'admission India FAQ',
          'visa process India FAQ',
          'scholarships India FAQ',
          'Indian universities FAQ',
          'B.Tech India FAQ',
          'MBA India FAQ',
          'WBE FAQ',
          'study abroad Bangladesh FAQ'
        ]}
        url="/faq"
        canonical="/faq"
      />
      {faqSchema && <StructuredData data={faqSchema} />}
      {generateBreadcrumbSchema(breadcrumbs) && <StructuredData data={generateBreadcrumbSchema(breadcrumbs)} />}
      <Breadcrumbs items={breadcrumbs} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 overflow-x-hidden">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-lg text-gray-600">
            Find answers to common questions about studying in India from Bangladesh
          </p>
        </header>

        <FAQSection faqs={faqs} />

        {/* Additional Help Section */}
        <section className="mt-12 bg-blue-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4 text-center">Still Have Questions?</h2>
          <p className="text-center text-gray-700 mb-6">
            Our expert counselors are here to help you with personalized guidance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-center"
            >
              Contact Us
            </Link>
            <Link
              to="/apply"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors border-2 border-blue-600 text-center"
            >
              Get Free Counseling
            </Link>
          </div>
        </section>

        {/* Related Links */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Related Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link to="/guides" className="p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
              <h3 className="font-semibold mb-2">📚 Guides & Resources</h3>
              <p className="text-sm text-gray-600">Comprehensive guides for studying in India</p>
            </Link>
            <Link to="/scholarships" className="p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
              <h3 className="font-semibold mb-2">💰 Scholarships</h3>
              <p className="text-sm text-gray-600">Find available scholarships and eligibility</p>
            </Link>
            <Link to="/universities" className="p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
              <h3 className="font-semibold mb-2">🏛️ Universities</h3>
              <p className="text-sm text-gray-600">Compare top-ranked universities</p>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}

