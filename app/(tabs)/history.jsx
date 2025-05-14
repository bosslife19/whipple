import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import Header from '../../screen/Header/Header';
import img from "../../assets/images/Rectangle 69.png"
import { useGameContext } from '../../context/AppContext';
import Goalstyles from '../../styles/Goal.styles';


export default function History() {
  const [activeTab, setActiveTab] = useState('My Games');
  const TABS = ['My Games', 'Past Games'];

  const myGamesData = [
    {
      id: '1',
      gameName: GameName,
      players: '3/7 Players',
      category: 'Category A',
      amount: '$100',
     
    },
    {
      id: '2',
      gameName: GameName,
      players: '5/7 Players',
      category: 'Category B',
      amount: '$150',
     
    },
  ];
  
  const postGamesData = [
    {
      id: '3',
      gameName: 'POST789',
      players: '7/7 Players',
      concluded: 'Concluded',
      amount: '$200',
      status: 'won',
     
    },
    {
      id: '4',
      gameName: 'POST321',
      players: '6/7 Players',
      concluded: 'Concluded',
      amount: '$75',
      status: 'lost',
     
    },
  ];
  
  const { gameData } = useGameContext();
  const { stake, odds, gameLabel, range, selected, GameName } = gameData || {};


  const renderGameCard = ({ item }) => (
    <View style={[styles.card,{marginBottom: 14,}]}>
      <View style={styles.flexD}>
      <Text style={styles.value}>{item.gameName} Goal Challenge</Text>
      {activeTab === 'My Games' ? (
  <Text style={[styles.value, { backgroundColor: '#3B82F6', padding: 4, borderRadius: 25, color: '#fff' }]}>
    GameList
  </Text>
) : (
  <Text style={[
    styles.value,
    {
      backgroundColor: item.concluded === 'Concluded' && '#F97316' , // green or red
      padding: 6,
      borderRadius: 25,
      color: '#fff'
    }
  ]}>
    {item.concluded}
  </Text>
)}

      </View> 

    <View style={[styles.card,{ flexDirection: 'row',}]}> 
      <View style={styles.details}>
        <Text style={styles.label}>Odds:</Text>
        <Text style={styles.value}>3.003x</Text>

        <Text style={[styles.label,{maxWidth:"77%"}]}>Left, right, or center? Choose where to shoot!</Text>
        <Text style={styles.value}>Status: 2 winner</Text>
        <Text style={styles.label}>House: @GoalKeeper22</Text>

      </View>
      <View>
      <Text style={styles.value}> Stake</Text>
      <Text
        style={[
          styles.amount,
          item.status === 'won' && styles.amountWon,
          item.status === 'lost' && styles.amountLost,
        ]}
      >
        {item.amount}
      </Text>

      </View>
      </View>
      <TouchableOpacity
    style={[Goalstyles.button,{opacity:0.3}]} >
     <Text style={[styles.buttonText,{textAlign:"center",width:"100%"}]}> Game Ended</Text>
  </TouchableOpacity>
    </View>
  );

  const dataToDisplay = activeTab === 'My Games' ? myGamesData : postGamesData;

  return (
    <>
         <Header name="My Games" arrow="" backgroundColor="#A8BFED" />
    <View style={styles.container}>
      {/* Tabs */}
      <View style={styles.tabContainer}>
        {TABS.map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setActiveTab(tab)}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Game List */}
      <FlatList
        data={dataToDisplay}
        renderItem={renderGameCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    backgroundColor: '#f7f7f7',
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#333',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    fontFamily:'PoppinsMed',
    color: '#777',
  },
  activeTabText: {
    color: '#fff',
    fontFamily:'PoppinsMed',

  },
  flexD:{
    flexDirection: 'row',
    alignItems:"center",
    justifyContent:"space-between"
  },
  card: {
    backgroundColor: '#f1f1f1',
    borderRadius: 12,
    padding: 12,
    
    // alignItems: 'center',
  },
  image: {
    width: 100,
    height: "100%",
    borderRadius: 8,
    marginRight: 12,
    objectFit:"contain"
  },
  details: {
    flex: 1,
  },
  label: {
    fontSize: 12,
    color: '#666',
    fontFamily:'PoppinsMed',
    fontWeight:'400'
  },
  value: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 4,
    color: '#222',
    fontFamily:'PoppinsMed',

  },
  amount: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily:'PoppinsMed',

  },
  amountWon: {
    color: '#2b8a3e',
    fontFamily:'PoppinsMed',

  },
  amountLost: {
    color: '#d32f2f',
    fontFamily:'PoppinsMed',

  },
});
