import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native';
import NormalDeposit from './NormalDeposit';
import BankTransfer from './BankTransfer';
import Header from '../Header/Header';
import Header2 from '../Header/Header2';
import { FontAwesome } from '@expo/vector-icons';
 
const banks = [
  { id: '1', name: 'Access Bank', logo: require('../../assets/images/access-bank-plc-logo-png_seeklogo-492413.png'), customerId: '1234567890' },
  { id: '2', name: 'FirstBank', logo: require('../../assets/images/first-bank.png'), customerId: '9876543210' },
]; 

export default function DepositPage() {
  const [activeTab, setActiveTab] = useState('normal');
  const [amount, setAmount] = useState('');
  const [selectedBank, setSelectedBank] = useState(null);

  return (
    <>
       <Header2 name="Deposit" arrow="arrow-back" backgroundColor="#A8BFED" />
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          onPress={() => setActiveTab('normal')}
          style={[styles.tab, activeTab === 'normal' && styles.activeTab]}
        >
            <View style={{flexDirection:"row",alignItems:"center",marginBottom:5}}>
            <FontAwesome name="star" size={24} color="black" />
           <FontAwesome name="star" size={24} color="black" />
           <FontAwesome name="star" size={24} color="black" />
           </View>
           <Text style={[styles.tabText, activeTab === 'normal' && styles.activeTabText]}>
            Popular
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setActiveTab('bank')}
          style={[styles.tab, activeTab === 'bank' && styles.activeTab]}
        >
            <FontAwesome name="bank" size={24} color="black" style={{marginBottom:5}} />          
            <Text style={[styles.tabText, activeTab === 'bank' && styles.activeTabText]}>
            Bank Transfer
          </Text>
        </TouchableOpacity>
      </View>

      {activeTab === 'normal' ? (
        <NormalDeposit amount={amount} setAmount={setAmount} />
      ) : (
        <BankTransfer selectedBank={selectedBank} setSelectedBank={setSelectedBank} banks={banks} />
      )}
    </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
  },
  tab: {
    flex: 1,
    paddingVertical: 19,
    marginHorizontal:5,
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#E0E0E0',

  },
  activeTab: {
    backgroundColor: '#CAE4FF',
    borderWidth:1,
    borderColor:"#007BFF",
    
  },
  tabText: {
    color: '#888',
    fontFamily: "MonteserratRegular"

  },
  activeTabText: {
    color: '#212121',
    fontFamily: "MonteserratRegular",
    fontWeight: 'bold',
  },
});
