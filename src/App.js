import React, { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';
import InstallAppButton from './components/InstallAppButton';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { initGlobalClickTracking, initRouteTracking } from './utils/analytics';
import { warmupApi } from './api/api';
import './App.css';
import './mobile.css';

// Code-split every non-critical route so the initial bundle is just landing + login.
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
const About                     = lazy(() => import('./components/About'));
const Contact                   = lazy(() => import('./components/Contact'));

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
      <SpeedInsights />
      <InstallAppButton />
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
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
