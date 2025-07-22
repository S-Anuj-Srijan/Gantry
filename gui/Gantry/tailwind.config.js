// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        'nav-bg': '#bde0fe'
      },
      fontFamily: {
        bebas: ['"Bebas Neue"', 'sans-serif'],
        helvetica: ['Helvetica', 'Arial', 'sans-serif']
      }
    },
  },
  plugins: [],
};
