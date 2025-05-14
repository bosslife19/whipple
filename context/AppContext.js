import React, { createContext, useContext, useState } from 'react';

const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [gameData, setGameData] = useState({
    // stake: '',
    // odds: '',
    // gameName: '', 
    // gameLabel: '',  
    // selectedBox: '',     
  });
 


  const updateGameData = (newData) => {
    setGameData((prev) => ({ ...prev, ...newData }));
  };

  return (
    <GameContext.Provider value={{ gameData, updateGameData }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => useContext(GameContext);
