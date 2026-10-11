import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

// react-snap pre-renders every public route into a real HTML snapshot
// at `npm run build` time (puppeteer visits each URL, dumps the DOM,
// and writes it to build/<route>/index.html). This matters for two
// reasons that are directly causing production pain today:
//
//   1. Google Search Console shows ~70 blog URLs "Discovered —
//      currently not indexed" with 1970-01-01 crawl dates. Googlebot
//      renders JS, but it deprioritizes CSR sites in the crawl queue
//      because rendering is expensive. Real HTML snapshots cut that
//      cost to zero, so pages get indexed on first visit.
//
//   2. Google Ads flags the site as "Low value content" and "Not
//      found" because its ad crawler fetches the raw bundle, sees
//      only `<div id="root"></div>`, and concludes the landing page
//      has no content. Pre-rendered HTML gives it the full hero copy
//      + feature grid up front.
//
// On a route served from a pre-rendered snapshot the DOM already has
// children, so React MUST hydrate rather than render — otherwise it
// throws away the server HTML, defeating the whole point and causing
// a visible content flash on load.
const rootElement = document.getElementById('root');
if (rootElement.hasChildNodes()) {
  ReactDOM.hydrate(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    rootElement
  );
} else {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    rootElement
  );
} 