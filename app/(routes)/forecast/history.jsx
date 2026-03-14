import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity, RefreshControl } from 'react-native';
import { ChevronDown, ChevronUp, Info, Trophy, ArrowLeft } from 'lucide-react-native';
import api from '../../../axiosClient';
import ForecastHeader from '../../../components/forecast/ForecastHeader';
import ForecastMatchCard from '../../../components/forecast/ForecastMatchCard';
import ForecastTabs from '../../../components/forecast/ForecastTabs';
import Toast from 'react-native-toast-message';

export default function ForecastHistory() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [view, setView] = useState('cards'); // 'cards' | 'general' | 'specific'
    const [filter, setFilter] = useState('won'); // 'won' | 'lose' - for general only
    const [refreshing, setRefreshing] = useState(false);
    const [expandedId, setExpandedId] = useState(null);

    useEffect(() => {
        fetchHistory();
    }, []);

    const fetchHistory = async () => {
        try {
            setLoading(true);
            const res = await api.get('/forecast/myForecasts');
            const history = (res.data.data || []).filter(f => f.status === 'closed' || f.status === 'settled');
            setData(history);
        } catch (err) {
            console.error(err);
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Failed to fetch history'
            });
        } finally {
            setLoading(false);
        }
    };

    const onRefresh = async () => {
        setRefreshing(true);
        try {
            const res = await api.get('/forecast/myForecasts');
            const history = (res.data.data || []).filter(f => f.status === 'closed' || f.status === 'settled');
            setData(history);
        } catch (err) {
            console.error(err);
        } finally {
            setRefreshing(false);
        }
    };

    const isMatchWon = (match) => match.forecast_is_correct === 1;

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

    const generalGroups = data.filter(g => g.type === 'general');
    const specificGroups = data.filter(g => g.type === 'specific');

    const getGroupGamesWon = (group) => (group.match || []).filter(m => isMatchWon(m)).length;
    const getGroupPoints = (group) => {
        const v = group.winnings ?? group.total_points ?? group.points ?? group.point ?? 0;
        return Number(v) || 0;
    };

    const generalGamesWon = generalGroups.reduce((sum, g) => sum + getGroupGamesWon(g), 0);
    const generalTotalPoints = generalGroups.reduce((sum, g) => sum + getGroupPoints(g), 0);
    const specificGamesWon = specificGroups.reduce((sum, g) => sum + getGroupGamesWon(g), 0);
    const specificTotalPoints = specificGroups.reduce((sum, g) => sum + getGroupPoints(g), 0);

    const generalFiltered = generalGroups.filter(group =>
        (group.match || []).some(m => filter === 'won' ? isMatchWon(m) : !isMatchWon(m))
    );
    const specificFiltered = specificGroups;

    const renderAccordionList = (groups) => (
        <View style={styles.listContainer}>
            {groups.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>
                        {view === 'general' ? `No ${filter} history found.` : 'No specific history found.'}
                    </Text>
                </View>
            ) : (
                groups.map(group => {
                    const isOpen = expandedId === group.id;
                    const matches = group.match || [];
                    const gameCount = matches.length;
                    const roundIdRaw = group.round_id ?? group.roundId ?? group.id ?? group.label ?? '';
                    const displayId = String(roundIdRaw).replace(/\D/g, '').padStart(9, '0');
                    const typeLabel = group.type === 'specific' ? 'Specific' : 'General';
                    const totalPoints = getGroupPoints(group);
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
                                <View style={styles.accordionHeaderSub}>
                                    <Text style={styles.accordionPoints}>Total points won: {totalPoints}</Text>
                                    {roundCreatedFormatted ? (
                                        <Text style={styles.accordionCreated}>{roundCreatedFormatted}</Text>
                                    ) : null}
                                </View>
                            </TouchableOpacity>
                            {isOpen && (
                                <View style={styles.accordionBody}>
                                    {matches.map(m => (
                                        <ForecastMatchCard
                                            key={m.id}
                                            match={m}
                                            mode={group.type}
                                            selection={m}
                                            readOnly={true}
                                            showResult={true}
                                        />
                                    ))}
                                </View>
                            )}
                        </View>
                    );
                })
            )}
        </View>
    );

    return (
        <View style={styles.container}>
            <ForecastHeader title="Forecast History" backButton={false} />

            {(view === 'general' || view === 'specific') && (
                <TouchableOpacity style={styles.backRow} onPress={() => { setView('cards'); setExpandedId(null); }}>
                    <ArrowLeft size={20} color="#16a34a" />
                    <Text style={styles.backText}>Back</Text>
                </TouchableOpacity>
            )}

            {view === 'general' && (
                <View style={styles.tabContainer}>
                    <TouchableOpacity
                        style={[styles.tab, filter === 'won' && styles.activeTab]}
                        onPress={() => setFilter('won')}
                    >
                        <Text style={[styles.tabText, filter === 'won' && styles.activeTabText]}>WON</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.tab, filter === 'lose' && styles.activeTab]}
                        onPress={() => setFilter('lose')}
                    >
                        <Text style={[styles.tabText, filter === 'lose' && styles.activeTabText]}>LOSE</Text>
                    </TouchableOpacity>
                </View>
            )}

            <ScrollView
                style={styles.content}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#16a34a']} tintColor="#16a34a" />
                }
            >
                {loading ? (
                    <ActivityIndicator color="#16a34a" size="large" style={{ marginTop: 50 }} />
                ) : view === 'cards' ? (
                    <View style={styles.cardsContainer}>
                        <TouchableOpacity
                            style={styles.summaryCard}
                            onPress={() => setView('general')}
                            activeOpacity={0.85}
                        >
                            <View style={styles.cardIconWrap}>
                                <Info size={32} color="#16a34a" />
                            </View>
                            <Text style={styles.cardLabel}>General</Text>
                            <Text style={styles.cardStat}>Games won: {generalGamesWon}</Text>
                            <Text style={styles.cardStat}>Total points: {generalTotalPoints}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.summaryCard}
                            onPress={() => setView('specific')}
                            activeOpacity={0.85}
                        >
                            <View style={styles.cardIconWrap}>
                                <Trophy size={32} color="#16a34a" />
                            </View>
                            <Text style={styles.cardLabel}>Specific</Text>
                            <Text style={styles.cardStat}>Games won: {specificGamesWon}</Text>
                            <Text style={styles.cardStat}>Total points: {specificTotalPoints}</Text>
                        </TouchableOpacity>
                    </View>
                ) : view === 'general' ? (
                    renderAccordionList(generalFiltered)
                ) : (
                    renderAccordionList(specificFiltered)
                )}
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
    backRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 10,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#e2e8f0',
    },
    backText: {
        marginLeft: 6,
        fontSize: 16,
        fontWeight: '600',
        color: '#16a34a',
    },
    tabContainer: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        paddingTop: 12,
        paddingBottom: 8,
        backgroundColor: '#fff',
    },
    tab: {
        flex: 1,
        paddingVertical: 10,
        alignItems: 'center',
        borderBottomWidth: 3,
        borderBottomColor: 'transparent',
    },
    activeTab: {
        borderBottomColor: '#16a34a',
    },
    tabText: {
        fontSize: 14,
        fontWeight: '700',
        color: '#94a3b8',
    },
    activeTabText: {
        color: '#16a34a',
    },
    content: {
        flex: 1,
        paddingHorizontal: 16,
    },
    cardsContainer: {
        paddingTop: 24,
        paddingBottom: 20,
    },
    summaryCard: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 24,
        marginBottom: 16,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#e2e8f0',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.06,
        shadowRadius: 2,
    },
    cardIconWrap: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: '#f0fdf4',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 12,
    },
    cardLabel: {
        fontSize: 18,
        fontWeight: '800',
        color: '#0f172a',
        marginBottom: 8,
    },
    cardStat: {
        fontSize: 14,
        fontWeight: '600',
        color: '#475569',
        marginTop: 4,
    },
    listContainer: {
        paddingTop: 16,
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 8,
    },
    accordionPoints: {
        fontSize: 12,
        fontWeight: '700',
        color: '#16a34a',
    },
    accordionCreated: {
        fontSize: 11,
        fontWeight: '600',
        color: '#64748b',
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
    },
});
