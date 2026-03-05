import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Modal, Animated } from 'react-native';
import { ShoppingCart, X, Send } from 'lucide-react-native';

const SelectionOverlay = ({
    visible,
    onClose,
    selections,
    matches,
    onSubmit,
    submitting,
    type
}) => {
    const selectedMatches = matches.filter(m => selections[m.id]);

    if (selectedMatches.length === 0 && !visible) return null;

    return (
        <View style={styles.container}>
            {!visible ? (
                <TouchableOpacity style={styles.floatingBtn} onPress={onClose}>
                    <View style={styles.badgeContainer}>
                        <Text style={styles.badgeCount}>{selectedMatches.length}</Text>
                    </View>
                    <ShoppingCart color="#fff" size={24} />
                </TouchableOpacity>
            ) : (
                <Modal visible={visible} animationType="slide" transparent>
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContent}>
                            <View style={styles.modalHeader}>
                                <Text style={styles.modalTitle}>Your Selections ({selectedMatches.length})</Text>
                                <TouchableOpacity onPress={onClose}>
                                    <X color="#333" size={24} />
                                </TouchableOpacity>
                            </View>

                            <ScrollView style={styles.scrollList}>
                                {selectedMatches.map(m => {
                                    const sel = selections[m.id];
                                    return (
                                        <View key={m.id} style={styles.selectionItem}>
                                            <View style={styles.itemTeams}>
                                                <Text style={styles.itemName}>{m.team_name_a} vs {m.team_name_b}</Text>
                                                <Text style={styles.itemChoice}>
                                                    {type === 'general'
                                                        ? `${sel.choice_a} - ${sel.choice_b}`
                                                        : `${sel.score_a} - ${sel.score_b}`
                                                    }
                                                </Text>
                                            </View>
                                        </View>
                                    );
                                })}
                            </ScrollView>

                            <TouchableOpacity
                                style={[styles.submitBtn, submitting && styles.disabledBtn]}
                                onPress={onSubmit}
                                disabled={submitting}
                            >
                                <Send color="#fff" size={20} style={{ marginRight: 8 }} />
                                <Text style={styles.submitBtnText}>
                                    {submitting ? 'Submitting...' : 'Submit Forecast'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 30,
        right: 20,
        zIndex: 1000,
    },
    floatingBtn: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#16a34a',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
    },
    badgeContainer: {
        position: 'absolute',
        top: -5,
        right: -5,
        backgroundColor: '#ef4444',
        borderRadius: 10,
        minWidth: 20,
        height: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: '#fff',
    },
    badgeCount: {
        color: '#fff',
        fontSize: 10,
        fontWeight: 'bold',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        padding: 24,
        maxHeight: '80%',
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: '800',
        color: '#16a34a',
    },
    scrollList: {
        marginBottom: 20,
    },
    selectionItem: {
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#f1f5f9',
    },
    itemTeams: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    itemName: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
    },
    itemChoice: {
        fontSize: 14,
        fontWeight: '800',
        color: '#16a34a',
        textTransform: 'uppercase',
    },
    submitBtn: {
        backgroundColor: '#16a34a',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
        borderRadius: 12,
    },
    submitBtnText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '700',
    },
    disabledBtn: {
        backgroundColor: '#a3e635',
        opacity: 0.6,
    }
});

export default SelectionOverlay;
