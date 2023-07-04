/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      main: '#91D3C8',
      red: '#DF6B5A',
      blue: '#364BB3',
      grey: '#EAEAEA',
      tab: '#FAFAFA',
      sell: '#F3F8FE',
      buy: '#FDF3F4',
      black: '#000000',
      'dark-grey': '#606060',
      'main-light': '#E1EEE8',
      white: '#ffffff',
      'grey-middle': '#8E949F',
    },
    textColor: {
      main: '#91D3C8',
      white: '#FFFFFF',
      black: '#000000',
      red: '#DF6B5A',
      blue: '#364BB3',
      'dark-grey': '#606060',
      'grey-middle': '#8E949F',
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
