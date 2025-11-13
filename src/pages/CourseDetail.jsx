import { useParams, Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import SEOHead from '../components/SEO/SEOHead';
import StructuredData from '../components/SEO/StructuredData';
import Breadcrumbs from '../components/Common/Breadcrumbs';
import FAQSection from '../components/SEO/FAQSection';
import DetailedFeeBreakdown from '../components/Course/DetailedFeeBreakdown';
import CourseReview from '../components/Course/CourseReview';
import CurriculumStructure from '../components/Course/CurriculumStructure';
import { generateCourseSchema, generateBreadcrumbSchema } from '../components/SEO/StructuredData';
import { calculateTotalFees } from '../utils/rankings';
import { redirectToWhatsApp, generateApplicationMessage } from '../utils/whatsappRedirect';
import { trackCourseView } from '../utils/analytics';
import { useEffect } from 'react';

export default function CourseDetail() {
  const { universitySlug, courseSlug } = useParams();
  const { getProgramByUniversityAndCourse, getUniversityBySlug, getProgramsByUniversity, universities, loading } = useData();
  
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
    return <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">Loading course details...</div>;
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
      answer: `The admission process is simple when you apply through Western Bangla Education (WBE). Steps include: submitting application through WBE, providing academic transcripts and required documents, scholarship eligibility determination, receiving admission letter and visa support documents, completing visa application with WBE assistance, and arriving in India. Required documents include SSC/HSC transcripts, passport, photographs, birth certificate, medical certificate, and financial documents. WBE provides free guidance throughout the entire process.`
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
      answer: `Yes, ${university.name} offers scholarships for Bangladeshi students which significantly reduce tuition fees. Additionally, fees can be paid year-wise, making it more manageable. The one-time fees are charged only in the first year, and recurring fees apply from the second year onwards. WBE can provide guidance on financial planning and payment options.`
    },
    {
      question: `How do I get more information or apply for ${program.name}?`,
      answer: `You can get more information and apply through Western Bangla Education (WBE) completely free. WBE provides free counseling, application assistance, visa support, document verification, and admission guidance. Click the "Apply Now" button on this page or contact WBE directly via WhatsApp at +8801611533385. All services are provided at no cost to students.`
    }
  ];

  return (
    <>
      <SEOHead
        title={`${program.name} at ${university.name} ${program.duration} Years - Fees ₹${fees.grandTotal.toLocaleString()}, Scholarships ${fees.scholarshipPercent}%, Curriculum, Rankings | NextGen Learning`}
        description={`${program.name} at ${university.name}: Complete guide with fees (₹${fees.grandTotal.toLocaleString()} total), ${fees.scholarshipPercent}% scholarships, ${program.duration}-year ${program.degree} program. ${program.curriculum ? `Curriculum: ${program.curriculum.totalCredits} credits. ` : ''}NIRF ${university.profile?.rankings?.nirf || 'Ranked'}, NAAC ${university.profile?.rankings?.naac || 'A+'}. Eligibility, admission process, career prospects, and placement records. Compare tech courses at NextGen Learning.`}
        keywords={[
          program.name,
          `${program.name} at ${university.name}`,
          `${program.name} fees`,
          `${program.name} scholarship`,
          `${program.name} admission`,
          `${program.name} review`,
          `${university.name} ${program.name}`,
          'study in India',
          'Bangladeshi students',
          program.degree,
          program.field
        ]}
        url={courseUrl}
        canonical={courseUrl}
      />
      <StructuredData data={courseSchema} />
      {generateBreadcrumbSchema(breadcrumbs) && <StructuredData data={generateBreadcrumbSchema(breadcrumbs)} />}
      {/* FAQ schema is generated by FAQSection component below */}
      <Breadcrumbs items={breadcrumbs} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Intro */}
        <section className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{program.name} - Complete Review & Guide</h1>
          <p className="text-lg text-gray-600 mb-4">
            Offered by <Link to={`/universities/${university.slug}`} className="text-blue-600 font-semibold">{university.name}</Link>
            {' '}({university.shortName})
          </p>
          {program.specialization && (
            <p className="text-xl text-gray-700 mb-4">Specialization: {program.specialization}</p>
          )}
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
            <p className="text-gray-700">
              <strong>Quick Summary:</strong> This comprehensive guide provides detailed information about {program.name} at {university.name}, 
              including complete fee structure with all scholarship tiers, eligibility criteria, curriculum details, career prospects, 
              admission process, and everything you need to make an informed decision about your higher education in India.
            </p>
          </div>
        </section>

        {/* Overview */}
        <section className="mb-8 bg-gray-50 p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Program Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="text-sm text-gray-600">Degree</div>
              <div className="text-lg font-semibold">{program.degree}</div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Duration</div>
              <div className="text-lg font-semibold">{program.duration} years</div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Field</div>
              <div className="text-lg font-semibold">{program.field}</div>
            </div>
          </div>
        </section>

        {/* Detailed Fee Breakdown */}
        <section className="mb-8">
          <DetailedFeeBreakdown program={program} university={university} />
        </section>

        {/* Detailed Course Review */}
        <section className="mb-8">
          <CourseReview program={program} university={university} />
        </section>

        {/* Curriculum Structure */}
        <CurriculumStructure program={program} />

        {/* Related Courses */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Other Courses at {university.name}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {getProgramsByUniversity(university.id)
              .filter(p => p.id !== program.id)
              .slice(0, 6)
              .map(relatedProgram => (
                <Link
                  key={relatedProgram.id}
                  to={`/universities/${university.slug}/courses/${relatedProgram.slug}`}
                  className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow border border-gray-200"
                >
                  <h3 className="font-semibold mb-1">{relatedProgram.name}</h3>
                  <p className="text-sm text-gray-600">{relatedProgram.degree} • {relatedProgram.duration} years</p>
                  <p className="text-sm text-blue-600 mt-2">View Details →</p>
                </Link>
              ))}
          </div>
          <div className="text-center mt-4">
            <Link
              to={`/universities/${university.slug}/courses`}
              className="text-blue-600 hover:text-blue-800 font-semibold"
            >
              View All Courses at {university.name} →
            </Link>
          </div>
        </section>

        {/* FAQ Section */}
        <FAQSection faqs={faqs} title={`Frequently Asked Questions about ${program.name}`} />

        {/* CTA Section */}
        <section className="bg-blue-50 p-8 rounded-lg text-center">
          <h2 className="text-2xl font-bold mb-4">Interested in This Program?</h2>
          <p className="text-gray-600 mb-6">
            Get free counseling and application assistance from Western Bangla Education
          </p>
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
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Apply Now - Free Consultation
          </button>
        </section>
      </div>
    </>
  );
}

