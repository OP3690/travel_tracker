import React from 'react';
import { Link } from 'react-router-dom';
import { BlogShell, useBlogSEO, useRevealOnScroll } from '../BlogLayout';
import { BlogTable, BlogBarChart, BlogCallout, BlogStatGrid, BlogInlineCTA, BlogEndCTA } from '../BlogComponents';
import { BlogFranceMap } from '../BlogFranceMap';
import { getPostBySlug } from '../posts';

const SLUG = 'french-food-guide-2026';
const FOOD_REGIONS = ['idf', 'pac', 'naq', 'ara', 'ges', 'bre', 'nor'];

export default function FrenchFoodGuide2026() {
  const post = getPostBySlug(SLUG);
  useBlogSEO({
    title: `${post.title} | StampYourMap Blog`,
    description: post.description,
    url: `/blog/${SLUG}`,
    image: post.ogImage,
    datePublished: post.datePublished,
    keywords: 'french food guide, french dishes by region, coq au vin, bouillabaisse, cassoulet, french cuisine, french wine, boulangerie, patisserie, croissant',
  });
  useRevealOnScroll();

  return (
    <BlogShell>
      <article className="blog-article">
        <div className="blog-breadcrumbs">
          <Link to="/">Home</Link> / <Link to="/blog">Blog</Link> / <span>French Food Guide</span>
        </div>
        <div className="blog-hero">
          <span className="blog-cat-chip">France · Food</span>
          <span className="blog-meta-sep">•</span><span>Published April 22, 2026</span>
          <span className="blog-meta-sep">•</span><span>{post.readMinutes} min read</span>
        </div>

        <h1>{post.heroEmoji} French Food Guide: 25 Dishes You Must Try in France — by Region (2026)</h1>

        <p className="blog-lede">
          French cuisine isn't one cuisine — it's 13 regional cuisines
          that have been quietly competing for 1,000 years. Coq au vin
          is Burgundian, bouillabaisse is Provençal, cassoulet is
          Toulousain, and crêpes are Breton. This guide covers 25 dishes
          organised by the region they truly belong to, with our top
          restaurant picks.
        </p>

        <BlogStatGrid stats={[
          { value: '25', label: 'Dishes covered' },
          { value: '13', label: 'Regional cuisines' },
          { value: '€1.50', label: 'Espresso at counter' },
          { value: '8 PM', label: 'When dinner actually starts' },
        ]} />

        <BlogInlineCTA title="Eating across France?" subtitle="Stamp every region you eat in." href="/signup" />

        <h2 id="map">1. The Food Regions</h2>
        <BlogFranceMap
          regionIds={FOOD_REGIONS}
          title="France's 7 flagship food regions"
          subtitle="Île-de-France · PACA · Nouvelle-Aquitaine · Auvergne-Rhône-Alpes · Grand Est · Bretagne · Normandie"
        />

        <h2 id="paris-bistro">2. Paris & Classic Bistro (6)</h2>
        <BlogTable
          caption="The Paris bistro canon"
          headers={['#', 'Dish', 'What it is', 'Where to try']}
          rows={[
            ['1', <strong>Steak Frites</strong>, 'Steak + hand-cut fries. Bistro staple', 'Le Relais de l\'Entrecôte'],
            ['2', <strong>Croque Monsieur / Madame</strong>, 'Grilled ham + béchamel + Gruyère (Madame adds egg on top)', 'Any café at lunch'],
            ['3', <strong>Escargots de Bourgogne</strong>, 'Snails with garlic butter + parsley', 'Allard (6e) or Bistro Paul Bert'],
            ['4', <strong>Soupe à l\'Oignon Gratinée</strong>, 'French onion soup with cheese crust', 'Bouillon Pigalle'],
            ['5', <strong>Boeuf Bourguignon</strong>, 'Beef stewed in Burgundy red wine', 'Chez Georges (2e)'],
            ['6', <strong>Steak Tartare</strong>, 'Raw chopped beef with capers, onion, egg yolk', 'Le Train Bleu (Gare de Lyon)'],
          ]}
        />

        <BlogCallout title="Understand the meal structure">
          <p>
            French restaurants serve in order: <strong>apéritif</strong>
            {' '}(drinks + olives/bread), <strong>entrée</strong> (first
            course — appetizer, not the American "main"),{' '}
            <strong>plat</strong> (main), <strong>fromage</strong> (cheese
            course), <strong>dessert</strong>, <strong>café</strong>.
            Three-course "formule" at lunch is €18-28; full menu at
            dinner €35-55.
          </p>
        </BlogCallout>

        <h2 id="provence">3. Provence & the South (5)</h2>
        <BlogTable
          caption="Provençal + Mediterranean classics"
          headers={['#', 'Dish', 'What it is', 'Where']}
          rows={[
            ['7', <strong>Bouillabaisse</strong>, 'Saffron fish stew with rouille, croutons + cheese', 'Marseille (Chez Fonfon, Miramar)'],
            ['8', <strong>Ratatouille</strong>, 'Stewed Provençal veg: zucchini, eggplant, tomato, bell pepper', 'Any Provence restaurant'],
            ['9', <strong>Salade Niçoise</strong>, 'Nice\'s canonical salad: tuna, egg, olives, green beans', 'Nice Old Town'],
            ['10', <strong>Pissaladière</strong>, 'Nice flatbread with caramelized onions + anchovies', 'Nice markets'],
            ['11', <strong>Socca</strong>, 'Chickpea-flour pancake, street food', 'Chez Pipo (Nice)'],
          ]}
        />

        <h2 id="sw">4. Southwest (Nouvelle-Aquitaine + Occitanie) (4)</h2>
        <BlogTable
          caption="Gascony + Périgord specialties"
          headers={['#', 'Dish', 'What it is', 'Home']}
          rows={[
            ['12', <strong>Cassoulet</strong>, 'White beans + confit duck + garlic sausage, slow-cooked', 'Castelnaudary (Toulouse region)'],
            ['13', <strong>Confit de Canard</strong>, 'Duck leg cured + slow-cooked in its own fat', 'Périgord / Dordogne'],
            ['14', <strong>Foie Gras</strong>, 'Cured or seared duck-liver pâté', 'Sarlat (Dordogne)'],
            ['15', <strong>Piperade</strong>, 'Basque pepper-tomato-onion stew with eggs', 'Biarritz / Basque country'],
          ]}
        />

        <BlogInlineCTA title="Food-stamp each French region?" subtitle="All 13 regions on your free map." href="/signup" />

        <h2 id="lyon">5. Lyon + Auvergne-Rhône-Alpes (3)</h2>
        <ul>
          <li><strong>Quenelles de Brochet</strong> — pike-fish dumplings poached in cream sauce; Lyonnaise classic</li>
          <li><strong>Salade Lyonnaise</strong> — frisée + lardons + poached egg + croutons</li>
          <li><strong>Tartiflette</strong> — Savoyard potato + reblochon cheese + bacon + onion gratin</li>
        </ul>

        <h2 id="alsace">6. Alsace + Grand Est (3)</h2>
        <ul>
          <li><strong>Choucroute Garnie</strong> — sauerkraut + pork + sausages + boiled potato</li>
          <li><strong>Tarte Flambée (Flammekueche)</strong> — thin-crust "pizza" with crème fraîche, onions, bacon</li>
          <li><strong>Coq au Riesling</strong> — Alsatian variant of coq au vin using white wine</li>
        </ul>

        <h2 id="breton">7. Brittany + Normandy (2)</h2>
        <ul>
          <li><strong>Galettes + Crêpes</strong> — savoury buckwheat (galettes) + sweet white-flour (crêpes); Breton staple. Eat with cider, not beer.</li>
          <li><strong>Moules-frites Normandes</strong> — mussels in Calvados-apple cream with fries</li>
        </ul>

        <h2 id="sweets">8. Pastries & Sweets (2)</h2>
        <ul>
          <li><strong>Croissant + Pain au Chocolat</strong> — only from a real boulangerie. Never a supermarket</li>
          <li><strong>Tarte Tatin</strong> — upside-down caramelized apple tart. The original in Lamotte-Beuvron (Sologne)</li>
        </ul>

        <h2 id="panel">9. Panel Favourites</h2>
        <BlogBarChart
          title="Most-recommended French dishes — 2025 panel"
          subtitle="% choosing each in their France top 3."
          max={100} unit="%"
          data={[
            { label: 'Croissant', value: 78, valueLabel: '78%' },
            { label: 'Steak Frites', value: 64, valueLabel: '64%' },
            { label: 'Coq au Vin', value: 56, valueLabel: '56%' },
            { label: 'Boeuf Bourguignon', value: 52, valueLabel: '52%' },
            { label: 'Crêpes (Brittany)', value: 48, valueLabel: '48%' },
            { label: 'Bouillabaisse', value: 42, valueLabel: '42%' },
            { label: 'Tarte Tatin', value: 38, valueLabel: '38%' },
            { label: 'Cassoulet', value: 34, valueLabel: '34%' },
            { label: 'Escargots', value: 28, valueLabel: '28%' },
            { label: 'Foie Gras', value: 26, valueLabel: '26%' },
          ]}
        />

        <h2 id="where">10. Where to Actually Eat</h2>
        <BlogTable
          caption="Where to find each signature dish"
          headers={['What you want', 'Go to', 'Price']}
          rows={[
            ['Best croissant in Paris', 'Du Pain et des Idées or Cédric Grolet', '€2-4'],
            ['Best steak frites', 'Le Relais de l\'Entrecôte (Paris, 3 locations)', '€28 fixed'],
            ['Best bouillabaisse', 'Chez Fonfon (Marseille)', '€65'],
            ['Best cassoulet', 'La Maison du Cassoulet (Castelnaudary)', '€22'],
            ['Best crêpes', 'Crêperie Josselin (Quimper)', '€8-14'],
            ['Michelin 3-star', 'Guy Savoy (Paris), Mirazur (Menton)', '€300-500'],
            ['Budget bouillon', 'Bouillon Pigalle, Bouillon Chartier', '€18 for 3-course'],
          ]}
        />

        <h2 id="wine">11. French Wine — Briefly</h2>
        <ul>
          <li><strong>Bordeaux</strong> — reds: Cabernet Sauvignon, Merlot blends</li>
          <li><strong>Burgundy</strong> — reds: Pinot Noir; whites: Chardonnay. World's most expensive small-region wines</li>
          <li><strong>Champagne</strong> — méthode champenoise sparkling; only from Reims/Épernay region</li>
          <li><strong>Rhône Valley</strong> — Côtes du Rhône, Châteauneuf-du-Pape</li>
          <li><strong>Loire</strong> — Sancerre, Pouilly-Fumé (Sauvignon Blanc), Chinon reds</li>
          <li><strong>Alsace</strong> — Riesling, Gewürztraminer, Pinot Gris</li>
        </ul>

        <h2 id="etiquette">12. 6 Dining Rules</h2>
        <ol>
          <li><strong>Say "Bonjour" entering any shop/restaurant.</strong> Non-negotiable.</li>
          <li><strong>Dinner is 7:30-9:30 PM.</strong> Arriving at 6 PM gets you a very empty restaurant</li>
          <li><strong>Wine with dinner is expected.</strong> House wine is great; €4-6/glass</li>
          <li><strong>Bread goes ON the table, not a plate.</strong> Torn, not cut</li>
          <li><strong>Tip 5-10% MAX.</strong> Service is included; €2-5 is generous</li>
          <li><strong>Don\'t rush.</strong> Meals are meant to take 2+ hours</li>
        </ol>

        <h2 id="faq">13. FAQ</h2>
        <h3>Best single dish to try?</h3>
        <p><strong>Steak frites at Le Relais de l'Entrecôte</strong> OR <strong>croissant at Du Pain et des Idées</strong>.</p>
        <h3>Vegetarian-friendly?</h3>
        <p>Moderate. Paris + Lyon have excellent options. Rural France relies on cheese + bread + salad + vegetable sides.</p>
        <h3>Daily food budget?</h3>
        <p>Backpacker: <strong>€20/day</strong> (boulangerie + picnic). Mid: <strong>€40/day</strong>. Comfort: <strong>€95+/day</strong> (with wine).</p>

        <h2 id="keep">Keep Reading</h2>
        <ul>
          <li><Link to="/blog/france-travel-guide-2026">Ultimate France Guide →</Link></li>
          <li><Link to="/blog/two-week-france-itinerary-2026">2-Week Itinerary →</Link></li>
          <li><Link to="/blog/best-france-regions-2026">10 Best French Regions →</Link></li>
          <li><Link to="/blog/french-riviera-guide-2026">French Riviera Guide →</Link></li>
        </ul>

        <BlogEndCTA
          title="Stamp every region you eat in."
          subtitle="Build your French food memory map — free, forever."
        />
      </article>
    </BlogShell>
  );
}
