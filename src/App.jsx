import { Helmet } from 'react-helmet-async';
import StructuredData from './SEO/StructuredData';
import SkyField from './components/SkyField';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './sections/Home';
import Work from './sections/Work';
import About from './sections/About';
import Contact from './sections/Contact';

function App() {
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

      <div className="relative flex flex-col min-h-screen">
        <Header />
        <main>
          <Home />
          <Work />
          <About />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;
