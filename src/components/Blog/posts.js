// Central manifest of every published blog post. The blog index, sitemap,
// and per-post pages all read from this list — keep it in sync when adding posts.
export const POSTS = [
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
