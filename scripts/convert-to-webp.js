#!/usr/bin/env node

/**
 * Convert images to WebP format for better performance
 * Reduces image size by 25-35% on average
 */

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

const publicDir = path.join(rootDir, 'public');
const srcDir = path.join(rootDir, 'src');

console.log('\n🖼️  Converting images to WebP format\n');
console.log('='.repeat(70));

let converted = 0;
let skipped = 0;
let errors = 0;

async function convertImage(inputPath, outputPath) {
  try {
    const info = await sharp(inputPath)
      .webp({ quality: 85, effort: 6 })
      .toFile(outputPath);
    
    const inputSize = fs.statSync(inputPath).size;
    const outputSize = info.size;
    const savings = ((inputSize - outputSize) / inputSize * 100).toFixed(1);
    
    console.log(`✅ ${path.basename(inputPath)} → ${path.basename(outputPath)}`);
    console.log(`   ${(inputSize / 1024).toFixed(1)}KB → ${(outputSize / 1024).toFixed(1)}KB (${savings}% smaller)\n`);
    
    converted++;
  } catch (error) {
    console.error(`❌ Error converting ${inputPath}:`, error.message);
    errors++;
  }
}

async function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      await processDirectory(filePath);
    } else if (/\.(jpg|jpeg|png)$/i.test(file)) {
      const webpPath = filePath.replace(/\.(jpg|jpeg|png)$/i, '.webp');
      
      if (fs.existsSync(webpPath)) {
        console.log(`⏭️  Skipping ${file} (WebP already exists)`);
        skipped++;
      } else {
        await convertImage(filePath, webpPath);
      }
    }
  }
}

async function main() {
  // Process public directory
  if (fs.existsSync(publicDir)) {
    console.log('\n📁 Processing public directory...\n');
    await processDirectory(publicDir);
  }
  
  // Process src/assets directory
  const assetsDir = path.join(srcDir, 'assets');
  if (fs.existsSync(assetsDir)) {
    console.log('\n📁 Processing src/assets directory...\n');
    await processDirectory(assetsDir);
  }
  
  console.log('='.repeat(70));
  console.log(`\n📊 Summary:`);
  console.log(`   ✅ Converted: ${converted} images`);
  console.log(`   ⏭️  Skipped: ${skipped} images`);
  console.log(`   ❌ Errors: ${errors} images\n`);
  
  if (converted > 0) {
    console.log('💡 Next steps:');
    console.log('   1. Update image references in your code to use .webp');
    console.log('   2. Use <picture> element for fallbacks:');
    console.log('      <picture>');
    console.log('        <source srcset="image.webp" type="image/webp">');
    console.log('        <img src="image.jpg" alt="Description">');
    console.log('      </picture>\n');
  }
}

main().catch(console.error);
