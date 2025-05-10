import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import HeaderBet from '../../../Header/HeaderBet';
import Header from '../../../Header/Header';
import LosersGameList from '../../../../styles/losersgameList/LosersGameList';
import FilterTabPanel from '../../../../features/TabPanel/FilterTabPanel';

const screenWidth = Dimensions.get('window').width;

const AvaliablePublishedGame = () => {
  const { stake, odds, gameLabel, range, selected, GameName } = useLocalSearchParams();
  const router = useRouter();
//   const isGameAvailable = stake && odds && gameLabel && range;
  const [selectedTab, setSelectedTab] = useState('All');

  const [gamePlayed, setGamePlayed] = useState(false);
  const isGameAvailable =
    selectedTab === 'All' || selectedTab.toLowerCase().includes(GameName?.toLowerCase());

  const handlePlayNow = () => {
    // Hide card
    setGamePlayed(true);

    // Navigate to game detail
    router.push({
      pathname: '/(routes)/games/details',
      params: {
        stake: stake?.toString(),
        odds: odds?.toString(),
        gameLabel,
        GameName,
        range: range?.toString(),
        selected: selected?.toString(),
      },
    });
  };

  return (
    <View style={{ height:"100%", backgroundColor:"#EEF6FF"}}>
    <Header name='Recently Pushlished Games' />
    <View style={styles.container}>
    <View style={LosersGameList.rulesCard}>
          <Text style={LosersGameList.rulesTitle}> Game Rules</Text>
           <View style={LosersGameList.listItem}><Text>Browse all available games to play and bet against The House</Text></View>
          <View style={LosersGameList.listItem}><Text>Voting Rules:</Text></View>
          <View style={LosersGameList.listItem}><Text>Voting rules depend on the specific game category.</Text></View>
         </View>

        <FilterTabPanel onTabChange={setSelectedTab} />
    
          {isGameAvailable ? (
              <ScrollView horizontal contentContainerStyle={styles.scrollContainer} showsHorizontalScrollIndicator={false}>
                  <View style={styles.card}>
                      <View style={styles.cardHeader}>
                          <Text style={styles.headerIcon}>🔢</Text>
                          <Text style={styles.headerText}>{GameName}</Text>
                      </View>

                      <View style={styles.cardBody}>
                          <View style={styles.row}>
                              <View>
                                  <Text style={styles.label}>Stake</Text>
                                  <Text style={styles.value}>₦{stake}</Text>
                              </View>
                              <View style={{ alignItems: 'flex-end' }}>
                                  <Text style={styles.label}>Odds</Text>
                                  <Text style={styles.value}>{odds}</Text>
                              </View>
                          </View>

                          <Text style={styles.description}>
                              {GameName} - Option 1, Game B (2 from 1-{range})
                          </Text>

                          <View style={styles.row}>
                              <Text style={styles.info}><Text style={styles.infoLabel}>House:</Text> @current-user</Text>
                              <Text style={styles.info}><Text style={styles.infoLabel}>Status:</Text> Open</Text>
                          </View>

                          <TouchableOpacity style={styles.playButton} onPress={handlePlayNow}>
                              <Text style={styles.playButtonText}>Play Now</Text>
                          </TouchableOpacity>
                      </View>
                  </View>
              </ScrollView>
              ) : (
                <Text style={styles.noGameText}>No published game found.</Text>
              )}
      </View>
      </View>
  );
};
const styles = StyleSheet.create({
    container: {
      paddingVertical: 16,
    //   paddingLeft: 16,
    //   flex: 1,
    //   justifyContent: 'center',
     
   
   
    },
    scrollContainer: {
        marginHorizontal:"auto",
         backgroundColor:"#EEF6FF",
           
         paddingVertical: 16,
    //   paddingRight: 16,
    },
    noGameText: {
      textAlign: 'center',
      color: '#888',
      fontSize: 16,
      paddingHorizontal: 20,
    },
    card: {
      width: screenWidth * 0.8,
      marginRight: 16,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 12,
      backgroundColor: '#fff',
      overflow: 'hidden',
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 6,
      elevation: 3,
    },
    cardHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 12,
      borderBottomWidth: 1,
      borderBottomColor: '#eee',
    },
    headerIcon: {
      fontSize: 18,
      marginRight: 6,
    },
    headerText: {
      fontSize: 16,
      fontWeight: '600',
    },
    cardBody: {
      padding: 12,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 8,
    },
    label: {
      fontSize: 12,
      color: '#777',
    },
    value: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    description: {
      fontSize: 13,
      color: '#333',
      marginBottom: 10,
    },
    info: {
      fontSize: 12,
      color: '#555',
    },
    infoLabel: {
      color: '#777',
    },
    playButton: {
      marginTop: 12,
      backgroundColor: '#3b82f6',
      paddingVertical: 10,
      borderRadius: 6,
      alignItems: 'center',
    },
    playButtonText: {
      color: '#fff',
      fontWeight: '600',
      fontSize: 15,
    },
  });
export default AvaliablePublishedGame;
