/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./static/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        satoshi: ["Satoshi", "sans-serif"],
        inter: ["Inter", "san-serif"],
      },
      colors: {
        "primary-orange": "#FF5722"
      }
    },
  },
  plugins: [],
}

