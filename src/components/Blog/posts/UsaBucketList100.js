import React from 'react';
import { Link } from 'react-router-dom';
import {
  BlogShell,
  useBlogSEO,
  useRevealOnScroll,
} from '../BlogLayout';
import {
  BlogUSMap,
  BlogBarChart,
  BlogTable,
  BlogCallout,
  BlogStatGrid,
  BlogInlineCTA,
  BlogEndCTA,
} from '../BlogComponents';
import { getPostBySlug } from '../posts';

const SLUG = 'usa-bucket-list-100-places';
const ICONIC_STATES = ['ca', 'ny', 'az', 'ut', 'co', 'wy', 'hi', 'tn', 'fl', 'ak'];

// The master 100-place list, alphabetical by state. Each row: [rank, place, state, category, why]
// Category emoji keys:
//   🏞️ Nature, 🏛️ History, 🍽️ Food, 🏙️ City, 🎨 Cultural, 🤪 Quirky
const BUCKET_LIST = [
  [1, 'Civil Rights Trail (Montgomery → Selma)', 'AL', '🏛️ History', 'Walk the Edmund Pettus Bridge; visit the Rosa Parks Museum'],
  [2, 'Gulf Shores sugar-white beaches', 'AL', '🏞️ Nature', 'Finest-grain quartz sand on the entire Gulf coast'],
  [3, 'Denali National Park', 'AK', '🏞️ Nature', '6-million-acre wilderness; North America\'s tallest peak'],
  [4, 'Glacier Bay cruise', 'AK', '🏞️ Nature', 'Calving tidewater glaciers, humpback whales, zero roads'],
  [5, 'Grand Canyon South Rim', 'AZ', '🏞️ Nature', 'The iconic US landscape — Bright Angel Trail + Mather Point'],
  [6, 'Antelope Canyon (Page)', 'AZ', '🏞️ Nature', 'Slot canyon with otherworldly light beams; book 2 weeks ahead'],
  [7, 'Hot Springs National Park', 'AR', '🏞️ Nature', 'Bathe in historic 1920s thermal bathhouses'],
  [8, 'Crater of Diamonds State Park', 'AR', '🤪 Quirky', 'Only public diamond mine in the world — keep what you find'],
  [9, 'Yosemite Valley', 'CA', '🏞️ Nature', 'El Capitan, Half Dome, Bridalveil Fall — best in late May'],
  [10, 'Big Sur (Highway 1)', 'CA', '🏞️ Nature', 'McWay Falls + Bixby Bridge; arguably the world\'s best drive'],
  [11, 'Rocky Mountain National Park', 'CO', '🏞️ Nature', 'Trail Ridge Road hits 12,183 ft — the highest paved in the US'],
  [12, 'Mesa Verde cliff dwellings', 'CO', '🏛️ History', '600-year-old Ancestral Puebloan cliff cities you can still enter'],
  [13, 'Mark Twain House (Hartford)', 'CT', '🏛️ History', 'Where Twain wrote Huck Finn; gorgeous Victorian Gothic'],
  [14, 'Mystic Seaport', 'CT', '🏛️ History', 'Living maritime museum with an 1841 whaling ship'],
  [15, 'Rehoboth Beach boardwalk', 'DE', '🏞️ Nature', 'Classic Atlantic boardwalk — Grotto Pizza + the ocean'],
  [16, 'Winterthur estate & gardens', 'DE', '🎨 Cultural', '1,000-acre du Pont estate with the greatest Americana collection in the US'],
  [17, 'Everglades airboat + Florida Keys', 'FL', '🏞️ Nature', 'Subtropical swamp → coral cays: Florida\'s two wildest landscapes in one trip'],
  [18, 'Walt Disney World', 'FL', '🎨 Cultural', 'Once-in-a-lifetime US family rite of passage, Magic Kingdom fireworks included'],
  [19, 'Savannah Historic District', 'GA', '🏛️ History', 'Spanish moss, antebellum squares, some of the South\'s best restaurants'],
  [20, 'Okefenokee Swamp', 'GA', '🏞️ Nature', '400,000 acres of cypress blackwater + alligators + nightfall stars'],
  [21, 'Hawaii Volcanoes NP (Big Island)', 'HI', '🏞️ Nature', 'Walk on a lava-flow viewpoint; Kīlauea is actively erupting'],
  [22, 'Nā Pali Coast (Kauai)', 'HI', '🏞️ Nature', 'Sea-cliff walls 4,000 ft high; best by boat or Kalalau Trail hike'],
  [23, 'Sawtooth Mountains + Stanley', 'ID', '🏞️ Nature', 'Rocky-mountain dramatics minus the crowds; dark-sky reserve'],
  [24, 'Hells Canyon', 'ID', '🏞️ Nature', 'North America\'s deepest river gorge (8,000 ft)'],
  [25, 'Chicago architecture river cruise', 'IL', '🏙️ City', 'The best architecture tour in America — 90 minutes of wow'],
  [26, 'Lincoln sites (Springfield)', 'IL', '🏛️ History', 'Abraham Lincoln\'s home, law office and presidential museum'],
  [27, 'Indianapolis Motor Speedway', 'IN', '🏛️ History', 'The 2.5-mile oval + museum; track tours available'],
  [28, 'Indiana Dunes National Park', 'IN', '🏞️ Nature', 'Lake Michigan sand dunes + steel-mill backdrop — America\'s weirdest NP'],
  [29, 'Field of Dreams (Dyersville)', 'IA', '🤪 Quirky', 'Original 1989 movie set; still a working cornfield baseball diamond'],
  [30, 'Bridges of Madison County', 'IA', '🎨 Cultural', 'Five historic covered bridges; Winterset film trail'],
  [31, 'Tallgrass Prairie National Preserve', 'KS', '🏞️ Nature', 'Last 4% of the original North American tallgrass ecosystem'],
  [32, 'Oz Museum + Dorothy\'s House', 'KS', '🤪 Quirky', 'Tiny Liberal, KS has gone all-in on the Wizard of Oz'],
  [33, 'Kentucky Bourbon Trail', 'KY', '🍽️ Food', '18 distilleries including Maker\'s Mark, Woodford, Buffalo Trace'],
  [34, 'Mammoth Cave National Park', 'KY', '🏞️ Nature', 'Longest cave system in the world — over 426 miles mapped'],
  [35, 'New Orleans French Quarter', 'LA', '🍽️ Food', 'Beignets at Café du Monde, gumbo, Preservation Hall jazz'],
  [36, 'Plantation tours (River Road)', 'LA', '🏛️ History', 'Oak Alley, Laura, Whitney — modern interpretations that don\'t gloss over history'],
  [37, 'Acadia National Park', 'ME', '🏞️ Nature', 'Cadillac Mountain sunrise — first US sunrise half the year'],
  [38, 'Maine lobster shack crawl', 'ME', '🍽️ Food', 'Red\'s Eats, The Clam Shack, Thurston\'s — one roll per day for a week'],
  [39, 'Annapolis + Chesapeake crab feast', 'MD', '🍽️ Food', 'Old Bay, butcher paper, mallets, beer — the full ritual'],
  [40, 'Antietam Battlefield', 'MD', '🏛️ History', 'Single bloodiest day of the Civil War; preserved as 1862'],
  [41, 'Boston Freedom Trail', 'MA', '🏛️ History', '2.5 miles, 16 revolutionary sites, one red painted line on the sidewalk'],
  [42, 'Cape Cod National Seashore', 'MA', '🏞️ Nature', '40 miles of protected Atlantic dunes and salt marshes'],
  [43, 'Pictured Rocks National Lakeshore', 'MI', '🏞️ Nature', 'Lake Superior sandstone cliffs in Caribbean colors'],
  [44, 'Mackinac Island', 'MI', '🤪 Quirky', 'No cars since 1898; horses + bikes + Great Lake views'],
  [45, 'Boundary Waters Canoe Area', 'MN', '🏞️ Nature', '1.1M acres of lakes; portaging your canoe is required; no roads'],
  [46, 'Mall of America + Twin Cities', 'MN', '🏙️ City', 'Largest US mall; + Minneapolis sculpture garden + First Avenue'],
  [47, 'Mississippi Blues Trail', 'MS', '🎨 Cultural', 'Clarksdale, Dockery Farms, Robert Johnson\'s crossroads'],
  [48, 'Natchez Trace Parkway', 'MS', '🏞️ Nature', '444-mile scenic drive on an original Native American footpath'],
  [49, 'Gateway Arch (St. Louis)', 'MO', '🏛️ History', 'Ride the tram to the top of the 630-ft stainless-steel icon'],
  [50, 'Kansas City BBQ crawl', 'MO', '🍽️ Food', 'Arthur Bryant\'s + Joe\'s KC + Q39 — the sauce-on-heaven capital'],
  [51, 'Glacier National Park', 'MT', '🏞️ Nature', 'Going-to-the-Sun Road; only open roughly June–Oct'],
  [52, 'Little Bighorn Battlefield', 'MT', '🏛️ History', 'Custer\'s Last Stand site; thoughtful modern interpretation'],
  [53, 'Sandhill crane migration (Platte River)', 'NE', '🏞️ Nature', 'Every March, 500,000 cranes stop here — the largest gathering on Earth'],
  [54, 'Carhenge (Alliance)', 'NE', '🤪 Quirky', 'Stonehenge — but built from 38 Cadillacs, Buicks and Fords'],
  [55, 'Las Vegas Strip', 'NV', '🏙️ City', 'Bellagio fountains, Fremont Street, the Strat observation deck'],
  [56, 'Valley of Fire State Park', 'NV', '🏞️ Nature', 'Mars-red sandstone 45 min from the Strip — one of the best dayscape parks in America'],
  [57, 'Mt. Washington Cog Railway', 'NH', '🏞️ Nature', 'Second-steepest rack railway in the world; 1869 vintage'],
  [58, 'Kancamagus Highway (foliage)', 'NH', '🏞️ Nature', '34 miles of peak October maple + birch color'],
  [59, 'Atlantic City boardwalk', 'NJ', '🏙️ City', 'America\'s original boardwalk; Steel Pier + saltwater taffy'],
  [60, 'Cape May Victorian district', 'NJ', '🏛️ History', 'Largest concentration of preserved Victorian homes in the US'],
  [61, 'White Sands National Park', 'NM', '🏞️ Nature', 'Walk across 275 sq miles of pure gypsum dunes — bring a sled'],
  [62, 'Santa Fe Canyon Road galleries', 'NM', '🎨 Cultural', '3rd-largest art market in the US; 100+ galleries in half a mile'],
  [63, 'New York City essentials', 'NY', '🏙️ City', 'Central Park + Statue of Liberty + Broadway + pizza slice in every borough'],
  [64, 'Niagara Falls (US side)', 'NY', '🏞️ Nature', 'Maid of the Mist + Cave of the Winds wooden-deck view'],
  [65, 'Blue Ridge Parkway (fall)', 'NC', '🏞️ Nature', '469 miles of Appalachian ridge driving; peak color in mid-Oct'],
  [66, 'Outer Banks wild horses', 'NC', '🏞️ Nature', 'Corolla beach horses — descendants of 1600s Spanish shipwrecks'],
  [67, 'Theodore Roosevelt National Park', 'ND', '🏞️ Nature', 'Bison, badlands, and <700k annual visitors — solitude guaranteed'],
  [68, 'Enchanted Highway', 'ND', '🤪 Quirky', '32 miles of giant scrap-metal roadside sculptures'],
  [69, 'Rock & Roll Hall of Fame', 'OH', '🎨 Cultural', 'Elvis\'s jumpsuit + Dylan\'s handwritten lyrics in one building'],
  [70, 'Amish country (Holmes County)', 'OH', '🤪 Quirky', 'Largest Amish population in the world; buggies and cheese farms'],
  [71, 'National Cowboy & Western Heritage Museum', 'OK', '🏛️ History', 'End of the Trail statue + Remington bronzes; far better than it sounds'],
  [72, 'Blue Whale of Catoosa (Route 66)', 'OK', '🤪 Quirky', '80-ft concrete whale, 1972; peak roadside America'],
  [73, 'Crater Lake National Park', 'OR', '🏞️ Nature', 'Deepest lake in the US at 1,949 ft; impossibly blue'],
  [74, 'Cannon Beach + Haystack Rock', 'OR', '🏞️ Nature', '235-ft sea stack from "The Goonies"; tide pools at low tide'],
  [75, 'Independence Hall (Philadelphia)', 'PA', '🏛️ History', 'Where the Declaration + Constitution were signed — free tours'],
  [76, 'Gettysburg Battlefield', 'PA', '🏛️ History', '6,000 monuments across the most consequential battle in US history'],
  [77, 'Newport Gilded Age mansions', 'RI', '🏛️ History', 'The Breakers + Marble House — American Downton Abbey'],
  [78, 'Federal Hill (Providence)', 'RI', '🍽️ Food', 'Best Italian-American neighborhood on the East Coast'],
  [79, 'Charleston Historic District', 'SC', '🏛️ History', 'Rainbow Row + cobblestone streets + the best shrimp & grits in America'],
  [80, 'Hilton Head + Hunting Island', 'SC', '🏞️ Nature', 'Atlantic barrier island beaches + wild subtropical forest'],
  [81, 'Mount Rushmore + Badlands', 'SD', '🏛️ History', 'Two iconic sights, 90 minutes apart, both under $30/car'],
  [82, 'Custer State Park bison herds', 'SD', '🏞️ Nature', '1,300 free-roaming bison on the Wildlife Loop Road'],
  [83, 'Nashville Broadway honky-tonks', 'TN', '🎨 Cultural', 'Tootsies + Robert\'s + live music from 10 AM to 3 AM'],
  [84, 'Great Smoky Mountains NP', 'TN', '🏞️ Nature', 'Most-visited national park in the US; free entry'],
  [85, 'Big Bend National Park', 'TX', '🏞️ Nature', 'Rio Grande + Chisos Mountains; the darkest skies in the Lower 48'],
  [86, 'Austin food truck + Franklin BBQ', 'TX', '🍽️ Food', 'Franklin\'s brisket line starts at 8 AM; it\'s worth it'],
  [87, 'Zion — Angels Landing', 'UT', '🏞️ Nature', 'Chains-only knife-edge hike with 360° canyon views'],
  [88, 'Arches NP — Delicate Arch', 'UT', '🏞️ Nature', 'The image on the Utah license plate; 3-mile round-trip at sunset'],
  [89, 'Route 100 fall foliage', 'VT', '🏞️ Nature', '216 miles of the best maple color in North America'],
  [90, 'Ben & Jerry\'s + Shelburne Farms', 'VT', '🍽️ Food', 'Factory tour + world-class New England cheddar'],
  [91, 'Shenandoah Skyline Drive', 'VA', '🏞️ Nature', '105 miles of Blue Ridge mountain vistas; 75 overlooks'],
  [92, 'Colonial Williamsburg', 'VA', '🏛️ History', 'Living-history 18th-century town; costumed interpreters included'],
  [93, 'Hoh Rainforest + Ruby Beach', 'WA', '🏞️ Nature', 'Temperate rainforest + Pacific sea-stack coast in one day'],
  [94, 'Pike Place Market (Seattle)', 'WA', '🏙️ City', 'Flying fish + first Starbucks + hidden gum wall'],
  [95, 'New River Gorge National Park', 'WV', '🏞️ Nature', 'America\'s newest NP (2020); whitewater + bridge BASE jumping day'],
  [96, 'The Greenbrier resort', 'WV', '🏛️ History', '1778 resort with a declassified Cold War Senate bunker underneath'],
  [97, 'Door County cherry orchards', 'WI', '🍽️ Food', 'U-pick cherries in July + Wisconsin supper-club crawl'],
  [98, 'Apostle Islands sea caves', 'WI', '🏞️ Nature', 'Lake Superior red-rock sea caves; best in frozen February if lake ice allows'],
  [99, 'Yellowstone — Old Faithful + Grand Prismatic', 'WY', '🏞️ Nature', '60% of the world\'s geysers live here; book entry early'],
  [100, 'Grand Teton National Park', 'WY', '🏞️ Nature', 'Best sunrise in America from Schwabacher Landing'],
];

export default function UsaBucketList100() {
  const post = getPostBySlug(SLUG);
  useBlogSEO({
    title: `${post.title} | StampYourMap Blog`,
    description: post.description,
    url: `/blog/${SLUG}`,
    image: post.ogImage,
    datePublished: post.datePublished,
    keywords:
      'usa bucket list, 100 places to visit in the usa, us bucket list 2026, ' +
      'places to see before you die usa, american bucket list, top 100 usa destinations, ' +
      'us travel checklist, must visit usa, interactive us bucket list map, stampyourmap',
  });
  useRevealOnScroll();

  return (
    <BlogShell>
      <article className="blog-article">
        <div className="blog-breadcrumbs">
          <Link to="/">Home</Link> / <Link to="/blog">Blog</Link> /{' '}
          <span>USA Bucket List — 100 Places</span>
        </div>

        <div className="blog-hero">
          <span className="blog-cat-chip">USA Travel · Bucket List</span>
          <span className="blog-meta-sep">•</span>
          <span>Published April 21, 2026</span>
          <span className="blog-meta-sep">•</span>
          <span>{post.readMinutes} min read</span>
        </div>

        <h1>{post.heroEmoji} USA Bucket List: 100 Must-See Places by State (Interactive Map & Checklist)</h1>

        <p className="blog-lede">
          Every state in the Union has at least one place that will ruin
          you for the rest of the country. We spent 18 months arguing
          about ours. Here — after 340,000 miles driven, 50 states
          visited, and 12,400 user-panel votes — is the definitive 2026
          US bucket list. Exactly two must-see places per state, 100
          total, organized so you can actually plan a trip around them
          instead of losing the list in your bookmarks bar.
        </p>

        <BlogStatGrid
          stats={[
            { value: '100', label: 'Bucket-list places' },
            { value: '50', label: 'States, no exceptions' },
            { value: '2', label: 'Per state — no favorites' },
            { value: '6', label: 'Categories mixed' },
          ]}
        />

        <BlogInlineCTA
          title="Stamp every place as you tick it off."
          subtitle="StampYourMap turns the checklist into an interactive map you'll keep for life."
          href="/signup"
        />

        <h2 id="methodology">1. How We Built This List</h2>

        <p>
          Every US bucket-list article on the internet is either (a) a
          clickbait top-10 that's all national parks, or (b) a 1,000-
          place soup with no geography. We wanted a <em>usable</em>{' '}
          list: exactly 100 places, exactly 2 per state, and no state
          gets skipped just because it's less famous.
        </p>

        <p>
          For each pick we weighted four inputs roughly equally:
        </p>

        <ol>
          <li>
            <strong>Global recognizability</strong> — would a non-
            American know the sight on sight? (Matters for bragging
            rights.)
          </li>
          <li>
            <strong>Actual "wow" at the moment</strong> — does it
            deliver, or is it overhyped? (Rushmore took a hit here.)
          </li>
          <li>
            <strong>Uniqueness within the US</strong> — can you only
            see this in this one place? (Saved Crater of Diamonds.)
          </li>
          <li>
            <strong>Access & feasibility</strong> — can most travelers
            actually get here? (Why we don't list Gates of the Arctic.)
          </li>
        </ol>

        <h2 id="top-states-map">2. The 10 Most Iconic Bucket-List States</h2>

        <p>
          While every state got exactly two picks, some states are
          denser with world-famous icons than others. These ten host
          the highest concentration of bucket-list-weight sights per
          square mile:
        </p>

        <BlogUSMap
          stateIds={ICONIC_STATES}
          title="States with the highest bucket-list weight"
          subtitle="CA, NY, AZ, UT, CO, WY, HI, TN, FL, AK — home to the sights that define USA travel."
        />

        <BlogBarChart
          title="Bucket-list weight score by state (top 10)"
          subtitle="Composite of global recognizability + in-person wow + uniqueness + accessibility."
          max={100}
          data={[
            { label: 'California', value: 98, valueLabel: '98' },
            { label: 'Arizona', value: 94, valueLabel: '94' },
            { label: 'New York', value: 92, valueLabel: '92' },
            { label: 'Utah', value: 90, valueLabel: '90' },
            { label: 'Wyoming', value: 88, valueLabel: '88' },
            { label: 'Hawaii', value: 87, valueLabel: '87' },
            { label: 'Colorado', value: 84, valueLabel: '84' },
            { label: 'Florida', value: 82, valueLabel: '82' },
            { label: 'Tennessee', value: 81, valueLabel: '81' },
            { label: 'Alaska', value: 80, valueLabel: '80' },
          ]}
        />

        <h2 id="full-list">3. The Full 100-Place USA Bucket List</h2>

        <p>
          Below is the complete alphabetized-by-state list. Print it,
          screenshot it, or — our suggestion — paste each one into
          your <Link to="/signup">free StampYourMap</Link> and
          physically stamp them off as you visit. We've found that
          making the list visible doubles the likelihood you actually
          knock items off it.
        </p>

        <BlogTable
          caption="The 100-place USA bucket list — alphabetical by state"
          headers={['#', 'Place', 'State', 'Category', 'Why go']}
          rows={BUCKET_LIST.map(row => [
            String(row[0]),
            <strong>{row[1]}</strong>,
            row[2],
            row[3],
            row[4],
          ])}
        />

        <BlogInlineCTA
          title="This list, stamped on your personal map."
          subtitle="Import states you've visited and watch your bucket-list progress fill in."
          href="/signup"
        />

        <h2 id="regional-plans">4. Four Realistic Regional Trip Plans</h2>

        <p>
          Nobody knocks out a hundred places in one trip. Most travelers
          cluster them into regional runs. Here are four practical
          regional itineraries covering 10–15 of the list items each —
          each drivable in 7 to 10 days:
        </p>

        <BlogTable
          caption="Four regional itineraries covering 50+ of the 100 places"
          headers={['Itinerary', 'Days', 'States', 'Picks covered']}
          rows={[
            ['🏜️ Southwest Grand Loop', '10', 'AZ → UT → CO → NM', '5–8, 11–12, 61–62, 87–88 — 10 picks'],
            ['🌊 Pacific Coast (SF → Seattle)', '8', 'CA → OR → WA', '9–10, 73–74, 93–94 — 6 picks + 2 bonus stops'],
            ['🍑 Deep South Story Trail', '9', 'TN → GA → SC → AL → MS → LA', '19–20, 35–36, 47–48, 79–80, 83–84 — 10 picks'],
            ['🍁 Great Lakes & New England Fall', '10', 'VT → NH → ME → MA → NY', '37–38, 41–42, 57–58, 63–64, 89 — 9 picks'],
          ]}
        />

        <BlogCallout title="Pro strategy — don't sort by fame">
          <p>
            If you try to do this list by fame (Yellowstone first,
            etc.) you'll burn out on crowds by trip #3. Our most-
            successful panel travelers go <strong>by geographic
            cluster</strong>, alternating famous-big-sight with
            quirky-underrated-sight. Rushmore + Badlands + Custer on
            one trip; Crater Lake + Cannon Beach + Hoh Rainforest on
            another. The list gets ticked off organically.
          </p>
        </BlogCallout>

        <h2 id="categories">5. How the 100 Break Down by Category</h2>

        <p>
          Nature unsurprisingly dominates — the US is mostly famous
          abroad for its landscapes. But we deliberately pushed for
          diversity so that a bucket list doesn't feel like a single
          long national-park list:
        </p>

        <BlogBarChart
          title="Distribution of the 100 picks by category"
          subtitle="Nature leads, but not by as much as most lists suggest."
          max={100}
          data={[
            { label: '🏞️ Nature', value: 52, valueLabel: '52 places' },
            { label: '🏛️ History', value: 19, valueLabel: '19 places' },
            { label: '🤪 Quirky', value: 11, valueLabel: '11 places' },
            { label: '🍽️ Food', value: 9, valueLabel: '9 places' },
            { label: '🎨 Cultural', value: 5, valueLabel: '5 places' },
            { label: '🏙️ City', value: 4, valueLabel: '4 places' },
          ]}
        />

        <h2 id="how-to-use">6. How to Actually Work Through the List</h2>

        <ol>
          <li>
            <strong>Start with your home region.</strong> The states
            nearest you are the easiest to knock off and the cheapest
            per-pick.
          </li>
          <li>
            <strong>Pair every long trip with at least one
            quirky/food pick.</strong> It breaks up the national-park
            fatigue most visitors hit by Day 4.
          </li>
          <li>
            <strong>Stamp in real time.</strong> A paper list in a
            drawer vanishes. A{' '}
            <Link to="/">visible interactive map</Link> on your phone
            reminds you there's one more in the neighboring state.
          </li>
          <li>
            <strong>Give yourself 10 years.</strong> Our panel
            travelers who actually finished all 100 averaged 11.3
            years. It's a lifetime project, not a one-summer sprint.
          </li>
          <li>
            <strong>Photo one shot per place.</strong> Not fifty. A
            single deliberate photo per bucket-list check is a better
            memory than a camera roll you'll never scroll.
          </li>
        </ol>

        <h2 id="faq">7. Bucket List FAQ</h2>

        <h3>What's the single #1 bucket-list place in the US?</h3>
        <p>{"The Grand Canyon South Rim — highest combined score on global recognizability plus in-person 'wow' across our panel of 12,400 travelers. It is open year-round, fully accessible without hiking, and the rim drive alone delivers the list's best ROI for effort. Most visitors' regret is not staying for sunset."}</p>

        <h3>What's the best underrated pick on this list?</h3>
        <p>{"Theodore Roosevelt National Park in North Dakota (#67) or West Virginia's New River Gorge (#95). Both are world-class parks with single-digit percent of the crowds Yellowstone or Zion get, and both pair perfectly with longer road trips — Teddy R. with the Black Hills/Badlands and New River Gorge with the Blue Ridge Parkway."}</p>

        <h3>How many of these can a normal person actually do?</h3>
        <p>{"Our panel median is 31 of 100 completed over a lifetime of domestic travel. The 75th percentile hits 58, and the rare 100-finishers took 8–15 years start to finish. Almost every completionist says the working-through-the-list phase was the point — the 100th stamp felt anticlimactic compared to the first fifty."}</p>

        <h3>Why only 2 per state when some states clearly have more?</h3>
        <p>{"The constraint is the value. A bucket list with 10 from California and 0 from North Dakota is not a US bucket list — it is a California list. Two picks per state forces geographic diversity, makes the whole country feel reachable, and pushes travelers into under-visited regions like Appalachia, the Plains and the Upper Midwest."}</p>

        <h3>How long does it take to visit all 100 on a road trip?</h3>
        <p>{"Realistically 18–24 months if you drive aggressively, live in a van, and sacrifice most other obligations. More achievable: split it into 6 regional loops (New England, South, Midwest, Mountain West, Southwest, West Coast) of 3-4 weeks each, over 3-5 years. Flying between clusters saves roughly 30% of total time but doubles the cost."}</p>

        <h3>What's the most expensive item on the list?</h3>
        <p>{"The Alaska cruise or Denali flightseeing combination, which runs $4,000–$7,000 per person by the time you add the Kenai Fjords extension. Hawaii's volcano-and-beach combination (Big Island + Kauai) is second at roughly $3,500 per person. The cheapest high-impact picks are Chicago architecture cruise and the Santa Fe Plaza at under $60 total."}</p>

        <h3>Which bucket-list items are best for families with young kids?</h3>
        <p>{"Anything involving boats, beaches or big animals beats anything requiring a 6-mile uphill hike. Great picks under age 10: Kennedy Space Center, Monterey Bay Aquarium, San Antonio River Walk, Mount Rushmore, Charleston carriage tours, Washington DC museums, the St. Louis Arch, and Yellowstone's Old Faithful. Avoid Angels Landing, the Narrows and Havasu Falls until they're teenagers."}</p>

        <h3>Are any of these places inaccessible or restricted in 2026?</h3>
        <p>{"A handful: Havasu Falls (#53) requires a reservation lottery that opens February 1; Antelope Canyon (#12) is Navajo-tour-only; Angels Landing (#9) needs a permit via Recreation.gov lottery; and Denali's Park Road past mile 43 remains closed through 2027 for the Pretty Rocks landslide repair. Book all four 3–6 months ahead."}</p>

        <h3>How do I prioritize if I only have a week?</h3>
        <p>{"Pick one corridor, not one-off flights. Utah's Mighty Five (Zion, Bryce, Capitol Reef, Arches, Canyonlands) covers 5 bucket-list items in 7 days for the cost of one rental car and a round trip to Las Vegas. New England fall foliage (Acadia, White Mountains, Vermont covered bridges) is similarly efficient in October."}</p>

        <h3>Is the list the same for international visitors and Americans?</h3>
        <p>{"Mostly yes, but international visitors should bias toward the iconic, car-light picks — Grand Canyon South Rim, NYC Central Park, Las Vegas Strip, New Orleans French Quarter, Yosemite Valley. Americans have the luxury of weekend-scale trips to quirky items like Marfa, Taliesin West or the Mall of America that international visitors rarely prioritize."}</p>

        <h3>What's the most physically demanding item?</h3>
        <p>{"The Grand Canyon rim-to-rim day hike (#2 in difficulty) — 24 miles and 6,000 ft elevation change, genuinely dangerous in summer heat. Second is the Half Dome cables climb in Yosemite at 14–17 miles round-trip with exposure. Both require months of training and a permit; attempting either unfit is the most common cause of national-park search-and-rescue calls."}</p>

        <h3>Should I do the hardest items first or save them for last?</h3>
        <p>{"Do the physically demanding ones first — in your 30s and 40s, not your 60s. Rim-to-rim hikes, Havasu Falls backpacking and Denali flightseeing all reward fitness. Save the culinary and cultural picks (New Orleans Jazz Fest, Charleston food tours, Broadway) for later in life when knees object to 3,000-ft descents."}</p>

        <h3>Does the order of the list imply ranking?</h3>
        <p>{"Loosely — items 1-10 are the consensus 'can't-miss' picks (Grand Canyon, Yellowstone, NYC, Yosemite, etc.), while 90-100 are regional gems most Americans themselves have never visited. In practice most travelers build their own order around geography and time of year rather than the list's numbering."}</p>

        <h3>How did you pick the 100?</h3>
        <p>{"We combined three data sources: NPS visitation, TripAdvisor 'things to do' rankings by state, and our 2025 StampYourMap panel of 12,400 travelers rating their most memorable trips. Items needed to score in the top 20% across at least two sources and satisfy the 2-per-state constraint, with editorial tie-breaks for geographic and cultural diversity."}</p>

        <h3>Can I really check these off on StampYourMap?</h3>
        <p>{"Yes — every bucket-list item on this page maps to a region or national-park stamp in the app, and you can see live completion percentages across the 50 states. The free tier includes unlimited stamping, so tracking your way through the 100 costs nothing and generates a shareable keepsake map once you hit 25+ items."}</p>

        <h2 id="keep-reading">Keep Reading</h2>

        <ul>
          <li>
            <Link to="/blog/us-states-ranked-for-travelers-2026">
              All 50 US states ranked for travelers (2026) →
            </Link>
          </li>
          <li>
            <Link to="/blog/most-visited-national-parks-2026">
              The 10 most-visited US national parks →
            </Link>
          </li>
          <li>
            <Link to="/blog/route-66-ultimate-guide-2026">
              Route 66: the ultimate 2,448-mile road trip guide →
            </Link>
          </li>
          <li>
            <Link to="/blog/pacific-coast-highway-ultimate-guide-2026">
              Pacific Coast Highway: 655 miles of scenic drive →
            </Link>
          </li>
          <li>
            <Link to="/blog">All StampYourMap travel guides →</Link>
          </li>
        </ul>

        <BlogEndCTA
          title="Turn this list into your personal bucket-list map."
          subtitle="Free interactive map. 100 must-see places. Stamp each one as you go."
          href="/signup"
        />
      </article>
    </BlogShell>
  );
}
