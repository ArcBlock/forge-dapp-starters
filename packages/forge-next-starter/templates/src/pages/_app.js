import React from 'react';
import App from 'next/app';
import Helmet from 'react-helmet';
import { create } from '@arcblock/ux/lib/Theme';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { createGlobalStyle, ThemeProvider } from 'styled-components';

import CssBaseline from '@material-ui/core/CssBaseline';
import CircularProgress from '@material-ui/core/CircularProgress';

import env from '../libs/env';
import { SessionProvider } from '../libs/session';

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

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <React.Fragment>
        <Helmet
          htmlAttributes={{ lang: 'en' }}
          title={process.env.appName}
          meta={[
            {
              name: 'viewport',
              content: 'width=device-width, initial-scale=1',
            },
          ]}>
          <link rel="shortcut icon" href="/static/favicon.ico" />
        </Helmet>
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
                    <Component pageContext={this.pageContext} {...pageProps} />
                  </React.Fragment>
                );
              }}
            </SessionProvider>
          </ThemeProvider>
        </MuiThemeProvider>
      </React.Fragment>
    );
  }
}

export default MyApp;
