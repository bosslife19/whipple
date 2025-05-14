import { StyleSheet } from "react-native";

const dicestyles = StyleSheet.create({
    contain:{
    backgroundColor:"#EEF6FF",
        paddingBottom:"60%",
        height:"auto"
    },
    container: {
      padding: 16,
      backgroundColor:"#EEF6FF",
     },
  
    row: {
      flexDirection: 'column',
      gap: 16,
    },
    card: {
      backgroundColor: '#f9f9f9',
      padding: 16,
      borderRadius: 10,
      marginBottom: 20,
      elevation: 2,
      gap:4
    },
    title: {
      fontSize: 18,
      fontWeight: '600',
      fontFamily:"PoppinsBold",
      marginBottom: 12,
    },
    subDescription:{
      fontSize: 14,
      fontWeight: '400',
      fontFamily:"montserratMeduim",
      marginBottom: 12,
    },
    radioGroup: {
      flexDirection: 'row',
      gap: 24,
      marginBottom: 20,
      alignItems: 'center',
    },
    radio: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent:"center",
      marginHorizontal:"auto",
      gap: 8,
    },
    radioDot: {
      width: 16,
      height: 16,
      borderRadius: 8,
      borderWidth: 2,
      borderColor: '#000',
      alignItems: 'center',
      justifyContent: 'center',
    },
    radioDotSelected: {
      backgroundColor: '#ddd',
    },
    diceBox: {
      width: 100,
      height: 100,
      borderRadius: 20,
      backgroundColor: '#fff',
      elevation: 5,
      alignItems: 'center',
      justifyContent: 'center',
      marginHorizontal:"auto"
    },
    diceFace: {
      width: "60%",
      height: "80%",
      flexDirection: 'column',
      justifyContent: 'space-around',
  
    },
    dotRow: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      flex: 1,
    },
    dotCell: {
      width: 24,
      height: 24,
      borderRadius: 12,
    },
    dot: {
      backgroundColor: '#1e293b',
      width: 10,
      height: 10,
      borderRadius: 8,
      alignSelf: 'center',
    },
    resultInfo: {
      marginTop: 12,
      marginBottom: 12,
     
      marginHorizontal:"auto"
    },
    result: {
      fontSize: 16,
      fontWeight: 'bold',
      textAlign:"center",
      fontFamily:"montserratMeduim",
    },
    odds: {
      fontSize: 14,
      textAlign:"center",
      color: '#555',
      fontFamily:"montserratMeduim",
      fontWeight:'400'
    },
    button: {
      marginTop: 10,
      backgroundColor: '#2467ec',
      paddingVertical: 14,
      paddingHorizontal: 30,
      borderRadius: 12,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
      justifyContent: 'center',
    },
    buttonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: '600',
      fontFamily:"montserratMeduim",
    },
    label: {
      marginBottom: 8,
      fontWeight: '500',
    },
    input: {
      borderWidth: 1,
      borderColor: '#ddd',
      padding: 15,
      borderRadius: 8,
      marginBottom: 12,
    },
    feeRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 8,
    },
    description: {
      color: '#333',
      fontWeight:'300',
      fontFamily:"PoppinsReg",
    },
  });

  export default dicestyles