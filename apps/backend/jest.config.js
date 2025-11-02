const baseConfig = require('../../packages/core/jest.config.js');

module.exports = {
  ...baseConfig,
  // Override rootDir for backend app
  rootDir: 'src',
  coverageDirectory: '../coverage',
};
