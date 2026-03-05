import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, ActivityIndicator, RefreshControl } from 'react-native';
import { Trophy, Info } from 'lucide-react-native';
import api from '../../../axiosClient';
import ForecastHeader from '../../../components/forecast/ForecastHeader';
import ForecastMatchCard from '../../../components/forecast/ForecastMatchCard';
import SelectionOverlay from '../../../components/forecast/SelectionOverlay';
import ForecastTabs from '../../../components/forecast/ForecastTabs';
import Toast from 'react-native-toast-message';

export default function ForecastDashboard() {
    const [loading, setLoading] = useState(true);
    const [matches, setMatches] = useState([]);
    const [mode, setMode] = useState('general'); // 'general' or 'specific'
    const [selections, setSelections] = useState({});
    const [showOverlay, setShowOverlay] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        fetchGames();
    }, []);

    const fetchGames = async () => {
        try {
            setLoading(true);
            const res = await api.get('/forecast/type');
            setMatches(res.data || []);
        } catch (err) {
            console.error(err);
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Failed to fetch games'
            });
        } finally {
            setLoading(false);
        }
    };

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        try {
            const res = await api.get('/forecast/type');
            setMatches(res.data || []);
        } catch (err) {
            console.error(err);
        } finally {
            setRefreshing(false);
        }
    }, []);

    const handleModeChange = (newMode) => {
        if (Object.keys(selections).length > 0 && mode !== newMode) {
            Alert.alert(
                'Clear Selections?',
                'Changing the forecast type will clear your current selections. Do you want to proceed?',
                [
                    { text: 'Cancel', style: 'cancel' },
                    {
                        text: 'Clear & Switch',
                        style: 'destructive',
                        onPress: () => {
                            setSelections({});
                            setMode(newMode);
                        }
                    }
                ]
            );
        } else {
            setMode(newMode);
        }
    };

    const handleSelect = (matchId, selection) => {
        setSelections(prev => ({
            ...prev,
            [matchId]: selection
        }));
    };

    const handleSubmit = async () => {
        const matchData = Object.entries(selections).map(([id, data]) => ({
            id: id,
            ...data
        }));

        if (matchData.length === 0) return;

        try {
            setSubmitting(true);
            const payload = {
                status: 'active',
                type: mode,
                matches: matchData
            };

            await api.post('/forecast/submit', payload);

            Toast.show({
                type: 'success',
                text1: 'Success',
                text2: 'Forecast submitted successfully!'
            });

            setSelections({});
            setShowOverlay(false);
            // Optionally refresh or navigate
        } catch (err) {
            console.error(err);
            Toast.show({
                type: 'error',
                text1: 'Submission Failed',
                text2: err.response?.data?.message || 'Something went wrong'
            });
        } finally {
            setSubmitting(false);
        }
    };

    const filteredMatches = matches.filter(m => m.type === mode);

    return (
        <View style={styles.container}>
            <ForecastHeader title="Whipple" />

            <ScrollView
                style={styles.content}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#16a34a']} tintColor="#16a34a" />
                }
            >
                {/* Banner */}
                <View style={styles.banner}>
                    <View style={styles.bannerTextContainer}>
                        <Text style={styles.bannerTitle}>Fun Forecast</Text>
                        <Text style={styles.bannerSubtitle}>Predict and Win Big!</Text>
                    </View>
                    <View style={styles.bannerIconContainer}>
                        <Trophy color="#FFD700" size={40} strokeWidth={2.5} />
                    </View>
                </View>

                {/* Mode Toggle */}
                <View style={styles.toggleContainer}>
                    <TouchableOpacity
                        style={[styles.toggleBtn, mode === 'general' && styles.activeToggle]}
                        onPress={() => handleModeChange('general')}
                    >
                        <Info size={18} color={mode === 'general' ? '#fff' : '#94a3b8'} style={{ marginRight: 6 }} />
                        <Text style={[styles.toggleText, mode === 'general' && styles.activeToggleText]}>General</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.toggleBtn, mode === 'specific' && styles.activeToggle]}
                        onPress={() => handleModeChange('specific')}
                    >
                        <Trophy size={18} color={mode === 'specific' ? '#fff' : '#94a3b8'} style={{ marginRight: 6 }} />
                        <Text style={[styles.toggleText, mode === 'specific' && styles.activeToggleText]}>Specific Game</Text>
                    </TouchableOpacity>
                </View>

                {/* Match List */}
                <View style={styles.listContainer}>
                    {loading ? (
                        <ActivityIndicator color="#16a34a" size="large" style={{ marginTop: 50 }} />
                    ) : filteredMatches.length > 0 ? (
                        filteredMatches.map(match => (
                            <ForecastMatchCard
                                key={match.id}
                                match={match}
                                mode={mode}
                                selection={selections[match.id]}
                                onSelect={handleSelect}
                            />
                        ))
                    ) : (
                        <View style={styles.emptyContainer}>
                            <Text style={styles.emptyText}>No games available for {mode} forecast.</Text>
                        </View>
                    )}
                </View>

                <View style={{ height: 100 }} />
            </ScrollView>

            <SelectionOverlay
                visible={showOverlay}
                onClose={() => setShowOverlay(!showOverlay)}
                selections={selections}
                matches={matches}
                type={mode}
                onSubmit={handleSubmit}
                submitting={submitting}
            />

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
    banner: {
        flexDirection: 'row',
        backgroundColor: '#16a34a',
        borderRadius: 20,
        padding: 24,
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'space-between',
        overflow: 'hidden',
    },
    bannerTextContainer: {
        flex: 1,
    },
    bannerTitle: {
        color: '#fff',
        fontSize: 24,
        fontWeight: '900',
    },
    bannerSubtitle: {
        color: 'rgba(255,255,255,0.8)',
        fontSize: 14,
        fontWeight: '600',
        marginTop: 4,
    },
    bannerIconContainer: {
        backgroundColor: 'rgba(255,255,255,0.2)',
        padding: 12,
        borderRadius: 15,
    },
    toggleContainer: {
        flexDirection: 'row',
        backgroundColor: '#f1f5f9',
        borderRadius: 12,
        padding: 4,
        marginTop: 20,
        marginBottom: 20,
    },
    toggleBtn: {
        flex: 1,
        flexDirection: 'row',
        paddingVertical: 12,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
    },
    activeToggle: {
        backgroundColor: '#16a34a',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    toggleText: {
        fontSize: 14,
        fontWeight: '700',
        color: '#94a3b8',
    },
    activeToggleText: {
        color: '#fff',
    },
    listContainer: {
        paddingBottom: 20,
    },
    emptyContainer: {
        alignItems: 'center',
        marginTop: 60,
    },
    emptyText: {
        color: '#94a3b8',
        fontSize: 16,
        fontWeight: '500',
    }
});
