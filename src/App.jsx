import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
import StructuredData from './SEO/StructuredData';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './sections/Home';
import Project from './sections/Project';
import About from './sections/About';
import RevealWrapper from './components/RevealWrapper';
import StarryBackground from './components/StarryBackground';
import ScrollToTop from './components/ScrollToTop';

const Testimonials = lazy(() => import('./sections/Testimonials/index'));
const CertificationsModal = lazy(() => import('./components/CertificationsModal'));
const ProjectModal = lazy(() => import('./components/ProjectModal'));

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
    return () => document.removeEventListener('click', handleCertificationsClick);
  }, []);

  useEffect(() => {
    const unsubscribeProject = EventEmitter.subscribe('openProjectModal', (project) => {
      setActiveProject(project);
      setProjectModalOpen(true);
    });
    return () => unsubscribeProject();
  }, []);

  return (
    <>
      <Helmet>
        <title>JagtapWorks | Portfolio</title>
        <meta name="description" content="Portfolio of Atharva Jagtap — software engineer, data analyst, and builder. UBC graduate with 10+ shipped projects." />
      </Helmet>
      <StructuredData />

      <div className='flex flex-col min-h-screen bg-surface-base'>
        <StarryBackground
          densityRatio={0.3}
          sizeLimit={4}
          defaultAlpha={0.7}
        />

        <Header />
        <Home />

        {/* Hero bottom fade — lives outside Home so canvas compositing can't interfere */}
        <div
          aria-hidden="true"
          className="relative pointer-events-none -mt-48 h-48 z-10"
          style={{ background: 'linear-gradient(to bottom, transparent, var(--color-bg))' }}
        />

        <RevealWrapper delay={0.3} duration={0.7} threshold={0.1}>
          <Project />
        </RevealWrapper>

        <RevealWrapper delay={0.2} duration={0.7} threshold={0.1}>
          <About />
        </RevealWrapper>

        <Suspense fallback={<div className="min-h-[600px]" />}>
          <RevealWrapper delay={0.4} duration={0.7} threshold={0.1}>
            <Testimonials />
          </RevealWrapper>
        </Suspense>

        <RevealWrapper delay={0.5} duration={0.7} threshold={0.1}>
          <Footer />
        </RevealWrapper>

        <ScrollToTop />
      </div>

      <Suspense fallback={null}>
        {certModalOpen && (
          <CertificationsModal
            isOpen={certModalOpen}
            onClose={() => setCertModalOpen(false)}
          />
        )}
      </Suspense>

      <Suspense fallback={null}>
        {projectModalOpen && activeProject && (
          <ProjectModal
            isOpen={projectModalOpen}
            project={activeProject}
            onClose={() => setProjectModalOpen(false)}
          />
        )}
      </Suspense>
    </>
  );
}

export default App;
