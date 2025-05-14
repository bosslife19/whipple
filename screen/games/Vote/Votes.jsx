import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { RadioButton, Text, Button, ActivityIndicator } from 'react-native-paper';
import HeaderBet from '../../Header/HeaderBet';
import { router, useLocalSearchParams } from 'expo-router';

const PRIMARY_COLOR = '#1A4ED8'; // Deep Blue

const VoteDistributionScreen = () => {
  const [value, setValue] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);

    const { stake, odds, gameLabel, range, selected, GameName } = useLocalSearchParams();
  
  const handleSubmit = () => {
    if (!value) {
      alert('Please select an option.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
        router.push({
            pathname: '/(routes)/games/availablegames',
            params: {
              stake: stake?.toString(),
              odds: odds?.toString(),
              gameLabel,
              GameName,
              range: range?.toString(), 
              selected: selected?.toString(),
            },
          });
      setIsSubmitting(false);
    }, 2000);
  };

  const handleCancel = () => {
    setIsCancelling(true);
    setTimeout(() => {
      setValue('');
      setIsCancelling(false);
    }, 1000);
  };

  return (
    <>
      <HeaderBet arrow amount={'200'} backgroundColor="#E0EBFF" />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>Vote on Winning Distribution</Text>
        <Text style={styles.subHeader}>Make Your Choice</Text>
        <Text style={styles.description}>
          Choose how the winners should be rewarded. Select between one, two, or three winners to receive the prize.
        </Text>

        <RadioButton.Group onValueChange={setValue} value={value}>
          <View style={styles.radioContainer}>
            {[
              { key: 'one', label: 'One Winner Takes All' },
              { key: 'two', label: 'Two Winners Share Rewards' },
              { key: 'three', label: 'Three Winners Share Rewards' },
            ].map((item) => (
              <TouchableOpacity
                key={item.key}
                style={[
                  styles.radioBox,
                  value === item.key && styles.radioBoxSelected,
                ]}
                onPress={() => setValue(item.key)}
              >
                <RadioButton value={item.key} color={PRIMARY_COLOR} />
                <Text style={styles.radioLabel}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </RadioButton.Group>

        <View style={styles.buttonRow}>
          <Button
            mode="outlined"
            onPress={handleCancel}
            style={styles.button}
            disabled={isCancelling}
            textColor={PRIMARY_COLOR}
          >
            {isCancelling ? <ActivityIndicator size="small" /> : 'Cancel'}
          </Button>
          <Button
            mode="contained"
            onPress={handleSubmit}
            style={[styles.button, styles.submitButton]}
            disabled={isSubmitting}
            buttonColor={PRIMARY_COLOR}
          >
            {isSubmitting ? <ActivityIndicator color="#fff" size="small" /> : 'Submit Vote'}
          </Button>
        </View>
      </ScrollView>
    </>
  );
};

export default VoteDistributionScreen;

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flexGrow: 1,
    backgroundColor: '#F8FAFC',
    height: '100%',
  },
  header: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 8,
    color: '#0F172A',
  },
  subHeader: {
    fontSize: 18,
    color: '#334155',
    marginBottom: 6,
  },
  description: {
    fontSize: 14,
    color: '#475569',
    marginBottom: 20,
  },
  radioContainer: {
    marginTop: 12,
    gap: 14,
  },
  radioBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 16,
    elevation: 1,
  },
  radioBoxSelected: {
    borderColor: PRIMARY_COLOR,
    backgroundColor: '#EFF6FF',
  },
  radioLabel: {
    fontSize: 16,
    marginLeft: 8,
    color: '#1E293B',
    fontWeight: '500',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  button: {
    flex: 1,
    marginHorizontal: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: PRIMARY_COLOR,
  },
  submitButton: {
    borderWidth: 0,
  },
});
