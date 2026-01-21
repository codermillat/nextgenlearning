import { Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import SEOHead from '../components/SEO/SEOHead';
import StructuredData from '../components/SEO/StructuredData';
import { generateWebsiteSchema } from '../components/SEO/StructuredData';
import { useData } from '../context/DataContext';
import { trackEvent } from '../utils/analytics';

export default function NotFound() {
  const location = useLocation();
  const { universities } = useData();
  const websiteSchema = generateWebsiteSchema();

  // Track 404 errors
  useEffect(() => {
    trackEvent('404_error', 'Error', location.pathname, 1);
  }, [location.pathname]);

  // Popular links
  const popularLinks = [
    { name: 'All Tech Courses', url: '/courses', description: 'Browse 331+ tech and IT courses' },
    { name: 'Universities', url: '/universities', description: 'Explore top universities' },
    { name: 'Scholarships', url: '/scholarships', description: 'Find scholarship opportunities' },
    { name: 'Compare Courses', url: '/compare', description: 'Compare courses side-by-side' },
    { name: 'Program Categories', url: '/program-categories', description: 'Browse by category' },
    { name: 'Apply Now', url: '/apply', description: 'Get free counseling' }
  ];

  // Top universities
  const topUniversities = universities.slice(0, 4).map(uni => ({
    name: uni.name,
    url: `/universities/${uni.slug}`,
    shortName: uni.shortName
  }));

  return (
    <>
      <SEOHead
        title="404 - Page Not Found | NextGen Learning"
        description="The page you're looking for doesn't exist. Explore our tech and IT courses, compare universities, or browse scholarships. Find the best tech education programs at NextGen Learning."
        url="/404"
        canonical="/404"
        noindex={true}
      />
      {websiteSchema && <StructuredData data={websiteSchema} id="website-schema-404" />}
      
      <div className="min-h-[60vh] flex items-center justify-center px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          {/* 404 Illustration */}
          <div className="mb-8">
            <div className="inline-block text-9xl font-bold text-blue-600 mb-4">404</div>
            <div className="text-6xl mb-4" aria-hidden="true">🔍</div>
          </div>

          {/* Main Message */}
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Page Not Found
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            Oops! The page you're looking for doesn't exist or has been moved.
          </p>
          <p className="text-lg text-gray-500 mb-8">
            But don't worry! Explore our tech and IT courses below.
          </p>

          {/* Primary Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              to="/"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600"
            >
              <span aria-hidden="true">🏠</span> <span className="ml-1">Go to Homepage</span>
            </Link>
            <Link
              to="/courses"
              className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-green-600"
            >
              <span aria-hidden="true">📚</span> <span className="ml-1">Browse All Courses</span>
            </Link>
          </div>

          {/* Popular Links Section */}
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Popular Pages</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {popularLinks.map((link, index) => (
                <Link
                  key={index}
                  to={link.url}
                  className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200 hover:border-blue-300 text-left"
                >
                  <div className="font-semibold text-gray-900 mb-1">{link.name}</div>
                  <div className="text-sm text-gray-600">{link.description}</div>
                </Link>
              ))}
            </div>
          </div>

          {/* Top Universities Section */}
          {topUniversities.length > 0 && (
            <div className="bg-blue-50 rounded-lg p-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Top Universities</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {topUniversities.map((uni, index) => (
                  <Link
                    key={index}
                    to={uni.url}
                    className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-blue-200 hover:border-blue-400 text-center"
                  >
                    <div className="font-semibold text-gray-900">{uni.shortName || uni.name}</div>
                    <div className="text-xs text-gray-600 mt-1">View Courses</div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Search Suggestion */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              <span aria-hidden="true">💡</span> <span className="ml-1">Looking for something specific?</span>
            </h3>
            <p className="text-gray-700 mb-4">
              Try searching for courses, universities, or programs using our search feature.
            </p>
            <Link
              to="/courses"
              className="inline-block bg-yellow-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-yellow-600 transition-colors"
            >
              Search Courses
            </Link>
          </div>

          {/* Help Section */}
          <div className="mt-8 text-center">
            <p className="text-gray-600 mb-2">
              Need help? We're here for you!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="text-blue-600 hover:text-blue-800 font-medium underline"
              >
                Contact Us
              </Link>
              <span className="hidden sm:inline text-gray-400">|</span>
              <Link
                to="/faq"
                className="text-blue-600 hover:text-blue-800 font-medium underline"
              >
                FAQ
              </Link>
              <span className="hidden sm:inline text-gray-400">|</span>
              <Link
                to="/about"
                className="text-blue-600 hover:text-blue-800 font-medium underline"
              >
                About Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

