import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';
// import CreateGames2 from '../../styles/creategames/creategames.Predicts';
import { router } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import Predicts from '../../styles/Predict.styles';
import { Modal } from 'react-native';
import CorrectSCores from '../../styles/correctScore.styles';

// Reusable MatchCard Component
const MatchCard = ({ teamA, teamB, dateTime, onSelect }) => {
  const [selected, setSelected] = useState({ team: null, type: null });

  const handleSelect = (team, type) => {
    if (selected.team !== team || selected.type !== type) {
      setSelected({ team, type });
      onSelect(); // Notify parent
    }
  };

  const getButtonStyle = (team, type) => {
    const isDraw = selected.type === 'Draw';
    const isSelected = selected.team === team && selected.type === type;

    // Special case: both Draws should look selected if any Draw is selected
    if (type === 'Draw' && isDraw) {
      return [Predicts.outcomeButton, Predicts.drawButton];
    }

    if (isSelected) {
      return [
        Predicts.outcomeButton,
        type === 'Win' ? Predicts.winButton : Predicts.drawButton,
      ];
    }

    return Predicts.outcomeButton;
  };

  const getTextStyle = (team, type) => {
    const isDraw = selected.type === 'Draw';
    const isSelected = selected.team === team && selected.type === type;

    // Make both draw texts white if draw selected
    if (type === 'Draw' && isDraw) return Predicts.selectedText;

    return isSelected ? Predicts.selectedText : Predicts.defaultText;
  };

  return (
    <View style={Predicts.card}>
      <Text style={Predicts.date}>{dateTime}</Text>
      <View style={Predicts.matchRow}>
        <View style={Predicts.teamColumn}>
          <Text style={Predicts.teamName}>{teamA}</Text>
          <View style={Predicts.buttonRow}>
            <TouchableOpacity
              style={getButtonStyle(teamA, 'Win')}
              onPress={() => handleSelect(teamA, 'Win')}
            >
              <Text style={getTextStyle(teamA, 'Win')}>Win</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={getButtonStyle(teamA, 'Draw')}
              onPress={() => handleSelect(teamA, 'Draw')}
            >
              <Text style={getTextStyle(teamA, 'Draw')}>Draw</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text style={Predicts.vsText}>VS</Text>
        <View style={Predicts.teamColumn}>
          <Text style={Predicts.teamName}>{teamB}</Text>
          <View style={Predicts.buttonRow}>
            <TouchableOpacity
              style={getButtonStyle(teamB, 'Win')}
              onPress={() => handleSelect(teamB, 'Win')}
            >
              <Text style={getTextStyle(teamB, 'Win')}>Win</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={getButtonStyle(teamB, 'Draw')}
              onPress={() => handleSelect(teamB, 'Draw')}
            >
              <Text style={getTextStyle(teamB, 'Draw')}>Draw</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};



// Main PredictMatches Component
const PredictMatches = () => {
  const [selections, setSelections] = useState(0);

  const handleSelection = () => {
    setSelections((prev) => Math.min(prev + 1, 3)); // prevent over-increment
  };

  const getConfirmText = () => {
    return selections <= 1
      ? 'Confirm Prediction (Free)'
      : 'Confirm Prediction ($0.5 fee)';
  };

     const [bottomPopupVisible, setBottomPopupVisible] = useState(false);

 
  const handleConfirm = () => {
    setBottomPopupVisible(true);
    setTimeout(() => {
      setBottomPopupVisible(false);
      router.push('(tabs)/PreBetActivities');
    }, 2000); // 2 seconds delay
  };
  return (
    <View style={{height:'100%',paddingTop:30}}>


    <ScrollView style={Predicts.container}>
      <TouchableOpacity
              style={Predicts.backButton}
              onPress={() => router.back()} >
              <MaterialIcons name="arrow-back" size={21} color="#0F172A" />
              <Text style={Predicts.backText}>Back to Categories</Text>
      </TouchableOpacity>

      <View style={Predicts.header}>
        <Text style={Predicts.title}>Predict Match Outcomes</Text>
        <Text style={Predicts.subtitle}>Premier League - upcoming matches</Text>
      </View>

      <MatchCard teamA="Chelsea" teamB="Man U" dateTime="May 18, 2025 at 8:00 AM" onSelect={handleSelection} />
      <MatchCard teamA="Liverpool" teamB="Arsenal" dateTime="May 18, 2025 at 10:30 AM" onSelect={handleSelection} />
      <MatchCard teamA="Man City" teamB="Tottenham" dateTime="May 23, 2025 at 12:45 PM" onSelect={handleSelection} />

      <View style={Predicts.confirmSection}>
        <TouchableOpacity
         onPress={handleConfirm}

          style={[
            Predicts.confirmButton,
            { opacity: selections === 0 ? 0.5 : 1 },
          ]}
          disabled={selections === 0}
        >
          <Text style={Predicts.confirmButtonText}>{getConfirmText()}</Text>
        </TouchableOpacity>
        <Text style={Predicts.note}>
          Win 25% Discounted Bets for each correct prediction (valid for 72 hours)
        </Text>
      </View>
    </ScrollView>
    {/* Bottom popup modal */}
          <Modal transparent visible={bottomPopupVisible} animationType="slide">
            <View style={CorrectSCores.bottomModalContainer}>
              <View style={CorrectSCores.popupBox}>
                <Text style={[CorrectSCores.popupText,
                    {fontWeight:'600',maxWidth:300,lineHeight:15}]}>
                 Match Predicted Confirmed
                </Text>
                <Text style={[CorrectSCores.popupText
                    ,{color:'#333',lineHeight:20}
                ]}>
                Your Predictions are Locked In
                </Text>
              </View>
            </View>
          </Modal>
    </View>
  );
};




export default PredictMatches;
