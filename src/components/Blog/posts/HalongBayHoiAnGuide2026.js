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
        <h3>Is Halong Bay actually worth the trip?</h3>
        <p>
          <strong>Yes — but only if you book a good-quality cruise in Bai Tu Long Bay (not the crowded Halong Bay zone)</strong>. The UNESCO karst seascape is genuinely extraordinary when seen from the right operator. Budget US$60/day cruises visit overcrowded inner zones with poor water quality; premium cruises (US$180-350/night) visit pristine outer bays with fewer boats.
        </p>
        <h3>Halong Bay or Ninh Binh — which first?</h3>
        <p>
          <strong>Do both if you have time — they are genuinely different experiences</strong>. Halong is the sea + karst cruise experience; Ninh Binh is the river + rice-paddy land version, often called "inland Halong" with 10% the crowds. If forced to pick: Ninh Binh for photography + budget travelers; Halong for the iconic bucket-list cruise.
        </p>
        <h3>How do I pick a reliable Halong cruise operator?</h3>
        <p>
          <strong>Book into Bai Tu Long or Lan Ha Bay (avoid central Halong Bay zone)</strong> — recommended operators: Indochina Junk, Paradise Elegance, Heritage Line, Orchid Cruises, and Emperor Cruises. Premium 5-star cruises US$180-350/night all-inclusive. Check TripAdvisor reviews from the last 6 months; the industry changes fast.
        </p>
        <h3>2 days/1 night or 3 days/2 nights?</h3>
        <p>
          <strong>3 days/2 nights is significantly better</strong> — the 2-day cruise feels rushed (arrive late afternoon, cruise, sleep, wake, depart by 10am) while 3-day cruises include kayaking, cave visits, and actual time to relax. Cost difference is only 40-60% more but experience is 2x. Budget 3D/2N at US$350-700 all-in on a quality operator.
        </p>
        <h3>Hoi An tailors — are they reliable for suits?</h3>
        <p>
          <strong>Stick to top-tier tailors for formal wear</strong> — Yaly Couture (oldest + most experienced, 3-day turnaround, suits US$200-400), Bebe (silk specialist), and A Dong Silk. Budget tailors at US$40-80 are fine for simple shirts, dresses, and casual suits — but not for formal wool suits or complex tailoring.
        </p>
        <h3>How many days do I need in Hoi An?</h3>
        <p>
          <strong>3-4 days minimum</strong> — day 1 for arrival + old town exploration, day 2 for cooking class + beach, day 3 for My Son Sanctuary + lantern evening, day 4 for tailor fittings + Thu Bon River sunset. Less than 3 days misses the lantern-lit evening magic and rushes tailoring turnaround.
        </p>
        <h3>When is the best time to visit both?</h3>
        <p>
          <strong>March-April is optimum for both</strong> — Halong has clear visibility + calm seas, Hoi An has dry weather + manageable temperatures (26-30°C). Avoid October-November (Hoi An floods annually, annual typhoon risk) and July-August (hot + humid + domestic crowds). February is cool for Halong but occasionally foggy.
        </p>
        <h3>How do I get between Halong Bay and Hoi An?</h3>
        <p>
          <strong>Fly — Hanoi to Danang on Vietjet/Bamboo Airways (70 min, US$30-60)</strong> then 45-min taxi/shuttle to Hoi An. Overnight trains (Hanoi → Danang, 17h) and buses are possible but waste a travel day. Budget travelers can take the SE1/SE3 soft-sleeper train for US$30-60 as an experience if time permits.
        </p>
        <h3>Cost breakdown for a 5-day Halong + Hoi An add-on?</h3>
        <p>
          <strong>Budget: US$400-550</strong> (mid-range Halong cruise US$200 + Hoi An homestay + meals + transport). <strong>Mid-range: US$700-1,100</strong>. <strong>Luxury: US$1,500-3,500+</strong> (Emperor Cruise Halong + Four Seasons Nam Hai Hoi An). Internal flight US$40-80, Hoi An hotels US$25-120/night.
        </p>
        <h3>What photo spots cannot be missed in Hoi An?</h3>
        <p>
          <strong>Japanese Covered Bridge (cliché but essential), Thu Bon River at sunset, lantern-lit Old Town streets after 7pm, tailor shops with raw fabric walls, An Bang Beach fishing boats at sunrise</strong>. For Halong: Tí Tốp Island viewpoint, Sung Sot Cave, kayaking through Luon Cave arch, and sunset from ship deck.
        </p>
        <h3>Is Halong Bay family-friendly?</h3>
        <p>
          <strong>Yes for ages 7+</strong> — kids enjoy kayaking, swimming off the boat, cave tours, and cooking classes on-ship. Premium operators (Paradise Elegance, Heritage Line) have family cabins. Under 7 can get bored by cruise pace; opt for day tours from Hanoi or base in Hoi An instead.
        </p>
        <h3>Luxury vs budget — what{"'"}s the real difference?</h3>
        <p>
          <strong>Budget cruises (US$60-90/night): shared bathrooms, inner-bay routes, meal quality poor, 20+ boats clustered</strong>. Mid-range (US$120-180): private bathroom, decent food, Bai Tu Long access. Luxury (US$200-350+): full-service butler, private balcony, outer-bay anchorages with 2-3 other boats max, gourmet meals. Jump mid-range minimum.
        </p>
        <h3>Cooking class recommendations in Hoi An?</h3>
        <p>
          <strong>Red Bridge Cooking School (US$40, half-day, includes market + river ride), Morning Glory (US$35, urban cooking class by celeb chef Ms. Vy), Tra Que Village Farm (US$30, organic vegetable village + cooking in a rural setting)</strong>. Book 1-2 days ahead. Best for learning: banh xeo, pho, spring rolls, cao lầu.
        </p>
        <h3>Are there sustainability concerns for Halong?</h3>
        <p>
          <strong>Yes — Halong Bay is genuinely at risk from over-tourism, plastic waste, and poor-quality cruise operators</strong>. Premium operators (Indochina Junk, Paradise, Heritage) enforce strict no-plastic + wastewater-treatment rules. Bai Tu Long Bay cruises are the lower-impact choice. Avoid cheap day-trips from Hanoi — they do the most damage to the ecosystem.
        </p>
        <h3>When should I book everything?</h3>
        <p>
          <strong>Halong cruise 2-4 weeks ahead in shoulder season, 4-8 weeks in peak (March-April, October-November)</strong>. Hoi An tailor fittings book at walk-in. Hoi An hotels 4-6 weeks ahead. Internal flight Hanoi-Danang 2-6 weeks ahead (prices do not drop closer). Luxury Halong cruises + Four Seasons Nam Hai: 3-6 months.
        </p>

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
