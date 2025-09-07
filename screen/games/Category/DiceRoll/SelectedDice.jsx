import React, { useState, useRef } from 'react'; 
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Animated,
  Easing,
  Alert,
} from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import Header from '../../../Header/Header';
import { router, useLocalSearchParams } from 'expo-router';
import { useGameContext } from '../../../../context/AppContext';
import Losingmodal from '../../../loseModal/LoseModal';
import Winningmodal from '../../../winningmodal/winningmodal';
import dicestyles from '../../../../styles/diceGame/dice.styles';
import {useRequest} from '../../../../hooks/useRequest'
import { useEffect } from 'react';
import axiosClient from '../../../../axiosClient';

const SelectedDiceRoll = () => {
  const { updateGameData, gameData } = useGameContext();
  
  const {makeRequest, loading} = useRequest()

  const [diceType, setDiceType] = useState('single');
  const [diceRolled, setDiceRolled] = useState(false);
  const [face1, setFace1] = useState(0);
  const [face2, setFace2] = useState(0);
  const [houseRoll, setHouseRoll] = useState(null);
  const [userRoll, setUserRoll] = useState(null);
  const [rolling, setRolling] = useState(false);
  const [result, setResult] = useState(null);
  const [visible, setModalVisibled] = useState(false);
  const [game, setGame] = useState(null);
 
  const spinValue1 = useRef(new Animated.Value(0)).current;
  const spinValue2 = useRef(new Animated.Value(0)).current;

  const {id, name} = useLocalSearchParams();

      useEffect(()=>{
   const getGame = async ()=>{
          const res = await axiosClient.get(`/get-game/${id}`);
          
  
          setGame(res.data.game)
  
        }
  
        getGame();
      }, [])
  

  const closeModal = () => {
    setModalVisibled(false);
  };

  const rollDice = () => {
    setRolling(true);
    setDiceRolled(false);

    const newFace1 = Math.floor(Math.random() * 6) + 1;
    const newFace2 = Math.floor(Math.random() * 6) + 1;
    const houseFace1 = Math.floor(Math.random() * 6) + 1;
    const houseFace2 = Math.floor(Math.random() * 6) + 1;

    spinValue1.setValue(0);
    spinValue2.setValue(0);

    Animated.parallel([
      Animated.timing(spinValue1, {
        toValue: 1,
        duration: 1000,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true,
      }),
      Animated.timing(spinValue2, {
        toValue: 1,
        duration: 1000,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true,
      }),
    ]).start(() => {
      setFace1(newFace1);
      setFace2(newFace2);

      const userTotal = diceType === 'single' ? newFace1 : newFace1 + newFace2;
      const houseTotal = diceType === 'single' ? houseFace1 : houseFace1 + houseFace2;

      setHouseRoll(houseTotal);
      setUserRoll(userTotal);
      setRolling(false)
    
      makeRequest('/deduct-balance', {amount:game.stake/game.odds}).then(res=>{
        if(res.error){
          return Alert.alert('Sorry', res.error);
        }
        if(res.response.status){
                 makeRequest('/play-game',{
      name,
      numberRolled: userTotal,
      gameId: id
      


    } ).then((res)=>{
     
     
      if(res.error){
        
        setFace1(0)
        setFace2(0)
        return Alert.alert('Error', res.error);
      }
      if(res.response.success){
        console.log('truee')
        setResult("win")
      }else if(res.response.success ===false){
        
        setResult("lose")
      }

      setModalVisibled(true);

      
 setDiceRolled(true);
    })
        }
      }).catch(e=>{
        console.log(e);
        Alert.alert('Error', 'Server Error');
      })


     
      // const gameResult = userTotal === houseTotal ? 'win' : 'lose';
      // setResult(gameResult);
      // setModalVisibled(true);
      // setRolling(false);
    });
  };

  const spin1 = spinValue1.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '1080deg'],
  });

  const spin2 = spinValue2.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '1080deg'],
  });

  const dotLayouts = {
    1: [[1, 1]],
    2: [[0, 0], [2, 2]],
    3: [[0, 0], [1, 1], [2, 2]],
    4: [[0, 0], [0, 2], [2, 0], [2, 2]],
    5: [[0, 0], [0, 2], [1, 1], [2, 0], [2, 2]],
    6: [[0, 0], [1, 0], [2, 0], [0, 2], [1, 2], [2, 2]],
  };

  const getDots = (face) => {
    if (!diceRolled) {
      return (
        <View style={[dicestyles.diceFace, styles.center]}>
          <Text style={styles.questionMark}>?</Text>
        </View>
      );
    }

    const size = 3;
    const grid = Array(size)
      .fill(null)
      .map((_, row) =>
        Array(size)
          .fill(null)
          .map((_, col) => {
            const shouldRenderDot = dotLayouts[face].some(
              (dot) => dot[0] === row && dot[1] === col
            );
            return (
              <View
                key={`${row}-${col}`}
                style={[dicestyles.dotCell, shouldRenderDot && dicestyles.dot]}
              />
            );
          })
      );

    return grid.map((row, i) => (
      <View key={i} style={dicestyles.dotRow}>
        {row}
      </View>
    ));
  };

  const getOdds = () => {
    if (!diceRolled) return null;
    if (diceType === 'single') return 5.988;
    const sum = face1 + face2;
    switch (sum) {
      case 12: return 35.714;
      case 11: return 17.857;
      case 10: return 12.048;
      case 9: return 9.009;
      case 8: return 7.194;
      case 7: return 5.988;
      case 6: return 7.194;
      case 5: return 9.009;
      case 4: return 12.048;
      case 3: return 17.857;
      case 2: return 35.714;
      default: return 0;
    }
  };

  const handleGoGames = () => {
    
    router.replace('/(routes)/games/LostGames/ViewLostGames');
  };

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
          style={[styles.rollButton]}
        onPress={() => router.replace('/(routes)/games/category/category-main')}
        >
          <Text style={styles.rollButtonText}>Go Back to Games</Text>
        </TouchableOpacity>
      );
    }

    if (result === 'lose') {
      return (
        <TouchableOpacity
          style={[styles.rollButton]}
          onPress={handleGoGames}
        >
          <Text style={styles.rollButtonText}>Go to Loser’s Game</Text>
        </TouchableOpacity>
      );
    }

    return (
      <TouchableOpacity style={styles.rollButton} onPress={rollDice}>
        <Text style={styles.rollButtonText}>Roll Dice</Text>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <Header name={'Back to Game Selection'} backgroundColor="#4a69bd" />
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>Dice Roll Game</Text>
        <Text style={styles.subtitle}>Roll the dice and try to match the House's outcome</Text>

        <View style={dicestyles.card}>
          <Text style={dicestyles.title}>Roll The Dice</Text>

          <View style={dicestyles.radioGroup}>
            {
              game?.dice_type ==='single' &&            <TouchableOpacity style={dicestyles.radio} onPress={() => setDiceType('single')}>
              <View style={[dicestyles.radioDot, diceType === 'single' && dicestyles.radioDotSelected]}>
                {diceType === 'single' && (
                  <Svg width={10} height={10}><Circle cx={5} cy={5} r={5} fill="#0a1931" /></Svg>
                )}
              </View>
              <Text style={styles.radioLabel}>Single Dice</Text>
            </TouchableOpacity>
            }

            {
              game?.dice_type ==='double' &&  <TouchableOpacity style={dicestyles.radio} onPress={() => setDiceType('double')}>
              <View style={[dicestyles.radioDot, diceType === 'double' && dicestyles.radioDotSelected]}>
                {game?.dice_type === 'double' && (
                  <Svg width={10} height={10}><Circle cx={5} cy={5} r={5} fill="#0a1931" /></Svg>
                )}
              </View>
              <Text style={styles.radioLabel}>Double Dice</Text>
            </TouchableOpacity>
            }
          
          </View>

          <View style={styles.diceRow}>
            <Animated.View style={[dicestyles.diceBox, styles.diceShadow, { transform: [{ rotate: spin1 }] }]}>
              {/* {} */}
              {
                face1 ? <Text>{face1}</Text>:getDots(face1)
              }
              
            </Animated.View>
            {game?.dice_type === 'double' && (
              <Animated.View style={[dicestyles.diceBox, styles.diceShadow, { transform: [{ rotate: spin2 }] }]}>
                {/* {getDots(face2)} */}
                {
                  face2 ? <Text>{face2}</Text>:getDots(face1)
                }
              </Animated.View>
            )}
          </View>

          {diceRolled && userRoll !== null && houseRoll !== null && (
            <View style={dicestyles.resultInfo}>
              <Text style={dicestyles.result}>
                Result: {face1} {diceType === 'double' && `and ${face2}`}
              </Text>
              <Text style={[dicestyles.odds, styles.totalText]}>
                Total: {diceType === 'double' ? face1 + face2 : face1}
              </Text>
              <Text style={dicestyles.odds}>Odds: {getOdds()}</Text>
            </View>
          )}

          {renderButton()}
        </View>

 
        {/* Winning and Losing Modals */}
        <Winningmodal visible={visible && result === 'win'} closeModal={closeModal} />
        <Losingmodal visible={visible && result === 'lose'} closeModal={closeModal} />
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#e9f0fb',
    flexGrow: 1,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#0a1931',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#4a69bd',
    textAlign: 'center',
    marginBottom: 20,
  },
  radioLabel: {
    fontSize: 16,
    color: '#0a1931',
    marginLeft: 8,
    fontWeight: '600',
  },
  diceRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 24,
    gap: 16,
  },
  diceShadow: {
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 5,
    borderRadius: 12,
  },
  rollButton: {
    backgroundColor: '#0A1931',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 16,
    
  },
  rollButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 18,
  },
 
  questionMark: {
    fontSize: 48,
    color: '#777',
    fontWeight: 'bold',
  },
  resultTextBox: {
    marginTop: 24,
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#f7f9fc',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#d0d7e6',
  },
  resultText: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 8,
  },
  winText: {
    color: '#27ae60',
  },
  loseText: {
    color: '#c0392b',
  },
  rollsText: {
    fontSize: 18,
    color: '#34495e',
    marginTop: 4,
  },
  totalText: {
    marginTop: 4,
    fontWeight: '700',
  },
});

export default SelectedDiceRoll;
