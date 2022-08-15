/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateRows:{
        'new5': '50px repeat(5, minmax(80px, 100px))'
      },
      screens: {
        sm: '500px',
        md: '800px',
        lg: '976px',
        xl: '1440px',
      },
      colors:{
        'theme-bg-color': 'rgba(16 18 27 / 40%)',
        'border-color': 'rgba(113 119 144 / 25%)',
        'theme-color': '#f9fafb',
        'inactive-color': 'rgb(113 119 144 / 78%)',
        'hover-menu-bg': 'rgba(12 15 25 / 30%)',
        'content-title-color': '#999ba5',
        'content-bg': 'rgb(146 151 179 / 13%)',
        'popup-bg': 'rgb(22 25 37)',
        'search-bg':  '#14162b',
        'overlay-bg': 'rgba(36, 39, 59, 0.3)',
      }
    },
    
  },
  plugins: [],
}
