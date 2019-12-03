/* eslint-disable no-console */
require('dotenv').config();

// eslint-disable-next-line import/no-extraneous-dependencies
const ForgeSDK = require('@arcblock/forge-sdk');
const { wallet } = require('../api/libs/auth');

(async () => {
  try {
    const res = await ForgeSDK.sendDeclareTx({
      tx: {
        itx: {
          moniker: 'Arcblock',
        },
      },
      wallet,
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
