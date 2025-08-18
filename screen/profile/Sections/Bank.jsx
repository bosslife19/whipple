import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
  ActivityIndicator,
  Alert
} from 'react-native';
import { useRequest } from "../../../hooks/useRequest";
import axiosClient from "../../../axiosClient"
import { Dropdown } from "react-native-element-dropdown";

const BankInfoScreen = () => {
  const [banks, setBanks] = useState([]);
  const [bankName, setBankName] = useState('');
  const [bankCode, setBankCode] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [selectedBank, setSelectedBank] = useState(null);
  const { loading: loader, makeRequest } = useRequest();

  const [bankAccounts, setBankAccounts] = useState([]);
  const [loading, setLoading] = useState(false);

   // Fetch transactions from API
  const fetchBank = async () => {
    try {
      setLoading(true);
      const res = await axiosClient.get("/paystack/getbank");
      setBanks(res.data.banks.map((bank, index) => ({
        key: index.toString(), // unique key for each item
        label: bank.name, // for dropdown
        value: bank.code, // for dropdown
        name: bank.name,
        code: bank.code,
      }))); 
    } catch (error) {
      console.error('Error fetching bank:', error);
    } finally {
      setLoading(false); 
    }
  };

  const fetchBankList = async () => {
    try {
      setLoading(true);
      const res = await axiosClient.get("/bank-list");
      setBankAccounts(res.data.data ?? []); 
    } catch (error) {
      console.error('Error fetching bank:', error);
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    fetchBank();
    fetchBankList();
  }, []);

  const handleAddBankAccount = async () => {
    if (bankName && accountNumber) {
      try {
        const { error, response }  = await makeRequest("/bank-save", {   
          bank_name: bankName,
          bank_code: bankCode,
          account_number: accountNumber,
        });
        if (error) {
          // console.error(error);
          return Alert.alert("Error", "Error saving bank account");
        }
        fetchBankList()
        Alert.alert("Success", "Bank Saved!");
      } catch (err) {
        console.error(err);
        Alert.alert("Error", "Unable to resolve bank account");
      }
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>🏦 Bank Information</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Saved Bank Accounts</Text>
        {bankAccounts.map((item) => (
          <View key={item.id} style={styles.accountCard}>
            <Text style={styles.bankName}>{item.bank_name}</Text>
            <Text style={styles.accountNumber}>{item.account_number}</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Add New Bank</Text>

        <Text style={styles.label}>Bank Name</Text>
        {loading ? (
          <ActivityIndicator size="large" color="#000" />
          ) : (
          <Dropdown
            style={styles.dropdown}
            data={banks}
            labelField="label"
            valueField="value"
            placeholder="-- Select a Bank --"
            search
            searchPlaceholder="Search bank..."
            value={selectedBank}
            onChange={item => {
              setSelectedBank(item.value);
              setBankCode(item.code);
              setBankName(item.name);1
            }}
          />
        )}

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
          <Text style={styles.addButtonText}>{loader ? 'Processing ...' : '+ Add Bank Account'}</Text>
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
  dropdown: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 50,
  },
});

export default BankInfoScreen;
