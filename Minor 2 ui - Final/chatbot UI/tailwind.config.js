/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        nexus: {
          dustyRose: '#C98298',
          powderBlue: '#D6E6F2',
          bg: '#F2F7FC',
          surface: '#FFFFFF',
          charcoal: '#24242B',
          heading: '#20242C',
          body: '#626B78',
          muted: '#87909D',
          border: '#E3EAF2',
          hoverCharcoal: '#383841',
          paleBlue: '#E8F1F8',
          blush: '#F5E8ED',
          success: '#287A50',
          warning: '#946018',
          error: '#B93845',
        }
      },
      fontFamily: {
        heading: ['"Plus Jakarta Sans"', 'sans-serif'],
        body: ['Poppins', 'sans-serif'],
      },
      boxShadow: {
        nexus: '0 4px 20px -2px rgba(37, 50, 71, 0.08)',
        card: '0 2px 12px rgba(37, 50, 71, 0.04)',
      }
    },
  },
  plugins: [],
}
