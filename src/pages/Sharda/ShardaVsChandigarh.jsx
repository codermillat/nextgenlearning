import React, { useEffect, useState } from 'react';
import UniversityComparison from '../../components/Sharda/UniversityComparison';
import SEOMetaTags from '../../components/SEO/SEOMetaTags';
import StructuredData from '../../components/SEO/StructuredData';

/**
 * Sharda vs Chandigarh University Comparison Page
 * 
 * SEO-optimized comparison page targeting "sharda vs chandigarh" keyword
 * Highlights Sharda's strengths while providing factual comparison
 * 
 * Requirements: 10.6
 */
const ShardaVsChandigarh = () => {
  const [shardaData, setShardaData] = useState(null);
  const [chandigarhData, setChandigarhData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load university data
    const loadData = async () => {
      try {
        const shardaResponse = await fetch('/data/universities/sharda.json');
        const sharda = await shardaResponse.json();
        setShardaData(sharda);

        const chandigarhResponse = await fetch('/data/universities/chandigarh.json');
        const chandigarh = await chandigarhResponse.json();
        setChandigarhData(chandigarh);
      } catch (error) {
        console.error('Error loading university data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading comparison...</p>
        </div>
      </div>
    );
  }

  if (!shardaData || !chandigarhData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Unable to load comparison data.</p>
        </div>
      </div>
    );
  }

  const universities = [shardaData, chandigarhData];

  const pageTitle = 'Sharda University vs Chandigarh University: Complete Comparison 2026';
  const pageDescription = 'Detailed comparison of Sharda University and Chandigarh University - NIRF rankings, fees, placements, facilities, and international student support. Choose the best university for your future.';
  const canonicalUrl = 'https://nextgenlearning.in/sharda-vs-chandigarh';

  // Structured data for comparison
  const comparisonSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: pageTitle,
    description: pageDescription,
    url: canonicalUrl,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: universities.map((uni, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'EducationalOrganization',
          name: uni.name,
          url: `https://nextgenlearning.in/universities/${uni.id}`,
          address: {
            '@type': 'PostalAddress',
            addressLocality: uni.location
          }
        }
      }))
    }
  };

  return (
    <>
      <SEOMetaTags
        title={pageTitle}
        description={pageDescription}
        keywords={[
          'sharda vs chandigarh university',
          'sharda university vs chandigarh university',
          'sharda chandigarh comparison',
          'best private university india',
          'sharda or chandigarh which is better',
          'university comparison india'
        ]}
        canonicalUrl={canonicalUrl}
        ogImage="https://nextgenlearning.in/og-sharda-vs-chandigarh.jpg"
      />

      <StructuredData data={comparisonSchema} />

      <div className="min-h-screen bg-gray-50">
        <UniversityComparison
          universities={universities}
          highlightUniversity="sharda"
          title="Sharda University vs Chandigarh University"
          description="In-depth comparison of Sharda University and Chandigarh University. Explore rankings, campus facilities, placement records, and international student support to make an informed decision."
        />

        {/* Additional Content for SEO */}
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Sharda University vs Chandigarh University: Key Differences
            </h2>
            
            <div className="space-y-6 text-gray-700">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  1. International Student Community
                </h3>
                <p>
                  Sharda University leads with 2000+ international students from 85+ countries, making it the 
                  #1 private university in India for international students. This diverse community creates a 
                  truly global learning environment. Chandigarh University has students from 40+ countries, 
                  but Sharda's larger international presence offers more cultural diversity.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  2. Healthcare Facilities
                </h3>
                <p>
                  Sharda University's 1,200-bed multi-specialty hospital on campus is a unique advantage, 
                  providing 24/7 medical care and comprehensive health insurance. This facility ensures 
                  immediate medical attention for students, which is particularly important for international 
                  students far from home.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  3. Location and Connectivity
                </h3>
                <p>
                  Sharda University is located in Greater Noida, close to Delhi-NCR with excellent metro 
                  connectivity and proximity to major IT companies. Chandigarh University is in Mohali, Punjab, 
                  near Chandigarh. Both locations have their advantages, but Sharda's NCR location provides 
                  better access to corporate opportunities and internships.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  4. Research Excellence
                </h3>
                <p>
                  Sharda University has 11 faculty members recognized among the top 2% scientists worldwide 
                  by Stanford University (2024), with 500+ publications and 35+ patents. The university's 
                  research output and faculty recognition demonstrate strong academic excellence.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  5. Industry Partnerships and Placements
                </h3>
                <p>
                  Both universities have strong industry connections. Sharda partners with Microsoft, Oracle, 
                  AWS, and 600+ recruiting companies, with a 91% placement rate and packages up to ₹1 crore 
                  per annum. Chandigarh University also has excellent placement records with partnerships with 
                  Google, Microsoft, and Amazon.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  6. NIRF Rankings
                </h3>
                <p>
                  Chandigarh University ranks 32nd in NIRF 2025 overall rankings, while Sharda University 
                  ranks in the 101-150 band. However, Sharda's specialized strengths in international student 
                  support, healthcare facilities, and research excellence make it an excellent choice for 
                  international students.
                </p>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-12 bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Which is better for international students - Sharda or Chandigarh University?
                </h3>
                <p className="text-gray-700">
                  Sharda University is ranked #1 among private universities in India for international students, 
                  with 2000+ students from 85+ countries. The university provides comprehensive support including 
                  airport reception, FRRO registration, visa assistance, and dedicated international student 
                  services, making it the preferred choice for international students.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  What are the fee differences between Sharda and Chandigarh University?
                </h3>
                <p className="text-gray-700">
                  Sharda University's B.Tech CSE fees are approximately ₹2.7 lakh per year, while Chandigarh 
                  University's B.E. CSE fees are around ₹2.98 lakh per year. Both universities offer scholarships 
                  for Bangladeshi and international students based on academic performance.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Which university has better campus facilities?
                </h3>
                <p className="text-gray-700">
                  Chandigarh University has a larger 200+ acre campus with IoT-enabled smart infrastructure. 
                  Sharda University has a 63-acre campus but features unique facilities like a 1,200-bed 
                  multi-specialty hospital, 16 specialized computing labs, and state-of-the-art research centers. 
                  Both offer excellent facilities, but Sharda's healthcare facility is a significant advantage.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Which university is better for placements?
                </h3>
                <p className="text-gray-700">
                  Both universities have strong placement records. Sharda University has a 91% placement rate 
                  with 600+ recruiting companies and highest packages up to ₹1 crore per annum. Chandigarh 
                  University also has excellent placements with partnerships with top companies. The choice 
                  depends on your specific program and career goals.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Which location is better - Greater Noida or Mohali?
                </h3>
                <p className="text-gray-700">
                  Greater Noida (Sharda) offers proximity to Delhi-NCR, excellent metro connectivity, and 
                  access to major IT companies and corporate opportunities. Mohali (Chandigarh) provides a 
                  cleaner environment near Chandigarh with good connectivity. Both locations have their 
                  advantages - choose based on your preference for metro city access vs. cleaner environment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShardaVsChandigarh;
