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
          bg: '#050505',
          card: 'rgba(20, 20, 20, 0.7)',
          neon: '#00f3ff',
          purple: '#bc13fe',
          green: '#39ff14',
          red: '#ff003c'
        }
      },
      backgroundImage: {
        'cyber-gradient': 'linear-gradient(to bottom, #050505, #101010)',
        'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
      },
      boxShadow: {
        'neon-blue': '0 0 10px #00f3ff, 0 0 20px rgba(0, 243, 255, 0.5)',
        'neon-purple': '0 0 10px #bc13fe, 0 0 20px rgba(188, 19, 254, 0.5)',
      }
    },
  },
  plugins: [],
}
