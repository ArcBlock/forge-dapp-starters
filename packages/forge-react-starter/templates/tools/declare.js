/* eslint-disable no-console */
require('dotenv').config();

// eslint-disable-next-line import/no-extraneous-dependencies
const ForgeSDK = require('@arcblock/forge-sdk');
const { fromJSON } = require('@arcblock/forge-wallet');
const { wallet } = require('../api/libs/auth');

const appWallet = fromJSON(wallet);

(async () => {
  try {
    const res = await ForgeSDK.sendDeclareTx({
      tx: {
        itx: {
          moniker: 'Arcblock',
        },
      },
      wallet: appWallet,
    });

    console.log('Application wallet declared', wallet);
    console.log('Application wallet declared', res);
    process.exit(0);
  } catch (err) {
    console.error(err);
    console.error(err.errors);
    process.exit(1);
  }
})();
