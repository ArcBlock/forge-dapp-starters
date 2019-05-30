import { graphql } from 'gatsby';

export const PostDetailFragment = graphql`
  fragment PostDetailFragment2 on MarkdownRemark {
    id
    frontmatter {
      path
      date
      tags
      categories
      language
      title
      layout
      banner {
        id
        publicURL
        childImageSharp {
          fluid(maxWidth: 640) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
    tableOfContents(pathToSlugField: "frontmatter.path")
    headings {
      value
      depth
    }
    timeToRead
    wordCount {
      paragraphs
      sentences
      words
    }
  }
`;

export const PostListFragment = graphql`
  fragment PostListFragment2 on MarkdownRemarkConnection {
    edges {
      node {
        excerpt(pruneLength: 300)
        ...PostDetailFragment2
      }
    }
  }
`;

export const SharpImageFragment = graphql`
  fragment SharpImageFragment on File {
    childImageSharp {
      fluid(maxWidth: 500) {
        ...GatsbyImageSharpFluid
      }
    }
  }
`;

export const SharpImageFragment2000 = graphql`
  fragment SharpImageFragment2000 on File {
    childImageSharp {
      fluid(maxWidth: 2000) {
        ...GatsbyImageSharpFluid
      }
    }
  }
`;

export const SharpImageFragmentAvatar = graphql`
  fragment SharpImageFragmentAvatar on File {
    childImageSharp {
      fixed(width: 150) {
        ...GatsbyImageSharpFixed
      }
    }
  }
`;

export const SharpImageFragment200 = graphql`
  fragment SharpImageFragment200 on File {
    childImageSharp {
      fixed(width: 200) {
        ...GatsbyImageSharpFixed
      }
    }
  }
`;
