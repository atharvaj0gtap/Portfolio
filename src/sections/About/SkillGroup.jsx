import React, { useEffect, useRef, useState } from 'react';

const SkillGroup = ({ label, mono, skills }) => {
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
      { threshold: 0.18 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="group/block">
      <div className="mb-4 flex items-baseline gap-3">
        <span className="font-mono text-[0.68rem] uppercase tracking-[0.25em] text-gold">
          {label}
        </span>
        <span className="h-px flex-1 bg-gradient-to-r from-gold/40 to-transparent" />
        <span className="font-mono text-[0.7rem] text-text-muted">{mono}</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, idx) => (
          <span
            key={skill.label}
            className="skill-pill"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(6px)',
              transition: `opacity 500ms cubic-bezier(0.16,1,0.3,1) ${idx * 55}ms, transform 500ms cubic-bezier(0.16,1,0.3,1) ${idx * 55}ms, background 200ms, color 200ms, border-color 200ms`,
            }}
          >
            {skill.icon && (
              <img
                src={skill.icon}
                alt=""
                aria-hidden="true"
                width="16"
                height="16"
                loading="lazy"
              />
            )}
            <span>{skill.label}</span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default SkillGroup;
