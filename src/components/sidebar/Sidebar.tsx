import { useState } from 'react';
import styled from 'styled-components';

import RecordImage from '../../images/record.png';
import RecordBackgroundExample from '../../images/record-background-example.jpg';

const Container = styled.nav`
  width: 570px;
  height: 100%;
  position: relative;

  background-image: url(${RecordBackgroundExample});
  background-position: center center;
`;

const RollableRecord = styled.img<{ rotate: number }>`
  width: auto;
  height: 100%;
  position: absolute;
  left: -450px;
  transform: rotate(${({ rotate }) => rotate}deg);
  pointer-events: none;
`;

function Sidebar() {
  const [rotate, setRotate] = useState(0);
  const [onMove, setOnMove] = useState(false);
  const [dragStart, setDragStart] = useState<number>(0);

  const onMouseUp = () => {
    setOnMove(false);
  };

  const onMouseDown = (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    setOnMove(true);
    setDragStart(event.clientY);
  };

  const onMouseMove = (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    if (!onMove) {
      return;
    }

    const nowY = event.clientY;
    const rotateValue = rotate - ((dragStart - nowY) % 360);

    setRotate(rotateValue);
  };

  const onMouseLeave = () => {
    setOnMove(false);
  };

  return (
    <Container onMouseDown={onMouseDown} onMouseUp={onMouseUp} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave}>
      <RollableRecord src={RecordImage} alt="record_image" rotate={rotate} />
    </Container>
  );
}

export default Sidebar;
