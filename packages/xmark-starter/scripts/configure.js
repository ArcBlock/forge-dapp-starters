/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');

const getConfigs = async () => {
  const defaults = {
    connectAppDid: 'zNKWfcRpzUwDPPzmBszXDRLepJKHG9gLFeqv',
    connectHost: 'https://connect.wallet.arcblockio.cn',
    playgroundHost: 'https://playground.abtwallet.io/.netlify/functions/app',
  };

  const questions = [
    {
      type: 'text',
      name: 'connectAppDid',
      message: 'Application DID on Connect Service',
      default: defaults.connectAppDid,
      validate: input => {
        if (!input) return 'App DID should not be empty, go https://app.didconnect.io to get one';
        return true;
      },
    },
    {
      type: 'text',
      name: 'connectHost',
      message: 'DID connect service host',
      default: defaults.connectHost,
      validate: input => {
        if (!input) return 'Connect service host should not be empty';
        return true;
      },
    },
    {
      type: 'text',
      name: 'playgroundHost',
      message: 'Playground service host',
      default: defaults.playgroundHost,
      validate: input => {
        if (!input) return 'Playground service host should not be empty';
        return true;
      },
    },
  ];

  // eslint-disable-next-line object-curly-newline
  const { connectAppDid, connectHost, playgroundHost } = await inquirer.prompt(questions);

  // Generate config
  const configContent = `SKIP_PREFLIGHT_CHECK=true
GATSBY_DID_CONNECT_APP_DID="${connectAppDid}"
GATSBY_DID_CONNECT_SERVICE="${connectHost}"
GATSBY_DID_CONNECT_AUTH_ACTION="profile"
GATSBY_DID_CONNECT_API_PREFIX="/api/login/agent"
GATSBY_PLAYGROUND_SERVICE="${playgroundHost}"`;
  return configContent;
};

const printRequirements = () => {
  console.log('\nRequirements of the starter:');
  console.log('1. Node.js: 10.x');
};

const run = async () => {
  printRequirements();

  const configPath = path.join(`${process.env.FORGE_BLOCKLET_TARGET_DIR}`, '.env');
  const configs = await getConfigs();

  fs.writeFileSync(configPath, configs);
  console.log(`Application config generated ${configPath}`);
};

run();
