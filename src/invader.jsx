import React from 'react';
import styled from 'styled-components';

const INVADER_WIDTH = 80;

const InvaderContainer = styled.div`
  position: absolute;
  width: ${INVADER_WIDTH}px; /* Adjust width */
  height: ${INVADER_WIDTH}px; /* Set height to match width */
  left: ${({ left }) => `${left}px`};
  top: ${({ top }) => `${top}px`};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${INVADER_WIDTH / 2}px; /* Adjust emoji size based on container */
`;

const Invader = React.memo(({ left, top }) => (
  <InvaderContainer left={left} top={top}>
    <div className="invader">👾</div>
  </InvaderContainer>
));

const Invaders = ({ invaders }) => {
  return (
    <div>
      {invaders.map((invader, index) => (
        <Invader key={index} left={invader.left} top={invader.top} />
      ))}
    </div>
  );
};

export default Invaders;
