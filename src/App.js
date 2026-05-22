import React, { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import PrivateRoute from './components/PrivateRoute';
import { initGlobalClickTracking, initRouteTracking } from './utils/analytics';
import { warmupApi } from './api/api';
import './App.css';
import './mobile.css';
import './polish.css';

// Code-split every non-critical route so the initial bundle is just landing.
// (Login, InstallApp, SpeedInsights all lazy-loaded — they aren't needed
// for first paint of the landing hero.)
const Login                     = lazy(() => import('./components/Login'));
const InstallAppButton          = lazy(() => import('./components/InstallAppButton'));
const LazySpeedInsights         = lazy(() =>
  import('@vercel/speed-insights/react').then(m => ({ default: m.SpeedInsights }))
);
const Signup          = lazy(() => import('./components/Signup'));
const Dashboard       = lazy(() => import('./components/Dashboard'));
const TravelJournal   = lazy(() => import('./components/TravelJournal'));
const WorldMapView    = lazy(() => import('./components/WorldMapView'));
const Statistics      = lazy(() => import('./components/Statistics'));
const TravelPlanner   = lazy(() => import('./components/TravelPlanner'));
const Settings        = lazy(() => import('./components/Settings'));
const Memories        = lazy(() => import('./components/Memories'));
const Friends         = lazy(() => import('./components/Friends'));
const FriendProfile   = lazy(() => import('./components/FriendProfile'));
const ForgotPassword  = lazy(() => import('./components/ForgotPassword'));
const Admin           = lazy(() => import('./components/Admin'));
const BlogIndex                 = lazy(() => import('./components/Blog/BlogIndex'));
const Route66UltimateGuide      = lazy(() => import('./components/Blog/posts/Route66UltimateGuide'));
const UsStatesRanked2026        = lazy(() => import('./components/Blog/posts/UsStatesRanked2026'));
const MostVisitedNationalParks  = lazy(() => import('./components/Blog/posts/MostVisitedNationalParks2026'));
const PacificCoastHighway       = lazy(() => import('./components/Blog/posts/PacificCoastHighway2026'));
const AmericanTravelTrends      = lazy(() => import('./components/Blog/posts/AmericanTravelTrends2026'));
const UsaBucketList100          = lazy(() => import('./components/Blog/posts/UsaBucketList100'));
const PhilippinesTravelGuide    = lazy(() => import('./components/Blog/posts/PhilippinesTravelGuide2026'));
const BestPhilippineIslands     = lazy(() => import('./components/Blog/posts/BestPhilippineIslands2026'));
const PhilippinesBeaches        = lazy(() => import('./components/Blog/posts/PhilippinesBeaches2026'));
const FilipinoFoodGuide         = lazy(() => import('./components/Blog/posts/FilipinoFoodGuide2026'));
const PhilippinesBudgetTravel   = lazy(() => import('./components/Blog/posts/PhilippinesBudgetTravel2026'));
const TwoWeekPhilippinesItin    = lazy(() => import('./components/Blog/posts/TwoWeekPhilippinesItinerary2026'));
const JapanTravelGuide          = lazy(() => import('./components/Blog/posts/JapanTravelGuide2026'));
const TwoWeekJapanItin          = lazy(() => import('./components/Blog/posts/TwoWeekJapanItinerary2026'));
const BestJapanRegions          = lazy(() => import('./components/Blog/posts/BestJapanRegions2026'));
const JapaneseFoodGuide         = lazy(() => import('./components/Blog/posts/JapaneseFoodGuide2026'));
const JapanCherryBlossom        = lazy(() => import('./components/Blog/posts/JapanCherryBlossom2026'));
const JapanBudgetTravel         = lazy(() => import('./components/Blog/posts/JapanBudgetTravel2026'));
const ThailandTravelGuide       = lazy(() => import('./components/Blog/posts/ThailandTravelGuide2026'));
const TwoWeekThailandItin       = lazy(() => import('./components/Blog/posts/TwoWeekThailandItinerary2026'));
const BestThailandIslands       = lazy(() => import('./components/Blog/posts/BestThailandIslands2026'));
const ThaiFoodGuide             = lazy(() => import('./components/Blog/posts/ThaiFoodGuide2026'));
const BangkokCompleteGuide      = lazy(() => import('./components/Blog/posts/BangkokCompleteGuide2026'));
const ThailandBudgetTravel      = lazy(() => import('./components/Blog/posts/ThailandBudgetTravel2026'));
const ItalyTravelGuide          = lazy(() => import('./components/Blog/posts/ItalyTravelGuide2026'));
const TwoWeekItalyItin          = lazy(() => import('./components/Blog/posts/TwoWeekItalyItinerary2026'));
const BestItalyRegions          = lazy(() => import('./components/Blog/posts/BestItalyRegions2026'));
const ItalianFoodGuide          = lazy(() => import('./components/Blog/posts/ItalianFoodGuide2026'));
const AmalfiCoastGuide          = lazy(() => import('./components/Blog/posts/AmalfiCoastGuide2026'));
const ItalyBudgetTravel         = lazy(() => import('./components/Blog/posts/ItalyBudgetTravel2026'));
const EuropeTravelGuide         = lazy(() => import('./components/Blog/posts/EuropeTravelGuide2026'));
const TwoWeekEuropeItin         = lazy(() => import('./components/Blog/posts/TwoWeekEuropeItinerary2026'));
const BestEuropeanCities        = lazy(() => import('./components/Blog/posts/BestEuropeanCities2026'));
const InterrailEurailGuide      = lazy(() => import('./components/Blog/posts/InterrailEurailGuide2026'));
const EuropeBudgetTravel        = lazy(() => import('./components/Blog/posts/EuropeBudgetTravel2026'));
const BestEuropeanBeaches       = lazy(() => import('./components/Blog/posts/BestEuropeanBeaches2026'));
const FranceTravelGuide         = lazy(() => import('./components/Blog/posts/FranceTravelGuide2026'));
const TwoWeekFranceItin         = lazy(() => import('./components/Blog/posts/TwoWeekFranceItinerary2026'));
const BestFranceRegions         = lazy(() => import('./components/Blog/posts/BestFranceRegions2026'));
const FrenchFoodGuide           = lazy(() => import('./components/Blog/posts/FrenchFoodGuide2026'));
const FrenchRivieraGuide        = lazy(() => import('./components/Blog/posts/FrenchRivieraGuide2026'));
const FranceBudgetTravel        = lazy(() => import('./components/Blog/posts/FranceBudgetTravel2026'));
const SpainTravelGuide          = lazy(() => import('./components/Blog/posts/SpainTravelGuide2026'));
const TwoWeekSpainItin          = lazy(() => import('./components/Blog/posts/TwoWeekSpainItinerary2026'));
const BestSpainRegions          = lazy(() => import('./components/Blog/posts/BestSpainRegions2026'));
const SpanishFoodGuide          = lazy(() => import('./components/Blog/posts/SpanishFoodGuide2026'));
const BarcelonaCompleteGuide    = lazy(() => import('./components/Blog/posts/BarcelonaCompleteGuide2026'));
const SpainBudgetTravel         = lazy(() => import('./components/Blog/posts/SpainBudgetTravel2026'));
const MexicoTravelGuide         = lazy(() => import('./components/Blog/posts/MexicoTravelGuide2026'));
const TwoWeekMexicoItin         = lazy(() => import('./components/Blog/posts/TwoWeekMexicoItinerary2026'));
const BestMexicoDestinations    = lazy(() => import('./components/Blog/posts/BestMexicoDestinations2026'));
const MexicanFoodGuide          = lazy(() => import('./components/Blog/posts/MexicanFoodGuide2026'));
const YucatanGuide              = lazy(() => import('./components/Blog/posts/YucatanCenotesMayanRuinsGuide2026'));
const MexicoBudgetTravel        = lazy(() => import('./components/Blog/posts/MexicoBudgetTravel2026'));
const AustraliaTravelGuide      = lazy(() => import('./components/Blog/posts/AustraliaTravelGuide2026'));
const TwoWeekAustraliaItin      = lazy(() => import('./components/Blog/posts/TwoWeekAustraliaItinerary2026'));
const BestAustralianDest        = lazy(() => import('./components/Blog/posts/BestAustralianDestinations2026'));
const GreatBarrierReefGuide     = lazy(() => import('./components/Blog/posts/GreatBarrierReefGuide2026'));
const AustralianFoodGuide       = lazy(() => import('./components/Blog/posts/AustralianFoodGuide2026'));
const AustraliaBudgetTravel     = lazy(() => import('./components/Blog/posts/AustraliaBudgetTravel2026'));
const GermanyTravelGuide        = lazy(() => import('./components/Blog/posts/GermanyTravelGuide2026'));
const TwoWeekGermanyItin        = lazy(() => import('./components/Blog/posts/TwoWeekGermanyItinerary2026'));
const BestGermanyDestinations   = lazy(() => import('./components/Blog/posts/BestGermanyDestinations2026'));
const GermanFoodGuide           = lazy(() => import('./components/Blog/posts/GermanFoodGuide2026'));
const GermanyChristmasMarkets   = lazy(() => import('./components/Blog/posts/GermanyChristmasMarkets2026'));
const GermanyBudgetTravel       = lazy(() => import('./components/Blog/posts/GermanyBudgetTravel2026'));
const CanadaTravelGuide         = lazy(() => import('./components/Blog/posts/CanadaTravelGuide2026'));
const TwoWeekCanadaItin         = lazy(() => import('./components/Blog/posts/TwoWeekCanadaItinerary2026'));
const BestCanadaDestinations    = lazy(() => import('./components/Blog/posts/BestCanadaDestinations2026'));
const BanffCanadianRockies      = lazy(() => import('./components/Blog/posts/BanffCanadianRockiesGuide2026'));
const CanadianFoodGuide         = lazy(() => import('./components/Blog/posts/CanadianFoodGuide2026'));
const CanadaBudgetTravel        = lazy(() => import('./components/Blog/posts/CanadaBudgetTravel2026'));
const VietnamTravelGuide        = lazy(() => import('./components/Blog/posts/VietnamTravelGuide2026'));
const TwoWeekVietnamItin        = lazy(() => import('./components/Blog/posts/TwoWeekVietnamItinerary2026'));
const BestVietnamDestinations   = lazy(() => import('./components/Blog/posts/BestVietnamDestinations2026'));
const VietnameseFoodGuide       = lazy(() => import('./components/Blog/posts/VietnameseFoodGuide2026'));
const HalongBayHoiAnGuide       = lazy(() => import('./components/Blog/posts/HalongBayHoiAnGuide2026'));
const VietnamBudgetTravel       = lazy(() => import('./components/Blog/posts/VietnamBudgetTravel2026'));
const IranTravelGuide           = lazy(() => import('./components/Blog/posts/IranTravelGuide2026'));
const TwoWeekIranItin           = lazy(() => import('./components/Blog/posts/TwoWeekIranItinerary2026'));
const BestIranDestinations      = lazy(() => import('./components/Blog/posts/BestIranDestinations2026'));
const IsraelTravelGuide         = lazy(() => import('./components/Blog/posts/IsraelTravelGuide2026'));
const TwoWeekIsraelItin         = lazy(() => import('./components/Blog/posts/TwoWeekIsraelItinerary2026'));
const BestIsraelDestinations    = lazy(() => import('./components/Blog/posts/BestIsraelDestinations2026'));
const About                     = lazy(() => import('./components/About'));
const Contact                   = lazy(() => import('./components/Contact'));
const Privacy                   = lazy(() => import('./components/Privacy'));
const Terms                     = lazy(() => import('./components/Terms'));
const Cookies                   = lazy(() => import('./components/Cookies'));

function RouteFallback() {
  return (
    <div style={{
      minHeight: '60vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'var(--text-muted, #888)',
      fontSize: 14,
    }}>
      Loading…
    </div>
  );
}

// 404 page — soft, SEO-friendly, links to popular destinations
function NotFound() {
  useEffect(() => {
    document.title = '404 — Page Not Found · StampYourMap';
    // Tell crawlers explicitly that this is a soft 404 so they don't
    // index it as a real page.
    let m = document.querySelector('meta[name="robots"]');
    const prev = m?.content;
    if (!m) {
      m = document.createElement('meta');
      m.setAttribute('name', 'robots');
      document.head.appendChild(m);
    }
    m.setAttribute('content', 'noindex, nofollow');
    return () => { if (m && prev) m.setAttribute('content', prev); };
  }, []);
  return (
    <div style={{
      minHeight: '70vh', padding: '4rem 1.5rem', maxWidth: 720, margin: '0 auto',
      textAlign: 'center', color: 'var(--text-primary)',
    }}>
      <div style={{ fontSize: '4rem', fontWeight: 800, letterSpacing: '-0.04em', marginBottom: '0.5rem' }}>404</div>
      <h1 style={{ fontSize: '1.6rem', margin: '0 0 0.75rem' }}>This page is off the map</h1>
      <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.55, marginBottom: '1.5rem' }}>
        We couldn&apos;t find what you were looking for. Try one of these
        instead:
      </p>
      <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.5rem' }}>
        {[
          ['/', 'Home'],
          ['/blog', 'Travel blog'],
          ['/about', 'About'],
          ['/contact', 'Contact'],
          ['/signup', 'Create free map'],
        ].map(([href, label]) => (
          <li key={href}>
            <a href={href} style={{
              padding: '8px 16px', borderRadius: 999,
              background: 'rgba(99,102,241,0.1)', color: 'var(--primary-500, #6366f1)',
              textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem',
            }}>{label}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ErrorBoundary — wraps the Suspense tree so a chunk-load failure or
// runtime crash inside any lazy component falls back to a graceful
// "something went wrong" with a reload prompt, instead of a white screen.
class ErrorBoundary extends React.Component {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch(err, info) {
    try {
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'exception', { description: String(err), fatal: true });
      }
      // eslint-disable-next-line no-console
      console.error('App ErrorBoundary caught:', err, info);
    } catch (_) { /* never let the error reporter itself throw */ }
  }
  render() {
    if (!this.state.hasError) return this.props.children;
    return (
      <div style={{
        minHeight: '70vh', padding: '4rem 1.5rem', maxWidth: 560, margin: '0 auto',
        textAlign: 'center', color: 'var(--text-primary)',
      }}>
        <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>⚠️</div>
        <h1 style={{ fontSize: '1.4rem', margin: '0 0 0.75rem' }}>Something went wrong</h1>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.55, marginBottom: '1.5rem' }}>
          A small piece of the app failed to load. A refresh almost always fixes it.
        </p>
        <button
          onClick={() => window.location.reload()}
          style={{
            padding: '12px 22px', borderRadius: 12, border: 'none',
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6 50%, #ec4899)',
            color: '#fff', fontWeight: 700, fontSize: '0.95rem', cursor: 'pointer',
          }}
        >Reload</button>
      </div>
    );
  }
}

function App() {
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) document.documentElement.setAttribute('data-theme', savedTheme);
    initGlobalClickTracking();
    initRouteTracking();
    // Warm Render free-tier dyno + Mongo pool early so auth feels instant
    warmupApi();
  }, []);
  return (
    <BrowserRouter>
      <Suspense fallback={null}>
        <LazySpeedInsights />
        <InstallAppButton />
      </Suspense>
      <ErrorBoundary>
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={
            <PrivateRoute><Dashboard /></PrivateRoute>
          } />
          <Route path="/discover" element={
            <PrivateRoute><TravelJournal /></PrivateRoute>
          } />
          <Route path="/passport" element={
            <PrivateRoute><TravelJournal /></PrivateRoute>
          } />
          <Route path="/journal" element={
            <PrivateRoute><TravelJournal /></PrivateRoute>
          } />
          <Route path="/friends" element={
            <PrivateRoute><Friends /></PrivateRoute>
          } />
          <Route path="/u/:userId" element={
            <PrivateRoute><FriendProfile /></PrivateRoute>
          } />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/admin" element={
            <PrivateRoute><Admin /></PrivateRoute>
          } />
          <Route path="/worldmap" element={
            <PrivateRoute><WorldMapView /></PrivateRoute>
          } />
          <Route path="/statistics" element={
            <PrivateRoute><Statistics /></PrivateRoute>
          } />
          <Route path="/planner" element={
            <PrivateRoute><TravelPlanner /></PrivateRoute>
          } />
          <Route path="/settings" element={
            <PrivateRoute><Settings /></PrivateRoute>
          } />
          <Route path="/memories" element={
            <PrivateRoute><Memories /></PrivateRoute>
          } />
          <Route path="/blog" element={<BlogIndex />} />
          <Route path="/blog/route-66-ultimate-guide-2026" element={<Route66UltimateGuide />} />
          <Route path="/blog/us-states-ranked-for-travelers-2026" element={<UsStatesRanked2026 />} />
          <Route path="/blog/most-visited-national-parks-2026" element={<MostVisitedNationalParks />} />
          <Route path="/blog/pacific-coast-highway-ultimate-guide-2026" element={<PacificCoastHighway />} />
          <Route path="/blog/american-travel-trends-2026" element={<AmericanTravelTrends />} />
          <Route path="/blog/usa-bucket-list-100-places" element={<UsaBucketList100 />} />
          <Route path="/blog/philippines-travel-guide-2026" element={<PhilippinesTravelGuide />} />
          <Route path="/blog/best-philippine-islands-2026" element={<BestPhilippineIslands />} />
          <Route path="/blog/philippines-beaches-2026" element={<PhilippinesBeaches />} />
          <Route path="/blog/filipino-food-guide-2026" element={<FilipinoFoodGuide />} />
          <Route path="/blog/philippines-budget-travel-2026" element={<PhilippinesBudgetTravel />} />
          <Route path="/blog/two-week-philippines-itinerary-2026" element={<TwoWeekPhilippinesItin />} />
          <Route path="/blog/japan-travel-guide-2026" element={<JapanTravelGuide />} />
          <Route path="/blog/two-week-japan-itinerary-2026" element={<TwoWeekJapanItin />} />
          <Route path="/blog/best-japan-regions-2026" element={<BestJapanRegions />} />
          <Route path="/blog/japanese-food-guide-2026" element={<JapaneseFoodGuide />} />
          <Route path="/blog/japan-cherry-blossom-2026" element={<JapanCherryBlossom />} />
          <Route path="/blog/japan-budget-travel-2026" element={<JapanBudgetTravel />} />
          <Route path="/blog/thailand-travel-guide-2026" element={<ThailandTravelGuide />} />
          <Route path="/blog/two-week-thailand-itinerary-2026" element={<TwoWeekThailandItin />} />
          <Route path="/blog/best-thailand-islands-2026" element={<BestThailandIslands />} />
          <Route path="/blog/thai-food-guide-2026" element={<ThaiFoodGuide />} />
          <Route path="/blog/bangkok-complete-guide-2026" element={<BangkokCompleteGuide />} />
          <Route path="/blog/thailand-budget-travel-2026" element={<ThailandBudgetTravel />} />
          <Route path="/blog/italy-travel-guide-2026" element={<ItalyTravelGuide />} />
          <Route path="/blog/two-week-italy-itinerary-2026" element={<TwoWeekItalyItin />} />
          <Route path="/blog/best-italy-regions-2026" element={<BestItalyRegions />} />
          <Route path="/blog/italian-food-guide-2026" element={<ItalianFoodGuide />} />
          <Route path="/blog/amalfi-coast-guide-2026" element={<AmalfiCoastGuide />} />
          <Route path="/blog/italy-budget-travel-2026" element={<ItalyBudgetTravel />} />
          <Route path="/blog/europe-travel-guide-2026" element={<EuropeTravelGuide />} />
          <Route path="/blog/two-week-europe-itinerary-2026" element={<TwoWeekEuropeItin />} />
          <Route path="/blog/best-european-cities-2026" element={<BestEuropeanCities />} />
          <Route path="/blog/interrail-eurail-guide-2026" element={<InterrailEurailGuide />} />
          <Route path="/blog/europe-budget-travel-2026" element={<EuropeBudgetTravel />} />
          <Route path="/blog/best-european-beaches-2026" element={<BestEuropeanBeaches />} />
          <Route path="/blog/france-travel-guide-2026" element={<FranceTravelGuide />} />
          <Route path="/blog/two-week-france-itinerary-2026" element={<TwoWeekFranceItin />} />
          <Route path="/blog/best-france-regions-2026" element={<BestFranceRegions />} />
          <Route path="/blog/french-food-guide-2026" element={<FrenchFoodGuide />} />
          <Route path="/blog/french-riviera-guide-2026" element={<FrenchRivieraGuide />} />
          <Route path="/blog/france-budget-travel-2026" element={<FranceBudgetTravel />} />
          <Route path="/blog/spain-travel-guide-2026" element={<SpainTravelGuide />} />
          <Route path="/blog/two-week-spain-itinerary-2026" element={<TwoWeekSpainItin />} />
          <Route path="/blog/best-spain-regions-2026" element={<BestSpainRegions />} />
          <Route path="/blog/spanish-food-guide-2026" element={<SpanishFoodGuide />} />
          <Route path="/blog/barcelona-complete-guide-2026" element={<BarcelonaCompleteGuide />} />
          <Route path="/blog/spain-budget-travel-2026" element={<SpainBudgetTravel />} />
          <Route path="/blog/mexico-travel-guide-2026" element={<MexicoTravelGuide />} />
          <Route path="/blog/two-week-mexico-itinerary-2026" element={<TwoWeekMexicoItin />} />
          <Route path="/blog/best-mexico-destinations-2026" element={<BestMexicoDestinations />} />
          <Route path="/blog/mexican-food-guide-2026" element={<MexicanFoodGuide />} />
          <Route path="/blog/yucatan-cenotes-mayan-ruins-guide-2026" element={<YucatanGuide />} />
          <Route path="/blog/mexico-budget-travel-2026" element={<MexicoBudgetTravel />} />
          <Route path="/blog/australia-travel-guide-2026" element={<AustraliaTravelGuide />} />
          <Route path="/blog/two-week-australia-itinerary-2026" element={<TwoWeekAustraliaItin />} />
          <Route path="/blog/best-australian-destinations-2026" element={<BestAustralianDest />} />
          <Route path="/blog/great-barrier-reef-guide-2026" element={<GreatBarrierReefGuide />} />
          <Route path="/blog/australian-food-guide-2026" element={<AustralianFoodGuide />} />
          <Route path="/blog/australia-budget-travel-2026" element={<AustraliaBudgetTravel />} />
          <Route path="/blog/germany-travel-guide-2026" element={<GermanyTravelGuide />} />
          <Route path="/blog/two-week-germany-itinerary-2026" element={<TwoWeekGermanyItin />} />
          <Route path="/blog/best-germany-destinations-2026" element={<BestGermanyDestinations />} />
          <Route path="/blog/german-food-guide-2026" element={<GermanFoodGuide />} />
          <Route path="/blog/germany-christmas-markets-2026" element={<GermanyChristmasMarkets />} />
          <Route path="/blog/germany-budget-travel-2026" element={<GermanyBudgetTravel />} />
          <Route path="/blog/canada-travel-guide-2026" element={<CanadaTravelGuide />} />
          <Route path="/blog/two-week-canada-itinerary-2026" element={<TwoWeekCanadaItin />} />
          <Route path="/blog/best-canada-destinations-2026" element={<BestCanadaDestinations />} />
          <Route path="/blog/banff-canadian-rockies-guide-2026" element={<BanffCanadianRockies />} />
          <Route path="/blog/canadian-food-guide-2026" element={<CanadianFoodGuide />} />
          <Route path="/blog/canada-budget-travel-2026" element={<CanadaBudgetTravel />} />
          <Route path="/blog/vietnam-travel-guide-2026" element={<VietnamTravelGuide />} />
          <Route path="/blog/two-week-vietnam-itinerary-2026" element={<TwoWeekVietnamItin />} />
          <Route path="/blog/best-vietnam-destinations-2026" element={<BestVietnamDestinations />} />
          <Route path="/blog/vietnamese-food-guide-2026" element={<VietnameseFoodGuide />} />
          <Route path="/blog/halong-bay-hoi-an-guide-2026" element={<HalongBayHoiAnGuide />} />
          <Route path="/blog/vietnam-budget-travel-2026" element={<VietnamBudgetTravel />} />
          <Route path="/blog/iran-travel-guide-2026" element={<IranTravelGuide />} />
          <Route path="/blog/two-week-iran-itinerary-2026" element={<TwoWeekIranItin />} />
          <Route path="/blog/best-iran-destinations-2026" element={<BestIranDestinations />} />
          <Route path="/blog/israel-travel-guide-2026" element={<IsraelTravelGuide />} />
          <Route path="/blog/two-week-israel-itinerary-2026" element={<TwoWeekIsraelItin />} />
          <Route path="/blog/best-israel-destinations-2026" element={<BestIsraelDestinations />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/cookies" element={<Cookies />} />
          {/* Catch-all 404 — keeps Google from indexing mistyped URLs as
              real pages and gives users a useful soft-404 with helpful links. */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;
