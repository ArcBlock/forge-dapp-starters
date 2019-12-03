/**
 * @fileOverview Spec for forge-next-starter, can be used as a template to setup a new starter
 *
 * @requires @arcblock/forge-wallet
 */

/* eslint-disable import/order */
/* eslint-disable no-console */
/* eslint-disable object-curly-newline */
const fs = require('fs');
const ip = require('ip');
const camelCase = require('lodash/camelCase');
const path = require('path');
const inquirer = require('inquirer');
const GraphQLClient = require('@arcblock/graphql-client');
const { types } = require('@arcblock/mcrypto');
const { fromRandom, WalletType } = require('@arcblock/forge-wallet');
const { name } = require('../package.json');
const debug = require('debug')(name);

/**
 * On project folder created and files synced
 * You can create new files/modifying existing files in the project folder
 *
 * @param {object} config - project creating config
 * @param {string} config.targetDir - the project folder
 * @param {string} config.chainHost - the graphql endpoint the application running on
 * @param {string} config.chainId - the chainId of the application running on
 * @param {GraphQLClient} config.client - GraphQLClient instance that can be used to send request to the chain
 * @param {object} config.symbols - ui elements that can be used to print logs
 * @param {string} config.__starter__ - checkout `answers` for other collected parameters
 * @function
 * @public
 */
const getConfigs = async () => {
  const defaults = {
    appName: 'Forge Next.js Starter',
    appDescription: 'Starter dApp built on next.js that runs on forge powered blockchain',
    appPort: 3030,
    chainHost: 'http://localhost:8210/api',
    mongoUri: 'mongodb://127.0.0.1:27017/forge-next-starter',
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

  // Declare application on chain
  const wallet = fromRandom(
    WalletType({
      role: types.RoleType.ROLE_APPLICATION,
      pk: types.KeyType.ED25519,
      hash: types.HashType.SHA3,
    })
  );
  debug('application wallet', wallet.toJSON());
  const client = new GraphQLClient({ endpoint: chainHost });
  const {
    info: { network: chainId },
  } = await client.getChainInfo();
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

const printRequirements = () => {
  console.log('\nRequirements of the starter:');
  console.log('1. Forge chain: https://docs.arcblockio.cn/zh/docs/intro/quickstart');
  console.log('2. MongoDB service: https://www.mongodb.com/\n');
};

const run = async () => {
  printRequirements();

  const configPath = path.join(`${process.env.FORGE_BLOCKLET_TARGET_DIR}`, '.env');
  const configs = await getConfigs();

  fs.writeFileSync(configPath, configs);
  console.log(`Application config generated ${configPath}`);
};

run();
