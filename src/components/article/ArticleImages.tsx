import { useRef } from 'react';
import styled from 'styled-components';
import { useSpring, animated } from '@react-spring/web';
import { useGesture } from 'react-use-gesture';

import { IArticleImage } from 'interfaces/article';

const Container = styled.ul`
  overflow-y: scroll;
  overflow-x: hidden;

  position: absolute;
  right: 0px;
  top: 0px;

  height: 100vh;

  padding-top: 40px;
`;

const ImageWrapper = styled(animated.li)`
  cursor: pointer;
`;

const Image = styled.img`
  width: 300px;
  height: auto;

  margin-bottom: 20px;
`;

interface IProps {
  images: IArticleImage[];
}

function ArticleImages({ images }: IProps) {
  const containerRef = useRef(null);

  const [{ x, opacity }, springAPI] = useSpring(() => ({
    x: 200,
    opacity: 0.5,
  }));

  useGesture(
    {
      onHover: ({ hovering }) => {
        if (hovering) {
          springAPI({ x: 0, opacity: 1 });
        }
      },
      onMouseLeave: () => {
        springAPI({ x: 200, opacity: 0.5 });
      },
    },
    { domTarget: containerRef },
  );

  return (
    <Container ref={containerRef}>
      {images.map((item) => (
        <ImageWrapper key={item.id} style={{ x, opacity }}>
          <Image alt={`article_image_${item.id}`} src={item.url} />
        </ImageWrapper>
      ))}
    </Container>
  );
}

export default ArticleImages;
