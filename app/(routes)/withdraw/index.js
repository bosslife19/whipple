import React, {useState, useEffect} from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import styled from 'styled-components/native';
import { Picker } from "@react-native-picker/picker";
import axiosClient from "../../../axiosClient";
import { useRequest } from "../../../hooks/useRequest";

const Container = styled.View`
  flex: 1;
  background-color: #1a1a1a;
  padding: 16px;
`;

const Header = styled.Text`
  color: #fff;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 16px;
`;

const StepBox = styled.View`
  background-color: #333;
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 16px;
`;

const StepText = styled.Text`
  color: #ccc;
  margin-bottom: 4px;
`;

const FormCard = styled.View`
  background-color: #2a2a2a;
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 16px;
`;

const Label = styled.Text`
  color: #f0f0f0;
  margin-bottom: 4px;
`;

const Input = styled.TextInput`
  background-color: #1a1a1a;
  color: #fff;
  padding: 12px;
  border-radius: 6px;
  margin-bottom: 12px;
`;

const OTPSelector = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 16px;
`;

const OTPButton = styled.TouchableOpacity`
  flex: 1;
  background-color: ${({ selected }) => (selected ? '#00cc44' : '#333')};
  padding: 12px;
  border-radius: 6px;
  margin-right: ${({ isLast }) => (isLast ? '0px' : '8px')};
`;

const OTPText = styled.Text`
  color: #fff;
  text-align: center;
`;

const WithdrawButton = styled.TouchableOpacity`
  background-color: #00cc44;
  padding: 16px;
  border-radius: 8px;
  align-items: center;
`;

const WithdrawText = styled.Text`
  color: #1a1a1a;
  font-size: 18px;
  font-weight: bold;
`;

export default function WithdrawScreen() {
  const [amount, setAmount] = React.useState('');
  const [bankAccount, setBankAccount] = React.useState([]);
  const [otpMethod, setOtpMethod] = React.useState('sms');
  const [selectedBank, setSelectedBank] = useState("");
  const [bankCode, setBankCode] = useState("");
  const [pin, setPin] = useState('');
  const [searchText, setSearchText] = useState("");
  const [loader, setLoader] = useState("");
  const { loading, makeRequest } = useRequest();
  const [accountNumber, setAccountNumber] = useState("");

  const filteredBanks = bankAccount.filter((b) =>
    b.bank_name.toLowerCase().includes(searchText.toLowerCase())
  );

  const fetchbank = async () => {
    try {
      setLoader("bank");
      const res = await axiosClient.get("/bank-list");
      
      setBankAccount(res.data.data ?? []); // assuming API returns array of transactions
    } catch (error) {
      console.log('Error fetching bank:', error);
    } finally {
      setLoader("");
    }
  };

  useEffect(() => {
    fetchbank();
  }, []);

  const handleWithdrawalRequest = async () => {
    if (!amount || parseFloat(amount) < 100) {
        return Alert.alert("Invalid Amount", "Please enter a valid amount (min. 100)");
    }
    if (!bankCode) {
      return Alert.alert("Error", "Please select a bank account");
    }
//  return console.log(bankCode, amount, pin);
    try {
      const { error, response }  = await makeRequest("/withdraw/request", {   
        bank_code: bankCode,
        amount: amount,
        pin: pin, 
        accountNumber: accountNumber,
      });
      if (error) {
        return Alert.alert("Error", error?.message);
      }
      Alert.alert("Success", "Withdrawal  successful. Please check your bank account!");
    } catch (err) {
      Alert.alert("Error", "Withdrawal failed. Please try again.");
    }
  };
 
  return (
    <Container>
      <Header>Withdraw</Header>
      <StepBox>
        <StepText>1) Enter the amount you wish to withdraw</StepText>
        <StepText>2) Choose a registered bank account</StepText>
        
        <StepText>3) Verify with SMS or Email OTP</StepText>
      </StepBox>
      <FormCard>
        <Label>Amount</Label>
        <Input
          placeholder="₦1,000 min"
          keyboardType="numeric"
          placeholderTextColor="#555"
          value={amount}
          onChangeText={(text) => setAmount(text)}
        />
        <Label>Pin</Label>
        <Input
          placeholder="***"
          keyboardType="numeric"
          placeholderTextColor="#555"
          value={pin}
          secureTextEntry
          onChangeText={(text) => setPin(text)}
        />
        <Label>Bank Account</Label>
        <View style={styles.container}>
            {/* Search Input */}
            {/* <TextInput
                style={styles.searchInput}
                placeholder="Search bank..."
                value={searchText}
                onChangeText={setSearchText}
            /> */}

            {/* Loader / Picker */}
            {loader === "bank" ? (
                <ActivityIndicator size="large" color="#000" />
            ) : (
                <View style={styles.pickerWrapper}>
                <Picker
                    selectedValue={selectedBank}
                    onValueChange={(itemValue) => {
                    const bank = bankAccount.find((b) => b.bank_code === itemValue);
                    
                    if (bank) {
                      
                        setSelectedBank(itemValue);
                        setBankCode(bank.bank_code);
                        setAccountNumber(bank.account_number);
                    }
                    }}
                >
                    <Picker.Item label="Select a bank" value="" />
                    {filteredBanks.map((bank) => (
                    <Picker.Item
                        key={bank.bank_code}
                        label={bank.bank_name + " - " + bank.account_number}
                        value={bank.bank_code}
                    />
                    ))}
                </Picker>
                </View>
            )}
        </View>
      </FormCard>
      {/* <OTPSelector>
        <OTPButton
          selected={otpMethod === 'sms'}
          onPress={() => setOtpMethod('sms')}
        >
          <OTPText>SMS OTP</OTPText>
        </OTPButton>
        <OTPButton
          selected={otpMethod === 'email'}
          isLast
          onPress={() => setOtpMethod('email')}
        >
          <OTPText>Email OTP</OTPText>
        </OTPButton>
      </OTPSelector> */}
      <TouchableOpacity 
        onPress={handleWithdrawalRequest} 
        disabled={!amount || !bankCode || loading} 
        style={{ 
            backgroundColor: "#00cc44", 
            padding: 16, 
            borderRadius: 8, 
            alignItems: "center", 
            opacity: (!amount || !bankCode || loading) ? 0.5 : 1 
        }}
        >
        <WithdrawText>{loading ? "Processing..." : "Withdraw"}</WithdrawText>
       </TouchableOpacity>

        {/* <WithdrawButton>
            <WithdrawText>{loading ? "Processing..." : "Request Withdrawal"}</WithdrawText>
        </WithdrawButton> */}
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 8,
    overflow: "hidden",
  },
});
