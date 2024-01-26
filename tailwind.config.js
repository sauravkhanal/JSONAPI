/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          muiDarkBg: "#121212"
        },
        blue: {
          yankees: "#0C2340",
          dark: "#000916",
          bg:"#0D0F14",
          bg2:"#21242A",
          bg3:"#30343D"
        }
      }
    },
  },
  plugins: [],
}