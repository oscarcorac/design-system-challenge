const eslintBaseConfig = require('./eslint.base.js');

module.exports = {
  ...eslintBaseConfig,
  ignorePatterns: ['node_modules/', 'dist/', 'storybook-static/'],
};
