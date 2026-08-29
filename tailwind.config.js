/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "russia-red": "#B71C1C",
        "africa-gold": "#D4A017",
        "charcoal": "#121212",
        "dark-gray": "#2A2A2A",
        "off-white": "#F5F5F5",
        "light-gray": "#E0E0E0",
      },
      fontFamily: {
        "sans": ["Inter", "system-ui", "sans-serif"],
        "serif": ["Lora", "Georgia", "serif"],
      },
    },
  },
  plugins: [],
};