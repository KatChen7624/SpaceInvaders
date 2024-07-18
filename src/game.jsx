import React, { useEffect, useState, useRef } from 'react';
import Invaders from './invader';
import Player from './player';
import Bullet from './bullet'; // Assuming Bullet component is imported
import { getxvalue } from './player';
const INVADER_SPEED = 0.5;
const INVADER_COUNT = 10;
const BULLET_SPEED = 5;
const BULLET_INTERVAL = 10; // Example interval for firing bullets
const BULLET_WIDTH = 100;
const INVADER_WIDTH = 80;

export default function Game() {
  const [gameState, setGameState] = useState("not-started");
  const [invaders, setInvaders] = useState([]);
  const [bullets, setBullets] =useState([]);
  const playerRef = useRef();
  const countRef = useRef(120);
  const flipRef = useRef(false);
  const count2Ref=useRef(BULLET_INTERVAL);
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
    }, 1000 / 60); // Update at approximately 60 FPS 
    return () => {
      document.removeEventListener("keypress", handleKeyPress);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [gameState,bullets,invaders]);

 


  const updateInvaders = () => {
    
    const updatedInvaders = invaders.map(invaderArray => {
      
      let flag = false; 
      const updatedArray = invaderArray.map(invader => {
        //console.log('here')
        if (invader.top >= 0) {
          
          flag = true; // Set the flag if any invader is updated
          return {
            ...invader,
            top: invader.top + INVADER_SPEED,
          };
        } else {
          return invader;
        }
      });

      // If no invader was updated in this array, we can decide not to keep this array
      if (!flag) {
        return null; // Indicate that this array should be removed
      }

      return updatedArray; // Return the updated array if any invader was updated
    }).filter(array => array !== null); // Filter out the arrays that should be removed
    
    const updateBullets = () => {
  
      const updatedBullets = bullets.map(bullet => ({
        ...bullet,
        bottom: bullet.bottom + BULLET_SPEED,
      }))
  
      let BulletsTemp = [...updatedBullets]; 
      //if (count2Ref===BULLET_INTERVAL-1)
      BulletsTemp.forEach((item1) => {
        updatedInvaders.forEach((item2) => {
         
          if (isCollision(item1, item2[item1.index])) {
            BulletsTemp = BulletsTemp.filter((item) => item !== item1);
            item2[item1.index].top=-100;
            }
                       
        });
      });
      setBullets(BulletsTemp) 
   
  };
  updateBullets();

    // Update the state based on whether any invader was updated
    setInvaders(updatedInvaders);
  };

  
  


  const handleInvaders = () => {
    
    if (countRef.current++ === 120) {
      createInvaders();
     
      countRef.current = 0;
    }
    else updateInvaders();
    if (count2Ref.current++ === BULLET_INTERVAL) {
      createBullets();
      count2Ref.current = 0;
    }
    
    
  };

  const createInvaders = () => {
    flipRef.current = !flipRef.current;
    const ini = flipRef.current
      ? window.innerWidth / INVADER_COUNT / 2
      : 9;

    const newInvaders = [];
    for (let i = 0; i < INVADER_COUNT; i++) {
      newInvaders.push({
        left: ini + i * (window.innerWidth / INVADER_COUNT),
        top: 0,
      });


    }
    //const newInvadersArray=invaders.map(inner=>[...inner])
    const newInvadersArray=[...invaders]
    newInvadersArray.push(newInvaders)
    console.log(newInvadersArray)

    setInvaders(prev => newInvadersArray);
  };

//bullet




function isCollision(item1,item2) {
  const horizontal=item1.left-item2.left;
  const sum=window.innerHeight-(item1.bottom+item2.top);
  return horizontal<INVADER_WIDTH&&horizontal>0&&sum>0&&sum<INVADER_WIDTH;
}




const createBullets = () => {
  const newBullets = [...bullets];
 
  newBullets.push({
    left: getxvalue(),
    index: Math.floor(getxvalue() / (window.innerWidth / INVADER_COUNT)),
    bottom: 0
  });
  
  setBullets(prev => newBullets);
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
