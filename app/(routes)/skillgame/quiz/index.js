import React, { useState, useEffect, useCallback, useRef, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Animated,
  ActivityIndicator,
  Alert
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { ArrowLeft, Trophy, Medal } from "lucide-react-native";
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons, Entypo, MaterialIcons } from "@expo/vector-icons";
import axiosClient from "../../../../axiosClient";
import Toast from '../../../../components/Toast';
import { AuthContext } from '../../../../context/AuthContext'
import { useRequest } from "../../../../hooks/useRequest";
import { useIsFocused } from "@react-navigation/native";
import QuizSection from "../../../../components/quiz/Questions";
import { formatCurrency } from '../../../../utlils';

export default function QuizScreen() {
  const { game_type = 'direct', tournament_id } = useLocalSearchParams();
  const BG = '#0A1931';
  const { userBalance: userBalanceGen, setUserBalance: setUserBalanceGen, setUserPoint: setUserPointGen, setUserDetails, userDetails } = useContext(AuthContext)
  const { loading, makeRequest } = useRequest();

  const [gameId, setGameId] = useState();
  const [matchPlayerCount, setMatchPlayerCount] = useState(2);
  const [gameState, setGameState] = useState("waiting");
  const [matchmakingTimer, setMatchmakingTimer] = useState(30);
  const [countdownTimer, setCountdownTimer] = useState(5);
  const [winnings, setWinnings] = useState(0);
  const [playersReady, setPlayersReady] = useState();
  const [players, setPlayers] = useState([]);
  const [isMounted, setIsMounted] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastType, setToastType] = useState("info");
  const [toastTitle, setToastTitle] = useState("info");
  const [toastMessage, setToastMessage] = useState("info");
  const isFocused = useIsFocused();

  // Quiz Specific States
  const [session, setSession] = useState('');
  const [questions, setQuestions] = useState([]);
  const [points, setPoints] = useState(0);
  const [admpar, setAdmpar] = useState('');
  const [userBalance, setUserBalance] = useState(userBalanceGen);

  const glowAnim = useRef(new Animated.Value(0)).current;
  const timeoutsRef = useRef([]);
  const intervalsRef = useRef([]);

  const safeSetTimeout = (callback, delay) => {
    const id = setTimeout(callback, delay);
    timeoutsRef.current.push(id);
    return id;
  };

  const safeSetInterval = (callback, delay) => {
    const id = setInterval(callback, delay);
    intervalsRef.current.push(id);
    return id;
  };

  const clearAllTimers = () => {
    timeoutsRef.current.forEach(clearTimeout);
    intervalsRef.current.forEach(clearInterval);
    timeoutsRef.current = [];
    intervalsRef.current = [];
  };

  useEffect(() => {
    if (!isFocused) {
      clearAllTimers();
      setIsMounted(false);
      return;
    }
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
  }, [glowAnim, isFocused]);

  const shadowColor = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['rgba(0, 180, 255, 0.3)', 'rgba(0, 255, 255, 1)'],
  });

  const shadowRadius = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [10, 35],
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

  // --- Quiz Logic ---

  const fetchAdminParameter = async () => {
    try {
      const res = await axiosClient.get("/admin/parameter");
      setAdmpar(res.data.data ?? "");
    } catch (error) {
      console.error('Error fetching admin parameter:', error);
    }
  };

  const fetchQuestion = async () => {
    try {
      const res = await axiosClient.get("/quiz/start/tournament");
      setQuestions(res.data.data?.questions ?? []);
      setSession(res.data.data?.session_id ?? '')
    } catch (error) {
      console.error('Error fetching quiz:', error);
      handleNetworkError("Daily Limit", "You’ve reached daily limit. Try again tomorrow!")
    }
  };

  const handlePoints = async (question, selectedAnswer) => {
    try {
      const { error, response } = await makeRequest("/quiz/answer", {
        session_id: session,
        question_id: question,
        selected: selectedAnswer
      });
      if (error) {
        handleNetworkError("Error", "An error occur submitting answer. Please try again!");
        return;
      }
      const newScore = response?.data?.current_score;
      setPoints(newScore);
      // Update match score for global leaderboard
      getMatchingUpdate("ingame", newScore);
    } catch (err) {
      handleNetworkError("Error", "An error occur. Please try again!");
    }
  };

  const handleQuizEnd = async () => {
    try {
      const { error, response } = await makeRequest("/quiz/complete", {
        session_id: session,
      });
      if (error) {
        handleNetworkError("Error", "An error occur completing quiz. Please try again!");
        return;
      }
      // Trigger match completion
      endGame();
    } catch (err) {
      handleNetworkError("Error", "An error occur. Please try again!");
    }
  };

  const handleBoost = async () => {
    try {
      const { error, response } = await makeRequest("/quiz/boost", {
        session_id: session,
      });
      if (error) return;
      setUserBalanceGen(response?.data)
      setUserDetails(prev => ({ ...prev, wallet_balance: response?.data }));
    } catch (err) {
      console.error("Error boosting:", err);
    }
  };

  const handleCloseSession = async () => {
    // try {
    //   await makeRequest("/quiz/close", { session_id: session });
    // } catch (err) {
    //   console.error("Error closing session:", err);
    // }
    resetMatchmaking(false);
  };

  // --- Matchmaking Logic (based on handspeed) ---

  const getMatchingJoining = async () => {
    try {
      const res = await axiosClient.get(`/skillgame/matches/join/quiz/${game_type}`);
      setUserBalanceGen(res?.data.user_balance)
      setUserDetails(prev => ({ ...prev, wallet_balance: res?.data.user_balance }));
      setGameId(res.data.match.id)
      setMatchPlayerCount(res.data.match.max_players)
      setMatchmakingTimer(res.data.countdown)
      if (res.data.countdown == 0) {
        setGameState("countdown");
        setCountdownTimer(1);
      }
    } catch (error) {
      handleNetworkError("Insufficient balance", "Your balance is too low for this game.")
    }
  };

  const handleNetworkError = (hdg = "Network error", mss = "Please try again!") => {
    setToastVisible(true)
    setToastType("error")
    setToastTitle(hdg)
    setToastMessage(mss)
    safeSetTimeout(() => {
      resetMatchmaking(false)
    }, 3000)
  }

  const getMatchingStart = async () => {
    try {
      const res = await axiosClient.get(`/skillgame/matches/start/${gameId}`);
      if (res.data.status == "error") {
        handleNetworkError('Match start error', res.data.message)
        return;
      }
      setPlayers((prev) => {
        const existingIds = new Set(prev.map((p) => p.id));
        const newPlayers = res?.data?.players?.filter((p) => !existingIds.has(p.id));
        return [
          ...prev,
          ...newPlayers?.map((player) => ({
            id: player.id,
            name: player.user_id,
            score: player.score,
          })),
        ];
      });
      setPlayersReady(res.data.playerCount);
    } catch (error) {
      console.error(error);
    }
  };

  const getMatchingPlayer = async () => {
    try {
      const res = await axiosClient.get(`/skillgame/matches/status/${gameId}`);
      if (res?.data?.match?.status == "cancelled") {
        handleNetworkError("No active players", "No users available for this game. Please try again later.")
        return;
      }
      setPlayers((prev) => {
        const existingIds = new Set(prev.map((p) => p.id));
        const newPlayers = res?.data?.players?.filter((p) => !existingIds.has(p.id));
        return [
          ...prev,
          ...newPlayers?.map((player) => ({
            id: player.id,
            name: player.user_id,
            score: player.score,
          })),
        ];
      });
      setPlayersReady(res.data.playerCount);

      if (res.data.match.status === "started") {
        getMatchingUpdate("game", points);
        startGame();
        setIsMounted(false)
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getMatchingUpdate = async (ingame = 'game', currentScore = points) => {
    try {
      const { error, response } = await makeRequest("/skillgame/matches/updateScore", {
        matchId: gameId,
        score: Number(currentScore || 0),
        ingame: ingame,
      });

      if (response) {
        setPlayers(
          response?.leaderboard.map((player) => ({
            id: player.id,
            name: player.name,
            score: player.score,
          }))
        );
      }
    } catch (error) { console.error(error) }
  };

  const getMatchingComplete = async () => {
    try {
      await makeRequest("/skillgame/matches/complete", {
        matchId: gameId,
        score: points,
        time: 0
      });
      getMatchingEndUpdate();
    } catch (error) { console.error(error) }
  };

  const getMatchingEndUpdate = async () => {
    try {
      const res = await axiosClient.get(`/skillgame/matches/checkStatus/${gameId}`);
      if (res.data.status === "finished") {
        setWinnings(res?.data.user_winning)
        setUserBalanceGen(res?.data.user_balance)
        setUserDetails(prev => ({ ...prev, wallet_balance: res?.data.user_balance }));
        setPlayers(
          res.data.results.map((player) => ({
            id: player.rank,
            name: player.name,
            score: player.score,
            win: player.winnings,
          }))
        );
        setIsMounted(false)
        setGameState("finished");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!isFocused) return;
    fetchAdminParameter();
    fetchQuestion();
    getMatchingJoining();
  }, [isFocused]);

  useEffect(() => {
    if (!isFocused) return;
    let interval;
    if (isMounted) {
      if (gameState === "countdown" && countdownTimer === 0) {
        getMatchingPlayer()
      } else {
        getMatchingEndUpdate();
      }
      interval = safeSetInterval(() => {
        if (isMounted) {
          if (gameState === "countdown" && countdownTimer === 0) {
            getMatchingPlayer()
          } else {
            getMatchingEndUpdate();
          }
        }
      }, 2000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isMounted, isFocused, gameState, countdownTimer]);

  useEffect(() => {
    if (!isFocused) return;
    if (gameState === "waiting" && matchmakingTimer > 0) {
      const timer = safeSetTimeout(() => {
        const newTimer = matchmakingTimer - 1;
        setMatchmakingTimer(newTimer);
        if (gameId) {
          getMatchingPlayer()
        }
      }, 1000);
      return () => clearTimeout(timer);
    } else if (matchmakingTimer === 0 && gameState === "waiting") {
      setGameState("countdown");
    }
  }, [gameState, matchmakingTimer, playersReady, isFocused]);

  useEffect(() => {
    if (!isFocused) return;
    if (gameState === "countdown" && countdownTimer > 0) {
      const timer = safeSetTimeout(() => {
        setCountdownTimer(countdownTimer - 1)
        if (gameId) {
          getMatchingPlayer()
        }
      }, 1000);
      return () => clearTimeout(timer);
    } else if (gameState === "countdown" && countdownTimer === 0) {
      getMatchingPlayer()
      getMatchingStart();
      setIsMounted(true)
    }
  }, [gameState, countdownTimer, isFocused]);

  // Live ranking polling during the game
  useEffect(() => {
    if (!isFocused || gameState !== "playing") return;

    const interval = safeSetInterval(() => {
      getMatchingUpdate("ingame");
    }, 2000);

    return () => clearInterval(interval);
  }, [gameState, isFocused, points]);

  const startGame = () => {
    setGameState("playing");
    setPoints(0);
  };

  const endGame = () => {
    setGameState("completed");
    setIsMounted(true);
    getMatchingComplete();
  };

  const resetMatchmaking = (bckclc) => {
    setGameState("waiting");
    setPlayersReady(0);
    setPlayers([]);
    clearAllTimers();
    setIsMounted(false);
    if (bckclc) {
      setMatchmakingTimer(30);
      router.push(`/(routes)/skillgame/quiz`)
    } else {
      setMatchmakingTimer(0);
      game_type === 'tournament' ? router.push(`/(routes)/leaderboard/tournament_detail?id=${tournament_id}`) : router.push("/(routes)/skillquiz")
    }
  };

  const renderLeaderboardItem = ({ item, index }) => (
    <View
      style={[
        styles.leaderItem,
        item.name === "You" ? styles.highlight : styles.normalItem,
      ]}
    >
      <Text style={styles.rank}>#{index + 1}</Text>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.taps}>{item.score}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => handleCloseSession()} style={styles.backBtn}>
          <ArrowLeft size={20} color="#fff" />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Skill Quiz</Text>
        <View style={{ width: 60 }} />
      </View>

      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", marginTop: 1 }}>
        <Text style={styles.subText}>₦100 Stake</Text>
      </View>

      {/* Waiting */}
      {gameState === "waiting" && (
        <View style={styles.centerBox}>
          <Animated.View style={[styles.card, animatedStyle]}>
            <Text style={styles.timerText}>{matchmakingTimer}s</Text>
            <Text style={styles.subText}>Finding players...</Text>
          </Animated.View>
          <View style={{ marginTop: 10, flexDirection: "column", justifyContent: "flex-start" }}>
            <Text style={styles.smallText}> • Answer questions correctly as fast as you can!</Text>
            <Text style={styles.smallText}> • Highest points wins the match</Text>
          </View>

          <View style={{ marginTop: 20 }}>
            <Text style={[styles.smallText, { textAlign: "center" }]}>Players Ready: {playersReady}/{matchPlayerCount}</Text>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 5, width: '100%', flexWrap: 'wrap' }}>
              {players.map((p, ind) => (
                <View key={p.id} style={{ flexDirection: "row", alignItems: "center", justifyContent: "flex-start", marginTop: 5, borderWidth: 1, backgroundColor: '#111', borderRadius: 20, padding: 10, width: '48%' }}>
                  <Text style={styles.playerAvatarInd}>{ind + 1}</Text>
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
            <Text style={styles.bigText}>{countdownTimer ? `${countdownTimer}s` : 'Waiting'}</Text>
            <Text style={styles.subText}>Get Ready!</Text>
          </Animated.View>
        </View>
      )}

      {/* Playing */}
      {gameState === "playing" && (
        <View style={{ flex: 1 }}>
          <View style={styles.quizHeader}>
            <Text style={styles.level}>
              <Ionicons name="school-outline" size={16} color="#4c6ef5" /> {admpar?.level || 'Beginner'}
            </Text>
            <Text style={{ fontWeight: '700', color: '#15aabf' }}>NGN {formatCurrency(userBalance)}</Text>
            <View style={styles.pointsBox}>
              <Ionicons name="trophy-outline" size={16} color="#ffd43b" />
              <Text style={styles.points}> {points} pts</Text>
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

          <View style={{ maxHeight: 150, marginTop: 10 }}>
            <Text style={[styles.subText, { fontSize: 12, marginBottom: 5 }]}>Match Rankings</Text>
            <FlatList
              data={[...players].sort((a, b) => b.score - a.score)}
              renderItem={renderLeaderboardItem}
              keyExtractor={(item) => item.id.toString()}
            />
          </View>
        </View>
      )}

      {/* Completed */}
      {gameState === 'completed' && (
        <View style={styles.centerBox}>
          <Animated.View style={[styles.card, animatedStyle]}>
            <Text style={styles.bigText}>Completed</Text>
            <Text style={styles.subText}>Waiting for match result!</Text>
          </Animated.View>
        </View>
      )}

      {/* Finished */}
      {gameState === "finished" && (
        <View style={{ flex: 1 }}>
          <Text style={styles.bigResultTitle}>Quiz Results</Text>
          <FlatList
            data={players}
            renderItem={({ item, index }) => (
              <View
                style={[
                  styles.resultItem,
                  index === 0 ? styles.gold : index === 1 ? styles.silver : styles.normalItem,
                ]}
              >
                <View style={styles.resultRow}>
                  {index === 0 ? (
                    <Trophy color="#ffd43b" size={20} />
                  ) : index === 1 ? (
                    <Medal color="#adb5bd" size={20} />
                  ) : null}
                  <Text style={styles.resultText}>
                    {item.name} — {item.score} pts
                  </Text>
                </View>
                {item.win > 0 && <Text style={styles.winText}>Won ₦{item.win}</Text>}
              </View>
            )}
            keyExtractor={(item) => item.id.toString()}
          />

          <View style={styles.finishActions}>
            {game_type === 'tournament' ? (
              <TouchableOpacity
                style={[styles.playAgain, { backgroundColor: BG, flex: 1 }]}
                onPress={() => router.push(`/(routes)/leaderboard/tournament_detail?id=${tournament_id}`)}
              >
                <Text style={styles.playAgainText}>Tournament Board</Text>
              </TouchableOpacity>
            ) : (
              <>
                <TouchableOpacity
                  style={[styles.playAgain, { backgroundColor: "#FFD04C", flex: 1, marginRight: 10 }]}
                  onPress={() => resetMatchmaking(false)}
                >
                  <Text style={styles.playAgainText}>Lobby</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.playAgain, { flex: 1 }]}
                  onPress={() => resetMatchmaking(true)}
                >
                  <Text style={styles.playAgainText}>Play Again</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      )}

      <Toast
        visible={toastVisible}
        type={toastType}
        title={toastTitle}
        message={toastMessage}
        position="bottom"
        duration={3000}
        onHide={() => setToastVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#121216", padding: 16 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
    marginBottom: 10
  },
  backBtn: { flexDirection: "row", alignItems: "center" },
  backText: { marginLeft: 6, fontSize: 16, color: "#fff" },
  title: { fontSize: 20, fontWeight: "bold", color: "#00BFFF" },
  centerBox: { justifyContent: "center", alignItems: "center", backgroundColor: '#121216', paddingVertical: 20 },
  timerText: { fontSize: 80, color: "#4c6ef5", fontWeight: "bold" },
  bigText: { fontSize: 52, color: "#15aabf", fontWeight: "bold" },
  subText: { fontSize: 16, color: "#888", marginVertical: 5 },
  smallText: { fontSize: 14, color: "#666" },
  playerText: { fontSize: 14, color: "#fff", flex: 1 },
  playerAvatarInd: {
    backgroundColor: '#1A4051',
    color: '#00B3D2',
    padding: 8,
    marginRight: 8,
    borderRadius: 20,
    width: 32,
    height: 32,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontWeight: 'bold',
    fontSize: 12
  },
  card: {
    backgroundColor: '#111',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
    borderWidth: 2,
    width: '100%',
    borderColor: 'rgba(0, 180, 255, 0.1)'
  },
  quizHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    paddingHorizontal: 5
  },
  level: { fontSize: 14, color: "#fff", fontWeight: '600' },
  pointsBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1A1A20",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
  },
  points: { fontSize: 14, fontWeight: "bold", color: "#fff" },
  leaderItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    marginVertical: 2,
    borderRadius: 8,
    backgroundColor: "#1A1A20"
  },
  highlight: { backgroundColor: "rgba(76, 110, 245, 0.2)", borderWidth: 1, borderColor: "#4c6ef5" },
  normalItem: { backgroundColor: "#1A1A20" },
  rank: { fontWeight: "bold", color: "#888", width: 30 },
  name: { color: "#fff", fontWeight: "500", flex: 1 },
  taps: { fontWeight: "bold", color: "#15aabf" },
  bigResultTitle: { fontSize: 32, color: "#15aabf", fontWeight: "bold", textAlign: 'center', marginVertical: 20 },
  resultItem: {
    padding: 16,
    borderRadius: 12,
    marginVertical: 8,
    alignItems: "center",
    marginHorizontal: 10,
    backgroundColor: '#1A1A20'
  },
  gold: { backgroundColor: "rgba(255, 212, 59, 0.15)", borderWidth: 1, borderColor: "#ffd43b" },
  silver: { backgroundColor: "rgba(173, 181, 189, 0.15)", borderWidth: 1, borderColor: "#adb5bd" },
  resultRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  resultText: { fontSize: 18, fontWeight: "bold", color: '#fff' },
  winText: { color: '#40c057', fontWeight: 'bold', marginTop: 5 },
  finishActions: { flexDirection: "row", marginTop: 20, paddingHorizontal: 10 },
  playAgain: {
    backgroundColor: "#4c6ef5",
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center'
  },
  playAgainText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

