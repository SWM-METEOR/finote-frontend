/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      mobile: { max: '639px' },
      tablet: { min: '640px', max: '1023px' },
      md: { min: '768px' },
      desktop: { min: '1024px', max: '1809px' },
      lg: { min: '1024px', max: '1279px' },
      xl: { min: '1280px', max: '1536px' },
      'main-lg': { min: '1300px' },
      'main-md': { min: '860px', max: '1300px' },
      'main-sm': { max: '859px' },
      '2xl': { min: '1536px', max: '1809px' },
      largeDesktop: { min: '1810px' },
    },
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
      middleGrey: '#BABABA',
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
      margin: {
        '1/20': '5%',
        '1/7': '14%',
        '1/6': '16%',
        '1/5': '20%',
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75%',
      },
    },
  },
  plugins: [require('daisyui'), require('@tailwindcss/typography')],
  daisyui: {
    themes: ['cmyk'],
  },
};
