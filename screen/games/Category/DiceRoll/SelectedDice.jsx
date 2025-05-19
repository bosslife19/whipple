import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import Header from '../../../Header/Header';
import { router } from 'expo-router';
import { useGameContext } from '../../../../context/AppContext';
import Losingmodal from '../../../loseModal/LoseModal';
import Winningmodal from '../../../winningmodal/winningmodal';

const SelectedDiceRoll = () => {
   const {updateGameData, gameData } = useGameContext();
    const {stake,odds,gameLabel, GameName = 'Dice Roll'} = gameData || {};

  const [rolling, setRolling] = useState(false);
  const [userRoll, setUserRoll] = useState(null);
  const [houseRoll, setHouseRoll] = useState(null);
  const [result, setResult] = useState(null);

    const [success, setSuccess] = useState(null); // null initially, true/false after check
      
    const [visible, setModalVisibled] = useState(false);
       
     const closeModal =()=>{
        setModalVisibled(false)
    
      }

const handleRollDice = () => {
  setRolling(true);
  setResult(null);
  setUserRoll(null);
  setHouseRoll(null);

  setTimeout(() => {
    const user = Math.ceil(Math.random() * 3);
    const house = Math.ceil(Math.random() * 6);
    setUserRoll(user);
    setHouseRoll(house);

    const isWin = user === house;
    setResult(isWin ? 'win' : 'lose');

    setSuccess(isWin); // update success status
    setModalVisibled(true); // open modal

    setRolling(false);
  }, 1500);
};


   // ✅ Win
   // User rolls: 4

    // House rolls: 4

    // Result: user === house → win

    // ❌ Lose
    // User rolls: 2

    // House rolls: 5

     // Result: user !== house → lose

     const handleGoGames = () =>{
          updateGameData({
      stake: stake.toString(),
      odds ,
      gameLabel,
      GameName, 
      isGameLost: true, // Flag indicating if the game is lost
     });
        router.push('/(routes)/games/LostGames/ViewLostGames')
    }
    
      
  const renderButton = () => {
    if (rolling) {
      return (
        <TouchableOpacity style={[styles.rollButton, styles.disabledButton]} disabled>
          <ActivityIndicator size="small" color="#fff" />
        </TouchableOpacity>
      );
    }

    if (result === 'win') {
      return (
        <TouchableOpacity
          style={[styles.rollButton, { backgroundColor: '#0A1931' }]}
          onPress={() => router.push('/(routes)/games/availablegames')}
        >
          <Text style={styles.rollButtonText}>Go Back to Games</Text>
        </TouchableOpacity>
      );
    }

    if (result === 'lose') {
      return (
        <TouchableOpacity
          style={[styles.rollButton, { backgroundColor: '#0A1931' }]}
          onPress={handleGoGames}
        >
          <Text style={styles.rollButtonText}>Go to Loser’s Game </Text>
        </TouchableOpacity>
      );
    }

    return (
      <TouchableOpacity
        style={styles.rollButton}
        onPress={handleRollDice}
      >
        <Text style={styles.rollButtonText}>Roll Dice</Text>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <Header  name={'Back to Game Selection'} backgroundColor="#A8BFED" />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>{GameName} Game</Text>
        <Text style={styles.subtitle}>Roll the dice and try to match the House's outcome</Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Roll The Dice</Text>
          <Text style={styles.cardSubtitle}>House: @user</Text>

          <View style={styles.diceBox}>
            <View style={styles.dice}>
              <Text style={styles.diceText}>
                ? 
              </Text>
            </View>
          </View>

          {renderButton()}

          {userRoll !== null && houseRoll !== null && (
            <View style={styles.resultBox}>
              <Text style={styles.resultText}>Your roll: {userRoll}</Text>
              <Text style={styles.resultText}>House's roll: {houseRoll}</Text>
            </View>
          )}
        </View>

        <View style={styles.card}>
          <Text style={styles.howToTitle}>How To Win</Text>
          <Text style={styles.howToText}>
            Roll the dice and try to get the exact same outcome as The House. If your roll matches the House's roll exactly, you win!
          </Text>
        </View>
      </ScrollView>

       {success === true && (
             <Winningmodal
             visible={visible}
             closeModal={closeModal}
            />
           )}
          {success === false && (
          <Losingmodal
          visible={visible}
          closeModal={closeModal}
          />
          )}
    </>
  );
};

export default SelectedDiceRoll;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 40,
    // backgroundColor: '#fff',
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    color: '#6b7280',
    marginBottom: 24,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#d1d5db',
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 16,
  },
  diceBox: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    height: 80,
  },
  dice: {
    width: 64,
    height: 64,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#d1d5db',
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  diceText: {
    fontSize: 24,
    color: '#4b5563',
  },
  rollButton: {
    backgroundColor: '#0A1931',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 32,
    alignSelf: 'center',
  },
  disabledButton: {
    opacity: 0.7,
  },
  rollButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  howToTitle: {
    fontWeight: '600',
    marginBottom: 8,
    fontSize: 16,
  },
  howToText: {
    fontSize: 14,
    color: '#6b7280',
  },
  resultBox: {
    marginTop: 16,
    alignItems: 'center',
  },
  resultText: {
    fontSize: 16,
    color: '#374151',
  },
});
