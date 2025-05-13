import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Profilescs from '../../../styles/profileScren.styles';
import FLipCoin from '../../../styles/flipcoin/flipCoin';

const Personal = () => {
      const [fullName, setFullName] = useState(' ');
      const [email, setEmail] = useState(' ');
      const [phone, setPhone] = useState(' ');
    
    return (
        <>
        <View style={Profilescs.card}>
          <Text style={Profilescs.sectionTitle}>Personal Information</Text>

          <View style={Profilescs.inputGroup}>
            <Text style={Profilescs.label}>Full Name</Text>
            <TextInput
              style={Profilescs.input}
              value={fullName}
              onChangeText={setFullName}
            />
          </View>

          <View style={Profilescs.inputGroup}>
            <Text style={Profilescs.label}>Email</Text>
            <TextInput
              style={Profilescs.input}
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <View style={Profilescs.inputGroup}>
            <Text style={Profilescs.label}>Phone Number</Text>
            <TextInput
              style={Profilescs.input}
              value={phone}
              onChangeText={setPhone}
            />
          </View>

          <TouchableOpacity style={FLipCoin.FlipButton}>
            <Text style={[Profilescs.saveButtonText,{width:'100%',textAlign:'center'}]}>Save Changes</Text>
          </TouchableOpacity>
        </View>

       
      </>
    );
}

 
export default Personal;
