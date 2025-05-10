import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Header from '../../../Header/Header';
import FilterTabPanel from '../../../../features/TabPanel/FilterTabPanel';
import LosersGameList from '../../../../styles/losersgameList/LosersGameList';


const LosersGames = () => {
  const router = useRouter();
  const { stake,
    flipResult,
     
     odds, gameLabel, range, selected, GameName, isGameLost } = useLocalSearchParams();

  const [gamePlayed, setGamePlayed] = useState(false);
  const [selectedTab, setSelectedTab] = useState('All');

  const isLostAvailable =
    stake &&  isGameLost 

  const handlePlayNow = () => {
    setGamePlayed(true);
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

  const shouldDisplayGame =
    selectedTab === 'All' || selectedTab.toLowerCase().includes(GameName?.toLowerCase());
 
    if (!isLostAvailable) {
      return (
  
        <View style={LosersGameList.centeredContainer}>
         <Header name="Loser's Game" backgroundColor="transparent" />
          <Text style={LosersGameList.noGameText}>No game is currently published.</Text>
        </View>
      );
    }
  return (
    <View>
      <Header name="Loser's Game" backgroundColor="#EEF6FF" />
      <View style={LosersGameList.container}>
        {/* Rules Card */}
        <View style={LosersGameList.rulesCard}>
          <Text style={LosersGameList.rulesTitle}>🎯 Losers' Game Rules</Text>
          <Text style={LosersGameList.rulesSubtitle}>
            Your second chance at games you previously lost.
          </Text>

          <Text style={LosersGameList.rulesSectionTitle}>Benefits:</Text>
          <View style={LosersGameList.listItem}><Text>• 1.5x your original stake</Text></View>
          <View style={LosersGameList.listItem}><Text>• 1.2x better odds</Text></View>
          <View style={LosersGameList.listItem}><Text>• Same gameplay rules</Text></View>
          <View style={LosersGameList.listItem}><Text>• Fresh, randomly drawn numbers</Text></View>
        </View>

        <FilterTabPanel onTabChange={setSelectedTab} />

        <ScrollView contentContainerStyle={LosersGameList.scrollContainer} showsHorizontalScrollIndicator={false}>
          {shouldDisplayGame ? (
            <View style={LosersGameList.card}>
              <View style={LosersGameList.cardHeader}>
                <Text style={LosersGameList.headerIcon}>🎲</Text>
                <Text style={LosersGameList.headerText}>{GameName} - Lost Game</Text>
              </View>

              <View style={LosersGameList.cardBody}>
                <View style={LosersGameList.row}>
                  <View>
                    <Text style={LosersGameList.label}>Stake</Text>
                    <Text style={LosersGameList.value}>₦{stake}</Text>
                  </View>
                  <View style={{ alignItems: 'flex-end' }}>
                    <Text style={LosersGameList.label}>Odds</Text>
                    <Text style={LosersGameList.value}>{odds}</Text>
                  </View>
                </View>

                <Text style={LosersGameList.description}>
                  {GameName} - Option 1, Game B (2 from 1–{range})
                </Text>

                <View style={LosersGameList.row}>
                  <Text style={LosersGameList.info}><Text style={LosersGameList.infoLabel}>House:</Text> @current-user</Text>
                  <Text style={LosersGameList.info}><Text style={LosersGameList.infoLabel}>Status:</Text> Open</Text>
                </View>

                <TouchableOpacity style={LosersGameList.playButton} onPress={handlePlayNow}>
                  <Text style={LosersGameList.playButtonText}>Play Now</Text>
                </TouchableOpacity>
              </View>
            </View>
          ):(
            <Text style={LosersGameList.noGameText}>No game is currently published.</Text>
          )}
        </ScrollView>
      </View>
    </View>
  );
};



export default LosersGames;
