import {
  ActivityIndicator,
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, router } from "expo-router";
import { useRequest } from "../../hooks/useRequest";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Signup = () => {
  const [checked, setChecked] = useState(false);
  const { makeRequest, loading, error,  response} = useRequest();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [referrals, setReferrals] = useState('');


  const handleSignup = async()=>{
   
    if(!checked){
      return Alert.alert("Required", 'Please accept our terms and conditions to continue');
    }
    if(!email||!name||!password||!passwordConfirm ||!phoneNumber){
      return Alert.alert('Required', 'All fields are required to continue');
    }
    if(password !== passwordConfirm){
      return Alert.alert('Passwords do not match', 'Your password does not match with confirm password value')
    }
    try {
      
      const res = await makeRequest('/signup', {name, email, password, phoneNumber, referrals})
      if(res.error){
        return Alert.alert('Error', res.error);
      }

      if(res.response.status){
         await AsyncStorage.setItem('authToken', res.response.token);
         router.replace('/otp');
      }
    
      
      

    } catch (err) {
      console.log(err);
      Alert.alert('Error','Server Error');
      
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={{ 
          flexGrow: 1, 
          paddingHorizontal: "5%", 
          paddingBottom: 40 // so last button isn't hidden
        }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.registerText}>Register Now</Text>

        <View style={styles.inputsContainer}>
          <TextInput
            style={styles.input}
            placeholder="Name"
            placeholderTextColor={"rgba(154, 154, 154, 0.6)"}
            onChangeText={val=>setName(val)}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor={"rgba(154, 154, 154, 0.6)"}
            onChangeText={val=>setEmail(val)}
          />
            <TextInput
            style={styles.input}
            placeholder="Phone Number"
            placeholderTextColor={"rgba(154, 154, 154, 0.6)"}
            
            onChangeText={val=>setPhoneNumber(val)}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry={true}
            placeholderTextColor={"rgba(154, 154, 154, 0.6)"}
            onChangeText={val=>setPassword(val)}
          />
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            placeholderTextColor={"rgba(154, 154, 154, 0.6)"}
            onChangeText={val=>setPasswordConfirm(val)}
            secureTextEntry={true}
          />
          <TextInput
            style={styles.input}
            placeholder="Referrals (optional)"
            placeholderTextColor={"rgba(154, 154, 154, 0.6)"}
            onChangeText={val=>setReferrals(val)}
          />        
        </View>

        {/* Checkbox */}
        <View style={styles.termsRow}>
          <TouchableOpacity
            style={styles.tick}
            onPress={() => setChecked((prev) => !prev)}
          >
            {checked && (
              <Image
                resizeMode="contain"
                source={require("../../assets/icons/check_small.png")}
              />
            )}
          </TouchableOpacity>
          <Text style={styles.termsText}>
            I have read and agree to the{" "}
            <Link href={'https://mywhipple.com/terms-and-conditions'}>
             <Text style={styles.termsLink}>Terms and Conditions</Text>
            </Link>
           
          </Text>
        </View>

        {/* Button */}
        <TouchableOpacity style={styles.blueButton} onPress={handleSignup}>
          {loading ? (
            <ActivityIndicator size={20} color="white" />
          ) : (
            <Text style={styles.buttonText}>Register Now</Text>
          )}
        </TouchableOpacity>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => router.push("/auth/login")}>
            <Text style={styles.footerLink}>Sign in</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>

  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(238, 246, 255, 1)",
  },
  registerText: {
    fontSize: 24,
    fontFamily: "MonteserratRegular",
    fontWeight: "900",
    textAlign: "center",
    marginTop: 40, // use px not %
    color: "rgba(0, 0, 0, 1)",
  },
  inputsContainer: {
    marginTop: 30,
  },
  input: {
    backgroundColor: "rgba(80, 87, 98, 1)",
    color: "#fff",
    fontSize: 16,
    fontWeight: "400",
    borderRadius: 10,
    height: 50,
    paddingLeft: 15,
    fontFamily: "PoppinsLight",
    marginBottom: 15,
  },
  termsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  tick: {
    backgroundColor: "rgba(0, 123, 255, 1)",
    width: 15,
    height: 15,
    borderRadius: 3,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  termsText: {
    fontFamily: "PoppinsLight",
    fontSize: 10,
    fontWeight: "400",
    flex: 1,
  },
  termsLink: {
    color: "rgba(0, 123, 255, 1)",
    fontWeight: "bold",
  },
  blueButton: {
    backgroundColor: "rgba(0, 123, 255, 1)",
    height: 50, // fixed px instead of %
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    borderRadius: 10,
  },
  buttonText: {
    fontFamily: "Grotesk",
    fontWeight: "700",
    color: "white",
    fontSize: 14,
  },
  footer: {
    flexDirection: "row",
    marginTop: 30,
    justifyContent: "center",
  },
  footerText: {
    fontFamily: "PoppinsLight",
    fontSize: 10,
    fontWeight: "400",
  },
  footerLink: {
    color: "rgba(0, 123, 255, 1)",
    fontWeight: "bold",
    fontSize: 13,
  },
});

