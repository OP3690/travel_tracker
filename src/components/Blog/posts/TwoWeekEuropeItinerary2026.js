import React from 'react';
import { Link } from 'react-router-dom';
import { BlogShell, useBlogSEO, useRevealOnScroll } from '../BlogLayout';
import { BlogTable, BlogCallout, BlogStatGrid, BlogInlineCTA, BlogEndCTA, BlogBarChart } from '../BlogComponents';
import { BlogEuropeMap } from '../BlogEuropeMap';
import { getPostBySlug } from '../posts';

const SLUG = 'two-week-europe-itinerary-2026';
const ROUTE = ['gb', 'fr', 'nl', 'de', 'cz', 'it'];

export default function TwoWeekEuropeItinerary2026() {
  const post = getPostBySlug(SLUG);
  useBlogSEO({
    title: `${post.title} | StampYourMap Blog`,
    description: post.description,
    url: `/blog/${SLUG}`,
    image: post.ogImage,
    datePublished: post.datePublished,
    keywords: 'europe itinerary 2 weeks, first time europe, london paris amsterdam berlin prague rome, europe trip plan, 14 days europe',
  });
  useRevealOnScroll();

  return (
    <BlogShell>
      <article className="blog-article">
        <div className="blog-breadcrumbs">
          <Link to="/">Home</Link> / <Link to="/blog">Blog</Link> / <span>2-Week Europe Itinerary</span>
        </div>
        <div className="blog-hero">
          <span className="blog-cat-chip">Europe · Itinerary</span>
          <span className="blog-meta-sep">•</span><span>Published April 22, 2026</span>
          <span className="blog-meta-sep">•</span><span>{post.readMinutes} min read</span>
        </div>

        <h1>{post.heroEmoji} The Perfect 2-Week Europe Itinerary: London → Paris → Amsterdam → Berlin → Prague → Rome (2026)</h1>

        <p className="blog-lede">
          After helping thousands of first-time European travelers, one
          itinerary emerges as the clear winner: 14 days covering London's
          British history, Paris's art + romance, Amsterdam's canals,
          Berlin's layered history, Prague's fairy-tale old town, and
          Rome's ancient core. Six countries, five high-speed trains,
          one short flight, zero wasted days. Here it is day by day.
        </p>

        <BlogStatGrid stats={[
          { value: '14', label: 'Days' },
          { value: '6', label: 'Countries' },
          { value: '6', label: 'Flagship cities' },
          { value: '€3,500', label: 'Mid-range total' },
        ]} />

        <BlogInlineCTA title="Stamp each country." subtitle="Free interactive travel map." href="/signup" />

        <h2 id="route">1. The Full Route, Mapped</h2>
        <BlogEuropeMap
          regionIds={ROUTE}
          title="United Kingdom → France → Netherlands → Germany → Czechia → Italy"
          subtitle="The classic first-timer Europe loop, 14 days."
        />

        <h2 id="day-by-day">2. Day-by-Day Plan</h2>
        <BlogTable
          caption="Recommended 14-day plan"
          headers={['Day', 'Base', 'What you\'re doing']}
          rows={[
            ['1', <strong>London</strong>, 'Arrive Heathrow; check-in near King\'s Cross or Covent Garden; pub dinner'],
            ['2', <strong>London</strong>, 'Westminster + Parliament + Tower of London + Thames walk'],
            ['3', <strong>London</strong>, 'British Museum + Covent Garden + West End show evening'],
            ['4', <strong>Paris</strong>, 'Eurostar St Pancras → Gare du Nord (2h15); evening Seine cruise + dinner'],
            ['5', <strong>Paris</strong>, 'Eiffel + Louvre (book 9 AM slot) + Montmartre sunset'],
            ['6', <strong>Paris</strong>, 'Versailles day-trip; evening café terrace'],
            ['7', <strong>Amsterdam</strong>, 'Thalys Paris → Amsterdam (3h20); canal walk + Anne Frank House'],
            ['8', <strong>Amsterdam</strong>, 'Van Gogh + Rijksmuseum + Jordaan neighborhood'],
            ['9', <strong>Berlin</strong>, 'ICE train Amsterdam → Berlin (6h30); Brandenburg Gate evening'],
            ['10', <strong>Berlin</strong>, 'Berlin Wall + Memorial + Museum Island; techno club night'],
            ['11', <strong>Prague</strong>, 'EC Berlin → Prague (4h30); Old Town Square + Charles Bridge'],
            ['12', <strong>Prague</strong>, 'Prague Castle + Lesser Town; dinner at U Modré Kachničky'],
            ['13', <strong>Rome</strong>, 'Flight Prague → Rome (1h50, ~€65); evening Trastevere dinner'],
            ['14', <strong>Rome → home</strong>, 'Colosseum morning (7:30 AM early entry); FCO departure'],
          ]}
        />

        <BlogCallout title="The critical booking">
          <p>
            <strong>Book Eurostar (London → Paris) 60-90 days ahead</strong> —
            same-week walk-up tickets are £200+; 60-day-ahead are £60-90.
            This is the single biggest savings opportunity on this
            itinerary.
          </p>
        </BlogCallout>

        <h2 id="transit">3. The 5 Train Legs + 1 Flight (2026 EUR)</h2>
        <BlogTable
          caption="Train and flight cost breakdown"
          headers={['Day', 'Segment', 'Mode', 'Cost']}
          rows={[
            ['4', 'London → Paris', 'Eurostar (2h15)', '€60-120'],
            ['7', 'Paris → Amsterdam', 'Thalys (3h20)', '€55-95'],
            ['9', 'Amsterdam → Berlin', 'ICE (6h30)', '€65-110'],
            ['11', 'Berlin → Prague', 'EC regional (4h30)', '€35-55'],
            ['13', 'Prague → Rome', 'Flight (1h50)', '€50-90 Ryanair/Smartwings'],
            ['14', 'Rome center → FCO airport', 'Leonardo Express', '€14'],
            [<strong>Transit total</strong>, '', '', <strong>~€280-470</strong>],
          ]}
        />

        <BlogInlineCTA title="Stamp-as-you-go." subtitle="Map every country on your free StampYourMap." href="/signup" />

        <h2 id="lodging">4. Where to Sleep</h2>
        <BlogTable
          caption="Recommended accommodations per city"
          headers={['City', 'Budget ($)', 'Mid-range ($$)', 'Splurge ($$$)']}
          rows={[
            ['London', 'Generator London (Kings Cross)', 'Premier Inn Covent Garden', 'The Savoy'],
            ['Paris', 'Generator Paris', 'Hotel de la Place du Louvre', 'Le Bristol Paris'],
            ['Amsterdam', 'ClinkNOORD', 'Conservatorium Boutique', 'Waldorf Astoria'],
            ['Berlin', 'Circus Hostel Mitte', 'Sir Savigny', 'Hotel de Rome'],
            ['Prague', 'Mosaic House', 'Hotel Tschaikowsky', 'Four Seasons Prague'],
            ['Rome', 'Generator Rome', 'Hotel Artemide', 'Hassler Roma'],
          ]}
        />

        <h2 id="cost">5. Total Trip Cost</h2>
        <BlogBarChart
          title="14-day Europe trip breakdown — mid-range ~€3,500"
          subtitle="Per-person spend, excluding intercontinental flight."
          max={100} unit="%"
          data={[
            { label: 'Accommodation', value: 40, valueLabel: '40%' },
            { label: 'Food & drink', value: 22, valueLabel: '22%' },
            { label: 'Trains + 1 flight', value: 12, valueLabel: '12%' },
            { label: 'Museums + attractions', value: 10, valueLabel: '10%' },
            { label: 'City transport', value: 6, valueLabel: '6%' },
            { label: 'Buffer', value: 10, valueLabel: '10%' },
          ]}
        />

        <BlogTable
          caption="Full 14-day cost per person (EUR)"
          headers={['Tier', 'Daily', 'Transit', 'Activities', 'Total']}
          rows={[
            ['Budget', '€900 (hostels)', '€280', '€180', <strong>€1,360</strong>],
            ['Mid-range', '€2,700', '€370', '€350', <strong>€3,420</strong>],
            ['Comfort', '€6,000', '€470', '€700', <strong>€7,170</strong>],
          ]}
        />

        <h2 id="alternatives">6. Three Alternative Routes</h2>

        <h3>🍷 Food + Wine Europe (bon vivant)</h3>
        <p>
          <strong>Paris (3) → Lyon (2) → Florence (3) → Bologna (2) → Rome (3) → Amalfi (1)</strong>.
          Skip Germany + Netherlands + UK; double down on food and wine
          regions.
        </p>

        <h3>☀️ Mediterranean Summer</h3>
        <p>
          <strong>Lisbon (3) → Barcelona (3) → Nice/Monaco (2) → Rome (3) → Athens (3)</strong>.
          Beach-focused summer route. Best June-Sept.
        </p>

        <h3>💰 Budget Eastern Europe</h3>
        <p>
          <strong>Prague (3) → Vienna (2) → Budapest (3) → Krakow (3) → Berlin (3)</strong>.
          Half the cost of the classic route; genuinely excellent.
        </p>

        <h2 id="pro-tips">7. 12 Pro Tips</h2>
        <ol>
          <li>Book Eurostar + Louvre + Colosseum tickets 60-90 days ahead</li>
          <li>Use Trainline or Omio for cross-border train bookings — cheaper than national rail sites</li>
          <li>Budget airlines (Ryanair, Wizz, EasyJet) have baggage rules that bite; read them twice</li>
          <li>Get a multi-country SIM (Orange Holiday Europe = 30GB, 14 days, €39) or eSIM</li>
          <li>Amsterdam: don't hotel in the Red Light District unless you like noise</li>
          <li>Paris metro tickets are digital now (Navigo card). RATP app handles everything</li>
          <li>Berlin has no subway gate — buy ticket + validate. Plainclothes inspectors fine €60</li>
          <li>Prague beer at a restaurant is cheaper than water. Order beer</li>
          <li>Rome Colosseum Combo ticket (€22) includes Forum + Palatine Hill — single ticket</li>
          <li>London Oyster card auto-refills, easier than Tube paper tickets</li>
          <li>Download Google Maps offline for every city</li>
          <li>Pack light — you\'re moving every 2-3 days. Carry-on only = freedom</li>
        </ol>

        <h2 id="faq">8. FAQ</h2>
        <h3>Can I do this in 10 days?</h3>
        <p>Yes — drop Amsterdam or Prague. 10-day: London (3) → Paris (3) → Berlin (2) → Rome (2).</p>
        <h3>Best month?</h3>
        <p><strong>May or September</strong>. Warm, no crowds, best pricing.</p>
        <h3>Can I reverse the route?</h3>
        <p>Yes — fly into Rome first. Actually cheaper from US West Coast.</p>
        <h3>Do I need to book everything in advance?</h3>
        <p>Trains + major museums + Eurostar: yes, 60+ days. Hotels: 30-60 days. Restaurants: week-of.</p>

        <h2 id="keep">Keep Reading</h2>
        <ul>
          <li><Link to="/blog/europe-travel-guide-2026">Ultimate Europe Guide →</Link></li>
          <li><Link to="/blog/best-european-cities-2026">15 Best European Cities →</Link></li>
          <li><Link to="/blog/interrail-eurail-guide-2026">Interrail / Eurail Guide →</Link></li>
          <li><Link to="/blog/europe-budget-travel-2026">Europe Budget Guide →</Link></li>
        </ul>

        <BlogEndCTA
          title="Turn this into your personal Europe map."
          subtitle="Stamp every country, city, region. Free forever."
        />
      </article>
    </BlogShell>
  );
}
