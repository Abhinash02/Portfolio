/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,jsx}",
    "./src/components/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#06b6d4",
        dark: "#0f172a",
        card: "#111827"
      },
      boxShadow: {
        glow: "0 0 30px rgba(6,182,212,0.25)"
      }
    }
  },
  plugins: []
};