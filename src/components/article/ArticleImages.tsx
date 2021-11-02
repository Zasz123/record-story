import styled from 'styled-components';

import useBoolean from 'hooks/useBoolean';

import { IArticle } from 'interfaces/article';

const Container = styled.div`
  width: 100%;
  background-color: white;

  position: absolute;
  left: 0;
  bottom: 0;

  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 5px 5px 5px 5px;

  overflow-x: auto;

  border-radius: 10px;
  box-shadow: 0px -1px 4px #b9b9b9;

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

const ArticleImageHandleWrapper = styled.div`
  width: 100%;
  cursor: pointer;

  display: flex;
  justify-content: center;
`;

const ArticleImageHandle = styled.hr`
  width: 50px;
  height: 5px;
  margin: 10px;
  background-color: #7d7d7d;
`;

const ArticleImageWrapper = styled.article<{ open?: boolean }>`
  display: ${({ open }) => (open ? 'flex' : 'none')};
  gap: 20px;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-self: flex-start;

  padding: 5px;
`;

const ArticleImage = styled.img`
  width: 350px;
  height: auto;
  max-height: 300px;

  align-self: center;
`;

interface IProps {
  images: IArticle['images'];
}

function ArticleImages({ images }: IProps) {
  const [isOpen, , onOpen, onClose] = useBoolean();

  return (
    <Container>
      <ArticleImageHandleWrapper onClick={isOpen ? onClose : onOpen}>
        <ArticleImageHandle />
      </ArticleImageHandleWrapper>
      <ArticleImageWrapper open={isOpen}>
        {images.map((item) => {
          return <ArticleImage key={item.id} src={item.publicURL} alt={`article_image_${item.id}`} />;
        })}
      </ArticleImageWrapper>
    </Container>
  );
}

export default ArticleImages;
