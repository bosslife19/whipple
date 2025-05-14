import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import SlideshowSide from '../../../../../features/slideshow/SlideShowSide';

const TabPanelFeatures = () => {
  const [activeTab, setActiveTab] = useState('correctScore');

  return (
    <>
    <View style={styles.container}>
      {/* Tab Buttons */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'correctScore' && styles.activeTab]}
          onPress={() => setActiveTab('correctScore')}
        >
          <Text style={activeTab === 'correctScore' ? styles.tabTextActive : styles.tabTextInactive}>
            Correct Score ($1)
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'overallOutcome' && styles.activeTab]}
          onPress={() => setActiveTab('overallOutcome')}
        >
          <Text style={activeTab === 'overallOutcome' ? styles.tabTextActive : styles.tabTextInactive}>
            Overall Outcome (Free)
          </Text>
        </TouchableOpacity>
      </View>

      {/* Tab Content */}
      <View style={styles.card}>
        {activeTab === 'correctScore' ? (
          <>
            <Text style={styles.cardTitle}>Predict Exact Scores</Text>
            <View style={styles.bulletList}>
              <Text style={styles.bulletItem}>• Pay $1 admission fee to predict exact scores</Text>
              <Text style={styles.bulletItem}>• Must correctly predict ALL games to win</Text>
              <Text style={styles.bulletItem}>• Win one Free Bet for EACH correctly predicted game</Text>
              <Text style={styles.bulletItem}>• Free Bets have no expiration date</Text>
              <Text style={styles.bulletItem}>• Use Free Bets to play without staking against The House</Text>
              <Text style={styles.bulletItem}>• Free Bet players receive 50% of German Juice from games they win</Text>
              <Text style={styles.bulletItem}>• As The House, publish games with no 25% admission fee</Text>
            </View>
          </>
        ) : (
          <>
            <Text style={styles.cardTitle}>Predict Overall Outcome</Text>
            <View style={styles.bulletList}>
              <Text style={styles.bulletItem}>• Discounted Bets expire after 72 hours</Text>
              <Text style={styles.bulletItem}>• Free to play with no admission fee</Text>
              <Text style={styles.bulletItem}>• Win Free Bets for correctly predicted games</Text>
              <Text style={styles.bulletItem}>• Must correctly predict ALL games to win</Text>
              <Text style={styles.bulletItem}>• Only 6.25% German Juice applies on your published games</Text>
              <Text style={styles.bulletItem}>• As The House, pay only 25% of admission fee to publish games</Text>
            </View>
          </>
        )}
      </View>
     
    </View>
    {/* SLide SHow of FreeBet */}
    <Text style={[styles.cardTitle,{textAlign:"left",width:"100%"}]}>
    Your Previous Predictions
    </Text>
    <SlideshowSide/>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    flex: 1,
   },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    overflow: 'hidden',
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
  },
  activeTab: {
    backgroundColor: '#e6f0ff',
    borderBottomWidth: 2,
    borderBottomColor: '#007AFF',
  },
  tabTextActive: {
    color: '#007AFF',
    fontWeight: '700',
    fontSize:13,
    fontFamily: 'PoppinsMed',
  },
  tabTextInactive: {
    color: '#333',
    fontWeight: '700',
    fontSize:13,
    fontFamily: 'PoppinsMed',
  },
  card: {
    backgroundColor: '#fafafa',
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  cardTitle: {
    fontSize: 17,
    fontFamily: 'PoppinsReg',
    fontWeight: '700',
    marginBottom: 12,
    color: '#222',
  },
  bulletList: {
    paddingLeft: 8,
  },
  bulletItem: {
    fontSize: 12,
    fontFamily: 'PoppinsReg',
    marginBottom: 8,
    color: '#444',

  },
});

export default TabPanelFeatures;
