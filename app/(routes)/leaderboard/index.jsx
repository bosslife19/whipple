import { useCallback, useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator, ScrollView, Text, View,
  TouchableOpacity, RefreshControl, Modal, FlatList, Pressable,
} from 'react-native';
import { router, Stack, useFocusEffect } from 'expo-router';
import axiosClient from '../../../axiosClient';
import { AntDesign, Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';

const BG = '#0A1931';
const CARD = '#ffffff';

// ─── Status Banner ────────────────────────────────────────────────────────────
function StatusBanner({ weekStatus, period }) {
  if (!weekStatus || weekStatus.is_active) return null;
  const { reason } = weekStatus;
  const cfg = {
    paused: { bg: '#FFF7ED', border: '#FDBA74', icon: 'pause-circle', color: '#EA580C', title: 'Leaderboard Paused', sub: 'Scoring is frozen — no new points are being awarded.' },
    ended: { bg: '#F1F5F9', border: '#CBD5E1', icon: 'time-outline', color: '#64748B', title: 'Week Has Ended', sub: `Period ended on ${period?.end}.` },
    not_started: { bg: '#EFF6FF', border: '#93C5FD', icon: 'calendar-outline', color: '#2563EB', title: 'Week Not Started', sub: `Scoring starts on ${period?.start}.` },
    no_week: { bg: '#FFF1F2', border: '#FECDD3', icon: 'alert-circle-outline', color: '#E11D48', title: 'No Active Week', sub: 'The admin has not configured a leaderboard week yet.' },
  }[reason] ?? { bg: '#F1F5F9', border: '#CBD5E1', icon: 'information-circle-outline', color: '#64748B', title: 'Inactive', sub: '' };

  return (
    <View style={{ backgroundColor: cfg.bg, borderWidth: 1, borderColor: cfg.border, borderRadius: 14, padding: 14, marginBottom: 12, flexDirection: 'row', alignItems: 'flex-start', gap: 10 }}>
      <Ionicons name={cfg.icon} size={20} color={cfg.color} style={{ marginTop: 1 }} />
      <View style={{ flex: 1 }}>
        <Text style={{ fontWeight: '700', fontSize: 13, color: '#1E293B', marginBottom: 2 }}>{cfg.title}</Text>
        <Text style={{ fontSize: 12, color: '#475569', lineHeight: 17 }}>{cfg.sub}</Text>
      </View>
    </View>
  );
}

// ─── Week Picker Dropdown ─────────────────────────────────────────────────────
function WeekPicker({ weeks, selectedId, onSelect }) {
  const [open, setOpen] = useState(false);
  const selected = weeks.find(w => w.id === selectedId) ?? weeks.find(w => w.is_current);

  return (
    <>
      <TouchableOpacity
        onPress={() => setOpen(true)}
        style={{ flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: CARD, borderRadius: 10, paddingHorizontal: 12, paddingVertical: 8, borderWidth: 1, borderColor: '#E2E8F0' }}
      >
        <Text style={{ fontSize: 12, color: '#334155', fontWeight: '600', maxWidth: 160 }} numberOfLines={1}>
          {selected?.label ?? 'Select week'}
        </Text>
        <Ionicons name="chevron-down" size={14} color="#64748b" />
      </TouchableOpacity>

      <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
        <Pressable style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' }} onPress={() => setOpen(false)}>
          <View style={{ backgroundColor: CARD, borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 16, maxHeight: '60%' }}>
            <Text style={{ fontWeight: '800', fontSize: 15, color: BG, marginBottom: 12 }}>Select Week</Text>
            <FlatList
              data={weeks}
              keyExtractor={w => String(w.id)}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => { setOpen(false); onSelect(item); }}
                  style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderColor: '#F1F5F9', gap: 10 }}
                >
                  <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: item.is_current ? '#22C55E' : '#CBD5E1' }} />
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontWeight: '700', color: '#0F172A', fontSize: 13 }}>{item.label}</Text>
                    <Text style={{ color: '#64748b', fontSize: 11, marginTop: 1 }}>{item.start} → {item.end}</Text>
                  </View>
                  {item.id === selectedId && <Ionicons name="checkmark" size={18} color={BG} />}
                </TouchableOpacity>
              )}
            />
          </View>
        </Pressable>
      </Modal>
    </>
  );
}

// ─── Main Screen ──────────────────────────────────────────────────────────────
export default function LeaderboardScreen() {
  const [tab, setTab] = useState('frequent');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [data, setData] = useState(null);
  const [err, setErr] = useState(null);
  const [selectedWeekId, setSelectedWeekId] = useState(null); // null = current

  const load = async (weekId = null) => {
    setErr(null);
    try {
      const params = weekId ? `?week_id=${weekId}` : '';
      const res = await axiosClient.get(`/whipple-leaderboard${params}`);
      setData(res.data);
      // On first load set selectedWeekId to current week id
      if (!weekId) {
        const cur = res.data.weeks?.find(w => w.is_current);
        if (cur) setSelectedWeekId(cur.id);
      }
    } catch (e) {
      setErr(e?.response?.data?.message || e.message || 'Failed to load');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useFocusEffect(useCallback(() => { setLoading(true); load(null); }, []));

  const onRefresh = () => { setRefreshing(true); load(selectedWeekId); };

  const handleWeekSelect = (week) => {
    const id = week.is_current ? null : week.id;
    setSelectedWeekId(week.id);
    setLoading(true);
    load(id);
  };

  const [expandedId, setExpandedId] = useState(null);

  const rows = tab === 'frequent' ? data?.most_frequent : data?.most_wins;
  const me = data?.me;
  const period = data?.period;
  const weekStatus = data?.week_status;
  const weeks = data?.weeks ?? [];
  const isCurrentWeek = !!(weeks.find(w => w.id === selectedWeekId)?.is_current);

  return (
    <>
      <StatusBar style="light" />
      <Stack.Screen
        options={{
          headerShown: true,
          title: 'Leaderboards',
          headerStyle: { backgroundColor: BG },
          headerTintColor: 'white',
          headerTitleStyle: { fontWeight: '800', fontSize: 18, color: 'white' },
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.replace('/(tabs)/home')} style={{ paddingLeft: 12 }}>
              <AntDesign name="arrow-left" size={24} color="white" />
            </TouchableOpacity>
          ),
          headerRight: () => weeks.length > 1 ? (
            <View style={{ paddingRight: 12 }}>
              <WeekPicker weeks={weeks} selectedId={selectedWeekId} onSelect={handleWeekSelect} />
            </View>
          ) : null,
        }}
      />
      <View style={{ flex: 1, backgroundColor: '#E8EDF2' }}>
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingBottom: 120 }}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
          <View style={{ alignItems: 'flex-end', paddingHorizontal: 16, marginTop: 12 }}>
            <TouchableOpacity
              onPress={() => router.push('/(routes)/leaderboard/tournament')}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#F59E0B',
                paddingHorizontal: 12,
                paddingVertical: 8,
                borderRadius: 20,
                elevation: 2,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.2,
                shadowRadius: 2,
              }}
            >
              <FontAwesome5 name="trophy" size={14} color="white" style={{ marginRight: 8 }} />
              <Text style={{ color: 'white', fontSize: 14, fontWeight: '800' }}>Tournament</Text>
            </TouchableOpacity>
          </View>
          <View style={{ padding: 16 }}>

            {/* Period card */}
            {period && (
              <View style={{ backgroundColor: CARD, borderRadius: 16, padding: 14, marginBottom: 12 }}>
                {period.label && <Text style={{ color: BG, fontWeight: '800', fontSize: 14, marginBottom: 2 }}>{period.label}</Text>}
                <Text style={{ color: '#64748b', fontSize: 12 }}>Period</Text>
                <Text style={{ color: '#0f172a', fontWeight: '700', fontSize: 14, marginTop: 2 }}>{period.start} → {period.end}</Text>
                {!isCurrentWeek && (
                  <View style={{ marginTop: 8, backgroundColor: '#F8FAFC', borderRadius: 8, paddingHorizontal: 8, paddingVertical: 4, alignSelf: 'flex-start' }}>
                    <Text style={{ fontSize: 11, color: '#64748b', fontWeight: '600' }}>📋 Historical Week</Text>
                  </View>
                )}
              </View>
            )}

            {/* Status banner — current week only */}
            {isCurrentWeek && <StatusBanner weekStatus={weekStatus} period={period} />}

            {/* My prompts — current week only */}
            {isCurrentWeek && me?.prompts?.length > 0 && me.prompts.map((p, i) => (
              <View key={i} style={{ backgroundColor: '#FFF7ED', borderRadius: 12, padding: 12, marginBottom: 8, borderWidth: 1, borderColor: '#FDBA74' }}>
                <Text style={{ color: '#9A3412', fontSize: 13, lineHeight: 18 }}>{p.text}</Text>
              </View>
            ))}

            {/* My standing */}
            {me?.frequent && (
              <View style={{ backgroundColor: CARD, borderRadius: 16, padding: 14, marginBottom: 12 }}>
                <Text style={{ color: '#64748b', fontSize: 12 }}>Your standing</Text>
                <Text style={{ color: '#0f172a', fontWeight: '700', marginTop: 4 }}>Frequent rank #{me.frequent.rank} · {Number(me.frequent.frequent).toFixed(2)} pts</Text>
                <Text style={{ color: '#0f172a', fontWeight: '700', marginTop: 4 }}>Wins rank #{me.wins.rank} · {Number(me.wins.wins).toFixed(2)} pts</Text>
                <Text style={{ marginTop: 6, color: me.frequent.qualified ? '#15803D' : '#B45309', fontWeight: '600' }}>
                  {me.frequent.qualified ? '✓ QUALIFIED' : '✗ NOT QUALIFIED'}
                </Text>
                {isCurrentWeek && weekStatus && !weekStatus.is_active && (
                  <Text style={{ marginTop: 4, color: '#94A3B8', fontSize: 11 }}>⚠ Scoring inactive — scores are frozen.</Text>
                )}
              </View>
            )}

            {/* Tab switcher */}
            <View style={{ flexDirection: 'row', marginBottom: 12, gap: 8 }}>
              {['frequent', 'wins'].map((k) => (
                <TouchableOpacity key={k} onPress={() => setTab(k)} style={{ flex: 1, paddingVertical: 12, borderRadius: 12, backgroundColor: tab === k ? BG : CARD, alignItems: 'center' }}>
                  <Text style={{ color: tab === k ? '#fff' : '#334155', fontWeight: '700', fontSize: 13 }}>{k === 'frequent' ? 'Most Frequent' : 'Most Wins'}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {loading && <View style={{ padding: 40, alignItems: 'center' }}><ActivityIndicator size="large" color={BG} /></View>}
            {err && !loading && <Text style={{ color: '#B91C1C', padding: 12 }}>{err}</Text>}

            {!loading && rows && rows.map((row) => {
              const isExpanded = expandedId === row.user_id;
              const q = row.qualification;
              const reqs = q?.requirements;
              const topRankLimit = data?.meta?.top_rank ?? 32;
              const isTop = row.rank <= topRankLimit;

              // Calculate pts needed for top rank
              const thresholdScore = rows.find(r => r.rank === topRankLimit)?.[tab] ?? 0;
              const ptsNeeded = Math.max(0, thresholdScore - row[tab]);

              return (
                <View key={`${row.user_id}-${row.rank}`} style={{
                  marginBottom: 8,
                  overflow: 'hidden',
                  borderRadius: 12,
                  backgroundColor: isExpanded ? '#0F172A' : (isTop ? '#FFFBEB' : CARD),
                  borderWidth: isTop && !isExpanded ? 1 : 0,
                  borderColor: '#FDE68A'
                }}>
                  <TouchableOpacity
                    onPress={() => setExpandedId(isExpanded ? null : row.user_id)}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      padding: 12,
                      borderLeftWidth: isExpanded ? 4 : 0,
                      borderLeftColor: isTop ? '#F59E0B' : '#94A3B8'
                    }}
                  >
                    <Text style={{ width: 36, fontWeight: '800', color: isExpanded ? '#F59E0B' : (isTop ? '#D97706' : BG), fontSize: 16 }}>#{row.rank}</Text>
                    <View style={{ flex: 1 }}>
                      <Text style={{ color: isExpanded ? '#FFF' : '#0f172a', fontWeight: '700' }}>{row.name}</Text>
                      {!isExpanded && (
                        <View>
                          <Text style={{ color: '#64748b', fontSize: 12 }}>
                            {tab === 'frequent' ? Number(row.frequent).toFixed(1) : Number(row.wins).toFixed(1)} pts · {row.qualified ? 'QUALIFIED' : 'NOT QUALIFIED'}
                          </Text>
                          {!row.qualified && (
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 2 }}>
                              <Ionicons name="warning" size={10} color="#B45309" />
                              <Text style={{ color: '#B45309', fontSize: 10, fontWeight: '600', marginLeft: 2 }}>You need more games to qualify</Text>
                            </View>
                          )}
                          {!isTop && (
                            <Text style={{ color: '#94A3B8', fontSize: 10, marginTop: 2, fontWeight: '600' }}>
                              Need {(ptsNeeded + 0.1).toFixed(1)} more pts for Top {topRankLimit}
                            </Text>
                          )}
                        </View>
                      )}
                      {isExpanded && (
                        <Text style={{ color: '#CBD5E1', fontSize: 14, fontWeight: '700' }}>
                          {tab === 'frequent' ? Number(row.frequent).toFixed(1) : Number(row.wins).toFixed(1)}
                        </Text>
                      )}
                    </View>

                    {isExpanded && (
                      <View style={{ backgroundColor: row.qualified ? '#065F46' : '#7F1D1D', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6, flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                        <Ionicons name={row.qualified ? "checkmark-circle" : "close-circle"} size={14} color="#FFF" />
                        <Text style={{ color: '#FFF', fontSize: 10, fontWeight: '800' }}>{row.qualified ? 'QUALIFIED' : 'NOT QUALIFIED'}</Text>
                      </View>
                    )}

                    {!isExpanded && isTop && (
                      <View style={{ backgroundColor: '#FDE68A', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 }}>
                        <Text style={{ color: '#92400E', fontSize: 10, fontWeight: '700' }}>TOP {topRankLimit}</Text>
                      </View>
                    )}

                    <View style={{ marginLeft: 8 }}>
                      <Ionicons name={isExpanded ? "chevron-up" : "chevron-down"} size={18} color={isExpanded ? "#F59E0B" : "#94A3B8"} />
                    </View>
                  </TouchableOpacity>

                  {isExpanded && (
                    <View style={{ padding: 12, borderTopWidth: 1, borderTopColor: '#1E293B' }}>
                      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
                        {reqs?.skill_games_min_3_each?.per_game?.map(sg => (
                          <View key={sg.key} style={{ width: '47%' }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
                              <Text style={{ color: '#94A3B8', fontSize: 10 }}>{sg.key.replace(/_/g, ' ').toUpperCase()}</Text>
                              <Text style={{ color: sg.played >= 3 ? '#22C55E' : '#94A3B8', fontSize: 10, fontWeight: '700' }}>{sg.played}/3</Text>
                            </View>
                            <View style={{ height: 4, backgroundColor: '#1E293B', borderRadius: 2 }}>
                              <View style={{ height: '100%', backgroundColor: '#22C55E', borderRadius: 2, width: `${Math.min(100, (sg.played / 3) * 100)}%` }} />
                            </View>
                          </View>
                        ))}

                        {reqs?.quiz_min_3_sessions && (
                          <View style={{ width: '47%' }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
                              <Text style={{ color: '#94A3B8', fontSize: 10 }}>QUIZ SESSIONS</Text>
                              <Text style={{ color: reqs.quiz_min_3_sessions.sessions >= 3 ? '#22C55E' : '#94A3B8', fontSize: 10, fontWeight: '700' }}>{reqs.quiz_min_3_sessions.sessions}/3</Text>
                            </View>
                            <View style={{ height: 4, backgroundColor: '#1E293B', borderRadius: 2 }}>
                              <View style={{ height: '100%', backgroundColor: '#22C55E', borderRadius: 2, width: `${Math.min(100, (reqs.quiz_min_3_sessions.sessions / 3) * 100)}%` }} />
                            </View>
                          </View>
                        )}

                        {reqs?.fun_forecast_min_3 && (
                          <View style={{ width: '47%' }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
                              <Text style={{ color: '#94A3B8', fontSize: 10 }}>FUN FORECAST</Text>
                              <Text style={{ color: reqs.fun_forecast_min_3.met ? '#22C55E' : '#94A3B8', fontSize: 10, fontWeight: '700' }}>{reqs.fun_forecast_min_3.count}/3</Text>
                            </View>
                            <View style={{ height: 4, backgroundColor: '#1E293B', borderRadius: 2 }}>
                              <View style={{ height: '100%', backgroundColor: '#22C55E', borderRadius: 2, width: `${Math.min(100, (reqs.fun_forecast_min_3.count / 3) * 100)}%` }} />
                            </View>
                          </View>
                        )}
                      </View>

                      {!row.qualified && (
                        <View style={{ marginTop: 12, borderTopWidth: 1, borderTopColor: '#1E293B', pt: 8 }}>
                          <Text style={{ color: '#EF4444', fontSize: 11, fontWeight: '700', marginBottom: 4 }}>Missing requirements:</Text>
                          {reqs?.skill_games_min_3_each?.per_game?.filter(sg => sg.played < 3).map(sg => (
                            <Text key={sg.key} style={{ color: '#94A3B8', fontSize: 10 }}>• Play {3 - sg.played} more {sg.key.replace(/_/g, ' ')} game(s)</Text>
                          ))}
                          {reqs?.quiz_min_3_sessions?.sessions < 3 && (
                            <Text style={{ color: '#94A3B8', fontSize: 10 }}>• Play {3 - reqs.quiz_min_3_sessions.sessions} more Quiz Sessions</Text>
                          )}
                          {reqs?.fun_forecast_min_3 && !reqs.fun_forecast_min_3.met && (
                            <Text style={{ color: '#94A3B8', fontSize: 10 }}>• Make {3 - reqs.fun_forecast_min_3.count} more Forecasts</Text>
                          )}
                          {(reqs?.deposits_min_3?.count ?? 0) < 3 && (
                            <Text style={{ color: '#94A3B8', fontSize: 10 }}>• Make {3 - (reqs?.deposits_min_3?.count ?? 0)} more Deposits</Text>
                          )}
                        </View>
                      )}
                    </View>
                  )}
                </View>
              );
            })}

          </View>
        </ScrollView>
      </View>
    </>
  );
}
