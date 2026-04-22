import React from 'react';
import { Link } from 'react-router-dom';
import { BlogShell, useBlogSEO, useRevealOnScroll } from '../BlogLayout';
import { BlogTable, BlogBarChart, BlogStatGrid, BlogInlineCTA, BlogEndCTA } from '../BlogComponents';
import { BlogCanadaMap } from '../BlogCanadaMap';
import { getPostBySlug } from '../posts';

const SLUG = 'canadian-food-guide-2026';

export default function CanadianFoodGuide2026() {
  const post = getPostBySlug(SLUG);
  useBlogSEO({
    title: `${post.title} | StampYourMap Blog`,
    description: post.description,
    url: `/blog/${SLUG}`,
    image: post.ogImage,
    datePublished: post.datePublished,
    keywords: 'canadian food guide, poutine, butter tarts, tourtiere, montreal bagel, maple syrup, canadian cuisine, nanaimo bar',
  });
  useRevealOnScroll();

  return (
    <BlogShell>
      <article className="blog-article">
        <div className="blog-breadcrumbs">
          <Link to="/">Home</Link> / <Link to="/blog">Blog</Link> / <span>Canadian Food Guide</span>
        </div>
        <div className="blog-hero">
          <span className="blog-cat-chip">Canada · Food</span>
          <span className="blog-meta-sep">•</span><span>Published April 22, 2026</span>
          <span className="blog-meta-sep">•</span><span>{post.readMinutes} min read</span>
        </div>

        <h1>{post.heroEmoji} Canadian Food Guide: 20 Dishes You Must Try in Canada — by Region (2026)</h1>

        <p className="blog-lede">
          Canadian cuisine is more than poutine + maple syrup —
          though both are unmissable. 10 provinces + 3 territories =
          13 distinct regional food traditions, from Quebec\'s French-
          influenced to Prairie-hearty to Atlantic-seafood to Pacific
          Rim fusion.
        </p>

        <BlogStatGrid stats={[
          { value: '20', label: 'Dishes covered' },
          { value: '13', label: 'Regional cuisines' },
          { value: 'C$12', label: 'Typical poutine' },
          { value: '71%', label: 'World\'s maple syrup from Quebec' },
        ]} />

        <BlogInlineCTA title="Food-touring Canada?" subtitle="Stamp each province — free map." href="/signup" />

        <h2 id="map">1. Canadian Food by Region</h2>
        <BlogCanadaMap
          regionIds={['qc', 'on', 'bc', 'ab', 'ns', 'nl']}
          title="Canada's 6 flagship food regions"
          subtitle="Quebec · Ontario · BC · Alberta · Nova Scotia · Newfoundland"
        />

        <h2 id="iconic">2. 5 Non-Negotiable Canadian Foods</h2>
        <BlogTable
          caption="Iconic Canadian canon"
          headers={['#', 'Dish', 'What it is', 'Where']}
          rows={[
            ['1', <strong>Poutine</strong>, 'Fries + cheese curds + hot gravy. Quebec invention, 1950s', 'La Banquise (Montreal, 24/7)'],
            ['2', <strong>Montreal Bagel</strong>, 'Wood-fired, sweet, dense. Boiled in honey water', 'St-Viateur or Fairmount Bagel'],
            ['3', <strong>Butter Tart</strong>, 'Ontario pastry — sugar + butter + egg in a shell', 'Ontario bakeries'],
            ['4', <strong>Tourtière</strong>, 'Quebec meat pie — pork + spices', 'Aux Anciens Canadiens (Quebec City)'],
            ['5', <strong>Maple Syrup</strong>, 'Straight from Quebec sugar shacks. 71% of world production', 'Any Canadian breakfast'],
          ]}
        />

        <h2 id="quebec">3. Quebec (4)</h2>
        <ul>
          <li><strong>Montreal Smoked Meat</strong> — cured + steamed brisket on rye with mustard. Schwartz\'s Deli is definitive</li>
          <li><strong>Pâté Chinois</strong> — Canadian shepherd\'s pie (beef + corn + mashed potato)</li>
          <li><strong>Cipaille</strong> — six-layer meat pie; pioneer dish</li>
          <li><strong>Maple Taffy</strong> — hot maple syrup poured onto snow, rolled on stick. Sugar shack staple</li>
        </ul>

        <h2 id="atlantic">4. Atlantic Canada (4)</h2>
        <BlogTable
          caption="Atlantic specialties"
          headers={['#', 'Dish', 'Where']}
          rows={[
            ['10', <strong>Lobster Roll</strong>, 'Nova Scotia / PEI — Shediac has the biggest lobster festival'],
            ['11', <strong>Digby Scallops</strong>, 'Nova Scotia — world\'s largest scallop fleet'],
            ['12', <strong>Cod Cheeks</strong>, 'Newfoundland delicacy'],
            ['13', <strong>Jiggs Dinner</strong>, 'Newfoundland Sunday tradition: corned beef + root veg'],
          ]}
        />

        <h2 id="pacific">5. Pacific + Western (4)</h2>
        <ul>
          <li><strong>BC Salmon</strong> — wild Pacific salmon, cedar-plank-grilled</li>
          <li><strong>Nanaimo Bar</strong> — no-bake layered bar, BC invention</li>
          <li><strong>Alberta Beef</strong> — steakhouse culture, especially in Calgary</li>
          <li><strong>Vancouver Sushi</strong> — some of the best outside Japan</li>
        </ul>

        <h2 id="prairie">6. Prairies (2)</h2>
        <ul>
          <li><strong>Saskatoon Berry Pie</strong> — like blueberry but almondy</li>
          <li><strong>Perogies</strong> — Ukrainian Canadian immigrants\' legacy in the Prairies</li>
        </ul>

        <BlogInlineCTA title="Stamp your Canadian food tour." subtitle="Free map — 13 provinces + territories." href="/signup" />

        <h2 id="drinks">7. Drinks (3)</h2>
        <ul>
          <li><strong>Caesar</strong> — Canadian Bloody Mary with Clamato juice (instead of tomato). Calgary invention, 1969</li>
          <li><strong>Icewine</strong> — grapes picked frozen, intensely sweet dessert wine. Niagara Peninsula is the world leader</li>
          <li><strong>Canadian Whisky</strong> — lighter than American bourbon. Crown Royal + Forty Creek + Canadian Club</li>
        </ul>

        <h2 id="panel">8. Panel Favorites</h2>
        <BlogBarChart
          title="Most-recommended Canadian foods — 2025 panel"
          max={100} unit="%"
          data={[
            { label: 'Poutine', value: 84, valueLabel: '84%' },
            { label: 'Montreal bagels', value: 58, valueLabel: '58%' },
            { label: 'Lobster roll (East Coast)', value: 48, valueLabel: '48%' },
            { label: 'Butter tart', value: 42, valueLabel: '42%' },
            { label: 'Smoked meat (Schwartz\'s)', value: 38, valueLabel: '38%' },
            { label: 'Maple syrup straight from shack', value: 36, valueLabel: '36%' },
            { label: 'Nanaimo bar', value: 28, valueLabel: '28%' },
            { label: 'Tourtière', value: 24, valueLabel: '24%' },
            { label: 'BC salmon', value: 32, valueLabel: '32%' },
            { label: 'Caesar cocktail', value: 28, valueLabel: '28%' },
          ]}
        />

        <h2 id="where">9. Where to Eat</h2>
        <BlogTable
          caption="Top spots"
          headers={['What you want', 'Where', 'Cost (CAD)']}
          rows={[
            ['Best poutine', 'La Banquise (Montreal, 30+ variants)', 'C$12-20'],
            ['Best bagels', 'St-Viateur Bagel (Montreal, 24/7)', 'C$1.50 ea'],
            ['Smoked meat', 'Schwartz\'s Deli (Montreal)', 'C$15-25'],
            ['Lobster roll', 'Peggy\'s Cove (NS) or Cows (PEI)', 'C$22-35'],
            ['Butter tart tour', 'Ontario Butter Tart Trail (16 bakeries)', 'C$3-5 each'],
            ['Fine dining modern Canadian', 'Alo (Toronto), Langdon Hall (Cambridge ON)', 'C$200-350'],
            ['Sugar shack (cabane à sucre)', 'Érablière du Lac-Beauport (near Quebec)', 'C$40-60 all-you-can-eat'],
          ]}
        />

        <h2 id="faq">10. FAQ</h2>
        <h3>Best dish?</h3><p><strong>Poutine at La Banquise</strong> or <strong>smoked meat at Schwartz\'s</strong>. Both Montreal.</p>
        <h3>Tipping?</h3><p>15-18% at restaurants. 20% for exceptional service.</p>
        <h3>Food budget?</h3><p>Backpacker: <strong>C$40/day</strong>. Mid: <strong>C$75/day</strong>. Comfort: <strong>C$150+/day</strong>.</p>

        <h2 id="keep">Keep Reading</h2>
        <ul>
          <li><Link to="/blog/canada-travel-guide-2026">Ultimate Canada Guide →</Link></li>
          <li><Link to="/blog/two-week-canada-itinerary-2026">2-Week Itinerary →</Link></li>
          <li><Link to="/blog/best-canada-destinations-2026">10 Best Destinations →</Link></li>
          <li><Link to="/blog/banff-canadian-rockies-guide-2026">Banff Guide →</Link></li>
        </ul>

        <BlogEndCTA
          title="Stamp each province you eat in."
          subtitle="Free forever. Build your Canadian food map."
        />
      </article>
    </BlogShell>
  );
}
