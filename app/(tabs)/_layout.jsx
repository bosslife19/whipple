import { Tabs } from 'expo-router';
import React from 'react';
import { Image, Platform, View } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Entypo, MaterialCommunityIcons } from '@expo/vector-icons';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const activeColor = Colors[colorScheme ?? 'light'].tint;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: activeColor,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: {
          position: 'absolute',
          height: 70, // Adjust tab bar height for better spacing
          backgroundColor: 'white',
         },
      }}>
      <Tabs.Screen
        name="home"
        options={{
          title: '',
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.tabContainer, focused && styles.activeTab]}>
              <Entypo name="home" size={24} color={color} />
              {focused && <View style={styles.bottomBorder} />}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="PreBetActivities"
        options={{
          title: '',
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.tabContainer, focused && styles.activeTab]}>
              <Image source={require("../../assets/icons/hugeicons_cards-01.png")} style={{width:25,height:25}} />
              {focused && <View style={styles.bottomBorder} />}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="games"
        options={{
          title: '',
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.tabContainer, focused && styles.activeTab]}>
              {/* <Entypo name="home" size={24} color={color} /> */}
              <Image source={require("../../assets/icons/Frame 69.png")} style={{width:50,height:50}} />
              {focused && <View style={styles.bottomBorder} />}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: '',
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.tabContainer, focused && styles.activeTab]}>
              <Image source={require("../../assets/icons/material-symbols_leaderboard.png")} style={{width:25,height:25}} />
              {focused && <View style={styles.bottomBorder} />}
            </View>
          ),
        }}
      />
       <Tabs.Screen
        name="profile"
        options={{
          title: '',
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.tabContainer, focused && styles.activeTab]}>
              <Image source={require("../../assets/icons/iconamoon_profile-fill.png")} style={{width:25,height:25}} />
              {focused && <View style={styles.bottomBorder} />}
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = {
  tabContainer: {
    // alignItems: 'center',
    // justifyContent: 'center',
   },
  activeTab: {
    position: 'relative',
  },
  bottomBorder: {
    position: 'absolute',
    bottom: -12, // Adjust this value to control spacing from the icon
    width: '80%', // Make the border a bit smaller than the icon width
    height: 4,
    backgroundColor: '#007BFF',
    borderRadius: 2,
  },
};
