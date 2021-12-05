import { RefObject } from 'react';
import styled from 'styled-components';
import { animated } from '@react-spring/web';
import { SpringValue } from '@react-spring/core';

import { IArticleImage } from 'interfaces/article';

const Container = styled(animated.div)`
  overflow: hidden;

  position: absolute;
  right: 10px;
  top: 0px;

  display: flex;
  flex-direction: column;
  gap: 40px;

  height: 100vh;

  padding-top: 40px;
  padding-left: 20px;
  padding-bottom: 40px;

  overflow-y: auto;

  background-color: #272727;

  &::-webkit-scrollbar {
    width: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #5a5a5a;
  }

  &::-webkit-scrollbar-track {
    background-color: #bebebe;
  }
`;

const Image = styled(animated.img)`
  width: 300px;
  height: auto;
`;

interface IProps {
  images: IArticleImage[];
  imageCarouselRef: RefObject<HTMLDivElement | null>;
  springProps: {
    width: SpringValue<number>;
    opacity: SpringValue<number>;
    x: SpringValue<number>;
  };
}

function ArticleImages({ images, imageCarouselRef, springProps }: IProps) {
  return (
    <Container
      ref={imageCarouselRef as RefObject<HTMLDivElement>}
      style={{ width: springProps.width, opacity: springProps.opacity }}
    >
      {images.map((item) => (
        <Image
          key={item.id}
          alt={`article_image_${item.id}`}
          src={item.url}
          style={{ x: springProps.x, opacity: springProps.opacity }}
        />
      ))}
    </Container>
  );
}

export default ArticleImages;
