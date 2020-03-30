/* eslint-disable no-console */
require('dotenv').config();

const path = require('path');
const env = require('./src/libs/env');

module.exports = {
  plugins: [
    {
      resolve: require.resolve('@arcblock/www'),
    },
    {
      resolve: require.resolve('@arcblock/gatsby-theme-www'),
      options: {
        pagesPath: [path.resolve('./src/markdown/'), path.resolve('./src/pages/')],
        siteMetaData: {
          title: env.appName,
          siteUrl: env.baseUrl,
          disableI18n: true,
        },
      },
    },
  ],
  proxy: {
    prefix: '/api',
    url: process.env.GATSBY_BASE_URL,
    // url: 'http://localhost:3030',
  },
};
