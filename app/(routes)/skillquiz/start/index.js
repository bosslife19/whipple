import React, { useState, useEffect, useContext } from "react";
import { View, StyleSheet, Text, ActivityIndicator, Alert, TouchableOpacity } from "react-native";
import QuizSection from "../../../../components/quiz/Questions";
import Header2 from '../../../../screen/Header/Header2';
import { Ionicons } from "@expo/vector-icons";
import axiosClient from "../../../../axiosClient";
import { useRequest } from "../../../../hooks/useRequest";
import { formatCurrency } from '../../../../utlils';
import {AuthContext} from '../../../../context/AuthContext'
import { router } from 'expo-router';
import { Entypo, MaterialIcons } from '@expo/vector-icons'; // Import Material Icons
import { useNavigation } from '@react-navigation/native';

export default function QuizScreen() {
  const navigation = useNavigation(); // Get navigation object
  const {userBalance: userBalanceGen, setUserBalance: setUserBalanceGen, setUserPoint: setUserPointGen, setUserDetails} = useContext(AuthContext)
  const { loading, makeRequest } = useRequest();
  const [session, setSession] = useState('');
  const [questions, setQuestions] = useState([]);
  const [userBalance, setUserBalance] = useState(userBalanceGen);
  const [points, setPoints] = useState(0);
  const [admpar, setAdmpar] = React.useState('');
  const [loader, setLoader] = useState("loading");

  const handleClose = async () => { 
      try {
        const { error, response }  = await makeRequest("/quiz/close", {   
          session_id: session,
        });
        if (error) {
            console.log(error);
          Alert.alert("Error", "An error occur. Please try again!");
          router.replace('/(routes)/skillquiz');
          return;
        }
        router.replace('/(routes)/skillquiz');
      } catch (err) {
        console.error("Error submitting answer:", err);
        Alert.alert("Error", "An error occur. Please try again!");
        router.replace('/(routes)/skillquiz');
        return;
      }
    };

  const handlePoints = async (question, selectedAnswer) => { 
      try {
        const { error, response }  = await makeRequest("/quiz/answer", {   
          session_id: session,
          question_id: question,
          selected: selectedAnswer
        });
        if (error) {
            console.log(error);
          Alert.alert("Error", "An error occur. Please try again!");
          handleClose()
          return;
        }
        setPoints(response?.data?.current_score);
      } catch (err) {
        Alert.alert("Error", "An error occur. Please try again!");
        handleClose()
        return;
      }
    };


  const handleQuizEnd = async (question, selectedAnswer) => { 
      try {
        const { error, response }  = await makeRequest("/quiz/complete", {   
          session_id: session,
        });
        if (error) {
            console.log(error);
          Alert.alert("Error", "An error occur. Please try again!");
          handleClose()
          return;
        }
        setUserPointGen(response?.data?.balance)
        // setUserDetails(prev=>({...prev, wallet_balance:response?.data}));
        Alert.alert("Congrat.", `You won: ${response?.data?.score} points!`);
        router.replace('/(routes)/skillquiz');
        return;
      } catch (err) {
        Alert.alert("Error", "An error occur. Please try again!");
        handleClose()
        return;
      }
    };

  const handleBoost = async () => { 
      try {
        const { error, response }  = await makeRequest("/quiz/boost", {   
          session_id: session,
        });
        if (error) {
            console.log(error);
          Alert.alert("Error", "An error occur. Please try again!");
          router.replace('/(routes)/skillquiz');
          return;
        }
        setUserBalanceGen(response?.data)
        setUserDetails(prev=>({...prev, wallet_balance:response?.data}));
        return;
      } catch (err) {
        console.error("Error submitting answer:", err);
        Alert.alert("Error", "An error occur. Please try again!");
        router.replace('/(routes)/skillquiz');
        return;
      }
    };

  const fetchAdminParameter = async () => {
    try {
      const res = await axiosClient.get("/admin/parameter");
      setAdmpar(res.data.data ?? ""); 
    } catch (error) {  
      console.error('Error fetching admin parameter:', error);
      return;
    } finally { 
        return;
    }
  };

  const fetchQuestion = async () => {
    try {
      const res = await axiosClient.get("/quiz/start");
      setQuestions(res.data.data?.questions ?? []); 
      setSession(res.data.data?.session_id ?? '')
    } catch (error) {  
      console.error('Error fetching quiz:', error);
      Alert.alert("Error", "You’ve reached daily limit. Try again tomorrow!");
      router.replace('/(routes)/skillquiz');
      return;
    } finally { 
      return;
    } 
  };

  useEffect(() => {
    fetchAdminParameter();
    fetchQuestion();
    setLoader('')
  }, []);

  return (
    <>
        <View style={[styles.headerContainer, { backgroundColor: "#A8BFED" }]}>
            {/* Go Back Button */}
            <TouchableOpacity onPress={() => handleClose()}>
            <Entypo name="cross" size={24} color="black" />            
            </TouchableOpacity>

            {/* Centered Title */}
            <Text style={styles.headerText}>Game Start</Text>
        </View>
        {questions.length === 0 ? (
            <ActivityIndicator size="large" color="#000" />
        ) : (
            <>
                <View style={styles.header}>
                    <Text style={styles.level}>
                        <Ionicons name="time-outline" size={16} color="#555" /> Beginner
                    </Text>
                    <Text style={{fontWeight: 700, color: '#016849'}}>NGN {formatCurrency(userBalance)}</Text>
                    <View style={styles.pointsBox}>
                        <Ionicons name="trophy-outline" size={16} color="#333" />
                        <Text style={styles.points}> {points} / {admpar?.no_question * admpar?.award_point} points</Text>
                    </View>
                </View>
                <View style={{ flex: 1 }}>
                    <QuizSection
                        paramters={admpar}   
                        questions={questions}
                        userBalance={userBalance}
                        setUserBalance={setUserBalance}
                        onPointsUpdate={handlePoints}
                        onQuizEnd={handleQuizEnd}
                        onBoost={handleBoost}
                    />
                </View>
            </>
        )}
    </>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: "15%",
        paddingVertical: 15,
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        borderColor: "#F1F5F9",
    },
    headerText: {
        flex: 0.9,
        fontSize: 16,
        fontWeight: "700",
        textAlign: "center",
        fontFamily: "montserratMeduim"
    },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  level: { fontSize: 14, color: "#555" },
  pointsBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  points: { fontSize: 14, fontWeight: "600" },
});
