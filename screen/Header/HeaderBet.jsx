import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // Import Material Icons
import { useNavigation } from '@react-navigation/native';
import { formatCurrency } from '../../utlils/formatCurrency';

const HeaderBet = ({ name, backgroundColor = "#fff", amount = 0 }) => {
    const navigation = useNavigation(); // Get navigation object
 
    return (
        <View style={[styles.headerContainer, { backgroundColor }]}>
            
            {/* Centered Title */}
            <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.headerText}>{name}</Text>
            </TouchableOpacity>

                 {/* Display Amount */}
              <TouchableOpacity style={styles.amountContainer}>
                <Text style={styles.amountText}>
                    {formatCurrency(amount)}
                </Text>           
            </TouchableOpacity>
        </View>
    );
};
 
const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        // alignItems: 'center',
        paddingTop: "15%",
        paddingVertical: 15,
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        borderColor: "#F1F5F9",
        justifyContent:"space-between"
    },
    headerText: {
        flex: 0.9,
        fontSize: 16,
        fontWeight: "700",
        textAlign: "center",
        fontFamily: "montserratMeduim"
    },
    amountContainer: {
     borderWidth:1,
     paddingHorizontal:20,
     paddingVertical:5,
     borderRadius:3
    },
    amountText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#000',
    },
});

export default HeaderBet;
