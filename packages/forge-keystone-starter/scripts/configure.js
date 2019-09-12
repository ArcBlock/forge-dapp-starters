/**
 * @fileOverview Spec for forge-next-starter, can be used as a template to setup a new starter
 *
 * @requires @arcblock/forge-wallet
 */

/* eslint-disable import/order */
/* eslint-disable no-console */
/* eslint-disable object-curly-newline */
const inquirer = require('inquirer');
const fs = require('fs');
const ip = require('ip');
const path = require('path');
const camelCase = require('lodash/camelCase');
const GraphQLClient = require('@arcblock/graphql-client');
const { types } = require('@arcblock/mcrypto');
const { fromRandom, WalletType } = require('@arcblock/forge-wallet');
const { name } = require('../package.json');
const debug = require('debug')(name);

/**
 * On project folder created and files synced
 * You can create new files/modifying existing files in the project folder
 *
 * @function
 * @public
 */
const getConfigs = async () => {
  const defaults = {
    appName: 'Forge Keystone.js Starter',
    appDescription: 'Starter dApp built on keystone.js that runs on forge powered blockchain',
    appPort: 3030,
    chainHost: 'http://localhost:8210/api',
    mongoUri: 'mongodb://127.0.0.1:27017/forge-keystone-starter',
  };

  const questions = [
    {
      type: 'text',
      name: 'chainHost',
      message: 'Running chain node graphql endpoint:',
      default: defaults.chainHost,
      validate: input => {
        if (!input) return 'Chain node endpoint should not be empty';
        return true;
      },
    },
    {
      type: 'text',
      name: 'appName',
      message: 'dApp name:',
      default: defaults.appName,
      validate: input => {
        if (!input) return 'dApp name should not be empty';
        return true;
      },
    },
    {
      type: 'text',
      name: 'appDescription',
      message: 'dApp description:',
      default: defaults.appDescription,
      validate: input => {
        if (!input) return 'dApp description should not be empty';
        return true;
      },
    },
    {
      type: 'text',
      name: 'appPort',
      message: 'dApp listening port:',
      default: defaults.appPort,
      validate: input => {
        if (!input) return 'dApp listening port should not be empty';
        return true;
      },
    },
    {
      type: 'text',
      name: 'mongoUri',
      message: 'Mongodb URI:',
      default: defaults.mongoUri,
      validate: input => {
        if (!input) return 'Mongodb connection string:';
        return true;
      },
    },
  ];

  const { chainHost, appName, appDescription, appPort, mongoUri } = await inquirer.prompt(questions);
  const client = new GraphQLClient({ endpoint: chainHost });
  const {
    info: { chainId },
  } = await client.getChainInfo();
  const ipAddress = ip.address();

  // Declare application on chain
  const wallet = fromRandom(
    WalletType({
      role: types.RoleType.ROLE_APPLICATION,
      pk: types.KeyType.ED25519,
      hash: types.HashType.SHA3,
    })
  );
  debug('application wallet', wallet.toJSON());
  const hash = await client.sendDeclareTx({
    tx: {
      chainId,
      itx: {
        moniker: camelCase(appName),
      },
    },
    wallet,
  });

  debug('application declare tx', hash);
  console.log(`Application account declared on chain: ${wallet.toAddress()}`);

  // Generate config
  const configContent = `# server only
MONGO_URI="${mongoUri}"
COOKIE_SECRET="${wallet.publicKey.slice(16)}"
APP_TOKEN_SECRET="${wallet.publicKey.slice(16)}"
APP_TOKEN_TTL="1d"
APP_SK="${wallet.secretKey}"
APP_PORT="${appPort}"

# both client and server
CHAIN_ID="${chainId}"
CHAIN_HOST="${chainHost.replace('127.0.0.1', ipAddress).replace('localhost', ipAddress)}"
APP_NAME="${appName}"
APP_DESCRIPTION="${appDescription}"
APP_ID="${wallet.toAddress()}"
BASE_URL="http://${ipAddress}:${appPort}"`;

  return configContent;
};

const configure = async () => {
  const targetDir = process.env.FORGE_BLOCKLET_TARGET_DIR;
  const configs = await getConfigs();
  const configPath = path.join(`${targetDir}`, '.env');
  fs.writeFileSync(configPath, configs);

  console.log(`Application config generated ${configPath}`);
};

configure();
