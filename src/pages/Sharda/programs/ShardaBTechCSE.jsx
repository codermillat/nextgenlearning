/**
 * Sharda University B.Tech CSE Program Page
 * Feature: sharda-university-content-enhancement
 * 
 * Detailed program page for B.Tech Computer Science and Engineering
 * Requirements: 4.1, 4.2, 4.3, 4.5
 */

import ProgramDetailPage from '../ProgramDetailPage';

const ShardaBTechCSE = () => {
  const overview = `
The B.Tech in Computer Science and Engineering at Sharda University is a comprehensive 4-year undergraduate program designed to prepare students for successful careers in the rapidly evolving technology industry. This program combines rigorous theoretical foundations with extensive practical training, ensuring graduates are well-equipped to tackle real-world challenges in software development, artificial intelligence, data science, and emerging technologies.

Sharda University's B.Tech CSE program stands out for its industry-aligned curriculum that is regularly updated to reflect the latest technological advancements. Students gain hands-on experience with cutting-edge technologies including artificial intelligence, machine learning, cloud computing, blockchain, and Internet of Things (IoT). The program emphasizes not just coding skills, but also critical thinking, problem-solving, and innovation – essential qualities for success in the tech industry.

The program is accredited by the National Board of Accreditation (NBA), ensuring that it meets the highest standards of quality education. This accreditation is recognized globally and adds significant value to your degree, making it easier to pursue higher education abroad or secure employment with multinational companies. The curriculum is designed in consultation with industry experts and academic leaders, ensuring that graduates possess skills that are in high demand in the job market.

One of the key strengths of the B.Tech CSE program at Sharda is its focus on specializations. Students can choose from specializations in Artificial Intelligence, Data Science, Cyber Security, and Internet of Things, allowing them to develop deep expertise in their area of interest. These specializations are taught by faculty members who are experts in their fields and have extensive industry experience, providing students with insights into real-world applications of technology.

The learning environment at Sharda University is truly international, with students from over 95 countries studying on campus. This diversity enriches the educational experience, exposing students to different perspectives and preparing them for careers in global organizations. The university's strong industry connections ensure that students have access to internships, industrial visits, and guest lectures from leading technology companies.

Sharda University's state-of-the-art computer labs are equipped with the latest hardware and software, providing students with the tools they need to experiment, innovate, and learn. The labs support various programming languages, development frameworks, and specialized software for AI, machine learning, and data analytics. Students also have access to cloud computing platforms and high-performance computing resources for their projects and research.

The faculty at Sharda University's School of Engineering and Technology comprises experienced professors, many of whom hold Ph.D. degrees from prestigious institutions. They bring a wealth of knowledge from both academia and industry, ensuring that students receive education that is both theoretically sound and practically relevant. Faculty members are actively involved in research and encourage students to participate in research projects, fostering a culture of innovation and inquiry.

Career prospects for B.Tech CSE graduates from Sharda University are excellent. The university has a dedicated placement cell that works year-round to connect students with leading companies in India and abroad. Top technology companies including Microsoft, Amazon, Google, Infosys, TCS, Wipro, and Cognizant regularly recruit from Sharda's campus. The highest package offered to B.Tech CSE graduates has reached ₹17 lakhs per annum, with an average package of ₹4.5 lakhs per annum.

Beyond placements, many graduates choose to pursue higher education at prestigious universities worldwide or start their own technology ventures. Sharda University's startup incubation center provides support and mentorship to aspiring entrepreneurs, helping them transform their innovative ideas into successful businesses. The university has produced several successful startups in areas like e-commerce, fintech, and software services.

For international students, particularly those from Bangladesh, Sharda University offers an attractive combination of quality education and affordability. The university provides generous scholarships based on academic merit, with Bangladeshi students eligible for up to 50% scholarship on tuition fees. The proximity to Bangladesh (just a few hours by flight), similar climate, availability of halal food, and a large Bangladeshi student community make Sharda an ideal choice for students from Bangladesh.

The admission process is straightforward and student-friendly. Students can apply online and are evaluated based on their 10+2 marks and performance in entrance examinations like JEE Main or Sharda University's own entrance test. The university provides comprehensive support throughout the admission process, including assistance with visa applications for international students.

Campus life at Sharda University is vibrant and engaging. Students have access to numerous clubs and societies focused on technology, coding, robotics, and innovation. Regular hackathons, coding competitions, and tech fests provide opportunities for students to showcase their skills and learn from peers. The university also emphasizes holistic development, with excellent sports facilities, cultural activities, and leadership development programs.

The B.Tech CSE program prepares students not just for their first job, but for lifelong success in the technology industry. The strong foundation in computer science fundamentals, combined with exposure to latest technologies and soft skills development, ensures that graduates can adapt to the rapidly changing technology landscape and continue to grow throughout their careers.
  `.trim();

  const careerProspects = {
    roles: [
      'Software Engineer',
      'Data Scientist',
      'AI/ML Engineer',
      'Full Stack Developer',
      'Cloud Architect',
      'DevOps Engineer',
      'Cyber Security Analyst',
      'Mobile App Developer',
      'System Architect',
      'Technical Lead',
    ],
    industries: [
      'Information Technology',
      'Software Development',
      'Consulting Services',
      'E-commerce',
      'Financial Services',
      'Healthcare Technology',
      'Telecommunications',
      'Gaming Industry',
      'Automotive (Autonomous Vehicles)',
      'Aerospace and Defense',
    ],
    skills: [
      'Programming (Java, Python, C++)',
      'Data Structures & Algorithms',
      'Machine Learning & AI',
      'Cloud Computing (AWS, Azure)',
      'Database Management',
      'Web Development',
      'Mobile Development',
      'Problem Solving',
    ],
  };

  const highlights = [
    {
      icon: '✓',
      title: 'NBA Accredited',
      description: 'Program accredited by National Board of Accreditation ensuring quality education standards',
    },
    {
      icon: '💼',
      title: 'Excellent Placements',
      description: 'Top companies like Microsoft, Amazon, Google recruit with packages up to ₹17 LPA',
    },
    {
      icon: '🎓',
      title: 'Modern Curriculum',
      description: 'Industry-aligned curriculum with AI, ML, Cloud Computing, and latest technologies',
    },
    {
      icon: '🔬',
      title: 'State-of-Art Labs',
      description: 'Advanced computer labs with latest hardware and software for hands-on learning',
    },
    {
      icon: '👨‍🏫',
      title: 'Expert Faculty',
      description: 'Learn from experienced professors with Ph.D. degrees and industry background',
    },
    {
      icon: '🌍',
      title: 'Global Exposure',
      description: 'Study with students from 95+ countries and access international exchange programs',
    },
  ];

  const faqs = [
    {
      question: 'What is the duration of the B.Tech CSE program at Sharda University?',
      answer: 'The B.Tech CSE program is a 4-year undergraduate degree program divided into 8 semesters. Each semester is approximately 6 months long.',
    },
    {
      question: 'What are the eligibility criteria for B.Tech CSE admission?',
      answer: 'Students must have completed 10+2 with minimum 60% marks in Physics, Chemistry, and Mathematics. Admission is based on JEE Main scores, SAT scores, or Sharda University Entrance Test (SUET).',
    },
    {
      question: 'What specializations are available in B.Tech CSE?',
      answer: 'Students can choose from specializations in Artificial Intelligence, Data Science, Cyber Security, and Internet of Things (IoT). Specialization courses begin from the 5th semester.',
    },
    {
      question: 'What is the fee structure for B.Tech CSE?',
      answer: 'The annual tuition fee is ₹2.2 lakhs. Total 4-year cost including hostel, mess, and other fees is ₹10.6 lakhs. Bangladeshi students can get up to 50% scholarship on tuition fees based on HSC GPA.',
    },
    {
      question: 'What are the placement opportunities after B.Tech CSE?',
      answer: 'B.Tech CSE graduates have excellent placement opportunities with 85%+ placement rate. Top companies like Microsoft, Amazon, Google, Infosys, TCS recruit from campus. Average package is ₹4.5 LPA and highest package reaches ₹17 LPA.',
    },
    {
      question: 'Can international students apply for B.Tech CSE?',
      answer: 'Yes, Sharda University welcomes international students from all countries. The university has students from 95+ countries. International students need a valid passport, academic transcripts, and English proficiency proof (IELTS/TOEFL or equivalent).',
    },
    {
      question: 'What facilities are available for CSE students?',
      answer: 'CSE students have access to state-of-the-art computer labs with latest hardware and software, high-speed internet, cloud computing platforms, AI/ML tools, and specialized labs for robotics, IoT, and cyber security.',
    },
    {
      question: 'Are there opportunities for research and innovation?',
      answer: 'Yes, students can participate in research projects under faculty guidance. The university has a dedicated research center and encourages students to publish papers in conferences and journals. There is also a startup incubation center for aspiring entrepreneurs.',
    },
  ];

  return (
    <ProgramDetailPage
      programId="btech-cse"
      pageTitle="B.Tech CSE at Sharda University 2026 | Computer Science Engineering"
      metaDescription="B.Tech Computer Science Engineering at Sharda University: 4-year NBA accredited program with AI, ML specializations. ₹2.2L/year fees, up to 50% scholarship. 85% placement rate with top companies. Apply now!"
      keywords={[
        'sharda university btech cse',
        'computer science engineering sharda',
        'btech cse sharda university',
        'sharda university engineering programs',
        'btech cse fees sharda',
        'computer science sharda university admission',
        'sharda btech cse placement',
        'nba accredited btech cse',
      ]}
      canonicalPath="/sharda-university/programs/btech-cse"
      overview={overview}
      careerProspects={careerProspects}
      highlights={highlights}
      faqs={faqs}
    />
  );
};

export default ShardaBTechCSE;
