#!/usr/bin/env node

/**
 * Lighthouse Performance Audit Script
 * 
 * This script runs Lighthouse audits on key pages and generates reports.
 * 
 * Usage:
 *   node scripts/lighthouse-audit.js [url]
 * 
 * Requirements:
 *   npm install -g @lhci/cli lighthouse
 * 
 * Or use npx:
 *   npx lighthouse [url] --view
 */

import { spawn } from 'child_process';
import { existsSync, mkdirSync } from 'fs';
import { join } from 'path';

// Pages to audit
const PAGES_TO_AUDIT = [
  '/',
  '/sharda',
  '/sharda/programs/btech-cse',
  '/sharda/programs/mba',
  '/universities',
  '/courses',
];

// Lighthouse configuration
const LIGHTHOUSE_CONFIG = {
  extends: 'lighthouse:default',
  settings: {
    onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
    formFactor: 'mobile',
    throttling: {
      rttMs: 150,
      throughputKbps: 1638.4,
      cpuSlowdownMultiplier: 4,
    },
  },
};

// Target scores
const TARGET_SCORES = {
  performance: 90,
  accessibility: 90,
  'best-practices': 90,
  seo: 95,
};

/**
 * Run Lighthouse audit on a URL
 */
async function runLighthouseAudit(url, outputDir) {
  return new Promise((resolve, reject) => {
    const args = [
      url,
      '--output=html',
      '--output=json',
      `--output-path=${outputDir}/report`,
      '--chrome-flags="--headless"',
      '--only-categories=performance,accessibility,best-practices,seo',
    ];

    console.log(`\n🔍 Auditing: ${url}`);
    console.log('This may take a minute...\n');

    const lighthouse = spawn('lighthouse', args, { shell: true });

    let output = '';
    lighthouse.stdout.on('data', (data) => {
      output += data.toString();
      process.stdout.write(data);
    });

    lighthouse.stderr.on('data', (data) => {
      process.stderr.write(data);
    });

    lighthouse.on('close', (code) => {
      if (code === 0) {
        resolve(output);
      } else {
        reject(new Error(`Lighthouse exited with code ${code}`));
      }
    });
  });
}

/**
 * Parse Lighthouse JSON report
 */
function parseReport(reportPath) {
  try {
    const report = JSON.parse(require('fs').readFileSync(reportPath, 'utf8'));
    return {
      performance: Math.round(report.categories.performance.score * 100),
      accessibility: Math.round(report.categories.accessibility.score * 100),
      bestPractices: Math.round(report.categories['best-practices'].score * 100),
      seo: Math.round(report.categories.seo.score * 100),
    };
  } catch (error) {
    console.error('Failed to parse report:', error.message);
    return null;
  }
}

/**
 * Check if scores meet targets
 */
function checkScores(scores) {
  const results = {
    passed: true,
    details: [],
  };

  for (const [category, score] of Object.entries(scores)) {
    const target = TARGET_SCORES[category] || 90;
    const passed = score >= target;
    
    results.details.push({
      category,
      score,
      target,
      passed,
      emoji: passed ? '✅' : '❌',
    });

    if (!passed) {
      results.passed = false;
    }
  }

  return results;
}

/**
 * Display results
 */
function displayResults(results) {
  console.log('\n📊 Audit Results:\n');
  console.log('Category          Score  Target  Status');
  console.log('─────────────────────────────────────────');
  
  results.details.forEach(({ category, score, target, emoji }) => {
    const categoryName = category.padEnd(15);
    const scoreStr = `${score}`.padStart(3);
    const targetStr = `${target}`.padStart(3);
    console.log(`${categoryName}  ${scoreStr}    ${targetStr}    ${emoji}`);
  });

  console.log('─────────────────────────────────────────');
  console.log(`\nOverall: ${results.passed ? '✅ PASSED' : '❌ NEEDS IMPROVEMENT'}\n`);
}

/**
 * Main function
 */
async function main() {
  const url = process.argv[2] || 'http://localhost:5173';
  const outputDir = join(process.cwd(), 'lighthouse-reports');

  // Create output directory
  if (!existsSync(outputDir)) {
    mkdirSync(outputDir, { recursive: true });
  }

  console.log('🚀 Starting Lighthouse Audit');
  console.log(`📍 URL: ${url}`);
  console.log(`📁 Output: ${outputDir}\n`);

  try {
    // Check if Lighthouse is installed
    const checkLighthouse = spawn('lighthouse', ['--version'], { shell: true });
    
    checkLighthouse.on('error', () => {
      console.error('❌ Lighthouse is not installed.');
      console.error('\nInstall it with:');
      console.error('  npm install -g lighthouse');
      console.error('\nOr use npx:');
      console.error('  npx lighthouse [url] --view');
      process.exit(1);
    });

    checkLighthouse.on('close', async (code) => {
      if (code !== 0) {
        console.error('❌ Failed to run Lighthouse');
        process.exit(1);
      }

      // Run audit
      await runLighthouseAudit(url, outputDir);

      // Parse and display results
      const reportPath = join(outputDir, 'report.json');
      if (existsSync(reportPath)) {
        const scores = parseReport(reportPath);
        if (scores) {
          const results = checkScores(scores);
          displayResults(results);

          console.log(`📄 Full report: ${join(outputDir, 'report.html')}\n`);

          // Exit with appropriate code
          process.exit(results.passed ? 0 : 1);
        }
      }
    });
  } catch (error) {
    console.error('❌ Error running audit:', error.message);
    process.exit(1);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { runLighthouseAudit, parseReport, checkScores };
