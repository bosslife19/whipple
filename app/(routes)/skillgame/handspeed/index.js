import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Animated
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { ArrowLeft, Trophy, Medal } from "lucide-react-native";
import { router } from 'expo-router';

export default function TapRush() {
  const [gameState, setGameState] = useState("waiting");
  const [matchmakingTimer, setMatchmakingTimer] = useState(30);
  const [countdownTimer, setCountdownTimer] = useState(5);
  const [timeLeft, setTimeLeft] = useState(30);
  const [tapCount, setTapCount] = useState(0);
  const [playersReady, setPlayersReady] = useState(1);
  const [players, setPlayers] = useState([{ id: 1, name: "You", taps: 0 }]);

  const glowAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 1,
          duration: 1200,
          useNativeDriver: false,
        }),
        Animated.timing(glowAnim, {
          toValue: 0,
          duration: 1200,
          useNativeDriver: false,
        }),
      ])
    ).start();
  }, [glowAnim]);

  // Interpolate shadow color and intensity
  const shadowColor = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['rgba(0, 180, 255, 0.3)', 'rgba(0, 255, 255, 1)'], // strong blue glow
  });

  const shadowRadius = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [10, 35], // increases shadow spread
  });

  const animatedStyle = {
    shadowColor,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius,
    elevation: glowAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [6, 24],
    }),
  };

  // Matchmaking timer
  useEffect(() => {
    if (gameState === "waiting" && matchmakingTimer > 0) {
      const timer = setTimeout(() => {
        const newTimer = matchmakingTimer - 1;
        setMatchmakingTimer(newTimer);

        // Simulate other players joining
        if (playersReady < 4 && Math.random() > 0.7) {
          const newId = playersReady + 1;
          setPlayersReady(newId);
          setPlayers((prev) => [
            ...prev,
            { id: newId, name: `Player ${newId}`, taps: 0 },
          ]);
        }

        // Start countdown
        if (playersReady >= 4 || newTimer === 0) {
          setGameState("countdown");
          setCountdownTimer(5);
        }
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [gameState, matchmakingTimer, playersReady]);

  // Countdown timer
  useEffect(() => {
    if (gameState === "countdown" && countdownTimer > 0) {
      const timer = setTimeout(() => setCountdownTimer(countdownTimer - 1), 1000);
      return () => clearTimeout(timer);
    } else if (gameState === "countdown" && countdownTimer === 0) {
      startGame();
    }
  }, [gameState, countdownTimer]);

  // Simulate other players tapping
  useEffect(() => {
    if (gameState === "playing") {
      const interval = setInterval(() => {
        setPlayers((prev) =>
          prev.map((p) =>
            p.id === 1
              ? p
              : { ...p, taps: p.taps + Math.floor(Math.random() * 3) + 1 }
          )
        );
      }, 200);
      return () => clearInterval(interval);
    }
  }, [gameState]);

  // Game timer
  useEffect(() => {
    if (gameState === "playing" && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && gameState === "playing") {
      endGame();
    }
  }, [gameState, timeLeft]);

  const startGame = () => {
    setGameState("playing");
    setTapCount(0);
    setTimeLeft(30);
    setPlayers((prev) => prev.map((p) => ({ ...p, taps: 0 })));
  };

  const resetMatchmaking = () => {
    setGameState("waiting");
    setMatchmakingTimer(30);
    setPlayersReady(1);
    setPlayers([{ id: 1, name: "You", taps: 0 }]);
  };

  const handleTap = useCallback(() => {
    if (gameState === "playing") {
      setTapCount((prev) => prev + 1);
      setPlayers((prev) =>
        prev.map((p) =>
          p.id === 1 ? { ...p, taps: p.taps + 1 } : p
        )
      );
    }
  }, [gameState]);

  const endGame = () => {
    setGameState("finished");
    const sorted = [...players].sort((a, b) => b.taps - a.taps);
    setPlayers(sorted);
  };

  const renderLeaderboardItem = ({ item, index }) => (
    <View
      style={[
        styles.leaderItem,
        item.id === 1 ? styles.highlight : styles.normalItem,
      ]}
    >
      <Text style={styles.rank}>#{index + 1}</Text>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.taps}>{item.taps}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={()=> router.push("/(routes)/skillgame")} style={styles.backBtn}>
          <ArrowLeft size={20} color="#fff" />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Tap Rush</Text>
        <View style={{ width: 60 }} />
      </View>

      <View style={{flexDirection: "row", alignItems: "center", justifyContent: "center", marginTop: 1 }}>        
          <Text style={styles.subText}>₦100 Stake</Text>
      </View>

      {/* Waiting */}
      {gameState === "waiting" && (
        <View style={styles.centerBox}>
          <Animated.View style={[styles.card, animatedStyle]}>
            <Text style={styles.timerText}>{matchmakingTimer}s</Text>
          <Text style={styles.subText}>Finding players...</Text>
          </Animated.View>
          <View  style={{ marginTop: 10, flexDirection: "column", justifyContent: "flex-start"}}>
            <Text style={styles.smallText}> • Tap as fast as possible for 30 seconds!</Text>
            <Text style={styles.smallText}> • Highest tap count wins</Text>
            <Text style={styles.smallText}> • In case of tie, fastest last tap wins</Text>
          </View>

          <View style={{ marginTop: 20 }}>
            <Text style={[styles.smallText, {textAlign: "center"}]}>Players Ready: {playersReady}/4</Text>
              <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 5, width: '100%', flexWrap: 'wrap' }}>
              {players.map((p, ind) => (
                <View key={p.id} style={{flexDirection: "row", alignItems: "center", justifyContent: "flex-start", marginTop: 5, borderWidth: 1, backgroundColor: '#111', borderRadius: 20, padding: 10, width: '48%' }}>
                  <Text style={{ 
                    backgroundColor: '#1A4051',
                    color: '#00B3D2',
                    padding: 10,
                    marginRight: 5,
                    borderRadius: 50, // use number instead of "50%"
                    width: 40,
                    height: 40,
                    textAlign: 'center',
                    textAlignVertical: 'center', // centers text vertically on Android
                    fontWeight: 'bold'
                  }}>{ind+1}</Text>
                  <Text style={styles.playerText}>{p.name}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      )}

      {/* Countdown */}
      {gameState === "countdown" && (
        <View style={styles.centerBox}>
          <Animated.View style={[styles.card, animatedStyle]}>
            <Text style={styles.bigText}>{countdownTimer}s</Text>
          <Text style={styles.subText}>Get Ready!</Text>
          </Animated.View>
        </View>
      )}

      {/* Playing */}
      {gameState === "playing" && (
        <View style={{ flex: 1 }}>
          <Text style={styles.timeLeft}>{timeLeft}s</Text>
          <View style={styles.tapBox}>
            <Text style={styles.tapCount}>{tapCount}</Text>
            <TouchableOpacity onPress={handleTap}>
              <LinearGradient
                colors={["#4c6ef5", "#15aabf"]}
                style={styles.tapButton}
              >
                <Text style={styles.tapText}>TAP!</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
          <Text style={styles.subText}>Live Leaderboard</Text>
          <FlatList
            data={[...players].sort((a, b) => b.taps - a.taps)}
            renderItem={renderLeaderboardItem}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
      )}

      {/* Finished */}
      {gameState === "finished" && (
        <View style={{ flex: 1 }}>
          <Text style={styles.bigText}>Game Over!</Text>
          <FlatList
            data={players}
            renderItem={({ item, index }) => (
              <View
                style={[
                  styles.resultItem,
                  index === 0
                    ? styles.gold
                    : index === 1
                    ? styles.silver
                    : styles.normalItem,
                ]}
              >
                <View style={styles.resultRow}>
                  {index === 0 ? (
                    <Trophy color="#ffd43b" size={20} />
                  ) : index === 1 ? (
                    <Medal color="#adb5bd" size={20} />
                  ) : null}
                  <Text style={styles.resultText}>
                    {item.name} — {item.taps} taps
                  </Text>
                </View>
              </View>
            )}
            keyExtractor={(item) => item.id.toString()}
          />

          <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-around", marginTop: 20, marginBottom: 20}}>
            <TouchableOpacity
              style={[styles.playAgain, {backgroundColor: "#FFD04C"}]}
              onPress={()=> router.push("/(routes)/skillgame")}
            >
              <Text style={styles.playAgainText}>Back to Lobby</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.playAgain}
              onPress={resetMatchmaking}
            >
              <Text style={styles.playAgainText}>Play Again</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#121216", padding: 16 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20
  },
  backBtn: { flexDirection: "row", alignItems: "center" },
  backText: { marginLeft: 6, fontSize: 16, color: "#fff" },
  title: { fontSize: 20, fontWeight: "bold", color: "#00BFFF" },
  centerBox: { justifyContent: "center", alignItems: "center", backgroundColor: '#121216', shadowOpacity: 0.9, borderRadius: 5 },
  timerText: { fontSize: 80, color: "#4c6ef5", fontWeight: "bold" },
  bigText: { fontSize: 52, color: "#15aabf", fontWeight: "bold" },
  subText: { fontSize: 16, color: "#666", marginVertical: 10 },
  smallText: { fontSize: 14, color: "#888" },
  playerText: { textAlign: "center", fontSize: 16, color: "#fff" },
  timeLeft: { textAlign: "center", fontSize: 48, color: "#4c6ef5", marginTop: 10 },
  tapBox: { justifyContent: "center", alignItems: "center", marginVertical: 20 },
  tapCount: { fontSize: 80, color: "#15aabf", fontWeight: "bold" },
  tapButton: {
    width: 200,
    height: 200,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  tapText: { fontSize: 32, fontWeight: "bold", color: "#fff" },
  leaderItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 12,
    marginVertical: 4,
    borderRadius: 8,
  },
  highlight: { backgroundColor: "#e7f5ff" },
  normalItem: { backgroundColor: "#f1f3f5" },
  rank: { fontWeight: "bold", color: "#495057" },
  name: { color: "#212529", fontWeight: "500" },
  taps: { fontWeight: "bold", color: "#15aabf" },
  resultItem: {
    padding: 14,
    borderRadius: 10,
     marginVertical: 15,
    alignItems: "center",
    marginHorizontal: 20
  },
  gold: { backgroundColor: "#fff3bf" },
  silver: { backgroundColor: "#dee2e6" },
  resultRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  resultText: { fontSize: 16, fontWeight: "600" },
  playAgain: {
    backgroundColor: "#4c6ef5",
    padding: 14,
    borderRadius: 10,
  },
  playAgainText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  card: {
    backgroundColor: '#111',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 40,
    borderWidth: 2,
    // borderColor: '#00eaff',
    width: '100%'
  },
});
