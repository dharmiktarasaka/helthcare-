/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          pink: '#D95C8A',
          blush: '#FCE8F0',
          rose: '#B8436D',
          lavender: '#B8A4E3',
          purple: '#8B6FCF',
          cream: '#FFF9F5',
          peach: '#FAD4C0',
          green: '#7FAF98',
          textDark: '#2F2430',
          textMuted: '#786C75',
          borderLight: '#EEDDE5',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Playfair Display', '"DM Serif Display"', 'serif'],
        sans: ['Inter', 'Poppins', 'Manrope', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
