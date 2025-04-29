import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

export default function BankTransfer({ selectedBank, setSelectedBank, banks }) {
  const selected = banks.find((b) => b.id === selectedBank);

  return (
    <View>
      <Text style={styles.label}>Select a Bank</Text>
      <View style={styles.bankRow}>
        {banks.map((bank) => (
          <TouchableOpacity key={bank.id} onPress={() => setSelectedBank(bank.id)} style={styles.bankCard}>
            <Image source={bank.logo} style={styles.bankLogo} />
            {/* <Text>{bank.name}</Text> */}
          </TouchableOpacity>
        ))}
      </View>

      {selected && (
  <View style={styles.instructionsBox}>
    <Text style={styles.instructionsTitle}>{selected.name} Transfer Instructions</Text>
    
    <Text style={styles.instructionStep}>1. Open the {selected.name} mobile app and log in to your account.</Text>
    <Text style={styles.instructionStep}>2. From the home screen, navigate to the "Pay Bills" section.</Text>
    <Text style={styles.instructionStep}>3. Choose your preferred payment category.</Text>
    <Text style={styles.instructionStep}>4. Select our app as both the "Biller" and the "Product".</Text>
    <Text style={styles.instructionStep}>5. Enter the amount you wish to deposit.</Text>
    <Text style={styles.instructionStep}>
      6. Provide your unique Client ID: <Text style={styles.customerId}>{selected.customerId}</Text>
    </Text>

    <Text style={styles.instructionStep}>
      Once the payment is confirmed, the funds will be instantly credited to your Bet9ja wallet.
    </Text>
  </View>
)}

    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    marginBottom: 10,
    fontWeight: '600',
    fontFamily: "montserratMeduim"

  },
  bankRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  instructionStep: {
    fontSize: 14,
    fontWeight: 'normal',
    marginBottom: 5,
    fontFamily: 'montserratMedium',
    color: '#333',
    lineHeight: 20,
  },
  
  bankCard: {
    width: '48%',
    height:90,
    alignItems: 'center',
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    // padding: 10,
    borderRadius: 10,
  },
  bankLogo: {
    width: "100%",
    height: "100%",  
    borderRadius: 10,
    resizeMode:"stretch",
  },
  instructionsBox: {
    marginTop: 20,
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  instructionsTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
    fontSize: 16,
    fontFamily: "montserratMeduim"

  },
  texts:{
        color: '#888',
    fontFamily: "montserratMeduim"
  },
  customerId: {
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 5,
    color: '#212121',
    fontFamily: "montserratMeduim"

  },
});
