import { useRef } from 'react';
import styled from 'styled-components';
import { useSpring, animated } from '@react-spring/web';
import { useGesture } from 'react-use-gesture';

import { IArticleImage } from 'interfaces/article';

const Container = styled(animated.div)`
  overflow: hidden;

  position: absolute;
  right: 10px;
  top: 0px;

  height: 100vh;

  padding-top: 40px;
  padding-left: 20px;

  background-color: #929292;
`;

const ImageWrapper = styled(animated.li)`
  list-style: none;

  margin-bottom: 20px;
`;

const ImageShadow = styled.span`
  cursor: pointer;

  display: block;
  width: 100%;
  height: 100%;

  &:hover {
    box-shadow: inset 0 0 10px #6b6b6b;
  }
`;

const Image = styled.img`
  width: 300px;
  height: auto;
`;

interface IProps {
  images: IArticleImage[];
}

function ArticleImages({ images }: IProps) {
  const containerRef = useRef(null);

  const [{ x, opacity, width }, springAPI] = useSpring(() => ({
    x: 0,
    opacity: 0.5,
    width: 100,
  }));

  useGesture(
    {
      onHover: ({ hovering }) => {
        if (hovering) {
          springAPI({ x: 0, opacity: 1, width: 350 });
        }
      },
      onMouseLeave: () => {
        springAPI({ x: 0, opacity: 0.5, width: 100 });
      },
    },
    { domTarget: containerRef },
  );

  return (
    <Container ref={containerRef} style={{ width, opacity }}>
      {images.map((item) => (
        <ImageWrapper key={item.id} style={{ x, opacity }}>
          <Image alt={`article_image_${item.id}`} src={item.url} />
          <ImageShadow />
        </ImageWrapper>
      ))}
    </Container>
  );
}

export default ArticleImages;
