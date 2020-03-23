import React from 'react';
import styled from 'styled-components';
import useAsync from 'react-use/lib/useAsync';
import useToggle from 'react-use/lib/useToggle';

import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';

import Auth from '@arcblock/did-react/lib/Auth';
import Avatar from '@arcblock/did-react/lib/Avatar';
import Button from '@arcblock/ux/lib/Button';

import Layout from '../components/layout';
import { SessionContext } from '../libs/session';

export default function PaymentPage() {
  const [open, toggle] = useToggle(false);
  const { api, session } = React.useContext(SessionContext);
  const state = useAsync(async () => {
    const { data: payment } = await api.get('/api/payments');
    return payment;
  }, [session.user]);

  if (session.loading) {
    return (
      <Layout title="Profile">
        <Main>
          <CircularProgress />
        </Main>
      </Layout>
    );
  }

  if (state.loading) {
    return (
      <Layout title="Payment">
        <Main>
          <CircularProgress />
        </Main>
      </Layout>
    );
  }

  if (state.error) {
    return (
      <Layout title="Payment">
        <Main>{state.error.message}</Main>
      </Layout>
    );
  }

  const payment = state.value;
  const { token, user } = session;

  return (
    <Layout title="Payment">
      <Main symbol={token.symbol}>
        <Grid container spacing={6}>
          <Grid item xs={12} md={3} className="avatar">
            <Avatar size={120} did={user.did} />
            <Button color="secondary" disabled={payment} variant="contained" onClick={() => toggle()}>
              {payment ? 'Already Paid' : 'Make Payment'}
            </Button>
            <Button color="primary" variant="outlined" href="/profile" style={{ marginTop: '30px' }}>
              My Profile
            </Button>
          </Grid>
          <Grid item xs={12} md={9} className="meta">
            <Typography component="h3" variant="h4">
              Secret Document
            </Typography>
            <div className={`document ${payment ? 'document--unlocked' : ''}`}>
              <Typography component="div" variant="body1" className="document__body">
                What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a
                galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,
                but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in
                the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with
                desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                <br />
                <br />
                What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a
                galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,
                but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in
                the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with
                desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                <br />
                <br />
                What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a
                galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,
                but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in
                the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with
                desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                <br />
                <br />
                What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a
                galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,
                but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in
                the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with
                desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                <br />
                <br />
              </Typography>
            </div>
          </Grid>
        </Grid>
      </Main>
      {open && (
        <Auth
          responsive
          action="payment"
          checkFn={api.get}
          onClose={() => toggle()}
          onSuccess={() => window.location.reload()}
          messages={{
            title: 'Payment Required',
            scan: `Pay 2 ${token.symbol} to view secret document`,
            confirm: 'Confirm payment on your ABT Wallet',
            success: 'You have successfully paid!',
          }}
        />
      )}
    </Layout>
  );
}

const Main = styled.main`
  display: flex;

  .avatar {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-center;

    svg {
      margin-bottom: 24px;
    }
  }

  .meta {
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
  }

  .meta-item {
    padding-left: 0;
  }

  .document {
    margin-top: 30px;
    position: relative;

    .document__body {
      filter: blur(4px);
      text-align: justify;
      user-select: none;
    }

    &:after {
      color: #dd2233;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans',
        'Helvetica Neue', sans-serif;
      content: 'Pay 2 ${props => props.symbol} to view this document';
      font-size: 30px;
      line-height: 45px;
      border-radius: 15px;
      padding: 15px;
      font-weight: bold;
      position: absolute;
      text-transform: uppercase;
      animation: blink 800ms ease;
      border: 0.5rem double #dd2233;
      top: 35%;
      left: 15%;
    }

    @keyframes blink {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
  }

  .document--unlocked {
    .document__body {
      filter: none;
    }

    &:after {
      display: none;
    }
  }
`;
