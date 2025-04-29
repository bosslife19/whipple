import { StyleSheet } from "react-native";

const Transes = StyleSheet.create({
    container: {
      paddingVertical: 20,
      paddingHorizontal: 20,
      // backgroundColor: "#000",
      height:"100%" 
    },
    accordionContainer: {
      marginBottom: 10,
      backgroundColor: "#fff",
      borderRadius: 10,
      overflow: "hidden",
    },
    equipmentContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 2,
  },
  icon: {
      width: 12.27,
      height: 12.27,
      marginRight: 4,
  },
  equipmentText: {
      fontSize: 11,
      fontFamily: "montserratMeduim",
      color: '#334155',
  },
  button: {
      margin:13,
      backgroundColor: "#8A2BE2",
      padding: 15,
      borderRadius: 30,
      alignItems: "center",
    },
    buttoned: {
      marginTop:13,
      backgroundColor: "#8A2BE2",
      padding: 15,
      borderRadius: 30,
      alignItems: "center",
    },
    buttonText: {
      color: "#fff",
      fontSize: 14,
      padding: 4,
      fontFamily: "montserratMedium",
      fontWeight: "bold",
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: 15,
      backgroundColor: "#f8f9fa",
    },
    headerText: {
      fontSize: 16,
      fontWeight: "bold",
       fontFamily: "montserratMedium",
    },
    headerRight: {
      flexDirection: "row",
      alignItems: "center",
    },
    content: {
      padding: 10,
    },
    image: {
      width: "100%",
      height: 200,
      objectFit:"cover",
      
      borderRadius: 18,
      marginBottom: 5,
    },
    contentText: {
      fontSize: 14,
      color: "#475569",
       fontFamily: "montserratMedium",
    },
    progressBarContainer: {
      width: "100%",
      height: 7,
      backgroundColor: "#F1F5F9",
      borderRadius: 5,
      overflow: "hidden",
      marginTop: 5,
    },
    progressBar: {
      height: "100%",
      // paddingVertical:12,
      backgroundColor: "#0D9488",
    },
  })

  export default Transes