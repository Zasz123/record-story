import styled from 'styled-components';

import { IArticle } from 'interfaces/article';

const Container = styled.div`
  width: 100%;

  display: flex;
  gap: 20px;
  flex-wrap: nowrap;
  justify-content: flex-start;

  overflow-x: auto;

  &::-webkit-scrollbar {
    height: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #5a5a5a;

    border-radius: 20px;
  }

  &::-webkit-scrollbar-track {
    background-color: #bebebe;

    border-radius: 20px;
  }
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
