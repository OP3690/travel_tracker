// Central manifest of every published blog post. The blog index, sitemap,
// and per-post pages all read from this list — keep it in sync when adding posts.
export const POSTS = [
  {
    slug: 'usa-bucket-list-100-places',
    title: "USA Bucket List: 100 Must-See Places by State (Interactive Map & Checklist)",
    description:
      "The definitive 100-place US bucket list, organized by state and category — national parks, historic sites, food capitals, quirky roadside icons and off-the-beaten-path wonders. Interactive map, printable checklist and regional trip-planning tips.",
    ogImage: '/diego-jimenez-A-NVHPka9Rk-unsplash.jpg',
    datePublished: '2026-04-21',
    readMinutes: 16,
    category: 'USA Travel',
    tags: ['Bucket List', 'USA', 'Travel Planning', 'Interactive Map'],
    heroEmoji: '🇺🇸',
  },
  {
    slug: 'american-travel-trends-2026',
    title: "How Americans Actually Travel in 2026: The Definitive Data & Trend Report",
    description:
      "A data-rich 2026 report on how Americans really travel — average trip length, spend, top destinations, work-from-anywhere growth, domestic vs international share, generational patterns and the five trends reshaping US tourism this year.",
    ogImage: '/spencer-davis-0QcSnCM0aMc-unsplash.jpg',
    datePublished: '2026-04-21',
    readMinutes: 13,
    category: 'USA Travel',
    tags: ['Travel Data', 'US Trends', 'Tourism Report', '2026'],
    heroEmoji: '📊',
  },
  {
    slug: 'pacific-coast-highway-ultimate-guide-2026',
    title: "Pacific Coast Highway: The Ultimate 655-Mile California Road Trip (2026 Guide)",
    description:
      "Drive California's Highway 1 end to end in 2026 — Big Sur to the Redwoods, Santa Monica to Mendocino. Full 7-day itinerary, mileage breakdown, viewpoint-by-viewpoint stops, realistic budget tables and best-season weather data.",
    ogImage: '/spencer-davis-0QcSnCM0aMc-unsplash.jpg',
    datePublished: '2026-04-21',
    readMinutes: 13,
    category: 'USA Travel',
    tags: ['PCH', 'California', 'Road Trip', 'Big Sur', 'Itinerary'],
    heroEmoji: '🌊',
  },
  {
    slug: 'most-visited-national-parks-2026',
    title: "The 10 Most-Visited US National Parks (2026): Data, Maps & Crowd-Avoidance Guide",
    description:
      "Annual visitation data, state-by-state map, busiest months chart and practical crowd-avoidance strategies for America's ten most-visited national parks — plus five underrated alternatives that deliver the same wow without the shuttle-bus line.",
    ogImage: '/tom-barrett-M0AWNxnLaMw-unsplash.jpg',
    datePublished: '2026-04-21',
    readMinutes: 12,
    category: 'USA Travel',
    tags: ['National Parks', 'USA', 'Travel Data', 'Bucket List'],
    heroEmoji: '🏞️',
  },
  {
    slug: 'us-states-ranked-for-travelers-2026',
    title: "All 50 US States Ranked for Travelers in 2026: A Data-Driven Bucket-List Guide",
    description:
      "The StampYourMap team scored all 50 US states across six dimensions — cost, nature, culture, food, bucket-list iconicity and ease-of-travel — to produce the definitive 2026 ranking. Full table, interactive map, best-by-category picks, and the underrated sleepers everyone overlooks.",
    ogImage: '/tom-barrett-M0AWNxnLaMw-unsplash.jpg',
    datePublished: '2026-04-21',
    readMinutes: 14,
    category: 'USA Travel',
    tags: ['US States', 'Bucket List', 'Travel Rankings', 'USA', 'Trip Planning'],
    heroEmoji: '🗽',
  },
  {
    slug: 'route-66-ultimate-guide-2026',
    title: "Route 66 Revival: The Ultimate 2,448-Mile American Road Trip Guide (2026)",
    description:
      "A data-rich 2026 guide to driving Route 66 end to end — 8 states, 2,448 miles, week-by-week itinerary, best-time-to-drive weather data, realistic budget tables, and the can't-miss roadside stops that make the Mother Road unforgettable.",
    ogImage: '/felix-rostig-UmV2wr-Vbq8-unsplash.jpg',
    datePublished: '2026-04-21',
    readMinutes: 12,
    category: 'USA Travel',
    tags: ['Route 66', 'Road Trip', 'USA', 'Bucket List', 'Itinerary'],
    heroEmoji: '🛣️',
  },
];

export function getPostBySlug(slug) {
  return POSTS.find(p => p.slug === slug) || null;
}
