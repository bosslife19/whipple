import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';

const SuccessModal = ({ visible, onClose }) => {
  const router = useRouter();

  return (
    <Modal visible={visible} animationType="slide" transparent>
     <StatusBar backgroundColor=" rgba(0,0,0,0.5)"/>
      <View style={styles.container}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Success</Text>
          <Text style={styles.modalText}>Email verification successful.</Text>
          <TouchableOpacity 
            style={styles.modalButton} 
            onPress={() => {
              onClose(); // Close the modal
              router.replace('/(tabs)/home'); // Navigate to Dashboard
            }}
          >
            <Text style={styles.modalButtonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.64)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: "rgba(0, 123, 255, 1)",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  modalButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default SuccessModal;
