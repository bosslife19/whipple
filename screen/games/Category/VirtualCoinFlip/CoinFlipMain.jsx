import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  TextInput,
  Alert,
  ScrollView,
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import HeaderBet from '../../../Header/HeaderBet';
import FLipCoin from '../../../../styles/flipcoin/flipCoin';

const MIN_STAKE = 200;
const MAX_STAKE = 100000;

const FlipTheCoin = () => {
  const { gameLabel, range, totalOdds, result: initialResult, GameName = 'Flip The Coin' } = useLocalSearchParams();
  
  const router = useRouter();
  const [flipResult, setFlipResult] = useState(null); // renamed to flipResult
  const [isFlipping, setIsFlipping] = useState(false);
  const [stake, setStake] = useState('');
  const [walletBalance] = useState(150000);
  const [quickAmounts] = useState([200, 500, 1000, 2000, 5000, 10000]);

  const rotation = useRef(new Animated.Value(0)).current;

  const handleFlip = () => {
    if (isFlipping) return;

    const numericStake = parseInt(stake);
    if (isNaN(numericStake) || numericStake < MIN_STAKE) {
      Alert.alert('Invalid Stake', `Minimum stake is ₦${MIN_STAKE}`);
      return;
    }

    setIsFlipping(true);
    setFlipResult(null);
    rotation.setValue(0);

    Animated.timing(rotation, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start(() => {
      const newResult = Math.random() < 0.5 ? 'heads' : 'tails';
      setFlipResult(newResult);
      setIsFlipping(false);
    });
  };

  const rotateY = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const handleStakeChange = (amount) => {
    let current = parseInt(stake) || 0;
    let updated = current + amount;
    if (updated < MIN_STAKE) updated = MIN_STAKE;
    if (updated > MAX_STAKE) updated = MAX_STAKE;
    setStake(String(updated));
  };

  const setQuickAmount = (amt) => {
    const value = Math.min(Math.max(amt, MIN_STAKE), MAX_STAKE);
    setStake(String(value));
  };

  const stakeValue = parseInt(stake) || 0;
  const admissionFee = Math.round(stakeValue * 0.25);
  const totalAmount = stakeValue + admissionFee;

  const handlePublish = () => {
    if (!stake || !flipResult) {
      Alert.alert('Incomplete', 'Flip the coin and enter a stake first.');
      return;
    }
  
    const parsedTotalOdds = '2.0';
    const gameLabel = flipResult; // use flipResult as label
    const range = ''; // Optional or unused
    const selectedNumbers = []; // Optional or unused
  
    router.push({
      pathname: '/(routes)/games/availablegames',
      params: {
        stake: stake.toString(),
        odds: parsedTotalOdds + 'x',
        gameLabel,
        GameName,
        range,
        selected: selectedNumbers.join(','),
        result: flipResult, // ✅ added this line
      },
    });
  };
  

  return (
    <>
      <HeaderBet arrow name={GameName} backgroundColor="#EEF6FF" amount={200} />
      <ScrollView style={{ backgroundColor: '#EEF6FF' }}>
        <View style={FLipCoin.container}>
          <Animated.View style={[FLipCoin.coinContainer, { transform: [{ rotateY }] }]}>
            <View style={[FLipCoin.coinFace, FLipCoin.coinBase]}>
              <Text style={FLipCoin.coinText}>
                {flipResult === 'heads' ? 'H' : flipResult === 'tails' ? 'T' : 'H'}
              </Text>
            </View>
          </Animated.View>

          <TouchableOpacity style={FLipCoin.button} onPress={handleFlip} disabled={isFlipping}>
            <FontAwesome5 name="coins" size={16} color="white" style={{ marginRight: 8 }} />
            <Text style={FLipCoin.buttonTexts}>{GameName}</Text>
          </TouchableOpacity>

          {flipResult && (
            <View style={FLipCoin.resultContainer}>
              <Text style={FLipCoin.resultText}>Result: <Text style={{ textTransform: 'uppercase' }}>{flipResult}</Text></Text>
              <Text style={FLipCoin.odds}>Odds: 2.0</Text>
            </View>
          )}

          <View style={FLipCoin.card}>
            <View style={FLipCoin.amountControls}>
              <View style={FLipCoin.controlView}>
                <Text style={FLipCoin.controlLabel}> {MIN_STAKE} ₦</Text>
                <Text style={[FLipCoin.controlLabel, { fontWeight: '400' }]}>Min </Text>
              </View>
              <View style={FLipCoin.amountButtons}>
                <TouchableOpacity onPress={() => handleStakeChange(-100)}>
                  <Text style={FLipCoin.amountControlBtn}>−</Text>
                </TouchableOpacity>
                <Text style={FLipCoin.controlLabel}>Bet </Text>
                <TouchableOpacity onPress={() => handleStakeChange(100)}>
                  <Text style={FLipCoin.amountControlBtn}>+</Text>
                </TouchableOpacity>
              </View>
              <View style={FLipCoin.controlView}>
                <Text style={FLipCoin.controlLabel}>{MAX_STAKE.toLocaleString()} ₦</Text>
                <Text style={[FLipCoin.controlLabel, { fontWeight: '400' }]}>Max </Text>
              </View>
            </View>

            <View style={FLipCoin.quickAmounts}>
              {quickAmounts.map((amt) => (
                <TouchableOpacity key={amt} style={FLipCoin.quickBtn} onPress={() => setQuickAmount(amt)}>
                  <Text style={FLipCoin.quickBtnText}>₦{amt.toLocaleString()}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <TextInput
              keyboardType="numeric"
              placeholder="Enter stake amount"
              style={FLipCoin.input}
              value={stake}
              onChangeText={setStake}
            />
            <TouchableOpacity style={[FLipCoin.button, { marginTop: 16 }]} onPress={handlePublish}>
              <Text style={FLipCoin.buttonText}>Publish Game</Text>
            </TouchableOpacity> 
            <View style={FLipCoin.totals}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 15 }}>
                <Text style={[FLipCoin.walletText, { fontWeight: '600', fontSize: 16, paddingHorizontal: 15, paddingVertical: 6 }]}>
                  My bets
                </Text>
                <Text style={[FLipCoin.walletText, { fontWeight: '600', fontSize: 16, backgroundColor: '#4C6388', paddingHorizontal: 15, paddingVertical: 6, borderRadius: 5 }]}>
                  Submission
                </Text>
              </View>
              <View style={FLipCoin.totalRow}>
                <Text style={FLipCoin.totalLabel}>Admission Fee (25%)</Text>
                <Text style={FLipCoin.totalValue}>₦{admissionFee.toLocaleString()}</Text>
              </View>
              <View style={FLipCoin.totalRow}>
                <Text style={[FLipCoin.totalLabel, { fontWeight: '600' }]}>Total Amount</Text>
                <Text style={[FLipCoin.totalValue, { fontWeight: '700' }]}>₦{totalAmount.toLocaleString()}</Text>
              </View>
              <View style={FLipCoin.totalRow}>
                <Text style={FLipCoin.walletText}>Your wallet balance:</Text>
                <Text style={[FLipCoin.walletText, { fontWeight: '600' }]}>₦{walletBalance.toLocaleString()}</Text>
              </View>
            </View>
          </View>

          <View style={FLipCoin.infoBox}>
            <Text style={FLipCoin.infoTitle}>How It Works</Text>
            <Text style={FLipCoin.infoText}>
              Flip the coin and set your stake. Players will bet against your result with odds of 2.0. If they guess right, they win. If they’re wrong, you win.
            </Text>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default FlipTheCoin;
