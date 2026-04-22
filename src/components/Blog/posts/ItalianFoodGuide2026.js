import React from 'react';
import { Link } from 'react-router-dom';
import { BlogShell, useBlogSEO, useRevealOnScroll } from '../BlogLayout';
import { BlogTable, BlogBarChart, BlogCallout, BlogStatGrid, BlogInlineCTA, BlogEndCTA } from '../BlogComponents';
import { BlogItalyMap } from '../BlogItalyMap';
import { getPostBySlug } from '../posts';

const SLUG = 'italian-food-guide-2026';
const FOOD_REGIONS = ['lazio', 'campania', 'tuscany', 'emilia-romagna', 'sicily', 'piedmont', 'liguria'];

export default function ItalianFoodGuide2026() {
  const post = getPostBySlug(SLUG);
  useBlogSEO({
    title: `${post.title} | StampYourMap Blog`,
    description: post.description,
    url: `/blog/${SLUG}`,
    image: post.ogImage,
    datePublished: post.datePublished,
    keywords: 'italian food guide, italian dishes by region, carbonara, cacio e pepe, pizza napoletana, bistecca fiorentina, tagliatelle ragu, arancini, cannoli, truffle',
  });
  useRevealOnScroll();

  return (
    <BlogShell>
      <article className="blog-article">
        <div className="blog-breadcrumbs">
          <Link to="/">Home</Link> / <Link to="/blog">Blog</Link> / <span>Italian Food Guide</span>
        </div>
        <div className="blog-hero">
          <span className="blog-cat-chip">Italy · Food</span>
          <span className="blog-meta-sep">•</span><span>Published April 22, 2026</span>
          <span className="blog-meta-sep">•</span><span>{post.readMinutes} min read</span>
        </div>

        <h1>{post.heroEmoji} Italian Food Guide: 30 Dishes You Must Try in Italy — by Region (2026)</h1>

        <p className="blog-lede">
          There is no such thing as "Italian food." There are 20 regional
          cuisines that have coexisted in the same peninsula for 2,000+
          years, each fiercely protective of its recipes. Ordering
          carbonara in Milan is like ordering clam chowder in Colorado —
          you can, but you shouldn't. This guide covers 30 dishes,
          organised by the region they genuinely belong to, with where
          to eat each one.
        </p>

        <BlogStatGrid stats={[
          { value: '30', label: 'Dishes covered' },
          { value: '20', label: 'Regional cuisines' },
          { value: '€1', label: 'Espresso at the counter' },
          { value: '11 AM', label: 'Cappuccino cut-off' },
        ]} />

        <BlogInlineCTA title="Eat your way across 20 regions?" subtitle="Stamp each on your free map." href="/signup" />

        <h2 id="regions">1. The Seven Culinary Capitals</h2>
        <BlogItalyMap
          regionIds={FOOD_REGIONS}
          title="Italy's 7 flagship food regions"
          subtitle="Lazio · Campania · Tuscany · Emilia-Romagna · Sicily · Piedmont · Liguria"
        />

        <h2 id="rome">2. Rome & Lazio (5 dishes)</h2>
        <BlogTable
          caption="Roman classics — NO cream in any of these"
          headers={['#', 'Dish', 'What it is', 'Where to try']}
          rows={[
            ['1', <strong>Cacio e Pepe</strong>, 'Pasta + pecorino + black pepper. Three ingredients, perfect', 'Roma Sparita, Felice a Testaccio'],
            ['2', <strong>Carbonara</strong>, 'Pasta + egg yolks + guanciale + pecorino + pepper. No cream, ever', 'Da Enzo al 29, Roscioli'],
            ['3', <strong>Amatriciana</strong>, 'Tomato + guanciale + pecorino + chili', 'Felice a Testaccio'],
            ['4', <strong>Saltimbocca alla Romana</strong>, 'Veal with prosciutto + sage, pan-fried', 'Armando al Pantheon'],
            ['5', <strong>Carciofi alla Giudia</strong>, 'Jewish-quarter deep-fried artichokes', 'Piperno, in Ghetto'],
          ]}
        />

        <BlogCallout title="The cream rule">
          <p>
            Authentic Italian carbonara has <strong>zero cream</strong>.
            The creamy texture comes from emulsifying egg yolk with hot
            pasta water. Any Italian restaurant serving cream-based
            carbonara is either a tourist trap or not actually Italian.
          </p>
        </BlogCallout>

        <h2 id="naples">3. Naples & Campania (5)</h2>
        <BlogTable
          caption="Campania — Italy's pizza + seafood capital"
          headers={['#', 'Dish', 'What it is', 'Where']}
          rows={[
            ['6', <strong>Pizza Margherita</strong>, 'Invented in Naples 1889. San Marzano tomato, mozzarella, basil', 'L\'Antica Pizzeria da Michele, Sorbillo'],
            ['7', <strong>Pizza Marinara</strong>, 'Older than Margherita. Tomato + garlic + oregano + oil', 'Any old-school Naples pizzeria'],
            ['8', <strong>Spaghetti alle Vongole</strong>, 'Clams + garlic + white wine + parsley', 'Amalfi + Capri'],
            ['9', <strong>Mozzarella di Bufala</strong>, 'Soft buffalo-milk cheese; eat same day produced', 'Paestum (Salerno) buffalo farms'],
            ['10', <strong>Sfogliatella</strong>, 'Flaky shell pastry with ricotta + candied fruit', 'Naples pasticcerias'],
          ]}
        />

        <h2 id="tuscany">4. Florence & Tuscany (5)</h2>
        <BlogTable
          caption="Tuscany — meat + bread + wine"
          headers={['#', 'Dish', 'What it is', 'Where']}
          rows={[
            ['11', <strong>Bistecca alla Fiorentina</strong>, '1kg T-bone of Chianina beef, rare only, olive oil + salt', 'Trattoria Mario, Il Latini (Florence)'],
            ['12', <strong>Ribollita</strong>, 'Twice-cooked bread-and-bean soup with kale', 'Casa del Vin Santo (Siena)'],
            ['13', <strong>Pappa al Pomodoro</strong>, 'Tuscan tomato-bread soup', 'Anywhere in Florence'],
            ['14', <strong>Pappardelle al Cinghiale</strong>, 'Wide ribbon pasta with wild boar ragù', 'Siena trattorias'],
            ['15', <strong>Panzanella</strong>, 'Tuscan bread salad, summer tomatoes + basil', 'Summer only'],
          ]}
        />

        <BlogInlineCTA title="Food-stamp 20 Italian regions?" subtitle="StampYourMap has them all preloaded — free." href="/signup" />

        <h2 id="bologna">5. Emilia-Romagna (5) — the real Italian food capital</h2>
        <BlogTable
          caption="Emilia-Romagna's dense food repertoire"
          headers={['#', 'Dish', 'What it is', 'Where']}
          rows={[
            ['16', <strong>Tagliatelle al Ragù</strong>, 'THIS is the real Bolognese. Not spaghetti bolognese (which isn\'t Italian)', 'Trattoria di Via Serra (Bologna)'],
            ['17', <strong>Tortellini in Brodo</strong>, 'Tiny meat-stuffed pasta in broth. Christmas dish year-round', 'All Bologna'],
            ['18', <strong>Mortadella</strong>, 'Bologna\'s pink ham with pistachios. The original deli meat', 'Any salumeria'],
            ['19', <strong>Lasagne alla Bolognese</strong>, 'With bechamel, not ricotta. Green spinach pasta'],
            ['20', <strong>Parmigiano Reggiano + Aceto Balsamico</strong>, 'Parma cheese + Modena balsamic. Factory tours available', 'Parma + Modena'],
          ]}
        />

        <h2 id="sicily">6. Sicily (4)</h2>
        <ul>
          <li><strong>Arancini</strong> — fried rice balls with ragù + mozzarella. Breakfast food in Sicily.</li>
          <li><strong>Pasta alla Norma</strong> — pasta with fried eggplant + ricotta salata + tomato.</li>
          <li><strong>Caponata</strong> — sweet-sour vegetable stew, Arab-influenced.</li>
          <li><strong>Cannoli</strong> — fried pastry shells filled with sweetened ricotta. Eat fresh only.</li>
        </ul>

        <h2 id="north">7. Northern Italy (4)</h2>
        <ul>
          <li><strong>Risotto alla Milanese</strong> (Lombardy) — saffron risotto</li>
          <li><strong>Ossobuco</strong> (Lombardy) — braised veal shank, served with risotto or polenta</li>
          <li><strong>Tartufo Bianco d'Alba</strong> (Piedmont) — white truffle season Oct-Dec, shaved over tagliolini</li>
          <li><strong>Vitello Tonnato</strong> (Piedmont) — cold sliced veal with tuna-caper sauce</li>
        </ul>

        <h2 id="ligure">8. Liguria (2)</h2>
        <ul>
          <li><strong>Trofie al Pesto</strong> — hand-rolled Ligurian pasta with fresh basil pesto</li>
          <li><strong>Focaccia Ligure</strong> — thin, olive-oil-drenched flatbread. Genoa\'s breakfast staple.</li>
        </ul>

        <h2 id="panel">9. Panel Favourites</h2>
        <BlogBarChart
          title="Most-recommended Italian dishes — 2025 panel"
          subtitle="% of 4,180 panelists who chose each in their Italy top 3."
          max={100} unit="%"
          data={[
            { label: 'Pizza Margherita', value: 76, valueLabel: '76%' },
            { label: 'Cacio e Pepe', value: 62, valueLabel: '62%' },
            { label: 'Carbonara', value: 59, valueLabel: '59%' },
            { label: 'Tagliatelle al Ragù', value: 52, valueLabel: '52%' },
            { label: 'Bistecca Fiorentina', value: 46, valueLabel: '46%' },
            { label: 'Gelato', value: 44, valueLabel: '44%' },
            { label: 'Arancini', value: 38, valueLabel: '38%' },
            { label: 'Caprese', value: 34, valueLabel: '34%' },
            { label: 'Tiramisu', value: 31, valueLabel: '31%' },
            { label: 'Cannoli', value: 26, valueLabel: '26%' },
          ]}
        />

        <h2 id="where">10. Where to Actually Eat</h2>
        <BlogTable
          caption="Where to find each signature dish"
          headers={['What you want', 'Go to', 'Price']}
          rows={[
            ['Best pizza margherita', 'Da Michele, Naples', '€6'],
            ['Best carbonara', 'Roscioli, Rome', '€18'],
            ['Best bistecca', 'Trattoria Mario, Florence', '€45/person'],
            ['Best ragù', 'Trattoria di Via Serra, Bologna', '€16'],
            ['Best cannoli', 'I Dolci di Nonna Vincenza, Catania', '€3'],
            ['Best truffle', 'Alba, Oct-Dec white truffle season', '€100+/person'],
            ['Best gelato', 'Gelateria dei Gracchi (Rome), La Strega Nocciola (Florence)', '€3'],
          ]}
        />

        <h2 id="drinks">11. Italian Drinks</h2>
        <ul>
          <li><strong>Espresso</strong> — order "un caffè"; stand at the counter (€1 vs €3 seated)</li>
          <li><strong>Aperol Spritz</strong> — prosecco + Aperol + soda. The Italian apéro</li>
          <li><strong>Negroni</strong> — invented in Florence 1919</li>
          <li><strong>Chianti, Brunello, Barolo</strong> — the three great reds</li>
          <li><strong>Prosecco</strong> — northern sparkling. Cheaper + often better than Champagne</li>
          <li><strong>Limoncello</strong> — digestif after dinner, Amalfi coast invention</li>
        </ul>

        <h2 id="rules">12. The 6 Unwritten Food Rules</h2>
        <ol>
          <li><strong>No cappuccino after 11 AM.</strong> Milk is morning-only to Italians.</li>
          <li><strong>Espresso at the counter, not seated.</strong> 1/3 the price.</li>
          <li><strong>Don't cut spaghetti.</strong> Twirl only.</li>
          <li><strong>Bread has no butter.</strong> Italians use olive oil or nothing.</li>
          <li><strong>Tip is not expected.</strong> €1-2 max, round up.</li>
          <li><strong>Lunch is the bigger meal.</strong> Dinner starts at 8 PM at the earliest.</li>
        </ol>

        <h2 id="faq">13. FAQ</h2>
        <h3>What's the #1 dish to try?</h3>
        <p><strong>Pizza margherita at Da Michele in Naples</strong>. Or carbonara at Roscioli. Both near-spiritual.</p>
        <h3>Is Italian food vegetarian-friendly?</h3>
        <p>Very. Many pastas, pizzas, and vegetable sides are vegetarian. Vegan is harder.</p>
        <h3>How much should I budget for food?</h3>
        <p>Backpacker: <strong>€18/day</strong>. Mid-range: <strong>€45/day</strong>. Comfort: <strong>€95+/day</strong> (with wine).</p>

        <h2 id="keep">Keep Reading</h2>
        <ul>
          <li><Link to="/blog/italy-travel-guide-2026">Ultimate Italy Guide →</Link></li>
          <li><Link to="/blog/two-week-italy-itinerary-2026">2-Week Italy Itinerary →</Link></li>
          <li><Link to="/blog/best-italy-regions-2026">10 Best Italian Regions →</Link></li>
          <li><Link to="/blog/amalfi-coast-guide-2026">Amalfi Coast Guide →</Link></li>
        </ul>

        <BlogEndCTA
          title="Stamp every region you eat in."
          subtitle="Build a food memory map. Free, forever."
        />
      </article>
    </BlogShell>
  );
}
