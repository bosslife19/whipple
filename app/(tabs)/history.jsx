import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import Header from '../../screen/Header/Header';
import img from "../../assets/images/Rectangle 69.png"
const TABS = ['My Games', 'Post Games'];

const myGamesData = [
  {
    id: '1',
    gameId: 'MY123',
    players: '3/7 Players',
    category: 'Category A',
    amount: '$100',
    image: img,
  },
  {
    id: '2',
    gameId: 'MY456',
    players: '5/7 Players',
    category: 'Category B',
    amount: '$150',
    image: img,
  },
];

const postGamesData = [
  {
    id: '3',
    gameId: 'POST789',
    players: '7/7 Players',
    category: 'Category C',
    amount: '$200',
    status: 'won',
    image: img,
  },
  {
    id: '4',
    gameId: 'POST321',
    players: '6/7 Players',
    category: 'Category D',
    amount: '$75',
    status: 'lost',
    image: img,
  },
];

export default function History() {
  const [activeTab, setActiveTab] = useState('My Games');

  const renderGameCard = ({ item }) => (
    <View style={styles.card}>
      <Image source={item.image} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.label}>Game ID:</Text>
        <Text style={styles.value}>{item.gameId}</Text>

        <Text style={styles.label}>Players:</Text>
        <Text style={styles.value}>{item.players}</Text>

        <Text style={styles.label}>Category:</Text>
        <Text style={styles.value}>{item.category}</Text>
      </View>
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
    color: '#777',
  },
  activeTabText: {
    color: '#fff',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#f1f1f1',
    borderRadius: 12,
    padding: 12,
    marginBottom: 14,
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
  },
  value: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 4,
    color: '#222',
  },
  amount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  amountWon: {
    color: '#2b8a3e',
  },
  amountLost: {
    color: '#d32f2f',
  },
});
