import React, { useState, useEffect, lazy, Suspense } from 'react';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import StructuredData from './SEO/StructuredData';
import Header from './components/Header';
import Footer from './components/Footer';
import CursorGlow from './components/CursorGlow';
import StarryBackground from './components/StarryBackground';
import ScrollToTop from './components/ScrollToTop';
import Home from './sections/Home/Home';
import About from './sections/About/About';
import Projects from './sections/Projects/Projects';
import Contact from './sections/Contact/Contact';

const Testimonials = lazy(() => import('./sections/Testimonials/index'));
const CertificationsModal = lazy(() => import('./components/CertificationsModal'));
const ProjectModal = lazy(() => import('./components/ProjectModal'));

export const EventEmitter = {
  events: {},
  dispatch(event, data) {
    if (!this.events[event]) return;
    this.events[event].forEach((cb) => cb(data));
  },
  subscribe(event, cb) {
    if (!this.events[event]) this.events[event] = [];
    this.events[event].push(cb);
    return () => {
      if (!this.events[event]) return;
      this.events[event] = this.events[event].filter((c) => c !== cb);
    };
  },
};

const SectionDivider = () => (
  <div className="mx-auto w-full max-w-[960px] px-6 py-6 md:py-10">
    <div className="section-divider" aria-hidden="true" />
  </div>
);

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
    const unsubscribe = EventEmitter.subscribe('openProjectModal', (project) => {
      setActiveProject(project);
      setProjectModalOpen(true);
    });
    return () => unsubscribe();
  }, []);

  return (
    <HelmetProvider>
      <Helmet>
        <title>JagtapWorks — Atharva Jagtap · Software Engineer & Builder</title>
        <meta
          name="description"
          content="Portfolio of Atharva Jagtap — software engineer, data analyst, and builder. UBC graduate with 10+ shipped projects at the intersection of computer science, finance, and psychology."
        />
        <meta property="og:title" content="JagtapWorks — Atharva Jagtap" />
        <meta
          property="og:description"
          content="I build systems that turn ideas into impact. UBC graduate, NxtMeals co-founder, 10+ shipped projects."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://jagtapworks.com" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
      <StructuredData />

      <CursorGlow />

      <div className="relative flex min-h-screen flex-col bg-surface-base">
        <StarryBackground
          densityRatio={0.3}
          sizeLimit={4}
          defaultAlpha={0.5}
          scaleLimit={3}
          proximityRatio={0.15}
        />

        <Header />

        <main className="relative z-10">
          <Home />

          <SectionDivider />
          <About />

          <SectionDivider />
          <Projects />

          <SectionDivider />
          <Suspense fallback={<div className="min-h-[600px]" aria-hidden="true" />}>
            <Testimonials />
          </Suspense>

          <SectionDivider />
          <Contact />
        </main>

        <Footer />
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
    </HelmetProvider>
  );
}

export default App;
