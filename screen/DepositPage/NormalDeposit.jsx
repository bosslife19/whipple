import { MaterialIcons } from '@expo/vector-icons';
import React, { useState, useContext, useRef  } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert
} from 'react-native';
import { formatCurrency } from '../../utlils';
import { router } from 'expo-router';
import { useRequest } from "../../hooks/useRequest";
import {AuthContext} from '../../context/AuthContext'
import { usePaystack } from 'react-native-paystack-webview';  

const presetAmounts = [100,200,500,1000];

export default function NormalDeposit({ amount, setAmount }) {
  const [isFocused, setIsFocused] = useState(false);
  const { loading, makeRequest } = useRequest();
  const {userDetails, setUserBalance, setUserDetails} = useContext(AuthContext)
  const { popup } = usePaystack();

  const handleClear = () => setAmount('');

  const handlePayment = async () => {
    if (!amount || parseFloat(amount) < 100) {
      return Alert.alert("Invalid Amount", "Please enter a valid amount (min. 100)");
    }
    try {
      const { error, response }  = await makeRequest("/deposit/initialize", {   
        amount: parseFloat(amount), // Paystack expects amount in kobo
        reference: "",
        gateway: "paystack",
        meta: ""
      }
      );  
      if (error) {
        return Alert.alert("Error", error);
      }

      popup.checkout({
        email: userDetails?.email,
        amount: parseFloat(amount), // Convert to kobo
        reference: response?.data?.ref,
        metadata: {
          custom_fields: [
            {
              display_name: userDetails?.name
            }
          ]
        },
        
        onSuccess: (res) => handleVerifyPayment(res),
        onCancel: () => console.log('User cancelled'),
        onLoad: (res) => console.log('WebView Loaded:', res),
        onError: (err) => console.log('WebView Error:', err)
      });  
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Unable to initiate payment");
    } 
  };  

  const handleVerifyPayment = async (data) => {
    try {
      const { error, response }  = await makeRequest("/deposit/verified", {   
        ref: data?.reference,
        reference: data?.trans || data?.transaction,
        meta: data
      });
      if (error) {

        return Alert.alert("Error", "Error verifying payment");
      }
      setUserBalance(response?.data)
      setUserDetails(prev=>({...prev, wallet_balance:response?.data}));
      Alert.alert("Success", "Deposit Successful!");
      setTimeout(()=>{
        router.replace('(tabs)/home');
      },2000);
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Unable to verify payment");
    }
  };

  return (
    <View>
      <Text style={styles.label}>Deposit Amount(₦)</Text>
      <View style={[styles.inputWrapper, isFocused && styles.inputFocused]}>
        <TextInput
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
          placeholder="Min. 100"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={styles.input}
        />
        
      </View>

      <View style={styles.amountRow}>
      {/* {amount.length > 0 && ( */}
       <TouchableOpacity style={styles.amountButton} onPress={handleClear}>
        <Text style={styles.amountText}>Clear</Text>
        </TouchableOpacity>
        
        {presetAmounts.map((amt) => (
          <TouchableOpacity
            key={amt}
            style={styles.amountButton}
            onPress={() => {
              const current = parseInt(amount || '0', 10);
              const updated = current + amt;
              setAmount(String(updated));
            }}
            
          >
            <Text style={styles.amountText}>+ {amt}</Text>
          </TouchableOpacity>
        ))}
        
      </View>

      <TouchableOpacity onPress={() => handlePayment()} style={styles.button}>
        <Text style={styles.buttonText}>
        {loading ? 'Processing...' : `Deposit ${formatCurrency(amount)}`}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={()=> router.push("/(routes)/deposit/deposit-history")} style={styles.outlineButton}>
        <Text style={styles.outlineText}>Deposit History</Text>
        <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    marginBottom: 8,
    fontWeight: '600',
    fontFamily: "montserratMeduim"

  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 10,
    marginBottom: 15,
    justifyContent: 'space-between',
 
  },
  inputFocused: {
    borderColor: '#007BFF',
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontFamily: "montserratMeduim"

  },
  amountRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  amountButton: {
    borderColor: '#CAE4FF',
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal:"3.4%",
    borderRadius: 8,
    // width: '20%',
    alignItems: 'center',
    backgroundColor: '#CAE4FF',
  },
  amountText: {
    fontWeight: 'bold',
    fontFamily: "montserratMeduim",
    lineHeight:20
  },
  button: {
    backgroundColor: '#212121',
    padding: 20,
    borderRadius: 15,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontFamily: "montserratMeduim"

  },
  outlineButton: {
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#E0E0E0',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  outlineText: {
    color: '#212121',
    textAlign: 'center',
    fontWeight: 'bold',
    fontFamily: "montserratMeduim"

  },
});
