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
  const state = useSession();
  const [isFetched, setFetched] = useToggle(false);
  const [isOpen, setOpen] = useToggle(false);
  const [balance, fetchBalance] = useAsyncFn(async () => {
    if (state.value && state.value.user) {
      const address = state.value.user.did.replace(/^did:abt:/, '');
      const [{ state: account }, { state: chain }] = await Promise.all([
        forge.getAccountState({ address }),
        forge.getForgeState({}, { ignoreFields: ['state.protocols'] }),
      ]);

      return {
        account,
        token: chain.token,
      };
    }

    return null;
  }, [state.value]);

  const onLogout = () => {
    removeToken();
    window.location.href = '/';
  };

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

  if (!state.value.user) {
    window.location.href = '/?openLogin=true';
    return null;
  }

  if (!isFetched) {
    setTimeout(() => {
      setFetched(true);
      fetchBalance();
    }, 100);
  }

  return (
    <Layout title="Profile">
      <Main>
        <Grid container spacing={6}>
          <Grid item xs={12} md={3} className="avatar">
            <Avatar size={240} did={state.value.user.did} />
            <Button color="secondary" variant="outlined" onClick={onLogout}>
              Logout
            </Button>
            <Button color="primary" variant="outlined" href="/payment" style={{ marginTop: '30px' }}>
              My Purchase
            </Button>
            {balance.value && balance.value.account && (
              <Button color="primary" variant="contained" onClick={() => setOpen()} style={{ marginTop: '30px' }}>
                Get 25 TBA
              </Button>
            )}
          </Grid>
          <Grid item xs={12} md={9} className="meta">
            <Typography component="h3" variant="h4">
              My Profile
            </Typography>
            <List>
              <ListItem className="meta-item">
                <ListItemText primary={state.value.user.did} secondary="DID" />
              </ListItem>
              <ListItem className="meta-item">
                <ListItemText primary={state.value.user.name || '-'} secondary="Name" />
              </ListItem>
              <ListItem className="meta-item">
                <ListItemText primary={state.value.user.email || '-'} secondary="Email" />
              </ListItem>
              <ListItem className="meta-item">
                <ListItemText primary={state.value.user.mobile || '-'} secondary="Phone" />
              </ListItem>
              <ListItem className="meta-item">
                <ListItemText
                  primary={
                    balance.value && balance.value.account && balance.value.token ? (
                      `${fromUnitToToken(balance.value.account.balance, balance.value.token.decimal)} ${
                        balance.value.token.symbol
                      }`
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
            title: 'Get 25 TBA for FREE',
            scan: 'Scan qrcode to get 25 TBA for FREE',
            confirm: 'Confirm on your ABT Wallet',
            success: '25 TBA sent to your account',
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
