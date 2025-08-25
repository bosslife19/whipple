import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Image,
  Alert,
  Animated,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import HeaderBet from '../../../Header/HeaderBet';
import { useGameContext } from '../../../../context/AppContext';
// import { GoalIcon } from 'lucide-react-native';
import Goalstyles from '../../../../styles/Goal.styles';
import Losingmodal from '../../../loseModal/LoseModal';
import Winningmodal from '../../../winningmodal/winningmodal';
import Slectedcol from '../../../../styles/selectedColorsstyles';
import dicestyles from '../../../../styles/diceGame/dice.styles';
import { router, useLocalSearchParams } from 'expo-router';
import { useRequest } from '../../../../hooks/useRequest';
import axiosClient from '../../../../axiosClient';

const screenWidth = Dimensions.get('window').width;
const segmentWidth = screenWidth - 70;

const GoalSelected = () => {
  const ballBottom = useRef(new Animated.Value(24)).current;
  const ballLeft = useRef(new Animated.Value(segmentWidth / 2 - 0)).current;

  const {id, name} = useLocalSearchParams();

  const {makeRequest} = useRequest()
  const {updateGameData, gameData } = useGameContext();
  const { GameName} = gameData || {};
  const [selectedGuess, setSelectedGuess] = useState(null);
  const [isBallUp, setIsBallUp] = useState(false);
  const [game, setGame] = useState(null)
useEffect(()=>{
  const getGame = async ()=>{
    const res = await axiosClient.get(`/get-game/${id}`);
    
    setGame(res.data.game);
  }
  getGame()
}, [])
      const [success, setSuccess] = useState(null); // null initially, true/false after check
    
      const [visible, setModalVisibled] = useState(false);
     
    
     const closeModal =()=>{
        setModalVisibled(false)
    
      }
  const handleGuessSelect = (side) => {
    setSelectedGuess(side);
  };

  const shootBall = async() => {
    if (!selectedGuess) {
      Alert.alert('Choose Direction', 'Please select Left, Center, or Right first.');
      return;
    }
try {
   const resp = await makeRequest('/deduct-balance', {
      amount: game.stake/game.odds
    });
    if(resp.response.status){
const res = await makeRequest('/play-game',{
      name: game.name,
      direction: selectedGuess.toLowerCase(),
      gameId: game.id
      


    } )
     if(res.error){
      return Alert.alert('Error', res.error);
    }
    }
    if(resp.error){
      return Alert.alert('Sorry', resp.error)
    }
} catch (error) {
  console.log(error);
  Alert.alert('Error', 'Server Error');
}
   

    

   

    

    let targetLeft;

    if (selectedGuess === 'Left') {
      targetLeft = segmentWidth / 6 - 10;
    } else if (selectedGuess === 'Center') {
      targetLeft = segmentWidth / 2 - 0;
    } else {
      targetLeft = (segmentWidth * 5) / 6 - 10;
    }

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
      if(res.response.success){
        setSuccess(true)
      }else{
        setSuccess(false);
      }
      setModalVisibled(true);
    });
  };

  const lostGame = () =>{
     
            router.push('/(routes)/games/LostGames/ViewLostGames');
          }
  

  return (
    <View style={{height:"100%"}}>
    <HeaderBet arrow amount={'200'} name={GameName} />
           <ScrollView contentContainerStyle={styles.card}>
            <Text style={[styles.header,{textAlign:"left",width:"100%",marginBottom:0}]}>Goal Challenge</Text>
            <Text style={[Slectedcol.cardSubtitle,{textAlign:"left",width:"100%"}]}>House: @{game?.creator.name}</Text>
              
              
              <Text style={styles.header}>Shoot The Ball</Text>

              <ImageBackground
            source={require('../../../../assets/images/games/football-field.png')}
            style={Goalstyles.field} >
                  <View style={styles.fieldHeader}>
                      {[...Array(3)].map((_, idx) => (
                          <View style={styles.segment} key={idx}>
                              <Image
                                  style={styles.segmentText}
                                  source={require('../../../../assets/images/games/goal-post.png')} />
                          </View>
                      ))}
                  </View>

                  <Animated.View style={[styles.ballWrapper, { bottom: ballBottom, left: ballLeft }]}>
                      <Ionicons name="football" size={24} color="white" />
                  </Animated.View>
              </ImageBackground>

              <View style={styles.guessContainer}>
                  {['Left', 'Center', 'Right'].map((side) => (
                      <TouchableOpacity
                          key={side}
                          style={[
                              styles.guessButton,
                              selectedGuess === side && { backgroundColor: '#1e3a8a' },
                          ]}
                          onPress={() => handleGuessSelect(side)}
                      >
                          <Text style={[styles.guessText,
                            selectedGuess === side && { color: '#fff' },
                          ]}>{side}</Text>
                      </TouchableOpacity>
                  ))}
              </View>
              {success === null && (
            <TouchableOpacity style={Goalstyles.button} onPress={shootBall}>
              <Text style={styles.buttonText}>Shoot Ball</Text>
           </TouchableOpacity>
          )}
          {success === true && ( 
            <TouchableOpacity
           style={Goalstyles.button}
          onPress={() => router.push('/(routes)/games/category/category-main')}
          >
        <Feather name="arrow-left-circle" size={16} color="#fff" style={{ marginRight: 8 }} />
       <Text style={styles.buttonText}>Go Back to Games</Text>
      </TouchableOpacity>
     )} 
     {success === false && (
      <TouchableOpacity
       style={Goalstyles.button}
       onPress={lostGame}
       >
      <Feather name="target" size={16} color="#fff" style={{ marginRight: 8 }} />
      <Text style={styles.buttonText}>Go to Loser's Games</Text>
     </TouchableOpacity>
     )}

       {/* How it Works */}
       <View style={[dicestyles.card,{marginTop:20}]}>
          <Text style={dicestyles.title}>How It Works</Text>
          <Text style={dicestyles.description}>
          Select the direction you think the House shot (left, center, or right) and shoot the ball. If your shot goes in the same direction, you win!
          </Text>
        </View>

          </ScrollView>
       {success === true && (
       <Winningmodal
       visible={visible}
       closeModal={closeModal}
      />
     )}
    {success === false && (
    <Losingmodal
    visible={visible}
    closeModal={closeModal}
    />
    )}
      </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 20,
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    marginTop:10,
    fontWeight: 'bold',
    fontFamily:'PoppinsMed'
  },
  field: {
    width: segmentWidth,
    height: 200,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 20,
  },
  fieldHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginTop: 5,
  },
  segment: {
    width: segmentWidth / 3,
    alignItems: 'center',
  },
  segmentText: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    
  },
  ballWrapper: {
    position: 'absolute',
    zIndex: 1,
  },
  guessContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginVertical: 20,
  },
  guessButton: {
    backgroundColor: '#ddd',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  guessText: {
    fontSize: 13,
    fontWeight: '500',
    color:"#211",
     fontFamily:'PoppinsMed'
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
     fontFamily:'PoppinsMed'
  },
});

export default GoalSelected;
