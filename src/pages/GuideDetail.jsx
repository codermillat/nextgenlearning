import { useParams, Link } from 'react-router-dom';
import SEOHead from '../components/SEO/SEOHead';
import StructuredData from '../components/SEO/StructuredData';
import Breadcrumbs from '../components/Common/Breadcrumbs';
import { generateBreadcrumbSchema, generateArticleSchema } from '../components/SEO/StructuredData';
import { redirectToWhatsApp } from '../utils/whatsappRedirect';
import { trackWhatsAppClick } from '../utils/analytics';

// All guide content
const guideContent = {
  'complete-guide-study-india-bangladesh': {
    title: 'Complete Guide to Study in India from Bangladesh 2025-26',
    category: 'Admission Guide',
    readTime: '15 min read',
    date: '2025-01-15',
    content: `
      <h2>Introduction</h2>
      <p>Studying in India offers excellent opportunities for Bangladeshi students, especially in tech and IT fields. This comprehensive guide covers everything you need to know about pursuing higher education in India.</p>
      
      <h2>Why Study in India?</h2>
      <ul>
        <li>World-class universities with NAAC A+ accreditation</li>
        <li>Affordable tuition fees with generous scholarships</li>
        <li>Strong industry connections and placement opportunities</li>
        <li>Cultural similarity makes adaptation easier</li>
        <li>Excellent tech and IT programs</li>
      </ul>
      
      <h2>Admission Process</h2>
      <p>The admission process typically involves:</p>
      <ol>
        <li>Choosing your preferred university and course</li>
        <li>Submitting application with required documents</li>
        <li>Scholarship application (if applicable)</li>
        <li>Receiving admission letter</li>
        <li>Applying for student visa</li>
        <li>Traveling to India</li>
      </ol>
      
      <h2>Required Documents</h2>
      <ul>
        <li>Academic transcripts (SSC and HSC)</li>
        <li>Passport (valid for at least 6 months)</li>
        <li>Passport-size photographs</li>
        <li>Birth certificate</li>
        <li>Medical fitness certificate</li>
        <li>Financial documents</li>
      </ul>
      
      <h2>Scholarships</h2>
      <p>Many Indian universities offer scholarships for Bangladeshi students, ranging from 20% to 60% of tuition fees. Scholarships are typically based on academic performance (GPA).</p>
      
      <h2>Get Free Application Assistance</h2>
      <p>For free counseling and application assistance, contact WBE (Western Bangla Education) on WhatsApp. They will help you with the entire process at no cost.</p>
    `
  },
  'how-to-apply-indian-universities': {
    title: 'How to Apply for Indian Universities: Step-by-Step Process',
    category: 'Application Process',
    readTime: '12 min read',
    date: '2025-01-14',
    content: `
      <h2>Step-by-Step Application Process</h2>
      
      <h3>Step 1: Research and Choose</h3>
      <p>Research universities and courses that match your interests and career goals. Consider factors like:</p>
      <ul>
        <li>University rankings (NIRF)</li>
        <li>Course curriculum and specializations</li>
        <li>Fee structure and scholarships</li>
        <li>Placement records</li>
        <li>Location and facilities</li>
      </ul>
      
      <h3>Step 2: Check Eligibility</h3>
      <p>Ensure you meet the eligibility criteria:</p>
      <ul>
        <li>Minimum GPA requirements (usually 50% in HSC)</li>
        <li>Subject requirements for specific courses</li>
        <li>Age limits (if applicable)</li>
      </ul>
      
      <h3>Step 3: Prepare Documents</h3>
      <p>Gather all required documents:</p>
      <ul>
        <li>Academic certificates and transcripts</li>
        <li>Passport copy</li>
        <li>Passport-size photographs</li>
        <li>Identity documents</li>
        <li>Medical certificates</li>
      </ul>
      
      <h3>Step 4: Submit Application</h3>
      <p>Submit your application through WBE (Western Bangla Education) for free assistance. They will help you:</p>
      <ul>
        <li>Complete application forms</li>
        <li>Verify documents</li>
        <li>Submit to universities</li>
        <li>Track application status</li>
      </ul>
      
      <h3>Step 5: Scholarship Application</h3>
      <p>Apply for available scholarships based on your GPA. WBE will guide you through the scholarship application process.</p>
      
      <h3>Step 6: Receive Admission Letter</h3>
      <p>Once accepted, you'll receive an admission letter from the university.</p>
      
      <h3>Step 7: Visa Application</h3>
      <p>WBE will assist you with the student visa application process, including document preparation and submission.</p>
      
      <h2>Get Free Help</h2>
      <p>Contact WBE on WhatsApp (+8801611533385) for free application assistance. Send your documents and basic information - they will help you for free!</p>
    `
  },
  'scholarships-bangladeshi-students-india': {
    title: 'Scholarships for Bangladeshi Students in India 2025-26',
    category: 'Scholarships',
    readTime: '10 min read',
    date: '2025-01-13',
    content: `
      <h2>Scholarship Opportunities for Bangladeshi Students</h2>
      
      <p>Indian universities offer generous scholarships for Bangladeshi students, making quality education more affordable.</p>
      
      <h2>Scholarship Types</h2>
      
      <h3>1. Noida International University (NIU)</h3>
      <ul>
        <li><strong>Flat 50% Scholarship:</strong> All Bangladeshi students are eligible regardless of GPA</li>
        <li>No minimum GPA requirement</li>
        <li>Automatically applied to all eligible students</li>
      </ul>
      
      <h3>2. Sharda University</h3>
      <ul>
        <li><strong>GPA-Based Scholarships:</strong> 20% to 50% based on academic performance</li>
        <li>Higher GPA = Higher scholarship percentage</li>
        <li>Scholarship tiers available for different GPA ranges</li>
      </ul>
      
      <h3>3. Chandigarh University</h3>
      <ul>
        <li><strong>GPA-Based Scholarships:</strong> 35% to 50%</li>
        <li>GPA 3.5+ = 50% scholarship</li>
        <li>GPA below 3.5 = 35% scholarship</li>
      </ul>
      
      <h3>4. Galgotias University</h3>
      <ul>
        <li><strong>B.Tech Programs:</strong> 60% flat scholarship</li>
        <li><strong>Other Programs:</strong> 50% flat scholarship</li>
        <li>No GPA requirement for Bangladeshi students</li>
      </ul>
      
      <h2>How to Apply for Scholarships</h2>
      <ol>
        <li>Apply to your preferred university through WBE</li>
        <li>Submit your academic transcripts (GPA)</li>
        <li>Scholarship eligibility will be automatically determined</li>
        <li>Receive scholarship confirmation with admission letter</li>
      </ol>
      
      <h2>Scholarship Benefits</h2>
      <ul>
        <li>Significant reduction in tuition fees</li>
        <li>Makes quality education more affordable</li>
        <li>No separate application required in most cases</li>
        <li>Automatically applied based on eligibility</li>
      </ul>
      
      <h2>Get Free Scholarship Guidance</h2>
      <p>Contact WBE (Western Bangla Education) on WhatsApp for free scholarship guidance and application assistance. They will help you understand all available scholarships and maximize your benefits.</p>
    `
  },
  'visa-process-india-bangladesh': {
    title: 'Visa Process for Studying in India from Bangladesh',
    category: 'Visa Guide',
    readTime: '8 min read',
    date: '2025-01-12',
    content: `
      <h2>Student Visa Application Process for India</h2>
      
      <p>After receiving your admission letter, you need to apply for a student visa to study in India.</p>
      
      <h2>Required Documents</h2>
      <ul>
        <li>Valid passport (minimum 6 months validity)</li>
        <li>Admission letter from Indian university</li>
        <li>Academic certificates and transcripts</li>
        <li>Passport-size photographs</li>
        <li>Medical fitness certificate</li>
        <li>Financial documents (bank statements)</li>
        <li>Visa application form</li>
        <li>Proof of accommodation (if available)</li>
      </ul>
      
      <h2>Application Steps</h2>
      
      <h3>Step 1: Complete Visa Application Form</h3>
      <p>Fill out the online visa application form on the Indian visa website.</p>
      
      <h3>Step 2: Gather Documents</h3>
      <p>Collect all required documents and ensure they are properly attested.</p>
      
      <h3>Step 3: Submit Application</h3>
      <p>Submit your application at the nearest Indian visa application center in Bangladesh.</p>
      
      <h3>Step 4: Pay Visa Fee</h3>
      <p>Pay the required visa processing fee.</p>
      
      <h3>Step 5: Attend Interview (if required)</h3>
      <p>Some applicants may be called for an interview.</p>
      
      <h3>Step 6: Receive Visa</h3>
      <p>Once approved, collect your visa from the application center.</p>
      
      <h2>Processing Time</h2>
      <p>Student visa processing typically takes 2-4 weeks. It's advisable to apply well in advance of your course start date.</p>
      
      <h2>Visa Validity</h2>
      <p>Student visas are usually valid for the duration of your course. You may need to renew it if your course extends beyond the initial validity period.</p>
      
      <h2>Common Mistakes to Avoid</h2>
      <ul>
        <li>Incomplete application forms</li>
        <li>Missing or incorrect documents</li>
        <li>Applying too close to course start date</li>
        <li>Insufficient financial documentation</li>
        <li>Not following up on application status</li>
      </ul>
      
      <h2>Get Free Visa Assistance</h2>
      <p>WBE (Western Bangla Education) provides free visa application assistance. Contact them on WhatsApp for help with document preparation, form filling, and application submission.</p>
    `
  },
  'top-10-btech-programs-india': {
    title: 'Top 10 B.Tech Programs in India for Bangladeshi Students',
    category: 'Course Guide',
    readTime: '12 min read',
    date: '2025-01-11',
    content: `
      <h2>Best B.Tech Programs in India</h2>
      
      <p>India offers excellent B.Tech programs in various specializations. Here are the top programs for Bangladeshi students:</p>
      
      <h2>1. B.Tech Computer Science & Engineering (CSE)</h2>
      <ul>
        <li>Most popular and in-demand program</li>
        <li>Excellent placement opportunities</li>
        <li>High salary packages</li>
        <li>Available at all top universities</li>
      </ul>
      
      <h2>2. B.Tech Artificial Intelligence & Machine Learning</h2>
      <ul>
        <li>Cutting-edge technology</li>
        <li>High demand in industry</li>
        <li>Future-proof career</li>
        <li>Excellent growth prospects</li>
      </ul>
      
      <h2>3. B.Tech Data Science</h2>
      <ul>
        <li>Growing field with high demand</li>
        <li>Excellent career opportunities</li>
        <li>High earning potential</li>
        <li>Industry-relevant curriculum</li>
      </ul>
      
      <h2>4. B.Tech Cyber Security</h2>
      <ul>
        <li>Critical field with increasing demand</li>
        <li>High job security</li>
        <li>Competitive salaries</li>
        <li>Specialized skills</li>
      </ul>
      
      <h2>5. B.Tech Cloud Computing</h2>
      <ul>
        <li>Industry partnerships with AWS, Azure</li>
        <li>High demand in cloud services</li>
        <li>Excellent placement records</li>
        <li>Modern curriculum</li>
      </ul>
      
      <h2>6. B.Tech Information Technology (IT)</h2>
      <ul>
        <li>Broad career opportunities</li>
        <li>Strong industry connections</li>
        <li>Good placement rates</li>
        <li>Versatile skills</li>
      </ul>
      
      <h2>7. B.Tech Full Stack Development</h2>
      <ul>
        <li>Comprehensive web development skills</li>
        <li>High demand in startups and MNCs</li>
        <li>Entrepreneurship opportunities</li>
        <li>Practical, hands-on learning</li>
      </ul>
      
      <h2>8. B.Tech Internet of Things (IoT)</h2>
      <ul>
        <li>Emerging technology</li>
        <li>Growing industry demand</li>
        <li>Innovation-focused</li>
        <li>Future-oriented career</li>
      </ul>
      
      <h2>9. B.Tech Blockchain Technology</h2>
      <ul>
        <li>Revolutionary technology</li>
        <li>High growth potential</li>
        <li>Specialized knowledge</li>
        <li>Innovation opportunities</li>
      </ul>
      
      <h2>10. B.Tech Electronics & Communication Engineering</h2>
      <ul>
        <li>Traditional and stable field</li>
        <li>Good placement opportunities</li>
        <li>Diverse career paths</li>
        <li>Strong industry presence</li>
      </ul>
      
      <h2>How to Choose the Right Program</h2>
      <ul>
        <li>Consider your interests and career goals</li>
        <li>Research job market demand</li>
        <li>Check university rankings and placements</li>
        <li>Compare fees and scholarships</li>
        <li>Review curriculum and specializations</li>
      </ul>
      
      <h2>Get Free Course Selection Guidance</h2>
      <p>Contact WBE (Western Bangla Education) on WhatsApp for free counseling on choosing the right B.Tech program. They will help you compare programs, fees, and career prospects.</p>
    `
  },
  'mba-india-bangladeshi-students': {
    title: 'MBA in India: Complete Guide for Bangladeshi Students',
    category: 'Course Guide',
    readTime: '14 min read',
    date: '2025-01-10',
    content: `
      <h2>MBA Programs in India for Bangladeshi Students</h2>
      
      <p>India offers world-class MBA programs that are highly recognized globally. This guide covers everything you need to know about pursuing an MBA in India.</p>
      
      <h2>Why Study MBA in India?</h2>
      <ul>
        <li>Affordable compared to Western countries</li>
        <li>High-quality education with industry exposure</li>
        <li>Excellent placement opportunities</li>
        <li>Diverse specializations available</li>
        <li>Strong alumni networks</li>
        <li>International recognition</li>
      </ul>
      
      <h2>Top MBA Specializations</h2>
      
      <h3>1. MBA in Finance</h3>
      <p>Focus on financial management, investment banking, and corporate finance.</p>
      
      <h3>2. MBA in Marketing</h3>
      <p>Learn about brand management, digital marketing, and consumer behavior.</p>
      
      <h3>3. MBA in Human Resources</h3>
      <p>Specialize in talent management, organizational behavior, and HR strategy.</p>
      
      <h3>4. MBA in Operations</h3>
      <p>Focus on supply chain management, logistics, and process optimization.</p>
      
      <h3>5. MBA in Information Technology</h3>
      <p>Combine business management with IT knowledge for tech leadership roles.</p>
      
      <h3>6. MBA in International Business</h3>
      <p>Prepare for global business careers with international trade and management focus.</p>
      
      <h2>Admission Requirements</h2>
      <ul>
        <li>Bachelor's degree (any discipline)</li>
        <li>Minimum 50% marks in graduation</li>
        <li>Entrance exam scores (CAT, MAT, GMAT, or university-specific)</li>
        <li>Work experience (preferred but not always required)</li>
        <li>English proficiency (if applicable)</li>
      </ul>
      
      <h2>Fee Structure</h2>
      <p>MBA fees in India range from ₹2-15 lakhs per year depending on the university. Many universities offer scholarships for Bangladeshi students.</p>
      
      <h2>Placement Opportunities</h2>
      <p>Top Indian business schools have excellent placement records with average salaries ranging from ₹5-20 lakhs per annum. Major recruiters include:</p>
      <ul>
        <li>Consulting firms (McKinsey, BCG, Deloitte)</li>
        <li>Investment banks</li>
        <li>Technology companies</li>
        <li>FMCG companies</li>
        <li>E-commerce giants</li>
      </ul>
      
      <h2>Top Universities for MBA</h2>
      <ul>
        <li>Chandigarh University - Strong placements, modern curriculum</li>
        <li>Sharda University - Industry partnerships, excellent faculty</li>
        <li>Galgotias University - Good ROI, diverse specializations</li>
        <li>NIU - Affordable fees, quality education</li>
      </ul>
      
      <h2>Career Prospects</h2>
      <p>MBA graduates can pursue careers in:</p>
      <ul>
        <li>Management consulting</li>
        <li>Investment banking</li>
        <li>Product management</li>
        <li>Business development</li>
        <li>Entrepreneurship</li>
        <li>Corporate leadership roles</li>
      </ul>
      
      <h2>Get Free MBA Admission Guidance</h2>
      <p>Contact WBE (Western Bangla Education) on WhatsApp for free counseling on MBA programs in India. They will help you choose the right specialization, university, and guide you through the admission process.</p>
    `
  },
  'cost-living-india-bangladeshi-students': {
    title: 'Cost of Living in India for Bangladeshi Students',
    category: 'Financial Guide',
    readTime: '10 min read',
    date: '2025-01-09',
    content: `
      <h2>Cost of Living in India for Bangladeshi Students</h2>
      
      <p>Understanding the cost of living is crucial for planning your education in India. This guide provides a detailed breakdown of expenses.</p>
      
      <h2>Monthly Living Expenses</h2>
      
      <h3>Accommodation</h3>
      <ul>
        <li><strong>University Hostel:</strong> ₹3,000 - ₹8,000 per month</li>
        <li><strong>Private Hostel/PG:</strong> ₹5,000 - ₹12,000 per month</li>
        <li><strong>Shared Apartment:</strong> ₹8,000 - ₹15,000 per month (shared)</li>
        <li><strong>Private Apartment:</strong> ₹15,000 - ₹25,000 per month</li>
      </ul>
      
      <h3>Food</h3>
      <ul>
        <li><strong>University Mess:</strong> ₹2,500 - ₹4,000 per month</li>
        <li><strong>Outside Food:</strong> ₹3,000 - ₹6,000 per month</li>
        <li><strong>Cooking at Home:</strong> ₹2,000 - ₹4,000 per month</li>
      </ul>
      
      <h3>Transportation</h3>
      <ul>
        <li><strong>Local Transport:</strong> ₹500 - ₹1,500 per month</li>
        <li><strong>Metro/Bus Pass:</strong> ₹500 - ₹1,000 per month</li>
        <li><strong>Auto/Taxi:</strong> ₹1,000 - ₹3,000 per month (occasional)</li>
      </ul>
      
      <h3>Utilities</h3>
      <ul>
        <li><strong>Electricity:</strong> ₹500 - ₹1,500 per month</li>
        <li><strong>Internet:</strong> ₹500 - ₹1,000 per month</li>
        <li><strong>Mobile Phone:</strong> ₹200 - ₹500 per month</li>
      </ul>
      
      <h3>Personal Expenses</h3>
      <ul>
        <li><strong>Entertainment:</strong> ₹1,000 - ₹3,000 per month</li>
        <li><strong>Shopping:</strong> ₹1,000 - ₹3,000 per month</li>
        <li><strong>Medical:</strong> ₹500 - ₹1,500 per month</li>
        <li><strong>Miscellaneous:</strong> ₹1,000 - ₹2,000 per month</li>
      </ul>
      
      <h2>Total Monthly Expenses</h2>
      <p><strong>Budget Option:</strong> ₹10,000 - ₹15,000 per month</p>
      <p><strong>Moderate Option:</strong> ₹15,000 - ₹25,000 per month</p>
      <p><strong>Comfortable Option:</strong> ₹25,000 - ₹40,000 per month</p>
      
      <h2>Annual Expenses Breakdown</h2>
      <ul>
        <li><strong>Tuition Fees:</strong> Varies by university and course (with scholarships)</li>
        <li><strong>Living Expenses:</strong> ₹1,20,000 - ₹3,00,000 per year</li>
        <li><strong>Books & Supplies:</strong> ₹10,000 - ₹20,000 per year</li>
        <li><strong>Travel (Home):</strong> ₹20,000 - ₹40,000 per year</li>
        <li><strong>Emergency Fund:</strong> ₹20,000 - ₹50,000</li>
      </ul>
      
      <h2>Cost-Saving Tips</h2>
      <ul>
        <li>Choose university hostel accommodation</li>
        <li>Use university mess for meals</li>
        <li>Use public transportation</li>
        <li>Look for student discounts</li>
        <li>Share accommodation with roommates</li>
        <li>Cook meals at home when possible</li>
        <li>Take advantage of university facilities</li>
      </ul>
      
      <h2>City-wise Cost Comparison</h2>
      <ul>
        <li><strong>Delhi NCR:</strong> Moderate to high cost</li>
        <li><strong>Chandigarh:</strong> Moderate cost, good quality of life</li>
        <li><strong>Noida:</strong> Moderate cost, modern infrastructure</li>
        <li><strong>Greater Noida:</strong> Lower cost, developing area</li>
      </ul>
      
      <h2>Financial Planning</h2>
      <p>Plan your finances considering:</p>
      <ul>
        <li>Tuition fees (with scholarships)</li>
        <li>Living expenses for 4 years</li>
        <li>Travel expenses</li>
        <li>Emergency funds</li>
        <li>Currency exchange rates</li>
      </ul>
      
      <h2>Get Free Financial Guidance</h2>
      <p>Contact WBE (Western Bangla Education) on WhatsApp for free financial planning guidance. They will help you understand all costs and plan your budget effectively.</p>
    `
  },
  'naac-a-plus-universities-india': {
    title: 'NAAC A+ Universities in India: Why It Matters',
    category: 'University Guide',
    readTime: '8 min read',
    date: '2025-01-08',
    content: `
      <h2>Understanding NAAC Accreditation</h2>
      
      <p>NAAC (National Assessment and Accreditation Council) is an autonomous body that assesses and accredits higher education institutions in India. NAAC A+ is the highest accreditation grade.</p>
      
      <h2>What is NAAC A+?</h2>
      <p>NAAC A+ accreditation indicates that a university has achieved excellence in:</p>
      <ul>
        <li>Teaching and learning</li>
        <li>Research and innovation</li>
        <li>Infrastructure and facilities</li>
        <li>Student support services</li>
        <li>Governance and leadership</li>
        <li>Institutional values and best practices</li>
      </ul>
      
      <h2>Why NAAC A+ Matters</h2>
      
      <h3>1. Quality Assurance</h3>
      <p>NAAC A+ ensures that the university maintains high standards in education, infrastructure, and student services.</p>
      
      <h3>2. Recognition</h3>
      <p>Degrees from NAAC A+ universities are highly recognized by employers and other educational institutions globally.</p>
      
      <h3>3. Better Opportunities</h3>
      <p>NAAC A+ universities typically have:</p>
      <ul>
        <li>Better placement records</li>
        <li>Stronger industry partnerships</li>
        <li>More research opportunities</li>
        <li>Better infrastructure</li>
        <li>Experienced faculty</li>
      </ul>
      
      <h3>4. Government Recognition</h3>
      <p>NAAC A+ universities receive better government support and funding, which benefits students.</p>
      
      <h2>NAAC A+ Universities Featured on NextGen Learning</h2>
      
      <h3>1. Chandigarh University</h3>
      <ul>
        <li>NAAC A+ Accredited</li>
        <li>NIRF Rank 32</li>
        <li>Excellent placement records</li>
        <li>Modern infrastructure</li>
      </ul>
      
      <h3>2. Sharda University</h3>
      <ul>
        <li>NAAC A+ Accredited</li>
        <li>NIRF Rank 101-150</li>
        <li>Strong industry partnerships</li>
        <li>International collaborations</li>
      </ul>
      
      <h3>3. Galgotias University</h3>
      <ul>
        <li>NAAC A+ Accredited</li>
        <li>NIRF Rank 101-150</li>
        <li>Excellent tech programs</li>
        <li>High placement rates</li>
      </ul>
      
      <h3>4. Noida International University (NIU)</h3>
      <ul>
        <li>NAAC A+ Accredited</li>
        <li>NIRF Rank 201-250</li>
        <li>Affordable fees</li>
        <li>Quality education</li>
      </ul>
      
      <h2>Benefits of Studying at NAAC A+ Universities</h2>
      <ul>
        <li>Quality education guaranteed</li>
        <li>Better career prospects</li>
        <li>Recognized degrees</li>
        <li>Excellent infrastructure</li>
        <li>Experienced faculty</li>
        <li>Strong industry connections</li>
        <li>Research opportunities</li>
        <li>Student support services</li>
      </ul>
      
      <h2>How to Verify NAAC Accreditation</h2>
      <p>You can verify a university's NAAC accreditation by:</p>
      <ol>
        <li>Visiting the NAAC official website</li>
        <li>Checking the university's official website</li>
        <li>Reviewing university brochures and documents</li>
        <li>Contacting the university directly</li>
      </ol>
      
      <h2>Conclusion</h2>
      <p>Choosing a NAAC A+ accredited university ensures you receive quality education and better career opportunities. All universities featured on NextGen Learning are NAAC A+ accredited, ensuring excellence in education.</p>
      
      <h2>Get Free University Selection Guidance</h2>
      <p>Contact WBE (Western Bangla Education) on WhatsApp for free guidance on choosing the right NAAC A+ accredited university. They will help you compare universities and make informed decisions.</p>
    `
  }
};

export default function GuideDetail() {
  const { slug } = useParams();
  const guide = guideContent[slug];

  if (!guide) {
    return (
      <>
        <SEOHead
          title="Guide Not Found | NextGen Learning"
          description="The requested guide article could not be found."
          url="/guides"
          noindex={true}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-2xl font-bold mb-4">Guide Not Found</h1>
          <p className="text-gray-600 mb-4">The guide article you're looking for doesn't exist.</p>
          <Link to="/guides" className="text-blue-600 hover:text-blue-800">
            ← Back to Guides
          </Link>
        </div>
      </>
    );
  }

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Guides & Resources', url: '/guides' },
    { name: guide.title, url: `/guides/${slug}` }
  ];

  // Generate enhanced description for SEO
  const cleanContent = guide.content.replace(/<[^>]*>/g, '').trim();
  const metaDescription = cleanContent.length > 160 
    ? cleanContent.substring(0, 157) + '...'
    : cleanContent;
  
  // Enhanced keywords based on guide category and content
  const getKeywords = () => {
    const baseKeywords = [
      'tech education',
      'IT courses India',
      'study in India',
      'NextGen Learning',
      'tech courses guide',
      'Indian universities',
      'Bangladeshi students India'
    ];
    
    const categoryKeywords = {
      'Admission Guide': ['admission process', 'how to apply', 'university admission', 'admission requirements'],
      'Application Process': ['application guide', 'how to apply', 'application steps', 'university application'],
      'Scholarships': ['scholarships India', 'student scholarships', 'financial aid', 'scholarship guide'],
      'Visa Guide': ['student visa', 'India visa', 'visa application', 'visa process'],
      'Course Guide': ['B.Tech programs', 'MBA India', 'tech courses', 'course selection'],
      'Financial Guide': ['cost of living', 'living expenses', 'student budget', 'India expenses'],
      'University Guide': ['NAAC accreditation', 'university rankings', 'best universities', 'university selection']
    };
    
    const titleKeywords = guide.title.toLowerCase()
      .split(' ')
      .filter(word => word.length > 3)
      .slice(0, 5);
    
    return [...baseKeywords, ...(categoryKeywords[guide.category] || []), ...titleKeywords];
  };

  const articleSchema = generateArticleSchema({
    title: guide.title,
    description: metaDescription,
    author: 'NextGen Learning',
    datePublished: guide.date,
    dateModified: guide.date,
    url: `/guides/${slug}`,
    keywords: getKeywords().join(', '),
    articleSection: guide.category
  });

  const handleWhatsAppClick = () => {
    trackWhatsAppClick('guide_detail_page', guide.title, '');
    const message = `Hello WBE Team,

I read the guide: "${guide.title}"

I'm interested in applying to study tech/IT courses in India. Please help me with:
- University selection
- Application process
- Document requirements
- Scholarship opportunities

I'm ready to send my documents and basic information.

Thank you!`;
    redirectToWhatsApp(message, 'guide_detail_page', guide.title, '');
  };

  return (
    <>
      <SEOHead
        title={`${guide.title} - ${guide.category} | NextGen Learning`}
        description={metaDescription}
        keywords={getKeywords()}
        url={`/guides/${slug}`}
        canonical={`/guides/${slug}`}
        type="article"
      />
      {articleSchema && <StructuredData data={articleSchema} />}
      {generateBreadcrumbSchema(breadcrumbs) && <StructuredData data={generateBreadcrumbSchema(breadcrumbs)} />}
      <Breadcrumbs items={breadcrumbs} />

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
        {/* Header */}
        <header className="mb-8 sm:mb-10 border-b border-gray-200 pb-6 sm:pb-8">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
            <span className="text-xs sm:text-sm font-semibold text-blue-600 uppercase tracking-wide bg-blue-50 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-blue-100">
              {guide.category}
            </span>
            <span className="text-xs sm:text-sm text-gray-500 flex items-center">
              <span className="mr-1">⏱️</span> {guide.readTime}
            </span>
            <span className="text-xs sm:text-sm text-gray-500 flex items-center">
              <span className="mr-1">📅</span> {new Date(guide.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 leading-tight text-gray-900">
            {guide.title}
          </h1>
        </header>

        {/* Content */}
        <div 
          className="article-content mb-8 sm:mb-12 prose prose-lg prose-blue max-w-none"
          dangerouslySetInnerHTML={{ 
            __html: typeof window !== 'undefined' && window.DOMPurify 
              ? window.DOMPurify.sanitize(guide.content || '', { 
                  ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'u', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'li', 'a', 'blockquote', 'code', 'pre'],
                  ALLOWED_ATTR: ['href', 'target', 'rel', 'class']
                })
              : guide.content || ''
          }}
          style={{
            '--tw-prose-body': '#4b5563',
            '--tw-prose-headings': '#111827',
            '--tw-prose-lead': '#4b5563',
            '--tw-prose-links': '#2563eb',
            '--tw-prose-bold': '#111827',
            '--tw-prose-counters': '#6b7280',
            '--tw-prose-bullets': '#3b82f6',
            '--tw-prose-hr': '#e5e7eb',
            '--tw-prose-quotes': '#111827',
            '--tw-prose-quote-borders': '#e5e7eb',
            '--tw-prose-captions': '#6b7280',
            '--tw-prose-code': '#111827',
            '--tw-prose-pre-code': '#e5e7eb',
            '--tw-prose-pre-bg': '#1f2937',
            '--tw-prose-th-borders': '#d1d5db',
            '--tw-prose-td-borders': '#e5e7eb',
          }}
        />

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl p-6 sm:p-8 md:p-10 text-center mb-8 sm:mb-10 shadow-lg">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5">Ready to Apply?</h2>
            <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 text-green-50 leading-relaxed">
              Get free application assistance from WBE (Western Bangla Education). 
              Message them on WhatsApp with your documents and basic information - they will help you for free!
            </p>
            <button
              onClick={handleWhatsAppClick}
              className="w-full sm:w-auto bg-white text-green-600 px-8 sm:px-10 py-4 rounded-lg font-semibold hover:bg-green-50 transition-all min-h-[44px] text-base sm:text-lg shadow-xl hover:shadow-2xl transform hover:scale-105"
            >
              📱 Message WBE on WhatsApp - Free Application Help
            </button>
            <p className="text-xs sm:text-sm text-green-100 mt-4">
              WhatsApp: +8801611533385 | All services are completely free
            </p>
          </div>
        </section>

        {/* Related Guides / Back Navigation */}
        <div className="border-t border-gray-200 pt-6 sm:pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <Link
              to="/guides"
              className="text-blue-600 hover:text-blue-800 font-semibold text-sm sm:text-base flex items-center gap-2 transition-colors"
            >
              <span>←</span> <span>Back to All Guides</span>
            </Link>
            <Link
              to="/apply"
              className="text-blue-600 hover:text-blue-800 font-semibold text-sm sm:text-base flex items-center gap-2 transition-colors"
            >
              <span>Apply Now</span> <span>→</span>
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}

