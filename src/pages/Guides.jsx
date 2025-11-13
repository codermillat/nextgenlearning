import { Link } from 'react-router-dom';
import SEOHead from '../components/SEO/SEOHead';
import StructuredData from '../components/SEO/StructuredData';
import Breadcrumbs from '../components/Common/Breadcrumbs';
import { generateBreadcrumbSchema, generateArticleSchema } from '../components/SEO/StructuredData';

export default function Guides() {
  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Guides & Resources', url: '/guides' }
  ];

  const guides = [
    {
      title: 'Complete Guide to Study in India from Bangladesh 2025-26',
      slug: 'complete-guide-study-india-bangladesh',
      description: 'Everything you need to know about studying in India as a Bangladeshi student. Admission process, visa requirements, fees, scholarships, and more.',
      category: 'Admission Guide',
      readTime: '15 min read',
      date: '2025-01-15'
    },
    {
      title: 'How to Apply for Indian Universities: Step-by-Step Process',
      slug: 'how-to-apply-indian-universities',
      description: 'Detailed step-by-step guide on applying to Indian universities. Documents required, application deadlines, and tips for success.',
      category: 'Application Process',
      readTime: '12 min read',
      date: '2025-01-14'
    },
    {
      title: 'Scholarships for Bangladeshi Students in India 2025-26',
      slug: 'scholarships-bangladeshi-students-india',
      description: 'Complete list of scholarships available for Bangladeshi students in Indian universities. Eligibility criteria, application process, and tips.',
      category: 'Scholarships',
      readTime: '10 min read',
      date: '2025-01-13'
    },
    {
      title: 'Visa Process for Studying in India from Bangladesh',
      slug: 'visa-process-india-bangladesh',
      description: 'Complete guide to student visa application for India. Required documents, processing time, fees, and common mistakes to avoid.',
      category: 'Visa Guide',
      readTime: '8 min read',
      date: '2025-01-12'
    },
    {
      title: 'Top 10 B.Tech Programs in India for Bangladeshi Students',
      slug: 'top-10-btech-programs-india',
      description: 'Best B.Tech programs in India ranked by placement, fees, and rankings. Compare CSE, ECE, Mechanical, and more.',
      category: 'Course Guide',
      readTime: '12 min read',
      date: '2025-01-11'
    },
    {
      title: 'MBA in India: Complete Guide for Bangladeshi Students',
      slug: 'mba-india-bangladeshi-students',
      description: 'Everything about MBA programs in India. Top universities, specializations, fees, placements, and career opportunities.',
      category: 'Course Guide',
      readTime: '14 min read',
      date: '2025-01-10'
    },
    {
      title: 'Cost of Living in India for Bangladeshi Students',
      slug: 'cost-living-india-bangladeshi-students',
      description: 'Detailed breakdown of living expenses in India. Accommodation, food, transportation, and other costs for students.',
      category: 'Financial Guide',
      readTime: '10 min read',
      date: '2025-01-09'
    },
    {
      title: 'NAAC A+ Universities in India: Why It Matters',
      slug: 'naac-a-plus-universities-india',
      description: 'Understanding NAAC accreditation and why it matters. List of NAAC A+ universities and their benefits for students.',
      category: 'University Guide',
      readTime: '8 min read',
      date: '2025-01-08'
    }
  ];

  const articleSchema = generateArticleSchema({
    title: 'Study in India Guides & Resources for Bangladeshi Students',
    description: 'Comprehensive guides and resources for Bangladeshi students planning to study in India. Admission, visa, scholarships, and more.',
    author: 'Western Bangla Education',
    datePublished: '2025-01-15',
    url: '/guides'
  });

  return (
    <>
      <SEOHead
        title="Study in India Guides & Resources 2025-26 - Complete Guides for Bangladeshi Students | WBE"
        description="Comprehensive guides and resources for Bangladeshi students studying in India. Admission process, visa requirements, scholarships, course selection, and more. Free guides by Western Bangla Education."
        keywords={[
          'study in India guide',
          'Bangladeshi students India guide',
          'admission process India',
          'visa process India Bangladesh',
          'scholarships India guide',
          'B.Tech India guide',
          'MBA India guide',
          'cost of living India',
          'NAAC universities guide',
          'WBE guides',
          'Western Bangla Education resources'
        ]}
        url="/guides"
        canonical="/guides"
        type="article"
      />
      {articleSchema && <StructuredData data={articleSchema} />}
      {generateBreadcrumbSchema(breadcrumbs) && <StructuredData data={generateBreadcrumbSchema(breadcrumbs)} />}
      <Breadcrumbs items={breadcrumbs} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 overflow-x-hidden">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Study in India Guides & Resources</h1>
          <p className="text-lg text-gray-600">
            Comprehensive guides and resources to help Bangladeshi students make informed decisions about studying in India.
          </p>
        </header>

        {/* Categories */}
        <div className="mb-8 flex flex-wrap gap-2">
          <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">All Guides</span>
          <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm">Admission Guide</span>
          <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm">Visa Guide</span>
          <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm">Scholarships</span>
          <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm">Course Guide</span>
          <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm">Financial Guide</span>
        </div>

        {/* Guides Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {guides.map((guide) => (
            <article key={guide.slug} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide">{guide.category}</span>
                  <span className="text-xs text-gray-500">{guide.readTime}</span>
                </div>
                <h2 className="text-xl font-bold mb-3 line-clamp-2">
                  <Link to={`/guides/${guide.slug}`} className="hover:text-blue-600 transition-colors">
                    {guide.title}
                  </Link>
                </h2>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{guide.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">{new Date(guide.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  <Link
                    to={`/guides/${guide.slug}`}
                    className="text-blue-600 hover:text-blue-800 font-semibold text-sm"
                  >
                    Read More →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Quick Links */}
        <section className="bg-blue-50 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4">Quick Links</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link to="/courses" className="flex items-center p-4 bg-white rounded-lg hover:shadow-md transition-shadow">
              <span className="text-2xl mr-4">📚</span>
              <div>
                <h3 className="font-semibold">Browse All Courses</h3>
                <p className="text-sm text-gray-600">657+ courses across top universities</p>
              </div>
            </Link>
            <Link to="/universities" className="flex items-center p-4 bg-white rounded-lg hover:shadow-md transition-shadow">
              <span className="text-2xl mr-4">🏛️</span>
              <div>
                <h3 className="font-semibold">View Universities</h3>
                <p className="text-sm text-gray-600">Compare top-ranked universities</p>
              </div>
            </Link>
            <Link to="/scholarships" className="flex items-center p-4 bg-white rounded-lg hover:shadow-md transition-shadow">
              <span className="text-2xl mr-4">💰</span>
              <div>
                <h3 className="font-semibold">Scholarship Information</h3>
                <p className="text-sm text-gray-600">Find available scholarships</p>
              </div>
            </Link>
            <Link to="/apply" className="flex items-center p-4 bg-white rounded-lg hover:shadow-md transition-shadow">
              <span className="text-2xl mr-4">✍️</span>
              <div>
                <h3 className="font-semibold">Apply Now</h3>
                <p className="text-sm text-gray-600">Free counseling and application support</p>
              </div>
            </Link>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-blue-600 text-white rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Need Personalized Guidance?</h2>
          <p className="text-lg mb-6 text-blue-100">
            Get free counseling from Western Bangla Education. We help you choose the right university and course.
          </p>
          <Link
            to="/apply"
            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
          >
            Get Free Counseling
          </Link>
        </section>
      </div>
    </>
  );
}

