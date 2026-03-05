import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router, usePathname } from 'expo-router';
import { Home, ClipboardList, History } from 'lucide-react-native';

const ForecastTabs = () => {
    const pathname = usePathname();

    const tabs = [
        { label: 'Home', path: '/(routes)/forecast', icon: Home },
        { label: 'Forecast', path: '/(routes)/forecast/forecast', icon: ClipboardList },
        { label: 'History', path: '/(routes)/forecast/history', icon: History },
    ];

    const isActive = (path) => {
        if (path === '/(routes)/forecast') {
            return pathname === '/(routes)/forecast' || pathname === '/(routes)/forecast/';
        }
        return pathname === path;
    };

    return (
        <View style={styles.container}>
            {tabs.map((tab) => {
                const ActiveIcon = tab.icon;
                const active = isActive(tab.path);
                return (
                    <TouchableOpacity
                        key={tab.label}
                        style={styles.tab}
                        onPress={() => router.push(tab.path)}
                    >
                        <ActiveIcon
                            size={20}
                            color={active ? '#16a34a' : '#94a3b8'}
                            strokeWidth={active ? 2.5 : 2}
                        />
                        <Text style={[styles.tabLabel, active && styles.activeTabLabel]}>
                            {tab.label}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        paddingTop: 12,
        paddingBottom: 25,
        borderTopWidth: 1,
        borderTopColor: '#f1f5f9',
        justifyContent: 'space-around',
    },
    tab: {
        alignItems: 'center',
        flex: 1,
    },
    tabLabel: {
        fontSize: 10,
        fontWeight: '600',
        color: '#94a3b8',
        marginTop: 4,
    },
    activeTabLabel: {
        color: '#16a34a',
    }
});

export default ForecastTabs;
