/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import styled from 'styled-components';
import useAsync from 'react-use/lib/useAsync';

import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import CodeBlock from '@arcblock/ux/lib/CodeBlock';

import Layout from '../components/layout';
import forge from '../libs/sdk';
import env from '../libs/env';

async function fetchChainInfo() {
  const { blocks } = await forge.getBlocks({ emptyExcluded: true, paging: { size: 1 } });
  const [{ height }] = blocks;
  return forge.getBlock({ height });
}

export default function AppPage() {
  const endpoint = env.chainHost;
  const state = useAsync(fetchChainInfo);

  const endpointStr = `{ endpoint: "${endpoint}" }`;
  const paramStr = '{ emptyExcluded: true, paging: { size: 1 } }';
  const heightStr = '{ height }';

  return (
    <Layout title="ChainInfo Info">
      <Main>
        <Typography component="h2" variant="h4" className="page-header" color="textPrimary">
          Reading Block & Transaction with GraphQLClient
        </Typography>
        <section className="section">
          <Typography component="h3" variant="h5" className="section__header" color="textPrimary" gutterBottom>
            Code
          </Typography>
          <div className="section__body code">
            <CodeBlock
              language="javascript"
              code={`const GraphQLClient = require('@arcblock/graphql-client');
const client = new GraphQLClient(${endpointStr});
const res = await client.getBlocks(${paramStr});
const [${heightStr}] = res.blocks;
const res = await client.getBlock(${heightStr});`}
            />
          </div>
        </section>
        <section className="section">
          <Typography component="h3" variant="h5" className="section__header" color="textPrimary" gutterBottom>
            Data
          </Typography>
          <div className="section__body data">
            {state.value && <CodeBlock code={JSON.stringify(state.value.block, true, '  ')} language="json" />}
            {state.loading && <CircularProgress />}
            {state.error && <p>Error: {state.error.message}</p>}
          </div>
        </section>
      </Main>
    </Layout>
  );
}

const Main = styled.main`
  margin: 80px 0 0;

  .page-header {
    margin-bottom: 20px;
  }

  .section {
    margin-bottom: 50px;
    .section__header {
      margin-bottom: 20px;
    }
  }
`;
