import React, { useContext, useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Easing,
  TextInput,
  ScrollView,
  ImageBackground,
  ActivityIndicator,
  Alert,
} from 'react-native';
import HeaderBet from '../../../Header/HeaderBet';
import { router, useLocalSearchParams } from 'expo-router';
import creategame from '../../../../styles/creategame/creategame.styles';
import WheelSPins from '../../../../styles/spining/wheelspining.styles';
// import bgs from "../../../../assets";
import bgs from "../../../../assets/images/games/koefficienty.webp"
import FLipCoin from '../../../../styles/flipcoin/flipCoin';
import { useGameContext } from '../../../../context/AppContext';
import CustomInput from '../../../../components/Input/TextInput';
import { useRequest } from '../../../../hooks/useRequest';
import { AuthContext } from '../../../../context/AuthContext';

const NumberSpinWheel = () => {
  const spinValue = useRef(new Animated.Value(0)).current;
  const [totalInput, setTotalInput] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const {userDetails} = useContext(AuthContext);
 
  const [winningNumbers, setWinningNumbers] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const {loading, makeRequest} = useRequest()

  // Calculate admissionFee and stake from totalAmount
  const totalAmount = parseFloat(totalInput) || 0;
  const admissionFee = totalAmount * 0.25;
  const stake = totalAmount + admissionFee;

  const spinWheel = () => {
    setShowResult(false);
    spinValue.setValue(0);
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 3000,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start(() => {
      const winningNumbers = [];
      while (winningNumbers.length < 1) {
        const num = Math.floor(Math.random() * 10) + 1;
        if (!winningNumbers.includes(num)) {
          winningNumbers.push(num);
        }
      }
      setWinningNumbers(winningNumbers);
      setShowResult(true);
      setIsButtonDisabled(totalAmount === 0); // Enable if input is valid
    });
  };

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '1080deg'],
  });

  // const {  gameLabel, range, selected, } = useLocalSearchParams();
  const {  odds= '10',  gameLabel, range, GameName  = 'One Number Spin' } = gameData || {};
        const {gameData, updateGameData } = useGameContext();
        // const GameName = 'Wheel Spin' 
        // const odds = '10';

  const handlePublishGame = async() => {
  
    const formattedOdds = `${odds}x`;
    if(Number(stake) > userDetails.wallet_balance){
          return Alert.alert('Sorry', 'You do not have sufficient funds. Please deposit and try again');
        }
 
    const res  = await makeRequest('/create-game', {
      name: "One Number Spin",
      odds,
      winningNumber: winningNumbers[0],
      stake,
    })
    if(res.response.status){
      Alert.alert('Success', 'Game Created Successfully');
       setTimeout(() => {
      router.replace( '/(routes)/games/availablegames')
      // updateGameData({
      //   stake: stake.toFixed(2),
      //     odds: formattedOdds,
      //     gameLabel: `${winningNumbers.join(', ')}`,
      //     GameName,
      //     range,
      //     result: gameLabel,
      // });

    }, 2000);
    }
    
  };

  return (
    <View style={{ height: '100%' }}>
      <HeaderBet amount={'200'} arrow name={GameName} />
      <ScrollView>
        {/* <ImageBackground source={bgs} style={{ paddingBottom: 40 }}> */}
          <View style={WheelSPins.container}>
            <Text style={[creategame.title, { fontSize: 25, color: "#212121", textAlign: "left", width: "100%" }]}>Create Your Game</Text>
            <Text style={[creategame.subtitle, { textAlign: "left", width: "100%", marginBottom: 18, fontSize: 13 }]}>
              Spin the wheel and set your total stake as The House
            </Text>

            <Text style={WheelSPins.header}>{GameName}</Text>
            <View style={WheelSPins.triangle} />

            <Animated.View style={[WheelSPins.outerCircles, 
                       
                { transform: [{ rotate: spin }] }
                ]}>
              <View style={WheelSPins.innerCircle}>
                {showResult ? (
                  <View style={{ marginTop: 24, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 12 }}>Winning Number</Text>
                    <View style={{ flexDirection: 'row', gap: 12 }}>
                      {winningNumbers.map((num, idx) => (
                        <View
                          key={idx}
                          style={{
                            width: 40,
                            height: 40,
                            borderRadius: 7,
                            backgroundColor: '#000',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginHorizontal: 5,
                          }}>
                          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>{num}</Text>
                        </View>
                      ))}
                    </View>
                  </View>
                ) : (
                  <View style={WheelSPins.numberGrids}>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((number) => (
                      <View key={number} style={WheelSPins.numberBox}>
                        <Text style={WheelSPins.numberText}>{number}</Text>
                      </View>
                    ))}
                  </View>
                )}
              </View>
            </Animated.View>

            <View style={{ flexDirection: 'row', gap: 5 }}>
              <Text style={{ color: '#000', fontWeight: 'bold', fontSize: 16 }}>Result:</Text>
              {winningNumbers.map((num, idx) => (
                <View key={idx}>
                  <Text style={[WheelSPins.spinButtonText,{color:'#000'}]}>{num}</Text>
                </View>
              ))}
            </View>
            <Text style={[WheelSPins.spinButtonText,{color:'#000'}]}>Odds: {odds}</Text>

            <TouchableOpacity onPress={spinWheel} style={WheelSPins.spinButton}>
              <Text style={[WheelSPins.spinButtonText,{color:'#fff'}]}>Spin Wheel</Text>
            </TouchableOpacity>

            <View style={WheelSPins.fullWidth}>
              <Text style={[WheelSPins.sectionTitle,{color:'#333'}]}>Enter Total Amount</Text>
              <View style={WheelSPins.inputGroup}>
                <Text style={[WheelSPins.inputLabel,{color:'#333'}]}>Total Amount (₦)</Text>
                
                 <CustomInput
                  style={WheelSPins.input}
                  placeholder="Enter total amount"
                  keyboardType="numeric"
                  value={totalInput}
                  placeholderTextColor={'gray'}
                  onChangeText={(text) => {
                    setTotalInput(text);
                    setIsButtonDisabled(!text || !showResult || isNaN(Number(text)));
                  }}
                />

                
              </View>

              <View style={creategame.summary}>
                <View style={WheelSPins.rowBetween}>
                  <Text style={creategame.summaryText}>Admission Fee (25%)</Text>
                  <Text style={creategame.summaryText}>₦{admissionFee.toFixed(2)}</Text>
                </View>
                <View style={WheelSPins.rowBetween}>
                  <Text style={WheelSPins.totalLabel}>Your Stake</Text>
                  <Text style={WheelSPins.totalValue}>₦{stake.toFixed(2)}</Text>
                </View>
                <View style={WheelSPins.wallet}>
                  <Text style={WheelSPins.walletText}>
                    Your wallet balance: <Text style={WheelSPins.walletAmount}>₦150,000</Text>
                  </Text>
                </View>
                <TouchableOpacity
                  style={[
                    FLipCoin.button,
                    isButtonDisabled && WheelSPins.publishButton,
                    {width:"100%",justifyContent:"center",alignItems:"center"}
                  ]}
                  disabled={isButtonDisabled}
                  onPress={handlePublishGame}
                  >
                  {loading ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <Text style={WheelSPins.publishText}>Publish Game</Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>

            <View style={WheelSPins.infoCard}>
              <View style={WheelSPins.cardContent}>
                <Text style={WheelSPins.cardTitle}>How It Works</Text>
                <Text style={WheelSPins.cardText}>
                  Spin the wheel to randomly select one winning winningNumber from 1–10. Players will bet
                  against your result with odds of 10. If they guess any of the winningNumbers, they win. If not, you win.
                </Text>
              </View>
            </View>
          </View>
        {/* </ImageBackground> */}
      </ScrollView>
    </View>
  );
};

export default NumberSpinWheel;
