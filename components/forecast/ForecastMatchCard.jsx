import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { CheckCircle2 } from 'lucide-react-native';

const scoreOptions = Array.from({ length: 21 }, (_, i) => ({ label: i.toString(), value: i.toString() }));

const ForecastMatchCard = ({
    match,
    onSelect,
    selection,
    mode = 'general', // 'general' or 'specific'
    readOnly = false,
    showResult = false
}) => {
    const isGeneral = mode === 'general';
    const [timeLeft, setTimeLeft] = useState('');
    const gameId = String(match?.id ?? '')
        .replace(/\D/g, '')
        .padStart(9, '0');

    const kickoffStr = match.kickoff_time || match.match_kickoff_time;
    let kickoffDisplay = '';

    if (kickoffStr) {
        const date = new Date(kickoffStr.replace(' ', 'T'));
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        let hours = date.getHours();
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        if (hours === 0) hours = 12;

        kickoffDisplay = `${days[date.getDay()]} ${date.getDate()}, ${months[date.getMonth()]} ${hours}:${minutes}${ampm}`;
    }

    useEffect(() => { 
        const calculateTimeLeft = () => {
            const kickoffStr = match.kickoff_time || match.match_kickoff_time;
            if (!kickoffStr) return;

            const kickoff = new Date(kickoffStr.replace(' ', 'T')).getTime();
            const cutoff = kickoff - 10 * 60 * 1000; // 10 minutes before kickoff
            const now = new Date().getTime();
            const difference = cutoff - now;

            if (difference <= 0) {
                setTimeLeft('00:00:00');
                return;
            }

            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((difference / 1000 / 60) % 60);
            const seconds = Math.floor((difference / 1000) % 60);

            let res = '';
            if (days > 0) res += `${days}d `;
            res += `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            setTimeLeft(res);
        };

        const timer = setInterval(calculateTimeLeft, 1000);
        calculateTimeLeft();

        return () => clearInterval(timer);
    }, [match.kickoff_time, match.match_kickoff_time]);

    const handleGeneralVote = (team, choice) => {
        if (readOnly) return;

        let choiceA = '';
        let choiceB = '';

        if (choice === 'win') {
            if (team === 'a') {
                choiceA = 'win';
                choiceB = 'loss';
            } else {
                choiceA = 'loss';
                choiceB = 'win';
            }
        } else if (choice === 'draw') {
            choiceA = 'draw';
            choiceB = 'draw';
        }

        onSelect(match.id, { choice_a: choiceA, choice_b: choiceB });
    };

    const handleScoreChange = (team, score) => {
        if (readOnly) return;
        const currentSelection = selection || { score_a: '0', score_b: '0' };
        onSelect(match.id, {
            ...currentSelection,
            [team === 'a' ? 'score_a' : 'score_b']: score
        });
    };

    return (
        <View style={styles.card}>
            <View style={styles.cardHeader}>
                <View style={styles.headerSectionLeft}>
                    <Text style={styles.time}>{kickoffDisplay}</Text>
                </View>
                <View style={styles.headerSectionCenter}>
                    <Text style={styles.gameId}>{gameId}</Text>
                </View>
                <View style={styles.headerSectionRight}>
                    {!readOnly && (
                        <View style={styles.countdownContainer}>
                            <Text style={styles.countdownText}>{timeLeft}</Text>
                        </View>
                    )}
                </View>
            </View>

            <View style={styles.teamsContainer}>
                {/* Team A */}
                <View style={[styles.teamSection, selection?.choice_a === 'win' && styles.selectedSection]}>
                    <Image
                        source={{ uri: match.team_logo_a }}
                        style={styles.logo}
                        resizeMode="contain"
                    />
                    <Text style={styles.teamName} numberOfLines={1}>{match.team_name_a}</Text>

                    {isGeneral && !readOnly && (
                        <TouchableOpacity
                            style={[
                                styles.voteBtn,
                                selection?.choice_a === 'win' && styles.activeVoteBtn
                            ]}
                            onPress={() => handleGeneralVote('a', 'win')}
                        >
                            <Text style={[
                                styles.voteBtnText,
                                selection?.choice_a === 'win' && styles.activeVoteBtnText
                            ]}>WIN</Text>
                        </TouchableOpacity>
                    )}

                    {!isGeneral && !readOnly && (
                        <Dropdown
                            style={styles.dropdown}
                            data={scoreOptions}
                            labelField="label"
                            valueField="value"
                            placeholder="0"
                            value={selection?.score_a || "0"}
                            onChange={item => handleScoreChange('a', item.value)}
                        />
                    )}

                    {readOnly && (
                        <View style={styles.readOnlyValue}>
                            <Text style={styles.valueText}>
                                {isGeneral ? selection?.match_result_a || match.forecast_choice_a : selection?.match_score_a || match.forecast_score_a}
                            </Text>
                        </View>
                    )} 
                </View>

                {/* VS Column */}
                <View style={styles.vsContainer}>
                    <Text style={styles.vsText}>VS</Text>
                    {isGeneral && !readOnly && (
                        <TouchableOpacity
                            style={[
                                styles.drawBtn,
                                selection?.choice_a === 'draw' && styles.activeDrawBtn
                            ]}
                            onPress={() => handleGeneralVote('a', 'draw')}
                        >
                            <Text style={[
                                styles.drawBtnText,
                                selection?.choice_a === 'draw' && styles.activeDrawBtnText
                            ]}>DRAW</Text>
                        </TouchableOpacity>
                    )}
                    {showResult && (
                        <>
                            <View style={[
                                styles.badge,
                                match.forecast_is_correct ? styles.wonBadge : styles.loseBadge
                            ]}>
                                <Text style={styles.badgeText}>
                                    {match.forecast_is_correct ? 'WON' : 'LOSS'}
                                </Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', }}>
                                {isGeneral ? (
                                    <>
                                        <Text style={styles.vsText}>{match.forecast_choice_a}</Text>
                                        <Text style={[styles.vsText, { marginHorizontal: 4 }]}>-</Text>
                                        <Text style={styles.vsText}>{match.forecast_choice_b}</Text>
                                    </>
                                ) : (
                                    <>
                                        <Text style={styles.vsText}>{match.forecast_score_a}</Text>
                                        <Text style={styles.vsText}>-</Text>
                                        <Text style={styles.vsText}>{match.forecast_score_b}</Text>
                                    </>
                                )}
                            </View>
                            <View>
                                <Text style={{ fontSize: 10, color: '#000', fontWeight: '100' }}>forecasted</Text>
                            </View>
                        </>
                    )}
                </View>

                {/* Team B */}
                <View style={[styles.teamSection, selection?.choice_b === 'win' && styles.selectedSection]}>
                    <Image
                        source={{ uri: match.team_logo_b }}
                        style={styles.logo}
                        resizeMode="contain"
                    />
                    <Text style={styles.teamName} numberOfLines={1}>{match.team_name_b}</Text>

                    {isGeneral && !readOnly && (
                        <TouchableOpacity
                            style={[
                                styles.voteBtn,
                                selection?.choice_b === 'win' && styles.activeVoteBtn
                            ]}
                            onPress={() => handleGeneralVote('b', 'win')}
                        >
                            <Text style={[
                                styles.voteBtnText,
                                selection?.choice_b === 'win' && styles.activeVoteBtnText
                            ]}>WIN</Text>
                        </TouchableOpacity>
                    )}

                    {!isGeneral && !readOnly && (
                        <Dropdown
                            style={styles.dropdown}
                            data={scoreOptions}
                            labelField="label"
                            valueField="value"
                            placeholder="0"
                            value={selection?.score_b || "0"}
                            onChange={item => handleScoreChange('b', item.value)}
                        />
                    )}

                    {readOnly && (
                        <View style={styles.readOnlyValue}>
                            <Text style={styles.valueText}>
                                {isGeneral ? selection?.match_result_b || match.forecast_choice_b : selection?.match_score_b || match.forecast_score_b}
                            </Text>
                        </View>
                    )}
                </View>
            </View>

            {selection && !readOnly && (
                <View style={styles.selectionIndicator}>
                    <CheckCircle2 color="#16a34a" size={16} />
                    <Text style={styles.selectionIndicatorText}>Selected</Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        borderWidth: 1,
        borderColor: '#f0f0f0',
    },
    time: {
        fontSize: 12,
        color: '#666',
        fontWeight: '500',
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    gameId: {
        fontSize: 12,
        color: '#111827',
        fontWeight: '800',
    },
    countdownContainer: {
        backgroundColor: '#fef2f2',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: '#fee2e2',
    },
    headerSectionLeft: {
        flex: 1,
        alignItems: 'flex-start',
    },
    headerSectionCenter: {
        flex: 1,
        alignItems: 'center',
    },
    headerSectionRight: {
        flex: 1,
        alignItems: 'flex-end',
    },
    countdownText: {
        fontSize: 10,
        color: '#ef4444',
        fontWeight: '700',
        fontVariant: ['tabular-nums'],
    },
    teamsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    teamSection: {
        flex: 1,
        alignItems: 'center',
        padding: 8,
        borderRadius: 12,
    },
    selectedSection: {
        backgroundColor: '#f0fdf4',
    },
    logo: {
        width: 50,
        height: 50,
        marginBottom: 8,
    },
    teamName: {
        fontSize: 14,
        fontWeight: '700',
        color: '#333',
        marginBottom: 10,
        textAlign: 'center',
    },
    vsContainer: {
        paddingHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'center',
        width: 80,
    },
    vsText: {
        fontSize: 16,
        fontWeight: '900',
        color: '#ddd',
        marginBottom: 8,
    },
    voteBtn: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 8,
        backgroundColor: '#f8fafc',
        borderWidth: 1,
        borderColor: '#e2e8f0',
        width: '100%',
        alignItems: 'center',
    },
    activeVoteBtn: {
        backgroundColor: '#16a34a',
        borderColor: '#16a34a',
    },
    voteBtnText: {
        fontSize: 12,
        fontWeight: '700',
        color: '#64748b',
    },
    activeVoteBtnText: {
        color: '#fff',
    },
    drawBtn: {
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 6,
        backgroundColor: '#f1f5f9',
        width: '100%',
        alignItems: 'center',
    },
    activeDrawBtn: {
        backgroundColor: '#475569',
    },
    drawBtnText: {
        fontSize: 10,
        fontWeight: '700',
        color: '#475569',
    },
    activeDrawBtnText: {
        color: '#fff',
    },
    dropdown: {
        height: 35,
        width: '100%',
        backgroundColor: '#f8fafc',
        borderRadius: 8,
        paddingHorizontal: 8,
        borderWidth: 1,
        borderColor: '#e2e8f0',
    },
    selectionIndicator: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 12,
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: '#f8fafc',
    },
    selectionIndicatorText: {
        fontSize: 12,
        color: '#16a34a',
        fontWeight: '600',
        marginLeft: 4,
    },
    readOnlyValue: {
        marginTop: 5,
        paddingVertical: 4,
        paddingHorizontal: 10,
        backgroundColor: '#f0fdf4',
        borderRadius: 6,
        minWidth: 40,
        alignItems: 'center',
    },
    valueText: {
        fontSize: 14,
        fontWeight: '700',
        color: '#16a34a',
        textTransform: 'uppercase',
    },
    badge: {
        marginTop: 10,
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 4,
    },
    wonBadge: {
        backgroundColor: '#16a34a',
    },
    loseBadge: {
        backgroundColor: '#ef4444',
    },
    badgeText: {
        color: '#fff',
        fontSize: 10,
        fontWeight: '800',
    }
});

export default ForecastMatchCard;
