# JagtapWorks Portfolio

Personal portfolio of **Atharva Jagtap**. A software engineer and UBC Computer Science graduate.

Live at [jagtapworks.com](https://jagtapworks.com)

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 + Vite |
| Styling | Tailwind CSS 3 + custom CSS design tokens |
| 3D / WebGL | Three.js (hero scene + planetary testimonials) |
| Animation | GSAP + CSS transitions |
| SEO | react-helmet-async + JSON-LD structured data |
| Deployment | Cloudflare Pages |
| Fonts | Instrument Serif, Instrument Sans, JetBrains Mono (self-hosted woff2) |

## Sections

**Home** — Full-viewport hero with a live Three.js "Constellation of Thought" scene: a torus knot, icosahedra, a dodecahedron, spheres, and a gold particle field arranged diagonally. Staggered text reveal on load. Mobile falls back to a CSS gradient.

**About** — First-person bio alongside categorised skill groups (Languages, Frameworks, Data & ML, Cloud & DevOps) with icon + label pills.

**Projects** — Three featured cards with alternating image/text layout, 3D cursor-tilt effect, and quantified result stats. Seven additional projects in a compact grid below, each opening a full modal with bullets, tech tags, and a GitHub link.

**Testimonials** — Interactive Three.js planetary system. Each planet is a real testimonial; hovering reveals a preview bubble, clicking opens a modal. The sun displays a personal message on hover. Fully keyboard-accessible.

**Contact** — Giant gold email CTA, three link cards (GitHub, LinkedIn, Resume download), closing tagline.

**Footer** — One-line minimal bar with Certifications modal trigger, back-to-top, and copyright.

## Featured Projects

| Project | Stack | Result |
|---------|-------|--------|
| Insurance Policy Software (BFL Canada) | React, Node.js, MySQL, Java, Playwright, Jest | 80% reduction in manual review time |
| Jersey Number Recognition | TensorFlow, PyTorch, Pandas, OpenCV | +18% classifier accuracy |
| Portfolio Website | React, Three.js, GSAP, Tailwind, Vite | 90+ Lighthouse score |

## Performance

- **Code splitting** — Three.js, GSAP, and vendor chunks isolated via Vite `manualChunks`
- **Lazy loading** — Testimonials section, ProjectModal, and CertificationsModal loaded on demand
- **StarryBackground** — Two-layer canvas: 70% of stars drawn once (static), 30% twinkling at 30fps cap using pre-rendered sprites. DPR capped at 1
- **Images** — WebP project images, `loading="lazy"` and explicit dimensions on all `<img>` tags
- **Fonts** — Self-hosted woff2 with `<link rel="preload">`, `font-display: swap`
- **Cache** — Cloudflare `_headers` sets 1-year immutable cache on `/assets/*` and `/fonts/*`

![](src\assets\ScoreScreenshot.png)

## Getting Started

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build → dist/
npm run preview   # preview the production build locally
```

Node 18+ required.

## Deployment

Deployed to **Cloudflare Pages** with automatic builds on push to `main`.

```
Build command:    npm run build
Output directory: dist
Node version:     18
```

Cloudflare settings: Auto Minify on, Brotli on, HTTP/3 on, Rocket Loader **off** (conflicts with Three.js), Mirage **off**.
