import { useRef, RefObject } from 'react';
import styled from 'styled-components';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { useGesture } from 'react-use-gesture';
import { useSpring } from '@react-spring/core';

import { IArticle } from '@interfaces/article';

import ArticleImages from './ArticleImages';

const Container = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  position: relative;
`;

const ArticleContent = styled.article`
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #5a5a5a;
  }

  &::-webkit-scrollbar-track {
    background-color: #bebebe;
  }

  padding: 40px 100px 40px 40px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;

  margin-bottom: 20px;
`;

const Body = styled.div`
  font-size: 18px;
  line-height: 1.3;
`;

interface IProps {
  article: IArticle;
  body: string;
}

function Article({ article, body }: IProps) {
  const imageCarouselRef: RefObject<HTMLDivElement | null> = useRef(null);

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
    { domTarget: imageCarouselRef as RefObject<EventTarget> },
  );

  return (
    <Container>
      <ArticleContent>
        <Title>{article.title}</Title>
        <Body>
          <MDXRenderer>{body}</MDXRenderer>
        </Body>
      </ArticleContent>
      <ArticleImages
        images={article.images}
        imageCarouselRef={imageCarouselRef}
        springProps={{
          width,
          opacity,
          x,
        }}
      />
    </Container>
  );
}

export default Article;
