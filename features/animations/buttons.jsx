import React from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

const PlayButton = () => {
  return (
    <View style={styles.container}>
      <LottieView
        source={require('../../assets/animations/YcU2VlF1am.json')}
        autoPlay
        loop
        style={{ width: 30, height: 30 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    paddingRight:10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
});

export default PlayButton;
