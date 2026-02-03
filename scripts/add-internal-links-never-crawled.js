/**
 * Script to add internal links to never-crawled pages
 * Feature: seo-overhaul
 * Task: 14 - Verify page reachability for indexing
 * 
 * This script identifies pages that have never been crawled by Google
 * and adds internal links to them from high-authority pages.
 * 
 * Requirements: 5.6
 */

import { _readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

// Pages that have never been crawled (from GSC data)
const neverCrawledPages = [
  '/courses/compare/bsc-computer-science',
  '/courses/compare/btech-blockchain',
  '/courses/compare/btech-iot',
  '/universities/chandigarh-university/courses/be-cse-artificial-intelligence-machine-learning-with-ibm',
  '/universities/galgotias-university/courses/bca-in-industry-oriented-specialization-artificial-intelligence-and-machine-learning',
  '/universities/sharda-university/courses/ba-honsresearch-journalism-mass-communication',
  '/universities/sharda-university/courses/ba-llb-hons-integrated',
  '/universities/sharda-university/courses/bba-finance-accounting-with-acca-uk',
  '/universities/sharda-university/courses/bca-cloud-computing-and-iot',
  '/universities/sharda-university/courses/bsc-honsresearch-animation-vfx-and-gaming-design-specialisation-in-animation-vfxspecialisation-in-gaming-design',
  '/universities/sharda-university/courses/bsc-honsresearch-environmental-science',
  '/universities/sharda-university/courses/bsc-honsresearch-zoology',
  '/universities/sharda-university/courses/btech-biotechnology-stem-cell-tissue-engg',
  '/universities/sharda-university/courses/btech-lateral-entry-biotechnology-stem-cell-tissue-engg',
  '/universities/sharda-university/courses/btech-lateral-entry-cse-ai-for-iot-applications-in-association-with-aeris',
  '/universities/sharda-university/courses/btech-lateral-entry-cse-block-chain-technology',
  '/universities/sharda-university/courses/msc-clinical-research',
  '/universities/sharda-university/courses/msc-medical-anatomymedical-bio-chemistrymedical-microbiologymedical-pharmacologymedical-physiology',
  '/universities/sharda-university/courses/mtech-electronics-communication-engg-digital-communicationvlsi-technology'
];

// High-authority pages to add links from
const _highAuthorityPages = [
  {
    path: 'src/pages/Home.jsx',
    type: 'homepage',
    authority: 'highest'
  },
  {
    path: 'src/pages/Courses.jsx',
    type: 'courses-listing',
    authority: 'high'
  },
  {
    path: 'src/pages/Universities.jsx',
    type: 'universities-listing',
    authority: 'high'
  },
  {
    path: 'src/pages/Compare.jsx',
    type: 'compare-page',
    authority: 'high'
  },
  {
    path: 'src/pages/UniversityDetail.jsx',
    type: 'university-detail',
    authority: 'medium'
  }
];

/**
 * Categorize never-crawled pages by type
 */
function categorizePages() {
  const categories = {
    courseComparisons: [],
    shardaCourses: [],
    chandigarhCourses: [],
    galgotiasCourses: []
  };

  neverCrawledPages.forEach(page => {
    if (page.startsWith('/courses/compare/')) {
      categories.courseComparisons.push(page);
    } else if (page.includes('/sharda-university/courses/')) {
      categories.shardaCourses.push(page);
    } else if (page.includes('/chandigarh-university/courses/')) {
      categories.chandigarhCourses.push(page);
    } else if (page.includes('/galgotias-university/courses/')) {
      categories.galgotiasCourses.push(page);
    }
  });

  return categories;
}

/**
 * Generate link recommendations
 */
function generateLinkRecommendations() {
  const categories = categorizePages();
  const recommendations = [];

  // Course comparison pages should be linked from Compare page
  if (categories.courseComparisons.length > 0) {
    recommendations.push({
      targetPages: categories.courseComparisons,
      linkFrom: 'src/pages/Compare.jsx',
      section: 'Popular Course Comparisons',
      priority: 'high',
      implementation: 'Add these comparison pages to the "Popular Comparisons" section'
    });
  }

  // Sharda courses should be linked from Sharda university detail page
  if (categories.shardaCourses.length > 0) {
    recommendations.push({
      targetPages: categories.shardaCourses,
      linkFrom: 'src/pages/UniversityDetail.jsx (Sharda)',
      section: 'Featured Programs or All Courses',
      priority: 'high',
      implementation: 'Add these courses to the university courses list or featured programs section'
    });
  }

  // Chandigarh courses should be linked from Chandigarh university detail page
  if (categories.chandigarhCourses.length > 0) {
    recommendations.push({
      targetPages: categories.chandigarhCourses,
      linkFrom: 'src/pages/UniversityDetail.jsx (Chandigarh)',
      section: 'Featured Programs or All Courses',
      priority: 'high',
      implementation: 'Add these courses to the university courses list or featured programs section'
    });
  }

  // Galgotias courses should be linked from Galgotias university detail page
  if (categories.galgotiasCourses.length > 0) {
    recommendations.push({
      targetPages: categories.galgotiasCourses,
      linkFrom: 'src/pages/UniversityDetail.jsx (Galgotias)',
      section: 'Featured Programs or All Courses',
      priority: 'high',
      implementation: 'Add these courses to the university courses list or featured programs section'
    });
  }

  return recommendations;
}

/**
 * Generate report
 */
function generateReport() {
  const categories = categorizePages();
  const recommendations = generateLinkRecommendations();

  const report = {
    summary: {
      totalNeverCrawledPages: neverCrawledPages.length,
      courseComparisons: categories.courseComparisons.length,
      shardaCourses: categories.shardaCourses.length,
      chandigarhCourses: categories.chandigarhCourses.length,
      galgotiasCourses: categories.galgotiasCourses.length
    },
    categories,
    recommendations,
    nextSteps: [
      '1. Review the recommendations below',
      '2. Add internal links from high-authority pages to never-crawled pages',
      '3. Ensure links use descriptive anchor text',
      '4. Submit updated sitemap to Google Search Console',
      '5. Request indexing for these pages in GSC'
    ]
  };

  return report;
}

/**
 * Main execution
 */
function main() {
  console.log('🔍 Analyzing never-crawled pages...\n');

  const report = generateReport();

  console.log('📊 SUMMARY');
  console.log('─'.repeat(60));
  console.log(`Total never-crawled pages: ${report.summary.totalNeverCrawledPages}`);
  console.log(`  - Course comparisons: ${report.summary.courseComparisons}`);
  console.log(`  - Sharda courses: ${report.summary.shardaCourses}`);
  console.log(`  - Chandigarh courses: ${report.summary.chandigarhCourses}`);
  console.log(`  - Galgotias courses: ${report.summary.galgotiasCourses}`);
  console.log('');

  console.log('📋 RECOMMENDATIONS');
  console.log('─'.repeat(60));
  report.recommendations.forEach((rec, index) => {
    console.log(`\n${index + 1}. Link from: ${rec.linkFrom}`);
    console.log(`   Section: ${rec.section}`);
    console.log(`   Priority: ${rec.priority.toUpperCase()}`);
    console.log(`   Pages to link (${rec.targetPages.length}):`);
    rec.targetPages.forEach(page => {
      console.log(`     - ${page}`);
    });
    console.log(`   Implementation: ${rec.implementation}`);
  });

  console.log('\n\n✅ NEXT STEPS');
  console.log('─'.repeat(60));
  report.nextSteps.forEach(step => {
    console.log(step);
  });

  // Save report to file
  const reportPath = join(process.cwd(), 'NEVER-CRAWLED-PAGES-REPORT.md');
  const reportContent = generateMarkdownReport(report);
  writeFileSync(reportPath, reportContent, 'utf-8');

  console.log(`\n📄 Report saved to: ${reportPath}\n`);
}

/**
 * Generate markdown report
 */
function generateMarkdownReport(report) {
  let markdown = '# Never-Crawled Pages Report\n\n';
  markdown += 'Generated: ' + new Date().toISOString() + '\n\n';
  
  markdown += '## Summary\n\n';
  markdown += `- **Total never-crawled pages**: ${report.summary.totalNeverCrawledPages}\n`;
  markdown += `- **Course comparisons**: ${report.summary.courseComparisons}\n`;
  markdown += `- **Sharda courses**: ${report.summary.shardaCourses}\n`;
  markdown += `- **Chandigarh courses**: ${report.summary.chandigarhCourses}\n`;
  markdown += `- **Galgotias courses**: ${report.summary.galgotiasCourses}\n\n`;

  markdown += '## Categories\n\n';
  
  markdown += '### Course Comparison Pages\n\n';
  report.categories.courseComparisons.forEach(page => {
    markdown += `- ${page}\n`;
  });
  markdown += '\n';

  markdown += '### Sharda University Courses\n\n';
  report.categories.shardaCourses.forEach(page => {
    markdown += `- ${page}\n`;
  });
  markdown += '\n';

  markdown += '### Chandigarh University Courses\n\n';
  report.categories.chandigarhCourses.forEach(page => {
    markdown += `- ${page}\n`;
  });
  markdown += '\n';

  markdown += '### Galgotias University Courses\n\n';
  report.categories.galgotiasCourses.forEach(page => {
    markdown += `- ${page}\n`;
  });
  markdown += '\n';

  markdown += '## Recommendations\n\n';
  report.recommendations.forEach((rec, index) => {
    markdown += `### ${index + 1}. ${rec.linkFrom}\n\n`;
    markdown += `**Section**: ${rec.section}\n\n`;
    markdown += `**Priority**: ${rec.priority.toUpperCase()}\n\n`;
    markdown += `**Pages to link** (${rec.targetPages.length}):\n\n`;
    rec.targetPages.forEach(page => {
      markdown += `- ${page}\n`;
    });
    markdown += `\n**Implementation**: ${rec.implementation}\n\n`;
  });

  markdown += '## Next Steps\n\n';
  report.nextSteps.forEach((step, index) => {
    markdown += `${index + 1}. ${step.replace(/^\d+\.\s*/, '')}\n`;
  });

  markdown += '\n## Implementation Notes\n\n';
  markdown += '- All links should use descriptive anchor text\n';
  markdown += '- Links should be naturally integrated into existing content\n';
  markdown += '- After adding links, submit updated sitemap to Google Search Console\n';
  markdown += '- Request indexing for these pages in GSC\n';
  markdown += '- Monitor crawl status over the next 2-4 weeks\n';

  return markdown;
}

// Run the script
main();
