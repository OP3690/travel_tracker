import React from 'react';
import { Link } from 'react-router-dom';
import { BlogShell, useBlogSEO, useRevealOnScroll } from '../BlogLayout';
import {
  BlogTable, BlogCallout, BlogStatGrid, BlogInlineCTA, BlogEndCTA, BlogBarChart,
} from '../BlogComponents';
import { BlogThailandMap } from '../BlogThailandMap';
import { getPostBySlug } from '../posts';

const SLUG = 'two-week-thailand-itinerary-2026';
const ROUTE = ['bkk', 'aya', 'cmi', 'cri', 'pkt', 'pna', 'kbi'];

export default function TwoWeekThailandItinerary2026() {
  const post = getPostBySlug(SLUG);
  useBlogSEO({
    title: `${post.title} | StampYourMap Blog`,
    description: post.description,
    url: `/blog/${SLUG}`,
    image: post.ogImage,
    datePublished: post.datePublished,
    keywords: 'thailand itinerary, 2 weeks thailand, 14 days thailand, bangkok chiang mai phuket krabi, thailand trip plan, is thailand safe, is thailand safe for tourists, is it safe to travel to thailand, thailand travel warning, thailand travel restrictions, thailand travel requirements, do i need a visa for thailand, thailand visa, thailand visa requirements, thailand visa on arrival, thailand visa for indians, thailand visa for americans, thailand visa free countries, thailand evisa, thailand border entry, best time to visit thailand, thailand weather, thailand in summer, thailand in winter, thailand in april, thailand in may, thailand in october, thailand in december, thailand peak season, thailand off season, how much does a thailand trip cost, how much does thailand cost, thailand budget, thailand daily cost, thailand expensive or cheap, is thailand expensive, thailand travel cost, thailand currency, thailand currency exchange, cash or card in thailand, thailand sim card, thailand mobile data, thailand wifi, thailand travel insurance, thailand packing list, what to pack for thailand, what to wear in thailand, thailand dress code, thailand plug type, thailand power adapter, thailand food, thailand food to try, what to eat in thailand, thailand cuisine, thailand street food, thailand famous dishes, thailand solo travel, thailand solo female travel, thailand for women, thailand with kids, family travel thailand, thailand for families, thailand honeymoon, thailand romantic, thailand luxury travel, thailand backpacking, thailand on a budget, thailand things to do, things to do in thailand, top places in thailand, best places to visit in thailand, thailand sightseeing, thailand attractions, thailand tourist spots, thailand bucket list, thailand 7 days, thailand 10 days, thailand 2 weeks, thailand 14 days, thailand first timer, thailand travel plan, thailand travel tips, thailand travel advice, thailand travel news, thailand travel updates, thailand travel guide 2026, bangkok, chiang mai, phuket, krabi, koh samui, pattaya' /* [[NATURAL_QUERIES]] */,
  });
  useRevealOnScroll();

  return (
    <BlogShell>
      <article className="blog-article">
        <div className="blog-breadcrumbs">
          <Link to="/">Home</Link> / <Link to="/blog">Blog</Link> / <span>2-Week Thailand Itinerary</span>
        </div>
        <div className="blog-hero">
          <span className="blog-cat-chip">Thailand · Itinerary</span>
          <span className="blog-meta-sep">•</span><span>Published April 22, 2026</span>
          <span className="blog-meta-sep">•</span><span>{post.readMinutes} min read</span>
        </div>

        <h1>{post.heroEmoji} The Perfect 2-Week Thailand Itinerary: Bangkok → Chiang Mai → Phuket → Krabi (2026)</h1>

        <p className="blog-lede">
          One itinerary emerges as the clear first-timer winner for
          Thailand: 14 days covering Bangkok's temples and chaos, Chiang
          Mai's mountains and elephant sanctuaries, then the Andaman coast
          for Phuket's infrastructure and Krabi's dreamlike karst seascapes.
          Three regions, three flights, zero wasted days. Here's day by day.
        </p>

        <BlogStatGrid stats={[
          { value: '14', label: 'Days' },
          { value: '4', label: 'Regions' },
          { value: '3', label: 'Flights required' },
          { value: '$1,200', label: 'Mid-range total' },
        ]} />

        <BlogInlineCTA title="Track every stop." subtitle="Stamp each Thai province on your free interactive map." href="/signup" />

        <h2 id="map">1. The Full Route</h2>
        <BlogThailandMap
          regionIds={ROUTE}
          title="Bangkok → Ayutthaya → Chiang Mai → Chiang Rai → Phuket → Phi Phi → Krabi"
          subtitle="The classic 'Golden Triangle + Andaman' loop."
        />

        <h2 id="day-by-day">2. Day-by-Day Plan</h2>
        <BlogTable
          caption="Recommended 14-day plan"
          headers={['Day', 'Base', 'What you\'re doing']}
          rows={[
            ['1', <strong>Bangkok</strong>, 'Land Suvarnabhumi; check-in Sukhumvit area; evening food tour in Chinatown'],
            ['2', <strong>Bangkok</strong>, 'Grand Palace + Wat Pho + Wat Arun; sunset Chao Phraya river cruise'],
            ['3', <strong>Bangkok</strong>, 'Chatuchak weekend market (if weekend) + rooftop bar at night'],
            ['4', <strong>Ayutthaya (day-trip)</strong>, 'UNESCO ancient capital ruins; return to Bangkok evening'],
            ['5', <strong>Chiang Mai</strong>, 'Morning flight or night train; Old City temples (Wat Chedi Luang, Wat Phra Singh)'],
            ['6', <strong>Chiang Mai</strong>, 'Elephant sanctuary full-day (ethical, no riding — Elephant Nature Park)'],
            ['7', <strong>Chiang Mai</strong>, 'Doi Suthep temple sunrise; Sunday Walking Street market evening'],
            ['8', <strong>Chiang Rai (day-trip)</strong>, 'White Temple (Wat Rong Khun) + Blue Temple + Black House'],
            ['9', <strong>Phuket</strong>, 'Flight CMI → HKT; relax Patong or Kata Beach; sunset drink'],
            ['10', <strong>Phuket / Phi Phi</strong>, 'Maya Bay + Phi Phi day tour (book speedboat, not big ferry)'],
            ['11', <strong>Krabi (Ao Nang / Railay)</strong>, 'Boat to Ao Nang; afternoon at Railay Beach'],
            ['12', <strong>Krabi</strong>, '4-island tour (Chicken Island, Poda, Tup, Phra Nang)'],
            ['13', <strong>Krabi</strong>, 'Hong Islands lagoon tour OR kayaking Ao Thalane'],
            ['14', <strong>Bangkok → home</strong>, 'Morning flight Krabi → Bangkok; international departure'],
          ]}
        />

        <BlogCallout title="Night train alternative">
          <p>
            Instead of flying Bangkok → Chiang Mai on Day 5, take the
            <strong> overnight 2nd class AC sleeper train</strong>. Departs
            Bangkok 6-8 PM, arrives Chiang Mai 7-8 AM. Saves a hotel night
            and is one of the country's great travel experiences. $40-55.
          </p>
        </BlogCallout>

        <h2 id="flights">3. Flights & Transport Cost</h2>
        <BlogTable
          caption="Flights + intercity segments"
          headers={['Day', 'Segment', 'Mode', 'Cost']}
          rows={[
            ['5', 'Bangkok → Chiang Mai', 'Flight (1 hr) or night train (14 hr)', '$45 flight / $40 train'],
            ['9', 'Chiang Mai → Phuket', 'Flight (2 hr direct)', '$70'],
            ['11', 'Phuket → Ao Nang (Krabi)', 'Ferry (1.5 hr)', '$18'],
            ['14', 'Krabi → Bangkok', 'Flight (1.5 hr)', '$50'],
            [<strong>Transport total</strong>, '', '', <strong>~$165-$180</strong>],
          ]}
        />

        <BlogInlineCTA title="Stamp-as-you-go." subtitle="Add each stop to your free interactive travel map." href="/signup" />

        <h2 id="lodging">4. Where to Sleep</h2>
        <BlogTable
          caption="Recommended accommodations per base"
          headers={['Base', 'Budget ($)', 'Mid-range ($$)', 'Splurge ($$$)']}
          rows={[
            ['Bangkok', 'Mad Monkey Hostel', 'Ibis Styles Sukhumvit 4', 'Shangri-La or Mandarin Oriental'],
            ['Chiang Mai', 'Stamps Backpackers', 'U Nimman', '137 Pillars House'],
            ['Phuket', 'Lub d Phuket Patong', 'Cape Sienna Gourmet Hotel', 'Amanpuri or Trisara'],
            ['Krabi', 'Slumber Party Ao Nang', 'Peace Laguna Resort', 'Rayavadee (Railay)'],
          ]}
        />

        <h2 id="cost">5. Total Trip Cost</h2>
        <BlogBarChart
          title="14-day Thailand trip breakdown (mid-range ~$1,200)"
          subtitle="Percentage of per-person spend, excluding international flight."
          max={100} unit="%"
          data={[
            { label: 'Accommodation', value: 35, valueLabel: '35%' },
            { label: 'Food', value: 17, valueLabel: '17%' },
            { label: 'Internal flights', value: 13, valueLabel: '13%' },
            { label: 'Tours & activities', value: 20, valueLabel: '20%' },
            { label: 'Local transport', value: 7, valueLabel: '7%' },
            { label: 'Buffer', value: 8, valueLabel: '8%' },
          ]}
        />

        <BlogTable
          caption="Full 14-day cost per person"
          headers={['Category', 'Backpacker', 'Mid-range', 'Comfort']}
          rows={[
            ['Daily costs × 14', '$350', '$1,050', '$2,800'],
            ['Internal flights (2-3 legs)', '$100', '$165', '$300'],
            ['Tours + elephant sanctuary + island-hops', '$120', '$200', '$400'],
            [<strong>Total</strong>, <strong>~$570</strong>, <strong>~$1,415</strong>, <strong>~$3,500</strong>],
          ]}
        />

        <h2 id="alternatives">6. Alternative Routes</h2>

        <h3>🏝️ Beach-maximising</h3>
        <p>
          <strong>Bangkok (3) → Koh Samui (4) → Koh Phangan (3) → Krabi (4)</strong>.
          Skips Chiang Mai; adds Gulf coast diving/Full Moon Party.
        </p>

        <h3>🌄 Northern-focused</h3>
        <p>
          <strong>Bangkok (3) → Chiang Mai (5) → Pai (3) → Chiang Rai (3)</strong>.
          Swaps beaches for mountains, tribes, and the Mae Hong Son loop.
        </p>

        <h3>🛵 Slow-travel 21 days</h3>
        <p>
          Add Koh Chang (4) or Koh Tao (4 — diving) between Phuket and
          Krabi.
        </p>

        <h2 id="pro-tips">7. Pro Tips</h2>
        <ol>
          <li>Book elephant sanctuaries 2+ weeks ahead — Elephant Nature Park sells out</li>
          <li>Maya Bay (Phi Phi) closed 9-11 AM — go 11 AM tour for empty beach</li>
          <li>Railay has no roads — only accessed by longtail boat from Ao Nang</li>
          <li>Dress code: shoulders + knees covered at temples. Carry a wrap</li>
          <li>Download Grab app before arriving</li>
          <li>7-Eleven sells Thai SIM cards — $6 for 2 weeks 4G</li>
          <li>Tap water is unsafe. Bottled only</li>
          <li>Bangkok BTS Skytrain beats taxis during rush hour by 40 minutes</li>
          <li>Chatuchak market is Saturday-Sunday only</li>
          <li>Phi Phi is loud — stay in Phuket or Krabi, do Phi Phi as day-trip</li>
        </ol>

        <h2 id="faq">8. FAQ</h2>
        <h3>Can I do this itinerary in 10 days?</h3>
        <p>{"Yes, with two sensible cuts: drop the Chiang Rai day-trip and one beach day. A tight 10-day version is "}<strong>Bangkok (3) → Chiang Mai (3) → Krabi (4)</strong>{", accepting that everything feels a touch rushed. Below 10 days, ditch the north entirely and do Bangkok (3) + Krabi (4) + one day in Ayutthaya."}</p>

        <h3>What's the best month for this route?</h3>
        <p><strong>{"November to February"}</strong>{" wins on every metric — dry everywhere, highs of 28–32°C, and the beach coasts are at their clearest. December 20–January 5 is peak peak; book hotels 3 months ahead and expect 40–60% price bumps. February is arguably the sweet spot: same weather, lower prices."}</p>

        <h3>Can I reverse the route and start in the south?</h3>
        <p>{"Yes — flying into Phuket (HKT) or Krabi (KBV) and ending in Bangkok works well, especially if you score a cheaper transpacific fare. Start beach, finish with temples keeps cultural-fatigue low. One catch: the "}<strong>night train Bangkok→Chiang Mai</strong>{" only makes sense southbound if you build it in as Chiang Mai→Bangkok on day 11."}</p>

        <h3>How do I handle jet lag on day 1?</h3>
        <p>{"Plan day 1 as deliberately light — land, hotel, 1-hour foot massage (300 THB), rooftop sunset, early dinner, bed by 9 PM. Bangkok is 12 hours ahead of US East Coast and 7 ahead of London. Aggressive exposure to morning sunlight on days 2–3 resets your clock faster than any pill; melatonin 0.5 mg is optional help."}</p>

        <h3>Should I book all domestic flights now or on arrival?</h3>
        <p>{"Book the "}<strong>Bangkok→Chiang Mai and Chiang Mai→Krabi</strong>{" flights 3–4 weeks ahead on AirAsia or Thai Lion — fares are $35–60 that far out but double to $100+ last-minute. Don't book the ferry to islands in advance; buy at the pier or 12Go the day before. Flexibility is cheap insurance against weather delays."}</p>

        <h3>Carry-on only or checked bag?</h3>
        <p><strong>{"Carry-on only"}</strong>{" is the move. Domestic Thai budget airlines charge $15–25 per checked bag each segment, laundry is $3/kg everywhere, and you will buy a beach sarong and linen shirts anyway. Pack light: 5 shirts, 2 shorts, 1 pair long pants for temples, swimwear, rain shell, flip-flops + one proper shoe."}</p>

        <h3>Is this itinerary fine for solo travellers?</h3>
        <p>{"Perfectly — Thailand is one of the most solo-friendly countries in Asia. Bangkok and Chiang Mai hostels have dorm rates of $8–15 with pool and strong social scenes (Mad Monkey, Lub d). On the islands, Koh Phi Phi and Ao Nang are easier for solo travellers than Phuket; join a 1-day longtail boat tour to meet people fast."}</p>

        <h3>Will this work with kids aged 6–12?</h3>
        <p>{"Yes, with small tweaks: swap the night train for a morning flight (1 hour vs 14 hours), add an "}<strong>elephant sanctuary day</strong>{" in Chiang Mai, and base in family-friendly Ao Nang rather than Railay (no cars). Skip Khao San Road and Patong. Thai kids run everywhere, restaurants welcome children, and the healthcare is excellent if needed."}</p>

        <h3>What about elderly parents on this route?</h3>
        <p>{"Drop the night train and fly all legs; stay in 4-star hotels with elevators (not every Bangkok boutique has one); and pre-arrange "}<strong>private drivers</strong>{" in Chiang Mai ($45/day) rather than using scooters. Railay's beach-only access via longtail boat involves a wade-in that some elderly guests find tough — base in Ao Nang instead and day-trip."}</p>

        <h3>How do I handle a rainy day in Chiang Mai?</h3>
        <p>{"Cooking class (Thai Farm Cooking School, ~$30 for 6 dishes), indoor Thai massage at a blind-masseur school (400 THB/hour), or the Chiang Mai Night Bazaar undercover. If it really monsoons, catch a same-day flight to Krabi — Gulf and Andaman weather rarely match up and you can swap days."}</p>

        <h3>What if I have only 7 days?</h3>
        <p>{"Cut the north entirely: "}<strong>Bangkok (3 nights) + Krabi or Phuket (4 nights)</strong>{" with a one-day Ayutthaya temple run from Bangkok. This gives you the urban + beach contrast that most first-timers crave, without the exhausting 3-region sprint. A week is enough if you're efficient — but you will want to come back."}</p>

        <h3>Can I add Cambodia or Laos to this route?</h3>
        <p>{"Easily. Fly "}<strong>Chiang Mai → Luang Prabang</strong>{" ($120, 1 hour) for 3 days of temples and the Kuang Si waterfall, or Bangkok → Siem Reap for Angkor Wat (3-day pass $62). Add 4 nights minimum — less and you're just shuffling airports. Both work as side-trips before your southern beach leg."}</p>

        <h3>Visa and Schengen-style limits?</h3>
        <p>{"Thailand gives "}<strong>60 days visa-free</strong>{" to most Western passports (raised from 30 in mid-2024) — this itinerary uses 14. File the "}<strong>TDAC (Thailand Digital Arrival Card)</strong>{" online for free within 3 days of arrival. Fingerprints at immigration take 30 seconds; no visa runs needed unless you stay past 60 days."}</p>

        <h3>What travel insurance do I need?</h3>
        <p>{"Yes, buy it. Look for "}<strong>scooter/motorbike coverage</strong>{" (many standard policies exclude it — SafetyWing and World Nomads include it as an add-on), $100,000+ medical, and evacuation coverage. Expect $40–70 for 2 weeks. If you plan to dive around Koh Tao or Phi Phi, add diving cover explicitly."}</p>

        <h3>Best ATM strategy to avoid fees?</h3>
        <p>{"Thai bank ATMs charge "}<strong>150–220 THB per withdrawal</strong>{" on top of your home-bank fee. Use a "}<strong>Wise, Revolut, or Charles Schwab debit card</strong>{" that refunds fees, and withdraw 10,000–20,000 THB per pull to dilute the fixed fee. Avoid dynamic currency conversion (DCC) — always choose 'charge in THB'."}</p>

        <h2 id="keep">Keep Reading</h2>
        <ul>
          <li><Link to="/blog/thailand-travel-guide-2026">Ultimate Thailand Guide →</Link></li>
          <li><Link to="/blog/best-thailand-islands-2026">10 Best Thai Islands →</Link></li>
          <li><Link to="/blog/thai-food-guide-2026">25 Thai Dishes →</Link></li>
          <li><Link to="/blog/bangkok-complete-guide-2026">Bangkok 5-Day Guide →</Link></li>
          <li><Link to="/blog/thailand-budget-travel-2026">Thailand on a Budget →</Link></li>
        </ul>

        <BlogEndCTA
          title="Turn this itinerary into your personal Thailand map."
          subtitle="Stamp every province. Free, forever."
        />
      </article>
    </BlogShell>
  );
}
