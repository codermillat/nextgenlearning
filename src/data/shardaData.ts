/**
 * Mock data for Sharda University
 * Feature: sharda-university-content-enhancement
 * 
 * This file contains comprehensive mock data for development and testing.
 * Data is based on the comprehensive guide documents provided.
 */

import type {
  ShardaUniversityData,
  UniversityProfile,
  Ranking,
  Accreditation,
  Program,
  PlacementData,
  CampusInfo,
  InternationalInfo,
  AdmissionInfo,
  BangladeshContent,
  Testimonial,
  ScholarshipRule,
} from '../types/sharda';

// University Profile
export const shardaProfile: UniversityProfile = {
  name: 'Sharda University',
  established: 2009,
  location: 'Greater Noida, Uttar Pradesh, India',
  type: 'Private University',
  chancellor: 'P. K. Gupta',
  vicechancellor: 'Dr. Parma Nand',
  tagline: 'Inspiring Excellence',
  keyHighlights: [
    'Students from 95+ countries',
    '1600+ bed multi-specialty hospital',
    '600+ recruiting companies',
    'INR 1.7 Crore highest package',
    'NAAC A+ accredited',
    'NIRF ranked university',
    '63-acre green campus',
    'State-of-the-art infrastructure',
  ],
};

// Rankings
export const shardaRankings: Ranking[] = [
  {
    organization: 'NIRF',
    year: 2024,
    rank: '151-200',
    category: 'University',
    scope: 'national',
  },
  {
    organization: 'NIRF',
    year: 2024,
    rank: '201-250',
    category: 'Engineering',
    scope: 'national',
  },
  {
    organization: 'QS Asia',
    year: 2024,
    rank: '651-700',
    scope: 'international',
  },
  {
    organization: 'Times Higher Education',
    year: 2024,
    rank: '801-1000',
    scope: 'international',
  },
];

// Accreditations
export const shardaAccreditations: Accreditation[] = [
  {
    name: 'NAAC A+ Grade',
    body: 'National Assessment and Accreditation Council',
    year: 2023,
  },
  {
    name: 'UGC Recognition',
    body: 'University Grants Commission',
    year: 2009,
  },
  {
    name: 'NBA Accreditation',
    body: 'National Board of Accreditation',
    year: 2022,
    validity: '3 years',
  },
];

// Sample Programs
export const shardaPrograms: Program[] = [
  {
    id: 'btech-cse',
    name: 'B.Tech in Computer Science and Engineering',
    code: 'CSE',
    discipline: 'Engineering',
    level: 'undergraduate',
    duration: '4 years',
    fees: {
      tuitionPerYear: 220000,
      totalTuition: 880000,
      hostel: 80000,
      mess: 60000,
      registration: 25000,
      other: 15000,
      total: 1060000,
    },
    eligibility: [
      {
        type: 'Academic',
        description: 'Minimum 60% in 10+2 with Physics, Chemistry, and Mathematics',
      },
      {
        type: 'Entrance',
        description: 'JEE Main / SAT / Sharda University Entrance Test',
      },
    ],
    curriculum: [
      'Data Structures and Algorithms',
      'Database Management Systems',
      'Operating Systems',
      'Computer Networks',
      'Software Engineering',
      'Artificial Intelligence',
      'Machine Learning',
      'Cloud Computing',
    ],
    specializations: ['Artificial Intelligence', 'Data Science', 'Cyber Security', 'IoT'],
    accreditation: 'NBA Accredited',
  },
  {
    id: 'btech-cse-ai',
    name: 'B.Tech CSE (Artificial Intelligence)',
    code: 'CSE-AI',
    discipline: 'Engineering',
    level: 'undergraduate',
    duration: '4 years',
    fees: {
      tuitionPerYear: 240000,
      totalTuition: 960000,
      hostel: 80000,
      mess: 60000,
      registration: 25000,
      other: 15000,
      total: 1140000,
    },
    eligibility: [
      {
        type: 'Academic',
        description: 'Minimum 60% in 10+2 with Physics, Chemistry, and Mathematics',
      },
      {
        type: 'Entrance',
        description: 'JEE Main / SAT / Sharda University Entrance Test',
      },
    ],
    curriculum: [
      'Artificial Intelligence Fundamentals',
      'Machine Learning',
      'Deep Learning',
      'Natural Language Processing',
      'Computer Vision',
      'Neural Networks',
      'Data Mining',
      'Big Data Analytics',
    ],
    accreditation: 'NBA Accredited',
  },
  {
    id: 'btech-cse-iot',
    name: 'B.Tech CSE (Internet of Things)',
    code: 'CSE-IoT',
    discipline: 'Engineering',
    level: 'undergraduate',
    duration: '4 years',
    fees: {
      tuitionPerYear: 240000,
      totalTuition: 960000,
      hostel: 80000,
      mess: 60000,
      registration: 25000,
      other: 15000,
      total: 1140000,
    },
    eligibility: [
      {
        type: 'Academic',
        description: 'Minimum 60% in 10+2 with Physics, Chemistry, and Mathematics',
      },
    ],
    curriculum: [
      'IoT Architecture',
      'Embedded Systems',
      'Sensor Networks',
      'Cloud Computing for IoT',
      'IoT Security',
      'Smart Systems Design',
    ],
  },
  {
    id: 'bcom',
    name: 'Bachelor of Commerce',
    code: 'B.Com',
    discipline: 'Commerce',
    level: 'undergraduate',
    duration: '3 years',
    fees: {
      tuitionPerYear: 150000,
      totalTuition: 450000,
      hostel: 80000,
      mess: 60000,
      registration: 25000,
      other: 10000,
      total: 625000,
    },
    eligibility: [
      {
        type: 'Academic',
        description: 'Minimum 50% in 10+2 from any stream',
      },
    ],
    curriculum: [
      'Financial Accounting',
      'Business Economics',
      'Corporate Law',
      'Taxation',
      'Business Statistics',
      'Marketing Management',
    ],
  },
  {
    id: 'mba',
    name: 'Master of Business Administration',
    code: 'MBA',
    discipline: 'Management',
    level: 'postgraduate',
    duration: '2 years',
    fees: {
      tuitionPerYear: 300000,
      totalTuition: 600000,
      hostel: 80000,
      mess: 60000,
      registration: 25000,
      other: 15000,
      total: 780000,
    },
    eligibility: [
      {
        type: 'Academic',
        description: 'Bachelor degree with minimum 50% marks',
      },
      {
        type: 'Entrance',
        description: 'CAT / MAT / XAT / CMAT / Sharda University Entrance Test',
      },
    ],
    curriculum: [
      'Marketing Management',
      'Financial Management',
      'Human Resource Management',
      'Operations Management',
      'Strategic Management',
      'Business Analytics',
    ],
    specializations: ['Marketing', 'Finance', 'HR', 'Operations', 'International Business'],
  },
  {
    id: 'mbbs',
    name: 'Bachelor of Medicine, Bachelor of Surgery (MBBS)',
    code: 'MBBS',
    discipline: 'Medical',
    level: 'undergraduate',
    duration: '5.5 years',
    fees: {
      tuitionPerYear: 650000,
      totalTuition: 3575000,
      hostel: 80000,
      mess: 60000,
      registration: 50000,
      other: 25000,
      total: 4230000,
    },
    eligibility: [
      {
        type: 'Academic',
        description: 'Minimum 50% in 10+2 with Physics, Chemistry, Biology, and English',
      },
      {
        type: 'Entrance',
        description: 'NEET-UG (National Eligibility cum Entrance Test)',
      },
    ],
    curriculum: [
      'Anatomy',
      'Physiology',
      'Biochemistry',
      'Pathology',
      'Pharmacology',
      'Microbiology',
      'Forensic Medicine',
      'Community Medicine',
      'General Medicine',
      'General Surgery',
      'Pediatrics',
      'Obstetrics and Gynecology',
    ],
    accreditation: 'NMC Approved',
  },
  {
    id: 'bba',
    name: 'Bachelor of Business Administration',
    code: 'BBA',
    discipline: 'Management',
    level: 'undergraduate',
    duration: '3 years',
    fees: {
      tuitionPerYear: 180000,
      totalTuition: 540000,
      hostel: 80000,
      mess: 60000,
      registration: 25000,
      other: 10000,
      total: 715000,
    },
    eligibility: [
      {
        type: 'Academic',
        description: 'Minimum 50% in 10+2 from any stream',
      },
    ],
    curriculum: [
      'Principles of Management',
      'Business Economics',
      'Financial Accounting',
      'Marketing Management',
      'Human Resource Management',
      'Business Law',
      'Organizational Behavior',
      'Business Communication',
    ],
  },
];

// Placement Data
export const shardaPlacements: PlacementData = {
  year: 2024,
  companiesVisited: 600,
  studentsPlaced: 3500,
  placementPercentage: 85,
  highestPackage: 17000000, // INR 1.7 Crore
  averagePackage: 450000, // INR 4.5 Lakhs
  topRecruiters: [
    'Microsoft',
    'Amazon',
    'Google',
    'Infosys',
    'TCS',
    'Wipro',
    'Cognizant',
    'Accenture',
    'Deloitte',
    'KPMG',
    'Ernst & Young',
    'PwC',
  ],
};

// Campus Information
export const shardaCampus: CampusInfo = {
  area: '63 acres',
  buildings: 25,
  hostelCapacity: 5000,
  facilities: [
    {
      name: 'Central Library',
      description: 'State-of-the-art library with 100,000+ books and digital resources',
      capacity: '500 students',
    },
    {
      name: 'Sports Complex',
      description: 'Indoor and outdoor sports facilities including cricket, football, basketball',
    },
    {
      name: 'Auditorium',
      description: 'Modern auditorium with 1000+ seating capacity',
      capacity: '1000 seats',
    },
    {
      name: 'Cafeteria',
      description: 'Multiple cafeterias serving Indian and international cuisine',
    },
    {
      name: 'Laboratories',
      description: 'Well-equipped labs for engineering, science, and medical programs',
    },
  ],
  hospital: {
    name: 'Sharda Hospital',
    beds: 1600,
    specialties: [
      'Cardiology',
      'Neurology',
      'Orthopedics',
      'Oncology',
      'Pediatrics',
      'Emergency Medicine',
    ],
    facilities: [
      '24/7 Emergency Services',
      'Advanced ICU',
      'Modern Operation Theaters',
      'Diagnostic Center',
      'Pharmacy',
    ],
  },
};

// International Information
export const shardaInternational: InternationalInfo = {
  countriesRepresented: 95,
  internationalStudents: 3000,
  collaborations: [
    {
      institution: 'University of California',
      country: 'USA',
      type: 'Student Exchange',
    },
    {
      institution: 'University of Manchester',
      country: 'UK',
      type: 'Research Collaboration',
    },
    {
      institution: 'National University of Singapore',
      country: 'Singapore',
      type: 'Academic Partnership',
    },
  ],
  exchangePrograms: [
    'Semester Exchange Program',
    'Summer School Programs',
    'Research Internships',
    'Faculty Exchange',
  ],
};

// Admission Information
export const shardaAdmissions: AdmissionInfo = {
  cycle: '2026-27',
  applicationDeadline: 'June 30, 2026',
  entranceExam: 'Sharda University Entrance Test (SUET)',
  process: [
    'Fill online application form',
    'Upload required documents',
    'Pay application fee',
    'Appear for entrance test (if applicable)',
    'Attend counseling session',
    'Complete admission formalities',
  ],
  documents: [
    '10th Mark Sheet',
    '12th Mark Sheet',
    'Transfer Certificate',
    'Migration Certificate',
    'Passport size photographs',
    'Passport copy (for international students)',
    'Visa documents (for international students)',
  ],
};

// Bangladesh-Specific Testimonials
export const bangladeshTestimonials: Testimonial[] = [
  {
    id: 'test-bd-1',
    studentName: 'Fahim Rahman',
    country: 'Bangladesh',
    program: 'B.Tech Computer Science',
    graduationYear: 2023,
    currentPosition: 'Software Engineer at Microsoft',
    testimonialText:
      'Sharda University provided me with world-class education and excellent placement opportunities. The faculty support and infrastructure are outstanding.',
    achievement: 'Placed at Microsoft with INR 12 LPA package',
  },
  {
    id: 'test-bd-2',
    studentName: 'Nusrat Jahan',
    country: 'Bangladesh',
    program: 'MBA',
    graduationYear: 2024,
    currentPosition: 'Marketing Manager at Unilever',
    testimonialText:
      'The MBA program at Sharda helped me develop leadership skills and industry connections. The diverse student community enriched my learning experience.',
    achievement: 'Secured position at Unilever through campus placement',
  },
  {
    id: 'test-bd-3',
    studentName: 'Tanvir Ahmed',
    country: 'Bangladesh',
    program: 'B.Tech Mechanical Engineering',
    graduationYear: 2022,
    currentPosition: 'Design Engineer at Tata Motors',
    testimonialText:
      'The practical exposure through labs and industry visits prepared me well for my career. The scholarship support made quality education affordable.',
    achievement: 'Working at Tata Motors, pursuing higher studies',
  },
  {
    id: 'test-bd-4',
    studentName: 'Sadia Islam',
    country: 'Bangladesh',
    program: 'MBBS',
    graduationYear: 2023,
    currentPosition: 'Medical Officer at Apollo Hospital',
    testimonialText:
      'Studying at Sharda Hospital gave me hands-on clinical experience. The faculty are experienced doctors who mentor students personally.',
    achievement: 'Practicing at Apollo Hospital, Dhaka',
  },
  {
    id: 'test-bd-5',
    studentName: 'Rafiq Hassan',
    country: 'Bangladesh',
    program: 'B.Com',
    graduationYear: 2024,
    currentPosition: 'Entrepreneur',
    testimonialText:
      'Sharda University encouraged my entrepreneurial spirit. The startup incubation center helped me launch my own business.',
    achievement: 'Founded successful e-commerce startup',
  },
];

// Bangladesh-Specific Content
export const bangladeshContent: BangladeshContent = {
  scholarships: [
    {
      gpaMin: 3.5,
      gpaMax: 5.0,
      percentage: 50,
      eligibility: [
        'HSC certificate with GPA 3.5 or above',
        'Valid passport',
        'Completed application form',
      ],
      applicationProcess: [
        'Submit HSC certificate',
        'Apply online',
        'Scholarship automatically applied based on GPA',
        'Receive admission offer with scholarship details',
      ],
    },
    {
      gpaMin: 3.0,
      gpaMax: 3.49,
      percentage: 20,
      eligibility: [
        'HSC certificate with GPA 3.0 to 3.49',
        'Valid passport',
        'Completed application form',
      ],
      applicationProcess: [
        'Submit HSC certificate',
        'Apply online',
        'Scholarship automatically applied based on GPA',
        'Receive admission offer with scholarship details',
      ],
    },
  ],
  admissionProcess: [
    {
      stepNumber: 1,
      title: 'Document Preparation',
      description: 'Gather all required documents including HSC certificate, passport, and photographs',
      documents: [
        'HSC Certificate (original and copy)',
        'SSC Certificate',
        'Passport (valid for at least 2 years)',
        'Passport size photographs (10 copies)',
        'Medical fitness certificate',
      ],
      timeline: '1-2 weeks',
      tips: [
        'Get documents attested by Bangladesh Ministry of Foreign Affairs',
        'Keep multiple copies of all documents',
        'Ensure passport validity',
      ],
    },
    {
      stepNumber: 2,
      title: 'Online Application',
      description: 'Complete the online application form on Sharda University website',
      documents: ['Scanned copies of all documents', 'Email ID', 'Phone number'],
      timeline: '1-2 days',
      tips: [
        'Fill form carefully',
        'Upload clear scanned documents',
        'Keep application number safe',
      ],
    },
    {
      stepNumber: 3,
      title: 'Application Fee Payment',
      description: 'Pay the application fee through online payment gateway',
      documents: ['Credit/Debit card or bank account details'],
      timeline: '1 day',
      tips: ['Keep payment receipt', 'Use secure payment method'],
    },
    {
      stepNumber: 4,
      title: 'Admission Offer',
      description: 'Receive admission offer letter with scholarship details',
      documents: [],
      timeline: '1-2 weeks',
      tips: ['Check scholarship amount', 'Verify program details', 'Note deadline for acceptance'],
    },
    {
      stepNumber: 5,
      title: 'Visa Application',
      description: 'Apply for Indian student visa at Indian High Commission, Dhaka',
      documents: [
        'Admission offer letter',
        'Passport',
        'Visa application form',
        'Photographs',
        'Financial documents',
      ],
      timeline: '2-4 weeks',
      tips: [
        'Apply early',
        'Prepare financial proof',
        'Attend visa interview if required',
      ],
    },
    {
      stepNumber: 6,
      title: 'Fee Payment',
      description: 'Pay first semester fees through international bank transfer',
      documents: ['Admission offer letter', 'Bank account details'],
      timeline: '1 week',
      tips: [
        'Use authorized forex dealers',
        'Keep transfer receipt',
        'Inform university after payment',
      ],
    },
    {
      stepNumber: 7,
      title: 'Travel and Arrival',
      description: 'Book flight and inform university about arrival details',
      documents: ['Flight tickets', 'Passport', 'Visa', 'Admission documents'],
      timeline: '1-2 weeks',
      tips: [
        'Book airport pickup service',
        'Carry all original documents',
        'Keep emergency contacts',
      ],
    },
  ],
  testimonials: bangladeshTestimonials,
  culturalInfo: {
    proximity: 'Just 2-3 hours flight from Dhaka to Delhi, then 1 hour drive to campus',
    climate: 'Similar to Bangladesh - hot summers, mild winters, monsoon season',
    food: [
      'Halal food available in campus cafeterias',
      'Bengali restaurants in Greater Noida',
      'Hostel mess serves rice and curry',
      'Multiple food options for international students',
    ],
    religiousFacilities: [
      'Prayer rooms available on campus',
      'Mosques nearby in Greater Noida',
      'Friday prayers organized',
      'Respect for all religions',
    ],
    language: 'English is medium of instruction, Hindi widely spoken (similar to Bangla)',
    community: 'Large Bangladeshi student community, cultural events, student associations',
  },
  visaGuidance: {
    type: 'Student Visa (X Visa)',
    duration: 'Valid for duration of course',
    requirements: [
      'Valid passport (minimum 6 months validity)',
      'Admission offer letter from Sharda University',
      'Financial proof (bank statements)',
      'Medical fitness certificate',
      'Police clearance certificate',
      'Passport size photographs',
    ],
    process: [
      'Receive admission offer letter',
      'Fill visa application form online',
      'Book appointment at Indian High Commission, Dhaka',
      'Submit documents and attend interview',
      'Pay visa fee',
      'Collect visa (usually 2-4 weeks)',
    ],
    timeline: '2-4 weeks from application',
  },
  financialGuidance: {
    currencyTransfer: [
      'Use authorized forex dealers in Bangladesh',
      'Bank wire transfer to Sharda University account',
      'Carry some cash (USD/INR) for initial expenses',
      'Open Indian bank account after arrival',
    ],
    bankAccounts: [
      'Can open account with passport and student ID',
      'Major banks: SBI, HDFC, ICICI near campus',
      'Required for receiving scholarship, part-time earnings',
    ],
    scholarships: [
      '50% scholarship for GPA 3.5-5.0',
      '20% scholarship for GPA 3.0-3.4',
      'Merit-based scholarships available',
      'Sports scholarships for achievers',
    ],
    costOfLiving: 'INR 5,000-8,000 per month (food, transport, personal expenses)',
  },
};

// Scholarship Rules
export const scholarshipRules: ScholarshipRule[] = [
  {
    country: 'Bangladesh',
    gpaMin: 3.5,
    gpaMax: 5.0,
    percentage: 50,
  },
  {
    country: 'Bangladesh',
    gpaMin: 3.0,
    gpaMax: 3.49,
    percentage: 20,
  },
  {
    country: 'India',
    gpaMin: 90,
    gpaMax: 100,
    percentage: 50,
  },
  {
    country: 'India',
    gpaMin: 80,
    gpaMax: 89,
    percentage: 25,
  },
  {
    country: 'International',
    gpaMin: 85,
    gpaMax: 100,
    percentage: 30,
  },
  {
    country: 'International',
    gpaMin: 75,
    gpaMax: 84,
    percentage: 15,
  },
];

// Complete Sharda University Data
export const shardaUniversityData: ShardaUniversityData = {
  profile: shardaProfile,
  rankings: shardaRankings,
  accreditations: shardaAccreditations,
  programs: shardaPrograms,
  placements: shardaPlacements,
  campus: shardaCampus,
  international: shardaInternational,
  admissions: shardaAdmissions,
  bangladeshContent,
};

// Export individual pieces for easier testing and component usage
export default shardaUniversityData;
