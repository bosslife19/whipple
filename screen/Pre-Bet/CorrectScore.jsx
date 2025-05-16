import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, ScrollView } from 'react-native';
import CorrectSCores from '../../styles/correctScore.styles';

const ScoreDropdown = ({ selected, onSelect }) => {
  const [visible, setVisible] = useState(false);
  const options = Array.from({ length: 11 }, (_, i) => i);

  return (
    <View>
      <TouchableOpacity
        style={[CorrectSCores.dropdown, selected !== null && CorrectSCores.dropdownActive]}
        onPress={() => setVisible(true)}
      >
        <Text style={selected !== null ? CorrectSCores.whiteText : CorrectSCores.blackText}>
          {selected !== null ? selected : 'Score'}
        </Text>
      </TouchableOpacity>

      <Modal visible={visible} transparent animationType="fade">
        <TouchableOpacity style={CorrectSCores.modalOverlay} onPress={() => setVisible(false)}>
          <View style={CorrectSCores.modalContent}>
            {options.map((score) => (
              <TouchableOpacity
                key={score}
                style={CorrectSCores.option}
                onPress={() => {
                  onSelect(score);
                  setVisible(false);
                }}
              >
                <Text style={CorrectSCores.blackText}>{score}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const MatchCard = ({ teamA, teamB, date, scoreA, setScoreA, scoreB, setScoreB }) => {
  return (
    <View style={CorrectSCores.card}>
      <Text style={CorrectSCores.dateText}>{date}</Text>
      <View style={CorrectSCores.matchRow}>
        <View style={CorrectSCores.teamSection}>
          <Text style={CorrectSCores.teamText}>{teamA}</Text>
          <ScoreDropdown selected={scoreA} onSelect={setScoreA} />
        </View>
        <Text style={CorrectSCores.vsText}>VS</Text>
        <View style={CorrectSCores.teamSection}>
          <Text style={CorrectSCores.teamText}>{teamB}</Text>
          <ScoreDropdown selected={scoreB} onSelect={setScoreB} />
        </View>
      </View>
    </View>
  );
};

export default function PredictScoresScreen() {
  // Manage score states for all dropdowns
  const [score1A, setScore1A] = useState(null);
  const [score1B, setScore1B] = useState(null);
  const [score2A, setScore2A] = useState(null);
  const [score2B, setScore2B] = useState(null);

   const [bottomPopupVisible, setBottomPopupVisible] = useState(false);

 
  const handleConfirm = () => {
    setBottomPopupVisible(true);
    setTimeout(() => {
      setBottomPopupVisible(false);
      router.push('(tabs)/PreBetActivities');
    }, 2000); // 2 seconds delay
  };
  const isAnyScoreSelected = [score1A, score1B, score2A, score2B].some((score) => score !== null);

  return (
    <View
    style={{
           backgroundColor: '#fff',
           height:'100%'
    }}
    >
    <ScrollView
   contentContainerStyle={{
           marginTop:'10%',
     }}> 
    <View style={CorrectSCores.container}>
        <TouchableOpacity
        style={CorrectSCores.backButton}
        onPress={() => router.back()} >
      <MaterialIcons name="arrow-back" size={21} color="#0F172A" />
       <Text style={CorrectSCores.backText}>Back to Categories</Text>
     </TouchableOpacity>
      <Text style={CorrectSCores.title}>Predict Correct Scores</Text>
      <Text style={CorrectSCores.subtitle}>Champions League (UEFA) - upcoming matches</Text>

      <MatchCard
        teamA="PSG"
        teamB="Real Madrid"
        date="May 28, 2025 at 12:00 PM"
        scoreA={score1A}
        setScoreA={setScore1A}
        scoreB={score1B}
        setScoreB={setScore1B}
      />

      <MatchCard
        teamA="Liverpool"
        teamB="Barcelona"
        date="May 29, 2025 at 12:00 PM"
        scoreA={score2A}
        setScoreA={setScore2A}
        scoreB={score2B}
        setScoreB={setScore2B}
      />

      

      <TouchableOpacity
        style={[CorrectSCores.confirmButton, !isAnyScoreSelected && { opacity: 0.5 }]}
        disabled={!isAnyScoreSelected}
        onPress={handleConfirm}
      >
        <Text style={CorrectSCores.buttonText}>Confirm Predictions ($1 fee)</Text>
      </TouchableOpacity>

      <Text style={CorrectSCores.noteText}>
        Win FREE Bets for each correct prediction (no expiration)
      </Text>
    </View>
    </ScrollView> 
    {/* Bottom popup modal */}
      <Modal transparent visible={bottomPopupVisible} animationType="slide">
        <View style={CorrectSCores.bottomModalContainer}>
          <View style={CorrectSCores.popupBox}>
            <Text style={[CorrectSCores.popupText,
                {fontWeight:'600',maxWidth:300,lineHeight:15}]}>
              Correct score predictions confirmed.  $1 admission fee applied.
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
}


