import React from 'react';
import { Link } from 'react-router-dom';
import { BlogShell, useBlogSEO, useRevealOnScroll } from '../BlogLayout';
import { BlogTable, BlogCallout, BlogStatGrid, BlogInlineCTA, BlogEndCTA, BlogBarChart } from '../BlogComponents';
import { BlogCanadaMap } from '../BlogCanadaMap';
import { getPostBySlug } from '../posts';

const SLUG = 'two-week-canada-itinerary-2026';
const ROUTE = ['on', 'qc', 'ab', 'bc'];

export default function TwoWeekCanadaItinerary2026() {
  const post = getPostBySlug(SLUG);
  useBlogSEO({
    title: `${post.title} | StampYourMap Blog`,
    description: post.description,
    url: `/blog/${SLUG}`,
    image: post.ogImage,
    datePublished: post.datePublished,
    keywords: 'canada itinerary 2 weeks, toronto montreal banff vancouver, canada 14 days, canada trip plan, is canada safe, is canada safe for tourists, is it safe to travel to canada, canada travel warning, canada travel restrictions, canada travel requirements, do i need a visa for canada, canada visa, canada visa requirements, canada visa on arrival, canada visa for indians, canada visa for americans, canada visa free countries, canada evisa, canada border entry, best time to visit canada, canada weather, canada in summer, canada in winter, canada in april, canada in may, canada in october, canada in december, canada peak season, canada off season, how much does a canada trip cost, how much does canada cost, canada budget, canada daily cost, canada expensive or cheap, is canada expensive, canada travel cost, canada currency, canada currency exchange, cash or card in canada, canada sim card, canada mobile data, canada wifi, canada travel insurance, canada packing list, what to pack for canada, what to wear in canada, canada dress code, canada plug type, canada power adapter, canada food, canada food to try, what to eat in canada, canada cuisine, canada street food, canada famous dishes, canada solo travel, canada solo female travel, canada for women, canada with kids, family travel canada, canada for families, canada honeymoon, canada romantic, canada luxury travel, canada backpacking, canada on a budget, canada things to do, things to do in canada, top places in canada, best places to visit in canada, canada sightseeing, canada attractions, canada tourist spots, canada bucket list, canada itinerary, canada 7 days, canada 10 days, canada 2 weeks, canada first timer, canada travel plan, canada travel tips, canada travel advice, canada travel news, canada travel updates, canada travel guide 2026, toronto, vancouver, montreal, banff, quebec, canadian rockies' /* [[NATURAL_QUERIES]] */,
  });
  useRevealOnScroll();

  return (
    <BlogShell>
      <article className="blog-article">
        <div className="blog-breadcrumbs">
          <Link to="/">Home</Link> / <Link to="/blog">Blog</Link> / <span>2-Week Canada Itinerary</span>
        </div>
        <div className="blog-hero">
          <span className="blog-cat-chip">Canada · Itinerary</span>
          <span className="blog-meta-sep">•</span><span>Published April 22, 2026</span>
          <span className="blog-meta-sep">•</span><span>{post.readMinutes} min read</span>
        </div>

        <h1>{post.heroEmoji} The Perfect 2-Week Canada Itinerary: Toronto → Montreal → Quebec City → Banff → Vancouver (2026)</h1>

        <p className="blog-lede">
          14 days hitting Canada's east + west anchors — Toronto + Niagara,
          the French-Canadian duo of Montreal + Quebec City, Banff's
          Canadian Rockies, finish in Vancouver. Two long-haul flights,
          the rest by VIA Rail + car rental.
        </p>

        <BlogStatGrid stats={[
          { value: '14', label: 'Days' },
          { value: '4', label: 'Provinces' },
          { value: '2', label: 'Cross-country flights' },
          { value: 'C$4,500', label: 'Mid-range total' },
        ]} />

        <BlogInlineCTA title="Track each stop." subtitle="Stamp every province — free map." href="/signup" />

        <h2 id="route">1. The Route</h2>
        <BlogCanadaMap
          regionIds={ROUTE}
          title="Ontario → Quebec → Alberta → BC"
          subtitle="East-to-west Canadian grand tour."
        />

        <h2 id="day-by-day">2. Day-by-Day</h2>
        <BlogTable
          caption="Recommended plan"
          headers={['Day', 'Base', 'What you\'re doing']}
          rows={[
            ['1', <strong>Toronto</strong>, 'Arrive YYZ; CN Tower + Distillery District + Kensington Market'],
            ['2', <strong>Toronto</strong>, 'Royal Ontario Museum + Islands ferry + TIFF Lightbox'],
            ['3', <strong>Niagara day-trip</strong>, 'GO Train to Niagara; Horseshoe Falls + Journey Behind + return'],
            ['4', <strong>Montreal</strong>, 'VIA Rail Toronto → Montreal (5 hr); Old Port + Plateau dinner + bagels'],
            ['5', <strong>Montreal</strong>, 'Mount Royal + Notre-Dame + Poutine at La Banquise + Mile End'],
            ['6', <strong>Quebec City</strong>, 'Train Montreal → Quebec (3h); Old Quebec UNESCO district; Château Frontenac'],
            ['7', <strong>Quebec City</strong>, 'Ramparts walk + Montmorency Falls + dinner at Aux Anciens Canadiens'],
            ['8', <strong>Banff</strong>, 'Fly YQB → YYC (via Toronto); rental car Calgary → Banff (1h30)'],
            ['9', <strong>Lake Louise + Moraine</strong>, 'Sunrise Moraine + Lake Louise tea house hike'],
            ['10', <strong>Icefields Parkway</strong>, 'Banff → Jasper drive (3h with stops): Peyto Lake + Athabasca Glacier'],
            ['11', <strong>Jasper / return Banff</strong>, 'Maligne Canyon + Lake or return Banff via Icefields'],
            ['12', <strong>Vancouver</strong>, 'Flight YYC → YVR (1h30); Stanley Park bike + Gastown + Granville Island'],
            ['13', <strong>Whistler day-trip</strong>, 'Sea-to-Sky drive; Peak 2 Peak gondola; return Vancouver'],
            ['14', <strong>Vancouver → home</strong>, 'Capilano Suspension Bridge morning; YVR departure'],
          ]}
        />

        <BlogCallout title="Moraine Lake shuttle requirement">
          <p>
            As of 2023, <strong>private cars are banned from Moraine Lake</strong>.
            You must book the Parks Canada shuttle OR use a commercial
            tour. Book the shuttle at least 3 months in advance — it
            sells out quickly.
          </p>
        </BlogCallout>

        <h2 id="flights">3. Flights + Train Legs</h2>
        <BlogTable
          caption="Transport segments (2026 CAD)"
          headers={['Day', 'Route', 'Mode', 'Cost']}
          rows={[
            ['4', 'Toronto → Montreal', 'VIA Rail (5h)', 'C$85-160'],
            ['6', 'Montreal → Quebec', 'VIA Rail (3h)', 'C$45-90'],
            ['8', 'Quebec → Calgary (via YYZ)', 'Flight (6h total)', 'C$380-580'],
            ['8', 'Calgary → Banff', 'Rental car', 'C$90/day + gas'],
            ['12', 'Calgary → Vancouver', 'Flight (1h30)', 'C$180-320'],
            [<strong>Transit total</strong>, '', '', <strong>C$780-1,150</strong>],
          ]}
        />

        <BlogInlineCTA title="Cross-Canada journey?" subtitle="Stamp every province — free map." href="/signup" />

        <h2 id="lodging">4. Lodging</h2>
        <BlogTable
          caption="Accommodations"
          headers={['Base', 'Budget', 'Mid-range', 'Splurge']}
          rows={[
            ['Toronto', 'The Clarence (hostel)', 'Chelsea Hotel', 'Four Seasons Toronto'],
            ['Montreal', 'M Montreal Hostel', 'Le Germain', 'Ritz-Carlton Montreal'],
            ['Quebec City', 'Auberge Internationale de Québec', 'Hôtel Manoir Victoria', 'Château Frontenac'],
            ['Banff', 'Banff Alpine Centre (HI)', 'Juniper Hotel', 'Fairmont Banff Springs'],
            ['Vancouver', 'Samesun Vancouver', 'Loden Hotel', 'Fairmont Pacific Rim'],
          ]}
        />

        <h2 id="cost">5. Total Cost</h2>
        <BlogBarChart
          title="14-day Canada trip breakdown (mid-range C$4,500)"
          subtitle="Per-person spend, excluding international flight."
          max={100} unit="%"
          data={[
            { label: 'Accommodation', value: 38, valueLabel: '38%' },
            { label: 'Food', value: 20, valueLabel: '20%' },
            { label: 'Flights + VIA Rail', value: 18, valueLabel: '18%' },
            { label: 'Rental car (Banff week)', value: 8, valueLabel: '8%' },
            { label: 'Activities + park pass', value: 10, valueLabel: '10%' },
            { label: 'Buffer', value: 6, valueLabel: '6%' },
          ]}
        />

        <h2 id="alt">6. Alternatives</h2>
        <h3>🌲 East-only</h3>
        <p><strong>Toronto (3) → Niagara (1) → Montreal (3) → Quebec (2) → Charlevoix (2) → Halifax (3)</strong>. No west, more time per city.</p>
        <h3>🏔️ West-only</h3>
        <p><strong>Vancouver (3) → Whistler (2) → Jasper (3) → Banff (4) → Calgary (2)</strong>. Pure Rockies focus.</p>
        <h3>🍂 Fall foliage</h3>
        <p><strong>Toronto (2) → Algonquin PP (2) → Montreal (2) → Charlevoix (3) → Quebec (3) → Mont-Tremblant (2)</strong>. Mid-September to mid-October only.</p>

        <h2 id="faq">7. FAQ</h2>
        <h3>Is 14 days enough to see both east and west Canada?</h3>
        <p>
          <strong>Barely — and only if you accept one transcontinental flight</strong> (5 hours Toronto-Vancouver) and limit each coast to 7 days. The honest answer is that 14 days is better spent deep-diving one side; 18-21 days lets you do both coasts with breathing room. See our <Link to="/blog/canada-travel-guide-2026">Canada guide</Link> for region-by-region planning.
        </p>
        <h3>Can I compress this into 10 days?</h3>
        <p>
          <strong>Yes — pick east OR west, not both</strong>. East 10-day: Toronto (2) → Niagara (1) → Montreal (3) → Quebec City (2) → Charlevoix or Ottawa (2). West 10-day: Vancouver (3) → Whistler (1) → Jasper (2) → Banff (3) → Calgary (1). Each is a complete, unhurried trip.
        </p>
        <h3>What is the best month for this itinerary?</h3>
        <p>
          <strong>June or September</strong> — June has long days (sunset 10pm in Banff), blooming wildflowers, and no wildfire smoke. September adds spectacular fall colors in Ontario/Quebec (peak Sept 25-Oct 10) and clearer Rockies weather. July-August has the best swim temperatures but Banff is overwhelmed and wildfire smoke is a growing risk.
        </p>
        <h3>Do I absolutely need a rental car?</h3>
        <p>
          <strong>Yes for Banff + Jasper week (no realistic alternative)</strong> — book at Calgary (YYC) for Rockies trips, Toronto (YYZ) for eastern drives. <strong>Do NOT rent a car in Toronto, Montreal, Vancouver city centers</strong> — parking is C$35-55/day and these cities are well-served by transit. Pick up after the city portions, drop before the next city.
        </p>
        <h3>How much should I book ahead, and when?</h3>
        <p>
          <strong>Banff hotels 4-6 months ahead</strong> (they sell out May-September), <strong>Moraine Lake shuttle 2-3 months ahead</strong> (no cars allowed; Parks Canada-only shuttles), VIA Rail 3-4 months ahead for Corridor discount fares, flights 4-6 months ahead. Restaurants in Banff + Tofino book out 2-4 weeks ahead in peak season.
        </p>
        <h3>VIA Rail or fly between Toronto and Montreal?</h3>
        <p>
          <strong>VIA Rail wins</strong> — Toronto-Montreal is 5h15 downtown-to-downtown on a comfortable train (C$50-150), vs flying 1h15 + 3 hours of transfers (no real time savings) and C$250-450 air fares. Book Escape fares 30+ days out for the cheapest. Business class includes meals + wine for C$140-200.
        </p>
        <h3>Carry-on only or checked bag?</h3>
        <p>
          <strong>Checked bag is the call for this trip</strong> — you will have 2-3 hotel changes per week, bulky Rockies hiking gear (boots, fleece, rain shell), and potential shopping in Montreal + Niagara. A 55L checked bag + daypack is the right kit. Within-Canada flights (WestJet, Air Canada) include 1 checked bag for C$30-40.
        </p>
        <h3>What is the wet-season or wildfire backup plan?</h3>
        <p>
          <strong>August wildfire smoke is the biggest modern risk</strong> — Alberta + BC have had 3-5 heavy-smoke weeks annually since 2020. Backup: move west portion to June or early September, add Vancouver Island (Tofino, Ucluelet) as ocean-air alternative, or pivot entirely to eastern Canada. Atlantic Canada rarely smokes.
        </p>
        <h3>Doable with kids or grandparents?</h3>
        <p>
          <strong>Yes — Canada is exceptionally family-friendly</strong>. Kids love Niagara, Banff Lake Louise, Vancouver Aquarium, and Montreal{"'"}s Science Centre. For grandparents: drop Jasper (long drive), add extra night in Banff, use the Rocky Mountaineer train (Vancouver-Banff luxury, C$2,500+) instead of driving the Icefields. Slow the pace by 2-3 days.
        </p>
        <h3>Solo or couple — different recommendations?</h3>
        <p>
          <strong>Solo travelers: hostel bases in Banff (HI Banff Alpine Centre, Samesun), Vancouver (HI Downtown), Montreal (HI Auberge Saint-Louis)</strong> and join group day-tours for the Icefields Parkway (Pursuit Banff Jasper Collection). Couples save on lodging but pay the same for park passes and car rentals.
        </p>
        <h3>Can I reverse the route Vancouver-first?</h3>
        <p>
          Yes — <strong>Vancouver arrivals are often cheaper from Asia/Pacific</strong> than Toronto, and ending in Toronto or Montreal for flights home works well. Reverse: Vancouver (3) → Whistler (1) → Jasper (2) → Banff (3) → Calgary → Toronto (2) → Niagara (1) → Montreal (2) → Quebec City (2). Pacing identical.
        </p>
        <h3>When is fall foliage really at peak?</h3>
        <p>
          <strong>Ontario + Quebec: Sept 25 - Oct 12</strong> (peak roughly Oct 4-8 in Algonquin, Laurentians, Charlevoix). Nova Scotia + New Brunswick peak slightly earlier (Sept 20-Oct 5). The Rockies have golden larches Sept 15-30 (Larch Valley, Banff). Book fall-foliage trips 6 months ahead — peak week hotels sell out.
        </p>
        <h3>What is the Parks Canada Discovery Pass and is it worth it?</h3>
        <p>
          <strong>CAD$75.25 for unlimited entry to all 80+ Parks Canada sites for a year</strong> — pays for itself after 7 days at C$11/day day-passes. A must-buy for any Rockies itinerary (Banff, Jasper, Yoho, Waterton). See our <Link to="/blog/banff-canadian-rockies-guide-2026">Banff guide</Link> for full Rockies logistics.
        </p>
        <h3>What if I want to add Newfoundland or PEI?</h3>
        <p>
          <strong>Add 7-10 days minimum</strong> — both are island destinations requiring ferries or flights and deserve proper time. A 3-week itinerary: 14-day core + 7-day Atlantic extension (Halifax → Cape Breton → PEI → Newfoundland). Atlantic June-September is ideal; winter is beautiful but logistics triple in difficulty.
        </p>

        <h2 id="keep">Keep Reading</h2>
        <ul>
          <li><Link to="/blog/canada-travel-guide-2026">Ultimate Canada Guide →</Link></li>
          <li><Link to="/blog/best-canada-destinations-2026">10 Best Destinations →</Link></li>
          <li><Link to="/blog/banff-canadian-rockies-guide-2026">Banff Guide →</Link></li>
          <li><Link to="/blog/canada-budget-travel-2026">Budget Guide →</Link></li>
        </ul>

        <BlogEndCTA
          title="Turn this into your Canada map."
          subtitle="Stamp each province. Free, forever."
        />
      </article>
    </BlogShell>
  );
}
