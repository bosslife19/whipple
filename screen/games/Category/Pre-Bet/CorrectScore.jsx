import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import HeaderBet from '../../../Header/HeaderBet';

const mockMatches = [
  { id: '1', homeTeam: 'Chelsea', awayTeam: 'Manchester United', time: '6:00 PM' },
  { id: '2', homeTeam: 'Barcelona', awayTeam: 'Real Madrid', time: '8:00 PM' },
  { id: '3', homeTeam: 'Arsenal', awayTeam: 'Liverpool', time: '4:30 PM' },
  { id: '4', homeTeam: 'Arsenal', awayTeam: 'Liverpool', time: '4:30 PM' },
  { id: '5', homeTeam: 'Arsenal', awayTeam: 'Liverpool', time: '4:30 PM' },
  { id: '6', homeTeam: 'Arsenal', awayTeam: 'Liverpool', time: '4:30 PM' },
  { id: '7', homeTeam: 'Arsenal', awayTeam: 'Liverpool', time: '4:30 PM' },
  { id: '8', homeTeam: 'Arsenal', awayTeam: 'Liverpool', time: '4:30 PM' },
  { id: '9', homeTeam: 'Arsenal', awayTeam: 'Liverpool', time: '4:30 PM' },
  { id: '10', homeTeam: 'Arsenal', awayTeam: 'Liverpool', time: '4:30 PM' },
];

const CorrectScore = () => {
  const [predictions, setPredictions] = useState({});

  const handleInputChange = (id, type, value) => {
    if (/^\d*$/.test(value)) {
      setPredictions((prev) => ({
        ...prev,
        [id]: {
          ...prev[id],
          [type]: value,
        },
      }));
    }
  };

  const handleSubmit = () => {
    const hasIncomplete = mockMatches.some(
      (match) => !predictions[match.id] || predictions[match.id].home === '' || predictions[match.id].away === ''
    );
    if (hasIncomplete) {
      Alert.alert('Incomplete Predictions', 'Please enter scores for all matches.');
      return;
    }

    console.log('Submitted Predictions:', predictions);
    Alert.alert('Success', 'Your predictions have been submitted!');
  };

  return (
    <View style={{ height: '100%', marginBottom: '0%' }}>
      <HeaderBet arrow amount={'300'} backgroundColor="#EEF6FF" />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={styles.header}>🎯 Predict Correct Scores</Text>

        {mockMatches.map((item) => {
          const matchPrediction = predictions[item.id] || { home: '', away: '' };

          return (
            <View key={item.id} style={styles.matchCard}>
              <Text style={styles.matchTime}>{item.time}</Text>
              <View style={styles.teamsRow}>
                <Text style={styles.teamName}>{item.homeTeam}</Text>
                <View style={styles.scoreBox}>
                  <TextInput
                    style={styles.input}
                    keyboardType="number-pad"
                    value={matchPrediction.home}
                    placeholder="0"
                    maxLength={2}
                    onChangeText={(text) => handleInputChange(item.id, 'home', text)}
                  />
                  <Text style={styles.colon}>:</Text>
                  <TextInput
                    style={styles.input}
                    keyboardType="number-pad"
                    value={matchPrediction.away}
                    placeholder="0"
                    maxLength={2}
                    onChangeText={(text) => handleInputChange(item.id, 'away', text)}
                  />
                </View>
                <Text style={styles.teamName}>{item.awayTeam}</Text>
              </View>
            </View>
          );
        })}

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit Predictions</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default CorrectScore;


const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 20,
    // paddingVertical: 20,
    height:'100%',
    // marginBottom:'10%'
   },
  header: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 20,
    textAlign: 'center',
    color: '#111827',
  },
  matchCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal:5,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  matchTime: {
    fontSize: 13,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 10,
  },
  teamsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  teamName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    width: 90,
    textAlign: 'center',
  },
  scoreBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#d1d5db',
  },
  input: {
    width: 36,
    height: 40,
    textAlign: 'center',
    fontSize: 16,
    color: '#111827',
    backgroundColor: '#fff',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#d1d5db',
    marginHorizontal: 4,
  },
  colon: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  button: {
    backgroundColor: '#0A1931',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginVertical: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
  },
});
