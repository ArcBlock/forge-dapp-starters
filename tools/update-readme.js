/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');

const packages = fs.readdirSync(path.join(__dirname, '../packages'));
const packageList = packages.map(x => {
  const packageFile = path.join(__dirname, '../packages', x, 'package.json');
  if (fs.existsSync(packageFile)) {
    // eslint-disable-next-line
    const packageJson = require(packageFile);
    return `- [${packageJson.name} v${packageJson.version}](./packages/${x})`;
  }
});

const readmeFile = path.join(__dirname, '../README.md');
const readmeContent = `![dApp Starters](https://www.arcblock.io/.netlify/functions/badge/?text=dApp%20Starters)

## Introduction

[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lernajs.io/)
[![docs](https://img.shields.io/badge/powered%20by-arcblock-green.svg)](https://docs.arcblock.io)

A collection of starters that can be used as boilerplates when building forge powered javascript dApps

> Last updated at ${new Date().toLocaleString()}

## Packages

${packageList.join('\n')}

## Usage

Checkout each sub package for usage instructions.

## Contribution

Checkout [CONTRIBUTION.md](./CONTRIBUTION.md)

## Report a Bug?

Bugs and feature requests please create new issues [here](https://github.com/ArcBlock/forge-dapp-starters/issues)

## License

Copyright 2018-2019 ArcBlock

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
`;

fs.writeFileSync(readmeFile, readmeContent);
console.log('README.md updated');
