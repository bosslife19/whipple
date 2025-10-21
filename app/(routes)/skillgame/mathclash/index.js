import React, { useState, useEffect, useCallback, useRef } from 'react';
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

export default function MathClash() {
  const [gameState, setGameState] = useState('waiting');
  const [matchmakingTimer, setMatchmakingTimer] = useState(30);
  const [countdownTimer, setCountdownTimer] = useState(5);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(3);
  const [question, setQuestion] = useState(null);
  const [responseTimes, setResponseTimes] = useState([]);
  const [questionStartTime, setQuestionStartTime] = useState(0);
  const [playersReady, setPlayersReady] = useState(1);
  const [players, setPlayers] = useState([{ id: 1, name: 'You', score: 0, avgTime: 0 }]);

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
    const operations = ['+', '-', '×'];
    const op = operations[Math.floor(Math.random() * operations.length)];
    let num1 = Math.floor(Math.random() * 12) + 1;
    let num2 = Math.floor(Math.random() * 12) + 1;
    let answer = 0;

    switch (op) {
      case '+':
        answer = num1 + num2;
        break;
      case '-':
        if (num1 < num2) [num1, num2] = [num2, num1];
        answer = num1 - num2;
        break;
      case '×':
        answer = num1 * num2;
        break;
    }

    const options = [answer];
    while (options.length < 4) {
      const wrong = answer + Math.floor(Math.random() * 10) - 5;
      if (wrong !== answer && wrong > 0 && !options.includes(wrong)) {
        options.push(wrong);
      }
    }
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

        if (playersReady < 4 && Math.random() > 0.7) {
          const newId = playersReady + 1;
          setPlayersReady(newId);
          setPlayers(prev => [...prev, { id: newId, name: `Player ${newId}`, score: 0, avgTime: 0 }]);
        }

        if (playersReady >= 4 || newTimer === 0) {
          setGameState('countdown');
          setCountdownTimer(5);
        }
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [gameState, matchmakingTimer, playersReady]);

  // Countdown before game start
  useEffect(() => {
    if (gameState === 'countdown' && countdownTimer > 0) {
      const timer = setTimeout(() => setCountdownTimer(countdownTimer - 1), 1000);
      return () => clearTimeout(timer);
    } else if (gameState === 'countdown' && countdownTimer === 0) {
      startGame();
    }
  }, [gameState, countdownTimer]);

  // Simulate opponents answering
  useEffect(() => {
    if (gameState === 'playing' && currentQuestion < 10) {
      const timeout = setTimeout(() => {
        setPlayers(prev =>
          prev.map(p => {
            if (p.id === 1) return p;
            const correct = Math.random() > 0.3;
            return {
              ...p,
              score: correct ? p.score + 10 : p.score,
              avgTime: p.avgTime + Math.random() * 2 + 0.5,
            };
          }),
        );
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
      setPlayers(prev =>
        prev.map(p => (p.id === 1 ? { ...p, score: p.score + 10, avgTime: p.avgTime + t } : p)),
      );
    } else {
      setPlayers(prev => prev.map(p => (p.id === 1 ? { ...p, avgTime: p.avgTime + t } : p)));
    }

    nextQuestion();
  };

  const handleTimeout = () => {
    setResponseTimes(prev => [...prev, 3]);
    setPlayers(prev => prev.map(p => (p.id === 1 ? { ...p, avgTime: p.avgTime + 3 } : p)));
    nextQuestion();
  };

  const nextQuestion = () => {
    if (currentQuestion + 1 >= 10) return endGame();
    setCurrentQuestion(currentQuestion + 1);
    const q = generateQuestion();
    setQuestion(q);
    setTimeLeft(3);
    setQuestionStartTime(Date.now());
  };

  const endGame = () => {
    setGameState('finished');
    const avgTime =
      responseTimes.length > 0
        ? responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length
        : 0;
    const sorted = [...players]
      .map(p => (p.id === 1 ? { ...p, avgTime } : { ...p, avgTime: p.avgTime / 10 }))
      .sort((a, b) => b.score - a.score || a.avgTime - b.avgTime);
    setPlayers(sorted);
  };

  const reset = () => {
    setGameState('waiting');
    setMatchmakingTimer(30);
    setPlayersReady(1);
    setPlayers([{ id: 1, name: 'You', score: 0, avgTime: 0 }]);
  };

  // --- UI Render States ---
    return (
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
            <TouchableOpacity onPress={()=> router.push("/(routes)/skillgame")} style={styles.backBtn}>
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
                        {players.map(p => (
                            <View key={p.id} style={styles.playerCard}>
                            <Text style={styles.playerNumber}>{p.id}</Text>
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
            <Text style={styles.bigCountdown}>{countdownTimer}s</Text>
            <Text style={styles.subtitle}>Game starting...</Text>
            </Animated.View>
        </View>
        )}

        {gameState === 'playing' && question &&  (
            <View>
                <View style={styles.topRow}>
                <Text style={styles.sub}>Question {currentQuestion + 1}/10</Text>
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
                        onPress={()=> router.push("/(routes)/skillgame")}
                    >
                        <Text style={styles.btnText}>Back to Lobby</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.btn}
                        onPress={reset}
                    >
                        <Text style={styles.btnText}>Play Again</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )}
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
    fontSize: 100,
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
