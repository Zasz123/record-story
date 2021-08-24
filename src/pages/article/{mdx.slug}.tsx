import { graphql } from 'gatsby';

import Article from 'components/article/Article';

function ArticlePage({ data }: any) {
  return <Article article={data.mdx.frontmatter} body={data.mdx.body} />;
}

export const query = graphql`
  query ($id: String) {
    mdx(id: { eq: $id }) {
      frontmatter {
        title
        startDate
        endDate
        images {
          childImageSharp {
            gatsbyImageData
          }
        }
        path
      }
      body
    }
  }
`;

export default ArticlePage;
