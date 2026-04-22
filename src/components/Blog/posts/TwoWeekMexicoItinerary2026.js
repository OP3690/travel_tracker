import React from 'react';
import { Link } from 'react-router-dom';
import { BlogShell, useBlogSEO, useRevealOnScroll } from '../BlogLayout';
import { BlogTable, BlogCallout, BlogStatGrid, BlogInlineCTA, BlogEndCTA, BlogBarChart } from '../BlogComponents';
import { BlogMexicoMap } from '../BlogMexicoMap';
import { getPostBySlug } from '../posts';

const SLUG = 'two-week-mexico-itinerary-2026';
const ROUTE = ['cmx', 'pue', 'oax', 'yuc', 'roo'];

export default function TwoWeekMexicoItinerary2026() {
  const post = getPostBySlug(SLUG);
  useBlogSEO({
    title: `${post.title} | StampYourMap Blog`,
    description: post.description,
    url: `/blog/${SLUG}`,
    image: post.ogImage,
    datePublished: post.datePublished,
    keywords: 'mexico itinerary 2 weeks, mexico city oaxaca yucatan tulum itinerary, mexico 14 days, mexico trip plan 2026',
  });
  useRevealOnScroll();

  return (
    <BlogShell>
      <article className="blog-article">
        <div className="blog-breadcrumbs">
          <Link to="/">Home</Link> / <Link to="/blog">Blog</Link> / <span>2-Week Mexico Itinerary</span>
        </div>
        <div className="blog-hero">
          <span className="blog-cat-chip">Mexico · Itinerary</span>
          <span className="blog-meta-sep">•</span><span>Published April 22, 2026</span>
          <span className="blog-meta-sep">•</span><span>{post.readMinutes} min read</span>
        </div>

        <h1>{post.heroEmoji} The Perfect 2-Week Mexico Itinerary: Mexico City → Oaxaca → Yucatán → Tulum (2026)</h1>

        <p className="blog-lede">
          14 days covering Mexico's art + food capital (Mexico City),
          its cultural heart (Oaxaca), the Mayan world (Yucatán), and the
          Riviera Maya beaches (Tulum). Two domestic flights, one ADO
          bus, and the itinerary most travelers say gave them the
          fullest Mexico trip of their lives.
        </p>

        <BlogStatGrid stats={[
          { value: '14', label: 'Days' },
          { value: '5', label: 'States' },
          { value: '2', label: 'Domestic flights' },
          { value: '$1,800', label: 'Mid-range total (USD)' },
        ]} />

        <BlogInlineCTA title="Track each stop." subtitle="Stamp every Mexican state you visit — free map." href="/signup" />

        <h2 id="route">1. The Route</h2>
        <BlogMexicoMap
          regionIds={ROUTE}
          title="CDMX → Puebla → Oaxaca → Yucatán → Quintana Roo"
          subtitle="Five states, two flights, one grand Mexican loop."
        />

        <h2 id="day-by-day">2. Day-by-Day</h2>
        <BlogTable
          caption="Recommended 14-day plan"
          headers={['Day', 'Base', 'What you\'re doing']}
          rows={[
            ['1', <strong>Mexico City</strong>, 'Arrive MEX; check-in Roma/Condesa; first meal at Pujol or a pastor taco stand'],
            ['2', <strong>Mexico City</strong>, 'Historic Center + Zócalo + Templo Mayor + Palacio de Bellas Artes'],
            ['3', <strong>Mexico City</strong>, 'Teotihuacán day-trip (pyramids) + hot-air balloon option'],
            ['4', <strong>Mexico City</strong>, 'Frida Kahlo Casa Azul + Xochimilco boats + Anthropology Museum'],
            ['5', <strong>Puebla (day-trip or overnight)</strong>, '2 hr bus; Talavera ceramics + mole poblano + Cholula pyramid'],
            ['6', <strong>Oaxaca</strong>, 'Flight CDMX → OAX (1 hr); evening zócalo + Casa Oaxaca dinner'],
            ['7', <strong>Oaxaca</strong>, 'Monte Albán ruins + Mercado 20 de Noviembre + Tlacolula market'],
            ['8', <strong>Oaxaca</strong>, 'Hierve el Agua natural mineral pools + mezcal palenque tour'],
            ['9', <strong>Mérida (Yucatán)</strong>, 'Flight OAX → MID via CDMX (3-5 hr total); Mérida plaza evening'],
            ['10', <strong>Chichén Itzá + Cenotes</strong>, 'Day-tour; pyramid at 8 AM + 3 cenotes + Valladolid lunch'],
            ['11', <strong>Tulum</strong>, 'Bus Mérida → Tulum via Valladolid (4 hr); beach afternoon'],
            ['12', <strong>Tulum + Cenotes</strong>, 'Tulum ruins morning; Gran Cenote + Dos Ojos afternoon'],
            ['13', <strong>Isla Mujeres (day-trip)</strong>, 'Ferry from Cancún; snorkel + whale-shark (seasonal)'],
            ['14', <strong>Cancún → home</strong>, 'Morning at beach; CUN international flight'],
          ]}
        />

        <BlogCallout title="Altitude heads-up">
          <p>
            <strong>Mexico City is at 7,350 ft / 2,240 m.</strong> Arriving
            from sea level, roughly 15% of travelers feel mild altitude
            symptoms day 1 (shortness of breath, headache). Day 1 should
            be low-key — no big walks, lots of water, no alcohol.
          </p>
        </BlogCallout>

        <h2 id="flights">3. Flights & Buses</h2>
        <BlogTable
          caption="Internal transit segments (2026 USD)"
          headers={['Day', 'Route', 'Mode', 'Cost']}
          rows={[
            ['5', 'CDMX → Puebla', 'ADO bus (2 hr)', '$10-18'],
            ['6', 'CDMX → Oaxaca', 'Flight (1 hr) on Volaris/Viva', '$50-90'],
            ['9', 'Oaxaca → Mérida', 'Flight via CDMX (3-5 hr)', '$80-150'],
            ['11', 'Mérida → Tulum', 'ADO bus (4 hr) or 2-hr via Valladolid', '$20-30'],
            ['14', 'Tulum → Cancún airport', 'ADO bus 2 hr + shuttle', '$15-25'],
            [<strong>Total transit</strong>, '', '', <strong>$175-313</strong>],
          ]}
        />

        <h2 id="lodging">4. Where to Sleep</h2>
        <BlogTable
          caption="Recommended accommodations"
          headers={['Base', 'Budget', 'Mid-range', 'Splurge']}
          rows={[
            ['Mexico City', 'Casai Hostel', 'Umbral (Roma)', 'Four Seasons'],
            ['Oaxaca', 'Casa Angel Hostel', 'Casa Antonieta', 'Quinta Real Oaxaca'],
            ['Mérida', 'Luz en Yucatán', 'Casa Lecanda', 'Chablé Yucatán'],
            ['Tulum', 'Mama\'s Home Hostel', 'Casa Malca', 'Nomade Tulum'],
          ]}
        />

        <BlogInlineCTA title="Stamp your Mexico journey." subtitle="Free interactive map — all 32 states." href="/signup" />

        <h2 id="cost">5. Total Cost</h2>
        <BlogBarChart
          title="14-day Mexico trip breakdown (~$1,800)"
          subtitle="Per-person spend at mid-range, excl. international flight."
          max={100} unit="%"
          data={[
            { label: 'Accommodation', value: 38, valueLabel: '38%' },
            { label: 'Food', value: 20, valueLabel: '20%' },
            { label: 'Internal flights + buses', value: 14, valueLabel: '14%' },
            { label: 'Tours + cenotes + ruins', value: 14, valueLabel: '14%' },
            { label: 'Local transport', value: 6, valueLabel: '6%' },
            { label: 'Buffer', value: 8, valueLabel: '8%' },
          ]}
        />

        <BlogTable
          caption="14-day per-person total (USD)"
          headers={['Tier', 'Daily × 14', 'Transit', 'Activities', 'Total']}
          rows={[
            ['Backpacker', '$520', '$160', '$70', <strong>$750</strong>],
            ['Mid-range', '$1,320', '$230', '$250', <strong>$1,800</strong>],
            ['Comfort', '$3,640', '$310', '$500', <strong>$4,450</strong>],
          ]}
        />

        <h2 id="alt">6. Alternative Routes</h2>
        <h3>🏖️ Beach-maximising</h3>
        <p>
          <strong>Mexico City (3) → Los Cabos (4) → Puerto Vallarta (3) → Cancún/Tulum (4)</strong>.
          Skips Oaxaca + Yucatán interior for pure beach + resort.
        </p>
        <h3>🎨 Colonial cities</h3>
        <p>
          <strong>Mexico City (4) → San Miguel de Allende (3) → Guanajuato (2) → Querétaro (2) → Oaxaca (3)</strong>.
          Mexico's UNESCO-heavy colonial heart.
        </p>
        <h3>🐢 Nature + adventure</h3>
        <p>
          <strong>Mexico City (3) → Oaxaca (3) → Chiapas (San Cristóbal + Palenque, 4) → Yucatán (4)</strong>.
          Rainforests + jungle ruins + cenotes.
        </p>

        <h2 id="faq">7. FAQ</h2>
        <h3>10-day version?</h3>
        <p>Drop Oaxaca or Mérida. 10-day: Mexico City (4) → Yucatán (3) → Tulum (3).</p>
        <h3>Best month?</h3>
        <p><strong>January-April</strong> or <strong>November</strong>.</p>
        <h3>Safe to self-drive?</h3>
        <p>Yucatán: yes. Baja: yes. Rural interior (Oaxaca, Chiapas): guided group tours preferred.</p>
        <h3>Reverse route?</h3>
        <p>Yes — fly into Cancún, end in Mexico City. Often cheaper from US East Coast.</p>

        <h2 id="keep">Keep Reading</h2>
        <ul>
          <li><Link to="/blog/mexico-travel-guide-2026">Ultimate Mexico Guide →</Link></li>
          <li><Link to="/blog/best-mexico-destinations-2026">10 Best Mexico Destinations →</Link></li>
          <li><Link to="/blog/mexican-food-guide-2026">25 Mexican Dishes →</Link></li>
          <li><Link to="/blog/yucatan-cenotes-mayan-ruins-guide-2026">Yucatán Guide →</Link></li>
          <li><Link to="/blog/mexico-budget-travel-2026">Mexico Budget Guide →</Link></li>
        </ul>

        <BlogEndCTA
          title="Turn this itinerary into your personal Mexico map."
          subtitle="Stamp each state. Free, forever."
        />
      </article>
    </BlogShell>
  );
}
