import React from 'react';
import { ScrollView, StyleSheet, Text, View, Image } from 'react-native';
import gameImage from "../../../assets/images/girlwinning.png"; // Renamed for clarity

const PastGames = () => {
    const gamesList = [
        { image: gameImage },
        { image: gameImage },
        { image: gameImage }
    ];

    return (
        <View style={styles.container}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {gamesList.map((item, index) => (
                    <View key={index} style={styles.gameItem}>
                        <Image source={item.image} style={styles.gameImage} resizeMode='cover' />
                     </View>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        paddingHorizontal:16
    },
    gameItem: {
        alignItems: "center",
        marginRight: 15,  
        borderWidth:1,
        padding:5,
        backgroundColor:"#000",
        borderRadius:10
    },
    gameImage: {
        width: 120,
        height: 120,
        borderRadius: 10,
    },
    gameText: {
        marginTop: 5,
        fontSize: 14,
        fontWeight: "bold",
        color: "#333",
    },
});

export default PastGames;
