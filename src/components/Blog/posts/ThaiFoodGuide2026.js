import React from 'react';
import { Link } from 'react-router-dom';
import { BlogShell, useBlogSEO, useRevealOnScroll } from '../BlogLayout';
import {
  BlogTable, BlogBarChart, BlogCallout, BlogStatGrid, BlogInlineCTA, BlogEndCTA,
} from '../BlogComponents';
import { BlogThailandMap } from '../BlogThailandMap';
import { getPostBySlug } from '../posts';

const SLUG = 'thai-food-guide-2026';
const FOOD_PROVINCES = ['bkk', 'cmi', 'pkt', 'nma', 'cri'];

export default function ThaiFoodGuide2026() {
  const post = getPostBySlug(SLUG);
  useBlogSEO({
    title: `${post.title} | StampYourMap Blog`,
    description: post.description,
    url: `/blog/${SLUG}`,
    image: post.ogImage,
    datePublished: post.datePublished,
    keywords: 'thai food guide, thai dishes must try, pad thai, tom yum, green curry, som tum, khao soi, mango sticky rice, bangkok street food',
  });
  useRevealOnScroll();

  return (
    <BlogShell>
      <article className="blog-article">
        <div className="blog-breadcrumbs">
          <Link to="/">Home</Link> / <Link to="/blog">Blog</Link> / <span>Thai Food Guide</span>
        </div>
        <div className="blog-hero">
          <span className="blog-cat-chip">Thailand · Food</span>
          <span className="blog-meta-sep">•</span><span>Published April 22, 2026</span>
          <span className="blog-meta-sep">•</span><span>{post.readMinutes} min read</span>
        </div>

        <h1>{post.heroEmoji} Thai Food Guide: 25 Dishes You Must Try in Thailand (2026)</h1>

        <p className="blog-lede">
          Thai food is the reason many travelers come back to Thailand a
          second and third time. The cuisine balances the four cardinal
          flavours — sweet, sour, salty, spicy — with an intensity that no
          other cuisine quite matches. This guide covers 25 dishes that
          define modern Thai food, organised by region + category, with
          where to eat each one.
        </p>

        <BlogStatGrid stats={[
          { value: '25', label: 'Dishes covered' },
          { value: '4', label: 'Regional cuisines' },
          { value: '~$2', label: 'Street-food meal' },
          { value: '2026', label: 'Fresh picks' },
        ]} />

        <BlogInlineCTA title="Eat your way through Thailand?" subtitle="Stamp every province you eat in." href="/signup" />

        <h2 id="regions">1. Thai Food, by Region</h2>
        <p>
          Thai cuisine is not one cuisine — it's four. <strong>Central Thai</strong>
          {' '}(Bangkok) is the one globally known: pad thai, green curry,
          tom yum. <strong>Northern Thai</strong> (Chiang Mai): khao soi,
          sai oua, nam prik ong — milder, more herbal. <strong>Northeastern
          (Isaan)</strong>: som tum, larb, grilled meat — the fieriest
          region. <strong>Southern Thai</strong>: Malay-influenced coconut
          curries, massaman, seafood.
        </p>

        <BlogThailandMap
          regionIds={FOOD_PROVINCES}
          title="Regional food capitals of Thailand"
          subtitle="Bangkok (Central) · Chiang Mai (Northern) · Nakhon Ratchasima (Isaan) · Phuket (Southern) · Chiang Rai"
        />

        <h2 id="street">2. Street Food & Quick Bites (8)</h2>
        <BlogTable
          caption="Essential street food"
          headers={['#', 'Dish', 'What it is', 'Where to find']}
          rows={[
            ['1', <strong>Pad Thai</strong>, 'Stir-fried rice noodles with shrimp, egg, tamarind sauce, peanuts', 'Thip Samai (Bangkok) — the undisputed best'],
            ['2', <strong>Som Tum</strong>, 'Green papaya salad, pounded fresh, fiery-sour', 'Any Isaan street cart in Bangkok'],
            ['3', <strong>Khao Pad</strong>, 'Thai fried rice with pineapple, cashews, shrimp', 'Every Bangkok food court'],
            ['4', <strong>Moo Ping</strong>, 'Grilled pork skewers with sticky rice', 'Breakfast street carts, 20 baht each'],
            ['5', <strong>Khao Man Gai</strong>, 'Hainanese chicken rice — Thai version', 'Midnight Chicken Rice, Bangkok'],
            ['6', <strong>Pad See Ew</strong>, 'Wok-fried wide rice noodles with dark soy + Chinese broccoli', 'Any noodle stall'],
            ['7', <strong>Guay Teow</strong>, 'Thai noodle soup — customize with 4 condiments', 'Street stalls everywhere'],
            ['8', <strong>Satay</strong>, 'Grilled marinated meat skewers with peanut sauce', 'Street markets'],
          ]}
        />

        <h2 id="curries-soups">3. Curries & Soups (6)</h2>
        <BlogTable
          caption="Thailand's legendary curries + soups"
          headers={['#', 'Dish', 'Origin', 'Spice level']}
          rows={[
            ['9', <strong>Tom Yum Goong</strong>, 'Central', '🌶️🌶️🌶️ (hot-sour shrimp)'],
            ['10', <strong>Tom Kha Gai</strong>, 'Central', '🌶️ (coconut-galangal chicken — gentle)'],
            ['11', <strong>Green Curry (Gaeng Keow Wan)</strong>, 'Central', '🌶️🌶️'],
            ['12', <strong>Red Curry (Gaeng Phed)</strong>, 'Central', '🌶️🌶️🌶️'],
            ['13', <strong>Massaman Curry</strong>, 'Southern (Muslim)', '🌶️ (with peanut, cinnamon — mild)'],
            ['14', <strong>Panang Curry</strong>, 'Central', '🌶️🌶️ (thick, nutty)'],
          ]}
        />

        <BlogCallout title="Spice tip">
          <p>
            Say <em>"mai phet"</em> for "not spicy" or <em>"phet noi noi"</em>
            {' '}for "a little spicy." Thais already tone down what's served
            to tourists — if you want the real flavor, specify <em>"phet
            thai"</em> (Thai level).
          </p>
        </BlogCallout>

        <h2 id="northern">4. Northern Thai Specialities (4)</h2>
        <BlogTable
          caption="Chiang Mai / Northern Thai dishes"
          headers={['#', 'Dish', 'What it is']}
          rows={[
            ['15', <strong>Khao Soi</strong>, 'Coconut curry noodles with crispy noodle topping — the north\'s signature'],
            ['16', <strong>Sai Oua</strong>, 'Northern herb-packed pork sausage, grilled'],
            ['17', <strong>Nam Prik Ong</strong>, 'Tomato + pork chili dip, served with veg + sticky rice'],
            ['18', <strong>Gaeng Hang Lay</strong>, 'Burmese-influenced pork belly curry, no chilies, dark + rich'],
          ]}
        />

        <h2 id="isaan">5. Isaan (Northeast) Specialities (3)</h2>
        <ul>
          <li><strong>Larb</strong> — minced meat salad with toasted rice powder, herbs, chili. The real Isaan dish.</li>
          <li><strong>Kor Moo Yang</strong> — grilled pork neck, served with sticky rice + tamarind dip.</li>
          <li><strong>Gai Yang</strong> — marinated grilled chicken, often served with som tum + sticky rice (the classic Isaan trio).</li>
        </ul>

        <h2 id="southern">6. Southern Thai (2)</h2>
        <ul>
          <li><strong>Gaeng Tai Pla</strong> — fish-organ curry, the hottest curry in Thailand. Proceed with caution.</li>
          <li><strong>Roti</strong> — flaky Malay flatbread, served sweet (banana + condensed milk) or savoury (egg + curry).</li>
        </ul>

        <h2 id="desserts">7. Desserts & Sweets (2)</h2>
        <BlogTable
          caption="Thai desserts"
          headers={['#', 'Dish', 'Notes']}
          rows={[
            ['24', <strong>Mango Sticky Rice (Khao Niaow Ma Muang)</strong>, 'Peak dessert experience; best in mango season (Apr-Jun)'],
            ['25', <strong>Bua Loy</strong>, 'Coconut-milk + rice-flour dumplings + gingery broth'],
          ]}
        />

        <h2 id="panel">8. Our Panel's Favourite Thai Dishes</h2>
        <BlogBarChart
          title="Most-recommended Thai dishes — 2025 panel"
          subtitle="% of 4,180 panelists who chose each in their Thailand top 3."
          max={100} unit="%"
          data={[
            { label: 'Pad Thai', value: 74, valueLabel: '74%' },
            { label: 'Green Curry', value: 63, valueLabel: '63%' },
            { label: 'Tom Yum Goong', value: 58, valueLabel: '58%' },
            { label: 'Mango Sticky Rice', value: 51, valueLabel: '51%' },
            { label: 'Khao Soi', value: 46, valueLabel: '46%' },
            { label: 'Som Tum', value: 42, valueLabel: '42%' },
            { label: 'Massaman Curry', value: 38, valueLabel: '38%' },
            { label: 'Moo Ping', value: 34, valueLabel: '34%' },
            { label: 'Khao Man Gai', value: 28, valueLabel: '28%' },
            { label: 'Tom Kha Gai', value: 26, valueLabel: '26%' },
          ]}
        />

        <h2 id="where">9. Where to Actually Eat</h2>
        <BlogTable
          caption="Where to eat each category"
          headers={['What you want', 'Go to', 'Cost']}
          rows={[
            ['Best street pad thai', 'Thip Samai, Bangkok', '$3-4'],
            ['Best khao soi', 'Khao Soi Khun Yai, Chiang Mai', '$2'],
            ['Best tom yum', 'Pe Aor, Bangkok', '$5'],
            ['Best som tum', 'Somtum Der, Bangkok (Michelin-awarded Isaan)', '$4'],
            ['Cooking class', 'Chiang Mai Thai Cookery School', '$35/half-day'],
            ['Modern Thai fine dining', 'Sorn, Le Du, Gaggan Anand (Bangkok)', '$150-300'],
            ['Michelin-street-food', 'Jay Fai (crab omelette)', '$30'],
          ]}
        />

        <h2 id="drinks">10. What to Drink</h2>
        <ul>
          <li><strong>Thai iced tea</strong> — orange-tinged tea + condensed milk</li>
          <li><strong>Singha, Chang, Leo</strong> — mainstream beers, lagers, universally good</li>
          <li><strong>Cha Yen</strong> — sweet Thai iced tea</li>
          <li><strong>Thai whiskey (SangSom)</strong> — rum-based, cheap; mix with soda + lime</li>
          <li><strong>Coconut water straight from the shell</strong> — street vendors everywhere, $1</li>
        </ul>

        <h2 id="faq">11. FAQ</h2>
        <h3>Single best Thai dish to start with?</h3>
        <p><strong>Pad Thai at Thip Samai</strong>. Iconic for a reason.</p>
        <h3>Where's the best street food?</h3>
        <p><strong>Bangkok's Yaowarat (Chinatown) at night</strong>. The single best street-food street in Asia.</p>
        <h3>Is Thai food safe from street carts?</h3>
        <p>Yes — stick to busy stalls with visible turnover. Thai street food is some of the safest in Asia.</p>
        <h3>How much should I budget for food?</h3>
        <p>Backpacker: <strong>$8/day</strong> (street only). Mid-range: <strong>$18/day</strong>. Comfort: <strong>$45+/day</strong>.</p>

        <h2 id="keep">Keep Reading</h2>
        <ul>
          <li><Link to="/blog/thailand-travel-guide-2026">Ultimate Thailand Guide →</Link></li>
          <li><Link to="/blog/two-week-thailand-itinerary-2026">2-Week Itinerary →</Link></li>
          <li><Link to="/blog/bangkok-complete-guide-2026">Bangkok 5-Day Guide →</Link></li>
          <li><Link to="/blog/best-thailand-islands-2026">10 Best Thai Islands →</Link></li>
        </ul>

        <BlogEndCTA
          title="Stamp every province you eat in."
          subtitle="Build a food memory map of your Thailand trip — free."
        />
      </article>
    </BlogShell>
  );
}
