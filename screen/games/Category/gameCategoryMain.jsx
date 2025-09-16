import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
 
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,

} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { router } from 'expo-router';

// Components
// import HeaderBet from '../../Header/HeaderBet';

import gameCates from '../../../styles/gameCate.styles';

// Assets
import number1 from '../../../assets/images/games/dfd0983d-43cb-479f-bd09-6da48a29a8dd.webp';
import virtualcoins from '../../../assets/images/games/coinflip.jpg';
import cube from '../../../assets/images/games/cube.png';
import spin from '../../../assets/images/games/spin2win.png';
import color from '../../../assets/images/games/spinningcolo.avif';
 import choose from '../../../assets/images/games/soccerbg.avif';
import mystry from '../../../assets/images/games/mys.jpg';
import spins from  '../../../assets/images/games/Rectangle 98.png';
import colors from  '../../../assets/images/games/colod.png';
import SpinDaWheel from  '../../../assets/images/games/spinDaWheel.png';


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
  {
    title: 'One Number Spin',
    image: spins,
    description: 'Spin a wheel with numbers 1-10, one prominent number published.',
    variants: ['One Number Wheel'],
    handleNavigate: () => router.push('/(routes)/games/category/becomethehouse/one-number-spin'), 
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
   {
    title: 'Color Roulette2',
    image: colors,
    description: 'Four colors (Red, Blue, Green, Yellow); one prominent color published.',
    variants: ['Four Colors'],
    handleNavigate: () => router.push('/(routes)/games/category/becomethehouse/colorRoulette2'), 

  },
   {
    title: 'Spin da Bottle',
    image: SpinDaWheel,
    description: 'Spin the bottle.  choose either up or down',
    variants: ['two sections','up or down'],
    handleNavigate: () => router.push('/(routes)/games/category/becomethehouse/spindabottle'), 

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

    // useEffect(() => {
    //   window.scrollTo(0, 0);
    // }, []);

const renderGameSection = (title, games) => (
  <View key={title} style={gameCates.section}>
    <Text style={gameCates.sectionTitle}>{title}</Text>
    <View style={gameCates.row}>
      {games.map((game, index) => {
        try {
          return (
            <View key={index} style={gameCates.card}>
              <View style={gameCates.imageWrapper}>
                {title === "Top Games" && (
                  <Text style={gameCates.imageBadge}>{index + 1}</Text>
                )}

                {/* Safe image render with fallback */}
                {game.image ? (
                  <Image source={game.image} style={gameCates.image} />
                ) : (
                  <Image
                    source={require("../../../assets/images/placeholder.png")}
                    style={gameCates.image}
                  />
                )}
              </View>

              <Text style={gameCates.gameTitle}>
                {game.title || "Untitled Game"}
              </Text>
              <Text style={gameCates.description}>
                {game.description || "No description available."}
              </Text>

              <Text style={gameCates.variantLabel}>Variants:</Text>
              {Array.isArray(game.variants) && game.variants.length > 0 ? (
                game.variants.map((variant, idx) => (
                  <Text key={idx} style={gameCates.variantText}>
                    • {variant}
                  </Text>
                ))
              ) : (
                <Text style={gameCates.variantText}>• None</Text>
              )}

              <TouchableOpacity
                style={gameCates.btn}
                onPress={
                  typeof game.handleNavigate === "function"
                    ? game.handleNavigate
                    : () => console.log("No navigation set")
                }
              >
                <Text
                  style={[
                    gameCates.gameTitle,
                    { textAlign: "center", color: "#fff" },
                  ]}
                >
                  Create Game
                </Text>
              </TouchableOpacity>
            </View>
          );
        } catch (error) {
          console.error("Error rendering game card:", error);
          return (
            <View key={`error-${index}`} style={gameCates.card}>
              <Text style={{ color: "red" }}>⚠ Error loading game</Text>
            </View>
          );
        }
      })}
    </View>
  </View>
);


  const renderSections = () => {
  if (searchQuery.trim() !== '') {
    return Array.isArray(filteredGames) && filteredGames.length > 0 ? (
      renderGameSection('Search Results', filteredGames)
    ) : (
      <Text style={gameCates.noResults}>No results found.</Text>
    );
  }

  if (selectedCategory === 'Home') {
    return (
      <View>
        {renderGameSection('Top Games', topGames)}
        {renderGameSection('Popular Games', popularGames)}
        {renderGameSection('Quick Games', quickGames)}
      </View>
    );
  }

  return Array.isArray(filteredGames) && filteredGames.length > 0 ? (
    renderGameSection(selectedCategory, filteredGames)
  ) : (
    <Text style={gameCates.noResults}>No results found.</Text>
  );
};


  return (
    <>
      {/* <HeaderBet arrow name="Become The House" backgroundColor="#A8BFED" amount={200} /> */}
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
