const Mcrypto = require('@arcblock/mcrypto');
const MongoStorage = require('@arcblock/did-auth-storage-mongo');
const GraphQLClient = require('@arcblock/graphql-client');
const { fromSecretKey, WalletType } = require('@arcblock/forge-wallet');
const { Authenticator, Handlers } = require('@arcblock/did-auth');
const env = require('./env');

const type = WalletType({
  role: Mcrypto.types.RoleType.ROLE_APPLICATION,
  pk: Mcrypto.types.KeyType.ED25519,
  hash: Mcrypto.types.HashType.SHA3,
});

const wallet = fromSecretKey(process.env.APP_SK, type).toJSON();
const client = new GraphQLClient({ endpoint: env.chainHost, chainId: env.chainId });

const authenticator = new Authenticator({
  client,
  wallet,
  baseUrl: env.baseUrl,
  appInfo: {
    chainHost: env.chainHost,
    chainId: env.chainId,
    chainToken: 'TBA',
    copyright: 'https://abtwallet.io',
    decimals: 16,
    name: 'ABT Wallet Demo',
    description: 'Demo application to show the potential of ABT Wallet',
    icon: 'https://arcblock.oss-cn-beijing.aliyuncs.com/images/wallet-round.png',
    path: 'https://abtwallet.io/i/',
    publisher: `did:abt:${wallet.address}`,
  },
});

const handlers = new Handlers({
  authenticator,
  tokenGenerator: () => Date.now().toString(),
  tokenStorage: new MongoStorage({
    url: process.env.MONGO_URI,
  }),
});

module.exports = {
  authenticator,
  handlers,
  client,
  wallet,
};
