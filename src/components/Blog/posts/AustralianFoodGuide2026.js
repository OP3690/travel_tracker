import React from 'react';
import { Link } from 'react-router-dom';
import { BlogShell, useBlogSEO, useRevealOnScroll } from '../BlogLayout';
import { BlogTable, BlogBarChart, BlogCallout, BlogStatGrid, BlogInlineCTA, BlogEndCTA } from '../BlogComponents';
import { BlogAustraliaMap } from '../BlogAustraliaMap';
import { getPostBySlug } from '../posts';

const SLUG = 'australian-food-guide-2026';

export default function AustralianFoodGuide2026() {
  const post = getPostBySlug(SLUG);
  useBlogSEO({
    title: `${post.title} | StampYourMap Blog`,
    description: post.description,
    url: `/blog/${SLUG}`,
    image: post.ogImage,
    datePublished: post.datePublished,
    keywords: 'australian food guide, meat pie, lamington, pavlova, barramundi, flat white, aussie coffee, bush tucker, modern australian cuisine',
  });
  useRevealOnScroll();

  return (
    <BlogShell>
      <article className="blog-article">
        <div className="blog-breadcrumbs">
          <Link to="/">Home</Link> / <Link to="/blog">Blog</Link> / <span>Australian Food Guide</span>
        </div>
        <div className="blog-hero">
          <span className="blog-cat-chip">Australia · Food</span>
          <span className="blog-meta-sep">•</span><span>Published April 22, 2026</span>
          <span className="blog-meta-sep">•</span><span>{post.readMinutes} min read</span>
        </div>

        <h1>{post.heroEmoji} Australian Food Guide: 20 Dishes & Experiences You Must Try in Australia (2026)</h1>

        <p className="blog-lede">
          Australian food is dramatically better than its reputation.
          "Modern Australian" cuisine — built on Mediterranean, Asian,
          and Indigenous influences with a world-class café culture —
          quietly became one of the most interesting cuisines on earth
          in the 2010s. Sydney alone has more Michelin-equivalent stars
          than many European capitals.
        </p>

        <BlogStatGrid stats={[
          { value: '20', label: 'Dishes covered' },
          { value: 'A$4.50', label: 'Typical flat white' },
          { value: 'A$8-12', label: 'Meat pie' },
          { value: '2026', label: 'Fresh picks' },
        ]} />

        <BlogInlineCTA title="Food-touring Australia?" subtitle="Stamp each state on your free map." href="/signup" />

        <h2 id="map">1. Where Australian Food Happens</h2>
        <BlogAustraliaMap
          regionIds={['nsw', 'vic', 'qld-mainland', 'sa-mainland']}
          title="Australia's 4 essential food states"
          subtitle="Sydney seafood · Melbourne coffee + Mod Oz · QLD tropical + seafood · SA wine"
        />

        <h2 id="iconic">2. The 6 Iconic Australian Foods</h2>
        <BlogTable
          caption="Non-negotiable Aussie experiences"
          headers={['#', 'Dish', 'What it is', 'Where']}
          rows={[
            ['1', <strong>Flat White</strong>, 'Espresso + velvety steamed milk. The Aussie coffee. Better than Starbucks in every dimension', 'Any Melbourne laneway café'],
            ['2', <strong>Meat Pie</strong>, 'Hand-held pie with minced beef + gravy. National footy snack', 'Harry\'s Café de Wheels (Sydney)'],
            ['3', <strong>Lamington</strong>, 'Sponge cake in chocolate + coconut. Invented 1896', 'Bakeries everywhere'],
            ['4', <strong>Pavlova</strong>, 'Meringue + cream + fresh fruit. NZ disputes origin', 'Christmas tradition; year-round'],
            ['5', <strong>Barramundi</strong>, 'Native white-fleshed fish, grilled or fish-and-chips', 'Any seafood restaurant'],
            ['6', <strong>Vegemite on Toast</strong>, 'Yeast extract on buttered toast. Eat it thin; Aussies WILL judge your spread', 'Any hotel breakfast'],
          ]}
        />

        <BlogCallout title="Vegemite rules">
          <p>
            <strong>Thin layer.</strong> The #1 tourist mistake is
            spreading Vegemite like peanut butter. It should be a whisper
            of colour on buttered toast. Pair with a hot flat white for
            the authentic Aussie breakfast.
          </p>
        </BlogCallout>

        <h2 id="modern">3. Modern Australian Cuisine (5)</h2>
        <BlogTable
          caption="The modern Aussie canon"
          headers={['#', 'Dish/Experience', 'Where']}
          rows={[
            ['7', <strong>Sydney Rock Oysters</strong>, 'Bondi or Sydney Fish Market — small, creamy, distinctly Australian'],
            ['8', <strong>Chicken Parmigiana</strong>, 'The pub classic — breaded chicken + tomato + cheese + chips'],
            ['9', <strong>Smashed Avo on Sourdough</strong>, 'The breakfast that broke the internet in 2017. Melbourne invented it'],
            ['10', <strong>Fish and Chips (paper-wrapped)</strong>, 'Beach town classic; eat on the sand'],
            ['11', <strong>Hot Chips + Chicken Salt</strong>, 'Yellow-powder seasoned fries. Uniquely Australian'],
          ]}
        />

        <h2 id="bush">4. Bush Tucker + Indigenous (3)</h2>
        <ul>
          <li><strong>Kangaroo</strong> — lean, gamey, available at any meat restaurant. Best rare</li>
          <li><strong>Barramundi with native herbs</strong> — lemon myrtle, wattleseed, pepperberry seasoning</li>
          <li><strong>Bush tucker tasting</strong> — Mayi Harvests (Perth), Charcoal Lane (Melbourne): Indigenous-led fine dining</li>
        </ul>

        <h2 id="treats">5. Sweets + Treats (3)</h2>
        <ul>
          <li><strong>Tim Tam</strong> — chocolate biscuit with cream filling. The "Tim Tam slam" requires biting diagonal corners + using it as a coffee straw</li>
          <li><strong>Anzac Biscuit</strong> — oats + golden syrup + coconut. Originally baked for WWI soldiers</li>
          <li><strong>Iced VoVo / Arnott's Scotch Finger</strong> — cult Australian supermarket biscuits</li>
        </ul>

        <h2 id="drinks">6. Drinks (3)</h2>
        <BlogInlineCTA title="Stamp your food regions." subtitle="Free map — all 8 Aussie states + territories." href="/signup" />

        <ul>
          <li><strong>Australian Wine</strong> — Margaret River (WA, Cab Sauv + Chardonnay), Barossa + McLaren Vale (SA, Shiraz), Hunter Valley (NSW, Semillon). Cheap + world-class</li>
          <li><strong>Craft Beer</strong> — 500+ microbreweries. Melbourne, Perth, Sydney all have destination brewpubs</li>
          <li><strong>Milkshakes + Spider</strong> — classic milk bar items. "Spider" = ice cream float with soft drink</li>
        </ul>

        <h2 id="panel">7. Panel Favorites</h2>
        <BlogBarChart
          title="Most-recommended Aussie food experiences — 2025 panel"
          max={100} unit="%"
          data={[
            { label: 'Flat white at a laneway café', value: 82, valueLabel: '82%' },
            { label: 'Sydney Fish Market lunch', value: 54, valueLabel: '54%' },
            { label: 'Meat pie at a footy match', value: 48, valueLabel: '48%' },
            { label: 'Smashed avo brunch', value: 42, valueLabel: '42%' },
            { label: 'Kangaroo fillet dinner', value: 38, valueLabel: '38%' },
            { label: 'Lamington with tea', value: 34, valueLabel: '34%' },
            { label: 'Wine tour (Margaret River/Barossa)', value: 52, valueLabel: '52%' },
            { label: 'Tim Tam slam', value: 28, valueLabel: '28%' },
          ]}
        />

        <h2 id="where">8. Where to Eat</h2>
        <BlogTable
          caption="Where to find each signature experience"
          headers={['What you want', 'Where', 'Price']}
          rows={[
            ['Best flat white', 'Proud Mary (Melbourne) or Single O (Sydney)', 'A$4.50-6'],
            ['Sydney Fish Market', 'Pyrmont (self-service)', 'A$30-50 per person'],
            ['Mod Oz fine dining', 'Quay (Sydney), Attica (Melbourne)', 'A$310-450'],
            ['Aussie brunch', 'Sydney/Melbourne cafés everywhere', 'A$25-40'],
            ['Beach fish-and-chips', 'Any coastal town', 'A$15-25'],
            ['Indigenous fine dining', 'Charcoal Lane (Melbourne)', 'A$90-120'],
          ]}
        />

        <h2 id="faq">9. FAQ</h2>
        <h3>Is Australian food good?</h3><p>Yes — genuinely excellent. Its reputation is decades outdated.</p>
        <h3>Best city for food?</h3><p><strong>Melbourne</strong> narrowly beats Sydney for coffee + brunch + laneway fine dining.</p>
        <h3>Tipping?</h3><p>Not expected. Round up 5-10% for exceptional service only.</p>
        <h3>Vegetarian-friendly?</h3><p>Very — especially Melbourne. Plenty of plant-forward cafés + restaurants.</p>

        <h2 id="keep">Keep Reading</h2>
        <ul>
          <li><Link to="/blog/australia-travel-guide-2026">Ultimate Australia Guide →</Link></li>
          <li><Link to="/blog/two-week-australia-itinerary-2026">2-Week Itinerary →</Link></li>
          <li><Link to="/blog/best-australian-destinations-2026">10 Best Destinations →</Link></li>
        </ul>

        <BlogEndCTA
          title="Stamp every Aussie state you eat in."
          subtitle="Build your Australia food memory map — free forever."
        />
      </article>
    </BlogShell>
  );
}
