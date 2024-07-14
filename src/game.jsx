import React, { useEffect, useState, useRef } from 'react';
import Invaders from './invader';
import Player from './player';
import Bullet from './bullet'; // Assuming Bullet component is imported
import { getxvalue } from './player';
const INVADER_SPEED = 0.5;
const INVADER_COUNT = 10;
const BULLET_SPEED = 5;
const BULLET_INTERVAL = 15; // Example interval for firing bullets
const BULLET_WIDTH = 100;
const INVADER_WIDTH = 80;

export default function Game() {
  const [gameState, setGameState] = useState("not-started");
  const [invaders, setInvaders] = useState([]);
  const [bullets, setBullets] =useState([]);
  const playerRef = useRef();
  const countRef = useRef(120);
  const flipRef = useRef(false);
  const count2Ref=useRef(15);
  const intervalRef = useRef(null);
  const interval2Ref = useRef(null);
  const count3Ref=useRef(0);


  const handleKeyPress = () => {
    if (gameState === "not-started") {
      initializeGame();
    }
  };

  const initializeGame = () => {
    setGameState("started");

  
  };

  useEffect(() => {
    document.addEventListener("keypress", handleKeyPress, { once: true });
    if (gameState==='started') intervalRef.current = setInterval(() => {
      handleInvaders();
      handleBullets();
    }, 1000 / 60); // Update at approximately 60 FPS 
    return () => {
      document.removeEventListener("keypress", handleKeyPress);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [gameState,bullets,invaders]);

 


  const updateInvaders = () => {
    setInvaders(prevInvaders =>
      {const updatedversion=prevInvaders.map(invader => ({
        ...invader,
        top: invader.top + INVADER_SPEED,
      }))  
      const temp=[...updatedversion]
      
      
      return temp    }
    );
  };

  const handleInvaders = () => {

    if (countRef.current === 120) {
      createInvaders();
      countRef.current = 0;
    }
    countRef.current++;
    updateInvaders();
  };

  const createInvaders = () => {
    flipRef.current = !flipRef.current;
    const ini = flipRef.current
      ? window.innerWidth / INVADER_COUNT / 2
      : 9;

    const newInvaders = [...invaders];
    for (let i = 0; i < INVADER_COUNT; i++) {
      newInvaders.push({
        left: ini + i * (window.innerWidth / INVADER_COUNT),
        top: 0,
      });
    }

    setInvaders(prev => newInvaders);
  };

//bullet




function isCollision(item1,item2) {
  const horizontal=item1.left-item2.left;
  const sum=window.innerHeight-(item1.bottom+item2.top);
  return horizontal<INVADER_WIDTH&&horizontal>0&&sum>0&&sum<INVADER_WIDTH;
}


const updateBullets = () => {
  setBullets(prev => {
    const updatedBullets = prev.map(bullet => ({
      ...bullet,
      bottom: bullet.bottom + BULLET_SPEED,
    }));

    let BulletsTemp = [...updatedBullets];
    let InvadersTemp = [...invaders];

    BulletsTemp.forEach((item1) => {
      InvadersTemp.forEach((item2) => {
       
        if (isCollision(item1, item2)) {
          BulletsTemp = BulletsTemp.filter((item) => item !== item1);
          InvadersTemp = InvadersTemp.filter((item) => item !== item2);
          
          
        }
      });
    });
    count3Ref.current++;
    
    if (count3Ref.current===4)
    {
      console.log(1,InvadersTemp)
      count3Ref.current=0;
      setInvaders(InvadersTemp);
    }
    
    //setInvaders(InvadersTemp);
    // Return the updated bullets state
    return BulletsTemp;
  });

  
  
};

const createBullets = () => {
  const newBullets = [...bullets];
 
  newBullets.push({
    left: getxvalue(),
    bottom: 0
  });
  
  setBullets(prev => newBullets);
};

const handleBullets = () => {
  if (count2Ref.current === BULLET_INTERVAL) {
    createBullets();
    count2Ref.current = 0;
  }
  count2Ref.current++;
  updateBullets();
};


{/* {gameState === "lost" && `${getPassedPipesCount()} Pipes`} */}

return (
  <div className="body">
    <h1 className={`title ${gameState === "started" ? "hide" : ""}`}>
      Press any key to start
    </h1>
    <h2 className={`subtitle ${gameState !== "lost" ? "hide" : ""}`}>
      {/* {gameState === "lost" && `${getPassedPipesCount()} Pipes`} */}
    </h2>
    <div className={`${gameState === "started" ? "" : "hide"}`}>
      <Invaders invaders={invaders} />
    </div>
    <div className={`${gameState === "started" ? "" : "hide"}`} ref={playerRef}>
      <Player />
    </div>
    {gameState === "started" && (
      <Bullet bullets={bullets} />
    )}
  </div>
);

  
  
}
