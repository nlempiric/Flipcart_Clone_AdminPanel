/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    'node_modules/flowbite-react/lib/esm/**/*.js'
  ],
  theme: {
    extend: {
      screens: {
        "3xl": { min: "1440px", max: "2960px" },
        "2xl": { min: "1040px", max: "1439px" },
        xl: { min: "830px", max: "1039px" },
        lg: { min: "775px", max: "829px" },
        md: { min: "598px", max: "774px" },
        dsm: { min: "530px", max: "597px" },
        sm: { max: "539px" },
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
]
}