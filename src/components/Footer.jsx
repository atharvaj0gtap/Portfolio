import { lazy, Suspense, useState } from 'react';
import { NOW } from '../data/content';

const CertificationsModal = lazy(() => import('./CertificationsModal'));

const Footer = ({ onSkyDive }) => {
  const [certsOpen, setCertsOpen] = useState(false);

  /* Easter egg trigger, reachable on every screen size (the header one is
     desktop-only): warp away from the exact point tapped. */
  const handleCoords = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = r.left + r.width / 2 + window.scrollX;
    const y = r.top + r.height / 2 + window.scrollY;
    onSkyDive(`${x}px ${y}px`);
  };

  return (
    <footer className="px-6 pb-10 pt-4">
      <div className="max-w-page mx-auto">
        <div className="border-t border-hair pt-4 flex flex-wrap justify-between gap-x-6 gap-y-2">
          <p className="annot m-0">
            legend — <span className="text-accent">●</span> client work ·{' '}
            <span className="text-accent">✦</span> startup ·{' '}
            <span className="text-accent">✧</span> experiment
          </p>
          <button onClick={handleCoords} className="annot m-0 hover:text-accent transition-colors">
            {NOW.star}
          </button>
        </div>
        <div className="flex flex-wrap justify-between gap-x-6 gap-y-2 mt-3">
          <p className="annot m-0">© {new Date().getFullYear()} Atharva Jagtap</p>
          <p className="annot m-0">
            <button
              onClick={() => setCertsOpen(true)}
              className="hover:text-accent transition-colors underline decoration-1 underline-offset-2"
            >
              certifications
            </button>
          </p>
        </div>
      </div>

      {certsOpen && (
        <Suspense fallback={null}>
          <CertificationsModal onClose={() => setCertsOpen(false)} />
        </Suspense>
      )}
    </footer>
  );
};

export default Footer;
