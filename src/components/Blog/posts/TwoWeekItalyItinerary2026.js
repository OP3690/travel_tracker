import React from 'react';
import { Link } from 'react-router-dom';
import { BlogShell, useBlogSEO, useRevealOnScroll } from '../BlogLayout';
import { BlogTable, BlogCallout, BlogStatGrid, BlogInlineCTA, BlogEndCTA, BlogBarChart } from '../BlogComponents';
import { BlogItalyMap } from '../BlogItalyMap';
import { getPostBySlug } from '../posts';

const SLUG = 'two-week-italy-itinerary-2026';
const ROUTE = ['lazio', 'tuscany', 'veneto', 'liguria', 'campania'];

export default function TwoWeekItalyItinerary2026() {
  const post = getPostBySlug(SLUG);
  useBlogSEO({
    title: `${post.title} | StampYourMap Blog`,
    description: post.description,
    url: `/blog/${SLUG}`,
    image: post.ogImage,
    datePublished: post.datePublished,
    keywords: 'italy itinerary 2 weeks, 14 days italy, rome florence venice amalfi itinerary, italy route 2026, italy trip plan',
  });
  useRevealOnScroll();

  return (
    <BlogShell>
      <article className="blog-article">
        <div className="blog-breadcrumbs">
          <Link to="/">Home</Link> / <Link to="/blog">Blog</Link> / <span>2-Week Italy Itinerary</span>
        </div>
        <div className="blog-hero">
          <span className="blog-cat-chip">Italy · Itinerary</span>
          <span className="blog-meta-sep">•</span><span>Published April 22, 2026</span>
          <span className="blog-meta-sep">•</span><span>{post.readMinutes} min read</span>
        </div>

        <h1>{post.heroEmoji} The Perfect 2-Week Italy Itinerary: Rome → Florence → Venice → Amalfi (2026)</h1>

        <p className="blog-lede">
          One Italian itinerary has been validated by more of our
          user panel than any other: 14 days covering Rome's ancient
          core, Florence and Tuscany's hilltop towns, Venice's canals,
          Cinque Terre's pastel cliffs, and the Amalfi Coast's world-
          famous drive. Five regions, four fast trains, no wasted days.
        </p>

        <BlogStatGrid stats={[
          { value: '14', label: 'Days' },
          { value: '5', label: 'Regions' },
          { value: '6', label: 'Bases' },
          { value: '€2,800', label: 'Mid-range total' },
        ]} />

        <BlogInlineCTA title="Stamp each stop." subtitle="Track every Italian region you visit — free map." href="/signup" />

        <h2 id="map">1. The Full Route</h2>
        <BlogItalyMap
          regionIds={ROUTE}
          title="Rome → Tuscany → Venice → Cinque Terre → Amalfi → Rome"
          subtitle="5 regions, loop back to Rome for international flight"
        />

        <h2 id="day-by-day">2. Day-by-Day Plan</h2>
        <BlogTable
          caption="Recommended 14-day plan"
          headers={['Day', 'Base', 'What you\'re doing']}
          rows={[
            ['1', <strong>Rome</strong>, 'Land FCO; check-in Trastevere or Monti; dinner in Trastevere'],
            ['2', <strong>Rome</strong>, 'Colosseum + Roman Forum + Palatine Hill (book 9 AM slot); gelato + Trevi at night'],
            ['3', <strong>Rome</strong>, 'Vatican Museums + Sistine Chapel (7 AM early entry); St Peter\'s Basilica; Pantheon'],
            ['4', <strong>Florence</strong>, 'Morning Frecciarossa Rome → Florence (1h30); Duomo + Uffizi afternoon'],
            ['5', <strong>Florence</strong>, 'Accademia (David) + Ponte Vecchio + Boboli Gardens; sunset Piazzale Michelangelo'],
            ['6', <strong>Tuscany (San Gimignano + Siena)</strong>, 'Day-trip — medieval hill towns + lunch in a winery'],
            ['7', <strong>Venice</strong>, 'Morning Frecciarossa Florence → Venice (2h15); evening gondola + cicchetti crawl'],
            ['8', <strong>Venice</strong>, 'St Mark\'s Basilica + Doge\'s Palace morning; Murano + Burano afternoon'],
            ['9', <strong>Cinque Terre</strong>, 'Train Venice → La Spezia (~6h); check-in Monterosso or Vernazza'],
            ['10', <strong>Cinque Terre</strong>, 'Hike Vernazza → Monterosso (2h); ferry between villages'],
            ['11', <strong>Naples / Amalfi</strong>, 'Train La Spezia → Naples (~7h); evening pizza at Da Michele'],
            ['12', <strong>Positano (Amalfi Coast)</strong>, 'Ferry Naples → Positano; Beach club afternoon; hillside dinner'],
            ['13', <strong>Amalfi + Ravello</strong>, 'Ferry along coast; Ravello\'s Villa Cimbrone + Villa Rufolo'],
            ['14', <strong>Rome → home</strong>, 'Morning train to Rome; afternoon Borghese Gallery (if time); FCO'],
          ]}
        />

        <BlogCallout title="The one booking that unlocks the trip">
          <p>
            <strong>Book your Vatican Museums 7 AM early-entry ticket 60 days
            ahead</strong> — not 30, not 2 weeks. They sell out by March for
            peak-season dates. You'll walk into an empty Sistine Chapel.
            Worth the $80 premium over the standard 9 AM ticket.
          </p>
        </BlogCallout>

        <h2 id="trains">3. The Train Schedule</h2>
        <BlogTable
          caption="Required trains (2026 EUR, book via Trainline or Italo/Frecciarossa apps)"
          headers={['Day', 'Route', 'Duration', 'One-way EUR']}
          rows={[
            ['4', 'Rome → Florence', '1 hr 30', '€35-55'],
            ['7', 'Florence → Venice', '2 hr 15', '€45-70'],
            ['9', 'Venice → La Spezia', '5 hr (change Milan)', '€65-95'],
            ['11', 'La Spezia → Naples', '7 hr (change Rome)', '€95'],
            ['14', 'Naples → Rome (airport)', '1 hr 10', '€25'],
            [<strong>Total rail cost</strong>, '', <strong>~17 hours</strong>, <strong>~€265-340</strong>],
          ]}
        />

        <BlogInlineCTA title="Stamp each region as you train through." subtitle="Free interactive map — 20 Italian regions preloaded." href="/signup" />

        <h2 id="lodging">4. Where to Sleep</h2>
        <BlogTable
          caption="Recommended accommodations per base"
          headers={['Base', 'Budget ($)', 'Mid-range ($$)', 'Splurge ($$$)']}
          rows={[
            ['Rome', 'The Yellow Hostel', 'Hotel Artemide', 'Hassler Roma'],
            ['Florence', 'Plus Florence', 'Hotel Davanzati', 'Villa San Michele'],
            ['Venice', 'Generator Venice', 'Hotel American-Dinesen', 'Cipriani'],
            ['Cinque Terre (Monterosso)', 'Ostello 5 Terre', 'Hotel Porto Roca', 'Hotel Margherita'],
            ['Positano', 'Hostel Brikette (Praiano)', 'Hotel Marincanto', 'Le Sirenuse'],
          ]}
        />

        <h2 id="cost">5. Trip Cost</h2>
        <BlogBarChart
          title="14-day Italy trip breakdown — mid-range ~€2,800"
          subtitle="Percentage of per-person spend, excluding international flight."
          max={100} unit="%"
          data={[
            { label: 'Accommodation', value: 38, valueLabel: '38%' },
            { label: 'Food & wine', value: 22, valueLabel: '22%' },
            { label: 'Trains + ferries', value: 12, valueLabel: '12%' },
            { label: 'Museums + tours', value: 10, valueLabel: '10%' },
            { label: 'City transport', value: 6, valueLabel: '6%' },
            { label: 'Buffer', value: 12, valueLabel: '12%' },
          ]}
        />

        <BlogTable
          caption="Full 14-day cost per person (EUR)"
          headers={['Tier', 'Daily × 14', 'Trains', 'Activities', 'Total']}
          rows={[
            ['Budget', '€700', '€200', '€120', <strong>€1,020</strong>],
            ['Mid-range', '€2,250', '€300', '€250', <strong>€2,800</strong>],
            ['Comfort', '€5,400', '€500', '€600', <strong>€6,500</strong>],
          ]}
        />

        <h2 id="alt-routes">6. Alternative Routes</h2>

        <h3>🍷 Food + Wine Focus</h3>
        <p>
          <strong>Rome (3) → Florence + Tuscany (4) → Bologna + Emilia-Romagna (3) → Venice (2) → Milan (2)</strong>.
          Swaps Amalfi for the northern food regions — Bologna, Parma, Modena.
          Best for foodies who've already been to Italy once.
        </p>

        <h3>🏖️ Southern-focused</h3>
        <p>
          <strong>Rome (3) → Naples + Amalfi (4) → Puglia (4) → Sicily (3)</strong>.
          Skips Florence + Venice; doubles down on south + islands.
          Much cheaper, much warmer, almost no Western crowds.
        </p>

        <h3>🏔️ Alpine Italy</h3>
        <p>
          <strong>Milan (2) → Lake Como (3) → Dolomites (4) → Venice (2) → Florence (3)</strong>.
          Mountains + lakes. Best June-September.
        </p>

        <h2 id="pro-tips">7. 10 Pro Tips</h2>
        <ol>
          <li>Colosseum + Vatican both need pre-booked skip-the-line tickets — 60 days ahead</li>
          <li>Florence: Uffizi + Accademia reservations required, not optional</li>
          <li>Venice: stay in Venice itself at least 2 nights. Day-trips miss the 9pm-9am magic</li>
          <li>Cinque Terre: base in Monterosso or Vernazza, NOT La Spezia</li>
          <li>Amalfi: ferries beat the bus for scenery and seasickness-prone people</li>
          <li>Book restaurants 1-2 days ahead everywhere, 1 week ahead in peak season</li>
          <li>"Tu" on the menu + "tourist menu" = skip. Look for Italian-only menus</li>
          <li>Buy rail tickets on the apps (Trainline, Italo) — cheaper than the station</li>
          <li>Download Google Maps offline for every city + Tuscany</li>
          <li>Carry €20-40 cash — small cafés still don't always take cards</li>
        </ol>

        <h2 id="faq">8. FAQ</h2>
        <h3>Can I do this in 10 days?</h3>
        <p>Yes — drop Cinque Terre + Amalfi, or compress both to 1 day each. 10-day: Rome (3) → Florence + Tuscany (3) → Venice (2) → Amalfi (2).</p>
        <h3>Best month?</h3>
        <p><strong>September</strong>. Weather is perfect, prices drop, crowds thin.</p>
        <h3>Can I reverse the route?</h3>
        <p>Yes. Fly into Naples/Milan/Venice and loop.</p>

        <h2 id="keep">Keep Reading</h2>
        <ul>
          <li><Link to="/blog/italy-travel-guide-2026">Ultimate Italy Guide →</Link></li>
          <li><Link to="/blog/best-italy-regions-2026">10 Best Italian Regions →</Link></li>
          <li><Link to="/blog/italian-food-guide-2026">30 Italian Dishes →</Link></li>
          <li><Link to="/blog/amalfi-coast-guide-2026">Amalfi Coast Guide →</Link></li>
          <li><Link to="/blog/italy-budget-travel-2026">Italy on a Budget →</Link></li>
        </ul>

        <BlogEndCTA
          title="Turn this into your personal Italy map."
          subtitle="Stamp every region, add photos, keep forever."
        />
      </article>
    </BlogShell>
  );
}
