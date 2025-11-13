/**
 * Generate static routes for all courses and universities
 * This ensures all pages are pre-rendered and indexable
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read university data
const universities = [
  JSON.parse(fs.readFileSync(path.join(__dirname, '../data/universities/niu.json'), 'utf-8')),
  JSON.parse(fs.readFileSync(path.join(__dirname, '../data/universities/sharda.json'), 'utf-8')),
  JSON.parse(fs.readFileSync(path.join(__dirname, '../data/universities/chandigarh.json'), 'utf-8')),
  JSON.parse(fs.readFileSync(path.join(__dirname, '../data/universities/galgotias.json'), 'utf-8')),
];

// Generate slugs
function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

// Collect all routes
const routes = [
  '/',
  '/courses',
  '/universities',
  '/compare',
  '/apply',
];

// Add university routes
universities.forEach(uni => {
  const uniSlug = slugify(uni.name);
  routes.push(`/universities/${uniSlug}`);
  routes.push(`/universities/${uniSlug}/courses`);
  
  // Add course routes (now with university in URL)
  if (uni.programs) {
    uni.programs.forEach(program => {
      const courseSlug = slugify(program.name || program.specialization);
      routes.push(`/universities/${uniSlug}/courses/${courseSlug}`);
    });
  }
});

// Add course group comparison routes
const courseGroups = [
  'btech-cse',
  'btech-ai-ml',
  'btech-data-science',
  'btech-cyber-security',
  'bba',
  'mba',
  'btech-mechanical',
  'btech-civil',
  'btech-electrical',
  'btech-ece',
  'bca',
  'bsc-computer-science',
];

courseGroups.forEach(group => {
  routes.push(`/courses/compare/${group}`);
});

// Export routes for static generation
console.log('Generated routes:', routes.length);
export default routes;

