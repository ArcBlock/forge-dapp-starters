import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import styled from 'styled-components';
import Helmet from 'react-helmet';

import Wrapper from './wrapper';
import Header from './header';
import Footer from './footer';

import env from '../libs/env';

export default function Layout({ title, children, contentOnly }) {
  if (contentOnly) {
    return <Container>{children}</Container>;
  }

  return (
    <Container>
      <Helmet title={`${title} - ${env.appName}`} />
      <AppBar position="static" color="default">
        <Wrapper>
          <Header />
        </Wrapper>
      </AppBar>
      <Wrapper style={{ minHeight: '60vh' }}>{children}</Wrapper>
      <Wrapper>
        <Footer />
      </Wrapper>
    </Container>
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

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #fbfbfb;
`;
