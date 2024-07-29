const { designSystemPreset } = require('./tailwind.preset');

module.exports = {
  presets: [designSystemPreset],
  content: [
    './src/**/*.{vue,js,ts,jsx,tsx}',
    './packages/**/*.{vue,js,ts,jsx,tsx}',
  ],
  darkMode: 'media',
};
