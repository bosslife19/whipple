import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Box } from 'lucide-react-native';

const MysteryMain = () => {
  const boxes = ['Box 1', 'Box 2', 'Box 3'];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select a Winning Box</Text>

      <View style={styles.boxContainer}>
        {boxes.map((label, index) => (
          <TouchableOpacity
            key={index}
            style={styles.box}
            activeOpacity={0.7}
            onPress={() => console.log(`${label} selected`)}
          >
            <Box size={32} color="#6B7280" /> {/* Tailwind gray-500 */}
            <Text style={styles.boxLabel}>{label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.infoText}>
        Click on a box to select it as the winning box. Players will bet against your selected box.
      </Text>
    </View>
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
    gap: 16, // For RN < 0.73, use marginRight manually
    marginBottom: 32,
  },
  box: {
    width: 96,
    height: 96,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#D1D5DB', // Tailwind gray-300
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 8,
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
});

export default MysteryMain;
