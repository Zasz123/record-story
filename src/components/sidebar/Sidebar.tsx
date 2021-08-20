import { useState } from 'react';
import styled from 'styled-components';
import { animated, useSpring, useSprings } from 'react-spring';
import { useDrag } from 'react-use-gesture';
import useMeasure from 'react-use-measure';

import SidebarCarousel from './SidebarCarousel';

import RecordImage from '../../images/record.png';
import RecordBackgroundExample from '../../images/record-background-example.jpg';

import Example1 from '../../images/example_carousel/1.jpg';
import Example2 from '../../images/example_carousel/2.jpg';
import Example3 from '../../images/example_carousel/3.jpg';
import Example4 from '../../images/example_carousel/4.jpg';

const CAROUSEL_EXAMPLES = [
  { id: 1, url: Example1 },
  { id: 2, url: Example2 },
  { id: 3, url: Example3 },
  { id: 4, url: Example4 },
];

const Container = styled.nav`
  width: 570px;
  height: 100%;
  position: relative;

  background-image: url(${RecordBackgroundExample});
  background-position: center center;
`;

const RollableRecord = styled(animated.img)`
  width: auto;
  height: 100%;
  position: absolute;
  left: -450px;
  pointer-events: none;
  user-select: none;
`;

function Sidebar() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [ref, { height }] = useMeasure();

  const [springProps, springAPI] = useSpring(() => ({
    rotate: 0,
  }));
  const [carouselProps, carouselAPI] = useSprings(
    CAROUSEL_EXAMPLES.length,
    (index) => ({
      x: index === selectedIndex ? 250 : 50,
      y: index * (height * 0.2) + height * 0.4,
      display: 'block',
    }),
    [height],
  );

  const gestureBind = useDrag(({ active, movement: [, moveY], direction: [, directionY], distance, cancel }) => {
    const newIndex = selectedIndex + (directionY > 0 ? -1 : 1);

    if (active && distance > height * 0.1) {
      // 이미지 length보다 더 커지거나 작아지면 막는 코드
      if (newIndex < 0 || newIndex > CAROUSEL_EXAMPLES.length - 1) {
        return;
      }

      setSelectedIndex(newIndex);
      cancel();
    }

    const rotate = springProps.rotate.get() - Number((moveY % 360).toFixed());

    springAPI.start({
      rotate,
    });

    carouselAPI.start((index) => {
      if (index < selectedIndex - 2 || index > selectedIndex + 2) {
        return { display: 'none' };
      }

      const x = index === selectedIndex ? 250 : 50;
      const y = (index - selectedIndex) * (height * 0.2) + (active ? moveY : 0);

      return { x, y, display: 'block' };
    });
  });

  return (
    <Container {...gestureBind()} ref={ref}>
      <RollableRecord src={RecordImage} alt="record_image" style={{ rotate: springProps.rotate }} />
      <SidebarCarousel carouselExamples={CAROUSEL_EXAMPLES} carouselProps={carouselProps} />
    </Container>
  );
}

export default Sidebar;
