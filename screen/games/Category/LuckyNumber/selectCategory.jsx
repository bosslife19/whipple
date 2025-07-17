import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Checkbox from 'expo-checkbox';
import { router } from 'expo-router';
import Header from '../../../Header/Header';
import { useGameContext } from '../../../../context/AppContext';

const gameOptions = {
  A: [
    {
      label: 'Game A1 (1-3) - 3 Odds',
      subcategory:'a1',
      range: 3,
      totalOdds: 3,
      selectionCount: 1,
      names: 'Lucky Number',
      route: '/(routes)/games/category/becomethehouse/luckynumbers-category/create-game',
    },
    {
      label: 'Game A2 (1-5) - 5 Odds',
      subcategory:'a2',
      range: 5,
      totalOdds: 5,
      selectionCount: 1,
      names: 'Lucky Number',
      route: '/(routes)/games/category/becomethehouse/luckynumbers-category/create-game',
    },
    {
      label: 'Game B (2 from 1-5) - 2.5 Odds',
      range: 5,
      totalOdds: 2.5,
      selectionCount: 2,
      subcategory:'b',
      names: 'Lucky Number',
      route: '/(routes)/games/category/becomethehouse/luckynumbers-category/create-game',
    },
  ],
  C: [
    {
      label: 'Game C1 - 5 numbers (1-100) - 20 Odds',
      range: 100,
      totalOdds: 20,
      selectionCount: 5,
      subcategory:'c1',
      names: 'Lucky Number',
      route: '/(routes)/games/category/becomethehouse/luckynumbers-category/create-game',
    },
    {
      label: 'Game C2 - 10 numbers (1-100) - 10 Odds',
      range: 100,
      totalOdds: 10,
      selectionCount: 10,
      names: 'Lucky Number',
      subcategory:'c2',
      route: '/(routes)/games/category/becomethehouse/luckynumbers-category/create-game',
    },
    {
      label: 'Game C3 - 1 number (1-100) - 100 Odds',
      range: 100,
      totalOdds: 100,
      selectionCount: 1,
      names: 'Lucky Number',
      subcategory:"c3",
      route: '/(routes)/games/category/becomethehouse/luckynumbers-category/create-game',
    },
  ],
}; 

const categories = [
  {
    key: 'A',
    name: 'Category A & B',
    description: 'Select from the number pool 1 to 5',
  },
  {
    key: 'C',
    name: 'Category C',
    description: 'Select from the number pool 1 to 100',
  },
];

const SelectCategoryScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedGame, setSelectedGame] = useState(null);
  const { updateGameData } = useGameContext();

  const handleCategorySelect = (key) => {
    setSelectedCategory(key === selectedCategory ? null : key);
    setSelectedGame(null);
  };

  const handleGameSelect = (game) => {
    setSelectedGame(game);
    updateGameData({
      gameLabel: game.label,
      GameName: game.names,
      range: game.range.toString(),
      totalOdds: game.totalOdds.toString(),
      selectionCount: game.selectionCount.toString(),
      subcategory: game.subcategory,
      category: selectedCategory
    });
    router.push(game.route); // dynamic routing
  };

  return (
    <>
      <Header name={'Back to Game Selection'} backgroundColor="#A8BFED" />
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Create Lucky Number Game</Text>
          <Text style={styles.subtitle}>
            Set up your Lucky Number game as The House
          </Text>
        </View>

        {categories.map((cat) => (
          <TouchableOpacity
            key={cat.key}
            style={styles.bottomSection}
            onPress={() => handleCategorySelect(cat.key)}
          >
            <View style={styles.leftSide}>
              <Image
                source={require('../../../../assets/images/games/categoryic.png')}
                style={styles.image}
              />
              <View style={styles.textGroup}>
                <Text style={styles.label}>{cat.name}</Text>
                <Text style={styles.description}>{cat.description}</Text>
              </View>
            </View>
            <Checkbox
              value={selectedCategory === cat.key}
              onValueChange={() => handleCategorySelect(cat.key)}
            />
          </TouchableOpacity>
        ))}

        {selectedCategory && (
          <View style={styles.gameList}>
            <Text style={styles.optionTitle}>Choose a Game</Text>
            {gameOptions[selectedCategory].map((game, index) => (
              <TouchableOpacity
                key={index}
                style={styles.gameItem}
                onPress={() => handleGameSelect(game)}
              >
                <Text style={styles.gameText}>{game.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>
    </>
  );
};

export default SelectCategoryScreen;

const styles = StyleSheet.create({
  container: { padding: 24, backgroundColor: '#fff', height: '100%' },
  header: { marginBottom: 20 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#1a1a1a' },
  subtitle: {
    fontSize: 13,
    color: '#666',
    marginTop: 6,
    maxWidth: 290,
  },
  bottomSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 12,
  },
  leftSide: { flexDirection: 'row', alignItems: 'center' },
  image: { width: 50, height: 50, borderRadius: 10, marginRight: 14 },
  textGroup: { justifyContent: 'center' },
  label: { fontSize: 15, fontWeight: '700', color: '#333' },
  description: { fontSize: 10, color: '#999' },
  gameList: { marginTop: 20 },
  optionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    color: '#444',
  },
  gameItem: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#F1F5F9',
    marginBottom: 10,
  },
  gameText: { fontSize: 14, color: '#333' },
});
