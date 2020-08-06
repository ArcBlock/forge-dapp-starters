/* eslint-disable no-console */
import ForgeSDK from '@arcblock/forge-sdk/lite';

if (window.env.chainHost) {
  ForgeSDK.connect(window.env.chainHost, { chainId: window.env.chainId, name: 'app' });
  console.log(`connected to app chain: ${window.env.chainHost}`);
}
if (window.env.assetChainHost) {
  ForgeSDK.connect(window.env.assetChainHost, { chainId: window.env.assetChainId, name: 'asset' });
  console.log(`connected to asset chain: ${window.env.assetChainHost}`);
}

export default ForgeSDK;
