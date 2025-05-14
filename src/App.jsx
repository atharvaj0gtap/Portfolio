import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './sections/Home';
import Project from './sections/Project';
import About from './sections/About';
import Testimonials from './sections/Testimonials/index';
import RevealWrapper from './components/RevealWrapper';
import StarryBackground from './components/StarryBackground';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <div className='flex flex-col min-h-screen bg-surface-base'>
      <StarryBackground 
        densityRatio={0.3}
        sizeLimit={4}
        defaultAlpha={0.5} 
        scaleLimit={3}
        proximityRatio={0.15} 
      />
      
      <Header />
      
      {/* Home section doesn't need reveal animation as it's the first view */}
      <Home />
      
      {/* About section with reveal animation - starts fading in after 0.2s */}
      <RevealWrapper delay={0.2} duration={0.7} threshold={0.1}>
        <About />
      </RevealWrapper>
      
      {/* Projects section - slightly longer delay for waterfall effect */}
      <RevealWrapper delay={0.3} duration={0.7} threshold={0.1}>
        <Project />
      </RevealWrapper>
      
      {/* New Testimonials section */}
      <RevealWrapper delay={0.4} duration={0.7} threshold={0.1}>
        <Testimonials />
      </RevealWrapper>
      
      {/* Wrap elements inside sections for more granular control */}
      <RevealWrapper delay={0.5} duration={0.7} threshold={0.1}>
        <Footer />
      </RevealWrapper>

      <ScrollToTop />
    </div>
  );
}

export default App;