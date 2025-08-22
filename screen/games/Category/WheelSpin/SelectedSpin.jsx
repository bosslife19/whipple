import React, { useContext, useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Easing,
  ScrollView,
  ImageBackground,
} from 'react-native';
import HeaderBet from '../../../Header/HeaderBet';
import { router } from 'expo-router';
import creategame from '../../../../styles/creategame/creategame.styles';
import WheelSPins from '../../../../styles/spining/wheelspining.styles';
import bgs from '../../../../assets/images/games/image_fx_ (35) 1.png';
import { useGameContext } from '../../../../context/AppContext';
import Losingmodal from '../../../loseModal/LoseModal';
import Winningmodal from '../../../winningmodal/winningmodal';
import { AuthContext } from '../../../../context/AuthContext';

const SpinTheWheel = () => {
  const spinValue = useRef(new Animated.Value(0)).current;
  const lastResultWasWin = useRef(null);

  const [totalInput, setTotalInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [winningNumbers, setWinningNumbers] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [success, setSuccess] = useState(null);
  const [visible, setModalVisible] = useState(false);
  const [selectedNumbers, setSelectedNumbers] = useState([]); // Start empty

  const { gameData, updateGameData } = useGameContext();
  const { odds = '3.333', gameLabel, range, GameName = 'Wheel Spin' } = gameData || {};
  const {userDetails} = useContext(AuthContext);

  const totalAmount = parseFloat(totalInput) || 0;
  const admissionFee = totalAmount * 0.25;
  const stake = totalAmount + admissionFee;

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '1080deg'],
  });

  const toggleNumber = (num) => {
    if (selectedNumbers.includes(num)) {
      // Deselect number
      setSelectedNumbers(selectedNumbers.filter((n) => n !== num));
    } else {
      // Select number (limit to 3)
      if (selectedNumbers.length < 1) {
        setSelectedNumbers([...selectedNumbers, num]);
      }
    }
  };

  const spinWheel = () => {
    if (selectedNumbers.length !== 1) {
      alert('Please select exactly 3 numbers before spinning.');
      return;
    }

    setShowResult(false);
    spinValue.setValue(0);

    Animated.timing(spinValue, {
      toValue: 1,
      duration: 3000,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start(() => {
      const result = [];
      while (result.length < 1) {
        const num = Math.floor(Math.random() * 10) + 1;
        if (!result.includes(num)) {
          result.push(num);
        }
      }
      setWinningNumbers(result);
      checkResult(result);
    });
  };

  const checkResult = (result) => {
    const sortedSelected = [...selectedNumbers].sort((a, b) => a - b);
    const sortedWinning = [...result].sort((a, b) => a - b);
    const isWin = JSON.stringify(sortedSelected) === JSON.stringify(sortedWinning);

    lastResultWasWin.current = isWin;
    setSuccess(isWin);
    setModalVisible(true);
    setShowResult(true);
  };

  const handlePublishGame = () => {
    if(Number(stake) > userDetails.wallet_balance){
      return Alert.alert('Sorry', 'You do not have sufficient funds. Please deposit and try again');
    }
    setLoading(true);
    const formattedOdds = `${odds}x`;

    setTimeout(() => {
      updateGameData({
        stake: stake.toFixed(2),
        odds,
        gameLabel ,
        GameName,
       isGameLost: true,
      });

      setLoading(false);
      router.push('/(routes)/games/availablegames');
    }, 2000);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSuccess(null);
  };

  const handleSpinButtonPress = () => {
    if (showResult) {
      if (lastResultWasWin.current) {
       router.push('/(routes)/games/category/category-main')
      } else {
         updateGameData({
        stake: stake.toFixed(2),
        odds,
        gameLabel: winningNumbers.join(', '),
        GameName,
       isGameLost: true,
      });
        router.push('/(routes)/games/LostGames/ViewLostGames');
      }
    } else { 
      spinWheel();
    }
  };

  return (
    <View style={{ height: '100%' }}>
      <HeaderBet amount={'200'} arrow name={GameName} />
      <ScrollView>
        <ImageBackground source={bgs} style={{ paddingBottom: 40 }}>
          <View style={WheelSPins.container}>
            <Text style={[creategame.subtitle, { fontSize: 13 }]}>Spin the wheel</Text>
            <Text style={WheelSPins.header}>{GameName}</Text>
            <View style={WheelSPins.triangle} />

            <Animated.View
              style={[WheelSPins.outerCircle, { transform: [{ rotate: spin }] }]}
            >
              <View style={WheelSPins.innerCircle}>
                {showResult ? (
                  <View style={{ marginTop: 24, alignItems: 'center' }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Winning Numbers</Text>
                    <View style={{ flexDirection: 'row', gap: 12 }}>
                      {winningNumbers.map((num, idx) => (
                        <View
                          key={idx}
                          style={{
                            width: 40,
                            height: 40,
                            borderRadius: 20,
                            backgroundColor: '#6B21A8',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginHorizontal: 5,
                          }}
                        >
                          <Text style={{ color: 'white', fontWeight: 'bold' }}>{num}</Text>
                        </View>
                      ))}
                    </View>
                  </View>
                ) : (
                  <View style={{ marginTop: 40 }}>
                    <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>
                      Spin to reveal winning numbers
                    </Text>
                  </View>
                )}
              </View>
            </Animated.View>

            {/* Number Selection Grid BELOW the wheel */}
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'center',
                marginTop: 20,
                gap: 12,
              }}
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => {
                const isSelected = selectedNumbers.includes(num);
                return (
                  <TouchableOpacity
                    key={num}
                    onPress={() => toggleNumber(num)}
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 25,
                      backgroundColor: isSelected ? '#6B21A8' : '#ddd',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderWidth: isSelected ? 2 : 1,
                      borderColor: isSelected ? '#4ADE80' : '#999',
                    }}
                  >
                    <Text
                      style={{
                        color: isSelected ? 'white' : '#333',
                        fontWeight: 'bold',
                        fontSize: 18,
                      }}
                    >
                      {num}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <TouchableOpacity
              onPress={handleSpinButtonPress}
              style={[
                WheelSPins.spinButton,
                selectedNumbers.length !== 1 && !showResult
                  ? { backgroundColor: '#bbb' }
                  : null,
              ]}
              disabled={selectedNumbers.length !== 1 && !showResult}
            >
              <Text style={WheelSPins.spinButtonText}>
                {showResult
                  ? lastResultWasWin.current
                    ? 'Go to Games'
                    : "Go to Loser's Game"
                  : 'Spin Wheel'}
              </Text>
            </TouchableOpacity>

            <View style={[WheelSPins.infoCard, { padding: 10 }]}>
              <Text style={WheelSPins.cardTitle}>How It Works</Text>
              <Text style={WheelSPins.cardText}>
                Spin the wheel to randomly select three winning numbers from 1–10. Players bet
                against your result with odds of 3.333. If they guess any of the numbers, they win.
                If not, you win.
              </Text>
            </View>
          </View>
        </ImageBackground>
      </ScrollView>

      {success === true && <Winningmodal visible={visible} closeModal={closeModal} />}
      {success === false && <Losingmodal visible={visible} closeModal={closeModal} />}
    </View>
  );
};

export default SpinTheWheel;
