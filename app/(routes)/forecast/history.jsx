import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity, RefreshControl } from 'react-native';
import api from '../../../axiosClient';
import ForecastHeader from '../../../components/forecast/ForecastHeader';
import ForecastMatchCard from '../../../components/forecast/ForecastMatchCard';
import ForecastTabs from '../../../components/forecast/ForecastTabs';
import Toast from 'react-native-toast-message';

export default function ForecastHistory() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState('won'); // 'won' or 'lose'
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        fetchHistory();
    }, []);

    const fetchHistory = async () => {
        try {
            setLoading(true);
            const res = await api.get('/forecast/myForecasts');
            // Filter only closed/settled forecasts
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

    const isMatchWon = (match) => {
        return match.forecast_is_correct === 1;
    };

    const filteredData = data.filter(group => {
        // A group is "won" if any match in it is won (or if group has winnings > 0)
        // Adjust logic based on exact response structure if needed
        return group.match.some(m => filter === 'won' ? isMatchWon(m) : !isMatchWon(m));
    });

    return (
        <View style={styles.container}>
            <ForecastHeader title="Forecast History" />

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
                    ) : filteredData.length > 0 ? (
                        filteredData.map(group => (
                            <View key={group.id} style={styles.groupContainer}>
                                <View style={styles.groupHeader}>
                                    <View style={styles.labelBadge}>
                                        <Text style={styles.labelText}>{group.label}</Text>
                                    </View>
                                    <Text style={styles.typeText}>{group.type.toUpperCase()}</Text>
                                </View>
                                {group.match.map(m => (
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
                        ))
                    ) : (
                        <View style={styles.emptyContainer}>
                            <Text style={styles.emptyText}>No {filter} history found.</Text>
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
    tabContainer: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        paddingTop: 16,
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
    listContainer: {
        paddingTop: 16,
        paddingBottom: 20,
    },
    groupContainer: {
        marginBottom: 24,
    },
    groupHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
        paddingHorizontal: 4,
    },
    labelBadge: {
        backgroundColor: '#f1f5f9',
        paddingVertical: 4,
        paddingHorizontal: 10,
        borderRadius: 6,
    },
    labelText: {
        fontSize: 11,
        fontWeight: '700',
        color: '#64748b',
    },
    typeText: {
        fontSize: 10,
        fontWeight: '800',
        color: '#94a3b8',
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
