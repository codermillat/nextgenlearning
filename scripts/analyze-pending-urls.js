#!/usr/bin/env node

/**
 * Analyze Pending URLs from Google Search Console
 * Identifies patterns and suggests fixes
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

// Read CSV files
const discoveredFile = path.join(rootDir, 'google search console/Discovered - currently not indexed.csv');
const crawledFile = path.join(rootDir, 'google search console/Crawled - currently not indexed.csv');

function parseCSV(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n').slice(1); // Skip header
  return lines
    .filter(line => line.trim())
    .map(line => {
      const [url, lastCrawled] = line.split(',');
      return { url: url.trim(), lastCrawled: lastCrawled?.trim() };
    });
}

console.log('\n📊 Analyzing Pending URLs from Google Search Console\n');
console.log('='.repeat(70));

// Parse both files
const discovered = parseCSV(discoveredFile);
const crawled = parseCSV(crawledFile);

console.log(`\n📈 Summary:`);
console.log(`   Discovered (not crawled): ${discovered.length} URLs`);
console.log(`   Crawled (not indexed): ${crawled.length} URLs`);
console.log(`   Total pending: ${discovered.length + crawled.length} URLs`);

// Analyze URL patterns
const allUrls = [...discovered, ...crawled];
const patterns = {};

allUrls.forEach(({ url }) => {
  // Extract pattern
  const urlObj = new URL(url);
  const pathParts = urlObj.pathname.split('/').filter(p => p);
  
  if (pathParts.includes('courses') && pathParts.includes('compare')) {
    patterns['Course Comparison'] = (patterns['Course Comparison'] || 0) + 1;
  } else if (pathParts.includes('universities') && pathParts.includes('courses')) {
    patterns['University Course Detail'] = (patterns['University Course Detail'] || 0) + 1;
  } else if (pathParts.includes('guides')) {
    patterns['Guide Pages'] = (patterns['Guide Pages'] || 0) + 1;
  } else if (urlObj.search.includes('?m=')) {
    patterns['Mobile Query Parameter'] = (patterns['Mobile Query Parameter'] || 0) + 1;
  } else {
    patterns['Other'] = (patterns['Other'] || 0) + 1;
  }
});

console.log(`\n📋 URL Patterns:`);
Object.entries(patterns)
  .sort((a, b) => b[1] - a[1])
  .forEach(([pattern, count]) => {
    console.log(`   ${pattern}: ${count} URLs`);
  });

// Analyze universities
const universities = {};
allUrls.forEach(({ url }) => {
  if (url.includes('/universities/')) {
    const match = url.match(/\/universities\/([^/]+)/);
    if (match) {
      const uni = match[1];
      universities[uni] = (universities[uni] || 0) + 1;
    }
  }
});

console.log(`\n🏛️  URLs by University:`);
Object.entries(universities)
  .sort((a, b) => b[1] - a[1])
  .forEach(([uni, count]) => {
    console.log(`   ${uni}: ${count} URLs`);
  });

// Identify specific issues
console.log(`\n⚠️  Specific Issues:`);

const mobileUrls = allUrls.filter(({ url }) => url.includes('?m='));
if (mobileUrls.length > 0) {
  console.log(`   ❌ ${mobileUrls.length} URL(s) with mobile query parameter (?m=)`);
  mobileUrls.forEach(({ url }) => console.log(`      ${url}`));
}

const neverCrawled = discovered.filter(({ lastCrawled }) => lastCrawled === '1970-01-01');
console.log(`   ⏳ ${neverCrawled.length} URLs never crawled (date: 1970-01-01)`);

const recentlyCrawled = crawled.filter(({ lastCrawled }) => {
  const date = new Date(lastCrawled);
  const now = new Date();
  const daysDiff = (now - date) / (1000 * 60 * 60 * 24);
  return daysDiff < 30;
});
console.log(`   🔄 ${recentlyCrawled.length} URLs crawled in last 30 days but not indexed`);

// Generate recommendations
console.log(`\n💡 Recommendations:\n`);

console.log(`1. Internal Linking (High Priority)`);
console.log(`   - Add more links to course comparison pages from home page`);
console.log(`   - Add "Related Courses" section to course detail pages`);
console.log(`   - Add breadcrumb navigation to all pages`);
console.log(`   - Create comprehensive course category navigation\n`);

console.log(`2. Content Enhancement (Medium Priority)`);
console.log(`   - Expand course detail pages with unique content`);
console.log(`   - Add comparison tables to comparison pages`);
console.log(`   - Add FAQ sections to course pages`);
console.log(`   - Add testimonials and case studies\n`);

console.log(`3. Manual Submission (Quick Win)`);
console.log(`   - Submit all course comparison URLs via GSC URL Inspection`);
console.log(`   - Submit top 50 course detail pages`);
console.log(`   - Submit all guide pages`);
console.log(`   - Use Google Indexing API for batch submission\n`);

console.log(`4. Technical Fixes (Low Priority)`);
console.log(`   - Mobile query parameter already handled by App.jsx`);
console.log(`   - Canonical tags already implemented`);
console.log(`   - Page speed already optimized\n`);

// Generate URL list for manual submission
const priorityUrls = [
  ...allUrls.filter(({ url }) => url.includes('/courses/compare/')),
  ...allUrls.filter(({ url }) => url.includes('/guides/')),
].slice(0, 50);

const outputFile = path.join(rootDir, 'priority-urls-for-submission.txt');
fs.writeFileSync(
  outputFile,
  priorityUrls.map(({ url }) => url).join('\n')
);

console.log(`📝 Generated priority URL list: priority-urls-for-submission.txt`);
console.log(`   (${priorityUrls.length} URLs ready for manual submission)\n`);

console.log('='.repeat(70));
console.log(`\n✅ Analysis complete! See INDEXING-ANALYSIS.md for detailed report.\n`);
