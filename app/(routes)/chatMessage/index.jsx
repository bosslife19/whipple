import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import ChatSearch from '../../../screen/chat/ChatScreen'

export default function ChatMessage() {
  return (
    <View  >
       <ChatSearch/>
    </View>
  )
}

const styles = StyleSheet.create({
  containers: {
    // alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: "#000",
    height:"100%",
    // justifyContent:"center",
    // marginVertical:70,
    flex:1,
  },
  btn:{
    textDecorationLine:"underline",
    color:"#fff",
    backgroundColor:"#fff"
  }
})