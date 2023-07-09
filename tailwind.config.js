/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      main: '#98C1D9',
      red: '#DF6B5A',
      blue: '#364BB3',
      lightBlue: '#1EA1F7',
      grey: '#EAEAEA',
      tab: '#FAFAFA',
      sell: '#F3F8FE',
      buy: '#FDF3F4',
      black: '#000000',
      'dark-grey': '#606060',
      'main-light': '#E1EEE8',
      white: '#ffffff',
      'grey-middle': '#8E949F',
      lightGrey: '#F2F5F7',
    },
    textColor: {
      main: '#98C1D9',
      white: '#FFFFFF',
      black: '#000000',
      grey: '#C5CBCF',
      red: '#DF6B5A',
      blue: '#364BB3',
      lightBlue: '#1EA1F7',
      'dark-grey': '#606060',
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};
