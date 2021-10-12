const defaultTheme = require('tailwindcss/defaultTheme')
const forms = require('@tailwindcss/forms');
module.exports = {
  purge: {},
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        customSans : ['Open Sans', 'sans-serif'],
        customRoboto : ['Roboto', 'sans-serif'],
        customPro : ['Source Sans Pro', 'sans-serif'],
        customBarlow : ['Barlow Semi Condensed', 'sans-serif']
      },
      screens: {
        'sm': {'min': '140px', 'max': '767px'},
        'md': {'min': '768px', 'max': '1023px'},
        'lg': {'min': '1024px', 'max': '1279px'},
        'xl': {'min': '1280px', 'max': '1535px'},
        '2xl': {'min': '1536px'},
      },
    },
    
  },
  variants: {},
  plugins: [
    forms
  ],
}