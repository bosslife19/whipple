import { 
  Image, 
   ScrollView, 
  View, 
  StatusBar, 
  Text, 
  TouchableOpacity, 
 
} from 'react-native';
 
import front from "../../assets/images/logo.png";
import AntDesign from '@expo/vector-icons/AntDesign';
import { router } from 'expo-router';
import Notification from '../../assets/icons/Notification';
import { FontAwesome6 } from '@expo/vector-icons';
// import AvailableGames from '../../screen/homeScreen/AvailableGames/AvailableGames';
import Homes from '../../styles/homes/homes.styles';
import PastGames from '../../screen/homeScreen/PastGames/PastGames';
import FloatingMessage from '../../screen/homeScreen/Message/Message';
import AvailableGamesList from '../../screen/homeScreen/AvailableGames/AvailableGamesList';
import FeaturesSection from '../../screen/homeScreen/features/Features';
import SlideShowBet from '../../features/slideshow/slideshowBet';
import { useContext, useEffect, useState } from 'react';
import {AuthContext} from '../../context/AuthContext'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen() {
  const {userDetails, setUserDetails} = useContext(AuthContext)
 

  useEffect(()=>{
    const getUser = async ()=>{
      if(!userDetails){
 const userDets = await AsyncStorage.getItem('userDetails');
      setUserDetails(userDets);
      }
     
    }

    getUser();
  }, [])
  return (
    <View style={Homes.Container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

        {/* Top Section: Title */}
        <View style={Homes.titleContainer}>
          <View style={Homes.Containers}>
         <Image source={front} style={{width:35,height:35,borderRadius:50}} resizeMode='cover' />
            {/* Greeting Text */}
            <View>
              <Text style={Homes.greetingText}>Hello</Text>
              <Text style={Homes.usernameText}>{userDetails?.name}</Text>
            </View>
          </View>


          {/* Notification Icon */}
          <TouchableOpacity onPress={()=> router.push("/(routes)/notifications")} style={Homes.notificationContainer}>
            <Notification />
            <View style={Homes.notificationDot} />
          </TouchableOpacity>
        </View>
        <ScrollView contentContainerStyle={Homes.scrollViewContainer}>
        <SlideShowBet />
        <View style={Homes.imageBackground}>
          <Text style={[Homes.imageText,{ fontSize:14,fontWeight:500,textAlign:"center",fontFamily:"Grotesk",paddingVertical:4}]}>Available Balance </Text>
             <Text style={[Homes.imageText,{ textAlign:"center",fontFamily:"Poppins",fontSize:24,paddingVertical:14}]}>NGN 15, 000.34</Text>
             
              <View style={[Homes.flexD,{justifyContent:"space-between"}]}>
              <TouchableOpacity onPress={()=> router.push("/(routes)/deposit")} style={[Homes.flexD,{paddingHorizontal:"14%",paddingVertical:14, backgroundColor:"#0A1931",borderRadius:20,gap:8}]}>
              <AntDesign name="plus" size={10} color="#fff" />
                <Text style={[Homes.imageText,{ color:"#fff",fontFamily:"Grotesk",fontSize:10}]}>
                Deposit
                </Text>
                </TouchableOpacity>
                <TouchableOpacity style={[Homes.flexD,{paddingHorizontal:"14%",paddingVertical:14, backgroundColor:"#0A1931",borderRadius:20,gap:8}]}>
                 <FontAwesome6 name="circle-dollar-to-slot" size={14} color="#fff" />
                <Text style={[Homes.imageText,{ color:"#fff",fontFamily:"Grotesk",fontSize:10}]}>Withdraw</Text>
                </TouchableOpacity>
                </View>
            </View>
                       

        {/* Placeholder for Additional Content */}
        <View style={Homes.contentContainer}>
         <View style={[Homes.scrollContainer,{justifyContent:"space-between",marginHorizontal:16,}]}>
            <Text style={Homes.Header}>Available Games</Text>
             <TouchableOpacity 
             onPress={()=> router.push("/(routes)/games/availablegames")}
             style={{backgroundColor:'#0040841F',paddingHorizontal:15,paddingVertical:5,borderRadius:5}} >
                      <Text style={[
                         Homes.optionText
                        ]}>
                      See all
                      </Text>
                   
            </TouchableOpacity>
         </View>
          {/* Available Games */}
          <AvailableGamesList/>
        </View>

         {/* Lost Games*/}
         <View style={Homes.contentContainer}>
         <View style={[Homes.scrollContainer,{justifyContent:"space-between",marginHorizontal:16,}]}>
            <Text style={Homes.Header}>Loser's Games</Text>
             <TouchableOpacity 
              onPress={()=> router.push("/(routes)/games/LostGames/ViewLostGames")}
             style={{backgroundColor:'#0040841F',paddingHorizontal:15,paddingVertical:5,borderRadius:5}} >
                      <Text style={[
                         Homes.optionText
                        ]}>
                      See all
                      </Text>
                    
            </TouchableOpacity>
         </View>
          {/* Available Games */}
          <PastGames/>
        </View>

        {/* Features */}
        <FeaturesSection/>
      </ScrollView>
      <FloatingMessage/>
    </View>
  );
}
 

