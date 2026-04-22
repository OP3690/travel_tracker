import React from 'react';
import { Link } from 'react-router-dom';
import { BlogShell, useBlogSEO, useRevealOnScroll } from '../BlogLayout';
import { BlogTable, BlogCallout, BlogStatGrid, BlogInlineCTA, BlogEndCTA, BlogBarChart } from '../BlogComponents';
import { BlogAustraliaMap } from '../BlogAustraliaMap';
import { getPostBySlug } from '../posts';

const SLUG = 'two-week-australia-itinerary-2026';
const ROUTE = ['nsw', 'qld-mainland', 'nt-mainland', 'vic'];

export default function TwoWeekAustraliaItinerary2026() {
  const post = getPostBySlug(SLUG);
  useBlogSEO({
    title: `${post.title} | StampYourMap Blog`,
    description: post.description,
    url: `/blog/${SLUG}`,
    image: post.ogImage,
    datePublished: post.datePublished,
    keywords: 'australia itinerary 2 weeks, sydney great barrier reef uluru melbourne, australia 14 days, australia trip plan',
  });
  useRevealOnScroll();

  return (
    <BlogShell>
      <article className="blog-article">
        <div className="blog-breadcrumbs">
          <Link to="/">Home</Link> / <Link to="/blog">Blog</Link> / <span>2-Week Australia Itinerary</span>
        </div>
        <div className="blog-hero">
          <span className="blog-cat-chip">Australia · Itinerary</span>
          <span className="blog-meta-sep">•</span><span>Published April 22, 2026</span>
          <span className="blog-meta-sep">•</span><span>{post.readMinutes} min read</span>
        </div>

        <h1>{post.heroEmoji} The Perfect 2-Week Australia Itinerary: Sydney → Great Barrier Reef → Uluru → Melbourne (2026)</h1>

        <p className="blog-lede">
          The only itinerary that hits Australia's four bucket-list
          anchors in 14 days — Sydney Harbour, the Great Barrier Reef,
          Uluru, and Melbourne's Great Ocean Road. Three domestic
          flights, honest timing, and the stops most itineraries skip.
        </p>

        <BlogStatGrid stats={[
          { value: '14', label: 'Days' },
          { value: '4', label: 'States/Territories' },
          { value: '3', label: 'Internal flights' },
          { value: 'A$4,800', label: 'Mid-range total' },
        ]} />

        <BlogInlineCTA title="Stamp each stop." subtitle="Free map — all 8 states + territories." href="/signup" />

        <h2 id="route">1. The Route</h2>
        <BlogAustraliaMap
          regionIds={ROUTE}
          title="NSW → QLD → NT → VIC"
          subtitle="Sydney → Cairns/GBR → Uluru → Melbourne/Great Ocean Road"
        />

        <h2 id="day-by-day">2. Day-by-Day</h2>
        <BlogTable
          caption="Recommended 14-day plan"
          headers={['Day', 'Base', 'What you\'re doing']}
          rows={[
            ['1', <strong>Sydney</strong>, 'Arrive SYD; Opera House + Circular Quay; first dinner Manly or Darling Harbour'],
            ['2', <strong>Sydney</strong>, 'Harbour Bridge climb + Taronga Zoo + Bondi → Coogee walk'],
            ['3', <strong>Sydney</strong>, 'Blue Mountains day-trip — Three Sisters + Scenic World'],
            ['4', <strong>Cairns</strong>, 'Flight SYD → CNS (3 hr); evening Esplanade lagoon + Night Markets'],
            ['5', <strong>Cairns / GBR</strong>, 'Outer reef day-tour — Flynn Reef or Agincourt; snorkel or intro dive'],
            ['6', <strong>Cairns / Daintree</strong>, 'Daintree Rainforest + Cape Tribulation day (4WD tour)'],
            ['7', <strong>Uluru</strong>, 'Flight CNS → AYQ via SYD (6 hr total); evening sunset at Uluru viewing area'],
            ['8', <strong>Uluru</strong>, 'Sunrise at Talinguru Nyakunytjaku + Mala Walk + Field of Light dinner'],
            ['9', <strong>Kata Tjuta + Kings Canyon</strong>, 'Kata Tjuta Valley of the Winds + Kings Canyon rim walk (if extending)'],
            ['10', <strong>Melbourne</strong>, 'Flight AYQ → MEL via SYD (5 hr); arrival dinner Federation Square'],
            ['11', <strong>Melbourne</strong>, 'Laneways + coffee + Queen Victoria Market + NGV'],
            ['12', <strong>Great Ocean Road</strong>, 'Full-day tour: Twelve Apostles + Loch Ard Gorge + Bells Beach'],
            ['13', <strong>Phillip Island</strong>, 'Day-trip for Penguin Parade + wildlife park; return Melbourne late'],
            ['14', <strong>Melbourne → home</strong>, 'Morning brunch Fitzroy; MEL international departure'],
          ]}
        />

        <BlogCallout title="Uluru timing tip">
          <p>
            <strong>Sunrise at Uluru is better than sunset</strong> — the
            crowds are 60% smaller and the rock glows the same crimson.
            Budget 2 full days minimum at Uluru to fit Kata Tjuta + Kings
            Canyon. A 1-day stop misses the point.
          </p>
        </BlogCallout>

        <h2 id="flights">3. Internal Flights</h2>
        <BlogTable
          caption="Flight legs (2026 AUD, 60 days ahead)"
          headers={['Day', 'Route', 'Duration', 'Cost']}
          rows={[
            ['4', 'Sydney → Cairns', '3 hr direct', 'A$180-260'],
            ['7', 'Cairns → Uluru (via Sydney)', '6 hr total', 'A$300-450'],
            ['10', 'Uluru → Melbourne (via Sydney)', '5 hr total', 'A$280-380'],
            [<strong>Total flights</strong>, '', '', <strong>A$760-1,090</strong>],
          ]}
        />

        <BlogInlineCTA title="Track each state." subtitle="Free map, 8 Australian states + territories." href="/signup" />

        <h2 id="lodging">4. Where to Sleep</h2>
        <BlogTable
          caption="Recommended accommodations"
          headers={['Base', 'Budget', 'Mid-range', 'Splurge']}
          rows={[
            ['Sydney', 'YHA The Rocks', 'Vibe Hotel Rushcutters', 'Park Hyatt Sydney'],
            ['Cairns', 'Gilligan\'s Backpackers', 'Hilton Cairns', 'Silky Oaks Lodge (Daintree)'],
            ['Uluru (Yulara)', 'Outback Pioneer Hostel', 'Desert Gardens Hotel', 'Longitude 131°'],
            ['Melbourne', 'Space Hotel', 'QT Melbourne', 'Park Hyatt Melbourne'],
          ]}
        />

        <h2 id="cost">5. Total Cost</h2>
        <BlogBarChart
          title="14-day Australia trip breakdown (mid-range A$4,800)"
          subtitle="Per-person spend, excluding international flight."
          max={100} unit="%"
          data={[
            { label: 'Accommodation', value: 38, valueLabel: '38%' },
            { label: 'Food & drink', value: 18, valueLabel: '18%' },
            { label: 'Internal flights', value: 20, valueLabel: '20%' },
            { label: 'Tours & activities', value: 14, valueLabel: '14%' },
            { label: 'Local transport', value: 4, valueLabel: '4%' },
            { label: 'Buffer', value: 6, valueLabel: '6%' },
          ]}
        />

        <h2 id="alt">6. Alternative Routes</h2>
        <h3>🏖️ East Coast Classic (no Uluru)</h3>
        <p><strong>Sydney (4) → Byron Bay (2) → Whitsundays (3) → Cairns (3) → Melbourne (2)</strong>. Beach-focused.</p>
        <h3>🌲 Tasmania add-on</h3>
        <p><strong>Sydney (3) → Melbourne (3) → Tasmania (5) → Cairns + GBR (3)</strong>. Wilderness + MONA.</p>
        <h3>🏞️ West Coast</h3>
        <p><strong>Perth (3) → Margaret River (3) → Ningaloo (3) → Broome (5)</strong>. WA deep-dive.</p>

        <h2 id="faq">7. FAQ</h2>
        <h3>Can I do 10 days?</h3>
        <p>Yes — drop Uluru. 10-day: Sydney (3) → Cairns (3) → Melbourne (2) + GOR (2).</p>
        <h3>Best month?</h3>
        <p><strong>April or September-October</strong>. Tropical north dry, south temperate.</p>
        <h3>Reverse route?</h3>
        <p>Yes — Melbourne → Uluru → Cairns → Sydney. Often cheaper MEL arrivals from LAX.</p>

        <h2 id="keep">Keep Reading</h2>
        <ul>
          <li><Link to="/blog/australia-travel-guide-2026">Ultimate Australia Guide →</Link></li>
          <li><Link to="/blog/best-australian-destinations-2026">10 Best Destinations →</Link></li>
          <li><Link to="/blog/great-barrier-reef-guide-2026">Great Barrier Reef Guide →</Link></li>
          <li><Link to="/blog/australia-budget-travel-2026">Budget Guide →</Link></li>
        </ul>

        <BlogEndCTA
          title="Turn this itinerary into your Aussie map."
          subtitle="Stamp each state. Free, forever."
        />
      </article>
    </BlogShell>
  );
}
