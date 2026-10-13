/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#080808',
          secondary: '#111111',
          card: '#171717',
          border: '#303030',
          text: '#F5F5F5',
          muted: '#B8B8B8',
        },
        light: {
          bg: '#F8F9FA',
          secondary: '#FFFFFF',
          card: '#FFFFFF',
          border: '#E5E7EB',
          text: '#111827',
          muted: '#4B5563',
        },
        accent: {
          DEFAULT: '#FF5B1B',
          hover: '#FF763D',
          light: '#FFECE4',
          subtle: 'rgba(255, 91, 27, 0.12)',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'glow-orange': '0 0 25px -5px rgba(255, 91, 27, 0.3)',
        'card-dark': '0 4px 20px -2px rgba(0, 0, 0, 0.5)',
      }
    },
  },
  plugins: [],
}

