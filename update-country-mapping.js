const fs = require('fs');
const path = require('path');
const parse = require('csv-parse/sync').parse;

const csvPath = path.join(__dirname, 'country_codes.csv');
const outputPath = path.join(__dirname, 'src/utils/countryCodeToName.js');

const csv = fs.readFileSync(csvPath, 'utf8');
const records = parse(csv, { columns: true, skip_empty_lines: true });

const codeHeader = Object.keys(records[0]).find(h => h.toLowerCase().includes('code'));
const nameHeader = Object.keys(records[0]).find(h => h.toLowerCase().includes('proper country name'));

if (!codeHeader || !nameHeader) {
  console.error('Could not find Code or Proper Country Name columns in CSV.');
  process.exit(1);
}

const mapping = {};
for (const row of records) {
  const code = row[codeHeader]?.toLowerCase();
  const name = row[nameHeader];
  if (code && name) mapping[code] = name;
}

fs.writeFileSync(
  outputPath,
  'export const countryCodeToName = ' + JSON.stringify(mapping, null, 2) + ';\n'
);
console.log('Updated countryCodeToName.js with proper country names.'); 