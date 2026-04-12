import React, {useState, useEffect} from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import styled from 'styled-components/native';
import { Picker } from "@react-native-picker/picker";
import axiosClient from "../../../axiosClient";
import { useRequest } from "../../../hooks/useRequest";
import { SafeAreaView } from 'react-native-safe-area-context';

/* -------------------- NEW PROFESSIONAL LIGHT THEME -------------------- */

const Container = styled.View`
  flex: 1;
  background-color: #f7f9fc;
  padding: 20px;
`;

const Header = styled.Text`
  color: #1a1a1a;
  font-size: 26px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const StepBox = styled.View`
  background-color: #ffffff;
  padding: 16px;
  border-radius: 12px;
  margin-bottom: 20px;
  border: 1px solid #e6e9ef;
  shadow-color: #000;
  shadow-opacity: 0.05;
  shadow-radius: 4px;
  elevation: 2;
`;

const StepText = styled.Text`
  color: #555;
  margin-bottom: 6px;
  font-size: 14px;
`;

const FormCard = styled.View`
  background-color: #ffffff;
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 24px;
  border: 1px solid #e6e9ef;
  shadow-color: #000;
  shadow-opacity: 0.05;
  shadow-radius: 4px;
  elevation: 2;
`;

const Label = styled.Text`
  color: #333;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 6px;
`;

const Input = styled.TextInput`
  background-color: #f1f4f9;
  color: #1a1a1a;
  padding: 14px;
  border-radius: 10px;
  margin-bottom: 16px;
  border: 1px solid #dce1eb;
`;

/* -------------------- PICKER WRAP -------------------- */

const PickerWrapper = styled.View`
  background-color: #f1f4f9;
  border: 1px solid #dce1eb;
  border-radius: 10px;
  margin-bottom: 16px;
  overflow: hidden;
`;

/* -------------------- BUTTON -------------------- */

const WithdrawButton = styled.TouchableOpacity`
  background-color: #0d6efd;
  padding: 16px;
  border-radius: 12px;
  align-items: center;
  opacity: ${({disabled}) => (disabled ? 0.5 : 1)};
`;

const WithdrawText = styled.Text`
  color: #fff;
  font-size: 17px;
  font-weight: bold;
`;

/* ---------------------------------------------------------------------- */

export default function WithdrawScreen() {
  const [amount, setAmount] = useState('');
  const [bankAccount, setBankAccount] = useState([]);
  const [otpMethod, setOtpMethod] = useState('sms');
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
      setBankAccount(res.data.data ?? []);
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

    try {
      const { error }  = await makeRequest("/withdraw/request", {   
        bank_code: bankCode,
        amount,
        pin,
        accountNumber,
      });

      if (error) {
        return Alert.alert("Error", error?.message);
      }

      Alert.alert("Success", "Withdrawal successful. Please check your bank account!");
    } catch (err) {
      Alert.alert("Error", "Withdrawal failed. Please try again.");
    }
  };

  return (
    <SafeAreaView style={{flex:1}}>
     <Container>
      <Header style={{textAlign:'center'}}>Withdraw</Header>

      <StepBox>
        <StepText>1) Enter the amount you wish to withdraw</StepText>
        <StepText>2) Choose a registered bank account</StepText>
        <StepText>3) Input your transaction pin</StepText>
        <StepText>4) Press the "Withdraw" button</StepText>
        <StepText>5) If withdrawal is successful, it will be credited to your bank account within five minutes!</StepText>

      </StepBox>

      <FormCard>
        <Label>Amount</Label>
        <Input
          placeholder="₦1,000 min"
          keyboardType="numeric"
          placeholderTextColor="#9ba1b7"
          value={amount}
          onChangeText={setAmount}
        />

        <Label>Pin</Label>
        <Input
          placeholder="***"
          keyboardType="numeric"
          placeholderTextColor="#9ba1b7"
          secureTextEntry
          value={pin}
          onChangeText={setPin}
        />

        <Label>Bank Account</Label>

        {loader === "bank" ? (
          <ActivityIndicator size="large" color="#0d6efd" />
        ) : (
          <PickerWrapper>
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
              style={{ color: "#1a1a1a" }}
            >
              <Picker.Item label="Select a bank" value="" />
              {filteredBanks.map((bank) => (
                <Picker.Item
                  key={bank.bank_code}
                  label={`${bank.bank_name} - ${bank.account_number}`}
                  value={bank.bank_code}
                />
              ))}
            </Picker>
          </PickerWrapper>
        )}
      </FormCard>

      <WithdrawButton 
        onPress={handleWithdrawalRequest}
        disabled={!amount || !bankCode || loading}
      >
        <WithdrawText>{loading ? "Processing..." : "Withdraw"}</WithdrawText>
      </WithdrawButton>
    </Container>
    </SafeAreaView>   

  );
}

const styles = StyleSheet.create({});
