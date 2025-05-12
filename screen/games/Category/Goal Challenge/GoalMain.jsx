import React, { useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Animated, Image, ImageBackground, ScrollView } from 'react-native';
import { Goal } from 'lucide-react-native';
import WheelSPins from '../../../../styles/spining/wheelspining.styles';
import creategame from '../../../../styles/creategame/creategame.styles';
import FLipCoin from '../../../../styles/flipcoin/flipCoin';
import { TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../../../Header/Header';
import { useGameContext } from '../../../../context/AppContext';
import Goalstyles from '../../../../styles/Goal.styles';
// import goalpost from ''
const { width } = Dimensions.get('window');
const segmentWidth = width - 20;

const GoalMain = () => {
  const ballBottom = useRef(new Animated.Value(24)).current;
  const ballLeft = useRef(new Animated.Value(segmentWidth / 2 - 20)).current;
  
  const [isBallUp, setIsBallUp] = useState(false);
  const [previousPositions, setPreviousPositions] = useState(new Set());
  const [shotMessage, setShotMessage] = useState("");

    const { gameData, updateGameData } = useGameContext();
  
  const shootBall = () => {
    if (!isBallUp) {
      let random = Math.floor(Math.random() * 3);

      while (previousPositions.has(random)) {
        random = Math.floor(Math.random() * 3);
      }

      let targetLeft;
      let message = "";

      if (random === 0) {
        targetLeft = segmentWidth / 6 - 10;
        message = "Goal to the left!";
      } else if (random === 1) {
        targetLeft = segmentWidth / 2 - 40;
        message = "Goal to the center!";
      } else {
        targetLeft = (segmentWidth * 5) / 6 - 50;
        message = "Goal to the right!";
      }

      setPreviousPositions(new Set(previousPositions).add(random));
      setShotMessage(message);

      Animated.parallel([
        Animated.timing(ballLeft, {
          toValue: targetLeft,
          duration: 700,
          useNativeDriver: false,
        }),
        Animated.timing(ballBottom, {
          toValue: 170,
          duration: 700,
          useNativeDriver: false,
        }),
      ]).start(() => {
        setIsBallUp(true);
      });
    } else {
      Animated.parallel([
        Animated.timing(ballLeft, {
          toValue: segmentWidth / 2 - 30,
          duration: 700,
          useNativeDriver: false,
        }),
        Animated.timing(ballBottom, {
          toValue: 24,
          duration: 700,
          useNativeDriver: false,
        }),
      ]).start(() => {
        setIsBallUp(false);
        setPreviousPositions(new Set());
        setShotMessage("");
      });
    }
  };


    //  AMount and Button
    const [totalInput, setTotalInput] = useState('');
    const [admissionFee, setAdmissionFee] = useState(0);
    const [stake, setStake] = useState(0);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [loading, setLoading] = useState(false);
    const [showResult, setShowResult] = useState(true); // assuming true for now
  
    
    const handlePublishGame = () => {
      setLoading(true);
      // Simulate an API call
      setTimeout(() => {
        updateGameData({
            selectedBox,
            stake: totalAmount,
            odds: mainOdd,
            GameName,
            gameLabel: `${selectedGoal} is the winning box`,
          });
      
        setLoading(false);
       }, 2000);
    };
  
    const handleTotalInputChange = (text) => {
      const numericValue = parseFloat(text);
      setTotalInput(text);
  
      if (!isNaN(numericValue)) {
        const admission = numericValue * 0.25;
        const stakeValue = numericValue - admission;
        setAdmissionFee(admission);
        setStake(stakeValue);
        setIsButtonDisabled(!showResult || isNaN(numericValue));
      } else {
        setAdmissionFee(0);
        setStake(0);
        setIsButtonDisabled(true);
      }
    };

  return (
    <View style={{height:"100%"}}>
    <Header name={'Goal Challenge'}/>
    <ScrollView>
    <View style={Goalstyles.card}>
          <Text style={Goalstyles.header}>Shoot The Ball</Text>

          <ImageBackground source={require('../../../../assets/images/games/football-field.png')} style={Goalstyles.field}>
              {/* Header Segments */}
              <View style={Goalstyles.fieldHeader}>
                  <View style={Goalstyles.segment}>
                    <Image style={Goalstyles.segmentText} source={require('../../../../assets/images/games/goal-post.png')} />
                      {/* <Text style={Goalstyles.segmentText}>Left</Text> */}
                  </View>
                  <View style={Goalstyles.segment}>
                  <Image style={Goalstyles.segmentText} source={require('../../../../assets/images/games/goal-post.png')} />
                  </View>
                  <View style={Goalstyles.segment}>
                  <Image style={Goalstyles.segmentText} source={require('../../../../assets/images/games/goal-post.png')} />
                  </View>
              </View>

              {/* Ball */}
              <Animated.View style={[Goalstyles.ballWrapper, { bottom: ballBottom, left: ballLeft }]}>
              <Ionicons name="football" size={24} color="white" />
              </Animated.View>
          </ImageBackground>

          <TouchableOpacity style={Goalstyles.button} onPress={shootBall}>
              <Goal size={16} color="#fff" style={{ marginRight: 8 }} />
              <Text style={Goalstyles.buttonText}>Shoot Ball</Text>
          </TouchableOpacity>

          {/* Directional Message */}
          <Text style={Goalstyles.message}>{shotMessage}</Text>
          
          <View>
              <View style={WheelSPins.inputGroup}>
              <Text style={[WheelSPins.cardTitle,{color:"#212121"}]}>Enter Total Amount</Text>
                  <TextInput
                      style={creategame.input}
                      placeholder="Enter total amount"
                      keyboardType="numeric"
                      value={totalInput}
                      placeholderTextColor={'gray'}
                      onChangeText={handleTotalInputChange}                      />
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
                          { width: "100%", justifyContent: "center", alignItems: "center" }
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
                      Spin the wheel to randomly select three winning winningNumbers from 1–10. Players will bet
                      against your result with odds of 3.333. If they guess any of the winningNumbers, they win. If not, you win.
                  </Text>
              </View>
     </View>
      </View>
    
     </ScrollView>
    </View>
  
  );
};


export default GoalMain;
