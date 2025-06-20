import React from 'react';
 import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useGameContext } from '../../../context/AppContext';
import HeaderBet from '../../Header/HeaderBet';

const GameDetailsWithOutVote = () => {
    const router = useRouter();
         const { gameData,updateGameData } = useGameContext();
      const { stake, odds, gameLabel, range, selected, GameName } = gameData || {};
    
    // Normalize GameName
    const normalizedGameName = GameName?.toLowerCase?.();
  
    const handleContinue = () => {
      // Ensure all parameters are strings for safe navigation
      
    
      // Navigate based on the selected game
      switch (normalizedGameName) {
           
        case 'color roulette2': 
          router.push({
               pathname: '/games/category/becomethehouse/colorRoulette2/selectedColor2',
            params: {
            stake: stake?.toString(),
            odds,
             gameLabel,
            GameName,
            range,
            selected,
          },
          });
          break;
  
        case 'one number spin':
              
               router.push({
               pathname: '/games/category/becomethehouse/one-number-spin/number-spin-selected',
                params: {
                stake: stake?.toString(),
                odds,
                 gameLabel,
                GameName,
                range,
                selected,
                },
               });
            
              break;

        default:
          // Handle unknown game gracefully
          console.warn(`[Navigation Error]: Unknown game "${GameName}" selected.`);
          alert('An error occurred: Unknown game selected. Please try again.');
      }
    };
    return (
        <>
      <HeaderBet arrow name={GameName} backgroundColor="#A8BFED" />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>{GameName}</Text>
          <Text style={styles.subTitle}>
            {GameName} - {gameLabel} (2 from 1-{range})
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Game Details</Text>
          <Text style={styles.info}>House: @current-user</Text>
          <View style={styles.detailRow}>
            <View>
              <Text style={styles.label}>Stake</Text>
              <Text style={styles.value}>₦{stake}</Text>
            </View>
            <View>
              <Text style={styles.label}>Odds</Text>
              <Text style={styles.value}>{odds}</Text>
            </View>
          </View>
          <Text style={styles.label}>Players</Text>
          <Text style={styles.value}>9 joined</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Place Your Bet</Text>
          <Text style={styles.info}>Betting against The House</Text>

          <View style={styles.detailRow}>
            <View>
              <Text style={styles.label}>House Stake</Text>
              <Text style={styles.value}>₦{stake}</Text>
            </View>
            <View>
              <Text style={styles.label}>Required Stake</Text>
              <Text style={styles.value}>₦800</Text>
            </View>
          </View>

          <Text style={styles.label}>Potential Win</Text>
          <Text style={styles.value}>₦{stake}</Text>

          <Text style={styles.label}>Your Balance</Text>
          <Text style={styles.value}>₦100,000</Text>

          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.secondaryBtn} onPress={() => router.back()}>
              <Text style={styles.secondaryBtnText}>GO BACK</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.primaryBtn} onPress={handleContinue}>
              <Text style={styles.primaryBtnText}>CONTINUE</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </>
    );
}

const styles = StyleSheet.create({
    container: {
      padding: 16,
      paddingBottom: 40,
    },
    header: {
      marginBottom: 20,
    },
    title: {
      fontSize: 22,
      fontWeight: '700',
    },
    subTitle: {
      fontSize: 14,
      color: '#666',
    },
    card: {
      backgroundColor: '#fff',
      padding: 16,
      borderRadius: 10,
      marginBottom: 20,
      elevation: 2,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '600',
      marginBottom: 10,
    },
    info: {
      fontSize: 14,
      color: '#666',
      marginBottom: 10,
    },
    detailRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 16,
    },
    label: {
      fontSize: 13,
      color: '#888',
    },
    value: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 12,
    },
    buttonRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 20,
    },
    primaryBtn: {
      backgroundColor: '#3b82f6',
      paddingVertical: 12,
      paddingHorizontal: 24,
      borderRadius: 6,
    },
    primaryBtnText: {
      color: '#fff',
      fontWeight: '600',
    },
    secondaryBtn: {
      borderColor: '#ccc',
      borderWidth: 1,
      paddingVertical: 12,
      paddingHorizontal: 24,
      borderRadius: 6,
    },
    secondaryBtnText: {
      color: '#333',
      fontWeight: '600',
    },
  }); 
export default GameDetailsWithOutVote;
