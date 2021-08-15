const TsconfigPathPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    'storybook-addon-styled-component-theme/dist/preset',
  ],
  webpackFinal: async (config) => {
    config.resolve.plugins.push(new TsconfigPathPlugin({}));

    return config;
  },
};
