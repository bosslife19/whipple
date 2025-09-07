import { View, Text, TouchableOpacity, Alert, Share } from 'react-native'
import React, {useContext} from 'react'
import Profilescs from '../../styles/profileScren.styles'
import Header from '../Header/Header'
import { router } from 'expo-router'
import {AuthContext} from '../../context/AuthContext'
import * as Clipboard from "expo-clipboard";

export default function ReferAndEarn() {
  const {userDetails} = useContext(AuthContext)

  return (
    <View style={{height:'100%'}}>
    <Header name={'Refer And Earn'} />
     {/* Referral Section */}
     <View style={Profilescs.card}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
            <Text style={Profilescs.sectionTitle}>Refer & Earn</Text>
            <Text style={[Profilescs.sectionTitle, {color: "green"}]}>{userDetails?.whipple_point}</Text>
          </View>
          <Text style={Profilescs.description}>
            Share your referral code with friends and earn bonuses when they
            join and play!
          </Text>

          <View style={Profilescs.referralRow}>
            <Text style={Profilescs.referralCode}>{userDetails?.referral_code}</Text>
            <TouchableOpacity style={Profilescs.copyButton} 
              onPress={async () => {
                if (userDetails?.referral_code) {
                  await Clipboard.setStringAsync(userDetails.referral_code);
                  Alert.alert("Copied", "Referral code copied to clipboard!");
                }
              }}
            >
              <Text>Copy</Text>
            </TouchableOpacity>
          </View>

          <View style={Profilescs.shareRow}>
            <TouchableOpacity style={Profilescs.shareButton}
            onPress={async () => {
              try {
                const referralLink = `https://whipple.com/ref/${userDetails?.referral_code}`;
                await Share.share({
                  message: `Join me on this app and earn rewards! Use my referral link: ${referralLink}`,
                  url: referralLink, // iOS also accepts `url`
                });
              } catch (error) {
                console.error("Error sharing link:", error);
              }
            }}
            >
              <Text>Share Link</Text>
            </TouchableOpacity>
            <TouchableOpacity style={Profilescs.shareButton} onPress={()=>router.push('/(routes)/referral')}>
              <Text>View Referrals</Text>
            </TouchableOpacity>
          </View>
        </View>
    </View>
  )
}