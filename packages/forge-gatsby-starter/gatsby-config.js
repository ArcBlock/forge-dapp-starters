/* eslint-disable no-console */
require('dotenv').config();

const path = require('path');
const createConfig = require('@arcblock/gatsby-config/gatsby-config');

module.exports = Object.assign(
  createConfig({
    pagesPath: [path.resolve('./src/markdown/'), path.resolve('./src/pages/')],
    excludeI18n: () => true,
  }),
  {
    proxy: {
      prefix: '/api',
      url: process.env.GATSBY_BASE_URL,
      // url: 'http://localhost:3030',
    },
  }
);
