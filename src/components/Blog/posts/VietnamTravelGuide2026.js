import React from 'react';
import { Link } from 'react-router-dom';
import { BlogShell, useBlogSEO, useRevealOnScroll } from '../BlogLayout';
import { BlogBarChart, BlogTable, BlogCallout, BlogStatGrid, BlogInlineCTA, BlogEndCTA } from '../BlogComponents';
import { BlogVietnamMap } from '../BlogVietnamMap';
import { getPostBySlug } from '../posts';

const SLUG = 'vietnam-travel-guide-2026';
const HIGHLIGHT = ['hanoi', 'quangninh', 'tthue', 'quangnam', 'danang', 'khanhhoa', 'lamdong', 'hcm', 'kiengiang', 'laocai'];

export default function VietnamTravelGuide2026() {
  const post = getPostBySlug(SLUG);
  useBlogSEO({
    title: `${post.title} | StampYourMap Blog`,
    description: post.description,
    url: `/blog/${SLUG}`,
    image: post.ogImage,
    datePublished: post.datePublished,
    keywords: 'vietnam travel guide, vietnam 2026, hanoi, ho chi minh, hoi an, halong bay, vietnam e-visa, vietnam itinerary',
  });
  useRevealOnScroll();

  return (
    <BlogShell>
      <article className="blog-article">
        <div className="blog-breadcrumbs"><Link to="/">Home</Link> / <Link to="/blog">Blog</Link> / <span>Vietnam Ultimate Guide</span></div>
        <div className="blog-hero">
          <span className="blog-cat-chip">Vietnam · Travel Guide</span>
          <span className="blog-meta-sep">•</span><span>Published April 22, 2026</span>
          <span className="blog-meta-sep">•</span><span>{post.readMinutes} min read</span>
        </div>

        <h1>{post.heroEmoji} The Ultimate Vietnam Travel Guide (2026): 63 Provinces, One Diverse Country</h1>

        <p className="blog-lede">
          Vietnam is Southeast Asia's best-value destination in 2026 —
          $38/day mid-range budgets, 3,400km of coastline, motorbike
          culture, street food that\'s genuinely world-class, and
          a 1,000-year history visible in every temple + pagoda.
        </p>

        <BlogStatGrid stats={[
          { value: '63', label: 'Provinces' },
          { value: '19M', label: '2025 visitors' },
          { value: '8', label: 'UNESCO sites' },
          { value: '~$38', label: 'Mid-range daily' },
        ]} />

        <BlogInlineCTA title="Planning Vietnam?" subtitle="Stamp each province — free map." href="/signup" />

        <h2 id="country">1. Vietnam in One Paragraph</h2>
        <p>
          Vietnam runs 1,650km north-to-south. Three main regions:
          <strong> North</strong> (Hanoi + Halong Bay + Sapa + Ninh Binh),
          <strong> Central</strong> (Hue + Hoi An + Da Nang), and
          <strong> South</strong> (Ho Chi Minh City + Mekong Delta + Phu
          Quoc). Each has distinct weather, cuisine, dialect.
        </p>

        <BlogVietnamMap regionIds={HIGHLIGHT} title="10 essential Vietnam provinces" subtitle="Hanoi · Halong · Hue · Hoi An · Da Nang · Nha Trang · Da Lat · HCM City · Phu Quoc · Sapa" />

        <h2 id="when">2. When to Visit</h2>
        <BlogBarChart title="Best months for Vietnam (2026)" max={100} data={[
          { label: 'Jan', value: 88, valueLabel: '88 ✓' },
          { label: 'Feb', value: 86, valueLabel: '86 (Tết disrupts travel)' },
          { label: 'Mar', value: 94, valueLabel: '94 ✓' },
          { label: 'Apr', value: 92, valueLabel: '92 ✓' },
          { label: 'May', value: 72, valueLabel: '72' },
          { label: 'Jun', value: 58, valueLabel: '58' },
          { label: 'Jul', value: 52, valueLabel: '52' },
          { label: 'Aug', value: 54, valueLabel: '54' },
          { label: 'Sep', value: 70, valueLabel: '70' },
          { label: 'Oct', value: 88, valueLabel: '88 ✓' },
          { label: 'Nov', value: 90, valueLabel: '90 ✓' },
          { label: 'Dec', value: 86, valueLabel: '86' },
        ]} />
        <p>
          <strong>March + April + October-November</strong> are best
          nationally. Tết (Vietnamese New Year, late Jan/early Feb)
          disrupts transport + closes businesses for 5-7 days.
        </p>

        <BlogCallout title="North-South weather split">
          <p>
            North has a real winter (cool Dec-Feb). Central is rainy
            Oct-Nov. South is tropical year-round with wet season May-Oct.
            There\'s no perfect month for all 3 — March is the closest.
          </p>
        </BlogCallout>

        <h2 id="visa">3. E-Visa (2026)</h2>
        <p>
          Vietnam e-visa: <strong>$25, 90 days, multiple entry</strong>,
          apply at evisa.xuatnhapcanh.gov.vn 3-5 days before travel.
          Some nationalities (UK, FR, DE, IT, ES, JP, KR, Scandinavia)
          get 45 days visa-free via an exemption program.
        </p>

        <h2 id="budget">4. Budget (2026 USD)</h2>
        <BlogTable caption="Daily spend per person" headers={['Category', 'Backpacker', 'Mid-range', 'Comfort']} rows={[
          ['Accommodation', '$8 (hostel)', '$25 (3-star)', '$80 (boutique/4-star)'],
          ['Food', '$6 (street food)', '$15 (restaurants + cocktails)', '$35 (fine dining)'],
          ['Transport', '$3', '$8 (Grab)', '$20 (taxis)'],
          ['Activities', '$3', '$5', '$15'],
          ['Misc', '$2', '$2', '$5'],
          [<strong>Daily</strong>, <strong>$22</strong>, <strong>$55</strong>, <strong>$155</strong>],
        ]} />

        <BlogInlineCTA title="Multi-region Vietnam?" subtitle="Free map — 63 provinces." href="/signup" />

        <h2 id="food">5. Vietnamese Food — 5 Musts</h2>
        <ol>
          <li><strong>Pho</strong> — rice-noodle soup, the national dish. North version is clearer; south is sweeter</li>
          <li><strong>Banh Mi</strong> — French baguette + Vietnamese fillings. Best in Hoi An or Saigon</li>
          <li><strong>Bun Cha</strong> — Hanoi\'s grilled pork + rice noodle + dipping sauce</li>
          <li><strong>Cao Lau</strong> — Hoi An-only noodle dish with pork, crackers, greens</li>
          <li><strong>Ca Phe Sua Da</strong> — iced coffee with condensed milk</li>
        </ol>
        <p>Full: <Link to="/blog/vietnamese-food-guide-2026">25 Vietnamese dishes</Link>.</p>

        <h2 id="transport">6. Getting Around</h2>
        <BlogTable caption="Vietnam transport modes" headers={['Mode', 'Best for', 'Cost']} rows={[
          ['✈️ Vietnam Airlines / Bamboo / VietJet', 'Long hops (Hanoi ↔ HCM)', '$30-90'],
          ['🚆 Reunification Express (SE3)', 'Overnight train HCM ↔ Hanoi', '$40-90 soft sleeper'],
          ['🚌 Sleeper bus', 'Short overnight hops', '$10-25'],
          ['🏍️ Motorbike rental', 'Hoi An/Da Nang/rural', '$5-10/day'],
          ['🚕 Grab', 'City rides', 'Metered, cheap'],
        ]} />

        <h2 id="mistakes">7. 12 First-Timer Mistakes</h2>
        <ol>
          <li>Not practicing "nam muoi" (Vietnamese for bargaining)</li>
          <li>Drinking tap water. Bottled only</li>
          <li>Accepting the first quoted taxi fare — use Grab</li>
          <li>Renting a motorbike without experience — serious accident rates</li>
          <li>Booking Halong Bay without researching cruise quality</li>
          <li>Taking a pho photo BEFORE eating — pho wilts fast</li>
          <li>Skipping Hoi An after dark (lanterns festival)</li>
          <li>Crossing streets hesitantly — walk at constant pace; motorbikes flow around you</li>
          <li>Missing Ninh Binh (30 min from Hanoi, better than Halong Bay boat)</li>
          <li>Drinking bia hoi without the 1-hour food beforehand</li>
          <li>Wearing shorts into temples — bring long pants</li>
          <li>Visiting north in July-August (unbearable humidity)</li>
        </ol>

        <h2 id="faq">8. FAQ</h2>
        <h3>Days needed?</h3><p><strong>10-14 days</strong> minimum; 17-21 ideal.</p>
        <h3>North vs South?</h3><p>Do both. Fly between.</p>
        <h3>Safety?</h3><p>Very safe. Motorbike traffic is the only real danger.</p>
        <h3>English?</h3><p>Basic in tourism. Google Translate voice works well.</p>

        <h2 id="keep">Keep Reading</h2>
        <ul>
          <li><Link to="/blog/two-week-vietnam-itinerary-2026">2-Week Vietnam Itinerary →</Link></li>
          <li><Link to="/blog/best-vietnam-destinations-2026">10 Best Destinations →</Link></li>
          <li><Link to="/blog/vietnamese-food-guide-2026">25 Vietnamese Dishes →</Link></li>
          <li><Link to="/blog/halong-bay-hoi-an-guide-2026">Halong Bay & Hoi An →</Link></li>
          <li><Link to="/blog/vietnam-budget-travel-2026">Budget Guide →</Link></li>
        </ul>

        <BlogEndCTA title="Stamp every Vietnamese province." subtitle="63 provinces. Free forever." />
      </article>
    </BlogShell>
  );
}
