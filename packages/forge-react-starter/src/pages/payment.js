import React from 'react';
import styled from 'styled-components';
import useAsync from 'react-use/lib/useAsync';
import useToggle from 'react-use/lib/useToggle';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Auth from '@arcblock/react-forge/lib/Auth';
import Avatar from '@arcblock/react-forge/lib/Avatar';

import Layout from '../components/layout';
import api from '../libs/api';
import { onAuthError } from '../libs/auth';

async function fetchStatus() {
  const [{ data: payment }, { data: session }] = await Promise.all([api.get('/api/payments'), api.get('/api/session')]);
  return { payment, session };
}

export default function PaymentPage() {
  const state = useAsync(fetchStatus);
  const [open, toggle] = useToggle(false);

  if (state.loading || !state.value) {
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

  if (!state.value.session.user) {
    window.location.href = '/?openLogin=true';
    return null;
  }

  return (
    <Layout title="Payment">
      <Main>
        <Grid container spacing={40}>
          <Grid item xs={12} md={3} className="avatar">
            <Avatar size={240} did={state.value.session.user.did} />
            <Button color="secondary" disabled={state.value.payment} variant="contained" onClick={() => toggle()}>
              {state.value.payment ? 'Already Paid' : 'Make Payment'}
            </Button>
            <Button color="primary" variant="outlined" href="/profile" style={{ marginTop: '30px' }}>
              My Profile
            </Button>
          </Grid>
          <Grid item xs={12} md={8} className="meta">
            <Typography component="h3" variant="h4">
              Secret Document
            </Typography>
            <div className={`document ${state.value.payment ? 'document--unlocked' : ''}`}>
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
          onError={onAuthError}
          onClose={() => toggle()}
          onSuccess={() => window.location.reload()}
          messages={{
            title: 'Payment Required',
            scan: 'Pay 5 TBA to view secret documented',
            confirm: 'Confirm payment on your ABT Wallet',
            success: 'You have successfully paid!',
          }}
        />
      )}
    </Layout>
  );
}

const Main = styled.main`
  margin: 80px 0;
  display: flex;

  .avatar {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-center;

    svg {
      margin-bottom: 40px;
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
    width: 800px;

    .document__body {
      filter: blur(4px);
      text-align: justify;
      user-select: none;
    }

    &:after {
      color: #dd2233;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans',
        'Helvetica Neue', sans-serif;
      content: 'Pay 5 TBA to view this document';
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
