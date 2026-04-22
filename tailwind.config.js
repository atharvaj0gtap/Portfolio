/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './index.html'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Instrument Serif"', 'Georgia', 'serif'],
        sans: ['"Instrument Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      colors: {
        surface: {
          base: 'hsl(230, 22%, 7%)',
          raised: 'hsl(230, 20%, 11%)',
          overlay: 'hsl(230, 18%, 15%)',
          highest: 'hsl(230, 18%, 18%)',
        },
        text: {
          primary: 'hsl(40, 18%, 92%)',
          secondary: 'hsl(225, 10%, 65%)',
          muted: 'hsl(225, 10%, 48%)',
        },
        accent: {
          light: 'hsl(45, 95%, 72%)',
          main: 'hsl(42, 82%, 62%)',
          dark: 'hsl(42, 60%, 50%)',
        },
        gold: {
          DEFAULT: 'hsl(42, 82%, 62%)',
          bright: 'hsl(45, 95%, 72%)',
          muted: 'hsl(42, 60%, 50%)',
          dark: 'hsl(42, 60%, 50%)',
          subtle: 'hsla(42, 82%, 62%, 0.12)',
        },
        cyan: {
          DEFAULT: 'hsl(196, 75%, 62%)',
        },
        teal: {
          DEFAULT: 'hsl(166, 52%, 58%)',
        },
        copper: {
          DEFAULT: 'hsl(22, 62%, 54%)',
        },
        stone: {
          DEFAULT: 'hsl(35, 14%, 62%)',
        },
        status: {
          success: 'hsl(145, 50%, 40%)',
          warning: 'hsl(40, 50%, 50%)',
          error: 'hsl(358, 50%, 50%)',
          info: 'hsl(200, 50%, 50%)',
        },
        border: {
          subtle: 'hsl(230, 16%, 22%)',
          strong: 'hsl(230, 16%, 32%)',
        },
      },
      fontSize: {
        hero: 'clamp(3rem, 6.4vw, 6rem)',
        h1: 'clamp(2.25rem, 4vw, 3.5rem)',
        h2: 'clamp(1.5rem, 2.5vw, 2rem)',
        h3: 'clamp(1.125rem, 1.5vw, 1.5rem)',
        label: '0.8125rem',
      },
      letterSpacing: {
        tightest: '-0.035em',
        tighter: '-0.025em',
        'extra-wide': '0.22em',
      },
      animation: {
        dropdown: 'dropdown 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
        blink: 'blink 1s step-end infinite',
        fadeIn: 'fade-in 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        'scroll-slow': 'scroll 25s linear infinite',
        'scroll-slow-reverse': 'scrollReverse 25s linear infinite',
        'hint-breathe': 'hint-breathe 3.2s ease-in-out infinite',
        'scroll-beacon': 'scroll-beacon 2.4s ease-in-out infinite',
      },
      keyframes: {
        dropdown: {
          '0%': { transform: 'translateY(-6px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        blink: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0 },
        },
        'fade-in': {
          '0%': { opacity: 0, transform: 'translateY(10px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        scrollReverse: {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
      boxShadow: {
        subtle: '0 1px 3px 0 rgba(0, 0, 0, 0.3)',
        elevation: '0 6px 24px rgba(0, 0, 0, 0.38)',
        gold: '0 0 38px hsla(42, 82%, 62%, 0.18)',
        cyan: '0 0 38px hsla(196, 75%, 62%, 0.14)',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.no-scrollbar': {
          scrollbarWidth: 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        },
        '.text-balance': {
          'text-wrap': 'balance',
        },
      });
    },
  ],
};
