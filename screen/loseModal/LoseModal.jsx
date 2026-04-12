import React from 'react';
import { Modal, StatusBar, Text, TouchableOpacity, View, ImageBackground, TouchableWithoutFeedback, Image } from 'react-native';
import bgs from "../../assets/images/icons/Loss Modal (1).png";
import { router } from 'expo-router';
import creategame from '../../styles/creategame/creategame.styles';
import closes from "../../assets/images/icons/material-symbols_close.png";
import maingamess from '../../styles/maingameDetails/maingameDetails.styles';

const Losingmodal = ({ visible,GameName, closeModal, correctNumber,stake,odds,gameLabel ,range,selected,parsedTotalOdds,selectedNumbers,  isFirstLoss = true, // default to true
}) => {
 const losers = ()=>{
    router.push( '/(routes)/games/LostGames/ViewLostGames',  )
      
}


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
              {/* <View style={{ margin: "auto" }}>
                <Text style={[maingamess.confirmText, { fontSize: 23, color: "#fff", fontWeight: "700", letterSpacing: 1 }]}>
                  Winning numbers:
                </Text>
                <Text style={[maingamess.confirmText, { fontSize: 45, marginHorizontal: "auto", color: "#FF8C00" }]}>
                  {correctNumber}
                </Text>
              </View> */}
              <View style={{ flexDirection: "row", position: "absolute", bottom: "25%", right: "13%", gap: 10, marginHorizontal: "auto" }}>
                <TouchableOpacity onPress={()=>router.replace('/(tabs)/home')} style={{ paddingHorizontal: "4%", borderWidth: 1, paddingVertical: 10, borderRadius: 5 }}>
                  <Text style={maingamess.confirmText}>Go Home</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{ paddingHorizontal: "6%", backgroundColor: "#0A1931", paddingVertical: 10, borderRadius: 5 }}
                  onPress={losers}
                >
                  <Text style={maingamess.confirmText}>
                  Play Losers Game

                    </Text>
                </TouchableOpacity> 
              </View>
            </ImageBackground>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default Losingmodal;
