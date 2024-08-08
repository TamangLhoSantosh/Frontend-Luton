/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        customOrange: "#DFAA5B",
        customDarkOrange: "#957554",
      },
    },
  },
  plugins: [],
};
