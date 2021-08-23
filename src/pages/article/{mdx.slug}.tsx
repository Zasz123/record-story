import { graphql, PageProps } from 'gatsby';

import Article from 'components/article/Article';

interface IProps {
  title: string;
  startDate: Date;
  endDate: Date;
  images: any[];
}

function ArticlePage({ data }: PageProps<IProps>) {
  return <Article />;
}

export const query = graphql`
  query ($id: String) {
    mdx(id: { eq: $id }) {
      frontmatter {
        title
        startDate
        endDate
        images {
          uid
        }
      }
      id
      body
    }
  }
`;

export default ArticlePage;
