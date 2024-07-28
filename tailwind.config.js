const plugin = require('tailwindcss/plugin');

module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
    './packages/**/*.{vue,js,ts,jsx,tsx}',
  ],
  darkMode: 'media',
  theme: {
    extend: {
      fontFamily: {
        primary: ['Inter', 'sans-serif'],
      },
      fontSize: {
        'longform-xs': ['12px', '16px'],
        'longform-sm': ['14px', '22px'],
      },
      textColor: {
        primary: '#000000',
        secondary: '#6B7280',
        'dark-blue': '#1F2937',
      },
      boxShadow: {
        md: '0px 4px 8px 0px #4043443d',
      },
      backgroundImage: {
        'gradient-transparent-white':
          'linear-gradient(to bottom, transparent 50%, white 50%)',
      },
    },
  },
  variants: {},
  plugins: [
    plugin(({ addBase, theme }) => {
      addBase({
        html: {
          fontSize: '16px',
        },
        body: {
          fontFamily: theme('fontFamily.primary'),
          '-webkit-font-smoothing': 'antialiased',
          '-moz-osx-font-smoothing': 'grayscale',
        },
      });
    }),
  ],
};
