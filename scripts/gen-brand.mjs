/* Generates the JagtapWorks V6 brand raster set with sharp.
   Run from the Portfolio repo root. */
import sharp from 'sharp';

const DAY = { ink: '#14161F', acc: '#193FC8' };
const NIGHT = { ink: '#F4F1EB', acc: '#7AB0FF', ground: '#0B0D19', groundHi: '#161B2E', glow: '#7AB0FF59' };

// The V6 mark, slim weights, in a 24x24 box. Scaled by wrapping viewBox users.
const mark = (c, { glow = false, chunky = false } = {}) => `
  ${glow ? `<circle cx="18.5" cy="5.5" r="6" fill="url(#starglow)"/>` : ''}
  <path d="M4.5 19.3 Q 11.5 15.8, 16.9 8" fill="none" stroke="${c.ink}" stroke-width="${chunky ? 1.6 : 0.6}" opacity="0.5" stroke-linecap="round"/>
  <circle cx="4.5" cy="19.3" r="${chunky ? 2.1 : 1.45}" fill="${c.ink}"/>
  <circle cx="11.1" cy="14.7" r="${chunky ? 2.1 : 1.45}" fill="${c.ink}"/>
  <path d="M18.5 ${chunky ? 0.8 : 1.5} L${chunky ? 19.8 : 19.6} ${chunky ? 4.2 : 4.4} L${chunky ? 23.2 : 22.5} 5.5 L${chunky ? 19.8 : 19.6} ${chunky ? 6.8 : 6.6} L18.5 ${chunky ? 10.2 : 9.5} L${chunky ? 17.2 : 17.4} ${chunky ? 6.8 : 6.6} L${chunky ? 13.8 : 14.5} 5.5 L${chunky ? 17.2 : 17.4} ${chunky ? 4.2 : 4.4} Z" fill="${c.acc}"/>
`;

const GLOW_DEF = `<radialGradient id="starglow" cx="50%" cy="50%" r="50%">
  <stop offset="0%" stop-color="${NIGHT.acc}" stop-opacity="0.4"/>
  <stop offset="100%" stop-color="${NIGHT.acc}" stop-opacity="0"/>
</radialGradient>`;

const svgDoc = (size, inner) =>
  Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24">${inner}</svg>`);

// 1. PNG favicon fallbacks: F3, the day-chart mark on a paper tile
//    (same as favicon.svg).
const DAY_GROUND = '#F4F3F1';
const tileMark = `
  <path d="M6 18.4 Q 12 15.4, 16.2 9.4" fill="none" stroke="${DAY.ink}" stroke-width="1.5" opacity="0.5" stroke-linecap="round"/>
  <circle fill="${DAY.ink}" cx="6" cy="18.4" r="2"/>
  <circle fill="${DAY.ink}" cx="11.7" cy="14.4" r="2"/>
  <path fill="${DAY.acc}" d="M17.6 2.6 L18.8 5.8 L22 7 L18.8 8.2 L17.6 11.4 L16.4 8.2 L13.2 7 L16.4 5.8 Z"/>`;
const tile = (size) => Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24">
  <rect width="24" height="24" rx="5.5" fill="${DAY_GROUND}"/>
  <rect width="23" height="23" x="0.5" y="0.5" rx="5" fill="none" stroke="${DAY.ink}" opacity="0.12"/>
  ${tileMark}
</svg>`);
await sharp(tile(192)).png().toFile('public/assets/logos/favicon-192.png');
await sharp(tile(32)).png().toFile('public/assets/logos/favicon-32.png');

// 2. Apple touch icon: same paper tile, full-bleed (iOS rounds the corners).
const apple = `<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" viewBox="0 0 30 30">
  <rect width="30" height="30" fill="${DAY_GROUND}"/>
  <g transform="translate(3,3)">${tileMark}</g>
</svg>`;
await sharp(Buffer.from(apple)).png().toFile('public/assets/logos/apple-touch-icon.png');

// 3. Avatar 512: night ground, centered mark with glow.
const avatar = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 40 40">
  <defs>
    <radialGradient id="g" cx="50%" cy="30%" r="90%">
      <stop offset="0%" stop-color="${NIGHT.groundHi}"/>
      <stop offset="65%" stop-color="${NIGHT.ground}"/>
    </radialGradient>
    ${GLOW_DEF}
  </defs>
  <rect width="40" height="40" fill="url(#g)"/>
  <g transform="translate(8,8)">${mark(NIGHT, { glow: true })}</g>
</svg>`;
await sharp(Buffer.from(avatar)).png().toFile('public/assets/logos/avatar-512.png');

// 4. OG image 1200x630: night ground, mark + name + one honest line.
const og = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <defs>
    <radialGradient id="g" cx="50%" cy="0%" r="120%">
      <stop offset="0%" stop-color="${NIGHT.groundHi}"/>
      <stop offset="60%" stop-color="${NIGHT.ground}"/>
    </radialGradient>
    ${GLOW_DEF}
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <!-- sparse stars -->
  <g fill="${NIGHT.ink}">
    <circle cx="140" cy="90" r="2" opacity="0.7"/><circle cx="1050" cy="140" r="2.4" opacity="0.8"/>
    <circle cx="880" cy="60" r="1.6" opacity="0.5"/><circle cx="300" cy="520" r="1.8" opacity="0.5"/>
    <circle cx="1120" cy="480" r="2" opacity="0.6"/><circle cx="620" cy="100" r="1.4" opacity="0.4"/>
  </g>
  <g transform="translate(90,150) scale(9)">${mark(NIGHT, { glow: true })}</g>
  <text x="400" y="300" font-family="Arial, Helvetica, sans-serif" font-weight="800" font-size="76" letter-spacing="-2" fill="${NIGHT.ink}">ATHARVA JAGTAP</text>
  <text x="404" y="360" font-family="Consolas, 'Courier New', monospace" font-size="24" letter-spacing="5" fill="#9AA3BD">SOFTWARE ENGINEER · UBC '25</text>
  <text x="404" y="410" font-family="Consolas, 'Courier New', monospace" font-size="26" letter-spacing="6" fill="${NIGHT.acc}">AI THAT SURVIVES PRODUCTION</text>
  <text x="404" y="560" font-family="Consolas, 'Courier New', monospace" font-size="22" letter-spacing="4" fill="#9AA3BD">JAGTAPWORKS.COM</text>
</svg>`;
await sharp(Buffer.from(og)).png().toFile('public/assets/logos/og-image.png');

// 5. LinkedIn banner 1584x396. LinkedIn's profile photo overlaps the
//    bottom-left on desktop, so everything important stays right of x=500.
const banner = `<svg xmlns="http://www.w3.org/2000/svg" width="3168" height="792" viewBox="0 0 1584 396">
  <defs>
    <radialGradient id="g" cx="60%" cy="0%" r="130%">
      <stop offset="0%" stop-color="${NIGHT.groundHi}"/>
      <stop offset="60%" stop-color="${NIGHT.ground}"/>
    </radialGradient>
    ${GLOW_DEF}
  </defs>
  <rect width="1584" height="396" fill="url(#g)"/>
  <g fill="none" stroke="${NIGHT.acc}" opacity="0.07">
    <circle cx="1500" cy="-260" r="500"/>
    <circle cx="1500" cy="-260" r="620"/>
  </g>
  <g fill="${NIGHT.ink}">
    <circle cx="620" cy="70" r="1.8" opacity="0.6"/><circle cx="900" cy="330" r="2" opacity="0.5"/>
    <circle cx="1080" cy="60" r="1.5" opacity="0.5"/><circle cx="1400" cy="320" r="1.8" opacity="0.6"/>
    <circle cx="760" cy="180" r="1.3" opacity="0.35"/><circle cx="1220" cy="140" r="1.6" opacity="0.45"/>
  </g>
  <text x="560" y="185" font-family="Consolas, 'Courier New', monospace" font-size="30" letter-spacing="8" fill="${NIGHT.acc}">AI THAT SURVIVES PRODUCTION</text>
  <text x="562" y="235" font-family="Consolas, 'Courier New', monospace" font-size="20" letter-spacing="5" fill="#9AA3BD">SOFTWARE ENGINEER · UBC '25 · JAGTAPWORKS.COM</text>
  <g transform="translate(1355,55) scale(7)">${mark(NIGHT, { glow: true })}</g>
</svg>`;
await sharp(Buffer.from(banner)).png().toFile('public/assets/logos/linkedin-banner.png');

console.log('brand set generated');
