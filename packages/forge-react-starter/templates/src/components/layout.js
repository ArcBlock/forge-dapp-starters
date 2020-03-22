import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Helmet from 'react-helmet';
import Link from '@material-ui/core/Link';

import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import Hidden from '@material-ui/core/Hidden';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import env from '../libs/env';
import Footer from './footer';

export default function Layout({ title, children, contentOnly }) {
  const [drawerOpen, setDrawerOpen] = React.useState(false);

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

  const onToggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  if (contentOnly) {
    return <Container>{children}</Container>;
  }

  const drawer = (
    <div>
      <div className="toolbar" />
      <Divider />
      <List>
        <Link href="/">
          <ListItem button>
            <ListItemText primary="Home" />
          </ListItem>
        </Link>
        <Link href="/profile">
          <ListItem button>
            <ListItemText primary="Profile" />
          </ListItem>
        </Link>
        <Link href="/payment" className="nav-item">
          <ListItem button>
            <ListItemText primary="Payment" />
          </ListItem>
        </Link>
      </List>
      <Divider />
      <List>
        {!!env.chainHost && (
          <Link href={getExplorerUrl(env.chainHost, 'local')} target="_blank" className="nav-item">
            <ListItem button>
              <ListItemText primary="Local Chain" />
            </ListItem>
          </Link>
        )}
        {!!env.assetChainHost && (
          <Link href={getExplorerUrl(env.assetChainHost, 'foreign')} target="_blank" className="nav-item">
            <ListItem button>
              <ListItemText primary="Foreign Chain" />
            </ListItem>
          </Link>
        )}
        <Link href="https://github.com/ArcBlock/wallet-playground" target="_blank" className="nav-item">
          <ListItem button>
            <ListItemText primary="GitHub " />
          </ListItem>
        </Link>
      </List>
    </div>
  );

  return (
    <Div>
      <Helmet title={`${title} - ${env.appName}`} />
      <AppBar position="fixed" className="appbar" color="default" style={{ height: 56 }}>
        <div className="header-mobile">
          <Toolbar className="toolbar">
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={onToggleDrawer}
              className="menu-button">
              <MenuIcon />
            </IconButton>
            <Typography href="/" component="a" variant="h6" color="inherit" noWrap className="brand">
              {env.appName}
            </Typography>
          </Toolbar>
        </div>
        <div className="header-desktop">
          <Toolbar className="toolbar">
            <Container>
              <Typography href="/" component="a" variant="h6" color="inherit" noWrap className="brand">
                {env.appName}
              </Typography>
            </Container>
          </Toolbar>
        </div>
      </AppBar>
      <DrawerDiv>
        <Drawer
          variant="temporary"
          open={drawerOpen}
          onClose={onToggleDrawer}
          classes={{
            paper: 'drawer-paper',
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
            disablePortal: true,
          }}>
          {drawer}
        </Drawer>
      </DrawerDiv>
      <div className="content">
        <Hidden only={['md', 'lg', 'xl']}>
          <div className="toolbar" />
        </Hidden>
        <Container>{children}</Container>
        <Footer />
      </div>
    </Div>
  );
}

Layout.propTypes = {
  title: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  children: PropTypes.any.isRequired,
  contentOnly: PropTypes.bool,
};

Layout.defaultProps = {
  contentOnly: false,
};

const Div = styled.div`
  @media (min-width: ${props => props.theme.breakpoints.values.md}px) {
    .header-desktop {
      display: block;
    }
    .header-mobile {
      display: none;
    }
  }

  @media (max-width: ${props => props.theme.breakpoints.values.md - 1}px) {
    .header-desktop {
      display: none;
    }
    .header-mobile {
      display: block;
    }
  }

  .toolbar {
    min-height: 56px;
  }

  .content {
    flex-grow: 1;
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
`;

const DrawerDiv = styled.nav`
  width: 240px;
  .drawer-paper {
    width: 240px;
  }
  .toolbar {
    min-height: 56px;
  }
`;
