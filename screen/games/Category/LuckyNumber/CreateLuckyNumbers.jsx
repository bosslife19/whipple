import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import Header from '../../../Header/Header';
import bgs from '../../../../assets/images/games/image_fx_ (35) 1.png';
import CreateGames2 from '../../../../styles/creategames/creategames.styles';
import creategame from '../../../../styles/creategame/creategame.styles';

const formatCurrency = (value) => {
  if (!value) return '';
  const num = parseInt(value.toString(), 10);
  return `₦${num.toLocaleString()}`;
};

const CreateLuckyNumbers = () => {
  const { gameLabel, range, totalOdds, selectionCount,GameName } = useLocalSearchParams();
  const parsedRange = parseInt(range, 10);
  const parsedSelectionCount = parseInt(selectionCount, 10);
  const parsedTotalOdds = parseFloat(totalOdds);

  const [selectedNumbers, setSelectedNumbers] = useState([]);
  const [stakeAmount, setStakeAmount] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false);

  const handleNumberSelect = (number) => {
    if (selectedNumbers.includes(number)) {
      setSelectedNumbers((prev) => prev.filter((n) => n !== number));
    } else {
      if (selectedNumbers.length < parsedSelectionCount) {
        setSelectedNumbers((prev) => [...prev, number]);
      }
    }
  };

  const isPublishDisabled = selectedNumbers.length !== parsedSelectionCount  ;
  const stake = parseInt(stakeAmount || '0', 10);
  const admissionFee = Math.round(stake * 0.25);
  const totalAmount = stake + admissionFee;

  const handlePublish = () => {
    if (selectedNumbers.length !== parsedSelectionCount) {
      alert(`Please select exactly ${parsedSelectionCount} number${parsedSelectionCount > 1 ? 's' : ''}.`);
      return;
    }
  
    if (isNaN(stake) || stake <= 0) {
      alert('Please enter a valid stake amount greater than ₦0.');
      return;
    }
  
    router.push({
      pathname: '/(tabs)/home',
      params: {
        stake: stake.toString(),
        odds: parsedTotalOdds + 'x',
        gameLabel,
        GameName,
        range,
        selected: selectedNumbers.join(','),
      },
    });
  };
  

  return (
    <>
      <Header backgroundColor="#A8BFED" />
      <ImageBackground source={bgs} style={creategame.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView
              contentContainerStyle={CreateGames2.scrollContainer}
              keyboardShouldPersistTaps="handled"
            >
              <View style={CreateGames2.container}>
                <Text style={CreateGames2.title}>Select Exactly {parsedSelectionCount}</Text>
                <Text style={CreateGames2.subtitle}>
                  {gameLabel} (1 - {parsedRange})
                </Text>
                <Text style={CreateGames2.subtitle}>
                  Select exactly {parsedSelectionCount} number{parsedSelectionCount > 1 ? 's' : ''} from the grid below
                </Text>

                {selectedNumbers.length > 0 && (
                  <View style={CreateGames2.selectedDisplay}>
                    <Text style={CreateGames2.selectedText}>
                      Selected: {selectedNumbers.join(', ')}
                    </Text>
                  </View>
                )}

                <View style={CreateGames2.grid}>
                  {Array.from({ length: parsedRange }).map((_, index) => {
                    const num = index + 1;
                    const isSelected = selectedNumbers.includes(num);
                    return (
                      <TouchableOpacity
                        key={num}
                        onPress={() => handleNumberSelect(num)}
                        style={[
                          CreateGames2.numberBtn,
                          isSelected && CreateGames2.numberBtnActive,
                        ]}
                      >
                        <Text
                          style={[
                            CreateGames2.numberText,
                            isSelected && CreateGames2.numberTextActive,
                          ]}
                        >
                          {num}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>

                <View style={CreateGames2.card}>
                  <View style={CreateGames2.cardHeader}>
                    <Text style={CreateGames2.cardTitle}>3. Set Stake Amount</Text>
                  </View>
                  <View style={CreateGames2.cardBody}>
                    <Text style={CreateGames2.label}>Stake Amount (₦)</Text>
                    <TextInput
                      style={CreateGames2.input}
                      keyboardType="numeric"
                      placeholder="Enter amount"
                      value={stakeAmount === '' ? '' : formatCurrency(stakeAmount)}
                      onFocus={() => setIsInputFocused(true)}
                      onBlur={() => setIsInputFocused(false)}
                      onChangeText={(text) => {
                        const raw = text.replace(/[₦,]/g, '');
                        if (!isNaN(Number(raw))) {
                          setStakeAmount(raw);
                        }
                      }}
                    />

                    {(isInputFocused || stakeAmount !== '') && (
                      <View style={CreateGames2.breakdownCard}>
                        <Text style={CreateGames2.breakdownTitle}>Amount Breakdown</Text>
                        <View style={CreateGames2.breakdownRow}>
                          <Text style={CreateGames2.breakdownLabel}>Stake Amount:</Text>
                          <Text style={CreateGames2.breakdownValue}>
                            {formatCurrency(stake)}
                          </Text>
                        </View>
                        <View style={CreateGames2.breakdownRow}>
                          <Text style={CreateGames2.breakdownLabel}>Admission Fee (25%):</Text>
                          <Text style={CreateGames2.breakdownValue}>
                            {formatCurrency(admissionFee)}
                          </Text>
                        </View>
                        <View style={CreateGames2.breakdownRow}>
                          <Text style={CreateGames2.breakdownLabel}>Total:</Text>
                          <Text style={CreateGames2.breakdownValue}>
                            {formatCurrency(totalAmount)}
                          </Text>
                        </View>
                      </View>
                    )}
                  </View>
                </View>

                <TouchableOpacity
                  style={[
                    CreateGames2.publishBtn,
                    (!isPublishDisabled || stake <= 0) ? {} : { backgroundColor: '#ccc' }
                  ]}
                  disabled={isPublishDisabled}
                  onPress={handlePublish}
                >
                  <Text style={CreateGames2.publishBtnText}>Publish Game</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </ImageBackground>
    </>
  );
};

export default CreateLuckyNumbers;
