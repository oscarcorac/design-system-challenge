const eslintBaseConfig = require('./eslint.base.cjs');

module.exports = {
  ...eslintBaseConfig,
  ignorePatterns: ['node_modules/', 'dist/', 'storybook-static/'],
};
