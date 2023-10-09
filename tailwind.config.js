/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        gruppo: ["Gruppo", "sans-serif"],
        exo: ["Exo", "sans-serif"],
        panchang: ["panchang", "sans-serif"],
        abc: ["abc", "sans-serif"],
      },
    },
  },
};
