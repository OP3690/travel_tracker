const fs = require('fs');
const { JSDOM } = require('jsdom');

const svgPath = 'public/WorldMap_SVG_Source.normalized.svg'; // or your cleaned SVG
const outputPath = 'src/utils/countryCodeToName.js';

const svgContent = fs.readFileSync(svgPath, 'utf8');
const dom = new JSDOM(svgContent, { contentType: 'image/svg+xml' });
const document = dom.window.document;

const mapping = {};

function getNearestTitle(el) {
  // Check self, then walk up to parent <g>, then siblings
  if (el.tagName === 'title') return el.textContent.trim();
  let node = el;
  while (node && node.tagName !== 'svg') {
    if (node.tagName === 'g') {
      const t = node.querySelector('title');
      if (t) return t.textContent.trim();
    }
    node = node.parentNode;
  }
  // Check for previous or next sibling <title>
  if (el.previousElementSibling && el.previousElementSibling.tagName === 'title') {
    return el.previousElementSibling.textContent.trim();
  }
  if (el.nextElementSibling && el.nextElementSibling.tagName === 'title') {
    return el.nextElementSibling.textContent.trim();
  }
  return null;
}

// For every <path> and <circle>
document.querySelectorAll('path, circle').forEach(el => {
  let code = el.getAttribute('id') || (el.getAttribute('class') ? el.getAttribute('class').split(' ')[0] : null);
  if (!code) return;
  let name = getNearestTitle(el);
  if (!name) name = code;
  mapping[code.toLowerCase()] = name;
});

fs.writeFileSync(
  outputPath,
  'export const countryCodeToName = ' + JSON.stringify(mapping, null, 2) + ';\n'
);

console.log('Improved country code-to-name mapping written to', outputPath); 