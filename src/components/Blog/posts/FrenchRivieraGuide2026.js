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
        <h3>What's the best base for a first Riviera trip?</h3>
        <p>{"Nice, by a wide margin. Hotels average €110-170 vs Cannes €180-260 or Monaco €400+, the TER coastal train runs east-west from Menton to Cannes every 30 minutes for €4-10, and the Vieux Nice food scene (socca, pissaladière, Cours Saleya market) is the best day-to-day eating on the coast. Stay in Le Carré d'Or or Old Nice for walkable access."}</p>
        <h3>Which neighbourhood in Nice should I actually book?</h3>
        <p>{"Vieux Nice (Old Town) for atmosphere and food — pastel alleys, markets, late-night bars. Le Carré d'Or for upscale shopping and easy Promenade des Anglais access. Musicians / Jean-Médecin for modern value hotels 8 minutes' walk to the beach. Avoid Nice Ouest (west of the airport) — far from the action. Libération is hip, cheap, and 15 min by tram from centre."}</p>
        <h3>Is Monaco worth visiting, and how long do I need?</h3>
        <p>{"Yes, as a half-day trip from Nice — the TER train takes 22 minutes (€4.60) and drops you at Monte Carlo. Walk the Casino Square, Prince's Palace, Oceanographic Museum, and the old port in 4-5 hours. Skip as an overnight: hotels start at €380, and the place empties after dinner except for club nights at Jimmy'z and Twiga. Dress code: no flip-flops in the casino."}</p>
        <h3>Is Saint-Tropez worth the detour given no train access?</h3>
        <p>{"Yes if beach-club vibes and celeb-spotting matter — Pampelonne's clubs (Club 55, La Réserve à la Plage) are legendary. Getting there requires a car (90 minutes from Nice) or the summer ferry from Nice/Cannes (2h15, €65 one-way). Day-trip difficult; plan 2 nights. July-August rates are brutal (€500+ for 3-star) — May or September is the sweet spot."}</p>
        <h3>How many days do I need on the Riviera overall?</h3>
        <p>{"Five to seven days is the sweet spot: 3 nights Nice as base (with Monaco, Èze, Villefranche day trips), 1-2 nights Cannes or Antibes, and 1-2 nights Saint-Tropez if beach-club is your thing. Under 4 days you'll skip half the coast; over 8 days repeat the same-same coastline unless you add inland Provence (Grasse, Gorges du Verdon)."}</p>
        <h3>When is the best month to visit?</h3>
        <p>{"Late May to mid-June and early September — water 22-25°C, daytime 24-28°C, beaches a third as crowded as August. July-August means 30-35°C days, €6 parking-meter hell, and hotels 60-80% more expensive. May 12-23 (Cannes Film Festival) and the Monaco Grand Prix (late May) triple prices in those towns specifically — dodge those dates or book 9 months out."}</p>
        <h3>Is the Riviera safe from pickpockets and scams?</h3>
        <p>{"Broadly very safe, but Nice's Promenade des Anglais, train stations (Nice-Ville, Cannes, Monaco), and packed beach clubs attract pickpockets in peak season. Use a crossbody bag, never leave bags on a beach towel while swimming (use the €5 locker), and ignore 'free bracelet' hustlers around Place Massena. Violent crime against tourists is genuinely rare."}</p>
        <h3>What are the best swimmable beaches and are they free?</h3>
        <p>{"Best free public beaches: Plage Mala (Cap d'Ail, hike down 10 min), Plage de Passable (Cap Ferrat), Plage de la Gravette (Antibes old town), and Plage des Marinières (Villefranche). Most Nice and Cannes beaches are mixed public-private — find the 'plage publique' sections free; private clubs charge €25-70 for a sunbed. All beaches on the Côte d'Azur are rocky or pebbly east of Antibes."}</p>
        <h3>How do I get around without renting a car?</h3>
        <p>{"The TER coastal train (Menton-Cannes-Antibes-Nice) runs every 30 min for €3-10 and covers 80% of the must-sees. Lignes d'Azur buses (€1.70/ride, €10/day pass) reach inland villages like Èze and Saint-Paul-de-Vence. Uber works in Nice-Cannes-Monaco; taxis are strictly metered. Rent a car only for Saint-Tropez, Grasse, or Gorges du Verdon day trips."}</p>
        <h3>Is a day trip to inland Provence (Grasse, Èze, Saint-Paul) worthwhile?</h3>
        <p>{"Yes — Èze Village (clifftop medieval village, 400m above the sea) is a 20-minute bus from Nice and one of the Riviera's best half-days. Saint-Paul-de-Vence (Fondation Maeght art gallery + cobbled old town) is 40 minutes by bus. Grasse (perfume museums + factory tours) needs a car or 2-hour bus; combine with Gourdon for scenery. Pick one, not all three, in a single day."}</p>
        <h3>Is the Riviera family-friendly for kids?</h3>
        <p>{"Very — Marineland near Antibes, the Oceanographic Museum in Monaco, Nice's Promenade des Anglais bike path, and the calm pebbled beaches of Villefranche are stroller-friendly. The pebbles hurt bare feet (water shoes are essential). Saint-Tropez beach clubs allow kids by day but are poor adults-only atmospheres after 22:00. Monaco's aquarium beats Disneyland for under-8s."}</p>
        <h3>What do the Riviera's best food experiences cost?</h3>
        <p>{"Socca at Chez Pipo (Nice): €3.50 per portion. Lunch formule in Vieux Nice: €18-24. Dinner at a seafront bistro: €40-60 with wine. Michelin-starred splurge at La Palme d'Or (Cannes) or Le Louis XV (Monaco): €350-550 per head. Monaco's Marché de la Condamine is the cheapest sit-down lunch in the principality — €12-15 for a full plate."}</p>
        <h3>How's the nightlife and where are the main party districts?</h3>
        <p>{"Nice: Cours Saleya bars and High Club / Waka on Promenade des Anglais. Cannes: Croisette beach clubs (Baôli, Le Bâoli) and La Suite. Monaco: Jimmy'z, Twiga, and Sass Café (yacht-owner crowd). Saint-Tropez: Les Caves du Roy and summer Pampelonne day-club scene. Dress code everywhere is 'smart chic' — no shorts or trainers past 22:00."}</p>
        <h3>When should I book hotels and flights for the Riviera?</h3>
        <p>{"Flights to Nice (NCE) 3-4 months ahead for July-Aug, 6-8 weeks for shoulder. Hotels for July-August: book 5-6 months ahead, especially for 3-4 star boutique. Cannes Film Festival rooms need booking in January for the following May; Monaco Grand Prix even earlier. Shoulder-season (May/Sept/Oct) prices drop 30-45% vs July-Aug peak."}</p>
        <h3>Can I extend the trip into Italy (Ventimiglia, San Remo)?</h3>
        <p>{"Easy — Ventimiglia is 35 minutes by TER train from Menton (€5), Genoa 2h15 further. Friday is market day in Ventimiglia; locals take the train just for the €4 pizza al taglio. For a bigger add-on, do 3 nights Cinque Terre (4h from Nice via Genoa). Make sure your Schengen 90/180 clock has room — Italy is Schengen just like France."}</p>

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
