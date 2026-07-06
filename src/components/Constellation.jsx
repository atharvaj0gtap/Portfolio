import { useState } from 'react';
import { PATH_STARS } from '../data/content';

const pathPoints = PATH_STARS.map(s => `${s.x},${s.y}`).join(' ');

/* The signature element: Atharva's path charted as a constellation.
   Hovering or focusing a star prints its honest one-liner in the readout
   line below the chart, like a plate caption in a star atlas. */
const Constellation = () => {
  const [readout, setReadout] = useState(null);

  return (
    <figure className="m-0">
      <svg
        viewBox="0 0 460 400"
        role="img"
        aria-label="A constellation chart of my path: Dubai, then Kelowna, then Vancouver — now."
        className="w-full h-auto block"
      >
        {/* graticule */}
        <g fill="none" style={{ stroke: 'var(--chart-grid)' }}>
          <circle cx="230" cy="200" r="180" />
          <circle cx="230" cy="200" r="118" />
          <line x1="50" y1="200" x2="410" y2="200" />
          <line x1="230" y1="20" x2="230" y2="380" />
        </g>

        {/* the path, drawn as a dashed sight-line */}
        <polyline
          points={pathPoints}
          fill="none"
          strokeWidth="1"
          strokeDasharray="2 5"
          style={{
            stroke: 'var(--chart-line)',
            animation: 'star-rise 900ms ease-out 1100ms both',
          }}
        />

        {/* stars + labels, rising in order of the journey */}
        {PATH_STARS.map((star, i) => (
          <g
            key={star.id}
            tabIndex={0}
            role="img"
            aria-label={`${star.label}. ${star.detail}`}
            className="cursor-default focus:outline-none"
            style={{ animation: `star-rise 500ms ease-out ${200 + i * 150}ms both` }}
            onMouseEnter={() => setReadout(star)}
            onMouseLeave={() => setReadout(null)}
            onFocus={() => setReadout(star)}
            onBlur={() => setReadout(null)}
          >
            <circle
              cx={star.x}
              cy={star.y}
              r={star.r * 5}
              style={{ fill: 'var(--star-glow)' }}
            />
            <circle
              cx={star.x}
              cy={star.y}
              r={star.r}
              style={{ fill: star.hot ? 'var(--accent)' : 'var(--star-core)' }}
            />
            {/* generous invisible hit area */}
            <circle cx={star.x} cy={star.y} r="16" fill="transparent" />
            <text
              x={star.x + 12}
              y={star.y + 4}
              className="font-mono"
              style={{
                fontSize: '10.5px',
                fill: star.hot ? 'var(--accent)' : 'var(--ink-soft)',
                letterSpacing: '0.02em',
              }}
            >
              {star.label.split(' — ')[0]}
            </text>
          </g>
        ))}
      </svg>

      {/* Fixed height so a longer readout never reflows the page */}
      <figcaption className="annot mt-3 flex items-start justify-between gap-4 h-[3.4rem] overflow-hidden">
        <span aria-live="polite">
          {readout ? `${readout.label} · ${readout.detail}` : 'fig. — the path so far'}
        </span>
        {!readout && <span className="hidden sm:block shrink-0">hover a star</span>}
      </figcaption>
    </figure>
  );
};

export default Constellation;
