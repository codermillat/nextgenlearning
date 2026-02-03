#!/usr/bin/env node

/**
 * CLS Fixes Verification Script
 * Checks that all CLS optimizations are properly implemented
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

const checks = [];
let passed = 0;
let failed = 0;

function check(name, condition, details = '') {
  const result = condition ? '✅' : '❌';
  const status = condition ? 'PASS' : 'FAIL';
  
  checks.push({ name, status, result, details });
  
  if (condition) {
    passed++;
  } else {
    failed++;
  }
  
  console.log(`${result} ${name}`);
  if (details && !condition) {
    console.log(`   ${details}`);
  }
}

console.log('\n🔍 Verifying CLS Fixes Implementation\n');
console.log('=' .repeat(60));

// Check 1: SkeletonLoader component exists
const skeletonPath = path.join(rootDir, 'src/components/Common/SkeletonLoader.jsx');
check(
  'SkeletonLoader component exists',
  fs.existsSync(skeletonPath),
  'File not found: src/components/Common/SkeletonLoader.jsx'
);

// Check 2: useFontLoading hook exists
const fontHookPath = path.join(rootDir, 'src/hooks/useFontLoading.js');
check(
  'useFontLoading hook exists',
  fs.existsSync(fontHookPath),
  'File not found: src/hooks/useFontLoading.js'
);

// Check 3: CLS measurement utility exists
const clsUtilPath = path.join(rootDir, 'src/utils/clsMeasurement.js');
check(
  'CLS measurement utility exists',
  fs.existsSync(clsUtilPath),
  'File not found: src/utils/clsMeasurement.js'
);

// Check 4: Hero section has min-height
const heroPath = path.join(rootDir, 'src/components/Home/HeroSection.jsx');
if (fs.existsSync(heroPath)) {
  const heroContent = fs.readFileSync(heroPath, 'utf8');
  check(
    'Hero section has responsive min-height',
    heroContent.includes('min-h-[500px]') && 
    heroContent.includes('sm:min-h-[600px]') && 
    heroContent.includes('lg:min-h-[700px]'),
    'Hero section missing responsive min-height classes'
  );
  
  check(
    'Hero section uses flex items-center',
    heroContent.includes('flex items-center'),
    'Hero section missing flex items-center for vertical centering'
  );
}

// Check 5: Mobile menu uses absolute positioning
const headerPath = path.join(rootDir, 'src/components/Layout/Header.jsx');
if (fs.existsSync(headerPath)) {
  const headerContent = fs.readFileSync(headerPath, 'utf8');
  check(
    'Mobile menu uses absolute positioning',
    headerContent.includes('absolute top-full'),
    'Mobile menu not using absolute positioning'
  );
  
  check(
    'Mobile menu removed animate-fade-in',
    !headerContent.includes('mobile-navigation') || !headerContent.includes('animate-fade-in'),
    'Mobile menu still has animate-fade-in class'
  );
}

// Check 6: Font preloading in index.html
const indexPath = path.join(rootDir, 'index.html');
if (fs.existsSync(indexPath)) {
  const indexContent = fs.readFileSync(indexPath, 'utf8');
  check(
    'Font preloading configured',
    indexContent.includes('preload') && indexContent.includes('Inter'),
    'Font preloading not configured in index.html'
  );
  
  check(
    'Font display=swap configured',
    indexContent.includes('display=swap'),
    'Font display=swap not configured'
  );
}

// Check 7: Metric-matched fallback font in CSS
const cssPath = path.join(rootDir, 'src/index.css');
if (fs.existsSync(cssPath)) {
  const cssContent = fs.readFileSync(cssPath, 'utf8');
  check(
    'Metric-matched fallback font configured',
    cssContent.includes('Inter Fallback') && cssContent.includes('size-adjust'),
    'Metric-matched fallback font not configured in index.css'
  );
  
  check(
    'will-change hints added for animations',
    cssContent.includes('will-change: opacity') || cssContent.includes('will-change: transform'),
    'will-change hints not added for animations'
  );
}

// Check 8: CLS monitoring in main.jsx
const mainPath = path.join(rootDir, 'src/main.jsx');
if (fs.existsSync(mainPath)) {
  const mainContent = fs.readFileSync(mainPath, 'utf8');
  check(
    'CLS monitoring initialized',
    mainContent.includes('measureCLS') && mainContent.includes('reportCLS'),
    'CLS monitoring not initialized in main.jsx'
  );
}

// Check 9: Tailwind config has will-change utilities
const tailwindPath = path.join(rootDir, 'tailwind.config.js');
if (fs.existsSync(tailwindPath)) {
  const tailwindContent = fs.readFileSync(tailwindPath, 'utf8');
  check(
    'Tailwind config has will-change utilities',
    tailwindContent.includes('willChange'),
    'will-change utilities not added to tailwind.config.js'
  );
}

// Check 10: Build artifacts exist
const distPath = path.join(rootDir, 'dist');
check(
  'Build artifacts exist',
  fs.existsSync(distPath),
  'Run "npm run build" to generate build artifacts'
);

console.log('=' .repeat(60));
console.log(`\n📊 Results: ${passed} passed, ${failed} failed\n`);

if (failed === 0) {
  console.log('✅ All CLS fixes verified successfully!\n');
  console.log('Next steps:');
  console.log('1. Deploy to staging environment');
  console.log('2. Run Lighthouse audits');
  console.log('3. Verify CLS < 0.1 on critical pages');
  console.log('4. Monitor Google Analytics for cls_measurement events\n');
} else {
  console.log('❌ Some checks failed. Please review the issues above.\n');
  process.exit(1);
}
