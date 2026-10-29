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
          primary: '#C98298',
          secondary: '#D6E6F2',
          bg: '#F2F7FC',
          surface: '#FFFFFF',
          btn: '#24242B',
          heading: '#20242C',
          body: '#626B78',
          muted: '#87909D',
          border: '#E3EAF2',
          hover: '#383841',
          paleBlue: '#E8F1F8',
          blush: '#F5E8ED',
          success: '#287A50',
          warning: '#946018',
          error: '#B93845'
        }
      },
      fontFamily: {
        heading: ['Milker', 'Poppins', 'sans-serif'],
        sans: ['Poppins', 'sans-serif'],
      },
      boxShadow: {
        'nexus': '0 10px 30px -5px rgba(37, 50, 71, 0.08)',
        'nexus-sm': '0 4px 12px -2px rgba(37, 50, 71, 0.05)',
      }
    },
  },
  plugins: [],
}
