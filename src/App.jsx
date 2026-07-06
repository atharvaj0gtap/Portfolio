import { lazy, Suspense, useCallback, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import StructuredData from './SEO/StructuredData';
import SkyField from './components/SkyField';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './sections/Home';
import Work from './sections/Work';
import About from './sections/About';
import Contact from './sections/Contact';

/* Easter egg: lazy so the dive to Ursa Minor costs nothing until found. */
const UrsaMinor = lazy(() => import('./components/UrsaMinor'));

function App() {
  /* 'closed' → 'open' → 'closing' → 'closed'. While open, the page warps
     away from the clicked point and the sky takes over. */
  const [sky, setSky] = useState('closed');
  const [warpOrigin, setWarpOrigin] = useState('50% 50%');

  const flyToPolaris = (origin) => {
    setWarpOrigin(origin);
    setSky('open');
  };

  /* Stable identities: UrsaMinor's effects depend on these, and recreating
     them each render made the scroll-lock tear down and re-run mid-flight. */
  const skyClose = useCallback(() => setSky('closing'), []);
  const skyGone = useCallback(() => setSky('closed'), []);

  return (
    <>
      <Helmet>
        <title>Atharva Jagtap — Software engineer, UBC '25 | JagtapWorks</title>
        <meta
          name="description"
          content="Atharva Jagtap is a 2025 UBC Computer Science graduate who ships real software — an AI policy-comparison pipeline for an insurance client, carbon-accounting software, production RAG systems — and is going deep on AI that survives production."
        />
      </Helmet>
      <StructuredData />

      <SkyField />

      <div
        className={`relative flex flex-col min-h-screen page-warp ${sky === 'open' ? 'warping' : ''}`}
        style={{ transformOrigin: warpOrigin }}
      >
        <Header onSkyDive={flyToPolaris} />
        <main>
          <Home />
          <Work />
          <About />
          <Contact />
        </main>
        <Footer onSkyDive={flyToPolaris} />
      </div>

      {sky !== 'closed' && (
        <Suspense fallback={null}>
          <UrsaMinor
            closing={sky === 'closing'}
            onClose={skyClose}
            onGone={skyGone}
          />
        </Suspense>
      )}
    </>
  );
}

export default App;
