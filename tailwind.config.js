/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./views/**/*.{ejs, html, js}",
    "./public/**/*.js"
  ],
  theme: {
    container: {
      center: true,
    },
    extend: {},
  },
  daisyui: {
    base: true,
    styled: true,
    utils: true,
    themes: ["dark", "light"],
    darkTheme: "dark",
  },
  plugins: [
    require('daisyui'), 
  ],
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
}