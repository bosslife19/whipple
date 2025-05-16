import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, ScrollView } from 'react-native';

const ScoreDropdown = ({ selected, onSelect }) => {
  const [visible, setVisible] = useState(false);
  const options = Array.from({ length: 11 }, (_, i) => i);

  return (
    <View>
      <TouchableOpacity
        style={[styles.dropdown, selected !== null && styles.dropdownActive]}
        onPress={() => setVisible(true)}
      >
        <Text style={selected !== null ? styles.whiteText : styles.blackText}>
          {selected !== null ? selected : 'Score'}
        </Text>
      </TouchableOpacity>

      <Modal visible={visible} transparent animationType="fade">
        <TouchableOpacity style={styles.modalOverlay} onPress={() => setVisible(false)}>
          <View style={styles.modalContent}>
            {options.map((score) => (
              <TouchableOpacity
                key={score}
                style={styles.option}
                onPress={() => {
                  onSelect(score);
                  setVisible(false);
                }}
              >
                <Text style={styles.blackText}>{score}</Text>
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
    <View style={styles.card}>
      <Text style={styles.dateText}>{date}</Text>
      <View style={styles.matchRow}>
        <View style={styles.teamSection}>
          <Text style={styles.teamText}>{teamA}</Text>
          <ScoreDropdown selected={scoreA} onSelect={setScoreA} />
        </View>
        <Text style={styles.vsText}>VS</Text>
        <View style={styles.teamSection}>
          <Text style={styles.teamText}>{teamB}</Text>
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
    <View style={styles.container}>
        <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.back()} >
      <MaterialIcons name="arrow-back" size={21} color="#0F172A" />
       <Text style={styles.backText}>Back to Categories</Text>
     </TouchableOpacity>
      <Text style={styles.title}>Predict Correct Scores</Text>
      <Text style={styles.subtitle}>Champions League (UEFA) - upcoming matches</Text>

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
        style={[styles.confirmButton, !isAnyScoreSelected && { opacity: 0.5 }]}
        disabled={!isAnyScoreSelected}
        onPress={() => {
          router.push('(tabs)/PreBetActivities')
        }}
      >
        <Text style={styles.buttonText}>Confirm Predictions ($1 fee)</Text>
      </TouchableOpacity>

      <Text style={styles.noteText}>
        Win FREE Bets for each correct prediction (no expiration)
      </Text>
    </View>
    </ScrollView>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
 
    height:'100%'
    // flex: 1,
  },
   backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap:10,
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderColor: '#ccc',
    marginBottom: 24,
    alignSelf: 'flex-start',
  },
  backIcon: {
    marginRight: 8,
    fontSize: 16,
  },
    backText: {
    fontSize: 14,
    fontWeight: '500',
  },
  title: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#000',
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 16,
    color: 'gray',
  },
  card: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 20,
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  dateText: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 10,
  },
  matchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  teamSection: {
    width: '40%',
    alignItems: 'center',
  },
  teamText: {
    fontWeight: '600',
    marginBottom: 8,
  },
  vsText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  dropdown: {
    borderWidth: 1,
    borderColor: '#aaa',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    minWidth: 80,
    backgroundColor: '#fff',
  },
  dropdownActive: {
    backgroundColor: '#7659A7',
  },
  blackText: {
    color: '#000',
    textAlign: 'center',
  },
  whiteText: {
    color: '#fff',
    textAlign: 'center',
  },
  confirmButton: {
    backgroundColor: '#9985F1',
    paddingVertical: 16,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 24,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  noteText: {
    textAlign: 'center',
    fontSize: 12,
    color: 'gray',
    marginTop: 12,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 16,
    width: 120,
  },
  option: {
    paddingVertical: 10,
    alignItems: 'center',
  },
});
