import React, { useState, useEffect } from 'react';
import styled from 'styled-components';



const BULLET_WIDTH = 80;



const BulletContainer = styled.div`
  position: absolute;
  width: ${BULLET_WIDTH}px;
  height: ${BULLET_WIDTH}px;
  left: ${({ left }) => `${left}px`};
  bottom: ${({ bottom }) => `${bottom}px`};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${BULLET_WIDTH / 2}px;
`;


const Bullet = ({ left, bottom}) => (
  <BulletContainer left={left} bottom={bottom}>
    <div className="bullet">⚡</div>
  </BulletContainer>
);


const Bullets = ({bullets}) => {


  return (
    <div>
      {bullets.map((bullet, index) => (
        <Bullet key={index} left={bullet.left} bottom={bullet.bottom} />
      ))}
    </div>
  );
};


export default Bullets;

