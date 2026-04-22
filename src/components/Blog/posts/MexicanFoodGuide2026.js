import React from 'react';
import { Link } from 'react-router-dom';
import { BlogShell, useBlogSEO, useRevealOnScroll } from '../BlogLayout';
import { BlogTable, BlogBarChart, BlogCallout, BlogStatGrid, BlogInlineCTA, BlogEndCTA } from '../BlogComponents';
import { BlogMexicoMap } from '../BlogMexicoMap';
import { getPostBySlug } from '../posts';

const SLUG = 'mexican-food-guide-2026';
const FOOD_STATES = ['cmx', 'oax', 'yuc', 'pue', 'jal', 'mic'];

export default function MexicanFoodGuide2026() {
  const post = getPostBySlug(SLUG);
  useBlogSEO({
    title: `${post.title} | StampYourMap Blog`,
    description: post.description,
    url: `/blog/${SLUG}`,
    image: post.ogImage,
    datePublished: post.datePublished,
    keywords: 'mexican food guide, real mexican food, tacos al pastor, mole, cochinita pibil, chiles en nogada, mexican cuisine by region, mexico food tour',
  });
  useRevealOnScroll();

  return (
    <BlogShell>
      <article className="blog-article">
        <div className="blog-breadcrumbs">
          <Link to="/">Home</Link> / <Link to="/blog">Blog</Link> / <span>Mexican Food Guide</span>
        </div>
        <div className="blog-hero">
          <span className="blog-cat-chip">Mexico · Food</span>
          <span className="blog-meta-sep">•</span><span>Published April 22, 2026</span>
          <span className="blog-meta-sep">•</span><span>{post.readMinutes} min read</span>
        </div>

        <h1>{post.heroEmoji} Mexican Food Guide: 25 Dishes You Must Try in Mexico — by Region (2026)</h1>

        <p className="blog-lede">
          Mexican cuisine is a <strong>UNESCO Intangible Cultural Heritage</strong>
          {' '}(since 2010) and — this is non-negotiable — it's nothing like
          Tex-Mex. Real Mexican food is 32 regional cuisines built on
          pre-Hispanic foundations: corn, chili, beans, tomato, squash.
          Here's a pragmatic guide to the 25 dishes that define modern
          Mexican cuisine, organised by home region.
        </p>

        <BlogStatGrid stats={[
          { value: '25', label: 'Dishes covered' },
          { value: '32', label: 'Regional cuisines' },
          { value: '~$2', label: 'Typical taco' },
          { value: '2010', label: 'UNESCO inscription year' },
        ]} />

        <BlogInlineCTA title="Food-touring Mexico?" subtitle="Stamp every state you eat in — free map." href="/signup" />

        <h2 id="map">1. Mexico's 6 Flagship Food Regions</h2>
        <BlogMexicoMap
          regionIds={FOOD_STATES}
          title="Mexico's 6 essential food states"
          subtitle="Mexico City · Oaxaca · Yucatán · Puebla · Jalisco · Michoacán"
        />

        <h2 id="tacos">2. Tacos & Antojitos (6)</h2>
        <BlogTable
          caption="The street-food canon"
          headers={['#', 'Dish', 'What it is', 'Where']}
          rows={[
            ['1', <strong>Tacos al Pastor</strong>, 'Marinated pork on a trompo + pineapple, corn tortilla. CDMX invention', 'El Vilsito or Los Cocuyos (CDMX)'],
            ['2', <strong>Tacos de Carnitas</strong>, 'Slow-braised pork in copper kettles', 'Michoacán (Quiroga, Morelia)'],
            ['3', <strong>Tacos de Barbacoa</strong>, 'Lamb slow-cooked in underground oven, weekends only', 'CDMX + Hidalgo'],
            ['4', <strong>Tlayudas</strong>, 'Giant crispy tortilla with beans + asiento + tasajo + quesillo', 'Oaxaca'],
            ['5', <strong>Tacos de Suadero</strong>, 'Beef brisket cut boiled-fried on a comal', 'CDMX taquerías'],
            ['6', <strong>Quesadillas</strong>, 'Corn tortilla folded with cheese (or NOT in CDMX — ask!)', 'Mercados all over'],
          ]}
        />

        <BlogCallout title="Quesadilla trap">
          <p>
            Ordering a quesadilla in Mexico City will trigger a waiter
            question: <strong>"con o sin queso?"</strong> (with or without
            cheese?). The CDMX tradition is that a quesadilla is NOT
            automatic-with-cheese — "quesadilla" historically means
            filled with squash blossom, huitlacoche, chorizo, or whatever.
            Say "con queso" to get cheese.
          </p>
        </BlogCallout>

        <h2 id="mole">3. Mole & Sauces (4)</h2>
        <BlogTable
          caption="Mexico's legendary sauces"
          headers={['#', 'Dish', 'Home', 'Notes']}
          rows={[
            ['7', <strong>Mole Negro</strong>, 'Oaxaca', '30+ ingredients including chocolate + chilies + spices. Takes 2 days to make'],
            ['8', <strong>Mole Poblano</strong>, 'Puebla', 'Red-brown mole with chocolate + almonds. Arguably the more famous'],
            ['9', <strong>Mole Verde</strong>, 'Oaxaca', 'Pumpkin-seed + tomatillo green mole'],
            ['10', <strong>Mole Amarillo</strong>, 'Oaxaca', 'Guajillo + ancho yellow mole — lighter'],
          ]}
        />

        <h2 id="yucatan-food">4. Yucatán Peninsula (4)</h2>
        <BlogTable
          caption="Yucatecan specialties"
          headers={['#', 'Dish', 'Description']}
          rows={[
            ['11', <strong>Cochinita Pibil</strong>, 'Pork marinated in achiote + sour orange, wrapped in banana leaves, pit-cooked'],
            ['12', <strong>Sopa de Lima</strong>, 'Chicken broth with lime + tortilla strips'],
            ['13', <strong>Poc Chuc</strong>, 'Thin-sliced grilled pork with onion + sour orange'],
            ['14', <strong>Papadzules</strong>, 'Boiled egg tortillas in pumpkin-seed sauce'],
          ]}
        />

        <BlogInlineCTA title="Eating across 32 states?" subtitle="Stamp each one on StampYourMap — free forever." href="/signup" />

        <h2 id="seafood">5. Seafood + Pacific (3)</h2>
        <ul>
          <li><strong>Ceviche</strong> — raw fish "cooked" in lime with red onion, cilantro, cucumber. Eat at beach chiringuitos</li>
          <li><strong>Aguachile</strong> — shrimp in chile-lime-cilantro marinade; Sinaloan specialty</li>
          <li><strong>Pescado Zarandeado</strong> — grilled whole butterflied fish with chile; Nayarit + Sinaloa</li>
        </ul>

        <h2 id="soups">6. Soups & Stews (3)</h2>
        <ul>
          <li><strong>Pozole</strong> — hominy soup with pork/chicken, garnished with radish, lettuce, lime. Red (Jalisco), white (Guerrero), green (Guerrero)</li>
          <li><strong>Birria</strong> — goat or beef braised in adobo; now famous in US as "birria tacos"</li>
          <li><strong>Menudo</strong> — tripe + hominy soup, traditional Sunday breakfast hangover cure</li>
        </ul>

        <h2 id="special">7. Festival & Seasonal (2)</h2>
        <ul>
          <li><strong>Chiles en Nogada</strong> — poblano stuffed with meat + fruit, walnut cream sauce, pomegranate. Mexico's patriotic tricolour dish (Aug-Sep only)</li>
          <li><strong>Pan de Muerto</strong> — bread of the dead for Day of the Dead (late October only)</li>
        </ul>

        <h2 id="drinks">8. Drinks (3)</h2>
        <ul>
          <li><strong>Mezcal</strong> — smoky agave spirit from Oaxaca. Sip straight with orange slice + sal de gusano</li>
          <li><strong>Tequila</strong> — blue-agave spirit from Jalisco. Blanco is purer than reposado/añejo</li>
          <li><strong>Aguas Frescas</strong> — fruit waters: horchata (rice+cinnamon), jamaica (hibiscus), tamarindo</li>
        </ul>

        <h2 id="panel">9. Panel Favorites</h2>
        <BlogBarChart
          title="Most-recommended Mexican dishes — 2025 panel"
          subtitle="% choosing each in their Mexico top 3."
          max={100} unit="%"
          data={[
            { label: 'Tacos al Pastor', value: 82, valueLabel: '82%' },
            { label: 'Mole (Oaxaca)', value: 64, valueLabel: '64%' },
            { label: 'Cochinita Pibil', value: 56, valueLabel: '56%' },
            { label: 'Chilaquiles', value: 48, valueLabel: '48%' },
            { label: 'Tacos de Carnitas', value: 44, valueLabel: '44%' },
            { label: 'Ceviche', value: 42, valueLabel: '42%' },
            { label: 'Tlayudas', value: 34, valueLabel: '34%' },
            { label: 'Pozole', value: 30, valueLabel: '30%' },
            { label: 'Chiles en Nogada', value: 28, valueLabel: '28%' },
            { label: 'Birria', value: 26, valueLabel: '26%' },
          ]}
        />

        <h2 id="where">10. Where to Actually Eat</h2>
        <BlogTable
          caption="Where to find each signature dish"
          headers={['What you want', 'Go to', 'Cost']}
          rows={[
            ['Best pastor tacos', 'El Vilsito (CDMX, 10 PM onwards)', '$1-2/taco'],
            ['Best mole', 'Casa Oaxaca (Oaxaca)', '$25/plate'],
            ['Best cochinita', 'Chaya Maya (Mérida)', '$10'],
            ['Street tacos CDMX crawl', 'Roma or Coyoacán neighborhoods', '$8-15 for 10 tacos'],
            ['Fine dining', 'Pujol or Quintonil (CDMX)', '$150-250 tasting menu'],
            ['Local market', 'Mercado de San Juan (CDMX), Mercado 20 de Noviembre (Oaxaca)', '$5-12 per plate'],
          ]}
        />

        <h2 id="rules">11. 6 Unwritten Food Rules</h2>
        <ol>
          <li><strong>Limes on everything.</strong> They\'re the seasoning</li>
          <li><strong>Salsa is at your discretion.</strong> Taste first; most are earthquake-level hot</li>
          <li><strong>Tortillas are corn, not flour (mostly).</strong> Flour tortillas are regional (north)</li>
          <li><strong>"No picante" means "mild".</strong> Ask before, not after</li>
          <li><strong>Breakfast is huevos + chilaquiles + café de olla.</strong> Not cereal</li>
          <li><strong>Tip 10-15%.</strong> 15% at sit-down restaurants; 10% at casual</li>
        </ol>

        <h2 id="faq">12. FAQ</h2>
        <h3>Best single Mexican dish?</h3>
        <p><strong>Mole negro in Oaxaca</strong> or <strong>tacos al pastor in CDMX at 11 PM</strong>. Pick one.</p>
        <h3>Is Mexican food safe from street carts?</h3>
        <p>Yes with common sense — choose busy stalls with turnover. Stomach-issue rate is low.</p>
        <h3>Vegetarian-friendly?</h3>
        <p>Moderate. Quesadillas, tacos de hongos, enchiladas verdes are vegetarian. Vegan harder — lard is common in beans.</p>

        <h2 id="keep">Keep Reading</h2>
        <ul>
          <li><Link to="/blog/mexico-travel-guide-2026">Ultimate Mexico Guide →</Link></li>
          <li><Link to="/blog/two-week-mexico-itinerary-2026">2-Week Itinerary →</Link></li>
          <li><Link to="/blog/best-mexico-destinations-2026">10 Best Destinations →</Link></li>
          <li><Link to="/blog/yucatan-cenotes-mayan-ruins-guide-2026">Yucatán Guide →</Link></li>
        </ul>

        <BlogEndCTA
          title="Stamp every state you eat in."
          subtitle="Build your Mexican food memory map — free forever."
        />
      </article>
    </BlogShell>
  );
}
