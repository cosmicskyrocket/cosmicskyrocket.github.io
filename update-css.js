#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// List of all product HTML files to update
const htmlFiles = [
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

// Old CSS pattern for 5 items
const oldCSSPattern = /\/\* Row 1: 3 items each span 2 of 6 columns = 1\/3 width \*\/[\s\S]*?\.steps-grid-item:nth-child\(4\),[\s\S]*?\.steps-grid-item:nth-child\(5\) \{ padding-left: 10px; \}/;

// New CSS pattern for 6 items
const newCSS = `/* Row 1: 3 items each span 2 of 6 columns = 1/3 width */
      .steps-grid-item:nth-child(1),
      .steps-grid-item:nth-child(2),
      .steps-grid-item:nth-child(3) { grid-column: span 2; padding-left: 30px; }
      /* Row 2: 3 items each span 2 of 6 columns = 1/3 width */
      .steps-grid-item:nth-child(4),
      .steps-grid-item:nth-child(5),
      .steps-grid-item:nth-child(6) { grid-column: span 2; }
      .steps-grid-item img {
        width: 100%;
        height: 260px;
        object-fit: cover;
        display: block;
      }
      .steps-grid-item:nth-child(4) img,
      .steps-grid-item:nth-child(5) img,
      .steps-grid-item:nth-child(6) img { height: 260px; width: 100%; margin: 0; }
      .steps-grid-item:nth-child(4),
      .steps-grid-item:nth-child(5),
      .steps-grid-item:nth-child(6) { padding-left: 0; }`;

// Old media query pattern for 5 items
const oldMediaPattern = /\.steps-grid-item:nth-child\(1\),[\s\S]*?\.steps-grid-item:nth-child\(5\) \{ grid-column: span 1; padding-left: 0; \}/;

// New media query pattern for 6 items
const newMediaCSS = `.steps-grid-item:nth-child(1),
        .steps-grid-item:nth-child(2),
        .steps-grid-item:nth-child(3),
        .steps-grid-item:nth-child(4),
        .steps-grid-item:nth-child(5),
        .steps-grid-item:nth-child(6) { grid-column: span 1; padding-left: 0; }`;

let successCount = 0;
let failureCount = 0;

console.log('Updating CSS in product pages...\n');

htmlFiles.forEach(filePath => {
  const fileName = path.basename(filePath);
  console.log(`Updating ${fileName}...`);
  
  if (!fs.existsSync(filePath)) {
    console.log(`  ✗ File not found`);
    failureCount++;
    return;
  }
  
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace the main CSS rules
    if (oldCSSPattern.test(content)) {
      content = content.replace(oldCSSPattern, newCSS);
      console.log(`  ✓ Updated main CSS rules`);
    } else {
      console.log(`  ⚠ Could not find old CSS pattern`);
    }
    
    // Replace the media query rules
    if (oldMediaPattern.test(content)) {
      content = content.replace(oldMediaPattern, newMediaCSS);
      console.log(`  ✓ Updated media query CSS rules`);
    } else {
      console.log(`  ⚠ Could not find old media query pattern`);
    }
    
    fs.writeFileSync(filePath, content, 'utf8');
    successCount++;
  } catch (err) {
    console.log(`  ✗ Error: ${err.message}`);
    failureCount++;
  }
});

console.log(`\n=== Summary ===`);
console.log(`✓ Successfully updated: ${successCount} files`);
if (failureCount > 0) {
  console.log(`✗ Failed: ${failureCount} files`);
}
