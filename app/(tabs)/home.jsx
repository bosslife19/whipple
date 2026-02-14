import {
  Image,
  ScrollView,
  View,
  StatusBar,
  Text,
  TouchableOpacity,
  Dimensions
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
import { useCallback, useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { formatCurrency } from '../../utlils';
import {useFocusEffect} from 'expo-router';
import {registerForPushNotificationsAsync} from '../../utlils/registerForPushnotificationsAsync'
import axiosClient from '../../axiosClient';

export default function HomeScreen() {
  const { width } = Dimensions.get('window');
  const itemWidth = (width - 44) / 2.2; // Show ~2.2 items to give a hint of more items
  const { userDetails, setUserDetails, userBalance, userPoint } = useContext(AuthContext)
  const [user, setUser] = useState(null);
  const getLoggedInUser = async () => {
    const res = await axiosClient.get('/user');

    setUserDetails(res.data);
    setUser(res.data);
  }
  useEffect(()=>{
    const sendPushToken = async ()=>{
      const token = await AsyncStorage.getItem('pushToken');
      
      if(!token){
       
         registerForPushNotificationsAsync().then(
                (token) => {
                  axiosClient.post('/user-push-token', {token}).then(data=>{
                    
                    AsyncStorage.removeItem('pushToken')
                  }).catch(e=>console.log(e));
    
                },
                (error) => {
                  console.log(error)
                }
              );  



        return;
      }
     const res =  await axiosClient.post('/user-push-token', {token});

     if(res.data.status){
      await AsyncStorage.removeItem('pushToken');
     }
    }
    sendPushToken();
  }, [])

  useFocusEffect(
    useCallback(() => {
      // Runs every time the screen comes into focus
      getLoggedInUser();
    }, [])
  );




  useEffect(() => {
    const getUser = async () => {
      if (!userDetails) {
        const userDets = await AsyncStorage.getItem('userDetails');
        setUserDetails(userDets);
      }
    };

    getUser();
  }, []);

  const gameItems = [
    {
      name: 'Play SkillQuiz Pro',
      route: '/(routes)/skillquiz',
      backgroundColor: '#0A1931',
    },
    {
      name: 'Play Game Rush',
      route: '/(routes)/skillgame',
      backgroundColor: '#0A1931',
    },
    // {
    //   name: 'Fun Forecast',
    //   route: '/(routes)/forecast',
    //   backgroundColor: '#0A1931',
    // },
  ];
  return (
    <View style={Homes.Container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

      {/* Top Section: Title */}
      <View style={Homes.titleContainer}>
        <View style={Homes.Containers}>
          <Image source={front} style={{ width: 35, height: 35, borderRadius: 50 }} resizeMode='cover' />
          {/* Greeting Text */}
          <View>
            <Text style={Homes.greetingText}>Hello</Text>
            <Text style={Homes.usernameText}>{userDetails?.name}</Text>
          </View>
        </View>


        {/* Notification Icon */}
        {/* <TouchableOpacity onPress={()=> router.push("/(routes)/notifications")} style={Homes.notificationContainer}>
            <Notification />
            <View style={Homes.notificationDot} />
          </TouchableOpacity> */}
      </View>
      <ScrollView contentContainerStyle={Homes.scrollViewContainer}>
        <SlideShowBet />
        <View style={Homes.imageBackground}>
          <Text style={[Homes.imageText,{ fontSize:14,fontWeight:500,textAlign:"center",fontFamily:"Grotesk",paddingVertical:4}]}>Available Balance </Text>
         
             <Text style={[Homes.imageText,{ textAlign:"center",fontFamily:"Poppins",fontSize:24,paddingVertical:14}]}>NGN {formatCurrency(user?.wallet_balance) || formatCurrency(userDetails?.wallet_balance) ||'0.00'}</Text>
             
              <View style={[Homes.flexD,{justifyContent:"space-between"}]}>
              <TouchableOpacity onPress={()=> router.push("/(routes)/deposit")} style={[Homes.flexD,{paddingHorizontal:"14%",paddingVertical:14, backgroundColor:"#0A1931",borderRadius:20,gap:8}]}>
              <AntDesign name="plus" size={10} color="#fff" />
              <Text style={[Homes.imageText, { color: "#fff", fontFamily: "Grotesk", fontSize: 10 }]}>
                Deposit
              </Text>
            </TouchableOpacity>
            {/*<TouchableOpacity onPress={()=> router.push("/(routes)/withdraw")} style={[Homes.flexD,{paddingHorizontal:"14%",paddingVertical:14, backgroundColor:"#0A1931",borderRadius:20,gap:8}]}>*/}
            <TouchableOpacity onPress={() => router.push('/(routes)/withdraw')} style={[Homes.flexD, { paddingHorizontal: "14%", paddingVertical: 14, backgroundColor: "#0A1931", borderRadius: 20, gap: 8 }]}>
              <FontAwesome6 name="circle-dollar-to-slot" size={14} color="#fff" />
              <Text style={[Homes.imageText, { color: "#fff", fontFamily: "Grotesk", fontSize: 10 }]}>Withdraw</Text>
            </TouchableOpacity>
          </View>
        </View>


        {/* Placeholder for Additional Content */}
        <View style={Homes.contentContainer}>
          <View style={[Homes.scrollContainer, { justifyContent: "space-between", marginHorizontal: 16, }]}>
            <Text style={Homes.Header}>Available Games</Text>
            <TouchableOpacity
              onPress={() => router.push("/(routes)/games/availablegames")}
              style={{ backgroundColor: '#0040841F', paddingHorizontal: 15, paddingVertical: 5, borderRadius: 5 }} >
              <Text style={[
                Homes.optionText
              ]}>
                See all
              </Text>

            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 12, paddingHorizontal: 16 }}
            style={{ flexGrow: 0, marginVertical: 10 }}
          >
            {gameItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => router.push(item.route)}
                style={[Homes.flexD, { width: itemWidth, paddingHorizontal: 12, paddingVertical: 14, backgroundColor: item.backgroundColor, borderRadius: 20, gap: 8 }]}
              >
                <Text style={[Homes.imageText, { color: "#fff", fontFamily: "Grotesk", fontSize: 14, textAlign: 'center', flex: 1 }]}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          {/* Available Games */}
          <AvailableGamesList />
        </View>

        {/* Lost Games*/}
        {/* <View style={Homes.contentContainer}> */}
        {/* <View style={[Homes.scrollContainer,{justifyContent:"space-between",marginHorizontal:16,}]}> */}
        {/* <Text style={Homes.Header}>Loser's Games</Text> */}
        {/* <TouchableOpacity 
              onPress={()=> router.push("/(routes)/games/LostGames/ViewLostGames")}
             style={{backgroundColor:'#0040841F',paddingHorizontal:15,paddingVertical:5,borderRadius:5}} >
                      <Text style={[
                         Homes.optionText
                        ]}>
                      See all
                      </Text>
                    
            </TouchableOpacity> */}
         {/* </View> */}
          {/* Available Events */}
          {/* <PastGames/> */}
        {/* </View> */}

        {/* Features */}
        <FeaturesSection />
      </ScrollView>
      {/* <FloatingMessage/> */}
    </View>
  );
}


