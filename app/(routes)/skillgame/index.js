import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Zap, Brain, Target, Trophy } from "lucide-react-native";
import { router } from 'expo-router';
import { Entypo, MaterialIcons } from '@expo/vector-icons';

const games = [
  {
    id: "tap-rush",
    name: "Tap Rush",
    stake: 100,
    duration: "10s",
    skill: "Hand Speed",
    icon: Zap,
    colors: ["#06b6d4", "#2563eb"], // cyan → blue
    screen: "handspeed",
    winner: "75%"
  },
  {
    id: "math-clash",
    name: "Math Clash",
    stake: 300,
    duration: "30s",
    skill: "Mental Arithmetic",
    icon: Brain,
    colors: ["#a855f7", "#ec4899"], // purple → pink
    screen: "mathclash",
    winner: "75%"
  },
  {
    id: "color-switch",
    name: "Color Switch Reflex",
    stake: 500,
    duration: "20s",
    skill: "Attention + Reaction",
    icon: Target,
    colors: ["#fb923c", "#dc2626"], // orange → red
    screen: "colorswitch",
    winner: "75%"
  },
  {
    id: "defuse-x",
    name: "Defuse-X",
    stake: 1000,
    duration: "40s",
    skill: "Memory + Logic",
    icon: Trophy,
    colors: ["#f59e0b", "#eab308"], // amber → yellow
    screen: "defusex",
    winner: "100%"
  },
];

export default function Skillgame() {
  const [selectedGame, setSelectedGame] = useState(null);
  const [isInGame, setIsInGame] = useState(false);

  const handleGameSelect = (gameId) => {
    setSelectedGame(gameId);
    setIsInGame(true);
  };

  const handleBackToLobby = () => {
    setIsInGame(false);
    setSelectedGame(null);
  };

  if (isInGame) {
    return (
      <View style={styles.centered}>
        <Text style={styles.title}>You’re now in {selectedGame}</Text>
        <TouchableOpacity style={styles.backButton} onPress={handleBackToLobby}>
          <Text style={styles.backText}>Back to Lobby</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Hero Section */}
        <View style={styles.hero}>
          <LinearGradient
            colors={["#14222D", "#22182B", "#21172A"]}
            style={styles.heroGradient}
          >
            <TouchableOpacity onPress={() => router.replace('/(tabs)/home')}>
            <Entypo name="cross" size={64} color="#fff" />            
            </TouchableOpacity>
            <Text style={styles.heroTitle}>WHIPPLE</Text>
            <Text style={styles.heroSubtitle}>SKILL GAMES</Text>
            <Text style={styles.heroDesc}>
              Compete in fast-paced skill challenges. 4 players enter, top 2 get rewarded.
            </Text>
            <View style={styles.heroStats}>
              <View style={styles.heroStat}>
                <Trophy color="#facc15" size={18} />
                <Text style={styles.heroStatText}>Winner: 75%</Text>
              </View>
              <View style={styles.heroStat}>
                <Trophy color="#38bdf8" size={16} />
                <Text style={styles.heroStatText}>Runner-up: 25%</Text>
              </View>
            </View>
          </LinearGradient>
        </View>

        {/* Games Grid */}
        <View style={styles.gamesGrid}>
          {games.map((item) => {
            const Icon = item.icon;
            return (
              <LinearGradient
                key={item.id}
                colors={["#1e293b", "#0f172a"]}
                style={styles.card}
              >
                <View style={styles.iconContainer}>
                  <LinearGradient colors={item.colors} style={styles.iconBg}>
                    <Icon color="#fff" size={28} />
                  </LinearGradient>
                </View>
                <Text style={styles.gameName}>{item.name}</Text>
                <Text style={styles.skill}>{item.skill}</Text>

                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Participation</Text>
                  <Text style={styles.infoValue}>₦{item.stake}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Duration:</Text>
                  <Text style={styles.infoValue}>{item.duration}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Winner Takes:</Text>
                  <Text style={styles.infoValue}>{item.winner}</Text>
                </View>

                <TouchableOpacity
                  onPress={()=> router.push(`/(routes)/skillgame/${item.screen}`)}
                  style={styles.playButton}
                >
                  <Text style={styles.playText}>Play Now</Text>
                </TouchableOpacity>
              </LinearGradient>
            );
          })}
        </View>

        {/* Info Cards */}
        <View style={styles.infoGrid}>
          <View style={styles.infoCard}>
            <Text style={styles.infoBig}>4</Text>
            <Text style={styles.infoSmall}>Players Per Round</Text>
          </View>
          <View style={styles.infoCard}>
            <Text style={[styles.infoBig, { color: "#facc15" }]}>75%</Text>
            <Text style={styles.infoSmall}>Top Performer gets</Text>
          </View>
          <View style={styles.infoCard}>
            <Text style={[styles.infoBig, { color: "#38bdf8" }]}>25%</Text>
            <Text style={styles.infoSmall}>Runner-up Gets</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
  },
  hero: {
    marginBottom: 20,
  },
  heroGradient: {
    paddingVertical: 40,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#334155",
  },
  heroTitle: {
    fontSize: 42,
    fontWeight: "800",
    color: "#fff",
  },
  heroSubtitle: {
    fontSize: 18,
    color: "#cbd5e1",
    marginBottom: 8,
  },
  heroDesc: {
    textAlign: "center",
    color: "#94a3b8",
    marginHorizontal: 20,
    fontSize: 14,
    marginTop: 8,
  },
  heroStats: {
    flexDirection: "row",
    marginTop: 16,
    gap: 16,
  },
  heroStat: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  heroStatText: {
    color: "#cbd5e1",
    fontSize: 13,
  },
  gamesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  card: {
    width: "45%",
    marginVertical: 10,
    borderRadius: 16,
    padding: 16,
  },
  iconContainer: {
    alignItems: "center",
    marginBottom: 10,
  },
  iconBg: {
    width: 60,
    height: 60,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  gameName: {
    fontSize: 12,
    fontWeight: "700",
    color: "#f1f5f9",
    textAlign: "center",
  },
  skill: {
    fontSize: 12,
    color: "#94a3b8",
    textAlign: "center",
    marginBottom: 10,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  infoLabel: {
    color: "#94a3b8",
    fontSize: 12,
  },
  infoValue: {
    color: "#38bdf8",
    fontWeight: "600",
  },
  playButton: {
    marginTop: 10,
    backgroundColor: "#2563eb",
    borderRadius: 10,
    paddingVertical: 10,
  },
  playText: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "600",
  },
  infoGrid: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 30,
  },
  infoCard: {
    backgroundColor: "#1e293b",
    borderRadius: 14,
    padding: 16,
    alignItems: "center",
    width: "30%",
  },
  infoBig: {
    fontSize: 24,
    fontWeight: "800",
    color: "#3b82f6",
  },
  infoSmall: {
    color: "#94a3b8",
    fontSize: 12,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0f172a",
  },
  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: "#2563eb",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  backText: {
    color: "#fff",
    fontWeight: "600",
  },
});
