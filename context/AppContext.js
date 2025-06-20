import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [gameData, updateGameData] = useState(null);

 

  return (
    <GameContext.Provider value={{ gameData, updateGameData }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => useContext(GameContext);
