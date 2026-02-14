import React from 'react';
import { View, Text, Picker } from 'react-native';
import styled from 'styled-components/native';
import { Picker as RNPicker } from '@react-native-picker/picker';

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

const StyledPickerContainer = styled.View`
  background-color: #f1f4f9;
  border-radius: 10px;
  border: 1px solid #dce1eb;
  margin-bottom: 16px;
`;

const WithdrawButton = styled.TouchableOpacity`
  background-color: #0d6efd;
  padding: 16px;
  border-radius: 12px;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
`;

const WithdrawText = styled.Text`
  color: #fff;
  font-size: 17px;
  font-weight: bold;
`;

export default function WithdrawScreen() {
  const [amount, setAmount] = React.useState('');
  const [bankAccount, setBankAccount] = React.useState('');

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
          placeholderTextColor="#9ba1b7"
          value={amount}
          onChangeText={setAmount}
        />

        <Label>Bank Account</Label>
        <StyledPickerContainer>
          <RNPicker
            selectedValue={bankAccount}
            onValueChange={(value) => setBankAccount(value)}
            style={{ color: '#1a1a1a' }}
          >
            <RNPicker.Item label="Select Account" value="" />
            <RNPicker.Item label="Zenith - 1234" value="1234" />
          </RNPicker>
        </StyledPickerContainer>
      </FormCard>

      <WithdrawButton>
        <WithdrawText>Request Withdrawal</WithdrawText>
      </WithdrawButton>
    </Container>
  );
}
