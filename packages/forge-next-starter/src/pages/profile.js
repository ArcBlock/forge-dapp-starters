/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import styled from 'styled-components';
import useAsyncFn from 'react-use/lib/useAsyncFn';
import useToggle from 'react-use/lib/useToggle';
import { fromUnitToToken } from '@arcblock/forge-util';

import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Auth from '@arcblock/did-react/lib/Auth';
import Avatar from '@arcblock/did-react/lib/Avatar';

import Layout from '../components/layout';
import useSession from '../hooks/session';
import forge from '../libs/sdk';
import api from '../libs/api';
import { removeToken, onAuthError } from '../libs/auth';

export default function ProfilePage() {
  const session = useSession();
  const [isFetched, setFetched] = useToggle(false);
  const [isOpen, setOpen] = useToggle(false);
  const [balance, fetchBalance] = useAsyncFn(async () => {
    if (session.value && session.value.user) {
      const address = session.value.user.did.replace(/^did:abt:/, '');
      const { state: account } = await forge.getAccountState({ address }, { ignoreFields: [] });
      return account;
    }

    return null;
  }, [session.value]);

  const onLogout = () => {
    removeToken();
    window.location.href = '/';
  };

  if (session.loading || !session.value) {
    return (
      <Layout title="Payment">
        <Main>
          <CircularProgress />
        </Main>
      </Layout>
    );
  }

  if (session.error) {
    return (
      <Layout title="Payment">
        <Main>{session.error.message}</Main>
      </Layout>
    );
  }

  if (!session.value.user) {
    window.location.href = '/?openLogin=true';
    return null;
  }

  if (!isFetched) {
    setTimeout(() => {
      setFetched(true);
      fetchBalance();
    }, 100);
  }

  const { user, token } = session.value;

  return (
    <Layout title="Profile">
      <Main>
        <Grid container spacing={6}>
          <Grid item xs={12} md={3} className="avatar">
            <Avatar size={240} did={user.did} />
            <Button color="secondary" variant="outlined" onClick={onLogout}>
              Logout
            </Button>
            <Button color="primary" variant="outlined" href="/payment" style={{ marginTop: '30px' }}>
              My Purchase
            </Button>
            {balance.value && (
              <Button color="primary" variant="contained" onClick={() => setOpen()} style={{ marginTop: '30px' }}>
                Get 25 {token.symbol}
              </Button>
            )}
          </Grid>
          <Grid item xs={12} md={9} className="meta">
            <Typography component="h3" variant="h4">
              My Profile
            </Typography>
            <List>
              <ListItem className="meta-item">
                <ListItemText primary={user.did} secondary="DID" />
              </ListItem>
              <ListItem className="meta-item">
                <ListItemText primary={user.name || '-'} secondary="Name" />
              </ListItem>
              <ListItem className="meta-item">
                <ListItemText primary={user.email || '-'} secondary="Email" />
              </ListItem>
              <ListItem className="meta-item">
                <ListItemText primary={user.mobile || '-'} secondary="Phone" />
              </ListItem>
              <ListItem className="meta-item">
                <ListItemText
                  primary={
                    balance.value ? (
                      `${fromUnitToToken(balance.value.balance, token.decimal)} ${token.symbol}`
                    ) : (
                      <CircularProgress size={18} />
                    )
                  }
                  secondary="Account Balance"
                />
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </Main>
      {isOpen && (
        <Auth
          responsive
          action="checkin"
          checkFn={api.get}
          onError={onAuthError}
          onClose={() => setOpen()}
          onSuccess={() => window.location.reload()}
          messages={{
            title: `Get 25 ${token.symbol} for FREE`,
            scan: `Scan qrcode to get 25 ${token.symbol} for FREE`,
            confirm: 'Confirm on your ABT Wallet',
            success: `25 ${token.symbol} sent to your account`,
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
`;
