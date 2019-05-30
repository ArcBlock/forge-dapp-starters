import React from 'react';
import { StaticQuery, graphql } from 'gatsby';

export default function LatestPostStub() {
  return (
    <StaticQuery
      query={graphql`
        query BlogListQuery {
          news: allMarkdownRemark(
            sort: { fields: [frontmatter___date], order: DESC }
            skip: 0
            limit: 999999
            filter: { frontmatter: { layout: { eq: "blog" } } }
          ) {
            ...PostListFragment2
          }
        }
      `}
      render={() => (
        <p>
          This is just a query stub, should not be rendered on page, if you are seeing this on page, there must be
          something wrong!
        </p>
      )}
    />
  );
}
