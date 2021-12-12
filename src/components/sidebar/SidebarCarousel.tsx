import styled from 'styled-components';
import { animated } from 'react-spring';
import { SpringValue } from '@react-spring/core';

import { ISidebarItem } from '@interfaces/article';

const Container = styled.div`
  width: 100%;
  height: 100%;

  position: absolute;
  top: 0;
  left: 0;
  user-select: none;
`;

const CarouselItemWrapper = styled(animated.div)`
  position: relative;
  display: inline-block;
  width: 300px;
  user-select: none;
`;

const CarouselItemImage = styled(animated.img)`
  position: absolute;
  width: 300px;
  height: 200px;

  object-fit: cover;

  pointer-events: none;
  user-select: none;
`;

interface IProps {
  carouselList: Array<ISidebarItem>;
  carouselProps: {
    x: SpringValue<number>;
    y: SpringValue<number>;
    scale: SpringValue<number>;
    display: SpringValue<string>;
  }[];
}

function SidebarCarousel({ carouselList, carouselProps }: IProps) {
  return (
    <Container>
      {carouselProps.map((item, index) => (
        <CarouselItemWrapper key={carouselList[index].id} style={{ x: item.x, y: item.y, display: item.display }}>
          <CarouselItemImage alt="carousel_item" src={carouselList[index].thumbnail} style={{ scale: item.scale }} />
        </CarouselItemWrapper>
      ))}
    </Container>
  );
}

export default SidebarCarousel;
