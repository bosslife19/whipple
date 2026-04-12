import { View, Text } from 'react-native'
import React from 'react'
import GameCategoryMain from '../../screen/games/Category/gameCategoryMain'
import { SafeAreaView } from 'react-native-safe-area-context'
export default function games() {
  return (
    <View>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
          <Text>Coming Soon</Text>
        </View>
        </SafeAreaView>
      {/* <GameCategoryMain/> */}
    </View>
  )
}