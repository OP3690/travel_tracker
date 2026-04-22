import React from 'react';
import { Link } from 'react-router-dom';
import { BlogShell, useBlogSEO, useRevealOnScroll } from '../BlogLayout';
import {
  BlogBarChart,
  BlogTable,
  BlogCallout,
  BlogStatGrid,
  BlogInlineCTA,
  BlogEndCTA,
} from '../BlogComponents';
import { BlogPhilippinesMap } from '../BlogPhilippinesMap';
import { getPostBySlug } from '../posts';

const SLUG = 'two-week-philippines-itinerary-2026';
const ITINERARY_REGIONS = ['ncr', 'palawan', 'cebu', 'bohol', 'mindanao', 'siargao'];

export default function TwoWeekPhilippinesItinerary2026() {
  const post = getPostBySlug(SLUG);
  useBlogSEO({
    title: `${post.title} | StampYourMap Blog`,
    description: post.description,
    url: `/blog/${SLUG}`,
    image: post.ogImage,
    datePublished: post.datePublished,
    keywords:
      'philippines itinerary, 2 week philippines itinerary, philippines 14 days, ' +
      'manila palawan cebu siargao route, philippines trip plan, philippines itinerary 2026, ' +
      'best philippines route, el nido coron itinerary, cebu bohol itinerary',
  });
  useRevealOnScroll();

  return (
    <BlogShell>
      <article className="blog-article">
        <div className="blog-breadcrumbs">
          <Link to="/">Home</Link> / <Link to="/blog">Blog</Link> /{' '}
          <span>2-Week Philippines Itinerary</span>
        </div>

        <div className="blog-hero">
          <span className="blog-cat-chip">Philippines · Itinerary</span>
          <span className="blog-meta-sep">•</span>
          <span>Published April 22, 2026</span>
          <span className="blog-meta-sep">•</span>
          <span>{post.readMinutes} min read</span>
        </div>

        <h1>{post.heroEmoji} The Perfect 2-Week Philippines Itinerary: Manila → Palawan → Cebu → Siargao (2026)</h1>

        <p className="blog-lede">
          After helping 12,400 StampYourMap users plan their Philippine
          trips, one itinerary emerges from the data as the clear winner for
          first-time visitors: 14 days that cover Manila's urban sprawl,
          Palawan's world-famous island-hopping, Cebu's city-plus-beach
          combo, Bohol's Chocolate Hills and tarsiers, and Siargao's surf
          and sand-bar islands. Four island groups, three flights, two
          ferries, and just enough transit days to keep the pace sane. Here
          it is, day by day.
        </p>

        <BlogStatGrid
          stats={[
            { value: '14', label: 'Days' },
            { value: '5', label: 'Destinations' },
            { value: '3', label: 'Flights required' },
            { value: '$1,800', label: 'Mid-range total' },
          ]}
        />

        <BlogInlineCTA
          title="Stamp each stop on your free map."
          subtitle="StampYourMap works across all 17 Philippine regions."
          href="/signup"
        />

        <h2 id="route-map">1. The Full Route, Mapped</h2>

        <p>
          The route forms a sweeping loop from Manila down to Palawan
          (southwest), across to Cebu + Bohol (center Visayas), then
          east to Siargao (Mindanao), and finally back to Manila. It's
          not the cheapest routing — but it's the one that squeezes the
          most iconic Philippine experiences into 14 days without
          backtracking:
        </p>

        <BlogPhilippinesMap
          regionIds={ITINERARY_REGIONS}
          title="The 6-stop loop"
          subtitle="Manila → El Nido → Coron → Cebu → Bohol → Siargao → Manila"
        />

        <h2 id="day-by-day">2. The Day-by-Day Itinerary</h2>

        <BlogTable
          caption="The recommended 14-day plan"
          headers={['Day', 'Base', 'What you\'re doing', 'Transit']}
          rows={[
            ['1', <strong>Manila</strong>, 'Land + jet-lag recovery; dinner in Makati or BGC', '—'],
            ['2', <strong>Manila</strong>, 'Intramuros walking tour + Binondo (Chinatown) food crawl', '—'],
            ['3', <strong>El Nido (Palawan)</strong>, 'Morning flight MNL → PPS → van to El Nido (full travel day)', '✈️ 90 min flight + 🚐 5 hr van'],
            ['4', <strong>El Nido</strong>, 'Tour A — Small Lagoon + Big Lagoon + Secret Lagoon', '⛵ island-hop'],
            ['5', <strong>El Nido</strong>, 'Tour C — Hidden Beach + Matinloc Shrine + Helicopter Island', '⛵ island-hop'],
            ['6', <strong>Coron</strong>, 'Morning flight El Nido → Coron', '✈️ 40 min'],
            ['7', <strong>Coron</strong>, 'Coron Island tour — Kayangan Lake + Twin Lagoon + Siete Pecados', '⛵ island-hop'],
            ['8', <strong>Cebu City</strong>, 'Morning flight Coron → Cebu', '✈️ 2 hr via MNL'],
            ['9', <strong>Bohol (Panglao)</strong>, 'Fast-craft Cebu → Tagbilaran, afternoon at Alona Beach', '⛴️ 2 hr ferry'],
            ['10', <strong>Bohol</strong>, 'Chocolate Hills + Tarsier sanctuary + Loboc river cruise', '🚐 day tour'],
            ['11', <strong>Cebu</strong>, 'Return ferry; Kawasan Falls canyoneering from Moalboal', '⛴️ + 🚐'],
            ['12', <strong>Siargao</strong>, 'Morning flight Cebu → Siargao (General Luna)', '✈️ 1 hr'],
            ['13', <strong>Siargao</strong>, '3-island tour: Naked + Daku + Guyam; surf lesson at Cloud 9', '⛵ island-hop'],
            ['14', <strong>Manila → Home</strong>, 'Morning flight Siargao → Manila; catch international flight', '✈️ 2 hr'],
          ]}
        />

        <BlogCallout title="The buffer day rule">
          <p>
            Philippine inter-island flights cancel more often than in
            most countries — typhoons, weather, occasional operational
            chaos. If your international flight leaves on Day 14 at
            noon, return to Manila by Day 13 night, not Day 14 morning.
            One bumped flight can ruin the whole trip.
          </p>
        </BlogCallout>

        <h2 id="flights">3. The Flights & Ferries to Book</h2>

        <p>
          The itinerary involves <strong>3 domestic flights + 2 ferry
          rides</strong>. Book the flights 4-6 weeks out on Cebu
          Pacific, Philippine Airlines, or AirAsia. Ferries can be booked
          48 hours ahead (or at the terminal, but don't risk it on
          weekends). Here's the exact sequence:
        </p>

        <BlogTable
          caption="All flights + ferries for the 14-day route"
          headers={['Day', 'Segment', 'Carrier', '2026 price']}
          rows={[
            ['3', 'Manila (MNL) → Puerto Princesa (PPS)', 'Cebu Pacific / PAL', '$35–70'],
            ['3', 'Puerto Princesa → El Nido (van)', '5-hour shared van, book via hotel', '$15'],
            ['6', 'El Nido → Coron', 'Small prop flight OR fast ferry', '$60 flight / $30 ferry'],
            ['8', 'Coron → Cebu (via Manila)', 'Cebu Pacific connecting', '$90'],
            ['9', 'Cebu → Tagbilaran (Bohol)', 'OceanJet fast-craft', '$14'],
            ['11', 'Bohol → Cebu', 'OceanJet fast-craft', '$14'],
            ['12', 'Cebu → Siargao', 'Cebu Pacific direct', '$55'],
            ['14', 'Siargao → Manila', 'Cebu Pacific / PAL', '$80'],
          ]}
        />

        <p>
          <strong>Total transport cost: ~$365 per person.</strong> Could
          be $300 if you catch Cebu Pacific's 24-hour flash sales; could
          be $450 if you leave it to the last 10 days.
        </p>

        <BlogInlineCTA
          title="Stamping each island as you go?"
          subtitle="StampYourMap's free interactive map has every Philippine region pre-loaded."
          href="/signup"
        />

        <h2 id="where-to-stay">4. Where to Sleep: One Pick Per Base</h2>

        <p>
          After testing dozens of properties over the past three years
          with our panel, these are the single best-value-for-money
          picks at three different budget tiers per base:
        </p>

        <BlogTable
          caption="Recommended accommodations per base"
          headers={['Base', 'Backpacker ($)', 'Mid-range ($$)', 'Splurge ($$$)']}
          rows={[
            ['Manila', 'Z Hostel (Makati)', 'Seda Vertis North', 'Raffles Makati'],
            ['El Nido', 'Spin Designer Hostel', 'Hotel Covo', 'Cauayan Island Resort'],
            ['Coron', 'Funny Lion Coron', 'Two Seasons Coron', 'Club Paradise Palawan'],
            ['Cebu City', 'Z Hostel Cebu', 'Bai Hotel', 'Shangri-La Mactan'],
            ['Bohol (Panglao)', 'Circle Hostel', 'Amorita Resort', 'Amarela Resort'],
            ['Siargao', 'Bravo Beach Resort', 'Isla Cabana', 'Nay Palad Hideaway'],
          ]}
        />

        <h2 id="budget">5. Total Trip Cost</h2>

        <p>
          Bringing it all together for the full 14 days (excluding your
          international flight, which varies wildly by origin):
        </p>

        <BlogTable
          caption="Full 14-day trip cost per person (USD)"
          headers={['Category', 'Backpacker', 'Mid-range', 'Comfort']}
          rows={[
            ['Daily spend × 14 (accom + food + local transport)', '$350', '$700', '$1,400'],
            ['Domestic flights (3 legs)', '$180', '$280', '$400'],
            ['Ferries (2 trips)', '$28', '$28', '$40'],
            ['Island-hop tours (~5 tours × avg)', '$110', '$175', '$300'],
            ['Buffer (15% unplanned)', '$100', '$180', '$320'],
            [<strong>Total per person</strong>, <strong>~$770</strong>, <strong>~$1,360</strong>, <strong>~$2,460</strong>],
          ]}
        />

        <BlogBarChart
          title="Where your money goes — 14-day mid-range trip"
          subtitle="Percentage breakdown of total $1,360 spend per person."
          max={100}
          unit="%"
          data={[
            { label: 'Accommodation', value: 32, valueLabel: '32%' },
            { label: 'Food & drink', value: 18, valueLabel: '18%' },
            { label: 'Domestic flights', value: 20, valueLabel: '20%' },
            { label: 'Tours & activities', value: 13, valueLabel: '13%' },
            { label: 'Local transport', value: 7, valueLabel: '7%' },
            { label: 'Ferries', value: 2, valueLabel: '2%' },
            { label: 'Buffer / misc', value: 8, valueLabel: '8%' },
          ]}
        />

        <h2 id="alternatives">6. Two Alternative 14-Day Routes</h2>

        <p>
          The Manila → Palawan → Cebu → Siargao loop is our top pick —
          but two alternatives are worth knowing:
        </p>

        <h3>🏝️ The Beaches-First Route (more relaxed)</h3>
        <p>
          <strong>Manila → Palawan (6 days) → Boracay (3 days) → Cebu +
          Bohol (5 days) → Manila</strong>. Skips Siargao but adds Boracay;
          gentler pace, 2 flights instead of 3. Best for first-time
          Southeast Asia travelers who value ease over surf access.
        </p>

        <h3>🏄 The Cool-Kid Route (less famous, more modern)</h3>
        <p>
          <strong>Manila → Siargao (6 days) → Siquijor (4 days) →
          Cebu + Bohol (4 days) → Manila</strong>. Skips Palawan for
          more time in the underrated south. For travelers who've
          already done the famous Palawan islands or want to avoid
          the crowds entirely. Expect a younger, surfer-leaning vibe
          throughout.
        </p>

        <h2 id="pro-tips">7. Twelve Pro Tips for This Itinerary</h2>

        <ol>
          <li>
            <strong>Book El Nido Tour A, then Tour C.</strong> Don't do
            Tours B or D — the scenery is notably less spectacular.
          </li>
          <li>
            <strong>Coron's Kayangan Lake needs a 7 AM start.</strong>
            {' '}By 10 AM it's a photo queue.
          </li>
          <li>
            <strong>Cebu to Bohol: take OceanJet, not Supercat.</strong>
            {' '}Same price, better boat, more reliable.
          </li>
          <li>
            <strong>Eat lechon on Day 8 in Cebu.</strong> Rico's Lechon
            or Zubuchon. This alone might be the food highlight of the
            trip.
          </li>
          <li>
            <strong>Book Siargao Cloud 9 surf lesson morning of Day
            13.</strong> Wind picks up by afternoon.
          </li>
          <li>
            <strong>Rent a scooter in Siargao.</strong> ~$9/day. The
            island is ringed by a 48-km loop road — driving it takes
            2 hours and is half the experience.
          </li>
          <li>
            <strong>Download GCash.</strong> The Philippines'
            Venmo-equivalent. Useful for small payments and
            occasionally required at small vendors.
          </li>
          <li>
            <strong>Skip the resort breakfast in El Nido.</strong>{' '}
            Walk to <em>Altrove</em> for pizza or <em>Art Café</em> for
            genuinely good Filipino-Italian.
          </li>
          <li>
            <strong>Don't drink from taps anywhere on this route.</strong>
            {' '}Bottled water ~$0.50/liter.
          </li>
          <li>
            <strong>Bring reef-safe sunscreen.</strong> Non-reef-safe is
            fined in Palawan marine parks.
          </li>
          <li>
            <strong>Buy a local Globe or Smart SIM on Day 1.</strong>{' '}
            $6 for 2 weeks of 4G data. Airport kiosk has them.
          </li>
          <li>
            <strong>Keep a cash stash in USD.</strong> ATMs on small
            islands occasionally run out of cash on weekends. $200
            USD in the hotel safe is good insurance.
          </li>
        </ol>

        <h2 id="faq">8. Itinerary FAQ</h2>

        <h3>Can I do this in 10 days?</h3>
        <p>{"Yes, but you will need to cut Siargao or Bohol. The 10-day version that works best: Manila (1 night) → El Nido (3) → Coron (2) → Cebu and Bohol (3) → Manila return (1). Skipping Siargao saves a full travel day and a regional flight, and Palawan plus Cebu-Bohol already covers the archipelago's two most photogenic experiences."}</p>

        <h3>Can I do this in 17 days?</h3>
        <p>{"Yes — add Siquijor as a 3-day extension after Bohol via ferry Tagbilaran → Dumaguete → Siquijor. The extra days let everything breathe: build in a rest day on Bohol's Alona Beach, spend an extra day snorkeling in Apo Reef, and finish with Siquijor's quiet beaches before flying out. This is the 'right length' version for a first trip."}</p>

        <h3>What's the best month for this itinerary?</h3>
        <p>{"February or March. Dry weather holds across all four islands, prices drop after Chinese New Year, seas are flat for island-hopping, and you are before the Easter/Holy Week domestic travel surge (which doubles hotel rates and packs beaches). January is also great but slightly pricier; April starts getting hot inland."}</p>

        <h3>Can I do this with kids?</h3>
        <p>{"Yes — this itinerary is family-friendly with small adjustments. The Bohol tarsier sanctuary, Chocolate Hills and Loboc river cruise are kid magnets; in Cebu swap the canyoneering for whale shark snorkeling at Oslob (ages 6+). Skip Siargao's surf lesson and replace with the 3-island boat tour (Daku-Guyam-Naked). Budget an extra $60-80 per day for family-friendly accommodations."}</p>

        <h3>Should I book everything in advance?</h3>
        <p>{"Domestic flights and hotels: yes, 4-6 weeks out — AirSWIFT Manila-El Nido and inter-island Cebu Pacific routes sell out fast. Island-hop tours and ferries: 48-72 hours out is fine through your hotel. Land transport (vans, tricycles, private drivers): the day before through your hotel concierge saves 20-30% versus airport hustlers."}</p>

        <h3>How do I handle jet lag on arrival?</h3>
        <p>{"If arriving from North America or Europe, spend your first full day in Manila (not El Nido) — the 10-13 hour time difference is brutal and you do not want to burn a day of Palawan beach time recovering. Take a walking tour of Intramuros at your own pace, eat at Toyo Eatery or Poblacion, sleep 10 hours, and fly El Nido the morning of Day 2."}</p>

        <h3>Is this itinerary too ambitious for solo travelers?</h3>
        <p>{"Not at all — the Philippines is one of the easiest countries in Asia for solo travel thanks to near-universal English, friendly culture and cheap domestic flights. Solo travelers should favor hostel-dorm social scenes in El Nido, Siargao and Cebu; Frendz Hostel El Nido and Harana Surf Resort Siargao are where solo travelers cluster in 2026."}</p>

        <h3>What's the best way to handle internal flights?</h3>
        <p>{"Three domestic flights make this itinerary work: Manila-El Nido (AirSWIFT or Cebu Pacific-to-Puerto Princesa + 5-hour van), Coron-Cebu via Manila, Cebu-Siargao direct. Book each as a one-way rather than a multi-city ticket; Cebu Pacific and PAL release 24-hour flash sales weekly, and one-way flexibility is worth the small price premium."}</p>

        <h3>Carry-on or checked bag?</h3>
        <p>{"Carry-on every time. Domestic budget airlines charge $15-30 per checked bag per flight (so $60-120 across 3 flights), bangka boats on island hops get wet, and you will wear the same boardshorts/swimsuit rotation for 14 days regardless of what you pack. A 40L backpack is ideal; leave the heavy suitcase at your Manila hotel if needed."}</p>

        <h3>How do I adjust for a rainy-season trip (July-November)?</h3>
        <p>{"Flip the itinerary east-to-west: Siargao first (consistent east-swell surf regardless of weather), then Bohol (sheltered Alona Beach side), Cebu, then Palawan last so you can adjust El Nido days if a typhoon threatens. Build in one extra flex day. Travel insurance is non-negotiable for trip delay and evacuation coverage in typhoon months."}</p>

        <h3>How does this itinerary change for couples versus groups?</h3>
        <p>{"Couples should splurge on a private island-hop in El Nido (roughly $180-250 for two instead of $70pp joiner) and a villa in Siargao or Panglao instead of mid-range hotels. Groups of 4+ save dramatically on private vans, private bangka boats and villa rentals — budget-per-person drops 30-40%. Solo travelers save by doing joiner tours exclusively."}</p>

        <h3>Can I swap El Nido for Boracay?</h3>
        <p>{"You can, but we do not recommend it for a 14-day trip. Boracay is a walkable beach party scene with one spectacular beach (White Beach); El Nido offers dramatic limestone karsts, hidden lagoons and boat-tour variety that a single beach cannot match. Save Boracay for a short beach-focused trip or a 3-night extension after the main itinerary."}</p>

        <h3>What about senior travelers or mobility-limited guests?</h3>
        <p>{"Swap Siargao (bumpy habal-habal motorbike transport) for a longer Bohol stay and add Coron's Maquinit Hot Springs for easy relaxation. Stay at Pangulasian Island Resort in El Nido (private boat transfers) rather than El Nido town (steep, uneven streets). Everywhere you go, tip the bangka crew extra for stable boat assistance."}</p>

        <h3>What vaccinations or medications do I need?</h3>
        <p>{"Routine + hepatitis A and typhoid are standard CDC recommendations. Japanese encephalitis only if you are staying weeks in rural areas. Carry Imodium and oral rehydration salts for the inevitable first stomach bug. No malaria pills needed for the standard tourist route; dengue is a real risk so use DEET 30%+ at dawn and dusk."}</p>

        <h3>Is a guided tour worth it or should I DIY?</h3>
        <p>{"DIY is the clear winner for this itinerary — English is universal, domestic flights are cheap and easy to book, and hotels handle all local tours. Group tour operators charge a 80-120% markup for the same experience. Consider a guide only if you have under 10 days, minimal travel experience, or want to combine with a more complex Vietnam/Thailand multi-country itinerary."}</p>

        <h2 id="keep-reading">Keep Reading</h2>

        <ul>
          <li>
            <Link to="/blog/philippines-travel-guide-2026">
              The Ultimate Philippines Travel Guide →
            </Link>
          </li>
          <li>
            <Link to="/blog/best-philippine-islands-2026">
              7 Best Philippine Islands Ranked →
            </Link>
          </li>
          <li>
            <Link to="/blog/philippines-beaches-2026">
              15 Most Beautiful Philippine Beaches →
            </Link>
          </li>
          <li>
            <Link to="/blog/filipino-food-guide-2026">
              Filipino Food Guide: 25 Must-Try Dishes →
            </Link>
          </li>
          <li>
            <Link to="/blog/philippines-budget-travel-2026">
              Philippines on $25, $50 or $100 / day →
            </Link>
          </li>
        </ul>

        <BlogEndCTA
          title="Turn this itinerary into your personal travel map."
          subtitle="Stamp every stop, add photos, keep the memory forever — free, no credit card."
        />
      </article>
    </BlogShell>
  );
}
