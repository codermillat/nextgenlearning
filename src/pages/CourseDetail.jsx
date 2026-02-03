import { useParams, Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import MetaManager from '../components/SEO/MetaManager';
import StructuredData from '../components/SEO/StructuredData';
import UrgencyBanner from '../components/UI/UrgencyBanner';
import Breadcrumbs from '../components/Common/Breadcrumbs';
import FAQSection from '../components/SEO/FAQSection';
import DetailedFeeBreakdown from '../components/Course/DetailedFeeBreakdown';
import CourseReview from '../components/Course/CourseReview';
import CurriculumStructure from '../components/Course/CurriculumStructure';
import { generateCourseSchema, generateBreadcrumbSchema } from '../components/SEO/StructuredData';
import { calculateTotalFees } from '../utils/rankings';
import { redirectToWhatsApp, generateApplicationMessage } from '../utils/whatsappRedirect';
import { trackCourseView } from '../utils/analytics';
import { typography } from '../utils/designTokens';
import { WHATSAPP_DISPLAY, SHARDA_APPLY_URL } from '../config/constants';
import { getRelatedCourses } from '../utils/linkingStrategy';
import { useEffect } from 'react';

export default function CourseDetail() {
  const { universitySlug, courseSlug } = useParams();
  const { getProgramByUniversityAndCourse, getUniversityBySlug, getProgramsByUniversity, allPrograms, loading } = useData();
  
  const university = getUniversityBySlug(universitySlug);
  const program = university ? getProgramByUniversityAndCourse(universitySlug, courseSlug) : null;
  
  // Track course view
  useEffect(() => {
    if (program && university) {
      trackCourseView(program.name || '', university.name || '');
    }
  }, [program, university]);

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Universities', url: '/universities' },
    { name: university?.name || 'University', url: `/universities/${universitySlug}` },
    { name: 'Courses', url: `/universities/${universitySlug}/courses` },
    { name: program?.name || 'Course', url: `/universities/${universitySlug}/courses/${courseSlug}` }
  ];

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" aria-live="polite" aria-busy="true">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4" role="status" aria-label="Loading">
              <span className="sr-only">Loading course details...</span>
            </div>
            <p className="text-gray-700" aria-live="polite">Loading course details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!program || !university) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold mb-4">Course Not Found</h1>
        <Link to="/courses" className="text-blue-600">← Back to Courses</Link>
      </div>
    );
  }

  const fees = calculateTotalFees(program, university);
  const courseUrl = `/universities/${universitySlug}/courses/${courseSlug}`;
  const courseSchema = generateCourseSchema(program, university, courseUrl);

  const faqs = [
    {
      question: `What is the complete fee structure for ${program.name} at ${university.name}?`,
      answer: `The total cost for ${program.name} at ${university.name} is approximately ₹${fees.grandTotal.toLocaleString()} for ${program.duration} years, including all fees. This includes tuition fees (₹${(fees.totalAfterScholarship / program.duration).toLocaleString()} per year after ${fees.scholarshipPercent}% scholarship), one-time admission fees (₹${fees.oneTimeFees.toLocaleString()}), and other recurring charges. Use the fee calculator above to see detailed year-wise breakdown and all scholarship tiers.`
    },
    {
      question: `What scholarships are available and what are the eligibility criteria?`,
      answer: `${university.name} offers ${fees.scholarshipPercent}% scholarship for Bangladeshi students. ${university.id === 'niu' ? 'All Bangladeshi students are eligible for 50% scholarship regardless of GPA - no minimum GPA requirement.' : university.id === 'sharda' ? 'Scholarships are GPA-based: up to 50% for GPA 3.5+, 30% for GPA 3.0-3.49, and 20% for GPA 3.0+. Check the detailed fee breakdown above to see all scholarship tiers and their eligibility criteria.' : 'Scholarship details vary by program. Check the detailed fee breakdown section above for specific scholarship information and eligibility criteria.'}`
    },
    {
      question: `What are the career prospects and job opportunities after ${program.name}?`,
      answer: `${program.name} offers excellent career opportunities across various sectors. Graduates can work in private companies, government organizations, research institutions, startups, and pursue higher education. ${university.name} provides comprehensive placement assistance, including resume building, interview preparation, and industry connections. The university has strong relationships with leading companies, ensuring excellent placement opportunities.`
    },
    {
      question: `What is the admission process and what documents are required?`,
      answer: `The admission process is straightforward. Steps include: submitting your application, providing academic transcripts and required documents, scholarship eligibility determination, receiving admission letter and visa support documents, completing visa application, and arriving in India. Required documents include SSC/HSC transcripts, passport, photographs, birth certificate, medical certificate, and financial documents. Free guidance is available throughout the entire process.`
    },
    {
      question: `What is the curriculum structure and teaching methodology?`,
      answer: `The ${program.duration}-year ${program.name} program combines theoretical learning with practical experience. The curriculum includes coursework, laboratory sessions, workshops, projects, internships, and research activities. Teaching methods include lectures, case studies, group discussions, presentations, and practical assignments. The curriculum is regularly updated to align with industry standards and emerging trends.`
    },
    {
      question: `What facilities and infrastructure are available at ${university.name}?`,
      answer: `${university.name} provides modern infrastructure including well-equipped laboratories, libraries with extensive resources, computer labs, hostels, cafeterias, sports facilities, and recreational areas. The campus offers a conducive learning environment with WiFi connectivity, modern classrooms, and research facilities. ${university.profile?.highlights ? `Key highlights include: ${university.profile.highlights.slice(0, 3).join(', ')}.` : ''}`
    },
    {
      question: `Is there any financial assistance or payment plan available?`,
      answer: `Yes, ${university.name} offers scholarships for Bangladeshi students which significantly reduce tuition fees. Additionally, fees can be paid year-wise, making it more manageable. The one-time fees are charged only in the first year, and recurring fees apply from the second year onwards. Free guidance is available on financial planning and payment options.`
    },
    {
      question: `How do I get more information or apply for ${program.name}?`,
      answer: `You can get more information and apply completely free. We provide free counseling, application assistance, visa support, document verification, and admission guidance. Click the "Apply Now" button on this page or contact us directly via WhatsApp at ${WHATSAPP_DISPLAY}. All services are provided at no cost to students.`
    }
  ];

  // Generate optimized meta description elements
  const emoji = '🎓';
  const benefit = `${program.degree} at ${university.shortName}`;
  const socialProof = university.profile?.rankings?.nirf 
    ? `NIRF ${university.profile.rankings.nirf}` 
    : `${university.shortName} ranked`;
  const price = `₹${Math.round(fees.grandTotal / 100000)}L total`;
  const urgency = `${fees.scholarshipPercent}% scholarship`;
  const cta = 'Apply 2026';
  
  const baseTitle = `${program.name} at ${university.shortName}`;

  return (
    <>
      <MetaManager
        emoji={emoji}
        benefit={benefit}
        socialProof={socialProof}
        price={price}
        urgency={urgency}
        cta={cta}
        baseTitle={baseTitle}
        url={courseUrl}
      />
      <StructuredData data={courseSchema} />
      {generateBreadcrumbSchema(breadcrumbs) && <StructuredData data={generateBreadcrumbSchema(breadcrumbs)} />}
      {/* FAQ schema is generated by FAQSection component below */}
      
      {/* Urgency Banner */}
      <UrgencyBanner
        deadline="2026-03-31"
        seatsLeft={28}
        ctaText="Apply Now"
        ctaLink={university.id === 'sharda' ? SHARDA_APPLY_URL : '/apply'}
        variant="course"
      />
      
      <Breadcrumbs items={breadcrumbs} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
        {/* Page Intro */}
        <section className="mb-6 sm:mb-8">
          <div className="mb-4">
            <Link
              to={`/universities/${university.slug}/courses`}
              className="text-blue-600 hover:text-blue-800 font-semibold text-sm sm:text-base inline-flex items-center mb-3"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to All Courses
            </Link>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 leading-tight">{program.name} - Complete Review & Guide</h1>
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-4">
            <p className="text-base sm:text-lg text-gray-600">
              Offered by <Link to={`/universities/${university.slug}`} className="text-blue-600 font-semibold hover:underline">{university.name}</Link>
              {' '}({university.shortName})
            </p>
            {university.profile?.rankings?.nirf && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs sm:text-sm font-medium bg-blue-100 text-blue-800">
                NIRF {university.profile.rankings.nirf}
              </span>
            )}
            {university.profile?.rankings?.naac && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs sm:text-sm font-medium bg-green-100 text-green-800">
                NAAC {university.profile.rankings.naac}
              </span>
            )}
          </div>
          {program.specialization && (
            <div className="mb-4">
              <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 rounded-md text-sm sm:text-base font-medium">
                Specialization: {program.specialization}
              </span>
            </div>
          )}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500 p-4 sm:p-5 rounded-lg shadow-sm">
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              <strong className="text-blue-900">Quick Summary:</strong> This comprehensive guide provides detailed information about {program.name} at {university.name}, 
              including complete fee structure with all scholarship tiers, eligibility criteria, curriculum details, career prospects, 
              admission process, and everything you need to make an informed decision about your higher education in India.
            </p>
          </div>
        </section>

        {/* Overview Cards */}
        <section className="mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Program Overview</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-5 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-xs sm:text-sm text-gray-600 mb-1 uppercase tracking-wide">Degree</div>
              <div className="text-lg sm:text-xl font-bold text-gray-900">{program.degree}</div>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-5 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-xs sm:text-sm text-gray-600 mb-1 uppercase tracking-wide">Duration</div>
              <div className="text-lg sm:text-xl font-bold text-gray-900">{program.duration} years</div>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-5 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-xs sm:text-sm text-gray-600 mb-1 uppercase tracking-wide">Field</div>
              <div className="text-lg sm:text-xl font-bold text-gray-900">{program.field}</div>
            </div>
          </div>
        </section>

        {/* Detailed Fee Breakdown */}
        <section className="mb-8">
          <DetailedFeeBreakdown program={program} university={university} />
        </section>

        {/* Fee Structure & Scholarship Details - SEO Optimized */}
        <section className="mb-8 bg-gradient-to-br from-green-50 to-blue-50 border border-green-200 rounded-xl p-6 sm:p-8">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-900">
            {program.name} Total Fees {program.duration} Years - Complete Breakdown
          </h2>
          
          <div className="space-y-4 mb-6">
            <div className="bg-white rounded-lg p-4 sm:p-5 border border-gray-200">
              <h3 className="font-semibold mb-3 text-gray-900">Total Cost After Scholarship</h3>
              <p className={`${typography.body} mb-2`}>
                The total cost for {program.name} at {university.name} is <strong>₹{fees.grandTotal.toLocaleString()}</strong> for {program.duration} years, 
                after applying the maximum available scholarship of <strong>{fees.scholarshipPercent}%</strong> for Bangladeshi students.
              </p>
              <p className={`${typography.body}`}>
                This includes all tuition fees, one-time admission fees, and other recurring charges. The fee structure is designed to be affordable 
                for international students, with generous scholarships automatically applied.
              </p>
            </div>

            <div className="bg-white rounded-lg p-4 sm:p-5 border border-gray-200">
              <h3 className="font-semibold mb-3 text-gray-900">Annual Fee Breakdown</h3>
              <p className={`${typography.body} mb-2`}>
                Annual tuition fee after {fees.scholarshipPercent}% scholarship: approximately <strong>₹{Math.round(fees.totalAfterScholarship / program.duration).toLocaleString()}</strong> per year.
              </p>
              <p className={`${typography.body}`}>
                One-time admission fees (charged only in the first year): <strong>₹{fees.oneTimeFees.toLocaleString()}</strong>. 
                This includes registration, admission processing, and other one-time charges.
              </p>
            </div>

            <div className="bg-white rounded-lg p-4 sm:p-5 border border-gray-200">
              <h3 className="font-semibold mb-3 text-gray-900">Scholarship Eligibility & Details</h3>
              {university.id === 'niu' ? (
                <p className={`${typography.body}`}>
                  <strong>Noida International University</strong> offers a <strong>flat 50% scholarship</strong> to all Bangladeshi students, 
                  regardless of GPA or academic performance. This scholarship is automatically applied and renewable annually throughout the program duration. 
                  No separate scholarship application is required.
                </p>
              ) : university.id === 'sharda' ? (
                <p className={`${typography.body}`}>
                  <strong>Sharda University</strong> offers GPA-based scholarships for Bangladeshi students:
                  <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                    <li>Up to <strong>50% scholarship</strong> for GPA 3.5+ (HSC/SSC)</li>
                    <li><strong>30% scholarship</strong> for GPA 3.0-3.49</li>
                    <li><strong>20% scholarship</strong> for GPA 3.0+</li>
                  </ul>
                  Scholarships are automatically calculated based on your academic transcripts and are renewable annually.
                </p>
              ) : university.id === 'chandigarh' ? (
                <p className={`${typography.body}`}>
                  <strong>Chandigarh University</strong> offers GPA-based scholarships ranging from <strong>35% to 50%</strong> for Bangladeshi students. 
                  The exact scholarship percentage depends on your HSC/SSC GPA and the specific program. Scholarships are automatically applied 
                  and renewable annually based on academic performance.
                </p>
              ) : (
                <p className={`${typography.body}`}>
                  <strong>Galgotias University</strong> offers program-based scholarships ranging from <strong>50% to 60%</strong> for Bangladeshi students. 
                  The scholarship percentage varies by program type and is automatically applied. Scholarships are renewable annually throughout the program.
                </p>
              )}
            </div>

            <div className="bg-white rounded-lg p-4 sm:p-5 border border-gray-200">
              <h3 className="font-semibold mb-3 text-gray-900">Payment Structure</h3>
              <p className={`${typography.body} mb-2`}>
                Fees can be paid year-wise, making it more manageable for students and families. The payment structure is:
              </p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li><strong>Year 1:</strong> One-time fees (₹{fees.oneTimeFees.toLocaleString()}) + Annual tuition fee (₹{Math.round(fees.totalAfterScholarship / program.duration).toLocaleString()})</li>
                <li><strong>Year 2-{program.duration}:</strong> Annual tuition fee only (₹{Math.round(fees.totalAfterScholarship / program.duration).toLocaleString()} per year)</li>
              </ul>
              <p className={`${typography.body} mt-2`}>
                This flexible payment structure helps students manage their finances better and reduces the initial financial burden.
              </p>
            </div>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
            <p className={`${typography.body} text-gray-800`}>
              <strong>💡 Important:</strong> All fees mentioned are approximate and include the maximum available scholarship for Bangladeshi students. 
              Actual fees may vary slightly based on specific program specializations and current fee structures. 
              For the most accurate fee information, contact us for free counseling.
            </p>
          </div>
        </section>

        {/* Detailed Course Review */}
        <section className="mb-8">
          <CourseReview program={program} university={university} />
        </section>

        {/* Curriculum Structure */}
        <CurriculumStructure program={program} />

        {/* Related Courses - Strategic Internal Linking */}
        <section className="mb-6 sm:mb-8" data-testid="related-courses-section">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-2">
            <h2 className="text-xl sm:text-2xl font-bold">Related Courses You May Like</h2>
            <Link
              to={`/universities/${university.slug}/courses`}
              className="text-blue-600 hover:text-blue-800 font-semibold text-sm sm:text-base"
            >
              View All Courses →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {(() => {
              // Get related courses using linking strategy
              const relatedLinks = getRelatedCourses(program.id, 6, allPrograms);
              
              // If we have related courses from strategy, use them
              if (relatedLinks.length > 0) {
                return relatedLinks.map((link, index) => {
                  // Find the full program data
                  const relatedProgram = allPrograms.find(p => 
                    link.url.includes(p.slug) || p.id === link.title
                  );
                  
                  if (!relatedProgram) return null;
                  
                  const relatedUniversity = relatedProgram.university || university;
                  const relatedFees = calculateTotalFees(relatedProgram, relatedUniversity);
                  
                  return (
                    <Link
                      key={index}
                      to={link.url}
                      className="bg-white p-4 sm:p-5 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 border border-gray-200 group hover:border-blue-300"
                    >
                      <h3 className="font-semibold mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                        {link.anchorText}
                      </h3>
                      <p className="text-sm text-gray-600 mb-3">{relatedProgram.degree} • {relatedProgram.duration} years</p>
                      <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                        <span className="text-xs text-gray-500">Scholarship: <span className="text-green-600 font-semibold">{relatedFees.scholarshipPercent}%</span></span>
                        <span className="text-sm text-blue-600 font-semibold group-hover:underline">View →</span>
                      </div>
                    </Link>
                  );
                }).filter(Boolean);
              }
              
              // Fallback to same university courses
              return getProgramsByUniversity(university.id)
                .filter(p => p.id !== program.id)
                .slice(0, 6)
                .map(relatedProgram => {
                  const relatedFees = calculateTotalFees(relatedProgram, university);
                  return (
                    <Link
                      key={relatedProgram.id}
                      to={`/universities/${university.slug}/courses/${relatedProgram.slug}`}
                      className="bg-white p-4 sm:p-5 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 border border-gray-200 group hover:border-blue-300"
                    >
                      <h3 className="font-semibold mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">{relatedProgram.name}</h3>
                      <p className="text-sm text-gray-600 mb-3">{relatedProgram.degree} • {relatedProgram.duration} years</p>
                      <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                        <span className="text-xs text-gray-500">Scholarship: <span className="text-green-600 font-semibold">{relatedFees.scholarshipPercent}%</span></span>
                        <span className="text-sm text-blue-600 font-semibold group-hover:underline">View →</span>
                      </div>
                    </Link>
                  );
                });
            })()}
          </div>
        </section>

        {/* FAQ Section */}
        <FAQSection faqs={faqs} title={`Frequently Asked Questions about ${program.name}`} />

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 sm:p-8 md:p-10 rounded-lg text-center text-white shadow-lg">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4">Interested in This Program?</h2>
          <p className="text-sm sm:text-base text-blue-100 mb-4 sm:mb-6 max-w-2xl mx-auto">
            Get free counseling and application assistance. 
            All services including visa support, document verification, and admission guidance are provided at no cost.
          </p>
          {university.id === 'sharda' ? (
            <a
              href={SHARDA_APPLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-white text-blue-600 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-bold hover:bg-gray-100 transition-colors min-h-[44px] text-sm sm:text-base shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform"
            >
              Apply Now - Free Consultation
            </a>
          ) : (
            <button
              onClick={() => {
                let programDisplayName = program.name;
                if (program.specialization && !programDisplayName.includes(program.specialization)) {
                  programDisplayName += ` - ${program.specialization}`;
                }
                const message = generateApplicationMessage({
                  courseInterest: program.name,
                  universityPreference: university.name,
                  programDetails: programDisplayName
                });
                redirectToWhatsApp(message, 'course_detail_page', program.name || '', university.name || '');
              }}
              className="bg-white text-blue-600 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-bold hover:bg-gray-100 transition-colors min-h-[44px] text-sm sm:text-base shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform"
            >
              Apply Now - Free Consultation
            </button>
          )}
          <p className="text-xs sm:text-sm text-blue-100 mt-4">
            📞 WhatsApp: {WHATSAPP_DISPLAY} | ✉️ Free counseling & visa support
          </p>
        </section>
      </div>
    </>
  );
}

