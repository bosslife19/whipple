import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import { MaterialIcons, FontAwesome5, Ionicons } from '@expo/vector-icons';
import Header from '../Header/Header';
import { formatCurrency } from '../../utlils/formatCurrency';
import { formatDate } from '../../utlils/formatDate';
import axiosClient from "../../axiosClient"

// Tabs now have label + key
const TABS = [
  { label: 'All', key: 'all' },
  { label: 'Deposits', key: 'deposit' },
  { label: 'Stakes', key: 'game' },
  { label: 'Payouts', key: 'withdrawal' },
];

export default function TransactionsHistory() {
  const [activeTab, setActiveTab] = useState('All');
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch transactions from API
  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const res = await axiosClient.get("/transaction-list");
      setTransactions(res.data.data); // assuming API returns array of transactions
    } catch (error) {
      console.error('Error fetching transactions:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const getFilteredTransactions = () => {
    if (activeTab === 'all') return transactions;
    return transactions.filter(
      t => t.type && t.type.toLowerCase() === activeTab.toLowerCase()
    );
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

  const renderIcon = type => {
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
              { color: item.type == 'deposit' ? '#22C55E' : '#EF4444' },
            ]}
          >
            {item.type == 'deposit' ? '+' : '-'} {formatCurrency(item.amount)}
          </Text>
          <Text style={styles.type}>{item.type}</Text>
        </View>
      </View>
      <Text style={styles.date}>{formatDate(item.created_at)}</Text>
    </View>
  );

  return (
    <>
      <Header
        name="Transactions History"
        arrow="arrow-back"
        backgroundColor="#A8BFED"
      />
      <View style={styles.container}>
        <View style={styles.tabs}>
          {TABS.map(tab => (
            <Pressable
              key={tab.key}
              onPress={() => setActiveTab(tab.key)}
              style={({ pressed }) => [
                styles.tab,
                activeTab === tab.key && styles.activeTab,
                pressed && styles.tabPressed,
              ]}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === tab.key && styles.activeTabText,
                ]}
              >
                {tab.label}
              </Text>
            </Pressable>
          ))}
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#3B82F6" />
        ) : (
          <FlatList
            data={getFilteredTransactions()}
            keyExtractor={item => item.id.toString()}
            renderItem={renderTransaction}
            ListEmptyComponent={
              <Text style={styles.empty}>No Transactions found.</Text>
            }
            contentContainerStyle={{ paddingBottom: '156%' }}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F8FAFC',
    padding: 16,
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
