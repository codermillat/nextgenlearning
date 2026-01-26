/**
 * Sharda University MBA Program Page
 * Feature: sharda-university-content-enhancement
 * 
 * Detailed program page for Master of Business Administration
 * Requirements: 4.1, 4.2, 4.3, 4.5
 */

import ProgramDetailPage from '../ProgramDetailPage';

const ShardaMBA = () => {
  const overview = `
The Master of Business Administration (MBA) program at Sharda University is a prestigious 2-year postgraduate degree designed to develop future business leaders and entrepreneurs. This comprehensive program combines rigorous academic training with practical business exposure, preparing graduates to excel in diverse management roles across industries. The MBA program at Sharda is recognized for its industry-relevant curriculum, experienced faculty, and strong placement record.

Sharda University's School of Business Studies offers an MBA program that stands out for its holistic approach to management education. The curriculum covers all essential areas of business management including Marketing, Finance, Human Resources, Operations, and Strategic Management, while also incorporating contemporary topics like Business Analytics, Digital Marketing, and Entrepreneurship. This balanced approach ensures that graduates are well-rounded professionals capable of handling complex business challenges.

The program is designed to develop both hard and soft skills essential for management careers. Students learn analytical and decision-making skills through case studies, simulations, and real-world projects. Soft skills like leadership, communication, teamwork, and negotiation are developed through group projects, presentations, and interactive sessions. The emphasis on experiential learning ensures that students can immediately apply classroom concepts to practical business situations.

One of the key differentiators of Sharda's MBA program is its focus on specializations. Students can choose from specializations in Marketing, Finance, Human Resource Management, Operations Management, and International Business. These specializations allow students to develop deep expertise in their chosen field while maintaining a broad understanding of general management principles. The specialization courses are taught by faculty members with extensive industry experience and academic credentials.

The faculty at Sharda's School of Business Studies comprises accomplished professors, many holding Ph.D. degrees from premier institutions in India and abroad. Several faculty members have significant corporate experience, bringing real-world insights into the classroom. Guest lectures by industry leaders, CEOs, and successful entrepreneurs provide students with exposure to current business practices and trends. This blend of academic rigor and practical wisdom creates a rich learning environment.

Sharda University's MBA program emphasizes global business perspectives, preparing students for careers in multinational corporations. The diverse student body, with peers from over 95 countries, provides natural exposure to different business cultures and practices. International study tours, exchange programs with partner universities, and global case studies further enhance students' understanding of international business dynamics.

The infrastructure supporting the MBA program is world-class. Modern classrooms equipped with audio-visual aids, a well-stocked library with extensive business literature and online databases, computer labs with business software and analytics tools, and dedicated spaces for group discussions and presentations create an ideal learning environment. The campus also features a Bloomberg Terminal, providing students with access to real-time financial data and analytics.

Industry interface is a cornerstone of Sharda's MBA program. Regular industrial visits to leading companies provide students with firsthand exposure to business operations. Summer internships after the first year allow students to apply their learning in real corporate settings. Live projects with companies give students the opportunity to solve actual business problems and build their professional portfolios. These industry interactions also serve as networking opportunities, often leading to placement offers.

The placement record of Sharda's MBA program is impressive. The dedicated placement cell works throughout the year to bring leading companies to campus for recruitment. Companies across sectors including FMCG, Banking and Finance, Consulting, IT, E-commerce, and Manufacturing recruit MBA graduates from Sharda. The average package for MBA graduates is ₹4.5 lakhs per annum, with the highest package reaching ₹12 lakhs per annum. Many graduates also receive pre-placement offers from their internship companies.

Beyond corporate placements, the MBA program at Sharda encourages entrepreneurship. The university's startup incubation center provides mentorship, funding support, and infrastructure to students who wish to start their own ventures. Several MBA graduates have successfully launched startups in areas like e-commerce, consulting, education technology, and services. The entrepreneurship cell organizes business plan competitions, startup workshops, and networking events with investors and successful entrepreneurs.

For international students, particularly from Bangladesh, Sharda's MBA program offers excellent value. The program fee is competitive compared to other top MBA programs in India, and generous scholarships are available based on academic merit and entrance test scores. Bangladeshi students with strong academic records can receive up to 30% scholarship on tuition fees. The cultural similarity, proximity to Bangladesh, and presence of a large Bangladeshi student community make the transition smooth for students from Bangladesh.

The admission process for the MBA program is merit-based and transparent. Candidates are evaluated based on their bachelor's degree marks and performance in management entrance tests like CAT, MAT, XAT, CMAT, or Sharda University's own entrance test. The selection process also includes a personal interview to assess the candidate's aptitude for management studies and career goals. The admissions team provides comprehensive support to international students, including assistance with visa applications and travel arrangements.

Campus life for MBA students at Sharda is vibrant and enriching. The university hosts numerous management fests, business competitions, and leadership development programs. Student clubs focused on marketing, finance, entrepreneurship, and social responsibility provide platforms for students to pursue their interests and develop leadership skills. Sports facilities, cultural events, and social activities ensure a well-rounded student experience that goes beyond academics.

The MBA program at Sharda University prepares students not just for their first management role, but for long-term career success. The strong foundation in management principles, combined with specialization expertise, industry exposure, and soft skills development, ensures that graduates can navigate the complexities of the business world and grow into leadership positions. Alumni of the program hold senior positions in leading companies across India and globally, testament to the quality of education and training provided.

Sharda University's commitment to continuous improvement ensures that the MBA curriculum stays relevant and aligned with industry needs. Regular feedback from recruiters, alumni, and industry advisory boards helps in updating course content and teaching methodologies. The focus on emerging areas like digital transformation, sustainability, and data-driven decision making prepares students for the future of business management.
  `.trim();

  const careerProspects = {
    roles: [
      'Marketing Manager',
      'Financial Analyst',
      'HR Manager',
      'Operations Manager',
      'Business Consultant',
      'Product Manager',
      'Brand Manager',
      'Investment Banker',
      'Business Development Manager',
      'Entrepreneur',
    ],
    industries: [
      'FMCG',
      'Banking and Finance',
      'Consulting',
      'Information Technology',
      'E-commerce',
      'Manufacturing',
      'Healthcare',
      'Retail',
      'Telecommunications',
      'Hospitality',
    ],
    skills: [
      'Strategic Thinking',
      'Financial Analysis',
      'Marketing Strategy',
      'Leadership',
      'Data Analytics',
      'Business Communication',
      'Project Management',
      'Negotiation',
    ],
  };

  const highlights = [
    {
      icon: '🎓',
      title: 'Comprehensive Curriculum',
      description: 'Covers all aspects of business management with specialization options',
    },
    {
      icon: '💼',
      title: 'Strong Placements',
      description: 'Leading companies recruit with average package of ₹4.5 LPA, highest ₹12 LPA',
    },
    {
      icon: '👨‍🏫',
      title: 'Experienced Faculty',
      description: 'Learn from Ph.D. holders with corporate experience and industry insights',
    },
    {
      icon: '🏢',
      title: 'Industry Exposure',
      description: 'Industrial visits, internships, and live projects with leading companies',
    },
    {
      icon: '🚀',
      title: 'Entrepreneurship Support',
      description: 'Startup incubation center with mentorship and funding support',
    },
    {
      icon: '🌍',
      title: 'Global Perspective',
      description: 'International study tours and diverse student body from 95+ countries',
    },
  ];

  const faqs = [
    {
      question: 'What is the duration of the MBA program at Sharda University?',
      answer: 'The MBA program is a 2-year postgraduate degree divided into 4 semesters. Each semester is approximately 6 months long.',
    },
    {
      question: 'What are the eligibility criteria for MBA admission?',
      answer: 'Candidates must have a bachelor degree in any discipline with minimum 50% marks. Admission is based on CAT, MAT, XAT, CMAT scores, or Sharda University Entrance Test, followed by a personal interview.',
    },
    {
      question: 'What specializations are available in the MBA program?',
      answer: 'Students can choose from specializations in Marketing, Finance, Human Resource Management, Operations Management, and International Business. Specialization courses begin from the 3rd semester.',
    },
    {
      question: 'What is the fee structure for MBA?',
      answer: 'The annual tuition fee is ₹3 lakhs. Total 2-year cost including hostel, mess, and other fees is ₹7.8 lakhs. Merit-based scholarships are available for deserving students.',
    },
    {
      question: 'What are the placement opportunities after MBA?',
      answer: 'MBA graduates have excellent placement opportunities across sectors like FMCG, Banking, Consulting, IT, and E-commerce. Average package is ₹4.5 LPA and highest package reaches ₹12 LPA. Many students also receive pre-placement offers from internship companies.',
    },
    {
      question: 'Is work experience required for MBA admission?',
      answer: 'Work experience is not mandatory but is preferred. Fresh graduates as well as working professionals can apply. Candidates with work experience may have an advantage during the selection process.',
    },
    {
      question: 'What is the summer internship process?',
      answer: 'After the first year, all MBA students undergo a mandatory 8-10 week summer internship. The placement cell facilitates internship placements with leading companies. Students work on live projects and gain practical business experience.',
    },
    {
      question: 'Are there opportunities for entrepreneurship?',
      answer: 'Yes, Sharda University has a dedicated startup incubation center that provides mentorship, funding support, and infrastructure to aspiring entrepreneurs. The entrepreneurship cell organizes business plan competitions and connects students with investors.',
    },
  ];

  return (
    <ProgramDetailPage
      programId="mba"
      pageTitle="MBA at Sharda University 2026 | Master of Business Administration"
      metaDescription="MBA at Sharda University: 2-year program with Marketing, Finance, HR specializations. ₹3L/year fees, scholarships available. Strong placements with top companies. Apply now for 2026 admission!"
      keywords={[
        'sharda university mba',
        'mba sharda university',
        'sharda mba admission',
        'mba fees sharda university',
        'sharda university mba placement',
        'mba specializations sharda',
        'master of business administration sharda',
        'sharda university business school',
      ]}
      canonicalPath="/sharda-university/programs/mba"
      overview={overview}
      careerProspects={careerProspects}
      highlights={highlights}
      faqs={faqs}
    />
  );
};

export default ShardaMBA;
