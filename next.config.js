const path = require('path');

module.exports = {
  webpack(config, { isServer }) {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, 'src'), // '@' will point to your 'src' folder
    };
    return config;
  },
};