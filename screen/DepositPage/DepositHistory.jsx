import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { formatCurrency } from '../../utlils';
 import Header from '../Header/Header';

const depositHistory = [
  { id: '1', amount: 1000, date: '2025-04-20' },
  { id: '2', amount: 500, date: '2025-04-18' },
  { id: '3', amount: 200, date: '2025-04-15' },
];

// const formatCurrency = () => {
//   return value.toLocaleString('en-NG', {
//     style: 'currency',
//     currency: 'NGN',
//     minimumFractionDigits: 0,
//   });
// };

export default function DepositHistory() {
  return (
    <>
    <Header name="Transactions History" arrow="arrow-back" backgroundColor="#A8BFED" />
    <View style={styles.container}>
      <FlatList
        data={depositHistory}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.historyItem}>
            <Text style={styles.amount}>{formatCurrency(item.amount)}</Text>
            <Text style={styles.date}>{item.date}</Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No Transactions found.</Text>
        }
      />
    </View>
    </>
    
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    height: "100%",
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    fontFamily: 'montserratMeduim',
  },
  historyItem: {
    padding: 15,
    backgroundColor: '#F5F5F5',
    marginBottom: 10,
    borderRadius: 10,
  },
  amount: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'montserratMeduim',
  },
  date: {
    color: '#777',
    marginTop: 5,
    fontFamily: 'montserratMeduim',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    color: '#999',
    fontFamily: 'montserratMeduim',
  },
});
