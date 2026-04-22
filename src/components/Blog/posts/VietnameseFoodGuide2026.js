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
        <h3>What is the single best Vietnamese dish to try first?</h3>
        <p>
          <strong>Pho at Pho Thin on Lo Duc Street in Hanoi</strong> (since 1979, original stir-fried beef pho, 70,000 VND / US$2.80) — the single most iconic Vietnamese meal experience. Runners-up: bún chả at Bún Chả Hương Liên (where Obama + Bourdain ate), bánh mì at Bánh Mì Phượng in Hoi An, and cao lầu at Morning Glory Hoi An.
        </p>
        <h3>Which city is the best for food overall?</h3>
        <p>
          <strong>Hoi An for variety and cooking classes</strong> (cao lầu, white rose, banh xeo, and excellent teaching), <strong>Hanoi for pho + bún chả + cha ca</strong> (northern classics at their source), and <strong>HCMC for southern variety + international crossover</strong>. Hue for imperial cuisine (bún bò Huế). Each region has genuinely distinct flavors.
        </p>
        <h3>How vegetarian-friendly is Vietnamese food?</h3>
        <p>
          <strong>Moderate — Vietnam has a strong Buddhist vegetarian tradition</strong> where "chay" = vegetarian. Many pho places serve pho chay (mushroom + tofu), and dedicated chay restaurants exist in every city. Hoi An, Hue, and HCMC all have excellent dedicated vegan/vegetarian restaurants (Minh Hien in Hue is legendary). Be cautious: nuoc mam (fish sauce) is in many default dishes; ask "khong có nước mắm" for no fish sauce.
        </p>
        <h3>Are allergies and dietary restrictions handled well?</h3>
        <p>
          <strong>Peanut + shellfish allergies need caution</strong> — peanuts are in many dishes (pho garnish, spring rolls dip, satay), and fish sauce / shrimp paste in many sauces. Write allergies in Vietnamese on a card (show at restaurants) and stick to mid-range places where English is better. Gluten-free is easier: rice noodles are the default base.
        </p>
        <h3>Where do I find the best street food?</h3>
        <p>
          <strong>Hanoi Old Quarter (Hang Bac, Hang Buom, Cha Ca streets) and HCMC{"'"}s District 4 (Vĩnh Khánh Street seafood alley)</strong>, plus Hoi An{"'"}s Phan Chu Trinh street and Hue{"'"}s Đông Ba Market. Eat on tiny plastic stools at busy stalls — the busier the turnover, the fresher the food. Avoid dead-quiet stalls with pre-cooked pots sitting out.
        </p>
        <h3>Is tipping expected at Vietnamese restaurants?</h3>
        <p>
          <strong>Not traditionally — tipping is not expected at street food or casual places</strong>. At nicer restaurants and tourist-focused eateries, 5-10% is increasingly appreciated. Round up the bill to the nearest 10,000 or 50,000 VND. Do not leave cash at street stalls; it creates confusion. Tour cooking-class guides welcome 100,000-200,000 VND tips (US$4-8).
        </p>
        <h3>What regional specialties absolutely cannot be missed?</h3>
        <p>
          <strong>North: pho bò + chả cá Lã Vọng + bún chả + bánh cuốn. Central: cao lầu + white rose + mì Quảng + bún bò Huế. South: hủ tiếu + bánh xèo + canh chua + caramelized pork belly</strong>. Each region has a unique approach to the same base ingredients (rice, herbs, fish sauce, pork).
        </p>
        <h3>How should I approach pho properly?</h3>
        <p>
          <strong>Add lime juice, torn herbs (Thai basil, cilantro, culantro), chili, bean sprouts, and a squeeze of hoisin or sriracha</strong> — Vietnamese customize each bowl to taste. Eat within 5 minutes of arrival: pho wilts fast as noodles soak broth. Slurping is normal. Hanoi pho is simpler + clearer; Saigon pho is sweeter + herbier.
        </p>
        <h3>Is street food safety a real concern?</h3>
        <p>
          <strong>Generally very safe — Vietnamese street food has high turnover meaning fresh ingredients</strong>, and the cuisine relies on heat + fermentation for safety. Rules of thumb: eat where locals eat (crowded stalls), avoid pre-cooked meats sitting in warmers, peel fruit yourself. First 3-4 days, ease in; carry Imodium + oral rehydration for safety.
        </p>
        <h3>Markets vs restaurants — what{"'"}s the best strategy?</h3>
        <p>
          <strong>Breakfast + lunch at markets + street stalls (US$1-3/meal), dinner at mid-range restaurants for atmosphere (US$6-15)</strong>. The best Vietnamese food is genuinely on the street, not in restaurants. Cooking classes bridge both — you learn market shopping + restaurant techniques. Avoid the "tourist restaurant" trap with English-only menus and high prices.
        </p>
        <h3>When is seasonal specialty time?</h3>
        <p>
          <strong>Lunar New Year (Tet, late Jan-Feb): bánh chưng sticky-rice cakes, mứt candied fruit. Summer (May-Aug): bún mắm with prawns, fresh fish sauces. Autumn: mooncakes for Mid-Autumn Festival. Year-round: pho, spring rolls, fresh herbs</strong>. Northern winter (Dec-Feb) brings hot pot + chả cá popularity.
        </p>
        <h3>Food budget per day — realistic numbers?</h3>
        <p>
          <strong>Backpacker US$5-8/day</strong> (3 street meals + 2 cafés), <strong>mid-range US$15-25/day</strong> (mix of street + restaurant), <strong>comfort US$35-60/day</strong> (fine dining + cocktails). Local beer (Bia Saigon, Hanoi Bia Hoi) is US$0.50-1.50; imported beers + cocktails push US$4-8. Excellent Vietnamese coffee is US$1-2.
        </p>
        <h3>Are cooking classes worth the money?</h3>
        <p>
          <strong>Absolutely yes in Hoi An</strong> — Red Bridge Cooking School, Morning Glory, and Tra Que Village classes (US$30-55) include market tour + 4-5 dishes + eating lunch. Hanoi Cooking Centre teaches pho from scratch. HCMC{"'"}s Vietnam Cookery Centre covers southern cuisine. The hands-on market shopping is as valuable as the cooking itself.
        </p>
        <h3>How safe is the ice in drinks?</h3>
        <p>
          <strong>Usually safe at established cafés and restaurants (ice made from filtered water in factory blocks with a hole in the middle)</strong>. Be suspicious of irregular-shaped ice chips at random street stalls. Bottled water-based drinks (bubble tea, cà phê sữa đá) are almost always safe. When uncertain, order "không đá" (no ice).
        </p>
        <h3>Best coffee culture in Vietnam?</h3>
        <p>
          <strong>Vietnam is the world{"'"}s 2nd-largest coffee producer</strong> and has a unique coffee culture — cà phê sữa đá (strong drip coffee with condensed milk + ice), egg coffee (Giảng in Hanoi invented it), coconut coffee (Cộng Cà Phê chain), and salt coffee (Hue). US$1-3 per coffee, dense + bold, often 3x stronger than Western coffee.
        </p>

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
