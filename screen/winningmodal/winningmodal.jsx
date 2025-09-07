import React from 'react';
import { Modal, StatusBar, Text, TouchableOpacity, View, ImageBackground, TouchableWithoutFeedback, Image } from 'react-native';
import bgs from "../../assets/images/icons/Winning Modal.png";
import creategame from '../../styles/creategame/creategame.styles';
import closes from "../../assets/images/icons/material-symbols_close.png";
import maingamess from '../../styles/maingameDetails/maingameDetails.styles';
import { router } from 'expo-router';

const Winningmodal = ({ visible, closeModal }) => {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <StatusBar backgroundColor="transparent" barStyle="dark-content" />
      <TouchableWithoutFeedback onPress={closeModal}>
        <View style={[creategame.modalOverlays, { position: "relative" }]}>
          <TouchableWithoutFeedback>
            <ImageBackground source={bgs} style={creategame.modalContents}>
              <TouchableOpacity
                style={{ right: 10, position: "absolute", top: 10 }}
                onPress={closeModal}
              >
                <Image source={closes} style={{ width: 30, height: 30 }} />
              </TouchableOpacity>

              <View
                style={{
                  flexDirection: "row",
                  position: "absolute",
                  bottom: "23%",
                  right: "13%",
                  gap: 20,
                  marginHorizontal: "auto",
                  flex: 1,
                }}
              >
                <TouchableOpacity
                  style={{
                    paddingHorizontal: "8%",
                    borderWidth: 1,
                    paddingVertical: 10,
                    borderRadius: 5,
                  }}
                >
                  <Text style={maingamess.confirmText}>View Details</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    paddingHorizontal: "11%",
                    backgroundColor: "#0A1931",
                    paddingVertical: 10,
                    borderRadius: 5,
                  }}
                    onPress={()=>router.replace('/(tabs)/home')}
                >
                  <Text style={maingamess.confirmText}>Go Home</Text>
                </TouchableOpacity>
              </View>
            </ImageBackground>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default Winningmodal;
