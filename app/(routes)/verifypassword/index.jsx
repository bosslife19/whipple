import {
  View,
  Text,
  TextInput,
  Alert,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';

export default function VerifyCode() {
  const { email } = useLocalSearchParams();
  const [code, setCode] = useState('');
  const API_URL = process.env.EXPO_PUBLIC_BASE_URL;

  const verify = async () => {
    if (code.length !== 4) {
      Alert.alert('Invalid code', 'Enter the 4-digit code');
      return;
    }

    try {
      const res = await fetch(`${API_URL}/api/verify-reset-code`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code }),
      });

      if (!res.ok) throw new Error();

      router.push({
        pathname: '/resetpassword',
        params: { email, code },
      });
    } catch {
      Alert.alert('Verification failed', 'The code is invalid or expired');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verify your email</Text>
      <Text style={styles.subtitle}>
        Enter the 4-digit code sent to {email}
      </Text>

      <TextInput
        keyboardType="number-pad"
        maxLength={4}
        value={code}
        onChangeText={setCode}
        style={styles.otpInput}
        placeholder="••••"
        placeholderTextColor="#9CA3AF"
      />

      <TouchableOpacity
        style={[
          styles.button,
          code.length !== 4 && styles.buttonDisabled,
        ]}
        onPress={verify}
        disabled={code.length !== 4}
      >
        <Text style={styles.buttonText}>Verify code</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
    justifyContent: 'center',
  },

  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 32,
    lineHeight: 20,
  },

  otpInput: {
    height: 64,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 14,
    textAlign: 'center',
    fontSize: 24,
    letterSpacing: 12,
    color: '#111827',
    backgroundColor: '#F9FAFB',
    marginBottom: 24,
  },

  button: {
    height: 52,
    borderRadius: 12,
    backgroundColor: '#2563EB',
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonDisabled: {
    backgroundColor: '#93C5FD',
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
