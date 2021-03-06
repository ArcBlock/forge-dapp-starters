import React from 'react';
import PropTypes from 'prop-types';
import BaseLayout from '@arcblock/ux/lib/Layout';

import Footer from './footer';

export default function Layout({ title, children, contentOnly }) {
  const getExplorerUrl = chainHost => {
    const [host] = chainHost.split('/api');
    return `${host}/node/explorer/txs`;
  };

  const links = [
    { url: '/', title: 'Home' },
    { url: '/profile', title: 'Profile' },
    { url: '/payment', title: 'Payment' },
  ];

  if (window.env.chainHost) {
    links.push({ url: getExplorerUrl(window.env.chainHost), title: 'Explorer' });
  }
  links.push({
    url: 'https://github.com/ArcBlock/forge-dapp-starters/tree/master/packages/forge-react-starter',
    title: 'GitHub',
  });

  return (
    <BaseLayout
      title={title}
      brand={window.env.appName}
      links={links}
      footer={<Footer />}
      contentOnly={contentOnly}
      baseUrl={window.env.baseUrl}>
      {children}
    </BaseLayout>
  );
}

Layout.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.any.isRequired,
  contentOnly: PropTypes.bool,
};

Layout.defaultProps = {
  contentOnly: false,
};
