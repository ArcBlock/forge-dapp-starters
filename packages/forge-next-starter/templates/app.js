/* eslint-disable no-console */
require('dotenv').config();

const path = require('path');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';

const { name, version } = require('./package.json');
const { server } = require('./api/functions/app');

// Create next.js application
const app = next({
  dev,
  dir: path.join(__dirname, './src'),
});

// Prepare next.js application
app.prepare().then(() => {
  const handle = app.getRequestHandler();
  server.get('*', (req, res) => handle(req, res));

  const port = parseInt(process.env.PORT, 10) || parseInt(process.env.APP_PORT, 10) || 3000;
  server.listen(port, err => {
    if (err) throw err;
    console.log(`> ${name} v${version} ready on ${process.env.BASE_URL}`);
  });
});
