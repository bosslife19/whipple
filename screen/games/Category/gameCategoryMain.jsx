import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Dimensions,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { router } from 'expo-router';

// Components
import HeaderBet from '../../Header/HeaderBet';
import SlideShowBet from '../../../features/slideshow/slideshowBet';

// Assets
import number1 from '../../../assets/images/games/dfd0983d-43cb-479f-bd09-6da48a29a8dd.webp';
import virtualcoins from '../../../assets/images/games/coinflip.jpg';
import cube from '../../../assets/images/games/cube.png';
import spin from '../../../assets/images/games/spin2win.png';
import color from '../../../assets/images/games/color.png';
import choose from '../../../assets/images/games/koefficienty.webp';

const { width: screenWidth } = Dimensions.get('window');

 

// Game Data
const popularGames = [
 
 
  {
    title: 'Dice Roll',
    image: cube,
    description: 'Roll dice and bet on outcomes.',
    variants: ['Single Die', 'Double Die'],
    handleNavigate: () => router.push('/(routes)/games/category/becomethehouse/luckynumbers-category'),

  },
  {
    title: 'Color Roulette',
    image: color,
    description: 'Four colors (Red, Blue, Green, Yellow); two prominent colors published.',
    variants: ['Four Colors'],
    handleNavigate: () => router.push('/(routes)/games/category/becomethehouse/luckynumbers-category'),

  },
];

const topGames = [ 
  {
    title: 'Lucky Number',
    image: number1,
    description: 'Players select numbers from a range. Winners match the drawn number(s).',
    variants: ['Category A (1-3, 1-5)', 'Category B (2 from 1-5)', 'Category C (5, 10, or 1 from 1-100)'],
    handleNavigate: () => router.push('/(routes)/games/category/becomethehouse/luckynumbers-category'),
  },
  {
    title: 'Virtual Coin Flip',
    image: virtualcoins,
    description: 'Simple heads or tails game with animated coin flip.',
    variants: ['Heads or Tails'],
    handleNavigate: () => router.push('/(routes)/games/category/becomethehouse/CoinFlip'),

  },
 
  {
    title: 'Goal Challenge',
    image: choose,
    description: 'Virtual ball shot into goal (right, left, middle).',
    variants: ['Standard Goal'],
    handleNavigate: () => router.push('/(routes)/games/category/becomethehouse/luckynumbers-category'),

  },
];

const quickGames = [
  {
    title: 'Wheel Spin',
    image: spin,
    description: 'Spin a wheel with numbers 1-10, three prominent numbers published.',
    variants: ['Standard Wheel'],
    handleNavigate: () => router.push('/(routes)/games/category/becomethehouse/luckynumbers-category'),

  },
  {
    title: 'Mystery Box',
    image: number1,
    description: 'Three boxes; one chosen as the winning box.',
    variants: ['Three Boxes'],
    handleNavigate: () => router.push('/(routes)/games/category/becomethehouse/luckynumbers-category'),

  },
];

const allGames = [...popularGames, ...topGames, ...quickGames];

const GameCategoryMain = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Home');
  const [filteredGames, setFilteredGames] = useState(allGames);

  useEffect(() => {
    filterGames();
  }, [searchQuery, selectedCategory]);

  const filterGames = () => {
    let games = [...allGames];

    if (selectedCategory !== 'Home') {
      games = games.filter(game =>
        game.title.toLowerCase().includes(selectedCategory.toLowerCase())
      );
    }

    if (searchQuery.trim()) {
      games = games.filter(game =>
        game.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredGames(games);
  };


  const renderGameSection = (title, games) => (
    <View key={title} style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.row}>
        {games.map((game, index) => (
          <View key={index} style={styles.card} >
            <View style={styles.imageWrapper}>
              {title === 'Top Games' && (
                <Text style={styles.imageBadge}>{index + 1}</Text>
              )}
              <Image source={game.image} style={styles.image} />
            </View>
            <Text style={styles.gameTitle}>{game.title}</Text>
            <Text style={styles.description}>{game.description}</Text>
            <Text style={styles.variantLabel}>Variants:</Text>
            {game.variants.map((variant, idx) => (
              <Text key={idx} style={styles.variantText}>• {variant}</Text>
            ))}
            <TouchableOpacity style={styles.btn} onPress={game.handleNavigate}>
              <Text style={[styles.gameTitle,{textAlign:"center",color:"#fff"}]}>Create Games</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );

  const renderSections = () => {
    if (searchQuery.trim() !== '') {
      return filteredGames.length > 0
        ? renderGameSection('Search Results', filteredGames)
        : <Text style={styles.noResults}>No results found.</Text>;
    }

    if (selectedCategory === 'Home') {
      return (
        <>
          {renderGameSection('Top Games', topGames)}
          {renderGameSection('Popular Games', popularGames)}
          {renderGameSection('Quick Games', quickGames)}
        </>
      );
    }

    return filteredGames.length > 0
      ? renderGameSection(selectedCategory, filteredGames)
      : <Text style={styles.noResults}>No results found.</Text>;
  };

  return (
    <>
      <HeaderBet arrow name="House Start" backgroundColor="#A8BFED" amount={200} />
      <View style={styles.main}>
        <SlideShowBet />

        <View style={styles.topBar}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={selectedCategory}
              style={styles.picker}
              onValueChange={setSelectedCategory}
            >
              <Picker.Item label="Home" value="Home" />
              {allGames.map((game, idx) => (
                <Picker.Item key={idx} label={game.title} value={game.title} />
              ))}
            </Picker>
          </View>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {renderSections()}
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#F9FAFB',
    height:"100%"
    // flex: 1,
  },
  scrollContainer: {
    // padding: 16,
    paddingBottom: "100%",
  },
  btn:{
  width:"100%",
  backgroundColor:"#0F172A",
  padding:15,
  borderBottomLeftRadius:10,
  borderBottomRightRadius:10
  },
  topBar: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 10,
    borderColor: '#ddd',
    borderWidth: 1,
    marginRight: 8,
    fontSize: 12,
    height: 43,
  },
  pickerWrapper: {
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
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 12,
    fontFamily:"montserratMeduim",
    textTransform: 'uppercase',
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    justifyContent:"center",
    marginHorizontal:"auto"
  },
  card: {
    width: (screenWidth - 48) / 1,
    backgroundColor: '#fff',
    borderRadius: 10,
    
    // paddingBottom:8,
    marginBottom: 12,
    elevation: 2,
    flexDirection:"column",
    justifyContent:"space-between",
    gap:6
  },
  imageWrapper: {
    position: 'relative',
    width: '100%',
    height: 120,
    borderRadius: 8,
    overflow: 'hidden',
    marginHorizontal:"auto"
  },
  image: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    objectFit:"fill"
  },
  imageBadge: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: '#A8BFED',
    color: '#212121',
    fontSize: 12,
    fontWeight: 'bold',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderBottomRightRadius: 4,
    zIndex: 1,
  },
  gameTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 5,
    color: '#1F2937',
    fontFamily:"montserratMeduim",
    paddingHorizontal: 12,
  },
  description: {
    fontSize: 12,
    color: '#555',
    fontFamily:"montserratMeduim",
    paddingHorizontal: 12,
    marginTop: 4,
  },
  variantLabel: {
    fontWeight: '600',
    marginTop: 6,
    fontSize: 12,
    fontFamily:"montserratMeduim",
    paddingHorizontal: 12,
  },
  variantText: {
    fontSize: 12,
    color: '#333',
    fontFamily:"montserratMeduim",

    marginLeft: 4,
  },
  noResults: {
    fontSize: 16,
    textAlign: 'center',
    color: '#888',
    marginTop: 20,
    fontFamily:"montserratMeduim",

  }, 
});

export default GameCategoryMain;
