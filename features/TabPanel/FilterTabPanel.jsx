import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

const tabs = [
  'All',
  'Lucky Number ',
  'Flip The Coin',
  'Dice Roll',
  'Wheel Spin',
  'Color Roulette',
  'Mystery',
  'Goal',
];

const FilterTabPanel = ({ onTabChange }) => {
  const [activeTab, setActiveTab] = useState('All');

  const handleTabPress = (tab) => {
    setActiveTab(tab);
    onTabChange(tab);
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.tabContainer}
    >
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab}
          style={[
            styles.tab,
            activeTab === tab && styles.activeTab,
          ]}
          onPress={() => handleTabPress(tab)}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === tab && styles.activeTabText,
            ]}
          >
            {tab}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    paddingVertical: 10,
    paddingHorizontal: 6,
    gap: 8,
    flexDirection: 'row',
    backgroundColor: '#0A1931',
    borderRadius: 5,
    // marginHorizontal:20,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: '#0A1931',
  },
  tabText: {
    fontSize: 12,
    color: '#555',
    fontWeight: '500',
    fontFamily: 'montserratMeduim',
  },
  activeTab: {
    backgroundColor: '#1F3C6A',
     
  },
  activeTabText: {
    color: '#fff',
    fontWeight: '700',
    fontFamily: 'montserratMeduim',
    fontSize:12,
    
  },
});

export default FilterTabPanel;
