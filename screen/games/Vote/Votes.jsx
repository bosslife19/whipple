import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Text,
} from 'react-native';
import HeaderBet from '../../Header/HeaderBet';
import { router, useLocalSearchParams } from 'expo-router';
import Votes from '../../../styles/voteDistri.styles';
import { useGameContext } from '../../../context/AppContext';
import {useRequest} from '../../../hooks/useRequest'

const PRIMARY_COLOR = '#1A4ED8'; // Deep Blue

const VoteColorRouletteScreen = () => {
  const [value, setValue] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);

  const {makeRequest, loading} = useRequest()

  // const { stake, odds, gameLabel, range, selected, GameName } = useLocalSearchParams();

    const { gameData } = useGameContext();
        const { stake, odds, gameLabel, range, selected, GameName } = gameData || {};
        const {id, name, losersGame} = useLocalSearchParams()

      
 
  
  const handleSubmit = async() => {
    if (!value) {
      alert('Please select an option.');
      return;
    }
     const normalizedGameName = name?.toLowerCase?.();
  
    if(losersGame){
      const res = await makeRequest('/losers-vote', {gameId: id, vote: value})
 switch (normalizedGameName) {
            case 'lucky number':
              router.push({
                pathname: '/games/availablegames/luckynumbers/confirmLuckyNumbers',
                params: {
                stake: stake?.toString(),
                odds,
                 gameLabel,
                GameName,
                range,  
                selected,
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
                gameLabel,
                GameName,
                range,
                selected,
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
                 gameLabel,
                GameName,
                range,
                selected,
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
                   gameLabel,
                  GameName,
                  range,
                  selected,
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
                     gameLabel,
                    GameName,
                    range,
                    selected,
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
                     gameLabel,
                    GameName,
                    range,
                    selected,
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
                     gameLabel,
                    GameName,
                    range,
                    selected,
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
                     gameLabel,
                    GameName,
                    range,
                    selected,
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
                     gameLabel,
                    GameName,
                    range,
                    selected,
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
                     gameLabel,
                    GameName,
                    range,
                    selected,
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
    }else{
 const res = await makeRequest('/submit-vote', {gameId: id, vote: value})
  switch (normalizedGameName) {
        case 'lucky number':
          router.push({
            pathname: '/games/availablegames/luckynumbers/confirmLuckyNumbers',
            params: {
            stake: stake?.toString(),
            odds,
             gameLabel,
            GameName,
            range,  
            selected,
            id,
            name,
          },
          });
          break;
    
        case 'flip the coin':
          router.push({
            pathname: '/games/availablegames/CoinFLip/confirmFlipCoin',
            params: {
            stake: stake?.toString(),
            odds,
            gameLabel,
            GameName,
            range,
            selected,
            id,
            name
            
          },
          });
          break;
    
        case 'color roulette': 
          router.push({
            pathname: '/(routes)/games/category/becomethehouse/colorRoulette/selectedColor',
            params: {
            stake: stake?.toString(),
            odds,
             gameLabel,
            GameName,
            range,
            selected,
            id,
            name
          },
          });
          break;
  
          case 'mystery box game':
            router.push({
              pathname: '/games/category/becomethehouse/mysteryGame/mysterySelect',
              params: {
              stake: stake?.toString(),
              odds,
               gameLabel,
              GameName,
              range,
              selected,
              name,
              id
            },
            });
            break;
  
            case 'goal challenge':
              router.push({
                pathname: '/games/category/becomethehouse/goal/selectedGoal',
                params: {
                stake: stake?.toString(),
                odds,
                 gameLabel,
                GameName,
                range,
                selected,
                name,
                id
              },
              });
              break;
                case 'dice roll':
                   router.push({
                pathname: '/games/category/becomethehouse/DiceRoll/selectedDice',
                params: {
                stake: stake?.toString(),
                odds,
                 gameLabel,
                GameName,
                range,
                selected,
                id, name, losersGame
              },
              });
              break;
               case 'wheel spin':
                   router.push({
                pathname: '/games/category/becomethehouse/spinwheel/selectedSpin',
                params: {
                stake: stake?.toString(),
                odds,
                 gameLabel,
                GameName,
                range,
                selected,
                name,
                id, losersGame
              },
              });
              break; 
               case 'spin the bottle':
                   router.push({
                pathname: '/games/category/becomethehouse/spindabottle/selectedSpins',
                params: {
                stake: stake?.toString(),
                odds,
                 gameLabel,
                GameName,
                range,
                selected,
                name,
                id,
                losersGame,
              },
              });
              break; 

              case 'one number spin':
              router.push({
               pathname: '/games/category/becomethehouse/one-number-spin/number-spin-selected',
                params: {
                stake: stake?.toString(),
                odds,
                 gameLabel,
                GameName,
                range,
                selected,
                id,
                name,
              },
              });
              break;

               case 'color roulette2':
              router.push({
               pathname: '/games/category/becomethehouse/colorRoulette2/selectedColor2',
                params: {
                stake: stake?.toString(),
                odds,
                 gameLabel,
                GameName,
                range,
                selected,
                name,
                id
              },
              });
              break;
        default:
          // Handle unknown game gracefully
          console.warn(`[Navigation Error]: Unknown game "${GameName}" selected.`);
          alert('An error occurred: Unknown game selected. Please try again.');
      }
    }
   

   


   

    


     
      
    // setIsSubmitting(true);
    // setTimeout(() => {
    //   router.push({
    //     pathname: path,
    //     params: {
    //       stake: stake?.toString(),
    //       odds: odds?.toString(),
    //       gameLabel,
    //       GameName,
    //       range: range?.toString(),
    //       selected: selected?.toString(),
    //     },
    //   });
    //   setIsSubmitting(false);
    // }, 2000);
  };

  const handleCancel = () => {
    setIsCancelling(true);
    setTimeout(() => {
      setValue('');
      setIsCancelling(false);
    }, 1000);
  };

  const options = [
    { key: 'one', label: 'One Winner Takes All' },
    { key: 'two', label: 'Three Winners Share Rewards' },
    { key: 'five', label: 'Five Winners Share Rewards' },
  ];

  return (
    <>
      <HeaderBet arrow amount={'200'} backgroundColor="#E0EBFF" />
      <ScrollView contentContainerStyle={Votes.container}>
        <Text style={Votes.header}>Vote on Winning Distribution</Text>
        <Text style={Votes.subHeader}>Make Your Choice</Text>
        <Text style={Votes.description}>
          Choose how the winners should be rewarded. Select between one, two, or three winners to receive the prize.
        </Text>

        <View style={Votes.radioContainer}>
          {options.map((item) => (
            <TouchableOpacity
              key={item.key}
              style={[
                Votes.radioBox,
                value === item.key && Votes.radioBoxSelected,
              ]}
              onPress={() => setValue(item.key)}
            >
              <View
                style={[
                  Votes.radioCircle,
                  value === item.key && Votes.radioCircleSelected,
                ]}
              />
              <Text style={Votes.radioLabel}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={Votes.buttonRow}>
          <TouchableOpacity
            style={[Votes.button, Votes.cancelButton]}
            onPress={handleCancel}
            disabled={isCancelling}
          >
            {isCancelling ? (
              <ActivityIndicator color={PRIMARY_COLOR} />
            ) : (
              <Text style={[Votes.buttonText, { color: PRIMARY_COLOR }]}>Cancel</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={[Votes.button, Votes.submitButton]}
            onPress={handleSubmit}
            disabled={isSubmitting}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={[Votes.buttonText, { color: '#fff' }]}>Submit Vote</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
};

export default VoteColorRouletteScreen;
