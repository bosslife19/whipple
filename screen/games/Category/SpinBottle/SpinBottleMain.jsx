import React, { useContext, useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Easing,
  ScrollView,
  ImageBackground,
  Dimensions,
  ActivityIndicator,
  Alert,
} from 'react-native';
import HeaderBet from '../../../Header/HeaderBet';
import WheelSPins from '../../../../styles/spining/wheelspining.styles';
import bgs from "../../../../assets/icons/wods.jpeg";
import bottleImage from "../../../../assets/icons/Beer-Bottle-Transparent-Image-2.png";
import CustomInput from '../../../../components/Input/TextInput';
import FLipCoin from '../../../../styles/flipcoin/flipCoin';
import creategame from '../../../../styles/creategame/creategame.styles';
import { useGameContext } from '../../../../context/AppContext';
import { router } from 'expo-router';
import { useRequest } from '../../../../hooks/useRequest';
import { AuthContext } from '../../../../context/AuthContext';

const SpinBottleMain = () => {
  const spinValue = useRef(new Animated.Value(0)).current;
  const [selectedDirection, setSelectedDirection] = useState(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const {makeRequest} = useRequest()

  const [totalInput, setTotalInput] = useState('');
  const [admissionFee, setAdmissionFee] = useState(0);
  const [stake, setStake] = useState(0);

  const {userDetails} = useContext(AuthContext)

  const spinBottle = (direction) => {
    setIsSpinning(true);
    spinValue.setValue(0);
    setResult(null);

    const randomOffset = Math.floor(Math.random() * 60);

    let finalDegree = 0;

    if (direction === 'UP') {
      finalDegree = 360 * 4 + randomOffset;
    } else if (direction === 'DOWN') {
      finalDegree = 360 * 4 + 180 + randomOffset;
    }

    Animated.timing(spinValue, {
      toValue: finalDegree,
      duration: 3000,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start(() => {
      setIsSpinning(false);
      setResult(direction);
    });
  };

  const handleDirectionSelect = (direction) => {
    if (isSpinning) return;

    if (selectedDirection === direction) {
      setSelectedDirection(null);
      return;
    }

    setSelectedDirection(direction);
    spinBottle(direction);
  };

  const spin = spinValue.interpolate({
    inputRange: [0, 360],
    outputRange: ['0deg', '360deg'],
  });

  const { width } = Dimensions.get('window');

  const handleTotalInputChange = (text) => {
    setTotalInput(text);

    if (text && !isNaN(Number(text))) {
      const amount = parseFloat(text);
      const fee = amount * 0.25;
      const stakeAmount = amount + fee;

      setAdmissionFee(fee);
      setStake(amount);
      setIsButtonDisabled(false);
    } else {
      setAdmissionFee(0);
      setStake(0);
      setIsButtonDisabled(true);
    }
  };

    const {  odds= '2',  gameLabel, range, GameName  = 'Spin the Bottle' } = gameData || {};
          const {gameData, updateGameData } = useGameContext();
          // const GameName = 'Wheel Spin' 
          // const odds = '3.333';
  
    const handlePublishGame = async() => {
      console.log('show')
      if(Number(stake) > userDetails.wallet_balance){
      return Alert.alert('Sorry', 'You do not have sufficient funds. Please deposit and try again');
    }
    
      setLoading(true);
      const formattedOdds = `${odds}x`;

   
      const res = await makeRequest('/create-game', {
        name: 'Spin The Bottle',
        spinDirection: result.toLowerCase(),
        odds,
        stake,      })

      if(res.response){
setLoading(false);
Alert.alert('Success', 'Game Created Successfully');
setTimeout(() => {
        updateGameData({
          stake: stake.toFixed(2),
            odds: formattedOdds,
            gameLabel ,
            GameName,
           
            result: gameLabel,
        });
        router.replace('/(tabs)/home');

        setLoading(false);
      }, 2000);
      }else if(res.error){
        setLoading(false);
        return Alert.alert('Error', res.error)
      }else{
        setLoading(false)
        return Alert.alert("Error", 'Server Error. Please check your internet connection')
      }
    
  
      
    };

  return (
    <View style={{ height: '100%'}}>
      <HeaderBet amount={'200'} arrow name={GameName} />
      <ScrollView>
        <ImageBackground source={bgs} style={{ paddingBottom: 40, height: width * 3.10 }}>
          <View style={WheelSPins.container}>
            <Text style={WheelSPins.sectionTitle}>{GameName}</Text>
            <Text style={[WheelSPins.inputLabel, { textAlign: "left", marginBottom: 30 }]}>
              Select a direction and Spin the Bottle!
            </Text>

            {/* Static Wheel */}
            <View style={[WheelSPins.outerCircleDark, { justifyContent: 'center', alignItems: 'center', position: 'relative' }]}>
              <View style={{
                position: 'absolute',
                top: 0,
                height: '50%',
                width: '100%',
                backgroundColor: '#49ba41',
                borderTopLeftRadius: 200,
                borderTopRightRadius: 200,
              }} />

              <View style={{
                position: 'absolute',
                bottom: 0,
                height: '50%',
                width: '100%',
                backgroundColor: 'orange',
                borderBottomLeftRadius: 200,
                borderBottomRightRadius: 200,
              }} />

              <View style={{
                position: 'absolute',
                height: 5,
                width: '100%',
                backgroundColor: '#5C3317'
              }} />

              <Text style={{ position: 'absolute', top: 10, fontWeight: 'bold', fontSize: 18, color: '#6B21A8' }}>UP</Text>

              <Animated.Image
                source={bottleImage}
                style={{ width: 80, height: 80, transform: [{ rotate: spin }], resizeMode: 'contain' }}
              />

              <Text style={{ position: 'absolute', bottom: 10, fontWeight: 'bold', fontSize: 18, color: '#6B21A8' }}>DOWN</Text>
            </View>

            {/* Direction Buttons */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 30, gap: 20 }}>
              <TouchableOpacity
                onPress={() => handleDirectionSelect('UP')}
                disabled={isSpinning}
                style={[WheelSPins.spinBut, selectedDirection === 'UP' ,
                  { backgroundColor: '#49ba41' }]}
              >
                <Text style={{ color: 'white' }}>UP</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => handleDirectionSelect('DOWN')}
                disabled={isSpinning}
                style={[WheelSPins.spinBut, selectedDirection === 'DOWN' , { backgroundColor: 'orange' }]}
              >
                <Text style={{ color: 'white' }}>DOWN</Text>
              </TouchableOpacity>
            </View>

             {/* Result Display */}
            {result && (
              <View style={[WheelSPins.spinButtons,{backgroundColor:"green"}]}>
                <Text style={{ fontSize: 13, fontWeight: 'bold', color: '#fff' ,textAlign:"center",width:"100%"}}>
                  Result: {result}
                </Text>
              </View>
            )}

            {/* Amount Input */}
            <View style={WheelSPins.fullWidth}>
              <Text style={[WheelSPins.sectionTitle, { color: '#fff' }]}>Enter Total Amount</Text>
              <View style={WheelSPins.inputGroup}>
                <Text style={[WheelSPins.inputLabel, { color: '#fff' }]}>Total Amount (₦)</Text>

                <CustomInput
                  style={[FLipCoin.input,{color:"#fff"}]}
                  placeholder="Enter total amount"
                  keyboardType="numeric"
                  value={totalInput}
                  onChangeText={handleTotalInputChange}
                />
              </View>

              {/* Summary */}
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

           

            {/* Instructions */}
            <View style={[WheelSPins.infoCard, { marginTop: 20 }]}>
              <View style={WheelSPins.cardContent}>
                <Text style={WheelSPins.cardTitle}>How It Works</Text>
                <Text style={WheelSPins.cardText}>
                  Select a direction (UP or DOWN) to immediately spin the bottle.
                  Click the selected button again to unselect and spin a new round.
                </Text>
              </View>
            </View>
          </View>
        </ImageBackground>
      </ScrollView>
    </View>
  );
};

export default SpinBottleMain;
