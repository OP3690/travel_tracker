import React from 'react';
import { Link } from 'react-router-dom';
import { BlogShell, useBlogSEO, useRevealOnScroll } from '../BlogLayout';
import { BlogTable, BlogBarChart, BlogStatGrid, BlogInlineCTA, BlogEndCTA } from '../BlogComponents';
import { getPostBySlug } from '../posts';

const SLUG = 'vietnam-budget-travel-2026';

export default function VietnamBudgetTravel2026() {
  const post = getPostBySlug(SLUG);
  useBlogSEO({
    title: `${post.title} | StampYourMap Blog`,
    description: post.description,
    url: `/blog/${SLUG}`,
    image: post.ogImage,
    datePublished: post.datePublished,
    keywords: 'vietnam budget 2026, vietnam daily cost, is vietnam cheap, vietnam backpacking, reunification express, vietnam 2 weeks cost',
  });
  useRevealOnScroll();

  return (
    <BlogShell>
      <article className="blog-article">
        <div className="blog-breadcrumbs"><Link to="/">Home</Link> / <Link to="/blog">Blog</Link> / <span>Vietnam Budget Guide</span></div>
        <div className="blog-hero">
          <span className="blog-cat-chip">Vietnam · Budget Travel</span>
          <span className="blog-meta-sep">•</span><span>Published April 22, 2026</span>
          <span className="blog-meta-sep">•</span><span>{post.readMinutes} min read</span>
        </div>

        <h1>{post.heroEmoji} Vietnam on a Budget: How to Travel Vietnam for $25, $50 or $100 a Day (2026)</h1>

        <p className="blog-lede">
          Vietnam is Southeast Asia\'s best value destination in 2026 —
          cheaper than Thailand + Philippines with comparable quality.
          Three budget tiers with real 2026 dong prices + the specific
          tactics that make Vietnam near-free at the low end.
        </p>

        <BlogStatGrid stats={[{value:'$25',label:'Backpacker / day'},{value:'$50',label:'Mid-range / day'},{value:'$100',label:'Comfort / day'},{value:'25,500',label:'Dong per USD'}]} />

        <BlogInlineCTA title="Budgeting Vietnam?" subtitle="Stamp each province — free map." href="/signup" />

        <h2 id="tiers">1. Three Tiers (USD)</h2>
        <BlogTable caption="Daily per person" headers={['Category', '$25 (backpack)', '$50 (mid)', '$100 (comfort)']} rows={[
          ['Accommodation', '$8 (hostel)', '$25 (3-star)', '$80 (boutique)'],
          ['Food', '$6 (street food)', '$13 (restaurants)', '$35 (mix + cocktails)'],
          ['Transport', '$3', '$7 (Grab)', '$20 (taxis)'],
          ['Activities', '$5', '$4', '$15'],
          ['Misc', '$2', '$1', '$5'],
          [<strong>Daily</strong>, <strong>$24</strong>, <strong>$50</strong>, <strong>$155</strong>],
        ]} />

        <h2 id="backpacker">2. $25/Day Breakdown</h2>
        <ol>
          <li><strong>Breakfast ($2):</strong> Pho + ca phe sua at a street stall</li>
          <li><strong>Lunch ($2):</strong> Banh mi + sinh to or com tam</li>
          <li><strong>Dinner ($2.50):</strong> Street BBQ or bun cha</li>
          <li><strong>Hostel ($8):</strong> Vietnam Backpackers, Mad Monkey, Flipside</li>
          <li><strong>Transport ($3):</strong> Grab + local buses + motorbike taxi</li>
          <li><strong>Activities ($5):</strong> 1 tour / 2 days (Ha Long cruise is the splurge)</li>
          <li><strong>Beer + snacks ($2.50):</strong> Bia Saigon at $1/bottle</li>
        </ol>

        <h2 id="transport">3. Transport Cost Math</h2>
        <BlogTable caption="Vietnam route options" headers={['Route', 'Flight', 'Train', 'Sleeper Bus']} rows={[
          ['Hanoi → Ho Chi Minh', '$35-90 (2h)', '$45-90 (overnight 33h)', '$30 (brutal 40h)'],
          ['Hanoi → Da Nang/Hoi An', '$30-60 (1h15)', '$35-70 (overnight 16h)', '$20'],
          ['Hanoi → Sapa', '$20 bus (6h)', '$45 overnight soft sleeper', 'N/A'],
          ['Da Nang → HCM', '$25-55 (1h30)', '$30-55 (17h)', '$18'],
        ]} />

        <p>
          <strong>Reunification Express</strong> (SE3 overnight Hanoi↔HCM)
          is a bucket-list experience — 33 hours through rice paddies.
          Or fly for cheaper net-cost after factoring meals + bed.
        </p>

        <BlogInlineCTA title="Stamp each province." subtitle="Free map — 63 provinces." href="/signup" />

        <h2 id="compare">4. Vietnam vs SE Asia</h2>
        <BlogBarChart title="Daily mid-range cost — SE Asia (2026 USD)" max={120} unit=" USD" data={[
          {label:'Vietnam',value:50,valueLabel:'$50'},
          {label:'Cambodia',value:42,valueLabel:'$42'},
          {label:'Philippines',value:50,valueLabel:'$50'},
          {label:'Thailand',value:60,valueLabel:'$60'},
          {label:'Malaysia',value:65,valueLabel:'$65'},
          {label:'Japan',value:120,valueLabel:'$120'},
        ]} />

        <h2 id="prices">5. 2026 Prices</h2>
        <BlogTable caption="Benchmark prices (USD)" headers={['Item', 'Low', 'Typical', 'High']} rows={[
          ['Pho bowl', '$1.50', '$2.50', '$4'],
          ['Banh mi', '$1', '$1.80', '$3'],
          ['Restaurant meal', '$6', '$12', '$25'],
          ['Saigon beer (Bia Saigon)', '$0.70', '$1', '$3'],
          ['Hanoi hostel dorm', '$6', '$9', '$15'],
          ['3-star hotel double', '$22', '$40', '$75'],
          ['Halong Bay cruise (overnight)', '$140', '$200', '$550'],
          ['Hanoi Grab 15-min ride', '$2', '$3.50', '$6'],
          ['HCM → Da Nang flight', '$25', '$45', '$95'],
          ['Vietnam e-visa', '$25', '$25', '$25'],
          ['Motorbike rental/day', '$5', '$8', '$12'],
          ['Suit tailored in Hoi An', '$150', '$280', '$500 (top tier)'],
        ]} />

        <h2 id="saving">6. 10 Saving Tactics</h2>
        <ol>
          <li><strong>Street food over restaurants.</strong> $2.50 pho is better than $12 "tourist pho"</li>
          <li><strong>Grab everywhere</strong> — cheaper + no haggling</li>
          <li><strong>Bia hoi (draft beer)</strong> — $0.25-0.50 glass on street stools</li>
          <li><strong>VietJet + Bamboo Airways flash sales</strong> — Tuesday afternoon releases</li>
          <li><strong>Bai Tu Long Bay</strong> — better + cheaper than main Halong Bay cruises</li>
          <li><strong>Rent scooter in Hoi An / Da Nang</strong> — $5/day vs $20 taxis</li>
          <li><strong>Avoid "tourist menu"</strong> — ask for Vietnamese menu (50% cheaper)</li>
          <li><strong>Central Vietnam is cheaper</strong> than Hanoi + HCM. Spend more time there</li>
          <li><strong>Wise/Revolut card</strong> for zero ATM fees</li>
          <li><strong>Tét avoidance</strong> — late Jan/early Feb, everything closes for 5-7 days</li>
        </ol>

        <h2 id="total">7. 2-Week Trip Cost</h2>
        <BlogTable caption="14-day Vietnam per person (2026 USD)" headers={['Line', 'Backpacker', 'Mid-range', 'Comfort']} rows={[
          ['Daily × 14', '$340', '$700', '$2,170'],
          ['Internal flights', '$80', '$120', '$250'],
          ['Halong cruise', '$150', '$220', '$500'],
          [<strong>Total</strong>, <strong>$570</strong>, <strong>$1,040</strong>, <strong>$2,920</strong>],
        ]} />

        <h2 id="faq">8. FAQ</h2>
        <h3>Cheaper than Thailand?</h3><p>Yes — $10/day less at mid-range.</p>
        <h3>$25/day possible?</h3><p>Yes easily — streets food + hostel + bus.</p>
        <h3>Cheapest month?</h3><p><strong>May-early June</strong> or <strong>September</strong>.</p>
        <h3>Tipping?</h3><p>5-10% at restaurants; not expected at street food.</p>

        <h2 id="keep">Keep Reading</h2>
        <ul>
          <li><Link to="/blog/vietnam-travel-guide-2026">Ultimate Vietnam Guide →</Link></li>
          <li><Link to="/blog/two-week-vietnam-itinerary-2026">2-Week Itinerary →</Link></li>
          <li><Link to="/blog/best-vietnam-destinations-2026">10 Best Destinations →</Link></li>
          <li><Link to="/blog/vietnamese-food-guide-2026">25 Vietnamese Dishes →</Link></li>
        </ul>

        <BlogEndCTA title="Stamp every dollar-well-spent province." subtitle="Free forever. 63 Vietnamese provinces." />
      </article>
    </BlogShell>
  );
}
