import { Link } from 'react-router-dom';
import MetaManager from '../components/SEO/MetaManager';
import StructuredData from '../components/SEO/StructuredData';
import { generateSiteOrganizationSchema, generateWebsiteSchema } from '../components/SEO/StructuredData';
import UrgencyBanner from '../components/UI/UrgencyBanner';
import Button from '../components/Common/Button';
import Card from '../components/Common/Card';
import { typography, spacing } from '../utils/designTokens';
import { getPopularComparisons } from '../utils/linkingStrategy';

export default function Home() {
  const siteOrgSchema = generateSiteOrganizationSchema();
  const websiteSchema = generateWebsiteSchema();

  return (
    <>
      <MetaManager
        emoji="🎓"
        benefit="Compare 600+ tech courses at India's top NIRF universities"
        socialProof="10,000+ students enrolled"
        price="Fees from ₹2-8L/year"
        urgency="Apply by March 2026"
        cta="Browse courses now"
        baseTitle="Tech Courses India"
        url="/"
      />
      {websiteSchema && <StructuredData data={websiteSchema} id="website-schema-dynamic" />}
      {siteOrgSchema && <StructuredData data={siteOrgSchema} id="site-org-schema" />}

      {/* Urgency Banner */}
      <UrgencyBanner
        deadline="2026-03-31"
        seatsLeft={45}
        ctaText="Apply Now - Free"
        ctaLink="/apply"
        variant="homepage"
      />

      {/* Hero Section */}
      <section className={`hero bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 text-white ${spacing.section} px-4 relative overflow-hidden`}>
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="mb-6 animate-fade-in">
            <div className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-6 border border-white/30">
              🎓 Your Gateway to Tech Education
            </div>
          </div>
          <h1 className={`${typography.pageTitle} mb-6 sm:mb-8 animate-slide-up`}>
            NextGen Learning
            <span className={`block ${typography.pageTitleSubtext} mt-3 text-blue-50`}>
              Tech & IT Courses
            </span>
          </h1>
          <p className={`${typography.bodyLarge} mb-8 sm:mb-10 text-blue-100 px-2 max-w-3xl mx-auto leading-relaxed`}>
            Compare computer science, data science, AI/ML, cybersecurity, cloud computing, and more tech courses across top Indian universities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center px-2">
            <Button to="/courses" variant="white" size="md">
              Browse Tech Courses
            </Button>
            <Button to="/universities" variant="secondary" size="md">
              View Universities
            </Button>
            <Button to="/compare" variant="secondary" size="md">
              Compare Courses
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={`features ${spacing.sectionMedium} px-4 bg-gradient-to-b from-gray-50 to-white`}>
        <div className={`max-w-6xl mx-auto ${spacing.container}`}>
          <div className="text-center mb-12 sm:mb-16">
            <h2 className={`${typography.sectionTitle} mb-4 text-gray-900`}>Why Choose NextGen Learning?</h2>
            <p className={`${typography.body} max-w-2xl mx-auto`}>
              Everything you need to make informed decisions about your tech education journey
            </p>
          </div>
          <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 ${spacing.gapLarge}`}>
            <Card variant="feature" hoverTextColor="group-hover:text-blue-600">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-6 text-3xl group-hover:scale-110 transition-transform">
                💻
              </div>
              <h3 className={`${typography.cardTitle} mb-3 text-gray-900 group-hover:text-blue-600 transition-colors`}>Compare Tech Courses</h3>
              <p className={`${typography.body} leading-relaxed`}>
                Compare similar tech courses across multiple universities. See fees, rankings, and placements side-by-side.
              </p>
            </Card>
            <Card variant="feature" hoverTextColor="group-hover:text-green-600">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-6 text-3xl group-hover:scale-110 transition-transform">
                💰
              </div>
              <h3 className={`${typography.cardTitle} mb-3 text-gray-900 group-hover:text-green-600 transition-colors`}>Fee Calculator</h3>
              <p className={`${typography.body} leading-relaxed`}>
                Calculate total fees with scholarships. See year-wise breakdown and understand all costs upfront.
              </p>
            </Card>
            <Card variant="feature" hoverTextColor="group-hover:text-orange-600">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center mb-6 text-3xl group-hover:scale-110 transition-transform">
                🏆
              </div>
              <h3 className={`${typography.cardTitle} mb-3 text-gray-900 group-hover:text-orange-600 transition-colors`}>University Rankings</h3>
              <p className={`${typography.body} leading-relaxed`}>
                View NIRF rankings, NAAC accreditation, placement records, and more to make informed decisions.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Tech Categories Section */}
      <section className={`${spacing.sectionMedium} px-4 bg-white`}>
        <div className={`max-w-6xl mx-auto ${spacing.container}`}>
          <div className="text-center mb-12 sm:mb-16">
            <h2 className={`${typography.sectionTitle} mb-4 text-gray-900`}>Explore Tech Course Categories</h2>
            <p className={`${typography.body} max-w-2xl mx-auto`}>
              Discover specialized tech programs across top universities
            </p>
          </div>
          <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 ${spacing.gap}`}>
            <Card 
              to="/courses/compare/btech-cse"
              variant="gradient"
              gradientColors="from-blue-50 to-blue-100"
              borderColor="border-blue-200"
              hoverBorderColor="hover:border-blue-300"
              hoverTextColor="group-hover:text-blue-600"
              className="text-center"
            >
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform" aria-hidden="true">💻</div>
              <h3 className={`font-bold ${typography.bodySmall} mb-2 text-gray-900 group-hover:text-blue-600 transition-colors`}>Computer Science</h3>
              <p className={`${typography.caption}`}>B.Tech CSE programs</p>
            </Card>
            <Card 
              to="/courses/compare/btech-ai-ml"
              variant="gradient"
              gradientColors="from-purple-50 to-purple-100"
              borderColor="border-purple-200"
              hoverBorderColor="hover:border-purple-300"
              hoverTextColor="group-hover:text-purple-600"
              className="text-center"
            >
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform" aria-hidden="true">🤖</div>
              <h3 className={`font-bold ${typography.bodySmall} mb-2 text-gray-900 group-hover:text-purple-600 transition-colors`}>AI & Machine Learning</h3>
              <p className={typography.caption}>AI/ML programs</p>
            </Card>
            <Card 
              to="/courses/compare/btech-data-science"
              variant="gradient"
              gradientColors="from-green-50 to-green-100"
              borderColor="border-green-200"
              hoverBorderColor="hover:border-green-300"
              hoverTextColor="group-hover:text-green-600"
              className="text-center"
            >
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform" aria-hidden="true">📊</div>
              <h3 className={`font-bold ${typography.bodySmall} mb-2 text-gray-900 group-hover:text-green-600 transition-colors`}>Data Science</h3>
              <p className={typography.caption}>Data analytics programs</p>
            </Card>
            <Card 
              to="/courses/compare/btech-cyber-security"
              variant="gradient"
              gradientColors="from-red-50 to-red-100"
              borderColor="border-red-200"
              hoverBorderColor="hover:border-red-300"
              hoverTextColor="group-hover:text-red-600"
              className="text-center"
            >
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform" aria-hidden="true">🔒</div>
              <h3 className={`font-bold ${typography.bodySmall} mb-2 text-gray-900 group-hover:text-red-600 transition-colors`}>Cybersecurity</h3>
              <p className={typography.caption}>Security programs</p>
            </Card>
            <Card 
              to="/courses/compare/btech-cloud-computing"
              variant="gradient"
              gradientColors="from-indigo-50 to-indigo-100"
              borderColor="border-indigo-200"
              hoverBorderColor="hover:border-indigo-300"
              hoverTextColor="group-hover:text-indigo-600"
              className="text-center"
            >
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform" aria-hidden="true">☁️</div>
              <h3 className={`font-bold ${typography.bodySmall} mb-2 text-gray-900 group-hover:text-indigo-600 transition-colors`}>Cloud Computing</h3>
              <p className={typography.caption}>Cloud technology programs</p>
            </Card>
            <Card 
              to="/courses/compare/btech-full-stack"
              variant="gradient"
              gradientColors="from-yellow-50 to-yellow-100"
              borderColor="border-yellow-200"
              hoverBorderColor="hover:border-yellow-300"
              hoverTextColor="group-hover:text-yellow-600"
              className="text-center"
            >
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform" aria-hidden="true">🌐</div>
              <h3 className={`font-bold ${typography.bodySmall} mb-2 text-gray-900 group-hover:text-yellow-600 transition-colors`}>Full Stack Dev</h3>
              <p className={typography.caption}>Web development programs</p>
            </Card>
            <Card 
              to="/courses/compare/btech-blockchain"
              variant="gradient"
              gradientColors="from-gray-50 to-gray-100"
              borderColor="border-gray-200"
              hoverBorderColor="hover:border-gray-300"
              hoverTextColor="group-hover:text-gray-700"
              className="text-center"
            >
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform" aria-hidden="true">⛓️</div>
              <h3 className={`font-bold ${typography.bodySmall} mb-2 text-gray-900 group-hover:text-gray-700 transition-colors`}>Blockchain</h3>
              <p className={typography.caption}>Blockchain technology</p>
            </Card>
            <Card 
              to="/courses/compare/bca"
              variant="gradient"
              gradientColors="from-teal-50 to-teal-100"
              borderColor="border-teal-200"
              hoverBorderColor="hover:border-teal-300"
              hoverTextColor="group-hover:text-teal-600"
              className="text-center"
            >
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform" aria-hidden="true">📱</div>
              <h3 className={`font-bold ${typography.bodySmall} mb-2 text-gray-900 group-hover:text-teal-600 transition-colors`}>BCA</h3>
              <p className={typography.caption}>Computer applications</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Popular Comparisons - Strategic Internal Linking */}
      <section className={`${spacing.sectionMedium} px-4 bg-gradient-to-b from-gray-50 to-white`} data-testid="popular-comparisons-section">
        <div className={`max-w-6xl mx-auto ${spacing.container}`}>
          <div className="text-center mb-12 sm:mb-16">
            <h2 className={`${typography.sectionTitle} mb-4 text-gray-900`}>Popular Course Comparisons</h2>
            <p className={`${typography.body} max-w-2xl mx-auto`}>
              Compare programs side-by-side to find the perfect fit for your career goals
            </p>
          </div>
          <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 ${spacing.gapLarge}`}>
            {getPopularComparisons(6).map((comparison, index) => (
              <Link
                key={index}
                to={comparison.url}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 border border-gray-200 group hover:border-blue-300"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="text-3xl" aria-hidden="true">⚖️</div>
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">Compare</span>
                </div>
                <h3 className="font-semibold text-lg mb-2 group-hover:text-blue-600 transition-colors">
                  {comparison.anchorText}
                </h3>
                <p className="text-sm text-gray-600 mb-3">
                  View fees, rankings, and scholarships across universities
                </p>
                <div className="flex items-center text-blue-600 text-sm font-semibold group-hover:underline">
                  Compare Now →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className={`${spacing.sectionMedium} px-4 bg-gradient-to-b from-gray-50 to-white`}>
        <div className={`max-w-6xl mx-auto ${spacing.container}`}>
          <div className="text-center mb-12 sm:mb-16">
            <h2 className={`${typography.sectionTitle} mb-4 text-gray-900`}>Explore More Resources</h2>
            <p className={`${typography.body} max-w-2xl mx-auto`}>
              Everything you need for your tech education journey
            </p>
          </div>
          <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 ${spacing.gap}`}>
            <Card 
              to="/rankings"
              variant="default"
              hoverTextColor="group-hover:text-blue-600"
              className="text-center"
            >
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform" aria-hidden="true">🏆</div>
              <h3 className={`font-bold ${typography.bodySmall} mb-2 text-gray-900 group-hover:text-blue-600 transition-colors`}>NIRF Rankings</h3>
              <p className={typography.caption}>University rankings 2025</p>
            </Card>
            <Card 
              to="/fees-scholarships"
              variant="default"
              hoverTextColor="group-hover:text-blue-600"
              className="text-center"
            >
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform" aria-hidden="true">💵</div>
              <h3 className={`font-bold ${typography.bodySmall} mb-2 text-gray-900 group-hover:text-blue-600 transition-colors`}>Fees & Scholarships</h3>
              <p className={typography.caption}>Complete fee guide</p>
            </Card>
            <Card 
              to="/guides"
              variant="default"
              hoverTextColor="group-hover:text-blue-600"
              className="text-center"
            >
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform" aria-hidden="true">📚</div>
              <h3 className={`font-bold ${typography.bodySmall} mb-2 text-gray-900 group-hover:text-blue-600 transition-colors`}>Learning Guides</h3>
              <p className={typography.caption}>Tech learning resources</p>
            </Card>
            <Card 
              to="/faq"
              variant="default"
              hoverTextColor="group-hover:text-blue-600"
              className="text-center"
            >
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform" aria-hidden="true">❓</div>
              <h3 className={`font-bold ${typography.bodySmall} mb-2 text-gray-900 group-hover:text-blue-600 transition-colors`}>FAQ</h3>
              <p className={typography.caption}>Answers to common questions</p>
            </Card>
            <Card 
              to="/scholarships"
              variant="default"
              hoverTextColor="group-hover:text-blue-600"
              className="text-center"
            >
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform" aria-hidden="true">💰</div>
              <h3 className={`font-bold ${typography.bodySmall} mb-2 text-gray-900 group-hover:text-blue-600 transition-colors`}>Scholarships</h3>
              <p className={typography.caption}>Find available scholarships</p>
            </Card>
            <Card 
              to="/compare"
              variant="default"
              hoverTextColor="group-hover:text-blue-600"
              className="text-center"
            >
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform" aria-hidden="true">⚖️</div>
              <h3 className={`font-bold ${typography.bodySmall} mb-2 text-gray-900 group-hover:text-blue-600 transition-colors`}>Compare Courses</h3>
              <p className={typography.caption}>Side-by-side comparison</p>
            </Card>
          </div>
        </div>
      </section>

      {/* University Rankings & Fees Section - SEO Optimized */}
      <section className={`${spacing.sectionMedium} px-4 bg-white`}>
        <div className={`max-w-6xl mx-auto ${spacing.container}`}>
          <div className="text-center mb-12 sm:mb-16">
            <h2 className={`${typography.sectionTitle} mb-4 text-gray-900`}>NIRF Ranking 2025 & Course Fees - Complete Guide</h2>
            <p className={`${typography.body} max-w-3xl mx-auto`}>
              Compare NIRF rankings, fees, and scholarships across top Indian universities. All universities are NAAC A+ accredited with excellent placement records.
            </p>
          </div>
          
          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 ${spacing.gapLarge} mb-8`}>
            <Card variant="default" className="text-center relative">
              <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-full font-semibold">
                Recommended
              </div>
              <div className="text-4xl mb-4">🌟</div>
              <h3 className={`${typography.bodySmall} font-bold mb-2`}>Sharda University</h3>
              <p className={`${typography.caption} mb-3`}>NIRF Ranking: 101-150</p>
              <p className={`${typography.caption} mb-3`}>NAAC: A+</p>
              <p className={`${typography.caption} mb-3`}>B.Tech CSE Fees: ₹3L/year</p>
              <p className={`${typography.caption} text-green-600 font-semibold`}>Scholarship: 20-50%</p>
              <Link to="/sharda" className="text-blue-600 text-sm font-semibold mt-2 inline-block">
                Learn More About Sharda →
              </Link>
            </Card>
            
            <Card variant="default" className="text-center">
              <div className="text-4xl mb-4">🏆</div>
              <h3 className={`${typography.bodySmall} font-bold mb-2`}>Chandigarh University</h3>
              <p className={`${typography.caption} mb-3`}>NIRF Ranking: 32</p>
              <p className={`${typography.caption} mb-3`}>NAAC: A+</p>
              <p className={`${typography.caption} mb-3`}>B.Tech CSE Fees: ₹3-4L/year</p>
              <p className={`${typography.caption} text-green-600 font-semibold`}>Scholarship: 35-50%</p>
              <Link to="/universities/chandigarh-university" className="text-blue-600 text-sm font-semibold mt-2 inline-block">
                View Details →
              </Link>
            </Card>
            
            <Card variant="default" className="text-center">
              <div className="text-4xl mb-4">🎓</div>
              <h3 className={`${typography.bodySmall} font-bold mb-2`}>Galgotias University</h3>
              <p className={`${typography.caption} mb-3`}>NIRF Ranking: 101-150</p>
              <p className={`${typography.caption} mb-3`}>NAAC: A+</p>
              <p className={`${typography.caption} mb-3`}>B.Tech CSE Fees: ₹3.5L/year</p>
              <p className={`${typography.caption} text-green-600 font-semibold`}>Scholarship: 50-60%</p>
              <Link to="/universities/galgotias-university" className="text-blue-600 text-sm font-semibold mt-2 inline-block">
                View Details →
              </Link>
            </Card>
            
            <Card variant="default" className="text-center">
              <div className="text-4xl mb-4">✨</div>
              <h3 className={`${typography.bodySmall} font-bold mb-2`}>Noida International University</h3>
              <p className={`${typography.caption} mb-3`}>NIRF Ranking: 201-250</p>
              <p className={`${typography.caption} mb-3`}>NAAC: A+</p>
              <p className={`${typography.caption} mb-3`}>B.Tech CSE Fees: ₹2.5L/year</p>
              <p className={`${typography.caption} text-green-600 font-semibold`}>Scholarship: 50% Flat</p>
              <Link to="/universities/noida-international-university" className="text-blue-600 text-sm font-semibold mt-2 inline-block">
                View Details →
              </Link>
            </Card>
          </div>

          {/* Detailed Rankings & Fees Information */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6 sm:p-8 mb-8">
            <h3 className={`${typography.cardTitle} mb-4 text-gray-900`}>Understanding NIRF Rankings & Course Fees</h3>
            <div className="space-y-4 text-gray-700">
              <div>
                <h4 className="font-semibold mb-2">What is NIRF Ranking?</h4>
                <p className={`${typography.body} mb-2`}>
                  NIRF (National Institutional Ranking Framework) is the official ranking system for Indian universities by the Ministry of Education. 
                  Rankings are published annually and consider factors like teaching, research, graduation outcomes, outreach, and perception.
                </p>
                <p className={`${typography.body}`}>
                  <strong>Featured Universities NIRF Rankings 2025:</strong> Chandigarh University ranks 32nd overall, making it one of the top private universities in India. 
                  Galgotias University and Sharda University both rank in the 101-150 band, indicating excellent quality education. 
                  Noida International University ranks 201-250, showing strong growth and potential.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">B.Tech CSE Total Fees 4 Years - Complete Breakdown</h4>
                <p className={`${typography.body} mb-2`}>
                  Total fees for B.Tech CSE programs vary by university and scholarship eligibility. Here's a breakdown for Bangladeshi students:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li><strong>Sharda University B.Tech CSE:</strong> Total fees ₹12-15 lakh for 4 years (after 20-50% scholarship). Annual fee: ₹3 lakh/year. Excellent value with comprehensive support services.</li>
                  <li><strong>Galgotias University B.Tech CSE:</strong> Total fees ₹14-16 lakh for 4 years (after 50-60% scholarship). Annual fee: ₹3.5 lakh/year.</li>
                  <li><strong>Chandigarh University B.Tech CSE:</strong> Total fees ₹12-16 lakh for 4 years (after 35-50% scholarship). Annual fee: ₹3-4 lakh/year.</li>
                  <li><strong>Noida International University B.Tech CSE:</strong> Total fees ₹10-12 lakh for 4 years (after 50% flat scholarship). Annual fee: ₹2.5 lakh/year.</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2">NAAC A+ Accreditation - Why It Matters</h4>
                <p className={`${typography.body}`}>
                  All featured universities have NAAC A+ accreditation, the highest grade indicating excellent quality education, infrastructure, 
                  faculty, and academic standards. This ensures your degree is recognized globally and opens doors to better career opportunities.
                </p>
              </div>
            </div>
          </div>

          {/* Quick Links for Rankings & Fees */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link to="/sharda" className="bg-white border-2 border-blue-300 rounded-lg p-4 hover:shadow-md transition-shadow">
              <h4 className="font-semibold mb-2">Sharda University Complete Guide</h4>
              <p className="text-sm text-gray-600">NIRF 101-150 | NAAC A+ | Programs, Fees, Scholarships & Admissions</p>
            </Link>
            <Link to="/universities/galgotias-university" className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <h4 className="font-semibold mb-2">Galgotias University NIRF Ranking</h4>
              <p className="text-sm text-gray-600">NIRF 101-150 | NAAC A+ | B.Tech CSE Fees & Details</p>
            </Link>
            <Link to="/universities" className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <h4 className="font-semibold mb-2">Compare All Universities</h4>
              <p className="text-sm text-gray-600">NIRF Rankings, Fees, Scholarships Side-by-Side</p>
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
              NextGen Learning is your comprehensive platform for exploring tech and IT education. We help you compare computer science, data science, AI/ML, cybersecurity, cloud computing, and other tech courses across top universities. Our platform features detailed information about tech programs including <Link to="/sharda" className="text-blue-600 font-semibold hover:underline">Sharda University</Link>, <Link to="/universities/chandigarh-university" className="text-blue-600 font-semibold hover:underline">Chandigarh University</Link>, <Link to="/universities/galgotias-university" className="text-blue-600 font-semibold hover:underline">Galgotias University</Link>, and <Link to="/universities/noida-international-university" className="text-blue-600 font-semibold hover:underline">Noida International University (NIU)</Link>.
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
      <section className={`cta ${spacing.sectionMedium} px-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white relative overflow-hidden`}>
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className={`${typography.sectionTitle} mb-4 sm:mb-6`}>Ready to Start Your Tech Journey?</h2>
          <p className={`${typography.bodyLarge} mb-8 sm:mb-10 text-blue-50 max-w-2xl mx-auto`}>
            Explore tech courses and find the perfect program for your career. Get free counseling and application assistance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button to="/courses" variant="white" size="md">
              Browse Tech Courses
            </Button>
            <Button to="/apply" variant="secondary" size="md">
              Apply Now - Free
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
