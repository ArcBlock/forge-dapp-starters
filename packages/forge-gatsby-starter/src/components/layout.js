import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import styled from 'styled-components';
import Helmet from 'react-helmet';

import Header from './header';
import Footer from './footer';

import env from '../libs/env';

export default function Layout({ title, children, contentOnly }) {
  if (contentOnly) {
    return <Container>{children}</Container>;
  }

  return (
    <Div>
      <Helmet title={`${title} - ${env.appName}`} />
      <AppBar position="static" color="default">
        <Container>
          <Header />
        </Container>
      </AppBar>
      <Container style={{ minHeight: '60vh' }}>{children}</Container>
      <Footer />
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
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #fbfbfb;
`;
