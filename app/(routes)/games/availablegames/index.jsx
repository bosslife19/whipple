import { View, Text } from 'react-native'
import React from 'react'
// import AvailableGames from '../../../../screen/homeScreen/AvailableGames/AvailableGamesList'
import AvaliablePublishedGame from '../../../../screen/homeScreen/AvailableGames/AvaliablePublishedGame/AvaliablePublishedGame'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function AvailableGame() {
  return (
    <SafeAreaView>
        <View style={{flex:1}}>
      {/* <AvaliablePublishedGame/> */}
      <Text>Coming soon</Text>
      
    </View>
    </SafeAreaView>
  
  )
}