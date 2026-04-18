// Resolves the list of regions (states / provinces / prefectures / etc.) for a
// given country name. Used to populate the Region dropdown when creating a memory.
//
// For the 25 countries with @svg-maps packages we already pull from those
// statically. Every other country is resolved via a dynamic import of
// src/assets/maps/{ISO2}.json — same source our maps render from.

import countryToCode from './countryCodeMap';

// Statically-imported @svg-maps packages (same set CountryMap.js uses)
import India from '@svg-maps/india';
import USA from '@svg-maps/usa';
import Japan from '@svg-maps/japan';
import Brazil from '@svg-maps/brazil';
import Italy from '@svg-maps/italy';
import FranceRegions from '@svg-maps/france.regions';
import Germany from '@svg-maps/germany';
import Canada from '@svg-maps/canada';
import Spain from '@svg-maps/spain';
import Mexico from '@svg-maps/mexico';
import Nigeria from '@svg-maps/nigeria';
import Romania from '@svg-maps/romania';
import Taiwan from '@svg-maps/taiwan';
import Thailand from '@svg-maps/thailand';
import SouthKorea from '@svg-maps/south-korea';
import Australia from '@svg-maps/australia';
import China from '@svg-maps/china';
import Vietnam from '@svg-maps/vietnam';
import Ukraine from '@svg-maps/ukraine';
import Denmark from '@svg-maps/denmark';
import SaudiArabia from '@svg-maps/saudi-arabia';
import Colombia from '@svg-maps/colombia';
import Austria from '@svg-maps/austria';
import Uzbekistan from '@svg-maps/uzbekistan';
import Indonesia from '@svg-maps/indonesia';

const staticMaps = {
  India, USA, Japan, Brazil, Italy,
  France: FranceRegions, Germany, Canada, Spain, Mexico,
  Nigeria, Romania, Taiwan, Thailand, 'South Korea': SouthKorea,
  Australia, China, Vietnam, Ukraine, Denmark,
  'Saudi Arabia': SaudiArabia, Colombia, Austria, Uzbekistan, Indonesia,
};

const regionCache = new Map();

export async function getCountryRegions(country) {
  if (!country) return [];
  if (regionCache.has(country)) return regionCache.get(country);

  // Static package?
  const stat = staticMaps[country];
  if (stat?.locations?.length) {
    const list = stat.locations
      .map(l => l.name)
      .filter(Boolean)
      .sort((a, b) => a.localeCompare(b));
    regionCache.set(country, list);
    return list;
  }

  // Dynamic JSON?
  const code = countryToCode[country];
  if (!code) {
    regionCache.set(country, []);
    return [];
  }
  try {
    const mod = await import(`../assets/maps/${code}.json`);
    const data = mod.default || mod;
    const list = (data?.locations || [])
      .map(l => l.name)
      .filter(Boolean)
      .sort((a, b) => a.localeCompare(b));
    regionCache.set(country, list);
    return list;
  } catch {
    regionCache.set(country, []);
    return [];
  }
}

// Synchronous check — does this country have a regions list we can offer?
export function hasRegionsSync(country) {
  if (!country) return false;
  if (staticMaps[country]?.locations?.length) return true;
  return Boolean(countryToCode[country]);
}
