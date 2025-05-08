import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import Header from '../../../../../../screen/Header/Header';
import HeaderBet from '../../../../../../screen/Header/HeaderBet';

const ConfirmGameDetails = () => {
  const router = useRouter();
  const { stake, odds, gameLabel, GameName, range, selected ,selectionCount} = useLocalSearchParams();

  return (
    <>
    <HeaderBet arrow name={GameName} backgroundColor="#A8BFED" />
    <ScrollView contentContainerStyle={styles.container}>
          {/* Header Section */}
          <View style={styles.header}>
              {/* <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                  <Text style={styles.backText}>← Back to Games</Text>
              </TouchableOpacity> */}
              <Text style={styles.title}>{GameName}</Text>
              <Text style={styles.subTitle}>
                  {GameName} - {gameLabel} (2 from 1-{range})
              </Text>
          </View>

          {/* Game Details Section */}
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

          {/* Betting Section */}
          <View style={styles.card}>
              <Text style={styles.sectionTitle}>Place Your Bet</Text>
              <Text style={styles.info}>Betting against The House</Text>

              <View style={styles.detailRow}>
                  <View>
                      <Text style={styles.label}>House Stake</Text>
                      <Text style={styles.value}>₦{stake}</Text>
                  </View>
                  <View>
                      <Text style={styles.label}>Required Stake</Text>
                      <Text style={styles.value}>₦800</Text>
                  </View>
              </View>

              <Text style={styles.label}>Potential Win</Text>
              <Text style={styles.value}>₦{stake}</Text>

              <Text style={styles.label}>Your Balance</Text>
              <Text style={styles.value}>₦100,000</Text>

              {/* Bottom Buttons */}
              <View style={styles.buttonRow}>
                  <TouchableOpacity style={styles.secondaryBtn} onPress={() => router.back()}>
                      <Text style={styles.secondaryBtnText}>GO BACK</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                   onPress={() =>
                    router.push({
                        pathname: '/(routes)/games/availablegames/luckynumbers/confirmLuckyNumbers',
                        params: {
                        stake: stake.toString(),
                        odds: odds,
                        selectionCount,
                        gameLabel,
                        GameName,
                        range,
                        selected,
                      },
                    })
                  }
                  style={styles.primaryBtn}>
                      <Text style={styles.primaryBtnText}>CONTINUE</Text>
                  </TouchableOpacity>
              </View>
          </View>
      </ScrollView></>
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
  backButton: {
    marginBottom: 8,
  },
  backText: {
    color: '#3b82f6',
    fontWeight: '500',
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
