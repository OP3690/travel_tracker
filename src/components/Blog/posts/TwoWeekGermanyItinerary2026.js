import React from 'react';
import { Link } from 'react-router-dom';
import { BlogShell, useBlogSEO, useRevealOnScroll } from '../BlogLayout';
import { BlogTable, BlogCallout, BlogStatGrid, BlogInlineCTA, BlogEndCTA } from '../BlogComponents';
import { BlogGermanyMap } from '../BlogGermanyMap';
import { getPostBySlug } from '../posts';

const SLUG = 'two-week-germany-itinerary-2026';
const ROUTE = ['be', 'sn', 'by', 'bw', 'rp'];

export default function TwoWeekGermanyItinerary2026() {
  const post = getPostBySlug(SLUG);
  useBlogSEO({
    title: `${post.title} | StampYourMap Blog`,
    description: post.description,
    url: `/blog/${SLUG}`,
    image: post.ogImage,
    datePublished: post.datePublished,
    keywords: 'germany itinerary 2 weeks, berlin munich bavaria romantic road rhine, germany 14 days, germany trip plan',
  });
  useRevealOnScroll();

  return (
    <BlogShell>
      <article className="blog-article">
        <div className="blog-breadcrumbs">
          <Link to="/">Home</Link> / <Link to="/blog">Blog</Link> / <span>2-Week Germany Itinerary</span>
        </div>
        <div className="blog-hero">
          <span className="blog-cat-chip">Germany · Itinerary</span>
          <span className="blog-meta-sep">•</span><span>Published April 22, 2026</span>
          <span className="blog-meta-sep">•</span><span>{post.readMinutes} min read</span>
        </div>

        <h1>{post.heroEmoji} The Perfect 2-Week Germany Itinerary: Berlin → Dresden → Munich → Romantic Road → Rhine (2026)</h1>

        <p className="blog-lede">
          14 days covering Berlin's 20th-century layers, Dresden + Leipzig's
          Saxon baroque, Bavaria's Munich + Neuschwanstein + Alps, the
          medieval Romantic Road, and Rhine Valley castles. Four ICE
          train legs, zero wasted days.
        </p>

        <BlogStatGrid stats={[
          { value: '14', label: 'Days' },
          { value: '5', label: 'Regions' },
          { value: '4', label: 'ICE legs' },
          { value: '€2,600', label: 'Mid-range total' },
        ]} />

        <BlogInlineCTA title="Stamp each Länder." subtitle="Free map, 16 states." href="/signup" />

        <h2 id="route">1. The Route</h2>
        <BlogGermanyMap
          regionIds={ROUTE}
          title="Berlin → Saxony → Bavaria → Baden-Württemberg → Rhine"
          subtitle="Cross-country loop, 4 ICE trains."
        />

        <h2 id="day-by-day">2. Day-by-Day</h2>
        <BlogTable
          caption="Recommended plan"
          headers={['Day', 'Base', 'What you\'re doing']}
          rows={[
            ['1', <strong>Berlin</strong>, 'Arrive BER; Brandenburg Gate + Reichstag; first Currywurst'],
            ['2', <strong>Berlin</strong>, 'Wall Memorial + Holocaust Memorial + Museum Island'],
            ['3', <strong>Berlin</strong>, 'Potsdamer Platz + Checkpoint Charlie + East Side Gallery + techno club night'],
            ['4', <strong>Dresden</strong>, 'ICE Berlin → Dresden (2 hr); Frauenkirche + Zwinger palace + baroque old town'],
            ['5', <strong>Leipzig (day-trip)</strong>, 'Bach sites + Spinnerei art district + coffee scene'],
            ['6', <strong>Munich</strong>, 'ICE Dresden → Munich (4h30); Marienplatz + Hofbräuhaus evening'],
            ['7', <strong>Munich</strong>, 'Deutsches Museum + English Garden + Viktualienmarkt + beer garden lunch'],
            ['8', <strong>Neuschwanstein (day-trip)</strong>, '2h train to Füssen + horse carriage up; book 2 months ahead'],
            ['9', <strong>Salzburg (day-trip)</strong>, 'Cross into Austria — Mozart + Sound of Music locations; return Munich'],
            ['10', <strong>Rothenburg (Romantic Road)</strong>, 'Train to Würzburg + bus; medieval walled town, stay 1 night'],
            ['11', <strong>Heidelberg</strong>, 'Train via Würzburg (~3 hr); castle + altstadt'],
            ['12', <strong>Rhine Valley (Sankt Goar)</strong>, 'Rhine castle cruise from Bacharach → Rüdesheim'],
            ['13', <strong>Cologne</strong>, 'Train to Köln (2 hr); Cathedral + old town + Kölsch beer'],
            ['14', <strong>Cologne → home</strong>, 'Museum Ludwig morning; ICE → Frankfurt Airport or FRA direct'],
          ]}
        />

        <BlogCallout title="Neuschwanstein booking">
          <p>
            <strong>Book Neuschwanstein Castle tickets 2 months ahead</strong>
            {' '}on the official site (neuschwanstein.de). Timed-entry
            tours only; day-of tickets sell out by 10 AM.
          </p>
        </BlogCallout>

        <h2 id="trains">3. Train Legs (2026 EUR)</h2>
        <BlogTable
          caption="ICE segments, 60-day Sparpreis"
          headers={['Day', 'Route', 'Duration', 'Cost']}
          rows={[
            ['4', 'Berlin → Dresden', '2 hr', '€14-28'],
            ['6', 'Dresden → Munich', '4h30', '€25-50'],
            ['10', 'Munich → Würzburg', '2h15', '€20-40'],
            ['12', 'Heidelberg → Rhine → Cologne', '4 hr via slow train', '€30-50'],
            ['14', 'Cologne → FRA Airport', '1 hr', '€15-30'],
            [<strong>Total</strong>, '', '', <strong>€104-198</strong>],
          ]}
        />

        <BlogInlineCTA title="Track your German trip." subtitle="Free map — 16 states." href="/signup" />

        <h2 id="lodging">4. Lodging</h2>
        <BlogTable
          caption="Accommodations"
          headers={['Base', 'Budget', 'Mid-range', 'Splurge']}
          rows={[
            ['Berlin', 'Circus Hostel Mitte', 'Sir Savigny', 'Hotel de Rome'],
            ['Dresden', 'Hostel Mondpalast', 'Swissôtel Dresden', 'Hotel Taschenbergpalais'],
            ['Munich', 'The Tent', 'H2 Hotel Munich Olympiapark', 'Bayerischer Hof'],
            ['Rothenburg', 'Rossmühle DJH', 'Hotel Eisenhut', 'Burghotel Rothenburg'],
            ['Cologne', 'Stayokay Köln', 'Hotel im Wasserturm', 'Excelsior Hotel Ernst'],
          ]}
        />

        <h2 id="alt">5. Alternatives</h2>
        <h3>🎄 Christmas Markets Tour</h3>
        <p><strong>Nuremberg (3) → Rothenburg (2) → Munich (3) → Cologne (2) → Dresden (3)</strong>. All top 5 markets. Dec only.</p>
        <h3>🏖️ Baltic Coast</h3>
        <p><strong>Berlin (3) → Hamburg (3) → Sylt (2) → Rügen (3) → Lübeck (2)</strong>. Northern + sea.</p>
        <h3>🏔️ Bavaria Deep-Dive</h3>
        <p><strong>Munich (4) → Neuschwanstein (1) → Berchtesgaden (2) → Nuremberg (2) → Regensburg (2)</strong>. Bavaria only.</p>

        <h2 id="faq">6. FAQ</h2>
        <h3>10 days version?</h3><p>Drop Cologne or Heidelberg. 10-day: Berlin (3) → Dresden (2) → Munich (3) → Romantic Road (1).</p>
        <h3>Best month?</h3><p><strong>May-June or September</strong>. Late Sept for Oktoberfest (need Munich booking 6 months out).</p>

        <h2 id="keep">Keep Reading</h2>
        <ul>
          <li><Link to="/blog/germany-travel-guide-2026">Ultimate Germany Guide →</Link></li>
          <li><Link to="/blog/best-germany-destinations-2026">10 Best German Destinations →</Link></li>
          <li><Link to="/blog/german-food-guide-2026">20 German Dishes →</Link></li>
          <li><Link to="/blog/germany-christmas-markets-2026">Christmas Markets →</Link></li>
        </ul>

        <BlogEndCTA
          title="Turn this into your Germany map."
          subtitle="Stamp each state. Free, forever."
        />
      </article>
    </BlogShell>
  );
}
