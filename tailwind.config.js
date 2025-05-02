/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      colors: {
        // Dark mode surface colors - using a dark blue base for brand identity
        surface: {
          // Elevation levels - higher numbers = closer to user = lighter
          base: 'hsl(222, 25%, 8%)',     // Darkest background
          raised: 'hsl(222, 25%, 11%)',   // Cards, raised elements
          overlay: 'hsl(222, 25%, 14%)',  // Modals, overlays
          highest: 'hsl(222, 25%, 17%)'   // Floating elements
        },
        // Text colors - avoid pure white, use slightly dimmed text
        text: {
          primary: 'hsl(220, 15%, 90%)',    // Main text - not pure white
          secondary: 'hsl(220, 15%, 65%)',  // Secondary text
          muted: 'hsl(220, 15%, 45%)'       // Least important text
        },
        // Brand/accent colors - reduced saturation for dark mode
        accent: {
          light: 'hsl(220, 60%, 65%)',   // Lighter accent
          main: 'hsl(220, 60%, 55%)',    // Main accent color
          dark: 'hsl(220, 60%, 45%)'     // Darker accent for hover states
        },
        // Status colors - reduced saturation for dark mode
        status: {
          success: 'hsl(145, 50%, 40%)',
          warning: 'hsl(40, 50%, 50%)',
          error: 'hsl(358, 50%, 50%)',
          info: 'hsl(200, 50%, 50%)'
        },
        // Border colors
        border: {
          subtle: 'hsla(220, 15%, 20%, 0.5)', // Subtle borders
          strong: 'hsla(220, 15%, 30%, 0.8)'  // Strong borders
        }
      },
      animation: {
        dropdown: 'dropdown 0.3s ease-in-out',
        blink: 'blink 1s step-end infinite',
        fadeIn: 'fadeIn 0.5s ease-in-out',
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
        }
      },
      boxShadow: {
        'subtle': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'elevation': '0 4px 6px -1px rgba(0, 0, 0, 0.2), 0 2px 4px -1px rgba(0, 0, 0, 0.1)',
      }
    },
  },
  plugins: [],
};