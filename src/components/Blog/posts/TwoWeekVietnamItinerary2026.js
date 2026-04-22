import React from 'react';
import { Link } from 'react-router-dom';
import { BlogShell, useBlogSEO, useRevealOnScroll } from '../BlogLayout';
import { BlogTable, BlogCallout, BlogStatGrid, BlogInlineCTA, BlogEndCTA, BlogBarChart } from '../BlogComponents';
import { BlogVietnamMap } from '../BlogVietnamMap';
import { getPostBySlug } from '../posts';

const SLUG = 'two-week-vietnam-itinerary-2026';
const ROUTE = ['hanoi', 'quangninh', 'tthue', 'quangnam', 'hcm', 'kiengiang'];

export default function TwoWeekVietnamItinerary2026() {
  const post = getPostBySlug(SLUG);
  useBlogSEO({
    title: `${post.title} | StampYourMap Blog`,
    description: post.description,
    url: `/blog/${SLUG}`,
    image: post.ogImage,
    datePublished: post.datePublished,
    keywords: 'vietnam itinerary 2 weeks, hanoi halong hoian saigon mekong, vietnam 14 days, vietnam trip plan',
  });
  useRevealOnScroll();

  return (
    <BlogShell>
      <article className="blog-article">
        <div className="blog-breadcrumbs"><Link to="/">Home</Link> / <Link to="/blog">Blog</Link> / <span>2-Week Vietnam Itinerary</span></div>
        <div className="blog-hero">
          <span className="blog-cat-chip">Vietnam · Itinerary</span>
          <span className="blog-meta-sep">•</span><span>Published April 22, 2026</span>
          <span className="blog-meta-sep">•</span><span>{post.readMinutes} min read</span>
        </div>

        <h1>{post.heroEmoji} The Perfect 2-Week Vietnam Itinerary: Hanoi → Halong → Hoi An → Saigon → Mekong (2026)</h1>

        <p className="blog-lede">
          14 days covering Vietnam north-to-south — Hanoi's Old Quarter,
          Halong Bay's limestone islands, Hue's imperial history, Hoi
          An's lanterns, Saigon's chaos, Mekong Delta's floating markets.
          Two internal flights, one overnight train, zero wasted days.
        </p>

        <BlogStatGrid stats={[{value: '14', label: 'Days'},{value: '6', label: 'Provinces'},{value: '2', label: 'Internal flights'},{value: '$750', label: 'Mid-range total'}]} />

        <BlogInlineCTA title="Track each stop." subtitle="Free map — 63 provinces." href="/signup" />

        <h2 id="route">1. The Route</h2>
        <BlogVietnamMap regionIds={ROUTE} title="Hanoi → Halong → Hue → Hoi An → HCM → Mekong" subtitle="North-to-south Vietnam grand tour." />

        <h2 id="day-by-day">2. Day-by-Day</h2>
        <BlogTable caption="Recommended plan" headers={['Day', 'Base', 'What you\'re doing']} rows={[
          ['1', <strong>Hanoi</strong>, 'Arrive HAN; Hoan Kiem Lake walk + street food tour'],
          ['2', <strong>Hanoi</strong>, 'Old Quarter + Ho Chi Minh Mausoleum + Temple of Literature'],
          ['3', <strong>Halong Bay (overnight cruise)</strong>, 'Bus from Hanoi (3h); overnight boat in Bai Tu Long Bay'],
          ['4', <strong>Halong → Ninh Binh</strong>, 'Back to shore; bus to Ninh Binh; Tam Coc boat ride'],
          ['5', <strong>Hue</strong>, 'Flight to Hue or overnight train; Imperial Citadel'],
          ['6', <strong>Hoi An</strong>, 'Drive Hai Van Pass (3h) via Da Nang; evening lanterns'],
          ['7', <strong>Hoi An</strong>, 'Ancient town walking tour + tailor pickup + cooking class'],
          ['8', <strong>Hoi An / My Son</strong>, 'My Son Cham ruins day-trip + An Bang Beach afternoon'],
          ['9', <strong>Ho Chi Minh City</strong>, 'Flight DAD → SGN (1h30); War Remnants Museum + Ben Thanh market'],
          ['10', <strong>Cu Chi Tunnels</strong>, 'Half-day tunnels + temple afternoon'],
          ['11', <strong>Mekong Delta</strong>, 'Bus to Can Tho (3h); Cai Rang floating market'],
          ['12', <strong>Mekong Delta</strong>, 'Farms + Khmer temples + return HCM'],
          ['13', <strong>HCM City</strong>, 'Rooftop bar + shopping + Notre-Dame Cathedral'],
          ['14', <strong>HCM → home</strong>, 'SGN departure'],
        ]} />

        <BlogCallout title="Halong Bay cruise tip">
          <p>
            <strong>Book Bai Tu Long Bay, not main Halong Bay</strong>. Bai
            Tu Long is adjacent but with 95% fewer boats. Reputable
            overnight operators: <em>Indochina Junk, Bhaya Cruises,
            Orchid Cruises</em>. Expect $100-250/person for overnight.
          </p>
        </BlogCallout>

        <h2 id="transit">3. Internal Transit (2026 USD)</h2>
        <BlogTable caption="Segments" headers={['Day', 'Route', 'Mode', 'Cost']} rows={[
          ['3', 'Hanoi → Halong', 'Shuttle + cruise transfer', 'Included in cruise'],
          ['5', 'Hanoi/Ninh Binh → Hue', 'Overnight train OR flight', '$40-80'],
          ['6', 'Hue → Hoi An', 'Private car via Hai Van Pass', '$65'],
          ['9', 'Da Nang → HCM City', 'Flight (1h30)', '$40-90'],
          ['11', 'HCM → Can Tho (Mekong)', 'Bus (3h30)', '$12-18'],
          [<strong>Total transit</strong>, '', '', <strong>$160-250</strong>],
        ]} />

        <BlogInlineCTA title="Stamp your route." subtitle="Free map — 63 provinces." href="/signup" />

        <h2 id="lodging">4. Lodging</h2>
        <BlogTable caption="Accommodations per base" headers={['Base', 'Budget', 'Mid-range', 'Splurge']} rows={[
          ['Hanoi', 'Hanoi Backpackers', 'La Siesta Diamond', 'Sofitel Legend Metropole'],
          ['Halong (on cruise)', 'Indochina Sails', 'Bhaya Classic', 'Paradise Elegance'],
          ['Hoi An', 'Tribee Ede Hostel', 'Anantara Hoi An', 'Four Seasons Nam Hai'],
          ['HCM City', 'Saigon Backpackers Hostel', 'Saigon Prince Hotel', 'Park Hyatt Saigon'],
        ]} />

        <h2 id="cost">5. Total Cost</h2>
        <BlogBarChart title="14-day Vietnam (mid-range $750)" subtitle="Per-person, excl. international flight." max={100} unit="%" data={[
          { label: 'Accommodation', value: 32, valueLabel: '32%' },
          { label: 'Food', value: 20, valueLabel: '20%' },
          { label: 'Flights + ground', value: 16, valueLabel: '16%' },
          { label: 'Halong cruise', value: 14, valueLabel: '14%' },
          { label: 'Activities + tours', value: 12, valueLabel: '12%' },
          { label: 'Buffer', value: 6, valueLabel: '6%' },
        ]} />

        <h2 id="faq">6. FAQ</h2>
        <h3>Is this 14-day pace sustainable or rushed?</h3>
        <p>
          <strong>The pace is moderate</strong> — Vietnam is a long country (1,650 km north to south), so 2-3 internal flights are unavoidable and eat half a day each. Build in 1 buffer day mid-trip for laundry + slow meals. Travelers over 55 or with kids should drop Sapa or Mekong Delta and stretch the core 4 cities over 16-18 days.
        </p>
        <h3>Can I compress this into 10 days?</h3>
        <p>
          <strong>Yes — skip Ninh Binh or Mekong Delta</strong>. A clean 10-day core: Hanoi (3) → Halong Bay (1 overnight) → Hoi An (3) → HCMC (3). All the icons, less rushed. 7-day ultra-compact: Hanoi (2) + Halong (1) + Hoi An (2) + HCMC (2), but this genuinely misses the point.
        </p>
        <h3>What is the best month for this itinerary?</h3>
        <p>
          <strong>March-April or October-November</strong> — these are the only months with consistent weather across all three regions (north, center, south). Avoid July-August (wet, hot, domestic crowds peak) and January-February if Tet falls mid-trip (many businesses close 5-7 days). April is the overall best.
        </p>
        <h3>Should I book all internal flights at once?</h3>
        <p>
          <strong>Book separately on Vietjet/Bamboo Airways direct</strong> (US$30-70 per leg) and save US$50-100 vs bundling with international. Keep flights within 24-hour buffers so one delay does not cascade. Carry-on on Vietjet is strict — <strong>7kg weight limit and they weigh bags at the gate</strong>; check in heavier bags for US$10-25.
        </p>
        <h3>Halong Bay cruise — how do I pick a good one?</h3>
        <p>
          <strong>Book into Bai Tu Long Bay (not Halong) for less-crowded waters</strong> — Indochina Junk, Paradise Elegance, and Heritage Line are premium (US$180-350/night). Avoid US$60/day budget cruises; water quality + safety records are poor. Book 2-4 weeks ahead; see our <Link to="/blog/halong-bay-hoi-an-guide-2026">Halong + Hoi An guide</Link> for operator deep-dive.
        </p>
        <h3>Carry-on only or checked bag?</h3>
        <p>
          <strong>Carry-on only is strongly recommended</strong> — 3 domestic flights on Vietjet/Bamboo with strict 7kg carry-on limits (they weigh at the gate), laundry available everywhere for US$3-5/kg, and hot humid climate means minimal clothing. A 30-40L bag + small daypack is perfect for 14 days.
        </p>
        <h3>When should I book everything?</h3>
        <p>
          <strong>International flights 4-6 months ahead, Halong cruise 2-4 weeks, hotels 4-8 weeks, flights within Vietnam 2-6 weeks (prices do not drop closer)</strong>. Tet period (late Jan-Feb) needs 3-6 months for anything. Hoi An tailors for custom clothing: 3-5 business days minimum.
        </p>
        <h3>What if monsoon or typhoon disrupts Central Vietnam?</h3>
        <p>
          <strong>Hoi An floods October-November almost yearly</strong> — streets become canals (some find it charming, others frustrating). Typhoons can cancel flights to Danang for 24-72 hours. Backup: spend extra days in Hanoi or HCMC, switch Hoi An for Danang beach resorts (higher ground), or add Sapa to replace Hoi An.
        </p>
        <h3>Doable with kids or grandparents?</h3>
        <p>
          <strong>Yes — Vietnam is family-friendly</strong>. Kids love water-puppet shows in Hanoi, Phu Quoc beaches, Mekong river boats, and Hoi An lantern crafts. For grandparents: slow the pace by 3-4 days, use private drivers between cities (US$60-100/day), stay in international-brand hotels, avoid the motorbike-heavy streets during rush hour.
        </p>
        <h3>Solo travelers or couples — any differences?</h3>
        <p>
          <strong>Solo travelers: Hanoi Old Quarter and HCMC District 1 have excellent social hostels</strong> (Vietnam Backpacker Hostels chain, US$8-12/night) with group tours included. Couples save 30-40% on lodging by default. Hoi An homestays are ideal for couples (US$40-70/night with breakfast).
        </p>
        <h3>Can I reverse the route HCMC-first?</h3>
        <p>
          Yes — <strong>HCMC arrivals are often cheaper from Australia, Singapore, and US West Coast</strong> than Hanoi. Reverse: HCMC (3) → Mekong (1) → Hoi An (3) → Hue (1) → Ninh Binh (1) → Halong (1) → Hanoi (3). Pacing identical. Finishing in Hanoi gives stronger cultural ending than urban HCMC.
        </p>
        <h3>Best travel insurance for Vietnam?</h3>
        <p>
          <strong>Essential — Vietnamese hospital care is cheap but Bangkok/Singapore evacuation costs US$20,000-50,000</strong>. World Nomads, SafetyWing, or Chase Sapphire Reserve all work. Ensure scooter/motorbike riding is explicitly covered if you plan to ride (most basic policies exclude it).
        </p>
        <h3>What about currency and ATMs on the move?</h3>
        <p>
          <strong>Carry 500,000-2,000,000 VND cash (US$20-80) daily</strong> — most street food, homestays, small cafés are cash-only. ATMs at every city but charge 50,000 VND + your home bank fees. Wise, Revolut, Charles Schwab cards at Vietnamese bank ATMs (Vietcombank, Techcombank, ACB) have lowest fees.
        </p>
        <h3>Cooking classes — where and when?</h3>
        <p>
          <strong>Hoi An is Vietnam{"'"}s cooking-class capital</strong> — Red Bridge, Morning Glory, Tra Que Village classes (US$30-55) include market tour + 4-5 dishes + lunch. Hanoi offers pho + bún chả specialist classes at Hanoi Cooking Centre. Book 2-3 days ahead. Ho Chi Minh City has Vietnam Cookery Centre with southern cuisine focus.
        </p>

        <h2 id="keep">Keep Reading</h2>
        <ul>
          <li><Link to="/blog/vietnam-travel-guide-2026">Ultimate Vietnam Guide →</Link></li>
          <li><Link to="/blog/best-vietnam-destinations-2026">10 Best Destinations →</Link></li>
          <li><Link to="/blog/halong-bay-hoi-an-guide-2026">Halong + Hoi An Guide →</Link></li>
          <li><Link to="/blog/vietnam-budget-travel-2026">Budget Guide →</Link></li>
        </ul>

        <BlogEndCTA title="Turn this into your Vietnam map." subtitle="Stamp each province. Free, forever." />
      </article>
    </BlogShell>
  );
}
