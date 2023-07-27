/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      main: '#00A1FF',
      red: '#DF6B5A',
      blue: '#364BB3',
      lightBlue: '#1EA1F7',
      grey: '#EAEAEA',
      tab: '#FAFAFA',
      sell: '#F3F8FE',
      buy: '#FDF3F4',
      black: '#000000',
      darkGrey: '#606060',
      'main-light': '#E1EEE8',
      white: '#ffffff',
      middleGrey: '#75ccff',
      lightGrey: '#F2F5F7',
    },
    textColor: {
      main: '#00A1FF',
      white: '#FFFFFF',
      black: '#000000',
      grey: '#C5CBCF',
      red: '#DF6B5A',
      blue: '#364BB3',
      yellow: '#FFFF00',
      lightBlue: '#1EA1F7',
      darkGrey: '#606060',
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: ['light'],
  },
};
