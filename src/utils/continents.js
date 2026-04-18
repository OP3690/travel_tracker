// Country → continent lookup for the 195 supported countries.
// Used by Statistics to break down international travel by continent.
const CONTINENTS = {
  Africa: ['Algeria','Angola','Benin','Botswana','Burkina Faso','Burundi','Cabo Verde','Cameroon','Central African Republic','Chad','Comoros','Democratic Republic of the Congo','Republic of the Congo','Côte d\'Ivoire','Djibouti','Egypt','Equatorial Guinea','Eritrea','Eswatini','Ethiopia','Gabon','Gambia','Ghana','Guinea','Guinea-Bissau','Kenya','Lesotho','Liberia','Libya','Madagascar','Malawi','Mali','Mauritania','Mauritius','Morocco','Mozambique','Namibia','Niger','Nigeria','Rwanda','São Tomé and Príncipe','Senegal','Seychelles','Sierra Leone','Somalia','South Africa','South Sudan','Sudan','Tanzania','Togo','Tunisia','Uganda','Zambia','Zimbabwe'],
  Asia: ['Afghanistan','Armenia','Azerbaijan','Bahrain','Bangladesh','Bhutan','Brunei','Cambodia','China','Cyprus','Georgia','India','Indonesia','Iran','Iraq','Israel','Japan','Jordan','Kazakhstan','Kuwait','Kyrgyzstan','Laos','Lebanon','Malaysia','Maldives','Mongolia','Myanmar','Nepal','North Korea','Oman','Pakistan','Palestine','Philippines','Qatar','Saudi Arabia','Singapore','South Korea','Sri Lanka','Syria','Taiwan','Tajikistan','Thailand','Timor-Leste','Turkey','Turkmenistan','United Arab Emirates','UAE','Uzbekistan','Vietnam','Yemen'],
  Europe: ['Albania','Andorra','Austria','Belarus','Belgium','Bosnia and Herzegovina','Bulgaria','Croatia','Czech Republic','Czechia','Denmark','Estonia','Finland','France','Germany','Greece','Hungary','Iceland','Ireland','Italy','Kosovo','Latvia','Liechtenstein','Lithuania','Luxembourg','Malta','Moldova','Monaco','Montenegro','Netherlands','North Macedonia','Norway','Poland','Portugal','Romania','Russia','San Marino','Serbia','Slovakia','Slovenia','Spain','Sweden','Switzerland','Ukraine','United Kingdom','UK','Vatican City'],
  'North America': ['Antigua and Barbuda','Bahamas','Barbados','Belize','Canada','Costa Rica','Cuba','Dominica','Dominican Republic','El Salvador','Grenada','Guatemala','Haiti','Honduras','Jamaica','Mexico','Nicaragua','Panama','Saint Kitts and Nevis','Saint Lucia','Saint Vincent and the Grenadines','Trinidad and Tobago','United States','USA'],
  'South America': ['Argentina','Bolivia','Brazil','Chile','Colombia','Ecuador','Guyana','Paraguay','Peru','Suriname','Uruguay','Venezuela'],
  Oceania: ['Australia','Fiji','Kiribati','Marshall Islands','Micronesia','Nauru','New Zealand','Palau','Papua New Guinea','Samoa','Solomon Islands','Tonga','Tuvalu','Vanuatu'],
};

// Build reverse lookup
const countryToContinent = {};
for (const [continent, countries] of Object.entries(CONTINENTS)) {
  for (const c of countries) {
    countryToContinent[c.toLowerCase()] = continent;
  }
}

export function getContinent(country) {
  if (!country) return 'Unknown';
  return countryToContinent[country.toLowerCase()] || 'Unknown';
}

export const CONTINENT_LIST = Object.keys(CONTINENTS);
export const CONTINENT_TOTALS = Object.fromEntries(
  Object.entries(CONTINENTS).map(([k, v]) => [k, v.length])
);
export default CONTINENTS;
