import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Tech/IT related keywords
const techKeywords = [
  'computer science',
  'information technology',
  'it',
  'cse',
  'data science',
  'data analytics',
  'artificial intelligence',
  'machine learning',
  'ai',
  'ml',
  'aiml',
  'cyber security',
  'cybersecurity',
  'cloud computing',
  'cloud',
  'full stack',
  'fullstack',
  'iot',
  'internet of things',
  'software',
  'bca',
  'mca',
  'computer applications',
  'blockchain',
  'block chain',
  'robotics',
  'mechatronics',
  'web development',
  'web dev',
  'mobile development',
  'app development',
  'game development',
  'embedded systems',
  'network security',
  'digital forensics',
  'information security',
  'big data',
  'data engineering',
  'computer engineering',
  'software engineering',
  'computing',
  'programming',
  'drone technology',
  'augmented reality',
  'virtual reality',
  'ar',
  'vr'
];

// Fields that are tech-related
const techFields = [
  'engineering', // Only if combined with tech keywords
  'computing',
  'computer science & it'
];

function isTechCourse(program) {
  const name = (program.name || '').toLowerCase();
  const specialization = (program.specialization || '').toLowerCase();
  const field = (program.field || '').toLowerCase();
  
  // Check if any tech keyword matches
  const hasTechKeyword = techKeywords.some(keyword => 
    name.includes(keyword) || specialization.includes(keyword)
  );
  
  // For engineering field, check if it's computer/IT related
  if (field.includes('engineering')) {
    const isTechEngineering = 
      name.includes('computer') || 
      name.includes('it') || 
      name.includes('software') ||
      name.includes('data') ||
      name.includes('ai') ||
      name.includes('cyber') ||
      name.includes('cloud') ||
      name.includes('iot') ||
      specialization.includes('computer') ||
      specialization.includes('it') ||
      specialization.includes('software') ||
      specialization.includes('data') ||
      specialization.includes('ai') ||
      specialization.includes('cyber') ||
      specialization.includes('cloud') ||
      specialization.includes('iot');
    
    return isTechEngineering;
  }
  
  // Check if field is tech-related
  if (techFields.some(tf => field.includes(tf))) {
    return true;
  }
  
  return hasTechKeyword;
}

// Process all university files
const universityFiles = ['chandigarh.json', 'galgotias.json', 'niu.json', 'sharda.json'];
const dataDir = path.join(__dirname, '..', 'data', 'universities');

universityFiles.forEach(filename => {
  const filePath = path.join(dataDir, filename);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  
  // Filter programs
  const originalCount = data.programs.length;
  data.programs = data.programs.filter(isTechCourse);
  const newCount = data.programs.length;
  
  // Update disciplines to focus on tech
  if (data.profile && data.profile.facilities && data.profile.facilities.academic) {
    data.profile.facilities.academic.disciplines = [
      'Engineering & Technology',
      'Computer Science',
      'Information Technology',
      'Computing',
      'Data Science',
      'Artificial Intelligence'
    ];
  }
  
  // Write back
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  console.log(`${filename}: Kept ${newCount} tech courses out of ${originalCount} total`);
});

console.log('\nTech course filtering complete!');

