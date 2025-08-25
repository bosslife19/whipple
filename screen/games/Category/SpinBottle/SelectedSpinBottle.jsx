import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Easing,
  ScrollView,
  ImageBackground,
  Dimensions,
  StyleSheet,
  Alert,
} from 'react-native';
import HeaderBet from '../../../Header/HeaderBet';
import WheelSPins from '../../../../styles/spining/wheelspining.styles';
import bgs from "../../../../assets/icons/wods.jpeg";
import bottleImage from "../../../../assets/icons/Beer-Bottle-Transparent-Image-2.png";
import { useGameContext } from '../../../../context/AppContext';
import { router, useLocalSearchParams } from 'expo-router';
import Winningmodal from '../../../winningmodal/winningmodal';
import Losingmodal from '../../../loseModal/LoseModal';
import { useRequest } from '../../../../hooks/useRequest';
const SelectedSpinBottle = () => {
  const spinValue = useRef(new Animated.Value(0)).current;
  const [selectedDirection, setSelectedDirection] = useState(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState(null);
  const [success, setSuccess] = useState(null);
  const [visible, setVisible] = useState(false);

  const {name, id} = useLocalSearchParams();
  const [game, setGame] = useState(null);

    useEffect(()=>{
                const getGame = async ()=>{
                  const res = await axiosClient.get(`/get-game/${id}`);
          
                  setGame(res.data.game)
          
                }
          
                getGame();
              }, [])
 
    const { gameData ,updateGameData } = useGameContext();
        const {  odds,  gameLabel,  GameName , stake} = gameData || {};
    
  const {makeRequest} = useRequest()
  

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

      makeRequest('/deduct-balance', {
        amount: game.stake/game.odds
      }).then(res=>{
        if(res.error){
          return Alert.alert('Sorry', res.error)
        }
              makeRequest('/play-game', {
                gameId: id,
                name,
                direction: direction.toLowerCase()
               }).then(res=>{
                console.log(res);
                 
                  if(res.error){
                    return Alert.alert('Error', res.error);
                  }
                  if(res.response.success){
                    setSuccess(true);
                  }else{
                    setSuccess(false)
                  }
               }).catch((e)=>{
                console.log(e);
                
               })

      }).catch(e=>{
       console.log(e);
       Alert.alert('Error', 'Server Error');
      })


        
      setResult(direction);
      setVisible(true);
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

  const handleLosersGame = () => {
    updateGameData({
      stake,
      odds,
      gameLabel,
      GameName,
      isGameLost: true,
    });
    router.push('/(routes)/games/LostGames/ViewLostGames');
  };

  const closeModal = () => {
    setVisible(false);
 
    // Optional: reset isSpinCompleted here if you want to play again
    // setIsSpinCompleted(false);
  };

  return (
    <View style={{ height: '100%' }}>
      <HeaderBet amount={'200'} arrow name={GameName} />
      <ScrollView>
        <ImageBackground source={bgs} style={{ paddingBottom: 40, height: width * 2.10 }}>
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

            {/* Result Display */}
            {result && (
              <View style={[WheelSPins.spinButtons, { backgroundColor: "green" }]}>
                <Text style={{ fontSize: 13, fontWeight: 'bold', color: '#fff', textAlign: "center", width: "100%" }}>
                  Result: {result}
                </Text>
              </View>
            )}

            {/* Direction Buttons - Disappear after spin starts */}
            {success === null  && (
              <View style={{ flexDirection: 'row',width:"100%", justifyContent: 'space-around', marginTop: 30, gap: 20 }}>
                <TouchableOpacity
                  onPress={() => handleDirectionSelect('UP')}
                  disabled={isSpinning}
                  style={[WheelSPins.spinBut, selectedDirection === 'UP' 
                    && { backgroundColor: '#49ba41' },
                    { backgroundColor: '#49ba41' }
                  ]}
                >
                  <Text style={{ color: 'white' }}>UP</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => handleDirectionSelect('DOWN')}
                  disabled={isSpinning}
                  style={[WheelSPins.spinBut, selectedDirection === 'DOWN' 
                    && { backgroundColor: 'orange' },
                    { backgroundColor: 'orange' }]}
                >
                  <Text style={{ color: 'white' }}>DOWN</Text>
                </TouchableOpacity>
              </View>
            )}

            {/* Show this button only if spin is a win */}
            {success === true && (
              <TouchableOpacity
                style={styles.backHomeButton}
                onPress={() => router.push('/(routes)/games/category/category-main')}
              >
                <Text style={styles.backHomeButtonText}>Back to Games</Text>
              </TouchableOpacity>
            )}

            {/* Show this button only if spin is a loss */}
            {success === false && (
              <TouchableOpacity
                style={styles.backHomeButton}
                onPress={handleLosersGame}
              >
                <Text style={styles.backHomeButtonText}>Back to Loser's Game</Text>
              </TouchableOpacity>
            )}
          </View>
        </ImageBackground>

        {success === true && (
          <Winningmodal visible={visible} closeModal={closeModal} />
        )}
        {success === false && (
          <Losingmodal visible={visible} closeModal={closeModal} />
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  backHomeButton: {
    marginTop: 16,
    backgroundColor: '#0A1931',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  backHomeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default SelectedSpinBottle;
