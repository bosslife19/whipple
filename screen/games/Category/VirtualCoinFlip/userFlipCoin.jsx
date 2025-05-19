import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Animated,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import FLipCoin from '../../../../styles/flipcoin/flipCoin';
import HeaderBet from '../../../Header/HeaderBet';
import Winningmodal from '../../../winningmodal/winningmodal';
import Losingmodal from '../../../loseModal/LoseModal';
import { useGameContext } from '../../../../context/AppContext';

const UserFlipCoin = () => {
  // const {
  //   gameLabel,
  //   range, 
  //   totalOdds = '2.0',
  //   selectionCount = '1',
  //   result: passedResult = 'Heads',
  //   GameName = 'Flip The Coin',
  // } = useLocalSearchParams();

    const { gameData ,updateGameData } = useGameContext();
    const {  totalOdds = '2.0',  gameLabel, range, GameName ,result: passedResult ,} = gameData || {};
  
  const router = useRouter();
  const rotation = useRef(new Animated.Value(0)).current;
  const [flipResult, setFlipResult] = useState(null);
  const [isFlipping, setIsFlipping] = useState(false);
  const [selected, setSelected] = useState('');
  const [flippingButton, setFlippingButton] = useState(null);
  const [result, setResult] = useState(passedResult);
  const [success, setSuccess] = useState(null);
  const [visible, setModalVisibled] = useState(false);

  const correctSide = typeof passedResult === 'string' ? passedResult : 'Heads';
  const [stake] = useState(10);
  const [odds] = useState(parseFloat(totalOdds));
  const [parsedTotalOdds] = useState(parseFloat(totalOdds));
  const [selectedNumbers] = useState([1]);

  const rotateY = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const closeModal = () => {
    setModalVisibled(false);
  };

  const handleChoice = (choice) => {
    if (isFlipping) return;

    setIsFlipping(true);
    setFlipResult(null);
    setSelected(choice);
    setFlippingButton(choice);
    setResult('?');
    rotation.setValue(0);

    Animated.timing(rotation, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start(() => {
      const randomResult = Math.random() < 0.5 ? 'Tails' : 'Heads';
      setFlipResult(randomResult);
      const didWin = choice === randomResult;

      setSuccess(didWin);
      setModalVisibled(true);
      setResult(randomResult);
      setIsFlipping(false);
      setFlippingButton(null);
    });
  };

  const moveForward = () => {
    updateGameData({
      stake: stake.toString(),
      odds: parsedTotalOdds + 'x',
      gameLabel,
      GameName, 
      range,
      selected: selectedNumbers.join(','),
      isGameLost: true, // Flag indicating if the game is lost
      flipResult,
    });
 
    router.push('/(routes)/games/LostGames/ViewLostGames');

  };
  

  return (
    <>
      <HeaderBet name={GameName} arrow />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          {/* <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Text style={styles.backText}>← Back to Games</Text>
          </TouchableOpacity> */}
          <Text style={styles.title}>{GameName}</Text>
          <Text style={styles.subTitle}>Pick Heads or Tails to match The House and win!</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>{GameName}</Text>
          <Text style={styles.cardSubTitle}>House: @user</Text>

          <View style={styles.coinWrapper}>
            <Animated.View style={[FLipCoin.coinContainer, { transform: [{ rotateY }] }]}>
              <View style={[FLipCoin.coinFace, FLipCoin.coinBase]}>
                <Text style={FLipCoin.coinText}>
                  {flipResult === 'Heads' ? 'H' : flipResult === 'Tails' ? 'T' : '?'}
                </Text>
              </View>
            </Animated.View>
          </View>

          <Text style={styles.chooseText}>Choose Your Side</Text>
          <View style={styles.choiceButtons}>
           
            {success === null ? (
              <>
                <TouchableOpacity
                  style={[FLipCoin.button, { width: '43%' }]}
                  onPress={() => handleChoice('Heads')}
                  disabled={isFlipping}
                >
                  {isFlipping && flippingButton === 'Heads' ? (
                    <ActivityIndicator size="small" color="#fff" />
                  ) : (
                    <Text style={[FLipCoin.buttonText, { fontWeight: '700' }]}>Flip Coin</Text>
                  )}
                </TouchableOpacity>

                <TouchableOpacity
                  style={[FLipCoin.button, { width: '43%' }]}
                  onPress={() => handleChoice('Tails')}
                  disabled={isFlipping}
                >
                  {isFlipping && flippingButton === 'Tails' ? (
                    <ActivityIndicator size="small" color="#fff" />
                  ) : (
                    <Text style={[FLipCoin.buttonText, { fontWeight: '700' }]}>Flip Coin</Text>
                  )}
                </TouchableOpacity>
              </> 
            ) : success === true ? (
              <TouchableOpacity
                style={[FLipCoin.button, { width: '90%' }]}
                onPress={() => router.push('/(routes)/games/availablegames')}
              >
                <Text style={[FLipCoin.buttonText, { fontWeight: '700' }]}>Go to Games</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={[FLipCoin.button, { width: '90%' }]}
                onPress={moveForward}
              >
                <Text style={[FLipCoin.buttonText, { fontWeight: '700' }]}>Go to Losers Game</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        <View style={styles.instructionsCard}>
          <Text style={styles.instructionsTitle}>How To Win</Text>
          <Text style={styles.instructionsText}>
            Choose Heads or Tails. If your choice matches the House’s flip, you win the round!
          </Text>
        </View>
      </ScrollView>

      {success === true && (
        <Winningmodal visible={visible} closeModal={closeModal} />
      )}

      {success === false && (
        <Losingmodal
          visible={visible}
          closeModal={closeModal}
          correctNumber={1}
          stake={stake}
          odds={odds}
          GameName={GameName}
          gameLabel={gameLabel}
          range={range}
          selected={selected}
          parsedTotalOdds={parsedTotalOdds}
          selectedNumbers={selectedNumbers}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 40,
    backgroundColor: '#f9fafb',
    height: '100%',
  },
  header: {
    marginBottom: 24,
  },
  backButton: {
    marginBottom: 8,
  },
  backText: {
    color: '#212121',
    fontWeight: '500',
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#111827',
  },
  subTitle: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 4,
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    marginBottom: 24,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  cardSubTitle: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 16,
  },
  coinWrapper: {
    alignItems: 'center',
    marginBottom: 16,
  },
  chooseText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 12,
    color: '#374151',
  },
  choiceButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 8,
  },
  instructionsCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    elevation: 2,
  },
  instructionsTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    color: '#111827',
  },
  instructionsText: {
    fontSize: 14,
    color: '#4b5563',
  },
});

export default UserFlipCoin;
