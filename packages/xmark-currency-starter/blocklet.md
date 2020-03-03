## What is This For?

Markdown is awesome when building content dense websites, but markdown itself is too simple, what about bring some extensions to it?

`xmark-currency-starter` is here to help! **`xmark-currency-starter` is the go to solution if you want to build applications with [react](https://reactjs.org) that runs on forge powered chains**, One of the great use cases for decentralized identity and blockchain is around currency.

## What's Included?

`xmark-currency-starter` is a typical gatsby application template, it's powered by following packages

- [gatsby](https://gatsbyjs.org) awesome static site generator
- [@arcblock/gatsby-theme-www](https://www.npmjs.com/package/@arcblock/gatsby-theme-www) arcblock official theme
- **xmark** add more extensions to markdown

## Configuration

This starter needs some environment variables to work, which are stored in the `.env` file in the project root directory:

```ini
GATSBY_DID_CONNECT_APP_DID="zNKWfcRpzUwDPPzmBszXDRLepJKHG9gLFeqv"
GATSBY_DID_CONNECT_SERVICE="https://connect.wallet.arcblockio.cn"
GATSBY_DID_CONNECT_AUTH_ACTION="profile"
GATSBY_DID_CONNECT_API_PREFIX="/api/login/agent"
GATSBY_PLAYGROUND_SERVICE="https://playground.abtwallet.io/.netlify/functions/app"
```

## Requirements?

Here are the knowledge requirements to get you up to speed when using this starter blocklet:

- Basic usage of npm
- Basic knowledge of markdown

And to get the starter blocklet up and running on first try, you should:

- A handy command line terminal
- Install latest version of forge-cli: `npm install -g @arcblock/forge-cli`

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
