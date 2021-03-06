const Mcrypto = require('@arcblock/mcrypto');
const ForgeSDK = require('@arcblock/forge-sdk');
const MongoStorage = require('@arcblock/did-auth-storage-mongo');
const { fromSecretKey, WalletType } = require('@arcblock/forge-wallet');
// eslint-disable-next-line object-curly-newline
const { WalletAuthenticator, AppAuthenticator, AppHandlers, WalletHandlers } = require('@arcblock/did-auth');
const env = require('./env');

const type = WalletType({
  role: Mcrypto.types.RoleType.ROLE_APPLICATION,
  pk: Mcrypto.types.KeyType.ED25519,
  hash: Mcrypto.types.HashType.SHA3,
});

if (env.chainHost) {
  ForgeSDK.connect(env.chainHost, { chainId: env.chainId, name: env.chainId, default: true });
  if (env.assetChainHost) {
    ForgeSDK.connect(env.assetChainHost, { chainId: env.assetChainId, name: env.assetChainId });
  }
}

const wallet = fromSecretKey(process.env.APP_SK, type);
const walletJSON = wallet.toJSON();

const walletAuth = new WalletAuthenticator({
  wallet: walletJSON,
  baseUrl: env.baseUrl,
  appInfo: {
    name: env.appName,
    description: env.appDescription,
    icon: 'https://arcblock.oss-cn-beijing.aliyuncs.com/images/wallet-round.png',
    link: env.baseUrl,
  },
  chainInfo: {
    host: env.chainHost,
    id: env.chainId,
  },
});

const walletHandlers = new WalletHandlers({
  authenticator: walletAuth,
  tokenGenerator: () => Date.now().toString(),
  tokenStorage: new MongoStorage({
    url: process.env.MONGO_URI,
  }),
});

const appAuth = new AppAuthenticator(walletJSON);
const appHandlers = new AppHandlers(appAuth);

module.exports = {
  authenticator: walletAuth,
  handlers: walletHandlers,
  appAuth,
  appHandlers,
  wallet,
};
