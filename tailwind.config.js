/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // this enables dark mode via a class
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#facc15",
          dark: "#eab308",
        },
        background: {
          light: "#FFFDF6",
          dark: "#0f0f0f",
        },
        foreground: {
          light: "#1f2937",
          dark: "#f3f4f6",
        },
        textc: {
          light: "#4B5563",
          dark: "#9CA3AF",
        }
      },
      keyframes: {
        "border-rotate": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
      },
      animation: {
        "border-rotate": "border-rotate var(--animation-duration) linear infinite",
      },
    },
  },
  plugins: [("@tailwindcss/typography")],
};
