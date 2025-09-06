import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import axiosClient from '../../../axiosClient';

const FeaturesSection = () => {
  const [leaderBoard, setLeaderBoard] = useState(null)
  useEffect(()=>{
    const getLeaderBoard = async ()=>{
      const res = await axiosClient.get('/leaderboard');
      console.log(res.data.winners);
      setLeaderBoard(res.data.winners)
    }
    getLeaderBoard()
  }, [])
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Featured Games */}
      {/* <View style={styles.card}>
        <Text style={styles.heading}>Featured Games</Text>
        <Text style={styles.subText}>Check out our most popular games with the highest stakes!</Text>
      </View> */}

      {/* Leaderboard */}
      <View style={styles.card}>
        <Text style={styles.heading}>Leaderboard</Text>
        <Text style={[styles.subText, { marginBottom: 16 }]}>This week's top winners</Text>

        {[
          { name: '1. Emma S.', amount: '$15,400' },
          { name: '2. Daniel K.', amount: '$12,750' },
          { name: '3. Sarah M.', amount: '$9,200' },
        ].map((item, index) => (
          <View key={index} style={styles.leaderboardItem}>
            <Text style={styles.playerName}>{item.name}</Text>
            <Text style={styles.amount}>{item.amount}</Text>
          </View>
        ))}
      </View>

      {/* How to Play */}
      <View style={styles.card}>
        <Text style={styles.heading}>How to Play</Text>
        <Text style={[styles.subText, { marginBottom: 16 }]}>
          New to our platform? Here's how to get started:
        </Text>
        {[
          'Choose to play as a player or become The House',
          'Select your preferred game type',
          'Set your stake amount',
          'Make your predictions and confirm your play',
          'Wait for results and collect your winnings!',
        ].map((step, index) => (
          <Text key={index} style={styles.step}>
            {`${index + 1}. ${step}`}
          </Text>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginBottom: '10%',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subText: {
    color: '#6b7280',
    fontSize: 14,
  },
  leaderboardItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f9fafb',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  playerName: {
    fontWeight: '500',
    fontSize: 14,
  },
  amount: {
    fontWeight: 'bold',
    color: '#16a34a', // Tailwind's green-600
  },
  step: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 8,
  },
});

export default FeaturesSection;
