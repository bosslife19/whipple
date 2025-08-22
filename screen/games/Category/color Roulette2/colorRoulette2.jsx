import React, { useState, useRef, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  ActivityIndicator,
  TextInput,
  StyleSheet,
  Alert,
} from "react-native";
import Svg, { Path } from "react-native-svg";
import diceColorRou from "../../../../styles/diceGame/dice.styles";
import ColorRou from "../../../../styles/colorRoulete.styles";
import { ScrollView } from "react-native";
import dicestyles from "../../../../styles/diceGame/dice.styles";
import Header from "../../../Header/Header";
import { router, useLocalSearchParams } from "expo-router";
import { useGameContext } from "../../../../context/AppContext";
import { ImageBackground } from "react-native";
import bgs from "../../../../assets/images/games/bluur.jpeg";
import CustomInput from "../../../../components/Input/TextInput";
import { useRequest } from "../../../../hooks/useRequest";
import { AuthContext } from "../../../../context/AuthContext";
const colors = [
  { id: "red", hex: "#EA384C", label: "Red" },
  { id: "blue", hex: "#0EA5E9", label: "Blue" },
  { id: "green", hex: "#22C55E", label: "Green" },
  { id: "yellow", hex: "#EAB308", label: "Yellow" },
];

const ColorRouletteGame2 = () => {
  const spinValue = useRef(new Animated.Value(0)).current;
  const [activeColors, setActiveColors] = useState([]);
  const [loading, setLoading] = useState(false);
  const { makeRequest } = useRequest();
  // New state for stake, admission fee, and total amount
  const [stake, setStake] = useState("");
  const [admissionFee, setAdmissionFee] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [walletBalance, setWalletBalance] = useState(150000); // Example balance
  const { name, id } = useLocalSearchParams();
const {userDetails} = useContext(AuthContext)
  const [isPublishEnabled, setIsPublishEnabled] = useState(false); // Track if publish button should be enabled

  // Function to update stake and calculate admission fee and total amount
  const handleStakeChange = (value) => {
    setStake(value);

    // Calculate admission fee (25% of the stake)
    const calculatedAdmissionFee = parseFloat(value) * 0.25;
    setAdmissionFee(calculatedAdmissionFee);

    // Calculate total amount
    const calculatedTotalAmount = parseFloat(value) + calculatedAdmissionFee;
    setTotalAmount(calculatedTotalAmount);

    // Enable or disable publish button based on stake input
    if (parseFloat(value) > 0) {
      setIsPublishEnabled(true);
    } else {
      setIsPublishEnabled(false);
    }
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

  const spin = spinValue.interpolate({
    inputRange: [0, 360 * 4],
    outputRange: ["0deg", `${360 * 4}deg`],
  });

  const getOpacity = (id) => {
    return activeColors.length === 0 || activeColors.includes(id) ? 1 : 0.4;
  };
  const selectedNumbers = activeColors; // Example of using activeColors for the selection
  const parsedTotalOdds = "4"; // This can be calculated or assigned as needed

  // const { gameLabel, range, totalOdds, selectionCount,GameName='Color Roulette2' } = useLocalSearchParams();
  const { gameData, updateGameData } = useGameContext();
  const { range } = gameData || {};
  const GameName = "Color Roulette2";
  const gameLabel = `${activeColors}`;
  const handlePublish = async () => {
    // Ensure there are exactly 2 selected colors (or any other valid number)

    if (activeColors.length !== 1) {
      alert("Please spin the wheel and let one color be selected.");
      return;
    }
    const selectedColors = activeColors.join(","); // Join selected color IDs into a comma-separated string
if(Number(stake) > userDetails.wallet_balance){
      return Alert.alert('Sorry', 'You do not have sufficient funds. Please deposit and try again');
    }
    
    const res = await makeRequest("/create-game", {
      name: "Color Roulette2",
      colorSpun: activeColors[0],
      odds:Number(parsedTotalOdds),
      stake,
    });
    if (res.response) {
      setLoading(false)
      Alert.alert("Success", "Game Created Successfully");
      setTimeout(() => {
        router.replace("/(routes)/games/availablegames");
      }, 2000);
    } else {
      setLoading(false)
      if (res.error) {
        return Alert.alert("Error", res.error);
      } else {
        return Alert.alert("Error", "Server Error");
      }
    }

    updateGameData({
      stake: stake.toString(),
      odds: parsedTotalOdds + "x",
      gameLabel,
      GameName,
      range,
      selected: selectedColors, // ✅ included selected colors here
    });
  };

  return (
    <>
      <Header name="Recently Pushlished Games" />
      <ScrollView style={{ backgroundColor: "#EEF6FF", marginBottom: "30%" }}>
        {/* <ImageBackground source={bgs} style={{ paddingBottom: 40,  }}> */}
        <View style={ColorRou.container}>
          <Text style={ColorRou.heading}>{GameName}</Text>

          <View style={ColorRou.wheelContainer}>
            <Animated.View
              style={[ColorRou.wheel, { transform: [{ rotate: spin }] }]}
            >
              <Svg height="100%" width="100%" viewBox="0 0 100 100">
                <Path
                  d="M50 50L70 5L195 5Z"
                  fill="#EA384C"
                  opacity={getOpacity("red")}
                />
                <Path
                  d="M50 50L101 50L95 90Z"
                  fill="#0EA5E9"
                  opacity={getOpacity("blue")}
                />
                <Path
                  d="M50 50L48 100L5 95Z"
                  fill="#22C55E"
                  opacity={getOpacity("green")}
                />
                <Path
                  d="M50 50L0 50L5 5Z"
                  fill="#EAB308"
                  opacity={getOpacity("yellow")}
                />
              </Svg>
            </Animated.View>

            <View style={ColorRou.centerDot} />
            <View style={ColorRou.arrow} />
          </View>

          {activeColors.length === 1 && (
            <View style={ColorRou.selectedColors}>
              {colors
                .filter((c) => activeColors.includes(c.id))
                .map((c) => (
                  <View
                    key={c.id}
                    style={[ColorRou.colorBox, { backgroundColor: c.hex }]}
                  >
                    <Text style={[diceColorRou.result, { color: "#fff" }]}>
                      {c.label}
                    </Text>
                  </View>
                ))}
            </View>
          )}

          <TouchableOpacity
            onPress={spinWheel}
            style={ColorRou.button}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={[diceColorRou.result, ColorRou.buttonText]}>
                Spin Wheel
              </Text>
            )}
          </TouchableOpacity>

          {/* Right Card - Stake Input */}
          <View style={[dicestyles.card, { marginTop: 20, width: "100%" }]}>
            <Text style={dicestyles.title}>Set Your Stake</Text>
            <Text style={dicestyles.label}>Your Stake (₦)</Text>

            <CustomInput
              style={dicestyles.input}
              placeholder="Enter total amount"
              keyboardType="numeric"
              value={stake}
              onChangeText={handleStakeChange}
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
            <Text>Your wallet balance: ₦{walletBalance.toLocaleString()}</Text>
            <TouchableOpacity
              onPress={handlePublish}
              style={[
                dicestyles.button,
                {
                  backgroundColor: isPublishEnabled ? "#0A1931" : "#ccc",
                  marginTop: 16,
                },
              ]}
              disabled={!isPublishEnabled}
            >
              {loading ? (
                <ActivityIndicator color="white" size={20} />
              ) : (
                <Text style={dicestyles.buttonText}>Publish Game</Text>
              )}
            </TouchableOpacity>
          </View>

          {/* How it Works */}
          <View style={dicestyles.card}>
            <Text style={dicestyles.title}>How It Works</Text>
            <Text style={dicestyles.description}>
              Spin the wheel to randomly select one color. Players will bet
              against your selected color with odds of 4x. If they correctly
              guess either of your color, they win. If they guess wrong, you
              win.
            </Text>
          </View>
        </View>
        {/* </ImageBackground> */}
      </ScrollView>
    </>
  );
};
const styles = StyleSheet.create({
  backHomeButton: {
    marginTop: 16,
    backgroundColor: "#0A1931",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  backHomeButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});
export default ColorRouletteGame2;
