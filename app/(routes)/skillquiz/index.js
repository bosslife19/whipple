import React, {useState, useEffect} from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Header2 from '../../../screen/Header/Header2';
import { router } from 'expo-router';
import axiosClient from "../../../axiosClient";
import { useRequest } from "../../../hooks/useRequest";
import { Entypo, MaterialIcons } from '@expo/vector-icons'; // Import Material Icons

const categories = [
  "Sports",
  "Politics",
  "Entertainment",
  "Music",
  "Military",
  "Agriculture",
  "General Knowledge",
];

export default function SkillQuizPro() {
    const [admpar, setAdmpar] = React.useState('');
    const [loader, setLoader] = useState("");

    const fetchAdminParameter = async () => {
    try {
      setLoader("adm");
      const res = await axiosClient.get("/admin/parameter");
      setAdmpar(res.data.data ?? ""); // assuming API returns array of transactions
    } catch (error) {  
      console.error('Error fetching admin parameter:', error);
    } finally { 
      setLoader("");
    }
  };

  useEffect(() => {
    fetchAdminParameter();
  }, []);

  return (
    <>
        {/* <Header2 name="SkillQuiz Pro" arrow="arrow-back" backgroundColor="#A8BFED" /> */}
        <View style={[styles.headerContainer, { backgroundColor: "#A8BFED" }]}>
            {/* Go Back Button */}
            <TouchableOpacity onPress={() => router.replace('/(tabs)/home')}>
            <Entypo name="cross" size={24} color="black" />            
            </TouchableOpacity>

            {/* Centered Title */}
            <Text style={styles.headerText}>SkillQuiz Pro</Text>
        </View>
        {loader === "adm" ? (
            <ActivityIndicator size="large" color="#000" />
        ) : (
            <ScrollView contentContainerStyle={styles.container}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.level}>
                    <Ionicons name="time-outline" size={16} color="#555" /> Beginner
                    </Text>
                    <View style={styles.pointsBox}>
                    <Ionicons name="trophy-outline" size={16} color="#333" />
                    <Text style={styles.points}> 0 / {admpar?.no_question * admpar?.award_point} points</Text>
                    </View>
                </View>

                {/* Rewards Short */}
                {/* <View style={styles.rewardShort}>
                    <Text style={styles.rewardText}>20+ Points{"\n"}Free withdrawals (2.5% fee waived)</Text>
                    <Text style={styles.rewardText}>40+ Points{"\n"}25% discount on all bets & house fees</Text>
                    <Text style={styles.rewardText}>80 Points{"\n"}Free bets & waived house admission</Text>
                </View> */}

                {/* Welcome */}
                <Text style={styles.welcomeTitle}>Welcome to SkillQuiz Pro</Text>
                <Text style={styles.welcomeSub}>
                    Test your knowledge across multiple categories and earn rewards!
                </Text>

                {/* Quiz Format */}
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>
                    <Ionicons name="disc-outline" size={18} color="#000" /> Quiz Format
                    </Text>
                    <View style={styles.row}>
                    <Text style={styles.label}>Total Questions:</Text>
                    <Text style={styles.value}>{admpar?.no_question} Questions</Text>
                    </View>
                    <View style={styles.row}>
                    <Text style={styles.label}>Points per Answer:</Text>
                    <Text style={styles.value}>{admpar?.award_point} Points</Text>
                    </View>
                    <View style={styles.row}>
                    <Text style={styles.label}>Maximum Score:</Text>
                    <Text style={styles.value}>{admpar?.no_question * admpar?.award_point} Points</Text>
                    </View>
                    <View style={styles.row}>
                    <Text style={styles.label}>Time per Question:</Text>
                    <Text style={styles.value}>{admpar?.allow_time} Seconds</Text>
                    </View>
                </View>

                {/* Rewards & Benefits */}
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>
                    <Ionicons name="trophy-outline" size={18} color="#EFC646" /> Rewards & Benefits
                    </Text>
                    <Text style={[styles.benefit, {backgroundColor: "#EBF2FE", borderRadius: 5, padding:15}]}>
                    <Text style={[styles.boldBlue, {color: "#2563EB"}]}>{admpar?.withdraw_charge_waived_point}+ Points </Text> {"\n"}
                    <Text>Waived withdrawal fees {`(${admpar?.withdraw_type === 'percent' ? admpar?.withdraw_charge + '%' : 'NGN ' + admpar?.withdraw_charge})`}</Text>
                    </Text>
                    <Text style={[styles.benefit, {backgroundColor: "#F6EEFE", borderRadius: 5, padding:15}]}>
                    <Text style={[styles.boldBlue, {color: "#9333EA"}]}>40+ Points </Text>{"\n"} 25% discount on events & knight fees
                    </Text>
                    <Text style={[styles.benefit, {backgroundColor: "#FDF7E6", borderRadius: 5, padding:15}]}>
                    <Text style={[styles.boldBlue, {color: "#CA8A04"}]}>80 Points </Text>{"\n"} Free events & waived knight admission
                    </Text>
                </View>

                {/* Categories Covered */}
                <View style={styles.card2}>
                    <Text style={styles.cardTitle2}>
                    <Ionicons name="flash-outline" size={18} color="#f97316" /> Categories Covered
                    </Text>
                    <View style={styles.categoryWrap}>
                    {categories.map((cat, idx) => (
                        <View key={idx} style={styles.categoryChip}>
                        <Text style={styles.categoryText}>{cat}</Text>
                        </View>
                    ))}
                    </View>
                </View>

                {/* Important Rules */}
                <View style={styles.rulesCard}>
                    <Text style={styles.rulesTitle}>
                    <Ionicons name="warning-outline" size={18} color="#dc2626" /> Important Rules
                    </Text>
                    <View style={styles.ruleRow}>
                    <Ionicons name="time-outline" size={16} color="#C4410C" />
                    <Text style={styles.ruleText}>
                        You have {admpar?.allow_time} seconds per question. Questions auto-advance after timeout.
                    </Text>
                    </View>
                    <View style={styles.ruleRow}>
                    <Ionicons name="refresh-outline" size={16} color="#C4410C" />
                    <Text style={styles.ruleText}>
                        Leaving this page will reset your progress. Complete all {admpar?.no_question} questions in one session.
                    </Text>
                    </View>
                    <View style={styles.ruleRow}>
                    <Ionicons name="trophy-outline" size={16} color="#C4410C" />
                    <Text style={styles.ruleText}>
                        Points expire after 24 hours. Use your rewards within this timeframe.
                    </Text>
                    </View>
                    <View style={styles.ruleRow}>
                    <Ionicons name="cash-outline" size={16} color="#C4410C" />
                    <Text style={styles.ruleText}>
                        Pay ₦{admpar?.boost_time_amount} per question to extend time to {admpar?.boost_time} seconds (optional).
                    </Text>
                    </View>
                </View>

                {/* Start Quiz Button */}
                <TouchableOpacity style={styles.startBtn} onPress={()=> router.push("/(routes)/skillquiz/start")}>
                    <Text style={styles.startText}>Start Quiz Challenge</Text>
                </TouchableOpacity>
                <Text style={styles.footer}>Ready to test your knowledge? Click to begin!</Text>
        
            </ScrollView>
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
  container: { backgroundColor: "#fff", padding: 15 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  appName: { fontSize: 20, fontWeight: "700" },
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

  rewardShort: { marginBottom: 20 },
  rewardText: { fontSize: 14, color: "#333", marginBottom: 8, backgroundColor: '#F3F4F6', borderRadius: 5, paddingVertical: 15, paddingHorizontal: 10 },

  welcomeTitle: { fontSize: 22, fontWeight: "700", textAlign: "center", marginVertical: 10 },
  welcomeSub: { fontSize: 15, color: "#666", textAlign: "center", marginBottom: 20 },

  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: { fontSize: 16, fontWeight: "600", marginBottom: 10 },
  row: { flexDirection: "row", justifyContent: "space-between", marginBottom: 6 },
  label: { fontSize: 14, color: "#555" },
  value: { fontSize: 14, fontWeight: "600", color: "#000", backgroundColor: '#F1F5F9', borderRadius: 5, padding: 5 },

  benefit: { fontSize: 14, color: "#333", marginVertical: 4 },
  boldBlue: { fontWeight: "700" },
  card2: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle2: { fontSize: 16, fontWeight: "700", color: "#111", marginBottom: 12 },
  categoryWrap: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  categoryChip: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    margin: 4,
    backgroundColor: "#f9f9f9",
  },
  categoryText: { fontSize: 14, color: "#333" },

  // Rules
  rulesCard: {
    backgroundColor: "#fff7ed",
    borderRadius: 10,
    padding: 15,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: "#fde68a",
  },
  rulesTitle: { fontSize: 16, fontWeight: "700", color: "#b45309", marginBottom: 10 },
  ruleRow: { flexDirection: "row", alignItems: "flex-start", marginBottom: 8 },
  ruleText: { flex: 1, fontSize: 14, color: "#C4410C", marginLeft: 8 },

  // Start button
  startBtn: {
    backgroundColor: "#111827",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  startText: { color: "#fff", fontSize: 16, fontWeight: "700" },

  footer: {
    fontSize: 13,
    color: "#555",
    textAlign: "center",
    marginTop: 8,
    marginBottom: 50
  },
});
