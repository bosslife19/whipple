import {
  ActivityIndicator,
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
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
      
      const res = await makeRequest('/signup', {name, email, password, phoneNumber})
      if(res.error){
        return Alert.alert('Error', res.error);
      }
      
      
      router.replace('/auth/login');

    } catch (err) {
      console.log(err);
      
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ paddingHorizontal: "5%" }}>
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
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 3,
            top: "-6%",
          }}
        >
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
          <Text
            style={{
              fontFamily: "PoppinsLight",
              fontSize: 10,
              fontWeight: "400",
            }}
          >
            I have read and agree to the{" "}
            <Text style={{ color: "rgba(0, 123, 255, 1)", fontWeight: "bold" }}>
              Terms and Conditions
            </Text>
          </Text>
        </View>
        <View></View>
        <TouchableOpacity style={styles.blueButton} onPress={handleSignup}>
          {loading ? (
            <ActivityIndicator size={20} color="white" />
          ) : (
            <Text
              style={{
                fontFamily: "Grotesk",
                fontWeight: "700",
                color: "white",
                fontSize: 14,
              }}
            >
              Register Now
            </Text>
          )}
        </TouchableOpacity>
        <View
          style={{
            flexDirection: "row",
            marginTop: "5%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              fontFamily: "PoppinsLight",
              fontSize: 10,
              fontWeight: "400",
            }}
          >
            Already have an account?{" "}
          </Text>
          <TouchableOpacity onPress={() => router.push("/auth/login")}>
            <Text
              style={{
                color: "rgba(0, 123, 255, 1)",
                fontWeight: "bold",
                fontSize: 13,
              }}
            >
              Sign in
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(238, 246, 255, 1)",
    flex: 1,
  },
  registerText: {
    fontSize: 24,
    fontFamily: "MonteserratRegular",
    fontWeight: "900",
    textAlign: "center",
    marginTop: "40%",
    color: "rgba(0, 0, 0, 1)",
  },
  inputsContainer: {
    gap: "6%",
    marginTop: "10%",
  },
  input: {
    backgroundColor: "rgba(80, 87, 98, 1)",
    color: "rgba(154, 154, 154, 0.6)",
    fontSize: 16,
    fontWeight: "400",
    borderRadius: 10,
    height: 50,
    paddingLeft: 15,
    fontFamily: "PoppinsLight",
  },
  tick: {
    backgroundColor: "rgba(0, 123, 255, 1)",
    width: 15,
    height: 15,
    borderRadius: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  blueButton: {
    backgroundColor: "rgba(0, 123, 255, 1)",
    height: "8%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "5%",
    borderRadius: 10,
  },
});
