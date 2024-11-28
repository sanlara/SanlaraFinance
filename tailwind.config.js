/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        questrial: ['Questrial', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#2A2A2A',
          light: '#3A3A3A',
          dark: '#1A1A1A',
        },
        accent: {
          DEFAULT: '#F5E6D3',
          light: '#FFF9F2',
          dark: '#E6D1B8',
        },
        background: '#2A2A2A',
        card: '#333333',
      },
    },
  },
  plugins: [],
};