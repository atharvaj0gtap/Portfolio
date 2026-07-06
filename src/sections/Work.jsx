import { useState } from 'react';
import { CASE_STUDIES, EXPERIMENTS, GLYPHS } from '../data/content';

const CaseStudyRow = ({ study, open, onToggle }) => (
  <article className="border-b border-hair">
    <h3 className="m-0">
      <button
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={`cs-${study.id}`}
        className="w-full grid grid-cols-[3.25rem_minmax(0,1fr)_auto] items-baseline gap-4 py-5 text-left group"
      >
        <span className="annot">
          <span className="text-accent">{GLYPHS[study.type]}</span> {study.designation.slice(3)}
        </span>
        <span className="min-w-0">
          <span className={`block text-[clamp(1.1rem,2.4vw,1.5rem)] font-semibold tracking-tight transition-colors ${open ? 'text-accent' : 'text-ink group-hover:text-accent'}`}>
            {study.title}
          </span>
          <span className="annot block mt-1">
            {study.org} · {study.period}
          </span>
        </span>
        <span
          aria-hidden="true"
          className={`text-ink-faint text-xl leading-none transition-transform duration-200 ${open ? 'rotate-45 text-accent' : 'group-hover:text-accent'}`}
        >
          +
        </span>
      </button>
    </h3>

    {open && (
      <div id={`cs-${study.id}`} className="pb-8 pl-0 sm:pl-[4.25rem] pr-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <p className="annot-caps mb-2">The problem</p>
            <p className="text-ink-soft leading-relaxed m-0">{study.problem}</p>
          </div>
          <div>
            <p className="annot-caps mb-2">What I built</p>
            <ul className="m-0 p-0 list-none space-y-3">
              {study.built.map((item, i) => (
                <li key={i} className="text-ink-soft leading-relaxed pl-4 relative">
                  <span className="absolute left-0 text-accent" aria-hidden="true">–</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {study.broke && (
          <div className="mt-7 border-l-2 border-accent pl-4 max-w-[44rem]">
            <p className="annot-caps mb-2 !text-accent">What broke</p>
            <p className="text-ink-soft leading-relaxed m-0">{study.broke}</p>
          </div>
        )}

        <p className="text-ink leading-relaxed mt-7 mb-5 max-w-[44rem]">{study.outcome}</p>

        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <p className="annot m-0">{study.stack.join(' · ')}</p>
          {study.links.map(link => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="ink-link annot !text-accent"
            >
              {link.label} ↗
            </a>
          ))}
        </div>
      </div>
    )}
  </article>
);

const Work = () => {
  const [openId, setOpenId] = useState(null);
  const [showDeep, setShowDeep] = useState(false);
  const visibleExperiments = EXPERIMENTS.filter(exp => showDeep || !exp.deep);
  const deepCount = EXPERIMENTS.filter(exp => exp.deep).length;

  return (
    <section id="work" className="px-6 py-20">
      <div className="max-w-page mx-auto">

        <div className="flex items-baseline justify-between gap-4 border-b border-rule pb-3 mb-0">
          <h2 className="annot-caps m-0 !text-ink">01 — Case studies</h2>
          <p className="annot m-0 hidden sm:block">
            real clients · defensible numbers · what broke, included
          </p>
        </div>

        {CASE_STUDIES.map(study => (
          <CaseStudyRow
            key={study.id}
            study={study}
            open={openId === study.id}
            onToggle={() => setOpenId(openId === study.id ? null : study.id)}
          />
        ))}

        {/* The archive */}
        <div className="mt-16">
          <div className="flex items-baseline justify-between gap-4 border-b border-hair pb-3">
            <h3 className="annot-caps m-0">
              <span className="text-accent">✧</span> Experiments — the archive
            </h3>
          </div>
          {visibleExperiments.map(exp => (
            <a
              key={exp.title}
              href={exp.href}
              target="_blank"
              rel="noopener noreferrer"
              className="index-row !grid-cols-[6.5rem_minmax(0,1fr)_auto] sm:!grid-cols-[9rem_minmax(0,1fr)_auto] !items-center !py-4 group"
            >
              {/* the plate */}
              {exp.image ? (
                <img
                  src={exp.image}
                  alt=""
                  width="144"
                  height="96"
                  loading="lazy"
                  className="w-full aspect-[3/2] object-cover border border-hair"
                />
              ) : (
                <span
                  aria-hidden="true"
                  className="w-full aspect-[3/2] border border-hair flex items-center justify-center text-accent"
                >
                  ✧
                </span>
              )}
              <span className="min-w-0">
                <span className="row-title block font-semibold text-[0.95rem] tracking-tight transition-colors">
                  {exp.title}
                </span>
                <span className="text-ink-soft text-sm leading-relaxed block mt-1">
                  {exp.description}
                </span>
              </span>
              <span className="row-arrow annot" aria-hidden="true">↗</span>
            </a>
          ))}

          <button
            onClick={() => setShowDeep(s => !s)}
            aria-expanded={showDeep}
            className="index-row w-full !grid-cols-[minmax(0,1fr)_auto] !py-3.5 text-left"
          >
            <span className="annot-caps !text-accent">
              {showDeep ? 'Collapse the archive' : `View full archive · ${deepCount} more`}
            </span>
            <span className="row-arrow annot" aria-hidden="true">{showDeep ? '↑' : '↓'}</span>
          </button>
        </div>

      </div>
    </section>
  );
};

export default Work;
