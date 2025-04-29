import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, TextInput, Dimensions } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import HeaderBet from '../../Header/HeaderBet';
import SlideShowBet from '../../../features/slideshow/slideshowBet';

// games images
import number1 from '../../../assets/images/games/Rectangle 98.png';
import virtualcoins from '../../../assets/images/games/Online-Casino-Bonus-1-2-1-768x432.jpg.webp';
import cube from '../../../assets/images/games/cube.png';
import spin from '../../../assets/images/games/spin2win.png';
import color from '../../../assets/images/games/color.png';
import choose from '../../../assets/images/games/koefficienty.webp';
import wheel from '../../../assets/images/games/spin-and-win-hero-image.webp';
import { router } from 'expo-router';

const { width: screenWidth } = Dimensions.get('window');

// Game categories
const popularGames = [
  { title: 'number game', image:number1 ,button: handlePush},
  { title: 'virtual coin', image:virtualcoins ,button: handlePush},
  { title: 'Dice Roll', image: cube ,button: handlePush},
];

const topGames = [
  { title: 'Color roulette', image: color,button: handlePush},
  { title: 'Spin2Win', image: spin ,button: handlePush},
  { title: 'Pick n win', image: choose ,button: handlePush},
 
  { title: 'Snooker', image: number1 ,button: handlePush},
  { title: 'Volleyball', image: number1 ,button: handlePush},
];

const quickGames = [
  { title: 'Spin2Win', image: spin ,button: handlePush},
  { title: 'Spin2Win', image: wheel ,button: handlePush},
  { title: 'Lucky 7', image: number1 ,button: handlePush},
];

const handlePush =()=>{
    router.push("/(routes)/games/category/selectcategory")
}
const allGames = [...popularGames, ...topGames, ...quickGames,];

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
            <TouchableOpacity onPress={handlePush} key={index} style={styles.gameCard}>
               <View style={styles.imageWrapper}>
              {title === 'Top Games' && (
                <Text style={styles.imageNumber}>{index + 1}</Text>
              )}
              <Image source={game.image} style={styles.gameImage} />
            </View>            
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  return (
    <>
      <HeaderBet name="House Start" backgroundColor="#A8BFED" amount={200}/>
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
      {renderGameCategory('Top Games', topGames)}
      {renderGameCategory('Popular Games', popularGames)}
      {renderGameCategory('Quick Games', quickGames)}
      {/* {renderGameCategory('Cards', cards)} */}
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
        // flex:1
    },
    container: {
        padding: 16,
      height:"120%"
      },
    imageWrapper: {
        position: 'relative',
        width: '100%',
        height: 100,
        borderRadius: 8,
        overflow: 'hidden',
      },
      imageNumber: {
        position: 'absolute',
        top: 0,
        left: 0,
        backgroundColor: '#A8BFED',
        color: '#212121',
        fontSize: 12,
        fontWeight: 'bold',
        borderBottomRightRadius: 4,
        paddingHorizontal: 6,
        paddingVertical: 3,
        zIndex: 1,
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
    height:43,
     fontFamily: "montserratMeduim"
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
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
     fontFamily: "montserratMeduim"
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
    // paddingVertical: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  gameImage: {
    width: "100%",
    objectFit:"cover",
    height: 100,
    // marginBottom: 8,
    borderRadius: 8,
  },
  gameTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    textAlign: 'center',
     fontFamily: "montserratMeduim"
  },
  noResultsText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#555',
    marginTop: 20,
     fontFamily: "montserratMeduim"
  },
});

export default GameCategoryMain;
