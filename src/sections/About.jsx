import { ABOUT, TESTIMONIALS } from '../data/content';

const About = () => (
  <section id="about" className="px-6 py-20">
    <div className="max-w-page mx-auto">

      <div className="flex items-baseline justify-between gap-4 border-b border-rule pb-3 mb-10">
        <h2 className="annot-caps m-0 !text-ink">02 — About</h2>
        <p className="annot m-0 hidden sm:block">the person behind the chart</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_16rem] gap-10 md:gap-14">

        {/* Bio */}
        <div className="space-y-5 max-w-[36rem]">
          {ABOUT.paragraphs.map((p, i) => (
            <p key={i} className="text-ink-soft leading-relaxed m-0 first:text-ink">
              {p}
            </p>
          ))}
          <p className="annot !leading-relaxed border-t border-hair pt-4">
            {ABOUT.offDuty}
          </p>
        </div>

        {/* Photo + tools + credentials */}
        <div className="space-y-8">
          <figure className="m-0 max-w-[16rem] mx-auto md:mx-0">
            <img
              src="/assets/photo.webp"
              alt="Atharva Jagtap"
              width="256"
              height="320"
              loading="lazy"
              className="w-full aspect-[4/5] object-cover object-top border border-hair"
            />
          </figure>

          <p className="annot border-t border-hair pt-4 m-0">{ABOUT.credentials}</p>
        </div>
      </div>

      {/* In their words */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-hair pt-8">
        {TESTIMONIALS.map(t => (
          <blockquote key={t.name} className="m-0">
            <p className="text-ink leading-relaxed m-0">&ldquo;{t.quote}&rdquo;</p>
            <footer className="annot mt-3">
              —{' '}
              <a href={t.href} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
                {t.name}
              </a>
              , {t.role}
            </footer>
          </blockquote>
        ))}
      </div>

    </div>
  </section>
);

export default About;
