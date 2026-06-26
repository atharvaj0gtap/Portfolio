import React from "react";
import RevealWrapper from "../components/RevealWrapper";

const SKILL_CATEGORIES = [
  {
    name: "Languages",
    skills: [
      { icon: "/assets/icons/python.svg",  label: "Python" },
      { icon: "/assets/icons/java.svg",    label: "Java" },
      { icon: "/assets/icons/csharp.svg",  label: "C#" },
      { icon: "/assets/icons/r.svg",       label: "R" },
      { icon: "/assets/icons/html.svg",    label: "HTML" },
      { icon: "/assets/icons/css.svg",     label: "CSS" },
      { icon: "/assets/icons/dart.svg",    label: "Dart" },
    ],
  },
  {
    name: "Frameworks & Tools",
    skills: [
      { icon: "/assets/icons/react.svg",         label: "React" },
      { icon: "/assets/icons/nodejs.svg",        label: "Node.js" },
      { icon: "/assets/icons/tailwindcss.svg",   label: "Tailwind" },
      { icon: "/assets/icons/vitejs.svg",        label: "Vite" },
      { icon: "/assets/icons/flutter.svg",       label: "Flutter" },
      { icon: "/assets/icons/playwright.svg",    label: "Playwright" },
      { icon: "/assets/icons/jest.svg",          label: "Jest" },
      { icon: "/assets/icons/unity.svg",         label: "Unity" },
      { icon: "/assets/icons/androidstudio.svg", label: "Android Studio" },
      { icon: "/assets/icons/vscode.svg",        label: "VS Code" },
    ],
  },
  {
    name: "Data & ML",
    skills: [
      { icon: "/assets/icons/pytorch.svg",    label: "PyTorch" },
      { icon: "/assets/icons/tensorflow.svg", label: "TensorFlow" },
      { icon: "/assets/icons/pandas.svg",     label: "Pandas" },
      { icon: "/assets/icons/tableau.svg",    label: "Tableau" },
    ],
  },
  {
    name: "Cloud & Infrastructure",
    skills: [
      { icon: "/assets/icons/azure.svg",      label: "Azure" },
      { icon: "/assets/icons/docker.svg",     label: "Docker" },
      { icon: "/assets/icons/cloudflare.svg", label: "Cloudflare" },
      { icon: "/assets/icons/firebase.svg",   label: "Firebase" },
      { icon: "/assets/icons/mysql.svg",      label: "MySQL" },
      { icon: "/assets/icons/mongodb.svg",    label: "MongoDB" },
    ],
  },
];

const About = () => (
  <section id="about" className="min-h-screen p-6 md:p-16 content-center">
    <div className="max-w-5xl mx-auto mt-20 md:mt-0">

      {/* Header */}
      <RevealWrapper delay={0.1} duration={0.6}>
        <p className="font-mono text-xs tracking-[0.3em] uppercase text-gold text-center mb-3">
          The Person Behind The Code
        </p>
        <h2 className="font-display text-3xl md:text-4xl mb-12 text-accent-light text-center">
          About Me
        </h2>
      </RevealWrapper>

      {/* Bio row — text left, photo right */}
      <RevealWrapper delay={0.2} duration={0.6}>
        <div className="grid grid-cols-1 md:grid-cols-[1fr_260px] gap-8 md:gap-12 mb-10">

          {/* Bio text */}
          <div className="space-y-4 text-text-secondary text-base leading-relaxed">
            <p>
              I started coding in 8th grade with a basic HTML tutorial. I didn't know it at the
              time, but I was hooked on a specific kind of problem: the kind where you take
              something abstract and turn it into something real, something people can actually
              use. Fifteen years later, that's still what I'm chasing.
            </p>
            <p>
              I studied Computer Science at UBC and graduated with high distinction, but the
              education I value most came from building things outside the classroom.
              Co-founding a food-tech startup taught me more about customers than any textbook.
              A data internship taught me what it feels like to ship work that real stakeholders
              depend on. An AI engineering role taught me how to build reliable software on top
              of unpredictable systems.
            </p>
            <p>
              The thread running through all of it is a fascination with how things connect.
              Technology and business. Code and psychology. Discipline and creativity. I think
              the most interesting problems live in the gaps between fields, and my career so
              far has been an experiment in trying to live in those gaps.
            </p>
            <p>
              If I had to describe myself in one word, it would be <em className="text-text-primary not-italic font-medium">disciplined</em>.
              I show up. I finish what I start. And I care about doing the work well, not just
              doing it fast.
            </p>
            <p className="text-text-muted text-sm">
              Outside the code: gym, books on finance and behavioral economics, cooking, and
              occasionally staring at the stars long enough to remember the scale of things.
            </p>
          </div>

          {/* Photo */}
          <img
            src="/assets/photo.jpg"
            alt="Atharva Jagtap"
            width="260"
            height="325"
            loading="lazy"
            className="hidden md:block rounded-2xl w-full aspect-[4/5] object-cover object-top border border-border-subtle"
          />

        </div>
      </RevealWrapper>

      {/* Skills */}
      <RevealWrapper delay={0.3} duration={0.6}>
        <h3 className="font-mono text-xs uppercase tracking-[0.3em] text-text-muted mb-4">
          Technical Skills
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {SKILL_CATEGORIES.map((cat) => (
            <div
              key={cat.name}
              className="rounded-xl bg-surface-raised/60 border border-border-subtle/50 p-4"
            >
              <h4 className="font-mono text-[0.65rem] uppercase tracking-wider text-gold/60 mb-3">
                {cat.name}
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {cat.skills.map((skill) => (
                  <div
                    key={skill.label}
                    className="flex items-center gap-1.5 px-2 py-1 rounded bg-surface-overlay/60 border border-border-subtle/40 hover:border-gold/25 transition-colors duration-200"
                  >
                    <img
                      src={skill.icon}
                      alt={skill.label}
                      className="h-4 w-4"
                      width="16"
                      height="16"
                      loading="lazy"
                    />
                    <span className="text-xs text-text-secondary">{skill.label}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </RevealWrapper>

    </div>
  </section>
);

export default About;
