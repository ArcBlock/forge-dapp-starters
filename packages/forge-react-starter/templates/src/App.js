/* eslint-disable object-curly-newline */
import React from 'react';
import { create } from '@arcblock/ux/lib/Theme';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { BrowserRouter as Router, Route, Switch, Redirect, withRouter } from 'react-router-dom';

import CssBaseline from '@material-ui/core/CssBaseline';
import CircularProgress from '@material-ui/core/CircularProgress';

import HomePage from './pages/index';
import ProfilePage from './pages/profile';
import PaymentPage from './pages/payment';
import AppPage from './pages/application';
import BlockPage from './pages/blocks';
import ChainPage from './pages/chain';

import env from './libs/env';
import { SessionProvider } from './libs/session';

const theme = create({
  typography: {
    fontSize: 14,
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
});

const GlobalStyle = createGlobalStyle`
  a {
    color: ${props => props.theme.colors.green};
    text-decoration: none;
  }

  ul, li {
    padding: 0;
    margin: 0;
    list-style: none;
  }
`;

export const App = () => (
  <MuiThemeProvider theme={theme}>
    <ThemeProvider theme={theme}>
      <SessionProvider serviceHost={env.baseUrl} autoLogin>
        {({ session }) => {
          if (session.loading) {
            return <CircularProgress />;
          }

          return (
            <React.Fragment>
              <CssBaseline />
              <GlobalStyle />
              <div className="wrapper">
                <Switch>
                  <Route exact path="/" component={HomePage} />
                  <Route exact path="/profile" component={ProfilePage} />
                  <Route exact path="/payment" component={PaymentPage} />
                  <Route exact path="/application" component={AppPage} />
                  <Route exact path="/blocks" component={BlockPage} />
                  <Route exact path="/chain" component={ChainPage} />
                  <Redirect to="/" />
                </Switch>
              </div>
            </React.Fragment>
          );
        }}
      </SessionProvider>
    </ThemeProvider>
  </MuiThemeProvider>
);

const WrappedApp = withRouter(App);

export default () => (
  <Router>
    <WrappedApp />
  </Router>
);
