import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, ActivityIndicator, Text, RefreshControl, TouchableOpacity } from 'react-native';
import { ChevronDown, ChevronUp } from 'lucide-react-native';
import api from '../../../axiosClient';
import ForecastHeader from '../../../components/forecast/ForecastHeader';
import ForecastMatchCard from '../../../components/forecast/ForecastMatchCard';
import ForecastTabs from '../../../components/forecast/ForecastTabs';
import Toast from 'react-native-toast-message';

export default function ActiveForecasts() {
    const [loading, setLoading] = useState(true);
    const [forecasts, setForecasts] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [expandedId, setExpandedId] = useState(null);

    useEffect(() => {
        fetchMyForecasts();
    }, []);

    const fetchMyForecasts = async () => {
        try {
            setLoading(true);
            const res = await api.get('/forecast/myForecasts');
            // User requested showing active forecasts yet to be closed
            const activeForecasts = (res.data.data || []).filter(f => f.status === 'active' || f.status === 'draft');
            setForecasts(activeForecasts);
        } catch (err) {
            console.error(err);
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Failed to fetch your forecasts'
            });
        } finally {
            setLoading(false);
        }
    };

    const onRefresh = async () => {
        setRefreshing(true);
        try {
            const res = await api.get('/forecast/myForecasts');
            const activeForecasts = (res.data.data || []).filter(f => f.status === 'active' || f.status === 'draft');
            setForecasts(activeForecasts);
        } catch (err) {
            console.error(err);
        } finally {
            setRefreshing(false);
        }
    };

    const formatKickoff = (kickoffStr) => {
        if (!kickoffStr) return '';
        const str = String(kickoffStr).replace(' ', 'T');
        const date = new Date(str);
        if (isNaN(date.getTime())) return '';
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        let hours = date.getHours();
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        if (hours === 0) hours = 12;
        return `${days[date.getDay()]} ${date.getDate()}, ${months[date.getMonth()]} ${hours}:${minutes}${ampm}`;
    };

    const formatKickoffWithYear = (kickoffStr) => {
        if (!kickoffStr) return '';
        const str = String(kickoffStr).replace(' ', 'T');
        const date = new Date(str);
        if (isNaN(date.getTime())) return '';
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        let hours = date.getHours();
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        if (hours === 0) hours = 12;
        return `${days[date.getDay()]} ${date.getDate()}, ${months[date.getMonth()]} ${date.getFullYear()} ${hours}:${minutes}${ampm}`;
    };

    return (
        <View style={styles.container}>
            <ForecastHeader title="Active Forecasts" backButton={false} />

            <ScrollView
                style={styles.content}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#16a34a']} tintColor="#16a34a" />
                }
            >
                <View style={styles.listContainer}>
                    {loading ? (
                        <ActivityIndicator color="#16a34a" size="large" style={{ marginTop: 50 }} />
                    ) : forecasts.length > 0 ? (
                        forecasts.map(group => {
                            const isOpen = expandedId === group.id;
                            const matches = group.match || [];
                            const gameCount = matches.length;
                            const roundIdRaw = group.round_id ?? group.roundId ?? group.id ?? group.label ?? '';
                            const displayId = String(roundIdRaw).replace(/\D/g, '').padStart(9, '0');
                            const typeLabel = group.type === 'specific' ? 'Specific' : 'General';

                            const sortedByKickoff = [...matches]
                                .map(m => ({ m, t: new Date((m.kickoff_time || m.match_kickoff_time || '').replace(' ', 'T')).getTime() }))
                                .filter(({ t }) => !isNaN(t))
                                .sort((a, b) => a.t - b.t);
                            const soonest = sortedByKickoff[0]?.m ? (sortedByKickoff[0].m.kickoff_time || sortedByKickoff[0].m.match_kickoff_time) : null;
                            const last = sortedByKickoff.length > 0 ? sortedByKickoff[sortedByKickoff.length - 1]?.m : null;
                            const lastKickoff = last ? (last.kickoff_time || last.match_kickoff_time) : null;
                            const soonestFormatted = formatKickoff(soonest);
                            const lastFormatted = formatKickoff(lastKickoff);
                            const roundCreatedAt = group.created_at ?? group.round_created_at ?? group.createdAt;
                            const roundCreatedFormatted = formatKickoffWithYear(roundCreatedAt);

                            return (
                                <View key={group.id} style={styles.accordionItem}>
                                    <TouchableOpacity
                                        style={styles.accordionHeader}
                                        onPress={() => setExpandedId(isOpen ? null : group.id)}
                                        activeOpacity={0.8}
                                    >
                                        <View style={styles.accordionHeaderRow}>
                                            <View style={styles.accordionHeaderLeft}>
                                                <Text style={styles.accordionId}>{group.label}</Text>
                                            </View>
                                            <View style={styles.accordionHeaderCenter}>
                                                <Text style={styles.accordionCount}>{gameCount} {gameCount === 1 ? 'game' : 'games'}</Text>
                                            </View>
                                            <View style={styles.accordionHeaderRight}>
                                                <Text style={styles.accordionType}>{typeLabel}</Text>
                                            </View>
                                            {isOpen ? (
                                                <ChevronUp size={20} color="#64748b" style={styles.accordionChevron} />
                                            ) : (
                                                <ChevronDown size={20} color="#64748b" style={styles.accordionChevron} />
                                            )}
                                        </View>
                                        {(soonestFormatted || lastFormatted || roundCreatedFormatted) && (
                                            <View style={styles.accordionHeaderSub}>
                                                {soonestFormatted ? (
                                                    <View style={styles.accordionSubRow}>
                                                        <Text style={styles.accordionSubText}>First: {soonestFormatted}</Text>
                                                        {roundCreatedFormatted ? (
                                                            <Text style={styles.accordionSubText}> {roundCreatedFormatted}</Text>
                                                        ) : null}
                                                    </View>
                                                ) : null}
                                                {lastFormatted ? (
                                                    <View style={styles.accordionSubRow}>
                                                        <Text style={styles.accordionSubText}>Last: {lastFormatted}</Text>
                                                        {/* {roundCreatedFormatted ? (
                                                            <Text style={styles.accordionSubText}>Created: {roundCreatedFormatted}</Text>
                                                        ) : null} */}
                                                    </View>
                                                ) : null}
                                            </View>
                                        )}
                                    </TouchableOpacity>
                                    {isOpen && (
                                        <View style={styles.accordionBody}>
                                            {(group.match || []).map(m => (
                                                <ForecastMatchCard
                                                    key={m.id}
                                                    match={m}
                                                    mode={group.type}
                                                    selection={m}
                                                    readOnly={true}
                                                />
                                            ))}
                                        </View>
                                    )}
                                </View>
                            );
                        })
                    ) : (
                        <View style={styles.emptyContainer}>
                            <Text style={styles.emptyText}>You have no active forecasts.</Text>
                        </View>
                    )}
                </View>
                <View style={{ height: 40 }} />
            </ScrollView>

            <ForecastTabs />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8fafc',
    },
    content: {
        flex: 1,
        paddingHorizontal: 16,
    },
    listContainer: {
        paddingTop: 20,
        paddingBottom: 20,
    },
    accordionItem: {
        marginBottom: 12,
        backgroundColor: '#fff',
        borderRadius: 12,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#e2e8f0',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.06,
        shadowRadius: 2,
    },
    accordionHeader: {
        flexDirection: 'column',
        paddingVertical: 14,
        paddingHorizontal: 16,
        backgroundColor: '#f8fafc',
    },
    accordionHeaderRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    accordionHeaderSub: {
        marginTop: 8,
    },
    accordionSubRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 2,
    },
    accordionSubText: {
        fontSize: 11,
        color: '#64748b',
        fontWeight: '600',
    },
    accordionHeaderLeft: {
        flex: 1,
        alignItems: 'flex-start',
    },
    accordionHeaderCenter: {
        flex: 1,
        alignItems: 'center',
    },
    accordionHeaderRight: {
        flex: 1,
        alignItems: 'flex-end',
    },
    accordionId: {
        fontSize: 10,
        fontWeight: '800',
        color: '#0f172a',
        fontVariant: ['tabular-nums'],
    },
    accordionCount: {
        fontSize: 13,
        fontWeight: '700',
        color: '#475569',
    },
    accordionType: {
        fontSize: 12,
        fontWeight: '700',
        color: '#16a34a',
        textTransform: 'capitalize',
    },
    accordionChevron: {
        marginLeft: 8,
    },
    accordionBody: {
        paddingHorizontal: 12,
        paddingTop: 4,
        paddingBottom: 12,
        borderTopWidth: 1,
        borderTopColor: '#e2e8f0',
    },
    emptyContainer: {
        alignItems: 'center',
        marginTop: 100,
    },
    emptyText: {
        color: '#94a3b8',
        fontSize: 16,
        fontWeight: '500',
    }
});
