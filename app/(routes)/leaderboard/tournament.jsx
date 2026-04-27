import { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  RefreshControl,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import { router, Stack, useFocusEffect } from 'expo-router';
import axiosClient from '../../../axiosClient';
import { AntDesign, FontAwesome5, Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const BG = '#0A1931';
const ACCENT = '#FFD700';

function Countdown({ targetDate }) {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const calculate = () => {
      const diff = new Date(targetDate) - new Date();
      if (diff <= 0) return 'Live now!';
      
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / 1000 / 60) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      const parts = [];
      if (days > 0) parts.push(`${days}d`);
      if (hours > 0) parts.push(`${hours}h`);
      parts.push(`${minutes}m`);
      parts.push(`${seconds}s`);
      return parts.join(' ');
    };

    setTimeLeft(calculate());
    const t = setInterval(() => setTimeLeft(calculate()), 1000);
    return () => clearInterval(t);
  }, [targetDate]);

  return <Text style={{ color: ACCENT, fontWeight: '800', fontSize: 12 }}>{timeLeft}</Text>;
}

function TournamentCard({ tournament, isHistory = false }) {
  const [expanded, setExpanded] = useState(false);
  const t = tournament;

  const toggle = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  return (
    <View style={{ backgroundColor: '#fff', borderRadius: 20, marginBottom: 16, overflow: 'hidden', elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 8 }}>
      <TouchableOpacity onPress={toggle} activeOpacity={0.9}>
        <View style={{ padding: 16 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <View style={{ flex: 1 }}>
              <Text style={{ color: BG, fontSize: 18, fontWeight: '800' }}>{t.title}</Text>
              <Text style={{ color: '#64748b', fontSize: 12, marginTop: 2 }}>
                {isHistory ? 'Tournament Ended' : `Starts: ${new Date(t.start_at).toLocaleString()}`}
              </Text>
            </View>
            {t.is_invited && (
              <View style={{ backgroundColor: '#ECFDF5', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8, borderWidth: 1, borderColor: '#10B981' }}>
                <Text style={{ color: '#059669', fontSize: 10, fontWeight: '900' }}>INVITED</Text>
              </View>
            )}
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 12, gap: 12 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
              <Ionicons name="people" size={14} color="#64748b" />
              <Text style={{ color: '#475569', fontSize: 12, fontWeight: '600' }}>{t.total_players} Players</Text>
            </View>
            {!isHistory && t.start_at && (
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: BG, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 }}>
                <FontAwesome5 name="clock" size={10} color={ACCENT} />
                <Countdown targetDate={t.start_at} />
              </View>
            )}
            <View style={{ flex: 1 }} />
            <AntDesign name={expanded ? "up" : "down"} size={16} color="#94A3B8" />
          </View>
        </View>
      </TouchableOpacity>

      {expanded && (
        <View style={{ padding: 16, borderTopWidth: 1, borderTopColor: '#F1F5F9', backgroundColor: '#F8FAFC' }}>
          {isHistory ? (
            <View>
              <Text style={{ color: BG, fontWeight: '800', fontSize: 13, marginBottom: 10, textTransform: 'uppercase' }}>🏆 Top Performers</Text>
              {(t.winners_top_3 || []).map((p, i) => (
                <View key={i} style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8, borderBottomWidth: i === 2 ? 0 : 1, borderBottomColor: '#E2E8F0' }}>
                  <Text style={{ color: '#334155', fontWeight: '700' }}>{i + 1}. {p.name}</Text>
                  <Text style={{ color: BG, fontWeight: '800' }}>{p.score} pts</Text>
                </View>
              ))}
              {(t.winners_top_3 || []).length === 0 && <Text style={{ color: '#94A3B8', fontSize: 12 }}>Results pending final review.</Text>}
            </View>
          ) : (
            <View>
              <Text style={{ color: BG, fontWeight: '800', fontSize: 13, marginBottom: 10, textTransform: 'uppercase' }}>🔥 Top Qualifiers (Wins)</Text>
              {(t.leaderboard_top_3 || []).map((p, i) => (
                <View key={i} style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8, borderBottomWidth: i === 2 ? 0 : 1, borderBottomColor: '#E2E8F0' }}>
                  <Text style={{ color: '#334155', fontWeight: '700' }}>{i + 1}. {p.name}</Text>
                  <Text style={{ color: BG, fontWeight: '800' }}>{p.score} wins</Text>
                </View>
              ))}
              <TouchableOpacity 
                onPress={() => router.push(`/(routes)/leaderboard/tournament_detail?id=${t.id}`)}
                style={{ backgroundColor: BG, paddingVertical: 12, borderRadius: 12, marginTop: 12, alignItems: 'center' }}
              >
                <Text style={{ color: '#fff', fontWeight: '800' }}>Enter Tournament Arena</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      )}
    </View>
  );
}

export default function TournamentScreen() {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [data, setData] = useState({ upcoming: [], history: [] });
  const [err, setErr] = useState(null);

  const load = async () => {
    setErr(null);
    try {
      const res = await axiosClient.get('/tournament/overview');
      setData(res.data);
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
    }, [])
  );

  const onRefresh = () => {
    setRefreshing(true);
    load();
  };

  return (
    <>
      <StatusBar style="light" />
      <Stack.Screen
        options={{
          headerShown: true,
          title: 'Tournaments',
          headerStyle: { backgroundColor: BG },
          headerTintColor: 'white',
          headerTitleStyle: { fontWeight: '800', fontSize: 18, color: 'white' },
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()} style={{ paddingLeft: 12 }}>
              <AntDesign name="arrow-left" size={24} color="white" />
            </TouchableOpacity>
          ),
        }}
      />
      <View style={{ flex: 1, backgroundColor: '#F1F5F9' }}>
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingBottom: 60 }}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
          <View style={{ padding: 16 }}>
            {loading && !refreshing && (
              <View style={{ padding: 40, alignItems: 'center' }}>
                <ActivityIndicator size="large" color={BG} />
              </View>
            )}

            {err && !loading && (
              <View style={{ backgroundColor: '#FEF2F2', padding: 16, borderRadius: 12, borderLeftWidth: 4, borderLeftColor: '#EF4444', marginBottom: 16 }}>
                <Text style={{ color: '#B91C1C', fontWeight: '700' }}>{err}</Text>
              </View>
            )}

            {!loading && data.upcoming.length > 0 && (
              <>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12, gap: 8 }}>
                  <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: '#10B981' }} />
                  <Text style={{ color: BG, fontSize: 16, fontWeight: '800', textTransform: 'uppercase', letterSpacing: 1 }}>Upcoming Events</Text>
                </View>
                {data.upcoming.map(t => <TournamentCard key={t.id} tournament={t} />)}
              </>
            )}

            {!loading && data.upcoming.length === 0 && (
              <View style={{ backgroundColor: '#fff', borderRadius: 20, padding: 24, alignItems: 'center', marginBottom: 24, borderStyle: 'dashed', borderWidth: 2, borderColor: '#CBD5E1' }}>
                <Ionicons name="calendar-outline" size={48} color="#94A3B8" />
                <Text style={{ color: '#64748b', textAlign: 'center', marginTop: 12, fontWeight: '600' }}>
                  No upcoming tournaments scheduled. Keep playing to stay at the top of the leaderboards!
                </Text>
              </View>
            )}

            {!loading && data.history.length > 0 && (
              <>
                <Text style={{ color: '#64748b', fontSize: 14, fontWeight: '800', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12, marginTop: 12 }}>Event History</Text>
                {data.history.map(t => <TournamentCard key={t.id} tournament={t} isHistory />)}
              </>
            )}
          </View>
        </ScrollView>
      </View>
    </>
  );
}
