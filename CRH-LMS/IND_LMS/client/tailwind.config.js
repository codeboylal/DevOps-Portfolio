/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        inter:["Inter","sans-serif"],
        maiden:["Maiden Orange",'cursive'],
        wendy:["Wendy One"]
      },

      
    },
  },
  plugins: [],
}

