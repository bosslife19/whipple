import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  StyleSheet,
  SafeAreaView,
  ScrollView
} from 'react-native';
import HeaderBet from '../../Header/HeaderBet';
import { formatCurrencies } from '../../../utlils/formatCurrency';
import { Image } from 'react-native';
import wallet from "../../../assets/images/icons/flowbite_wallet-solid.png"
import pot from "../../../assets/images/icons/Vector (1).png"
import game from "../../../assets/images/icons/mingcute_game-2-fill.png"
import frames from "../../../assets/images/icons/Frame 100.png"
import { Entypo, FontAwesome6 } from '@expo/vector-icons';
import maingamess from '../../../styles/maingameDetails/maingameDetails.styles';
import Winningmodal from '../../winningmodal/winningmodal';

const amountOptions = [50,100,200, 500, 900, 1000, 2000,5000];

const MainGameDetails = () => {
  const [selectedBox, setSelectedBox] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [amount, setAmount] = useState('');
  const [modalVisibles, setModalVisibles] = useState(false);

  const handleBoxSelect = (letter ) => {
    setSelectedBox(letter);
    setModalVisible(true);
  };

  const handleAmountSelect = (value) => {
    setAmount(value.toString());
  };

  const handleConfirm = () => {
     setModalVisible(false);
    setModalVisibles(true)
    setAmount('');
    setSelectedBox(null);
  };

  const closeModals =()=>{
    setModalVisibles(false)

  }

  return (
    <>
    <HeaderBet   arrow backgroundColor='#A8BFED' amount={200} />
    <ScrollView contentContainerStyle={{height:"120%"}}>
    <SafeAreaView style={maingamess.container}>
      <Text style={[maingamess.title,{color:'#000',fontWeight:400,fontSize:19}]}>Game ID #32102</Text>

     {/* Time Box with individual segments */}
<View style={maingamess.timeRow}>
  <View>
  <View style={maingamess.timeUnitBox}>
    <Text style={maingamess.timeText}>00</Text>
  </View>
    <Text style={[maingamess.timeText,{color:"#000",textAlign:"center",fontSize:12}]}>Hours</Text>
  </View>
  <View>

   <View style={maingamess.timeUnitBox}>
    <Text style={maingamess.timeText}>05</Text>
    </View>
    <Text style={[maingamess.timeText,{color:"#000",textAlign:"center",fontSize:12}]}>Minutes</Text>
  </View>

  <View>
   <View style={maingamess.timeUnitBox}>
    <Text style={maingamess.timeText}>20</Text>
  </View>
  <Text style={[maingamess.timeText,{color:"#000",textAlign:"center",fontSize:12}]}>Seconds</Text>
  </View>
</View>


      {/* Bottom Layout */}
      <View style={maingamess.bottomSection}>
        {/* Left Column */}
        <View style={maingamess.leftColumn}>
         
          <View style={[maingamess.infoBox,{flexDirection:"row",alignItems:"center",gap:10}]}>
            <Image source={wallet} style={{backgroundColor:"#333",width:"40%",height:"100%",objectFit:"contain",borderRadius:10}} />
            <View>
            <Text style={[maingamess.infoLabel,{fontSize:12}]}>Stake</Text>
            <Text style={[maingamess.infoValue,{fontSize:10}]}>{formatCurrencies('200')}</Text>
             </View>          
            </View>

            <View style={[maingamess.infoBox,{flexDirection:"row",alignItems:"center",gap:10}]}>
            <Image source={pot} style={{backgroundColor:"#333",width:30, height:"100%",objectFit:"contain",borderRadius:10}} />
            <View>
            <Text style={[maingamess.infoLabel,{fontSize:12}]}>House Pot</Text>
            <Text style={[maingamess.infoValue,{fontSize:10}]}>{formatCurrencies('20000')}</Text>
          </View>
          </View>
        </View>

        {/* Right Side */}
        <View style={maingamess.rightBox}>
          <Text style={[maingamess.title,{fontSize:18}]}>Live Player Stats</Text>
          <Image source={frames} style={{width:"70%", height:40,objectFit:"contain",borderRadius:10,marginRight:"auto"}} />
          <View style={{flexDirection:"row",alignItems:"flex-start",marginTop:20,gap:10,marginRight:"auto"}}>
          <Image source={game} style={{backgroundColor:"#333", width:30, height:30,objectFit:"contain",borderRadius:0,padding:10}} />
          <Text style={maingamess.stats}>Players: 102</Text>
          </View>
        </View>
      </View>
      <Text style={[maingamess.infoLabel,{color:'#000',marginTop:20,fontWeight:'bold'}]}>Choose the Correct Number(s)</Text>
      <View style={maingamess.letterBoxContainer}>
  {['A', 'B', 'C', 'D', 'E', 'F'].map((letter) => {
    const isDark = ['A', 'D', 'E'].includes(letter); // letters with dark blue background
    return (
      <TouchableOpacity
        key={letter}
        style={[
          maingamess.letterBox,
          { backgroundColor: isDark ? '#0A1931' : '#FF8C00' }
        ]}
        onPress={() => handleBoxSelect(letter)}
      >
        <Text style={maingamess.letterText}>{letter}</Text>
      </TouchableOpacity>
    );
  })}
</View>


      {/* Modal for Stake Amount */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={maingamess.modalOverlay}>
          <View style={maingamess.modalContent}>
           <View style={{flexDirection:"row",alignItems:"flex-start",justifyContent:"space-between",marginBottom:23}}>
           <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between",gap:10}}>
           <FontAwesome6 name="wallet" size={19} color="black" />
           <Text style={[maingamess.stats,{color:"#000",fontWeight:700,}]}>{formatCurrencies('15000')}</Text>
           </View>
            <TouchableOpacity
            //   style={maingamess.cancelBtn}
              onPress={() => setModalVisible(false)}>
            <Entypo name="cross" size={24} color="black" />             
            </TouchableOpacity>
           </View>
           {/* <Text style={maingamess.modalTitle}>Enter Stake for {selectedBox}</Text> */}

            {/* Amount Options */}
            <View style={maingamess.amountOptions}>
              {amountOptions.map((val) => (
                <TouchableOpacity
                  key={val}
                  style={maingamess.amountBtn}
                  onPress={() => handleAmountSelect(val)}
                >
                  <Text style={maingamess.amountText}>₦{val}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* TextInput */}
            <TextInput
              value={formatCurrencies (amount)}
              onChangeText={setAmount}
              placeholder="Enter custom amount"
              keyboardType="numeric"
              style={maingamess.input}
              placeholderTextColor="#fff"
            />

            {/* Confirm Button */}
            <TouchableOpacity style={maingamess.confirmBtn} onPress={handleConfirm}>
              <Text style={maingamess.confirmText}>Stake</Text>
            </TouchableOpacity>
            <Text style={[maingamess.confirmText,{color:"#007BFF",textAlign:"center",lineHeight:30,fontSize:12,fontWeight:700}]}> Terms and Conditions <Text style={{color:"#000",fontWeight:700}}>apply</Text></Text>
            
          </View>
        </View>
      </Modal>
    </SafeAreaView>
    </ScrollView>
    <Winningmodal 
    modalVisibles={modalVisibles}
    closeModals={closeModals}
    />
    </>
  );
};

export default MainGameDetails;


