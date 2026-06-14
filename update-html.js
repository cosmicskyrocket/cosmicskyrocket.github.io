#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Product configurations with exact image filenames and HTML file paths
const productConfigs = [
  {
    folder: 'Jaisalmer_Yellow',
    htmlFile: '/Users/laxmandas/Downloads/cosmic-skyrocket-main/product_details/Natural-Stones/Sand-stone/Jaisalmer_Yellow/Jaisalmer_Yellow.html',
    images: [
      { fileName: 'Jaisalmer Yellow Steps.png', alt: 'Steps' },
      { fileName: 'Jaisalmer Yellow Pier Caps.png', alt: 'Pier Caps' },
      { fileName: 'Jaisalmer Yellow Pool Coping.png', alt: 'Pool Coping' },
      { fileName: 'Jaisalmer Yellow Pool.png', alt: 'Pool' },
      { fileName: 'Jaisalmer Yellow Wall.png', alt: 'Wall' },
      { fileName: 'Jaisalmer Yellow Curbs.png', alt: 'Curbs' }
    ]
  },
  {
    folder: 'Kandla_Grey',
    htmlFile: '/Users/laxmandas/Downloads/cosmic-skyrocket-main/product_details/Natural-Stones/Sand-stone/Kandla_Grey/Kandla_Grey.html',
    images: [
      { fileName: 'KANDLA GREY Steps.png', alt: 'Steps' },
      { fileName: 'KANDLA GREY Pier Caps.png', alt: 'Pier Caps' },
      { fileName: 'KANDLA GREY Pool Coping.png', alt: 'Pool Coping' },
      { fileName: 'KANDLA GREY Pool.png', alt: 'Pool' },
      { fileName: 'KANDLA GREY Wall.png', alt: 'Wall' },
      { fileName: 'KANDLA GREY Curbs.png', alt: 'Curbs' }
    ]
  },
  {
    folder: 'Mint_Sandstone',
    htmlFile: '/Users/laxmandas/Downloads/cosmic-skyrocket-main/product_details/Natural-Stones/Sand-stone/Mint_Sandstone/Mint_Sandstone.html',
    images: [
      { fileName: 'Mint Steps.png', alt: 'Steps' },
      { fileName: 'Mint Pier Caps.png', alt: 'Pier Caps' },
      { fileName: 'Mint Wall Pool Coping.png', alt: 'Pool Coping' },
      { fileName: 'Mint Pool.png', alt: 'Pool' },
      { fileName: 'Mint Wall.png', alt: 'Wall' },
      { fileName: 'Mint Curbs.png', alt: 'Curbs' }
    ]
  },
  {
    folder: 'Modak',
    htmlFile: '/Users/laxmandas/Downloads/cosmic-skyrocket-main/product_details/Natural-Stones/Sand-stone/Modak/Modak.html',
    images: [
      { fileName: 'Modak Steps.png', alt: 'Steps' },
      { fileName: 'Modak Pier Caps.png', alt: 'Pier Caps' },
      { fileName: 'Modak Pool Coping.png', alt: 'Pool Coping' },
      { fileName: 'Modak Pool.png', alt: 'Pool' },
      { fileName: 'Modak Wall.png', alt: 'Wall' },
      { fileName: 'Modak Curbs.png', alt: 'Curbs' }
    ]
  },
  {
    folder: 'Rainbow',
    htmlFile: '/Users/laxmandas/Downloads/cosmic-skyrocket-main/product_details/Natural-Stones/Sand-stone/Rainbow/Rainbow.html',
    images: [
      { fileName: 'Rainbow Steps.png', alt: 'Steps' },
      { fileName: 'Rainbow Pier Caps.png', alt: 'Pier Caps' },
      { fileName: 'Rainbow Pool Copping.png', alt: 'Pool Coping' },
      { fileName: 'Rainbow Pool.png', alt: 'Pool' },
      { fileName: 'Rainbow Wall.png', alt: 'Wall' },
      { fileName: 'Rainbow Curbs.png', alt: 'Curbs' }
    ]
  },
  {
    folder: 'Raj_Blend',
    htmlFile: '/Users/laxmandas/Downloads/cosmic-skyrocket-main/product_details/Natural-Stones/Sand-stone/Raj_Blend/Raj_Blend.html',
    images: [
      { fileName: 'Raj Blend Steps.png', alt: 'Steps' },
      { fileName: 'Raj Blend Pier Caps.png', alt: 'Pier Caps' },
      { fileName: 'Raj Blend Pool Copping.png', alt: 'Pool Coping' },
      { fileName: 'Raj Blend Pool.png', alt: 'Pool' },
      { fileName: 'Raj Blend Wall.png', alt: 'Wall' },
      { fileName: 'Raj Blend Curbs.png', alt: 'Curbs' }
    ]
  },
  {
    folder: 'Raj_Green',
    htmlFile: '/Users/laxmandas/Downloads/cosmic-skyrocket-main/product_details/Natural-Stones/Sand-stone/Raj_Green/Raj_Green.html',
    images: [
      { fileName: 'Raj Green Steps.png', alt: 'Steps' },
      { fileName: 'Raj Green Pier Caps.png', alt: 'Pier Caps' },
      { fileName: 'Raj Green Pool Copping.png', alt: 'Pool Coping' },
      { fileName: 'Raj Green Pool.png', alt: 'Pool' },
      { fileName: 'Raj Green Wall.png', alt: 'Wall' },
      { fileName: 'Raj Green Curbs.png', alt: 'Curbs' }
    ]
  },
  {
    folder: 'Raveena',
    htmlFile: '/Users/laxmandas/Downloads/cosmic-skyrocket-main/product_details/Natural-Stones/Sand-stone/Raveena/Raveena.html',
    images: [
      { fileName: 'Raveena Steps.png', alt: 'Steps' },
      { fileName: 'Raveena Pier Caps.png', alt: 'Pier Caps' },
      { fileName: 'Raveena Pool Copping.png', alt: 'Pool Coping' },
      { fileName: 'Raveena pool.png', alt: 'Pool' },
      { fileName: 'Raveena Wall.png', alt: 'Wall' },
      { fileName: 'Raveena Curbs.png', alt: 'Curbs' }
    ]
  },
  {
    folder: 'Red_Sandstone',
    htmlFile: '/Users/laxmandas/Downloads/cosmic-skyrocket-main/product_details/Natural-Stones/Sand-stone/Red_Sandstone/Red_Sandstone.html',
    images: [
      { fileName: 'Red Steps.png', alt: 'Steps' },
      { fileName: 'Red Pier Caps.png', alt: 'Pier Caps' },
      { fileName: 'Red Pool Copping.png', alt: 'Pool Coping' },
      { fileName: 'Red Pool.png', alt: 'Pool' },
      { fileName: 'Red Wall.png', alt: 'Wall' },
      { fileName: 'Red Curbs.png', alt: 'Curbs' }
    ]
  },
  {
    folder: 'Rippon_Buff',
    htmlFile: '/Users/laxmandas/Downloads/cosmic-skyrocket-main/product_details/Natural-Stones/Sand-stone/Rippon_Buff/Rippon_Buff.html',
    images: [
      { fileName: 'Rippon Buff Steps.png', alt: 'Steps' },
      { fileName: 'Rippon Buff Pier Caps.png', alt: 'Pier Caps' },
      { fileName: 'Rippon Buff Pool Copping.png', alt: 'Pool Coping' },
      { fileName: 'Rippon Buff Pool.png', alt: 'Pool' },
      { fileName: 'Rippon Buff Wall.png', alt: 'Wall' },
      { fileName: 'Rippon Buff Curbs.png', alt: 'Curbs' }
    ]
  },
  {
    folder: 'Sagar_Black',
    htmlFile: '/Users/laxmandas/Downloads/cosmic-skyrocket-main/product_details/Natural-Stones/Sand-stone/Sagar_Black/Sagar_Black.html',
    images: [
      { fileName: 'Sagar Black Steps.png', alt: 'Steps' },
      { fileName: 'Sagar Black Pier Caps.png', alt: 'Pier Caps' },
      { fileName: 'Sagar Black Pool Copping.png', alt: 'Pool Coping' },
      { fileName: 'Sagar Black Pool.png', alt: 'Pool' },
      { fileName: 'Sagar Black Wall.png', alt: 'Wall' },
      { fileName: 'Sagar Black Curbs.png', alt: 'Curbs' }
    ]
  },
  {
    folder: 'Teakwood',
    htmlFile: '/Users/laxmandas/Downloads/cosmic-skyrocket-main/product_details/Natural-Stones/Sand-stone/Teakwood/Teakwood.html',
    images: [
      { fileName: 'Teakwood Steps.png', alt: 'Steps' },
      { fileName: 'Teakwood Pier Caps.png', alt: 'Pier Caps' },
      { fileName: 'Teakwood Pool Copping.png', alt: 'Pool Coping' },
      { fileName: 'Teakwood pool.png', alt: 'Pool' },
      { fileName: 'Teakwood Wall.png', alt: 'Wall' },
      { fileName: 'Teakwood Curbs.png', alt: 'Curbs' }
    ]
  },
  {
    folder: 'Kadappa_Black',
    htmlFile: '/Users/laxmandas/Downloads/cosmic-skyrocket-main/product_details/Natural-Stones/Lime-stone/Kadappa_Black/Kadappa_Black.html',
    images: [
      { fileName: 'Kadappa Black Steps.png', alt: 'Steps' },
      { fileName: 'Kadappa Black Pier Caps.png', alt: 'Pier Caps' },
      { fileName: 'Kadappa Black Pool Coping.png', alt: 'Pool Coping' },
      { fileName: 'Kadappa Black Pool.png', alt: 'Pool' },
      { fileName: 'Kadappa Black Wall.png', alt: 'Wall' },
      { fileName: 'Kadappa Black Curbs.png', alt: 'Curbs' }
    ]
  },
  {
    folder: 'Kota_Blue',
    htmlFile: '/Users/laxmandas/Downloads/cosmic-skyrocket-main/product_details/Natural-Stones/Lime-stone/Kota_Blue/Kota_Blue.html',
    images: [
      { fileName: 'Kota Blue Steps.png', alt: 'Steps' },
      { fileName: 'Kota Blue pier caps.png', alt: 'Pier Caps' },
      { fileName: 'Kota Blue Pool Coping.png', alt: 'Pool Coping' },
      { fileName: 'Kota Blue pool.png', alt: 'Pool' },
      { fileName: 'Kota Blue wall.png', alt: 'Wall' },
      { fileName: 'Kota Blue Curbs.png', alt: 'Curbs' }
    ]
  },
  {
    folder: 'Kota_Brown',
    htmlFile: '/Users/laxmandas/Downloads/cosmic-skyrocket-main/product_details/Natural-Stones/Lime-stone/Kota_Brown/Kota_Brown.html',
    images: [
      { fileName: 'Kota Brown Steps.png', alt: 'Steps' },
      { fileName: 'Kota Brown Pier Caps.png', alt: 'Pier Caps' },
      { fileName: 'Kota Brown Pool Coping.png', alt: 'Pool Coping' },
      { fileName: 'Kota Brown Pool.png', alt: 'Pool' },
      { fileName: 'Kota Brown Wall.png', alt: 'Wall' },
      { fileName: 'Kota Brown Curbs.png', alt: 'Curbs' }
    ]
  },
  {
    folder: 'Yellow_Tandoor',
    htmlFile: '/Users/laxmandas/Downloads/cosmic-skyrocket-main/product_details/Natural-Stones/Lime-stone/Yellow_Tandoor/Yellow_Tandoor.html',
    images: [
      { fileName: 'Tandoor Yellow Steps.png', alt: 'Steps' },
      { fileName: 'Tandoor Yellow Pier Caps.png', alt: 'Pier Caps' },
      { fileName: 'Tandoor Yellow Pool Copping.png', alt: 'Pool Coping' },
      { fileName: 'Tandoor Yellow Pool.png', alt: 'Pool' },
      { fileName: 'Tandoor Yellow Wall.png', alt: 'Wall' },
      { fileName: 'Tandoor Yellow Curbs.png', alt: 'Curbs' }
    ]
  }
];

// Generate steps-grid HTML
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

// Function to find and replace steps-grid content
function updateHTMLFile(filePath, newStepsGridHTML) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Find the steps-grid div and its content
  const stepsGridRegex = /<div class="steps-grid">[\s\S]*?<\/div>/;
  
  if (!stepsGridRegex.test(content)) {
    console.log(`  ✗ Could not find steps-grid in ${filePath}`);
    return false;
  }
  
  content = content.replace(stepsGridRegex, newStepsGridHTML);
  fs.writeFileSync(filePath, content, 'utf8');
  return true;
}

console.log('Starting HTML updates...\n');

let successCount = 0;
let failureCount = 0;

productConfigs.forEach(config => {
  console.log(`Updating ${config.folder}...`);
  
  if (!fs.existsSync(config.htmlFile)) {
    console.log(`  ✗ HTML file not found: ${config.htmlFile}`);
    failureCount++;
    return;
  }
  
  const newHTML = generateStepsGridHTML(config);
  
  if (updateHTMLFile(config.htmlFile, newHTML)) {
    console.log(`  ✓ Updated successfully`);
    successCount++;
  } else {
    console.log(`  ✗ Failed to update`);
    failureCount++;
  }
});

console.log(`\n=== Summary ===`);
console.log(`✓ Successfully updated: ${successCount} files`);
if (failureCount > 0) {
  console.log(`✗ Failed: ${failureCount} files`);
}
console.log(`Total: ${successCount + failureCount} files`);
