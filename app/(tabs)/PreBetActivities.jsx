import { router } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Easing ,TouchableOpacity, ScrollView, Animated } from 'react-native';
import Svg, { Path } from 'react-native-svg';


const PreBetActivities = () => {
    const bounceAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop( 
      Animated.sequence([
        Animated.timing(bounceAnim, {
          toValue: -10,
          duration: 500,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(bounceAnim, {
          toValue: 0,
          duration: 500,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [bounceAnim]);

  const handleLeaguePress = () =>{
    router.push("/(routes)/pre-bet/select-league")
  }

  return (
    <View style={{height:'100%'}}>
   <Text>Coming Soon</Text>
    {/* <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
          <Animated.View style={{ transform: [{ translateY: bounceAnim }] }}>
        <View style={styles.iconContainer}>
          <Svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width={32}
            height={32}
            stroke="white"
            strokeWidth={2}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <Path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
            <Path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
            <Path d="M4 22h16" />
            <Path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
            <Path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
            <Path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
          </Svg>
        </View>
        </Animated.View>
        <Text style={styles.title}>Pre-Bet Activities</Text>
        <Text style={styles.subtitle}>
          Correctly predict the outcome of football matches and stand a chance to win FREE BET(S) or 25% Discounted Bets on each game you correctly predict.
        </Text>
      </View>

      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width={20}
            height={20}
            stroke="#3b82f6"
            strokeWidth={2}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ marginRight: 8 }}
          >
            <Path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
            <Path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
            <Path d="M4 22h16" />
            <Path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
            <Path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
            <Path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
          </Svg>
          <Text style={styles.cardTitle}>Win Big with Your Predictions!</Text>
        </View>
        <Text style={styles.cardSubtitle}>Choose from two exciting prediction categories</Text>

        <View style={styles.cardContent}>
          <Text style={styles.sectionTitle}>Overall Outcome</Text>
          <Text style={styles.sectionText}>
            This category is completely FREE if you choose to predict the outcome of ONE GAME, and $0.5 (naira equivalent) if you choose to predict the outcomes of multiple games.
          </Text>
          <Text style={styles.prizeText}>Prize: 25% Discounted Bets (valid for 72 hours)</Text>

          <Text style={styles.sectionTitle}>Correct Score</Text>
          <Text style={styles.sectionText}>
            This category has a one dollar (naira equivalent) Admission Fee. Predict the exact score of matches.
          </Text>
          <Text style={styles.prizeText}>Prize: FREE Bets (no expiration)</Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleLeaguePress}>
          <Text style={styles.buttonText}>Start Predicting</Text>
        </TouchableOpacity>
      </View>
    </ScrollView> */}
     </View>
  );
};

export default PreBetActivities;

const styles = StyleSheet.create({
  container: {
    // flex:1,
    padding: 16, 
    // paddingBottom: 32,
    // backgroundColor: '#fff',
    height:'110%',
    marginTop:'20%'
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  iconContainer: {
    backgroundColor: '#3b82f6', // primary
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#3b82f6',
    marginBottom: 8,
    fontFamily:'montserratMeduim',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight:25,
    textAlign: 'center',
    maxWidth: 600,
        fontFamily:'PoppinsReg',

  },
  card: {
    borderWidth: 2,
    borderColor: 'rgba(59, 130, 246, 0.3)',
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingBottom: 0,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
     lineHeight:25,
    fontFamily:'PoppinsReg',
  },
  cardSubtitle: {
    fontSize: 12,
    color: '#6b7280',
    paddingHorizontal: 16,
    marginBottom: 8,
     lineHeight:25,
    fontFamily:'PoppinsReg',
  },
  cardContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginVertical: 5,
    color: '#111827',
      lineHeight:25,
    fontFamily:'PoppinsReg',
  },
  sectionText: {
    fontSize: 12,
    color: '#6b7280',
      lineHeight:20,
    fontFamily:'PoppinsReg',
  },
  prizeText: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 4,
    color: '#111827',
       

  },
  buttonContainer: {
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#3b82f6',
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 32,
    elevation: 3,
    shadowColor: '#3b82f6',
    shadowOpacity: 0.3,
    shadowRadius: 5,
    width:'100%'
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 14,
    textAlign:'center',
    fontFamily:'PoppinsReg',

  },
});
