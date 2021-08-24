import styled from 'styled-components';

import { IArticle } from 'interfaces/article';

const Container = styled.div`
  width: 100%;

  display: flex;
  gap: 20px;
  flex-wrap: nowrap;
  justify-content: flex-start;

  overflow-x: auto;
`;

const ArticleImage = styled.img`
  width: 350px;
  height: auto;
  max-height: 300px;
`;

interface IProps {
  images: IArticle['images'];
}

function ArticleImages({ images }: IProps) {
  return (
    <Container>
      {images.map((item) => {
        return <ArticleImage src={item.publicURL} alt={item.id} />;
      })}
    </Container>
  );
}

export default ArticleImages;
