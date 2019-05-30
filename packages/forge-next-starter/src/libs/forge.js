/* eslint-disable no-console */
import GraphQLClient from '@arcblock/graphql-client';
import env from './env';

const client = new GraphQLClient({ endpoint: env.chainHost, chainId: env.chainId });

if (typeof window === 'object') {
  console.log('Inspect GraphQLClient');
  console.dir(client);
}

export default client;
