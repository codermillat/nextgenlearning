import { Link } from 'react-router-dom';
import { useState } from 'react';
import SEOHead from '../components/SEO/SEOHead';
import StructuredData from '../components/SEO/StructuredData';
import Breadcrumbs from '../components/Common/Breadcrumbs';
import { generateBreadcrumbSchema, generateArticleSchema } from '../components/SEO/StructuredData';
import { redirectToWhatsApp } from '../utils/whatsappRedirect';
import { trackWhatsAppClick } from '../utils/analytics';

export default function Guides() {
  const [activeCategory, setActiveCategory] = useState('All Guides');
  
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
    title: 'Tech & IT Education Guides & Resources for Students',
    description: 'Comprehensive guides and resources for students planning to study tech and IT in India. Admission, visa, scholarships, course selection, and more.',
    author: 'NextGen Learning',
    datePublished: '2025-01-15',
    url: '/guides'
  });

  // Filter guides by category
  const filteredGuides = activeCategory === 'All Guides' 
    ? guides 
    : guides.filter(guide => guide.category === activeCategory || guide.category.includes(activeCategory));

  const categories = ['All Guides', 'Admission Guide', 'Visa Guide', 'Scholarships', 'Course Guide', 'Financial Guide'];

  const handleWhatsAppClick = () => {
    trackWhatsAppClick('guides_page', 'WBE Application Assistance', '');
    const message = `Hello WBE Team,

I'm interested in applying to study tech/IT courses in India. Please help me with:
- University selection
- Application process
- Document requirements
- Scholarship opportunities

I'm ready to send my documents and basic information.

Thank you!`;
    redirectToWhatsApp(message, 'guides_page', '', '');
  };

  return (
    <>
      <SEOHead
        title="Tech & IT Education Guides & Resources 2025-26 - Complete Guides for Students | NextGen Learning"
        description="Comprehensive guides and resources for students studying tech and IT in India. Admission process, visa requirements, scholarships, course selection, and more. Free guides by NextGen Learning. Apply directly via WhatsApp - send documents and basic information for free assistance."
        keywords={[
          'tech education guide',
          'IT courses guide India',
          'computer science guide',
          'B.Tech guide India',
          'admission process India',
          'visa process India',
          'scholarships tech courses',
          'data science guide',
          'AI ML guide',
          'cybersecurity guide',
          'cloud computing guide',
          'NextGen Learning guides',
          'tech education resources'
        ]}
        url="/guides"
        canonical="/guides"
        type="article"
      />
      {articleSchema && <StructuredData data={articleSchema} />}
      {generateBreadcrumbSchema(breadcrumbs) && <StructuredData data={generateBreadcrumbSchema(breadcrumbs)} />}
      <Breadcrumbs items={breadcrumbs} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 md:py-8 overflow-x-hidden">
        <header className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 leading-tight">Tech & IT Education Guides & Resources</h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-4">
            Comprehensive guides and resources to help students make informed decisions about studying tech and IT courses in India.
          </p>
          
          {/* Important Notice */}
          <div className="bg-green-50 border-l-4 border-green-500 p-3 sm:p-4 rounded mb-4">
            <p className="text-sm sm:text-base text-gray-800">
              <strong>📱 Free Application Assistance:</strong> To apply to any university, directly message WBE (Western Bangla Education) on WhatsApp. 
              Send your documents and basic information - they will help you for free! 
              <button
                onClick={handleWhatsAppClick}
                className="ml-2 text-green-600 hover:text-green-800 font-semibold underline"
              >
                Click here to message WBE →
              </button>
            </p>
          </div>
        </header>

        {/* Categories */}
        <div className="mb-6 sm:mb-8 flex flex-wrap gap-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap min-h-[44px] transition-colors ${
                activeCategory === category
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Guides Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
          {filteredGuides.length > 0 ? (
            filteredGuides.map((guide) => (
              <article key={guide.slug} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-4 sm:p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide">{guide.category}</span>
                    <span className="text-xs text-gray-500">{guide.readTime}</span>
                  </div>
                  <h2 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 line-clamp-2">
                    <Link to={`/guides/${guide.slug}`} className="hover:text-blue-600 transition-colors">
                      {guide.title}
                    </Link>
                  </h2>
                  <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-3">{guide.description}</p>
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <span className="text-xs text-gray-500">{new Date(guide.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    <Link
                      to={`/guides/${guide.slug}`}
                      className="text-blue-600 hover:text-blue-800 font-semibold text-xs sm:text-sm min-h-[44px] flex items-center"
                    >
                      Read More →
                    </Link>
                  </div>
                </div>
              </article>
            ))
          ) : (
            <div className="col-span-full text-center py-8">
              <p className="text-gray-600">No guides found in this category.</p>
            </div>
          )}
        </div>

        {/* Quick Links */}
        <section className="bg-blue-50 rounded-lg p-4 sm:p-6 md:p-8 mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Quick Links</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <Link to="/courses" className="flex items-center p-3 sm:p-4 bg-white rounded-lg hover:shadow-md transition-shadow min-h-[80px]">
              <span className="text-2xl sm:text-3xl mr-3 sm:mr-4 flex-shrink-0">📚</span>
              <div>
                <h3 className="font-semibold text-sm sm:text-base">Browse All Courses</h3>
                <p className="text-xs sm:text-sm text-gray-600">Tech & IT courses across top universities</p>
              </div>
            </Link>
            <Link to="/universities" className="flex items-center p-3 sm:p-4 bg-white rounded-lg hover:shadow-md transition-shadow min-h-[80px]">
              <span className="text-2xl sm:text-3xl mr-3 sm:mr-4 flex-shrink-0">🏛️</span>
              <div>
                <h3 className="font-semibold text-sm sm:text-base">View Universities</h3>
                <p className="text-xs sm:text-sm text-gray-600">Compare top-ranked universities</p>
              </div>
            </Link>
            <Link to="/scholarships" className="flex items-center p-3 sm:p-4 bg-white rounded-lg hover:shadow-md transition-shadow min-h-[80px]">
              <span className="text-2xl sm:text-3xl mr-3 sm:mr-4 flex-shrink-0">💰</span>
              <div>
                <h3 className="font-semibold text-sm sm:text-base">Scholarship Information</h3>
                <p className="text-xs sm:text-sm text-gray-600">Find available scholarships</p>
              </div>
            </Link>
            <Link to="/compare" className="flex items-center p-3 sm:p-4 bg-white rounded-lg hover:shadow-md transition-shadow min-h-[80px]">
              <span className="text-2xl sm:text-3xl mr-3 sm:mr-4 flex-shrink-0">⚖️</span>
              <div>
                <h3 className="font-semibold text-sm sm:text-base">Compare Courses</h3>
                <p className="text-xs sm:text-sm text-gray-600">Side-by-side comparison tool</p>
              </div>
            </Link>
          </div>
        </section>

        {/* Application Assistance CTA */}
        <section className="bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg p-4 sm:p-6 md:p-8 text-center mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4">Ready to Apply? Get Free Assistance!</h2>
          <p className="text-sm sm:text-base md:text-lg mb-4 sm:mb-6 text-green-100">
            To apply to any university, directly message WBE (Western Bangla Education) on WhatsApp. 
            Send your documents and basic information - they will help you for free!
          </p>
          <div className="space-y-3 sm:space-y-4">
            <button
              onClick={handleWhatsAppClick}
              className="w-full sm:w-auto bg-white text-green-600 px-6 sm:px-8 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors min-h-[44px] text-sm sm:text-base shadow-lg"
            >
              📱 Message WBE on WhatsApp - Free Application Help
            </button>
            <p className="text-xs sm:text-sm text-green-100">
              WhatsApp: +8801611533385 | All services are completely free
            </p>
          </div>
        </section>

        {/* Additional CTA */}
        <section className="bg-blue-600 text-white rounded-lg p-4 sm:p-6 md:p-8 text-center">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4">Need More Information?</h2>
          <p className="text-sm sm:text-base md:text-lg mb-4 sm:mb-6 text-blue-100">
            Browse our comprehensive guides or contact us for personalized guidance on tech and IT courses.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link
              to="/courses"
              className="bg-white text-blue-600 px-6 sm:px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors min-h-[44px] flex items-center justify-center text-sm sm:text-base shadow-md"
            >
              Browse Tech Courses
            </Link>
            <Link
              to="/contact"
              className="bg-blue-700 text-white px-6 sm:px-8 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors border-2 border-white min-h-[44px] flex items-center justify-center text-sm sm:text-base"
            >
              Contact Us
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}

