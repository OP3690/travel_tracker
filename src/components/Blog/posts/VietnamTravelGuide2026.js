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
    keywords: 'vietnam travel guide, vietnam 2026, hanoi, ho chi minh, hoi an, halong bay, vietnam e-visa, vietnam itinerary, is vietnam safe, is vietnam safe for tourists, is it safe to travel to vietnam, vietnam travel warning, vietnam travel restrictions, vietnam travel requirements, do i need a visa for vietnam, vietnam visa, vietnam visa requirements, vietnam visa on arrival, vietnam visa for indians, vietnam visa for americans, vietnam visa free countries, vietnam evisa, vietnam border entry, best time to visit vietnam, vietnam weather, vietnam in summer, vietnam in winter, vietnam in april, vietnam in may, vietnam in october, vietnam in december, vietnam peak season, vietnam off season, how much does a vietnam trip cost, how much does vietnam cost, vietnam budget, vietnam daily cost, vietnam expensive or cheap, is vietnam expensive, vietnam travel cost, vietnam currency, vietnam currency exchange, cash or card in vietnam, vietnam sim card, vietnam mobile data, vietnam wifi, vietnam travel insurance, vietnam packing list, what to pack for vietnam, what to wear in vietnam, vietnam dress code, vietnam plug type, vietnam power adapter, vietnam food, vietnam food to try, what to eat in vietnam, vietnam cuisine, vietnam street food, vietnam famous dishes, vietnam solo travel, vietnam solo female travel, vietnam for women, vietnam with kids, family travel vietnam, vietnam for families, vietnam honeymoon, vietnam romantic, vietnam luxury travel, vietnam backpacking, vietnam on a budget, vietnam things to do, things to do in vietnam, top places in vietnam, best places to visit in vietnam, vietnam sightseeing, vietnam attractions, vietnam tourist spots, vietnam bucket list, vietnam 7 days, vietnam 10 days, vietnam 2 weeks, vietnam 14 days, vietnam first timer, vietnam travel plan, vietnam travel tips, vietnam travel advice, vietnam travel news, vietnam travel updates, vietnam travel guide 2026, saigon, mekong' /* [[NATURAL_QUERIES]] */,
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
        <h3>How many days do I need to see Vietnam properly?</h3>
        <p>
          <strong>10-14 days is the minimum</strong> for Hanoi + Halong Bay + Hoi An + Ho Chi Minh City (covering north, central, and south). The sweet spot is <strong>17-21 days</strong>, which adds Ninh Binh, Hue, Mekong Delta, or Sapa. Vietnam is longer than California and deserves more time than most travelers budget — the north and south are genuinely different countries culturally.
        </p>
        <h3>North Vietnam or South Vietnam if I have to choose?</h3>
        <p>
          <strong>Do both — fly between them (Vietjet/Bamboo Airways, US$30-70)</strong>. If forced to pick: North for scenery + culture (Halong Bay, Ninh Binh, Sapa, Hanoi{"'"}s Old Quarter, traditional Vietnamese food), South for urban energy + Mekong + tropical beaches (Ho Chi Minh City, Mekong Delta, Phu Quoc). Central (Hoi An, Hue) is the balance of both.
        </p>
        <h3>Is Vietnam safe for travelers?</h3>
        <p>
          <strong>Very safe — violent crime is extremely rare and solo female travel is routine</strong>. The real danger is motorbike traffic: walk at a constant slow pace (never stop mid-crossing) and scooters flow around you. Beware of petty scams (rigged taxi meters, overcharged cyclo rides) — always use Grab app. Do not rent a motorbike without a license + experience.
        </p>
        <h3>How much English is spoken?</h3>
        <p>
          <strong>Basic English in all tourism contexts</strong> (hotels, tours, mid-range restaurants, cafés in Hanoi/HCMC/Hoi An) — beyond tourism, English drops sharply. Google Translate voice-mode is your friend; download Vietnamese for offline use. Younger Vietnamese (under 30) speak much more English than older generations.
        </p>
        <h3>Do I need a visa, and how does the e-visa work?</h3>
        <p>
          <strong>Most nationalities need an e-visa (US$25, single entry, 90 days)</strong> — apply at evisa.xuatnhapcanh.gov.vn (official site; beware copycat sites charging US$80+). Processing 3-5 business days. Some nationalities get visa-exemption: UK, France, Germany, Italy, Spain, Japan, Korea get 45 days visa-free; Nordics get 15 days. Always check current rules 30+ days before travel.
        </p>
        <h3>What currency and payment methods work?</h3>
        <p>
          <strong>Vietnamese Dong (VND) — expect to be a millionaire (US$40 = 1,000,000 VND)</strong>. Cash is king: carry 500,000-2,000,000 VND. Cards accepted at mid-range hotels, restaurants, and supermarkets, but small cafés, street food, markets, and homestays are cash-only. ATMs widely available (withdraw 2,000,000-5,000,000 VND, 50,000 VND fee).
        </p>
        <h3>What is the best month to visit?</h3>
        <p>
          <strong>March-April or October-November</strong> — the whole country has good weather in those windows. North is cool + clear (18-25°C), center is dry (Hoi An peak), south is pleasant. Avoid July-August (wet, hot, crowded domestically) in the north. Tet (Lunar New Year, late Jan-Feb) shuts down much of the country for 5-7 days.
        </p>
        <h3>Is tipping expected?</h3>
        <p>
          <strong>Not expected but increasingly appreciated</strong> — 5-10% at restaurants, round up taxi/Grab fares, tip tour guides 100,000-200,000 VND/day (US$4-8), and spa staff 50,000-100,000 VND. Do not tip at street food stalls. Hotel porters get 20,000-50,000 VND/bag. A small envelope for Halong cruise crew (US$10-20/guest) is customary.
        </p>
        <h3>How do I get around between cities?</h3>
        <p>
          <strong>Fly between major regions (Hanoi ↔ Danang ↔ HCMC on Vietjet/Bamboo Airways for US$30-70)</strong> — saves 15+ hours on buses or overnight trains. Sleeper trains (SE1-SE4) Hanoi-Danang-HCMC are experiential (US$30-80). Buses (Futa, Hoang Long) are cheapest but slow. Grab + Xanh SM (electric taxi) for cities; motorbike taxis (Grab Bike) for short trips.
        </p>
        <h3>How good is mobile data and connectivity?</h3>
        <p>
          <strong>Excellent and cheap</strong> — Viettel, MobiFone, Vinaphone all offer tourist SIMs with 10-30GB for US$4-12 at airport kiosks. Airalo eSIM (US$8 for 5GB/30 days) works on arrival without needing a physical SIM. WiFi is universal in cafés + hotels; some hotels offer portable pocket WiFi rental.
        </p>
        <h3>Vaccines and health prep?</h3>
        <p>
          <strong>No required vaccines, but Hepatitis A + typhoid + tetanus are recommended</strong> by most travel-health boards. Travel insurance is essential — hospital care in Vietnam is affordable out-of-pocket but evacuation to Bangkok or Singapore for serious cases runs US$20,000-50,000. Pack oral rehydration salts, Imodium, and a basic anti-diarrhea kit.
        </p>
        <h3>Can I drink the tap water?</h3>
        <p>
          <strong>No — drink bottled or filtered water only</strong> (500,000 VND / US$0.25-0.50 for 1.5L). Ice in drinks at established cafés and restaurants is usually safe (made from filtered water). Brush teeth with bottled water for safety. Hotels provide 2 bottles/day free. Carry a LifeStraw or SteriPen to reduce plastic.
        </p>
        <h3>What cultural etiquette should I know?</h3>
        <p>
          <strong>Remove shoes before entering temples + many homes, dress modestly at pagodas (covered shoulders + knees), and do not touch anyone{"'"}s head</strong> (considered sacred). Accept and receive items with two hands. Avoid pointing feet at Buddha statues. The communist government restricts photography at some buildings — ask before photographing people or government buildings.
        </p>
        <h3>Best festivals to experience?</h3>
        <p>
          <strong>Hoi An Full Moon Lantern Festival (14th day of lunar month monthly)</strong>, Mid-Autumn Festival (September full moon), Tet Lunar New Year (late January-February, but note most businesses close), and Hue Festival (biennial, April). Reunification Day (April 30) + Labor Day (May 1) bring domestic travel crowds.
        </p>
        <h3>What should I pack that people forget?</h3>
        <p>
          <strong>Modest-temple clothing (scarf, long pants), mosquito repellent (DEET 30%+), diarrhea medication, and a small umbrella</strong> (tropical downpours daily in wet season). Sunscreen is expensive in Vietnam; bring from home. A light sweater for Halong cruises (breezy evenings) and Sapa/north mountain regions (cool year-round).
        </p>

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
