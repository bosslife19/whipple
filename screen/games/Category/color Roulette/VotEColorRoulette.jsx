import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Text,
} from 'react-native';
// import HeaderBet from '../../../../Header/HeaderBet';
import { router, useLocalSearchParams } from 'expo-router';
// import Votes from '../../../styles/voteDistri.styles';
import HeaderBet from '../../../Header/HeaderBet';
import Votes from '../../../../styles/voteDistri.styles';

const PRIMARY_COLOR = '#1A4ED8'; // Deep Blue

const VoteColorRouletteScreen = () => {
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
        pathname: '/(routes)/games/category/becomethehouse/colorRoulette',
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

  const options = [
    { key: 'one', label: 'One Winner Takes All' },
    { key: 'two', label: 'Three Winners Share Rewards' },
    { key: 'Five', label: 'Five Winners Share Rewards' },
  ];

  return (

    <>
      <HeaderBet arrow amount={'200'} backgroundColor="#E0EBFF" />
      <ScrollView contentContainerStyle={Votes.container}>
        <Text style={Votes.header}>Vote on Winning Distribution</Text>
        <Text style={Votes.subHeader}>Make Your Choice</Text>
        <Text style={Votes.description}>
          Choose how the winners should be rewarded. Select between one, two, or three winners to receive the prize.
        </Text>

        <View style={Votes.radioContainer}>
          {options.map((item) => (
            <TouchableOpacity
              key={item.key}
              style={[
                Votes.radioBox,
                value === item.key && Votes.radioBoxSelected,
              ]}
              onPress={() => setValue(item.key)}
            >
              <View style={[Votes.radioCircle, value === item.key && Votes.radioCircleSelected]} />
              <Text style={Votes.radioLabel}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={Votes.buttonRow}>
          <TouchableOpacity
            style={[Votes.button, Votes.cancelButton]}
            onPress={handleCancel}
            disabled={isCancelling}
          >
            {isCancelling ? (
              <ActivityIndicator color={PRIMARY_COLOR} />
            ) : (
              <Text style={[Votes.buttonText, { color: PRIMARY_COLOR }]}>Cancel</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={[Votes.button, Votes.submitButton]}
            onPress={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={[Votes.buttonText, { color: '#fff' }]}>Submit Vote</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
};

export default VoteColorRouletteScreen;


