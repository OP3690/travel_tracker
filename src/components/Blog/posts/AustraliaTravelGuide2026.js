import React from 'react';
import { Link } from 'react-router-dom';
import { BlogShell, useBlogSEO, useRevealOnScroll } from '../BlogLayout';
import { BlogBarChart, BlogTable, BlogCallout, BlogStatGrid, BlogInlineCTA, BlogEndCTA } from '../BlogComponents';
import { BlogAustraliaMap } from '../BlogAustraliaMap';
import { getPostBySlug } from '../posts';

const SLUG = 'australia-travel-guide-2026';
const HIGHLIGHT = ['nsw', 'vic', 'qld-mainland', 'sa-mainland', 'wa', 'nt-mainland', 'tas-mainland', 'act'];

export default function AustraliaTravelGuide2026() {
  const post = getPostBySlug(SLUG);
  useBlogSEO({
    title: `${post.title} | StampYourMap Blog`,
    description: post.description,
    url: `/blog/${SLUG}`,
    image: post.ogImage,
    datePublished: post.datePublished,
    keywords: 'australia travel guide, australia 2026, visit australia, sydney, melbourne, great barrier reef, uluru, australia itinerary, eta visa',
  });
  useRevealOnScroll();

  return (
    <BlogShell>
      <article className="blog-article">
        <div className="blog-breadcrumbs">
          <Link to="/">Home</Link> / <Link to="/blog">Blog</Link> / <span>Australia Ultimate Guide</span>
        </div>
        <div className="blog-hero">
          <span className="blog-cat-chip">Australia · Travel Guide</span>
          <span className="blog-meta-sep">•</span><span>Published April 22, 2026</span>
          <span className="blog-meta-sep">•</span><span>{post.readMinutes} min read</span>
        </div>

        <h1>{post.heroEmoji} The Ultimate Australia Travel Guide (2026): 6 States, 2 Territories, One Vast Continent</h1>

        <p className="blog-lede">
          Australia is the world's 6th-largest country — roughly the size
          of the continental US — with a population of 26 million. That
          means distances are gigantic (Sydney to Perth is a 5-hour
          flight or 40-hour drive), but the sights that draw you here —
          Great Barrier Reef, Uluru, Sydney Harbour, the Great Ocean
          Road — are genuinely unforgettable. This is the 2026 guide.
        </p>

        <BlogStatGrid stats={[
          { value: '8', label: 'States + territories' },
          { value: '9.5M', label: '2025 international visitors' },
          { value: '20', label: 'UNESCO sites' },
          { value: '~A$250', label: 'Mid-range daily' },
        ]} />

        <BlogInlineCTA title="Planning Australia?" subtitle="Stamp every state + territory on your free map." href="/signup" />

        <h2 id="country">1. Australia in One Paragraph</h2>
        <p>
          Australia is divided into <strong>6 states</strong> (NSW, VIC, QLD,
          WA, SA, TAS) and <strong>2 territories</strong> (ACT, NT). For
          first-timers: <strong>NSW</strong> (Sydney + Blue Mountains),
          <strong> VIC</strong> (Melbourne + Great Ocean Road + Phillip Island),
          <strong> QLD</strong> (Great Barrier Reef + Gold Coast + Whitsundays),
          <strong> NT</strong> (Uluru + Kakadu + Darwin),
          <strong> TAS</strong> (Hobart + Cradle Mountain + wilderness),
          <strong> WA</strong> (Perth + Margaret River + Ningaloo Reef +
          Kimberley),<strong> SA</strong> (Adelaide + Barossa + Kangaroo
          Island). Each state is effectively a country in scale.
        </p>

        <BlogAustraliaMap
          regionIds={HIGHLIGHT}
          title="8 states + territories"
          subtitle="NSW · VIC · QLD · WA · SA · NT · TAS · ACT"
        />

        <h2 id="when">2. When to Visit</h2>
        <BlogBarChart
          title="Best months for Australia (2026 pleasantness index)"
          subtitle="Composite weighted for tropical-north vs southern-cities variance."
          max={100}
          data={[
            { label: 'Jan', value: 72, valueLabel: '72 (hot south, wet north)' },
            { label: 'Feb', value: 74, valueLabel: '74' },
            { label: 'Mar', value: 84, valueLabel: '84' },
            { label: 'Apr', value: 92, valueLabel: '92 ✓' },
            { label: 'May', value: 88, valueLabel: '88' },
            { label: 'Jun', value: 76, valueLabel: '76 (cool)' },
            { label: 'Jul', value: 74, valueLabel: '74' },
            { label: 'Aug', value: 78, valueLabel: '78' },
            { label: 'Sep', value: 92, valueLabel: '92 ✓' },
            { label: 'Oct', value: 94, valueLabel: '94 ✓' },
            { label: 'Nov', value: 88, valueLabel: '88' },
            { label: 'Dec', value: 76, valueLabel: '76 (crowded, summer school holidays)' },
          ]}
        />

        <p>
          <strong>September-November + March-May</strong> — shoulder
          seasons. Australia's southern cities (Sydney, Melbourne) are
          best spring + autumn; tropical north (Cairns, Darwin) is dry
          season May-October (the only time to do Kakadu or Kimberley).
        </p>

        <BlogCallout title="Tropical vs temperate split">
          <p>
            Above the Tropic of Capricorn (Cairns, Darwin, Broome): wet
            Nov-Apr, dry May-Oct. Visit north in the dry.
            Below (Sydney, Melbourne, Perth): summer Dec-Feb, winter
            Jun-Aug. Visit south in spring/autumn. The months that work
            for both: April + October.
          </p>
        </BlogCallout>

        <h2 id="visa">3. Visa & Entry (2026)</h2>
        <p>
          US, UK, EU, Canadian, NZ passport holders need an{' '}
          <strong>ETA (Electronic Travel Authority)</strong> — A$20 fee,
          apply online via the Australian ETA app (15 minutes), valid 12
          months + multiple entries. Stays up to 90 days per entry.
        </p>

        <h2 id="distances">4. Distances Are Massive</h2>
        <BlogTable
          caption="Key Australian distances (2026)"
          headers={['Route', 'Distance', 'Flight', 'Drive']}
          rows={[
            ['Sydney → Melbourne', '880 km', '1h25', '9 hr'],
            ['Sydney → Brisbane', '915 km', '1h30', '10 hr'],
            ['Sydney → Cairns', '2,400 km', '3 hr', '25 hr'],
            ['Sydney → Uluru', '2,850 km', '3h (via Alice)', 'not realistic'],
            ['Sydney → Perth', '3,935 km', '5 hr', '40 hr'],
            ['Melbourne → Great Ocean Road start', '100 km', '—', '1h30'],
            ['Cairns → Great Barrier Reef', 'varies', '—', '45 min boat'],
          ]}
        />

        <BlogCallout title="Fly, don't drive, between regions">
          <p>
            Unless you're doing a specific road trip (Great Ocean Road,
            Red Centre loop, East Coast Sydney→Cairns), Australia's
            distances are too big for cars. Budget airlines{' '}
            <strong>Jetstar + Virgin</strong> keep intercity flights at
            A$100-200.
          </p>
        </BlogCallout>

        <h2 id="budget">5. Budget (2026 AUD)</h2>
        <BlogTable
          caption="Daily spend per person (2026 AUD)"
          headers={['Category', 'Backpacker', 'Mid-range', 'Comfort']}
          rows={[
            ['Accommodation', 'A$35 (hostel)', 'A$170 (3-star)', 'A$400 (boutique)'],
            ['Food', 'A$40 (café + supermarket + 1 takeaway)', 'A$80 (restaurants)', 'A$180 (Mod Oz fine dining)'],
            ['Transport', 'A$10', 'A$20', 'A$40'],
            ['Activities', 'A$15', 'A$30', 'A$80'],
            ['Misc', 'A$5', 'A$5', 'A$15'],
            [<strong>Daily</strong>, <strong>A$105 (~$70 USD)</strong>, <strong>A$305 (~$200)</strong>, <strong>A$715 (~$470)</strong>],
          ]}
        />

        <h2 id="regions">6. Regions Ranked for First-Timers</h2>
        <BlogTable
          caption="Top 5 for a first Australia trip"
          headers={['#', 'State/Territory', 'Anchor city', 'Must-see']}
          rows={[
            ['1', <strong>New South Wales</strong>, 'Sydney', 'Opera House + Harbour Bridge + Bondi + Blue Mountains'],
            ['2', <strong>Victoria</strong>, 'Melbourne', 'Coffee culture + laneways + Great Ocean Road + Phillip Island penguins'],
            ['3', <strong>Queensland</strong>, 'Cairns + Brisbane', 'Great Barrier Reef + Whitsundays + Gold Coast'],
            ['4', <strong>Northern Territory</strong>, 'Alice Springs + Darwin', 'Uluru + Kakadu + Litchfield'],
            ['5', <strong>Tasmania</strong>, 'Hobart', 'Wilderness + MONA + Cradle Mountain + Freycinet'],
          ]}
        />

        <h2 id="food">7. Australian Food — Briefly</h2>
        <ol>
          <li><strong>Flat white / long black</strong> — Aussie coffee culture is world-class</li>
          <li><strong>Meat pie</strong> — the national snack; Harry's Café de Wheels (Sydney)</li>
          <li><strong>Barramundi</strong> — native white fish; grilled or fish-and-chips</li>
          <li><strong>Lamington</strong> — sponge cake + chocolate + coconut</li>
          <li><strong>Pavlova</strong> — meringue dessert (disputed with NZ)</li>
        </ol>

        <h2 id="mistakes">8. 12 First-Timer Mistakes</h2>
        <ol>
          <li>Trying to drive Sydney → Perth or Sydney → Cairns. Fly</li>
          <li>Visiting tropical Queensland in wet season (Dec-Mar)</li>
          <li>Underestimating sun intensity — strongest UV in the developed world</li>
          <li>Eating kangaroo and not trying more — it's lean and excellent</li>
          <li>Not tipping café baristas. Tipping is NOT expected anywhere</li>
          <li>Skipping Tasmania. It's the most underrated state</li>
          <li>Going to the reef without a good operator. Outer reefs &gt; inner reefs</li>
          <li>Expecting to see animals "in the wild" in cities. Go to Kangaroo Island or Phillip Island</li>
          <li>Not buying the opal ANZ pass for public transport</li>
          <li>Sydney-only or Melbourne-only trips. Both + QLD minimum</li>
          <li>Visiting Uluru as a day-trip. Needs 2-3 nights minimum</li>
          <li>Forgetting to swim between flagged zones. Aussie beaches have rips</li>
        </ol>

        <h2 id="faq">9. FAQ</h2>
        <h3>How long?</h3>
        <p>Minimum <strong>14 days</strong>. Sweet spot <strong>21 days</strong>.</p>
        <h3>Best month?</h3>
        <p><strong>April, September, or October</strong>.</p>
        <h3>Is Australia expensive?</h3>
        <p>Yes — mid-range. Between UK and Switzerland. Hostels ease backpacker budgets.</p>
        <h3>Safe?</h3>
        <p>Very. Sun + ocean rips + wildlife (the memorable ones) are the actual risks.</p>

        <h2 id="keep">Keep Reading</h2>
        <ul>
          <li><Link to="/blog/two-week-australia-itinerary-2026">2-Week Australia Itinerary →</Link></li>
          <li><Link to="/blog/best-australian-destinations-2026">10 Best Australian Destinations →</Link></li>
          <li><Link to="/blog/great-barrier-reef-guide-2026">Great Barrier Reef Guide →</Link></li>
          <li><Link to="/blog/australian-food-guide-2026">20 Aussie Dishes →</Link></li>
          <li><Link to="/blog/australia-budget-travel-2026">Australia Budget Guide →</Link></li>
        </ul>

        <BlogEndCTA
          title="Stamp every Aussie state + territory."
          subtitle="8 regions. Free forever. No credit card."
        />
      </article>
    </BlogShell>
  );
}
