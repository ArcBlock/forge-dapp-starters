import React from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import CssBaseline from '@material-ui/core/CssBaseline';
import { BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom';

import HomePage from './pages/index';
import ProfilePage from './pages/profile';
import PaymentPage from './pages/payment';
import AppPage from './pages/application';
import BlockPage from './pages/blocks';
import ChainPage from './pages/chain';

import theme from './libs/theme';

const GlobalStyle = createGlobalStyle`
  a {
    color: ${props => props.theme.colors.green};
    text-decoration: none;
  }

  pre,code {
    font-family: Consolas, Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono,
      Courier New, monospace, serif;
  }

  pre {
    margin-bottom: 10px;
    border-radius: 10px;
    line-height: 1.5rem;
    padding: 25px;
    color: #ffffff;
    background-color: #222222;
  }
`;

export const App = () => (
  <MuiThemeProvider theme={theme}>
    <ThemeProvider theme={theme}>
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
          </Switch>
        </div>
      </React.Fragment>
    </ThemeProvider>
  </MuiThemeProvider>
);

const WrappedApp = withRouter(App);

export default () => (
  <Router>
    <WrappedApp />
  </Router>
);
