export function processSVGData(svgData) {
  // Extract all country groups from the SVG data
  const countryGroups = svgData.match(/<g id="[^"]+">[\s\S]*?<\/g>/g) || [];
  
  // Process each country group
  const countries = countryGroups.map(group => {
    const idMatch = group.match(/id="([^"]+)"/);
    const titleMatch = group.match(/<title>([^<]+)<\/title>/);
    const pathMatch = group.match(/<path[^>]*d="([^"]+)"[^>]*>/);
    const circleMatch = group.match(/<circle[^>]*cx="([^"]+)"[^>]*cy="([^"]+)"[^>]*>/);
    
    if (!idMatch || !titleMatch) return null;
    
    return {
      id: idMatch[1],
      name: titleMatch[1],
      path: pathMatch ? pathMatch[1] : null,
      center: circleMatch ? {
        x: parseFloat(circleMatch[1]),
        y: parseFloat(circleMatch[2])
      } : null
    };
  }).filter(Boolean);

  // Create a map of country data
  const countryMap = {};
  countries.forEach(country => {
    countryMap[country.id] = country;
  });

  return {
    countries,
    countryMap
  };
}

export function generateSVGContent(countries) {
  return `
    <g id="world-map">
      ${countries.map(country => `
        <g id="${country.id}" class="country">
          <title>${country.name}</title>
          ${country.path ? `<path d="${country.path}" />` : ''}
          ${country.center ? `<circle cx="${country.center.x}" cy="${country.center.y}" r="6" />` : ''}
        </g>
      `).join('\n')}
    </g>
  `;
} 