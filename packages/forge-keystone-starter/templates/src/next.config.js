/* eslint import/no-extraneous-dependencies:"off" */
require('dotenv').config();

const path = require('path');
const withCSS = require('@zeit/next-css');
const withPlugins = require('next-compose-plugins');
// const withTranspile = require('next-transpile-modules');
const withCustomBabelConfigFile = require('next-plugin-custom-babel-config');

if (typeof require !== 'undefined') {
  require.extensions['.css'] = () => {};
}

module.exports = withPlugins(
  [
    [
      withCustomBabelConfigFile,
      {
        babelConfigFile: path.join(__dirname, './babel.config.js'),

        env: {
          appName: process.env.APP_NAME,
          appId: process.env.APP_ID,
          baseUrl: process.env.BASE_URL,
          apiPrefix: process.env.NF_API_PREFIX || process.env.API_PREFIX || '',
          chainHost: process.env.CHAIN_HOST,
          chainId: process.env.CHAIN_ID,
        },

        webpack: config => {
          // Fixes npm packages that depend on `fs` module
          config.node = {
            fs: 'empty',
          };

          const originalEntry = config.entry;
          config.entry = async () => {
            const entries = await originalEntry();
            if (entries['main.js']) {
              entries['main.js'].unshift('@babel/polyfill');
            }
            return entries;
          };

          // fixes https://github.com/graphql/graphql-js/issues/1272
          config.module.rules.push({
            test: /\.mjs$/,
            include: /node_modules/,
            type: 'javascript/auto',
          });

          return config;
        },
      },
    ],
    [
      withCSS,
      {
        cssModules: false,
        cssLoaderOptions: {
          url: false,
        },
      },
    ],
  ],
  {}
);
