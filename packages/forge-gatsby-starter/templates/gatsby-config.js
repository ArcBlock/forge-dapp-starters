/* eslint-disable no-console */
require('dotenv').config();

const path = require('path');

module.exports = {
  plugins: [
    {
      resolve: require.resolve('@arcblock/gatsby-theme-www'),
      options: {
        pagesPath: [path.resolve('./src/markdown/'), path.resolve('./src/pages/')],
      },
    },
  ],
  proxy: {
    prefix: '/api',
    url: process.env.GATSBY_BASE_URL,
    // url: 'http://localhost:3030',
  },
};
