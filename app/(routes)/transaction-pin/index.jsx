import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useRequest } from "../../../hooks/useRequest";

export default function TransactionPinScreen({ mode = "set" }) {
  const [currentPin, setCurrentPin] = useState("");
  const [newPin, setNewPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const { loading, makeRequest } = useRequest();

  const handleSubmit = async () => {
    if (mode === "change" && currentPin.length !== 4) {
      Alert.alert("Error", "Please enter your current 4-digit PIN.");
      return;
    }
    if (newPin.length !== 4) {
      Alert.alert("Error", "New PIN must be exactly 4 digits.");
      return;
    }
    if (newPin !== confirmPin) {
      Alert.alert("Error", "PIN confirmation does not match.");
      return;
    }

    const { error, response } = await makeRequest("/transaction-pin", {
      pin: newPin,
    });
  
      if(error){
        return Alert.alert('Error', error)
      }

    Alert.alert(
      "Success",
      mode === "set" ? "Transaction PIN set successfully!" : "Transaction PIN changed successfully!"
    );

    setCurrentPin("");
    setNewPin("");
    setConfirmPin("");
  };

  const renderPinInput = (value, onChange, placeholder) => (
    <TextInput
      style={styles.pinInput}
      placeholder={placeholder}
      placeholderTextColor="#aaa"
      keyboardType="numeric"
      secureTextEntry
      maxLength={4}
      value={value}
      onChangeText={onChange}
    />
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.card}>
        <Text style={styles.title}>
          {mode === "set" ? "Set Transaction PIN" : "Change Transaction PIN"}
        </Text>
        <Text style={styles.subtitle}>
          {mode === "set"
            ? "Create a secure 4-digit PIN for your transactions."
            : "Update your 4-digit PIN to keep your account secure."}
        </Text>

        {mode === "change" && renderPinInput(currentPin, setCurrentPin, "Current PIN")}
        {renderPinInput(newPin, setNewPin, "New PIN")}
        {renderPinInput(confirmPin, setConfirmPin, "Confirm New PIN")}

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>
            {loading ? "Loading..." : mode === "set" ? "Set PIN" : "Change PIN"}
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f7fc",
    justifyContent: "center",
    padding: 20,
  },
  card: {
    backgroundColor: "#fff",
    padding: 25,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1a1a1a",
    textAlign: "center",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
  },
  pinInput: {
    backgroundColor: "#f9f9f9",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 20,
    fontSize: 18,
    textAlign: "center",
    letterSpacing: 4,
    marginBottom: 15,
    color: "#333",
  },
  button: {
    backgroundColor: "#4A90E2",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 5,
    shadowColor: "#4A90E2",
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});
