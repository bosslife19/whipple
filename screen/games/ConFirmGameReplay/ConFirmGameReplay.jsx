import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
// import HeaderBet from '../../../../../../screen/Header/HeaderBet';
// import SuccessModal from '../../../../../../screen/sucessModal/successpopup';
import Winningmodal from '../../../screen/winningmodal/winningmodal';
import Losingmodal from '../../../screen/loseModal/LoseModal';
import ConfirmsSTy from '../../../styles/confirmGame/confirmGame.styles';
import HeaderBet from '../../Header/HeaderBet';
import { useGameContext } from '../../../context/AppContext';
// import HeaderBet from '../../../../../screen/Header/HeaderBet';

const ConFirmGameReplay = () => {
  const router = useRouter();
  // const { stake, odds, gameLabel, GameName, range, selected, selectionCount,totalOdds } = useLocalSearchParams();

        const { gameData ,updateGameData } = useGameContext();
        const {  odds,  gameLabel, range, GameName ,stake,selected,totalOdds} = gameData || {};
      
  const correctNumber = parseInt(selected); // Ensures comparison is number-based
  const parsedTotalOdds = parseFloat(totalOdds);
  const [isFirstLoss, setIsFirstLoss] = useState(true);

  const [selectedNumbers, setSelectedNumbers] = useState([]);
  const [success, setSuccess] = useState(null); // null initially, true/false after check

  const [visible, setModalVisibled] = useState(false);
 

 const closeModal =()=>{
    setModalVisibled(false)

  }
  const handleNumberSelect = (number) => {
    if (success !== null) return; // Prevent interaction if already submitted
  
    if (selectedNumbers.includes(number)) {
      setSelectedNumbers(selectedNumbers.filter((num) => num !== number));
    } else if (selectedNumbers.length < 1) {
      setSelectedNumbers([...selectedNumbers, number]);
    }
  };
  

  const handleSubmit = () => {
    if (selectedNumbers.includes(correctNumber)) {
      setSuccess(true); // It's a win
    } else {
      setSuccess(false); // It's a loss
    }
    setModalVisibled(true);
  };

  const losers = ()=>{
    router.push( '/(routes)/games/LostGames/ViewLostGames',  )
      updateGameData({
        stake: stake.toString(),
        odds,
        gameLabel,
        GameName,
        range,
        selected: selectedNumbers.join(','),
       isGameLost: true, // Flag indicating if the game is lost
    });
}
  
  return (
    <>
      <HeaderBet arrow name={GameName} backgroundColor="#A8BFED" />
      <ScrollView contentContainerStyle={ConfirmsSTy.container}>
        <View style={ConfirmsSTy.header}>
          <Text style={ConfirmsSTy.title}>{GameName}</Text>
          <Text style={ConfirmsSTy.subTitle}>
            {GameName} - {gameLabel} (2 from 1-{range})
          </Text>
        </View>

        <View style={ConfirmsSTy.card}>
          <Text style={ConfirmsSTy.sectionTitle}>Game Details</Text>
          <Text style={ConfirmsSTy.info}>House: @current-user</Text>
          <View style={ConfirmsSTy.detailRow}>
            <View>
              <Text style={ConfirmsSTy.label}>Stake</Text>
              <Text style={ConfirmsSTy.value}>₦{stake}</Text>
            </View>
            <View>
              <Text style={ConfirmsSTy.label}>Odds</Text>
              <Text style={ConfirmsSTy.value}>{odds}</Text>
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
       <TouchableOpacity onPress={losers} style={ConfirmsSTy.primaryBtn}>
        <Text style={ConfirmsSTy.primaryBtnText}>Play Losers Game</Text>
       </TouchableOpacity>
       ) : success === true ? (
      <TouchableOpacity
       onPress={() => router.push('/(routes)/games/category/category-main')}
         style={ConfirmsSTy.primaryBtn}  >
      <Text style={ConfirmsSTy.primaryBtnText}>Go to Games</Text>
    </TouchableOpacity>
     ) : (
    <TouchableOpacity onPress={handleSubmit} style={ConfirmsSTy.primaryBtn}>
     <Text style={ConfirmsSTy.primaryBtnText}>Submit Your Numbers</Text>
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

export default ConFirmGameReplay;

