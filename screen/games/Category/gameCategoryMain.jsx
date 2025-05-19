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
import color from '../../../assets/images/games/spinningcolo.avif';
import choose from '../../../assets/images/games/soccerbg.avif';
import mystry from '../../../assets/images/games/mys.jpg';
import gameCates from '../../../styles/gameCate.styles';


 

// Game Data
const popularGames = [
 
 
  {
    title: 'Dice Roll',
    image: cube,
    description: 'Roll dice and bet on outcomes.',
    variants: ['Single Die', 'Double Die'],
    handleNavigate: () => router.push('/(routes)/games/category/becomethehouse/DiceRoll'),

  },
  {
    title: 'Color Roulette',
    image: color,
    description: 'Four colors (Red, Blue, Green, Yellow); two prominent colors published.',
    variants: ['Four Colors'],
    handleNavigate: () => router.push('/(routes)/games/category/becomethehouse/colorRoulette'), 

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
    handleNavigate: () => router.push('/(routes)/games/category/becomethehouse/goal'),

  },
];

const quickGames = [
  {
    title: 'Wheel Spin',
    image: spin,
    description: 'Spin a wheel with numbers 1-10, three prominent numbers published.',
    variants: ['Standard Wheel'],
    handleNavigate: () => router.push('/(routes)/games/category/becomethehouse/spinwheel'),

  },
  {
    title: 'mystery box',
    image: mystry,
    description: 'Three boxes; one chosen as the winning box.',
    variants: ['Three Boxes'],
    handleNavigate: () => router.push('/(routes)/games/category/becomethehouse/mysteryGame'),

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
    <View key={title} style={gameCates.section}>
      <Text style={gameCates.sectionTitle}>{title}</Text>
      <View style={gameCates.row}>
        {games.map((game, index) => (
          <View key={index} style={gameCates.card} >
            <View style={gameCates.imageWrapper}>
              {title === 'Top Games' && (
                <Text style={gameCates.imageBadge}>{index + 1}</Text>
              )}
              <Image source={game.image} style={gameCates.image} />
            </View>
            <Text style={gameCates.gameTitle}>{game.title}</Text>
            <Text style={gameCates.description}>{game.description}</Text>
            <Text style={gameCates.variantLabel}>Variants:</Text>
            {game.variants.map((variant, idx) => (
              <Text key={idx} style={gameCates.variantText}>• {variant}</Text>
            ))}
            <TouchableOpacity style={gameCates.btn} onPress={game.handleNavigate}>
              <Text style={[gameCates.gameTitle,{textAlign:"center",color:"#fff"}]}>Create Games</Text>
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
        : <Text style={gameCates.noResults}>No results found.</Text>;
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
      : <Text style={gameCates.noResults}>No results found.</Text>;
  };

  return (
    <>
      <HeaderBet arrow name="Become The House" backgroundColor="#A8BFED" amount={200} />
      <View style={gameCates.main}>
        {/* <SlideShowBet /> */}

        <View style={gameCates.topBar}>
          <TextInput
            style={gameCates.searchInput}
            placeholder="Search..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <View style={gameCates.pickerWrapper}>
            <Picker
              selectedValue={selectedCategory}
              style={gameCates.picker}
              onValueChange={setSelectedCategory}
            >
              <Picker.Item label="All" value="Home" />
              {allGames.map((game, idx) => (
                <Picker.Item key={idx} label={game.title} value={game.title} />
              ))}
            </Picker>
          </View>
        </View>

        <ScrollView contentContainerStyle={gameCates.scrollContainer}>
          {renderSections()}
        </ScrollView>
      </View>
    </>
  );
};



export default GameCategoryMain;
