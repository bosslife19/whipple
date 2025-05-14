import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import HeaderBet from '../../../Header/HeaderBet';
import { MaterialIcons } from '@expo/vector-icons';

const mockMatches = [
  { id: '1', homeTeam: 'Chelsea', awayTeam: 'Manchester United', time: '6:00 PM' },
  { id: '2', homeTeam: 'Barcelona', awayTeam: 'Real Madrid', time: '8:00 PM' },
  { id: '3', homeTeam: 'Arsenal', awayTeam: 'Liverpool', time: '4:30 PM' },
  { id: '4', homeTeam: 'Bayern', awayTeam: 'Dortmund', time: '5:00 PM' },
  { id: '5', homeTeam: 'PSG', awayTeam: 'Lyon', time: '7:00 PM' },
  { id: '6', homeTeam: 'PSG', awayTeam: 'Lyon', time: '7:00 PM' },
  { id: '7', homeTeam: 'PSG', awayTeam: 'Lyon', time: '7:00 PM' },
  { id: '8', homeTeam: 'PSG', awayTeam: 'Lyon', time: '7:00 PM' },
  { id: '9', homeTeam: 'PSG', awayTeam: 'Lyon', time: '7:00 PM' },
  { id: '10', homeTeam: 'PSG', awayTeam: 'Lyon', time: '7:00 PM' },
  { id: '11', homeTeam: 'PSG', awayTeam: 'Lyon', time: '7:00 PM' },

];

const OverAll = () => {
  const [predictions, setPredictions] = useState({});

  const handlePredictionSelect = (id, choice) => {
    setPredictions((prev) => ({
      ...prev,
      [id]: choice,
    }));
  };

  const handleSubmit = () => {
    const hasIncomplete = mockMatches.some((match) => !predictions[match.id]);
    if (hasIncomplete) {
      Alert.alert('Incomplete Predictions', 'Please select Win/Draw for all matches.');
      return;
    }

    console.log('Submitted Predictions:', predictions);
    Alert.alert('Success', 'Your predictions have been submitted!');
  };

  return (
    <View style={{ height: '100%',}}>
      <HeaderBet arrow amount={'300'} backgroundColor="#EEF6FF" />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={styles.header}>
        <MaterialIcons name="online-prediction" size={24} color="black" /> 
            Predict Win or Draw</Text>

        {mockMatches.map((item) => {
          const selected = predictions[item.id];

          return (
            <View key={item.id} style={styles.matchCard}>
              <Text style={styles.matchTime}>{item.time}</Text>
              <Text style={styles.matchTitle}>{item.homeTeam} vs {item.awayTeam}</Text>
              <View style={styles.optionRow}>
                {['Home Win', 'Draw', 'Away Win'].map((option) => (
                  <TouchableOpacity
                    key={option}
                    style={[
                      styles.optionButton,
                      selected === option && styles.selectedOption,
                    ]}
                    onPress={() => handlePredictionSelect(item.id, option)}
                  >
                    <Text
                      style={[
                        styles.optionText,
                        selected === option && styles.selectedOptionText,
                      ]}
                    >
                      {option}
                    </Text>
                  </TouchableOpacity>
                ))}
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

export default OverAll;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  matchCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  matchTime: {
    fontSize: 14,
    color: '#777',
    marginBottom: 4,
  },
  matchTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  optionButton: {
    flex: 1,
    padding: 10,
    marginHorizontal: 4,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
  },
  selectedOption: {
    backgroundColor: '#007bff',
  },
  optionText: {
    color: '#333',
    fontWeight: '500',
  },
  selectedOptionText: {
    color: '#fff',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#28a745',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 50,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
