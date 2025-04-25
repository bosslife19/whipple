import { StyleSheet } from "react-native";

const Homes = StyleSheet.create({
    scrollViewContainer: {
      flexGrow: 1,
      
      // alignItems:"center"
      // backgroundColor:"#F8FAFC"
    },
    Header:{
      color:"#0F172A",
      fontFamily:"Poppins",
      fontSize:16,
      fontWeight:700
  },
    optionText: {
      color: "#000",
      fontSize: 10,
      fontFamily: "Poppins",
      fontWeight: "bold",
          // textAlign: "center",
    },
    titleContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: 20,
      paddingHorizontal:20,
      paddingTop:20,
      // backgroundColor:"#F8FAFC"
    },
    flexD:{
      marginTop:5,
      flexDirection: "row",
      gap:5,
      // justifyContent: "space-between",
      alignItems: "center",
    },
    Container: {
      // flexDirection: "row",
      // alignItems: "center",
      gap: 10,
      // paddingHorizontal:10,
      backgroundColor:"#EEF6FF",
      height:"100%"
    },
    Containers: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      
    },
    scrollContainer: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      paddingVertical: 10,
    },
    logo: {
      borderRadius: 40,
      height: 40,
      width: 40,
    },
    greetingText: {
      color: "#64748B",
      fontFamily: "montserratMedium",
      fontSize: 12,
      fontWeight: "500",
    },
    usernameText: {
      color: "#0F172A",
      fontFamily: "montserratMedium",
      fontSize: 16,
      fontWeight: "700",
    },
    notificationContainer: {
      position: "relative",
    },
    notificationDot: {
      width: 5,
      height: 5,
      backgroundColor: "#FF0E0E",
      position: "absolute",
      borderRadius: 40,
      right: "20%",
    },
    motivationContainer: {
      backgroundColor: "#F2E6FE",
      paddingVertical: 14,
      paddingHorizontal: 10,
      marginBottom:14,
      borderTopStartRadius:10,
      borderTopEndRadius:10,
  
    },
    motivationText: {
      color: "#8A2BE2",
      fontFamily: "montserratMedium",
      fontSize: 12,
      fontWeight: "500",
    },
    
    imageBackground: {
      // height: 125,
      borderRadius: 20,
      backgroundColor:"#fff",
      // overflow: "hidden",
       // justifyContent: "flex-end",
      // paddingTop: 4,
      paddingHorizontal: 13,
      marginHorizontal:16,
      paddingVertical:20,
      justifyContent:"center"
    },
    imageText: {
      color: "#000",
      fontFamily: "montserratMedium",
      fontSize: 17,
      fontWeight: "700",
      lineHeight:18
    },
    contentContainer: {
      paddingVertical: 6,
      backgroundColor: "#fff",
      borderRadius: 10,
      marginTop:20
    },
    btns: {
      marginTop:"5%",
      flexDirection:"row",
      alignItems:"center",
      width: "35%",
      gap:5,
      paddingVertical: 7,
      paddingHorizontal:10,
      borderWidth: 1,
      borderRadius: 14.29,
      backgroundColor:"#fff",
      borderColor: "#fff",
    },
    button: {
      fontSize: 13,
      fontFamily:"Poppins",
      fontWeight: "700",
      // textAlign: "center",
      color: "#8A2BE2",
    },
  });

  export default Homes