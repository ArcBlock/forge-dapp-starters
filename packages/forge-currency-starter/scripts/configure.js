/* eslint-disable no-console */
const fs = require('fs');
const ip = require('ip');
const camelCase = require('lodash/camelCase');
const path = require('path');
const axios = require('axios');
const inquirer = require('inquirer');
const GraphQLClient = require('@arcblock/graphql-client');
const { types } = require('@arcblock/mcrypto');
const { fromRandom, WalletType } = require('@arcblock/forge-wallet');
const debug = require('debug')(require('../package.json').name);

const chargeAPI = 'https://playground.wallet.arcblockio.cn/api/charge';

process.on('unhandledRejection', err => {
  throw err;
});

const getConfigs = async () => {
  const defaults = {
    appName: 'Forge Currency Starter',
    appDescription: 'Starter dApp built on react that runs on forge powered blockchain',
    appPort: 3030,
    chainHost: 'https://playground.network.arcblockio.cn/api',
    assetChainHost: 'https://zinc.network.arcblockio.cn/api',
    mongoUri: 'mongodb://127.0.0.1:27017/forge-currency-starter',
  };

  const questions = [
    {
      type: 'text',
      name: 'chainHost',
      message: 'Local chain node graphql endpoint:',
      default: defaults.chainHost,
      validate: input => {
        if (!input) return 'Chain node endpoint should not be empty';
        return true;
      },
    },
    {
      type: 'text',
      name: 'assetChainHost',
      message: 'Foreign chain node graphql endpoint:',
      default: defaults.assetChainHost,
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

  // eslint-disable-next-line object-curly-newline
  const { chainHost, assetChainHost, appName, appDescription, appPort, mongoUri } = await inquirer.prompt(questions);
  const client = new GraphQLClient({ endpoint: chainHost });
  const {
    info: { network: chainId },
  } = await client.getChainInfo();

  const assetClient = new GraphQLClient({ endpoint: assetChainHost });
  const {
    info: { network: assetChainId },
  } = await assetClient.getChainInfo();
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
  const hash1 = await client.sendDeclareTx({
    tx: {
      chainId,
      itx: {
        moniker: camelCase(appName),
      },
    },
    wallet,
  });
  console.log('Application local chain declare tx', hash1);
  console.log(`Application account declared on local chain: ${wallet.toAddress()}`);
  const hash2 = await assetClient.sendDeclareTx({
    tx: {
      chainId: assetChainId,
      itx: {
        moniker: camelCase(appName),
      },
    },
    wallet,
  });
  console.log('Application foreign chain declare tx', hash2);
  console.log(`Application account declared on foreign chain: ${wallet.toAddress()}`);

  // Charge application
  try {
    const nonce = Date.now().toString();
    const signature = wallet.sign(nonce);
    const { data } = await axios.post(chargeAPI, {
      appDid: wallet.toAddress(),
      appPk: wallet.publicKey,
      nonce,
      signature,
    });
    console.warn('Application test token charge success', data);
  } catch (err) {
    console.warn('Application test token charge failed', err);
  }

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
REACT_APP_ASSET_CHAIN_ID="${assetChainId}"
REACT_APP_ASSET_CHAIN_HOST="${assetChainHost.replace('127.0.0.1', ipAddress).replace('localhost', ipAddress)}"
REACT_APP_APP_NAME="${appName}"
REACT_APP_APP_DESCRIPTION="${appDescription}"
REACT_APP_APP_ID="${wallet.toAddress()}"
REACT_APP_BASE_URL="http://${ipAddress}:${appPort}"
REACT_APP_API_PREFIX=""`;
  return configContent;
};

const printRequirements = () => {
  console.log('\nRequirements of the starter:');
  console.log('1. Forge chain: https://docs.arcblockio.cn/zh/docs/intro/quickstart');
  console.log('2. MongoDB service: https://www.mongodb.com/\n');
};

const run = async () => {
  printRequirements();

  const configs = await getConfigs();
  const configPath = process.env.FORGE_BLOCKLET_TARGET_DIR
    ? path.join(`${process.env.FORGE_BLOCKLET_TARGET_DIR}`, '.env')
    : path.join(process.cwd(), '.env');

  fs.writeFileSync(configPath, configs);
  console.log(`Application config generated ${configPath}`);
};

run();
