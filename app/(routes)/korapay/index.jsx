import React, { useContext, useRef } from 'react';
import { WebView } from 'react-native-webview';
import { useLocalSearchParams, router } from 'expo-router';
import { AuthContext } from '../../../context/AuthContext';

export default function KorapayScreen() {
  const webviewRef = useRef(null);
  const params = useLocalSearchParams(); // amount, name, email expected
  const {userDetails} = useContext(AuthContext)
const userId = userDetails?.id;
  // Build payment config to send to the webview
  const paymentData = {
    key: process.env.EXPO_PUBLIC_KORAPAY_LIVE || '', // optionally inject live key
    reference: `ref_${userId}_${Date.now()}`,

    amount: params.amount ? Number(params.amount) : undefined,
    currency: 'NGN',
    customer: {
      name: params.name || undefined,
      email: params.email || undefined,
    },
    // optional server webhook override
    notification_url: process.env.EXPO_PUBLIC_KORAPAY_NOTIFICATION_URL||'https://api.mywhipple.com/api/korapay/webhook',
    metadata: {
      userId: userDetails?.id,
      email: userDetails?.email,
      // you can add userId or wallet id here if available
      // userId: params.userId || undefined
    }
  };

  // injectedJavaScript will run after page load and set window.paymentConfig
  const injectedJS = `window.paymentConfig = ${JSON.stringify(paymentData)}; true;`;

  const handleMessage = (event) => {
    let message = null;
    try {
      message = JSON.parse(event.nativeEvent.data);
    } catch (e) {
      console.warn('Could not parse message from WebView', e);
      return;
    }

    switch (message.event) {
      case 'success':
        console.log('Payment success:', message.data);
        // TODO: call your server to verify / credit user
        router.replace('/payment-received');
        break;
      case 'failed':
        console.log('Payment failed:', message.data);
        router.back();
        break;
      case 'closed':
        console.log('Payment closed');
        router.back();
        break;
      case 'pending':
        console.log('Payment pending', message.data);
        router.back();
        break;
      default:
        console.log('WebView message', message);
    }
  };

  // When the webview finishes loading, postMessage paymentData (fallback)
  const onLoadEnd = () => {
    try {
      if (webviewRef.current && paymentData) {
        webviewRef.current.postMessage(JSON.stringify(paymentData));
      }
    } catch (e) {
      console.warn('Failed to postMessage to webview', e);
    }
  };

  // Optional: cache-bust query when debugging — remove in production
 const url = `https://mywhipple.com/pay.html?v=${Date.now()}`;


  return (
    <WebView
      ref={webviewRef}
      source={{ uri: url }}
      injectedJavaScript={injectedJS}
      onMessage={handleMessage}
      onLoadEnd={onLoadEnd}
      originWhitelist={['*']}
      javaScriptEnabled
      domStorageEnabled
      startInLoadingState
      style={{ flex: 1 }}
    />
  );
}
