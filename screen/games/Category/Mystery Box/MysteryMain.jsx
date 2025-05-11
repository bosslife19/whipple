import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Box, Check, CheckCheck } from 'lucide-react-native'; // Check icon from lucide-react-native
import Header from '../../../Header/Header';
import dicestyles from '../../../../styles/diceGame/dice.styles';

const MysteryMain = () => {
  const boxes = ['Box 1', 'Box 2', 'Box 3'];
  
  // State to track selected box
  const [selectedBox, setSelectedBox] = useState(null);

  // State to track hovered box (for hover effect simulation)
  const [hoveredBox, setHoveredBox] = useState(null);

  const handleBoxPress = (label) => {
    setSelectedBox(label); // Mark the box as selected
  };

  return (
    <>
    <Header name={'Mystery Box Game'} />
    <View style={styles.container}>
    <Text style={[styles.title,{textAlign:"left",width:"100%"}]}>Create Mystery Box Game </Text>
    <Text style={[dicestyles.label,{marginTop:-19}]}>Select a winning box and set your stake as The House</Text>

          <Text style={styles.title}>Select a Winning Box</Text>

          <View style={styles.boxContainer}>
              {boxes.map((label, index) => (
                  <TouchableOpacity
                      key={index}
                      style={[
                          styles.box,
                          {
                              borderColor: selectedBox === label
                                  ? 'green' // Green border when selected
                                  : hoveredBox === label
                                      ? 'blue' // Blue border on hover
                                      : '#D1D5DB', // Default gray border
                          },
                      ]}
                      activeOpacity={0.7}
                      onPress={() => handleBoxPress(label)}
                      onMouseEnter={() => setHoveredBox(label)} // Hover effect simulation (for web)
                      onMouseLeave={() => setHoveredBox(null)} // Reset hover state
                  >
                      <Box size={32} color={selectedBox === label ? 'green' : '#6B7280'} />

                      <Text style={styles.boxLabel}>{label}</Text>


                      {/* Check icon */}
                      {selectedBox === label && (
                          //  <CheckCheck/>
                          <Check size={20} color="green" />
                      )}
                  </TouchableOpacity>
              ))}
          </View>

          <Text style={styles.infoText}>
              Click on a box to select it as the winning box. Players will bet against your selected box.
          </Text>
      </View></>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 24,
  },
  boxContainer: {
    flexDirection: 'row',
    gap: 2, // For RN < 0.73, use marginRight manually
    marginBottom: 32,
    paddingHorizontal:20
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
    position: 'relative', // For positioning the check icon inside the box
  },
  boxLabel: {
    marginTop: 4,
    fontWeight: '700',
  },
  infoText: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
  checkIcon: {
    // position: 'absolute',
    // top: '50%',
    // left: '50%',
    transform: [{ translateX: -12 }, { translateY: -12 }], // Center the check icon inside the box
  },
});

export default MysteryMain;
