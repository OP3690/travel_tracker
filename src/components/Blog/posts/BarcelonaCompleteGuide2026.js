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
        <h3>Days needed?</h3>
        <p><strong>4-5 days</strong>. Less is rushed; more is saturation.</p>
        <h3>Best Gaudí sight?</h3>
        <p><strong>Sagrada Familia</strong>. Unquestionable.</p>
        <h3>Is Las Ramblas worth it?</h3>
        <p>Walk it once for orientation. Don't eat there. Real food is 5 blocks away.</p>
        <h3>When to buy tickets?</h3>
        <p>Sagrada Familia + Park Güell + Casa Batlló — 1 month ahead peak. 1 week ahead shoulder.</p>

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
