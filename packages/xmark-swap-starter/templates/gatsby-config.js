require('dotenv').config();

const path = require('path');

module.exports = {
  plugins: [
    {
      resolve: '@arcblock/www',
    },
    {
      resolve: '@arcblock/gatsby-theme-www',
      options: {
        pagesPath: [path.resolve('./src/pages/')],
      },
    },
  ],
};
