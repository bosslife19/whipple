import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, ActivityIndicator, Text, RefreshControl } from 'react-native';
import api from '../../../axiosClient';
import ForecastHeader from '../../../components/forecast/ForecastHeader';
import ForecastMatchCard from '../../../components/forecast/ForecastMatchCard';
import ForecastTabs from '../../../components/forecast/ForecastTabs';
import Toast from 'react-native-toast-message';

export default function ActiveForecasts() {
    const [loading, setLoading] = useState(true);
    const [forecasts, setForecasts] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

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

    return (
        <View style={styles.container}>
            <ForecastHeader title="Active Forecasts" />

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
                        forecasts.map(group => (
                            <View key={group.id} style={styles.groupContainer}>
                                <View style={styles.groupHeader}>
                                    <View style={styles.labelBadge}>
                                        <Text style={styles.labelText}>ID: {group.label}</Text>
                                    </View>
                                    <View style={[styles.statusBadge, group.status === 'draft' && styles.draftBadge]}>
                                        <Text style={styles.statusText}>{group.status.toUpperCase()}</Text>
                                    </View>
                                </View>
                                {group.match.map(m => (
                                    <ForecastMatchCard
                                        key={m.id}
                                        match={m}
                                        mode={group.type}
                                        selection={m}
                                        readOnly={true}
                                    />
                                ))}
                            </View>
                        ))
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
    statusBadge: {
        backgroundColor: '#dcfce7',
        paddingVertical: 4,
        paddingHorizontal: 10,
        borderRadius: 6,
    },
    draftBadge: {
        backgroundColor: '#fef9c3',
    },
    statusText: {
        fontSize: 10,
        fontWeight: '800',
        color: '#16a34a',
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
