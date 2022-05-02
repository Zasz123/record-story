import styled from 'styled-components';
import { animated } from 'react-spring';

import RecordPlayer from '../../images/record-player.jpg';

export const Container = styled.nav`
  cursor: grab;

  width: 570px;
  height: 100%;

  flex: 0 0 570px;
  position: relative;

  background-image: url(${RecordPlayer});
  background-position: right;

  &:active {
    cursor: grabbing;
  }
`;

export const RollableRecord = styled(animated.img)`
  width: auto;
  height: 100%;
  position: absolute;
  left: -450px;
  pointer-events: none;
  user-select: none;
`;
