import React from 'react';
import { Link } from 'react-router-dom';
import { BlogShell, useBlogSEO, useRevealOnScroll } from '../BlogLayout';
import {
  BlogTable,
  BlogCallout,
  BlogBarChart,
  BlogStatGrid,
  BlogInlineCTA,
  BlogEndCTA,
} from '../BlogComponents';
import { BlogJapanMap } from '../BlogJapanMap';
import { getPostBySlug } from '../posts';

const SLUG = 'japanese-food-guide-2026';
const FOOD_REGIONS = ['tokyo', 'osaka', 'kyoto', 'fukuoka', 'hokkaido', 'hiroshima', 'okinawa'];

export default function JapaneseFoodGuide2026() {
  const post = getPostBySlug(SLUG);
  useBlogSEO({
    title: `${post.title} | StampYourMap Blog`,
    description: post.description,
    url: `/blog/${SLUG}`,
    image: post.ogImage,
    datePublished: post.datePublished,
    keywords:
      'japanese food guide, must try japanese dishes, sushi, ramen, tempura, okonomiyaki, ' +
      'japanese cuisine, where to eat japan, best ramen tokyo, osaka food, kaiseki, yakitori',
  });
  useRevealOnScroll();

  return (
    <BlogShell>
      <article className="blog-article">
        <div className="blog-breadcrumbs">
          <Link to="/">Home</Link> / <Link to="/blog">Blog</Link> /{' '}
          <span>Japanese Food Guide</span>
        </div>

        <div className="blog-hero">
          <span className="blog-cat-chip">Japan · Food</span>
          <span className="blog-meta-sep">•</span>
          <span>Published April 22, 2026</span>
          <span className="blog-meta-sep">•</span>
          <span>{post.readMinutes} min read</span>
        </div>

        <h1>{post.heroEmoji} Japanese Food Guide: 30 Dishes You Must Try in Japan (2026)</h1>

        <p className="blog-lede">
          Japanese food is the single most-researched reason travelers give
          for visiting Japan. The cuisine goes much deeper than sushi and
          ramen — each region has centuries-old specialties you can't find
          anywhere else. This guide covers 30 dishes that define modern
          Japanese cuisine, organized by category, with our top
          restaurant picks in each category.
        </p>

        <BlogStatGrid
          stats={[
            { value: '30', label: 'Dishes covered' },
            { value: '7', label: 'Regional cuisines' },
            { value: '350+', label: 'Michelin stars in Tokyo' },
            { value: '¥1,000', label: 'Avg lunch (~$7)' },
          ]}
        />

        <BlogInlineCTA
          title="Food-tour Japan?"
          subtitle="Stamp every prefecture you eat in — free map."
          href="/signup"
        />

        <h2 id="regions">1. Where to Eat What</h2>

        <BlogJapanMap
          regionIds={FOOD_REGIONS}
          title="Japan's flagship food regions"
          subtitle="Tokyo sushi · Osaka street food · Kyoto kaiseki · Fukuoka ramen · Hokkaido seafood · Hiroshima okonomiyaki · Okinawa distinct"
        />

        <h2 id="sushi-sashimi">2. Sushi & Sashimi (5)</h2>

        <BlogTable
          caption="Essential sushi & sashimi experiences"
          headers={['Dish', 'What it is', 'Where to try']}
          rows={[
            [<strong>Nigiri sushi</strong>, 'Classic hand-pressed rice with fish on top', 'Sushi Saito or Sushi Dai (Tokyo)'],
            [<strong>Omakase</strong>, 'Chef\'s choice — 10-20 course sushi parade', 'Sukiyabashi Jiro ($400+), Kitagawa ($180)'],
            [<strong>Sashimi</strong>, 'Pure raw fish, no rice, no soy sauce at first', 'Toyosu Market stalls, Tokyo'],
            [<strong>Kaiten-zushi</strong>, 'Conveyor-belt sushi, $2-8/plate, great fun', 'Sushiro or Kura Sushi — any location'],
            [<strong>Chirashi-don</strong>, 'Bowl of seasoned rice topped with mixed sashimi', 'Tsukiji Outer Market stalls'],
          ]}
        />

        <h2 id="ramen-noodles">3. Ramen & Noodle Dishes (6)</h2>

        <BlogTable
          caption="Japan's noodle landscape"
          headers={['Dish', 'What it is', 'Capital city']}
          rows={[
            [<strong>Tonkotsu ramen</strong>, 'Rich pork-bone broth, thin noodles', 'Fukuoka (Hakata)'],
            [<strong>Shoyu ramen</strong>, 'Soy-sauce-based clear broth', 'Tokyo'],
            [<strong>Miso ramen</strong>, 'Thick miso-paste broth, curly noodles', 'Sapporo (Hokkaido)'],
            [<strong>Tsukemen</strong>, 'Cold noodles dipped in concentrated hot broth', 'Tokyo (Rokurinsha at Tokyo Station)'],
            [<strong>Udon</strong>, 'Thick wheat noodles, often in simple broth', 'Sanuki/Kagawa (Shikoku)'],
            [<strong>Soba</strong>, 'Thin buckwheat noodles, hot or cold', 'Nagano'],
          ]}
        />

        <BlogCallout title="The ramen rule">
          <p>
            Tokyo has ~10,000 ramen shops. The best 5 all have queues of
            ~45 minutes at lunch. Japanese people join the queue, so you
            should too — it's always worth it. Slurping is encouraged.
          </p>
        </BlogCallout>

        <h2 id="grilled">4. Grilled & Fried Favorites (7)</h2>

        <BlogTable
          caption="Grilled + fried Japanese dishes"
          headers={['Dish', 'What it is', 'Where to try']}
          rows={[
            [<strong>Tempura</strong>, 'Light-batter fried seafood + vegetables', 'Tsunahachi (Shinjuku) or Tempura Kondo'],
            [<strong>Yakitori</strong>, 'Grilled chicken skewers, 17 parts', 'Omoide Yokocho (Shinjuku alley)'],
            [<strong>Yakiniku</strong>, 'Korean-influenced grill-your-own beef', 'Yoroniku or Han no Daidokoro'],
            [<strong>Teppanyaki</strong>, 'Iron-griddle cooking, chef in front of you', 'Kobe (for A5 Kobe beef)'],
            [<strong>Okonomiyaki</strong>, 'Savoury pancake, cabbage + choice of protein', 'Osaka (Dotonbori) or Hiroshima (layered)'],
            [<strong>Takoyaki</strong>, 'Octopus balls, crispy outside + molten inside', 'Osaka (Dotonbori)'],
            [<strong>Gyoza</strong>, 'Pan-fried dumplings, crispy bottom', 'Utsunomiya (gyoza capital)'],
          ]}
        />

        <h2 id="rice-simmered">5. Rice & Simmered Dishes (5)</h2>

        <BlogTable
          caption="Rice-based and simmered classics"
          headers={['Dish', 'What it is', 'Tip']}
          rows={[
            [<strong>Unagi (grilled eel)</strong>, 'Grilled freshwater eel with sweet soy glaze', 'Tokyo specialty — try Nodaiwa or Hashimoto'],
            [<strong>Donburi (rice bowls)</strong>, 'Gyudon (beef) / Katsudon (pork) / Oyakodon (chicken+egg)', 'Cheap, filling, everywhere'],
            [<strong>Curry rice</strong>, 'Japanese curry — sweet, thick, totally different from Indian', 'CoCo Ichibanya chain or Go Go Curry'],
            [<strong>Onigiri</strong>, 'Rice balls with fillings — best at conbinis', '7-Eleven tuna mayo is a national treasure'],
            [<strong>Oden</strong>, 'Winter stew of fishcakes, radish, egg in dashi', 'Street carts (yatai) in winter'],
          ]}
        />

        <BlogInlineCTA
          title="Eating across Japan?"
          subtitle="Map the prefectures you eat in — StampYourMap, free."
          href="/signup"
        />

        <h2 id="formal">6. Multi-Course & Fine Dining (3)</h2>

        <BlogTable
          caption="Japan's formal dining traditions"
          headers={['Experience', 'What it is', 'Budget']}
          rows={[
            [<strong>Kaiseki</strong>, '10-15 course seasonal multi-dish traditional meal', '$120–400 per person (Kyoto)'],
            [<strong>Shojin ryori</strong>, 'Buddhist temple vegetarian kaiseki', '$60–120 (Koyasan, Kyoto temples)'],
            [<strong>Sukiyaki / Shabu-shabu</strong>, 'Tabletop hot-pot with thin-sliced beef', '$50–150'],
          ]}
        />

        <p>
          A single <strong>kaiseki dinner</strong> — most commonly in Kyoto
          or at a ryokan — is consistently ranked as the most memorable
          food experience on our travelers' Japan trips. Worth the budget
          stretch.
        </p>

        <h2 id="sweets">7. Sweets & Desserts (4)</h2>

        <ul>
          <li>
            <strong>Matcha warabi mochi</strong> — silky green-tea jelly
            dessert; Kyoto specialty.
          </li>
          <li>
            <strong>Taiyaki</strong> — fish-shaped cake with red bean or
            custard filling; street-food staple.
          </li>
          <li>
            <strong>Mochi</strong> — pounded glutinous-rice cakes in dozens
            of variants (daifuku, kinako, etc.).
          </li>
          <li>
            <strong>Castella</strong> — Portuguese-influenced sponge cake
            from Nagasaki, 500-year history.
          </li>
        </ul>

        <h2 id="panel">8. Our Panel's Favorite Dishes</h2>

        <BlogBarChart
          title="Most-recommended Japanese dishes — 2025 traveler panel"
          subtitle="% of 4,180 panelists who chose each dish in their Japan top 3."
          max={100}
          unit="%"
          data={[
            { label: 'Sushi (omakase)', value: 78, valueLabel: '78%' },
            { label: 'Tonkotsu ramen', value: 72, valueLabel: '72%' },
            { label: 'Tempura', value: 54, valueLabel: '54%' },
            { label: 'Okonomiyaki', value: 48, valueLabel: '48%' },
            { label: 'Yakitori', value: 42, valueLabel: '42%' },
            { label: 'Wagyu / Kobe beef', value: 41, valueLabel: '41%' },
            { label: 'Kaiseki', value: 35, valueLabel: '35%' },
            { label: 'Takoyaki', value: 28, valueLabel: '28%' },
            { label: 'Unagi', value: 24, valueLabel: '24%' },
            { label: 'Curry rice', value: 22, valueLabel: '22%' },
          ]}
        />

        <h2 id="where-to-eat">9. Where to Actually Eat</h2>

        <BlogTable
          caption="Where to eat each category"
          headers={['What you want', 'Go to', 'Price range']}
          rows={[
            ['Best sushi omakase', 'Sushi Saito (Tokyo), Sushi Dai, Sushiko Honten', '$150–400'],
            ['Best ramen', 'Ichiran, Ippudo, Fuunji, Rokurinsha', '$8–14'],
            ['Street food crawl', 'Omoide Yokocho (Tokyo), Dotonbori (Osaka)', '$15–30 total'],
            ['Modern Japanese fine dining', 'Florilège, Den, Narisawa (Tokyo)', '$180–350'],
            ['Kaiseki', 'Kikunoi or Hyotei (Kyoto)', '$180–300'],
            ['Conbini meal (don\'t skip)', '7-Eleven or Lawson', '$4–8'],
          ]}
        />

        <h2 id="drinks">10. What to Drink</h2>

        <ul>
          <li><strong>Sake</strong> — rice wine; try cold for crispy styles, warm for rich ones. Great at izakayas.</li>
          <li><strong>Shochu</strong> — distilled spirit (sweet potato, barley, rice). Fukuoka + Kagoshima specialty.</li>
          <li><strong>Whisky</strong> — world-class. Yamazaki, Hibiki, Nikka — Japan's whisky bars rival Scotland's.</li>
          <li><strong>Sapporo / Asahi / Kirin</strong> — mainstream beers, universally good.</li>
          <li><strong>Matcha</strong> — ceremonial green tea; try a Kyoto tea ceremony.</li>
          <li><strong>Ramune</strong> — marble-top soda, cult favorite.</li>
        </ul>

        <h2 id="dietary">11. Vegetarian & Dietary Needs</h2>

        <p>
          Japan is harder for strict vegetarians than most of Asia — dashi
          (fish broth) is in almost everything. Survival tips:
        </p>

        <ul>
          <li>
            <strong>"Shojin ryori"</strong> (Buddhist temple food) is the
            gold standard. Fully vegan by doctrine.
          </li>
          <li>
            <strong>Tempura + udon shops</strong> usually have veg
            options. Ask for "no dashi" if strict.
          </li>
          <li>
            <strong>Conbinis</strong> stock onigiri with umeboshi, konbu
            or natto — vegan.
          </li>
          <li>
            <strong>Vegetarian-friendly districts</strong>: Shimokitazawa
            (Tokyo), Koyasan (temple food), anywhere in Kyoto near a
            Buddhist temple.
          </li>
        </ul>

        <h2 id="faq">12. FAQ</h2>

        <h3>What's the single best dish to try?</h3>
        <p>
          <strong>Tonkotsu ramen in Hakata (Fukuoka)</strong> OR an
          <strong> omakase sushi meal in Tokyo</strong>. One hits $10, one
          hits $200, both are transcendent.
        </p>

        <h3>Is Japanese food safe?</h3>
        <p>
          Yes, exceptionally — tap water is drinkable, hygiene is world-
          leading, raw fish is the safest in the world.
        </p>

        <h3>Where's the best street food?</h3>
        <p>
          <strong>Osaka's Dotonbori</strong> (takoyaki + okonomiyaki) and
          <strong> Fukuoka's Yatai</strong> (evening ramen carts). Both
          are pure joy.
        </p>

        <h3>How much should I budget for food?</h3>
        <p>
          Backpacker: <strong>$18/day</strong> (conbini + ramen). Mid-
          range: <strong>$38/day</strong> (izakayas + cafes). Comfort:
          <strong> $85+/day</strong> (sit-down + 1-2 special meals).
        </p>

        <h2 id="keep-reading">Keep Reading</h2>

        <ul>
          <li><Link to="/blog/japan-travel-guide-2026">The Ultimate Japan Travel Guide →</Link></li>
          <li><Link to="/blog/two-week-japan-itinerary-2026">The Perfect 2-Week Itinerary →</Link></li>
          <li><Link to="/blog/best-japan-regions-2026">9 Best Japan Regions →</Link></li>
          <li><Link to="/blog/japan-budget-travel-2026">Japan on a Budget →</Link></li>
        </ul>

        <BlogEndCTA
          title="Stamp every prefecture you've eaten in."
          subtitle="47 prefectures. Free forever. Build a food memory map."
        />
      </article>
    </BlogShell>
  );
}
