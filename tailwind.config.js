const {heroui} = require('@heroui/theme');
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "// if using App Router\\\\r\\\\n    \\\\\\\"./pages/**/*.{js,ts,jsx,tsx}\\\\\\\"",
    "// if using Pages Router\\\\r\\\\n    \\\\\\\"./components/**/*.{js,ts,jsx,tsx}\\\\\\\"",
    "./node_modules/@heroui/theme/dist/components/(button|link|navbar|ripple|spinner).js"
  ],
  theme: {
    extend: {},
  },
  plugins: [heroui()],
}