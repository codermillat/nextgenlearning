import { Link } from 'react-router-dom';
import SEOHead from '../components/SEO/SEOHead';
import StructuredData from '../components/SEO/StructuredData';
import { generateWebsiteSchema } from '../components/SEO/StructuredData';

export default function NotFound() {
  const websiteSchema = generateWebsiteSchema();

  return (
    <>
      <SEOHead
        title="Page Not Found - Study in India BD | WBE"
        description="The page you're looking for doesn't exist. Return to our homepage to explore courses and universities."
        url="/404"
        canonical="/404"
        noindex={true}
      />
      {websiteSchema && <StructuredData data={websiteSchema} id="website-schema-404" />}
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <h2 className="text-3xl font-bold mb-4">Page Not Found</h2>
        <p className="text-lg text-gray-600 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Go to Homepage
          </Link>
          <Link
            to="/courses"
            className="bg-gray-200 text-gray-800 px-8 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
          >
            Browse Courses
          </Link>
        </div>
      </div>
    </>
  );
}

