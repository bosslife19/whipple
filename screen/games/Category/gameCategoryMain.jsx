import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, TextInput, Dimensions } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Header from '../../Header/Header';
import HeaderBet from '../../Header/HeaderBet';
import SlideShowBet from '../../../features/slideshow/slideshowBet';

const { width: screenWidth } = Dimensions.get('window');

// Game categories
const popularGames = [
  { title: 'Football', image: 'https://via.placeholder.com/100?text=Football' },
  { title: 'Basketball', image: 'https://via.placeholder.com/100?text=Basketball' },
  { title: 'Tennis', image: 'https://via.placeholder.com/100?text=Tennis' },
  { title: 'Boxing', image: 'https://via.placeholder.com/100?text=Boxing' },
];

const topGames = [
  { title: 'Soccer', image: 'https://via.placeholder.com/100?text=Soccer' },
  { title: 'Cricket', image: 'https://via.placeholder.com/100?text=Cricket' },
  { title: 'Rugby', image: 'https://via.placeholder.com/100?text=Rugby' },
  { title: 'Esports', image: 'https://via.placeholder.com/100?text=Esports' },
  { title: 'Snooker', image: 'https://via.placeholder.com/100?text=Snooker' },
  { title: 'Volleyball', image: 'https://via.placeholder.com/100?text=Volleyball' },
];

const quickGames = [
  { title: 'Spin2Win', image: 'https://via.placeholder.com/80?text=Spin' },
  { title: 'Instant Win', image: 'https://via.placeholder.com/80?text=Instant' },
  { title: 'Lucky 7', image: 'https://via.placeholder.com/80?text=Lucky7' },
];

const cards = [
  { title: 'Virtual Football', image: 'https://via.placeholder.com/300x150?text=Virtual+Football' },
  { title: 'Virtual Racing', image: 'https://via.placeholder.com/300x150?text=Virtual+Racing' },
];

const allGames = [...popularGames, ...topGames, ...quickGames, ...cards];

const GameCategoryMain = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Home');
  const [filteredGames, setFilteredGames] = useState(allGames);

  // Effect to filter games based on selected category and search query
  useEffect(() => {
    filterGames();
  }, [searchQuery, selectedCategory]);

  const filterGames = () => {
    let tempGames = allGames;

    // Apply category filter
    if (selectedCategory !== 'Home') {
      tempGames = tempGames.filter((game) =>
        game.title.toLowerCase().includes(selectedCategory.toLowerCase())
      );
    }

    // Apply search filter on the filtered games from the category filter
    if (searchQuery.trim() !== '') {
      tempGames = tempGames.filter((game) =>
        game.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredGames(tempGames);
  };

  const renderGameCategory = (title, games) => {
    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <View style={styles.row}>
          {games.map((game, index) => (
            <TouchableOpacity key={index} style={styles.gameCard}>
              <Image source={{ uri: game.image }} style={styles.gameImage} />
              <Text style={styles.gameTitle}>{game.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  return (
    <>
      <HeaderBet name="House Start" backgroundColor="#A8BFED" />
      <View style={styles.main}>
        <SlideShowBet/>
      <View style={styles.topBar}>
        {/* Search Input */}
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)} // Triggering filtering on typing
        />

        {/* Picker Dropdown */}
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedCategory}
            style={[styles.picker,{fontSize:10}]}
            onValueChange={(itemValue) => setSelectedCategory(itemValue)}
          >
            <Picker.Item label="Home" value="Home"  style={{fontSize:10}}/>
            {allGames.map((game, index) => (
              <Picker.Item key={index} style={{fontSize:10}} label={game.title} value={game.title} />
            ))}
          </Picker>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
  {/* If there is a search query, show filtered results */}
  {searchQuery.trim() !== '' ? (
    <>
      {filteredGames.length > 0 ? (
        renderGameCategory('Search Results', filteredGames)
      ) : (
        <Text style={styles.noResultsText}>No results found.</Text>
      )}
    </>
  ) : selectedCategory === 'Home' ? (
    <>
      {renderGameCategory('Popular Games', popularGames)}
      {renderGameCategory('Top Games', topGames)}
      {renderGameCategory('Quick Games', quickGames)}
      {renderGameCategory('Cards', cards)}
    </>
  ) : (
    <>
      {filteredGames.length > 0 ? (
        renderGameCategory(selectedCategory, filteredGames)
      ) : (
        <Text style={styles.noResultsText}>No results found.</Text>
      )}
    </>
  )}
     </ScrollView>
     </View>
    </>
  );
};

const styles = StyleSheet.create({
    main:{
        backgroundColor: '#F9FAFB',
        height:"100%",
        marginBottom:"50%"
        // flex:1
    },
  container: {
    padding: 16,
  height:"160%"
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 8,
    backgroundColor: '#F9FAFB',
    justifyContent: 'space-between',
  },
  searchInput: {
    flex: 1,
    fontSize:10,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 10,
    borderColor: '#ddd',
    borderWidth: 1,
    marginRight: 8,
    height:43
  },
  pickerContainer: {
    width: 150,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderColor: '#ddd',
    borderWidth: 1,
    overflow: 'hidden',
  },
  picker: {
    height: 43,
    width: '100%',
    fontSize:10
   },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap:7,
    // justifyContent: 'space-between',
  },
  gameCard: {
    width: (screenWidth - 48) / 3,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    alignItems: 'center',
    paddingVertical: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  gameImage: {
    width: 70,
    height: 70,
    marginBottom: 8,
    borderRadius: 8,
  },
  gameTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    textAlign: 'center',
  },
  noResultsText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#555',
    marginTop: 20,
  },
});

export default GameCategoryMain;
