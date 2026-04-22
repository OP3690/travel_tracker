import React from 'react';
import { Link } from 'react-router-dom';
import { BlogShell, useBlogSEO, useRevealOnScroll } from '../BlogLayout';
import { BlogTable, BlogCallout, BlogStatGrid, BlogInlineCTA, BlogEndCTA, BlogBarChart } from '../BlogComponents';
import { BlogSpainMap } from '../BlogSpainMap';
import { getPostBySlug } from '../posts';

const SLUG = 'two-week-spain-itinerary-2026';
const ROUTE = ['madrid', 'castile-la-mancha', 'andalusia', 'catalonia', 'valencia'];

export default function TwoWeekSpainItinerary2026() {
  const post = getPostBySlug(SLUG);
  useBlogSEO({
    title: `${post.title} | StampYourMap Blog`,
    description: post.description,
    url: `/blog/${SLUG}`,
    image: post.ogImage,
    datePublished: post.datePublished,
    keywords: 'spain itinerary 2 weeks, madrid seville granada barcelona itinerary, spain 14 days, spain trip plan 2026',
  });
  useRevealOnScroll();

  return (
    <BlogShell>
      <article className="blog-article">
        <div className="blog-breadcrumbs">
          <Link to="/">Home</Link> / <Link to="/blog">Blog</Link> / <span>2-Week Spain Itinerary</span>
        </div>
        <div className="blog-hero">
          <span className="blog-cat-chip">Spain · Itinerary</span>
          <span className="blog-meta-sep">•</span><span>Published April 22, 2026</span>
          <span className="blog-meta-sep">•</span><span>{post.readMinutes} min read</span>
        </div>

        <h1>{post.heroEmoji} The Perfect 2-Week Spain Itinerary: Madrid → Seville → Granada → Barcelona → Valencia (2026)</h1>

        <p className="blog-lede">
          14 days covering Madrid's art triangle, Andalucía's Moorish
          heritage (Seville, Granada, Córdoba), Catalonia's Gaudí
          masterpieces, and Valencia's paella + modern architecture.
          Four AVE high-speed rail legs, zero wasted days.
        </p>

        <BlogStatGrid stats={[
          { value: '14', label: 'Days' },
          { value: '5', label: 'Regions' },
          { value: '4', label: 'AVE legs' },
          { value: '€2,400', label: 'Mid-range total' },
        ]} />

        <BlogInlineCTA title="Stamp each Spanish region." subtitle="Free interactive map, 17 regions preloaded." href="/signup" />

        <h2 id="route">1. The Route</h2>
        <BlogSpainMap
          regionIds={ROUTE}
          title="Madrid → Toledo → Andalucía → Barcelona → Valencia"
          subtitle="Five regions, four high-speed trains, one beautiful Spanish loop."
        />

        <h2 id="day-by-day">2. Day-by-Day</h2>
        <BlogTable
          caption="Recommended 14-day plan"
          headers={['Day', 'Base', 'What you\'re doing']}
          rows={[
            ['1', <strong>Madrid</strong>, 'Arrive MAD; check-in Sol/Malasaña; late tapas dinner (Spain eats at 10 PM)'],
            ['2', <strong>Madrid</strong>, 'Prado Museum (book 2 hr slot) + Retiro Park + Plaza Mayor'],
            ['3', <strong>Madrid + Toledo</strong>, 'Day-trip Toledo (30-min AVE); Cathedral + El Greco museum'],
            ['4', <strong>Seville</strong>, 'AVE Madrid → Seville (2h30); Plaza de España sunset; flamenco show evening'],
            ['5', <strong>Seville</strong>, 'Alcázar + Cathedral + Barrio Santa Cruz; dinner at Casa Morales'],
            ['6', <strong>Córdoba day-trip</strong>, 'AVE Seville → Córdoba (45 min); Mezquita + Jewish Quarter'],
            ['7', <strong>Granada</strong>, 'AVE or bus to Granada (2h30); Albaicín evening walk; sunset at Mirador San Nicolás'],
            ['8', <strong>Granada</strong>, 'Alhambra morning (book 3 months ahead) + Sacromonte flamenco cave'],
            ['9', <strong>Barcelona</strong>, 'AVE Granada → Barcelona (6h30 via Madrid) OR short flight'],
            ['10', <strong>Barcelona</strong>, 'Sagrada Familia (9 AM slot) + Park Güell + Gothic Quarter'],
            ['11', <strong>Barcelona</strong>, 'Casa Batlló + Casa Milà + Barceloneta beach + tapas crawl'],
            ['12', <strong>Valencia</strong>, 'AVE Barcelona → Valencia (3 hr); Ciudad de las Artes + Albufera rice fields'],
            ['13', <strong>Valencia</strong>, 'Paella lunch at a beach chiringuito; Central Market; Turia Gardens'],
            ['14', <strong>Madrid → home</strong>, 'AVE Valencia → Madrid (1h50); MAD international flight'],
          ]}
        />

        <BlogCallout title="The Alhambra is non-negotiable">
          <p>
            Book Alhambra tickets <strong>3 months ahead</strong> on the
            official site (alhambra-patronato.es). They sell out daily
            April-October. Grab the "general visit" ticket — €19, lets
            you into Nasrid Palaces, Generalife, Alcazaba. Ticket is
            timed entry for the Nasrid Palaces only.
          </p>
        </BlogCallout>

        <h2 id="trains">3. AVE + Flight Legs</h2>
        <BlogTable
          caption="Intercity segments (2026 EUR, 60 days ahead)"
          headers={['Day', 'Route', 'Duration', 'Cost']}
          rows={[
            ['4', 'Madrid → Seville', '2h30 AVE', '€30-55'],
            ['6', 'Seville ↔ Córdoba (day-trip)', '45 min each way', '€40 round-trip'],
            ['7', 'Seville → Granada', '2h30 AVE / bus', '€12-28'],
            ['9', 'Granada → Barcelona', '6h30 AVE / 1h flight', '€45 AVE or €55 flight'],
            ['12', 'Barcelona → Valencia', '3 hr AVE', '€25-45'],
            ['14', 'Valencia → Madrid (for flight)', '1h50 AVE', '€22-40'],
            [<strong>Transit total</strong>, '', '', <strong>€175-250</strong>],
          ]}
        />

        <h2 id="lodging">4. Where to Sleep</h2>
        <BlogTable
          caption="Recommended accommodations per base"
          headers={['Base', 'Budget', 'Mid-range', 'Splurge']}
          rows={[
            ['Madrid', 'Generator Madrid', 'Hotel Urban', 'Four Seasons Madrid'],
            ['Seville', 'TOC Hostel Sevilla', 'Hotel Palacio Alcázar', 'Mercer Sevilla'],
            ['Granada', 'Oasis Backpackers Hostel', 'Hotel Casa 1800', 'Parador de Granada'],
            ['Barcelona', 'Generator Barcelona', 'Hotel Pulitzer', 'Hotel Arts Barcelona'],
            ['Valencia', 'Purple Nest Hostel', 'Caro Hotel', 'The Westin Valencia'],
          ]}
        />

        <BlogInlineCTA title="Track your progression." subtitle="Stamp each city + region on your free map." href="/signup" />

        <h2 id="cost">5. Total Cost</h2>
        <BlogBarChart
          title="14-day Spain trip breakdown (mid-range ~€2,400)"
          subtitle="Per-person spend, excluding international flight."
          max={100} unit="%"
          data={[
            { label: 'Accommodation', value: 42, valueLabel: '42%' },
            { label: 'Food + tapas', value: 22, valueLabel: '22%' },
            { label: 'AVE + transport', value: 10, valueLabel: '10%' },
            { label: 'Museums + attractions', value: 12, valueLabel: '12%' },
            { label: 'City transport', value: 6, valueLabel: '6%' },
            { label: 'Buffer', value: 8, valueLabel: '8%' },
          ]}
        />

        <BlogTable
          caption="14-day per-person total (EUR)"
          headers={['Tier', 'Daily × 14', 'Transport', 'Activities', 'Total']}
          rows={[
            ['Backpacker', '€700', '€175', '€100', <strong>€975</strong>],
            ['Mid-range', '€1,850', '€220', '€200', <strong>€2,270</strong>],
            ['Comfort', '€4,200', '€330', '€500', <strong>€5,030</strong>],
          ]}
        />

        <h2 id="alt">6. Alternative Routes</h2>
        <h3>🏖️ Beach + tapas</h3>
        <p>
          <strong>Madrid (3) → Seville (2) → Málaga (3) → Valencia (3) → Barcelona (3)</strong>.
          More coast, less mountain. Better May-October.
        </p>
        <h3>🍽️ Basque food focus</h3>
        <p>
          <strong>Madrid (3) → Bilbao (2) → San Sebastián (3) → Barcelona (3) → Valencia (3)</strong>.
          San Sebastián has more Michelin stars per capita than anywhere.
        </p>
        <h3>🏝️ City + island</h3>
        <p>
          <strong>Barcelona (4) → Mallorca (5) → Madrid (3) → Seville (2)</strong>.
          Pair Catalonia with the Balearics.
        </p>

        <h2 id="faq">7. FAQ</h2>
        <h3>Can I do 10 days?</h3>
        <p>Yes — drop Valencia + 1 Andalucía city. 10-day: Madrid (3) → Seville (2) → Granada (2) → Barcelona (3).</p>
        <h3>Best month?</h3>
        <p><strong>May, September, October</strong>. Avoid July-August in Andalucía.</p>
        <h3>Reverse route?</h3>
        <p>Yes — fly into Barcelona, end in Madrid.</p>

        <h2 id="keep">Keep Reading</h2>
        <ul>
          <li><Link to="/blog/spain-travel-guide-2026">Ultimate Spain Guide →</Link></li>
          <li><Link to="/blog/best-spain-regions-2026">10 Best Spanish Regions →</Link></li>
          <li><Link to="/blog/spanish-food-guide-2026">25 Spanish Dishes →</Link></li>
          <li><Link to="/blog/barcelona-complete-guide-2026">Barcelona Guide →</Link></li>
          <li><Link to="/blog/spain-budget-travel-2026">Spain Budget Guide →</Link></li>
        </ul>

        <BlogEndCTA
          title="Turn this itinerary into your personal Spain map."
          subtitle="Stamp every region. Free forever."
        />
      </article>
    </BlogShell>
  );
}
