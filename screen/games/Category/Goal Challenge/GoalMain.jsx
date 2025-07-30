import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
  ImageBackground,
  ScrollView,
  TextInput,
  ActivityIndicator,
  Image,
  Alert,
} from 'react-native';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
// import { Goal } from 'lucide-react-native';

import Header from '../../../Header/Header';
import { useGameContext } from '../../../../context/AppContext';

// Styles
import WheelSPins from '../../../../styles/spining/wheelspining.styles';
import creategame from '../../../../styles/creategame/creategame.styles';
import FLipCoin from '../../../../styles/flipcoin/flipCoin';
import Goalstyles from '../../../../styles/Goal.styles';
import { router } from 'expo-router';
import CustomInput from '../../../../components/Input/TextInput';
import { useRequest } from '../../../../hooks/useRequest';

const { width } = Dimensions.get('window');
const segmentWidth = width - 20;

const GoalMain = () => {
  const ballBottom = useRef(new Animated.Value(24)).current;
  const ballLeft = useRef(new Animated.Value(segmentWidth / 2 - 20)).current;
  const {makeRequest, loading} = useRequest()

  const [isBallUp, setIsBallUp] = useState(false);
  const [previousPositions, setPreviousPositions] = useState(new Set());
  const [shotMessage, setShotMessage] = useState('');
  const [selectedGoal, setSelectedGoal] = useState('');
  const [mainOdd, setMainOdd] = useState('3.003x');
  const GameName = 'Goal Challenge';

  const { gameData, updateGameData } = useGameContext();

  const shootBall = () => {
    if (!isBallUp) {
      let random = Math.floor(Math.random() * 3);

      while (previousPositions.has(random)) {
        random = Math.floor(Math.random() * 3);
      }

      let targetLeft;
      let message = '';
      let goalPos = '';

      if (random === 0) {
        targetLeft = segmentWidth / 6 - 10;
        message = 'Goal to the left!';
        goalPos = 'Left';
      } else if (random === 1) {
        targetLeft = segmentWidth / 2 - 40;
        message = 'Goal to the center!';
        goalPos = 'Center';
      } else {
        targetLeft = (segmentWidth * 5) / 6 - 50;
        message = 'Goal to the right!';
        goalPos = 'Right';
      }

      setPreviousPositions(new Set(previousPositions).add(random));
      setShotMessage(message);
      setSelectedGoal(goalPos);

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
        setShotMessage('');
      });
    }
  };

  // Amount and Button Logic
  const [totalInput, setTotalInput] = useState('');
  const [admissionFee, setAdmissionFee] = useState(0);
  const [stake, setStake] = useState(0);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  
  const [showResult, setShowResult] = useState(true); // Set true so button is enabled after input

  const handlePublishGame = async() => {
   
    const totalAmount = parseFloat(totalInput);
    
    
    const res = await makeRequest('/create-game', {name:'Goal Challenge', odds:mainOdd, direction:selectedGoal.toLowerCase(), stake:totalAmount});
    if(res.response){
       Alert.alert('Success', 'Game Created Successfully');
      setTimeout(() => {
      

      
      router.push('/(routes)/games/availablegames');
    }, 2000);
    } else if(res.error){
      return Alert.alert('Error', res.error);
    }else{
      return Alert.alert('Error', 'Server Error');
    }

    
  };

  const handleTotalInputChange = (text) => {
    const numericValue = parseFloat(text);
    setTotalInput(text);
  
    if (!isNaN(numericValue)) {
      const admission = numericValue * 0.25;
      const stakeValue = numericValue + admission;
      setAdmissionFee(admission);
      setStake(stakeValue);
    } else {
      setAdmissionFee(0);
      setStake(0);
    }
  };

  
  useEffect(() => {
    const totalAmount = parseFloat(totalInput);
    const isValidAmount = !isNaN(totalAmount) && totalAmount > 0;
    const isGoalSelected = selectedGoal !== '';
  
    setIsButtonDisabled(!(isValidAmount && isGoalSelected));
  }, [totalInput, selectedGoal]);

  return (
    <View style={{ height: '100%' }}>
      <Header name={'Goal Challenge'} />
      <ScrollView>
        <View style={Goalstyles.card}>
          <Text style={Goalstyles.header}>Shoot The Ball</Text>

          <ImageBackground
            source={require('../../../../assets/images/games/football-field.png')}
            style={Goalstyles.field}
          >
            <View style={Goalstyles.fieldHeader}>
              {[...Array(3)].map((_, idx) => (
                <View style={Goalstyles.segment} key={idx}>
                  <Image
                    style={Goalstyles.segmentText}
                    source={require('../../../../assets/images/games/goal-post.png')}
                  />
                </View>
              ))}
            </View>

            <Animated.View
              style={[Goalstyles.ballWrapper, { bottom: ballBottom, left: ballLeft }]}
            >
               <Ionicons name="football" size={24} color="white" />
            </Animated.View>
          </ImageBackground>

          <TouchableOpacity style={Goalstyles.button} onPress={shootBall}>
          {/* <Icon name="bullseye" size={16} color="#fff" style={{ marginRight: 8 }} /> */}
          <FontAwesome5 name="bullseye" size={16} color="#fff" style={{ marginRight: 8 }} />

            {/* <Goal size={16} color="#fff" style={{ marginRight: 8 }} /> */}
            <Text style={Goalstyles.buttonText}>Shoot Ball</Text>
          </TouchableOpacity>

          <Text style={Goalstyles.message}>{shotMessage}</Text>

          <View style={WheelSPins.fullWidth}>
            <View style={WheelSPins.inputGroup}>
              <Text style={[WheelSPins.cardTitle, { color: '#212121' }]}>
                Enter Total Amount
              </Text>
              <CustomInput
              style={creategame.input}                  
              placeholder="Enter total amount"
                  keyboardType="numeric"
                  value={totalInput}
                placeholderTextColor={'gray'}
                onChangeText={handleTotalInputChange}
            
                />

              
            </View>

            <View style={[creategame.summary,{marginTop:0}]}>
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
                  Your wallet balance:{' '}
                  <Text style={WheelSPins.walletAmount}>₦150,000</Text>
                </Text>
              </View>
              <TouchableOpacity
                style={[
                  FLipCoin.button,
                  isButtonDisabled && WheelSPins.publishButton,
                  { width: '100%', justifyContent: 'center', alignItems: 'center' },
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
              Shoot the ball into the goal and see where it lands. Players will bet against your shot direction with odds of 3.003x. If they correctly guess where your shot went, they win. If they guess wrong, you win.              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default GoalMain;
