import React from 'react';
import { Link } from 'react-router-dom';
import { BlogShell, useBlogSEO, useRevealOnScroll } from '../BlogLayout';
import { BlogTable, BlogBarChart, BlogCallout, BlogStatGrid, BlogInlineCTA, BlogEndCTA } from '../BlogComponents';
import { BlogFranceMap } from '../BlogFranceMap';
import { getPostBySlug } from '../posts';

const SLUG = 'french-riviera-guide-2026';

export default function FrenchRivieraGuide2026() {
  const post = getPostBySlug(SLUG);
  useBlogSEO({
    title: `${post.title} | StampYourMap Blog`,
    description: post.description,
    url: `/blog/${SLUG}`,
    image: post.ogImage,
    datePublished: post.datePublished,
    keywords: 'french riviera, cote d\'azur, nice, cannes, monaco, saint-tropez, antibes, eze, french riviera itinerary, when to visit cote d\'azur',
  });
  useRevealOnScroll();

  return (
    <BlogShell>
      <article className="blog-article">
        <div className="blog-breadcrumbs">
          <Link to="/">Home</Link> / <Link to="/blog">Blog</Link> / <span>French Riviera Guide</span>
        </div>
        <div className="blog-hero">
          <span className="blog-cat-chip">France · French Riviera</span>
          <span className="blog-meta-sep">•</span><span>Published April 22, 2026</span>
          <span className="blog-meta-sep">•</span><span>{post.readMinutes} min read</span>
        </div>

        <h1>{post.heroEmoji} French Riviera Complete Guide 2026: Nice, Cannes, Monaco, Saint-Tropez</h1>

        <p className="blog-lede">
          The Côte d'Azur (French Riviera) — the world's oldest seaside
          tourist coast, a 180-km stretch from Cassis to the Italian
          border. Turquoise Mediterranean, medieval perched villages,
          belle époque hotels, and a rail line that connects all the
          famous towns in under 90 minutes end-to-end. This is how to
          actually do it in 2026.
        </p>

        <BlogStatGrid stats={[
          { value: '180 km', label: 'Length of coast' },
          { value: '5', label: 'Main towns' },
          { value: 'May-Oct', label: 'Swimming season' },
          { value: '7 days', label: 'Sweet spot' },
        ]} />

        <BlogInlineCTA title="Planning the Riviera?" subtitle="Stamp PACA region on your free travel map." href="/signup" />

        <h2 id="where">1. Where It Is</h2>
        <BlogFranceMap
          regionIds={['pac']}
          title="The Riviera sits in PACA region — southeastern France"
          subtitle="From Cassis (near Marseille) east to Menton at the Italian border."
        />

        <h2 id="bases">2. Which Base to Pick</h2>
        <BlogTable
          caption="Riviera bases — honest comparison"
          headers={['Base', 'Vibe', 'Pros', 'Cons']}
          rows={[
            [<strong>Nice</strong>, 'Big city + all amenities', 'Airport, best train hub, cheap, amazing food', 'Urban (less beach-club vibe)'],
            [<strong>Cannes</strong>, 'Film-festival glamour', 'Walkable, beaches, Croisette promenade', 'Quiet outside festival weeks'],
            [<strong>Antibes</strong>, 'Between Nice + Cannes, lower-key', 'Picasso Museum, Old Town, sweet spot', 'Nightlife thin'],
            [<strong>Saint-Tropez</strong>, 'Super-yacht luxury', 'Iconic, exclusive, Pampelonne Beach', 'Pricey + traffic hell in August'],
            [<strong>Menton</strong>, 'Italian border town', 'Cheaper, Italian flavor, lemon festival', 'Farthest from airport'],
            [<strong>Villefranche / Eze</strong>, 'Small villages east of Nice', 'Stunning hilltop + cove, low-key', 'Small, limited restaurants'],
          ]}
        />

        <BlogCallout title="Our pick for first-timers">
          <p>
            <strong>Nice for 5 nights, then 2 nights in Saint-Paul de
            Vence or Eze</strong>. Nice's train station gives you easy
            day-trips to everything; a hilltop village finale adds the
            "postcard Riviera" feel without the city noise.
          </p>
        </BlogCallout>

        <h2 id="itinerary">3. 7-Day Itinerary</h2>
        <BlogTable
          caption="Perfect Riviera 7-day plan"
          headers={['Day', 'Base', 'What you\'re doing']}
          rows={[
            ['1', 'Nice', 'Arrive NCE airport; Promenade des Anglais + dinner in Vieux Nice'],
            ['2', 'Nice', 'Matisse + Chagall museums + Colline du Château sunset'],
            ['3', 'Monaco + Eze (day-trip)', 'Train to Monaco 20 min; Palace + Casino; return via Eze medieval village'],
            ['4', 'Antibes + Cannes', 'Morning Antibes (Picasso Museum + Old Town); afternoon Cannes beach walk'],
            ['5', 'Saint-Tropez', 'Day-trip by boat from Nice (seasonal) or bus to Fréjus then taxi'],
            ['6', 'Villefranche-sur-Mer', 'Move base; beach swim + waterfront dinner'],
            ['7', 'Menton + home', 'Morning Menton (Cocteau museum + Riviera\'s most colorful facades); afternoon flight'],
          ]}
        />

        <h2 id="transport">4. Getting Around</h2>
        <p>
          The <strong>TER Provence-Alpes-Côte d'Azur train</strong> runs
          every 20-30 min along the coast from Marseille to Ventimiglia
          (Italy). It's the local's transport of choice:
        </p>
        <BlogTable
          caption="Train times from Nice (TER local)"
          headers={['To', 'Duration', 'One-way']}
          rows={[
            ['Cannes', '35 min', '€7'],
            ['Antibes', '20 min', '€5'],
            ['Monaco', '20 min', '€4.50'],
            ['Menton', '35 min', '€6.50'],
            ['Villefranche-sur-Mer', '6 min', '€3'],
            ['Eze-sur-Mer', '11 min', '€3.50'],
            ['Marseille', '2 hr 30 (TGV) / 3 hr 30 (TER)', '€35+'],
          ]}
        />

        <p>
          <strong>Saint-Tropez has no train</strong> — that's deliberate
          (anti-tourism by design). Reach it by: seasonal fast boat from
          Nice (1h45, ~€55), bus from Fréjus (30 min after TER train), or
          driving (bad traffic in August).
        </p>

        <BlogInlineCTA title="Track your Riviera trip." subtitle="Stamp each town you visit — free interactive map." href="/signup" />

        <h2 id="monaco">5. Monaco Day-Trip</h2>
        <p>
          Monaco is a 20-minute train from Nice and easily a day trip.
          Must-dos: <strong>Casino de Monte-Carlo</strong> (dress code;
          €17 entry after 2 PM), <strong>Palais Princier</strong> (the
          Grimaldi palace), <strong>Oceanographic Museum</strong>
          (Cousteau's ocean cathedral), and the narrow medieval
          Monaco-Ville on "The Rock." Beach: <strong>Larvotto</strong>,
          public sand.
        </p>

        <BlogCallout title="Monaco money myths">
          <p>
            You don't need to be rich to visit Monaco. Day-trip costs:
            train €10, casino entry €17, café €6, museum €19, lunch
            €22. Total under €100/person — less than many Parisian days.
          </p>
        </BlogCallout>

        <h2 id="beaches">6. Best Beaches</h2>
        <BlogTable
          caption="Riviera beaches ranked"
          headers={['Beach', 'Where', 'Notable']}
          rows={[
            [<strong>Plage de Pampelonne</strong>, 'Saint-Tropez', 'Iconic celebrity beach; 5 km of white sand'],
            [<strong>Villefranche-sur-Mer</strong>, 'East of Nice', 'Calm cove + pastel village backdrop'],
            [<strong>Paloma Beach</strong>, 'Cap-Ferrat', 'Exclusive + photogenic; €50 sunbed'],
            [<strong>Plage de la Salis</strong>, 'Antibes', 'Sand (most Riviera is pebble!)'],
            [<strong>Mala Plage</strong>, 'Cap-d\'Ail (near Monaco)', 'Crystal-clear water; beach club vibe'],
            [<strong>Plage de Palombaggia</strong>, 'Porto-Vecchio, Corsica', 'Technically not Riviera; day-trip-ferry'],
            [<strong>Promenade des Anglais (Nice)</strong>, 'Nice', 'Pebble; convenient city beach'],
          ]}
        />

        <h2 id="when">7. When to Go</h2>
        <BlogBarChart
          title="Best months for the Riviera"
          subtitle="Weather + crowd + price."
          max={100}
          data={[
            { label: 'Jan', value: 42, valueLabel: '42 (cold sea)' },
            { label: 'Feb', value: 48, valueLabel: '48' },
            { label: 'Mar', value: 62, valueLabel: '62' },
            { label: 'Apr', value: 78, valueLabel: '78' },
            { label: 'May', value: 92, valueLabel: '92 ✓' },
            { label: 'Jun', value: 96, valueLabel: '96 ✓' },
            { label: 'Jul', value: 66, valueLabel: '66 (hot + packed)' },
            { label: 'Aug', value: 48, valueLabel: '48 (peak crowd)' },
            { label: 'Sep', value: 94, valueLabel: '94 ✓' },
            { label: 'Oct', value: 82, valueLabel: '82' },
            { label: 'Nov', value: 52, valueLabel: '52' },
            { label: 'Dec', value: 48, valueLabel: '48' },
          ]}
        />

        <p>
          <strong>May, June, September — clear winners.</strong> Sea is
          warm enough, flowers are out, light is legendary, and prices
          are 30-50% below July-August peak. Skip August unless you
          booked 6 months ahead and enjoy crowds.
        </p>

        <h2 id="underrated">8. Underrated Alternatives</h2>
        <ul>
          <li><strong>Menton</strong> — cheapest Riviera town, Italian-flavored, incredible lemon festival in Feb</li>
          <li><strong>Saint-Paul de Vence</strong> — medieval hilltop above Nice; the Fondation Maeght art museum is top-tier</li>
          <li><strong>Cassis</strong> — on the far west near Marseille; calanques (fjord-like coves) and less tourism</li>
          <li><strong>Corniche Drive (Grande, Moyenne, Basse)</strong> — three cliff-side roads; drive the Moyenne Corniche between Nice and Monaco</li>
        </ul>

        <h2 id="budget">9. Typical Costs (2026 EUR)</h2>
        <BlogTable
          caption="Riviera daily costs per person"
          headers={['Category', 'Budget', 'Mid-range', 'Splurge']}
          rows={[
            ['Hotel', '€50 (Nice center)', '€130 (3-star)', '€350+ (Negresco / Grand-Hôtel Cap Ferrat)'],
            ['Food', '€25 (café lunch + socca)', '€55 (proper restaurants)', '€130 (seafront + wine)'],
            ['Train + local transport', '€8', '€15', '€30 (taxis)'],
            ['Beach club + museums', '€15', '€30', '€80 (Paloma Beach sunbed)'],
            [<strong>Daily</strong>, <strong>€98</strong>, <strong>€230</strong>, <strong>€590</strong>],
          ]}
        />

        <h2 id="faq">10. FAQ</h2>
        <h3>Best Riviera base?</h3>
        <p><strong>Nice</strong>. Best value, best food, best train connections.</p>
        <h3>Worth visiting Monaco?</h3>
        <p>Yes — as a day-trip, not a base (hotels 3x pricier than Nice).</p>
        <h3>Saint-Tropez worth the detour?</h3>
        <p>Yes if you're going for beach + celeb-spotting. No if logistics matter (no train).</p>
        <h3>How many days?</h3>
        <p><strong>5-7 days</strong>. Less feels rushed; more is saturation.</p>

        <h2 id="keep">Keep Reading</h2>
        <ul>
          <li><Link to="/blog/france-travel-guide-2026">Ultimate France Guide →</Link></li>
          <li><Link to="/blog/two-week-france-itinerary-2026">2-Week France Itinerary →</Link></li>
          <li><Link to="/blog/best-france-regions-2026">10 Best French Regions →</Link></li>
          <li><Link to="/blog/french-food-guide-2026">25 French Dishes →</Link></li>
        </ul>

        <BlogEndCTA
          title="Stamp Nice, Cannes, Monaco + all of PACA."
          subtitle="Free forever. 13 French regions on your map."
        />
      </article>
    </BlogShell>
  );
}
