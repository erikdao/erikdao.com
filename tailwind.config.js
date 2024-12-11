const colors = require('tailwindcss/colors')

module.exports = {
  content: {
    relative: true,
    files: [
      'dist/**/*.html',
    ]
  },
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        rose: colors.rose,
        slate: colors.slate,
        sky: colors.sky,
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: []
}
