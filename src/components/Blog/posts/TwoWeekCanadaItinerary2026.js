import React from 'react';
import { Link } from 'react-router-dom';
import { BlogShell, useBlogSEO, useRevealOnScroll } from '../BlogLayout';
import { BlogTable, BlogCallout, BlogStatGrid, BlogInlineCTA, BlogEndCTA, BlogBarChart } from '../BlogComponents';
import { BlogCanadaMap } from '../BlogCanadaMap';
import { getPostBySlug } from '../posts';

const SLUG = 'two-week-canada-itinerary-2026';
const ROUTE = ['on', 'qc', 'ab', 'bc'];

export default function TwoWeekCanadaItinerary2026() {
  const post = getPostBySlug(SLUG);
  useBlogSEO({
    title: `${post.title} | StampYourMap Blog`,
    description: post.description,
    url: `/blog/${SLUG}`,
    image: post.ogImage,
    datePublished: post.datePublished,
    keywords: 'canada itinerary 2 weeks, toronto montreal banff vancouver, canada 14 days, canada trip plan',
  });
  useRevealOnScroll();

  return (
    <BlogShell>
      <article className="blog-article">
        <div className="blog-breadcrumbs">
          <Link to="/">Home</Link> / <Link to="/blog">Blog</Link> / <span>2-Week Canada Itinerary</span>
        </div>
        <div className="blog-hero">
          <span className="blog-cat-chip">Canada · Itinerary</span>
          <span className="blog-meta-sep">•</span><span>Published April 22, 2026</span>
          <span className="blog-meta-sep">•</span><span>{post.readMinutes} min read</span>
        </div>

        <h1>{post.heroEmoji} The Perfect 2-Week Canada Itinerary: Toronto → Montreal → Quebec City → Banff → Vancouver (2026)</h1>

        <p className="blog-lede">
          14 days hitting Canada's east + west anchors — Toronto + Niagara,
          the French-Canadian duo of Montreal + Quebec City, Banff's
          Canadian Rockies, finish in Vancouver. Two long-haul flights,
          the rest by VIA Rail + car rental.
        </p>

        <BlogStatGrid stats={[
          { value: '14', label: 'Days' },
          { value: '4', label: 'Provinces' },
          { value: '2', label: 'Cross-country flights' },
          { value: 'C$4,500', label: 'Mid-range total' },
        ]} />

        <BlogInlineCTA title="Track each stop." subtitle="Stamp every province — free map." href="/signup" />

        <h2 id="route">1. The Route</h2>
        <BlogCanadaMap
          regionIds={ROUTE}
          title="Ontario → Quebec → Alberta → BC"
          subtitle="East-to-west Canadian grand tour."
        />

        <h2 id="day-by-day">2. Day-by-Day</h2>
        <BlogTable
          caption="Recommended plan"
          headers={['Day', 'Base', 'What you\'re doing']}
          rows={[
            ['1', <strong>Toronto</strong>, 'Arrive YYZ; CN Tower + Distillery District + Kensington Market'],
            ['2', <strong>Toronto</strong>, 'Royal Ontario Museum + Islands ferry + TIFF Lightbox'],
            ['3', <strong>Niagara day-trip</strong>, 'GO Train to Niagara; Horseshoe Falls + Journey Behind + return'],
            ['4', <strong>Montreal</strong>, 'VIA Rail Toronto → Montreal (5 hr); Old Port + Plateau dinner + bagels'],
            ['5', <strong>Montreal</strong>, 'Mount Royal + Notre-Dame + Poutine at La Banquise + Mile End'],
            ['6', <strong>Quebec City</strong>, 'Train Montreal → Quebec (3h); Old Quebec UNESCO district; Château Frontenac'],
            ['7', <strong>Quebec City</strong>, 'Ramparts walk + Montmorency Falls + dinner at Aux Anciens Canadiens'],
            ['8', <strong>Banff</strong>, 'Fly YQB → YYC (via Toronto); rental car Calgary → Banff (1h30)'],
            ['9', <strong>Lake Louise + Moraine</strong>, 'Sunrise Moraine + Lake Louise tea house hike'],
            ['10', <strong>Icefields Parkway</strong>, 'Banff → Jasper drive (3h with stops): Peyto Lake + Athabasca Glacier'],
            ['11', <strong>Jasper / return Banff</strong>, 'Maligne Canyon + Lake or return Banff via Icefields'],
            ['12', <strong>Vancouver</strong>, 'Flight YYC → YVR (1h30); Stanley Park bike + Gastown + Granville Island'],
            ['13', <strong>Whistler day-trip</strong>, 'Sea-to-Sky drive; Peak 2 Peak gondola; return Vancouver'],
            ['14', <strong>Vancouver → home</strong>, 'Capilano Suspension Bridge morning; YVR departure'],
          ]}
        />

        <BlogCallout title="Moraine Lake shuttle requirement">
          <p>
            As of 2023, <strong>private cars are banned from Moraine Lake</strong>.
            You must book the Parks Canada shuttle OR use a commercial
            tour. Book the shuttle at least 3 months in advance — it
            sells out quickly.
          </p>
        </BlogCallout>

        <h2 id="flights">3. Flights + Train Legs</h2>
        <BlogTable
          caption="Transport segments (2026 CAD)"
          headers={['Day', 'Route', 'Mode', 'Cost']}
          rows={[
            ['4', 'Toronto → Montreal', 'VIA Rail (5h)', 'C$85-160'],
            ['6', 'Montreal → Quebec', 'VIA Rail (3h)', 'C$45-90'],
            ['8', 'Quebec → Calgary (via YYZ)', 'Flight (6h total)', 'C$380-580'],
            ['8', 'Calgary → Banff', 'Rental car', 'C$90/day + gas'],
            ['12', 'Calgary → Vancouver', 'Flight (1h30)', 'C$180-320'],
            [<strong>Transit total</strong>, '', '', <strong>C$780-1,150</strong>],
          ]}
        />

        <BlogInlineCTA title="Cross-Canada journey?" subtitle="Stamp every province — free map." href="/signup" />

        <h2 id="lodging">4. Lodging</h2>
        <BlogTable
          caption="Accommodations"
          headers={['Base', 'Budget', 'Mid-range', 'Splurge']}
          rows={[
            ['Toronto', 'The Clarence (hostel)', 'Chelsea Hotel', 'Four Seasons Toronto'],
            ['Montreal', 'M Montreal Hostel', 'Le Germain', 'Ritz-Carlton Montreal'],
            ['Quebec City', 'Auberge Internationale de Québec', 'Hôtel Manoir Victoria', 'Château Frontenac'],
            ['Banff', 'Banff Alpine Centre (HI)', 'Juniper Hotel', 'Fairmont Banff Springs'],
            ['Vancouver', 'Samesun Vancouver', 'Loden Hotel', 'Fairmont Pacific Rim'],
          ]}
        />

        <h2 id="cost">5. Total Cost</h2>
        <BlogBarChart
          title="14-day Canada trip breakdown (mid-range C$4,500)"
          subtitle="Per-person spend, excluding international flight."
          max={100} unit="%"
          data={[
            { label: 'Accommodation', value: 38, valueLabel: '38%' },
            { label: 'Food', value: 20, valueLabel: '20%' },
            { label: 'Flights + VIA Rail', value: 18, valueLabel: '18%' },
            { label: 'Rental car (Banff week)', value: 8, valueLabel: '8%' },
            { label: 'Activities + park pass', value: 10, valueLabel: '10%' },
            { label: 'Buffer', value: 6, valueLabel: '6%' },
          ]}
        />

        <h2 id="alt">6. Alternatives</h2>
        <h3>🌲 East-only</h3>
        <p><strong>Toronto (3) → Niagara (1) → Montreal (3) → Quebec (2) → Charlevoix (2) → Halifax (3)</strong>. No west, more time per city.</p>
        <h3>🏔️ West-only</h3>
        <p><strong>Vancouver (3) → Whistler (2) → Jasper (3) → Banff (4) → Calgary (2)</strong>. Pure Rockies focus.</p>
        <h3>🍂 Fall foliage</h3>
        <p><strong>Toronto (2) → Algonquin PP (2) → Montreal (2) → Charlevoix (3) → Quebec (3) → Mont-Tremblant (2)</strong>. Mid-September to mid-October only.</p>

        <h2 id="faq">7. FAQ</h2>
        <h3>10-day version?</h3><p>Pick east (Toronto + Quebec) OR west (Banff + Vancouver), not both.</p>
        <h3>Best month?</h3><p><strong>June or September</strong>. September adds fall colors.</p>
        <h3>Rental car necessary?</h3><p>Yes for Banff/Jasper week. Not needed in cities.</p>

        <h2 id="keep">Keep Reading</h2>
        <ul>
          <li><Link to="/blog/canada-travel-guide-2026">Ultimate Canada Guide →</Link></li>
          <li><Link to="/blog/best-canada-destinations-2026">10 Best Destinations →</Link></li>
          <li><Link to="/blog/banff-canadian-rockies-guide-2026">Banff Guide →</Link></li>
          <li><Link to="/blog/canada-budget-travel-2026">Budget Guide →</Link></li>
        </ul>

        <BlogEndCTA
          title="Turn this into your Canada map."
          subtitle="Stamp each province. Free, forever."
        />
      </article>
    </BlogShell>
  );
}
