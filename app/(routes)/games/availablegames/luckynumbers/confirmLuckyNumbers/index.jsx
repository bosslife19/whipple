import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import HeaderBet from '../../../../../../screen/Header/HeaderBet';
// import HeaderBet from '../../../../../screen/Header/HeaderBet';

const ConfirmGameDetails = () => {
  const router = useRouter();
  const { stake, odds, gameLabel, GameName, range, selected, selectionCount } = useLocalSearchParams();

  const [selectedNumbers, setSelectedNumbers] = useState([]);

  const handleNumberSelect = (number) => {
    // Toggle number selection logic
    if (selectedNumbers.includes(number)) {
      setSelectedNumbers(selectedNumbers.filter((num) => num !== number));
    } else if (selectedNumbers.length < 1) {
      setSelectedNumbers([...selectedNumbers, number]);
    }
  };

  const handleSubmit = () => {
    if (selectedNumbers.length === 1) {
      router.push({
        // pathname: '/(routes)/games/category/becomethehouse/luckynumbers-category/create-game',
        params: {
          stake: stake.toString(),
          odds,
          selectionCount,
          gameLabel,
          GameName,
          range,
          selected: selectedNumbers,
        },
      });
    } else {
      Alert.alert('Selection Error', 'Please select exactly 1 number.');
    }
  };

  return (
    <>
      <HeaderBet arrow name={GameName} backgroundColor="#A8BFED" />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>{GameName}</Text>
          <Text style={styles.subTitle}>
            {GameName} - {gameLabel} (2 from 1-{range})
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Game Details</Text>
          <Text style={styles.info}>House: @current-user</Text>
          <View style={styles.detailRow}>
            <View>
              <Text style={styles.label}>Stake</Text>
              <Text style={styles.value}>₦{stake}</Text>
            </View>
            <View>
              <Text style={styles.label}>Odds</Text>
              <Text style={styles.value}>{odds}</Text>
            </View>
          </View>
          <Text style={styles.label}>Players</Text>
          <Text style={styles.value}>9 joined</Text>
        </View>

        {/* Number Selection Section */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Select Your Lucky Numbers</Text>
          <Text style={styles.info}>House: @current-user</Text>
          <View style={styles.numberGrid}>
            {[1, 2, 3].map((num) => (
              <TouchableOpacity
                key={num}
                style={[
                  styles.numberButton,
                  selectedNumbers.includes(num) && styles.selectedNumber,
                ]}
                onPress={() => handleNumberSelect(num)}
              >
                <Text style={styles.numberText}>{num}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <Text style={styles.selectionCountText}>
            {selectedNumbers.length}/1 numbers selected
          </Text>
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.secondaryBtn} onPress={() => router.back()}>
            <Text style={styles.secondaryBtnText}>GO BACK</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSubmit} style={styles.primaryBtn}>
            <Text style={styles.primaryBtnText}>CONTINUE</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
};

export default ConfirmGameDetails;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
  },
  subTitle: {
    fontSize: 14,
    color: '#666',
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    marginBottom: 20,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  info: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  label: {
    fontSize: 13,
    color: '#888',
  },
  value: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  numberGrid: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    marginBottom: 20,
  },
  numberButton: {
    backgroundColor: '#f3f4f6',
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
  },
  selectedNumber: {
    backgroundColor: '#3b82f6',
  },
  numberText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  selectionCountText: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  primaryBtn: {
    backgroundColor: '#3b82f6',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 6,
  },
  primaryBtnText: {
    color: '#fff',
    fontWeight: '600',
  },
  secondaryBtn: {
    borderColor: '#ccc',
    borderWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 6,
  },
  secondaryBtnText: {
    color: '#333',
    fontWeight: '600',
  },
});
