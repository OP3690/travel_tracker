const fs = require('fs');
const input = 'public/WorldMap_SVG_Source.fixed.svg';
const output = 'public/WorldMap_SVG_Source.cleaned.svg';

let data = fs.readFileSync(input, 'utf8');

// Fix double double-quotes in the <svg> tag
// Replace xmlns=""http://www.w3.org/2000/svg"" with xmlns="http://www.w3.org/2000/svg"
data = data.replace(/<svg ([^>]+)>/, (match, attrs) =>
  '<svg ' + attrs.replace(/""/g, '"') + '>'
);

// Remove leading 't' from lines (e.g., tfill: => fill:)
data = data.replace(/^t/gm, '');

fs.writeFileSync(output, data, 'utf8');
console.log('Cleaned SVG written to', output); 