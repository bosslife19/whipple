import { Alert, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import OTPScreen from '@/screen/otp/otp'
import {useRequest} from '../../hooks/useRequest';
import { router } from 'expo-router';
import axiosClient from '@/axiosClient';

const OtpScreen = () => {
 
  const {makeRequest, loading} = useRequest();
  const submitOtp = async (code:any)=>{
    
    try {

      const res = await makeRequest('/verify-otp',{otp: Number(code)});
      
      if(res?.response.status){
        Alert.alert('Success', 'Email Verified Successfully');


        setTimeout(()=>{
          router.replace('/auth/login');
        },2000)
      }else{
        if(res?.response.error){
          return Alert.alert('Error', res?.response.error)
        }
      }
    } catch (error) {
      return Alert.alert('Error', 'We could not verify your email');
    }
  }
  return (
   
     <OTPScreen
     loading={loading}
   onSubmit={(code)=>submitOtp(code)}
  onResend={async() =>{
    const res = await axiosClient.get('/resend-otp');
    if(res.data.status){
      Alert.alert('Success', 'Otp has been resent to your email')
    }
    else if(res.data.error){
      return Alert.alert('Error', res.data.error);
    }else{
      Alert.alert('Error', 'Server Error');
    }
  }}/>

  )
}

export default OtpScreen

const styles = StyleSheet.create({})