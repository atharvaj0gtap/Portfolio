import { lazy, Suspense, useState } from 'react';
import { NOW } from '../data/content';

const CertificationsModal = lazy(() => import('./CertificationsModal'));

const Footer = () => {
  const [certsOpen, setCertsOpen] = useState(false);

  return (
    <footer className="px-6 pb-10 pt-4">
      <div className="max-w-page mx-auto">
        <div className="border-t border-hair pt-4 flex flex-wrap justify-between gap-x-6 gap-y-2">
          <p className="annot m-0">
            legend — <span className="text-accent">●</span> client work ·{' '}
            <span className="text-accent">✦</span> startup ·{' '}
            <span className="text-accent">✧</span> experiment
          </p>
          <p className="annot m-0">charted 2026 · {NOW.place.toLowerCase()}</p>
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
