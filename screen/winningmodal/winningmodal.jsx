import React, { useEffect, useState } from 'react';
import {
  ImageBackground,
  Modal,
  StatusBar,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native';
// import creategame from '../../../../styles/creategame/creategame.styles';
import { formatCurrencies } from '../../utlils/formatCurrency';
import bgs from "../../assets/images/icons/Winning Modal.png";
import { router } from 'expo-router';
import creategame from '../../styles/creategame/creategame.styles';
import closes from "../../assets/images/icons/material-symbols_close.png";
import share from "../../assets/images/icons/Frame 103.png";
import view from "../../assets/images/icons/Frame 102.png";


import { Image } from 'react-native';
import maingamess from '../../styles/maingameDetails/maingameDetails.styles';

const Winningmodal = ({
  modalVisibles,
  closeModals,
 
}) => {
 
 
 
 

  return (
    <Modal visible={modalVisibles} transparent animationType="slide">
            <StatusBar backgroundColor="transparent" barStyle="dark-content" />
      <TouchableWithoutFeedback onPress={closeModals}>
        <View style={[creategame.modalOverlays,{position:"relative"}]}>
          <TouchableWithoutFeedback onPress={() => {}}>
            <ImageBackground source={bgs} style={creategame.modalContents}>
              <TouchableOpacity style={{right:10,position:"absolute",top:10}} onPress={()=> router.push("/(routes)/games/main-game-details")}>
                <Image source={closes} style={{width:30,height:30}} />
              </TouchableOpacity>

              <View style={{flexDirection:"row",position:"absolute",bottom:"25%",right:"13%", gap:20,marginHorizontal:"auto",flex:1}}>
              <TouchableOpacity style={{paddingHorizontal:"8%",borderWidth:1,paddingVertical:10,borderRadius:5}}>
                <Text style={maingamess.confirmText}>View Details</Text>
                {/* <Image source={view} style={{width:100,height:"110%",objectFit:"cover",}} /> */}
              </TouchableOpacity>

              <TouchableOpacity  style={{paddingHorizontal:"16%",backgroundColor:"#0A1931",paddingVertical:10,borderRadius:5}}>
                <Text style={maingamess.confirmText}>Share</Text>
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
