const path = require('path');
const createConfig = require('@arcblock/gatsby-config/gatsby-node');

const i18nExcludedPages = [path.join(__dirname, 'src/pages/i.js')];

module.exports = createConfig({
  excludeI18n: page => i18nExcludedPages.includes(page.componentPath),
});
