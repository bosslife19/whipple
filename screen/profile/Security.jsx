import React from 'react';
import { TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import Header from '../Header/Header';
import FLipCoin from '../../styles/flipcoin/flipCoin';

const Security = () => {
    return (
        <View style={{height:'100%'}}>
           <Header name={'Security'} />
             <View style={styles.card}>
              <Text style={styles.cardTitle}>Security Settings</Text>
              <View style={styles.section}>
                <Text style={styles.label}>Change Password</Text>
                <TextInput placeholder="Current password" secureTextEntry style={styles.input} />
                <TextInput placeholder="New password" secureTextEntry style={styles.input} />
                <TextInput placeholder="Confirm new password" secureTextEntry style={styles.input} />
                <TouchableOpacity style={FLipCoin.FlipButton}>
                  <Text style={[styles.primaryButtonText,{width:'100%',textAlign:'center'}]}>Update Password</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.card}>
              <Text style={styles.cardTitle}>Transaction PIN</Text>
              <View style={styles.section}>
                <Text style={styles.description}>
                  Your transaction PIN is required for all withdrawals and staking games.
                </Text>
                <TouchableOpacity style={styles.secondaryButton}>
                  <Text style={styles.secondaryButtonText}>Set/Change Transaction PIN</Text>
                </TouchableOpacity>
              </View>
            </View>
         </View>
    );
}

const styles = StyleSheet.create({
    container: {
      padding: 16,
    },
    tabList: {
      flexDirection: 'row',
      backgroundColor: '#f3f4f6',
      borderRadius: 8,
      marginBottom: 24,
    },
    tabButton: {
      flex: 1,
      paddingVertical: 10,
      alignItems: 'center',
      borderRadius: 6,
    },
    activeTabButton: {
      backgroundColor: '#ffffff',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 1,
      elevation: 2,
    },
    tabText: {
      fontSize: 14,
      color: '#6b7280',
    },
    activeTabText: {
      color: '#000000',
      fontWeight: 'bold',
    },
    tabPanel: {
      gap: 20,
    },
    card: {
      backgroundColor: '#ffffff',
      padding: 16,
      borderRadius: 8,
      marginBottom: 20,
      borderColor: '#e5e7eb',
      borderWidth: 1,
    },
    cardTitle: {
      fontSize: 18,
      fontWeight: '600',
      marginBottom: 12,
    },
    section: {
      gap: 12,
    },
    label: {
      fontSize: 14,
      fontWeight: '500',
      marginBottom: 4,
    },
    input: {
      borderColor: '#d1d5db',
      borderWidth: 1,
      borderRadius: 6,
      padding: 10,
      fontSize: 16,
      marginBottom: 10,
      backgroundColor: '#f9fafb',
    },
    primaryButton: {
      backgroundColor: '#6b21a8',
      paddingVertical: 12,
      borderRadius: 6,
      alignItems: 'center',
    },
    primaryButtonText: {
      color: '#ffffff',
      fontSize: 16,
    },
    secondaryButton: {
      borderColor: '#d1d5db',
      borderWidth: 1,
      paddingVertical: 12,
      borderRadius: 6,
      alignItems: 'center',
      backgroundColor: '#f3f4f6',
    },
    secondaryButtonText: {
      color: '#111827',
      fontSize: 16,
    },
    description: {
      fontSize: 14,
      color: '#6b7280',
      marginBottom: 12,
    },
  });
export default Security;
