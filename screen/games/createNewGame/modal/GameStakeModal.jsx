// import React, { useEffect, useState } from 'react';
// import {
//   ImageBackground,
//   Modal,
//   StatusBar,
//   Text,
//   TouchableOpacity,
//   TouchableWithoutFeedback,
//   View
// } from 'react-native';
// import creategame from '../../../../styles/creategame/creategame.styles';
// import { formatCurrencies } from '../../../../utlils/formatCurrency';
// import bgs from "../../../../assets/images/games/image_fx_ (35) 1.png";
// import { router } from 'expo-router';

// const GameStakeModal = ({
//   modalVisible,
//   closeModal,
//   stake,
//   correctNumber,
//   hh,
//   mm,
//   ss
// }) => {
//   const [gameId, setGameId] = useState('');
//   const [selectedWinner, setSelectedWinner] = useState('');

//   useEffect(() => {
//     if (modalVisible) {
//       const newGameId = generateGameId();
//       setGameId(newGameId);
//       setSelectedWinner(''); // reset selection on open
//     }
//   }, [modalVisible]);

   

//   const generateGameId = () => {
//     const prefix = 'GM';
//     const randomNum = Math.floor(1000 + Math.random() * 9000);
//     return `${prefix}-${randomNum}`;
//   };

//   const renderWinnerOption = (label, value) => (
//     <View style={creategame.flexD}>
//       <Text style={creategame.summaryText}>{label}</Text>
//       <TouchableOpacity
//         style={[
//           creategame.selectButton,
//           selectedWinner === value && creategame.selectedOption
//         ]}
//         onPress={() => setSelectedWinner(value)}
//       >
//         <Text style={creategame.selectText}>
//           {selectedWinner === value ? 'Voted' : 'Vote'}
//         </Text>
//       </TouchableOpacity>
//     </View>
//   );

//   return (
//     <Modal visible={modalVisible} transparent animationType="slide">
//             <StatusBar backgroundColor="transparent" barStyle="dark-content" />
//       <TouchableWithoutFeedback onPress={closeModal}>
//         <View style={creategame.modalOverlay}>
//           <TouchableWithoutFeedback onPress={() => {}}>
//             <ImageBackground source={bgs} style={creategame.modalContent}>
//               <Text style={creategame.modalTitle}>Game ID: #{gameId}</Text>

//               <View style={creategame.flexD}>
//                 <Text style={creategame.summaryText}>Min Stake Amount</Text>
//                 <Text style={creategame.summaryText}>{formatCurrencies(stake)}</Text>
//               </View>
//               <View style={creategame.flexD}>
//                 <Text style={creategame.summaryText}>Duration</Text>
//                 <Text style={creategame.summaryText}>{hh}:{mm}:{ss}</Text>
//               </View>

//               <View style={creategame.flexD}>
//                 <Text style={creategame.summaryText}>Prize Pool</Text>
//                 <Text style={creategame.summaryText}>{formatCurrencies("10000")}</Text>
//               </View>

//               <Text style={creategame.modalTitle}>Vote Game Type</Text>
//               {renderWinnerOption('One Winner', 'one')}
//               {renderWinnerOption('Two Winner', 'two')}
//               {renderWinnerOption('Three Winner', 'three')}

//               <View style={creategame.buttonRow}>
//                 <TouchableOpacity
//                   style={creategame.confirmBtn}
//                   onPress={() => {
//                     if (selectedWinner) {
//                       alert(`Confirmed: ${selectedWinner} winner(s)`);
//                     } else {
//                       alert('Please select a winner option');
//                     }
//                   }}
//                 >
//                   <Text style={creategame.confirmText}>Confirm Selection</Text>
//                 </TouchableOpacity>

//                 <TouchableOpacity
//                   style={creategame.cancelBtn}
//                   onPress={closeModal}
//                 >
//                   <Text style={creategame.cancelText}>Cancel</Text>
//                 </TouchableOpacity>
//               </View>

//               <TouchableOpacity style={creategame.publishBtn} onPress={()=> router.push("/(routes)/games/main-game-details")}>
//                 <Text style={creategame.publishText}>Enter Game</Text>
//               </TouchableOpacity>
//             </ImageBackground>
//           </TouchableWithoutFeedback>
//         </View>
//       </TouchableWithoutFeedback>
//     </Modal>
//   );
// };

// export default GameStakeModal;
