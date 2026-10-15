import Constellation from '../components/Constellation';
import { HERO, NOW } from '../data/content';
import { smoothScrollTo } from '../utils/smoothScroll';

const INDEX_LINKS = [
  { no: '01', id: 'work', title: 'Case studies' },
  { no: '02', id: 'about', title: 'About' },
  { no: '03', id: 'contact', title: 'Contact' },
];

const Home = () => (
  <section id="home" className="min-h-screen flex flex-col justify-center px-6 pt-20 pb-16">
    <div className="w-full max-w-page mx-auto">

      {/* Name + chart */}
      <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(15rem,22rem)] gap-10 md:gap-12 items-end mb-10">
        <h1 className="display-name text-[clamp(3rem,10vw,7.5rem)] text-ink">
          Atharva<br />
          <span className="text-accent">Jagtap</span>
        </h1>
        <Constellation />
      </div>

      {/* Intro + now */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 border-t border-hair pt-7 mb-12">
        <div className="max-w-[28rem]">
          <p className="text-ink text-[1.3rem] font-semibold leading-snug tracking-tight text-balance m-0 mb-4">
            {HERO.headline}
          </p>
          <ul className="list-none p-0 m-0 space-y-2">
            {HERO.proof.map(line => (
              <li key={line} className="flex gap-2 text-ink-soft text-[0.95rem] leading-relaxed">
                <span className="text-accent shrink-0" aria-hidden="true">+</span>
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </div>
        <dl className="annot leading-loose m-0">
          <div className="flex gap-2">
            <dt className="text-accent shrink-0">now —</dt>
            <dd className="m-0">{NOW.now}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="text-accent shrink-0">open to —</dt>
            <dd className="m-0">{NOW.openTo}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="text-accent shrink-0">contact —</dt>
            <dd className="m-0">
              <a href={`mailto:${NOW.contact}`} className="hover:text-accent transition-colors">
                {NOW.contact}
              </a>
            </dd>
          </div>
        </dl>
      </div>

      {/* The index */}
      <nav aria-label="Site sections" className="border-t border-rule">
        {INDEX_LINKS.map(link => (
          <a
            key={link.id}
            href={`#${link.id}`}
            onClick={(e) => { e.preventDefault(); smoothScrollTo(link.id); }}
            className="index-row"
          >
            <span className="annot">{link.no}</span>
            <span className="row-title text-[clamp(1.1rem,2.4vw,1.5rem)] font-semibold tracking-tight transition-colors">
              {link.title}
            </span>
            <span className="row-arrow" aria-hidden="true">→</span>
          </a>
        ))}
      </nav>

    </div>
  </section>
);

export default Home;
