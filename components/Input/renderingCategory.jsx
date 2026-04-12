// import React from 'react';
// import { View, Text, Image, TouchableOpacity } from 'react-native';
// import gameCates from '../../styles/gameCate.styles';
 
// const GameSections = ({ title, games }) => {
//   return (
//     <View style={gameCates.section}>
//       <Text style={gameCates.sectionTitle}>{title}</Text>
//       <View style={gameCates.row}>
//         {games.map((game, index) => (
//           <View key={index} style={gameCates.card}>
//             <View style={gameCates.imageWrapper}>
//               {title === 'EVENTS' && (
//                 <Text style={gameCates.imageBadge}>{index + 1}</Text>
//               )}
//               <Image source={game.image} style={gameCates.image} />
//             </View>

//             <Text style={gameCates.gameTitle}>{game.title}</Text>
//             <Text style={gameCates.description}>{game.description}</Text>
//             <Text style={gameCates.variantLabel}>Variants:</Text>
//             {game.variants.map((variant, idx) => (
//               <Text key={idx} style={gameCates.variantText}>• {variant}</Text>
//             ))}
//             <TouchableOpacity style={gameCates.btn} onPress={game.handleNavigate}>
//               <Text style={[gameCates.gameTitle, { textAlign: "center", color: "#fff" }]}>Create Games</Text>
//             </TouchableOpacity>
//           </View>
//         ))}
//       </View>
//     </View>
//   );
// };

// export default GameSections;
