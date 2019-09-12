/* eslint-disable no-console */
require('dotenv').config();

const path = require('path');

const i18nExcludedPages = [path.join(__dirname, 'src/pages/i.js')];

module.exports = {
  plugins: [
    {
      resolve: require.resolve('@arcblock/gatsby-theme-www'),
      options: {
        pagesPath: [path.resolve('./src/markdown/'), path.resolve('./src/pages/')],
        excludeI18n: page => i18nExcludedPages.includes(page.componentPath),
      },
    },
  ],
  proxy: {
    prefix: '/api',
    url: process.env.GATSBY_BASE_URL,
    // url: 'http://localhost:3030',
  },
};
