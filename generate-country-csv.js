const fs = require('fs');

const file = fs.readFileSync('./src/utils/countryCodeToName.js', 'utf8');
const match = file.match(/export const countryCodeToName = (\{[\s\S]*?\});/);
if (!match) {
  console.error('Could not find countryCodeToName object in file.');
  process.exit(1);
}
const objStr = match[1];
const countryCodeToName = eval('(' + objStr + ')');

const rows = [['Code', 'Country Name']];
for (const [code, name] of Object.entries(countryCodeToName)) {
  rows.push([code, name]);
}

const csv = rows.map(row => row.map(cell => `"${cell.replace(/"/g, '""')}"`).join(',')).join('\n');
fs.writeFileSync('country_codes.csv', csv, 'utf8');
console.log('CSV written to country_codes.csv'); 