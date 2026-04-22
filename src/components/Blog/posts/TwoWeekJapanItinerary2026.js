import React from 'react';
import { Link } from 'react-router-dom';
import { BlogShell, useBlogSEO, useRevealOnScroll } from '../BlogLayout';
import {
  BlogTable,
  BlogCallout,
  BlogStatGrid,
  BlogInlineCTA,
  BlogEndCTA,
  BlogBarChart,
} from '../BlogComponents';
import { BlogJapanMap } from '../BlogJapanMap';
import { getPostBySlug } from '../posts';

const SLUG = 'two-week-japan-itinerary-2026';
const ROUTE = ['tokyo', 'kanagawa', 'ishikawa', 'kyoto', 'osaka', 'nara', 'hiroshima'];

export default function TwoWeekJapanItinerary2026() {
  const post = getPostBySlug(SLUG);
  useBlogSEO({
    title: `${post.title} | StampYourMap Blog`,
    description: post.description,
    url: `/blog/${SLUG}`,
    image: post.ogImage,
    datePublished: post.datePublished,
    keywords:
      'japan itinerary, 14 days japan, japan 2 weeks, tokyo kyoto osaka itinerary, ' +
      'japan trip plan, japan route 2026, japan bullet train itinerary, hiroshima hakone kanazawa',
  });
  useRevealOnScroll();

  return (
    <BlogShell>
      <article className="blog-article">
        <div className="blog-breadcrumbs">
          <Link to="/">Home</Link> / <Link to="/blog">Blog</Link> /{' '}
          <span>2-Week Japan Itinerary</span>
        </div>

        <div className="blog-hero">
          <span className="blog-cat-chip">Japan · Itinerary</span>
          <span className="blog-meta-sep">•</span>
          <span>Published April 22, 2026</span>
          <span className="blog-meta-sep">•</span>
          <span>{post.readMinutes} min read</span>
        </div>

        <h1>{post.heroEmoji} The Perfect 2-Week Japan Itinerary: Tokyo → Kyoto → Osaka → Hiroshima (2026)</h1>

        <p className="blog-lede">
          After helping thousands of travelers plan their Japan trips, one
          itinerary emerges as the clear first-timer winner: 14 days
          covering Tokyo's urban intensity, Kyoto's temples, Osaka's food
          scene, Hiroshima's history, Hakone's hot springs, and Kanazawa's
          preserved old town. Four bullet-train legs, zero wasted days,
          and just enough time to actually enjoy each stop.
        </p>

        <BlogStatGrid
          stats={[
            { value: '14', label: 'Days' },
            { value: '6', label: 'Bases' },
            { value: '5', label: 'Shinkansen legs' },
            { value: '$3,500', label: 'Mid-range total' },
          ]}
        />

        <BlogInlineCTA
          title="Track every prefecture you visit."
          subtitle="StampYourMap has all 47 Japanese prefectures pre-loaded — free."
          href="/signup"
        />

        <h2 id="map">1. The Full Route, Mapped</h2>

        <BlogJapanMap
          regionIds={ROUTE}
          title="Tokyo → Hakone → Kanazawa → Kyoto → Osaka → Nara → Hiroshima → Tokyo"
          subtitle="Seven stops across the 'Golden Route' of Japan's main island."
        />

        <h2 id="day-by-day">2. Day by Day</h2>

        <BlogTable
          caption="Day-by-day 14-day plan"
          headers={['Day', 'Base', 'What you\'re doing']}
          rows={[
            ['1', <strong>Tokyo</strong>, 'Land Haneda/Narita; Shinjuku ramen + Shibuya crossing at night'],
            ['2', <strong>Tokyo</strong>, 'Meiji Shrine + Harajuku + teamLab Borderless; dinner in Omoide Yokocho'],
            ['3', <strong>Tokyo</strong>, 'Tsukiji food tour morning, Asakusa + Senso-ji afternoon, Tokyo Tower sunset'],
            ['4', <strong>Hakone</strong>, 'Early shinkansen; Hakone loop (cable car + pirate ship + onsen ryokan night)'],
            ['5', <strong>Kanazawa</strong>, 'Shinkansen across Japan Alps; Kenrokuen Garden + Higashi Chaya district'],
            ['6', <strong>Kanazawa</strong>, 'Day-trip to Shirakawa-go UNESCO thatched village'],
            ['7', <strong>Kyoto</strong>, 'Shinkansen south; Kinkaku-ji + Ryoan-ji + Arashiyama bamboo grove'],
            ['8', <strong>Kyoto</strong>, 'Fushimi Inari at 6 AM + Gion walking + Nishiki Market lunch'],
            ['9', <strong>Kyoto</strong>, 'Kiyomizu-dera + Philosopher\'s Path; kaiseki dinner'],
            ['10', <strong>Nara (day-trip)</strong>, 'Todai-ji giant Buddha + deer park; back to Kyoto/Osaka for night'],
            ['11', <strong>Osaka</strong>, 'Dotonbori food crawl + Osaka Castle + Shinsekai evening'],
            ['12', <strong>Hiroshima</strong>, 'Shinkansen; Peace Memorial Park + Museum + Okonomimura dinner'],
            ['13', <strong>Miyajima</strong>, 'Ferry from Hiroshima; floating torii + Mt Misen ropeway'],
            ['14', <strong>Tokyo → home</strong>, 'Return shinkansen (4 hr); afternoon shopping Akihabara or Ginza'],
          ]}
        />

        <BlogCallout title="Two critical booking moves">
          <p>
            <strong>(1) Book your ryokan in Hakone or Kanazawa 3+ months out</strong> —
            they sell out fast, and sleeping in a traditional ryokan is the
            single best memory of most Japan trips.{' '}
            <strong>(2) Reserve Ghibli Museum or teamLab tickets the moment
            they open</strong> (1-3 months ahead depending on venue).
          </p>
        </BlogCallout>

        <h2 id="trains">3. The Five Shinkansen Legs (and What They Cost)</h2>

        <BlogTable
          caption="Inter-city train legs required"
          headers={['Day', 'Route', 'Duration', 'One-way cost']}
          rows={[
            ['4', 'Tokyo → Odawara (Hakone gateway)', '35 min', '$30'],
            ['5', 'Odawara → Kanazawa (via Tokyo)', '3 hr', '$120'],
            ['7', 'Kanazawa → Kyoto', '2 hr 15 min', '$65'],
            ['11', 'Kyoto → Hiroshima', '1 hr 40 min', '$100'],
            ['14', 'Hiroshima → Tokyo', '4 hr', '$165'],
            [<strong>Total train cost</strong>, '', <strong>~12 hours</strong>, <strong>$480</strong>],
          ]}
        />

        <p>
          At <strong>$420 for the 14-day JR Pass</strong>, this itinerary
          breaks even slightly (the pass also covers Narita Express,
          Yamanote Line, Hiroshima ferries, etc. — easy to extract $500+ of
          value). Buy the pass.
        </p>

        <h2 id="lodging">4. Where to Sleep (Our Picks Per Tier)</h2>

        <BlogTable
          caption="Best lodging per base"
          headers={['Base', 'Budget', 'Mid-range', 'Splurge']}
          rows={[
            ['Tokyo', 'Bunka Hostel Asakusa', 'Hotel Sunroute Shinjuku', 'Park Hyatt Tokyo'],
            ['Hakone', 'K\'s House Hakone', 'Hakone Suimeisou (onsen ryokan)', 'Gora Kadan'],
            ['Kanazawa', 'Kanazawa Hakuchoro Hotel', 'Hyatt House Kanazawa', 'Beniya Mukayu'],
            ['Kyoto', 'Piece Hostel Sanjo', 'Mitsui Garden Hotel Kyoto Shinmachi Bettei', 'Tawaraya Ryokan'],
            ['Osaka', 'HOTEL SHE, OSAKA', 'Mitsui Garden Premier', 'The St. Regis Osaka'],
            ['Hiroshima', 'J-Hoppers Hiroshima', 'Sheraton Grand', 'Hotel Granvia'],
          ]}
        />

        <h2 id="cost-chart">5. Where Your Money Goes</h2>

        <BlogBarChart
          title="14-day Japan trip cost breakdown (mid-range ~$3,500 total)"
          subtitle="Per-person spend, excluding international flight."
          max={100}
          unit="%"
          data={[
            { label: 'Accommodation', value: 36, valueLabel: '36%' },
            { label: 'Food & drink', value: 18, valueLabel: '18%' },
            { label: 'JR Pass + transport', value: 16, valueLabel: '16%' },
            { label: 'Attractions', value: 8, valueLabel: '8%' },
            { label: 'Shopping / souvenirs', value: 10, valueLabel: '10%' },
            { label: 'Buffer / misc', value: 12, valueLabel: '12%' },
          ]}
        />

        <h2 id="pro-tips">6. 10 Pro Tips for This Itinerary</h2>

        <ol>
          <li>Book Ghibli Museum tickets <strong>10 AM Japan time on the 10th of the month prior</strong> — they sell out in minutes.</li>
          <li>Use the <strong>JR West app</strong> or Klook for seat reservations — free with your JR Pass.</li>
          <li>Get a <strong>Suica IC card</strong> at the airport day 1 — tap on every train + conbini.</li>
          <li>Skip Kyoto's Fushimi Inari between 9 AM – 5 PM. Go at 6 AM for photos, sunset for atmosphere.</li>
          <li>Do Nara as a morning day-trip — afternoons the deer are overfed and less interactive.</li>
          <li>Book one <strong>kaiseki dinner</strong> (Kyoto or Kanazawa). Most memorable food experience of the trip.</li>
          <li>Osaka's <strong>Kuromon Market</strong> is best at 10 AM. Dotonbori at 9 PM.</li>
          <li>Add Miyajima as a half-day from Hiroshima — ferry + floating torii + oysters.</li>
          <li>The <strong>Shinkansen has Fuji-side seats</strong> Tokyo→Kyoto: book <em>right</em> side (odd seat numbers = window, D = right-side window facing Fuji on southbound).</li>
          <li>Download <strong>Google Maps offline</strong> for Kyoto. GPS inside temple complexes is unreliable.</li>
        </ol>

        <h2 id="alternatives">7. Three Alternative Routes</h2>

        <p>
          The Tokyo-Kyoto-Osaka-Hiroshima loop is the classic, but three
          variants work well:
        </p>

        <h3>❄️ Winter Route (add Hokkaido)</h3>
        <p>
          <strong>Tokyo (3) → Sapporo + Niseko (4) → Tokyo → Kyoto (3) → Osaka (2) → back</strong>.
          Swaps Hiroshima for Hokkaido skiing + Sapporo Snow Festival in
          Feb. Best January-February.
        </p>

        <h3>🌸 Sakura-Maximizing Route</h3>
        <p>
          <strong>Osaka (2) → Kyoto (4) → Kanazawa (2) → Tokyo (4) → Tohoku (2)</strong>.
          Chases the sakura wave northward. Best late March-mid April —
          see <Link to="/blog/japan-cherry-blossom-2026">our 2026 sakura forecast</Link>.
        </p>

        <h3>🏝️ Beach + City Combo</h3>
        <p>
          <strong>Tokyo (4) → Kyoto (3) → Osaka (2) → Okinawa (5)</strong>.
          Swaps Hiroshima + Hakone for 5 days of tropical Okinawan
          beaches. Best May-June or September.
        </p>

        <h2 id="faq">8. FAQ</h2>

        <h3>Can I do this in 10 days?</h3>
        <p>{"Yes — drop Hakone and Hiroshima. The best 10-day compression: Tokyo (3 nights) → Kanazawa (2) → Kyoto (3) → Osaka (2) and return from KIX. You still cover the essential arc of modern Tokyo, traditional Kanazawa, temple-dense Kyoto and food-focused Osaka. Under 10 days is not enough to justify the long-haul flight and $600+ in JR costs."}</p>

        <h3>Can I do this in 21 days?</h3>
        <p>{"Yes — add Hokkaido (4 nights in Sapporo/Furano/Otaru) between Tokyo and Kanazawa for summer/winter contrast, or Okinawa (4 nights Naha + Ishigaki) at the end for beach wind-down. A 21-day plan also works well splitting into 'food Japan' (Fukuoka + Osaka + Kyoto) and 'classic Japan' (Tokyo + Kanazawa + Takayama)."}</p>

        <h3>Is this good in November for foliage?</h3>
        <p>{"Yes, actually the single best month for the classic itinerary. Kyoto's momiji peaks November 15-25 at Tofukuji, Eikando and the Arashiyama bamboo grove — the foliage rivals or exceeds sakura for scenery. Kanazawa's Kenrokuen garden hits peak foliage around the same time and is less crowded. Book 4-6 months ahead for mid-November as ryokans and good hotels sell out fast."}</p>

        <h3>Can I reverse the route?</h3>
        <p>{"Yes. Fly into Osaka (KIX) instead of Tokyo, start in Osaka-Kyoto while you are jet-lagged (temple-walking suits slow recovery better than Tokyo nightlife), then finish in Tokyo where you can use leftover energy for shopping, museums and departure flights. Flights from the US West Coast into KIX are often $80-150 cheaper than Narita."}</p>

        <h3>What's the pace like — is this too aggressive?</h3>
        <p>{"The standard 14-day pace (2-4 nights per base) works for most travelers, including first-timers. If you are over 60, traveling with small children, or have mobility concerns, bump Tokyo to 5 nights and Kyoto to 5 nights and cut Hiroshima — less transit, same highlight coverage. First-time Japan travelers consistently report wishing they had moved less, not more."}</p>

        <h3>Do I need a JR Pass in 2026?</h3>
        <p>{"For this itinerary in 2026 — probably not. After the 2023 price hike the 14-day JR Pass costs around 80,000 yen, while this route's single shinkansen tickets total roughly 55,000-60,000 yen. Buy individual tickets via Smart EX or Klook. Consider the regional Kansai-Hokuriku Pass (Kyoto-Osaka-Kanazawa for about 19,000 yen) as a cheaper partial option."}</p>

        <h3>How do I handle jet lag from North America/Europe?</h3>
        <p>{"Arrive into Narita/Haneda after noon local time, check in, walk outside for 90 minutes of sunlight, eat a real dinner, and sleep by 10 PM. Do not nap on day 1. Take melatonin (3mg) at 9 PM for the first 3 nights. Save Tokyo's more mentally-demanding days (teamLab, Tsukiji tour) for day 3+; spend day 2 on outdoor walks like Meguro River and Yoyogi Park."}</p>

        <h3>Carry-on or checked bag?</h3>
        <p>{"Strongly prefer carry-on only. Shinkansen overhead space is strict (oversized-bag reservations now required), Japanese hotel rooms are genuinely small (22 sqm typical business hotel), and Japanese apartments and ryokans have zero storage for a 30-inch spinner. A 40-45L backpack or 21-inch roller is ideal. Use luggage forwarding (Yamato Takkyubin) between cities if you must bring a big bag — 2,000 yen, next-day."}</p>

        <h3>Should I book internal flights instead of trains?</h3>
        <p>{"Only for Hokkaido, Okinawa, and Fukuoka. For the Tokyo-Kyoto-Hiroshima core, shinkansen is faster city-center-to-city-center and equally priced after you factor airport transfers. If your itinerary includes Kyushu (Fukuoka) or Hokkaido, Peach, Jetstar and ANA domestic flights for 8,000-15,000 yen beat 7-hour train journeys."}</p>

        <h3>Can I do this with kids?</h3>
        <p>{"Absolutely — Japan is the easiest major Asian country to travel with kids. Add teamLab Planets (Tokyo), Ghibli Museum (book 6 months ahead), Kyoto Railway Museum, Osaka Aquarium Kaiyukan, and Universal Studios Japan. Drop the kaiseki and Gion walk; keep shinkansen rides (kids love them) and ryokan onsens at family-friendly places with private baths. Pack car-sickness meds for Hakone loop day."}</p>

        <h3>How does this change for solo versus couples?</h3>
        <p>{"Solo travelers save dramatically by using capsule hotels (2,500-4,500 yen) and single rooms; join a food tour on Day 2-3 for instant friends. Couples should splurge on one ryokan night (Hakone or Takayama) and one fine-dining meal. Both benefit from the Tokyo omakase booking culture — solo travelers actually get better counter seats at Sushi Saito, Sushi Tokami and Quintessence."}</p>

        <h3>Rainy-day backup plan for Kyoto?</h3>
        <p>{"Rain in Kyoto actually improves many experiences — Fushimi Inari shrine under umbrellas is less crowded and more photogenic; Nanzen-ji and Ginkaku-ji moss gardens glow. Indoor rainy-day picks: Kyoto Railway Museum, Nijo Castle, the underground Kyoto Station observation deck, Nishiki Market food tour, and a tea ceremony at Camellia Garden. Bring a clear plastic umbrella — sold at every conbini for 500 yen."}</p>

        <h3>What should I NOT do on a first 2-week trip?</h3>
        <p>{"Do not add Hokkaido or Okinawa on your first trip — each deserves 5+ days and cannibalizes Honshu time. Do not try to visit all 15 major Kyoto temples (pick 5 and do them properly). Do not skip a ryokan night; it is the single most unique cultural experience and cannot be recreated at a regular hotel. Do not over-research restaurants — spontaneous izakaya finds are half the joy."}</p>

        <h3>When should I book this trip?</h3>
        <p>{"Sakura season (March 25-April 10): 6 months ahead minimum. Momiji (mid-November): 4-5 months ahead. Summer (June-August): 2-3 months is fine. Off-peak (February, early June, late September): 4-6 weeks works. Ryokans and Kyoto machiya always book first — lock those in before anything else, even before flights."}</p>

        <h3>How much budget do I need for 14 days?</h3>
        <p>{"Budget (2 travelers sharing): $4,500-5,800 total excluding flights — hostels plus conbini meals plus shinkansen. Mid-range: $7,500-9,500 total — business hotels plus mid-range restaurants plus 1 ryokan night. Comfort: $13,000-17,000 — 4-star hotels plus 2 ryokan nights plus 2 fine-dining meals. Flights add $2,000-3,600 per couple. Current weak yen makes this 25-35% cheaper than 2019."}</p>

        <h2 id="keep-reading">Keep Reading</h2>

        <ul>
          <li><Link to="/blog/japan-travel-guide-2026">The Ultimate Japan Travel Guide →</Link></li>
          <li><Link to="/blog/best-japan-regions-2026">9 Best Japan Regions Ranked →</Link></li>
          <li><Link to="/blog/japanese-food-guide-2026">30 Japanese Dishes You Must Try →</Link></li>
          <li><Link to="/blog/japan-cherry-blossom-2026">Cherry Blossom 2026 Forecast →</Link></li>
          <li><Link to="/blog/japan-budget-travel-2026">Japan on a Budget →</Link></li>
        </ul>

        <BlogEndCTA
          title="Turn this itinerary into your personal Japan map."
          subtitle="Stamp every prefecture as you go — free, forever."
        />
      </article>
    </BlogShell>
  );
}
