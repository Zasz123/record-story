import styled from 'styled-components';

import { animated, useSpring } from 'react-spring';
import { useDrag } from 'react-use-gesture';

import RecordImage from '../../images/record.png';
import RecordBackgroundExample from '../../images/record-background-example.jpg';

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

  const [springProps, springAPI] = useSpring(() => ({
    rotate: 0,
  }));

  const gestureBind = useDrag(({ active, movement: [, moveY], direction: [, directionY], distance, cancel }) => {
    }

    const rotate = springProps.rotate.get() - Number((moveY % 360).toFixed());

    springAPI.start({
      rotate,
    });

  });

  return (
    <Container {...gestureBind()}>
      <RollableRecord src={RecordImage} alt="record_image" style={{ rotate: springProps.rotate }} />
    </Container>
  );
}

export default Sidebar;
