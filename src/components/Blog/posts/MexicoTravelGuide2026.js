import React from 'react';
import { Link } from 'react-router-dom';
import { BlogShell, useBlogSEO, useRevealOnScroll } from '../BlogLayout';
import { BlogBarChart, BlogTable, BlogCallout, BlogStatGrid, BlogInlineCTA, BlogEndCTA } from '../BlogComponents';
import { BlogMexicoMap } from '../BlogMexicoMap';
import { getPostBySlug } from '../posts';

const SLUG = 'mexico-travel-guide-2026';
const HIGHLIGHT = ['cmx', 'roo', 'yuc', 'bcs', 'oax', 'gua', 'jal', 'chp'];

export default function MexicoTravelGuide2026() {
  const post = getPostBySlug(SLUG);
  useBlogSEO({
    title: `${post.title} | StampYourMap Blog`,
    description: post.description,
    url: `/blog/${SLUG}`,
    image: post.ogImage,
    datePublished: post.datePublished,
    keywords: 'mexico travel guide, mexico 2026, visit mexico, mexico city, cancun, tulum, oaxaca, yucatan, mexico itinerary, mexico safety',
  });
  useRevealOnScroll();

  return (
    <BlogShell>
      <article className="blog-article">
        <div className="blog-breadcrumbs">
          <Link to="/">Home</Link> / <Link to="/blog">Blog</Link> / <span>Mexico Ultimate Guide</span>
        </div>
        <div className="blog-hero">
          <span className="blog-cat-chip">Mexico · Travel Guide</span>
          <span className="blog-meta-sep">•</span><span>Published April 22, 2026</span>
          <span className="blog-meta-sep">•</span><span>{post.readMinutes} min read</span>
        </div>

        <h1>{post.heroEmoji} The Ultimate Mexico Travel Guide (2026): 32 States, Endless Adventures</h1>

        <p className="blog-lede">
          Mexico is the world's #6 tourist destination — 45 million
          visitors in 2025 — and arguably the most underrated.
          Mesoamerican pyramids older than the Pyramids of Giza, a
          cuisine that's a UNESCO cultural heritage, coastlines on two
          oceans, colonial cities more beautiful than most of Europe.
          Here's the 2026 comprehensive guide — regions, entry rules,
          the honest safety truth, food, budget, and 12 first-timer
          mistakes.
        </p>

        <BlogStatGrid stats={[
          { value: '32', label: 'States' },
          { value: '45M', label: '2025 international visitors' },
          { value: '35', label: 'UNESCO sites' },
          { value: '~$70', label: 'Mid-range daily (USD)' },
        ]} />

        <BlogInlineCTA title="Planning Mexico?" subtitle="Stamp all 32 states on your free map." href="/signup" />

        <h2 id="country">1. Mexico in One Paragraph</h2>
        <p>
          Mexico spans <strong>32 states</strong> across two oceans. The
          travel core: <strong>Mexico City (CDMX)</strong> (art + food +
          archaeology + neighbourhoods that rival any city on earth),
          <strong> Quintana Roo</strong> (Cancún, Playa del Carmen,
          Tulum — the Riviera Maya beaches), <strong>Yucatán</strong>
          {' '}(Mérida, Chichén Itzá, cenotes), <strong>Oaxaca</strong>
          {' '}(mezcal, mole, crafts), <strong>Baja California Sur</strong>
          {' '}(Los Cabos, La Paz, Baja Sur diving), <strong>Jalisco</strong>
          {' '}(Guadalajara, Puerto Vallarta, tequila country),
          <strong> Guanajuato</strong> (San Miguel de Allende, Guanajuato
          city), and <strong>Chiapas</strong> (Palenque, San Cristóbal).
          Each region has its own cuisine, dialect, and history.
        </p>

        <BlogMexicoMap
          regionIds={HIGHLIGHT}
          title="The 8 states every first-timer should know"
          subtitle="Mexico City · Quintana Roo · Yucatán · Baja Sur · Oaxaca · Guanajuato · Jalisco · Chiapas"
        />

        <h2 id="when">2. When to Visit</h2>
        <BlogBarChart
          title="Best months for Mexico (2026 pleasantness index)"
          subtitle="Composite of weather, crowds, hurricane risk."
          max={100}
          data={[
            { label: 'Jan', value: 92, valueLabel: '92 ✓' },
            { label: 'Feb', value: 94, valueLabel: '94 ✓' },
            { label: 'Mar', value: 90, valueLabel: '90' },
            { label: 'Apr', value: 84, valueLabel: '84' },
            { label: 'May', value: 72, valueLabel: '72' },
            { label: 'Jun', value: 56, valueLabel: '56 (rainy + heat)' },
            { label: 'Jul', value: 52, valueLabel: '52' },
            { label: 'Aug', value: 48, valueLabel: '48 (hurricanes)' },
            { label: 'Sep', value: 46, valueLabel: '46 (peak hurricane)' },
            { label: 'Oct', value: 62, valueLabel: '62' },
            { label: 'Nov', value: 86, valueLabel: '86' },
            { label: 'Dec', value: 88, valueLabel: '88 (+Day of the Dead leftover)' },
          ]}
        />

        <p>
          <strong>November through April</strong> is the sweet spot —
          dry, cool-ish, hurricane-free. Summer (Jun-Sep) is cheaper but
          rainy + hurricane risk on both coasts. Mexico City is
          year-round good because it's at 7,350 feet — average 75°F even
          in July.
        </p>

        <BlogCallout title="Day of the Dead = perfect shoulder">
          <p>
            <strong>October 31 – November 2</strong> is Day of the Dead
            (Día de los Muertos). Oaxaca and Mexico City host the most
            spectacular celebrations — altars, parades, cempasúchil
            marigold carpets. Book 6 months ahead for Oaxaca in this
            week.
          </p>
        </BlogCallout>

        <h2 id="visa">3. Visa & Entry (2026)</h2>
        <p>
          US, UK, EU, Canadian, Australian, NZ, and most Latin American
          citizens get <strong>180 days visa-free</strong>. Requirements:
        </p>
        <ul>
          <li>Passport valid 6+ months</li>
          <li>Return/onward ticket</li>
          <li><strong>FMM (tourist card)</strong> — now auto-generated electronically at major airports. No paper to lose.</li>
          <li>As of 2026: tourist tax of $32 USD at most airports (often included in flight fare)</li>
        </ul>

        <h2 id="safety">4. Is Mexico Safe? (Honest Answer)</h2>
        <p>
          <strong>Tourist Mexico is very safe. Parts of "non-tourist
          Mexico" are genuinely not.</strong> This is the most important
          paragraph in this post.
        </p>
        <ul>
          <li><strong>Safe:</strong> Mexico City (most neighborhoods), all the Yucatán/Riviera Maya, Oaxaca, Guadalajara, San Miguel de Allende, Guanajuato, Mérida, Puerto Vallarta, Los Cabos, Baja Sur.</li>
          <li><strong>Be careful:</strong> Some border cities (parts of Tijuana, Ciudad Juárez), parts of Acapulco, Sinaloa (Culiacán, Mazatlán with caution), some parts of Michoacán + Guerrero.</li>
          <li><strong>Rule:</strong> Stay on the tourist trail + stick to rideshare (Uber/Didi) + don't flash valuables + avoid political demonstrations. Petty theft is the realistic risk; kidnapping/violence against tourists is statistically rare.</li>
        </ul>

        <h2 id="budget">5. Budget</h2>
        <BlogTable
          caption="Daily spend per person in Mexico (2026 USD)"
          headers={['Category', 'Backpacker', 'Mid-range', 'Comfort']}
          rows={[
            ['Accommodation', '$15 (hostel)', '$50 (3-star)', '$150 (boutique)'],
            ['Food', '$10 (taquerías + mercados)', '$22 (mix of restaurants)', '$55 (Michelin + fine dining)'],
            ['Transport', '$4 (ADO bus + Uber)', '$8', '$20 (taxis + domestic flights)'],
            ['Activities', '$5', '$10 (tours + ruins)', '$25'],
            ['Misc', '$3', '$4', '$10'],
            [<strong>Daily</strong>, <strong>$37</strong>, <strong>$94</strong>, <strong>$260</strong>],
          ]}
        />

        <BlogInlineCTA title="Multi-state Mexico trip?" subtitle="Stamp every state on your free interactive map." href="/signup" />

        <h2 id="transport">6. Getting Around</h2>
        <BlogTable
          caption="Mexico transport modes"
          headers={['Mode', 'Best for', 'Cost', 'Tip']}
          rows={[
            ['✈️ Domestic flight', 'Mexico City ↔ Cancún ↔ Oaxaca', '$40-120 one-way', 'Viva Aerobus, Volaris are cheap'],
            ['🚌 ADO bus', 'Overland (Cancún → Tulum → Mérida, etc.)', '$10-50', 'Executive class is very comfortable'],
            ['🚗 Rental car', 'Yucatán + Baja + highway trips', '$30-45/day + insurance', 'Get full coverage; roadside police checks real'],
            ['🚕 Uber/Didi', 'City rides', 'Metered', 'Use apps, skip cash taxis'],
            ['🚇 Metro (Mexico City)', 'CDMX urban', '$0.30/ride', 'Extensive + cheap + safe in daytime'],
          ]}
        />

        <h2 id="food">7. Mexican Food: 5 Must-Tries</h2>
        <ol>
          <li><strong>Tacos al Pastor</strong> — spit-roasted pork with pineapple; Mexico City staple</li>
          <li><strong>Mole</strong> — dark chocolate-chili sauce; 7 varieties; Oaxaca specialty</li>
          <li><strong>Cochinita Pibil</strong> — achiote + sour orange pork, slow-cooked in banana leaves; Yucatán</li>
          <li><strong>Chiles en Nogada</strong> — stuffed poblano with walnut cream + pomegranate; tricolour, seasonal (Aug-Sep)</li>
          <li><strong>Pozole</strong> — hominy soup with pork/chicken + garnishes</li>
        </ol>
        <p>Full guide: <Link to="/blog/mexican-food-guide-2026">25 Mexican dishes by region</Link>.</p>

        <h2 id="mistakes">8. 12 First-Timer Mistakes</h2>
        <ol>
          <li>Only visiting Cancún. The interior is where the country is</li>
          <li>Not learning 10 Spanish words. Outside resorts English is limited</li>
          <li>Drinking tap water. Bottled only everywhere outside top resorts</li>
          <li>Tipping 10%. Standard in Mexico is <strong>10-15%</strong>; more than that in touristy zones</li>
          <li>Flying into Mexico City without a 2nd day for altitude adjust (2,240m)</li>
          <li>Hailing street taxis. Always Uber/Didi in cities</li>
          <li>Skipping Oaxaca. It's more culturally rich than any beach town</li>
          <li>Expecting fast food tacos to be anything like Tex-Mex. They're completely different</li>
          <li>Wearing sandals/shorts to Mexico City. It's cool — pack layers</li>
          <li>Not booking Chichén Itzá for early morning. By 11 AM tour buses arrive</li>
          <li>Using Oxxo / 7-Eleven USD rates. ATM with Wise/Revolut card saves 5%</li>
          <li>Not visiting a mercado. Street markets are the real Mexican food experience</li>
        </ol>

        <h2 id="faq">9. Mexico FAQ</h2>
        <h3>How long should a first trip to Mexico be?</h3>
        <p>{"Ten days is the realistic minimum (CDMX 4 + one region: Oaxaca, Yucatán, or Baja), 14-21 days is the sweet spot for multi-region trips. Under a week forces you into an all-inclusive resort mindset and misses the country's real range — colonial cities, ancient ruins, cenotes, surf coasts, and the best food scene in the Americas."}</p>
        <h3>Is Mexico City (CDMX) worth visiting, and how many days?</h3>
        <p>{"Absolutely yes — CDMX is arguably the most exciting city in the Americas right now. Plan 4-5 nights: Centro Histórico + Palacio de Bellas Artes, Condesa/Roma cafés and taquerías, Coyoacán for Frida Kahlo's house, Teotihuacán pyramids day trip, Xochimilco colourful boats. Altitude (2,240m) takes 24-48h to adjust — go easy on day one."}</p>
        <h3>What's the currency and exchange strategy?</h3>
        <p>{"Mexican peso (MXN), roughly 17-18 MXN to 1 USD in 2026. USD is widely accepted in Cancún, Cabo, and tourist zones but you get 10-15% worse rates than exchanging pesos. Use a no-foreign-fee card (Wise, Revolut, Charles Schwab) at BBVA, Santander, or HSBC ATMs. Avoid airport exchange counters — rates are brutal."}</p>
        <h3>How safe is Mexico for tourists in 2026?</h3>
        <p>{"Tourist Mexico is significantly safer than US headlines suggest — CDMX's Roma/Condesa, Yucatán, Oaxaca, Guanajuato, and the Baja Sur coast are low-risk with normal precautions. Avoid inter-city bus travel after dark in cartel-affected states (Guerrero, Michoacán, Tamaulipas, Sinaloa's interior). Uber is safer than street taxis in CDMX; use well-reviewed ADO first-class buses for intercity."}</p>
        <h3>Is Mexico safe for solo female travellers?</h3>
        <p>{"Yes in tourist zones with standard precautions — CDMX (Roma/Condesa), Oaxaca city, Mérida, Tulum, San Cristóbal, Guanajuato all have strong female-solo traveller communities. Book female-friendly hostels (Hostel Mundo Joven, Selina), use Uber not street taxis, and skip Cabo nightlife solo. Consider female-only tour groups for remote hikes and mezcal/cenote day-trips."}</p>
        <h3>What's the best time of year to visit?</h3>
        <p>{"November to April is the dry season — Yucatán 26-30°C and sunny, CDMX 22-24°C and pleasant, Baja whale-watching January-March. May-June is hot everywhere. July-October is rainy (afternoon showers) and hurricane season for the Yucatán and Pacific. Day of the Dead (Oct 31-Nov 2) and Semana Santa (Holy Week) are magical but pricey."}</p>
        <h3>Do I need a visa and tourist card?</h3>
        <p>{"US/UK/Canada/EU/AU/NZ passport holders don't need a visa — you get an FMM tourist card (up to 180 days) on arrival at any airport. From January 2026, the digital FMM is standard; land border crossings still issue paper slips. Save the slip — you need it on departure or face a 500 MXN fine. Over-stays incur fines at the airport exit."}</p>
        <h3>How's the language barrier — do I need Spanish?</h3>
        <p>{"Basic Spanish transforms the trip. English is solid in Cancún, Cabo, Tulum, and Playa del Carmen tourist corridors; patchy in CDMX outside hotels; limited in Oaxaca, Chiapas, and rural areas. Learn buenos días, por favor, gracias, cuánto cuesta, and la cuenta. Google Translate offline pack works well; locals reward any Spanish effort with warmth."}</p>
        <h3>What's the deal with tipping?</h3>
        <p>{"More expected than Europe, less than US: 10-15% at restaurants (propina often included on the bill — check), 20-50 pesos for hotel bellhops and housekeeping per day, 10-20% for Uber (optional), 20-100 pesos for tour guides per day. Never tip gas-station attendants more than 10 pesos; 10-20 at grocery baggers. Round up street-taco stalls if you want."}</p>
        <h3>How do I get around between cities?</h3>
        <p>{"ADO and ADO-GL first-class buses are the gold standard — CDMX-Oaxaca 6.5h for 800-1,200 pesos, CDMX-Puebla 2h for 350 pesos. Internal flights (Volaris, Viva Aerobús, Aeroméxico) connect CDMX to Cancún (2h, $60-150), Oaxaca, Mérida, and Cabo cheaply. Rental car for Yucatán and Baja; skip rentals in CDMX — traffic and parking are punishing."}</p>
        <h3>Is altitude sickness a real concern in CDMX?</h3>
        <p>{"Mild headaches and fatigue day 1-2 at 2,240m for sensitive travellers; serious altitude sickness is rare. Arrive, hydrate heavily (3L water daily), skip alcohol day 1, walk slowly, and sleep 8+ hours. If you're flying on to higher spots (Toluca 2,660m, Puebla 2,135m), build in one CDMX rest day first. Tacos don't cause altitude sickness — don't blame them."}</p>
        <h3>Is Mexican tap water safe to drink?</h3>
        <p>{"No — stick to bottled or filtered water for drinking and brushing teeth. Ice at mid-range and up restaurants is almost always made from purified water (safe); street-cart ice is riskier. Most hotels provide a water dispenser. Salads at tourist-area restaurants are fine; skip fresh vegetables at taco stalls. Imodium and electrolyte tabs are smart to pack."}</p>
        <h3>How do phones and internet work?</h3>
        <p>{"Buy a Telcel SIM at Oxxo (80-200 pesos + data plan) or use an Airalo eSIM ($15-30 for 5-10GB). T-Mobile US includes Mexico on Magenta plans. LTE coverage is excellent in cities and tourist zones; patchy in Chiapas mountains and Baja's East Cape. Free Wi-Fi is widespread in cafés, hotels, and ADO bus stations."}</p>
        <h3>Do I need travel insurance and what about healthcare?</h3>
        <p>{"Yes — private hospitals (ABC Medical, Hospital Ángeles) in CDMX/Cancún are world-class but a routine ER visit runs $300-800 USD, hospitalisation $3,000+/day. Pharmacies (Farmacia del Ahorro, Benavides) handle many needs over-the-counter. SafetyWing or IMG policies cover $50k+ medical plus evacuation for ~$50/month. Traveler's diarrhoea is the single most common issue."}</p>
        <h3>Can I drink tequila and mezcal without being targeted?</h3>
        <p>{"Yes — Mexican bars are safe and social. Drink at bar counter, not tables for strangers; never leave your drink unattended; stick to named spirits (blanco, reposado, añejo) and skip anything that tastes weirdly sweet. Mezcalerías in CDMX Roma (La Clandestina, Bósforo) are iconic. Cabo's Zona Dorada after midnight is where most scam stories originate — use Uber, travel in pairs."}</p>
        <h3>What's the biggest mistake first-time visitors make?</h3>
        <p>{"Flying into Cancún and staying in the Hotel Zone, then saying 'I did Mexico.' The Hotel Zone is a US-style resort strip, not Mexico. Spend 3 nights there if you must, then go inland — Valladolid cenotes, Mérida colonial streets, Oaxaca's markets, CDMX. The Mexico worth travelling for is 90% outside resort corridors."}</p>

        <h2 id="keep">Keep Reading</h2>
        <ul>
          <li><Link to="/blog/two-week-mexico-itinerary-2026">2-Week Mexico Itinerary →</Link></li>
          <li><Link to="/blog/best-mexico-destinations-2026">10 Best Mexico Destinations →</Link></li>
          <li><Link to="/blog/mexican-food-guide-2026">25 Mexican Dishes →</Link></li>
          <li><Link to="/blog/yucatan-cenotes-mayan-ruins-guide-2026">Yucatán Cenotes & Ruins Guide →</Link></li>
          <li><Link to="/blog/mexico-budget-travel-2026">Mexico on $30 / $70 / $150 a day →</Link></li>
        </ul>

        <BlogEndCTA
          title="Stamp every Mexican state on your travel map."
          subtitle="32 states. 35 UNESCO sites. Free forever."
        />
      </article>
    </BlogShell>
  );
}
