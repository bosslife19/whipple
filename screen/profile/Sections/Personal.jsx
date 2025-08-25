import React, { useContext, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import Profilescs from '../../../styles/profileScren.styles';
import FLipCoin from '../../../styles/flipcoin/flipCoin';
import { useRequest } from '../../../hooks/useRequest';
import { Alert } from 'react-native';
import { AuthContext } from '../../../context/AuthContext';

const Personal = () => {
      const [fullName, setFullName] = useState('');
      const [email, setEmail] = useState('');
      const [phone, setPhone] = useState('');
      const {makeRequest, loading} = useRequest()
      const {userDetails} = useContext(AuthContext);
      const savePersonal = async ()=>{
       

       
        try {
          
           const res = await makeRequest('/update-profile', {name:fullName, email, phone});
          
        if(res.response.status){
          return Alert.alert('Success', 'Profile updated successfully');
        }else{
          Alert.alert('Error', 'Error updating profile');
        }
        } catch (error) {
          console.log(error)
          
        }
 
       
      }
    
    return (
        <>
        <View style={Profilescs.card}>
          <Text style={Profilescs.sectionTitle}>Personal Information</Text>

          <View style={Profilescs.inputGroup}>
            <Text style={Profilescs.label}>Full Name</Text>
            <TextInput
              style={Profilescs.input}
              value={userDetails.name}
              onChangeText={(val)=>setFullName(val)}
            />
          </View>

          <View style={Profilescs.inputGroup}>
            <Text style={Profilescs.label}>Email</Text>
            <TextInput
              style={Profilescs.input}
              value={userDetails.email}
              onChangeText={(val)=>setEmail(val)}
            />
          </View>

          <View style={Profilescs.inputGroup}>
            <Text style={Profilescs.label}>Phone Number</Text>
            <TextInput
              style={Profilescs.input}
              value={userDetails.phone}
              editable={true}
              onChangeText={(val)=>setPhone(val)}
            />
          </View>

          {/* <TouchableOpacity style={FLipCoin.FlipButton} onPress={savePersonal}>
            {
              loading?(<ActivityIndicator color="white" size={20}/>):(
                <Text style={[Profilescs.saveButtonText,{width:'100%',textAlign:'center'}]}>Save Changes</Text>
              )
            }
          </TouchableOpacity> */}
        </View>

       
      </>
    );
}

 
export default Personal;
