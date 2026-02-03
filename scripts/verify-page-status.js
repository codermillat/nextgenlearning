/**
 * Verify Page Status Script
 * Task: 19 - Verify all pages return 200 status codes
 * 
 * This script crawls all pages from the sitemap and verifies each returns a 200 status code.
 * It can run against a local dev server or production URL.
 * 
 * Usage:
 *   node scripts/verify-page-status.js [baseUrl]
 * 
 * Examples:
 *   node scripts/verify-page-status.js http://localhost:5173
 *   node scripts/verify-page-status.js https://www.nextgenlearning.dev
 * 
 * Requirements: 8.4
 */

import { readFileSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configuration
const BASE_URL = process.argv[2] || 'http://localhost:5173';
const CONCURRENT_REQUESTS = 5; // Number of concurrent requests
const REQUEST_TIMEOUT = 10000; // 10 seconds timeout per request

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  gray: '\x1b[90m'
};

/**
 * Extract all URLs from sitemap.xml
 */
function extractUrlsFromSitemap() {
  const sitemapPath = join(__dirname, '..', 'public', 'sitemap.xml');
  const sitemapContent = readFileSync(sitemapPath, 'utf-8');
  
  const locRegex = /<loc>(.*?)<\/loc>/g;
  const matches = [...sitemapContent.matchAll(locRegex)];
  
  return matches.map(match => {
    const fullUrl = match[1];
    // Extract path from full URL
    return fullUrl.replace('https://www.nextgenlearning.dev', '');
  });
}

/**
 * Check if a URL returns 200 status code
 */
async function checkPageStatus(path) {
  const url = `${BASE_URL}${path}`;
  
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);
    
    const response = await fetch(url, {
      method: 'GET',
      signal: controller.signal,
      headers: {
        'User-Agent': 'NextGenLearning-StatusChecker/1.0'
      }
    });
    
    clearTimeout(timeoutId);
    
    return {
      path,
      status: response.status,
      ok: response.ok,
      statusText: response.statusText
    };
  } catch (error) {
    return {
      path,
      status: 0,
      ok: false,
      error: error.message
    };
  }
}

/**
 * Process URLs in batches with concurrency control
 */
async function processUrlsInBatches(urls, batchSize) {
  const results = [];
  
  for (let i = 0; i < urls.length; i += batchSize) {
    const batch = urls.slice(i, i + batchSize);
    const batchResults = await Promise.all(
      batch.map(url => checkPageStatus(url))
    );
    results.push(...batchResults);
    
    // Progress indicator
    const progress = Math.min(i + batchSize, urls.length);
    process.stdout.write(`\r${colors.blue}Progress: ${progress}/${urls.length} pages checked${colors.reset}`);
  }
  
  process.stdout.write('\n');
  return results;
}

/**
 * Main execution
 */
async function main() {
  console.log(`${colors.blue}=== Page Status Verification ===${colors.reset}\n`);
  console.log(`Base URL: ${colors.yellow}${BASE_URL}${colors.reset}`);
  console.log(`Concurrent requests: ${CONCURRENT_REQUESTS}`);
  console.log(`Request timeout: ${REQUEST_TIMEOUT}ms\n`);
  
  // Extract URLs from sitemap
  console.log(`${colors.gray}Reading sitemap...${colors.reset}`);
  const urls = extractUrlsFromSitemap();
  console.log(`Found ${colors.yellow}${urls.length}${colors.reset} URLs in sitemap\n`);
  
  // Check all pages
  console.log(`${colors.gray}Checking page status codes...${colors.reset}`);
  const startTime = Date.now();
  const results = await processUrlsInBatches(urls, CONCURRENT_REQUESTS);
  const endTime = Date.now();
  const duration = ((endTime - startTime) / 1000).toFixed(2);
  
  // Analyze results
  const successCount = results.filter(r => r.status === 200).length;
  const errorResults = results.filter(r => r.status !== 200);
  
  console.log(`\n${colors.blue}=== Results ===${colors.reset}\n`);
  console.log(`Total pages: ${colors.yellow}${results.length}${colors.reset}`);
  console.log(`Success (200): ${colors.green}${successCount}${colors.reset}`);
  console.log(`Errors: ${colors.red}${errorResults.length}${colors.reset}`);
  console.log(`Duration: ${duration}s\n`);
  
  // Display errors
  if (errorResults.length > 0) {
    console.log(`${colors.red}=== Pages with Errors ===${colors.reset}\n`);
    errorResults.forEach(result => {
      const statusDisplay = result.status === 0 ? 'TIMEOUT/ERROR' : result.status;
      console.log(`${colors.red}✗${colors.reset} ${result.path}`);
      console.log(`  Status: ${statusDisplay}`);
      if (result.error) {
        console.log(`  Error: ${result.error}`);
      } else if (result.statusText) {
        console.log(`  Status Text: ${result.statusText}`);
      }
      console.log('');
    });
    
    process.exit(1);
  } else {
    console.log(`${colors.green}✓ All pages return 200 status code!${colors.reset}\n`);
    process.exit(0);
  }
}

// Run the script
main().catch(error => {
  console.error(`${colors.red}Fatal error:${colors.reset}`, error);
  process.exit(1);
});
