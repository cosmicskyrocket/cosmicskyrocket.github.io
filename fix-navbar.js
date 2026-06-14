#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

// New true-glass navbar values
const newBg = 'background: rgba(255, 255, 255, 0.12);';
const newBlur = 'backdrop-filter: blur(22px) saturate(180%);';
const newWebkitBlur = '-webkit-backdrop-filter: blur(22px) saturate(180%);';
const newBorder = 'border-bottom: 1px solid rgba(255, 255, 255, 0.25);';
const newShadow = 'box-shadow: 0 2px 16px rgba(0, 0, 0, 0.06);';

// Pattern to match multi-line navbar block with old 0.55 value
const pattern = /background:\s*rgba\(255,\s*255,\s*255,\s*0\.55\);\s*\n(\s*)backdrop-filter:\s*blur\(20px\)\s*saturate\(180%\);\s*\n(\s*)-webkit-backdrop-filter:\s*blur\(20px\)\s*saturate\(180%\);\s*\n(\s*)box-shadow:\s*0 4px 24px rgba\(0,\s*0,\s*0,\s*0\.06\),\s*0 1px 0 rgba\(255,\s*255,\s*255,\s*0\.8\)\s*inset;/g;

function findHTMLFiles(dir) {
  const results = [];
  const items = fs.readdirSync(dir);
  for (const item of items) {
    if (item === '.git' || item === '.trash' || item.endsWith('.bak')) continue;
    const full = path.join(dir, item);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) results.push(...findHTMLFiles(full));
    else if (item.endsWith('.html')) results.push(full);
  }
  return results;
}

const files = findHTMLFiles('/Users/laxmandas/Downloads/cosmic-skyrocket-main');
let changed = 0;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  const original = content;

  content = content.replace(pattern, (_, s1, s2, s3) =>
    `${newBg}\n${s1}${newBlur}\n${s2}${newWebkitBlur}\n${s3}${newBorder}\n${s3}${newShadow}`
  );

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    changed++;
    console.log(`  ✓ ${file.split('/').slice(-2).join('/')}`);
  }
});

console.log(`\nUpdated ${changed} files`);
