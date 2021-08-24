import styled from 'styled-components';
import { MDXRenderer } from 'gatsby-plugin-mdx';

import { IArticle } from 'interfaces/article';

import ArticleImageGrid from 'components/article/ArticleImageGrid';

const Container = styled.div`
  padding: 20px;
`;

const Title = styled.div`
  font-size: 24px;
  margin-bottom: 20px;
`;

const Body = styled(MDXRenderer)`
  font-size: 18px;
`;

interface IProps {
  article: IArticle;
  body: string;
}

function Article({ article, body }: IProps) {
  return (
    <Container>
      <Title>{article.title}</Title>
      <Body>{body}</Body>
      <ArticleImageGrid images={article.images} />
    </Container>
  );
}

export default Article;
