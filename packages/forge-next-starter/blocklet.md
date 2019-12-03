## What is This For?

What can I do when I need server side rendering capability in my dApp? This starter is here to help.

**`forge-next-starter` is the go to solution if you want to build applications with [next.js](https://nextjs.org/) and [react](https://reactjs.org) that runs on forge powered chains.**

`forge-next-starter` is based on the awesome `forge-react-starter`.

## What's Included?

`forge-next-starter` is a typical full-stack javascript dApp template that have [forge-sdk](https://npmjs.org/package/@arcblock/forge-sdk) integrated, it consists of 2 core parts:

### Frontend Part

Built upon the application skeleton we got after running `create-react-app`, dApps bootstrapped with this starter have several widely used react libraries integrated to make page composing easier:

- [Next.js](https://nextjs.org/) for crafting pages and SSR
- [styled-components](https://www.styled-components.com) as styling solution
- [@material-ui/core](https://material-ui.com) as component library
- [react-router-dom](https://reacttraining.com/react-router/) for client side routing
- [@arcblock/forge-sdk](https://www.npmjs.com/package/@arcblock/forge-sdk) for read and write onchain data

### Backend part

Besides, to make the dApp works along with the [ABT Wallet](https://abtwallet.io), some APIs are required, a minimal API server built upon [express](http://expressjs.com/) is also included.

Please note that next.js is embedded in an express server instance.

## Configuration

This starter needs some environment variables to work, which are stored in the .env file in the project root directory:

### server only

- `MONGO_URI`: MongoDB connection string
- `APP_TOKEN_SECRET`: JWT token secret
- `APP_TOKEN_TTL`: APP_TOKEN_SECRET token's TTL
- `APP_SK`: dAPP's secret key
- `APP_PORT`: Server port

### Both client and server

- `CHAIN_ID`: Chain ID of the chain
- `CHAIN_HOST`: The graphQL API server host of the chain
- `APP_NAME`: dAPP's name
- `APP_DESCRIPTION`: dAPP's description
- `APP_ID`:  dAPP's ID
- `BASE_URL`: Base url of server

## Use cases?

`forge-next-starter` can be start point for any forge powered dApp, you can built many blockchain powered apps, such as:

- Online store that sells digital assets and accept ABT as payments
- Online community application that authentication users through ABT Wallet
- Admin console for internal use that are protected by ABT Wallet

## Requirements?

Here are the knowledge requirements to get you up to speed when using this starter blocklet:

- Basic javascript coding experience
- Basic react coding experience
- Basic knowledge of mongodb
- Basic knowledge of SSR and Next.js

And to get the starter blocklet up and running on first try, you should:

- A handy command line terminal
- Install latest version of forge-cli: `npm install -g @arcblock/forge-cli`
- Spin up a forge-powered chain with forge-cli
- Have a running [mongodb](https://mongodb.org) instance that the dApp can connects to

Besides, you need to have ABT Wallet installed to try out the application after bootstrapping.

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
