import { useEffect, useState } from 'react';
import { useTheme } from '../hooks/useTheme';
import { NOW } from '../data/content';
import { smoothScrollTo } from '../utils/smoothScroll';
import Mark from './Mark';

const NAV = [
  { id: 'work', label: 'Work' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
];

const Header = ({ onSkyDive }) => {
  const { theme, toggle } = useTheme();
  const [scrolled, setScrolled] = useState(false);

  /* Easter egg trigger: warp the page away from the exact point clicked. */
  const handleCoords = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = r.left + r.width / 2 + window.scrollX;
    const y = r.top + r.height / 2 + window.scrollY;
    onSkyDive(`${x}px ${y}px`);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-[border-color,background-color] duration-300 ${
        scrolled ? 'border-b border-hair' : 'border-b border-transparent'
      }`}
      style={{ background: scrolled ? 'var(--veil)' : 'transparent', backdropFilter: scrolled ? 'blur(8px)' : 'none' }}
    >
      <div className="max-w-page mx-auto px-6 h-14 flex items-center justify-between gap-4">

        <a
          href="#home"
          onClick={(e) => { e.preventDefault(); smoothScrollTo('home'); }}
          className="annot-caps !text-ink hover:!text-accent transition-colors flex items-center gap-2.5"
        >
          <Mark size={20} />
          JagtapWorks
        </a>

        <button
          onClick={handleCoords}
          className="annot hidden lg:block hover:text-accent transition-colors cursor-pointer"
          title="Follow the star"
        >
          {NOW.star}
        </button>

        <div className="flex items-center gap-6">
          <nav aria-label="Sections" className="hidden sm:flex gap-6">
            {NAV.map(link => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => { e.preventDefault(); smoothScrollTo(link.id); }}
                className="annot-caps !text-ink-soft hover:!text-accent transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Day chart / night chart — the toggle is part of the concept */}
          {/* Fixed width so "day"/"night" swapping doesn't shift the nav links */}
          <button
            onClick={toggle}
            aria-label={theme === 'night' ? 'Switch to day chart' : 'Switch to night chart'}
            title={theme === 'night' ? 'day chart' : 'night chart'}
            className="annot-caps !text-accent hover:opacity-70 transition-opacity min-w-[5rem] text-left"
          >
            {theme === 'night' ? '☉ day' : '☾ night'}
          </button>
        </div>

      </div>
    </header>
  );
};

export default Header;
