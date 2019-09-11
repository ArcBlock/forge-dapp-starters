# Hands on Forge React Starter

## How to bootstrap an application?

## Structure of the application?

## How to configure the application?

- application runtime ip/port must be accessible from abt wallet
- did-auth authenticator
- did-auth handler
- graphql-client

## How to start the application?

`yarn start`

## How to add new features to the application?

- Decide where to store application state?
  - Basic user flow and entity relation diagram
  - Decide which part of data goes on-chain, which part goes off-chain
  - Decide which set of txs we are going to use, **only a small set of transactions can be signed directly be abt wallet**
- How to setup new did auth handlers on server side?
  - How to attach handlers to the main web-server instance
  - How to declare the claim of the auth (signature/agreement/profile/holdingOfAsset/holdingOfToken)
  - How to handle the auth result from abt wallet? send simple tx, send multisig tx
  - How to leverage i18n messages to abt wallet?
  - Important callback methods
    - `onAuth`: when user confirmed in abt wallet, and send result back to server, we should verify sig/send tx here
    - `onComplete`: when browser status checking, and the action token marked as `succeed`
    - `onError`: any errors thrown during the whole process
    - `onExpire`: when token marked as timeout
- How to setup did auth qrcode on client side?
  - How to make qrcode responsive? (props.responsive)
  - How to leverage i18n messages in did auth qrcode(props.i18n, props.messages)
  - How to persist extra params when abt wallet scanned the qrcode
  - Important callback methods
    - `onClose`: user closes the qrcode
    - `onSuccess`: user have completed the process

## How to unit test your code?

Currently no test toolkit integrated, will do soon!

## How to test the your API?

- Some API does not require user login, just test with postman
- Some API require jwt login token, login on web, get the token from localStorage and test in postman
- Cleanup the localStorage will lead to user logout

## How to debug the application?

Many forge sdk libraries can output runtime internal states, when something goes wrong, restart with `DEBUG=@arcblock/*,forge-react-starter yarn start`

## How to deploy the application?

- Build the application first: `yarn build`
- Then use `pm2` or just use `netlify`
