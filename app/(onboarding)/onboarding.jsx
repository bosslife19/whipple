import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from "react";
import AppIntroSlider from "react-native-app-intro-slider";
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

export const onboardingSwiperData = [
  {
    id: 1,
    title: "Win big by playing",
    // description: "fitness",
    // sortDescription: "journey",
    image: require("../../assets/images/girlwinning.png"),
    note: "Welcome to the best staking application, Stake big and win bigger",
  },
  { 
    id: 2,
    title: "Win big by playing",
    // description: "Step of the",
    // sortDescription: "way",
    image: require("../../assets/images/image_fx___50_-removebg-preview (1) 1.png"),
    note: "Welcome to the best staking application, Stake big and win bigger",
  },
  {
    id: 3,
    title: "Win big by playing",
    // description: "",
    // sortDescription: "elegance",
    image: require("../../assets/images/image_fx___53_-removebg-preview 1.png"),
    note: "Welcome to the best staking application, Stake big and win bigger",
  },
  {
    id: 4,
    title: "Win big by playing",
    // description: "",
    // sortDescription: "elegance",
    image: require("../../assets/images/image_fx___52_-removebg-preview 1.png"),
    note: "Welcome to the best staking application, Stake big and win bigger",
  },
];

const Onboarding = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleGetStarted = async () => {
     router.push("/auth/login");
  }; 
  const renderItem = ({ item }) => (
    <LinearGradient style={styles.container} 
    colors={['rgba(238, 246, 255, 1)', 'white',]} 
     start={{ x: 0.4, y: 0.6 }}
    end={{ x: 1, y: 0 }}>

    <View  style={styles.ellipse}>
        {/* <LinearGradient colors={['rgb(183, 208, 236)', 'white']}></LinearGradient> */}
    </View>
    <View style={styles.imageContainer}>
      <Image resizeMode='contain' style={styles.winImage} source={item.image}/>
    </View>
    <View style={styles.textContainer}>
    <View style={{marginTop:'2%'}}>
    <Text style={styles.text}>{item.title}</Text>
    <Text style={styles.text}>Games</Text>
    <Text style={styles.smallerText}>{item.note}</Text>
    </View>

    
    </View>
    </LinearGradient>
  );

  return (
    <AppIntroSlider
      renderItem={renderItem}
      data={onboardingSwiperData}
      onSlideChange={(index) => setCurrentIndex(index)}
      renderNextButton={() => (
        <View style={styles.lowContainer}>
          <View style={styles.navigation}>
            {onboardingSwiperData.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.dot,
                  currentIndex === index ? styles.activeDot : styles.inactiveDot,
                ]}
              />
            ))}
          </View>
          <TouchableOpacity style={styles.blueButton} onPress={()=>router.push('/auth/signup')}>
            <Text style={styles.buttonText}>Get Started</Text>
            <Image source={require('../../assets/icons/right-arrow.png')}/>
          </TouchableOpacity>
        </View>
      )}
      renderDoneButton={() => (
        <TouchableOpacity onPress={handleGetStarted} style={styles.lowContainer}>
          <View style={styles.navigation}>
            {onboardingSwiperData.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.dot,
                  currentIndex === index ? styles.activeDot : styles.inactiveDot,
                ]}
              />
            ))}
          </View>
          <View style={styles.blueButton}>
            <Text style={styles.buttonText}>Get Started</Text>
            <Image source={require('../../assets/icons/right-arrow.png')}/>
          </View>
        </TouchableOpacity>
      )}
      showSkipButton={false}
      bottomButton={true}
      dotStyle={false}
      activeDotStyle={false}
    />
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(238, 246, 255, 1)',
    flex: 1,
  
  },
  ellipse: {
    position:'absolute',
    top:'40%',
    height:'35%',
    width:'100%',
    borderTopRightRadius:'80%',
    borderTopLeftRadius:'80%',
    // backgroundColor:"rgb(223, 233, 245)"
    backgroundColor:"#D7EAFF"

  },
  imageContainer: {
    width:'100%',
    position:'absolute',
    top:0,
    bottom:0,
     paddingHorizontal: 20,
  },
  winImage: {
    height:'100%',
    width:'100%',
  },
  textContainer: {
    backgroundColor: 'rgba(238, 246, 255,1)',
    top: '68%',
    width:"100%",
    height:"100%",
    position: "absolute",
    // padding: 5,
    paddingHorizontal:16,
    height:'50%'
  },
  text: {
    fontFamily: 'MonteserratRegular',
    fontWeight: '700',
    fontSize: 22,
    
  },
  smallerText: {
    marginTop:10,
    fontFamily: "PoppinsLight",
    fontWeight: '400',
    fontSize: 12,
    // width: '85%',
    maxWidth:"98%"
  },
  lowContainer: {
    flexDirection: "row",
    marginTop: '2%',
    paddingHorizontal: '3%',
    alignItems: 'center',
    
  },
  navigation: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  activeDot: {
    width:"20%",
    backgroundColor: '#007BFF',
  },
  inactiveDot: {
    backgroundColor: '#7AB8FB',
  },
  blueButton: {
    flexDirection:'row',
    backgroundColor:'rgba(0, 123, 255, 1)',
    borderRadius:30,
    paddingHorizontal:"16%",
    paddingVertical:12,
    borderRadius: 14,

    alignItems:'center',
    justifyContent:'center',
    gap:5,
    
  },
  buttonText: {
    color: 'white',
    fontFamily: 'PoppinsLight',
    fontSize: 12,
  },
});
