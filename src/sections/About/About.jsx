import React, { useEffect, useRef, useState } from 'react';
import SkillGroup from './SkillGroup';

const SKILL_GROUPS = [
  {
    label: 'Languages',
    mono: '06',
    skills: [
      { label: 'Python', icon: '/assets/icons/python.png' },
      { label: 'Java', icon: '/assets/icons/java.png' },
      { label: 'JavaScript', icon: '/assets/icons/react.png' },
      { label: 'C#', icon: '/assets/icons/csharp.png' },
      { label: 'R', icon: '/assets/icons/r.png' },
      { label: 'HTML / CSS', icon: '/assets/icons/html.png' },
    ],
  },
  {
    label: 'Frameworks & Tools',
    mono: '08',
    skills: [
      { label: 'React', icon: '/assets/icons/react.png' },
      { label: 'Node.js', icon: '/assets/icons/nodejs.png' },
      { label: 'Vite', icon: '/assets/icons/vitejs.png' },
      { label: 'Tailwind', icon: '/assets/icons/tailwindcss.png' },
      { label: 'Playwright', icon: '/assets/icons/playwright.png' },
      { label: 'Jest', icon: '/assets/icons/jest.png' },
      { label: 'Unity', icon: '/assets/icons/unity.png' },
      { label: 'Android Studio', icon: '/assets/icons/androidstudio.png' },
    ],
  },
  {
    label: 'Data & ML',
    mono: '04',
    skills: [
      { label: 'PyTorch', icon: '/assets/icons/pytorch.png' },
      { label: 'TensorFlow', icon: '/assets/icons/tensorflow.png' },
      { label: 'Pandas', icon: '/assets/icons/pandas.png' },
      { label: 'Tableau', icon: '/assets/icons/tableau.png' },
    ],
  },
  {
    label: 'Cloud & Infra',
    mono: '06',
    skills: [
      { label: 'Azure', icon: '/assets/icons/azure.png' },
      { label: 'Docker', icon: '/assets/icons/docker.png' },
      { label: 'Cloudflare', icon: '/assets/icons/cloudflare.png' },
      { label: 'Firebase', icon: '/assets/icons/firebase.png' },
      { label: 'MySQL', icon: '/assets/icons/mysql.png' },
      { label: 'MongoDB', icon: '/assets/icons/mongodb.png' },
    ],
  },
];

const WordSplit = ({ children, className = '' }) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const words = String(children).split(' ');

  return (
    <span ref={ref} className={className}>
      {words.map((word, i) => (
        <span key={i} className="word-reveal mr-[0.28em]" style={{ display: 'inline-block' }}>
          <span
            style={{
              transform: visible ? 'translateY(0)' : 'translateY(110%)',
              opacity: visible ? 1 : 0,
              transition: `transform 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 70}ms, opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 70}ms`,
              display: 'inline-block',
            }}
          >
            {word}
          </span>
        </span>
      ))}
    </span>
  );
};

const About = () => {
  const portraitRef = useRef(null);

  /* Subtle parallax on portrait */
  useEffect(() => {
    const el = portraitRef.current;
    if (!el) return;
    let ticking = false;
    const update = () => {
      const rect = el.getBoundingClientRect();
      const offset = (rect.top - window.innerHeight / 2) * -0.05;
      el.style.setProperty('--portrait-y', `${offset}px`);
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    update();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section id="about" className="section-shell relative">
      <div className="mx-auto max-w-[1180px]">
        {/* Header */}
        <div className="mb-16 grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-5">
            <p className="overline mb-3">[ 01 ] &nbsp;About</p>
            <h2 className="font-display text-[2.25rem] font-normal leading-[1.08] tracking-tighter text-text-primary sm:text-[2.75rem] md:text-[3.25rem]">
              <WordSplit>Hi, I'm</WordSplit>{' '}
              <em
                className="italic text-gold"
              >
                <WordSplit>Atharva.</WordSplit>
              </em>
            </h2>
          </div>
          <div className="col-span-12 md:col-span-7 md:pt-6">
            <p className="max-w-xl text-text-muted text-[0.95rem] leading-relaxed sm:text-base">
              A software engineer and data analyst who co-founded a food-tech startup, interned in Dubai, and studied at UBC. I get excited about building things that solve real problems, especially the ones that involve crunching data, architecting systems from scratch, or translating human behavior into product decisions.
            </p>
          </div>
        </div>

        {/* Portrait + extended bio */}
        <div className="grid grid-cols-12 gap-10 md:gap-12">
          <div className="col-span-12 md:col-span-5">
            <div
              ref={portraitRef}
              className="relative overflow-hidden rounded-[20px] border border-gold/25 bg-surface-raised"
              style={{
                boxShadow: 'var(--shadow-gold), 0 24px 60px rgba(0,0,0,0.45)',
                transform: 'translate3d(0, var(--portrait-y, 0px), 0)',
                transition: 'transform 200ms cubic-bezier(0.16,1,0.3,1)',
                aspectRatio: '4 / 5',
              }}
            >
              {/* Decorative portrait: observatory motif as placeholder */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'radial-gradient(ellipse at 35% 30%, hsla(42, 82%, 62%, 0.22) 0%, transparent 55%), radial-gradient(ellipse at 72% 78%, hsla(22, 62%, 54%, 0.15) 0%, transparent 55%), linear-gradient(155deg, hsl(230, 22%, 9%) 0%, hsl(230, 18%, 18%) 100%)',
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <svg
                  viewBox="0 0 400 500"
                  className="h-full w-full opacity-80"
                  aria-hidden="true"
                >
                  <defs>
                    <radialGradient id="halo" cx="50%" cy="35%" r="55%">
                      <stop offset="0%" stopColor="#EBC160" stopOpacity="0.6" />
                      <stop offset="60%" stopColor="#D4A94A" stopOpacity="0.15" />
                      <stop offset="100%" stopColor="#D4A94A" stopOpacity="0" />
                    </radialGradient>
                    <linearGradient id="silhouette" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#D4A94A" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#0E1017" stopOpacity="0" />
                    </linearGradient>
                    <filter id="soft">
                      <feGaussianBlur stdDeviation="1.2" />
                    </filter>
                  </defs>
                  {/* Halo */}
                  <circle cx="200" cy="175" r="140" fill="url(#halo)" />
                  {/* Stylized figure */}
                  <g filter="url(#soft)" opacity="0.85">
                    <ellipse cx="200" cy="170" rx="58" ry="68" fill="#0E1017" />
                    <ellipse cx="200" cy="172" rx="56" ry="66" fill="#1c1d28" />
                    <path
                      d="M120 500 C 120 340, 150 270, 200 270 C 250 270, 280 340, 280 500 Z"
                      fill="#0E1017"
                    />
                    <path
                      d="M120 500 C 120 340, 150 272, 200 272 C 250 272, 280 340, 280 500 Z"
                      fill="url(#silhouette)"
                    />
                    {/* brass rim-light */}
                    <path
                      d="M258 198 C 266 240, 262 310, 280 500"
                      stroke="#D4A94A"
                      strokeWidth="3"
                      strokeLinecap="round"
                      fill="none"
                      opacity="0.55"
                    />
                    <path
                      d="M248 135 C 242 155, 240 175, 248 198"
                      stroke="#EBC160"
                      strokeWidth="2"
                      strokeLinecap="round"
                      fill="none"
                      opacity="0.6"
                    />
                  </g>
                  {/* Constellation dots */}
                  {[
                    [60, 80],
                    [110, 50],
                    [320, 110],
                    [360, 180],
                    [80, 260],
                    [340, 300],
                    [60, 430],
                    [350, 420],
                  ].map(([x, y], i) => (
                    <circle
                      key={i}
                      cx={x}
                      cy={y}
                      r={i % 2 === 0 ? 2.5 : 1.5}
                      fill="#EBC160"
                      opacity={0.4 + (i % 3) * 0.15}
                    />
                  ))}
                </svg>
              </div>
              {/* Caption strip */}
              <div
                className="absolute bottom-0 left-0 right-0 flex items-center justify-between gap-4 border-t border-gold/20 bg-surface-base/80 px-5 py-3.5 backdrop-blur"
              >
                <div>
                  <p className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-gold">
                    Portrait · 2026
                  </p>
                  <p className="font-display text-[0.95rem] text-text-primary">Atharva Jagtap</p>
                </div>
                <span className="font-mono text-[0.65rem] tracking-widest text-text-muted">
                  /V3
                </span>
              </div>
            </div>

            {/* "Currently" panel */}
            <div className="mt-6 rounded-2xl border border-border-subtle bg-surface-raised/60 p-5 backdrop-blur">
              <div className="mb-3 flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-teal" />
                </span>
                <span className="font-mono text-[0.65rem] uppercase tracking-[0.25em] text-teal">
                  Currently
                </span>
              </div>
              <p className="text-[0.9rem] leading-relaxed text-text-secondary">
                Building at <span className="text-gold">NxtMeals</span>, exploring the intersection of behavioral economics and product design, and open to full-time SWE roles or sharp freelance briefs.
              </p>
            </div>
          </div>

          {/* Biography + skills */}
          <div className="col-span-12 md:col-span-7">
            <div className="space-y-5 text-[0.98rem] leading-relaxed text-text-secondary">
              <p>
                Growing up between Pune, Dubai, and Vancouver gave me a taste for systems that work across contexts. I'm the kind of engineer who reads philosophy on weekends, writes ML pipelines on weekdays, and keeps a Notion full of ideas for the companies I'll build next.
              </p>
              <p>
                My work blends <span className="text-text-primary">technical depth</span> with{' '}
                <span className="text-text-primary">business intuition</span>. I've shipped AI tooling that cut insurance review time by 80%, led agile teams through messy scope negotiations, and co-founded a food-tech venture that taught me more about resilience than any textbook ever did.
              </p>
              <p>
                The thread across all of it: I don't just write code, I architect solutions that respect the messy reality of how people think, decide, and act.
              </p>
            </div>

            {/* Stats row */}
            <div className="mt-10 grid grid-cols-3 gap-3">
              {[
                { value: '10+', label: 'Projects shipped' },
                { value: '4', label: 'Countries lived in' },
                { value: '80%', label: 'Review time cut' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-border-subtle bg-surface-base/40 p-4 text-center backdrop-blur md:text-left"
                >
                  <p
                    className="font-display text-[1.8rem] font-normal leading-none text-gold sm:text-[2.1rem]"
                  >
                    {stat.value}
                  </p>
                  <p className="mt-2 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-text-muted">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Skill groups */}
            <div className="mt-14 space-y-10">
              <div className="flex items-baseline justify-between">
                <p className="overline">Toolkit</p>
                <p className="font-mono text-[0.7rem] text-text-muted">/01 → /04</p>
              </div>
              {SKILL_GROUPS.map((group) => (
                <SkillGroup key={group.label} {...group} />
              ))}
            </div>

            {/* Beyond code */}
            <div className="mt-12 rounded-2xl border border-border-subtle bg-surface-raised/40 p-6">
              <p className="mb-4 overline">Beyond Code</p>
              <div className="flex flex-wrap gap-2">
                {[
                  'Behavioral Economics',
                  'Systems Thinking',
                  'Team Leadership',
                  'Financial Analysis',
                  'Storytelling',
                  'Product Strategy',
                  'Discipline',
                  'Empathy',
                ].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-border-subtle px-3 py-1.5 text-[0.75rem] text-text-secondary transition-colors hover:border-gold/40 hover:text-gold"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
