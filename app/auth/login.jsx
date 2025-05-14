import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

const Login = () => {
  const [checked, setChecked] = useState(false);
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="rgba(238, 246, 255, 1)" />
      <View style={{ paddingHorizontal: "5%" }}>
        <Text style={styles.registerText}>Welcome Back</Text>

        <View style={styles.inputsContainer}>
          <TextInput
            style={styles.input}
            placeholder="Name"
            placeholderTextColor={"rgba(154, 154, 154, 0.6)"}
          />
          <TextInput
            style={styles.input}
            placeholder="Email or Phone Number"
            placeholderTextColor={"rgba(154, 154, 154, 0.6)"}
          />

        </View>


        <View>
            
        </View>
        <TouchableOpacity style={styles.blueButton}  onPress={()=>router.push('/auth/otp')}>
          <Text
            style={{
              fontFamily: "Grotesk",
              fontWeight: "700",
              color: "white",
              fontSize: 14,
            }}
          >
            Login
          </Text>
        </TouchableOpacity>
        <View style={{flexDirection:'row', marginTop:'1%', alignItems:'center', justifyContent:'center'}}>
          <Text
            style={{
              fontFamily: "PoppinsLight",
              fontSize: 10,
              fontWeight: "400",
            }}
          >
            Don't have an?{" "}
          </Text>
          <TouchableOpacity onPress={()=>router.push('/auth/signup')}>
            <Text style={{ color: "rgba(0, 123, 255, 1)", fontWeight: "bold" , fontSize:13}}>
              Sign up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;

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
    gap: "10%",
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
    height: "9%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "5%",
    borderRadius: 10,
    top:'-3%'
  },
});
