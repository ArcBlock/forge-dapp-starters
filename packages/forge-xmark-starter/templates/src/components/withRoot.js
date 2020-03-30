import React from 'react';
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

export default function withRoot(Component) {
  return props => (
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
                <Component {...props} />
              </React.Fragment>
            );
          }}
        </SessionProvider>
      </ThemeProvider>
    </MuiThemeProvider>
  );
}
