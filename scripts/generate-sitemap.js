/* eslint-disable no-unused-vars */
/**
 * Generate sitemap.xml dynamically from all routes
 * Run with: node scripts/generate-sitemap.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const BASE_URL = 'https://www.nextgenlearning.dev';
const TODAY = new Date().toISOString().split('T')[0];

// Import data
const niuData = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/universities/niu.json'), 'utf8'));
const shardaData = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/universities/sharda.json'), 'utf8'));
const chandigarhData = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/universities/chandigarh.json'), 'utf8'));
const galgotiasData = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/universities/galgotias.json'), 'utf8'));

// Import course groups
const courseGroupsModule = await import('../src/data/courseGroups.js');
const courseGroups = courseGroupsModule.getAllCourseGroups();

// Process universities
const universities = [
  { ...niuData, id: 'niu', slug: 'noida-international-university' },
  { ...shardaData, id: 'sharda', slug: 'sharda-university' },
  { ...chandigarhData, id: 'chandigarh', slug: 'chandigarh-university' },
  { ...galgotiasData, id: 'galgotias', slug: 'galgotias-university' }
];

// Generate slugs
function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-');
}

function universitySlug(university) {
  return university.slug || slugify(university.name);
}

function courseSlug(course) {
  const name = course.name || course.specialization || '';
  return slugify(name);
}

// Flatten all programs
const allPrograms = [];
universities.forEach(uni => {
  const uniSlug = universitySlug(uni);
  (uni.programs || []).forEach(program => {
    allPrograms.push({
      ...program,
      universityId: uni.id,
      universitySlug: uniSlug,
      slug: courseSlug(program)
    });
  });
});

// Generate URLs
const urls = [];

// Static pages
urls.push({
  loc: '/',
  changefreq: 'daily',
  priority: '1.0',
  lastmod: TODAY
});

urls.push({
  loc: '/courses',
  changefreq: 'weekly',
  priority: '0.9',
  lastmod: TODAY
});

urls.push({
  loc: '/universities',
  changefreq: 'weekly',
  priority: '0.9',
  lastmod: TODAY
});

urls.push({
  loc: '/scholarships',
  changefreq: 'weekly',
  priority: '0.8',
  lastmod: TODAY
});

urls.push({
  loc: '/program-categories',
  changefreq: 'weekly',
  priority: '0.8',
  lastmod: TODAY
});

urls.push({
  loc: '/compare',
  changefreq: 'monthly',
  priority: '0.8',
  lastmod: TODAY
});

urls.push({
  loc: '/apply',
  changefreq: 'monthly',
  priority: '0.9',
  lastmod: TODAY
});

urls.push({
  loc: '/about',
  changefreq: 'monthly',
  priority: '0.8',
  lastmod: TODAY
});

urls.push({
  loc: '/contact',
  changefreq: 'monthly',
  priority: '0.9',
  lastmod: TODAY
});

urls.push({
  loc: '/privacy-policy',
  changefreq: 'yearly',
  priority: '0.5',
  lastmod: TODAY
});

urls.push({
  loc: '/terms-and-conditions',
  changefreq: 'yearly',
  priority: '0.5',
  lastmod: TODAY
});

urls.push({
  loc: '/guides',
  changefreq: 'weekly',
  priority: '0.8',
  lastmod: TODAY
});

// Guide article pages
const guideArticles = [
  {
    slug: 'complete-guide-study-india-bangladesh',
    date: '2025-01-15',
    priority: '0.8'
  },
  {
    slug: 'how-to-apply-indian-universities',
    date: '2025-01-14',
    priority: '0.8'
  },
  {
    slug: 'scholarships-bangladeshi-students-india',
    date: '2025-01-13',
    priority: '0.8'
  },
  {
    slug: 'visa-process-india-bangladesh',
    date: '2025-01-12',
    priority: '0.8'
  },
  {
    slug: 'top-10-btech-programs-india',
    date: '2025-01-11',
    priority: '0.8'
  },
  {
    slug: 'mba-india-bangladeshi-students',
    date: '2025-01-10',
    priority: '0.8'
  },
  {
    slug: 'cost-living-india-bangladeshi-students',
    date: '2025-01-09',
    priority: '0.7'
  },
  {
    slug: 'naac-a-plus-universities-india',
    date: '2025-01-08',
    priority: '0.7'
  }
];

guideArticles.forEach(guide => {
  urls.push({
    loc: `/guides/${guide.slug}`,
    changefreq: 'monthly',
    priority: guide.priority,
    lastmod: guide.date
  });
});

urls.push({
  loc: '/faq',
  changefreq: 'weekly',
  priority: '0.8',
  lastmod: TODAY
});

// University pages
universities.forEach(uni => {
  const uniSlug = universitySlug(uni);
  
  urls.push({
    loc: `/universities/${uniSlug}`,
    changefreq: 'weekly',
    priority: '0.8',
    lastmod: TODAY
  });
  
  urls.push({
    loc: `/universities/${uniSlug}/courses`,
    changefreq: 'weekly',
    priority: '0.7',
    lastmod: TODAY
  });
});

// Course group comparison pages
courseGroups.forEach(group => {
  urls.push({
    loc: `/courses/compare/${group.id}`,
    changefreq: 'weekly',
    priority: '0.8',
    lastmod: TODAY
  });
});

// Individual course pages
allPrograms.forEach(program => {
  const courseSlug = program.slug;
  const universitySlug = program.universitySlug;
  
  if (universitySlug && courseSlug) {
    urls.push({
      loc: `/universities/${universitySlug}/courses/${courseSlug}`,
      changefreq: 'monthly',
      priority: '0.7',
      lastmod: TODAY
    });
  }
});

// Google recommends max 50,000 URLs per sitemap and max 50MB uncompressed
// Split into multiple sitemaps if needed (but 693 URLs is fine for single sitemap)
const MAX_URLS_PER_SITEMAP = 50000;

// Escape XML special characters
function escapeXml(unsafe) {
  return unsafe.replace(/[<>&'"]/g, function (c) {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
      default: return c;
    }
  });
}

// Generate XML with proper escaping
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${urls.map(url => {
  // Ensure URL is properly encoded
  const encodedUrl = encodeURI(url.loc).replace(/#/g, '%23');
  return `  <url>
    <loc>${BASE_URL}${encodedUrl}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`;
}).join('\n')}
</urlset>`;

// Write to file (UTF-8 without BOM - Google prefers no BOM)
const sitemapPath = path.join(__dirname, '../public/sitemap.xml');
fs.writeFileSync(sitemapPath, xml, 'utf8');

console.log(`✅ Sitemap generated successfully!`);
console.log(`   Total URLs: ${urls.length}`);
console.log(`   Static pages: 12`);
console.log(`   Guide articles: ${guideArticles.length}`);
console.log(`   University pages: ${universities.length * 2}`);
console.log(`   Course group pages: ${courseGroups.length}`);
console.log(`   Individual course pages: ${allPrograms.length}`);
console.log(`   File saved to: ${sitemapPath}`);

