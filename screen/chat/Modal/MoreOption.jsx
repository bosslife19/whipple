import { AntDesign, MaterialCommunityIcons, Ionicons, MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Modal } from "react-native";
import Transes from "../../../styles/Traning/Transes";

const MoreOptionsModal = ({ modalVisible, setModalVisible }) => {
  return (
    <Modal 
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContent}>
          {/* Close Button */}
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}
          >
           <Ionicons name="close" size={20} color="black" />
          </TouchableOpacity>

          {/* Modal Options */}
          <TouchableOpacity style={styles.modalOption}>
            <MaterialCommunityIcons name="trash-can-outline" size={20} color="#F44336" />
            <Text style={[Transes.contentText, styles.optionText]}>Delete chat</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.modalOption}>
          <MaterialIcons name="history" size={24} color="black" />            
          <Text style={[Transes.contentText, styles.optionText]}>Clean history</Text>
          </TouchableOpacity>

          

        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1, 
    backgroundColor: "rgba(0,0,0,0.5)", 
    paddingTop: 20, 
    alignItems: "flex-end"
  },
  modalContent: {
    backgroundColor: "#fff", 
    paddingHorizontal: 16, 
    paddingVertical: 20, 
    borderRadius: 10,  
    width: "45%", 
    shadowColor: "#000", 
    shadowOpacity: 0.1, 
    shadowRadius: 10, 
    shadowOffset: { width: 0, height: 4 }, 
    elevation: 5 
  },
  closeButton: {
    marginBottom: 10,  
    marginLeft: "auto", 
    // paddingRight: 10
  },
  modalOption: {
    flexDirection: "row", 
    alignItems: "center", 
    paddingVertical: 12, 
    borderBottomWidth: 1, 
    borderBottomColor: "#eee"
  },
  optionText: {
    color: "#0F172A", 
    fontSize: 16, 
    fontWeight: "500", 
    marginLeft: 12
  }
});

export default MoreOptionsModal;
