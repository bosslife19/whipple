import React, { useContext, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StyleSheet,
  Animated,
  Easing,
  ActivityIndicator,
  Alert,
} from "react-native";
import Svg, { Circle, Rect, Path } from "react-native-svg";
import HeaderBet from "../../../Header/HeaderBet";
import FLipCoin from "../../../../styles/flipcoin/flipCoin";
import dicestyles from "../../../../styles/diceGame/dice.styles";
import { router, useLocalSearchParams } from "expo-router";
import { useGameContext } from "../../../../context/AppContext";
import CustomInput from "../../../../components/Input/TextInput";
import { useRequest } from "../../../../hooks/useRequest";
import { AuthContext } from "../../../../context/AuthContext";

export default function DiceGameScreen() {
  const [diceType, setDiceType] = useState("single");
  const [diceRolled, setDiceRolled] = useState(false);

  const [stake, setStake] = useState("");
  const [face1, setFace1] = useState(1);
  const [face2, setFace2] = useState(1);
  const {userDetails} = useContext(AuthContext);
  const walletBalance = userDetails?.wallet_balance;
  const admissionFee = Number(stake) * 0.25;
  const totalAmount = Number(stake) + admissionFee;

  const spinValue1 = useRef(new Animated.Value(0)).current;
  const spinValue2 = useRef(new Animated.Value(0)).current;


  const rollDice = () => {
    const newFace1 = Math.floor(Math.random() * 6) + 1;
    const newFace2 = Math.floor(Math.random() * 6) + 1;
    setFace1(newFace1);
    setFace2(newFace2);

    spinValue1.setValue(0);
    spinValue2.setValue(0);

    Animated.parallel([
      Animated.timing(spinValue1, {
        toValue: 1,
        duration: 1000,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true,
      }),
      Animated.timing(spinValue2, {
        toValue: 1,
        duration: 1000,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true,
      }),
    ]).start();
    setDiceRolled(true);
  };

  const spin1 = spinValue1.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "1080deg"],
  });

  const spin2 = spinValue2.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "1080deg"],
  });

  const dotLayouts = {
    1: [[1, 1]],
    2: [
      [0, 0],
      [2, 2],
    ],
    3: [
      [0, 0],
      [1, 1],
      [2, 2],
    ],
    4: [
      [0, 0],
      [0, 2],
      [2, 0],
      [2, 2],
    ],
    5: [
      [0, 0],
      [0, 2],
      [1, 1],
      [2, 0],
      [2, 2],
    ],
    6: [
      [0, 0],
      [1, 0],
      [2, 0],
      [0, 2],
      [1, 2],
      [2, 2],
    ],
  };

  const getDots = (face) => {
    const size = 3;
    const grid = Array(size)
      .fill(null)
      .map((_, row) =>
        Array(size)
          .fill(null)
          .map((_, col) => {
            const shouldRenderDot = dotLayouts[face].some(
              (dot) => dot[0] === row && dot[1] === col
            );
            return (
              <View
                key={`${row}-${col}`}
                style={[dicestyles.dotCell, shouldRenderDot && dicestyles.dot]}
              />
            );
          })
      );

    return grid.map((row, i) => (
      <View key={i} style={dicestyles.dotRow}>
        {row}
      </View>
    ));
  };

  // Calculate odds for single or double dice roll
  const getOdds = () => {
    if (diceType === "single") {
      return 5.988; // Fixed odds for single dice roll
    }

    const sum = face1 + face2;

    switch (sum) {
      case 12:
        return 35.714;
      case 11:
        return 17.857;
      case 10:
        return 12.048;
      case 9:
        return 9.009;
      case 8:
        return 7.194;
      case 7:
        return 5.988;
      case 6:
        return 7.194;
      case 5:
        return 9.009;
      case 4:
        return 12.048;
      case 3:
        return 17.857;
      case 2:
        return 35.714;
      default:
        return 0;
    }
  };

  const isStakeValid = !isNaN(Number(stake)) && Number(stake) > 0;

  const isPublishEnabled = isStakeValid && diceRolled;

  const {
    gameLabel,
    range,
    totalOdds,
    result: initialResult,
    GameName = "Dice Roll",
  } = useLocalSearchParams();

  const { updateGameData } = useGameContext();
  const { makeRequest, loading } = useRequest();
  // const { stake, odds, gameLabel, range, selected, GameName, isGameLost } = gameData;

  const handlePublish = async () => {
    const odds = getOdds();
    const gameLabel = diceType === "double" ? `${face1 + face2}` : `${face1}`;
   if(Number(stake) > userDetails.wallet_balance){
         return Alert.alert('Sorry', 'You do not have sufficient funds. Please deposit and try again');
       }
     
    const res = await makeRequest("/create-game", {
      name: "Dice Roll",
      odds: getOdds(),
      stake,
      diceType,
      diceRolled: gameLabel,
    });
    
    if(res.response){
      Alert.alert('Success', 'Game Created Successfully');
      setTimeout(()=>{
        router.replace("/(tabs)/home");
      }, 3000)
    }else if(res.error){
      return Alert.alert('Error', res.error);
    }

    
   
  };
  return (
    <>
      <HeaderBet name={GameName} arrow backgroundColor="#EEF6FF" />
      <View style={dicestyles.contain}>
        <ScrollView style={dicestyles.container}>
          <Text style={dicestyles.title}>Create {GameName} Game</Text>
          <Text style={dicestyles.subDescription}>Create {GameName} Game</Text>

          <View style={dicestyles.row}>
            {/* Left Card - Roll Dice */}
            <View style={dicestyles.card}>
              <Text style={dicestyles.title}>Roll The Dice</Text>

              {/* Dice Type Selector */}
              <View style={dicestyles.radioGroup}>
                <TouchableOpacity
                  style={dicestyles.radio}
                  onPress={() => setDiceType("single")}
                >
                  <View
                    style={[
                      dicestyles.radioDot,
                      diceType === "single" && dicestyles.radioDotSelected,
                    ]}
                  >
                    {diceType === "single" && (
                      <Svg width={10} height={10}>
                        <Circle cx={5} cy={5} r={5} fill="#000" />
                      </Svg>
                    )}
                  </View>
                  <Text>Single Dice</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={dicestyles.radio}
                  onPress={() => setDiceType("double")}
                >
                  <View
                    style={[
                      dicestyles.radioDot,
                      diceType === "double" && dicestyles.radioDotSelected,
                    ]}
                  >
                    {diceType === "double" && (
                      <Svg width={10} height={10}>
                        <Circle cx={5} cy={5} r={5} fill="#000" />
                      </Svg>
                    )}
                  </View>
                  <Text>Double Dice</Text>
                </TouchableOpacity>
              </View>

              {/* Animated Dice */}
              <View style={{ flexDirection: "row", gap: 20 }}>
                <Animated.View
                  style={[
                    dicestyles.diceBox,
                    { transform: [{ rotate: spin1 }] },
                  ]}
                >
                  <View style={dicestyles.diceFace}>{getDots(face1)}</View>
                </Animated.View>
                {diceType === "double" && (
                  <Animated.View
                    style={[
                      dicestyles.diceBox,
                      { transform: [{ rotate: spin2 }] },
                    ]}
                  >
                    <View style={dicestyles.diceFace}>{getDots(face2)}</View>
                  </Animated.View>
                )}
              </View>

              {/* Result Info */}
              <View style={dicestyles.resultInfo}>
                <Text style={dicestyles.result}>
                  Result: {face1}
                  {diceType === "double" ? ` and ${face2}` : ""}
                </Text>
                <Text
                  style={[dicestyles.odds, { fontWeight: "600", fontSize: 16 }]}
                >
                  Total: {diceType === "double" ? face1 + face2 : face1}
                </Text>
                <Text style={dicestyles.odds}>Odds: {getOdds()}</Text>
              </View>

              {/* Roll Button */}
              <TouchableOpacity style={dicestyles.button} onPress={rollDice}>
                <Svg width={20} height={20} viewBox="0 0 24 24" stroke="white">
                  <Rect x="2" y="10" width="12" height="12" rx="2" />
                  <Path
                    d="M17.92 14l3.5-3.5a2.24 2.24 0 0 0 0-3l-5-4.92a2.24 2.24 0 0 0-3 0L10 6"
                    stroke="white"
                  />
                </Svg>
                <Text style={dicestyles.buttonText}>Roll Dice</Text>
              </TouchableOpacity>
            </View>

            {/* Right Card - Stake Input */}
            <View style={dicestyles.card}>
              <Text style={dicestyles.title}>Set Your Stake</Text>
              <Text style={dicestyles.label}>Your Stake (₦)</Text>

              <CustomInput
                style={dicestyles.input}
                placeholder="Enter total amount"
                keyboardType="numeric"
                value={stake}
                onChangeText={setStake}
              />

              <View style={dicestyles.feeRow}>
                <Text>Admission Fee (25%)</Text>
                <Text>
                  ₦
                  {admissionFee.toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                  })}
                </Text>
              </View>
              <View style={dicestyles.feeRow}>
                <Text style={{ fontWeight: "bold" }}>Total Amount</Text>
                <Text style={{ fontWeight: "bold" }}>
                  ₦
                  {totalAmount.toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                  })}
                </Text>
              </View>
              <Text>
                Your wallet balance: ₦{walletBalance.toLocaleString()}
              </Text>
              <TouchableOpacity
                onPress={handlePublish}
                style={[
                  FLipCoin.button,
                  {
                    backgroundColor: isPublishEnabled ? "#0A1931" : "#ccc",
                    marginTop: 16,
                    justifyContent:'center',
                    alignItems:'center'
                  },
                ]}
                disabled={!isPublishEnabled}
              >
                {loading ? (
                  <ActivityIndicator style={{alignSelf:'center'}} color={'white'} size={20} />
                ) : (
                  <Text style={FLipCoin.buttonText}>Publish Game</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>

          {/* How it Works */}
          <View style={dicestyles.card}>
            <Text style={dicestyles.title}>How It Works</Text>
            <Text style={dicestyles.description}>
              Roll the dice and set your stake. Players will bet against your
              result with odds of {getOdds()}. If they correctly guess your
              roll, they win. If they guess wrong, you win.
            </Text>
          </View>
        </ScrollView>
      </View>
    </>
  );
}
