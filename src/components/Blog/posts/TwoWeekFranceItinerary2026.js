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
        <h3>Can I do this in 10 days?</h3>
        <p>Yes — drop Loire or Bordeaux. 10-day: Paris (4) → Bordeaux (2) → Provence (2) → Nice (2).</p>
        <h3>Reverse the route?</h3>
        <p>Yes — fly into Nice, end in Paris. Often cheaper from US East Coast.</p>
        <h3>Rent a car?</h3>
        <p>Only for Loire + Provence regions, not cities. TGV for intercity.</p>
        <h3>Kids-friendly?</h3>
        <p>Yes — Disneyland Paris day-trip fits easily after Versailles.</p>

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
