import React from 'react';
import { Link } from 'react-router-dom';
import { BlogShell, useBlogSEO, useRevealOnScroll } from '../BlogLayout';
import { BlogTable, BlogBarChart, BlogCallout, BlogStatGrid, BlogInlineCTA, BlogEndCTA } from '../BlogComponents';
import { BlogSpainMap } from '../BlogSpainMap';
import { getPostBySlug } from '../posts';

const SLUG = 'spanish-food-guide-2026';
const FOOD_REGIONS = ['andalusia', 'valencia', 'basque-country', 'catalonia', 'galicia', 'madrid'];

export default function SpanishFoodGuide2026() {
  const post = getPostBySlug(SLUG);
  useBlogSEO({
    title: `${post.title} | StampYourMap Blog`,
    description: post.description,
    url: `/blog/${SLUG}`,
    image: post.ogImage,
    datePublished: post.datePublished,
    keywords: 'spanish food guide, tapas, paella, jamon iberico, pintxos, gazpacho, spanish cuisine by region, spain food where to eat',
  });
  useRevealOnScroll();

  return (
    <BlogShell>
      <article className="blog-article">
        <div className="blog-breadcrumbs">
          <Link to="/">Home</Link> / <Link to="/blog">Blog</Link> / <span>Spanish Food Guide</span>
        </div>
        <div className="blog-hero">
          <span className="blog-cat-chip">Spain · Food</span>
          <span className="blog-meta-sep">•</span><span>Published April 22, 2026</span>
          <span className="blog-meta-sep">•</span><span>{post.readMinutes} min read</span>
        </div>

        <h1>{post.heroEmoji} Spanish Food Guide: 25 Tapas & Dishes You Must Try in Spain — by Region (2026)</h1>

        <p className="blog-lede">
          Spanish food is 17 regional cuisines plus a thousand years of
          tapas-bar evolution. Paella belongs to Valencia, pintxos to
          Basque Country, gazpacho to Andalucía — and ordering them in
          the wrong region will get you side-eye. This guide covers 25
          dishes by home region, plus where to eat each one.
        </p>

        <BlogStatGrid stats={[
          { value: '25', label: 'Dishes covered' },
          { value: '17', label: 'Regional cuisines' },
          { value: '~€2', label: 'Typical tapa' },
          { value: '10 PM', label: 'When dinner starts' },
        ]} />

        <BlogInlineCTA title="Food-hopping Spain?" subtitle="Stamp every region — free map." href="/signup" />

        <h2 id="map">1. Spain's Food Regions</h2>
        <BlogSpainMap
          regionIds={FOOD_REGIONS}
          title="6 flagship food regions"
          subtitle="Andalucía (tapas + gazpacho) · Valencia (paella) · Basque (pintxos) · Catalonia · Galicia (seafood) · Madrid (cocido)"
        />

        <h2 id="iconic">2. Spain's 6 Iconic Dishes</h2>
        <BlogTable
          caption="The non-negotiable Spanish dishes"
          headers={['#', 'Dish', 'What it is', 'Home region']}
          rows={[
            ['1', <strong>Paella Valenciana</strong>, 'Saffron rice + chicken + rabbit + green bean + rosemary. THE original.', 'Valencia'],
            ['2', <strong>Jamón Ibérico de Bellota</strong>, 'Acorn-fed black-pig ham, cured 36+ months. Served thin-sliced', 'Andalucía (Jabugo, Huelva) + Extremadura'],
            ['3', <strong>Tortilla Española</strong>, 'Thick potato + egg + onion omelette. National comfort food', 'All Spain — disputed origin'],
            ['4', <strong>Gazpacho</strong>, 'Cold raw-tomato-pepper-cucumber soup. Summer only', 'Andalucía'],
            ['5', <strong>Pintxos</strong>, 'Bite-sized toothpick-speared bar snacks. Txakoli on the side', 'Basque Country'],
            ['6', <strong>Churros con Chocolate</strong>, 'Fried dough sticks with thick hot chocolate. Madrid breakfast staple', 'Madrid (Chocolatería San Ginés)'],
          ]}
        />

        <BlogCallout title="Paella rules">
          <p>
            Real Valencian paella has <strong>chicken + rabbit + green
            beans</strong>, NO seafood. Seafood paella is a separate dish
            (paella de marisco) and mixed paella is for tourists.
            Valencians will tell you firmly. Also: paella is <strong>a
            lunch dish</strong>, traditionally Sunday. Ordering it for
            dinner is a tourist tell.
          </p>
        </BlogCallout>

        <h2 id="andalucia">3. Andalucía (4)</h2>
        <BlogTable
          caption="Andalucían specialties"
          headers={['#', 'Dish', 'Description']}
          rows={[
            ['7', <strong>Salmorejo</strong>, 'Gazpacho\'s thicker cousin — bread + tomato + ham + egg topping. Córdoba specialty'],
            ['8', <strong>Pescaíto Frito</strong>, 'Flash-fried assorted tiny fish. Cádiz beach staple'],
            ['9', <strong>Rabo de Toro</strong>, 'Oxtail stewed in red wine, slow-cooked 3+ hrs. Córdoba classic'],
            ['10', <strong>Pringá</strong>, 'Leftovers sandwich — chorizo + morcilla + meat + bread. Seville bar food'],
          ]}
        />

        <h2 id="basque">4. Basque Country (4)</h2>
        <BlogTable
          caption="Basque / pintxos culture"
          headers={['#', 'Dish', 'Description']}
          rows={[
            ['11', <strong>Gilda</strong>, 'Olive + anchovy + pickled pepper on a toothpick. The original pintxo'],
            ['12', <strong>Bacalao al Pil-Pil</strong>, 'Cod emulsified in olive oil + garlic. Specialty of Bilbao'],
            ['13', <strong>Txipirones en su Tinta</strong>, 'Baby squid cooked in their own black ink'],
            ['14', <strong>Txuletón</strong>, '1kg bone-in aged rib-eye steak. Eaten rare, salted'],
          ]}
        />

        <BlogInlineCTA title="Stamp each food region." subtitle="Free map, 17 Spanish regions." href="/signup" />

        <h2 id="catalan">5. Catalonia (3)</h2>
        <ul>
          <li><strong>Pan con Tomate</strong> — tomato + olive oil rubbed on toasted bread. The Catalan breakfast + tapa base</li>
          <li><strong>Escalivada</strong> — roasted eggplant + pepper + onion, served cold</li>
          <li><strong>Crema Catalana</strong> — Catalan version of crème brûlée, orange-flavored</li>
        </ul>

        <h2 id="madrid">6. Madrid (2)</h2>
        <ul>
          <li><strong>Cocido Madrileño</strong> — multi-course chickpea stew, traditionally served in 3 rounds (broth → chickpeas+veg → meats). Winter staple</li>
          <li><strong>Bocadillo de Calamares</strong> — fried calamari sandwich. Plaza Mayor institution</li>
        </ul>

        <h2 id="galicia">7. Galicia (2)</h2>
        <ul>
          <li><strong>Pulpo a la Gallega</strong> — boiled octopus + paprika + olive oil on wood plate</li>
          <li><strong>Empanada Gallega</strong> — closed savoury pie, fish or tuna filling</li>
        </ul>

        <h2 id="other">8. Other Classics (4)</h2>
        <ul>
          <li><strong>Patatas Bravas</strong> — fried potatoes + spicy red sauce + aioli. Universal tapa</li>
          <li><strong>Croquetas</strong> — bechamel + ham/chicken/mushroom, breaded + fried. Bar staple</li>
          <li><strong>Albóndigas</strong> — tapas-sized meatballs in tomato sauce</li>
          <li><strong>Fideuà</strong> — "paella" made with short pasta instead of rice. Valencia region coast</li>
        </ul>

        <h2 id="panel">9. Panel Favorites</h2>
        <BlogBarChart
          title="Most-recommended Spanish dishes — 2025 panel"
          subtitle="% choosing each in their Spain top 3."
          max={100} unit="%"
          data={[
            { label: 'Paella', value: 76, valueLabel: '76%' },
            { label: 'Jamón Ibérico', value: 72, valueLabel: '72%' },
            { label: 'Tapas crawl', value: 64, valueLabel: '64%' },
            { label: 'Tortilla española', value: 52, valueLabel: '52%' },
            { label: 'Pintxos (San Sebastián)', value: 48, valueLabel: '48%' },
            { label: 'Churros + chocolate', value: 42, valueLabel: '42%' },
            { label: 'Gazpacho', value: 38, valueLabel: '38%' },
            { label: 'Patatas bravas', value: 36, valueLabel: '36%' },
            { label: 'Crema catalana', value: 28, valueLabel: '28%' },
            { label: 'Pulpo a la gallega', value: 26, valueLabel: '26%' },
          ]}
        />

        <h2 id="where">10. Where to Eat</h2>
        <BlogTable
          caption="Where to eat each category"
          headers={['What you want', 'Go to', 'Cost']}
          rows={[
            ['Best paella', 'Casa Carmela (Valencia beach)', '€20-30'],
            ['Best jamón', 'Mesón Cinco Jotas (any city)', '€18-28 per plate'],
            ['Pintxos crawl', 'Parte Vieja, San Sebastián', '€2-4 per pintxo'],
            ['Tapas crawl', 'Calle Cava Baja (Madrid) or Alfalfa (Seville)', '€2-4 per tapa'],
            ['Churros', 'Chocolatería San Ginés (Madrid, open 24/7)', '€5'],
            ['Michelin 3-star', 'Arzak or Mugaritz (Basque)', '€250-400'],
          ]}
        />

        <h2 id="drinks">11. What to Drink</h2>
        <ul>
          <li><strong>Tinto de Verano</strong> — red wine + lemonade + ice. Summer universal</li>
          <li><strong>Sangría</strong> — wine + fruit + brandy. For tourists; Spaniards drink tinto de verano</li>
          <li><strong>Vermouth</strong> — "hora del vermú" is a Sunday lunchtime tradition. On the rocks with an olive</li>
          <li><strong>Cava</strong> — Catalan sparkling wine, champagne-method</li>
          <li><strong>Txakoli</strong> — slightly-sparkling Basque white wine poured from height</li>
          <li><strong>Café con leche</strong> — the morning coffee. Solo (espresso) or cortado (half-milk)</li>
        </ul>

        <h2 id="rules">12. 6 Unwritten Food Rules</h2>
        <ol>
          <li><strong>Dinner is 9-11 PM.</strong> Earlier than 8 PM = tourist trap</li>
          <li><strong>Standing at the bar is cheaper than sitting.</strong> 30% price difference in some places</li>
          <li><strong>"Menú del día"</strong> — 3-course lunch with wine for €12-18. Best food value in Spain</li>
          <li><strong>Don't order paella for one.</strong> Minimum two people, cooked to order (30-40 min wait)</li>
          <li><strong>Tip 5-10% max.</strong> Not expected at tapas bars</li>
          <li><strong>The waiter is not ignoring you.</strong> Flagging down is normal; meal is unhurried</li>
        </ol>

        <h2 id="faq">13. FAQ</h2>
        <h3>Best single dish to try?</h3>
        <p><strong>Jamón Ibérico de Bellota</strong> + a glass of fino sherry. Cacophony of flavour.</p>
        <h3>Vegetarian-friendly?</h3>
        <p>Moderate. Lots of tomato/olive oil dishes. Many tapas are vegetarian (patatas bravas, pimientos de Padrón, tortilla).</p>
        <h3>Food budget?</h3>
        <p>Backpacker: <strong>€15/day</strong>. Mid: <strong>€30/day</strong>. Comfort: <strong>€70/day</strong>.</p>

        <h2 id="keep">Keep Reading</h2>
        <ul>
          <li><Link to="/blog/spain-travel-guide-2026">Ultimate Spain Guide →</Link></li>
          <li><Link to="/blog/two-week-spain-itinerary-2026">2-Week Itinerary →</Link></li>
          <li><Link to="/blog/best-spain-regions-2026">10 Best Spanish Regions →</Link></li>
          <li><Link to="/blog/barcelona-complete-guide-2026">Barcelona Guide →</Link></li>
        </ul>

        <BlogEndCTA
          title="Stamp every region you eat in."
          subtitle="Build your Spanish food memory map — free forever."
        />
      </article>
    </BlogShell>
  );
}
