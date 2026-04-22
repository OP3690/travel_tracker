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
        <h3>Can I compress this route into 10 days?</h3>
        <p>{"Yes — drop either Oaxaca or Mérida: Mexico City (4) → Yucatán/Valladolid (3) → Tulum (3). Under 10 days and you lose depth at every stop. If culture is the priority, do CDMX (4) + Oaxaca (5) and skip the coast entirely — you'll eat better. Beach priority? CDMX (3) + Yucatán (4) + Tulum (3)."}</p>
        <h3>What's the best month for this itinerary?</h3>
        <p>{"November to April — dry season, Yucatán 26-30°C, CDMX 22-24°C pleasant, whales in Baja if you swing west. Day of the Dead (Oct 31-Nov 2) is magical in CDMX and Oaxaca but prices double and rooms sell out 6 months ahead. Avoid June-October: hot, humid, and Atlantic hurricane risk September-October in the Yucatán."}</p>
        <h3>Should I reverse the route and fly into Cancún?</h3>
        <p>{"Often cheaper — CUN flights from US East Coast run $120-280 roundtrip vs MEX $200-400. Reversing lets you acclimate on the coast, adjust to heat and altitude separately, and end culture-heavy in CDMX. Internal one-way Volaris CUN-MEX is $50-100. Flight home from CDMX often cheaper than from Cancún for West Coast travellers."}</p>
        <h3>Should I rent a car or use buses?</h3>
        <p>{"Hybrid: ADO first-class bus between cities (CDMX-Oaxaca 6.5h for 800-1,200 pesos), flight into Mérida or Cancún, then rent a car for 4-5 days in the Yucatán to chase cenotes and pueblos. Mandatory Mexican liability insurance (~$25/day) is often missing from cheap online quotes — always budget it separately. Skip car rental in CDMX entirely."}</p>
        <h3>Is self-driving safe in Mexico?</h3>
        <p>{"Yucatán: very safe, flat, signed. Baja Sur: safe on main highways, 4WD advised on dirt roads. Oaxaca coast: ok but narrow mountain roads; night driving not recommended anywhere. Chiapas interior and Guerrero: skip rentals, use guided tours. Never drive after dark, always use toll roads (cuota) not free (libre), and fuel up whenever you see Pemex — stations are scarce on back roads."}</p>
        <h3>How do I handle jet lag and altitude in CDMX?</h3>
        <p>{"CDMX sits at 2,240m — day 1 go light, hydrate 3L, skip alcohol, sleep 9 hours. Book a hotel with early check-in in Roma or Condesa (not Centro Histórico for first night, too chaotic). Don't schedule Teotihuacán for day 1; do it on day 3 when acclimated. East Coast travellers have a 1-2 hour time change — mild."}</p>
        <h3>Can I do this trip with kids?</h3>
        <p>{"Yes, for ages 6+. Yucatán cenotes, Xcaret/Xel-Há parks near Playa del Carmen, Chichén Itzá (kids love the Mayan acoustic handclap echo), and CDMX's Chapultepec Park with its zoo and Museum of Anthropology work well. Skip long bus legs (CDMX-Oaxaca 6.5h is brutal with toddlers) — fly Aeroméxico for 850-1,500 pesos. Add a resort beach day per kid."}</p>
        <h3>Can I pack carry-on only for two weeks?</h3>
        <p>{"Yes — a 40L backpack handles it. Pack layers (CDMX evenings 12-15°C, Yucatán 30°C), swim gear, water shoes for cenotes, a light long-sleeve for mosquitos/sun, and one long-sleeve collared shirt for nicer CDMX dinners. Volaris and Viva Aerobús charge extra for anything above 10kg carry-on — measure strictly."}</p>
        <h3>What should I pre-book vs. show up for?</h3>
        <p>{"Pre-book: flights, CDMX hotels in Roma/Condesa (best boutiques sell out 6-8 weeks ahead), Chichén Itzá early-morning slot, Día de los Muertos hotels if visiting, and any Valladolid cenote tour. Show up for: taco stalls, mezcalerías, most markets. ADO bus tickets can be bought 24h ahead on the app — no need to book a month out except Day of the Dead."}</p>
        <h3>Is the Yucatán-to-Baja route doable in two weeks?</h3>
        <p>{"Tight but possible: CDMX (3) → Oaxaca (3) → Yucatán (4) → Baja (4). Requires two internal flights (MEX-OAX-MEX-CUN and CUN-SJD via MEX, total 8-10 flight hours). Realistically, pick one coast — Yucatán for ruins/cenotes OR Baja for whales/Pacific — and save the other for a future trip. Trying both exhausts and you miss depth."}</p>
        <h3>How accessible is Mexico for older travellers?</h3>
        <p>{"CDMX and Mérida have modern hotels with lifts; Oaxaca and San Cristóbal have cobbled streets and steep climbs. Archaeological sites (Chichén Itzá, Monte Albán, Palenque) involve long walks on uneven stone — bring proper shoes. Private drivers ($80-120/day for a car + driver) beat bus travel for comfort. Build in 4-night stays per base to reduce packing/unpacking."}</p>
        <h3>How much should I budget per person?</h3>
        <p>{"Backpacker $35/day × 14 = $490. Mid-range $80/day = $1,120. Comfort $180/day = $2,520. Add $150-300 for one internal flight, $80-120 for 4 days car rental in Yucatán, and $100-180 for Chichén Itzá + Monte Albán + Palenque entries + guides. Flights into MEX/CUN from US run $180-400 roundtrip."}</p>
        <h3>Is the food safe at street taco stands?</h3>
        <p>{"Yes at busy stalls with high turnover — local queue = safe. Look for: stalls with a line of locals, tortillas made on-site, meat cooked to order on a hot plancha. Avoid: empty stalls mid-afternoon (meat's been sitting), pre-made salsas in unrefrigerated bowls, and anything with raw vegetables. Imodium + electrolytes in the daypack handle the rare stomach issue."}</p>
        <h3>What's the rainy-day backup in each city?</h3>
        <p>{"CDMX: Museum of Anthropology (world-class, indoor, 2-3 hours easily), Palacio de Bellas Artes, Frida Kahlo house. Oaxaca: Mercado 20 de Noviembre for food, Santo Domingo church + cultural centre. Yucatán: Valladolid's Casa de los Venados private art collection, Mérida's Gran Museo del Mundo Maya. Rain is short and afternoon; mornings usually stay dry."}</p>
        <h3>What's the one itinerary mistake most people make?</h3>
        <p>{"Trying to stay in Tulum and day-trip to Chichén Itzá + Valladolid + multiple cenotes — you'll spend 3+ hours daily on cramped minivan tours. Base in Valladolid or Mérida for 3 nights instead; you're 45 minutes from Chichén Itzá, cheaper, and get real Yucatecan food. Save Tulum for 2 nights at the tail end if beach time is important."}</p>

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
