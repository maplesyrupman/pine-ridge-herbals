/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./**/*.tsx",
    "./**/**/*.tsx",
    "./**/**/**/*.tsx"
  ],
  theme: {
    extend: {
      colors: {
        primary: 'rgb(var(--colour-primary))',
        "primary-light": 'rgb(var(--colour-primary-light))',
        background: 'rgb(var(--colour-background))'
      }
    },
  },
  plugins: [
    // ...
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/typography')
  ],
}
