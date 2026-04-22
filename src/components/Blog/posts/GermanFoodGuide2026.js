import React from 'react';
import { Link } from 'react-router-dom';
import { BlogShell, useBlogSEO, useRevealOnScroll } from '../BlogLayout';
import { BlogTable, BlogBarChart, BlogCallout, BlogStatGrid, BlogInlineCTA, BlogEndCTA } from '../BlogComponents';
import { BlogGermanyMap } from '../BlogGermanyMap';
import { getPostBySlug } from '../posts';

const SLUG = 'german-food-guide-2026';

export default function GermanFoodGuide2026() {
  const post = getPostBySlug(SLUG);
  useBlogSEO({
    title: `${post.title} | StampYourMap Blog`,
    description: post.description,
    url: `/blog/${SLUG}`,
    image: post.ogImage,
    datePublished: post.datePublished,
    keywords: 'german food guide, schnitzel, currywurst, sauerbraten, spatzle, german beer, oktoberfest beer, german bakery',
  });
  useRevealOnScroll();

  return (
    <BlogShell>
      <article className="blog-article">
        <div className="blog-breadcrumbs">
          <Link to="/">Home</Link> / <Link to="/blog">Blog</Link> / <span>German Food Guide</span>
        </div>
        <div className="blog-hero">
          <span className="blog-cat-chip">Germany · Food</span>
          <span className="blog-meta-sep">•</span><span>Published April 22, 2026</span>
          <span className="blog-meta-sep">•</span><span>{post.readMinutes} min read</span>
        </div>

        <h1>{post.heroEmoji} German Food Guide: 20 Dishes You Must Try in Germany — by Region (2026)</h1>

        <p className="blog-lede">
          German food is better than its reputation — dense, meat-heavy
          winters yes, but also fresh Bavarian beer gardens, Berlin
          street food evolving into Michelin territory, and regional
          cuisines as distinct as Italy\'s. 20 must-try dishes + where.
        </p>

        <BlogStatGrid stats={[
          { value: '20', label: 'Dishes covered' },
          { value: '1,500+', label: 'Breweries' },
          { value: 'April 23', label: 'Beer Purity Law (1516)' },
          { value: '~€4', label: 'Typical brezn' },
        ]} />

        <BlogInlineCTA title="Food-touring Germany?" subtitle="Stamp each state — free map." href="/signup" />

        <h2 id="map">1. Germany's Food Regions</h2>
        <BlogGermanyMap
          regionIds={['by', 'be', 'bw', 'nw', 'rp']}
          title="5 flagship food states"
          subtitle="Bavaria (brezn + schnitzel) · Berlin (currywurst) · Baden-Württemberg (spätzle) · NRW (Kölsch) · Rhineland (sauerbraten)"
        />

        <h2 id="iconic">2. 6 Non-Negotiable German Foods</h2>
        <BlogTable
          caption="Iconic German canon"
          headers={['#', 'Dish', 'What it is', 'Where']}
          rows={[
            ['1', <strong>Schnitzel Wiener Art</strong>, 'Breaded veal/pork cutlet pan-fried', 'Any traditional restaurant'],
            ['2', <strong>Currywurst</strong>, 'Sliced sausage + curry ketchup. Berlin invention, 1949', 'Curry 36 (Berlin)'],
            ['3', <strong>Brezn (Bavarian Pretzel)</strong>, 'Soft salted twist. Warm. With sweet mustard + weisswurst', 'Munich beer garden'],
            ['4', <strong>Bratwurst</strong>, 'Grilled sausage — regional variants: Nuremberg, Thuringian', 'Christmas markets everywhere'],
            ['5', <strong>Sauerbraten</strong>, 'Vinegar-marinated roast beef + red cabbage + potato dumplings', 'Rhineland'],
            ['6', <strong>Black Forest Cake</strong>, 'Cherry + chocolate + whipped cream layer cake', 'Black Forest region bakeries'],
          ]}
        />

        <h2 id="bavaria">3. Bavaria (4)</h2>
        <ul>
          <li><strong>Weisswurst</strong> — white veal sausage, eaten before noon with sweet mustard + brezn</li>
          <li><strong>Schweinshaxe</strong> — roast pork knuckle. Size of your forearm</li>
          <li><strong>Obatzda</strong> — Camembert-butter-beer cheese dip, served with brezn</li>
          <li><strong>Spätzle / Käsespätzle</strong> — egg noodles, often baked with cheese + onions</li>
        </ul>

        <h2 id="northern">4. Northern + Saxony (4)</h2>
        <ul>
          <li><strong>Labskaus</strong> — Hamburg sailor stew: corned beef + beetroot + potato + herring</li>
          <li><strong>Fischbrötchen</strong> — Hamburg port-side fish sandwich</li>
          <li><strong>Königsberger Klopse</strong> — meatballs in white caper sauce</li>
          <li><strong>Dresdner Stollen</strong> — Christmas fruit bread from Dresden</li>
        </ul>

        <h2 id="rhine">5. Rhine + West (3)</h2>
        <ul>
          <li><strong>Flammkuchen</strong> — Alsace-style thin crust "pizza" with crème fraîche + onions + bacon</li>
          <li><strong>Kölsch beer + Halve Hahn</strong> — rye roll with cheese; Cologne pub staple</li>
          <li><strong>Reibekuchen</strong> — potato pancakes with applesauce</li>
        </ul>

        <h2 id="sweets">6. Sweets + Bakery (3)</h2>
        <ul>
          <li><strong>Lebkuchen</strong> — spiced gingerbread, Nuremberg specialty, year-round but peak at Christmas markets</li>
          <li><strong>Berliner (Pfannkuchen)</strong> — jelly-filled doughnut</li>
          <li><strong>Apfelstrudel</strong> — apple strudel with vanilla ice cream</li>
        </ul>

        <BlogInlineCTA title="Stamp each food region." subtitle="Free map — all 16 states." href="/signup" />

        <h2 id="beer">7. German Beer — Essentials</h2>
        <BlogTable
          caption="German beer styles + regions"
          headers={['Style', 'Region', 'Character']}
          rows={[
            [<strong>Helles</strong>, 'Bavaria', 'Pale lager, crisp + malty'],
            [<strong>Weissbier / Hefeweizen</strong>, 'Bavaria', 'Wheat beer, cloudy, banana/clove'],
            [<strong>Pilsner</strong>, 'Nationwide', 'Bitter-hoppy pale lager'],
            [<strong>Kölsch</strong>, 'Cologne only', 'Light + golden, served in 200ml glasses'],
            [<strong>Altbier</strong>, 'Düsseldorf only', 'Top-fermented dark + malty'],
            [<strong>Rauchbier</strong>, 'Bamberg', 'Smoked-malt — tastes like bacon'],
            [<strong>Berliner Weisse</strong>, 'Berlin', 'Sour wheat beer served with syrup'],
            [<strong>Doppelbock</strong>, 'Bavaria', 'Strong dark lager, 7%+'],
          ]}
        />

        <BlogCallout title="The Purity Law (Reinheitsgebot)">
          <p>
            Bavaria passed the Reinheitsgebot in 1516 — still in force:
            German beer can only contain water, barley, hops + yeast.
            That's why German beer has no preservatives, corn, rice.
            Try a fresh regional pils + a weissbier in Munich to taste
            what the law protects.
          </p>
        </BlogCallout>

        <h2 id="panel">8. Panel Favorites</h2>
        <BlogBarChart
          title="Most-recommended German experiences — 2025 panel"
          max={100} unit="%"
          data={[
            { label: 'Beer hall in Munich', value: 78, valueLabel: '78%' },
            { label: 'Bavarian pretzel + weisswurst', value: 62, valueLabel: '62%' },
            { label: 'Christmas market glühwein', value: 58, valueLabel: '58%' },
            { label: 'Currywurst in Berlin', value: 48, valueLabel: '48%' },
            { label: 'Schnitzel dinner', value: 44, valueLabel: '44%' },
            { label: 'Doner kebab (Berlin)', value: 38, valueLabel: '38%' },
            { label: 'Black Forest cake', value: 32, valueLabel: '32%' },
            { label: 'Spätzle', value: 28, valueLabel: '28%' },
          ]}
        />

        <h2 id="where">9. Where to Eat</h2>
        <BlogTable
          caption="Where to find each signature"
          headers={['What you want', 'Where', 'Cost']}
          rows={[
            ['Best beer hall', 'Hofbräuhaus (Munich) or Augustiner-Keller', '€8-16/pint meal'],
            ['Best currywurst', 'Curry 36 (Berlin Mehringdamm)', '€4'],
            ['Street döner', 'Mustafas Gemüse Kebap (Berlin)', '€7'],
            ['Best beer garden', 'Chinesischer Turm (Munich English Garden)', 'Self-service'],
            ['Christmas market', 'Nuremberg or Dresden', '€3-8 per stall'],
            ['Michelin fine dining', 'Tim Raue (Berlin), Schwarzwaldstube (Black Forest)', '€180-350'],
          ]}
        />

        <h2 id="faq">10. FAQ</h2>
        <h3>Best dish to try first?</h3><p><strong>Schnitzel + pils at a Munich beer hall</strong>.</p>
        <h3>Vegetarian-friendly?</h3><p>Improving — especially Berlin. Spätzle + flammkuchen veg options + kebab stands everywhere.</p>
        <h3>Food budget?</h3><p>Backpacker: <strong>€18/day</strong>. Mid: <strong>€35/day</strong>. Comfort: <strong>€80+/day</strong>.</p>

        <h2 id="keep">Keep Reading</h2>
        <ul>
          <li><Link to="/blog/germany-travel-guide-2026">Ultimate Germany Guide →</Link></li>
          <li><Link to="/blog/two-week-germany-itinerary-2026">2-Week Itinerary →</Link></li>
          <li><Link to="/blog/germany-christmas-markets-2026">Christmas Markets →</Link></li>
        </ul>

        <BlogEndCTA
          title="Stamp every state you eat in."
          subtitle="Free forever. 16 German states."
        />
      </article>
    </BlogShell>
  );
}
