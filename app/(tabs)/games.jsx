import React, { useState } from 'react';
import { View, Text, Image, Dimensions, TouchableOpacity, StyleSheet } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import cubes from  "../../assets/images/games/Rectangle 97.png"
import Header from '../../screen/Header/Header';
import { router } from 'expo-router';
const { width: screenWidth } = Dimensions.get('window');

const data = [
  {
    id: 1,
    image: cubes,
    text: 'Becoming the house',
  },
  {
    id: 2,
    image: cubes,
    text: 'Explore New Features',
  },
  {
    id: 3,
    image: cubes,
    text: 'Get Started Now!',
  },
];

const Games = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  const renderItem = ({ item }) => (
    <View style={styles.slide}>
      <Image source={item.image} style={styles.image} resizeMode="cover" />
      <Text style={styles.title}>{item.text}</Text>
     <Text>This is a place that will guide users on the process 
      of becoming a house including cost, percentages, 
      game flow etc.
   </Text>
    </View>
  );

  return (
    <>
    <Header name="House Start" backgroundColor={'#A8BFED'} />
   
    <View style={styles.container}>
      <Carousel
        width={screenWidth}
        height={350}
        data={data}
        autoPlay
        scrollAnimationDuration={5000}
        onSnapToItem={(index) => setActiveSlide(index)}
        renderItem={({ item }) => renderItem({ item })}
        loop
      />
      <View style={styles.paginationContainer}>
        {data.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              { backgroundColor: index === activeSlide ? '#007BFF' : '#ccc' },
            ]}
          />
        ))}
      </View>
      <TouchableOpacity onPress={()=> router.push("/(routes)/games/category/category-main")} style={styles.button}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>

    </>
  );
};

const styles = StyleSheet.create({
  container: {
    // marginTop: 40,
  },
  slide: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  image: {
    width: screenWidth - 40,
    height: 200,
    borderRadius: 10,
  },
  title: {
    marginTop: 20,
    fontSize: 22,
    fontWeight: 'bold',
    // textAlign: 'left',
    // marginRight:"auto",
    color: '#333',
    fontFamily: "montserratMeduim"

  },
  button: {
    width:"90%",
    marginTop: 15,
    backgroundColor: '#007BFF',
    paddingVertical: 18,
    paddingHorizontal: 40,
    borderRadius: 20,
    marginHorizontal:20
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
    textAlign:"center",
    fontFamily: "montserratMeduim"

  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    // marginTop: 10,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
});

export default Games;
