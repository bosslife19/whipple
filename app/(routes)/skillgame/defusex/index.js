import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  ScrollView,
} from "react-native";

const WIRE_COLORS = [
  { name: "blue", color: "#3B82F6" },
  { name: "red", color: "#EF4444" },
  { name: "green", color: "#10B981" },
  { name: "yellow", color: "#EAB308" },
];

const DefuseX = ({ onBack }) => {
  const [gamePhase, setGamePhase] = useState("waiting");
  const [matchmakingTimer, setMatchmakingTimer] = useState(10);
  const [countdownTimer, setCountdownTimer] = useState(5);
  const [players, setPlayers] = useState([
    { id: 1, name: "You", score: 0, eliminated: false },
  ]);
  const [playersReady, setPlayersReady] = useState(1);

  const [phase1Sequence, setPhase1Sequence] = useState([]);
  const [playerSequence, setPlayerSequence] = useState([]);
  const [showSequence, setShowSequence] = useState(false);
  const [timeLeft, setTimeLeft] = useState(20);
  const [unstableWires, setUnstableWires] = useState(new Set());
  const [cutWires, setCutWires] = useState(new Set());
  const [phase, setPhase] = useState(1);
  const [showExplosion, setShowExplosion] = useState(false);
  const [phase3Clue, setPhase3Clue] = useState("");
  const [phase3CorrectWire, setPhase3CorrectWire] = useState("blue");

  // Simulate matchmaking
  useEffect(() => {
    if (gamePhase === "waiting" && matchmakingTimer > 0) {
      const timer = setTimeout(() => {
        setMatchmakingTimer((t) => t - 1);
        if (playersReady < 4 && Math.random() > 0.5) {
          const newPlayerId = playersReady + 1;
          setPlayersReady(newPlayerId);
          setPlayers((prev) => [
            ...prev,
            { id: newPlayerId, name: `Player ${newPlayerId}`, score: 0 },
          ]);
        }
      }, 1000);
      return () => clearTimeout(timer);
    } else if (matchmakingTimer === 0 || playersReady >= 4) {
      setGamePhase("countdown");
    }
  }, [gamePhase, matchmakingTimer, playersReady]);

  // Countdown to start
  useEffect(() => {
    if (gamePhase === "countdown" && countdownTimer > 0) {
      const timer = setTimeout(() => setCountdownTimer((t) => t - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdownTimer === 0) {
      startPhase1();
    }
  }, [gamePhase, countdownTimer]);

  const startPhase1 = () => {
    const seq = [];
    for (let i = 0; i < 4; i++) {
      seq.push(WIRE_COLORS[Math.floor(Math.random() * 4)].name);
    }
    setPhase1Sequence(seq);
    setPlayerSequence([]);
    setShowSequence(true);
    setGamePhase("phase1");
    setTimeout(() => {
      setShowSequence(false);
      setGamePhase("phase1-input");
      setTimeLeft(15);
    }, 3000);
  };

  const handleWireTapPhase1 = (wire) => {
    if (gamePhase !== "phase1-input") return;
    const newSeq = [...playerSequence, wire];
    setPlayerSequence(newSeq);
    const isCorrect = phase1Sequence[newSeq.length - 1] === wire;

    if (!isCorrect) {
      explode();
      return;
    }
    if (newSeq.length === phase1Sequence.length) {
      setPhase(2);
      startPhase2();
    }
  };

  const startPhase2 = () => {
    const unstable = new Set();
    const shuffled = [...WIRE_COLORS].sort(() => Math.random() - 0.5);
    unstable.add(shuffled[0].name);
    setUnstableWires(unstable);
    setCutWires(new Set());
    setGamePhase("phase2");
    setTimeLeft(15);
  };

  const handleWireCutPhase2 = (wire) => {
    if (gamePhase !== "phase2" || cutWires.has(wire)) return;
    const newCut = new Set(cutWires);
    newCut.add(wire);
    setCutWires(newCut);
    if (unstableWires.has(wire)) {
      explode();
    } else if (newCut.size >= 3) {
      startPhase3();
    }
  };

  const startPhase3 = () => {
    const clueIndex = Math.floor(Math.random() * 4);
    const clue = `Cut the wire that blinked ${["first", "second", "third", "fourth"][clueIndex]} in Phase 1`;
    setPhase3Clue(clue);
    setPhase3CorrectWire(phase1Sequence[clueIndex]);
    setGamePhase("phase3");
    setTimeLeft(15);
  };

  const handleFinalDefuse = (wire) => {
    if (wire === phase3CorrectWire) {
      setGamePhase("finished");
    } else {
      explode();
    }
  };

  const explode = () => {
    setShowExplosion(true);
    setTimeout(() => {
      setShowExplosion(false);
      setGamePhase("finished");
    }, 2000);
  };

  const resetGame = () => {
    setGamePhase("waiting");
    setPlayers([{ id: 1, name: "You", score: 0, eliminated: false }]);
    setPlayersReady(1);
    setMatchmakingTimer(10);
    setCountdownTimer(5);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {showExplosion && (
        <View style={styles.overlay}>
          <Text style={styles.explosion}>💥</Text>
        </View>
      )}

      {gamePhase === "waiting" && (
        <View style={styles.centered}>
          <Text style={styles.title}>Finding players...</Text>
          <Text style={styles.timer}>{matchmakingTimer}s</Text>
          <View style={styles.playersContainer}>
            {players.map((p) => (
              <View key={p.id} style={styles.playerBox}>
                <Text style={styles.playerAvatar}>{p.id}</Text>
                <Text style={styles.playerName}>{p.name}</Text>
              </View>
            ))}
          </View>
        </View>
      )}

      {gamePhase === "countdown" && (
        <View style={styles.centered}>
          <Text style={styles.bigNumber}>{countdownTimer}</Text>
          <Text style={styles.subtitle}>Game starting...</Text>
        </View>
      )}

      {(gamePhase === "phase1" || gamePhase === "phase1-input") && (
        <View style={styles.centered}>
          {showSequence ? (
            <Text style={styles.subtitle}>Memorize the sequence!</Text>
          ) : (
            <Text style={styles.subtitle}>Repeat the sequence!</Text>
          )}
          <View style={styles.wiresRow}>
            {WIRE_COLORS.map((wire) => (
              <TouchableOpacity
                key={wire.name}
                onPress={() => handleWireTapPhase1(wire.name)}
                disabled={showSequence}
                style={[styles.wire, { backgroundColor: wire.color }]}
              >
                <Text style={styles.wireText}>{wire.name.toUpperCase()}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      {gamePhase === "phase2" && (
        <View style={styles.centered}>
          <Text style={styles.subtitle}>Cut only stable wires!</Text>
          <View style={styles.wiresRow}>
            {WIRE_COLORS.map((wire) => (
              <TouchableOpacity
                key={wire.name}
                onPress={() => handleWireCutPhase2(wire.name)}
                style={[
                  styles.wire,
                  {
                    backgroundColor: wire.color,
                    opacity: cutWires.has(wire.name) ? 0.3 : 1,
                  },
                ]}
              >
                <Text style={styles.wireText}>
                  {cutWires.has(wire.name) ? "CUT" : wire.name.toUpperCase()}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      {gamePhase === "phase3" && (
        <View style={styles.centered}>
          <Text style={styles.subtitle}>{phase3Clue}</Text>
          <View style={styles.wiresRow}>
            {WIRE_COLORS.map((wire) => (
              <TouchableOpacity
                key={wire.name}
                onPress={() => handleFinalDefuse(wire.name)}
                style={[styles.wire, { backgroundColor: wire.color }]}
              >
                <Text style={styles.wireText}>{wire.name.toUpperCase()}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      {gamePhase === "finished" && (
        <View style={styles.centered}>
          <Text style={styles.title}>Mission Complete!</Text>
          <Text style={styles.subtitle}>Game Over</Text>
          <TouchableOpacity style={styles.button} onPress={resetGame}>
            <Text style={styles.buttonText}>Play Again</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flexGrow: 1, backgroundColor: "#000", padding: 20 },
  centered: { alignItems: "center", justifyContent: "center", marginTop: 60 },
  title: { fontSize: 26, color: "#00B3D2", fontWeight: "bold" },
  subtitle: { fontSize: 18, color: "#ccc", marginBottom: 20 },
  timer: { fontSize: 40, color: "#fff", fontWeight: "bold" },
  bigNumber: { fontSize: 100, color: "#00B3D2", fontWeight: "bold" },
  wiresRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 10,
  },
  wire: {
    width: 120,
    height: 100,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
  },
  wireText: { color: "#fff", fontWeight: "bold" },
  playersContainer: { flexDirection: "row", flexWrap: "wrap", marginTop: 20 },
  playerBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#111",
    padding: 10,
    borderRadius: 10,
    margin: 5,
  },
  playerAvatar: {
    backgroundColor: "#1A4051",
    color: "#00B3D2",
    width: 40,
    height: 40,
    borderRadius: 20,
    textAlign: "center",
    textAlignVertical: "center",
    fontWeight: "bold",
    marginRight: 10,
  },
  playerName: { color: "#fff" },
  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.9)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  explosion: { fontSize: 150 },
  button: {
    backgroundColor: "#00B3D2",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
});

export default DefuseX;
