import React from 'react';
import { Link } from 'react-router-dom';
import { BlogShell, useBlogSEO, useRevealOnScroll } from '../BlogLayout';
import { BlogBarChart, BlogTable, BlogCallout, BlogStatGrid, BlogInlineCTA, BlogEndCTA } from '../BlogComponents';
import { BlogCanadaMap } from '../BlogCanadaMap';
import { getPostBySlug } from '../posts';

const SLUG = 'canada-travel-guide-2026';
const HIGHLIGHT = ['on', 'qc', 'bc', 'ab', 'ns', 'nl', 'yt'];

export default function CanadaTravelGuide2026() {
  const post = getPostBySlug(SLUG);
  useBlogSEO({
    title: `${post.title} | StampYourMap Blog`,
    description: post.description,
    url: `/blog/${SLUG}`,
    image: post.ogImage,
    datePublished: post.datePublished,
    keywords: 'canada travel guide, canada 2026, visit canada, toronto, vancouver, montreal, banff, canada itinerary, eta canada',
  });
  useRevealOnScroll();

  return (
    <BlogShell>
      <article className="blog-article">
        <div className="blog-breadcrumbs">
          <Link to="/">Home</Link> / <Link to="/blog">Blog</Link> / <span>Canada Ultimate Guide</span>
        </div>
        <div className="blog-hero">
          <span className="blog-cat-chip">Canada · Travel Guide</span>
          <span className="blog-meta-sep">•</span><span>Published April 22, 2026</span>
          <span className="blog-meta-sep">•</span><span>{post.readMinutes} min read</span>
        </div>

        <h1>{post.heroEmoji} The Ultimate Canada Travel Guide (2026): 10 Provinces, 3 Territories, One Vast Country</h1>

        <p className="blog-lede">
          Canada is the world's 2nd-largest country by area — 10
          provinces + 3 territories spanning 5,500 km east-to-west. The
          travel core: Rockies wilderness, French-Canadian Quebec,
          world-class cities, and some of the cleanest nature on earth.
          Here's the 2026 guide.
        </p>

        <BlogStatGrid stats={[
          { value: '13', label: 'Provinces + territories' },
          { value: '22M', label: '2025 visitors' },
          { value: '20', label: 'UNESCO sites' },
          { value: '~C$220', label: 'Mid-range daily' },
        ]} />

        <BlogInlineCTA title="Planning Canada?" subtitle="Stamp every province + territory — free map." href="/signup" />

        <h2 id="country">1. Canada in One Paragraph</h2>
        <p>
          Canada has <strong>10 provinces + 3 territories</strong>. Travel
          priorities: <strong>Ontario</strong> (Toronto + Niagara + Ottawa),
          <strong> Quebec</strong> (Montreal + Quebec City — French
          Canada), <strong>British Columbia</strong> (Vancouver, Whistler,
          Tofino, Victoria), <strong>Alberta</strong> (Banff + Jasper +
          Calgary), <strong>Nova Scotia</strong> (Halifax + Cabot Trail),
          <strong> Newfoundland</strong> (icebergs + whales),
          <strong> Yukon</strong> (aurora + wilderness).
        </p>

        <BlogCanadaMap
          regionIds={HIGHLIGHT}
          title="7 provinces/territories every first-timer should know"
          subtitle="Ontario · Quebec · BC · Alberta · Nova Scotia · Newfoundland · Yukon"
        />

        <h2 id="when">2. When to Visit</h2>
        <BlogBarChart
          title="Best months for Canada (2026)"
          max={100}
          data={[
            { label: 'Jan', value: 48, valueLabel: '48 (ski season)' },
            { label: 'Feb', value: 52, valueLabel: '52' },
            { label: 'Mar', value: 58, valueLabel: '58 (late ski)' },
            { label: 'Apr', value: 64, valueLabel: '64' },
            { label: 'May', value: 82, valueLabel: '82' },
            { label: 'Jun', value: 94, valueLabel: '94 ✓' },
            { label: 'Jul', value: 92, valueLabel: '92 ✓' },
            { label: 'Aug', value: 90, valueLabel: '90' },
            { label: 'Sep', value: 96, valueLabel: '96 ✓ (fall colors)' },
            { label: 'Oct', value: 82, valueLabel: '82' },
            { label: 'Nov', value: 54, valueLabel: '54' },
            { label: 'Dec', value: 60, valueLabel: '60' },
          ]}
        />

        <p>
          <strong>June-September</strong> = high season everywhere.
          <strong> September</strong> adds Ontario/Quebec fall foliage —
          peak mid-month. <strong>January-March</strong> for Whistler
          skiing, Yukon aurora, Quebec winter carnival.
        </p>

        <BlogCallout title="Wildfires changing the game">
          <p>
            2023-2025 wildfires have affected Rockies visibility in
            August. Smoke from BC + Alberta fires can reduce Banff
            mountain views to near-zero. Budget flexibility; consider
            June or September instead of August.
          </p>
        </BlogCallout>

        <h2 id="visa">3. Visa + Entry (2026)</h2>
        <p>
          US citizens: passport only. UK/EU/AU/NZ: need an{' '}
          <strong>eTA (Electronic Travel Authorization)</strong> — C$7,
          online, 10-minute application, 5-year validity.
        </p>

        <h2 id="distances">4. Distances Are Massive</h2>
        <BlogTable
          caption="Canadian distances (2026)"
          headers={['Route', 'Distance', 'Flight', 'Drive/Train']}
          rows={[
            ['Toronto → Montreal', '540 km', '1h15', '5h drive / 5h train'],
            ['Toronto → Vancouver', '3,360 km', '4h30', '4 days drive'],
            ['Montreal → Quebec City', '250 km', '45 min', '3h drive / 3h train'],
            ['Vancouver → Banff', '850 km', '1h15', '10h drive'],
            ['Calgary → Banff', '130 km', '—', '1h30 drive'],
            ['Toronto → Halifax', '1,800 km', '2h30', '18h drive'],
          ]}
        />

        <BlogInlineCTA title="Cross-Canada trip?" subtitle="Stamp each province — free map." href="/signup" />

        <h2 id="budget">5. Budget (2026 CAD)</h2>
        <BlogTable
          caption="Daily per person (CAD)"
          headers={['Category', 'Backpacker', 'Mid-range', 'Comfort']}
          rows={[
            ['Accommodation', 'C$45 (hostel)', 'C$180 (3-star)', 'C$400 (boutique)'],
            ['Food', 'C$40 (cafés + supermarket)', 'C$75 (restaurants)', 'C$150 (fine dining)'],
            ['Transport', 'C$15', 'C$25', 'C$50'],
            ['Activities', 'C$15', 'C$30', 'C$80'],
            ['Misc', 'C$5', 'C$5', 'C$15'],
            [<strong>Daily</strong>, <strong>C$120 (~$85)</strong>, <strong>C$315 (~$225)</strong>, <strong>C$695 (~$495)</strong>],
          ]}
        />

        <h2 id="regions">6. Regions Ranked for First-Timers</h2>
        <BlogTable
          caption="Top 5 for first Canada trip"
          headers={['#', 'Region', 'Anchor city', 'Highlight']}
          rows={[
            ['1', <strong>British Columbia</strong>, 'Vancouver + Whistler', 'Rockies, Pacific coast, ski resorts, Victoria'],
            ['2', <strong>Alberta</strong>, 'Banff + Jasper', 'Canadian Rockies — Lake Louise, Moraine Lake'],
            ['3', <strong>Quebec</strong>, 'Montreal + Quebec City', 'French heritage, old town, food scene'],
            ['4', <strong>Ontario</strong>, 'Toronto + Niagara + Ottawa', 'Biggest city + waterfall + capital'],
            ['5', <strong>Nova Scotia</strong>, 'Halifax + Cape Breton', 'Cabot Trail + maritime culture'],
          ]}
        />

        <h2 id="food">7. Canadian Food — 5 Musts</h2>
        <ol>
          <li><strong>Poutine</strong> — fries + cheese curds + gravy; Quebec invention</li>
          <li><strong>Montreal Bagel</strong> — wood-fired, denser, sweeter than NY</li>
          <li><strong>Butter Tart</strong> — Ontario pastry with gooey filling</li>
          <li><strong>Tourtière</strong> — Quebec meat pie</li>
          <li><strong>Maple Everything</strong> — bacon, ice cream, pancakes, whisky</li>
        </ol>
        <p>Full: <Link to="/blog/canadian-food-guide-2026">20 Canadian dishes by region</Link>.</p>

        <h2 id="mistakes">8. 12 First-Timer Mistakes</h2>
        <ol>
          <li>Trying to drive coast-to-coast in 2 weeks</li>
          <li>Skipping Quebec. It's a different cultural experience</li>
          <li>Ignoring wildlife safety (bears, elk) in the Rockies</li>
          <li>Tipping less than 15-18% at restaurants</li>
          <li>Not speaking any French in Quebec (even "Bonjour" helps)</li>
          <li>Underestimating winter cold. -25°C is normal</li>
          <li>Flying to Banff instead of Calgary + driving</li>
          <li>Not buying a Parks Canada Discovery Pass (C$75 for unlimited park entries)</li>
          <li>Missing Niagara from the Canadian side (better views than US side)</li>
          <li>Cashing in foreign currency at airports. Use Wise/Revolut</li>
          <li>Booking Banff without reserving Moraine Lake shuttle 2-3 months out</li>
          <li>Arriving in August expecting clear mountain views (wildfire smoke)</li>
        </ol>

        <h2 id="faq">9. FAQ</h2>
        <h3>How long?</h3><p>Minimum <strong>10-14 days</strong>; ideally east OR west, not both.</p>
        <h3>Best month?</h3><p><strong>June or September</strong>.</p>
        <h3>Most underrated?</h3><p><strong>Newfoundland + Cape Breton</strong>.</p>
        <h3>Is Canada safe?</h3><p>Very. One of the world\'s safest. Wildlife + weather are actual risks.</p>

        <h2 id="keep">Keep Reading</h2>
        <ul>
          <li><Link to="/blog/two-week-canada-itinerary-2026">2-Week Canada Itinerary →</Link></li>
          <li><Link to="/blog/best-canada-destinations-2026">10 Best Canadian Destinations →</Link></li>
          <li><Link to="/blog/banff-canadian-rockies-guide-2026">Banff Complete Guide →</Link></li>
          <li><Link to="/blog/canadian-food-guide-2026">20 Canadian Dishes →</Link></li>
          <li><Link to="/blog/canada-budget-travel-2026">Canada Budget Guide →</Link></li>
        </ul>

        <BlogEndCTA
          title="Stamp every province + territory."
          subtitle="13 regions. Free forever."
        />
      </article>
    </BlogShell>
  );
}
