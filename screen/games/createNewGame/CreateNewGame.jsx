import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Modal, TouchableOpacity, Dimensions, ImageBackground } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import HeaderBet from '../../Header/HeaderBet';
import bgs from "../../../assets/images/games/image_fx_ (35) 1.png"
import { ScrollView } from 'react-native';
import { formatCurrencies, formatCurrency } from '../../../utlils/formatCurrency';
import GameStakeModal from './modal/GameStakeModal';
import creategame from '../../../styles/creategame/creategame.styles';
import { StatusBar } from 'react-native';
const { width } = Dimensions.get('window');
 
const CreateGameScreen = () => {
  const [stake, setStake] = useState('');
  const [correctNumber, setCorrectNumber] = useState('');
  const [hh, setHh] = useState('00');
  const [mm, setMm] = useState('00');
  const [ss, setSs] = useState('00');
  const [modalVisible, setModalVisible] = useState(false);

  const handlePublish = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <>
    <HeaderBet   arrow backgroundColor='#A8BFED' amount={200} />
   <ScrollView contentContainerStyle={{height:"110%"}}>
    <ImageBackground source={bgs} style={creategame.container}>
      {/* Title & Subtitle */}
      <Text style={creategame.title}>Create Your Game</Text>
      <Text style={creategame.subtitle}>Setup game configuration, rules and parameters</Text>

      <Text style={[creategame.subtitle,{fontWeight:700,color:"#fff",marginTop: 40,}]}>Game type</Text>
      <Text style={[creategame.title,{marginBottom:13}]}>selected game</Text>

      {/* Stake Amount Input */}
      <Text style={creategame.label}>Stake Amount</Text>
      <TextInput
        style={creategame.input}
        keyboardType="numeric"
        value={stake}
        placeholderTextColor="#fff"
        onChangeText={setStake}
        placeholder="Enter stake amount"
      />

      {/* Correct Number Input */}
      <Text style={[creategame.label,{marginTop:15}]}>Input Correct Number(s)</Text>
      <TextInput
        style={creategame.input}
        placeholderTextColor="#fff"
        keyboardType="numeric"
        value={correctNumber}
        onChangeText={setCorrectNumber}
        placeholder="Enter correct number"
      />

      {/* Duration Selection */}
      <Text style={creategame.label}> Duration</Text>
      <View style={creategame.durationRow}>
        <Picker selectedValue={hh} style={creategame.picker} onValueChange={setHh}>
          {Array.from({ length: 24 }, (_, i) => (
            <Picker.Item key={i} label={`${i < 10 ? '0' + i : i}`} value={`${i < 10 ? '0' + i : i}`} />
          ))}
        </Picker>
        <Picker selectedValue={mm} style={creategame.picker} onValueChange={setMm}>
          {Array.from({ length: 60 }, (_, i) => (
            <Picker.Item key={i} label={`${i < 10 ? '0' + i : i}`} value={`${i < 10 ? '0' + i : i}`} />
          ))}
        </Picker>
        <Picker selectedValue={ss} style={creategame.picker} onValueChange={setSs}>
          {Array.from({ length: 60 }, (_, i) => (
            <Picker.Item key={i} label={`${i < 10 ? '0' + i : i}`} value={`${i < 10 ? '0' + i : i}`} />
          ))}
        </Picker>
      </View>

      {/* Stake Summary */}
      <View style={creategame.summary}>
        <Text style={[creategame.title,{marginBottom:10}]}>Summary</Text>
        <View style={creategame.flexD}>
      <Text style={creategame.summaryText}>Stake: </Text>
      <Text style={creategame.summaryText}>{formatCurrencies(stake)}</Text>
      </View>
      <View style={creategame.flexD}>
  <Text style={creategame.summaryText}>Admission Fee (25%): </Text>
  <Text style={creategame.summaryText}>{formatCurrencies(Number(stake) * 0.25)}</Text>
  </View>
  <View style={creategame.flexD}>
  <Text style={creategame.summaryText}>Correct Number: </Text>
  <Text style={creategame.summaryText}>{correctNumber}</Text>
  </View>
  <View style={creategame.flexD}>
  <Text style={creategame.summaryText}>Duration:</Text>
  <Text style={creategame.summaryText}> {hh}h {mm}m {ss}s</Text>
    </View>
      </View>

      {/* Publish Game Button */}
      <TouchableOpacity style={creategame.publishBtn} onPress={handlePublish}>
        <Text style={creategame.publishText}>Publish Game</Text>
      </TouchableOpacity>

      {/* Bottom Small Text */}
      <View style={creategame.bottomText}>
        <Text style={creategame.note}>Note:</Text>
        <Text style={creategame.noteSub}>Make sure the details above are correct before publishing.</Text>
      </View>

      {/* Modal for Game Details */}
     
    </ImageBackground>
    </ScrollView>
    <GameStakeModal
     modalVisible={modalVisible}
     closeModal={closeModal}
     stake={stake}
      correctNumber={correctNumber}
      hh={hh}
      mm={mm}
       ss={ss}
     />
    </>
  );
};

export default CreateGameScreen;


