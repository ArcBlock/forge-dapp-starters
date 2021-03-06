/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import styled from 'styled-components';

import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Button from '@arcblock/ux/lib/Button';

import Layout from '../components/layout';

const graphqlDemos = [
  {
    title: 'Application State',
    subtitle: 'Example 1',
    description: 'Use GraphQLClient to get current application state on chain',
    link: '/application',
  },
  {
    title: 'Chain State',
    subtitle: 'Example 2',
    description: 'Use GraphQLClient to read current chain info and display it as json',
    link: '/chain',
  },
  {
    title: 'Block and Transactions',
    subtitle: 'Example 3',
    description: 'Query blocks and transactions from the forge powered chain',
    link: '/blocks',
  },
];

const walletDemos = [
  {
    title: 'Login',
    subtitle: 'Example 1',
    description:
      'Use ABT Wallet to login to an application built on top of a forge powered blockchain, and persist user info in the session',
    link: '/profile',
  },
  {
    title: 'Checkin',
    subtitle: 'Example 2',
    description: 'Help user to get some free tokens on the blockchain to test our application',
    link: '/profile',
  },
  {
    title: 'Payment',
    subtitle: 'Example 3',
    description: 'Allow user to pay for an secret document with crypto token, and records payment info in database.',
    link: '/payment',
  },
];

const renderExampleCard = x => (
  <Grid key={x.title} item xs={12} sm={6} md={4}>
    <Card className="demo">
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          {x.subtitle}
        </Typography>
        <Typography component="h2" variant="h5" gutterBottom>
          {x.title}
        </Typography>
        <Typography component="p" variant="body1" gutterBottom>
          {x.description}
        </Typography>
      </CardContent>
      <CardActions style={{ padding: 16 }}>
        <Button component="a" href={x.link} size="small" color="secondary" variant="outlined" rounded>
          Try Now
        </Button>
      </CardActions>
    </Card>
  </Grid>
);

export default function IndexPage() {
  return (
    <Layout title="Home">
      <Main>
        <Typography component="h2" variant="h4" className="page-header" color="textPrimary">
          dApps the Easy Way!
        </Typography>
        <Typography component="p" variant="body1" className="page-description" color="textSecondary">
          Application boilerplate built on top of{' '}
          <a href="https://www.arcblock.io/en/forge-sdk">forge (Ruby on Rails for Blockchain Space)</a> powered
          blockchain, with developer friendly{' '}
          <a href="https://docs.arcblock.io/forge/latest/sdk/javascript.html">javascript sdk</a>. Makes it super easy to
          start building distributed applications with tons of thousands of react/javascript libraries/components.
        </Typography>
        <section className="section">
          <Typography component="h3" variant="h5" className="section__header" color="textPrimary" gutterBottom>
            Chain Data Reading/Displaying Examples
          </Typography>
          <Grid container spacing={4} className="section__body demos">
            {graphqlDemos.map(x => renderExampleCard(x))}
          </Grid>
        </section>
        <section className="section">
          <Typography component="h3" variant="h5" className="section__header" color="textPrimary" gutterBottom>
            ABT Wallet Examples
          </Typography>
          <Grid container spacing={4} className="section__body demos">
            {walletDemos.map(x => renderExampleCard(x))}
          </Grid>
        </section>
      </Main>
    </Layout>
  );
}

const Main = styled.main`
  a {
    color: ${props => props.theme.colors.green};
    text-decoration: none;
  }

  .page-header {
    margin-bottom: 20px;
  }

  .page-description {
    margin-bottom: 30px;
  }

  .section {
    margin-bottom: 32px;
    padding: 0;
    .section__header {
      margin-bottom: 16px;
    }
  }

  .demos {
    .demo {
      height: 240px;
      @media (max-width: ${props => props.theme.breakpoints.values.md - 1}px) {
        height: auto;
      }
    }
  }
`;
