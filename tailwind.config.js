/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'secondary': '#2E4057', // Deep Slate Blue
        'accent': '#FFD700', // Muted Gold
      },
      transitionProperty: {
        'height': 'height',
      },
      animation: {
        dropdown: 'dropdown 0.3s ease-in-out',
      },
      keyframes: {
        dropdown: {
          '0%': { transform: 'scaleY(0)', opacity: '0' },
          '100%': { transform: 'scaleY(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};