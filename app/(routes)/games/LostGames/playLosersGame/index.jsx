import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import PastGames from '../../../../../screen/homeScreen/PastGames/PastGames';

const screenWidth = Dimensions.get('window').width;

const PlayLosersGame = () => {
  const { stake, odds, gameLabel, range, selected, GameName, isGameLost } = useLocalSearchParams();
  const router = useRouter();

  // Check if the game is lost and if required data is available
  const isLostAvailable = stake && odds && gameLabel && range && isGameLost;

  return (
    <PastGames/>
  );
};

export default PlayLosersGame;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    paddingLeft: 16,
    flex: 1,
    justifyContent: 'center',
  },
  scrollContainer: {
    paddingRight: 16,
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
