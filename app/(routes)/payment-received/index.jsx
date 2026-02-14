import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { router } from "expo-router";

export default function PaymentReceivedScreen() {
  

  const handleBackHome = () => {
    router.replace("/(tabs)/home"); // Replace with your home route
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.checkmark}>✔️</Text>
        <Text style={styles.title}>Payment Received!</Text>
        <Text style={styles.message}>
          Thank you for your payment. Your transaction has been successfully
          completed.
        </Text>

        <TouchableOpacity style={styles.button} onPress={handleBackHome}>
          <Text style={styles.buttonText}>Back to Home</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// ---------- Styles ----------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f6fc",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  card: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 30,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  checkmark: {
    fontSize: 60,
    color: "#4BB543",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: 12,
    textAlign: "center",
  },
  message: {
    fontSize: 16,
    color: "#555555",
    marginBottom: 30,
    textAlign: "center",
  },
  button: {
    width: "100%",
    backgroundColor: "#1c78ff",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
