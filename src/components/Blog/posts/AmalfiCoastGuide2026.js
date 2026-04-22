import React from 'react';
import { Link } from 'react-router-dom';
import { BlogShell, useBlogSEO, useRevealOnScroll } from '../BlogLayout';
import { BlogTable, BlogBarChart, BlogCallout, BlogStatGrid, BlogInlineCTA, BlogEndCTA } from '../BlogComponents';
import { BlogItalyMap } from '../BlogItalyMap';
import { getPostBySlug } from '../posts';

const SLUG = 'amalfi-coast-guide-2026';

export default function AmalfiCoastGuide2026() {
  const post = getPostBySlug(SLUG);
  useBlogSEO({
    title: `${post.title} | StampYourMap Blog`,
    description: post.description,
    url: `/blog/${SLUG}`,
    image: post.ogImage,
    datePublished: post.datePublished,
    keywords: 'amalfi coast guide, positano, amalfi, ravello, capri, sorrento, amalfi coast itinerary, how to get around amalfi coast, ss163 driving',
  });
  useRevealOnScroll();

  return (
    <BlogShell>
      <article className="blog-article">
        <div className="blog-breadcrumbs">
          <Link to="/">Home</Link> / <Link to="/blog">Blog</Link> / <span>Amalfi Coast Guide</span>
        </div>
        <div className="blog-hero">
          <span className="blog-cat-chip">Italy · Amalfi Coast</span>
          <span className="blog-meta-sep">•</span><span>Published April 22, 2026</span>
          <span className="blog-meta-sep">•</span><span>{post.readMinutes} min read</span>
        </div>

        <h1>{post.heroEmoji} Amalfi Coast Complete Guide 2026: Positano, Amalfi, Ravello & Capri</h1>

        <p className="blog-lede">
          The Amalfi Coast is routinely voted the most beautiful coastline
          in the world — 50 km of pastel villages clinging to cliffs above
          a Tyrrhenian sea so blue it looks painted. It's also one of
          Italy's most mismanaged trips: wrong base, wrong transport,
          wrong month, and a dream becomes a gridlocked nightmare. This
          guide is the anti-cliché: the base you should actually pick, the
          transport that beats the bus, and the three famous towns plus
          the underrated alternatives.
        </p>

        <BlogStatGrid stats={[
          { value: '50 km', label: 'Coastline' },
          { value: '13', label: 'Famous towns' },
          { value: 'SS163', label: 'The scenic road' },
          { value: '5 days', label: 'Sweet spot' },
        ]} />

        <BlogInlineCTA title="Planning Amalfi?" subtitle="Stamp Campania + every Italian region you visit." href="/signup" />

        <h2 id="map">1. Where It Is</h2>
        <BlogItalyMap
          regionIds={['campania']}
          title="Amalfi Coast sits in Campania region, southern Italy"
          subtitle="Naples is the gateway airport; the coast runs Sorrento → Salerno."
        />

        <h2 id="bases">2. Which Base to Pick — The Real Answer</h2>
        <p>
          There are five realistic bases. This is how they actually
          stack up:
        </p>
        <BlogTable
          caption="Where to stay — honest comparison"
          headers={['Base', 'Vibe', 'Pros', 'Cons']}
          rows={[
            [<strong>Positano</strong>, 'The famous one — postcard town', 'Iconic views, best sunset, luxury hotels', 'Steep stairs, limited parking, expensive'],
            [<strong>Amalfi</strong>, 'The historic center, ferry hub', 'More affordable, central ferry access, flatter', 'Less dramatic views than Positano'],
            [<strong>Ravello</strong>, 'High-altitude quiet village', 'Elevated views, Villa Cimbrone, peaceful', '6km inland — taxi/bus to coast'],
            [<strong>Sorrento</strong>, 'Big-town infrastructure', 'Easy transport, trains to Naples + Pompeii', 'Not technically the Amalfi Coast'],
            [<strong>Praiano</strong>, 'Between Positano + Amalfi', 'Half the price of Positano, similar views', 'Fewer restaurants, quieter nights'],
          ]}
        />

        <BlogCallout title="Our actual recommendation">
          <p>
            For first-timers: <strong>Praiano</strong> for 3 nights, then
            <strong> Ravello</strong> for 2. You get Positano views without
            Positano prices, plus altitude sunset magic. Skip Sorrento
            unless you're day-tripping to Pompeii + Capri.
          </p>
        </BlogCallout>

        <h2 id="day-by-day">3. The Perfect 5-Day Itinerary</h2>
        <BlogTable
          caption="Amalfi Coast 5-day plan"
          headers={['Day', 'Base', 'What you\'re doing']}
          rows={[
            ['1', 'Praiano / Positano', 'Arrive ferry from Naples; beach + sunset aperitivo'],
            ['2', 'Positano explore', 'Spiaggia Grande morning, boat tour afternoon; Casa e Bottega dinner'],
            ['3', 'Amalfi + Ravello', 'Ferry to Amalfi town; bus to Ravello; Villa Cimbrone + Villa Rufolo; dinner Ravello'],
            ['4', 'Capri day-trip', 'Early ferry to Capri; Blue Grotto (if open) + chair lift to Mt Solaro; evening return'],
            ['5', 'Path of the Gods + departure', 'Morning hike Nocelle → Positano (famous trail); afternoon ferry Naples'],
          ]}
        />

        <h2 id="transport">4. Getting Around — Ferry Beats Bus</h2>
        <p>
          The SS163 road is beautiful but <strong>chronically gridlocked</strong>
          {' '}May-September. Buses take 2 hours for 20 km drives. The
          answer:
        </p>
        <BlogTable
          caption="Transport modes Amalfi Coast"
          headers={['Mode', 'Best for', 'Speed', 'Cost']}
          rows={[
            ['⛴️ Ferry', 'Between Positano, Amalfi, Capri, Salerno', 'Fast (15-45 min)', '€8-15/trip'],
            ['🚌 SITA bus', 'When ferries stop running / inland', 'Slow + packed peak season', '€1.30-3'],
            ['🚕 Private driver', 'Multi-stop + luggage + groups', 'Smooth', '€80-150/half-day'],
            ['🛵 Scooter', 'Agile travelers, day-trippers', 'Good outside peak hours', '€40/day'],
            ['🚗 Rental car', 'Independent exploration', 'Often useless — no parking', 'NOT recommended'],
          ]}
        />

        <BlogCallout title="The SS163 reality">
          <p>
            Everyone wants to drive the Amalfi Coast Road (SS163). It's
            genuinely spectacular. But in peak season it's also 30-40 min/km
            stop-go traffic with no parking anywhere. If you must drive it,
            do it in <strong>May, October, or before 8 AM</strong>.
          </p>
        </BlogCallout>

        <h2 id="capri">5. Capri — Worth the Day-Trip?</h2>
        <p>
          Yes, decisively. Capri has been a celebrity-magnet island since
          Tiberius lived here 2,000 years ago. What to actually do:
        </p>
        <ol>
          <li><strong>Blue Grotto</strong> — if weather cooperates; €18 + tip</li>
          <li><strong>Chairlift up Mt Solaro</strong> — 12-minute solo ride to the island's top; panoramic views</li>
          <li><strong>Via Krupp walk</strong> — zigzag cliff path built in 1902</li>
          <li><strong>Piazzetta</strong> — famous small square + people-watching</li>
          <li><strong>Faraglioni rocks</strong> — boat-tour around the island's famous sea stacks</li>
        </ol>
        <p>Skip: Anacapri "lemon tour" unless you're really into citrus.</p>

        <h2 id="food">6. What to Eat — 8 Campania Essentials</h2>
        <BlogTable
          caption="Campania food while you're there"
          headers={['#', 'Dish', 'Where']}
          rows={[
            ['1', <strong>Pizza Margherita in Naples</strong>, 'Da Michele — pre-Amalfi day'],
            ['2', <strong>Spaghetti alle Vongole</strong>, 'Ristorante Max (Amalfi)'],
            ['3', <strong>Linguine ai Frutti di Mare</strong>, 'Da Adolfo (Laurito Beach, Positano)'],
            ['4', <strong>Mozzarella di Bufala</strong>, 'Any restaurant — order a slab'],
            ['5', <strong>Sfogliatella</strong>, 'Pasticceria Pansa (Amalfi)'],
            ['6', <strong>Delizia al Limone</strong>, 'Amalfi lemon cake — everywhere'],
            ['7', <strong>Insalata Caprese</strong>, 'Capri — the original'],
            ['8', <strong>Limoncello</strong>, 'Made from Sfusato lemons native to the coast'],
          ]}
        />

        <h2 id="when">7. When to Go</h2>
        <BlogBarChart
          title="Best months for the Amalfi Coast (2026)"
          subtitle="Composite of weather, crowd level, price, and open restaurants."
          max={100}
          data={[
            { label: 'Jan', value: 28, valueLabel: '28 (closed)' },
            { label: 'Feb', value: 34, valueLabel: '34 (closed)' },
            { label: 'Mar', value: 52, valueLabel: '52' },
            { label: 'Apr', value: 82, valueLabel: '82' },
            { label: 'May', value: 96, valueLabel: '96 ✓ peak' },
            { label: 'Jun', value: 88, valueLabel: '88' },
            { label: 'Jul', value: 60, valueLabel: '60 (hot + crowded)' },
            { label: 'Aug', value: 48, valueLabel: '48 (Ferragosto mayhem)' },
            { label: 'Sep', value: 94, valueLabel: '94 ✓' },
            { label: 'Oct', value: 88, valueLabel: '88' },
            { label: 'Nov', value: 42, valueLabel: '42' },
            { label: 'Dec', value: 32, valueLabel: '32' },
          ]}
        />

        <p>
          <strong>May and September are the clear winners.</strong> Warm,
          swimmable, ferries running, restaurants open, but without the
          July-August chaos and price premium. April + October work but
          sea may be cool.
        </p>

        <BlogInlineCTA title="Track the Italian coast you visit." subtitle="StampYourMap — free forever." href="/signup" />

        <h2 id="budget">8. How Much It Costs (2026)</h2>
        <BlogTable
          caption="Amalfi Coast 5 days per person (EUR)"
          headers={['Category', 'Budget', 'Mid-range', 'Splurge']}
          rows={[
            ['Hotel (4 nights)', '€400', '€900', '€2,500'],
            ['Food', '€150', '€300', '€600'],
            ['Ferries + transfers', '€80', '€120', '€200'],
            ['Capri day-trip', '€80', '€120', '€200'],
            ['Activities (boat tour, Grotta, etc)', '€80', '€150', '€400'],
            [<strong>Total</strong>, <strong>~€790</strong>, <strong>~€1,590</strong>, <strong>~€3,900</strong>],
          ]}
        />

        <h2 id="underrated">9. Underrated Alternatives</h2>
        <p>
          If Positano's crowds break your soul, consider:
        </p>
        <ul>
          <li><strong>Procida</strong> — 30 minutes from Naples by ferry. Pastel fishing village, Italy 2022 Capital of Culture.</li>
          <li><strong>Ischia</strong> — larger than Capri, less fame, famous thermal springs.</li>
          <li><strong>Cilento Coast</strong> — 60 km south, half the price, 1/10 the crowds. Paestum's Greek temples within 20 min drive.</li>
        </ul>

        <h2 id="faq">10. FAQ</h2>
        <h3>How long do I need on the Amalfi Coast?</h3>
        <p><strong>5 days minimum</strong>. 7 if you add Pompeii + Capri as proper explorations.</p>
        <h3>Is driving the SS163 dangerous?</h3>
        <p>Not dangerous; tedious. Two-way cliff road with tour buses. Get a driver instead.</p>
        <h3>Is Positano worth the hype?</h3>
        <p>Yes for the vistas + sunset. No for the prices. Stay in Praiano, visit Positano for dinners.</p>
        <h3>Can I do Amalfi Coast in a day?</h3>
        <p>From Naples — just barely. Ferry to Positano, walk, ferry to Amalfi, ferry back. Tiring.</p>

        <h2 id="keep">Keep Reading</h2>
        <ul>
          <li><Link to="/blog/italy-travel-guide-2026">Ultimate Italy Guide →</Link></li>
          <li><Link to="/blog/two-week-italy-itinerary-2026">2-Week Italy Itinerary →</Link></li>
          <li><Link to="/blog/best-italy-regions-2026">10 Best Italian Regions →</Link></li>
          <li><Link to="/blog/italian-food-guide-2026">30 Italian Dishes →</Link></li>
        </ul>

        <BlogEndCTA
          title="Stamp Positano, Amalfi, Capri + more on your map."
          subtitle="Free forever. 20 Italian regions. Your Amalfi trip, one map."
        />
      </article>
    </BlogShell>
  );
}
