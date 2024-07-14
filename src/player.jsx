
// import React, {useState,useRef, useEffect} from 'react'
// let xvalue;

// export default function Player()
// {
//   const [playerPosition, setPlayerPosition] = useState(window.innerWidth/2);
//   useEffect(() => {
//     const handleKeyDown = (event) => {
//       if (event.key === 'ArrowLeft') {
//         setPlayerPosition(prev => (prev-10));
//       } else if (event.key === 'ArrowRight') {
//         setPlayerPosition(prev => (prev+10));
//       }
//     };

//     window.addEventListener('keydown', handleKeyDown);
//     return () => {
//       window.removeEventListener('keydown', handleKeyDown);
//     };
//   }, []);

//   xvalue=playerPosition;

//   return(
//     <div className='player' style={{left: playerPosition}}>
//     </div>
//   )
// }




import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
let xvalue
const PLAYER_WIDTH = 100; // Adjust the width as needed

const PlayerContainer = styled.div`
  position: absolute;
  width: ${PLAYER_WIDTH}px;
  height: ${PLAYER_WIDTH}px;
  left: ${({ left }) => `${left}px`};
  bottom: 0; // Adjust the position from the bottom as needed
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${PLAYER_WIDTH / 2}px;
`;

const Player = () => {
  const [playerPosition, setPlayerPosition] = useState(window.innerWidth / 2);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowLeft') {
        setPlayerPosition((prev) => Math.max(prev - 10, 0)); // Prevent moving out of bounds
      } else if (event.key === 'ArrowRight') {
        setPlayerPosition((prev) => Math.min(prev + 10, window.innerWidth - PLAYER_WIDTH)); // Prevent moving out of bounds
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
  xvalue=playerPosition;

  return (
    <PlayerContainer left={playerPosition}>
      <div>🛸</div> {/* Use an emoji to represent the player */}
    </PlayerContainer>
  );
};

export default Player;



export function getxvalue()
{
  return xvalue;
}