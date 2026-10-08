/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          dark: '#060a14',
          card: '#0c1327',
          border: 'rgba(0, 242, 254, 0.15)',
          blue: '#00f2fe',
          purple: '#8b5cf6',
          gold: '#f59e0b',
          red: '#ef4444',
          emerald: '#10b981'
        }
      }
    },
  },
  plugins: [],
}
