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
    keywords: 'thailand itinerary, 2 weeks thailand, 14 days thailand, bangkok chiang mai phuket krabi, thailand trip plan',
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
        <h3>Can I do this in 10 days?</h3>
        <p>Yes — drop Chiang Rai day-trip + 1 beach day. 10-day: Bangkok (3) → Chiang Mai (3) → Krabi (4).</p>
        <h3>Best month?</h3>
        <p><strong>November–February</strong>. Dry everywhere.</p>
        <h3>Can I reverse the route?</h3>
        <p>Yes. Fly into Phuket or Krabi first, end in Bangkok.</p>

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
