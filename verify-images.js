#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const stepsDir = '/Users/laxmandas/Downloads/cosmic-skyrocket-main/assets/img/NS/STEPS';
const productDetailsDir = '/Users/laxmandas/Downloads/cosmic-skyrocket-main/product_details/Natural-Stones';

// Map of folder names to image prefixes
const productMappings = {
  // Sand-stone
  'Autumn_Brown': 'Autumn Brown',
  'Jaisalmer_Yellow': 'Jaisalmer Yellow',
  'Kandla_Grey': 'KANDLA GREY',
  'Mint_Sandstone': 'Mint',
  'Modak': 'Modak',
  'Rainbow': 'Rainbow',
  'Raj_Blend': 'Raj Blend',
  'Raj_Green': 'Raj Green',
  'Raveena': 'Raveena',
  'Red_Sandstone': 'Red',
  'Rippon_Buff': 'Rippon Buff',
  'Sagar_Black': 'Sagar Black',
  'Teakwood': 'Teakwood',
  // Lime-stone
  'Kadappa_Black': 'Kadappa Black',
  'Kota_Blue': 'Kota Blue',
  'Kota_Brown': 'Kota Brown',
  'Yellow_Tandoor': 'Tandoor Yellow'
};

const imageNames = [
  { name: 'Steps', altName: null },
  { name: 'Pier Caps', altName: 'pier caps' },
  { name: 'Pool Coping', altName: 'Pool Copping' }, // Note: Some have typo "Copping"
  { name: 'Pool', altName: 'pool' },
  { name: 'Wall', altName: null },
  { name: 'Curbs', altName: null }
];

// Get all files in steps directory
const stepsFiles = fs.readdirSync(stepsDir).map(f => f.toLowerCase());

console.log('Verifying images for each product:\n');

Object.entries(productMappings).forEach(([folderName, prefix]) => {
  console.log(`\n=== ${folderName} (prefix: "${prefix}") ===`);
  const missingImages = [];
  const foundImages = [];
  
  imageNames.forEach(img => {
    // Try exact name
    let fileName = `${prefix} ${img.name}.png`;
    let exists = stepsFiles.includes(fileName.toLowerCase());
    
    if (!exists && img.altName) {
      // Try alternative name
      fileName = `${prefix} ${img.altName}.png`;
      exists = stepsFiles.includes(fileName.toLowerCase());
    }
    
    if (exists) {
      foundImages.push(`✓ ${fileName}`);
    } else {
      missingImages.push(`✗ ${prefix} ${img.name}.png`);
    }
  });
  
  foundImages.forEach(img => console.log(img));
  if (missingImages.length > 0) {
    console.log('Missing:');
    missingImages.forEach(img => console.log(img));
  }
});

// List actual files for specific products
console.log('\n\n=== Actual files in STEPS directory (grouped by product) ===\n');

const filesByProduct = {};
fs.readdirSync(stepsDir).forEach(file => {
  const prefix = file.replace(/\s(Steps|Pier Caps|Pool Coping|Pool Copping|Pool|Wall|Curbs)\.png$/i, '');
  if (!filesByProduct[prefix]) filesByProduct[prefix] = [];
  filesByProduct[prefix].push(file);
});

Object.entries(filesByProduct).sort().forEach(([prefix, files]) => {
  console.log(`${prefix}:`);
  files.forEach(f => console.log(`  ${f}`));
});
