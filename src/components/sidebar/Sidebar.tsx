import { useEffect } from 'react';
import { navigate } from 'gatsby';

import styled from 'styled-components';
import { animated, useSpring, useSprings } from 'react-spring';
import { useDrag } from 'react-use-gesture';
import useMeasure from 'react-use-measure';

import { useLayoutContext } from 'components/layout/Layout.provider';
import { ISidebarItem } from 'interfaces/article';
import useURLParams from 'hooks/useURLParams';

import SidebarCarousel from './SidebarCarousel';

import RecordImage from '../../images/record.png';
import RecordPlayer from '../../images/record-player.jpg';

const Container = styled.nav`
  width: 570px;
  height: 100%;

  flex: 0 0 570px;
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

interface IProps {
  articles: Array<ISidebarItem>;
}

function Sidebar({ articles }: IProps) {
  const { selectedIndex, setSelectedIndex } = useLayoutContext();
  const urlParams = useURLParams();

  const [ref, { height }] = useMeasure();

  const [springProps, springAPI] = useSpring(() => ({
    rotate: 0,
  }));
  const [carouselProps, carouselAPI] = useSprings(
    articles.length,
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
      if (newIndex < 0 || newIndex > articles.length - 1) {
        // 이미지 length보다 더 커지거나 작아지면 막는 코드
        return;
      }

      setSelectedIndex(newIndex);
      navigate(articles[newIndex].path);
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

  useEffect(() => {
    if (selectedIndex !== urlParams.articleIndex) {
      setSelectedIndex(urlParams.articleIndex);
    }
  }, [urlParams]);

  return (
    <Container {...gestureBind()} ref={ref}>
      <RollableRecord src={RecordImage} alt="record_image" style={{ rotate: springProps.rotate }} />
      <SidebarCarousel carouselList={articles} carouselProps={carouselProps} />
    </Container>
  );
}

export default Sidebar;
