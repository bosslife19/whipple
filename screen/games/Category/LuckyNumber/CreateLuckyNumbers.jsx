import React, { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
  Alert,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import Header from "../../../Header/Header";
import bgs from "../../../../assets/images/games/image_fx_ (35) 1.png";
import CreateGames2 from "../../../../styles/creategames/creategames.styles";
import creategame from "../../../../styles/creategame/creategame.styles";
import { useGameContext } from "../../../../context/AppContext";
import CustomInput from "../../../../components/Input/TextInput";
import { useRequest } from "../../../../hooks/useRequest";
import Toast from "react-native-toast-message";
import { AuthContext } from "../../../../context/AuthContext";

const formatCurrency = (value) => {
  if (!value) return "";
  const num = parseInt(value.toString(), 10);
  return `₦${num.toLocaleString()}`;
};

const CreateLuckyNumbers = () => {
  const { gameData, updateGameData } = useGameContext();
  const { loading, makeRequest, success, error, response } = useRequest();
  const {userDetails} = useContext(AuthContext);
 
  const {
    totalOdds,
    gameLabel,
    range,
    GameName,
    selectionCount,
    category,
    subcategory,
  } = gameData || {};

  // const { gameLabel, range, totalOdds, selectionCount,GameName } = useLocalSearchParams();
  const parsedRange = parseInt(range, 10);
  const parsedSelectionCount = parseInt(selectionCount, 10);
  const parsedTotalOdds = parseFloat(totalOdds);

  const [selectedNumbers, setSelectedNumbers] = useState([]);
  const [stakeAmount, setStakeAmount] = useState("");
  const [isInputFocused, setIsInputFocused] = useState(false);

  const handleNumberSelect = (number) => {
    setSelectedNumbers((prev) => {
      if (prev.includes(number)) {
        // If number already selected, remove it
        return prev.filter((n) => n !== number);
      } else {
        if (prev.length < parsedSelectionCount) {
          // If under the limit, just add the number
          return [...prev, number];
        } else {
          // Replace the first (oldest) selected number
          return [...prev.slice(1), number];
        }
      }
    });
  };

  const isPublishDisabled = selectedNumbers.length !== parsedSelectionCount;
  const stake = parseInt(stakeAmount || "0", 10);
  const admissionFee = Math.round(stake * 0.25);
  const totalAmount = stake + admissionFee;

  const handlePublish = async () => {
    if (selectedNumbers.length !== parsedSelectionCount) {
      alert(
        `Please select exactly ${parsedSelectionCount} number${
          parsedSelectionCount > 1 ? "s" : ""
        }.`
      );
      return;
    }

    if (isNaN(stake) || stake <= 0) {
      alert("Please enter a valid stake amount greater than ₦0.");
      return;
    }

    if(Number(stakeAmount) > userDetails.wallet_balance){
      return Alert.alert('Sorry', 'You do not have sufficient funds. Please deposit and try again');
    }

    
    const numbersString = selectedNumbers.join(","); 
    const response = await makeRequest("/create-game", {
      name: 'Lucky Number',
      category: gameData.category,
      subcategory: subcategory,
      result: numbersString,
      odds: gameData.totalOdds,
      stake:stakeAmount,
    });

    if(response.error){
     
      return Alert.alert('Error', response.error);
    }

if(response.response){
   Alert.alert('Success', 'Game Created Successfully');
   setTimeout(()=>{
       
   router.replace( '/(tabs)/home')
      }, 2000)
}
    router.replace("/(routes)/games/availablegames");
    
  };

  return (
    <>
      <Header backgroundColor="#A8BFED" />
      <ImageBackground source={bgs} style={creategame.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView
              contentContainerStyle={CreateGames2.scrollContainer}
              keyboardShouldPersistTaps="handled"
            >
              <View style={CreateGames2.container}>
                <Text style={CreateGames2.title}>
                  Select Exactly {parsedSelectionCount}
                </Text>
                <Text style={CreateGames2.subtitle}>
                  {gameLabel} (1 - {parsedRange})
                </Text>
                <Text style={CreateGames2.subtitle}>
                  Select exactly {parsedSelectionCount} number
                  {parsedSelectionCount > 1 ? "s" : ""} from the grid below
                </Text>

                {selectedNumbers.length > 0 && (
                  <View style={CreateGames2.selectedDisplay}>
                    <Text style={CreateGames2.selectedText}>
                      Selected: {selectedNumbers.join(", ")}
                    </Text>
                  </View>
                )}

                <View style={CreateGames2.grid}>
                  {Array.from({ length: parsedRange }).map((_, index) => {
                    const num = index + 1;
                    const isSelected = selectedNumbers.includes(num);
                    return (
                      <TouchableOpacity
                        key={num}
                        onPress={() => handleNumberSelect(num)}
                        style={[
                          CreateGames2.numberBtn,
                          isSelected && CreateGames2.numberBtnActive,
                        ]}
                      >
                        <Text
                          style={[
                            CreateGames2.numberText,
                            isSelected && CreateGames2.numberTextActive,
                          ]}
                        >
                          {num}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>

                <View style={CreateGames2.card}>
                  <View style={CreateGames2.cardHeader}>
                    <Text style={CreateGames2.cardTitle}>
                      3. Set Stake Amount
                    </Text>
                  </View>
                  <View style={CreateGames2.cardBody}>
                    <Text style={CreateGames2.label}>Stake Amount (₦)</Text>

                    <CustomInput
                      style={CreateGames2.input}
                      placeholder="Enter total amount"
                      keyboardType="numeric"
                      value={
                        stakeAmount === "" ? "" : formatCurrency(stakeAmount)
                      }
                      onFocus={() => setIsInputFocused(true)}
                      onBlur={() => setIsInputFocused(false)}
                      onChangeText={(text) => {
                        const raw = text.replace(/[₦,]/g, "");
                        if (!isNaN(Number(raw))) {
                          setStakeAmount(raw);
                        }
                      }}
                    />

                    {(isInputFocused || stakeAmount !== "") && (
                      <View style={CreateGames2.breakdownCard}>
                        <Text style={CreateGames2.breakdownTitle}>
                          Amount Breakdown
                        </Text>
                        <View style={CreateGames2.breakdownRow}>
                          <Text style={CreateGames2.breakdownLabel}>
                            Stake Amount:
                          </Text>
                          <Text style={CreateGames2.breakdownValue}>
                            {formatCurrency(stake)}
                          </Text>
                        </View>
                        <View style={CreateGames2.breakdownRow}>
                          <Text style={CreateGames2.breakdownLabel}>
                            Admission Fee (25%):
                          </Text>
                          <Text style={CreateGames2.breakdownValue}>
                            {formatCurrency(admissionFee)}
                          </Text>
                        </View>
                        <View style={CreateGames2.breakdownRow}>
                          <Text style={CreateGames2.breakdownLabel}>
                            Total:
                          </Text>
                          <Text style={CreateGames2.breakdownValue}>
                            {formatCurrency(totalAmount)}
                          </Text>
                        </View>
                      </View>
                    )}
                  </View>
                </View>

                <TouchableOpacity
                  style={[
                    CreateGames2.publishBtn,
                    !isPublishDisabled || stake <= 0
                      ? {}
                      : { backgroundColor: "#ccc" },
                  ]}
                  disabled={isPublishDisabled}
                  onPress={handlePublish}
                >
                  {loading ? (
                    <>
                      <ActivityIndicator color="white" size={20} />
                    </>
                  ) : (
                    <Text style={CreateGames2.publishBtnText}>
                      Publish Game
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
            </ScrollView>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </ImageBackground>
    </>
  );
};

export default CreateLuckyNumbers;
