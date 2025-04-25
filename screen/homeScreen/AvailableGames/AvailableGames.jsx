import React from 'react';
import { ScrollView, StyleSheet, Text, View, Image } from 'react-native';
import gameImage from "../../../assets/images/Rectangle 6.png"; // Renamed for clarity
import gameImage1 from "../../../assets/images/Rectangle 7.png"; // Renamed for clarity
import gameImage2 from "../../../assets/images/Rectangle 8.png"; // Renamed for clarity
import gameImage3 from "../../../assets/images/Rectangle 9.png"; // Renamed for clarity
import gameImage4 from "../../../assets/images/Rectangle 10.png"; // Renamed for clarity

const AvailableGames = () => {
    const gamesList = [
        { image: gameImage },
        { image: gameImage1 },
        { image: gameImage2 },
        { image: gameImage3 },
        { image: gameImage4 }

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

export default AvailableGames;
