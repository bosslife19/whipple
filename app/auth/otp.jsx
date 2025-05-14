import { router } from 'expo-router';
import React, { useState, useEffect, useRef } from 'react';
import { StatusBar } from 'react-native';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import SuccessModal from '../../screen/sucessModal/successpopup';
 
export default function OTPMainEmail({ onNext }) {
  const [otp, setOtp] = useState(Array(4).fill(''));
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [timer, setTimer] = useState(52);
  const [modalVisible, setModalVisible] = useState(false);

  const inputRefs = useRef([]);
 
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleChange = (text, index) => {
    if (text.length > 1) return;

    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    } else if (!text && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    if (otp.includes('')) {
      setError('Please enter a valid OTP');
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (otp.join('') === '1234') {
        setSuccessMessage('Email verification successful.');
        setError('');
        setModalVisible(true)
        } else {
        setError('Invalid Code');
        setSuccessMessage('');
      }
    }, 3000);
  };


  const handleResendCode = () => {
    setOtp(Array(4).fill(''));
    setError('');
    setSuccessMessage('');
    setTimer(52);
  };

  const formatTime = () => {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <View style={styles.containers}>
        <StatusBar backgroundColor="rgba(238, 246, 255, 1)"/>
      <Text style={styles.title}>Recieve a code</Text>
      <Text style={{color:"#000", fontWeight:500,fontFamily:"montserratMeduim",fontSize:14,textAlign:"center",paddingHorizontal:20}}>
      Enter the 4 digit number OTP sent to +234********29 and exa*****@gmail.com</Text>
     
      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            style={[styles.input, error ? styles.inputError : {}]}
            value={digit}
            onChangeText={(text) => handleChange(text, index)}
            maxLength={1}
            keyboardType="numeric"

          />
        ))}
      </View>
      
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      {successMessage ? <Text style={styles.successText}>{successMessage}</Text> : null}
      {isLoading && <ActivityIndicator size="small" color="rgba(0, 123, 255, 1)" style={{ marginTop: 8 }} />}

      <Text style={styles.timerText}>
        {timer > 0 ? 
        <Text
        style={{color:"#000", fontWeight:500,fontFamily:"montserratMeduim",fontSize:14,textAlign:"center",paddingHorizontal:20}}
        >
        `Get a new code in <Text style={{color:"#E11D48",fontWeight:700}}>({formatTime()})</Text>
        </Text> : (
          <TouchableOpacity onPress={handleResendCode}>
            <Text style={{color:"#000", fontWeight:500,fontFamily:"montserratMeduim",fontSize:14,textAlign:"center",paddingHorizontal:20}} >
            Didn’t receive any code? 
                <Text style={styles.resendText}> Resend</Text>
            </Text>
          </TouchableOpacity>
        )}
      </Text>
      <TouchableOpacity style={styles.verifyButton} onPress={handleVerify} disabled={isLoading}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>

      <SuccessModal visible={modalVisible} onClose={() => setModalVisible(false)} />

    </View>
  );
}

const styles = StyleSheet.create({
  containers: {
    // alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: "rgba(238, 246, 255, 1)",
    height:"100%",
    // justifyContent:"center",
    marginVertical:70,
    flex:1,
  },
  title: {
    fontSize: 24,
    fontFamily:"montserratMeduim",
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign:"center"
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 16,
  },
  input: {
    width: 60, // fixed width
    height: 60, // fixed height
    backgroundColor: "rgba(80, 87, 98, 1)",
    color: "#fff",
    textAlign: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
    borderRadius: 10,
    fontWeight: '500',
    fontSize: 20,
    marginHorizontal: 8,
  },
  
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 8,
  },
  successText: {
    color: 'green',
    fontSize: 14,
    marginBottom: 8,
  },
  verifyButton: {
    backgroundColor: "rgba(0, 123, 255, 1)",
    width: "100%",
    paddingVertical: 17,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: "rgba(0, 123, 255, 1)",
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    textAlign:"center",
    fontWeight:700,
    fontFamily:"Grotesk"
  },
  timerText: {
    textAlign:"center",
    fontSize: 14,
    marginTop: 10,
  },
  resendText: {
    color: 'rgba(0, 123, 255, 1)',
    fontWeight: 'bold',
  },
});

