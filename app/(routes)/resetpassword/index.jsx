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

export default function ResetPassword() {
  const { email, code } = useLocalSearchParams();
  const [password, setPassword] = useState('');
  const API_URL = process.env.EXPO_PUBLIC_BASE_URL;

  const reset = async () => {
    if (!password || password.length < 8) {
      Alert.alert('Invalid password', 'Password must be at least 8 characters');
      return;
    }

    try {
      const res = await fetch(`${API_URL}/api/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code, password }),
      });

      if (!res.ok) throw new Error();

      Alert.alert('Success', 'Password reset successful');
      router.replace('/auth/login');
    } catch {
      Alert.alert('Error', 'Unable to reset password');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Set New Password</Text>
      <Text style={styles.subtitle}>
        Enter a strong password for your account associated with {email}.
      </Text>

      <TextInput
        placeholder="New Password"
        placeholderTextColor="#9CA3AF"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={styles.input}
      />

      <TouchableOpacity
        style={[styles.button, !password || password.length < 8 ? styles.buttonDisabled : null]}
        onPress={reset}
        disabled={!password || password.length < 8}
      >
        <Text style={styles.buttonText}>Reset Password</Text>
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

  input: {
    height: 52,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#111827',
    marginBottom: 24,
    backgroundColor: '#F9FAFB',
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
