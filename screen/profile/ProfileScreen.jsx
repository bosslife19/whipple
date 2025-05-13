import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
// import FLipCoin from '../../styles/flipcoin/flipCoin';
import BankInfoScreen from './Sections/Bank';
import Personal from './Sections/Personal';
import Profilescs from '../../styles/profileScren.styles';
import Header from '../Header/Header';

const ProfileScreen = () => {
  const [activeTab, setActiveTab] = useState('Personal');

  return (
    <View style={{height:'100%'}}>
    <Header name={'Profile Screen'} />
    <ScrollView style={Profilescs.container}>
          <Text style={Profilescs.title}>Profile</Text>

          {/* Tabs */}
          <View style={Profilescs.tabList}>
              {['Personal', 'Bank'].map(tab => (
                  <TouchableOpacity
                      key={tab}
                      onPress={() => setActiveTab(tab)}
                      style={[
                          Profilescs.tabButton,
                          activeTab === tab && Profilescs.tabButtonActive,
                      ]}
                  >
                      <Text
                          style={[
                              Profilescs.tabText,
                              activeTab === tab && Profilescs.tabTextActive,
                          ]}
                      >
                          {tab} Info
                      </Text>
                  </TouchableOpacity>
              ))}
          </View>

          {/* Personal Info Section */}
          {activeTab === 'Personal' && (
              <Personal />
          )}

          {/* Personal Info Section */}
          {activeTab === 'Bank' && (

              <BankInfoScreen />

          )}


      </ScrollView></View>
  );
};

export default ProfileScreen;


