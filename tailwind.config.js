/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        instagram: {
          purple: '#833AB4',
          red: '#FD1D1D',
          yellow: '#F77737',
        }
      }
    },
  },
  plugins: [],
}
