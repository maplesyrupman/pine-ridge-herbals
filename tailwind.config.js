/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./**/*.tsx",
    "./**/**/*.tsx",
    "./**/**/**/*.tsx"
  ],
  theme: {
    extend: {},
  },
  plugins: [
    // ...
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/typography')
  ],
}
