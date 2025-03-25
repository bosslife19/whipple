import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LinearGradient } from 'expo-linear-gradient'

const Onboarding = () => {

  return (
    <LinearGradient style={styles.container} colors={['rgba(238, 246, 255, 1)', 'white',]}  start={{ x: 0.4, y: 0.6 }}
    end={{ x: 1, y: 0 }}>

    <View  style={styles.ellipse}>
        {/* <LinearGradient colors={['rgb(183, 208, 236)', 'white']}></LinearGradient> */}
    </View>
    

    <View style={styles.imageContainer}>
      <Image resizeMode='contain' style={styles.winImage} source={require('../../assets/images/girlwinning.png')}/>
    </View>
    <View style={styles.textContainer}>
    <View style={{marginTop:'2%'}}>
    <Text style={styles.text}>Win big by playing</Text>
    <Text style={styles.text}>Games</Text>
    <Text style={styles.smallerText}>Welcome to the best staking application, Stake big and win bigger</Text>
    </View>

    <View style={styles.lowContainer}>
        <View style={styles.navigation}>
            <View style={{width:10, height:10, borderRadius:'50%', backgroundColor:'rgba(0, 123, 255, 1)'}}></View>
            <View style={{width:10, height:10, borderRadius:'50%', backgroundColor:'rgba(0, 123, 255, 1)'}}></View>
            <View style={{width:10, height:10, borderRadius:'50%', backgroundColor:'rgba(122, 184, 251, 1)'}}></View>
            <View style={{width:10, height:10, borderRadius:'50%', backgroundColor:'rgba(122, 184, 251, 1)'}}></View>
            <View style={{width:10, height:10, borderRadius:'50%', backgroundColor:'rgba(122, 184, 251, 1)'}}></View>
        </View>
        <View>
            <TouchableOpacity style={styles.blueButton}>
                <Text style={{color:'white', fontFamily:'PoppinsLight', fontSize:12}}>Get Started</Text>
                <Image source={require('../../assets/icons/right-arrow.png')}/>
            </TouchableOpacity>
        </View>
    </View>

    </View>
    </LinearGradient>

  )
}

export default Onboarding

const styles = StyleSheet.create({
    container:{
        backgroundColor:'rgba(238, 246, 255, 1)',
        flex:1,
    },
    ellipse:{
        position:'absolute',
        top:'30%',
        height:'40%',
        width:'100%',
        borderTopRightRadius:'80%',
        borderTopLeftRadius:'80%',
        backgroundColor:"rgb(223, 233, 245)"
        
        
        
    },
    imageContainer:{
        // marginTop:'5%',
        width:'100%',
        position:'absolute',
        top:0,
        bottom:0,
    },
    winImage:{
        height:'100%',
        width:'100%',
        
    },
    textContainer:{
        backgroundColor:'rgba(238, 246, 255,1)',

        width:'100%', 
        top:'75%',
        height:"40%",
        padding:5
        
    },
    text:{
        fontFamily:'MonteserratRegular',
        fontWeight:'700',
        fontSize:22,
    },
    smallerText:{
        fontFamily:"PoppinsLight",
        fontWeight:'400',
        fontSize:12,
        width:'85%'


    },
    lowContainer:{
        flexDirection:"row",
        marginTop:'2%',
        paddingHorizontal:'3%'
    },
    navigation:{
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        gap:2,
        

    },
    blueButton:{
        // flex:1,
        flexDirection:'row',
        backgroundColor:'rgba(0, 123, 255, 1)',
        borderRadius:30,
        width:200,
        height:50,
        alignItems:'center',
        justifyContent:'center',
        gap:5

    }
})