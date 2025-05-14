import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import { MaterialIcons, FontAwesome5, Ionicons } from '@expo/vector-icons';
import Header from '../Header/Header';
import { formatCurrency } from '../../utlils/formatCurrency';
// import { formatCurrency } from '../../utlils';

const TABS = ['All', 'Deposits', 'Stakes', 'payouts'];

const TRANSACTIONS = [
  { id: '1', amount: 1000, date: '2025-04-20', type: 'Deposit', credit: true },
  { id: '2', amount: 500, date: '2025-04-18',game:'Game: Lucky Number', type: 'Stake', credit: false },
  { id: '3', amount: 200, date: '2025-04-15', type: 'Payout', credit: true },
  { id: '4', amount: 300, date: '2025-04-14',game:'Game: Lucky Number', type: 'Stake', credit: false },
  { id: '5', amount: 800, date: '2025-04-10', type: 'Deposit', credit: true },
  { id: '6', amount: 800, date: '2025-04-10', type: 'Deposit', credit: true },
  { id: '7', amount: 300, date: '2025-04-14',game:'Game: Lucky Number', type: 'payouts', credit: true },

];

export default function TransactionsHistory() {
  const [activeTab, setActiveTab] = useState('All');

  const getFilteredTransactions = () => {
    if (activeTab === 'All') return TRANSACTIONS;
    return TRANSACTIONS.filter(t => t.type === activeTab.slice(0, -1)); // remove 's'
  };

  const iconMap = {
    Deposit: {
      component: FontAwesome5,
      name: 'piggy-bank',
      color: '#22C55E',
    },
    Stake: {
      component: Ionicons,
      name: 'trending-down',
      color: '#F97316',
    },
    Payout: {
      component: MaterialIcons,
      name: 'payments',
      color: '#3B82F6',
    },
  };
  
  const renderIcon = (type) => {
    const icon = iconMap[type];
    if (!icon) return null;
  
    const IconComponent = icon.component;
    return <IconComponent name={icon.name} size={20} color={icon.color} />;
  };
  

  const renderTransaction = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.row}>
        {renderIcon(item.type)}
        <View style={styles.details}>
          <Text
            style={[
              styles.amount,
              { color: item.credit ? '#22C55E' : '#EF4444' },
            ]}
          >
            {item.credit ? '+' : '-'} {formatCurrency(item.amount)}
          </Text>
          <Text style={styles.type}>{item.type}</Text>
        </View>
      </View>
      <Text style={styles.date}>{item.date}</Text>
    </View>
  );

  return (
    <>
      <Header name="Transactions History" arrow="arrow-back" backgroundColor="#A8BFED" />
      <View style={styles.container}>
        <View style={styles.tabs}>
          {TABS.map(tab => (
            <Pressable
              key={tab}
              onPress={() => setActiveTab(tab)}
              style={({ pressed }) => [
                styles.tab,
                activeTab === tab && styles.activeTab,
                pressed && styles.tabPressed,
              ]}
            >
              <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
                {tab}
              </Text>
            </Pressable>
          ))}
        </View>

        <FlatList
          data={getFilteredTransactions()}
          keyExtractor={(item) => item.id}
          renderItem={renderTransaction}
          ListEmptyComponent={
            <Text style={styles.empty}>No Transactions found.</Text>
          }
          contentContainerStyle={{ paddingBottom: '156%', }}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#F8FAFC',
    padding: 16,
    // height:"100%"
  },
  tabs: {
    flexDirection: 'row',
    backgroundColor: '#E5EAF2',
    borderRadius: 30,
    padding: 5,
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 20,
  },
  activeTab: {
    backgroundColor: '#3B82F6',
  },
  tabPressed: {
    opacity: 0.8,
  },
  tabText: {
    fontSize: 14,
    color: '#475569',
    fontFamily: 'montserratMeduim',
  },
  activeTabText: {
    color: '#FFF',
    fontWeight: '600',
  },
  card: {
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 4,
    elevation: 3,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  details: {
    marginLeft: 12,
  },
  amount: {
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'montserratMeduim',
  },
  type: {
    fontSize: 13,
    color: '#64748B',
    marginTop: 2,
    fontFamily: 'montserratMeduim',
  },
  date: {
    fontSize: 12,
    color: '#94A3B8',
    marginTop: 10,
    fontFamily: 'montserratMeduim',
  },
  empty: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 14,
    color: '#94A3B8',
    fontFamily: 'montserratMeduim',
  },
});
