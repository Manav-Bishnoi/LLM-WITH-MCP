/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#131314',
        'bg-secondary': '#1a1a1c',
        card: '#232325',
        border: '#232325',
        text: '#ececf1',
        'text-secondary': '#a3a3b2',
        accent: '#4f8cff',
        'accent-hover': '#357ae8',
      },
    },
  },
  plugins: [],
};
