import styled from 'styled-components';

import useBoolean from 'hooks/useBoolean';

import { IArticle } from 'interfaces/article';

const Container = styled.div<{ open?: boolean }>`
  width: 100%;
  height: ${({ open }) => (open ? '450px' : undefined)};
  background-color: white;

  position: relative;

  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 5px 5px 5px 5px;
  border-radius: 10px;
  box-shadow: 0px -1px 4px #b9b9b9;

  overflow-x: auto;
  overflow-y: hidden;

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

  position: sticky;
  top: 0;
  left: 0;

  display: flex;
  justify-content: center;
  align-content: center;
`;

const ArticleImageHandle = styled.hr`
  width: 50px;
  height: 5px;
  margin: 10px;
  background-color: #7d7d7d;
`;

const ArticleImageList = styled.article`
  position: absolute;
  left: 0;
  bottom: 0;

  display: flex;
  gap: 20px;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-self: flex-start;

  padding: 5px;
`;

const ArticleImageWrapper = styled.button`
  border: none;
  background: none;

  position: relative;
`;

const ArticleImageHoverShadow = styled.div`
  cursor: pointer;

  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  &:hover {
    box-shadow: inset 0px 0px 60px #757575;
  }
`;

const ArticleImage = styled.img`
  height: 250px;
`;

interface IProps {
  images: IArticle['images'];
}

function ArticleImages({ images }: IProps) {
  const [isOpen, , onOpen, onClose] = useBoolean();

  return (
    <Container open={isOpen}>
      <ArticleImageHandleWrapper onClick={isOpen ? onClose : onOpen}>
        <ArticleImageHandle />
      </ArticleImageHandleWrapper>
      {isOpen ? (
        <ArticleImageList>
          {images.map((item) => {
            return (
              <ArticleImageWrapper>
                <ArticleImageHoverShadow />
              </ArticleImageWrapper>
            );
          })}
              <ArticleImage key={item.id} src={item.url} alt={`article_image_${item.id}`} />
        </ArticleImageList>
      ) : (
        <></>
      )}
    </Container>
  );
}

export default ArticleImages;
