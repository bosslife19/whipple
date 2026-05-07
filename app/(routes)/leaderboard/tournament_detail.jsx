import { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  RefreshControl,
  StyleSheet,
} from 'react-native';
import { router, Stack, useFocusEffect, useLocalSearchParams } from 'expo-router';
import axiosClient from '../../../axiosClient';
import { AntDesign, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

const BG = '#0A1931';
const ACCENT = '#FFD700';

export default function TournamentDetailScreen() {
  const { id } = useLocalSearchParams();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [detail, setDetail] = useState(null);
  const [err, setErr] = useState(null);
  const [countdownRemaining, setCountdownRemaining] = useState(null);
  const [expandedLobbies, setExpandedLobbies] = useState({});

  const toggleLobby = (lobbyId) => {
    setExpandedLobbies(prev => ({ ...prev, [lobbyId]: !prev[lobbyId] }));
  };

  const load = async () => {
    if (!id) return;
    setErr(null);
    try {
      const d = await axiosClient.get(`/tournament/${id}`);
      setDetail(d.data);
    } catch (e) {
      setErr(e?.response?.data?.message || e.message || 'Failed to load');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      load();
    }, [id])
  );

  useEffect(() => {
    if (!id || detail?.tournament?.status === 'completed') return;
    const t = setInterval(async () => {
      try {
        const d = await axiosClient.get(`/tournament/${id}`);
        setDetail(d.data);
      } catch {
        /* ignore poll errors */
      }
    }, 3000);
    return () => clearInterval(t);
  }, [id, detail?.tournament?.status]);

  const onRefresh = () => {
    setRefreshing(true);
    load();
  };

  const t = detail?.tournament;
  const me = t?.me;
  const activeMatch = t?.active_match;
  const activeLobby = t?.active_lobby;

  useEffect(() => {
    if (!activeLobby || activeLobby.status !== 'countdown') {
      setCountdownRemaining(null);
      return;
    }
    const started = new Date(activeLobby.countdown_started_at).getTime();
    const sec = activeLobby.countdown_seconds || 20;

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const diff = Math.ceil((started + sec * 1000 - now) / 1000);
      if (diff > 0) {
        setCountdownRemaining(diff);
      } else {
        setCountdownRemaining(0);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [activeLobby]);

  const handleJoin = () => {
    if (!activeMatch) return;
    // Map backend keys to expo-router paths
    const gamePaths = {
      tap_rush: '/(routes)/skillgame/handspeed',
      color_switch: '/(routes)/skillgame/colorswitch',
      defuse_x: '/(routes)/skillgame/defusex',
      math_clash: '/(routes)/skillgame/mathclash',
      quiz: '/(routes)/skillgame/quiz'
    };
    const path = gamePaths[activeMatch.game_key];
    if (path) {
      router.push(`${path}?game_type=tournament&tournament_id=${t.id}`);
    }
  };

  return (
    <>
      <StatusBar style="light" />
      <Stack.Screen
        options={{
          headerShown: true,
          title: t?.title || 'Tournament Arena',
          headerStyle: { backgroundColor: BG },
          headerTintColor: 'white',
          headerTitleStyle: { fontWeight: '800', fontSize: 18, color: 'white' },
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.replace('/(routes)/leaderboard/tournament')} style={{ paddingLeft: 12 }}>
              <AntDesign name="arrow-left" size={24} color="white" />
            </TouchableOpacity>
          ),
        }}
      />
      <View style={{ flex: 1, backgroundColor: '#F8FAFC' }}>
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingBottom: 120 }}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
          <View style={{ padding: 16 }}>
            {loading && !refreshing && (
              <View style={{ padding: 40, alignItems: 'center' }}>
                <ActivityIndicator size="large" color={BG} />
              </View>
            )}

            {err && !loading && <Text style={{ color: '#B91C1C', marginBottom: 12 }}>{err}</Text>}

            {t && (
              <>
                {/* Status Bar */}
                <View style={styles.statusBar}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={styles.tournamentTitle}>{t.title}</Text>
                    <View style={[styles.badge, { backgroundColor: t.status === 'active' ? '#ECFDF5' : '#F1F5F9' }]}>
                      <Text style={[styles.badgeText, { color: t.status === 'active' ? '#059669' : '#64748B' }]}>{t.status.toUpperCase()}</Text>
                    </View>
                  </View>
                  <View style={styles.statsRow}>
                    <Text style={styles.statItem}>Active: {t.active_players}</Text>
                    <Text style={styles.statItem}>Eliminated: {t.eliminated_players}</Text>
                  </View>
                </View>

                {/* Personal Status & Action Card */}
                {me && t.status === 'active' && (
                  <View style={[styles.actionCard, me.eliminated ? styles.cardEliminated : styles.cardActive]}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                      <View style={[styles.iconCircle, { backgroundColor: me.eliminated ? '#FEE2E2' : '#DBEAFE' }]}>
                        <MaterialIcons name={me.eliminated ? "block" : "stars"} size={24} color={me.eliminated ? "#DC2626" : "#2563EB"} />
                      </View>
                      <View>
                        <Text style={[styles.cardHeading, { color: me.eliminated ? '#991B1B' : '#1E40AF' }]}>
                          {me.eliminated ? 'Eliminated' : 'Still in the Running!'}
                        </Text>
                        <Text style={styles.cardSub}>
                          {me.eliminated ? 'Better luck next time. Watch the results below.' : 'Prepare for the next challenge.'}
                        </Text>
                      </View>
                    </View>

                    {!me.eliminated && t.status === 'active' && activeMatch && activeLobby?.status === 'countdown' && countdownRemaining > 0 && (
                      <TouchableOpacity onPress={handleJoin} style={styles.joinBtn}>
                        <FontAwesome5 name="play" size={14} color="white" style={{ marginRight: 8 }} />
                        <Text style={styles.joinBtnText}>JOIN {activeMatch.game_name.toUpperCase()} ({countdownRemaining}s)</Text>
                      </TouchableOpacity>
                    )}

                    {!me.eliminated && (!activeLobby || activeLobby.status !== 'countdown' || countdownRemaining === 0) && t.status === 'active' && (
                      <View style={styles.waitingContainer}>
                        <ActivityIndicator size="small" color="#2563EB" />
                        <Text style={styles.waitingText}>
                          {activeLobby?.status === 'live' || countdownRemaining === 0
                            ? 'Game is running wait for the next game...'
                            : 'Waiting for admin to start the next stage...'}
                        </Text>
                      </View>
                    )}
                  </View>
                )}

                {/* Ranking Board */}
                <Text style={styles.sectionHeader}>Tournament Standings</Text>
                <View style={styles.board}>
                  {t.players.map((p, idx) => {
                    const isTop1 = p.current_rank === 1 && p.total_score > 0;
                    const isTop2 = p.current_rank === 2 && p.total_score > 0;
                    const isTop3 = p.current_rank === 3 && p.total_score > 0;
                    const rankColor = isTop1 ? '#FFD700' : isTop2 ? '#C0C0C0' : isTop3 ? '#CD7F32' : '#94A3B8';

                    return (
                      <View key={p.user_id} style={[styles.playerRow, p.eliminated && styles.playerEliminated]}>
                        <View style={styles.playerInfo}>
                          <Text style={[styles.playerRank, { color: rankColor, width: 32 }]}>
                            {p.current_rank}
                            {(isTop1 || isTop2 || isTop3) && <Text style={{ fontSize: 12 }}> 🏆</Text>}
                          </Text>
                          <View>
                            <Text style={[styles.playerName, p.eliminated && styles.textEliminated, (isTop1 || isTop2 || isTop3) && { color: rankColor }]}>{p.name}</Text>
                            {p.eliminated && (
                              <View style={styles.eliminatedTagContainer}>
                                <Text style={styles.eliminatedTagText}>ELIMINATED</Text>
                              </View>
                            )}
                          </View>
                        </View>
                        <View style={{ alignItems: 'flex-end' }}>
                          <Text style={[styles.playerScore, (isTop1 || isTop2 || isTop3) && { color: rankColor }]}>{p.total_score} pts</Text>
                          {p.user_id === me?.user_id && <Text style={[styles.meTag, { marginTop: 4 }]}>YOU</Text>}
                        </View>
                      </View>
                    );
                  })}
                </View>

                {/* Last Lobby Results */}
                {t.last_lobby && (
                  <>
                    <Text style={styles.sectionHeader}>Last Round Results: {t.last_lobby.label || t.last_lobby.game_key}</Text>
                    <View style={styles.board}>
                      {t.last_lobby.leaderboard.map((s) => {
                        const isPlayerEliminated = t.players.find(p => p.user_id === s.user_id)?.eliminated;
                        return (
                          <View key={s.user_id} style={styles.playerRow}>
                            <View style={styles.playerInfo}>
                              <Text style={styles.playerRank}>{s.rank}</Text>
                              <Text style={[styles.playerName, isPlayerEliminated && styles.textEliminated]}>{s.name}</Text>
                            </View>
                            <View style={{ alignItems: 'flex-end' }}>
                              <Text style={styles.playerScore}>{s.score} pts</Text>
                              {isPlayerEliminated && (
                                <View style={styles.eliminatedTagContainer}>
                                  <Text style={styles.eliminatedTagText}>ELIMINATED</Text>
                                </View>
                              )}
                            </View>
                          </View>
                        );
                      })}
                    </View>
                  </>
                )}

                {/* Games Played Accordion */}
                {t.lobbies && t.lobbies.length > 0 && (
                  <>
                    <Text style={[styles.sectionHeader, { marginTop: 12 }]}>Games Played</Text>
                    {[...t.lobbies].sort((a, b) => b.id - a.id).map((lobby) => {
                      const isExpanded = expandedLobbies[lobby.id];
                      const gameName = lobby.game_key.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
                      const lobbyTitle = lobby.label ? `${lobby.label} (${gameName})` : gameName;

                      return (
                        <View key={lobby.id} style={styles.accordionContainer}>
                          <TouchableOpacity
                            style={styles.accordionHeader}
                            onPress={() => toggleLobby(lobby.id)}
                            activeOpacity={0.7}
                          >
                            <View>
                              <Text style={styles.accordionTitle}>{lobbyTitle}</Text>
                              <Text style={styles.accordionSub}>Total Players: {lobby.leaderboard?.length || 0}</Text>
                            </View>
                            <MaterialIcons name={isExpanded ? "keyboard-arrow-up" : "keyboard-arrow-down"} size={24} color="#64748B" />
                          </TouchableOpacity>

                          {isExpanded && (
                            <View style={styles.accordionBody}>
                              {lobby.leaderboard && lobby.leaderboard.length > 0 ? (
                                lobby.leaderboard.map((s) => {
                                  const isPlayerEliminated = t.players.find(p => p.user_id === s.user_id)?.eliminated;
                                  return (
                                    <View key={s.user_id} style={styles.accordionRow}>
                                      <View style={styles.playerInfo}>
                                        <Text style={styles.playerRank}>{s.rank}</Text>
                                        <Text style={[styles.playerName, isPlayerEliminated && styles.textEliminated]}>{s.name}</Text>
                                      </View>
                                      <View style={{ alignItems: 'flex-end' }}>
                                        <Text style={styles.playerScore}>{s.score} pts</Text>
                                      </View>
                                    </View>
                                  );
                                })
                              ) : (
                                <Text style={styles.noDataText}>No scores recorded yet.</Text>
                              )}
                            </View>
                          )}
                        </View>
                      );
                    })}
                  </>
                )}
              </>
            )}
          </View>
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  statusBar: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  tournamentTitle: {
    color: BG,
    fontSize: 22,
    fontWeight: '900',
    flex: 1,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '800',
  },
  statsRow: {
    flexDirection: 'row',
    marginTop: 12,
    gap: 16,
  },
  statItem: {
    color: '#64748B',
    fontSize: 13,
    fontWeight: '600',
  },
  actionCard: {
    borderRadius: 24,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
  },
  cardActive: {
    backgroundColor: '#EFF6FF',
    borderColor: '#BFDBFE',
  },
  cardEliminated: {
    backgroundColor: '#FFF1F2',
    borderColor: '#FECDD3',
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardHeading: {
    fontSize: 18,
    fontWeight: '800',
  },
  cardSub: {
    color: '#64748B',
    fontSize: 13,
    marginTop: 2,
  },
  joinBtn: {
    backgroundColor: '#2563EB',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 16,
    marginTop: 20,
    elevation: 4,
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  joinBtnText: {
    color: '#fff',
    fontWeight: '900',
    fontSize: 12,
  },
  waitingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    gap: 10,
    padding: 12,
    backgroundColor: 'rgba(37, 99, 235, 0.05)',
    borderRadius: 12,
  },
  waitingText: {
    color: '#2563EB',
    fontSize: 13,
    fontWeight: '700',
  },
  sectionHeader: {
    color: BG,
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  board: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 8,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  playerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  playerEliminated: {
    backgroundColor: '#FAFAFA',
  },
  playerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  playerRank: {
    color: '#94A3B8',
    fontWeight: '800',
    width: 24,
  },
  playerName: {
    color: '#0F172A',
    fontWeight: '700',
    fontSize: 15,
  },
  textEliminated: {
    color: '#94A3B8',
    textDecorationLine: 'line-through',
  },
  eliminatedTagContainer: {
    backgroundColor: '#FEE2E2',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginTop: 4,
    alignSelf: 'flex-start',
  },
  eliminatedTagText: {
    color: '#DC2626',
    fontSize: 9,
    fontWeight: '900',
  },
  playerScore: {
    color: BG,
    fontWeight: '800',
    fontSize: 14,
  },
  meTag: {
    backgroundColor: ACCENT,
    color: BG,
    fontSize: 10,
    fontWeight: '900',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  accordionContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    overflow: 'hidden',
  },
  accordionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  accordionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
  },
  accordionSub: {
    fontSize: 13,
    color: '#64748B',
    marginTop: 4,
    fontWeight: '600',
  },
  accordionBody: {
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    backgroundColor: '#FAFAFA',
    padding: 8,
  },
  accordionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  noDataText: {
    padding: 16,
    textAlign: 'center',
    color: '#94A3B8',
    fontStyle: 'italic',
  },
});
