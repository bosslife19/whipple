import React from 'react';
import { ScrollView, StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

// Images
import gameImage from "../../../assets/images/games/Online-Casino-Bonus-1-2-1-768x432.jpg.webp";
import gameImage1 from "../../../assets/images/Rectangle 7.png";
import gameImage2 from "../../../assets/images/Rectangle 8.png";
import gameImage3 from "../../../assets/images/Rectangle 9.png";
import gameImage4 from "../../../assets/images/Rectangle 10.png";

const AvailableGames = () => {
  const router = useRouter(); // Use router hook

  const gamesList = [
    { image: gameImage,navigateTo: "/(routes)/games/availablegames" },
    { image: gameImage1, navigateTo: "/(routes)/games/availablegames" },
    { image: gameImage2, navigateTo: "/(routes)/games/availablegames" },
    { image: gameImage3, navigateTo: "/(routes)/games/availablegames" },
    { image: gameImage4, navigateTo: "/(routes)/games/availablegames" },
  ];

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {gamesList.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => router.push(item.navigateTo)} // Properly call the navigation function
            style={styles.gameItem}
          >
            <Image source={item.image} style={styles.gameImage} resizeMode="cover" />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  gameItem: {
    alignItems: "center",
    marginRight: 15,
  },
  gameImage: {
    width: 120,
    height: 120,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 10,
  },
});

export default AvailableGames;
