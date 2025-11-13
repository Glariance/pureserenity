/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        purple: {
          50: '#f8f5fc',
          100: '#f2eaf9',
          200: '#e9dff6',
          300: '#dfd3f2',
          400: '#d4c7ee',
          500: '#5F4D8B',
          600: '#5F4D8B',
          700: '#5F4D8B',
          800: '#a48fd9',
          900: '#8a74c9'
        }
      }
    },
  },
  plugins: [],
};
