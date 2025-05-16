import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

const leagues = [
  { emoji: '🏆', name: 'Champions League (UEFA)' },
  { emoji: '🇬🇧', name: 'Premier League' },
  { emoji: '🇪🇸', name: 'La Liga' },
  { emoji: '🇩🇪', name: 'Bundesliga' },
  { emoji: '🇮🇹', name: 'Serie A' },
  { emoji: '🇫🇷', name: 'Ligue 1' },
];
  
export default function SelectLeagueScreen({ navigation }) {
  const handleChoose = () => {
    router.push('/(routes)/pre-bet/chooseGame')
  }
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Back Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <MaterialIcons name="arrow-back" size={21} color="#0F172A" />
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>

      {/* Heading */}
      <View style={styles.header}>
        <Text style={styles.title}>Select League</Text>
        <Text style={styles.subtitle}>Choose a league to view available matches</Text>
      </View>

      {/* Grid of Leagues */}
      <View style={styles.grid}>
        {leagues.map((league, index) => (
          <TouchableOpacity onPress={handleChoose} key={index} style={styles.card}>
            <Text style={styles.emoji}>{league.emoji}</Text>
            <Text style={styles.cardText}>{league.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingTop: 32,
    maxWidth: 800,
    alignSelf: 'center',
    // marginBottom:'10%'
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
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#1e40af', // text-primary
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280', // text-muted-foreground
    textAlign: 'center',
  },
  grid: {
    // width:'100%',
    // flexDirection: 'row',
    flexWrap: 'wrap',
    // justifyContent: 'space-between',
  },
  card: {
    width: '100%',
    // minWidth: 100,
    borderWidth: 2,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#fff',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  emoji: {
    fontSize: 32,
    marginBottom: 12,
  },
  cardText: {
    textAlign: 'center',
    fontWeight: '500',
  },
});
