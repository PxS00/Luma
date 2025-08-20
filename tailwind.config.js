/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        backPrimary: '#FFEFD8',
        backSecondary: '#FDE6C6',
        backBtn: '#f7941d',
        hoverBtn: '#e67e00',
        navBtn: '#FFE0B2',
        navHoverBtn: '#F7941D',
        fontPrimary: '#a84421',
        fontSecondary: '#9f5c32',
        fontTertiary: '#333',
        clikColor: '#BF360C',
        borderColor: '#F77F00',
        fromColor: '#F7941D',
        toColor: '#FFCC80',
      },
      fontFamily: {
        atkinson: ['Atkinson Hyperlegible', 'Source Sans Pro', 'Roboto', 'Arial', 'sans-serif'],
        source: ['Source Sans Pro', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
