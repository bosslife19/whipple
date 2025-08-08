import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Profilescs from '../../styles/profileScren.styles'
import Header from '../Header/Header'
import { router } from 'expo-router'

export default function ReferAndEarn() {
  return (
    <View style={{height:'100%'}}>
    <Header name={'Refer And Earn'} />
     {/* Referral Section */}
     <View style={Profilescs.card}>
          <Text style={Profilescs.sectionTitle}>Refer & Earn</Text>
          <Text style={Profilescs.description}>
            Share your referral code with friends and earn bonuses when they
            join and play!
          </Text>

          <View style={Profilescs.referralRow}>
            <Text style={Profilescs.referralCode}>WHIPPLE123</Text>
            <TouchableOpacity style={Profilescs.copyButton}>
              <Text>Copy</Text>
            </TouchableOpacity>
          </View>

          <View style={Profilescs.shareRow}>
            <TouchableOpacity style={Profilescs.shareButton}>
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