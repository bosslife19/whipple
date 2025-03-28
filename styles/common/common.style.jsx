import { StyleSheet } from "react-native";
 
export const commonstyles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:"center",
        justifyContent:"center"
    },
    buttonContainer:{
        backgroundColor:"#2467ec",
        // width: responsiveWidth(90),
        // height: responsiveHeight(2.5),
        
        borderRadius:5, 
        marginHorizontal:5,
    },
    paginationContainer: {
        position: "absolute",
        top: 10, // Adjust the dots to appear at the top
        flexDirection: "row",
        justifyContent: "center",
        width: "100%",
        paddingVertical:"10%",
        paddingHorizontal: 16,
      },
      paginationDot: {
        // height: responsiveHeight(0.3),
        // width: responsiveWidth(25), 
        borderRadius: 3,
        backgroundColor: "#0A2EE226",
        marginHorizontal: 4,
      },
      activePaginationDot: {
        backgroundColor: "#0A2EE2", // Active dot color
        // width: responsiveWidth(25),      
     },
     buttonWrapper:{
        backgroundColor: "#2467ec",
        // width: wp("87%"),
        paddingVertical:15,
        // paddingHorizontal:46,
        borderRadius:25,
        marginTop:30
     },
     buttonText:{
        color:"white",
        textAlign:"center"
     },
      dotStyle: {
        display: "none", // Hides the default dot
      },
      activeDotStyle: {
        display: "none", // Hides the default active dot
      },
    title:{
      fontFamily:"montserratMeduim",
        fontSize:  36,
        fontWeight:"700",
        lineHeight:38,
        textAlign:"center",
        color:"#fff"
    },
    description:{
      fontFamily:"montserratMeduim",
         fontSize: 36,
         fontWeight:"700",
         lineHeight:38,
         color:"#fff",
        textAlign:"center"
    },
    description2:{
      fontSize: 29.3,
         fontWeight:"600",
         lineHeight:28.8,
         color:"#fff",
        textAlign:"center",
        paddingVertical:8,
        paddingHorizontal:14,
        backgroundColor:"#8A2BE2",
        borderRadius:13
    },
    skipButton:{
      borderWidth:1,
      borderColor:"#fff",
      paddingVertical:15,
      width:"100%",
      alignItems:"center",
      borderRadius:30,
    },
    textSkip:{
      fontFamily:"montserratMeduim",
      fontSize:18,
      fontWeight:700,
      color:"#fff"
    },
    Getstart:{
      color:"#000",
      fontFamily:"montserratMeduim",
      fontSize:18,
      fontWeight:700,
    },
    flexD:{
      flexDirection:"row",
      alignItems:"center",
      gap:7
    },
    welcomeButton:{
      flexDirection:"row",
      alignItems:"center",
      gap:7,
      width:"100%",
       backgroundColor:"#fff",
      
       justifyContent:"center",
        borderRadius:5,
        paddingVertical:15,
        alignItems:"center",
       borderRadius:30,
    },
input:{
  height:55,
  marginHorizontal:16,
  borderRadius:8,
  paddingLeft:35,
  fontSize:16,
  backgroundColor:"white",
  color:"#a1a1a1"
},
errorContainer:{
    flexDirection:"row",
    alignItems:"center",
    marginHorizontal:16,
    position:"absolute",
    top:60,
}
})