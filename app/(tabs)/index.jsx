import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Redirect } from 'expo-router'

const Index = () => {
  return <Redirect href={'/auth/login'}/>
  return (
    <View>
      <Text>Index</Text>
    </View>
  )
}

export default Index

const styles = StyleSheet.create({})