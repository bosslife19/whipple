import React, { useRef, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Animated, Alert } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useLocalSearchParams } from 'expo-router';
import ColorRou from '../../../../styles/colorRoulete.styles';

const ColorRouletteSelect = () => {
  const [selectedColor, setSelectedColor] = useState(null);
  const [activeColors, setActiveColors] = useState([]);
  const [loading, setLoading] = useState(false);
  const { gameLabel, range, totalOdds, selected: selectedParam, GameName = 'Color Roulette' } = useLocalSearchParams();

  const spinValue = useRef(new Animated.Value(0)).current;

  const colors = [
    { id: 'red', hex: '#EA384C', label: 'Red' },
    { id: 'blue', hex: '#0EA5E9', label: 'Blue' },
    { id: 'green', hex: '#22C55E', label: 'Green' },
    { id: 'yellow', hex: '#EAB308', label: 'Yellow' },
  ];

  useEffect(() => {
    if (selectedParam) {
      const match = colors.find(c => c.id === selectedParam);
      if (match) {
        setSelectedColor(match);
      }
    }
  }, [selectedParam]);

  const handleColorSelect = (color) => {
    setSelectedColor(color);
  };

  const spinWheel = () => {
    setLoading(true);
    Animated.timing(spinValue, {
      toValue: 360 * 4,
      duration: 2000,
      useNativeDriver: true,
    }).start(() => {
      spinValue.setValue(0);
      const shuffled = colors.sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, 2).map(c => c.id);
      setActiveColors(selected);
      setLoading(false);
    });
  };

  const spin = spinValue.interpolate({
    inputRange: [0, 360 * 4],
    outputRange: ['0deg', `${360 * 4}deg`],
  });

  const getOpacity = (id) => {
    return activeColors.length === 0 || activeColors.includes(id) ? 1 : 0.4;
  };

  useEffect(() => {
    if (!loading && activeColors.length > 0 && selectedColor) {
      if (activeColors.includes(selectedColor.id)) {
        Alert.alert('🎉 You won!');
      } else {
        Alert.alert('😢 Better luck next time!');
      }
    }
  }, [activeColors, loading]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Color Roulette Game</Text>
        <Text style={styles.description}>Select a color and try to match the House's colors!</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>{GameName}</Text>
        <Text style={styles.cardSubtitle}>House: @user</Text>
      </View>

      <View style={styles.wheelContainer}>
        <View style={ColorRou.wheelContainer}>
          <Animated.View style={[ColorRou.wheel, { transform: [{ rotate: spin }] }]}>
            <Svg height="100%" width="100%" viewBox="0 0 100 100">
              <Path d="M50 50L70 5L195 5Z" fill="#EA384C" opacity={getOpacity('red')} />
              <Path d="M50 50L101 50L95 90Z" fill="#0EA5E9" opacity={getOpacity('blue')} />
              <Path d="M50 50L48 100L5 95Z" fill="#22C55E" opacity={getOpacity('green')} />
              <Path d="M50 50L0 50L5 5Z" fill="#EAB308" opacity={getOpacity('yellow')} />
            </Svg>
          </Animated.View>
        </View>

        <View style={styles.colorOptions}>
          {colors.map((color) => (
            <TouchableOpacity
              key={color.id}
              style={[
                styles.colorButton,
                {
                  backgroundColor: color.hex,
                  opacity: selectedColor?.id === color.id ? 1 : 0.7,
                  borderWidth: selectedColor?.id === color.id ? 2 : 0,
                  borderColor: selectedColor?.id === color.id ? '#000' : 'transparent',
                },
              ]}
              onPress={() => handleColorSelect(color)}
            >
              <Text style={styles.colorButtonText}>{color.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={[styles.spinButton, { opacity: selectedColor === null || loading ? 0.5 : 1 }]}
          disabled={selectedColor === null || loading}
          onPress={spinWheel}
        >
          <Text style={styles.spinButtonText}>{loading ? 'Spinning...' : 'Spin Wheel'}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>How To Win</Text>
        <Text style={styles.cardDescription}>
        How To Win
        Select a color and spin the wheel. If your color matches one of the two colors the House chose, you win! 
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#EEF6FF',
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    color: '#666',
    fontSize: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    marginBottom: 16,
    padding: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#888',
  },
  wheelContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  colorOptions: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 16,
  },
  colorButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
    marginHorizontal: 6,
  },
  colorButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  spinButton: {
    backgroundColor: '#0A1931',
    borderRadius: 8,
    paddingHorizontal: 30,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  spinButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  cardDescription: {
    color: '#666',
    fontSize: 14,
  },
});

export default ColorRouletteSelect;
