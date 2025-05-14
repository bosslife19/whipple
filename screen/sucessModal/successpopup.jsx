import React, { useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  Modal,
  ImageBackground,
  Dimensions,
  Animated,
  Easing,
  StatusBar,
} from 'react-native';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

const SuccessModal = ({ visible, onClose }) => {
  const router = useRouter();
  const scaleAnim = useRef(new Animated.Value(0.5)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
 
  useEffect(() => {
    if (visible) {
      // Animate modal appearance
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 300,
          easing: Easing.out(Easing.exp),
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();

      // Navigate after 3s
      const timer = setTimeout(() => {
        onClose();
        router.replace('/(tabs)/home');
      }, 3000);

      return () => clearTimeout(timer);
    } else {
      // Reset for next open
      scaleAnim.setValue(0.5);
      opacityAnim.setValue(0);
    }
  }, [visible]);

  return (
    <Modal visible={visible} animationType="none" transparent>
      <StatusBar backgroundColor="rgba(0,0,0,0.5)" />
      <View style={styles.container}>
        <Animated.View
          style={[
            styles.animatedWrapper,
            {
              transform: [{ scale: scaleAnim }],
              opacity: opacityAnim,
            },
          ]}
        >
          <ImageBackground
            source={require('../../assets/images/OTP Successful Modal.png')}
            style={styles.background}
            imageStyle={{ borderRadius: 20 }}
          />
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.64)',
  },
  animatedWrapper: {
    width: width * 0.8,
    height: 350,
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    overflow: 'hidden',
  },
});

export default SuccessModal;
