// eslint-disable-next-line no-undef
module.exports = {
  variants: {
    display: ['responsive', 'hover', 'focus', 'group-hover'],
    textColor: ['responsive', 'hover', 'focus', 'group-hover'],
    backgroundColor: ['responsive', 'hover', 'focus', 'active'],
  },
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    colors: {
      'primary-dark': '#2F3134',
      'primary-dark-light': '#363940',
      'secondary-dark': '#191A1B',
      'dark-80': '#404449',
      'primary-white': '#FDFDFD',
      gray: '#929292',
      'secondary-gray': '#A9ABAC',
      'primary-blue': '#2A84FF',
      danger: '#ED6161',
      placeholder: '#B0B1B2',
    },
    fontFamily: {
      sans: ["'IBM Plex Sans'"],
      serif: ['serif'],
      primary: ["'Nunito'"],
      secondary: ["'Poppins'"],
    },
    extend: {},
  },
  plugins: [],
}
