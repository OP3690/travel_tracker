import React from 'react';
import { Link } from 'react-router-dom';
import { BlogShell, useBlogSEO, useRevealOnScroll } from '../BlogLayout';
import { BlogTable, BlogBarChart, BlogCallout, BlogStatGrid, BlogInlineCTA, BlogEndCTA } from '../BlogComponents';
import { BlogVietnamMap } from '../BlogVietnamMap';
import { getPostBySlug } from '../posts';

const SLUG = 'vietnamese-food-guide-2026';

export default function VietnameseFoodGuide2026() {
  const post = getPostBySlug(SLUG);
  useBlogSEO({
    title: `${post.title} | StampYourMap Blog`,
    description: post.description,
    url: `/blog/${SLUG}`,
    image: post.ogImage,
    datePublished: post.datePublished,
    keywords: 'vietnamese food guide, pho, banh mi, bun cha, cao lau, vietnam street food, vietnam coffee, vietnamese cuisine',
  });
  useRevealOnScroll();

  return (
    <BlogShell>
      <article className="blog-article">
        <div className="blog-breadcrumbs"><Link to="/">Home</Link> / <Link to="/blog">Blog</Link> / <span>Vietnamese Food Guide</span></div>
        <div className="blog-hero">
          <span className="blog-cat-chip">Vietnam · Food</span>
          <span className="blog-meta-sep">•</span><span>Published April 22, 2026</span>
          <span className="blog-meta-sep">•</span><span>{post.readMinutes} min read</span>
        </div>

        <h1>{post.heroEmoji} Vietnamese Food Guide: 25 Dishes You Must Try in Vietnam — by Region (2026)</h1>

        <p className="blog-lede">
          Vietnamese cuisine is arguably the world's most balanced —
          herbal + fresh + savory + light. The country eats on tiny
          plastic stools, street-side, 3 times a day. Here are the 25
          dishes by region + where to eat them.
        </p>

        <BlogStatGrid stats={[{value:'25',label:'Dishes covered'},{value:'~$2',label:'Typical pho'},{value:'63',label:'Regional cuisines'},{value:'3',label:'Distinct culinary regions'}]} />

        <BlogInlineCTA title="Eating across Vietnam?" subtitle="Stamp each province — free map." href="/signup" />

        <h2 id="map">1. Vietnam's Food Regions</h2>
        <BlogVietnamMap regionIds={['hanoi', 'tthue', 'quangnam', 'hcm']} title="4 main food regions" subtitle="Hanoi (north) · Hue (central imperial) · Hoi An (central) · HCM (south)" />

        <h2 id="iconic">2. 6 Non-Negotiable Vietnamese Foods</h2>
        <BlogTable caption="Iconic canon" headers={['#', 'Dish', 'What it is', 'Home']} rows={[
          ['1', <strong>Pho</strong>, 'Rice-noodle soup with beef or chicken + herbs + sprouts + lime', 'Hanoi (north style clearer)'],
          ['2', <strong>Banh Mi</strong>, 'French baguette + pâté + meat + pickles + cilantro', 'Saigon'],
          ['3', <strong>Bun Cha</strong>, 'Grilled pork + vermicelli + dipping sauce', 'Hanoi'],
          ['4', <strong>Goi Cuon</strong>, 'Fresh spring rolls with shrimp + herbs + rice paper', 'All Vietnam'],
          ['5', <strong>Cao Lau</strong>, 'Hoi An-ONLY noodle dish — thick noodles + pork + crackers', 'Hoi An'],
          ['6', <strong>Ca Phe Sua Da</strong>, 'Iced coffee + condensed milk', 'Vietnam National obsession'],
        ]} />

        <BlogCallout title="The Bun Cha Obama moment">
          <p>
            Obama ate bun cha with Anthony Bourdain at <strong>Bún Chả
            Hương Liên</strong> (Hanoi, 2016). That table is now an
            attraction. The food is still excellent, though — worth the
            stop.
          </p>
        </BlogCallout>

        <h2 id="north">3. Northern Vietnam (4)</h2>
        <ul>
          <li><strong>Cha Ca</strong> — turmeric fish with dill + rice noodles</li>
          <li><strong>Banh Cuon</strong> — steamed rice rolls stuffed with pork + mushroom</li>
          <li><strong>Pho Bo</strong> (north style) — lighter, clearer broth than southern</li>
          <li><strong>Bia Hoi</strong> — local draft beer, $0.25/glass at street corners</li>
        </ul>

        <h2 id="central">4. Central Vietnam (5)</h2>
        <BlogTable caption="Hue + Hoi An + Da Nang specialties" headers={['#', 'Dish', 'Notes']} rows={[
          ['11', <strong>Bun Bo Hue</strong>, 'Spicy beef noodle soup, Hue specialty'],
          ['12', <strong>Banh Xeo</strong>, 'Vietnamese crispy rice-flour pancake'],
          ['13', <strong>Mi Quang</strong>, 'Yellow turmeric noodles, central specialty'],
          ['14', <strong>Com Hen</strong>, 'Baby clam rice — Hue street food'],
          ['15', <strong>Banh Mi Phuong</strong>, 'Hoi An\'s most famous banh mi (Bourdain loved it)'],
        ]} />

        <h2 id="south">5. Southern Vietnam (4)</h2>
        <ul>
          <li><strong>Hu Tieu</strong> — southern rice noodle soup, Chinese-influenced</li>
          <li><strong>Com Tam</strong> — "broken rice" with grilled pork + egg + fish sauce</li>
          <li><strong>Banh Khot</strong> — mini coconut-shrimp pancakes</li>
          <li><strong>Goi Du Du</strong> — green papaya salad (Vietnamese take on Thai som tum)</li>
        </ul>

        <BlogInlineCTA title="Stamp each food region." subtitle="Free map — 63 provinces." href="/signup" />

        <h2 id="sweets">6. Sweets + Drinks (6)</h2>
        <ul>
          <li><strong>Che</strong> — sweet dessert soup (many variants: mung bean, banana, tapioca)</li>
          <li><strong>Ca Phe Trung</strong> — Hanoi's egg coffee (sweetened egg yolk on espresso)</li>
          <li><strong>Ca Phe Dua</strong> — coconut coffee, Hanoi specialty</li>
          <li><strong>Sinh To Bo</strong> — avocado + condensed milk smoothie</li>
          <li><strong>Nuoc Mia</strong> — fresh sugarcane juice, pressed street-side</li>
          <li><strong>Bia Saigon / Tiger / Hanoi Beer</strong> — mainstream local lagers</li>
        </ul>

        <h2 id="panel">7. Panel Favorites</h2>
        <BlogBarChart title="Most-recommended Vietnamese dishes — 2025 panel" max={100} unit="%" data={[
          {label:'Pho',value:88,valueLabel:'88%'},
          {label:'Banh Mi',value:82,valueLabel:'82%'},
          {label:'Bun Cha',value:56,valueLabel:'56%'},
          {label:'Ca Phe Sua Da',value:48,valueLabel:'48%'},
          {label:'Cao Lau',value:42,valueLabel:'42%'},
          {label:'Fresh spring rolls',value:40,valueLabel:'40%'},
          {label:'Bun Bo Hue',value:34,valueLabel:'34%'},
          {label:'Egg coffee',value:32,valueLabel:'32%'},
          {label:'Banh Xeo',value:26,valueLabel:'26%'},
          {label:'Mi Quang',value:22,valueLabel:'22%'},
        ]} />

        <h2 id="where">8. Where to Eat</h2>
        <BlogTable caption="Top spots" headers={['What you want', 'Where', 'Cost']} rows={[
          ['Best pho', 'Pho Thin (Hanoi)', '$2.50'],
          ['Best banh mi', 'Banh Mi Phuong (Hoi An)', '$1.50'],
          ['Obama bun cha', 'Bún Chả Hương Liên (Hanoi)', '$4'],
          ['Best egg coffee', 'Café Giảng (Hanoi)', '$1.50'],
          ['Hoi An cao lau', 'Morning Glory Restaurant', '$3'],
          ['Modern Vietnamese fine dining', 'Anan Saigon', '$50-80'],
          ['Street food tour Hanoi', 'Via Food Tours', '$35-50/person'],
        ]} />

        <h2 id="rules">9. 5 Food Rules</h2>
        <ol>
          <li><strong>Eat at tiny plastic stools.</strong> Counterintuitive but the best food always is</li>
          <li><strong>Squeeze lime + add herbs.</strong> Don\'t touch the bowl until you\'ve dressed it</li>
          <li><strong>Hot food goes cold fast.</strong> Eat the pho within 5 minutes of arrival</li>
          <li><strong>Bottled water only.</strong> Ice in drinks at restaurants = usually safe</li>
          <li><strong>Tip 5-10%.</strong> Not expected but appreciated; round up</li>
        </ol>

        <h2 id="faq">10. FAQ</h2>
        <h3>Best single dish?</h3><p><strong>Pho Thin in Hanoi</strong> — the original, since 1979.</p>
        <h3>Vegetarian-friendly?</h3><p>Moderate. Many pho places serve pho chay (veg). "Chay" = vegetarian.</p>
        <h3>Food budget?</h3><p>Backpacker: <strong>$6/day</strong>. Mid: <strong>$15/day</strong>. Comfort: <strong>$35+/day</strong>.</p>

        <h2 id="keep">Keep Reading</h2>
        <ul>
          <li><Link to="/blog/vietnam-travel-guide-2026">Ultimate Vietnam Guide →</Link></li>
          <li><Link to="/blog/two-week-vietnam-itinerary-2026">2-Week Itinerary →</Link></li>
          <li><Link to="/blog/halong-bay-hoi-an-guide-2026">Halong + Hoi An →</Link></li>
        </ul>

        <BlogEndCTA title="Stamp each province you eat in." subtitle="Free forever. Build your Vietnam food map." />
      </article>
    </BlogShell>
  );
}
