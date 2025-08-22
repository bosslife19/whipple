import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
// import HeaderBet from '../../../../../../screen/Header/HeaderBet';
// import SuccessModal from '../../../../../../screen/sucessModal/successpopup';
import Winningmodal from '../../../winningmodal/winningmodal';
import Losingmodal from '../../../loseModal/LoseModal';
import ConfirmsSTy from '../../../../styles/confirmGame/confirmGame.styles';
import HeaderBet from '../../../Header/HeaderBet';
import { useGameContext } from '../../../../context/AppContext';
import axiosClient from '../../../../axiosClient';
import { useRequest } from '../../../../hooks/useRequest';
// import HeaderBet from '../../../../../screen/Header/HeaderBet';

const ConFirmSelectedLuckyNumbers = () => {
  const router = useRouter();

  const {loading, makeRequest} = useRequest();
  // const { stake, odds, gameLabel, GameName, range, selected, selectionCount,totalOdds } = useLocalSearchParams();

        const { gameData ,updateGameData } = useGameContext();
        const {  odds,  gameLabel, GameName ,stake,selected,totalOdds} = gameData || {};
        const [isLosersGame, setIsLosersGame] = useState(false);
    const {id, name, losersGame} = useLocalSearchParams();

    const [game, setGame] = useState(null)

    let range;
    if (game?.subcategory === 'a1') {
  range = 3
}


  
useEffect(()=>{
 if(losersGame){
  setIsLosersGame(true);
 }
}, [losersGame])
    useEffect(()=>{
      const getGame = async ()=>{
        const res = await axiosClient.get(`/get-game/${id}`);

        setGame(res.data.game)

      }

      getGame();
    }, [])
      
  const correctNumber = parseInt(selected); // Ensures comparison is number-based
  const parsedTotalOdds = parseFloat(totalOdds);
  const [isFirstLoss, setIsFirstLoss] = useState(true);

  function getRandomNumber() {
  return Math.floor(Math.random() * 3) + 1;
}

const losersGameNumber = getRandomNumber();


  const [selectedNumbers, setSelectedNumbers] = useState([]);
  const [success, setSuccess] = useState(null); // null initially, true/false after check

  const [visible, setModalVisibled] = useState(false);
 

 const closeModal =()=>{
    setModalVisibled(false)

  }
  const handleNumberSelect = (number) => {
    if (success !== null) return; // Prevent interaction if already submitted
  
    if (selectedNumbers.includes(number)) {
     return
    } 

    else if(selectedNumbers.length > 0){
     setSelectedNumbers([number]); // Clear and add only 
    }
    
    else if (selectedNumbers.length < 1) {
      
      setSelectedNumbers([...selectedNumbers, number]);
    }
  };
  
  

  const handleSubmit = async () => {
   
    if(!losersGame){
    const res = await makeRequest('/play-game', {
      gameId: game.id,
      choiceNumber: selectedNumbers[0],
      name


    })

 
    
    if(res.error){
      return Alert.alert('Error', res.error);
    }
    
    if (res.response.success) {
      setSuccess(true); // It's a win
    } else {
      setSuccess(false); // It's a loss
    }
    setModalVisibled(true);
    }else{
      try {
         const res = await makeRequest('/play-losers-game', {
      gameId: game.id,
      choiceNumber: selectedNumbers[0],
      name


    });
    
     if(res.error){
      return Alert.alert('Sorry', res.error)
    }
    if(res.response.error){
      return Alert.alert("Sorry", res.response.error);
    }
   

    if(res.response.status){
      if(selectedNumbers[0]== losersGameNumber){
        setSuccess(true)
      }else{
        setSuccess(false);
      }

      setModalVisibled(true)
    }

      } catch (error) {
        console.log(error);
        return Alert.alert('Error', 'Server Error');
      }
   
    

   


 
    
    
    
    }

  };

  const losers = ()=>{
    router.push( '/(routes)/games/LostGames/ViewLostGames',  )
      updateGameData({
        stake: stake?.toString(),
        odds,
        gameLabel,
        GameName,
        range,
        selected: selectedNumbers.join(','),
       isGameLost: true, // Flag indicating if the game is lost
    });
}
  if(!range){
    range = 3;
  }
  return (
    <>
      <HeaderBet arrow name={game?.name} backgroundColor="#A8BFED" />
      <ScrollView contentContainerStyle={ConfirmsSTy.container}>
        <View style={ConfirmsSTy.header}>
          <Text style={ConfirmsSTy.title}>{game?.name}</Text>
          <Text style={ConfirmsSTy.subTitle}>
            {game?.name} - {game?.subcategory} (2 from 1-{range})
          </Text>
        </View>

        <View style={ConfirmsSTy.card}>
          <Text style={ConfirmsSTy.sectionTitle}>Game Details</Text>
          <Text style={ConfirmsSTy.info}>House: @{game?.creator.name}</Text>
          <View style={ConfirmsSTy.detailRow}>
            <View>
              <Text style={ConfirmsSTy.label}>Stake</Text>
              <Text style={ConfirmsSTy.value}>₦{game?.stake}</Text>
            </View>
            <View>
              <Text style={ConfirmsSTy.label}>Odds</Text>
              <Text style={ConfirmsSTy.value}>{game?.odds}</Text>
            </View>
          </View>
          <Text style={ConfirmsSTy.label}>Players</Text>
          <Text style={ConfirmsSTy.value}>9 joined</Text>
        </View>

        {/* Number Selection Section */}
        <View style={ConfirmsSTy.card}>
          <Text style={ConfirmsSTy.sectionTitle}>Select Your Lucky Numbers</Text>
          <Text style={ConfirmsSTy.info}>House: @current-user</Text>
    
         <View style={ConfirmsSTy.numberGrid}>
          {Array.from({ length: parseInt(range) }, (_, i) => i + 1).map((num) => (
              <TouchableOpacity
                key={num}
                style={[
                  ConfirmsSTy.numberButton,
                  selectedNumbers.includes(num) && ConfirmsSTy.selectedNumber,
                  success !== null && { opacity: 0.5 }, // visually indicate disabled

                ]}
                onPress={() => handleNumberSelect(num)}
                disabled={success !== null} // disable after submission

              >
                <Text style={[ConfirmsSTy.numberText,
                      selectedNumbers.includes(num) && ConfirmsSTy.selectedTexts,
                ]}>{num}</Text>
              </TouchableOpacity>
            ))}
          </View>
        


          <Text style={ConfirmsSTy.selectionCountText}>
            {selectedNumbers.length}/1 numbers selected
          </Text>

          {success === false ? (
       <TouchableOpacity onPress={()=>router.replace('/(tabs)/home')} style={ConfirmsSTy.primaryBtn}>
        <Text style={ConfirmsSTy.primaryBtnText}>Go Home</Text>
       </TouchableOpacity>
       ) : success === true ? (
      <TouchableOpacity
       onPress={() => router.push('/(routes)/games/category/category-main')}
         style={ConfirmsSTy.primaryBtn}  >
      <Text style={ConfirmsSTy.primaryBtnText}>Go to Games</Text>
    </TouchableOpacity>
     ) : (
    <TouchableOpacity onPress={handleSubmit} style={ConfirmsSTy.primaryBtn}>
      {
        loading? (
          <ActivityIndicator size={20} color='white'/>
        ): <Text style={ConfirmsSTy.primaryBtnText}>Submit Your Number</Text>
      }
    
      </TouchableOpacity>
    )}
      </View>
        <View style={ConfirmsSTy.cards}>
      <Text style={ConfirmsSTy.titles}>How To Win</Text>
      <Text style={ConfirmsSTy.descriptions}>
        Pick the exact <Text style={ConfirmsSTy.highlight}>{selected} number</Text> between{' '}
        <Text style={ConfirmsSTy.highlight}> {gameLabel}</Text> the House selected to win. If your
        selection matches exactly, <Text style={ConfirmsSTy.success}>you win!</Text>
      </Text>
    </View>

        <View style={ConfirmsSTy.buttonRow}>
          <TouchableOpacity style={ConfirmsSTy.secondaryBtn} onPress={() => router.back()}>
            <Text style={ConfirmsSTy.secondaryBtnText}>GO BACK</Text>
          </TouchableOpacity>
         
        </View>
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
    correctNumber={correctNumber}
    stake={stake}
    odds={odds}
    GameName={GameName}
    gameLabel={gameLabel}
    range={range}
    selected={selected}
    parsedTotalOdds={parsedTotalOdds}
    selectedNumbers={selectedNumbers}
    />
    )}

     
      </ScrollView>
    </>
  );
};

export default ConFirmSelectedLuckyNumbers;

