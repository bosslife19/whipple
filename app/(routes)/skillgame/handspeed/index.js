import React, { useState, useEffect, useCallback, useRef, useContext } from "react";
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
import axiosClient from "../../../../axiosClient";
import Toast from '../../../../components/Toast';
import {AuthContext} from '../../../../context/AuthContext'
import { useRequest } from "../../../../hooks/useRequest";

export default function TapRush() {
  const {userBalance: userBalanceGen, setUserBalance: setUserBalanceGen, setUserPoint: setUserPointGen, setUserDetails} = useContext(AuthContext)
  const { loading, makeRequest } = useRequest();
  const [gameId, setGameId] = useState();
  const [gameState, setGameState] = useState("waiting");
  const [matchmakingTimer, setMatchmakingTimer] = useState(30);
  const [countdownTimer, setCountdownTimer] = useState(5);
  const [timeLeft, setTimeLeft] = useState(30);
  const [tapCount, setTapCount] = useState(0);
  const [winnings, setWinnings] = useState(0);
  const [playersReady, setPlayersReady] = useState();
  const [players, setPlayers] = useState([]);
  const [isMounted, setIsMounted] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastType, setToastType] = useState("info");
  const [toastTitle, setToastTitle] = useState("info");
  const [toastMessage, setToastMessage] = useState("info");

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

  const getMatchingJoining = async () => { 
    try {
      const res = await axiosClient.get("/skillgame/matches/join/tap_rush");
      setUserBalanceGen(res?.data.user_balance)
      setUserDetails(prev=>({...prev, wallet_balance:res?.data.user_balance}));
      setGameId(res.data.match.id)
    } catch (error) { handleNetworkError  
      // console.error('Error fetching admin parameter:', error);
      setToastVisible(true)
      setToastType("error")
      setToastTitle("Insufficient balance")
      setToastMessage("Your balance is too low for this game.")
      resetMatchmaking(false)
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
      setIsMounted(false)
      // setCountdownTimer(2);
    }
      
    } catch (error) { handleNetworkError  
     
    } finally { 
      
    }
  };

  const getMatchingUpdate = async (ingame = 'game') => { 
    try {
      const { error, response }  = await makeRequest("/skillgame/matches/updateScore", {   
          matchId: gameId,
          score: Number(tapCount || 0),
          ingame: ingame,
        });
        
        if(response){
          setPlayers(
            response?.leaderboard.map((player) => ({
              id: player.id,
              name: player.name,
              taps: player.score,
            }))
          );
        }    
      
    } catch (error) { handleNetworkError  } finally {  }
  };

  const getMatchingComplete = async () => { 
    try {
      const { error, response }  = await makeRequest("/skillgame/matches/complete", {   
          matchId: gameId,
          score: tapCount,
          time: countdownTimer
        });  
      
    } catch (error) { handleNetworkError  } finally {  }
  };

  const getMatchingEndUpdate = async () => { 
    try {
      const res = await axiosClient.get(`/skillgame/matches/checkStatus/${gameId}`);
      
      if(res.data.status === "finished"){
        setWinnings(res?.data.user_winning)
        setUserBalanceGen(res?.data.user_balance)
        setUserDetails(prev=>({...prev, wallet_balance:res?.data.user_balance}));
        setPlayers(
            res.data.results.map((player) => ({
              id: player.rank,
              name: player.name,
              taps: player.score,
              win: player.winnings,
            }))
          );
          setIsMounted(false)
          setGameState("finished");
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


  // Matchmaking timer
  useEffect(() => {
    if (gameState === "waiting" && matchmakingTimer > 0) {
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

  // Countdown timer
  useEffect(() => {
    if (gameState === "countdown" && countdownTimer > 0) {
      const timer = setTimeout(() => {  
         setCountdownTimer(countdownTimer - 1)
         if(gameId){          
          getMatchingPlayer()
        }
      }, 1000);
      return () => clearTimeout(timer);
    } else if (gameState === "countdown" && countdownTimer === 0) {
      getMatchingPlayer()      
      getMatchingStart();
      setIsMounted(true)
    }
  }, [gameState, countdownTimer]);

  // Simulate other players tapping
  useEffect(() => {
    if (gameState === "playing") {
      getMatchingUpdate()
    }
  }, [gameState, tapCount]);

  // Game timer
  useEffect(() => {
    if (gameState === "playing" && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1)
        getMatchingUpdate("ingame")
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && gameState === "playing") {
      setGameState("completed");  
      endGame();
    }
  }, [gameState, timeLeft]);

  const startGame = () => {
    setGameState("playing");
    setTapCount(0);
    setTimeLeft(30);
    // setPlayers((prev) => prev.map((p) => ({ ...p, taps: 0 })));
  };

    const handleTap = useCallback(() => {
    if (gameState === "playing") {
      setTapCount((prev) => prev + 1);
      // setPlayers((prev) =>
      //   prev.map((p) =>
      //     p.id === 1 ? { ...p, taps: p.taps + 1 } : p
      //   )
      // );
    }
  }, [gameState]);   

  const endGame = () => {
    setIsMounted(true)
    getMatchingComplete();
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

  
  const resetMatchmaking = (bckclc) => {
    setGameState("waiting");
    setPlayersReady(0);
    setPlayers([]);
    setIsMounted(false)
    if(bckclc){
      setMatchmakingTimer(30);
      router.push(`/(routes)/skillgame/handspeed`)
    }else{
      setMatchmakingTimer(0);
      router.push("/(routes)/skillgame")
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={()=> resetMatchmaking(false)} style={styles.backBtn}>
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
            <Text style={styles.bigText}>{countdownTimer ? `${countdownTimer}s` : 'Waiting'}</Text>
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
      ) }

      {/* completed */}
      {gameState === 'completed' && (
        <View style={styles.centerBox}>
          <Animated.View style={[styles.card, animatedStyle]}>
            <Text style={styles.bigText}>Completed</Text>
          <Text style={styles.subText}>Waiting for result!</Text>
          </Animated.View>
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
              onPress={()=> resetMatchmaking(false)}
            >
              <Text style={styles.playAgainText}>Back to Lobby</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.playAgain}
              onPress={()=> resetMatchmaking(true)}
            >
              <Text style={styles.playAgainText}>Play Again</Text>
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
