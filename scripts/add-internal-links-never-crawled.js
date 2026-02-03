#!/usr/bin/env node

/**
 * Add Internal Links to Never-Crawled Pages
 * Improves discoverability of pending URLs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

console.log('\n🔗 Adding Internal Links to Improve Crawlability\n');
console.log('='.repeat(70));

// Read the discovered URLs (never crawled)
const discoveredFile = path.join(rootDir, 'google search console/Discovered - currently not indexed.csv');
const content = fs.readFileSync(discoveredFile, 'utf8');
const lines = content.split('\n').slice(1);

const neverCrawled = lines
  .filter(line => line.trim())
  .map(line => {
    const [url] = line.split(',');
    return url.trim();
  })
  .filter(url => url.includes('1970-01-01') || !url.includes('Last crawled'));

console.log(`Found ${neverCrawled.length} never-crawled URLs\n`);

// Categorize URLs
const comparisonUrls = neverCrawled.filter(url => url.includes('/courses/compare/'));
const courseUrls = neverCrawled.filter(url => url.includes('/universities/') && url.includes('/courses/'));

console.log(`📊 Breakdown:`);
console.log(`   Course Comparison Pages: ${comparisonUrls.length}`);
console.log(`   University Course Pages: ${courseUrls.length}\n`);

// Generate React component for additional links
const comparisonLinks = comparisonUrls.map(url => {
  const slug = url.split('/courses/compare/')[1];
  const name = slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  return { slug, name, url };
});

console.log(`💡 Recommendations:\n`);

console.log(`1. Add these comparison links to Home.jsx:`);
console.log(`   (Add to Tech Categories Section)\n`);

comparisonLinks.forEach(({ slug, name }) => {
  console.log(`   <Card to="/courses/compare/${slug}">`);
  console.log(`     <h3>${name}</h3>`);
  console.log(`   </Card>\n`);
});

console.log(`\n2. Add "Related Courses" component to CourseDetail.jsx:`);
console.log(`   - Shows similar courses at same university`);
console.log(`   - Shows same course at other universities`);
console.log(`   - Links to course comparison pages\n`);

console.log(`3. Add course links to Universities page:`);
console.log(`   - Add "Popular Courses" section to each university card`);
console.log(`   - Link to top 5-10 courses per university\n`);

console.log(`4. Create comprehensive course navigation:`);
console.log(`   - Add to main navigation or footer`);
console.log(`   - Group courses by category`);
console.log(`   - Link to all comparison pages\n`);

// Generate component code
const componentCode = `
// Add to src/components/Course/RelatedCourses.jsx

import { Link } from 'react-router-dom';
import { memo } from 'react';

const RelatedCourses = memo(function RelatedCourses({ 
  currentCourse, 
  university, 
  category 
}) {
  // Get related courses from the same university
  const sameUniversityCourses = [
    // TODO: Fetch from data
  ];

  // Get same course from other universities
  const otherUniversities = [
    // TODO: Fetch from data
  ];

  return (
    <section className="mt-12 bg-gray-50 p-6 rounded-xl">
      <h2 className="text-2xl font-bold mb-6">Related Courses</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Same University */}
        <div>
          <h3 className="text-lg font-semibold mb-4">
            More courses at {university}
          </h3>
          <ul className="space-y-2">
            {sameUniversityCourses.map(course => (
              <li key={course.slug}>
                <Link 
                  to={\`/universities/\${university}/courses/\${course.slug}\`}
                  className="text-blue-600 hover:underline"
                >
                  {course.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Other Universities */}
        <div>
          <h3 className="text-lg font-semibold mb-4">
            {currentCourse} at other universities
          </h3>
          <ul className="space-y-2">
            {otherUniversities.map(uni => (
              <li key={uni.slug}>
                <Link 
                  to={\`/universities/\${uni.slug}/courses/\${currentCourse}\`}
                  className="text-blue-600 hover:underline"
                >
                  {uni.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Comparison Link */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <Link 
          to={\`/courses/compare/\${category}\`}
          className="inline-flex items-center text-blue-600 font-semibold hover:underline"
        >
          Compare all {category} programs →
        </Link>
      </div>
    </section>
  );
});

export default RelatedCourses;
`;

fs.writeFileSync(
  path.join(rootDir, 'src/components/Course/RelatedCourses.jsx'),
  componentCode
);

console.log(`✅ Created src/components/Course/RelatedCourses.jsx\n`);

// Generate list of URLs to manually submit
const priorityUrls = [...comparisonUrls, ...courseUrls.slice(0, 30)];
fs.writeFileSync(
  path.join(rootDir, 'never-crawled-urls.txt'),
  priorityUrls.join('\n')
);

console.log(`📝 Generated never-crawled-urls.txt`);
console.log(`   (${priorityUrls.length} URLs for manual submission)\n`);

console.log('='.repeat(70));
console.log(`\n✅ Internal linking improvements ready!`);
console.log(`\nNext steps:`);
console.log(`1. Review and integrate the RelatedCourses component`);
console.log(`2. Add comparison links to Home.jsx`);
console.log(`3. Add course links to Universities page`);
console.log(`4. Submit URLs manually via Google Search Console`);
console.log(`5. Monitor indexing status in 1-2 weeks\n`);
