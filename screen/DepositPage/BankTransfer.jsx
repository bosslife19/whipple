import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Linking } from 'react-native';
import * as Clipboard from 'expo-clipboard';

export default function BankTransfer() {
  const [copiedText, setCopiedText] = useState(null);

  const copyToClipboard = async (text) => {
    await Clipboard.setStringAsync(text);
    setCopiedText(text);
    Alert.alert("Copied", `${text} copied to clipboard`);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const openEmailApp = () => {
    const email = "support@whipple.com";
    Linking.openURL(`mailto:${email}`);
  };

  const CopyRow = ({ label, value }) => (
    <View style={styles.copyRow}>
      <Text style={styles.bankDetails}>{label}: {value}</Text>

      <TouchableOpacity
        onPress={() => copyToClipboard(value)}
        style={[
          styles.copyButton,
          copiedText === value && styles.copyButtonActive
        ]}
      >
        <Text style={styles.copyIcon}>
          📋
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View>
      <View style={styles.instructionsBox}>
        <Text style={styles.instructionsTitle}>Bank Transfer Instructions</Text>

        <Text style={styles.instructionsSubtitle}>
          To fund your Whipple wallet, please make a transfer to any of the company accounts below.
        </Text>

        {/* Moniepoint */}
        <Text style={styles.bankHeader}>Moniepoint Business Account</Text>
        <Text style={styles.bankDetails}>Account Name: Torsade de Pointes Ltd</Text>
        <CopyRow label="Account Number" value="8149470004" />

        {/* Kuda */}
        <Text style={styles.bankHeader}>Kuda Business Account</Text>
        <Text style={styles.bankDetails}>Account Name: Torsade de Pointes Ltd</Text>
        <CopyRow label="Account Number" value="3002890619" />

        {/* Email */}
        <TouchableOpacity onPress={openEmailApp} style={{ marginTop: 15 }}>
          <Text style={styles.emailText}>
            Send your payment receipt to: <Text style={styles.emailLink}>support@whipple.com</Text>
          </Text>
        </TouchableOpacity>

        <Text style={styles.infoNote}>
          Once your transfer is received, your Whipple wallet will be credited instantly.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  instructionsBox: {
    marginTop: 20,
    padding: 18,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e6e6e6',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  instructionsTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
    color: '#222',
    fontFamily: 'montserratMedium',
  },
  instructionsSubtitle: {
    fontSize: 14,
    color: '#555',
    marginBottom: 15,
    lineHeight: 20,
    fontFamily: 'montserratMedium',
  },
  bankHeader: {
    marginTop: 10,
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    fontFamily: 'montserratMedium',
  },
  bankDetails: {
    fontSize: 14,
    marginTop: 4,
    color: '#444',
    fontFamily: 'montserratMedium',
  },

  /* New Copy Row */
  copyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 6,
    backgroundColor: '#f5f5f5',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  copyButton: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    backgroundColor: '#e1ecf4',
    borderRadius: 6,
  },
  copyButtonActive: {
    backgroundColor: '#c8f7cd',
  },
  copyIcon: {
    fontSize: 16,
    color: '#0066cc',
    fontWeight: '600',
  },

  emailText: {
    fontSize: 14,
    color: '#333',
    fontFamily: 'montserratMedium',
  },
  emailLink: {
    color: '#0066cc',
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  infoNote: {
    marginTop: 18,
    fontSize: 14,
    fontWeight: '500',
    color: '#2e7d32',
    lineHeight: 20,
    fontFamily: 'montserratMedium',
  },
});
