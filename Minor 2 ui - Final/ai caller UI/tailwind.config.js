/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dusty: '#C98298',
        powder: '#D6E6F2',
        pageBg: '#F2F7FC',
        surface: '#FFFFFF',
        charcoal: '#24242B',
        heading: '#20242C',
        bodyText: '#626B78',
        muted: '#87909D',
        subtleBorder: '#E3EAF2',
        hoverCharcoal: '#383841',
        paleBlue: '#E8F1F8',
        blush: '#F5E8ED',
        successGreen: '#287A50',
        warningYellow: '#946018',
        errorRed: '#B93845',
      },
      boxShadow: {
        subtle: '0 4px 20px -2px rgba(37, 50, 71, 0.08)',
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        heading: ['Poppins', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
