/* eslint-disable no-console */
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');
const express = require('express');
const keystone = require('keystone');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const bearerToken = require('express-bearer-token');
const ForgeSDK = require('@arcblock/forge-sdk');

const isProduction = process.env.NODE_ENV === 'production';

if (!process.env.MONGO_URI) {
  throw new Error('Cannot start application without process.env.MONGO_URI');
}

// Connect to database
let isConnectedBefore = false;
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, autoReconnect: true });
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
mongoose.connection.on('disconnected', () => {
  console.log('Lost MongoDB connection...');
  if (!isConnectedBefore) {
    mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, autoReconnect: true });
  }
});
mongoose.connection.on('connected', () => {
  isConnectedBefore = true;
  console.log('Connection established to MongoDB');
});
mongoose.connection.on('reconnected', () => {
  console.log('Reconnected to MongoDB');
});

// Initialize keystone
keystone.init({
  name: process.env.APP_NAME,
  brand: process.env.APP_NAME,
  'module root': path.resolve(__dirname, '../'),
  'auto update': true || process.env.NODE_ENV === 'production',
  'user model': 'Admin',
  session: true,
  'cookie secret': process.env.COOKIE_SECRET,
  'admin path': 'admin',
  'signout url': '/admin/signout',
  'signin url': '/admin/signout',
  auth: true,
});
keystone.initExpressSession(keystone.mongoose);
keystone.import('models');
keystone.set('nav', {
  应用: ['users'],
  系统: ['admins'],
});
keystone.initDatabaseConfig();

// Create and config express application
const server = express();
server.disable('x-powered-by');
server.set('trust proxy', true);
server.use(cookieParser(process.env.COOKIE_SECRET));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(cors());

server.use(
  morgan((tokens, req, res) => {
    const log = [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'),
      '-',
      tokens['response-time'](req, res),
      'ms',
    ].join(' ');

    if (isProduction) {
      // Log only in AWS context to get back function logs
      console.log(log);
    }

    return log;
  })
);

// ------------------------------------------------------------------------------
// Routes: due to limitations of netlify functions, we need to import routes here
// ------------------------------------------------------------------------------
const { decode } = require('../libs/jwt');
const { handlers, wallet } = require('../libs/auth');
const loginAuth = require('../routes/auth/login');
const paymentAuth = require('../routes/auth/payment');
const checkinAuth = require('../routes/auth/checkin');
const sessionRoutes = require('../routes/session');
const paymentsRoutes = require('../routes/payments');

// Auth routes
server.use(bearerToken());
server.use((req, res, next) => {
  if (!req.token) {
    next();
    return;
  }

  decode(req.token)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => {
      console.error('session.deserialize.error', err.message);
      next();
    });
});

// API routes
const router = express.Router();
handlers.attach(Object.assign({ app: router }, loginAuth));
handlers.attach(Object.assign({ app: router }, checkinAuth));
handlers.attach(Object.assign({ app: router }, paymentAuth));
sessionRoutes.init(router);
paymentsRoutes.init(router);
server.use(router);

// Application start requirements
ForgeSDK.getAccountState({ address: wallet.address })
  .then(res => {
    if (!res.state) {
      console.log('\n----------');
      console.error('Application account not declared on chain, abort!');
      console.error('Please run `node tools/declare.js` then start the application again');
      console.log('----------\n');
      process.exit(1);
    } else {
      console.error('Application account declared on chain');
    }
  })
  .catch(err => {
    console.error(err);
    console.log('\n----------');
    console.error('Application account check failed, abort!');
    console.log('----------\n');
    process.exit(1);
  });

// Admin routes
server.use(express.static('api/static'));
server.use('/admin', keystone.get('session options').cookieParser, keystone.expressSession, keystone.session.persist);
server.use('/admin', keystone.Admin.Server.createStaticRouter(keystone));
server.use('/admin', keystone.Admin.Server.createDynamicRouter(keystone));

exports.server = server;
exports.keystone = keystone;
