/**
 * Course Grouping System
 * Manually reviewed and grouped similar courses across all universities
 * Each group represents courses that should be compared together
 */

export const COURSE_GROUPS = {
  // B.Tech Computer Science & Engineering
  'btech-cse': {
    id: 'btech-cse',
    name: 'B.Tech Computer Science & Engineering',
    description: 'Compare B.Tech CSE programs across top Indian universities. Find the best program for your career in computer science.',
    keywords: ['B.Tech CSE', 'Computer Science Engineering', 'B.Tech Computer Science', 'CSE programs India'],
    matchPatterns: [
      /b\.tech.*computer science/i,
      /b\.tech.*cse/i,
      /computer science.*engineering/i,
      /cse$/i
    ],
    excludePatterns: [
      /ai|ml|artificial intelligence|machine learning/i,
      /data science|data analytics/i,
      /cyber|security/i,
      /blockchain/i,
      /cloud/i,
      /iot|internet of things/i
    ]
  },

  // B.Tech AI/ML
  'btech-ai-ml': {
    id: 'btech-ai-ml',
    name: 'B.Tech Artificial Intelligence & Machine Learning',
    description: 'Compare B.Tech AI/ML programs across universities. Find the best artificial intelligence and machine learning programs.',
    keywords: ['B.Tech AI ML', 'Artificial Intelligence', 'Machine Learning', 'AI ML programs'],
    matchPatterns: [
      /ai.*ml|artificial intelligence.*machine learning/i,
      /aiml/i,
      /artificial intelligence/i,
      /machine learning/i
    ]
  },

  // B.Tech Data Science
  'btech-data-science': {
    id: 'btech-data-science',
    name: 'B.Tech Data Science',
    description: 'Compare B.Tech Data Science programs. Find the best data science and analytics programs.',
    keywords: ['B.Tech Data Science', 'Data Analytics', 'Big Data', 'Data Science programs'],
    matchPatterns: [
      /data science/i,
      /data analytics/i,
      /big data/i
    ]
  },

  // B.Tech Cyber Security
  'btech-cyber-security': {
    id: 'btech-cyber-security',
    name: 'B.Tech Cyber Security',
    description: 'Compare B.Tech Cyber Security programs. Find the best cybersecurity programs.',
    keywords: ['B.Tech Cyber Security', 'Cybersecurity', 'Information Security', 'Cyber Security programs'],
    matchPatterns: [
      /cyber.*security/i,
      /cybersecurity/i,
      /information security/i,
      /digital forensic/i
    ]
  },

  // B.Tech Information Technology
  'btech-it': {
    id: 'btech-it',
    name: 'B.Tech Information Technology',
    description: 'Compare B.Tech IT programs across universities. Find the best information technology programs.',
    keywords: ['B.Tech IT', 'Information Technology', 'B.Tech Information Technology', 'IT programs'],
    matchPatterns: [
      /b\.tech.*information technology/i,
      /b\.tech.*it$/i,
      /information technology.*engineering/i
    ],
    excludePatterns: [
      /ai|ml|artificial intelligence|machine learning/i,
      /data science|data analytics/i,
      /cyber|security/i,
      /cloud/i
    ]
  },

  // B.Tech Cloud Computing
  'btech-cloud-computing': {
    id: 'btech-cloud-computing',
    name: 'B.Tech Cloud Computing',
    description: 'Compare B.Tech Cloud Computing programs. Find the best cloud computing and infrastructure programs.',
    keywords: ['B.Tech Cloud Computing', 'Cloud Computing', 'Cloud Technology', 'Cloud programs'],
    matchPatterns: [
      /cloud computing/i,
      /cloud technology/i,
      /cloud.*ibm/i
    ]
  },

  // B.Tech Full Stack Development
  'btech-full-stack': {
    id: 'btech-full-stack',
    name: 'B.Tech Full Stack Development',
    description: 'Compare B.Tech Full Stack Development programs. Learn web and mobile development technologies.',
    keywords: ['B.Tech Full Stack', 'Full Stack Development', 'Web Development', 'Full Stack programs'],
    matchPatterns: [
      /full stack/i,
      /fullstack/i,
      /web development/i
    ]
  },

  // B.Tech Blockchain
  'btech-blockchain': {
    id: 'btech-blockchain',
    name: 'B.Tech Blockchain Technology',
    description: 'Compare B.Tech Blockchain programs. Learn blockchain and distributed ledger technologies.',
    keywords: ['B.Tech Blockchain', 'Blockchain Technology', 'Block Chain', 'Blockchain programs'],
    matchPatterns: [
      /blockchain/i,
      /block chain/i
    ]
  },

  // B.Tech IoT
  'btech-iot': {
    id: 'btech-iot',
    name: 'B.Tech Internet of Things (IoT)',
    description: 'Compare B.Tech IoT programs. Learn about connected devices and smart systems.',
    keywords: ['B.Tech IoT', 'Internet of Things', 'IoT', 'IoT programs'],
    matchPatterns: [
      /iot/i,
      /internet of things/i
    ],
    excludePatterns: [
      /ai|artificial intelligence/i
    ]
  },

  // B.Tech Electronics & Communication (Tech-related)
  'btech-ece': {
    id: 'btech-ece',
    name: 'B.Tech Electronics & Communication Engineering',
    description: 'Compare B.Tech ECE programs. Focus on electronics, communication systems, and embedded technologies.',
    keywords: ['B.Tech ECE', 'Electronics Communication', 'ECE programs', 'Electronics Engineering'],
    matchPatterns: [
      /electronics.*communication/i,
      /^ece$/i
    ]
  },

  // BCA
  'bca': {
    id: 'bca',
    name: 'Bachelor of Computer Applications (BCA)',
    description: 'Compare BCA programs across universities.',
    keywords: ['BCA', 'Bachelor of Computer Applications', 'BCA programs'],
    matchPatterns: [
      /^bca$/i,
      /bachelor.*computer.*application/i
    ]
  },

  // B.Sc Computer Science
  'bsc-computer-science': {
    id: 'bsc-computer-science',
    name: 'B.Sc Computer Science',
    description: 'Compare B.Sc Computer Science programs.',
    keywords: ['B.Sc Computer Science', 'BSc CS', 'Computer Science'],
    matchPatterns: [
      /b\.sc.*computer science/i,
      /bsc.*computer science/i
    ]
  },

  // B.Tech Lateral Entry CSE
  'btech-lateral-cse': {
    id: 'btech-lateral-cse',
    name: 'B.Tech Lateral Entry (Computer Science & Engineering)',
    description: 'Compare B.Tech Lateral Entry CSE programs. Direct 2nd year entry for diploma holders.',
    keywords: ['B.Tech Lateral Entry CSE', 'Lateral Entry CSE', 'B.Tech Lateral CSE', 'Diploma to B.Tech CSE'],
    matchPatterns: [
      /b\.tech.*lateral.*cse/i,
      /b\.tech.*lateral.*computer science/i,
      /lateral entry.*computer science/i,
      /lateral.*cse$/i
    ],
    excludePatterns: [
      /ai|ml|artificial intelligence|machine learning/i,
      /data science|data analytics/i
    ]
  },

  // B.Tech Lateral Entry AI/ML
  'btech-lateral-aiml': {
    id: 'btech-lateral-aiml',
    name: 'B.Tech Lateral Entry (Artificial Intelligence & Machine Learning)',
    description: 'Compare B.Tech Lateral Entry AI/ML programs. Direct 2nd year entry for diploma holders.',
    keywords: ['B.Tech Lateral Entry AI ML', 'Lateral Entry AIML', 'B.Tech Lateral AI ML', 'Diploma to B.Tech AIML'],
    matchPatterns: [
      /b\.tech.*lateral.*ai.*ml/i,
      /b\.tech.*lateral.*artificial intelligence/i,
      /b\.tech.*lateral.*machine learning/i,
      /lateral entry.*aiml/i,
      /lateral.*ai.*ml/i
    ]
  },

  // B.Tech Lateral Entry Data Sciences
  'btech-lateral-data-science': {
    id: 'btech-lateral-data-science',
    name: 'B.Tech Lateral Entry (Data Sciences)',
    description: 'Compare B.Tech Lateral Entry Data Sciences programs. Direct 2nd year entry for diploma holders.',
    keywords: ['B.Tech Lateral Entry Data Science', 'Lateral Entry Data Sciences', 'B.Tech Lateral Data Science', 'Diploma to B.Tech Data Science'],
    matchPatterns: [
      /b\.tech.*lateral.*data science/i,
      /b\.tech.*lateral.*data sciences/i,
      /lateral entry.*data science/i,
      /lateral.*data science/i
    ]
  },

  // M.Tech Computer Science
  'mtech-cse': {
    id: 'mtech-cse',
    name: 'M.Tech Computer Science & Engineering',
    description: 'Compare M.Tech CSE programs. Advanced postgraduate programs in computer science.',
    keywords: ['M.Tech CSE', 'M.Tech Computer Science', 'Master of Technology CSE', 'M.Tech programs'],
    matchPatterns: [
      /m\.tech.*computer science/i,
      /m\.tech.*cse/i,
      /master.*technology.*computer/i
    ],
    excludePatterns: [
      /ai|ml|artificial intelligence|machine learning/i,
      /data science/i
    ]
  },

  // MCA
  'mca': {
    id: 'mca',
    name: 'Master of Computer Applications (MCA)',
    description: 'Compare MCA programs across universities. Advanced computer applications programs.',
    keywords: ['MCA', 'Master of Computer Applications', 'MCA programs', 'MCA courses'],
    matchPatterns: [
      /^mca$/i,
      /master.*computer.*application/i
    ]
  },

  // B.Tech Lateral Entry IT
  'btech-lateral-it': {
    id: 'btech-lateral-it',
    name: 'B.Tech Lateral Entry (Information Technology)',
    description: 'Compare B.Tech Lateral Entry IT programs. Direct 2nd year entry for diploma holders.',
    keywords: ['B.Tech Lateral Entry IT', 'Lateral Entry IT', 'B.Tech Lateral IT', 'Diploma to B.Tech IT'],
    matchPatterns: [
      /b\.tech.*lateral.*information technology/i,
      /b\.tech.*lateral.*it$/i,
      /lateral entry.*information technology/i,
      /lateral.*it$/i
    ]
  }
};

/**
 * Get course group for a program
 * Returns the most specific matching group
 */
export function getCourseGroup(program) {
  const programName = (program.name || '').toLowerCase();
  const specialization = (program.specialization || '').toLowerCase();
  const searchText = `${programName} ${specialization}`;

  // Collect all matching groups
  const matchingGroups = [];
  
  for (const [groupId, group] of Object.entries(COURSE_GROUPS)) {
    // Check if matches any pattern
    const matches = group.matchPatterns.some(pattern => pattern.test(searchText));
    
    // Check if excluded
    const excluded = group.excludePatterns?.some(pattern => pattern.test(searchText));
    
    if (matches && !excluded) {
      matchingGroups.push({ groupId, group, specificity: group.matchPatterns.length });
    }
  }

  // If multiple matches, prefer more specific groups (more match patterns = more specific)
  // Also prefer lateral entry groups for lateral entry programs
  if (matchingGroups.length > 1) {
    const isLateral = searchText.includes('lateral');
    
    // Sort by specificity (more patterns = more specific) and lateral preference
    matchingGroups.sort((a, b) => {
      const aIsLateral = a.groupId.includes('lateral');
      const bIsLateral = b.groupId.includes('lateral');
      
      // If program is lateral, prefer lateral groups
      if (isLateral) {
        if (aIsLateral && !bIsLateral) return -1;
        if (!aIsLateral && bIsLateral) return 1;
      }
      
      // Otherwise prefer more specific (more patterns)
      return b.specificity - a.specificity;
    });
  }

  return matchingGroups.length > 0 ? matchingGroups[0].groupId : null;
}

/**
 * Get all programs in a course group
 */
export function getProgramsInGroup(programs, groupId) {
  return programs.filter(p => getCourseGroup(p) === groupId);
}

/**
 * Get all available course groups
 */
export function getAllCourseGroups() {
  return Object.values(COURSE_GROUPS);
}

