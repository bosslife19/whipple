import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Redirect, router } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage'



const Index = () => {
  const [userExists, setUserExists] = useState(false);
// useEffect(()=>{
//   const checkUserDets = async ()=>{
//     const user = await AsyncStorage.getItem('userDetails');
//     if(user){
//       return router.replace('/(tabs)/home');
//     }else{
//       setUserExists(false)
//     }
//   }

//   checkUserDets();
// }, [])

// if(!userExists){
 return <Redirect href={'/auth/login'}/>
// }
 
 
}
export default Index
