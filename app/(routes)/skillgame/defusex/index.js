// DefuseX.js
import React, { useState, useEffect, useRef, useCallback, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  FlatList,
  ScrollView,
  Dimensions,
  Alert,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { router } from 'expo-router';
import { ArrowLeft, Trophy, Medal, Bomb  } from "lucide-react-native";
import Toast from '../../../../components/Toast';
import axiosClient from "../../../../axiosClient";
import {AuthContext} from '../../../../context/AuthContext'
import { useRequest } from "../../../../hooks/useRequest";

const { width } = Dimensions.get("window");


const WIRE_COLORS = [
  {
    name: "blue",
    color: "#3B82F6",
    dull: "#8CB5FA",     // softer, less saturated blue
    brightness: "#60A5FA" // lighter, brighter tone
  },
  {
    name: "red",
    color: "#EF4444",
    dull: "#F19999",     // muted red
    brightness: "#F87171" // brighter red
  },
  {
    name: "green",
    color: "#10B981",
    dull: "#7DD3AE",     // gentle green
    brightness: "#34D399" // vivid green
  },
  {
    name: "yellow",
    color: "#EAB308",
    dull: "#F2CD59",     // softer yellow
    brightness: "#FACC15" // bright vibrant yellow
  }
];


export default function DefuseX() {
  // Game state variables
  const [phase, setPhase] = useState("waiting"); // waiting, countdown, phase1, phase1-input, phase2, phase3, finished
  const [matchTimer, setMatchTimer] = useState(30);
  const [countdown, setCountdown] = useState(5);
  const [phase1Sequence, setPhase1Sequence] = useState([]);
  const [playerSequence, setPlayerSequence] = useState([]);
  const [showSeq, setShowSeq] = useState(false);
  const [phase1Score, setPhase1Score] = useState(0);
  const [phase2Score, setPhase2Score] = useState(0);
  const [phase3Score, setPhase3Score] = useState(0);
  const [timeLeft, setTimeLeft] = useState(20);
  const [unstable, setUnstable] = useState(new Set());
  const [cutWires, setCutWires] = useState(new Set());
  const [phase3Clue, setPhase3Clue] = useState("");
  const [phase3Correct, setPhase3Correct] = useState("blue");

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
      const res = await axiosClient.get("/skillgame/matches/join/defuse_x");
      setUserBalanceGen(res?.data.user_balance)
      setUserDetails(prev=>({...prev, wallet_balance:res?.data.user_balance}));
      setGameId(res.data.match.id)
    } catch (error) {  
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
      
    } catch (error) {  
     handleNetworkError
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
          time: player.time,
        })),
      ];
    });
    setPlayersReady(res.data.playerCount);

    // Start countdown
    // if (playersReady >= 4 || newTimer === 0) {
    //   getMatchingUpdate()
    // }
    if (res.data.match.status === "started") {
      getMatchingUpdate()
      startGame();
      setIsMounted(false)
      // setCountdownTimer(5);
    }
      
    } catch (error) {  
     handleNetworkError
    } finally { 
      
    }
  };

  const getMatchingUpdate = async (ingame = 'game') => { 
    try {
      const { error, response }  = await makeRequest("/skillgame/matches/updateScore", {   
          matchId: gameId,
          score: phase1Score + phase2Score + phase3Score,
          ingame: ingame,
        });
        
        if(response){
          setPlayers(
            response?.leaderboard.map((player) => ({
              id: player.id,
              name: player.name,
              score: player.score,
              time: player.time,
            }))
          );
        }    
      
    } catch (error) { handleNetworkError } finally {  }
  };

  const getMatchingComplete = async (total, completion) => { 
    try {
      const { error, response }  = await makeRequest("/skillgame/matches/complete", {   
          matchId: gameId,
          score: total,
          time: completion
        }); 
        // console.log([total, completion])   
        setPhase("completed");
      
    } catch (error) { handleNetworkError } finally {  }
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
              time: player.time,
              win: player.winnings,
            }))
          );
          setIsMounted(false)
          setPhase("finished")
      }
      
    } catch (error) {  
     handleNetworkError
    } finally { 
      
    }
  };

  useEffect(() => {
      getMatchingJoining();
    }, []);

  const [blinkIndex, setBlinkIndex] = useState(0);
  useEffect(() => {
    const colors = ["color", "dull", "brightness"];
    const interval = setInterval(() => {
      setBlinkIndex((prev) => (prev + 1) % colors.length);
    }, 500); // change speed here (ms)
    return () => clearInterval(interval);
  }, []);
  // players: index 0 is user (id:1)
  const [players, setPlayers] = useState([]);

  const [fastBlink, setFastBlink] = useState(false);
  const [slowBlink, setSlowBlink] = useState(false);

  // 🔁 Fast blinking for unstable wires
  useEffect(() => {
    const fastInterval = setInterval(() => {
      setFastBlink((prev) => !prev);
    }, 300); // fast blink speed
    return () => clearInterval(fastInterval);
  }, []);

  // 🕐 Slow blinking for cut wires
  useEffect(() => {
    const slowInterval = setInterval(() => {
      setSlowBlink((prev) => !prev);
    }, 800); // slow blink speed
    return () => clearInterval(slowInterval);
  }, []);


useEffect(() => {
    let interval;
    
      if (isMounted) {
        // Run once immediately
        if(phase === "countdown" && countdown === 0){
          getMatchingPlayer()
        }else{
          getMatchingEndUpdate();
        }

        // Start polling
        interval = setInterval(() => {
          if (isMounted) {
            if(phase === "countdown" && countdown === 0){
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

  const [playersReady, setPlayersReady] = useState(1);
  const [showExplosion, setShowExplosion] = useState(false);
  const gameStartRef = useRef(0);


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

  // Animated glow for wires / card
  const glow = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(glow, { toValue: 1, duration: 900, useNativeDriver: false }),
        Animated.timing(glow, { toValue: 0, duration: 900, useNativeDriver: false }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [glow]);

  // small pulse for sequence boxes
  const pulse = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    const l = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 1.06, duration: 700, useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 1.0, duration: 700, useNativeDriver: true }),
      ])
    );
    l.start();
    return () => l.stop();
  }, [pulse]);

  // matchmaking timer that fills players
  useEffect(() => {
    if (phase !== "waiting") return;
    if (matchTimer <= 0) {
      // start countdown
      setPhase("countdown");
      setCountdown(5);
      return;
    }
    const t = setTimeout(() => {
      setMatchTimer((s) => s - 1);
      // randomly add simulated players
      // if (playersReady < 4 && Math.random() > 0.5) {
      //   const id = playersReady + 1;
      //   setPlayersReady(id);
      //   setPlayers((p) => [
      //     ...p,
      //     {
      //       id,
      //       name: `Player ${id}`,
      //       phase1Score: 0,
      //       phase2Score: 0,
      //       phase3Score: 0,
      //       total: 0,
      //       time: 0,
      //       eliminated: false,
      //     },
      //   ]);
      // }
      if(gameId){          
          getMatchingPlayer()
        }
    }, 1000);
    return () => clearTimeout(t);
  }, [matchTimer, phase, playersReady]);

  // countdown -> start game
  useEffect(() => {
    if (phase !== "countdown") return;
    if (countdown <= 0) {
      // startGame();
      if(gameId){          
          getMatchingPlayer()
          getMatchingStart();
          setIsMounted(true)
        };
      return;
    }
    const t = setTimeout(() => {
      setCountdown((c) => c - 1)
      getMatchingPlayer()
      }, 1000);
    return () => clearTimeout(t);
  }, [countdown, phase]);

  // phase timers (phase1-input, phase2, phase3)
  useEffect(() => {
    if (!["phase1-input", "phase2", "phase3"].includes(phase)) return;
    if (timeLeft <= 0) {
      // handle timeouts
      handlePhaseTimeout();
      return;
    }
    const t = setTimeout(() => setTimeLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [phase, timeLeft]);

  // simulate opponents behavior during phase2 & 3 and scoring
  // useEffect(() => {
  //   if (phase === "phase2" || phase === "phase3") {
  //     const interval = setInterval(() => {
  //       setPlayers((prev) =>
  //         prev.map((pl) => {
  //           if (pl.id === 1) return pl; // don't auto change user
  //           // small random scoring to simulate opponents
  //           const change =
  //             phase === "phase2"
  //               ? (Math.random() > 0.5 ? 100 : -30) // cut stable or cut wrong
  //               : Math.random() > 0.7
  //               ? 200
  //               : 0; // sometimes defuse
  //           const newPhase2 = pl.phase2Score + (phase === "phase2" ? Math.max(-30, change) : 0);
  //           const newPhase3 = pl.phase3Score + (phase === "phase3" ? (change > 0 ? change : 0) : 0);
  //           return {
  //             ...pl,
  //             phase2Score: Math.max(0, newPhase2),
  //             phase3Score: Math.max(0, newPhase3),
  //           };
  //         })
  //       );
  //     }, 900 + Math.random() * 1200);
  //     return () => clearInterval(interval);
  //   }
  // }, [phase]);

  // helpers: generate random sequence
  const makeSequence = useCallback(() => {
    const seq = [];
    for (let i = 0; i < 4; i++) {
      const r = WIRE_COLORS[Math.floor(Math.random() * WIRE_COLORS.length)].name;
      seq.push(r);
    }
    return seq;
  }, []);

  const alert = (type, msg) => {
    // lightweight replacement of toast
    // type can be "info"|"success"|"error"
    if (Platform.OS === "web") {
      // fallback
      console.log(type.toUpperCase(), msg);
    } else {
      // Native alert for visibility
      // Alert.alert(type.toUpperCase(), msg);      
      setToastVisible(true)
      setToastType(type)
      setToastTitle(`${type}!`)
      setToastMessage(msg)
    }
  };

  // start game
  function startGame() {
    gameStartRef.current = Date.now();
    getMatchingUpdate()
    // reset players
    // setPlayers((p) =>
    //   p.map((pl) => ({
    //     ...pl,
    //     phase1Score: 0,
    //     phase2Score: 0,
    //     phase3Score: 0,
    //     total: 0,
    //     time: 0,
    //     eliminated: false,
    //   }))
    // );
    startPhase1();
  }

  // Phase 1 (show sequence)
  function startPhase1() {
    const seq = makeSequence();
    setPhase1Sequence(seq);
    setPlayerSequence([]);
    setPhase1Score(0);
    setShowSeq(true);
    setPhase("phase1");
    alert("info", "Phase 1: Memorize the sequence!");
    // show sequence for 3s
    setTimeout(() => {
      setShowSeq(false);
      setPhase("phase1-input");
      setTimeLeft(5);
      alert("info", "Now repeat the sequence!");
    }, 3000);
  }

  // Player taps wires in phase1 input
  function handleWireTapPhase1(wire) {
    if (phase !== "phase1-input") return;
    const seq = [...playerSequence, wire];
    setPlayerSequence(seq);
    const idx = seq.length - 1;
    const expected = phase1Sequence[idx];
    if (wire !== expected) {
      // explosion / eliminated
      setShowExplosion(true);
      // setPlayers((p) => p.map((pl) => (pl.id === 1 ? { ...pl, eliminated: true } : pl)));
      alert("error", "💥 BOOM! Wrong wire!");
      setTimeout(() => {
        setShowExplosion(false);
        finishGame(); // player eliminated -> finish
      }, 1500);
      return;
    }
    if (seq.length >= phase1Sequence.length) {
      setPhase1Score(50);
      // setPlayers((p) => p.map((pl) => (pl.id === 1 ? { ...pl, phase1Score: 50 } : pl)));
      alert("success", "Phase 1 Complete! +50 points");
      setTimeout(startPhase2, 700);
    }
  }

  // Phase 2 start
  function startPhase2() {
    // pick 1 or 2 unstable wires
    const copy = [...WIRE_COLORS].sort(() => Math.random() - 0.5);
    const num = Math.floor(Math.random() * 2) + 1;
    const unstableSet = new Set(copy.slice(0, num).map((c) => c.name));
    setUnstable(unstableSet);
    setCutWires(new Set());
    setPhase2Score(0);
    setPhase("phase2");
    setTimeLeft(3);
    alert("info", "Phase 2: Cut only stable wires!");
  }

  // cutting wires in phase2
  function handleWireCutPhase2(wire) {
    if (phase !== "phase2") return;
    if (cutWires.has(wire)) return;
    const newSet = new Set(cutWires);
    newSet.add(wire);
    setCutWires(newSet);
    const isStable = !unstable.has(wire);
    if (isStable) {
      setPhase2Score(100);
      // setPlayers((p) => p.map((pl) => (pl.id === 1 ? { ...pl, phase2Score: pl.phase2Score + 100 } : pl)));
    } else {
      // explosion / eliminated
      setShowExplosion(true);
      // setPlayers((p) => p.map((pl) => (pl.id === 1 ? { ...pl, eliminated: true } : pl)));
      alert("error", "💥 BOOM! Unstable wire!");
      setTimeout(() => {
        setShowExplosion(false);
        finishGame(); // player eliminated -> finish
      }, 1500);
    }
    // check if all stable wires cut
    const stableWires = WIRE_COLORS.filter((w) => !unstable.has(w.name)).map((w) => w.name);
    const allCut = stableWires.every((n) => newSet.has(n));
    if (allCut) {
      setTimeout(startPhase3, 800);
    }
  }

  // Phase 3 start (recall)
  function startPhase3() {
    setPhase3Score(0);
    setPhase("phase3");
    setTimeLeft(5);
    const idx = Math.floor(Math.random() * phase1Sequence.length);
    const clueIndexName = ["first", "second", "third", "fourth"][idx];
    const clue = `Cut the wire that blinked ${clueIndexName} in Phase 1`;
    setPhase3Clue(clue);
    setPhase3Correct(phase1Sequence[idx] || "blue");
    alert("info", clue);
  }

  function handleFinalDefuse(wire) {
    if (phase !== "phase3") return;
    const isCorrect = wire === phase3Correct;
    if (isCorrect) {
      setPhase3Score(200);
      // setPlayers((p) => p.map((pl) => (pl.id === 1 ? { ...pl, phase3Score: 200 } : pl)));
      alert("success", "Bomb defused! +200 points");
    } else {
      // huge explosion
      setShowExplosion(true);
      alert("error", "HUGE EXPLOSION! Wrong wire!");
    }
    setTimeout(() => {
      setShowExplosion(false);
      finishGame();
    }, isCorrect ? 1000 : 1600);
  }

  function handlePhaseTimeout() {
    if (phase === "phase1-input") {
      setShowExplosion(true);
      // setPlayers((p) => p.map((pl) => (pl.id === 1 ? { ...pl, eliminated: true } : pl)));
      setTimeout(() => {
        setShowExplosion(false);
        finishGame();
      }, 1200);
    } else if (phase === "phase2") {
      startPhase3();
    } else if (phase === "phase3") {
      finishGame();
    }
  }

  // compute totals and finish
  function finishGame() {
    const completion = (Date.now() - gameStartRef.current) / 1000;
    const total = phase1Score + phase2Score + phase3Score;
    setIsMounted(true)
    getMatchingComplete(total, completion)
    getMatchingUpdate()
    // setPlayers((prev) =>
    //   prev.map((pl) =>
    //     pl.id === 1
    //       ? { ...pl, total, time: completion }
    //       : { ...pl, total: Math.floor(Math.random() * 400), time: Math.random() * 60 + 10 }
    //   )
    // );
    // setPhase("finished");

    // sort and show result messages after slight delay
    // setTimeout(() => {
    //   setPlayers((prev) => {
    //     const sorted = [...prev].sort((a, b) => {
    //       if (b.total !== a.total) return b.total - a.total;
    //       return a.time - b.time;
    //     });
    //     const rank = sorted.findIndex((p) => p.id === 1) + 1;
    //     if (sorted[0].total === 0) alert("error", "No winner — all eliminated!");
    //     else if (rank === 1) alert("success", "🏆 You Won! 75% of the pot!");
    //     else if (rank === 2) alert("success", "🥈 Runner-up! 25%!");
    //     else alert("info", "Better luck next time");
    //     return sorted;
    //   });
    // }, 500);

    // after some seconds reset matchmaking
    // setTimeout(() => {
    //   resetMatchmaking();
    // }, 3500);
  }

  const resetMatchmaking = (bckclc) => {
    setPhase("waiting");
    setPlayersReady(0);
    setPlayers([]);
    setPhase1Score(0); 
    setPhase2Score(0);
    setPhase3Score(0);
    setIsMounted(false)
    if(bckclc){      
      setMatchTimer(30);
      router.push(`/(routes)/skillgame/defusex`)
    }else{
      setMatchTimer(0);
      router.push("/(routes)/skillgame")
    }
  }

  // Live leaderboard render
  function renderPlayer({ item, index }) {
    const isUser = item.id === 1;
    return (
      <View style={[styles.resultRow, isUser ? styles.userRow : styles.oppRow]}>
        <Text style={styles.rank}>#{index + 1}</Text>
        <Text style={[styles.playerName, isUser ? styles.userName : null]}>{item.name}</Text>
        <Text style={styles.playerScore}>{item.total}</Text>
      </View>
    );
  }

  // Animated style for glow
  const cardGlowColor = glow.interpolate({
    inputRange: [0, 1],
    outputRange: ["rgba(0,184,255,0.08)", "rgba(0,184,255,0.28)"],
  });
  const cardShadowRadius = glow.interpolate({ inputRange: [0, 1], outputRange: [6, 28] });

  return (
    <View style={styles.screen}>
      {/* background gradient */}
      <LinearGradient colors={["#050810", "#071025"]} style={styles.background} />

      {/* animated blurred lights (absolutely positioned colored circles) */}
      {(phase === "phase1" ||
        phase === "phase1-input" ||
        phase === "phase2" ||
        phase === "phase3") && (
        <>
          {[...Array(8)].map((_, i) => {
            const c = WIRE_COLORS[Math.floor(Math.random() * WIRE_COLORS.length)].color;
            const left = Math.random() * width * 0.9;
            const top = Math.random() * 700;
            const size = 50 + Math.random() * 120;
            return (
              <Animated.View
                key={`bg-${i}`}
                style={{
                  position: "absolute",
                  left,
                  top,
                  width: size,
                  height: size,
                  borderRadius: size / 2,
                  backgroundColor: c,
                  opacity: 0.12 + Math.random() * 0.2,
                  transform: [{ scale: 1 + Math.random() * 0.3 }],
                  blurRadius: 30,
                }}
              />
            );
          })}
        </>
      )}

      {/* explosion overlay */}
      {showExplosion && (
        <View style={styles.explosionOverlay}>
          <Text style={styles.explosionEmoji}>💥</Text>
        </View>
      )}
      
      <View style={styles.container}>
        <ScrollView>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity
              onPress={()=> resetMatchmaking(false)}
              style={[styles.backBtn, {flexDirection: "row", justifyContent: "flex-start"}]}
            >
              <ArrowLeft size={20} color="#fff" />
              <Text style={styles.backText}> Back </Text>
            </TouchableOpacity>

            <View style={{ alignItems: "center" }}>
              <Text style={styles.title}>💣 Defuse-X</Text>
              <Text style={styles.subtitle}>₦1,000 Stake</Text>
            </View>

            <View style={{ width: 64 }} />
          </View>

          {/* Waiting state */}
          {phase === "waiting" && (
            <>
              <Animated.View style={[styles.card, { backgroundColor: "#0f1724", shadowColor: cardGlowColor, shadowRadius: cardShadowRadius }]}>
                <Animated.View style={[styles.card, animatedStyle]}>
                  <View style={{ alignItems: "center" }}><Bomb size={30} color="#FFBB33" /></View>
                  <Text style={[styles.bigTimer, {color: "#FFBB33"}]}>{matchTimer}s</Text>
                  <Text style={styles.cardSub}>Finding players...</Text>
                </Animated.View>
                
                <View style={styles.phaseGrid}>
                  <View style={styles.phaseBox}>
                    <Text style={styles.phaseTitle}>PHASE 1</Text>
                    <Text style={styles.phaseDesc}>Memory - 3s</Text>
                    <Text style={styles.phaseSmall}>50 pts</Text>
                  </View>
                  <View style={styles.phaseBox}>
                    <Text style={[styles.phaseTitle, {color: "#B447EB"}]}>PHASE 2</Text>
                    <Text style={styles.phaseDesc}>Stability - 5s</Text>
                    <Text style={styles.phaseSmall}>100 pts</Text>
                  </View>
                  <View style={styles.phaseBox}>
                    <Text style={[styles.phaseTitle, {color: "#FFBB33"}]}>PHASE 3</Text>
                    <Text style={styles.phaseDesc}>Recall - 3s</Text>
                    <Text style={styles.phaseSmall}>200 pts</Text>
                  </View>
                </View>
              </Animated.View>

              <View style={[styles.card, { marginTop: 40 }]}>
                <Text style={styles.sectionTitle}>Players Ready ({playersReady}/4)</Text>
                <View style={styles.playersWrap}>
                  {players.map((p, i) => (
                    <View key={p.id} style={styles.playerMini}>
                      <View style={styles.avatar}>
                        <Text style={styles.avatarText}>{i+1}</Text>
                      </View>
                      <Text style={styles.playerMiniName}>{p.name}</Text>
                    </View>
                  ))}
                  {[...Array(Math.max(0, 4 - playersReady))].map((_, i) => (
                    <View key={`w-${i}`} style={styles.playerMini}>
                      <View style={[styles.avatar, { backgroundColor: "#222" }]}>
                        <Text style={styles.avatarText}>?</Text>
                      </View>
                      <Text style={styles.playerMiniName}>Waiting...</Text>
                    </View>
                  ))}
                </View>
              </View>
            </>
          )}

          {/* countdown */}
          {phase === "countdown" && (
            <View style={[styles.card, { alignItems: "center", marginTop: 40 }]}>
              <Text style={styles.bigTimer}>{countdown ? `${countdown}s` : 'Waiting'}</Text>
              <Text style={styles.cardSub}>Game starting...</Text>
            </View>
          )}

          {/* phases */}
          {["phase1", "phase1-input", "phase2", "phase3"].includes(phase) && (
            <View style={{ width: "100%", marginTop: 12 }}>
              <View style={styles.phaseHeader}>
                <Text style={styles.phaseLabel}>
                  {phase === "phase1" || phase === "phase1-input" ? "PHASE 1: Memory" : phase === "phase2" ? "PHASE 2: Stability" : "PHASE 3: Final Defuse"}
                </Text>
                {phase !== "phase1" && <Text style={styles.phaseTimer}>{timeLeft}s</Text>}
                <Text style={styles.phaseTotal}>Total: {phase1Score + phase2Score + phase3Score}</Text>
              </View>

              <Animated.View style={[styles.card, { marginTop: 8, shadowColor: cardGlowColor, shadowRadius: cardShadowRadius }]}>
                {/* Bomb icon on top-right */}
                <View style={styles.bombBadge}><Text style={{ fontSize: 22 }}>💣</Text></View>

                {/* Phase 1 UI */}
                {(phase === "phase1" || phase === "phase1-input") && (
                  <View style={{ alignItems: "center", marginTop: 50 }}>
                    {showSeq ? (
                      <Animated.View style={{ transform: [{ scale: pulse }], marginBottom: 16 }}>
                        <Text style={styles.helpText}>MEMORIZE THIS SEQUENCE</Text>
                        <View style={{ flexDirection: "row", marginTop: 20 }}>
                          {phase1Sequence.map((w, idx) => {
                            const wire = WIRE_COLORS.find((x) => x.name === w);
                            const colorVariant = ["color", "dull", "brightness"][blinkIndex];
                            const wc = wire ? wire[colorVariant] : "#333";

                            return (
                              <View
                                key={idx}
                                style={[styles.seqBox,{
                                  width: 60,
                                  height: 60,
                                  borderRadius: 8,
                                  marginHorizontal: 6,
                                  backgroundColor: wc,
                                }]}
                              />

                            );
                          })}
                        </View>
                      </Animated.View>
                    ) : (
                      <View style={{ width: "100%" }}>
                        <Text style={styles.helpText}>TAP THE WIRES IN ORDER</Text>
                        <View style={styles.wireRow}>
                          {WIRE_COLORS.map((wire) => (
                            <TouchableOpacity
                              key={wire.name}
                              onPress={() => handleWireTapPhase1(wire.name)}
                              style={[styles.wireBtn, { backgroundColor: wire.color }]}
                              activeOpacity={0.8}
                            >
                              <Text style={styles.wireText}>{wire.name.toUpperCase()}</Text>
                            </TouchableOpacity>
                          ))}
                        </View>
                        <Text style={styles.helpTextSmall}>
                          Progress: {playerSequence.length}/{phase1Sequence.length}
                        </Text>
                      </View>
                    )}
                  </View>
                )}

                {/* Phase 2 UI */}
                {phase === "phase2" && (
                  <View>
                    <Text style={styles.helpText}>CUT STABLE (SLOW) WIRES</Text>
                    <View style={styles.wireRow}>
                      {WIRE_COLORS.map((wire) => {
                        const isUnstable = unstable.has(wire.name);
                        const isCut = cutWires.has(wire.name);

                        // Determine blinking state
                        let colorVariant = "color";
                        if (isUnstable) {
                          colorVariant = fastBlink ? "brightness" : "dull";
                        } else if (isCut) {
                          colorVariant = slowBlink ? "brightness" : "dull";
                        }

                        const backgroundColor = wire[colorVariant];

                        return (
                          <TouchableOpacity
                            key={wire.name}
                            disabled={isCut}
                            onPress={() => handleWireCutPhase2(wire.name)}
                            style={[
                              styles.wireBtn,
                              {
                                backgroundColor,
                                opacity: isCut ? 0.6 : 1,
                              },
                            ]}
                            activeOpacity={0.8}
                          >
                            <Text style={styles.wireText}>
                              {isCut ? "CUT" : wire.name.toUpperCase()}
                            </Text>
                          </TouchableOpacity>
                        );
                      })}
                    </View>
                  </View>
                )}

                {/* Phase 3 UI */}
                {phase === "phase3" && (
                  <View>
                    <Text style={styles.helpText}>{phase3Clue}</Text>
                    <Text style={[styles.helpTextSmall, { marginBottom: 10 }]}>Choose carefully!</Text>
                    <View style={styles.wireRow}>
                      {WIRE_COLORS.map((wire) => (
                        <TouchableOpacity
                          key={wire.name}
                          onPress={() => handleFinalDefuse(wire.name)}
                          style={[styles.wireBtn, { backgroundColor: wire.color }]}
                          activeOpacity={0.85}
                        >
                          <Text style={styles.wireText}>{wire.name.toUpperCase()}</Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </View>
                )}
              </Animated.View>
            </View>
          )}

        </ScrollView>

        {/* completed */}
        {phase === "completed" && (
          <View style={styles.centerBox}>
            <Animated.View style={[styles.card, animatedStyle]}>
              <Text style={{color: "#fff", fontSize: 52}}>Completed</Text>
            <Text style={[styles.subText, {color: "#fff"}]}>Waiting for result!</Text>
            </Animated.View>
          </View>
        )}
        {/* finished */}
        {phase === "finished" && (
          <>
            <View style={[styles.card, { marginTop: 12 }]}>
              <Text style={styles.finishedTitle}>MISSION COMPLETE!</Text>
              <Text style={styles.finishedSub}>Final Results</Text>
            </View>

            <View style={[styles.card, { marginTop: 12 }]}>
              <Text style={styles.sectionTitle}>Final Rankings</Text>
              <FlatList
                data={players}
                keyExtractor={(i) => String(i.id)}
                renderItem={({ item, index }) => {
                  const rank = index + 1;
                  const isUser = item.id === 1;
                  return (
                    <View style={[styles.resultRow, isUser ? styles.userRow : styles.oppRow]}>
                      <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Text style={styles.rank}>#{rank}</Text>
                        {index === 0 ? (
                        <Trophy color="#ffd43b" size={20} />
                        ) : index === 1 ? (
                        <Medal color="#adb5bd" size={20} />
                        ) : null}
                        <View style={{ marginLeft: 8 }}>
                          <Text style={styles.playerName}>{item.name}</Text>
                          <Text style={styles.smallMeta}>{item.time ? `Time ${item.time}s` : "Eliminated"  }</Text>
                        </View>
                      </View>
                      <View>
                        <Text style={styles.playerScore}>{item.score}</Text>
                        {/* <Text style={styles.smallMeta}>{item.winnings ?? 0}</Text> */}
                      </View>
                    </View>
                  );
                }}
              />
            </View>

            <View style={{ flexDirection: "row", marginTop: 40, gap: 12 }}>
              <TouchableOpacity style={[styles.actionBtn, { backgroundColor: "#FFD04C" }]} onPress={()=> resetMatchmaking(false)}>
                <Text style={{ color: "#fff" }}>Back to Lobby</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.actionBtn, { backgroundColor: "#0EA5E9" }]} onPress={() => resetMatchmaking(true)}>
                <Text style={{ color: "#fff" }}>Play Again</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>

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
  screen: { flex: 1, backgroundColor: "#050810" },
  background: { ...StyleSheet.absoluteFillObject },
  container: {
    paddingTop: 36,
    paddingHorizontal: 18,
    paddingBottom: 60,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  backBtn: { padding: 6 },
  backText: { color: "#9fbfdc", fontSize: 14 },
  title: { color: "#00D3FF", fontSize: 20, fontWeight: "bold" },
  subtitle: { color: "#9fbfdc", fontSize: 12, textAlign: "center" },
  card: {
    padding: 16,
    borderRadius: 14,
    backgroundColor: "#0f1724",
    shadowColor: "#00B8FF",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 12,
    elevation: 12,
  },
  bigTimer: { fontSize: 48, color: "#7C8BFF", fontWeight: "800", textAlign: "center" },
  cardSub: { color: "#9fbfdc", textAlign: "center", marginTop: 6 },
  phaseGrid: { flexDirection: "row", justifyContent: "space-between", marginTop: 20 },
  phaseBox: { width: "32%", backgroundColor: "#071022", padding: 10, borderRadius: 10, alignItems: "center" },
  phaseTitle: { color: "#A3BFFA", fontWeight: "700" },
  phaseDesc: { color: "#9fbfdc", fontSize: 12 },
  phaseSmall: { color: "#f0cd88ff", fontSize: 12, marginTop: 4 },

  sectionTitle: { color: "#E6F7FF", fontWeight: "700", fontSize: 16, marginBottom: 8 },
  playersWrap: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  playerMini: { width: "48%", flexDirection: "row", alignItems: "center", marginBottom: 8 },
  avatar: { width: 42, height: 42, borderRadius: 20, backgroundColor: "#123047", justifyContent: "center", alignItems: "center" },
  avatarText: { color: "#00D3FF", fontWeight: "700" },
  playerMiniName: { color: "#fff", marginLeft: 10 },

  phaseHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 6 },
  phaseLabel: { color: "#CDEEFF", fontWeight: "700" },
  phaseTimer: { color: "#FF9B9B", fontWeight: "700" },
  phaseTotal: { color: "#A9F5FF", fontWeight: "700" },

  bombBadge: { position: "absolute", right: 12, top: 10, width: 48, height: 48, borderRadius: 24, alignItems: "center", justifyContent: "center", backgroundColor: "rgba(255,255,255,0.03)" },

  helpText: { color: "#BFDFFF", fontWeight: "700", textAlign: "center" },
  helpTextSmall: { color: "#9fbfdc", textAlign: "center", marginTop: 8 },
  seqBox: { width: 40, height: 60, borderRadius: 8, borderWidth: 2, borderColor: "rgba(255,255,255,0.06)" },
  wireRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 12 },
  wireBtn: { width: "23%", height: 92, borderRadius: 12, alignItems: "center", justifyContent: "center", shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.35, elevation: 6 },
  wireText: { color: "#fff", fontWeight: "800", fontSize: 12 },

  finishedTitle: { color: "#E6F7FF", fontSize: 20, fontWeight: "900", textAlign: "center" },
  finishedSub: { color: "#9fbfdc", textAlign: "center", marginTop: 6 },

  resultRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 12, borderRadius: 10 },
  userRow: { backgroundColor: "rgba(14,165,233,0.06)", paddingHorizontal: 12 },
  oppRow: { backgroundColor: "rgba(255,255,255,0.02)", paddingHorizontal: 12 },

  rank: { color: "#9fbfdc", fontWeight: "800", width: 36 },
  playerName: { color: "#fff", fontWeight: "700" },
  playerScore: { color: "#7EE1FF", fontWeight: "900" },
  smallMeta: { color: "#9fbfdc", fontSize: 12 },

  actionBtn: { flex: 1, padding: 14, borderRadius: 10, alignItems: "center", justifyContent: "center" },

  explosionOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(0,0,0,0.85)", alignItems: "center", justifyContent: "center", zIndex: 9999 },
  explosionEmoji: { fontSize: 140 },
  gold: { backgroundColor: "#fff3bf" },
  silver: { backgroundColor: "#dee2e6" },
});
