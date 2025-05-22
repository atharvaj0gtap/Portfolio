import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import StructuredData from './SEO/StructuredData';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './sections/Home';
import Project from './sections/Project';
import About from './sections/About';
import Testimonials from './sections/Testimonials/index';
import RevealWrapper from './components/RevealWrapper';
import StarryBackground from './components/StarryBackground';
import ScrollToTop from './components/ScrollToTop';
import CertificationsModal from './components/CertificationsModal';
import ProjectModal from './components/ProjectModal';

// Add this if it doesn't exist already
export const EventEmitter = {
  events: {},
  dispatch: function(event, data) {
    if (!this.events[event]) return;
    this.events[event].forEach(callback => callback(data));
  },
  subscribe: function(event, callback) {
    if (!this.events[event]) this.events[event] = [];
    this.events[event].push(callback);
    
    return () => {
      if (!this.events[event]) return;
      this.events[event] = this.events[event].filter(cb => cb !== callback);
    };
  }
};

function App() {
  const [certModalOpen, setCertModalOpen] = useState(false);
  // Add state for project modal
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [activeProject, setActiveProject] = useState(null);

  useEffect(() => {
    const handleCertificationsClick = (e) => {
      const link = e.target.closest('a[href="#certifications"]');
      if (link) {
        e.preventDefault();
        setCertModalOpen(true);
      }
    };
    
    document.addEventListener('click', handleCertificationsClick);
    
    return () => {
      document.removeEventListener('click', handleCertificationsClick);
    };
  }, []);

  useEffect(() => {
    // Listen for project modal events
    const unsubscribeProject = EventEmitter.subscribe('openProjectModal', (project) => {
      setActiveProject(project);
      setProjectModalOpen(true);
    });
    
    // Clean up
    return () => {
      unsubscribeProject();
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>JagtapWorks | Portfolio</title>
        <meta name="description" content="Portfolio of Atharva Jagtap, showcasing skills and projects in software engineering and data analytics." />
        {/* You can dynamically update meta tags based on active section */}
      </Helmet>
      <StructuredData />
      
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
        
        {/* Projects section - slightly longer delay for waterfall effect */}
        <RevealWrapper delay={0.3} duration={0.7} threshold={0.1}>
          <Project />
        </RevealWrapper>

        {/* About section with reveal animation - starts fading in after 0.2s */}
        <RevealWrapper delay={0.2} duration={0.7} threshold={0.1}>
          <About />
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

      {/* Certifications Modal */}
      <CertificationsModal 
        isOpen={certModalOpen} 
        onClose={() => setCertModalOpen(false)} 
      />

      {/* Add ProjectModal at the App level */}
      <ProjectModal 
        isOpen={projectModalOpen}
        project={activeProject}
        onClose={() => setProjectModalOpen(false)}
      />
    </>
  );
}

export default App;