/* Site-wide atmosphere, fixed behind all content.
   Day: a printed star atlas — faint graticule arcs and "+" star marks.
   Night: the same arcs moonlit, plus a sparse real starfield.
   Pure static SVG: no per-frame cost, unlike the old Three.js scene. */

const DAY_MARKS = [
  [120, 130], [320, 640], [700, 90], [1060, 560], [1300, 300],
  [180, 430], [880, 700], [520, 260], [980, 460],
];

const NIGHT_STARS = [
  [120, 130, 1.3, 1], [320, 640, 1, 0.9], [700, 90, 1.2, 1], [1060, 560, 1.1, 0.9],
  [1300, 300, 1.4, 1], [180, 430, 0.8, 0.7], [880, 700, 0.9, 0.8], [480, 200, 0.7, 0.6],
  [980, 150, 0.8, 0.7], [60, 720, 1, 0.7], [1240, 680, 0.7, 0.6], [560, 740, 0.8, 0.5],
  [820, 330, 0.6, 0.5], [1380, 100, 1, 0.8], [240, 60, 0.9, 0.7], [1150, 60, 0.7, 0.6],
  [420, 480, 0.6, 0.5], [640, 560, 0.7, 0.6],
];

const SkyField = () => (
  <svg
    aria-hidden="true"
    className="fixed inset-0 w-full h-full pointer-events-none"
    viewBox="0 0 1400 800"
    preserveAspectRatio="xMidYMid slice"
  >
    {/* atlas arcs, both modes */}
    <g fill="none" style={{ stroke: 'var(--chart-grid)' }}>
      <circle cx="1180" cy="-140" r="520" />
      <circle cx="1180" cy="-140" r="680" />
      <circle cx="-80" cy="880" r="420" />
    </g>

    {/* printed star marks — day only */}
    <g className="day-only" strokeWidth="1" style={{ stroke: 'var(--sky-mark)' }}>
      {DAY_MARKS.map(([x, y], i) => (
        <path key={i} d={`M${x - 4} ${y} h8 M${x} ${y - 4} v8`} />
      ))}
    </g>

    {/* real stars — night only */}
    <g className="night-only" style={{ fill: 'var(--star-core)' }}>
      {NIGHT_STARS.map(([x, y, r, o], i) => (
        <circle key={i} cx={x} cy={y} r={r} opacity={o} />
      ))}
      {/* two brighter stars with a cobalt halo, in the margins clear of the content column */}
      <circle cx="60" cy="480" r="9" style={{ fill: 'var(--star-glow)' }} opacity="0.35" />
      <circle cx="60" cy="480" r="1.6" />
      <circle cx="1330" cy="520" r="11" style={{ fill: 'var(--star-glow)' }} opacity="0.3" />
      <circle cx="1330" cy="520" r="1.8" />
    </g>
  </svg>
);

export default SkyField;
