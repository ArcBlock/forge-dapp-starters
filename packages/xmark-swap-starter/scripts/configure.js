/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');

const getConfigs = async () => {
  const defaults = {
    playgroundHost: 'https://playground.abtwallet.io/.netlify/functions/app',
  };

  const questions = [
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
  const { playgroundHost } = await inquirer.prompt(questions);

  // Generate config
  const configContent = `SKIP_PREFLIGHT_CHECK=true
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
