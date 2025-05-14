import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import Svg, { Path, Line, Circle, Rect } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import HeaderBet from '../../screen/Header/HeaderBet';
import { router } from 'expo-router';
import { Entypo, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import TabPanelFeatures from '../../screen/games/Category/Pre-Bet/TabPanel/Features';

const Card = () => {
  const navigation = useNavigation();

  return (
    <View style={{  }}>
    <HeaderBet name={'Pre-Bet Activities'} arrow />
    <ScrollView style={styles.container}>
          <Text style={styles.title}>Pre-Bet Activities</Text>
          <Text style={styles.subtitle}>
              Correctly predict the outcome of football Match(es) and stand a chance to win FREE BET(S) or 25% Discounted Bets.
              There's a $1 Admission Fee for Correct Score prediction; Overall Outcome is FREE.
          </Text>

          <View style={styles.cardGrid}>
              {/* Free Bets Card */}
              <View style={[styles.card, styles.greenCard]}>
                  <Svg width={32} height={32} stroke="#16a34a" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                      <Path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
                      <Path d="M13 5v2M13 17v2M13 11v2" />
                  </Svg>
                  <Text style={styles.cardTitle}>Free Bets Available</Text>
                  <Text style={styles.cardValue}>1</Text>
                  <Text style={styles.cardNote}>No expiration</Text>
                  <Text style={styles.cardHighlight}><Text style={styles.bold}>Benefit:</Text> Play without staking + 50% of German Juice</Text>
              </View>

              {/* Discount Bets Card */}
              <View style={[styles.card, styles.blueCard]}>
                  <Svg width={32} height={32} stroke="#2563eb" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                      <Line x1="19" y1="5" x2="5" y2="19" />
                      <Circle cx="6.5" cy="6.5" r="2.5" />
                      <Circle cx="17.5" cy="17.5" r="2.5" />
                  </Svg>
                  <Text style={styles.cardTitle}>25% Discounted Bets</Text>
                  <Text style={styles.cardValue}>1</Text>
                  <Text style={styles.cardNote}>Expires in 72 hours</Text>
                  <Text style={styles.cardHighlight}><Text style={styles.bold}>Benefit:</Text> Pay only 25% of stake or admission fee</Text>
              </View>
          </View>

          {/* Game Category */}
          <View style={styles.categoryContainer}>
          <Entypo name="select-arrows" size={24} color="black" />
              <Text style={styles.categoryTitle}>Select Game Category</Text>
              <Text style={styles.subtitle}>Choose the type of prediction you want to make</Text>

              <View style={styles.buttonGrid}>
                  <TouchableOpacity style={styles.optionButton} onPress={() => router.push('/(routes)/games/correctscore')}>
                  <MaterialIcons name="scoreboard" size={24} color="black" />
                      <Text style={styles.optionTitle}>Correct Score</Text>
                      <Text style={styles.optionSubtext}>$1 Admission Fee</Text>
                      <Text style={[styles.cardHighlight, styles.greenHighlight]}>Win Free Bets (no expiry)</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.optionButton} onPress={() => router.push('/(routes)/games/overallOutcome')}>
                  <FontAwesome name="wpforms" size={24} color="black" />
                      <Text style={styles.optionTitle}>Overall Outcome</Text>
                      <Text style={styles.optionSubtext}>Free to Play</Text>
                      <Text style={[styles.cardHighlight, styles.blueHighlight]}>Win 25% Discounted Bets</Text>
                  </TouchableOpacity>
              </View>

              {/* Tab Panel */}
              <Text style={[styles.optionTitle,{paddingTop:8}]}>How It Works</Text>
              <TabPanelFeatures/>
          </View>
      </ScrollView>
      </View>
  );
};

const styles = StyleSheet.create({
  container: { paddingHorizontal: 16, backgroundColor: '#fff',marginBottom:"0%" },
  backButton: {  alignItems: 'center', marginBottom: 12 },
  backText: { marginLeft: 8, fontSize: 16,fontFamily: 'PoppinsMed', },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 8 ,fontFamily: 'PoppinsMed',},
  subtitle: { fontSize: 13, color: '#4b5563',fontWeight:'200', marginBottom: 16 ,fontFamily: 'PoppinsReg',},
  cardGrid: {  gap: 12, flexWrap: 'wrap' },
  card: { flex: 1, padding: 16, borderRadius: 8, marginBottom: 16 },
  greenCard: { backgroundColor: '#ecfdf5', borderColor: '#bbf7d0', borderWidth: 1 },
  blueCard: { backgroundColor: '#eff6ff', borderColor: '#bfdbfe', borderWidth: 1 },
  cardTitle: { fontSize: 16,  fontWeight: 'bold', marginTop: 8 },
  cardValue: { fontSize: 24, fontFamily: 'PoppinsMed', color: '#15803d', marginVertical: 4 },
  cardNote: { fontSize: 12, fontFamily: 'PoppinsMed', color: '#6b7280' },
  cardHighlight: { fontSize: 12, marginTop: 8, padding: 8, fontFamily: 'PoppinsMed', borderRadius: 6,fontWeight:'700' },
  greenHighlight: { backgroundColor: '#bbf7d0', color: '#065f46' },
  blueHighlight: { backgroundColor: '#dbeafe', color: '#1e40af' },
  bold: { fontWeight: 'bold' , fontFamily: 'PoppinsMed',},
  categoryContainer: { alignItems: 'center', marginTop: 20,marginBottom:'30%' },
  categoryTitle: { fontSize: 20, fontWeight: 'bold',  fontFamily: 'PoppinsMed',marginVertical: 8 },
  buttonGrid: { width: '100%', flexDirection: 'row', gap: 12, marginTop: 12, flexWrap: 'wrap', justifyContent: 'center' },
  optionButton: {
    flex: 1,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#d1d5db',
    padding: 16,
    borderRadius: 8,
    maxWidth: '48%',
  },
  optionTitle: { fontSize: 16, fontWeight: 'bold', marginTop: 8 , fontFamily: 'PoppinsMed',},
  optionSubtext: { fontSize: 12, color: '#6b7280', marginTop: 4, fontFamily: 'PoppinsMed', },
});

export default Card;
