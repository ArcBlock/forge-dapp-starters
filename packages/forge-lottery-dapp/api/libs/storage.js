const path = require('path');
const keystone = require('keystone');

const storage = new keystone.Storage({
  adapter: keystone.Storage.Adapters.FS,
  fs: {
    path: path.resolve(__dirname, '../../uploads'),
    publicPath: '/public/uploads/',
  },
});

module.exports = storage;
