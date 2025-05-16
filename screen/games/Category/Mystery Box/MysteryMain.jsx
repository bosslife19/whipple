// components/MysteryMain.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ImageBackground, ActivityIndicator, TextInput } from 'react-native';
// import { Box, Check } from 'lucide-react-native'; // Check icon from lucide-react-native
// import { useGameContext } from '../../../../context/GameContext'; // Import useGameContext hook
import Header from '../../../Header/Header';
import dicestyles from '../../../../styles/diceGame/dice.styles';
import WheelSPins from '../../../../styles/spining/wheelspining.styles';
import { router } from 'expo-router';
import { useGameContext } from '../../../../context/AppContext';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';

const MysteryMain = () => {
  const boxes = ['Box 1', 'Box 2', 'Box 3'];

  // Access game data from context
  const { gameData, updateGameData } = useGameContext();

  const [stake, setStake] = useState(''); // Use game data from context
  const [walletBalance, setWalletBalance] = useState(10000); // Example wallet balance
  const [loading, setLoading] = useState(false);

  // Track selected box
  const [selectedBox, setSelectedBox] = useState( null);

  const handleBoxPress = (label) => {
    // If the same box is tapped again, unselect it
    if (selectedBox === label) {
      setSelectedBox(null);
    } else if (selectedBox === null) {
      // Only allow selecting a new box if none is currently selected
      setSelectedBox(label);
    }
  };

  const handleStakeChange = (value) => {
    setStake(value);
    updateGameData({ stake: value }); // Update stake in context
  };

  const parsedStake = parseFloat(stake) || 0;
  const admissionFee = parsedStake * 0.25;

  const isPublishEnabled = parsedStake > 0 && selectedBox;
  const totalAmount = parsedStake + admissionFee;

  const handlePublish = () => {
    const mainOdd = '3.003x';
    const GameName = 'Mystery Box';
    setLoading(true);

    // Save game data to the context
    updateGameData({
      selectedBox,
      stake: totalAmount,
      odds: mainOdd,
      GameName,
      gameLabel: `${selectedBox} is the winning box`,
    });

    setTimeout(() => {
      // Now navigate to the game page
      router.push('/(routes)/games/availablegames');
      setLoading(false);
    }, 2000);
  };

useEffect(() => {
  // Only update the context if the selectedBox has actually changed
  if (gameData.selectedBox !== selectedBox) {
    updateGameData({ selectedBox });
  }
}, [selectedBox, gameData.selectedBox, updateGameData]);


  return (
    <>
      <Header name={'Mystery Box Game'} backgroundColor="#EEF6FF" />
      <ScrollView>
        <ImageBackground source={require("../../../../assets/images/games/mys.jpg")} style={{}} resizeMode="cover">
          <View style={styles.container}>
            <Text style={[styles.title, { textAlign: 'left', width: '100%' }]}>Create Mystery Box Game</Text>
            <Text style={[dicestyles.label, { marginTop: -19, fontWeight: '400', color: "#333" }]}>Select a winning box and set your stake as The House</Text>

            <Text style={[styles.title, { marginVertical: 15 }]}>Select a Winning Box</Text>

            <View style={styles.boxContainer}>
              {boxes.map((label, index) => (
                <TouchableOpacity
                  key={index}
                  style={[styles.box, {
                    borderColor: selectedBox === label ? '#22C55E' : '#D1D5DB',
                  }]}
                  activeOpacity={0.7}
                  onPress={() => handleBoxPress(label)}
                >
                  <MaterialCommunityIcons name="cube-outline" size={32} color="#6B7280" />
                  {/* <Box size={32} color={'#6B7280'} /> */}
                  <Text style={styles.boxLabel}>{label}</Text>
                  {selectedBox === label && 
                  <Feather name="check" size={20} color="#22C55E" />
                  // <Check size={20} color="#22C55E" />
                  }
                </TouchableOpacity>
              ))}
            </View>

            {selectedBox && <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 16 }}>{selectedBox} is the winning Box!</Text>}
            <Text style={styles.infoText}>Click on a box to select it as the winning box. Players will bet against your selected box.</Text>

            <View style={[dicestyles.card, { marginTop: 20, width: "100%", borderColor: "#0A1931", borderWidth: 1, backgroundColor: "#EEF6FF" }]}>
              <Text style={dicestyles.title}>Set Your Stake</Text>
              <Text style={dicestyles.label}>Your Stake (₦)</Text>

              <TextInput
                style={[dicestyles.input, { borderColor: "#0A1931", borderWidth: 1 }]}
                placeholder="Enter stake amount"
                value={stake}
                onChangeText={handleStakeChange}
                keyboardType="numeric"
              />

              <View style={dicestyles.feeRow}>
                <Text>Admission Fee (25%)</Text>
                <Text>₦{admissionFee.toLocaleString(undefined, { maximumFractionDigits: 2 })}</Text>
              </View>

              <View style={dicestyles.feeRow}>
                <Text style={{ fontWeight: 'bold', color: "#0A1931" }}>Total Amount</Text>
                <Text style={{ fontWeight: 'bold' }}>₦{totalAmount.toLocaleString(undefined, { maximumFractionDigits: 2 })}</Text>
              </View>

              <Text>Your wallet balance: ₦{walletBalance.toLocaleString()}</Text>

              <TouchableOpacity
                onPress={handlePublish}
                style={[dicestyles.button, { backgroundColor: isPublishEnabled ? '#0A1931' : '#ccc', marginTop: 16 }]}
                disabled={!isPublishEnabled}
              >
                {loading ? <ActivityIndicator color="#fff" /> : <Text style={WheelSPins.publishText}>Publish Game</Text>}
              </TouchableOpacity>
            </View>

            <View style={[dicestyles.card, { borderColor: "#0A1931", borderWidth: 1, backgroundColor: "#EEF6FF" }]}>
              <Text style={dicestyles.title}>How It Works</Text>
              <Text style={dicestyles.description}>
                Select one of the three boxes as the winning box. Players will bet against your selection with odds of 3.003x.
                If they correctly guess which box you selected, they win. If they guess wrong, you win.
              </Text>
            </View>
          </View>
        </ImageBackground>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    alignItems: 'center',
    marginBottom: '50%',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 24,
    fontFamily: "PoppinsReg",
  },
  boxContainer: {
    flexDirection: 'row',
    gap: 2,
    marginBottom: 32,
    paddingHorizontal: 20,
  },
  box: {
    width: "36%",
    height: 96,
    borderWidth: 3,
    borderStyle: 'dashed',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 8,
    position: 'relative',
  },
  boxLabel: {
    marginTop: 4,
    fontWeight: '700',
  },
  infoText: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
    fontFamily: "montserratMeduim",
  },
});

export default MysteryMain;
