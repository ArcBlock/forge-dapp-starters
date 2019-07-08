![forge-react-starter](https://www.arcblock.io/.netlify/functions/badge/?text=forge-react-starter)

[![Netlify Status](https://api.netlify.com/api/v1/badges/e0c63e91-97b5-45df-95d1-1bad86153559/deploy-status)](https://app.netlify.com/sites/forge-react-starter/deploys)

> Brings tons of thousands react libraries/components to dApps that run on [forge](https://www.arcblock.io/en/forge-sdk) powered blockchain.

[Live preview](https://forge-react-starter.netlify.com/)

![](./docs/starter-home.png)

A starter project that integrates [forge](https://docs.arcblock.io/forge/latest/) [javascript sdk](https://docs.arcblock.io/forge/latest/sdk/javascript.html) with mainstream javascript application batteries:

- [React.js](https://reactjs.org/) this project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
- [Material-UI](https://material-ui.com/) for resuable react components
- [Express.js](http://expressjs.com/) as custom web server that can serve custom api
- [Mongoose](https://mongoosejs.com/) as database ORM layer

Forge SDK libraries included in the starter project:

- [@arcblock/forge-sdk](https://www.npmjs.com/package/@arcblock/forge-sdk) as communication layer between application and forge powered blockchain
- [@arcblock/did-auth](https://www.npmjs.com/package/@arcblock/did-auth) help application do jwt based auth with ABT wallet
- [@arcblock/did-auth-storage-mongo](https://www.npmjs.com/package/@arcblock/did-auth-storage-mongo) storage engines that powers the magic behind ABT Wallet qrcode scanning
- [@arcblock/did-react](https://www.npmjs.com/package/@arcblock/did-react) react components that can implements basic UI elements to connect your application with ABT Wallet, such as avatar and auth dialog

Other javascript project goodies:

- `jwt`: token based authentication
- `eslint`: for consistent coding style
- `prettier`: for consistent code formatting
- `husky`: and `lint-staged` for prepush and precommit hooks
- `nodemon`: for auto restart server on node.js code change
- `next.js`: supports hot reload on client code change
- `dotenv`: to load configurations from `.env` files

## Folder Structure

```terminal
.
├── LICENSE
├── Makefile
├── README.md
├── src                       // code for client side pages
│   ├── components            // shared react components/layouts across all pages
│   ├── hooks                 // shared react hooks
│   ├── libs                  // shared utility code
│   ├── pages                 // pages
├── package.json
├── api                       // backend code
│   ├── libs                  // shared server libs
│   ├── models                // mongoose db models
│   └── routes                // express routes and handlers
├── version
└── yarn.lock
```

## Runtime Requirements

- Mongodb v3+
- Node.js v10+
- That's all

## Usage

### Create new project with forge-cli

```terminal
npm install -g @arcblock/forge-cli forge-react-starter
forge init
forge start
forge create-project hello-forge
cd hello-forge
npm start
```

### Just use this starter repo

> **Note: You have to setup an `.env` file manually.**

```terminal
git clone https://github.com/ArcBlock/forge-dapp-starters.git
cd forge-dapp-starters/packages/forge-react-starter
yarn
yarn start
```

## Configuration

dApp configuration file is auto generated and stored in `.env`, example configure as:

```text
# server only
MONGO_URI="mongodb://localhost/forge-react-starter"
APP_TOKEN_SECRET="you_should_change_this"
APP_TOKEN_TTL="1d"
APP_SK="0x12433d2ffae0e304c04504c45c19d8b7d7825ef017c48811a784b35bf7ba26cfecf4ec97e4cf2d5a62a93bf16eb841b0faa1980c86a24cc2db6f218d410aee32"
APP_PORT=8000

# both server and client
REACT_APP_CHAIN_ID="zinc-2019-05-17"
REACT_APP_CHAIN_HOST="https://zinc.abtnetwork.io/api"
REACT_APP_APP_ID="zNKdL4LTzmiMDenTBtCixngRqGBk6YtZLseM"
REACT_APP_APP_NAME="Forge React Starter"
REACT_APP_BASE_URL="http://10.113.10.82:8000"
REACT_APP_API_PREFIX=""
```

> Caution: `.env` contains very sensitive info such as Application wallet secret key, PLEASE DO NOT COMMIT `.env` FILE

## FAQ

### How to upgrade `@arcblock/*` dependencies?

Simple, just update `package.json`, then `yarn`, be sure to test the starter after upgrading.

### How to deploy my application?

Checkout [Deployment.md](./docs/deployment.md)

### What APIs are supported by `GraphQLClient`?

Checkout the following screenshot or just run the starter and open browser console.

![](./docs/api-list.png)

## LICENSE

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
