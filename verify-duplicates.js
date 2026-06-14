#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// List of all product HTML files
const htmlFiles = [
  '/Users/laxmandas/Downloads/cosmic-skyrocket-main/product_details/Natural-Stones/Sand-stone/Autumn_Brown/Autumn_Brown.html',
  '/Users/laxmandas/Downloads/cosmic-skyrocket-main/product_details/Natural-Stones/Sand-stone/Jaisalmer_Yellow/Jaisalmer_Yellow.html',
  '/Users/laxmandas/Downloads/cosmic-skyrocket-main/product_details/Natural-Stones/Sand-stone/Kandla_Grey/Kandla_Grey.html',
  '/Users/laxmandas/Downloads/cosmic-skyrocket-main/product_details/Natural-Stones/Sand-stone/Mint_Sandstone/Mint_Sandstone.html',
  '/Users/laxmandas/Downloads/cosmic-skyrocket-main/product_details/Natural-Stones/Sand-stone/Modak/Modak.html',
  '/Users/laxmandas/Downloads/cosmic-skyrocket-main/product_details/Natural-Stones/Sand-stone/Rainbow/Rainbow.html',
  '/Users/laxmandas/Downloads/cosmic-skyrocket-main/product_details/Natural-Stones/Sand-stone/Raj_Blend/Raj_Blend.html',
  '/Users/laxmandas/Downloads/cosmic-skyrocket-main/product_details/Natural-Stones/Sand-stone/Raj_Green/Raj_Green.html',
  '/Users/laxmandas/Downloads/cosmic-skyrocket-main/product_details/Natural-Stones/Sand-stone/Raveena/Raveena.html',
  '/Users/laxmandas/Downloads/cosmic-skyrocket-main/product_details/Natural-Stones/Sand-stone/Red_Sandstone/Red_Sandstone.html',
  '/Users/laxmandas/Downloads/cosmic-skyrocket-main/product_details/Natural-Stones/Sand-stone/Rippon_Buff/Rippon_Buff.html',
  '/Users/laxmandas/Downloads/cosmic-skyrocket-main/product_details/Natural-Stones/Sand-stone/Sagar_Black/Sagar_Black.html',
  '/Users/laxmandas/Downloads/cosmic-skyrocket-main/product_details/Natural-Stones/Sand-stone/Teakwood/Teakwood.html',
  '/Users/laxmandas/Downloads/cosmic-skyrocket-main/product_details/Natural-Stones/Lime-stone/Kadappa_Black/Kadappa_Black.html',
  '/Users/laxmandas/Downloads/cosmic-skyrocket-main/product_details/Natural-Stones/Lime-stone/Kota_Blue/Kota_Blue.html',
  '/Users/laxmandas/Downloads/cosmic-skyrocket-main/product_details/Natural-Stones/Lime-stone/Kota_Brown/Kota_Brown.html',
  '/Users/laxmandas/Downloads/cosmic-skyrocket-main/product_details/Natural-Stones/Lime-stone/Yellow_Tandoor/Yellow_Tandoor.html'
];

console.log('Checking for duplicate or misaligned images in steps-grid...\n');

htmlFiles.forEach(filePath => {
  const fileName = path.basename(filePath);
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Find steps-grid div
    const stepsGridMatch = content.match(/<div class="steps-grid">([\s\S]*?)<\/div>/);
    
    if (!stepsGridMatch) {
      console.log(`✗ ${fileName}: Could not find steps-grid`);
      return;
    }
    
    const stepsGridContent = stepsGridMatch[1];
    
    // Find all img tags within steps-grid
    const imgMatches = stepsGridContent.match(/<img[^>]*alt="([^"]*)"[^>]*>/g);
    
    if (!imgMatches || imgMatches.length !== 6) {
      console.log(`⚠ ${fileName}: Found ${imgMatches ? imgMatches.length : 0} images in steps-grid (expected 6)`);
    }
    
    // Check for content after steps-grid closing div
    const afterStepsGrid = content.substring(stepsGridMatch.index + stepsGridMatch[0].length, stepsGridMatch.index + stepsGridMatch[0].length + 500);
    
    if (afterStepsGrid.includes('<div class="steps-grid-item">')) {
      console.log(`✗ ${fileName}: FOUND DUPLICATE ITEMS OUTSIDE STEPS-GRID!`);
      // Count how many
      const duplicateCount = (afterStepsGrid.match(/<div class="steps-grid-item">/g) || []).length;
      console.log(`   → ${duplicateCount} duplicate steps-grid-item divs found`);
    } else if (imgMatches && imgMatches.length === 6) {
      console.log(`✓ ${fileName}: Correct (6 images, no duplicates)`);
    }
    
  } catch (err) {
    console.log(`✗ ${fileName}: Error - ${err.message}`);
  }
});
