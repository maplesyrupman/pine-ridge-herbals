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
        'primary': {
          light: 'rgb(var(--colour-primary-light))',
          DEFAULT: 'rgb(var(--colour-primary))',
          dark: 'rgb(var(--colour-primary-dark))'
        },
        'secondary': {
          'light': 'rgb(var(--colour-secondary-light))',
          DEFAULT: 'rgb(var(--colour-secondary))'
        }
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
