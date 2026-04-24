import React from 'react';
import { Link } from 'react-router-dom';
import { BlogShell, useBlogSEO, useRevealOnScroll } from '../BlogLayout';
import { BlogBarChart, BlogTable, BlogCallout, BlogStatGrid, BlogInlineCTA, BlogEndCTA } from '../BlogComponents';
import { getPostBySlug } from '../posts';

const SLUG = 'two-week-iran-itinerary-2026';

export default function TwoWeekIranItinerary2026() {
  const post = getPostBySlug(SLUG);
  useBlogSEO({
    title: `${post.title} | StampYourMap Blog`,
    description: post.description,
    url: `/blog/${SLUG}`,
    image: post.ogImage,
    datePublished: post.datePublished,
    keywords: 'iran itinerary 2026, iran itinerary 14 days, 2 week iran trip, 10 day iran trip, 7 day iran trip, one week iran itinerary, iran itinerary first timer, iran tehran to shiraz, iran travel news, iran travel updates, iran travel tips, iran travel advice, iran travel plan, persia 14 days, golden triangle iran, isfahan yazd shiraz route, iran day by day itinerary, iran backpacking itinerary, iran budget itinerary, iran luxury itinerary, iran solo itinerary, iran family itinerary, iran honeymoon itinerary, iran bus travel, iran domestic flights, iran vip bus, iran train, iran silk road loop, iran nowruz itinerary, iran april itinerary, iran october itinerary, persepolis from shiraz, kashan day trip, masuleh trip, qeshm itinerary, iran cost breakdown, how much for 2 weeks in iran, iran expenses, iran packing list, tehran isfahan yazd shiraz persepolis',
  });
  useRevealOnScroll();

  return (
    <BlogShell>
      <article className="blog-article">
        <div className="blog-breadcrumbs">
          <Link to="/">Home</Link> / <Link to="/blog">Blog</Link> / <span>2-Week Iran Itinerary 2026</span>
        </div>
        <div className="blog-hero">
          <span className="blog-cat-chip">Iran · Itinerary</span>
          <span className="blog-meta-sep">•</span><span>Published April 24, 2026</span>
          <span className="blog-meta-sep">•</span><span>{post.readMinutes} min read</span>
        </div>

        <h1>{post.heroEmoji} The Perfect 2-Week Iran Itinerary 2026: Tehran → Kashan → Isfahan → Yazd → Shiraz</h1>

        <p className="blog-lede">
          Fourteen days is the sweet spot for Iran — enough to do the
          classic Tehran → Central Plateau → Persian Gulf sweep without
          feeling rushed, short enough to fit a standard leave
          allowance. This is a tested, day-by-day <strong>Iran travel
          2026</strong> itinerary with bus timings, sleep count, budget
          math, and the little in-city stops most guidebooks skip.
          Updated for the latest 2026 visa rules, airport transit, and
          domestic flight options.
        </p>

        <BlogStatGrid stats={[
          { value: '14', label: 'Days (13 nights)' },
          { value: '6', label: 'Cities' },
          { value: '~$480', label: 'Total mid-range cost' },
          { value: '1,850 km', label: 'Total distance' },
        ]} />

        <BlogInlineCTA title="Stamping Iran this year?" subtitle="Create your free travel map before you fly — stamp every province in real time." href="/signup" />

        <h2 id="overview">The Route at a Glance</h2>
        <BlogTable
          caption="14-day Iran itinerary — sleep count, transport, and daily vibe"
          headers={['Day', 'City', 'Nights', 'Transport In', 'Main vibe']}
          rows={[
            ['1–3', 'Tehran', '3', 'Fly IKA', 'Museums, Golestan, food markets'],
            ['4', 'Kashan', '1', 'VIP bus 3.5h', 'Fin Garden, Tabatabaei House'],
            ['5–7', 'Isfahan', '3', 'VIP bus 3h', 'Naqsh-e Jahan Square, bridges'],
            ['8–9', 'Yazd', '2', 'VIP bus 4h', 'Mud-brick old city, badgirs'],
            ['10–12', 'Shiraz', '3', 'VIP bus 7h (or 50min flight)', 'Poetry, gardens, pink mosque'],
            ['13', 'Persepolis day trip', '—', 'Taxi 55km', 'Achaemenid capital ruins'],
            ['14', 'Fly home', '—', 'Shiraz → IKA → out', 'Last-day kebab'],
          ]}
        />

        <BlogCallout title="Direction matters">
          Do this route <strong>north-to-south</strong> (Tehran first,
          Shiraz last). You arrive acclimating to the cool mountain air,
          end in the warmer desert south, and can fly out from Shiraz
          Airport — saving a 14-hour overland return to Tehran.
        </BlogCallout>

        <h2 id="days-1-3">Days 1–3: Tehran (Capital + Acclimatization)</h2>
        <p>
          Land at IKA, take the airport metro or a Snapp taxi (~$7) to
          a hotel in <strong>central Tehran</strong> (Ferdowsi Square
          area or Vali-asr Street). <strong>Day 1</strong>: settle,
          change $200 at a downtown sarafi, dinner at Ayarian or Nayeb
          (classic Persian kebab, $6–10 a head). <strong>Day 2</strong>:
          Golestan Palace (Qajar-era, UNESCO) + Grand Bazaar + National
          Jewels Museum (the Peacock Throne and 182-carat Darya-ye Noor
          diamond). <strong>Day 3</strong>: Saadabad Palace complex up
          north, Tabiat Bridge at sunset, and a final dinner at Shandiz
          Jordan (try <em>chelo kabab soltani</em>).
        </p>

        <h2 id="day-4">Day 4: Kashan (The Underrated Gem)</h2>
        <p>
          3.5-hour VIP Volvo bus from Tehran's south terminal ($5).
          Kashan is small enough for a single day but mesmerizing — do
          <strong> Fin Garden</strong> (the archetypal Persian garden,
          UNESCO), <strong>Tabatabaei Historical House</strong> (Qajar
          merchant mansion with a legendary stained-glass room), and
          <strong> Sultan Amir Ahmad Bathhouse</strong>. Stay in a
          traditional merchant-house guesthouse ($25/night) — they're
          the highlight. Dinner: <em>ash reshteh</em> at any hole-in-the-
          wall.
        </p>

        <h2 id="days-5-7">Days 5–7: Isfahan ("Nesf-e Jahan — Half the World")</h2>
        <p>
          The Iranians say "Isfahan is half the world" and they're
          barely exaggerating. Stay 3 nights. <strong>Day 5</strong>:
          Naqsh-e Jahan Square — the second-largest square on Earth and
          ringed by four Safavid masterpieces: Shah Mosque, Sheikh
          Lotfollah Mosque, Ali Qapu Palace, Qeysariyyeh Bazaar.
          <strong> Day 6</strong>: Chehel Sotoun + Hasht Behesht gardens
          in the morning, then walk the historic bridges at sunset —
          Khaju Bridge and Si-o-se-pol (33 Arches). <strong>Day 7</strong>:
          Vank Cathedral in the Armenian quarter of Jolfa, carpet
          workshops, final dinner at Shahrzad (grilled saffron chicken,
          $10).
        </p>

        <BlogBarChart
          title="Where your Iran spending goes (mid-range, 14 days)"
          subtitle="All values in USD. Lodging dominates but even so — $480 total for two weeks is unmatched."
          max={200}
          data={[
            { label: 'Lodging (13 nights)', value: 195, valueLabel: '$195' },
            { label: 'Food', value: 130, valueLabel: '$130' },
            { label: 'Intercity bus + flight', value: 85, valueLabel: '$85' },
            { label: 'City transport (Snapp)', value: 30, valueLabel: '$30' },
            { label: 'Entry tickets + guides', value: 40, valueLabel: '$40' },
          ]}
        />

        <h2 id="days-8-9">Days 8–9: Yazd (Desert Time Capsule)</h2>
        <p>
          4-hour bus from Isfahan ($6). Yazd's old city is arguably the
          most atmospheric place in Iran — mud-brick alleys, rooftop
          badgirs (wind-catchers), tiny Zoroastrian fire temples, and
          sunset light on the Jameh Mosque minarets that borders on
          unreal. Stay in an old courtyard guesthouse in the Fahadan
          quarter ($22–35/night). <strong>Day 9</strong>: day-trip to
          Meybod (16th-c ice-house + caravanserai) and Kharanaq ghost
          village, or hike up to the Towers of Silence at sunset.
        </p>

        <h2 id="days-10-12">Days 10–12: Shiraz (Poetry + Gardens)</h2>
        <p>
          7-hour bus OR 50-minute flight from Yazd — the flight ($40)
          is worth it if you're short on time. Shiraz is softer than
          the rest of Iran; locals call it "the city of poetry, wine
          (historically), and roses". <strong>Day 10</strong>: Nasir
          al-Molk Mosque (the Pink Mosque — arrive at 7:30 AM for the
          stained-glass light show), Vakil Bazaar, Vakil Bathhouse.
          <strong> Day 11</strong>: Tombs of Hafez and Saadi (Iranians
          quote these two poets in daily life), Eram Garden, Qavam
          Palace. <strong>Day 12</strong>: free day — wander, shop for
          kilims, try <em>faloodeh</em> (rose-water sorbet, invented
          here).
        </p>

        <h2 id="day-13">Day 13: Persepolis + Naqsh-e Rustam</h2>
        <p>
          The Achaemenid royal capital, 55 km from Shiraz. Hire a
          private taxi for the day ($30) — it lets you combine
          Persepolis (2,500 years old, among the top-3 ancient sites in
          Asia) with <strong>Pasargadae</strong> (tomb of Cyrus the
          Great) and <strong>Naqsh-e Rustam</strong> (rock-cut Persian
          royal tombs). Leave Shiraz by 7 AM to beat the heat. Bring
          water, sunscreen, and a hat — there's no shade on-site.
        </p>

        <h2 id="day-14">Day 14: Fly Home</h2>
        <p>
          Shiraz SYZ has morning flights to Tehran IKA ($40, 80 min) —
          connect to your international flight same-day with a 4-hour
          layover buffer. Gift ideas from the bazaar: saffron, pistachios,
          a turquoise-inlay trinket, a small hand-loomed rug.
        </p>

        <BlogCallout title="Iran travel news: 2026 transport updates">
          The Tehran–Isfahan–Yazd–Shiraz high-speed rail project slipped
          again (now targeting 2028 completion). Until then, <strong>
          VIP Volvo buses</strong> are comfortable and cheap — seats
          recline, refreshments included, 4–7 hours between major stops.
          Domestic flights with Iran Air, Mahan, and Aseman are safe
          and cheap ($25–$50 one-way) but often late; build a 3-hour
          buffer.
        </BlogCallout>

        <h2 id="packing">What to Pack</h2>
        <p>
          Women: a light scarf (mandatory in public), loose-fit pants,
          long-sleeve tops for mosques. Men: long trousers (no shorts
          at mosques), t-shirts fine. Everyone: comfy walking shoes
          (old cities are cobblestone), a sun hat, $500–800 in crisp
          USD/EUR cash, a power-adapter (Type C/F), and a VPN app
          (pre-install; Iran blocks a lot of Western sites). Skip:
          expensive jewelry, anything Israel-branded, political
          t-shirts.
        </p>

        <BlogEndCTA
          title="Plan your 14 days on a map"
          subtitle="StampYourMap's Trip Planner adds dates, cities, budget, and per-person checklists — free forever."
        />
      </article>
    </BlogShell>
  );
}
