/* eslint-disable no-console */
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

const getConfigs = async () => {
  const defaults = {
    appName: 'Forge React Starter',
    appDescription: 'Starter dApp built on react that runs on forge powered blockchain',
    appPort: 3030,
    chainHost: 'http://localhost:8210/api',
    mongoUri: 'mongodb://127.0.0.1:27017/forge-react-starter',
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
    info: { network: chainId },
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
  debug('Application wallet', wallet.toJSON());
  const hash = await client.sendDeclareTx({
    tx: {
      chainId,
      itx: {
        moniker: camelCase(appName),
      },
    },
    wallet,
  });
  console.log('application declare tx', hash);
  console.log(`Application account declared on chain: ${wallet.toAddress()}`);

  // Generate config
  const configContent = `SKIP_PREFLIGHT_CHECK=true

# server only
MONGO_URI="${mongoUri}"
APP_TOKEN_SECRET="${wallet.publicKey.slice(16)}"
APP_TOKEN_TTL="1d"
APP_SK="${wallet.secretKey}"
APP_PORT="${appPort}"

# both server and client
REACT_APP_CHAIN_ID="${chainId}"
REACT_APP_CHAIN_HOST="${chainHost.replace('127.0.0.1', ipAddress).replace('localhost', ipAddress)}"
REACT_APP_APP_NAME="${appName}"
REACT_APP_APP_DESCRIPTION="${appDescription}"
REACT_APP_APP_ID="${wallet.toAddress()}"
REACT_APP_BASE_URL="http://${ipAddress}:${appPort}"
REACT_APP_API_PREFIX=""`;
  return configContent;
};

const run = async () => {
  const configPath = path.join(`${process.env.FORGE_BLOCKLET_TARGET_DIR}`, '.env');
  const configs = await getConfigs();

  fs.writeFileSync(configPath, configs);
  console.log(`Application config generated ${configPath}`);
};

run();
