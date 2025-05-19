import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  TextInput,
  ScrollView,
  ImageBackground,
} from 'react-native';
import HeaderBet from '../../../Header/HeaderBet';
import { router } from 'expo-router';
import creategame from '../../../../styles/creategame/creategame.styles';
import WheelSPins from '../../../../styles/spining/wheelspining.styles';
import bgs from "../../../../assets/images/games/image_fx_ (35) 1.png";
import { useGameContext } from '../../../../context/AppContext';

const SelectedWheel = () => {
  const [totalInput, setTotalInput] = useState('');
  const [selectedNumbers, setSelectedNumbers] = useState([]);
  const [winningNumbers, setWinningNumbers] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [buttonLabel, setButtonLabel] = useState('Check Result');

  const { gameData, updateGameData } = useGameContext();
  const { odds = '3.333', gameLabel, range, GameName = 'Wheel Spin' } = gameData || {};

  const totalAmount = parseFloat(totalInput) || 0;
  const admissionFee = totalAmount * 0.25;
  const stake = totalAmount + admissionFee;

  // Generate winning numbers on mount
  useEffect(() => {
    const nums  = [];
    while (nums.length < 3) {
      const rand = Math.floor(Math.random() * 10) + 1;
      if (!nums.includes(rand)) nums.push(rand);
    }
    setWinningNumbers(nums);
  }, []);

  const toggleNumber = (num) => {
    if (selectedNumbers.includes(num)) {
      setSelectedNumbers(selectedNumbers.filter(n => n !== num));
    } else if (selectedNumbers.length < 3) {
      setSelectedNumbers([...selectedNumbers, num]);
    }
  };

  const checkResult = () => {
    const sortedSelected = [...selectedNumbers].sort((a, b) => a - b);
    const sortedWinning = [...winningNumbers].sort((a, b) => a - b);
    const isWin = JSON.stringify(sortedSelected) === JSON.stringify(sortedWinning);

    setShowResult(true);

    if (isWin) {
      Alert.alert("Success", "You selected the correct numbers!");
      setButtonLabel("Go Back to Games");
    } else {
      Alert.alert("Not Successful", "Your selected numbers do not match.");
      setButtonLabel("Go to Losers Game");
    }
  };

  const handleFinalAction = () => {
    if (buttonLabel === 'Go Back to Games') {
      updateGameData({
        stake: stake.toFixed(2),
        odds: `${odds}x`,
        gameLabel: `${winningNumbers.join(', ')}`,
        GameName,
        range,
        result: gameLabel,
      });
      router.push('/(routes)/games/availablegames');
    } else {
      router.push('/(routes)/games/losersgame');
    }
  };

  return (
    <View style={{ height: '100%' }}>
      <HeaderBet amount={'200'} arrow name={GameName} />
      <ScrollView>
        <ImageBackground source={bgs} style={{ paddingBottom: 40 }}>
          <View style={WheelSPins.container}>
            <Text style={[creategame.title, { fontSize: 25, color: "#212121", textAlign: "left", width: "100%" }]}>Create Your Game</Text>
            <Text style={[creategame.subtitle, { textAlign: "left", width: "100%", marginBottom: 18, fontSize: 13 }]}>
              Select 3 numbers between 1–10 to match the winning numbers.
            </Text>

            <Text style={WheelSPins.header}>{GameName}</Text>

            {/* Number Selection Grid */}
            <View style={WheelSPins.numberGrid}>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((number) => {
                const isSelected = selectedNumbers.includes(number);
                return (
                  <TouchableOpacity
                    key={number}
                    onPress={() => toggleNumber(number)}
                    style={[
                      WheelSPins.numberBox,
                      {
                        backgroundColor: isSelected ? '#6B21A8' : '#e0e0e0',
                        borderWidth: isSelected ? 2 : 0,
                        borderColor: '#6B21A8',
                      },
                    ]}
                  >
                    <Text style={{ color: isSelected ? 'white' : '#212121', fontWeight: 'bold' }}>
                      {number}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <Text style={[WheelSPins.spinButtonText, { marginTop: 10 }]}>
              Winning Numbers: {showResult ? winningNumbers.join(', ') : '???'}
            </Text>
            <Text style={WheelSPins.spinButtonText}>Odds: {odds}</Text>

            {/* Action Button */}
            {selectedNumbers.length === 3 && (
              <TouchableOpacity
                onPress={showResult ? handleFinalAction : checkResult}
                style={[WheelSPins.spinButton, { marginTop: 20 }]}
              >
                <Text style={WheelSPins.spinButtonText}>{buttonLabel}</Text>
              </TouchableOpacity>
            )}

            {/* Total Amount Input */}
            <View style={WheelSPins.fullWidth}>
              <Text style={WheelSPins.sectionTitle}>Enter Total Amount</Text>
              <View style={WheelSPins.inputGroup}>
                <Text style={WheelSPins.inputLabel}>Total Amount (₦)</Text>
                <TextInput
                  style={WheelSPins.input}
                  placeholder="Enter total amount"
                  keyboardType="numeric"
                  value={totalInput}
                  placeholderTextColor={'gray'}
                  onChangeText={setTotalInput}
                />
              </View>
            </View>

            {/* How It Works */}
            <View style={WheelSPins.infoCard}>
              <View style={WheelSPins.cardContent}>
                <Text style={WheelSPins.cardTitle}>How It Works</Text>
                <Text style={WheelSPins.cardText}>
                  Select 3 numbers between 1–10. If they match the winning numbers exactly, you win. If not, you're redirected to the Losers Game.
                </Text>
              </View>
            </View>
          </View>
        </ImageBackground>
      </ScrollView>
    </View>
  );
};

export default SelectedWheel;
