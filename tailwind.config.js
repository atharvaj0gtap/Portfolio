/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Instrument Serif"', 'Georgia', 'serif'],
        sans: ['Outfit', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        surface: {
          base: 'hsl(230, 20%, 7%)',
          raised: 'hsl(230, 18%, 11%)',
          overlay: 'hsl(230, 18%, 14%)',
          highest: 'hsl(230, 18%, 17%)',
        },
        text: {
          primary: 'hsl(220, 10%, 88%)',
          secondary: 'hsl(220, 12%, 65%)',
          muted: 'hsl(220, 12%, 45%)',
        },
        accent: {
          light: 'hsl(210, 85%, 70%)',
          main: 'hsl(210, 80%, 62%)',
          dark: 'hsl(210, 75%, 50%)',
        },
        gold: {
          DEFAULT: 'hsl(45, 90%, 65%)',
          dark: 'hsl(42, 85%, 55%)',
        },
        teal: {
          DEFAULT: 'hsl(160, 50%, 55%)',
        },
        status: {
          success: 'hsl(145, 50%, 40%)',
          warning: 'hsl(40, 50%, 50%)',
          error: 'hsl(358, 50%, 50%)',
          info: 'hsl(200, 50%, 50%)',
        },
        border: {
          subtle: 'hsla(220, 15%, 20%, 0.5)',
          strong: 'hsla(220, 15%, 30%, 0.8)',
        },
      },
      animation: {
        dropdown: 'dropdown 0.3s ease-in-out',
        blink: 'blink 1s step-end infinite',
        fadeIn: 'fadeIn 0.5s ease-in-out',
        'scroll-slow': 'scroll 25s linear infinite',
        'scroll-slow-reverse': 'scrollReverse 25s linear infinite',
      },
      keyframes: {
        dropdown: {
          '0%': { transform: 'scaleY(0)', opacity: '0' },
          '100%': { transform: 'scaleY(1)', opacity: '1' },
        },
        blink: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0 },
        },
        fadeIn: {
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
        subtle: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        elevation: '0 4px 6px -1px rgba(0, 0, 0, 0.2), 0 2px 4px -1px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  variants: {},
  plugins: [
    function({ addUtilities }) {
      const newUtilities = {
        '.no-scrollbar': {
          scrollbarWidth: 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        },
      };
      addUtilities(newUtilities);
    },
  ],
};
