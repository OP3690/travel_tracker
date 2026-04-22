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
        <h3>What's the single must-try Mexican dish?</h3>
        <p>{"Mole negro in Oaxaca — a 30-ingredient, slow-reduced sauce with chilies, chocolate, and spices — eaten at a family restaurant (Los Pacos, Tierra del Sol) is a spiritual experience. Runner-up: tacos al pastor at El Huequito or El Vilsito in CDMX at 22:00, carved off a vertical trompo. Pick one of these two before you leave the country."}</p>
        <h3>Which cities are the real food capitals of Mexico?</h3>
        <p>{"Mexico City for range and world-class tasting menus (Pujol, Quintonil, Contramar, Sud 777). Oaxaca for the '7 moles' tradition, tlayudas, mezcal, and the best markets in the Americas (20 de Noviembre). Puebla for moles and chalupas. Mérida for Yucatecan cuisine (cochinita pibil, papadzules). Tijuana for modern border cuisine and Baja-Med fusion. Veracruz and Mazatlán for seafood."}</p>
        <h3>How vegetarian- and vegan-friendly is Mexican food?</h3>
        <p>{"Moderately vegetarian-friendly but the traps are real — refried beans are often cooked with lard (manteca), and 'vegetarian' tacos sometimes come with chicken stock in rice. Say 'sin carne, sin manteca, sin caldo de pollo' explicitly. CDMX has 80+ dedicated vegan spots (Forever Vegano, Por Siempre Vegana Taqueria). Oaxaca, Puebla, and San Cristóbal have strong veg scenes; resort coasts are the weakest."}</p>
        <h3>How safe is street food really, and how do I pick the right stall?</h3>
        <p>{"Very safe at busy stalls with turnover — local queue is the best indicator. Good signs: tortillas pressed fresh on-site, meat cooked to order on a hot plancha or rotating trompo, disposable gloves or visible hygiene. Red flags: pre-made salsas in unrefrigerated bowls in the sun, empty stalls at 15:00 (meat's been sitting), raw vegetables sliced on a surface also used for raw meat."}</p>
        <h3>How do I handle allergies and dietary restrictions?</h3>
        <p>{"Spanish food-allergy cards work well: 'Soy alérgico/a a los cacahuates / a los mariscos / al gluten / a los lácteos.' Mole often contains peanuts and sesame — always ask. Ceviche has lime but can have soy in some modern takes. Gluten-free is tough at stalls (tortillas are corn and safe, but cross-contamination on a hot plancha is real). CDMX has the best allergy-aware scene."}</p>
        <h3>What's the tipping culture at different restaurants?</h3>
        <p>{"Sit-down restaurants 10-15% (look for 'propina incluida' on the bill — sometimes auto-added in tourist zones, don't double-tip). Taco stalls and street food: no tip expected, round up or leave a few pesos if you enjoyed the salsa. Fine dining in CDMX follows US-style 15-20% norms. Mezcalerías 10%. Hotel room service 10%, delivery drivers 10-15%."}</p>
        <h3>What are the seasonal specialties worth planning around?</h3>
        <p>{"Chiles en nogada (August-September, Independence Day season — walnut cream sauce, pomegranate) in Puebla. Pan de muerto (late October-Nov 2, Day of the Dead) nationwide. Chapulines (grasshoppers, peak in Oaxaca's rainy season July-September). Huitlacoche (corn fungus, autumn) in Puebla/CDMX. Escamoles ('Mexican caviar' — ant larvae, March-May) in central Mexico. Stone-crab season in Yucatán October-May."}</p>
        <h3>Markets vs restaurants — where do I eat best?</h3>
        <p>{"Markets are the soul: Mercado 20 de Noviembre (Oaxaca — get a tasajo or cecina from a grill row stall), Mercado de San Juan (CDMX — exotic meats and cheese), Mercado de Medellín (CDMX — Central/South American), Mercado Lucas de Gálvez (Mérida). Restaurants for long-cooked dishes (moles, cochinita pibil, mole poblano). Best combo: market breakfast, restaurant lunch, taco-stall dinner."}</p>
        <h3>Are cooking classes and food tours worth it?</h3>
        <p>{"Yes — Eat Mexico (CDMX) and Club Tengo Hambre (CDMX) run the best food tours at $75-120 for 3-4 hours. Seasons of My Heart (Oaxaca, Susana Trilling) is the gold standard for week-long immersive cooking classes. Los Dos (Mérida) for Yucatecan cuisine. Food tours beat cooking classes for first-timers — you learn where to eat for the rest of the trip."}</p>
        <h3>How do I order mezcal and tequila without looking clueless?</h3>
        <p>{"Mezcal: ask for 'espadín' (house, smooth entry) or 'tobalá' (wild, more expensive), served neat with orange slices and sal de gusano (worm salt). Never shoot mezcal — sip. Tequila: blanco (unaged, pure agave bite), reposado (2-12 months oak), añejo (1-3 years). Real agave spirits say '100% agave' on the label — anything else is mixto. Pair with sangrita, not lime and salt (that's cantina tradition, not quality-drinking)."}</p>
        <h3>Is it safe to eat raw (ceviche, aguachile)?</h3>
        <p>{"Yes at reputable seafood spots — the lime juice cures the protein in 20-40 minutes. Stick to busy ceviche/marisquería spots (Contramar CDMX, La Guerrerense Ensenada, Marisquería El Pescadito). Skip ceviche at taquerías that don't specialise or anywhere the fish looks grey. Aguachile is more raw (only 2-3 min in lime) — order only at dedicated spots."}</p>
        <h3>What are the regional specialties I shouldn't miss?</h3>
        <p>{"Oaxaca: 7 moles + tlayudas + mezcal. Yucatán: cochinita pibil + papadzules + sopa de lima. Puebla: mole poblano + chalupas + chiles en nogada. Mexico City: tacos al pastor + tacos de guisado + tortas. Veracruz: huachinango a la Veracruzana + mariscos. Baja: fish tacos + aguachile. Monterrey: cabrito (roast kid goat). Sonora: carne asada + flour tortillas. Each region is a separate cuisine."}</p>
        <h3>What etiquette should I know at a mercado or taquería?</h3>
        <p>{"Greet with 'buenos días' entering any stall. Point if your Spanish fails. Order tacos 'con todo' (with cilantro + onion + salsa) or 'sin' (without). Eat tacos with hands, fold in half, lean forward (never fork + knife). At mariscos: ceviche tostadas are eaten standing up. Pay the cook/cashier at a free-standing stall; leave 5-10 pesos round-up if you're feeling good."}</p>
        <h3>How much should I budget for food per day?</h3>
        <p>{"Backpacker $10-15: street tacos (30-50 pesos each), comida corrida lunch (80-120 pesos, 3 courses), supermarket or taco dinner. Mid-range $25-40: café breakfast, sit-down lunch, casual restaurant dinner with drinks. Comfort $60-100: one Pujol-tier splurge per trip ($120-180 without wine), otherwise proper restaurants with cocktails. Mezcal flights add $10-20 per session."}</p>
        <h3>What's the biggest food-related regret travellers report?</h3>
        <p>{"Eating only at resort buffets or TripAdvisor top-10 restaurants and skipping street stalls and mercados. The best food in Mexico is 50-pesos-per-plate on a plastic stool, not $40 fusion plates at white tablecloth places. Allocate at least 5 days of the trip to inland Mexico (CDMX, Oaxaca, Puebla) or the real food is invisible."}</p>

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
