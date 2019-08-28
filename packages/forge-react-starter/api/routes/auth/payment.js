/* eslint-disable no-console */
const multibase = require('multibase');
const ForgeSDK = require('@arcblock/forge-sdk');
const { fromTokenToUnit } = require('@arcblock/forge-util');
const { fromAddress } = require('@arcblock/forge-wallet');
const { wallet } = require('../../libs/auth');

module.exports = {
  action: 'payment',
  claims: {
    signature: async ({ extraParams: { locale } }) => {
      const { state } = await ForgeSDK.getForgeState(
        {},
        { ignoreFields: ['state.protocols', /\.txConfig$/, /\.gas$/] }
      );

      const description = {
        en: `Please pay 2 ${state.token.symbol} to unlock the secret document`,
        zh: `请支付 2 ${state.token.symbol} 以解锁加密的文档`,
      };

      return {
        txType: 'TransferTx',
        txData: {
          itx: {
            to: wallet.address,
            value: {
              value: fromTokenToUnit(2).toBuffer(),
              minus: false,
            },
          },
        },
        description: description[locale] || description.en,
      };
    },
  },
  onAuth: async ({ claims, userDid, extraParams: { locale } }) => {
    console.log('pay.onAuth', { claims, userDid });
    try {
      const claim = claims.find(x => x.type === 'signature');
      const tx = ForgeSDK.decodeTx(multibase.decode(claim.origin));
      const user = fromAddress(userDid);

      const hash = await ForgeSDK.sendTransferTx({
        tx,
        wallet: user,
        signature: claim.sig,
      });

      console.log('pay.onAuth', hash);
      return { hash, tx: claim.origin };
    } catch (err) {
      console.error('pay.onAuth.error', err);
      const errors = {
        en: 'Payment failed!',
        zh: '支付失败',
      };
      throw new Error(errors[locale] || errors.en);
    }
  },
};
