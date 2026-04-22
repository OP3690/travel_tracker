import React from 'react';
import { Link } from 'react-router-dom';
import { BlogShell, useBlogSEO, useRevealOnScroll } from '../BlogLayout';
import { BlogTable, BlogCallout, BlogStatGrid, BlogInlineCTA, BlogEndCTA, BlogBarChart } from '../BlogComponents';
import { BlogSpainMap } from '../BlogSpainMap';
import { getPostBySlug } from '../posts';

const SLUG = 'two-week-spain-itinerary-2026';
const ROUTE = ['madrid', 'castile-la-mancha', 'andalusia', 'catalonia', 'valencia'];

export default function TwoWeekSpainItinerary2026() {
  const post = getPostBySlug(SLUG);
  useBlogSEO({
    title: `${post.title} | StampYourMap Blog`,
    description: post.description,
    url: `/blog/${SLUG}`,
    image: post.ogImage,
    datePublished: post.datePublished,
    keywords: 'spain itinerary 2 weeks, madrid seville granada barcelona itinerary, spain 14 days, spain trip plan 2026',
  });
  useRevealOnScroll();

  return (
    <BlogShell>
      <article className="blog-article">
        <div className="blog-breadcrumbs">
          <Link to="/">Home</Link> / <Link to="/blog">Blog</Link> / <span>2-Week Spain Itinerary</span>
        </div>
        <div className="blog-hero">
          <span className="blog-cat-chip">Spain · Itinerary</span>
          <span className="blog-meta-sep">•</span><span>Published April 22, 2026</span>
          <span className="blog-meta-sep">•</span><span>{post.readMinutes} min read</span>
        </div>

        <h1>{post.heroEmoji} The Perfect 2-Week Spain Itinerary: Madrid → Seville → Granada → Barcelona → Valencia (2026)</h1>

        <p className="blog-lede">
          14 days covering Madrid's art triangle, Andalucía's Moorish
          heritage (Seville, Granada, Córdoba), Catalonia's Gaudí
          masterpieces, and Valencia's paella + modern architecture.
          Four AVE high-speed rail legs, zero wasted days.
        </p>

        <BlogStatGrid stats={[
          { value: '14', label: 'Days' },
          { value: '5', label: 'Regions' },
          { value: '4', label: 'AVE legs' },
          { value: '€2,400', label: 'Mid-range total' },
        ]} />

        <BlogInlineCTA title="Stamp each Spanish region." subtitle="Free interactive map, 17 regions preloaded." href="/signup" />

        <h2 id="route">1. The Route</h2>
        <BlogSpainMap
          regionIds={ROUTE}
          title="Madrid → Toledo → Andalucía → Barcelona → Valencia"
          subtitle="Five regions, four high-speed trains, one beautiful Spanish loop."
        />

        <h2 id="day-by-day">2. Day-by-Day</h2>
        <BlogTable
          caption="Recommended 14-day plan"
          headers={['Day', 'Base', 'What you\'re doing']}
          rows={[
            ['1', <strong>Madrid</strong>, 'Arrive MAD; check-in Sol/Malasaña; late tapas dinner (Spain eats at 10 PM)'],
            ['2', <strong>Madrid</strong>, 'Prado Museum (book 2 hr slot) + Retiro Park + Plaza Mayor'],
            ['3', <strong>Madrid + Toledo</strong>, 'Day-trip Toledo (30-min AVE); Cathedral + El Greco museum'],
            ['4', <strong>Seville</strong>, 'AVE Madrid → Seville (2h30); Plaza de España sunset; flamenco show evening'],
            ['5', <strong>Seville</strong>, 'Alcázar + Cathedral + Barrio Santa Cruz; dinner at Casa Morales'],
            ['6', <strong>Córdoba day-trip</strong>, 'AVE Seville → Córdoba (45 min); Mezquita + Jewish Quarter'],
            ['7', <strong>Granada</strong>, 'AVE or bus to Granada (2h30); Albaicín evening walk; sunset at Mirador San Nicolás'],
            ['8', <strong>Granada</strong>, 'Alhambra morning (book 3 months ahead) + Sacromonte flamenco cave'],
            ['9', <strong>Barcelona</strong>, 'AVE Granada → Barcelona (6h30 via Madrid) OR short flight'],
            ['10', <strong>Barcelona</strong>, 'Sagrada Familia (9 AM slot) + Park Güell + Gothic Quarter'],
            ['11', <strong>Barcelona</strong>, 'Casa Batlló + Casa Milà + Barceloneta beach + tapas crawl'],
            ['12', <strong>Valencia</strong>, 'AVE Barcelona → Valencia (3 hr); Ciudad de las Artes + Albufera rice fields'],
            ['13', <strong>Valencia</strong>, 'Paella lunch at a beach chiringuito; Central Market; Turia Gardens'],
            ['14', <strong>Madrid → home</strong>, 'AVE Valencia → Madrid (1h50); MAD international flight'],
          ]}
        />

        <BlogCallout title="The Alhambra is non-negotiable">
          <p>
            Book Alhambra tickets <strong>3 months ahead</strong> on the
            official site (alhambra-patronato.es). They sell out daily
            April-October. Grab the "general visit" ticket — €19, lets
            you into Nasrid Palaces, Generalife, Alcazaba. Ticket is
            timed entry for the Nasrid Palaces only.
          </p>
        </BlogCallout>

        <h2 id="trains">3. AVE + Flight Legs</h2>
        <BlogTable
          caption="Intercity segments (2026 EUR, 60 days ahead)"
          headers={['Day', 'Route', 'Duration', 'Cost']}
          rows={[
            ['4', 'Madrid → Seville', '2h30 AVE', '€30-55'],
            ['6', 'Seville ↔ Córdoba (day-trip)', '45 min each way', '€40 round-trip'],
            ['7', 'Seville → Granada', '2h30 AVE / bus', '€12-28'],
            ['9', 'Granada → Barcelona', '6h30 AVE / 1h flight', '€45 AVE or €55 flight'],
            ['12', 'Barcelona → Valencia', '3 hr AVE', '€25-45'],
            ['14', 'Valencia → Madrid (for flight)', '1h50 AVE', '€22-40'],
            [<strong>Transit total</strong>, '', '', <strong>€175-250</strong>],
          ]}
        />

        <h2 id="lodging">4. Where to Sleep</h2>
        <BlogTable
          caption="Recommended accommodations per base"
          headers={['Base', 'Budget', 'Mid-range', 'Splurge']}
          rows={[
            ['Madrid', 'Generator Madrid', 'Hotel Urban', 'Four Seasons Madrid'],
            ['Seville', 'TOC Hostel Sevilla', 'Hotel Palacio Alcázar', 'Mercer Sevilla'],
            ['Granada', 'Oasis Backpackers Hostel', 'Hotel Casa 1800', 'Parador de Granada'],
            ['Barcelona', 'Generator Barcelona', 'Hotel Pulitzer', 'Hotel Arts Barcelona'],
            ['Valencia', 'Purple Nest Hostel', 'Caro Hotel', 'The Westin Valencia'],
          ]}
        />

        <BlogInlineCTA title="Track your progression." subtitle="Stamp each city + region on your free map." href="/signup" />

        <h2 id="cost">5. Total Cost</h2>
        <BlogBarChart
          title="14-day Spain trip breakdown (mid-range ~€2,400)"
          subtitle="Per-person spend, excluding international flight."
          max={100} unit="%"
          data={[
            { label: 'Accommodation', value: 42, valueLabel: '42%' },
            { label: 'Food + tapas', value: 22, valueLabel: '22%' },
            { label: 'AVE + transport', value: 10, valueLabel: '10%' },
            { label: 'Museums + attractions', value: 12, valueLabel: '12%' },
            { label: 'City transport', value: 6, valueLabel: '6%' },
            { label: 'Buffer', value: 8, valueLabel: '8%' },
          ]}
        />

        <BlogTable
          caption="14-day per-person total (EUR)"
          headers={['Tier', 'Daily × 14', 'Transport', 'Activities', 'Total']}
          rows={[
            ['Backpacker', '€700', '€175', '€100', <strong>€975</strong>],
            ['Mid-range', '€1,850', '€220', '€200', <strong>€2,270</strong>],
            ['Comfort', '€4,200', '€330', '€500', <strong>€5,030</strong>],
          ]}
        />

        <h2 id="alt">6. Alternative Routes</h2>
        <h3>🏖️ Beach + tapas</h3>
        <p>
          <strong>Madrid (3) → Seville (2) → Málaga (3) → Valencia (3) → Barcelona (3)</strong>.
          More coast, less mountain. Better May-October.
        </p>
        <h3>🍽️ Basque food focus</h3>
        <p>
          <strong>Madrid (3) → Bilbao (2) → San Sebastián (3) → Barcelona (3) → Valencia (3)</strong>.
          San Sebastián has more Michelin stars per capita than anywhere.
        </p>
        <h3>🏝️ City + island</h3>
        <p>
          <strong>Barcelona (4) → Mallorca (5) → Madrid (3) → Seville (2)</strong>.
          Pair Catalonia with the Balearics.
        </p>

        <h2 id="faq">7. FAQ</h2>
        <h3>Can I realistically do this itinerary in 10 days?</h3>
        <p>{"Yes — drop Valencia and tighten Andalusia to one city: Madrid (3) → Seville (2) → Granada (2) → Barcelona (3). Under 10 days and you're spending more time on AVEs than plazas; either add a week or commit to Madrid + Barcelona only. Ten days is intense but workable — 14 is noticeably more pleasant."}</p>
        <h3>What's the best month to run this route?</h3>
        <p>{"April-early June and mid-September to October win — 20-28°C, shoulder prices, and Andalusia is bearable (not 42°C like August). July-August turns Seville and Córdoba into furnaces; Madrid half-empties as locals flee. March is nice everywhere except the cool north; November is quiet and cheap but wet in Basque Country."}</p>
        <h3>Should I reverse the route and fly into Barcelona?</h3>
        <p>{"Absolutely — flights from the US East Coast to BCN are often €80-150 cheaper than MAD in shoulder season, and ending in Madrid gives you a cheap onward hop to Lisbon or Porto. Reverse routing also lets you acclimate on the coast before hitting the inland heat of Córdoba and Seville. AVE fares are identical either direction."}</p>
        <h3>When should I book AVE tickets for the best prices?</h3>
        <p>{"Renfe opens booking 60-90 days ahead with 'Promo' and 'Promo+' fares starting at €18-30 (Madrid-Barcelona, Madrid-Seville). Same-day walk-up runs €110-140. Ouigo España and Iryo (low-cost competitors on Madrid-Barcelona and Madrid-Valencia) start at €9-25 booked 2-3 months out. Set a calendar reminder — fares rise quickly as the train fills."}</p>
        <h3>Do I need internal flights or is rail enough?</h3>
        <p>{"Rail is enough for everything except the islands (Mallorca, Ibiza, Canaries) and Galicia if you're short on time. Vueling and Ryanair fly Barcelona-Seville in 1h45 for €30-60 booked early; it saves a day over the train (5h30). For the classic 14-day loop Madrid-Seville-Granada-Valencia-Barcelona, AVE beats flying every time on total door-to-door time."}</p>
        <h3>Can I pack carry-on only for two weeks?</h3>
        <p>{"Easily — a 40L backpack or 35L spinner plus a daypack. AVE luggage racks are tight, Barcelona and Madrid metros have stairs without elevators at many stations, and you'll walk cobbled streets daily. Plan one laundry cycle mid-trip (€6-9 at self-service lavomatics; most hostels have facilities). Ryanair's 10kg cabin limit is genuinely enforced — measure before you leave."}</p>
        <h3>How do I handle jet lag on arrival day?</h3>
        <p>{"Book a hotel with early check-in guarantee (many Madrid hotels allow 11:00-noon for a €15-25 fee); shower, walk El Retiro park for 2 hours, eat a light lunch, and force yourself to stay awake until 22:00 local. Save the Prado and major sights for day 2. Spanish dinner at 21:30 actually works in your favour — matches East Coast body clock."}</p>
        <h3>Is this itinerary good with kids, and how should I adjust?</h3>
        <p>{"Very good for ages 6+. Swap one museum day in each city for a park (Retiro in Madrid, Parc de la Ciutadella in Barcelona, Maria Luisa in Seville) plus a flamenco show kids enjoy (Casa Patas Madrid, El Palacio Andaluz Seville). Add one Valencia beach day. Under-4s ride Renfe free; 4-13 at 40% off. Spain is stroller-tolerant but cobbled streets in Granada Albaicín are brutal."}</p>
        <h3>Can I add Portugal (Lisbon or Porto) to this route?</h3>
        <p>{"Yes — Madrid-Lisbon is a 7h overnight train (€30-60) or 1h15 flight (€35-70 on Ryanair/TAP); Seville-Lagos via Faro is a 4h bus for €25. Add 3 nights minimum in Lisbon. Porto pairs well with Galicia (Santiago-Porto is 3h by bus). Don't try a 2-night Lisbon tack-on — you waste 60% on transit."}</p>
        <h3>Is this trip doable for solo travellers or better as a couple?</h3>
        <p>{"Both work. Couples get better value on hotel rooms (€85-140 doubles beat two dorm beds). Solos thrive on Spain's social food culture — tapas crawls, food tours, and Spanish-language meetups. Basque pintxo bars are particularly solo-friendly (standing crowd, easy conversation). Hostels across Spain are modern and safe: Casa Gracia (Barcelona), The Hat (Madrid), The Nomad (Seville)."}</p>
        <h3>What's the rainy-day backup plan per city?</h3>
        <p>{"Madrid: Prado + Reina Sofía + Thyssen art-triangle combo ticket. Barcelona: Sagrada Família, Picasso Museum, MNAC. Seville: Cathedral, Real Alcázar, Metropol Parasol. Granada: Alhambra audio tour (still magical in rain), Cartuja monastery. Valencia: City of Arts and Sciences oceanarium. Rain is genuinely rare April-October except in San Sebastián and the north."}</p>
        <h3>What's the one scheduling mistake people make?</h3>
        <p>{"Not pre-booking Alhambra tickets (Granada) and Sagrada Família (Barcelona) — Alhambra General Tickets sell out 2-3 months ahead for peak months and it's the one sight you genuinely cannot substitute. Book the moment your flights are set. Also pre-book Prado skip-the-line and Real Alcázar morning slots."}</p>
        <h3>How accessible is this route for older travellers?</h3>
        <p>{"Adjust pace to 3 nights minimum per stop (cut to 12-day version: Madrid 3, Seville 3, Barcelona 3, Valencia 3), book hotels with lifts (not all boutique hotels in Granada Albaicín have them), and use taxis or Cabify (€5-12 city rides) liberally. AVE offers wheelchair service with 48h notice via Atendo. Avoid Granada's steep Albaicín cobbles if balance is a concern."}</p>
        <h3>How much should I budget per person for this itinerary?</h3>
        <p>{"Backpacker €50/day × 14 = €700. Mid-range €100/day = €1,400. Comfort €220/day = €3,080. Add €120-180 for AVE legs booked early, €40-60 for metro/buses, and €80-150 for Alhambra + Sagrada Família + Prado entries. Flights into Madrid or Barcelona from the US are €450-850 roundtrip shoulder season."}</p>
        <h3>What if a Renfe strike or delay hits mid-trip?</h3>
        <p>{"Check Renfe's app Info Trafico for advance strike notices. Fallbacks: BlaBlaCar ride-shares (€20-40 between major cities), ALSA buses (Madrid-Seville 6h30 for €22), or last-minute Ouigo/Iryo on competing high-speed routes. Travel insurance with rail-strike coverage reimburses extra lodging. Strikes are typically announced 5-10 days ahead and last 1-3 days."}</p>

        <h2 id="keep">Keep Reading</h2>
        <ul>
          <li><Link to="/blog/spain-travel-guide-2026">Ultimate Spain Guide →</Link></li>
          <li><Link to="/blog/best-spain-regions-2026">10 Best Spanish Regions →</Link></li>
          <li><Link to="/blog/spanish-food-guide-2026">25 Spanish Dishes →</Link></li>
          <li><Link to="/blog/barcelona-complete-guide-2026">Barcelona Guide →</Link></li>
          <li><Link to="/blog/spain-budget-travel-2026">Spain Budget Guide →</Link></li>
        </ul>

        <BlogEndCTA
          title="Turn this itinerary into your personal Spain map."
          subtitle="Stamp every region. Free forever."
        />
      </article>
    </BlogShell>
  );
}
