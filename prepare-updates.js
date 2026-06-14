#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Map of folder names to the exact image prefixes and specific image filenames
const productConfigs = {
  // Sand-stone products
  'Sand-stone/Jaisalmer_Yellow': {
    folder: 'Jaisalmer_Yellow',
    htmlFile: '/Users/laxmandas/Downloads/cosmic-skyrocket-main/product_details/Natural-Stones/Sand-stone/Jaisalmer_Yellow/Jaisalmer_Yellow.html',
    prefix: 'Jaisalmer Yellow', // Fixed typo from "Jaisalamer"
    images: [
      { fileName: 'Jaisalmer Yellow Steps.png', alt: 'Steps' },
      { fileName: 'Jaisalmer Yellow Pier Caps.png', alt: 'Pier Caps' },
      { fileName: 'Jaisalmer Yellow Pool Coping.png', alt: 'Pool Coping' },
      { fileName: 'Jaisalmer Yellow Pool.png', alt: 'Pool' },
      { fileName: 'Jaisalmer Yellow Wall.png', alt: 'Wall' },
      { fileName: 'Jaisalmer Yellow Curbs.png', alt: 'Curbs' }
    ]
  },
  'Sand-stone/Kandla_Grey': {
    folder: 'Kandla_Grey',
    htmlFile: '/Users/laxmandas/Downloads/cosmic-skyrocket-main/product_details/Natural-Stones/Sand-stone/Kandla_Grey/Kandla_Grey.html',
    prefix: 'KANDLA GREY',
    images: [
      { fileName: 'KANDLA GREY Steps.png', alt: 'Steps' },
      { fileName: 'KANDLA GREY Pier Caps.png', alt: 'Pier Caps' },
      { fileName: 'KANDLA GREY Pool Coping.png', alt: 'Pool Coping' },
      { fileName: 'KANDLA GREY Pool.png', alt: 'Pool' },
      { fileName: 'KANDLA GREY Wall.png', alt: 'Wall' },
      { fileName: 'KANDLA GREY Curbs.png', alt: 'Curbs' }
    ]
  },
  'Sand-stone/Mint_Sandstone': {
    folder: 'Mint_Sandstone',
    htmlFile: '/Users/laxmandas/Downloads/cosmic-skyrocket-main/product_details/Natural-Stones/Sand-stone/Mint_Sandstone/Mint_Sandstone.html',
    prefix: 'Mint',
    images: [
      { fileName: 'Mint Steps.png', alt: 'Steps' },
      { fileName: 'Mint Pier Caps.png', alt: 'Pier Caps' },
      { fileName: 'Mint Wall Pool Coping.png', alt: 'Pool Coping' }, // Special case - file is named differently
      { fileName: 'Mint Pool.png', alt: 'Pool' },
      { fileName: 'Mint Wall.png', alt: 'Wall' },
      { fileName: 'Mint Curbs.png', alt: 'Curbs' }
    ]
  },
  'Sand-stone/Modak': {
    folder: 'Modak',
    htmlFile: '/Users/laxmandas/Downloads/cosmic-skyrocket-main/product_details/Natural-Stones/Sand-stone/Modak/Modak.html',
    prefix: 'Modak',
    images: [
      { fileName: 'Modak Steps.png', alt: 'Steps' },
      { fileName: 'Modak Pier Caps.png', alt: 'Pier Caps' },
      { fileName: 'Modak Pool Coping.png', alt: 'Pool Coping' },
      { fileName: 'Modak Pool.png', alt: 'Pool' },
      { fileName: 'Modak Wall.png', alt: 'Wall' },
      { fileName: 'Modak Curbs.png', alt: 'Curbs' }
    ]
  },
  'Sand-stone/Rainbow': {
    folder: 'Rainbow',
    htmlFile: '/Users/laxmandas/Downloads/cosmic-skyrocket-main/product_details/Natural-Stones/Sand-stone/Rainbow/Rainbow.html',
    prefix: 'Rainbow',
    images: [
      { fileName: 'Rainbow Steps.png', alt: 'Steps' },
      { fileName: 'Rainbow Pier Caps.png', alt: 'Pier Caps' },
      { fileName: 'Rainbow Pool Copping.png', alt: 'Pool Coping' }, // Typo in filename
      { fileName: 'Rainbow Pool.png', alt: 'Pool' },
      { fileName: 'Rainbow Wall.png', alt: 'Wall' },
      { fileName: 'Rainbow Curbs.png', alt: 'Curbs' }
    ]
  },
  'Sand-stone/Raj_Blend': {
    folder: 'Raj_Blend',
    htmlFile: '/Users/laxmandas/Downloads/cosmic-skyrocket-main/product_details/Natural-Stones/Sand-stone/Raj_Blend/Raj_Blend.html',
    prefix: 'Raj Blend',
    images: [
      { fileName: 'Raj Blend Steps.png', alt: 'Steps' },
      { fileName: 'Raj Blend Pier Caps.png', alt: 'Pier Caps' },
      { fileName: 'Raj Blend Pool Copping.png', alt: 'Pool Coping' }, // Typo in filename
      { fileName: 'Raj Blend Pool.png', alt: 'Pool' },
      { fileName: 'Raj Blend Wall.png', alt: 'Wall' },
      { fileName: 'Raj Blend Curbs.png', alt: 'Curbs' }
    ]
  },
  'Sand-stone/Raj_Green': {
    folder: 'Raj_Green',
    htmlFile: '/Users/laxmandas/Downloads/cosmic-skyrocket-main/product_details/Natural-Stones/Sand-stone/Raj_Green/Raj_Green.html',
    prefix: 'Raj Green',
    images: [
      { fileName: 'Raj Green Steps.png', alt: 'Steps' },
      { fileName: 'Raj Green Pier Caps.png', alt: 'Pier Caps' },
      { fileName: 'Raj Green Pool Copping.png', alt: 'Pool Coping' }, // Typo in filename
      { fileName: 'Raj Green Pool.png', alt: 'Pool' },
      { fileName: 'Raj Green Wall.png', alt: 'Wall' },
      { fileName: 'Raj Green Curbs.png', alt: 'Curbs' }
    ]
  },
  'Sand-stone/Raveena': {
    folder: 'Raveena',
    htmlFile: '/Users/laxmandas/Downloads/cosmic-skyrocket-main/product_details/Natural-Stones/Sand-stone/Raveena/Raveena.html',
    prefix: 'Raveena',
    images: [
      { fileName: 'Raveena Steps.png', alt: 'Steps' },
      { fileName: 'Raveena Pier Caps.png', alt: 'Pier Caps' },
      { fileName: 'Raveena Pool Copping.png', alt: 'Pool Coping' }, // Typo in filename
      { fileName: 'Raveena pool.png', alt: 'Pool' }, // lowercase
      { fileName: 'Raveena Wall.png', alt: 'Wall' },
      { fileName: 'Raveena Curbs.png', alt: 'Curbs' }
    ]
  },
  'Sand-stone/Red_Sandstone': {
    folder: 'Red_Sandstone',
    htmlFile: '/Users/laxmandas/Downloads/cosmic-skyrocket-main/product_details/Natural-Stones/Sand-stone/Red_Sandstone/Red_Sandstone.html',
    prefix: 'Red',
    images: [
      { fileName: 'Red Steps.png', alt: 'Steps' },
      { fileName: 'Red Pier Caps.png', alt: 'Pier Caps' },
      { fileName: 'Red Pool Copping.png', alt: 'Pool Coping' }, // Typo in filename
      { fileName: 'Red Pool.png', alt: 'Pool' },
      { fileName: 'Red Wall.png', alt: 'Wall' },
      { fileName: 'Red Curbs.png', alt: 'Curbs' }
    ]
  },
  'Sand-stone/Rippon_Buff': {
    folder: 'Rippon_Buff',
    htmlFile: '/Users/laxmandas/Downloads/cosmic-skyrocket-main/product_details/Natural-Stones/Sand-stone/Rippon_Buff/Rippon_Buff.html',
    prefix: 'Rippon Buff',
    images: [
      { fileName: 'Rippon Buff Steps.png', alt: 'Steps' },
      { fileName: 'Rippon Buff Pier Caps.png', alt: 'Pier Caps' },
      { fileName: 'Rippon Buff Pool Copping.png', alt: 'Pool Coping' }, // Typo in filename
      { fileName: 'Rippon Buff Pool.png', alt: 'Pool' },
      { fileName: 'Rippon Buff Wall.png', alt: 'Wall' },
      { fileName: 'Rippon Buff Curbs.png', alt: 'Curbs' }
    ]
  },
  'Sand-stone/Sagar_Black': {
    folder: 'Sagar_Black',
    htmlFile: '/Users/laxmandas/Downloads/cosmic-skyrocket-main/product_details/Natural-Stones/Sand-stone/Sagar_Black/Sagar_Black.html',
    prefix: 'Sagar Black',
    images: [
      { fileName: 'Sagar Black Steps.png', alt: 'Steps' },
      { fileName: 'Sagar Black Pier Caps.png', alt: 'Pier Caps' },
      { fileName: 'Sagar Black Pool Copping.png', alt: 'Pool Coping' }, // Typo in filename
      { fileName: 'Sagar Black Pool.png', alt: 'Pool' },
      { fileName: 'Sagar Black Wall.png', alt: 'Wall' },
      { fileName: 'Sagar Black Curbs.png', alt: 'Curbs' }
    ]
  },
  'Sand-stone/Teakwood': {
    folder: 'Teakwood',
    htmlFile: '/Users/laxmandas/Downloads/cosmic-skyrocket-main/product_details/Natural-Stones/Sand-stone/Teakwood/Teakwood.html',
    prefix: 'Teakwood',
    images: [
      { fileName: 'Teakwood Steps.png', alt: 'Steps' },
      { fileName: 'Teakwood Pier Caps.png', alt: 'Pier Caps' },
      { fileName: 'Teakwood Pool Copping.png', alt: 'Pool Coping' }, // Typo in filename
      { fileName: 'Teakwood pool.png', alt: 'Pool' }, // lowercase
      { fileName: 'Teakwood Wall.png', alt: 'Wall' },
      { fileName: 'Teakwood Curbs.png', alt: 'Curbs' }
    ]
  },
  // Lime-stone products
  'Lime-stone/Kadappa_Black': {
    folder: 'Kadappa_Black',
    htmlFile: '/Users/laxmandas/Downloads/cosmic-skyrocket-main/product_details/Natural-Stones/Lime-stone/Kadappa_Black/Kadappa_Black.html',
    prefix: 'Kadappa Black',
    images: [
      { fileName: 'Kadappa Black Steps.png', alt: 'Steps' },
      { fileName: 'Kadappa Black Pier Caps.png', alt: 'Pier Caps' },
      { fileName: 'Kadappa Black Pool Coping.png', alt: 'Pool Coping' },
      { fileName: 'Kadappa Black Pool.png', alt: 'Pool' },
      { fileName: 'Kadappa Black Wall.png', alt: 'Wall' },
      { fileName: 'Kadappa Black Curbs.png', alt: 'Curbs' }
    ]
  },
  'Lime-stone/Kota_Blue': {
    folder: 'Kota_Blue',
    htmlFile: '/Users/laxmandas/Downloads/cosmic-skyrocket-main/product_details/Natural-Stones/Lime-stone/Kota_Blue/Kota_Blue.html',
    prefix: 'Kota Blue',
    images: [
      { fileName: 'Kota Blue Steps.png', alt: 'Steps' },
      { fileName: 'Kota Blue pier caps.png', alt: 'Pier Caps' }, // lowercase in actual file
      { fileName: 'Kota Blue Pool Coping.png', alt: 'Pool Coping' },
      { fileName: 'Kota Blue pool.png', alt: 'Pool' }, // lowercase in actual file
      { fileName: 'Kota Blue wall.png', alt: 'Wall' }, // lowercase in actual file
      { fileName: 'Kota Blue Curbs.png', alt: 'Curbs' }
    ]
  },
  'Lime-stone/Kota_Brown': {
    folder: 'Kota_Brown',
    htmlFile: '/Users/laxmandas/Downloads/cosmic-skyrocket-main/product_details/Natural-Stones/Lime-stone/Kota_Brown/Kota_Brown.html',
    prefix: 'Kota Brown',
    images: [
      { fileName: 'Kota Brown Steps.png', alt: 'Steps' },
      { fileName: 'Kota Brown Pier Caps.png', alt: 'Pier Caps' },
      { fileName: 'Kota Brown Pool Coping.png', alt: 'Pool Coping' },
      { fileName: 'Kota Brown Pool.png', alt: 'Pool' },
      { fileName: 'Kota Brown Wall.png', alt: 'Wall' },
      { fileName: 'Kota Brown Curbs.png', alt: 'Curbs' }
    ]
  },
  'Lime-stone/Yellow_Tandoor': {
    folder: 'Yellow_Tandoor',
    htmlFile: '/Users/laxmandas/Downloads/cosmic-skyrocket-main/product_details/Natural-Stones/Lime-stone/Yellow_Tandoor/Yellow_Tandoor.html',
    prefix: 'Tandoor Yellow', // Note: prefix is "Tandoor Yellow" not "Yellow Tandoor"
    images: [
      { fileName: 'Tandoor Yellow Steps.png', alt: 'Steps' },
      { fileName: 'Tandoor Yellow Pier Caps.png', alt: 'Pier Caps' },
      { fileName: 'Tandoor Yellow Pool Copping.png', alt: 'Pool Coping' }, // Typo in filename
      { fileName: 'Tandoor Yellow Pool.png', alt: 'Pool' },
      { fileName: 'Tandoor Yellow Wall.png', alt: 'Wall' },
      { fileName: 'Tandoor Yellow Curbs.png', alt: 'Curbs' }
    ]
  }
};

// Generate HTML for steps-grid items
function generateStepsGridHTML(config) {
  const urlEncodeFilename = (str) => encodeURIComponent(str);
  
  let html = '              <div class="steps-grid">\n';
  
  config.images.forEach(img => {
    const encoded = urlEncodeFilename(img.fileName);
    html += `                  <div class="steps-grid-item">\n`;
    html += `                    <img src="../../../../assets/img/NS/STEPS/${encoded}" alt="${img.alt}" loading="lazy">\n`;
    html += `                  </div>\n`;
  });
  
  html += '              </div>';
  
  return html;
}

// Verify all files exist before updating
console.log('Verifying image files...\n');
const stepsDir = '/Users/laxmandas/Downloads/cosmic-skyrocket-main/assets/img/NS/STEPS';
const stepsFiles = fs.readdirSync(stepsDir);

let allFilesExist = true;

Object.entries(productConfigs).forEach(([key, config]) => {
  console.log(`\nChecking ${config.folder}:`);
  let allExist = true;
  
  config.images.forEach(img => {
    if (stepsFiles.includes(img.fileName)) {
      console.log(`  ✓ ${img.fileName}`);
    } else {
      console.log(`  ✗ MISSING: ${img.fileName}`);
      allExist = false;
      allFilesExist = false;
    }
  });
  
  if (allExist) {
    console.log(`  → Ready to update!`);
  }
});

if (!allFilesExist) {
  console.log('\n⚠️  Some files are missing. Please check the filenames.');
  process.exit(1);
}

console.log('\n✓ All files verified! Ready to update HTML files.\n');
console.log('Products to update:');
Object.keys(productConfigs).forEach(key => {
  if (key !== 'Sand-stone/Autumn_Brown') { // Skip Autumn_Brown as it's already done
    console.log(`  - ${key}`);
  }
});
