const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['dist/**/*.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        rose: colors.rose,
        slate: colors.slate
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: []
}
