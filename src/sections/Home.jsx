import Constellation from '../components/Constellation';
import { NOW } from '../data/content';
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
        <p className="text-ink text-[1.05rem] leading-relaxed max-w-[28rem] m-0">
          CS grad, UBC 2025. I ship real software: an AI policy-comparison
          pipeline for an insurance client, carbon-accounting software for a
          nonprofit, production RAG systems. Now I&rsquo;m going deep on AI
          that survives production.
        </p>
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
