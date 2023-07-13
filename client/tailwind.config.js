/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      padding: {
        15: '60px',
      },
      margin: {
        15: '60px',
      },
      width: {
        15: '60px',
      },
      height: {
        15: '60px',
      },
      zIndex: {
        header: 100,
        modal: 999,
      },
    },
    colors: {
      black: '#1c1c1e',
      gray800: '#48484a',
      gray600: '#636366',
      gray500: '#8e8e93',
      gray400: '#aeaeb2',
      gray300: '#c7c7cc',
      gray200: '#e5e5ea',
      gray100: '#f2f2f7',
      gray50: '#fbfbfd',
      white: '#ffffff',
      transparent: 'transparent',
      blue800: '#003876',
      blue500: '#007aff',
      blue300: '#64d2ff',
      blue100: '#e5f4ff',
      yellow500: '#ffc240',
      warning: '#FF3B30',
    },
    fontSize: {
      h1: [40, '60px'],
      h2: [32, '48px'],
      h3: [24, '36px'],
      b1: [20, '30px'],
      b2: [16, '24px'],
      b3: [15, '24px'],
      b4: [12, '18px'],
    },
    borderRadius: {
      DEFAULT: 5,
      lg: 10,
      xl: 20,
      '2xl': 40,
      full: 999,
      none: 0,
    },
    boxShadow: {
      DEFAULT: '2px 2px 3px rgba(72, 72, 74, 0.5)',
      black: '0px -4px 10px rgba(0, 0, 0, 0.25)',
      1: '0px 5px 18px 2px rgba(72, 72, 74, 0.1)',
      2: '0px 2px 4px rgba(0, 122, 255, 0.25);'
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    function ({ addComponents }) {
      addComponents({
        '.container': {
          maxWidth: 1220,
          paddingLeft: 20,
          paddingRight: 20,
          marginLeft: 'auto',
          marginRight: 'auto',
        },
        '.container-sm': {
          maxWidth: 770,
          paddingLeft: 20,
          paddingRight: 20,
          marginLeft: 'auto',
          marginRight: 'auto',
        },
      });
    },
  ],
};

//font-normal : 400
//font-medium : 500
//font-semibold : 600
//font-bold : 700
