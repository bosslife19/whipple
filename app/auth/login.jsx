import {
  ActivityIndicator,
  Alert,
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
import { useRequest } from "../../hooks/useRequest";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loading, makeRequest } = useRequest();

  const handleLogin = async () => {
    router.replace("/(tabs)/home");
    if (!email || !password) {
      return Alert.alert("Required", "All the fields are required");
    }

    const { error, response } = await makeRequest("/login", {
      email,
      password,
    });

    if(error){
      return Alert.alert('Error', error)
    }
    await AsyncStorage.setItem('userDetails', JSON.stringify(response));
    await AsyncStorage.setItem('authToken', response.token);
    router.replace("/(tabs)/home");
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="rgba(238, 246, 255, 1)" />
      <View style={{ paddingHorizontal: "5%" }}>
        <Text style={styles.registerText}>Welcome Back</Text>

        <View style={styles.inputsContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email or Phone Number"
            placeholderTextColor={"rgba(154, 154, 154, 0.6)"}
            onChangeText={(val) => setEmail(val)}
          />

          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor={"rgba(154, 154, 154, 0.6)"}
            secureTextEntry={true}
            onChangeText={(val) => setPassword(val)}
          />
        </View>

        <View></View>
        <TouchableOpacity style={styles.blueButton} onPress={handleLogin}>
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
              Login
            </Text>
          )}
        </TouchableOpacity>
        <View
          style={{
            flexDirection: "row",
            marginTop: "1%",
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
            Don't have an?{" "}
          </Text>
          <TouchableOpacity onPress={() => router.push("/auth/signup")}>
            <Text
              style={{
                color: "rgba(0, 123, 255, 1)",
                fontWeight: "bold",
                fontSize: 13,
              }}
            >
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
    top: "-3%",
  },
});
