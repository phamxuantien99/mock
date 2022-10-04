/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
    // colors: {
    //   'yellow-primary': '#ffc017',
    // },
    fontFamily: {
      firasans: ['Fira Sans', 'sans-serif'],
      crimson: ['Crimson Text', 'serif'],
      sourceSerif: ['Source Serif Pro', 'serif'],
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
};
