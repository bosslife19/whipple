import React, { useContext, useEffect, useState } from 'react';
import { ScrollView, Text, View, TouchableOpacity } from 'react-native';
import Header from '../../../Header/Header';
import FilterTabPanel from '../../../../features/TabPanel/FilterTabPanel';
import LosersGameList from '../../../../styles/losersgameList/LosersGameList';
// import { useGameContext } from '../../../../context/AppContext';
import { useRouter } from 'expo-router';
import { useGameContext } from '../../../../context/AppContext';
import {AuthContext} from '../../../../context/AuthContext'
import {useRequest} from '../../../../hooks/useRequest';
import axiosClient from '../../../../axiosClient';

const LosersGames = () => {
  const router = useRouter();

  const {userDetails} = useContext(AuthContext)
const [lostGames, setLostGames] = useState(null);
const [selectedTab, setSelectedTab] = useState('All')
  
let losersGame = true;


  
  

  const handlePlayNow = (name, id, odds, stake) => {
        const normalizedGameName = name?.toLowerCase?.();
    
        
    
       
 switch (normalizedGameName) {
            case 'lucky number':
              router.push({
                pathname: '/games/availablegames/luckynumbers/confirmLuckyNumbers',
                params: {
                stake: stake?.toString(),
                odds,
                
                id,
                name,
                losersGame
              },
              });
              break;
        
            case 'flip the coin':
              router.push({
               pathname: '/games/availablegames/luckynumbers/confirmLuckyNumbers',
                params: {
                stake: stake?.toString(),
                odds,
               
                id,
                name,
                losersGame:true
                
              },
              });
              break;
        
            case 'color roulette': 
              router.push({
                pathname: '/games/availablegames/luckynumbers/confirmLuckyNumbers',
                params: {
                stake: stake?.toString(),
                odds,
                
                id,
                name,
                losersGame:true
              },
              });
              break;
      
              case 'mystery box game':
                router.push({
                 pathname: '/games/availablegames/luckynumbers/confirmLuckyNumbers',
                  params: {
                  stake: stake?.toString(),
                  odds,
                 
                  name,
                  id,
                  losersGame:true
                },
                });
                break;
      
                case 'goal challenge':
                  router.push({
                    pathname: '/games/availablegames/luckynumbers/confirmLuckyNumbers',
                    params: {
                    stake: stake?.toString(),
                    odds,

                    name,
                    id,
                    losersGame:true
                  },
                  });
                  break;
                    case 'dice roll':
                       router.push({
                    pathname: '/games/availablegames/luckynumbers/confirmLuckyNumbers',
                    params: {
                    stake: stake?.toString(),
                    odds,
                    
                    id, name,
                    losersGame:true
                  },
                  });
                  break;
                   case 'wheel spin':
                       router.push({
                    pathname: '/games/availablegames/luckynumbers/confirmLuckyNumbers',
                    params: {
                    stake: stake?.toString(),
                    odds,
                   
                    name,
                    id,
                    losersGame:true
                  },
                  });
                  break; 
                   case 'spin the bottle':
                       router.push({
                    pathname: '/games/availablegames/luckynumbers/confirmLuckyNumbers',
                    params: {
                    stake: stake?.toString(),
                    odds,

                    name,
                    id,
                    losersGame:true
                  },
                  });
                  break; 
    
                  case 'one number spin':
                  router.push({
                  pathname: '/games/availablegames/luckynumbers/confirmLuckyNumbers',
                    params: {
                    stake: stake?.toString(),
                    odds,

                    id,
                    name,
                    losersGame:true
                  },
                  });
                  break;
    
                   case 'color roulette2':
                  router.push({
                   pathname: '/games/availablegames/luckynumbers/confirmLuckyNumbers',
                    params: {
                    stake: stake?.toString(),
                    odds,
                    
                    name,
                    id,
                    losersGame:true
                  },
                  });
                  break;
            default:
              // Handle unknown game gracefully
              console.warn(`[Navigation Error]: Unknown game "${GameName}" selected.`);
              alert('An error occurred: Unknown game selected. Please try again.');
          }
       
         
   
  };



  // if (!lostGames) {
  //   return (
  //     <View style={LosersGameList.centeredContainer}>
  //       <Header name="Loser's Game" backgroundColor="transparent" />
  //       <Text style={LosersGameList.noGameText}>No game is currently published.</Text>
  //     </View>
  //   );
  // }

useEffect(()=>{
    const getLostGames =async()=>{

      if(userDetails){
 const res = await axiosClient.get("/get-losers-game");
setLostGames(res.data.games);

            

      }
     
      

    }
    getLostGames();
  }, [])
  return (
    <ScrollView style={{height:'100%'}}>
      <Header name="Loser's Game" backgroundColor="#EEF6FF" />
      <View style={LosersGameList.container}>
        <View style={LosersGameList.rulesCard}>
          <Text style={LosersGameList.rulesTitle}>🎯 Losers' Game Rules</Text>
          <Text style={LosersGameList.rulesSubtitle}>
            Your second chance at games you previously lost.
          </Text>

          <Text style={LosersGameList.rulesSectionTitle}>Benefits:</Text>
          <Text style={LosersGameList.listItem}>• 1.5x your original stake</Text>
          <Text style={LosersGameList.listItem}>• 1.2x better odds</Text>
          <Text style={LosersGameList.listItem}>• Same gameplay rules</Text>
          <Text style={LosersGameList.listItem}>• Fresh, randomly drawn numbers</Text>
        </View>

        <FilterTabPanel onTabChange={setSelectedTab} />

        <ScrollView contentContainerStyle={LosersGameList.scrollContainer}>
          {lostGames ?lostGames.map(game=>(
 <View style={LosersGameList.card} key={game.id}>
              <View style={LosersGameList.cardHeader}>
                <Text style={LosersGameList.headerIcon}>🎲</Text>
                <Text style={LosersGameList.headerText}>{game.name} - Lost Games</Text>
              </View>

              <View style={LosersGameList.cardBody}>
                <View style={LosersGameList.row}>
                  <View>
                    <Text style={LosersGameList.label}>Stake</Text>
                    <Text style={LosersGameList.value}>₦{game.stake}</Text>
                  </View>
                  <View style={{ alignItems: 'flex-end' }}>
                    <Text style={LosersGameList.label}>Odds</Text>
                    <Text style={LosersGameList.value}>{game.odds}</Text>
                  </View>
                </View>

                <Text style={LosersGameList.description}>
                  {/* {game.name} - {gameLabel}  */}
                  {/* this range is for lucky numbers */}
                  
                </Text>

                <View style={LosersGameList.row}>
                  <Text style={LosersGameList.info}><Text style={LosersGameList.infoLabel}>House:</Text> @current-user</Text>
                  <Text style={LosersGameList.info}><Text style={LosersGameList.infoLabel}>Status:</Text> Open</Text>
                </View>

                <TouchableOpacity style={LosersGameList.playButton} onPress={()=>handlePlayNow(game.name, game.id, game.odds, game.stake)}>
                  <Text style={LosersGameList.playButtonText}>Play Now</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))  : (
            <Text style={LosersGameList.noGameText}>No game is currently published.</Text>
          )}
        </ScrollView>
      </View>
    </ScrollView>
  );
};

export default LosersGames;
