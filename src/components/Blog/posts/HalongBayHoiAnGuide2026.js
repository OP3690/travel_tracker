import React from 'react';
import { Link } from 'react-router-dom';
import { BlogShell, useBlogSEO, useRevealOnScroll } from '../BlogLayout';
import { BlogTable, BlogBarChart, BlogCallout, BlogStatGrid, BlogInlineCTA, BlogEndCTA } from '../BlogComponents';
import { BlogVietnamMap } from '../BlogVietnamMap';
import { getPostBySlug } from '../posts';

const SLUG = 'halong-bay-hoi-an-guide-2026';

export default function HalongBayHoiAnGuide2026() {
  const post = getPostBySlug(SLUG);
  useBlogSEO({
    title: `${post.title} | StampYourMap Blog`,
    description: post.description,
    url: `/blog/${SLUG}`,
    image: post.ogImage,
    datePublished: post.datePublished,
    keywords: 'halong bay cruise, bai tu long bay, hoi an guide, hoi an tailoring, hoi an lanterns, hoi an vs hue',
  });
  useRevealOnScroll();

  return (
    <BlogShell>
      <article className="blog-article">
        <div className="blog-breadcrumbs"><Link to="/">Home</Link> / <Link to="/blog">Blog</Link> / <span>Halong Bay & Hoi An</span></div>
        <div className="blog-hero">
          <span className="blog-cat-chip">Vietnam · Halong + Hoi An</span>
          <span className="blog-meta-sep">•</span><span>Published April 22, 2026</span>
          <span className="blog-meta-sep">•</span><span>{post.readMinutes} min read</span>
        </div>

        <h1>{post.heroEmoji} Halong Bay & Hoi An Complete Guide 2026: Vietnam's Two UNESCO Icons</h1>

        <p className="blog-lede">
          Halong Bay + Hoi An are Vietnam's two most-visited UNESCO
          sites — one is a karst-studded bay best seen by overnight
          cruise, the other is a 15th-century trading port frozen in
          amber with 1,500 tailors + lantern-lit evenings.
        </p>

        <BlogStatGrid stats={[{value:'1,600',label:'Halong Bay islands'},{value:'15th c',label:'Hoi An founded'},{value:'2',label:'UNESCO sites'},{value:'4 days',label:'Combined minimum'}]} />

        <BlogInlineCTA title="Visiting both?" subtitle="Stamp Quang Ninh + Quang Nam — free map." href="/signup" />

        <h2 id="map">1. Where They Are</h2>
        <BlogVietnamMap regionIds={['quangninh', 'quangnam']} title="Halong (north) + Hoi An (central)" subtitle="Quang Ninh + Quang Nam provinces." />

        <h2 id="halong">2. Halong Bay — 7 Key Decisions</h2>

        <h3>🛳️ Decision 1: Which bay?</h3>
        <p>
          There are <strong>3 adjacent bays</strong> with the same
          karst scenery:
        </p>
        <BlogTable caption="Halong Bay options" headers={['Bay', 'Crowd level', 'Access', 'Recommendation']} rows={[
          [<strong>Halong Bay</strong>, '🔴 Heavy — 500+ boats daily', 'Halong City / Tuan Chau', '❌ Too crowded'],
          [<strong>Bai Tu Long Bay</strong>, '🟡 Moderate', 'Cai Rong / Van Don', '✅ Our pick'],
          [<strong>Lan Ha Bay</strong>, '🟢 Lightest', 'Cat Ba Island', '✅ For Cat Ba base + kayaking'],
        ]} />

        <h3>🛏️ Decision 2: Day-trip or Overnight?</h3>
        <p>
          <strong>Overnight cruise is mandatory.</strong> Day-trips miss
          everything memorable (sunset, morning mist, kayaking, cave
          dinner). Minimum 1 night / 2 days.
        </p>

        <h3>⭐ Decision 3: Which Operator?</h3>
        <BlogTable caption="Reputable cruise operators (2026 USD)" headers={['Operator', 'Style', 'Per-person / night']} rows={[
          ['Indochina Junk', 'Bai Tu Long, small boats', '$160-260'],
          ['Bhaya Cruises', 'Halong main, larger boats', '$180-320'],
          ['Paradise Elegance', 'Luxury main Halong', '$350-550'],
          ['Orchid Cruises', 'Mid-range Halong', '$200-320'],
          ['Cat Ba Sailing', 'Lan Ha Bay, smaller', '$140-220'],
        ]} />

        <BlogCallout title="Avoid the bottom-tier cruises">
          <p>
            $80-120/night "Halong Bay cruises" are genuinely not worth
            it — poor food, dirty cabins, overcrowding. Spend the extra
            $60 for the $180+/night tier. That's where quality begins.
          </p>
        </BlogCallout>

        <h2 id="hoian">3. Hoi An — Why It's Vietnam's Favorite</h2>

        <p>
          Hoi An is a 15th-century trading port that survived the Vietnam
          War untouched — so its yellow ochre houses, tile roofs + Chinese
          assembly halls are all original. UNESCO-listed since 1999.
        </p>

        <h2 id="hoian-musts">4. Hoi An — 8 Must-Dos</h2>
        <BlogTable caption="Hoi An priorities" headers={['#', 'Experience', 'Notes']} rows={[
          ['1', <strong>Ancient Town walking tour</strong>, '$5 entry — covers 5 heritage houses + Japanese Bridge'],
          ['2', <strong>Order a tailored suit/dress</strong>, '24-hour turnaround; budget $150-300 for quality'],
          ['3', <strong>Cooking class</strong>, '$30-50; morning market tour + class'],
          ['4', <strong>Lantern night market</strong>, 'Full moon nights are the MAGIC ones'],
          ['5', <strong>Banh Mi Phuong</strong>, 'Bourdain\'s favorite banh mi'],
          ['6', <strong>Bike to An Bang Beach</strong>, '10 min bike ride'],
          ['7', <strong>My Son Cham Ruins day-trip</strong>, '1 hour drive; Hindu-era pre-Angkor ruins'],
          ['8', <strong>Coconut basket boat ride</strong>, 'Cam Thanh village; quirky cultural experience'],
        ]} />

        <BlogCallout title="Hoi An lantern festival timing">
          <p>
            Every <strong>14th day of the lunar month</strong> (full moon)
            Hoi An turns off electric lights — only silk + paper lanterns
            + candles. One of Vietnam\'s most beautiful evenings. Check
            a lunar calendar + book accordingly.
          </p>
        </BlogCallout>

        <h2 id="tailoring">5. Hoi An Tailoring Guide</h2>
        <p>
          1,500 tailoring shops in town. Quality varies enormously.
        </p>
        <ul>
          <li><strong>Top tier ($250-500 for a suit)</strong>: Yaly Couture, Bebe Tailor, A Dong Silk</li>
          <li><strong>Mid-range ($120-250)</strong>: Kimmy Tailor, Phuong Huy Tailor</li>
          <li><strong>Budget ($60-120)</strong>: Too many to name — quality wildly variable</li>
        </ul>
        <p>
          <strong>Order Day 1, fitting Day 2, pickup Day 3.</strong> Don't
          leave shorter time — alterations always needed.
        </p>

        <BlogInlineCTA title="Visit both icons?" subtitle="Stamp both provinces on your free map." href="/signup" />

        <h2 id="when">6. When to Go</h2>
        <BlogBarChart title="Best months for Halong + Hoi An (2026)" max={100} data={[
          {label:'Jan',value:82,valueLabel:'82'},
          {label:'Feb',value:76,valueLabel:'76 (fog + Tết)'},
          {label:'Mar',value:94,valueLabel:'94 ✓'},
          {label:'Apr',value:96,valueLabel:'96 ✓'},
          {label:'May',value:88,valueLabel:'88'},
          {label:'Jun',value:62,valueLabel:'62 (hot, Hoi An floods)'},
          {label:'Jul',value:54,valueLabel:'54'},
          {label:'Aug',value:52,valueLabel:'52 (typhoon risk)'},
          {label:'Sep',value:68,valueLabel:'68'},
          {label:'Oct',value:58,valueLabel:'58 (Hoi An flooding)'},
          {label:'Nov',value:86,valueLabel:'86'},
          {label:'Dec',value:82,valueLabel:'82'},
        ]} />

        <p>
          <strong>March-April</strong> is optimum for both. Hoi An floods
          October-November (annual; streets become canals — some find
          it charming).
        </p>

        <h2 id="faq">7. FAQ</h2>
        <h3>Halong worth it?</h3><p>Yes — if you book a good cruise in Bai Tu Long.</p>
        <h3>Halong or Ninh Binh?</h3><p>Both if you can. Halong for the sea, Ninh Binh for the rivers + less crowds.</p>
        <h3>Hoi An tailor reliable?</h3><p>Stick to top tier (Yaly, Bebe, A Dong) for suits. Budget tailors fine for simple shirts/dresses.</p>
        <h3>Days needed?</h3><p>Halong: <strong>2 days/1 night</strong>. Hoi An: <strong>3-4 days</strong>.</p>

        <h2 id="keep">Keep Reading</h2>
        <ul>
          <li><Link to="/blog/vietnam-travel-guide-2026">Ultimate Vietnam Guide →</Link></li>
          <li><Link to="/blog/two-week-vietnam-itinerary-2026">2-Week Vietnam Itinerary →</Link></li>
          <li><Link to="/blog/best-vietnam-destinations-2026">10 Best Destinations →</Link></li>
          <li><Link to="/blog/vietnamese-food-guide-2026">25 Vietnamese Dishes →</Link></li>
        </ul>

        <BlogEndCTA title="Stamp Halong + Hoi An on your map." subtitle="Free forever. 63 Vietnamese provinces." />
      </article>
    </BlogShell>
  );
}
