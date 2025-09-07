import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import styled from 'styled-components/native';

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
  const [bankAccount, setBankAccount] = React.useState('');
  const [otpMethod, setOtpMethod] = React.useState('sms');

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
          onChangeText={setAmount}
        />
        <Label>Bank Account</Label>
        <Picker
          selectedValue={bankAccount}
          style={{ color: '#fff' }}
          onValueChange={(value) => setBankAccount(value)}
        >
          <Picker.Item label="Select Account" value="" />
          {/* Dynamically render registered accounts */}
          <Picker.Item label="Zenith - 1234" value="1234" />
        </Picker>
      </FormCard>
      <OTPSelector>
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
      </OTPSelector>
      <WithdrawButton onPress={() => {/* handle withdrawal logic */}}>
        <WithdrawText>Request Withdrawal</WithdrawText>
      </WithdrawButton>
    </Container>
  );
}
