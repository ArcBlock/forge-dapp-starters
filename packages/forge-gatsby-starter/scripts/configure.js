/**
 * @fileOverview Spec for forge-next-starter, can be used as a template to setup a new starter
 *
 * @requires @arcblock/forge-wallet
 */

/* eslint-disable import/order */
/* eslint-disable no-console */
/* eslint-disable object-curly-newline */
const ip = require('ip');
const fs = require('fs');
const inquirer = require('inquirer');
const path = require('path');
const camelCase = require('lodash/camelCase');
const { types } = require('@arcblock/mcrypto');
const GraphQLClient = require('@arcblock/graphql-client');
const { fromRandom, WalletType } = require('@arcblock/forge-wallet');
const { name } = require('../package.json');
const debug = require('debug')(name);

const getConfigs = async () => {
  const defaults = {
    appName: 'Forge Gatsby Starter',
    appDescription: 'Starter dApp built on gatsby.js and runs on forge powered blockchain',
    appPort: 3030,
    chainHost: 'http://localhost:8210/api',
    mongoUri: 'mongodb://127.0.0.1:27017/forge-gatsby-starter',
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
  const ipAddress = ip.address();
  const client = new GraphQLClient({ endpoint: chainHost });
  const {
    info: { network: chainId },
  } = await client.getChainInfo();

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
  const configs = `# server only
MONGO_URI="${mongoUri}"
APP_TOKEN_SECRET="${wallet.publicKey.slice(16)}"
APP_TOKEN_TTL="1d"
APP_SK="${wallet.secretKey}"
APP_PORT="${appPort}"

# both client and server
GATSBY_CHAIN_ID="${chainId}"
GATSBY_CHAIN_HOST="${chainHost.replace('127.0.0.1', ipAddress).replace('localhost', ipAddress)}"
GATSBY_APP_NAME="${appName}"
GATSBY_APP_DESCRIPTION="${appDescription}"
GATSBY_APP_ID="${wallet.toAddress()}"
GATSBY_BASE_URL="http://${ipAddress}:${appPort}"
GATSBY_API_PREFIX=""`;

  return configs;
};

const configure = async () => {
  const targetDir = process.env.FORGE_BLOCKLET_TARGET_DIR;
  const configPath = path.join(`${targetDir}`, '.env');
  const configs = await getConfigs();

  fs.writeFileSync(configPath, configs);
  console.log(`Application config generated ${configPath}`);
};

configure();
