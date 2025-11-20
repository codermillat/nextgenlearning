import { Link } from 'react-router-dom';
import SEOHead from '../components/SEO/SEOHead';
import StructuredData from '../components/SEO/StructuredData';
import { generateWBESchema, generateWebsiteSchema } from '../components/SEO/StructuredData';

export default function Home() {
  const wbeSchema = generateWBESchema();
  const websiteSchema = generateWebsiteSchema();

  return (
    <>
      <SEOHead
        title="NextGen Learning - Tech & IT Courses | Computer Science, AI/ML, Data Science, Cybersecurity"
        description="Your gateway to tech and IT education. Compare computer science, data science, AI/ML, cybersecurity, cloud computing, and more tech courses. Find the best tech programs for your career."
        keywords={[
          'tech courses',
          'IT courses',
          'computer science courses',
          'data science courses',
          'AI ML courses',
          'artificial intelligence courses',
          'machine learning courses',
          'cybersecurity courses',
          'cloud computing courses',
          'full stack development',
          'blockchain courses',
          'IoT courses',
          'B.Tech CSE',
          'B.Tech IT',
          'BCA',
          'MCA',
          'tech education',
          'IT education',
          'computer science programs',
          'tech career',
          'IT career',
          'programming courses',
          'software engineering',
          'web development courses'
        ]}
        url="/"
        canonical="/"
      />
      {websiteSchema && <StructuredData data={websiteSchema} id="website-schema-dynamic" />}
      {wbeSchema && <StructuredData data={wbeSchema} id="wbe-schema" />}

      {/* Hero Section */}
      <section className="hero bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12 sm:py-16 md:py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 leading-tight">
            NextGen Learning - Tech & IT Courses
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 text-blue-100 px-2">
            Your gateway to tech and IT education. Compare computer science, data science, AI/ML, cybersecurity, and more.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-2">
            <Link
              to="/courses"
              className="bg-white text-blue-600 px-6 sm:px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors min-h-[44px] flex items-center justify-center"
            >
              Browse Tech Courses
            </Link>
            <Link
              to="/universities"
              className="bg-blue-700 text-white px-6 sm:px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors border-2 border-white min-h-[44px] flex items-center justify-center"
            >
              View Universities
            </Link>
            <Link
              to="/compare"
              className="bg-blue-700 text-white px-6 sm:px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors border-2 border-white min-h-[44px] flex items-center justify-center"
            >
              Compare Courses
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features py-12 sm:py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">Why Choose NextGen Learning?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-4xl mb-4">💻</div>
              <h3 className="text-xl font-bold mb-2">Compare Tech Courses</h3>
              <p className="text-gray-600">
                Compare similar tech courses across multiple universities. See fees, rankings, and placements side-by-side.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-xl font-bold mb-2">Fee Calculator</h3>
              <p className="text-gray-600">
                Calculate total fees with scholarships. See year-wise breakdown and understand all costs upfront.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-4xl mb-4">🏆</div>
              <h3 className="text-xl font-bold mb-2">University Rankings</h3>
              <p className="text-gray-600">
                View NIRF rankings, NAAC accreditation, placement records, and more to make informed decisions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Categories Section */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8">Explore Tech Course Categories</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <Link to="/courses/compare/btech-cse" className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center border border-blue-200">
              <div className="text-4xl mb-3">💻</div>
              <h3 className="font-bold mb-2">Computer Science</h3>
              <p className="text-sm text-gray-600">B.Tech CSE programs</p>
            </Link>
            <Link to="/courses/compare/btech-ai-ml" className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center border border-purple-200">
              <div className="text-4xl mb-3">🤖</div>
              <h3 className="font-bold mb-2">AI & Machine Learning</h3>
              <p className="text-sm text-gray-600">AI/ML programs</p>
            </Link>
            <Link to="/courses/compare/btech-data-science" className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center border border-green-200">
              <div className="text-4xl mb-3">📊</div>
              <h3 className="font-bold mb-2">Data Science</h3>
              <p className="text-sm text-gray-600">Data analytics programs</p>
            </Link>
            <Link to="/courses/compare/btech-cyber-security" className="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center border border-red-200">
              <div className="text-4xl mb-3">🔒</div>
              <h3 className="font-bold mb-2">Cybersecurity</h3>
              <p className="text-sm text-gray-600">Security programs</p>
            </Link>
            <Link to="/courses/compare/btech-cloud-computing" className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center border border-indigo-200">
              <div className="text-4xl mb-3">☁️</div>
              <h3 className="font-bold mb-2">Cloud Computing</h3>
              <p className="text-sm text-gray-600">Cloud technology programs</p>
            </Link>
            <Link to="/courses/compare/btech-full-stack" className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center border border-yellow-200">
              <div className="text-4xl mb-3">🌐</div>
              <h3 className="font-bold mb-2">Full Stack Dev</h3>
              <p className="text-sm text-gray-600">Web development programs</p>
            </Link>
            <Link to="/courses/compare/btech-blockchain" className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center border border-gray-200">
              <div className="text-4xl mb-3">⛓️</div>
              <h3 className="font-bold mb-2">Blockchain</h3>
              <p className="text-sm text-gray-600">Blockchain technology</p>
            </Link>
            <Link to="/courses/compare/bca" className="bg-gradient-to-br from-teal-50 to-teal-100 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center border border-teal-200">
              <div className="text-4xl mb-3">📱</div>
              <h3 className="font-bold mb-2">BCA</h3>
              <p className="text-sm text-gray-600">Computer applications</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8">Explore More Resources</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <Link to="/guides" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center">
              <div className="text-4xl mb-3">📚</div>
              <h3 className="font-bold mb-2">Learning Guides</h3>
              <p className="text-sm text-gray-600">Tech learning resources</p>
            </Link>
            <Link to="/faq" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center">
              <div className="text-4xl mb-3">❓</div>
              <h3 className="font-bold mb-2">FAQ</h3>
              <p className="text-sm text-gray-600">Answers to common questions</p>
            </Link>
            <Link to="/scholarships" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center">
              <div className="text-4xl mb-3">💰</div>
              <h3 className="font-bold mb-2">Scholarships</h3>
              <p className="text-sm text-gray-600">Find available scholarships</p>
            </Link>
            <Link to="/compare" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center">
              <div className="text-4xl mb-3">⚖️</div>
              <h3 className="font-bold mb-2">Compare Courses</h3>
              <p className="text-sm text-gray-600">Side-by-side comparison</p>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">About NextGen Learning</h2>
          <div className="prose max-w-none text-gray-700 space-y-4">
            <p className="text-lg">
              NextGen Learning is your comprehensive platform for exploring tech and IT education. We help you compare computer science, data science, AI/ML, cybersecurity, cloud computing, and other tech courses across top universities. Our platform features detailed information about tech programs including <Link to="/universities/chandigarh-university" className="text-blue-600 font-semibold hover:underline">Chandigarh University</Link>, <Link to="/universities/sharda-university" className="text-blue-600 font-semibold hover:underline">Sharda University</Link>, <Link to="/universities/galgotias-university" className="text-blue-600 font-semibold hover:underline">Galgotias University</Link>, and <Link to="/universities/noida-international-university" className="text-blue-600 font-semibold hover:underline">Noida International University (NIU)</Link>.
            </p>
            <p>
              The tech industry is rapidly growing, and quality tech education is essential for a successful career. With top-ranked universities offering cutting-edge programs in computer science, artificial intelligence, data science, cybersecurity, and more, you can find the perfect tech program to launch your career. Explore our comprehensive <Link to="/courses" className="text-blue-600 font-semibold hover:underline">tech course catalog</Link> featuring programs across various tech domains. Use our <Link to="/compare" className="text-blue-600 font-semibold hover:underline">comparison tool</Link> to compare courses side-by-side and find the perfect program for your career goals.
            </p>
            <h3 className="text-2xl font-bold mt-8 mb-4">Why Choose Tech Education?</h3>
            <ul className="list-disc list-inside space-y-2">
              <li><strong>High Demand:</strong> Tech professionals are in high demand across industries. Compare tech courses using our <Link to="/compare" className="text-blue-600 hover:underline">comparison tool</Link>.</li>
              <li><strong>Scholarships Available:</strong> Generous scholarships for tech programs (up to 50% at some universities). Check our <Link to="/scholarships" className="text-blue-600 hover:underline">scholarship page</Link> for detailed eligibility criteria.</li>
              <li><strong>World-Class Programs:</strong> Top-ranked institutions with industry partnerships and modern labs. View <Link to="/universities" className="text-blue-600 hover:underline">university rankings</Link> and accreditation details.</li>
              <li><strong>Career Opportunities:</strong> Excellent placement opportunities in tech companies. All featured universities have strong industry partnerships and high placement rates.</li>
              <li><strong>Future-Proof Skills:</strong> Learn cutting-edge technologies like AI, ML, cloud computing, and cybersecurity.</li>
              <li><strong>Diverse Specializations:</strong> Choose from computer science, data science, AI/ML, cybersecurity, cloud computing, full stack development, blockchain, and more.</li>
            </ul>
            <h3 className="text-2xl font-bold mt-8 mb-4">How to Get Started</h3>
            <p>
              Getting started is easy! Browse our <Link to="/courses" className="text-blue-600 font-semibold hover:underline">complete tech course catalog</Link> to explore all available programs. Use our <Link to="/compare" className="text-blue-600 font-semibold hover:underline">comparison tool</Link> to compare courses side-by-side. Read our comprehensive <Link to="/guides" className="text-blue-600 font-semibold hover:underline">learning guides</Link> covering tech careers, programming, and more. Check out our <Link to="/faq" className="text-blue-600 font-semibold hover:underline">FAQ section</Link> for answers to common questions about tech education.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta py-16 px-4 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Tech Journey?</h2>
          <p className="text-xl mb-8 text-blue-100">
            Explore tech courses and find the perfect program for your career
          </p>
          <Link
            to="/courses"
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors inline-block"
          >
            Browse Tech Courses
          </Link>
        </div>
      </section>
    </>
  );
}
