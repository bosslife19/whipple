import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Modal, Image } from "react-native";
import clean from "../../../assets/images/account/icon-park-outline_clear.png"
import search from "../../../assets/images/account/search-normal.png"
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
        <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}
          >
          <AntDesign name="closecircleo" size={18} color="black" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.modalOption}>
          <MaterialCommunityIcons name="trash-can-outline" size={14} color="black" />
            <Text style={[Transes.contentText,{color:"#0F172A"}]}>Delete chat</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.modalOption}>
            <Image source={clean} style={{width:15,height:15}} />
            <Text style={[Transes.contentText,{color:"#0F172A"}]}>Clean history</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.modalOption}>
          <Image source={search} style={{width:15,height:15}} />

            <Text style={[Transes.contentText,{color:"#0F172A"}]}>Search</Text>
          </TouchableOpacity>

          
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: { flex: 1, backgroundColor: "rgba(0,0,0,0.5)",paddingTop:20, alignItems: "flex-end" },
  modalContent: { backgroundColor: "#fff", paddingHorizontal: 4,paddingVertical:5, borderRadius: 10,  width:"45%"  },
  modalTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 ,fontFamily: "montserratMeduim",},
  modalOption: { padding: 10,  alignItems: "center",flexDirection:"row",gap:3 },
  closeButton: { marginTop: 15,  marginLeft:"auto", borderRadius: 5, paddingRight:10 },
});

export default MoreOptionsModal;
