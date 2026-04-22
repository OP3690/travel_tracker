import React from 'react';
import { Link } from 'react-router-dom';
import { BlogShell, useBlogSEO, useRevealOnScroll } from '../BlogLayout';
import { BlogTable, BlogCallout, BlogStatGrid, BlogInlineCTA, BlogEndCTA, BlogBarChart } from '../BlogComponents';
import { BlogFranceMap } from '../BlogFranceMap';
import { getPostBySlug } from '../posts';

const SLUG = 'two-week-france-itinerary-2026';
const ROUTE = ['idf', 'cvl', 'naq', 'occ', 'pac'];

export default function TwoWeekFranceItinerary2026() {
  const post = getPostBySlug(SLUG);
  useBlogSEO({
    title: `${post.title} | StampYourMap Blog`,
    description: post.description,
    url: `/blog/${SLUG}`,
    image: post.ogImage,
    datePublished: post.datePublished,
    keywords: 'france itinerary 2 weeks, paris loire bordeaux provence nice itinerary, france 14 days, france trip plan 2026',
  });
  useRevealOnScroll();

  return (
    <BlogShell>
      <article className="blog-article">
        <div className="blog-breadcrumbs">
          <Link to="/">Home</Link> / <Link to="/blog">Blog</Link> / <span>2-Week France Itinerary</span>
        </div>
        <div className="blog-hero">
          <span className="blog-cat-chip">France · Itinerary</span>
          <span className="blog-meta-sep">•</span><span>Published April 22, 2026</span>
          <span className="blog-meta-sep">•</span><span>{post.readMinutes} min read</span>
        </div>

        <h1>{post.heroEmoji} The Perfect 2-Week France Itinerary: Paris → Loire → Bordeaux → Provence → Nice (2026)</h1>

        <p className="blog-lede">
          14 days covering Paris, the Loire Valley châteaux, Bordeaux's
          wine country, Provence's lavender villages, and the Côte
          d'Azur. Four TGV legs, zero wasted days. This is the
          first-timer France itinerary our panel rates highest.
        </p>

        <BlogStatGrid stats={[
          { value: '14', label: 'Days' },
          { value: '5', label: 'Regions' },
          { value: '4', label: 'TGV legs' },
          { value: '€3,000', label: 'Mid-range total' },
        ]} />

        <BlogInlineCTA title="Stamp each region." subtitle="Free map, 13 French regions." href="/signup" />

        <h2 id="route">1. The Route</h2>
        <BlogFranceMap
          regionIds={ROUTE}
          title="Paris → Loire → Bordeaux → Occitanie → Provence / Côte d'Azur"
          subtitle="Five regions, four TGV trains, one grand French loop."
        />

        <h2 id="day-by-day">2. Day-by-Day</h2>
        <BlogTable
          caption="Recommended 14-day plan"
          headers={['Day', 'Base', 'What you\'re doing']}
          rows={[
            ['1', <strong>Paris</strong>, 'Arrive CDG; check-in Marais/Le Marais; evening Seine walk'],
            ['2', <strong>Paris</strong>, 'Louvre (9 AM slot) + Tuileries + Notre-Dame + dinner bistrot'],
            ['3', <strong>Paris</strong>, 'Eiffel (sunrise) + Musée d\'Orsay + Montmartre sunset'],
            ['4', <strong>Paris</strong>, 'Versailles day-trip via RER C; evening cabaret or opera'],
            ['5', <strong>Loire Valley</strong>, 'TGV Paris → Tours (1h15); visit Chambord + Chenonceau + dinner in Amboise'],
            ['6', <strong>Loire / Bordeaux</strong>, 'Morning Villandry gardens; afternoon TGV to Bordeaux (2h40)'],
            ['7', <strong>Bordeaux</strong>, 'Place de la Bourse, Cité du Vin museum, sunset Miroir d\'Eau'],
            ['8', <strong>Saint-Émilion</strong>, 'Day-trip to wine village; 3 château tastings'],
            ['9', <strong>Provence (Aix-en-Provence)</strong>, 'TGV Bordeaux → Aix (5 hr via Paris or Lyon); settle in'],
            ['10', <strong>Provence</strong>, 'Luberon villages day: Gordes + Roussillon + Menerbes'],
            ['11', <strong>Avignon + Pont du Gard</strong>, 'Avignon Palais des Papes; lunch at Pont du Gard'],
            ['12', <strong>Nice</strong>, 'Train to Nice (~2 hr); Promenade des Anglais + Vieux Nice'],
            ['13', <strong>Monaco / Eze</strong>, 'Day-trip Monaco (train 20 min) + medieval Eze village'],
            ['14', <strong>Paris → home</strong>, 'Morning flight Nice → Paris → international flight'],
          ]}
        />

        <BlogCallout title="Two bookings that make the trip">
          <p>
            (1) <strong>Book TGV 60 days ahead</strong> — Paris→Bordeaux
            and Bordeaux→Aix in Super Economy saves €200. (2){' '}
            <strong>Versailles "Palace + Gardens + Trianon" ticket with
            fountain show</strong> timing — book the Saturday show 4 weeks
            ahead.
          </p>
        </BlogCallout>

        <h2 id="trains">3. Train Legs</h2>
        <BlogTable
          caption="TGV segments + prices (2026 EUR, 60 days ahead)"
          headers={['Day', 'Route', 'Duration', 'Cost']}
          rows={[
            ['5', 'Paris → Tours (Loire)', '1 hr 15', '€25-45'],
            ['6', 'Tours → Bordeaux', '2 hr 40', '€35-60'],
            ['9', 'Bordeaux → Aix-en-Provence', '5 hr 30 (via Paris)', '€60-95'],
            ['12', 'Avignon → Nice', '3 hr 30', '€45-75'],
            ['14', 'Nice → Paris CDG (flight)', '1 hr 30', '€55-95'],
            [<strong>Transit total</strong>, '', '', <strong>€220-370</strong>],
          ]}
        />

        <h2 id="lodging">4. Where to Sleep</h2>
        <BlogTable
          caption="Recommended accommodations per base"
          headers={['Base', 'Budget', 'Mid-range', 'Splurge']}
          rows={[
            ['Paris', 'Generator Paris', 'Hôtel de la Place du Louvre', 'Le Bristol Paris'],
            ['Loire', 'Le Clos d\'Amboise', 'Château de Chissay', 'Château de Marçay'],
            ['Bordeaux', 'Mama Shelter', 'Seeko\'o Hotel', 'Intercontinental Grand Hôtel'],
            ['Aix-en-Provence', 'Hotel Cézanne', 'Hotel des Augustins', 'Villa Gallici'],
            ['Nice', 'Hostel Meyerbeer Beach', 'Hotel Rossetti', 'Le Negresco'],
          ]}
        />

        <BlogInlineCTA title="Track each region you visit." subtitle="Stamp France on your free interactive map." href="/signup" />

        <h2 id="cost">5. Total Trip Cost</h2>
        <BlogBarChart
          title="14-day France trip breakdown (mid-range ~€3,000)"
          subtitle="Per-person spend, excluding international flight."
          max={100} unit="%"
          data={[
            { label: 'Accommodation', value: 40, valueLabel: '40%' },
            { label: 'Food & wine', value: 22, valueLabel: '22%' },
            { label: 'TGV + transport', value: 12, valueLabel: '12%' },
            { label: 'Activities', value: 10, valueLabel: '10%' },
            { label: 'City transport', value: 6, valueLabel: '6%' },
            { label: 'Buffer', value: 10, valueLabel: '10%' },
          ]}
        />

        <BlogTable
          caption="14-day per-person total (EUR)"
          headers={['Tier', 'Daily × 14', 'Transport', 'Activities', 'Total']}
          rows={[
            ['Backpacker', '€900', '€220', '€120', <strong>€1,240</strong>],
            ['Mid-range', '€2,450', '€310', '€250', <strong>€3,010</strong>],
            ['Comfort', '€5,500', '€440', '€700', <strong>€6,640</strong>],
          ]}
        />

        <h2 id="alt">6. Alternative Routes</h2>
        <h3>🍷 Wine + food focus</h3>
        <p>
          <strong>Paris (3) → Burgundy (3) → Lyon (3) → Provence (3) → Nice (2)</strong>.
          Skip Loire + Bordeaux for Burgundy (Beaune) + Lyon (world's best
          food city). Best for foodies.
        </p>
        <h3>🏰 Château deep-dive</h3>
        <p>
          <strong>Paris (3) → Loire (5) → Dordogne (4) → Provence (2)</strong>.
          Loire has 300+ castles; deep-dive 5 of them across 5 days.
          Then Dordogne for medieval villages + caves.
        </p>
        <h3>🏔️ Alps + Riviera</h3>
        <p>
          <strong>Paris (3) → Lyon (2) → Chamonix/Annecy (4) → Nice (3) → Corsica (2)</strong>.
          Mountains + Mediterranean; best June-September.
        </p>

        <h2 id="faq">7. FAQ</h2>
        <h3>Can I compress this 14-day route into 10 days?</h3>
        <p>{"Yes — drop either Loire or Bordeaux and tighten Provence to two nights: Paris (4) → Bordeaux (2) → Avignon (2) → Nice (2). Any shorter than 10 days and you're spending more time in stations than at châteaux. Don't try to fit Corsica or the Alps into a 10-day loop — they need a separate trip."}</p>
        <h3>Should I reverse the route and fly into Nice?</h3>
        <p>{"Absolutely — EasyJet, Delta, and United often price NCE (Nice) arrivals €80-180 cheaper than CDG from the US East Coast in shoulder season. Reversing lets you acclimate slowly in Provence (fewer crowds, warmer nights) and end in Paris with energy for the big-hitter sights. The TGV runs the same both directions."}</p>
        <h3>When should I rent a car on this itinerary?</h3>
        <p>{"Only for the Loire and Provence legs — cities are a nightmare for parking (€30-45/day) and Paris, Lyon, Bordeaux, and Nice have Crit'Air low-emission zones that fine non-compliant plates €68. Pick up a compact at the Tours TGV station or Avignon Centre and return it before re-entering any city. Automatic transmissions cost 30-40% more — book early."}</p>
        <h3>Is this trip doable with kids, and what should I adjust?</h3>
        <p>{"Very doable for ages 6+. Swap one Louvre day for Disneyland Paris (RER A from central Paris in 40 minutes), add a boat ride on the Dordogne, and build in a beach afternoon at Cannes or Nice. Under-4s ride TGV free and museums are typically free under 18; plan 90-minute museum blocks, not 3-hour marathons, to avoid meltdowns."}</p>
        <h3>How do I handle jet lag on arrival day in Paris?</h3>
        <p>{"Book an arrival hotel for early check-in (Hôtel Malte Opéra or similar, €140-180 with 11am guaranteed), shower, and force yourself outside for a 2-hour walk along the Seine. Eat a light lunch, no nap longer than 45 minutes, and stay up until 21:00 local. Save the Louvre for day 2 or 3 — you'll remember nothing on day 1."}</p>
        <h3>When should I book TGV tickets for the best prices?</h3>
        <p>{"SNCF's booking window opens exactly 4 months out to the day — set a calendar reminder and buy at 07:00 Paris time when inventory drops. Super Economy fares (€29-55) sell out in 24-48 hours on peak routes; buying 30 days out typically costs 2-3x more. Ouigo (SNCF's low-cost brand) is cheaper again but stops at outer stations."}</p>
        <h3>Can I rely on carry-on only for two weeks in France?</h3>
        <p>{"Yes, and it's genuinely the right call — TGV luggage racks are narrow, Paris walk-ups rarely have lifts, and cobbled streets destroy rolling wheels. A 40L backpack or 35L spinner plus a packable daypack handles the whole trip if you plan two laundry cycles (€6-9 at self-service lavomatics in Lyon and Nice). Skip the checked bag tax and the carousel wait."}</p>
        <h3>What if it rains for three days straight in Paris or Brittany?</h3>
        <p>{"Build a rainy-day B plan for every stop: Louvre + Musée d'Orsay in Paris, Musée des Confluences in Lyon, the Mucem in Marseille, and the Palais des Papes in Avignon are all excellent in bad weather. Breton rain is atmospheric — Saint-Malo's ramparts are spectacular under grey skies. Move planned picnics indoors to a covered market like Les Halles de Lyon."}</p>
        <h3>Is this route good for solo travellers or couples?</h3>
        <p>{"Couples get the best value — double rooms at €110-160/night beat two hostel beds, and TGV seats are sold in pairs. Solo travellers save money at hostels (St Christopher's Paris at €45, Hello Lyon at €38) and find instant company on food-tour meetups. Both styles do fine; the only real adjustment is booking one cheaper hotel room vs two hostel dorms."}</p>
        <h3>How accessible is this itinerary for older travellers or mobility issues?</h3>
        <p>{"Paris Metro lines 1 and 14 are fully step-free; most others aren't. TGVs have wheelchair spots (book via SNCF Accès Plus 48h ahead). Book ground-floor or lift-equipped hotels (filter on Booking.com), add one extra night per stop to slow the pace, and hire private transfers (€80-120) between train stations and hotels to skip luggage-on-stairs hell."}</p>
        <h3>What's the backup plan if a TGV strike hits mid-trip?</h3>
        <p>{"French rail strikes usually give 48h notice via SNCF's Info Trafic app. Fallback: BlaBlaCar (ride-share, €25-50 per leg), FlixBus/BlaBlaBus overnight coaches, or a one-way Europcar rental. Travel insurance with strike coverage (World Nomads, AXA) reimburses extra lodging. Don't panic-buy refundable flights; strikes typically last 1-3 days."}</p>
        <h3>Can I add a London or Barcelona extension?</h3>
        <p>{"Yes — Paris-London is 2h15 on Eurostar (€59-130 booked early) and Paris-Barcelona is 6h30 direct TGV (€39-89). Add 3 nights minimum per city or skip it; a 2-night add-on wastes half the time on trains. Schengen clock matters: London is outside, Barcelona inside — a 14-day France + 3-day Barcelona adds up against your 90/180 allowance."}</p>
        <h3>What's the biggest itinerary mistake to avoid?</h3>
        <p>{"Moving hotels every day. Three nights minimum per base (Paris, Loire, Bordeaux, Provence, Nice), two nights only if unavoidable. Daily packing kills the trip — you spend 90 minutes a day in transit and arrive exhausted at each new city. Use day trips (Versailles from Paris, Saint-Émilion from Bordeaux) to see more without changing beds."}</p>
        <h3>How much should I budget for this itinerary per person?</h3>
        <p>{"Backpacker at €70/day = €980, mid-range at €175/day = €2,450, and comfort at €425/day = €5,950 — not counting flights or TGV. Add €220-320 per person for TGV legs booked 60+ days out, and €40-80 for metro and local transit. Build in a €150 buffer for one splurge meal (think Bocuse-disciple bistro in Lyon)."}</p>
        <h3>Is it worth shifting Corsica or the Alps into this plan?</h3>
        <p>{"Only if you can extend to 18-21 days. Corsica needs a ferry or flight from Nice/Marseille plus a car (4 nights minimum to justify it); Chamonix and the Alps add a 2h30 TGV to Annecy plus 1h40 bus. Both are superb but they replace, not supplement — swap Loire + Bordeaux for Alps + Corsica if mountain/island is your priority."}</p>

        <h2 id="keep">Keep Reading</h2>
        <ul>
          <li><Link to="/blog/france-travel-guide-2026">Ultimate France Guide →</Link></li>
          <li><Link to="/blog/best-france-regions-2026">10 Best French Regions →</Link></li>
          <li><Link to="/blog/french-food-guide-2026">25 French Dishes →</Link></li>
          <li><Link to="/blog/french-riviera-guide-2026">French Riviera Guide →</Link></li>
          <li><Link to="/blog/france-budget-travel-2026">France Budget Guide →</Link></li>
        </ul>

        <BlogEndCTA
          title="Turn this itinerary into your France map."
          subtitle="Stamp each region. Free forever."
        />
      </article>
    </BlogShell>
  );
}
