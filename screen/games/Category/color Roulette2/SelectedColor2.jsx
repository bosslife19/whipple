import React, { useRef, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Animated, Alert } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useLocalSearchParams, useRouter } from 'expo-router';
import ColorRou from '../../../../styles/colorRoulete.styles';
import HeaderBet from '../../../Header/HeaderBet';
import Slectedcol from '../../../../styles/selectedColorsstyles';
import Losingmodal from '../../../loseModal/LoseModal';
import Winningmodal from '../../../winningmodal/winningmodal';
import { useGameContext } from '../../../../context/AppContext';
import Goalstyles from '../../../../styles/Goal.styles';

const ColorRouletteSelect2 = () => {
    const [selectedColor, setSelectedColor] = useState(null);
    const [activeColors, setActiveColors] = useState([]);
    const [loading, setLoading] = useState(false);
    const [hasSpun, setHasSpun] = useState(false);
    const [success, setSuccess] = useState(null); // null initially, true/false after check
  
    const [visible, setModalVisibled] = useState(false);
   
  
   const closeModal =()=>{
      setModalVisibled(false)
  
    }
    // const { stake,gameLabel,  odds,  GameName = 'Color Roulette2' } = useLocalSearchParams();
   
    const { gameData ,updateGameData } = useGameContext();
       const {selected,  stake,  odds,  GameName='Color Roulette2'} = gameData || {};
   
    const router = useRouter();
    const spinValue = useRef(new Animated.Value(0)).current;
  
    const colors = [
      { id: 'red', hex: '#EA384C', label: 'Red' },
      { id: 'blue', hex: '#0EA5E9', label: 'Blue' },
      { id: 'green', hex: '#22C55E', label: 'Green' },
      { id: 'yellow', hex: '#EAB308', label: 'Yellow' },
    ];
  
    useEffect(() => {
      if (selected) {
        const match = colors.find(c => c.id === selected);
        if (match) {
          setSelectedColor(match);
        }
      }
    }, [selected]);
  
    const handleColorSelect = (color) => {
      setSelectedColor(color);
    };
  
    const spinWheel = () => {
     setLoading(true);
     Animated.timing(spinValue, {
       toValue: 360 * 4,
       duration: 2000,
       useNativeDriver: true,
     }).start(() => {
       spinValue.setValue(0);
       const randomIndex = Math.floor(Math.random() * colors.length);
       const selected = [colors[randomIndex].id];
       setActiveColors(selected);
       setLoading(false);
     });
   };

       

     const handleLosersGame = () => {
      // to get the active colors 
     const gameLabel=`${activeColors}`

     updateGameData({
      stake ,
       odds,
       gameLabel,
       GameName,
       isGameLost: true, // Flag indicating if the game is lost
     });
        router.push('/(routes)/games/LostGames/ViewLostGames');
      };
  
    const spin = spinValue.interpolate({
      inputRange: [0, 360 * 4],
      outputRange: ['0deg', `${360 * 4}deg`],
    });
  
    const getOpacity = (id) => {
      return activeColors.length === 0 || activeColors.includes(id) ? 1 : 0.4;
    };
  
    useEffect(() => {
      if (!loading && activeColors.length > 0 && selectedColor) {
        if (activeColors.includes(selectedColor.id)) {
          setSuccess(true); // It's a win
        } else {
          setSuccess(false); // lose

        }
        setModalVisibled(true);
      }
    }, [activeColors, loading]);
  
    return (
      <View style={{ marginBottom: '0%', height: '100%', backgroundColor: '#EEF6FF' }}>
        <HeaderBet amount={'200'} arrow name={GameName} backgroundColor='#EEF6FF' />
        <ScrollView style={Slectedcol.container}>
          <View style={Slectedcol.header}>
            <Text style={Slectedcol.title}>{GameName} Game</Text>
            <Text style={Slectedcol.description}>Select a color and try to match the House's colors!</Text>
          </View>
  
          <View style={Slectedcol.card}>
            <Text style={Slectedcol.cardTitle}>{GameName}</Text>
            <Text style={Slectedcol.cardSubtitle}>House: @user</Text>
          </View>
  
          <View style={Slectedcol.wheelContainer}>
            <View style={ColorRou.wheelContainer}>
              <Animated.View style={[ColorRou.wheel, { transform: [{ rotate: spin }] }]}>
                <Svg height="100%" width="100%" viewBox="0 0 100 100">
                  <Path d="M50 50L70 5L195 5Z" fill="#EA384C" opacity={getOpacity('red')} />
                  <Path d="M50 50L101 50L95 90Z" fill="#0EA5E9" opacity={getOpacity('blue')} />
                  <Path d="M50 50L48 100L5 95Z" fill="#22C55E" opacity={getOpacity('green')} />
                  <Path d="M50 50L0 50L5 5Z" fill="#EAB308" opacity={getOpacity('yellow')} />
                </Svg>
              </Animated.View>
            </View>
  
            <View style={[Slectedcol.colorOptions,
              {
                width:'70%'
              }
            ]}>
              {colors.map((color) => (
                <TouchableOpacity
                  key={color.id}
                  style={[Slectedcol.colorButton, {
                    backgroundColor: color.hex,
                    // opacity: selectedColor?.id === color.id || hasSpun ? 0.5 : 0.9, 
                  }]}
                  onPress={() => {
                    if (!selectedColor && !hasSpun) {
                      handleColorSelect(color);
                    }
                  }}
                  disabled={selectedColor !== null || hasSpun}
                >
                  <Text style={Slectedcol.colorButtonText}>{color.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
            
            <Text style={Slectedcol.resultText}>House's Colors:</Text>
            <View style={Slectedcol.colorBlockContainer}>
              {activeColors.map(id => {
                const colorObj = colors.find(c => c.id === id);
                if (!colorObj) return null;
                return (
                  <View key={id} style={[Slectedcol.colorBlock, { backgroundColor: colorObj.hex }]}>
                    <Text style={Slectedcol.colorBlockText}>{colorObj.label}</Text>
                  </View>
                );
              })}
            </View>
  
          {success === false && (
              <TouchableOpacity style={Slectedcol.spinButton} onPress={handleLosersGame}>
                <Text style={Slectedcol.spinButtonText}>Play Losers Game</Text>
              </TouchableOpacity>
          )}
           {success === true && ( 
            <TouchableOpacity
             style={Goalstyles.button}
             onPress={() => router.push('/(routes)/games/category/category-main')}  >
             <Text style={styles.buttonText}>Go Back to Games</Text>
            </TouchableOpacity>  )} 
            {success === null && (
              <TouchableOpacity
                style={[Slectedcol.spinButton, ]}
                // disabled={selectedColor === null || loading}
                onPress={spinWheel}
              >
                <Text style={Slectedcol.spinButtonText}>{loading ? 'Spinning...' : 'Spin Wheel'}</Text>
              </TouchableOpacity>
            )}
          </View>
  
          <View style={Slectedcol.card}>
            <Text style={Slectedcol.cardTitle}>How To Win</Text>
            <Text style={Slectedcol.cardDescription}>
              Select a color and spin the wheel. If your color matches one of the two colors the House chose, you win!
            </Text>
          </View>
        </ScrollView>

        {success === true && (
       <Winningmodal
       visible={visible}
       closeModal={closeModal}
      />
     )}
    {success === false && (
    <Losingmodal 
    visible={visible}
    closeModal={closeModal}
    />
    )}
      </View>
    );
  };



export default ColorRouletteSelect2;
