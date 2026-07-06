/* The JagtapWorks mark, V6 "gentle rise": two ink dots on a soft arc,
   terminating at Polaris. Colors ride the theme tokens, so it flips with
   the day/night toggle like everything else. */
const Mark = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="18.5" cy="5.5" r="5.5" style={{ fill: 'var(--star-glow)' }} opacity="0.6" />
    <path
      d="M4.5 19.3 Q 11.5 15.8, 16.9 8"
      fill="none"
      strokeWidth="1.1"
      strokeLinecap="round"
      style={{ stroke: 'var(--chart-line)' }}
    />
    <circle cx="4.5" cy="19.3" r="1.8" style={{ fill: 'var(--ink)' }} />
    <circle cx="11.1" cy="14.7" r="1.8" style={{ fill: 'var(--ink)' }} />
    <path
      d="M18.5 1.2 L19.7 4.3 L22.8 5.5 L19.7 6.7 L18.5 9.8 L17.3 6.7 L14.2 5.5 L17.3 4.3 Z"
      style={{ fill: 'var(--accent)' }}
    />
  </svg>
);

export default Mark;
