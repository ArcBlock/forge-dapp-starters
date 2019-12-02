/* eslint-disable no-console */
const ForgeSDK = require('@arcblock/forge-sdk');
const { toAddress } = require('@arcblock/did');
const { fromTokenToUnit, toBN } = require('@arcblock/forge-util');

const { wallet } = require('../libs/auth');

module.exports = {
  init(app) {
    app.get('/api/payments', async (req, res) => {
      try {
        if (req.user) {
          const { transactions = [] } = await ForgeSDK.listTransactions({
            addressFilter: { sender: toAddress(req.user.did), receiver: wallet.address },
            typeFilter: { types: ['transfer'] },
          });

          const tx = transactions.find(x => x.code === 'OK' && toBN(x.tx.itxJson.value).eq(fromTokenToUnit(2)));
          if (tx && tx.hash) {
            console.log('api.payments.ok', tx);
            res.json(tx);
            return;
          }
        }

        res.json(null);
      } catch (err) {
        console.error('api.payments.error', err);
        res.json(null);
      }
    });
  },
};
