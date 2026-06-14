#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// List of all product HTML files
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

// The correct CSS block (from Autumn_Brown which is already correct)
const correctCSS = `      .steps-grid {
        display: grid;
        grid-template-columns: repeat(6, 1fr);
        gap: 0;
      }
      .steps-grid-item {
        overflow: hidden;
      }
      /* Row 1: 3 items each span 2 of 6 columns = 1/3 width */
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
      .steps-grid-item:nth-child(6) { padding-left: 0; }
      @media (max-width: 767px) {
        .steps-grid {
          grid-template-columns: 1fr;
        }
        .steps-grid-item:nth-child(1),
        .steps-grid-item:nth-child(2),
        .steps-grid-item:nth-child(3),
        .steps-grid-item:nth-child(4),
        .steps-grid-item:nth-child(5),
        .steps-grid-item:nth-child(6) { grid-column: span 1; padding-left: 0; }
        .steps-grid-item img { height: auto !important; width: 100% !important; max-height: 220px; object-fit: contain; }
      }`;

let successCount = 0;
let failureCount = 0;

console.log('Fixing CSS in product pages...\n');

htmlFiles.forEach(filePath => {
  const fileName = path.basename(filePath);
  console.log(`Fixing ${fileName}...`);
  
  if (!fs.existsSync(filePath)) {
    console.log(`  ✗ File not found`);
    failureCount++;
    return;
  }
  
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Find the start of .steps-grid CSS
    const stepsGridStart = content.indexOf('.steps-grid {');
    if (stepsGridStart === -1) {
      console.log(`  ✗ Could not find .steps-grid CSS start`);
      failureCount++;
      return;
    }
    
    // Find the end of the media query closing brace
    const mediaQueryStart = content.indexOf('@media (max-width: 767px)', stepsGridStart);
    if (mediaQueryStart === -1) {
      console.log(`  ✗ Could not find media query`);
      failureCount++;
      return;
    }
    
    // Find the closing brace of the media query
    let braceCount = 0;
    let pos = mediaQueryStart;
    let foundStart = false;
    
    while (pos < content.length) {
      if (content[pos] === '{') {
        braceCount++;
        foundStart = true;
      } else if (content[pos] === '}') {
        braceCount--;
        if (foundStart && braceCount === 0) {
          break;
        }
      }
      pos++;
    }
    
    if (pos >= content.length) {
      console.log(`  ✗ Could not find media query closing brace`);
      failureCount++;
      return;
    }
    
    // Extract the old CSS block
    const oldCSSBlock = content.substring(stepsGridStart, pos + 1);
    
    // Replace the old CSS with the correct one
    content = content.replace(oldCSSBlock, correctCSS);
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`  ✓ CSS fixed successfully`);
    successCount++;
  } catch (err) {
    console.log(`  ✗ Error: ${err.message}`);
    failureCount++;
  }
});

console.log(`\n=== Summary ===`);
console.log(`✓ Successfully fixed: ${successCount} files`);
if (failureCount > 0) {
  console.log(`✗ Failed: ${failureCount} files`);
}
