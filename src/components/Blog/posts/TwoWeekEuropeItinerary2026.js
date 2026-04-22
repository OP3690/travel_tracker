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
        <p>{"Yes, by dropping either Amsterdam or Prague. A tight 10-day version: "}<strong>London (3) → Paris (3) → Berlin (2) → Rome (2)</strong>{". Fewer travel days, more anchored time in each city. Below 10 days, drop Berlin entirely — the London-Paris-Amsterdam triangle via Eurostar works cleanly in 7–8 days."}</p>

        <h3>What's the best month for this route?</h3>
        <p><strong>{"May or September"}</strong>{" — mild weather (18–24°C), all attractions open, 25–35% lower hotel prices than July/August, and minimal tour-bus chaos. "}<strong>June</strong>{" is also excellent if you don't mind crowds. Avoid "}<strong>July–August in Paris/Rome (heat + tourist peak)</strong>{" and anything November–March unless Christmas markets are the draw."}</p>

        <h3>Can I reverse the route and start in Rome?</h3>
        <p>{"Yes — flying into Rome or Paris is often "}<strong>20–30% cheaper from US West Coast</strong>{" than London. Reverse route: Rome → Prague → Berlin → Amsterdam → Paris → London. You finish at the easiest airport (Heathrow) for a jet-lagged departure. Eurostar London→Paris is one-way-friendly; book 60+ days out for £39 fares."}</p>

        <h3>Do I need to book everything in advance?</h3>
        <p><strong>{"Trains 60+ days out"}</strong>{" for Super Economy Eurostar (£39), Frecciarossa (€19–39), and ICE (€29). "}<strong>Major museums (Uffizi, Vatican, Louvre, Anne Frank House) 2 months out</strong>{" — they sell out. "}<strong>Hotels 30–60 days for May/September</strong>{". Restaurants a few days out for dinner; week-of for lunch. Day tours 2+ weeks for top-tier options."}</p>

        <h3>How do I handle jet lag on day 1?</h3>
        <p>{"Europe is "}<strong>5–9 hours ahead of the US</strong>{". Plan day 1 as a half-day — drop bags at hotel, walk the city centre for 2–3 hours, eat an early dinner at 6 PM, bed by 9. Aggressive morning sunlight on day 2 anchors your new clock. Avoid red-eye naps; melatonin 0.5 mg is optional assistance. First-day attempts at major museums waste your ticket."}</p>

        <h3>Carry-on or checked bag?</h3>
        <p><strong>{"Carry-on only almost always wins"}</strong>{" — European cobblestones, 19th-century hotels with tight lifts, narrow budget-airline seat allowances. A 40L softside bag fits Eurostar overhead racks, Ryanair carry-on, and every train luggage shelf. "}<strong>Laundry is €10–15 wash-and-fold</strong>{" in every city. Skip the American suitcase instinct; pack clothes that mix-and-match."}</p>

        <h3>Eurail/Interrail Pass vs point-to-point tickets?</h3>
        <p><strong>{"Point-to-point wins for most itineraries"}</strong>{". Six legs (London-Paris, Paris-Amsterdam, Amsterdam-Berlin, Berlin-Prague, Prague-Rome flight) booked 60 days out cost "}<strong>€200–280</strong>{" total. A 7-day Eurail Global Pass is €380+ plus reservation fees. Passes shine only if you're taking 6+ long trains without advance booking or doing heavy Central-European hops."}</p>

        <h3>When should I use internal flights?</h3>
        <p>{"When the train journey exceeds 6 hours. "}<strong>Prague → Rome</strong>{" is 12+ hours by train; fly Ryanair for €30–60 in 2 hours. "}<strong>Berlin → Barcelona, London → Athens</strong>{" — fly. Everything else: train. "}<strong>Avoid flying short-hops (Paris–Amsterdam, Frankfurt–Berlin)</strong>{" — trains are faster door-to-door once you count airport transfers."}</p>

        <h3>How do Schengen day limits apply?</h3>
        <p>{"This route uses 11 Schengen days (Paris-Amsterdam-Berlin-Prague-Rome) and 3 UK days. "}<strong>US, UK, CA, AU, NZ passports get 90 Schengen days per 180-day window</strong>{". If you've travelled Europe in the past 6 months, subtract those days. "}<strong>UK is no longer Schengen (post-Brexit)</strong>{" — counts separately. ETIAS (€7 pre-authorisation) launches late 2026."}</p>

        <h3>Is this itinerary fine for solo travellers?</h3>
        <p>{"Excellent for solos — all six cities have huge hostel scenes ($35–55 dorms at "}<strong>Generator, Wombat's, St. Christopher's</strong>{"), English is widely spoken, and transport is idiot-proof. Book female-only dorms if preferred. Join a "}<strong>Sandeman's free walking tour (tip €10)</strong>{" in each city to meet people fast. Berlin, Amsterdam, and Prague have the strongest solo social scenes."}</p>

        <h3>Can I do this with kids (ages 6–12)?</h3>
        <p>{"Yes, with tweaks. Cut one city (5 cities max, not 6). Pre-book "}<strong>Colosseum Kids Tour, Anne Frank House, Paris Catacombs for the ghoulish-minded</strong>{". Base in one hotel for 3+ nights to stabilise routines. Swap museum marathons for "}<strong>Tuileries playground, Hyde Park, Amsterdam canal boat, Olympia Park Berlin</strong>{". Most European kids eat adult food — ordering off-menu is standard."}</p>

        <h3>Can elderly parents handle this pace?</h3>
        <p>{"Cut to "}<strong>4 cities in 14 days, 3+ nights each</strong>{". Upgrade to Eurostar/Frecciarossa premium cars (€20–30 surcharge, quiet and roomy). Pre-book skip-the-line tickets everywhere to avoid standing queues. Use "}<strong>elevator-equipped hotels near metros</strong>{" (not cobbled boutiques). Skip Prague's steep castle hill — take the tram to the top and walk down."}</p>

        <h3>Rainy-day backup plan?</h3>
        <p>{"Every major city has an indoor 'escape kit'. "}<strong>London: Tate, British Museum, Borough Market</strong>{". "}<strong>Paris: Louvre, Musée d'Orsay, covered passages (Galerie Vivienne)</strong>{". "}<strong>Amsterdam: Rijksmuseum, Anne Frank, cafés</strong>{". "}<strong>Berlin: Museum Island, Topography of Terror, Markthalle Neun</strong>{". "}<strong>Rome: Vatican, Galleria Borghese, covered trattoria lunches</strong>{". Pre-book if possible; walk-up lines balloon in rain."}</p>

        <h3>Where should I base for day-trips?</h3>
        <p><strong>{"Paris for Versailles + Giverny"}</strong>{" (30–60 min each). "}<strong>Amsterdam for Zaanse Schans windmills + Haarlem</strong>{". "}<strong>Berlin for Potsdam + Sachsenhausen</strong>{". "}<strong>Rome for Tivoli + Ostia Antica</strong>{". Keep day-trips to days 3–5 of a city base when you've earned a break from the main sights. Book train tickets same-day."}</p>

        <h3>Best ATM and cash strategy?</h3>
        <p>{"Use "}<strong>Wise, Revolut, or Charles Schwab cards</strong>{" to refund ATM fees. Withdraw at "}<strong>bank-branded ATMs</strong>{" (Barclays, BNP, Deutsche Bank, Česká spořitelna) — never Euronet. Take €200–300 per country; cards work nearly everywhere. "}<strong>{"Always choose 'charge in EUR/GBP/CZK'"}</strong>{" (decline dynamic-currency-conversion) and watch for hidden fees at London-area ATMs."}</p>

        <h3>Travel insurance — is it essential?</h3>
        <p>{"Yes. "}<strong>€100,000+ medical + €500,000 evacuation + trip-interruption</strong>{" coverage. "}<strong>SafetyWing ($45/month)</strong>{" for nomadic travellers; "}<strong>Allianz, World Nomads</strong>{" for single-trip. Rail strikes in France and Germany are common — 'missed connection' cover is useful. EU pharmacies are excellent for minor issues without insurance claims."}</p>

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
