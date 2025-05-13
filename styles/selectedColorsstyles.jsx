import { StyleSheet } from "react-native";

const Slectedcol = StyleSheet.create({
    container: {
      paddingHorizontal: 16,
      // backgroundColor: '#EEF6FF',
      marginBottom:'5%'
    },
    colorBlockContainer: {
      flexDirection: 'row',
      gap: 10,
      marginVertical: 8,
      flexWrap: 'wrap',
      justifyContent: 'center',
    },
    colorBlock: {
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 8,
    },
    colorBlockText: {
      color: '#fff',
      fontWeight: 'bold',
      fontFamily: "montserratMeduim",

    },
    
    header: {
      marginBottom: 24,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      fontFamily: "montserratMeduim",

      marginBottom: 8,
    },
    description: {
      color: '#666',
      fontFamily: "montserratMeduim",

      fontSize: 16,
    },
    card: {
      backgroundColor: '#fff',
      borderRadius: 10,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 6,
      shadowOffset: { width: 0, height: 2 },
      marginBottom: 16,
      padding: 16,
    },
    cardTitle: {
      fontSize: 18,
      fontFamily: "montserratMeduim",

      fontWeight: 'bold',
    },
    cardSubtitle: {
      fontSize: 14,
      fontFamily: "montserratMeduim",

      color: '#888',
    },
    wheelContainer: { 
      alignItems: 'center',
      marginBottom: 16,
    },
    colorOptions: {
      flexDirection: 'row',
      justifyContent: 'center',
      flexWrap: 'wrap',
      gap: 10,
      marginBottom: 16,
    },
    colorButton: {
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 6,
      marginHorizontal: 6,
    },
    colorButtonText: {
      color: '#fff',
      fontSize: 14,
      fontFamily: "montserratMeduim",

    },
    spinButton: {
      backgroundColor: '#0A1931',
      borderRadius: 8,
      paddingHorizontal: 30,
      paddingVertical: 12,
      alignItems: 'center',
      justifyContent: 'center',
    },
    spinButtonText: {
      color: '#fff',
      fontFamily: "montserratMeduim",

      fontSize: 16,
    },
    resultBox: {
      marginTop: 20,
      padding: 16,
      borderRadius: 10,
      alignItems: 'center',
      fontFamily: "montserratMeduim",

    },
    resultText: {
      fontSize: 18,
      fontWeight: 'bold',
      fontFamily: "montserratMeduim",

      marginBottom: 8,
    },
    houseColorsText: {
      fontSize: 16,
      color: '#333',
      fontFamily: "montserratMeduim",

    },
    
    cardDescription: {
      color: '#666',
      fontFamily: "montserratMeduim",

      fontSize: 14,
    },
  });

  export default Slectedcol