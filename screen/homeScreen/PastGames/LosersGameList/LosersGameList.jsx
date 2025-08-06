import React, { useContext, useEffect, useState } from 'react';
import { ScrollView, Text, View, TouchableOpacity } from 'react-native';
import Header from '../../../Header/Header';
import FilterTabPanel from '../../../../features/TabPanel/FilterTabPanel';
import LosersGameList from '../../../../styles/losersgameList/LosersGameList';
// import { useGameContext } from '../../../../context/AppContext';
import { useRouter } from 'expo-router';
import { useGameContext } from '../../../../context/AppContext';
import {AuthContext} from '../../../../context/AuthContext'
import {useRequest} from '../../../../hooks/useRequest';

const LosersGames = () => {
  const router = useRouter();
  const { gameData } = useGameContext();
  const { stake, odds, gameLabel, range, selected, GameName, isGameLost } = gameData;

  const [selectedTab, setSelectedTab] = useState('All');
  const {userDetails} = useContext(AuthContext)

  const isLostAvailable = stake && isGameLost;
  const {makeRequest} = useRequest()
  
  

  const handlePlayNow = () => {
    router.push({
      pathname: '/(routes)/games/details',
      params: {
        stake,
        odds,
        gameLabel,
        GameName,
        range,
        selected,
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
useEffect(()=>{
    const getLostGames = async()=>{
     
      const res = await makeRequest('/get-losers-game', {
      id:userDetails?.id
      });

      return console.log(res.response);
    }
    getLostGames();
  }, [])
  return (
    <View style={{height:'100%'}}>
      <Header name="Loser's Game" backgroundColor="#EEF6FF" />
      <View style={LosersGameList.container}>
        <View style={LosersGameList.rulesCard}>
          <Text style={LosersGameList.rulesTitle}>🎯 Losers' Game Rules</Text>
          <Text style={LosersGameList.rulesSubtitle}>
            Your second chance at games you previously lost.
          </Text>

          <Text style={LosersGameList.rulesSectionTitle}>Benefits:</Text>
          <Text style={LosersGameList.listItem}>• 1.5x your original stake</Text>
          <Text style={LosersGameList.listItem}>• 1.2x better odds</Text>
          <Text style={LosersGameList.listItem}>• Same gameplay rules</Text>
          <Text style={LosersGameList.listItem}>• Fresh, randomly drawn numbers</Text>
        </View>

        <FilterTabPanel onTabChange={setSelectedTab} />

        <ScrollView contentContainerStyle={LosersGameList.scrollContainer}>
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
                  {GameName} - {gameLabel} 
                  {/* this range is for lucky numbers */}
                  {range}
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
          ) : (
            <Text style={LosersGameList.noGameText}>No game is currently published.</Text>
          )}
        </ScrollView>
      </View>
    </View>
  );
};

export default LosersGames;
