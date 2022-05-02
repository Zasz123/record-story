import { useEffect } from 'react';
import { navigate } from 'gatsby';

import { useSpring, useSprings } from 'react-spring';
import { useDrag } from 'react-use-gesture';
import useMeasure from 'react-use-measure';

import { useLayoutContext } from '@components/layout/Layout.provider';
import { ISidebarItem } from '@interfaces/article';
import useURLParams from '@hooks/useURLParams';

import { Container, RollableRecord } from './SidebarWrapper';
import SidebarCarousel from './SidebarCarousel';

import RecordImage from '../../images/record.png';

interface IProps {
  articles: Array<ISidebarItem>;
  pathname: string;
}

function Sidebar({ articles, pathname }: IProps) {
  const { selectedIndex, setSelectedIndex } = useLayoutContext();
  const urlParams = useURLParams({ pathname });

  const [ref, { height }] = useMeasure();

  const [springProps, springAPI] = useSpring(() => ({
    rotate: 0,
  }));

  const [carouselProps, carouselAPI] = useSprings(
    articles.length,
    (index) => ({
      x: index === selectedIndex ? 250 : 50,
      y: index === selectedIndex ? height * 0.4 : (index - selectedIndex) * (height * 0.8),
      scale: index === selectedIndex ? 1 : 0.7,
      display: 'block',
    }),
    [height],
  );

  const gestureBind = useDrag(({ active, movement: [, moveY], direction: [, directionY], distance, cancel }) => {
    const newIndex = selectedIndex + (directionY > 0 ? -1 : 1);

    if (active && distance > height * 0.15) {
      if (newIndex < 0) {
        setSelectedIndex(articles.length - 1);
        navigate(articles[articles.length - 1].path);
        cancel();
        return;
      }

      if (newIndex > articles.length - 1) {
        setSelectedIndex(0);
        navigate(articles[0].path);
        cancel();
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
      if (index < selectedIndex - 2 || index > selectedIndex + 2) {
        return { display: 'none' };
      }

      const nowIndex = index - selectedIndex;

      let x = 50;
      let y = nowIndex * (height * 0.8);
      let scale = 0.7;

      if (index === selectedIndex) {
        x = 250;
        y = height * 0.4;
        scale = 1;
      }

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
