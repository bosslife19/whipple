import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
} from 'react-native';

const BankInfoScreen = () => {
  const [bankName, setBankName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [bankAccounts, setBankAccounts] = useState([
    { id: '1', bankName: 'GTBank', accountNumber: '1234567890' },
    { id: '2', bankName: 'Access Bank', accountNumber: '0987654321' },
  ]);

  const handleAddBankAccount = () => {
    if (bankName && accountNumber) {
      const newAccount = {
        id: Date.now().toString(),
        bankName,
        accountNumber,
      };
      setBankAccounts([...bankAccounts, newAccount]);
      setBankName('');
      setAccountNumber('');
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>🏦 Bank Information</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Saved Bank Accounts</Text>
        {bankAccounts.map((item) => (
          <View key={item.id} style={styles.accountCard}>
            <Text style={styles.bankName}>{item.bankName}</Text>
            <Text style={styles.accountNumber}>{item.accountNumber}</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Add New Bank</Text>

        <Text style={styles.label}>Bank Name</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. Zenith Bank"
          value={bankName}
          onChangeText={setBankName}
        />

        <Text style={styles.label}>Account Number</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. 1234567890"
          keyboardType="numeric"
          value={accountNumber}
          onChangeText={setAccountNumber}
          maxLength={10}
        />

        <TouchableOpacity style={styles.addButton} onPress={handleAddBankAccount}>
          <Text style={styles.addButtonText}>+ Add Bank Account</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F9FAFB',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 24,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
    marginBottom: 6,
    marginTop: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  addButton: {
    backgroundColor: '#4F46E5',
    paddingVertical: 14,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  accountCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  bankName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  accountNumber: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
});

export default BankInfoScreen;
