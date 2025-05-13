import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  Animated,
  StyleSheet,
  Dimensions,
} from 'react-native';

const slides = [
  {
    match: 'Chelsea vs Manchester United',
    result: 'Premier League • 3-1 • Correct',
    reward: '+1 Free Bet',
  },
  {
    match: 'Arsenal vs Liverpool',
    result: 'Premier League • 2-2 • Correct',
    reward: '+1 Free Bet',
  },
  {
    match: 'Real Madrid vs Barcelona',
    result: 'La Liga • 1-0 • Correct',
    reward: '+1 Free Bet',
  },
];

const SCREEN_WIDTH = Dimensions.get('window').width;

const SlideshowSide = () => {
  const scrollX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const totalWidth = SCREEN_WIDTH * slides.length;

    const animate = () => {
      Animated.timing(scrollX, {
        toValue: -totalWidth,
        duration: 30000,
        useNativeDriver: true,
      }).start(() => {
        scrollX.setValue(0);
        animate();
      });
    };

    animate();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.sliderRow,
          {
            transform: [{ translateX: scrollX }],
          },
        ]}
      >
        {[...slides, ...slides].map((item, index) => (
          <View key={index} style={styles.card}>
            <View style={styles.innerCard}>
              <View style={styles.cardHeader}>
                <View>
                  <Text style={styles.matchText}>{item.match}</Text>
                  <Text style={styles.resultText}>{item.result}</Text>
                </View>
                <Text style={styles.rewardText}>{item.reward}</Text>
              </View>
            </View>
          </View>
        ))}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    backgroundColor: '#fff',
    paddingVertical: 10,
  },
  sliderRow: {
    flexDirection: 'row',
  },
  card: {
    width: '38%',
    height:"auto",
    marginRight: 16,
    gap:5
  },
  innerCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderColor: '#ddd',
    borderWidth: 1,
    padding: 16,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  matchText: {
    fontWeight: '600',
    fontSize: 16,
    color: '#111',
  },
  resultText: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
  },
  rewardText: {
    color: 'green',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default SlideshowSide;
