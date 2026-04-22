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
        <h3>10-day version?</h3><p>Skip Ninh Binh or Mekong Delta. Core: Hanoi (3) → Halong (1) → Hoi An (3) → HCM (3).</p>
        <h3>Best month?</h3><p><strong>March or November</strong>.</p>
        <h3>Reverse route?</h3><p>Yes — HCM → Hoi An → Hue → Hanoi. Often cheaper from Australia/US West.</p>

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
