/** @type {import('tailwindcss').Config} */
const config = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      transitionProperty: {
        height: 'height',
      },
      keyframes: {
        moveX: {
          '100%': { transform: 'translate(0%)' },
        },
      },
      animation: {
        moveX: 'moveX 3s ease-in-out forwards',
      },
    },
  },
  plugins: [],
}

module.exports = config
