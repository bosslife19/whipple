import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [gameData, setGameData] = useState([]);

  useEffect(() => {
    const loadGameData = async () => {
      try {
        const savedData = await AsyncStorage.getItem('gameData');
        if (savedData) {
          setGameData(JSON.parse(savedData));
        }
      } catch (error) {
        console.log('Error loading game data', error);
      }
    };

    loadGameData();
  }, []);

  const updateGameData = async (newGame) => {
    try {
      const updatedData = [...gameData, newGame];
      setGameData(updatedData);
      await AsyncStorage.setItem('gameData', JSON.stringify(updatedData));
    } catch (error) {
      console.log('Error saving game data', error);
    }
  };

  return (
    <GameContext.Provider value={{ gameData, updateGameData }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => useContext(GameContext);
