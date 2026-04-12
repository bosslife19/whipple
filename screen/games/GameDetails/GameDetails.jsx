import React, { useContext } from 'react';
 import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useGameContext } from '../../../context/AppContext';
import HeaderBet from '../../Header/HeaderBet';
import { AuthContext } from '../../../context/AuthContext';

const GameDetails = () => {
    const router = useRouter();
    const {userDetails} = useContext(AuthContext);
         const { gameData,updateGameData } = useGameContext();
      const { gameLabel, range, selected, GameName } = gameData || {};
      const {name, stake, odds, house, result, subcategory,id} = useLocalSearchParams()
  
    
    // Normalize GameName
    const normalizedGameName = name?.toLowerCase?.();
 
    const handleContinue = () => {
      // Ensure all parameters are strings for safe navigation
      
    
      // Navigate based on the selected game
   
        switch (normalizedGameName) {
              case 'lucky number':
                router.push({
                  pathname: '/games/availablegames/luckynumbers/confirmLuckyNumbers',
                  params: {
                  stake: stake?.toString(),
                  odds,
                   gameLabel,
                  GameName,
                  range,  
                  selected,
                  id,
                  name,
                },
                });
                break;
          
              case 'flip the coin':
                router.push({
                  pathname: '/games/availablegames/CoinFLip/confirmFlipCoin',
                  params: {
                  stake: stake?.toString(),
                  odds,
                  gameLabel,
                  GameName,
                  range,
                  selected,
                  id,
                  name
                  
                },
                });
                break;
          
              case 'color roulette': 
                router.push({
                  pathname: '/(routes)/games/category/becomethehouse/colorRoulette/selectedColor',
                  params: {
                  stake: stake?.toString(),
                  odds,
                   gameLabel,
                  GameName,
                  range,
                  selected,
                  id,
                  name
                },
                });
                break;
        
                case 'mystery box game':
                  router.push({
                    pathname: '/games/category/becomethehouse/mysteryGame/mysterySelect',
                    params: {
                    stake: stake?.toString(),
                    odds,
                     gameLabel,
                    GameName,
                    range,
                    selected,
                    name,
                    id
                  },
                  });
                  break;
        
                  case 'goal challenge':
                    router.push({
                      pathname: '/games/category/becomethehouse/goal/selectedGoal',
                      params: {
                      stake: stake?.toString(),
                      odds,
                       gameLabel,
                      GameName,
                      range,
                      selected,
                      name,
                      id
                    },
                    });
                    break;
                      case 'dice roll':
                         router.push({
                      pathname: '/games/category/becomethehouse/DiceRoll/selectedDice',
                      params: {
                      stake: stake?.toString(),
                      odds,
                       gameLabel,
                      GameName,
                      range,
                      selected,
                      id, name, 
                    },
                    });
                    break;
                     case 'wheel spin':
                         router.push({
                      pathname: '/games/category/becomethehouse/spinwheel/selectedSpin',
                      params: {
                      stake: stake?.toString(),
                      odds,
                       gameLabel,
                      GameName,
                      range,
                      selected,
                      name,
                      id,
                    },
                    });
                    break; 
                     case 'spin the bottle':
                         router.push({
                      pathname: '/games/category/becomethehouse/spindabottle/selectedSpins',
                      params: {
                      stake: stake?.toString(),
                      odds,
                       gameLabel,
                      GameName,
                      range,
                      selected,
                      name,
                      id,
                      
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
                      id,
                      name,
                    },
                    });
                    break;
      
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
                      name,
                      id
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
      <HeaderBet arrow name={name} backgroundColor="#A8BFED" />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>{name}</Text>
          <Text style={styles.subTitle}>
            {name} - {subcategory} (2 from 1-{range})
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Game Details</Text>
          <Text style={styles.info}>House: @{house}</Text>
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
              <Text style={styles.value}>₦{Math.floor(stake / odds)}</Text>
            </View>
          </View>

          <Text style={styles.label}>Potential Win</Text>
          <Text style={styles.value}>₦{stake}</Text>

          <Text style={styles.label}>Your Balance</Text>
          <Text style={styles.value}>₦{userDetails?.wallet_balance}</Text>

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
export default GameDetails;
