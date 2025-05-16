import { router } from 'expo-router';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Feather'; // Use `react-native-vector-icons`

export default function GameCategoryScreen({ navigation }) {
  const handlePredictMatches = () =>{
    router.push('/(routes)/pre-bet/PredictMatches')
  }

   const handleCorrectScoreMatches = () =>{
    router.push('/(routes)/pre-bet/correctscore')
  }
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Icon name="arrow-left" size={16} style={styles.backIcon} />
        <Text style={styles.backText}>Back to Leagues</Text>
      </TouchableOpacity>
 
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Select Game Category</Text>
        <Text style={styles.subtitle}>Premier League - Choose prediction type</Text>
        <Text style={styles.subtitle}>Choose which type of prediction you'd like to make</Text>
      </View>

      {/* Prediction Cards */}
      <View style={styles.grid}>
        {/* Card 1: Overall Outcome */}
        <TouchableOpacity onPress={handlePredictMatches} style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Overall Outcome</Text>
            <Icon name="award" size={20} color="#1e40af" />
          </View>
          <Text style={styles.cardDesc}>Win, Draw, or Lose predictions</Text>
          <View style={styles.cardBody}>
            <Text style={styles.cardText}>Predict whether teams will win, draw, or lose in upcoming matches.</Text>
            <Text style={styles.bullet}>🎯 <Text style={styles.bold}>Free</Text> for single match predictions</Text>
            <Text style={styles.bullet}>🎯 <Text style={styles.bold}>$0.5 fee</Text> for multiple match predictions</Text>
            <Text style={styles.bullet}>🏆 Win 25% Discounted Bets (valid for 72 hours)</Text>
            <TouchableOpacity style={styles.primaryBtn} onPress={handlePredictMatches}>
              <Text style={styles.primaryBtnText}>Select Overall Outcome</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>

        {/* Card 2: Correct Score */}
        <TouchableOpacity onPress={handleCorrectScoreMatches} style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Correct Score</Text>
            <Icon name="award" size={20} color="#1e40af" />
          </View>
          <Text style={styles.cardDesc}>Exact score predictions</Text>
          <View style={styles.cardBody}>
            <Text style={styles.cardText}>Predict the exact scoreline for upcoming football matches.</Text>
            <Text style={styles.bullet}>🎯 <Text style={styles.bold}>$1 fee</Text> for each submission</Text>
            <Text style={styles.bullet}>🎯 Choose from scores 0–10 for each team</Text>
            <Text style={styles.bullet}>🏆 Win FREE Bets (no expiration)</Text>
            <TouchableOpacity onPress={handleCorrectScoreMatches} style={styles.primaryBtn}>
              <Text style={styles.primaryBtnText}>Select Correct Score</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 40,
    marginTop:20
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginBottom: 24,
    alignSelf: 'flex-start',
  },
  backIcon: {
    marginRight: 8,
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
    fontWeight: '700',
    color: '#1e40af',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
  },
  grid: {
    gap: 16,
  },
  card: {
    borderWidth: 2,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    padding: 16,
    backgroundColor: '#fff',
    marginBottom: 20,
    elevation: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  cardDesc: {
    color: '#6b7280',
    fontSize: 14,
    marginBottom: 10,
  },
  cardBody: {
    gap: 8,
  },
  cardText: {
    color: '#4b5563',
    fontSize: 14,
    marginBottom: 12,
  },
  bullet: {
    fontSize: 14,
    marginBottom: 4,
  },
  bold: {
    fontWeight: '600',
  },
  primaryBtn: {
    backgroundColor: '#1e40af',
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 12,
  },
  primaryBtnText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
  },
});
