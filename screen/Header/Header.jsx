import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // Import Material Icons
import { useNavigation } from '@react-navigation/native';

const Header = ({ name, backgroundColor = "#fff" }) => {
    const navigation = useNavigation(); // Get navigation object

    return (
        <View style={[styles.headerContainer, { backgroundColor }]}>
            {/* Go Back Button */}
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <MaterialIcons name="arrow-back-ios" size={21} color="#0F172A" />
            </TouchableOpacity>

            {/* Centered Title */}
            <Text style={styles.headerText}>{name}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: "15%",
        paddingVertical: 15,
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        borderColor: "#F1F5F9",
    },
    headerText: {
        flex: 0.9,
        fontSize: 16,
        fontWeight: "700",
        textAlign: "center",
        fontFamily: "montserratMeduim"
    },
});

export default Header;
