import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Checkbox from 'expo-checkbox';
import { useNavigation } from '@react-navigation/native';
import { router } from 'expo-router';
import Header from '../../Header/Header';

const SelectCategory = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const navigation = useNavigation();
  const timerRef = useRef(null);

  const handleSelect = (category) => {
    if (selectedCategory === category) {
      setSelectedCategory(null);
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    } else {
      setSelectedCategory(category);
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        router.push('/(routes)/games/createGame'); // Replace with your actual screen
      }, 1000);
    }
  };
 
  return (
    <>
    <Header backgroundColor='#A8BFED' />
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Select Game Category</Text>
        <Text style={styles.subtitle}>Select the main game category to select the 
         main game category and specify how the winnings and 
          staking will go
          </Text>
      </View>

      {/* Category A */}
      <TouchableOpacity style={styles.bottomSection} onPress={() => handleSelect('A')}>
        <View style={styles.leftSide}>
          <Image
            source={require('../../../assets/images/games/categoryic.png')}
            style={styles.image}
          />
          <View style={styles.textGroup}>
            <Text style={styles.label}>Category A</Text>
            <Text style={styles.description}>Select from the number pool 1 to 3</Text>
          </View>
        </View>
        <View style={styles.rightSide}>
          <Checkbox
            value={selectedCategory === 'A'}
            onValueChange={() => {}}
            color={selectedCategory === 'A' ? '#000' : undefined}
          />
        </View>
      </TouchableOpacity>

      {/* Category B */}
      <TouchableOpacity style={styles.bottomSection} onPress={() => handleSelect('B')}>
        <View style={styles.leftSide}>
          <Image
            source={require('../../../assets/images/games/categoryic.png')}
            style={styles.image}
          />
          <View style={styles.textGroup}>
            <Text style={styles.label}>Category B</Text>
            <Text style={styles.description}>Select from the number pool 1 to 3</Text>
          </View>
        </View>
        <View style={styles.rightSide}>
          <Checkbox
            value={selectedCategory === 'B'}
            onValueChange={() => {}}
            color={selectedCategory === 'B' ? '#000' : undefined}
          />
        </View>
      </TouchableOpacity>
    </View>
    </>
  );
};

export default SelectCategory;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    padding: 24,
    backgroundColor: '#fff',
  },
  header: {
    marginBottom: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    fontFamily: "montserratMeduim",
    color: '#1a1a1a',
  },
  subtitle: {
    fontSize: 13,
    fontWeight:"200",
    fontFamily: "montserratMeduim",
    color: '#666',
    marginTop: 6,
    maxWidth:290
  },
  bottomSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  leftSide: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 10,
    marginRight: 14,
  },
  textGroup: {
    justifyContent: 'center',
  },
  label: {
    fontSize: 15,
    fontWeight: '700',
    color: '#333',
    fontFamily: "montserratMeduim"

  },
  description: {
    fontSize: 10,
    color: '#999',
    fontFamily: "montserratMeduim"

  },
  rightSide: {
    paddingRight: 10,
  },
});
