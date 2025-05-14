 import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
 import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
 
const FloatingMessage = () => {
   

  return (
    <TouchableOpacity onPress={()=> router.push("/(routes)/chatMessage")} style={{position:"absolute",bottom:"14%",right:30,zIndex:10000,backgroundColor:"#fff",padding:8,borderRadius:40,elevation:1}}>
      <MaterialIcons name="message" size={24} color="black" />
     </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    // Additional styling if needed
  },
});

export default FloatingMessage;
