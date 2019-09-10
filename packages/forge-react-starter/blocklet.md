## What is This For?

Admit it or not, putting together dozens of libraries and frameworks and making them working together to build an application is hard and tedious, not to mention getting your application deployed for public access.

On the other hand, having these libraries and frameworks makes our life easier by not reinventing the wheel, that's why [create-react-app](https://github.com/facebook/create-react-app) was born and get more and more popular.

You can get your own blockchain up and running within minutes with [forge-cli](https://github.com/ArcBlock/forge-cli), but how to connect your application with forge-powered chains through [forge-sdk](https://github.com/ArcBlock/forge-js)? How to get your application communication to ABT Wallet users?

`forge-react-starter` is here to help! **`forge-react-starter` is the go to solution if you want to build applications with [react](https://reactjs.org) that runs on forge powered chains.**

## What's Included?

`forge-react-starter` is a typical full-stack javascript dApp template that have [forge-sdk](https://npmjs.org/package/@arcblock/forge-sdk) integrated, it consists of 2 core parts:

### Frontend Part

Built upon the application skeleton we got after running `create-react-app`, dApps bootstrapped with this starter have several widely used react libraries integrated to make page composing easier:

- [styled-components](https://www.styled-components.com) as styling solution
- [@material-ui](https://material-ui.com) as component library
- [react-router-dom](https://reacttraining.com/react-router/) for client side routing
- [@arcblock/forge-sdk](https://www.npmjs.com/package/@arcblock/forge-sdk) for read and write onchain data

### Backend part

Besides, to make the dApp works along with the [ABT Wallet](https://abtwallet.io), some APIs are required, a minimal API server built upon [express](http://expressjs.com/) is also included.

## Use cases?

`forge-react-starter` can be start point for any forge powered dapp, you can built many blockchain powered apps, such as:

- Online store that sells digital assets and accept ABT as payments
- Online community application that authentication users through ABT Wallet
- Admin console for internal use that are protected by ABT Wallet

## Requirements?

Here are the knowledge requirements to get you up to speed when using this starter blocklet:

- Basic javascript coding experience
- Basic react coding experience
- Basic knowledge of mongodb

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
