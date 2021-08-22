import { useState } from 'react';
import styled from 'styled-components';
import { animated, useSpring, useSprings } from 'react-spring';
import { useDrag } from 'react-use-gesture';
import useMeasure from 'react-use-measure';

import SidebarCarousel from './SidebarCarousel';

import RecordImage from '../../images/record.png';
import RecordPlayer from '../../images/record-player.jpg';

import Example1 from '../../images/example_carousel/1.jpg';
import Example2 from '../../images/example_carousel/2.jpg';
import Example3 from '../../images/example_carousel/3.jpg';
import Example4 from '../../images/example_carousel/4.jpg';

const CAROUSEL_EXAMPLES = [
  { id: 1, url: Example1 },
  { id: 2, url: Example2 },
  { id: 3, url: Example3 },
  { id: 4, url: Example4 },
  { id: 5, url: Example1 },
  { id: 6, url: Example2 },
  { id: 7, url: Example3 },
  { id: 8, url: Example4 },
];

const Container = styled.nav`
  width: 570px;
  height: 100%;
  position: relative;

  background-image: url(${RecordPlayer});
  background-position: right;
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
      y: index === selectedIndex ? height * 0.5 - 100 : (index - selectedIndex) * height,
      scale: index === selectedIndex ? 1 : 0.7,
      display: 'block',
    }),
    [height],
  );

  const gestureBind = useDrag(({ active, movement: [, moveY], direction: [, directionY], distance, cancel }) => {
    const newIndex = selectedIndex + (directionY > 0 ? -1 : 1);

    if (active && distance > height * 0.15) {
      if (newIndex < 0 || newIndex > CAROUSEL_EXAMPLES.length - 1) {
        // 이미지 length보다 더 커지거나 작아지면 막는 코드
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
      if (index < selectedIndex - 1 || index > selectedIndex + 1) {
        return { display: 'none' };
      }

      const nowIndex = index - selectedIndex;

      let x = 50;
      let y = nowIndex * height;
      let scale = 0.7;

      if (index === selectedIndex) {
        x = 250;
        y = height * 0.5 - 100;
        scale = 1;
      }

      // 스크롤시의 움직인만큼 더해줌
      y += active ? moveY : 0;

      return { x, y, scale, display: 'block' };
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
