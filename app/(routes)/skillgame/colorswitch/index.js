import React, { useState, useEffect, useCallback, useRef, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Animated, ScrollView  } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import { ArrowLeft, Trophy, Medal } from "lucide-react-native";
import { router } from 'expo-router';
import axiosClient from "../../../../axiosClient";
import Toast from '../../../../components/Toast';
import {AuthContext} from '../../../../context/AuthContext'
import { useRequest } from "../../../../hooks/useRequest";

const COLORS = [
  { name: 'RED', value: '#EF4444' },
  { name: 'BLUE', value: '#3B82F6' },
  { name: 'GREEN', value: '#10B981' },
  { name: 'YELLOW', value: '#EAB308' },
];

export default function ColorSwitchReflex() {
  const [gameState, setGameState] = useState('waiting');
  const [matchmakingTimer, setMatchmakingTimer] = useState(30);
  const [countdownTimer, setCountdownTimer] = useState(5);
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(2);
  const [challenge, setChallenge] = useState(null);
  const [playersReady, setPlayersReady] = useState(1);
  const [players, setPlayers] = useState([]);

  const [isMounted, setIsMounted] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastType, setToastType] = useState("info");
  const [toastTitle, setToastTitle] = useState("info");
  const [toastMessage, setToastMessage] = useState("info");
  const [winnings, setWinnings] = useState(0);
  const {userBalance: userBalanceGen, setUserBalance: setUserBalanceGen, setUserPoint: setUserPointGen, setUserDetails} = useContext(AuthContext)
  const { loading, makeRequest } = useRequest();
  const [gameId, setGameId] = useState();

  const getMatchingJoining = async () => { 
    try {
      const res = await axiosClient.get("/skillgame/matches/join/color_switch");
      setUserBalanceGen(res?.data.user_balance)
      setUserDetails(prev=>({...prev, wallet_balance:res?.data.user_balance}));
      setGameId(res.data.match.id)
    } catch (error) {  
      // console.error('Error fetching admin parameter:', error);
      setToastVisible(true)
      setToastType("error")
      setToastTitle("Insufficient balance")
      setToastMessage("Your balance is too low for this game.")
      setTimeout(() => {
        router.push(`/(routes)/skillgame`)
      }, 5000);
    } finally { 
      // setLoader("");
    }
  };

  const getMatchingStart = async () => { 
      try {
        const res = await axiosClient.get(`/skillgame/matches/start/${gameId}`);
        setPlayers((prev) => {
        const existingIds = new Set(prev.map((p) => p.id));
        const newPlayers = res.data.players.filter((p) => !existingIds.has(p.id));
        
        return [
          ...prev,
          ...newPlayers.map((player) => ({
            id: player.id,
            name: player.user_id,
            taps: player.score,
          })),
        ];
      });
      setPlayersReady(res.data.playerCount);
  
      // Start countdown
      // if (playersReady >= 4 || newTimer === 0) {
      if (res.data.match.status === "started") {
        getMatchingUpdate()
        startGame();
        setCountdownTimer(5);
      }
        
      } catch (error) {  
       
      } finally { 
        
      }
    };

  const getMatchingPlayer = async () => { 
    try {
      const res = await axiosClient.get(`/skillgame/matches/status/${gameId}`);
      // console.log(res.data.players)
      setPlayers((prev) => {
      const existingIds = new Set(prev.map((p) => p.id));
      const newPlayers = res.data.players.filter((p) => !existingIds.has(p.id));
      
      return [
        ...prev,
        ...newPlayers.map((player) => ({
          id: player.id,
          name: player.user_id,
          score: player.score,
        })),
      ];
    });
    setPlayersReady(res.data.playerCount);

    // Start countdown
    // if (playersReady >= 4 || newTimer === 0) {
    if (res.data.match.status === "started") {
      getMatchingUpdate()
      startGame();
      // setCountdownTimer(5);
    }
      
    } catch (error) {  
     
    } finally { 
      
    }
  };

  const getMatchingUpdate = async (ingame = 'game') => { 
    try {
      const { error, response }  = await makeRequest("/skillgame/matches/updateScore", {   
          matchId: gameId,
          score: score,
          ingame: ingame,
        });
        
        if(response){
          setPlayers(
            response?.leaderboard.map((player) => ({
              id: player.id,
              name: player.name,
              score: player.score,
            }))
          );
        }    
      
    } catch (error) {  } finally {  }
  };

  const getMatchingComplete = async () => { 
    try {
      const { error, response }  = await makeRequest("/skillgame/matches/complete", {   
          matchId: gameId,
          score: score,
          time: countdownTimer
        });    
        setGameState("completed");
      
    } catch (error) {  } finally {  }
  };

  const getMatchingEndUpdate = async () => { 
    try {
      const res = await axiosClient.get(`/skillgame/matches/checkStatus/${gameId}`);
      
      if(res.data.results){
        setWinnings(res?.data.user_winning)
        setUserBalanceGen(res?.data.user_balance)
        setUserDetails(prev=>({...prev, wallet_balance:res?.data.user_balance}));
        setPlayers(
            res.data.results.map((player) => ({
              id: player.rank,
              name: player.name,
              score: player.score,
              win: player.winnings,
            }))
          );
          setIsMounted(false)
          setGameState("finished")
      }
      
    } catch (error) {  
     
    } finally { 
      
    }
  };

  useEffect(() => {
      getMatchingJoining();
    }, []);
  
   useEffect(() => {
    let interval;
    
      if (isMounted) {
        // Run once immediately
        getMatchingEndUpdate();
    
        // Start polling
        interval = setInterval(() => {
          if (isMounted) {
            getMatchingEndUpdate();
          }
        }, 5000);
      }
      // Cleanup when unmounting or when isMounted becomes false
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isMounted]);

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

  const fadeAnim = new Animated.Value(1);

  const generateChallenge = useCallback(() => {
    const wordColor = COLORS[Math.floor(Math.random() * COLORS.length)];
    const textColor = COLORS[Math.floor(Math.random() * COLORS.length)];
    return {
      word: wordColor.name,
      color: textColor.value,
      correctAnswer: textColor.name,
    };
  }, []);

  // Matchmaking phase
  useEffect(() => {
    if (gameState === 'waiting' && matchmakingTimer > 0) {
      const timer = setTimeout(() => {
        const newTime = matchmakingTimer - 1;
        setMatchmakingTimer(newTime);
        if(gameId){          
          getMatchingPlayer()
        }
      }, 1000);
      return () => clearTimeout(timer);
    }else if (matchmakingTimer === 0 && gameState === "waiting") {
      // Force start the game
      setGameState("countdown");
      getMatchingStart();
    }
  }, [gameState, matchmakingTimer, playersReady]);

  // Countdown before start
  useEffect(() => {
    if (gameState === 'countdown' && countdownTimer > 0) {
      const timer = setTimeout(() => {
        setCountdownTimer(countdownTimer - 1)
        if(gameId){          
          getMatchingPlayer()
        }
      }, 1000);
      return () => clearTimeout(timer);
    } else if (gameState === 'countdown' && countdownTimer === 0) {
      getMatchingPlayer()
    }
  }, [gameState, countdownTimer]);

  // Timer for each round
  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1)
        getMatchingUpdate()
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && gameState === 'playing') {
      nextRound(false);
    }
  }, [gameState, timeLeft]);

  const startGame = () => {
    setGameState('playing');
    setRound(0);
    setScore(0);
    setChallenge(generateChallenge());
    setTimeLeft(2);
    Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, { toValue: 0.5, duration: 300, useNativeDriver: true }),
        Animated.timing(fadeAnim, { toValue: 1, duration: 300, useNativeDriver: true }),
      ])
    ).start();
  };

  const handleColorSelect = (colorName) => {
    if (!challenge) return;
    const isCorrect = colorName === challenge.correctAnswer;
    if(isCorrect){
        setScore((prev) => Math.max(0, prev + 5));
      // setPlayers(prev =>
      //   prev.map(p => (p.id === 1 ? { ...p, score: p.score + 5 } : p)),
      // );
    }else{
        setScore((prev) => Math.max(0, prev -2));
        // setPlayers(prev =>
        //     prev.map(p => (p.id === 1 ? { ...p, score: p.score - 2 } : p)),
        // );
    }
    
    nextRound(true);
  };

  const nextRound = (isNext = true) => {
    if (round + 1 >= 20) {
      // setGameState('finished');
      setIsMounted(true)
      getMatchingComplete();
      // const sorted = [...players].sort((a, b) => b.score - a.score);
      // setPlayers(sorted);
    } else {
      setRound(round + 1);
      setChallenge(generateChallenge());
      setTimeLeft(2);
    }
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
        <Text style={styles.taps}>{item.score}</Text>
      </View>
    );

  return (
    <View style={styles.container}>
      {/* Top Header */}

      <View style={styles.header}>
        <TouchableOpacity onPress={()=> router.push("/(routes)/skillgame")} style={styles.backBtn}>
        <ArrowLeft size={20} color="#fff" />
        <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.titleHead}>Color Switch Reflex</Text>
        <View style={{ width: 20 }} />
    </View>

    <View style={{flexDirection: "row", alignItems: "center", justifyContent: "center", marginTop: 1 }}>        
        <Text style={styles.subText}>₦500 Stake</Text>
    </View>

      {/* Waiting State */}
      {gameState === 'waiting' && (
        <ScrollView>
            <View style={styles.centerBox}>
                <Animated.View style={[styles.card, animatedStyle]}>
                <Text style={styles.timerText}>{matchmakingTimer}s</Text>
                <Text style={styles.subText}>Finding players...</Text>
                </Animated.View>
                <View style={{ marginTop: 5, flexDirection: "column", justifyContent: "flex-start"}}>
                    <Text style={styles.smallText}> • 20 rounds - 3 seconds per prompt</Text>
                    <Text style={styles.smallText}> • Tap the COLOR of the text, not the word!</Text>
                    <Text style={styles.smallText}> • Correct = +5 points, Wrong/Timeout = -2 points</Text>
                </View>

                <View style={[styles.card, { marginTop: 10, flexDirection: "column", justifyContent: "flex-start"}]}>
                    <Text style={styles.smallText}> Example:</Text>
                    <Text style={{color: "#3B82F6", fontSize: 40}}> RED</Text>
                    <Text style={styles.smallText}> The word says "RED" but the color is BLUE → Tap BLUE!</Text>
                </View>

                <View style={{ marginTop: 10 }}>
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
        </ScrollView>
      )}

      {/* Countdown */}
      {gameState === 'countdown' && (
        <View style={styles.centerBox}>
            <Animated.View style={[styles.card, animatedStyle]}>
            <Text style={styles.bigText}>{countdownTimer}s</Text>
            <Text style={styles.subText}>Get Ready...</Text>
            </Animated.View>
        </View>
      )}

      {/* Game Play */}
      {gameState === 'playing' && challenge && (
        <View style={styles.center}>
          <View style={styles.topBar}>
            <Text style={styles.label}>Round {round + 1}/20</Text>
            <Text style={[styles.label, { color: '#F87171' }]}>{timeLeft}s</Text>
            <Text style={styles.label}>Score: {score}</Text>
          </View>
          <Animated.Text
            style={[styles.challengeWord, { color: challenge.color, opacity: fadeAnim }]}
          >
            {challenge.word}
          </Animated.Text>
          <View style={styles.colorGrid}>
            {COLORS.map((c) => (
              <TouchableOpacity
                key={c.name}
                onPress={() => handleColorSelect(c.name)}
                style={[styles.colorBtn, { backgroundColor: c.value, borderColor: c.value }]}
              >
                <Text style={styles.colorText}>{c.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={{width: '100%', }}>
            <Text style={styles.subText}>Live Leaderboard</Text>
            <FlatList
                data={[...players].sort((a, b) => b.score - a.score)}
                renderItem={renderLeaderboardItem}
                keyExtractor={(item) => item.id.toString()}
            />
          </View>
        </View>
      )}

      {/* completed */}
      {gameState === "completed" && (
        <View style={styles.centerBox}>
          <Animated.View style={[styles.card, animatedStyle]}>
            <Text style={[styles.bigText, {color: "#fff"}]}>Completed</Text>
          <Text style={[styles.subText, {color: "#fff"}]}>Waiting for result!</Text>
          </Animated.View>
        </View>
      )}

      {/* Finished */}
      {gameState === 'finished' && (
        <View style={{ flex: 1 }}>
            <Text style={styles.title}>🏆 Game Over</Text>
            <Text style={styles.infoText}>Final Score: {score}</Text>
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
                        {item.name} — {item.score} scores
                        </Text>
                    </View>
                    </View>
                )}
                keyExtractor={(item) => item.id.toString()}
            />
            <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-around", marginVertical: 20}}>
                <TouchableOpacity
                    style={[styles.playBtn, {backgroundColor: "#FFD04C"}]}
                    onPress={()=> router.push("/(routes)/skillgame")}
                >
                    <Text style={{ color: '#fff', fontWeight: 'bold' }}>Back to Lobby</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.playBtn}
                    onPress={() => {
                      setGameState('waiting')
                      setMatchmakingTimer(10);
                      setPlayersReady(1);
                      setPlayers([]);
                      router.push(`/(routes)/skillgame/colorswitch`)
                    }}
                >
                    <Text style={{ color: '#fff', fontWeight: 'bold' }}>Play Again</Text>
                </TouchableOpacity>
            </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0A0A0A', padding: 20 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },  
  subText: { fontSize: 16, color: "#666", marginVertical: 10 },
  backBtn: { flexDirection: "row", alignItems: "center" },
  backText: { marginLeft: 6, fontSize: 16, color: "#fff" },
  titleHead: { fontSize: 20, fontWeight: "bold", color: "#00B3D2" },
  title: { fontSize: 18, fontWeight: 'bold', color: '#00B3D2' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  bigText: { fontSize: 70, fontWeight: 'bold', color: '#fff' },
  infoText: { color: '#bbb', marginTop: 10, fontSize: 16 },
  playerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#111',
    padding: 10,
    borderRadius: 15,
    margin: 5,
    flex: 1,
  },
  playerAvatar: {
    backgroundColor: '#1A4051',
    color: '#00B3D2',
    borderRadius: 50,
    width: 35,
    height: 35,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontWeight: 'bold',
    marginRight: 10,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  label: { color: '#bbb', fontSize: 16, fontWeight: 'bold' },
  challengeWord: {
    fontSize: 80,
    fontWeight: 'bold',
    marginVertical: 30,
    textAlign: 'center',
  },
  colorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
  },
  colorBtn: {
    width: '48%',
    height: 100,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    marginBottom: 15,
  },
  colorText: { color: '#fff', fontWeight: 'bold', fontSize: 22 },
  playBtn: {
    backgroundColor: "#4c6ef5",
    padding: 14,
    borderRadius: 10,
  },  
  centerBox: { justifyContent: "center", alignItems: "center", backgroundColor: '#121216', shadowOpacity: 0.9, borderRadius: 5 },
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
  timerText: { fontSize: 80, color: "#4c6ef5", fontWeight: "bold" },
  smallText: { fontSize: 14, color: "#888" },  
  playerText: { textAlign: "center", fontSize: 16, color: "#fff" },
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
});
