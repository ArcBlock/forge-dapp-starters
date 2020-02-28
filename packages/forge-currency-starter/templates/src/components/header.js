/* eslint no-return-assign:"off" */
import React, { useContext } from 'react';
import styled from 'styled-components';

import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import UserAvatar from '@arcblock/did-react/lib/Avatar';
import { SessionContext } from '@arcblock/did-playground';

import env from '../libs/env';

export default function Header() {
  const { session } = useContext(SessionContext);

  const getExplorerUrl = (chainHost, type) => {
    if (window.env) {
      if (window.env.localChainExplorer && type === 'local') {
        return window.env.localChainExplorer;
      }
      if (window.env.foreignChainExplorer && type === 'foreign') {
        return window.env.foreignChainExplorer;
      }
    }

    const [host] = chainHost.split('/api');
    return `${host}/node/explorer/txs`;
  };

  return (
    <Nav>
      <div className="nav-left">
        <Typography href="/" component="a" variant="h6" color="inherit" noWrap className="brand">
          <img className="logo" src="/static/images/logo.png" alt="arcblock" />
          {env.appName}
        </Typography>
      </div>
      <div className="nav-right">
        {!!env.chainHost && (
          <Link href={getExplorerUrl(env.chainHost, 'local')} target="_blank" className="nav-item">
            Local Chain
          </Link>
        )}
        {!!env.assetChainHost && (
          <Link href={getExplorerUrl(env.assetChainHost, 'foreign')} target="_blank" className="nav-item">
            Foreign Chain
          </Link>
        )}
        <Link href="/orders" className="nav-item">
          Orders
        </Link>
        <Link href="https://github.com/ArcBlock/wallet-playground" target="_blank" className="nav-item">
          GitHub
        </Link>
        <Link href="/profile" className="nav-item">
          <UserAvatar did={session.user.did} />
        </Link>
      </div>
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

    .nav-item {
      margin: 8px 12px;
      font-weight: bold;
      text-transform: uppercase;
    }
  }
`;
