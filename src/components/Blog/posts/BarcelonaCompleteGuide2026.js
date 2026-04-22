import React from 'react';
import { Link } from 'react-router-dom';
import { BlogShell, useBlogSEO, useRevealOnScroll } from '../BlogLayout';
import { BlogTable, BlogBarChart, BlogCallout, BlogStatGrid, BlogInlineCTA, BlogEndCTA } from '../BlogComponents';
import { BlogSpainMap } from '../BlogSpainMap';
import { getPostBySlug } from '../posts';

const SLUG = 'barcelona-complete-guide-2026';

export default function BarcelonaCompleteGuide2026() {
  const post = getPostBySlug(SLUG);
  useBlogSEO({
    title: `${post.title} | StampYourMap Blog`,
    description: post.description,
    url: `/blog/${SLUG}`,
    image: post.ogImage,
    datePublished: post.datePublished,
    keywords: 'barcelona guide, 5 days barcelona, gaudi barcelona, sagrada familia, park guell, barcelona tapas, barcelona beach, barcelona 2026',
  });
  useRevealOnScroll();

  return (
    <BlogShell>
      <article className="blog-article">
        <div className="blog-breadcrumbs">
          <Link to="/">Home</Link> / <Link to="/blog">Blog</Link> / <span>Barcelona Complete Guide</span>
        </div>
        <div className="blog-hero">
          <span className="blog-cat-chip">Spain · Barcelona Guide</span>
          <span className="blog-meta-sep">•</span><span>Published April 22, 2026</span>
          <span className="blog-meta-sep">•</span><span>{post.readMinutes} min read</span>
        </div>

        <h1>{post.heroEmoji} Barcelona Complete Guide 2026: 5 Days in Gaudí's City</h1>

        <p className="blog-lede">
          Barcelona is one of the world's 10 most-visited cities — and
          since 2023 has been quietly fighting a tourism backlash (the
          mayor capped cruise ships, banned new Airbnbs, raised tourist
          taxes). Visit it well: pre-book everything, stay in licensed
          accommodation, eat beyond the Rambla. This is our 2026 guide
          to 5 days in the city, done right.
        </p>

        <BlogStatGrid stats={[
          { value: '32M', label: 'Annual visitors' },
          { value: '9', label: 'UNESCO sites (most Gaudí in the world)' },
          { value: '2026', label: 'Sagrada Familia completion target' },
          { value: '5 days', label: 'Sweet spot' },
        ]} />

        <BlogInlineCTA title="Heading to Barcelona?" subtitle="Stamp Catalonia + your entire Spain trip on free map." href="/signup" />

        <h2 id="where">1. Where Barcelona Sits</h2>
        <BlogSpainMap
          regionIds={['catalonia']}
          title="Barcelona sits in Catalonia, northeastern Spain"
          subtitle="2 hr 30 AVE from Madrid; 1 hr flight from London."
        />

        <h2 id="day-by-day">2. 5-Day Itinerary</h2>
        <BlogTable
          caption="Recommended 5-day plan"
          headers={['Day', 'Focus', 'Route']}
          rows={[
            ['1', 'Gothic Quarter + orientation', 'Plaça Catalunya → Las Ramblas → Gothic Quarter + Cathedral → dinner El Born'],
            ['2', 'Gaudí Day 1', 'Sagrada Familia (9 AM entry) → Hospital Sant Pau → La Pedrera (Casa Milà) sunset'],
            ['3', 'Gaudí Day 2 + beach', 'Park Güell morning → lunch Gràcia neighborhood → Barceloneta beach afternoon'],
            ['4', 'Day-trip', 'Montserrat monastery (morning) OR Girona (Game of Thrones filming)'],
            ['5', 'Food + museums', 'La Boqueria market → Picasso Museum → MNAC sunset view → last tapas crawl'],
          ]}
        />

        <BlogCallout title="The Sagrada Familia booking move">
          <p>
            <strong>Pre-book Sagrada Familia tickets online</strong> (sagradafamilia.org)
            — day-of tickets are <em>non-existent</em> in peak season. Book the
            9 AM or 5 PM slot for best light on the stained glass.
            <strong> Tower access</strong> adds €10 and is highly
            recommended — pick the Nativity tower for the better view.
          </p>
        </BlogCallout>

        <h2 id="gaudi">3. The 7 Gaudí Sights</h2>
        <BlogTable
          caption="Barcelona's Gaudí canon (all UNESCO)"
          headers={['#', 'Site', 'What it is', 'Entry']}
          rows={[
            ['1', <strong>Sagrada Familia</strong>, 'Basilica, 140 years under construction, targeting 2026 completion', '€26 + €10 tower'],
            ['2', <strong>Park Güell</strong>, 'Whimsical hillside park + mosaic-covered architecture', '€13 (book ahead)'],
            ['3', <strong>Casa Batlló</strong>, 'Dragon-themed modernista house, Passeig de Gràcia', '€39'],
            ['4', <strong>Casa Milà (La Pedrera)</strong>, 'Ondulating stone facade; rooftop of chimneys', '€28'],
            ['5', <strong>Palau Güell</strong>, 'Mansion of industrialist + Gaudí patron Güell', '€12'],
            ['6', <strong>Casa Vicens</strong>, 'Gaudí\'s first house, often overlooked', '€18'],
            ['7', <strong>Colònia Güell</strong>, 'Gaudí\'s sketched crypt near Montserrat', '€9 (day-trip)'],
          ]}
        />

        <h2 id="neighborhoods">4. Where to Stay</h2>
        <BlogTable
          caption="Barcelona neighborhoods — pros & cons"
          headers={['Area', 'Vibe', 'Stay here if…']}
          rows={[
            [<strong>Eixample</strong>, 'Modernista grid + Gaudí sights', 'First-timers; Gaudí-focused'],
            [<strong>Gothic Quarter</strong>, 'Medieval labyrinth + nightlife', 'Love old cities; don\'t mind noise'],
            [<strong>El Born</strong>, 'Hip + Picasso Museum + tapas', 'Foodies + design-travelers'],
            [<strong>Gràcia</strong>, 'Bohemian + local + 20-min metro to center', 'Avoiding crowds; slow travel'],
            [<strong>Barceloneta</strong>, 'Beach + paella', 'Summer + beach days'],
            [<strong>Poblenou</strong>, 'Quieter beach + design district', 'Remote work + fewer tourists'],
          ]}
        />

        <h2 id="food">5. Barcelona Food — 10 Mandatory Experiences</h2>
        <BlogInlineCTA title="Stamp where you eat." subtitle="Build your Catalonia food map on free StampYourMap." href="/signup" />

        <ol>
          <li><strong>Bar Pinotxo (La Boqueria)</strong> — breakfast at the city's best market stall</li>
          <li><strong>Cal Pep</strong> — counter tapas + seafood, El Born</li>
          <li><strong>Tickets or Bodega 1900</strong> — Albert Adrià's molecular tapas, pre-book</li>
          <li><strong>Quimet & Quimet</strong> — tiny standing-only bar, legendary montaditos</li>
          <li><strong>Els Quatre Gats</strong> — Picasso hung out here; touristy now but historic</li>
          <li><strong>Bar Mut</strong> — perfect Catalan tapas</li>
          <li><strong>7 Portes</strong> — 1836 institution for arròs (Catalan rice dishes)</li>
          <li><strong>Brunch & Cake</strong> — brunch culture done Barcelona-style</li>
          <li><strong>Can Paixano "The Champagne Bar"</strong> — €1.50 cava + €1 sausage sandwich, standing only</li>
          <li><strong>Granja Dulcinea</strong> — morning churros + chocolate</li>
        </ol>

        <h2 id="transport">6. Getting Around</h2>
        <BlogTable
          caption="Barcelona transport modes"
          headers={['Mode', 'Best for', 'Cost']}
          rows={[
            ['🚇 Metro / TMB', 'Everywhere; 8 lines', '€2.55 single / €12 T-casual (10 rides)'],
            ['🚌 Bus', 'Slower but scenic', 'Same fare as metro'],
            ['🚕 Cab / Uber', 'Late night + luggage', 'Metered, €10-18 typical intracity'],
            ['🚴 Bicing (rent-a-bike)', 'Barceloneta + Poblenou beach', '€47 3-day tourist pass'],
            ['🚶 Walking', 'Old town + Gothic Quarter', 'Free'],
          ]}
        />

        <BlogCallout title="Barcelona metro + pickpocketing">
          <p>
            The metro is the most efficient way around — AND the city's
            pickpocketing hotspot. Keep wallets in front pockets, bags
            zipped and crossbody, and be alert on crowded lines (L3
            green to Sagrada Familia is worst).
          </p>
        </BlogCallout>

        <h2 id="day-trips">7. Best Day-Trips</h2>
        <ul>
          <li><strong>Montserrat</strong> — monastery on a dramatic mountain, 1 hour by train. €20 round-trip</li>
          <li><strong>Girona</strong> — medieval old town, Jewish Quarter, Game of Thrones locations. 38 min AVE</li>
          <li><strong>Sitges</strong> — beach town 40 min by train. Summer only</li>
          <li><strong>Costa Brava (Tossa de Mar, Cadaqués)</strong> — Dalí\'s home coast. Rental car best</li>
          <li><strong>Penedès wine region</strong> — Cava country, 45 min. Winery tours</li>
        </ul>

        <h2 id="overtourism">8. The Overtourism Reality (2026)</h2>
        <p>
          Barcelona's tourism-to-local tension is real and visible in
          2026. The city has:
        </p>
        <ul>
          <li>Banned new Airbnb licenses city-wide</li>
          <li>Raised tourist tax to €7/night (was €2.25)</li>
          <li>Capped cruise-ship calls</li>
          <li>Restricted tour-group size in Gaudí neighborhoods</li>
        </ul>
        <p>
          Visit respectfully: stay in licensed hotels or registered
          apartments only; learn 5 phrases of Catalan or Spanish; avoid
          La Rambla restaurants; tip decent amounts; don't photograph
          people without permission.
        </p>

        <h2 id="when">9. When to Go</h2>
        <BlogBarChart
          title="Best months for Barcelona (2026)"
          max={100}
          data={[
            { label: 'Jan', value: 58, valueLabel: '58' },
            { label: 'Feb', value: 64, valueLabel: '64' },
            { label: 'Mar', value: 76, valueLabel: '76' },
            { label: 'Apr', value: 90, valueLabel: '90' },
            { label: 'May', value: 96, valueLabel: '96 ✓' },
            { label: 'Jun', value: 92, valueLabel: '92' },
            { label: 'Jul', value: 68, valueLabel: '68 (packed beaches)' },
            { label: 'Aug', value: 54, valueLabel: '54' },
            { label: 'Sep', value: 94, valueLabel: '94 ✓' },
            { label: 'Oct', value: 86, valueLabel: '86' },
            { label: 'Nov', value: 68, valueLabel: '68' },
            { label: 'Dec', value: 62, valueLabel: '62' },
          ]}
        />

        <h2 id="faq">10. FAQ</h2>
        <h3>How many days do I need in Barcelona?</h3>
        <p>{"Four to five days is the sweet spot — one for Sagrada Família + Gaudí (Passeig de Gràcia block), one for Gothic + El Born + Barceloneta, one for Park Güell + Gràcia + Tibidabo, one for Montjuïc (MNAC, castle, cable car), and an optional fifth for a Montserrat or Girona day trip. Under 3 days and you rush the top sights; over 6 days repeats start."}</p>
        <h3>Which neighbourhood should I book for lodging?</h3>
        <p>{"Eixample (around Passeig de Gràcia) for first-timers — central, walkable to Sagrada Família, and mid-range hotels at €140-220. El Born for atmosphere, tapas bars, and boutique hotels. Gràcia for a local, village-feel base 20 minutes from centre. Barceloneta for beach access. Avoid El Raval's western edge at night and Lloret-style package-tourist hotels on the coast."}</p>
        <h3>Which Gaudí sight is the must-see if I only pick one?</h3>
        <p>{"Sagrada Família — book the €36 tower-access ticket for the unmatched view and the stained-glass interior in morning light. Park Güell (€14) is second (go at sunrise to skip the crowd tide). Casa Batlló (€35) is the third — more Instagrammable than La Pedrera (Casa Milà, €28), though both are good. Casa Vicens (Gaudí's first house) is underrated at €18."}</p>
        <h3>When exactly should I book the big Gaudí tickets?</h3>
        <p>{"Sagrada Família, Park Güell, and Casa Batlló all sell out peak-season slots 3-4 weeks ahead — book the moment flights are confirmed. Morning slots (09:00-10:30) give best light and smallest crowds. Shoulder season (late October to March except Christmas) 1 week ahead is fine. Tower access at Sagrada Família is the most-constrained ticket — book first."}</p>
        <h3>Is Las Ramblas worth visiting?</h3>
        <p>{"Walk it once for orientation (Plaça de Catalunya down to Columbus monument, 20 minutes) and visit La Boqueria market (enter from Ramblas side before 11:00 to beat the crush). Don't eat at any restaurant on Ramblas itself — menus are tourist-tax priced at €18-30 for mediocre paella. Real food is 3-5 blocks into El Born or El Raval's Carrer de Joaquín Costa."}</p>
        <h3>How bad is the pickpocket problem really?</h3>
        <p>{"Barcelona is the pickpocketing capital of Europe — and the metro L3 (Liceu, Plaça de Catalunya, Sagrada Família), Las Ramblas, and the Sagrada Família queue are hotspots. Use a crossbody bag worn to the front, never a back-pocket wallet, and keep phone off restaurant tables. Violent crime is genuinely rare; the risk is pure theft. Travel insurance for stolen phones is worth €30."}</p>
        <h3>What are the best day trips from Barcelona?</h3>
        <p>{"Montserrat (monastery + hiking, 1h by R5 train + funicular, day trip), Girona + Costa Brava beaches (38-min AVE then car, best as overnight), Figueres Dalí Theatre-Museum (1h15 by AVE), Sitges beach town (40-min commuter train), and Tarragona Roman ruins (1h15 AVE). Pick one; don't try a Montserrat + Sitges same-day — transit wastes the trip."}</p>
        <h3>Barcelona with kids — what works?</h3>
        <p>{"PortAventura theme park (1h15 by train, or Ferrari Land adjacent), Barcelona Aquarium at Port Vell, the Magic Fountain show at Plaça d'Espanya (weekend nights), Parc de la Ciutadella boat rental, and Tibidabo's old-school amusement park with city views. Most kids under 7 hit wall after 90 minutes in Sagrada Família — keep museum blocks short."}</p>
        <h3>Barcelona's beaches — any good, or skip them?</h3>
        <p>{"Barceloneta and Bogatell (Olympic port) are fine for a quick swim between sights but crowded, urban, and pickpocket-dense. Real beaches: 40-min train to Sitges (clean, gay-friendly, family-friendly), or rent a car to reach Costa Brava coves north (Cala Sa Tuna, Cala Montjoi). Water is swimmable late May to early October (19-24°C)."}</p>
        <h3>Where do locals actually eat (not tourist traps)?</h3>
        <p>{"El Born (Bar del Pla, Cal Pep), Gràcia (La Pubilla, Bar Bodega Quimet), Sant Antoni (Bar Calders, Els Sortidors del Parlament), and Poble-sec (Quimet & Quimet for standing-room conservas). Avoid anything on Ramblas, Passeig del Born's main drag, or directly outside a monument. The rule: real menús del día are €13-17, posted in Catalan only, and full of locals at 14:30."}</p>
        <h3>Best nightlife districts by style?</h3>
        <p>{"El Raval for grimy cool (Bar Marsella absinthe bar since 1820). El Born for elegant cocktails (Paradiso speakeasy, routinely World's 50 Best). Poble-sec's Carrer de Blai for pintxo-bar hopping. Port Olímpic and Opium/Pacha for superclubs (24:00-06:00, dress smart). Gay nightlife centres on Eixample Gaixample and Sitges on weekends."}</p>
        <h3>Best month to visit?</h3>
        <p>{"Late April through June and mid-September to mid-October are peak — 20-27°C, swimmable sea, manageable crowds. July-August brings 30-34°C and doubled hotel rates. Christmas and New Year are festive (Fira de Santa Llúcia market, La Pedrera lit up). Avoid Mobile World Congress (late February/early March) — hotel prices triple for the four days."}</p>
        <h3>How do I get to and from BCN airport cheaply?</h3>
        <p>{"The Aerobús (A1/A2) runs 05:00-00:30 from both terminals to Plaça de Catalunya in 35 min for €7.25. Metro L9 Sud runs slower (45-55 min) for €5.50 with a transfer. A taxi to central Eixample is €30-40 flat rate. Rodalies R2 Nord train is €4.60 but slower and requires a transfer. Book Aerobús with your hotel transfer if arriving after 22:00."}</p>
        <h3>Is Barcelona accessible for wheelchairs and mobility issues?</h3>
        <p>{"Mostly yes — metro lines L2, L9, L10, and L11 are fully step-free; older lines L3 and L5 have many non-accessible stations. Sagrada Família, La Pedrera, and most museums are wheelchair-friendly. Gothic Quarter cobbles and Gràcia's narrow streets are the tough spots; book a hotel with a lift (not all old Eixample buildings have one)."}</p>
        <h3>What's the biggest mistake first-timers make?</h3>
        <p>{"Skipping pre-booked Sagrada Família tickets and standing in the 90-minute queue, then eating a €26 'paella' lunch on Las Ramblas, then doing Park Güell in the 14:00 heat without reserved entry. Pre-book the three big Gaudí sights, eat 3 blocks off any tourist strip, and save afternoons for Barceloneta beach or a siesta — sightseeing pace after 15:00 in summer heat is miserable."}</p>

        <h2 id="keep">Keep Reading</h2>
        <ul>
          <li><Link to="/blog/spain-travel-guide-2026">Ultimate Spain Guide →</Link></li>
          <li><Link to="/blog/two-week-spain-itinerary-2026">2-Week Spain Itinerary →</Link></li>
          <li><Link to="/blog/spanish-food-guide-2026">25 Spanish Dishes →</Link></li>
          <li><Link to="/blog/best-spain-regions-2026">10 Best Spanish Regions →</Link></li>
        </ul>

        <BlogEndCTA
          title="Stamp Barcelona + all Spanish cities on your map."
          subtitle="Free forever. 17 autonomous communities preloaded."
        />
      </article>
    </BlogShell>
  );
}
