/** @type {import('tailwindcss').Config} */

// Day chart / night chart: every color is a CSS variable defined in index.css,
// so the same utility classes render correctly under both themes.
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './index.html'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Archivo', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      colors: {
        ground: 'var(--ground)',
        ink: {
          DEFAULT: 'var(--ink)',
          soft: 'var(--ink-soft)',
          faint: 'var(--ink-faint)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          on: 'var(--on-accent)',
        },
        hair: 'var(--hair)',
        rule: 'var(--rule-strong)',
      },
      letterSpacing: {
        tightest: '-0.045em',
      },
      maxWidth: {
        page: '64rem',
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.text-balance': { 'text-wrap': 'balance' },
        '.tabular': { 'font-variant-numeric': 'tabular-nums' },
      });
    },
  ],
};
