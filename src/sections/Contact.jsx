import { NOW } from '../data/content';

const LINKS = [
  { label: 'GitHub', href: 'https://github.com/atharvaj0gtap', external: true },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/atharvahjagtap/', external: true },
  { label: 'Resume (PDF)', href: '/assets/certifications/AtharvaJagtap_Resume.pdf', download: true },
];

const Contact = () => (
  <section id="contact" className="px-6 py-20">
    <div className="max-w-page mx-auto">

      <div className="flex items-baseline justify-between gap-4 border-b border-rule pb-3 mb-12">
        <h2 className="annot-caps m-0 !text-ink">03 — Contact</h2>
        <p className="annot m-0 hidden sm:block">{NOW.place} · working globally</p>
      </div>

      <p className="text-ink-soft leading-relaxed max-w-[34rem] mb-8">
        Open to {NOW.openTo}, and I take on a small number of freelance builds.
        If you&rsquo;ve read a case study and want to talk about it, that&rsquo;s
        the best possible opening line.
      </p>

      <a
        href={`mailto:${NOW.contact}`}
        className="display-name inline-block text-[clamp(1.4rem,5vw,3.5rem)] !normal-case !tracking-tight text-ink hover:text-accent transition-colors break-all"
      >
        {NOW.contact} <span aria-hidden="true">→</span>
      </a>

      <div className="flex flex-wrap gap-x-8 gap-y-3 mt-12">
        {LINKS.map(({ label, href, external, download }) => (
          <a
            key={label}
            href={href}
            target={external ? '_blank' : undefined}
            rel={external ? 'noopener noreferrer' : undefined}
            download={download || undefined}
            className="annot-caps !text-ink hover:!text-accent transition-colors"
          >
            {label} ↗
          </a>
        ))}
      </div>

    </div>
  </section>
);

export default Contact;
