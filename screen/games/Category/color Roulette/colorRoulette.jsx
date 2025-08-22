import React, { useState, useRef, useContext } from 'react';
import { View, Text, TouchableOpacity, Animated, ActivityIndicator, TextInput, Alert } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import diceColorRou from '../../../../styles/diceGame/dice.styles';
import ColorRou from '../../../../styles/colorRoulete.styles';
import { ScrollView } from 'react-native';
import dicestyles from '../../../../styles/diceGame/dice.styles';
import Header from '../../../Header/Header';
import { router, useLocalSearchParams } from 'expo-router';
import { useGameContext } from '../../../../context/AppContext';
import CustomInput from '../../../../components/Input/TextInput';
import {useRequest} from '../../../../hooks/useRequest'
import { AuthContext } from '../../../../context/AuthContext';

const colors = [
  { id: 'red', hex: '#EA384C', label: 'Red' },
  { id: 'blue', hex: '#0EA5E9', label: 'Blue' },
  { id: 'green', hex: '#22C55E', label: 'Green' },
  { id: 'yellow', hex: '#EAB308', label: 'Yellow' },
];

const ColorRouletteGame = () => {
  const spinValue = useRef(new Animated.Value(0)).current;
  const [activeColors, setActiveColors] = useState([]);
  const{userDetails} = useContext(AuthContext);
  
  const {makeRequest, loading} = useRequest();
  // New state for stake, admission fee, and total amount
  const [stake, setStake] = useState('');
  const [admissionFee, setAdmissionFee] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [walletBalance, setWalletBalance] = useState(150000); // Example balance

  const [isPublishEnabled, setIsPublishEnabled] = useState(false); // Track if publish button should be enabled

  // Function to update stake and calculate admission fee and total amount
  const handleStakeChange = (value) => {
    setStake(value);

    // Calculate admission fee (25% of the stake)
    const calculatedAdmissionFee = parseFloat(value) * 0.25;
    setAdmissionFee(calculatedAdmissionFee);

    // Calculate total amount
    const calculatedTotalAmount = parseFloat(value) + calculatedAdmissionFee;
    setTotalAmount(calculatedTotalAmount);

    // Enable or disable publish button based on stake input
    if (parseFloat(value) > 0) {
      setIsPublishEnabled(true);
    } else {
      setIsPublishEnabled(false);
    }
  };

  const spinWheel = () => {
    
    Animated.timing(spinValue, {
      toValue: 360 * 4,
      duration: 2000,
      useNativeDriver: true,
    }).start(() => {
      spinValue.setValue(0);
      const shuffled = colors.sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, 2).map(c => c.id);
      setActiveColors(selected);
      
    });
  };

  const spin = spinValue.interpolate({
    inputRange: [0, 360 * 4],
    outputRange: ['0deg', `${360 * 4}deg`],
  });

  const getOpacity = (id) => {
    return activeColors.length === 0 || activeColors.includes(id) ? 1 : 0.4;
  };
  const selectedNumbers = activeColors; // Example of using activeColors for the selection
  const parsedTotalOdds = '2'; // This can be calculated or assigned as needed


    // const { gameLabel, range, totalOdds, selectionCount,GameName='Color Roulette' } = useLocalSearchParams();
          const { gameData ,updateGameData } = useGameContext();
          const {  range  } = gameData || {};
          const GameName='Color Roulette' 
          const gameLabel=`${activeColors}`
       const handlePublish = async() => {
      // Ensure there are exactly 2 selected colors (or any other valid number)
      if (activeColors.length !== 2) {
        alert('Please spin the wheel and let two colors be selected.');
        return;
      }
      const selectedColors = activeColors.join(','); // Join selected color IDs into a comma-separated string
      if(Number(stake) > userDetails.wallet_balance){
            return Alert.alert('Sorry', 'You do not have sufficient funds. Please deposit and try again');
          }
    const res = await makeRequest('/create-game', {name:'Color Roulette', colors:selectedColors.toLowerCase(), stake,odds:Number(parsedTotalOdds)})
   
   if(res.response){
     Alert.alert('Success', 'Game Created Successfully');
      setTimeout(()=>{
    
router.replace( '/(routes)/games/availablegames')
   }, 2000)
   }

  
    

      updateGameData({
        stake: stake.toString(),
        odds: parsedTotalOdds + 'x',
        gameLabel,
        GameName,
        range,
        selected: selectedColors, // ✅ included selected colors here
      
    });
  };

  // const getOdds = () => {
  //   // Example odds calculation, modify this logic as needed
  //   return (Math.random() * (2 - 1) + 1).toFixed(2); // Random odds between 1 and 2
  // };

  return (
    <>
    <Header name='Recently Pushlished Games'/>
    <ScrollView style={{backgroundColor:"#EEF6FF",marginBottom:'30%'}}>
      <View style={ColorRou.container}>
        <Text style={ColorRou.heading}>{GameName}</Text>

        <View style={ColorRou.wheelContainer}>
          <Animated.View style={[ColorRou.wheel, { transform: [{ rotate: spin }] }]}>
            <Svg height="100%" width="100%" viewBox="0 0 100 100">
              <Path d="M50 50L70 5L195 5Z" fill="#EA384C" opacity={getOpacity('red')} />
              <Path d="M50 50L101 50L95 90Z" fill="#0EA5E9" opacity={getOpacity('blue')} />
              <Path d="M50 50L48 100L5 95Z" fill="#22C55E" opacity={getOpacity('green')} />
              <Path d="M50 50L0 50L5 5Z" fill="#EAB308" opacity={getOpacity('yellow')} />
            </Svg>
          </Animated.View>

          <View style={ColorRou.centerDot} />
          <View style={ColorRou.arrow} />
        </View>

        {activeColors.length === 2 && (
          <View style={ColorRou.selectedColors}>
            {colors.filter(c => activeColors.includes(c.id)).map(c => (
              <View key={c.id} style={[ColorRou.colorBox, { backgroundColor: c.hex }]}>
                <Text style={[diceColorRou.result, { color: '#fff' }]}>{c.label}</Text>
              </View>
            ))}
          </View>
        )}

        <TouchableOpacity onPress={spinWheel} style={ColorRou.button} disabled={loading}>
          
            <Text style={[diceColorRou.result, ColorRou.buttonText]}>Spin Wheel</Text>
         
        </TouchableOpacity>

        {/* Right Card - Stake Input */}
        <View style={[dicestyles.card, { marginTop: 20, width: "100%" }]}>
          <Text style={dicestyles.title}>Set Your Stake</Text>
          <Text style={dicestyles.label}>Your Stake (₦)</Text>
         
         <CustomInput
           style={dicestyles.input}
           placeholder="Enter total amount"
            keyboardType="numeric"
            value={stake}
            onChangeText={handleStakeChange}
           />
          
          <View style={dicestyles.feeRow}>
            <Text>Admission Fee (25%)</Text>
            <Text>₦{admissionFee.toLocaleString(undefined, { maximumFractionDigits: 2 })}</Text>
          </View>
          <View style={dicestyles.feeRow}>
            <Text style={{ fontWeight: 'bold' }}>Total Amount</Text>
            <Text style={{ fontWeight: 'bold' }}>₦{totalAmount.toLocaleString(undefined, { maximumFractionDigits: 2 })}</Text>
          </View>
          <Text>Your wallet balance: ₦{walletBalance.toLocaleString()}</Text>
          <TouchableOpacity
            onPress={handlePublish}
            style={[
              dicestyles.button,
              { backgroundColor: isPublishEnabled ? '#0A1931' : '#ccc', marginTop: 16 },
            ]}
            disabled={!isPublishEnabled}
          >
            {
              loading? <ActivityIndicator size={20} color="white"/>:
                          <Text style={dicestyles.buttonText}>Publish Game</Text>
            }

          </TouchableOpacity>
        </View>

        {/* How it Works */}
        <View style={dicestyles.card}>
          <Text style={dicestyles.title}>How It Works</Text>
          <Text style={dicestyles.description}>
            Spin the wheel to randomly select two colors. Players will bet against your selected colors with odds of 2x.
            If they correctly guess
            either of your colors, they win. If they guess wrong, you win.
          </Text>
        </View>
      </View>
    </ScrollView>
    </> 
  );
};

export default ColorRouletteGame;
