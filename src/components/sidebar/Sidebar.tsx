import { useState } from 'react';
import styled from 'styled-components';

import RecordImage from '../../images/record.png';

const Container = styled.nav`
  width: 570px;
  height: 100%;
  position: relative;
`;

const RollableRecord = styled.img<{ rotate: number }>`
  width: 960px;
  height: 100%;
  position: absolute;
  left: -450px;
  transform: rotate(${({ rotate }) => rotate}deg);
  pointer-events: none;
`;

function Sidebar() {
  const [rotate, setRotate] = useState(0);
  const [onMove, setOnMove] = useState(false);
  const [dragStart, setDragStart] = useState(0);

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
    const rotateValue = (dragStart - nowY) % 360;

    // 마우스 진행방향으로 움직이도록 수정.
    // 이렇게 하지 않으면 마우스의 반대 방향으로 움직임.
    setRotate(rotateValue > 0 ? -rotateValue : Math.abs(rotateValue));
  };

  const onMouseLeave = () => {
    setOnMove(false);
  };

  return (
    <Container onMouseDown={onMouseDown} onMouseUp={onMouseUp} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave}>
      <RollableRecord
        src={RecordImage}
        alt="record_image"
        rotate={rotate}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
      />
    </Container>
  );
}

export default Sidebar;
