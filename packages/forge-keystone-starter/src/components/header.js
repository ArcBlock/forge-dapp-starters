/* eslint no-return-assign:"off" */
import React, { useEffect } from 'react';
import qs from 'querystring';
import styled from 'styled-components';
import useToggle from 'react-use/lib/useToggle';

import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import Auth from '@arcblock/did-react/lib/Auth';
import UserAvatar from '@arcblock/did-react/lib/Avatar';

import useSession from '../hooks/session';
import api from '../libs/api';
import env from '../libs/env';
import { setToken } from '../libs/auth';

export default function Header() {
  const session = useSession();
  const [open, toggle] = useToggle(false);

  useEffect(() => {
    if (session.value && !session.value.user && window.location.search) {
      const params = qs.parse(window.location.search.slice(1));
      try {
        if (params.openLogin && JSON.parse(params.openLogin)) {
          toggle(true);
        }
      } catch (err) {
        // Do nothing
      }
    }
    // eslint-disable-next-line
  }, [session]);

  const onLogin = async result => {
    if (result.sessionToken) {
      setToken(result.sessionToken);
    }
    window.location.href = '/profile';
  };

  return (
    <Nav>
      <div className="nav-left">
        <a href="/">
          <Typography variant="h6" color="inherit" noWrap className="brand">
            <img className="logo" src="/static/images/logo.png" alt="arcblock" />
            {env.appName}
          </Typography>
        </a>
        {session.value && session.value.user && (
          <React.Fragment>
            <Button href="/profile" size="large">
              Profile
            </Button>
            <Button href="/payment" size="large">
              Payment
            </Button>
          </React.Fragment>
        )}
      </div>
      <div className="nav-right">
        <Button href="https://github.com/ArcBlock/forge-dapp-starters" className="github" target="_blank">
          GitHub
        </Button>
        {session.loading && (
          <Button>
            <CircularProgress size={20} color="secondary" />
          </Button>
        )}
        {session.value && !session.value.user && (
          <Button color="primary" variant="outlined" onClick={toggle}>
            Login
          </Button>
        )}
        {session.value && session.value.user && (
          <Button href="/profile" className="avatar">
            <UserAvatar did={session.value.user.did} />
          </Button>
        )}
      </div>
      {open && (
        <Dialog open maxWidth="sm" disableBackdropClick disableEscapeKeyDown onClose={toggle}>
          <Auth
            action="login"
            checkFn={api.get}
            onClose={() => toggle()}
            onSuccess={onLogin}
            messages={{
              title: 'login',
              scan: 'Scan QR code with ABT Wallet',
              confirm: 'Confirm login on your ABT Wallet',
              success: 'You have successfully signed in!',
            }}
          />
        </Dialog>
      )}
    </Nav>
  );
}

const Nav = styled(Toolbar)`
  display: flex;
  align-items: center;
  justify-content: space-between;

  && {
    padding-left: 0;
    padding-right: 0;
  }

  .brand {
    margin-right: 60px;
    cursor: pointer;
    display: flex;
    justify-content: flex-start;
    align-items: center;

    .logo {
      width: 140px;
      margin-right: 16px;
    }
  }

  .nav-left {
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }

  .nav-right {
    display: flex;
    align-items: center;
    justify-content: flex-end;

    .github {
      margin-right: 16px;
    }
  }
`;
