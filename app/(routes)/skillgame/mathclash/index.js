import React, { useState, useEffect, useCallback, useRef, useContext } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  FlatList,
} from 'react-native';
import { ArrowLeft, Trophy, Medal } from "lucide-react-native";
import { router } from 'expo-router';
import axiosClient from "../../../../axiosClient";
import Toast from '../../../../components/Toast';
import {AuthContext} from '../../../../context/AuthContext'
import { useRequest } from "../../../../hooks/useRequest";

export default function MathClash() {
  const [gameState, setGameState] = useState('waiting');
  const [matchmakingTimer, setMatchmakingTimer] = useState(30);
  const [countdownTimer, setCountdownTimer] = useState(5);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [avgTime, setAvgTime] = useState(0);
  const [timeLeft, setTimeLeft] = useState(3);
  const [question, setQuestion] = useState(null);
  const [responseTimes, setResponseTimes] = useState([]);
  const [questionStartTime, setQuestionStartTime] = useState(0);
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
      const res = await axiosClient.get("/skillgame/matches/join/math_clash");
      setUserBalanceGen(res?.data.user_balance)
      setUserDetails(prev=>({...prev, wallet_balance:res?.data.user_balance}));
      setGameId(res.data.match.id)
    } catch (error) { handleNetworkError  
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

  const handleNetworkError = () => {
    setToastVisible(true)
    setToastType("error")
    setToastTitle("Network error")
    setToastMessage("Please try again!")
    resetMatchmaking(false)
  }

  const getMatchingStart = async () => { 
    try {
      const res = await axiosClient.get(`/skillgame/matches/start/${gameId}`);
      if(res.data.status == "error"){
        handleNetworkError()
      }
      setPlayers((prev) => {
      const existingIds = new Set(prev.map((p) => p.id));
      const newPlayers = res?.data?.players?.filter((p) => !existingIds.has(p.id));
      
      return [
        ...prev,
        ...newPlayers?.map((player) => ({
          id: player.id,
          name: player.user_id,
          taps: player.score,
        })),
      ];
    });
    setPlayersReady(res.data.playerCount);
      
    } catch (error) { handleNetworkError  
     
    } finally { 
      
    }
  };

  const getMatchingPlayer = async () => { 
    try {
      const res = await axiosClient.get(`/skillgame/matches/status/${gameId}`);
      // console.log(res.data.players)
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

    // Start countdown
    // if (playersReady >= 4 || newTimer === 0) {
    if (res.data.match.status === "started") {
      getMatchingUpdate()
      startGame();
      setIsMounted(false)
      // setCountdownTimer(5);
    }
      
    } catch (error) { handleNetworkError  
     
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
      
    } catch (error) { handleNetworkError  } finally {  }
  };

  const getMatchingComplete = async () => { 
    try {
      const { error, response }  = await makeRequest("/skillgame/matches/complete", {   
          matchId: gameId,
          score: score,
          time: avgTime
        });
        setGameState("completed");    
      
    } catch (error) { handleNetworkError  } finally {  }
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
      
    } catch (error) { handleNetworkError  
     
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
        if(gameState === "countdown" && countdownTimer === 0){
          getMatchingPlayer()
        }else{
          getMatchingEndUpdate();
        }

        // Start polling
        interval = setInterval(() => {
          if (isMounted) {
            if(gameState === "countdown" && countdownTimer === 0){
              getMatchingPlayer()
            }else{
              getMatchingEndUpdate();
            }
          }   
        }, 2000);
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
      outputRange: ['rgba(0, 180, 255, 0.3)', 'rgba(180, 71, 235, 1)'], // strong blue glow
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

  const generateQuestion = useCallback(() => {
  const operations = ['+', '-', '×', '/'];
  const op = operations[Math.floor(Math.random() * operations.length)];

  let num1 = Math.floor(Math.random() * 12) + 1;
  let num2 = Math.floor(Math.random() * 12) + 1;
  let answer = 0;

  switch (op) {
    case '+':
      answer = num1 + num2;
      break;

    case '-':
      if (num1 < num2) [num1, num2] = [num2, num1]; // avoid negative results
      answer = num1 - num2;
      break;

    case '×':
      answer = num1 * num2;
      break;

    case '/':
      // Ensure perfect division (no decimals)
      // 1. Choose divisor
      num2 = Math.floor(Math.random() * 11) + 1; // 1–12
      // 2. Choose a random multiplier so num1 is divisible by num2
      const multiplier = Math.floor(Math.random() * 12) + 1;
      num1 = num2 * multiplier;
      answer = num1 / num2;
      break;
  }

  // Generate 3 wrong options
  const options = [answer];
  while (options.length < 4) {
    const wrong = answer + Math.floor(Math.random() * 10) - 5;
    if (wrong !== answer && wrong > 0 && !options.includes(wrong)) {
      options.push(wrong);
    }
  }

  // Shuffle options
  options.sort(() => Math.random() - 0.5);

  return {
    question: `${num1} ${op} ${num2}`,
    answer,
    options,
  };
}, []);


  // Matchmaking countdown
  useEffect(() => {
    if (gameState === 'waiting' && matchmakingTimer > 0) {
      const timer = setTimeout(() => {
        const newTimer = matchmakingTimer - 1;
        setMatchmakingTimer(newTimer);
        if(gameId){          
          getMatchingPlayer()
        }
      }, 1000);
      return () => clearTimeout(timer);
    }else if (matchmakingTimer === 0 && gameState === "waiting") {
      // Force start the game
      setGameState("countdown");
    }
  }, [gameState, matchmakingTimer, playersReady]);

  // Countdown before game start
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
      getMatchingStart();
      setIsMounted(true)
    }
  }, [gameState, countdownTimer]);

  // Simulate opponents answering
  useEffect(() => {
    if (gameState === 'playing' && currentQuestion < 20) {
      const timeout = setTimeout(() => {
        getMatchingUpdate()
      }, Math.random() * 2000 + 500);
      return () => clearTimeout(timeout);
    }
  }, [gameState, currentQuestion]);

  // Question timer
  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && gameState === 'playing') {
      handleTimeout();
    }
  }, [gameState, timeLeft]);

  const startGame = () => {
    setGameState('playing');
    setCurrentQuestion(0);
    setScore(0);
    const q = generateQuestion();
    setQuestion(q);
    setTimeLeft(3);
    setQuestionStartTime(Date.now());
  };

  const handleAnswer = ans => {
    if (!question || gameState !== 'playing') return;
    const t = (Date.now() - questionStartTime) / 1000;
    setResponseTimes(prev => [...prev, t]);

    if (ans === question.answer) {
      setScore(s => s + 10);
      setAvgTime(s => s + t);
      // setPlayers(prev =>
      //   prev.map(p => (p.id === 1 ? { ...p, score: p.score + 10, avgTime: p.avgTime + t } : p)),
      // );
    } else {
      setAvgTime(s => s + t);
      // setPlayers(prev => prev.map(p => (p.id === 1 ? { ...p, avgTime: p.avgTime + t } : p)));
    }

    nextQuestion();
  };

  const handleTimeout = () => {
    setResponseTimes(prev => [...prev, 3]);
    setAvgTime(s => s + 3);
    // setPlayers(prev => prev.map(p => (p.id === 1 ? { ...p, avgTime: p.avgTime + 3 } : p)));
    nextQuestion();
  };

  const nextQuestion = () => {
    if (currentQuestion + 1 >= 20) return endGame();
    setCurrentQuestion(currentQuestion + 1);
    const q = generateQuestion();
    setQuestion(q);
    setTimeLeft(3);
    setQuestionStartTime(Date.now());
  };

  const endGame = () => {
    // setGameState('finished');
    setIsMounted(true)
    getMatchingComplete();
    // const avgTime =
    //   responseTimes.length > 0
    //     ? responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length
    //     : 0;
    // const sorted = [...players]
    //   .map(p => (p.id === 1 ? { ...p, avgTime } : { ...p, avgTime: p.avgTime / 10 }))
    //   .sort((a, b) => b.score - a.score || a.avgTime - b.avgTime);
    // setPlayers(sorted);
  };

  const resetMatchmaking = (bckclc) => {
    setGameState('waiting');
    setPlayersReady(0);
    setPlayers([]);
    setIsMounted(false)
    if(bckclc){
      setMatchmakingTimer(30);
      router.push(`/(routes)/skillgame/mathclash`)
    }else{
      setMatchmakingTimer(0);
      router.push("/(routes)/skillgame")
    }
  };

  // --- UI Render States ---
    return (
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
            <TouchableOpacity onPress={()=> resetMatchmaking(false)} style={styles.backBtn}>
            <ArrowLeft size={20} color="#fff" />
            <Text style={styles.backText}>Back</Text>
            </TouchableOpacity>
            <Text style={styles.titleHead}>Math Clash</Text>
            <View style={{ width: 60 }} />
        </View>
        <View style={{flexDirection: "row", alignItems: "center", justifyContent: "center", marginTop: 1 }}>        
            <Text style={styles.subText}>₦300 Stake</Text>
        </View>
        {gameState === "waiting" && (
            <View style={styles.centerBox}>
                <Animated.View style={[styles.card, animatedStyle]}>
                    <Text style={styles.timer}>{matchmakingTimer}s</Text>
                    <Text style={styles.subText}>Finding players...</Text>
                </Animated.View>
                <View  style={{ marginTop: 10, flexDirection: "column", justifyContent: "flex-start"}}>
                    <Text style={styles.smallText}> • Solve 10 math problems as fast as you can!</Text>
                    <Text style={styles.smallText}> • 3 seconds per question</Text>
                    <Text style={styles.smallText}> • Correct answer = +10 points</Text>
                    <Text style={styles.smallText}> • Fastest average time breaks ties</Text>
                </View>
                <View style={{marginTop: 20}}>
                    <Text style={[styles.smallText, {textAlign: "center", fontWeight: 'bold', fontSize: 18}]}>Players Ready: {playersReady}/4</Text>
                    <View style={styles.playersContainer}>
                        {players.map((p, ind) => (
                            <View key={p.id} style={styles.playerCard}>
                            <Text style={styles.playerNumber}>{ind+1}</Text>
                            <Text style={styles.playerName}>{p.name}</Text>
                            </View>
                        ))}
                    </View>
                </View>
            </View>
        )}

        {gameState === 'countdown' &&  (
        <View style={styles.centerBox}>
            <Animated.View style={[styles.card, animatedStyle]}>
            <Text style={styles.bigCountdown}>{countdownTimer ? `${countdownTimer}s` : 'Waiting'}</Text>
            <Text style={styles.subtitle}>Game starting...</Text>
            </Animated.View>
        </View>
        )}

        {gameState === 'playing' && question &&  (
            <View>
                <View style={styles.topRow}>
                <Text style={styles.sub}>Question {currentQuestion + 1}/20</Text>
                <Text style={styles.timer}>{timeLeft}s</Text>
                <Text style={styles.sub}>Score: {score}</Text>
                </View>

                <View style={styles.questionCard}>
                    <Text style={styles.questionText}>{question.question} = ?</Text>
                    <View style={styles.optionContainer}>
                        {question.options.map((opt, i) => (
                        <TouchableOpacity
                            key={i}
                            onPress={() => handleAnswer(opt)}
                            style={styles.optionButton}
                        >
                            <Text style={styles.optionText}>{opt}</Text>
                        </TouchableOpacity>
                        ))}
                    </View>
                </View>
                <View style={{marginTop: 10}}>
                    <Text style={styles.subText}>Live Leaderboard</Text>
                    <FlatList
                        data={[...players].sort((a, b) => b.score - a.score)}
                        keyExtractor={p => p.id.toString()}
                        renderItem={({ item, index }) => (
                            <View style={styles.rankCard}>
                            <Text style={styles.rank}>#{index + 1}</Text>
                            <Text style={styles.rankName}>{item.name}</Text>
                            <Text style={styles.rankScore}>{item.score}</Text>
                            </View>
                        )}
                        />
                </View>
            </View>
        )}

        {/* completed */}
        {gameState === "completed" && (
          <View style={styles.centerBox}>
            <Animated.View style={[styles.card, animatedStyle]}>
              <Text style={{color: "#fff", fontSize: 52}}>Completed</Text>
            <Text style={[styles.subText, {color: "#fff"}]}>Waiting for result!</Text>
            </Animated.View>
          </View>
        )}

        { gameState === 'finished' && (
            <View style={{ flex: 1 }}>
                <Text style={styles.title}>🏆 Game Over</Text>
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
                <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-around", marginTop: 20, marginBottom: 20}}>
                    <TouchableOpacity
                        style={[styles.btn, {backgroundColor: "#FFD04C"}]}
                        onPress={()=> resetMatchmaking(false)}
                    >
                        <Text style={styles.btnText}>Back to Lobby</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.btn}
                        onPress={() => resetMatchmaking(true)}
                    >
                        <Text style={styles.btnText}>Play Again</Text>
                    </TouchableOpacity>
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

  return null;
}

// --- Styles ---
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#121216", padding: 16 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20
  },
  smallText: { fontSize: 14, color: "#888" },
  backBtn: { flexDirection: "row", alignItems: "center" },
  backText: { marginLeft: 6, fontSize: 16, color: "#fff" },
  titleHead: { fontSize: 20, fontWeight: "bold", color: "#B447EB" },
  subText: { fontSize: 16, color: "#666", marginVertical: 10 },
  title: {
    color: '#B447EB',
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 40,
  },
  subtitle: {
    color: '#ccc',
    fontSize: 18,
    textAlign: 'center',
  },
  timer: {
    fontSize: 64,
    fontWeight: 'bold',
    color: '#B447EB',
    textAlign: 'center',
  },
  bigCountdown: {
    fontSize: 52,
    color: '#B447EB',
    fontWeight: 'bold',
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  sub: {
    color: '#aaa',
    fontSize: 16,
  },
  questionCard: {
    backgroundColor: '#111',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
  },
  questionText: {
    color: '#fff',
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  optionContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  optionButton: {
    width: '48%',
    backgroundColor: '#1A4051',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    marginBottom: 10,
  },
  optionText: {
    color: '#B447EB',
    fontSize: 28,
    fontWeight: 'bold',
  },
  playersContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 20,
    width: '100%',
  },
  playerCard: {
    width: '48%',
    backgroundColor: '#111',
    borderRadius: 16,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  playerNumber: {
    backgroundColor: '#1A4051',
    color: '#B447EB',
    borderRadius: 50,
    width: 40,
    height: 40,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontWeight: 'bold',
    marginRight: 10,
  },
  playerName: {
    color: '#fff',
    fontWeight: '600',
  },
  rankCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#111',
    borderRadius: 12,
    padding: 15,
    marginVertical: 4,
  },
  rank: { color: '#888', fontWeight: 'bold', fontSize: 16 },
  rankName: { color: '#fff', fontSize: 16 },
  rankScore: { color: '#B447EB', fontWeight: 'bold', fontSize: 18 },
  btn: {
    backgroundColor: '#B447EB',
    padding: 15,
    borderRadius: 12,
    marginTop: 20,
  },
  btnText: { color: '#fff', textAlign: 'center', fontWeight: 'bold', fontSize: 18 },
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
  centerBox: { justifyContent: "center", alignItems: "center", backgroundColor: '#121216', shadowOpacity: 0.9, borderRadius: 5 },
  resultItem: {
    padding: 24,
    borderRadius: 10,
    marginVertical: 15,
    alignItems: "center",
    marginHorizontal: 20
  },  
  gold: { backgroundColor: "#fff3bf" },
  silver: { backgroundColor: "#dee2e6" },
  resultRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  resultText: { fontSize: 16, fontWeight: "600" },  
  normalItem: { backgroundColor: "#f1f3f5" },
});
