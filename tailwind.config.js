/** @type {import('tailwindcss').Config} */
export default {
  mode: 'jit',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        lightGreen: '#b4ffdc',
        lightBlue: '#b4dcff',
        darkBlue: '#006ca3',
        bodyGreen: '#86efac',
        bodyRed: '#b91c1c',
        neutralLight: '#d4d4d4'
      },

    },
  },
  plugins: [],
}