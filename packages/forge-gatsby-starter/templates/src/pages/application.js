/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import styled from 'styled-components';
import useAsync from 'react-use/lib/useAsync';

import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import CodeBlock from '@arcblock/ux/lib/CodeBlock';

import Layout from '../components/layout';
import withRoot from '../components/withRoot';
import forge from '../libs/sdk';
import env from '../libs/env';

function createFetchFn(address) {
  return () => forge.getAccountState({ address });
}

function AppPage() {
  const endpoint = env.chainHost;
  const address = env.appId;
  const state = useAsync(createFetchFn(address));

  const endpointStr = `{ endpoint: "${endpoint}" }`;
  const addressStr = `{ address: "${address}" }`;

  return (
    <Layout title="Application Info">
      <Main>
        <Typography component="h2" variant="h4" className="page-header" color="textPrimary">
          Reading Application Info with GraphQLClient
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
const res = await client.getAccountState(${addressStr});`}
            />
          </div>
        </section>
        <section className="section">
          <Typography component="h3" variant="h5" className="section__header" color="textPrimary" gutterBottom>
            Data
          </Typography>
          <div className="section__body data">
            {state.value && <CodeBlock code={JSON.stringify(state.value.state, true, '  ')} language="json" />}
            {state.loading && <CircularProgress />}
            {state.error && <p>Error: {state.error.message}</p>}
          </div>
        </section>
      </Main>
    </Layout>
  );
}

export default withRoot(AppPage);

const Main = styled.main`
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
