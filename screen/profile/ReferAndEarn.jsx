import { View, Text, TouchableOpacity, Share } from 'react-native'
import React, {useContext} from 'react'
import Profilescs from '../../styles/profileScren.styles'
import Header from '../Header/Header'
import { router } from 'expo-router'
import {AuthContext} from '../../context/AuthContext'

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
              // onPress={async () => {
              //   try {
              //     Clipboard.setString(userDetails?.referral_code);
              //     alert('Referral code copied to clipboard!');
              //   } catch (error) {
              //     alert('Failed to copy referral code.');
              //   }
              // }}
              >
              <Text>Copy</Text>
            </TouchableOpacity>
          </View>

          <View style={Profilescs.shareRow}>
            <TouchableOpacity style={Profilescs.shareButton}
              onPress={async () => {
                try {
                  const result = await Share.share({
                    message: `Join Whipple using my referral code: ${userDetails?.referral_code}`,
                  });
                  if (result.action === Share.sharedAction) {
                    if (result.activityType) {
                      // shared with activity type of result.activityType
                    } else {
                      // shared
                    }
                  } else if (result.action === Share.dismissedAction) {
                    // dismissed
                  }
                } catch (error) {
                  alert(error.message);
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