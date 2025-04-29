import React, { useEffect, useRef, useState } from 'react';
import { Animated, Text, View, StyleSheet, Easing, ImageBackground, TouchableOpacity } from 'react-native';
import imags from '../../assets/images/games/pngtree-creative-website-color-contrast-background-image_2344637.jpg'
import { MaterialIcons } from '@expo/vector-icons'; // MaterialIcons for icon

// List of names and possible amounts to randomly choose from
const names = ["John", "Sarah", "Mike", "Emily", "Daniel"];
const amounts = ["₦50,000 Virtual Coin", "₦120,000 from Wheel Spin", "₦75,000 from Dice Roll", "₦200,000 Color Roulette", "₦15,000"];

const SlideShowBet = () => {
  const translateY = useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = useState(0);

  // Function to generate a random winner message
  const getRandomWinner = () => {
    const name = names[Math.floor(Math.random() * names.length)];
    const amount = amounts[Math.floor(Math.random() * amounts.length)];
    return `${name} won ${amount}!`;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      Animated.timing(translateY, {
        toValue: -50, // slide up
        duration: 500,
        useNativeDriver: true,
        easing: Easing.out(Easing.ease),
      }).start(() => {
        // After animation, update index with random winner
        setCurrentIndex((prev) => (prev + 1) % names.length);
        translateY.setValue(50); // reset down
        Animated.timing(translateY, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
          easing: Easing.out(Easing.ease),
        }).start();
      });
    }, 3000); // every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <ImageBackground 
      source={imags} 
      style={styles.container}
    >
     <MaterialIcons style={{justifyContent:"flex-start",}} name="speaker-phone" size={24} color="#fff" />      
     <Animated.View style={{ transform: [{ translateY }] }}>
        <Text style={styles.winnerText}>{getRandomWinner()}</Text>
      </Animated.View>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Play</Text>
        <MaterialIcons name="play-arrow" size={14} color="#fff" />
      </TouchableOpacity>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    overflow: 'hidden',
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: 'center',
    paddingVertical: 5, // Padding for a cleaner layout
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4CAF50',  // Green background for the button
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 4,
    marginRight: 10,
  },
  buttonText: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#fff',
  },
  winnerText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff', // White text for better contrast with the background
    textAlign: 'center',
    fontFamily: 'Arial', // Professional clean font
    textShadowColor: '#000', // Adding text shadow for depth
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
});

export default SlideShowBet;
