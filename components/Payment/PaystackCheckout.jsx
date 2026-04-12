import React from 'react';
import { Button } from 'react-native';
import { usePaystack } from 'react-native-paystack-webview';
import {WebView} from 'react-native-webview';


const PaystackCheckout = () => {
  const { popup } = usePaystack();

  const payNow = () => {
    popup.checkout({
      email: 'jane.doe@example.com',
      amount: 5000,
      reference: 'TXN_123456',
      plan: 'PLN_example123',
      invoice_limit: 3,
      subaccount: 'SUB_abc123',
      split_code: 'SPL_def456',
      split: {
        type: 'percentage',
        bearer_type: 'account',
        subaccounts: [
          { subaccount: 'ACCT_abc', share: 60 },
          { subaccount: 'ACCT_xyz', share: 40 }
        ]
      },
      metadata: {
        custom_fields: [
          {
            display_name: 'Order ID',
            variable_name: 'order_id',
            value: 'OID1234'
          }
        ]
      },
      onSuccess: (res) => console.log('Success:', res),
      onCancel: () => console.log('User cancelled'),
      onLoad: (res) => console.log('WebView Loaded:', res),
      onError: (err) => console.log('WebView Error:', err)
    });
  };
  

  return <Button title="Pay Now" onPress={payNow} />;
};