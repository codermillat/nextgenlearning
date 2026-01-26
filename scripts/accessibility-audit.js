/**
 * Accessibility Audit Script
 * 
 * Runs automated accessibility tests using axe-core
 * Tests all major Sharda University pages for WCAG 2.1 AA compliance
 */

import { AxePuppeteer } from '@axe-core/puppeteer';
import puppeteer from 'puppeteer';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Pages to audit
const pagesToAudit = [
  { name: 'Sharda Landing Page', path: '/sharda' },
  { name: 'Sharda B.Tech CSE Fees', path: '/sharda-university-btech-cse-fees' },
  { name: 'Sharda MBA Fees', path: '/sharda-university-mba-fees' },
  { name: 'Sharda NIRF Ranking', path: '/sharda-university-nirf-ranking' },
  { name: 'Sharda Ranking 2026', path: '/sharda-university-ranking-2026' },
  { name: 'Study in India from Bangladesh', path: '/study-in-india-from-bangladesh' },
  { name: 'Sharda vs Amity', path: '/sharda-vs-amity-university' },
  { name: 'Sharda B.Tech CSE Program', path: '/sharda-university-btech-cse' },
  { name: 'Home Page', path: '/' },
];

async function runAccessibilityAudit(baseUrl = 'http://localhost:4173') {
  console.log('🔍 Starting Accessibility Audit...\n');
  console.log(`Base URL: ${baseUrl}\n`);

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const results = [];
  let totalViolations = 0;
  let totalPasses = 0;

  try {
    for (const page of pagesToAudit) {
      console.log(`\n📄 Auditing: ${page.name}`);
      console.log(`   URL: ${baseUrl}${page.path}`);

      const browserPage = await browser.newPage();
      
      try {
        await browserPage.goto(`${baseUrl}${page.path}`, {
          waitUntil: 'networkidle0',
          timeout: 30000
        });

        // Run axe accessibility tests
        const axeResults = await new AxePuppeteer(browserPage)
          .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
          .analyze();

        const violations = axeResults.violations.length;
        const passes = axeResults.passes.length;
        
        totalViolations += violations;
        totalPasses += passes;

        results.push({
          page: page.name,
          path: page.path,
          violations: axeResults.violations,
          passes: passes,
          incomplete: axeResults.incomplete.length
        });

        if (violations === 0) {
          console.log(`   ✅ No violations found`);
        } else {
          console.log(`   ⚠️  ${violations} violation(s) found`);
          axeResults.violations.forEach((violation, index) => {
            console.log(`      ${index + 1}. ${violation.id}: ${violation.description}`);
            console.log(`         Impact: ${violation.impact}`);
            console.log(`         Affected elements: ${violation.nodes.length}`);
          });
        }

        console.log(`   ✓ ${passes} checks passed`);

      } catch (error) {
        console.error(`   ❌ Error auditing page: ${error.message}`);
        results.push({
          page: page.name,
          path: page.path,
          error: error.message
        });
      } finally {
        await browserPage.close();
      }
    }

    // Generate summary report
    console.log('\n' + '='.repeat(80));
    console.log('📊 ACCESSIBILITY AUDIT SUMMARY');
    console.log('='.repeat(80));
    console.log(`\nTotal pages audited: ${pagesToAudit.length}`);
    console.log(`Total violations found: ${totalViolations}`);
    console.log(`Total checks passed: ${totalPasses}`);
    
    const pagesWithViolations = results.filter(r => r.violations && r.violations.length > 0);
    console.log(`\nPages with violations: ${pagesWithViolations.length}`);
    
    if (pagesWithViolations.length > 0) {
      console.log('\n⚠️  VIOLATIONS BY PAGE:');
      pagesWithViolations.forEach(result => {
        console.log(`\n${result.page} (${result.path}):`);
        result.violations.forEach((violation, index) => {
          console.log(`  ${index + 1}. [${violation.impact.toUpperCase()}] ${violation.id}`);
          console.log(`     ${violation.description}`);
          console.log(`     Help: ${violation.helpUrl}`);
          console.log(`     Affected elements: ${violation.nodes.length}`);
        });
      });
    }

    // Save detailed report to file
    const reportPath = join(__dirname, '..', 'accessibility-audit-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(results, null, 2));
    console.log(`\n📄 Detailed report saved to: ${reportPath}`);

    // Exit with error code if violations found
    if (totalViolations > 0) {
      console.log('\n❌ Accessibility audit completed with violations');
      process.exit(1);
    } else {
      console.log('\n✅ Accessibility audit completed successfully - no violations found!');
      process.exit(0);
    }

  } finally {
    await browser.close();
  }
}

// Get base URL from command line or use default
const baseUrl = process.argv[2] || 'http://localhost:4173';
runAccessibilityAudit(baseUrl).catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
