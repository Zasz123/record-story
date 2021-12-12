import { graphql } from 'gatsby';

import Article from '@components/article/Article';

function ArticlePage({ data }: any) {
  return (
    <Article
      article={{
        title: data.mdx.frontmatter.title,
        path: data.mdx.frontmatter.path,
        startDate: data.mdx.frontmatter.startDate,
        endDate: data.mdx.frontmatter.endDate,
        images: data.mdx.frontmatter.images.map((item: any) => ({ id: item.id, url: item.publicURL })),
      }}
      body={data.mdx.body}
    />
  );
}

export const query = graphql`
  query ($id: String) {
    mdx(id: { eq: $id }) {
      frontmatter {
        title
        startDate
        endDate
        images {
          id
          publicURL
        }
        path
      }
      body
    }
  }
`;

export default ArticlePage;
