import { useEffect, useRef } from 'react';

/* The easter egg behind the header's Polaris coordinates, staged as a
   journey in three acts:
     1. Departure — the page slides past the camera, crisp, from the click point.
     2. Travel — layers of stars stream outward past the viewer.
     3. Arrival — Ursa Minor appears small in the distance and we settle into it.
   Closing plays the same film in reverse. Timings live in index.css. */

/* Positions projected from the stars' real RA/Dec (polar projection about
   the north celestial pole), so the figure is the actual Little Dipper:
   a steep curved handle from Polaris into an open trapezoid bowl. */
const STARS = [
  { id: 'polaris', x: 850, y: 130, r: 4.2, delay: 2.5, big: true },
  { id: 'yildun', x: 812, y: 276, r: 2.2, delay: 2.7 },
  { id: 'epsilon', x: 732, y: 434, r: 2.4, delay: 2.9 },
  { id: 'zeta', x: 568, y: 532, r: 2.2, delay: 3.1 },
  { id: 'eta', x: 593, y: 635, r: 1.8, delay: 3.3 },
  { id: 'pherkad', x: 387, y: 678, r: 2.8, delay: 3.5 },
  { id: 'kochab', x: 386, y: 555, r: 3.2, delay: 3.7 },
];

const byId = Object.fromEntries(STARS.map(s => [s.id, s]));

/* The classic stick figure: handle from Polaris down, then the bowl. */
const LINES = [
  ['polaris', 'yildun'], ['yildun', 'epsilon'], ['epsilon', 'zeta'],
  ['zeta', 'eta'], ['eta', 'pherkad'], ['pherkad', 'kochab'], ['kochab', 'zeta'],
];

/* Destination sky scatter, dim, so the dipper stays the subject. */
const FIELD = [
  [60, 80, 1], [180, 620, 0.8], [240, 150, 1.1], [420, 60, 0.9], [560, 640, 1],
  [700, 560, 0.8], [820, 420, 1.2], [930, 250, 0.9], [950, 600, 1], [120, 380, 0.7],
  [650, 100, 0.8], [340, 280, 0.6], [770, 300, 0.7], [520, 180, 0.9], [80, 540, 0.9],
  [900, 60, 0.7], [280, 660, 0.8], [610, 460, 0.6], [960, 460, 0.8], [40, 240, 0.8],
];

/* Three parallax layers for the travel act. Each streams outward from the
   center of the frame; radial ticks give a hint of motion streaks. */
const TRAVEL_LAYERS = [
  [[500, 120], [820, 240], [180, 200], [300, 560], [700, 600], [920, 480], [90, 420], [610, 90], [420, 640], [980, 130]],
  [[250, 90], [880, 560], [140, 620], [560, 200], [760, 120], [380, 470], [940, 330], [60, 280], [660, 660], [840, 60]],
  [[130, 100], [720, 500], [480, 80], [910, 200], [220, 400], [590, 560], [340, 180], [800, 640], [1000, 420], [70, 600]],
];

const streakEnd = (x, y) => {
  const cx = 500, cy = 350, k = 0.055;
  return [x + (x - cx) * k, y + (y - cy) * k];
};

const UrsaMinor = ({ closing, onClose, onGone }) => {
  const closeRef = useRef(null);

  /* Scroll-lock that mobile browsers actually honor: pin the body at its
     current offset while the sky is open, restore the exact position on the
     way home. Runs once per visit — no dependencies, so nothing can tear it
     down mid-flight. The restore forces a reflow first: without it the
     document is still one viewport tall and scrollTo gets clamped. */
  useEffect(() => {
    const scrollY = window.scrollY;
    const { style } = document.body;
    style.position = 'fixed';
    style.top = `-${scrollY}px`;
    style.left = '0';
    style.right = '0';
    style.width = '100%';

    return () => {
      style.position = '';
      style.top = '';
      style.left = '';
      style.right = '';
      style.width = '';
      void document.body.offsetHeight;
      const html = document.documentElement;
      const prev = html.style.scrollBehavior;
      html.style.scrollBehavior = 'auto';
      window.scrollTo(0, scrollY);
      html.style.scrollBehavior = prev;
    };
  }, []);

  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  useEffect(() => {
    if (!closing) return;
    const t = setTimeout(onGone, 2700);
    return () => clearTimeout(t);
  }, [closing, onGone]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Ursa Minor, the Little Dipper. Click anywhere to return."
      className={`sky-dive ${closing ? 'sky-dive-exit' : 'sky-dive-enter'}`}
      onClick={onClose}
    >
      {/* Wide screens crop into the sky (slice); portrait screens letterbox
          (meet) so the whole constellation stays in frame. */}
      <svg
        viewBox="0 0 1000 700"
        preserveAspectRatio={
          window.innerHeight > window.innerWidth ? 'xMidYMid meet' : 'xMidYMid slice'
        }
        className="w-full h-full block"
        aria-hidden="true"
      >
        {/* ACT 2 — travel: star layers streaming past the camera */}
        {TRAVEL_LAYERS.map((layer, li) => (
          <g key={li} className={`travel-layer tl-${li + 1}`}>
            {layer.map(([x, y], i) => {
              const [ex, ey] = streakEnd(x, y);
              return (
                <g key={i}>
                  <line x1={x} y1={y} x2={ex} y2={ey} stroke="#F4F1EB" strokeWidth="0.7" opacity="0.35" />
                  <circle cx={x} cy={y} r={0.9 + (i % 3) * 0.4} fill="#F4F1EB" opacity="0.8" />
                </g>
              );
            })}
          </g>
        ))}

        {/* ACT 3 — arrival: destination sky at full size, dipper settling small */}
        <g className="dest-field" fill="#F4F1EB">
          {FIELD.map(([x, y, r], i) => (
            <circle key={i} cx={x} cy={y} r={r} opacity="0.28" />
          ))}
        </g>

        <g className="dipper">
          <g stroke="#7AB0FF" strokeWidth="0.8" opacity="0.5" fill="none">
            {LINES.map(([a, b], i) => (
              <line
                key={`${a}-${b}`}
                x1={byId[a].x} y1={byId[a].y} x2={byId[b].x} y2={byId[b].y}
                pathLength="1"
                strokeDasharray="1"
                strokeDashoffset="1"
                style={{ animation: `line-draw 500ms ease-out ${3.8 + i * 0.2}s forwards` }}
              />
            ))}
          </g>

          {STARS.map(star => (
            <g key={star.id} style={{ animation: `star-rise 700ms ease-out ${star.delay}s both` }}>
              {star.big && <circle cx={star.x} cy={star.y} r="22" fill="#7AB0FF" opacity="0.18" />}
              {star.big && <circle cx={star.x} cy={star.y} r="10" fill="#7AB0FF" opacity="0.25" />}
              <circle
                cx={star.x} cy={star.y} r={star.r}
                fill={star.big ? '#7AB0FF' : '#F4F1EB'}
                style={star.big ? {} : { animation: `twinkle 4s ease-in-out ${star.delay + 1.5}s infinite` }}
              />
            </g>
          ))}

          <g fontFamily="'JetBrains Mono', ui-monospace, monospace" fontSize="15" fill="#8B93AD">
            <text x="880" y="135" style={{ animation: 'star-rise 800ms ease-out 5.0s both' }}>
              Polaris
            </text>
          </g>
        </g>
      </svg>

      {/* chart annotations */}
      <p className="sky-title annot-caps sky-fade" style={{ animation: 'star-rise 800ms ease-out 4.4s both' }}>
        Ursa Minor — the Little Dipper
      </p>

      <button
        ref={closeRef}
        onClick={onClose}
        className="sky-close annot sky-fade"
        style={{ animation: 'star-rise 800ms ease-out 4.4s both' }}
        aria-label="Return to the site"
      >
        ✕ fly home
      </button>

      <div className="sky-caption sky-fade" style={{ animation: 'star-rise 900ms ease-out 5.7s both' }}>
        <p className="m-0">
          For centuries Polaris has guided travelers because its place in the
          sky never changes. A guiding star does the same in life: a core
          principle that keeps your path aligned when everything else is uncertain.
        </p>
        <p className="annot m-0 mt-3">click anywhere to fly home</p>
      </div>
    </div>
  );
};

export default UrsaMinor;
