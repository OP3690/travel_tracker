import React from 'react';
import { Link } from 'react-router-dom';
import { BlogShell, useBlogSEO, useRevealOnScroll } from '../BlogLayout';
import { BlogTable, BlogBarChart, BlogStatGrid, BlogInlineCTA, BlogEndCTA } from '../BlogComponents';
import { getPostBySlug } from '../posts';

const SLUG = 'canada-budget-travel-2026';

export default function CanadaBudgetTravel2026() {
  const post = getPostBySlug(SLUG);
  useBlogSEO({
    title: `${post.title} | StampYourMap Blog`,
    description: post.description,
    url: `/blog/${SLUG}`,
    image: post.ogImage,
    datePublished: post.datePublished,
    keywords: 'canada budget 2026, canada daily cost, is canada expensive, via rail vs flight, canada backpacking',
  });
  useRevealOnScroll();

  return (
    <BlogShell>
      <article className="blog-article">
        <div className="blog-breadcrumbs">
          <Link to="/">Home</Link> / <Link to="/blog">Blog</Link> / <span>Canada Budget Guide</span>
        </div>
        <div className="blog-hero">
          <span className="blog-cat-chip">Canada · Budget Travel</span>
          <span className="blog-meta-sep">•</span><span>Published April 22, 2026</span>
          <span className="blog-meta-sep">•</span><span>{post.readMinutes} min read</span>
        </div>

        <h1>{post.heroEmoji} Canada on a Budget: How to Travel Canada for $85, $170 or $340 a Day (2026)</h1>

        <p className="blog-lede">
          Canada is expensive — on par with the US + Australia. But it's
          a country of hostels, Greyhound alternatives (Rider Express +
          FlixBus), and one of the world's cheapest cross-border flights
          (US + Canada). Three 2026 budgets with real CAD prices.
        </p>

        <BlogStatGrid stats={[
          { value: '$85', label: 'Backpacker / day (USD)' },
          { value: '$170', label: 'Mid-range / day' },
          { value: '$340', label: 'Comfort / day' },
          { value: 'C$1.40', label: 'Per USD' },
        ]} />

        <BlogInlineCTA title="Budgeting Canada?" subtitle="Stamp every province — free map." href="/signup" />

        <h2 id="tiers">1. Three Tiers (USD)</h2>
        <BlogTable
          caption="Daily per person (USD; CAD in parentheses)"
          headers={['Category', '$85 (backpack)', '$170 (mid)', '$340 (comfort)']}
          rows={[
            ['Accommodation', '$32 (C$45 hostel)', '$125 (C$180)', '$280 (C$400)'],
            ['Food', '$28 (C$40)', '$52 (C$75)', '$110 (C$155)'],
            ['Transport', '$10', '$18', '$40'],
            ['Activities', '$10', '$22', '$55'],
            ['Misc', '$5', '$5', '$15'],
            [<strong>Daily</strong>, <strong>$85</strong>, <strong>$170</strong>, <strong>$340</strong>],
          ]}
        />

        <h2 id="transport">2. Transport Cost Math</h2>
        <BlogTable
          caption="Route cost comparison (2026 CAD)"
          headers={['Route', 'Flight', 'VIA Rail', 'Bus (FlixBus/Rider)']}
          rows={[
            ['Toronto → Montreal', 'C$150-280', 'C$85-160 (5h)', 'C$45-75 (7h)'],
            ['Montreal → Quebec', 'Not typical', 'C$45-90 (3h)', 'C$30 (3h30)'],
            ['Toronto → Vancouver', 'C$280-480', 'C$550+ (4 days)', 'Not practical'],
            ['Vancouver → Banff', 'Via Calgary C$250', 'Rocky Mountaineer C$1800 luxury', 'C$150 (18 hr)'],
            ['Calgary → Banff', '—', '—', 'C$60 (Brewster bus)'],
          ]}
        />

        <p>
          VIA Rail in Canada is <strong>slower + often more expensive</strong>
          {' '}than flying — unlike Europe. Fly for long distances. Bus
          for short-hop budget routes. Rent a car for the Rockies.
        </p>

        <BlogInlineCTA title="Stamp your route." subtitle="13 provinces + territories — free map." href="/signup" />

        <h2 id="compare">3. Canada vs Global</h2>
        <BlogBarChart
          title="Daily mid-range cost — global (2026 USD)"
          max={250} unit=" USD"
          data={[
            { label: 'Vietnam', value: 38, valueLabel: '$38' },
            { label: 'Mexico', value: 70, valueLabel: '$70' },
            { label: 'Portugal', value: 80, valueLabel: '$80' },
            { label: 'Japan', value: 120, valueLabel: '$120' },
            { label: 'USA', value: 160, valueLabel: '$160' },
            { label: 'Canada', value: 170, valueLabel: '$170' },
            { label: 'Australia', value: 170, valueLabel: '$170' },
            { label: 'UK', value: 155, valueLabel: '$155' },
          ]}
        />

        <h2 id="prices">4. 2026 Prices</h2>
        <BlogTable
          caption="Benchmark prices (CAD)"
          headers={['Item', 'Low', 'Typical', 'High']}
          rows={[
            ['Tim Hortons coffee + donut', 'C$3', 'C$4.50', 'C$7'],
            ['Poutine', 'C$10', 'C$14', 'C$22'],
            ['Restaurant dinner', 'C$25', 'C$45', 'C$90'],
            ['Domestic beer', 'C$7', 'C$10', 'C$15'],
            ['Toronto hostel dorm', 'C$35', 'C$55', 'C$80'],
            ['Vancouver mid-range hotel', 'C$180', 'C$280', 'C$450'],
            ['Banff hotel (summer)', 'C$280', 'C$450', 'C$800+'],
            ['Banff hotel (winter)', 'C$150', 'C$250', 'C$450'],
            ['Uber within city', 'C$8', 'C$18', 'C$40'],
            ['Calgary → Banff rental day', 'C$70', 'C$110', 'C$180'],
            ['Parks Canada Discovery Pass', 'C$75 (annual unlim)', '—', '—'],
            ['Niagara Journey Behind Falls', 'C$24', 'C$32', 'C$55'],
          ]}
        />

        <h2 id="saving">5. 10 Saving Tactics</h2>
        <ol>
          <li><strong>Parks Canada Discovery Pass C$75</strong> — pays for itself in 7 days</li>
          <li><strong>WestJet + Flair flash sales</strong> — domestic flights C$99 realistic</li>
          <li><strong>Rental car split in Banff.</strong> Share with 2-3 others = C$25/person/day</li>
          <li><strong>Stay in Canmore, not Banff.</strong> 20% cheaper, 30 min drive</li>
          <li><strong>Grocery + hostel kitchens.</strong> Self-cook dinner 3x/week</li>
          <li><strong>FlixBus + Rider Express</strong> — much cheaper than Greyhound (defunct 2021)</li>
          <li><strong>Tim Hortons breakfast</strong> — C$4-5 full breakfast</li>
          <li><strong>Free walking tours in every major city</strong> (tip-based)</li>
          <li><strong>Working Holiday Visa</strong> for under-35s from 35+ countries</li>
          <li><strong>Wise/Revolut</strong> for zero-fee card payments</li>
        </ol>

        <h2 id="total">6. 2-Week Trip Cost</h2>
        <BlogTable
          caption="14-day Canada per person (2026 USD)"
          headers={['Line', 'Backpacker', 'Mid-range', 'Comfort']}
          rows={[
            ['Daily × 14', '$1,190', '$2,380', '$4,760'],
            ['Cross-country flights + VIA Rail', '$450', '$700', '$1,100'],
            ['Rental car week (Rockies)', '$200', '$350', '$600'],
            ['Parks pass + activities', '$80', '$150', '$300'],
            [<strong>Total (excl. intl flight)</strong>, <strong>$1,920</strong>, <strong>$3,580</strong>, <strong>$6,760</strong>],
          ]}
        />

        <h2 id="faq">7. FAQ</h2>
        <h3>Is Canada cheaper than the US?</h3><p>Marginally — about $10/day less at mid-range.</p>
        <h3>$85/day possible?</h3><p>Yes with hostel + Tim Hortons + budget bus + cooking.</p>
        <h3>Cheapest time?</h3><p><strong>October-November or March-April</strong>. 30-40% off Rockies peak.</p>
        <h3>Tipping?</h3><p>15-18% at restaurants. 20% for exceptional service.</p>

        <h2 id="keep">Keep Reading</h2>
        <ul>
          <li><Link to="/blog/canada-travel-guide-2026">Ultimate Canada Guide →</Link></li>
          <li><Link to="/blog/two-week-canada-itinerary-2026">2-Week Itinerary →</Link></li>
          <li><Link to="/blog/best-canada-destinations-2026">10 Best Destinations →</Link></li>
          <li><Link to="/blog/banff-canadian-rockies-guide-2026">Banff Guide →</Link></li>
        </ul>

        <BlogEndCTA
          title="Stamp every dollar-well-spent province."
          subtitle="Free forever. 13 provinces + territories."
        />
      </article>
    </BlogShell>
  );
}
