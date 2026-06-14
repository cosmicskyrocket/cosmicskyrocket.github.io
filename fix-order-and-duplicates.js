#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Product configurations with CORRECT image order matching Autumn_Brown
// Correct order: Steps, Curbs, Pier Caps, Wall, Pool, Pool Coping
const productConfigs = [
  {
    folder: 'Jaisalmer_Yellow',
    htmlFile: '/Users/laxmandas/Downloads/cosmic-skyrocket-main/product_details/Natural-Stones/Sand-stone/Jaisalmer_Yellow/Jaisalmer_Yellow.html',
    images: [
      { fileName: 'Jaisalmer Yellow Steps.png', alt: 'Steps' },
      { fileName: 'Jaisalmer Yellow Curbs.png', alt: 'Curbs' },
      { fileName: 'Jaisalmer Yellow Pier Caps.png', alt: 'Pier Caps' },
      { fileName: 'Jaisalmer Yellow Wall.png', alt: 'Wall' },
      { fileName: 'Jaisalmer Yellow Pool.png', alt: 'Pool' },
      { fileName: 'Jaisalmer Yellow Pool Coping.png', alt: 'Pool Coping' }
    ]
  },
  {
    folder: 'Kandla_Grey',
    htmlFile: '/Users/laxmandas/Downloads/cosmic-skyrocket-main/product_details/Natural-Stones/Sand-stone/Kandla_Grey/Kandla_Grey.html',
    images: [
      { fileName: 'KANDLA GREY Steps.png', alt: 'Steps' },
      { fileName: 'KANDLA GREY Curbs.png', alt: 'Curbs' },
      { fileName: 'KANDLA GREY Pier Caps.png', alt: 'Pier Caps' },
      { fileName: 'KANDLA GREY Wall.png', alt: 'Wall' },
      { fileName: 'KANDLA GREY Pool.png', alt: 'Pool' },
      { fileName: 'KANDLA GREY Pool Coping.png', alt: 'Pool Coping' }
    ]
  },
  {
    folder: 'Mint_Sandstone',
    htmlFile: '/Users/laxmandas/Downloads/cosmic-skyrocket-main/product_details/Natural-Stones/Sand-stone/Mint_Sandstone/Mint_Sandstone.html',
    images: [
      { fileName: 'Mint Steps.png', alt: 'Steps' },
      { fileName: 'Mint Curbs.png', alt: 'Curbs' },
      { fileName: 'Mint Pier Caps.png', alt: 'Pier Caps' },
      { fileName: 'Mint Wall.png', alt: 'Wall' },
      { fileName: 'Mint Pool.png', alt: 'Pool' },
      { fileName: 'Mint Wall Pool Coping.png', alt: 'Pool Coping' }
    ]
  },
  {
    folder: 'Modak',
    htmlFile: '/Users/laxmandas/Downloads/cosmic-skyrocket-main/product_details/Natural-Stones/Sand-stone/Modak/Modak.html',
    images: [
      { fileName: 'Modak Steps.png', alt: 'Steps' },
      { fileName: 'Modak Curbs.png', alt: 'Curbs' },
      { fileName: 'Modak Pier Caps.png', alt: 'Pier Caps' },
      { fileName: 'Modak Wall.png', alt: 'Wall' },
      { fileName: 'Modak Pool.png', alt: 'Pool' },
      { fileName: 'Modak Pool Coping.png', alt: 'Pool Coping' }
    ]
  },
  {
    folder: 'Rainbow',
    htmlFile: '/Users/laxmandas/Downloads/cosmic-skyrocket-main/product_details/Natural-Stones/Sand-stone/Rainbow/Rainbow.html',
    images: [
      { fileName: 'Rainbow Steps.png', alt: 'Steps' },
      { fileName: 'Rainbow Curbs.png', alt: 'Curbs' },
      { fileName: 'Rainbow Pier Caps.png', alt: 'Pier Caps' },
      { fileName: 'Rainbow Wall.png', alt: 'Wall' },
      { fileName: 'Rainbow Pool.png', alt: 'Pool' },
      { fileName: 'Rainbow Pool Copping.png', alt: 'Pool Coping' }
    ]
  },
  {
    folder: 'Raj_Blend',
    htmlFile: '/Users/laxmandas/Downloads/cosmic-skyrocket-main/product_details/Natural-Stones/Sand-stone/Raj_Blend/Raj_Blend.html',
    images: [
      { fileName: 'Raj Blend Steps.png', alt: 'Steps' },
      { fileName: 'Raj Blend Curbs.png', alt: 'Curbs' },
      { fileName: 'Raj Blend Pier Caps.png', alt: 'Pier Caps' },
      { fileName: 'Raj Blend Wall.png', alt: 'Wall' },
      { fileName: 'Raj Blend Pool.png', alt: 'Pool' },
      { fileName: 'Raj Blend Pool Copping.png', alt: 'Pool Coping' }
    ]
  },
  {
    folder: 'Raj_Green',
    htmlFile: '/Users/laxmandas/Downloads/cosmic-skyrocket-main/product_details/Natural-Stones/Sand-stone/Raj_Green/Raj_Green.html',
    images: [
      { fileName: 'Raj Green Steps.png', alt: 'Steps' },
      { fileName: 'Raj Green Curbs.png', alt: 'Curbs' },
      { fileName: 'Raj Green Pier Caps.png', alt: 'Pier Caps' },
      { fileName: 'Raj Green Wall.png', alt: 'Wall' },
      { fileName: 'Raj Green Pool.png', alt: 'Pool' },
      { fileName: 'Raj Green Pool Copping.png', alt: 'Pool Coping' }
    ]
  },
  {
    folder: 'Raveena',
    htmlFile: '/Users/laxmandas/Downloads/cosmic-skyrocket-main/product_details/Natural-Stones/Sand-stone/Raveena/Raveena.html',
    images: [
      { fileName: 'Raveena Steps.png', alt: 'Steps' },
      { fileName: 'Raveena Curbs.png', alt: 'Curbs' },
      { fileName: 'Raveena Pier Caps.png', alt: 'Pier Caps' },
      { fileName: 'Raveena Wall.png', alt: 'Wall' },
      { fileName: 'Raveena pool.png', alt: 'Pool' },
      { fileName: 'Raveena Pool Copping.png', alt: 'Pool Coping' }
    ]
  },
  {
    folder: 'Red_Sandstone',
    htmlFile: '/Users/laxmandas/Downloads/cosmic-skyrocket-main/product_details/Natural-Stones/Sand-stone/Red_Sandstone/Red_Sandstone.html',
    images: [
      { fileName: 'Red Steps.png', alt: 'Steps' },
      { fileName: 'Red Curbs.png', alt: 'Curbs' },
      { fileName: 'Red Pier Caps.png', alt: 'Pier Caps' },
      { fileName: 'Red Wall.png', alt: 'Wall' },
      { fileName: 'Red Pool.png', alt: 'Pool' },
      { fileName: 'Red Pool Copping.png', alt: 'Pool Coping' }
    ]
  },
  {
    folder: 'Rippon_Buff',
    htmlFile: '/Users/laxmandas/Downloads/cosmic-skyrocket-main/product_details/Natural-Stones/Sand-stone/Rippon_Buff/Rippon_Buff.html',
    images: [
      { fileName: 'Rippon Buff Steps.png', alt: 'Steps' },
      { fileName: 'Rippon Buff Curbs.png', alt: 'Curbs' },
      { fileName: 'Rippon Buff Pier Caps.png', alt: 'Pier Caps' },
      { fileName: 'Rippon Buff Wall.png', alt: 'Wall' },
      { fileName: 'Rippon Buff Pool.png', alt: 'Pool' },
      { fileName: 'Rippon Buff Pool Copping.png', alt: 'Pool Coping' }
    ]
  },
  {
    folder: 'Sagar_Black',
    htmlFile: '/Users/laxmandas/Downloads/cosmic-skyrocket-main/product_details/Natural-Stones/Sand-stone/Sagar_Black/Sagar_Black.html',
    images: [
      { fileName: 'Sagar Black Steps.png', alt: 'Steps' },
      { fileName: 'Sagar Black Curbs.png', alt: 'Curbs' },
      { fileName: 'Sagar Black Pier Caps.png', alt: 'Pier Caps' },
      { fileName: 'Sagar Black Wall.png', alt: 'Wall' },
      { fileName: 'Sagar Black Pool.png', alt: 'Pool' },
      { fileName: 'Sagar Black Pool Copping.png', alt: 'Pool Coping' }
    ]
  },
  {
    folder: 'Teakwood',
    htmlFile: '/Users/laxmandas/Downloads/cosmic-skyrocket-main/product_details/Natural-Stones/Sand-stone/Teakwood/Teakwood.html',
    images: [
      { fileName: 'Teakwood Steps.png', alt: 'Steps' },
      { fileName: 'Teakwood Curbs.png', alt: 'Curbs' },
      { fileName: 'Teakwood Pier Caps.png', alt: 'Pier Caps' },
      { fileName: 'Teakwood Wall.png', alt: 'Wall' },
      { fileName: 'Teakwood pool.png', alt: 'Pool' },
      { fileName: 'Teakwood Pool Copping.png', alt: 'Pool Coping' }
    ]
  },
  {
    folder: 'Kadappa_Black',
    htmlFile: '/Users/laxmandas/Downloads/cosmic-skyrocket-main/product_details/Natural-Stones/Lime-stone/Kadappa_Black/Kadappa_Black.html',
    images: [
      { fileName: 'Kadappa Black Steps.png', alt: 'Steps' },
      { fileName: 'Kadappa Black Curbs.png', alt: 'Curbs' },
      { fileName: 'Kadappa Black Pier Caps.png', alt: 'Pier Caps' },
      { fileName: 'Kadappa Black Wall.png', alt: 'Wall' },
      { fileName: 'Kadappa Black Pool.png', alt: 'Pool' },
      { fileName: 'Kadappa Black Pool Coping.png', alt: 'Pool Coping' }
    ]
  },
  {
    folder: 'Kota_Blue',
    htmlFile: '/Users/laxmandas/Downloads/cosmic-skyrocket-main/product_details/Natural-Stones/Lime-stone/Kota_Blue/Kota_Blue.html',
    images: [
      { fileName: 'Kota Blue Steps.png', alt: 'Steps' },
      { fileName: 'Kota Blue Curbs.png', alt: 'Curbs' },
      { fileName: 'Kota Blue pier caps.png', alt: 'Pier Caps' },
      { fileName: 'Kota Blue wall.png', alt: 'Wall' },
      { fileName: 'Kota Blue pool.png', alt: 'Pool' },
      { fileName: 'Kota Blue Pool Coping.png', alt: 'Pool Coping' }
    ]
  },
  {
    folder: 'Kota_Brown',
    htmlFile: '/Users/laxmandas/Downloads/cosmic-skyrocket-main/product_details/Natural-Stones/Lime-stone/Kota_Brown/Kota_Brown.html',
    images: [
      { fileName: 'Kota Brown Steps.png', alt: 'Steps' },
      { fileName: 'Kota Brown Curbs.png', alt: 'Curbs' },
      { fileName: 'Kota Brown Pier Caps.png', alt: 'Pier Caps' },
      { fileName: 'Kota Brown Wall.png', alt: 'Wall' },
      { fileName: 'Kota Brown Pool.png', alt: 'Pool' },
      { fileName: 'Kota Brown Pool Coping.png', alt: 'Pool Coping' }
    ]
  },
  {
    folder: 'Yellow_Tandoor',
    htmlFile: '/Users/laxmandas/Downloads/cosmic-skyrocket-main/product_details/Natural-Stones/Lime-stone/Yellow_Tandoor/Yellow_Tandoor.html',
    images: [
      { fileName: 'Tandoor Yellow Steps.png', alt: 'Steps' },
      { fileName: 'Tandoor Yellow Curbs.png', alt: 'Curbs' },
      { fileName: 'Tandoor Yellow Pier Caps.png', alt: 'Pier Caps' },
      { fileName: 'Tandoor Yellow Wall.png', alt: 'Wall' },
      { fileName: 'Tandoor Yellow Pool.png', alt: 'Pool' },
      { fileName: 'Tandoor Yellow Pool Copping.png', alt: 'Pool Coping' }
    ]
  }
];

// Generate steps-grid HTML with CORRECT order
function generateStepsGridHTML(config) {
  const urlEncodeFilename = (str) => encodeURIComponent(str);
  
  let html = '<div class="steps-grid">\n';
  
  config.images.forEach(img => {
    const encoded = urlEncodeFilename(img.fileName);
    html += `                  <div class="steps-grid-item">\n`;
    html += `                    <img src="../../../../assets/img/NS/STEPS/${encoded}" alt="${img.alt}" loading="lazy">\n`;
    html += `                  </div>\n`;
  });
  
  html += '              </div>';
  
  return html;
}

console.log('Fixing image order and removing duplicates...\n');

let successCount = 0;
let failureCount = 0;

productConfigs.forEach(config => {
  console.log(`Fixing ${config.folder}...`);
  
  if (!fs.existsSync(config.htmlFile)) {
    console.log(`  ✗ File not found`);
    failureCount++;
    return;
  }
  
  try {
    let content = fs.readFileSync(config.htmlFile, 'utf8');
    
    // Find and replace the old steps-grid section (including duplicates)
    // This regex finds: <div class="steps-grid"> ... </div></div> (with duplicate items)
    const oldStepsGridPattern = /<div class="steps-grid">([\s\S]*?)<\/div>\s*<\/div>\s*<\/section>/;
    
    if (!oldStepsGridPattern.test(content)) {
      console.log(`  ⚠ Could not find expected pattern`);
      failureCount++;
      return;
    }
    
    const newStepsGrid = generateStepsGridHTML(config);
    
    // Replace the entire old pattern with the new one
    content = content.replace(oldStepsGridPattern, newStepsGrid + '\n            </section>');
    
    fs.writeFileSync(config.htmlFile, content, 'utf8');
    console.log(`  ✓ Fixed successfully`);
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
