import { Dimensions, StyleSheet } from "react-native";

const screenWidth = Dimensions.get('window').width;

const LosersGameList = StyleSheet.create({
    container: {
      backgroundColor: '#EEF6FF',
      paddingBottom: 100, 
         
    },
    centeredContainer: {
      // flex: 1,
      // justifyContent: 'center',
      margin:"auto",
      // height:"100%",

      alignItems: 'center',
      // backgroundColor: '#EEF6FF',
    },
    noGameText: {
      color: '#888',
      fontSize: 16,
      paddingHorizontal: 20,
      textAlign: 'center',
      fontFamily: 'montserratMeduim',
  
    },
    scrollContainer: {
      alignItems: 'center',
      paddingVertical: 10,
    },
    card: {
      width: screenWidth * 0.9,
      marginBottom: 20,
      backgroundColor: '#fff',
      borderRadius: 14,
      borderWidth: 1,
      borderColor: '#e0e0e0',
      
    },
    cardHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: '#f0f0f0',
      backgroundColor: '#f9f9f9',
      borderTopLeftRadius: 14,
      borderTopRightRadius: 14,
    },
    headerIcon: {
      fontSize: 20,
      marginRight: 8,
      fontFamily: 'montserratMeduim',
      fontWeight:'400'
    },
    headerText: {
      fontSize: 16,
      fontWeight: '600',
      fontFamily: 'montserratMeduim',
  
    },
    cardBody: {
      padding: 16,
      fontFamily: 'montserratMeduim',
  
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 10,
    },
    label: {
      fontSize: 13,
      color: '#666',
      fontWeight:'400',
      fontFamily: 'montserratMeduim',
  
    },
    value: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#222',
      fontFamily: 'montserratMeduim',
  
    },
    description: {
      fontSize: 13,
      color: '#444',
      marginVertical: 8,
      fontWeight:'400',
      fontFamily: 'montserratMeduim',
  
    },
    info: {
      fontSize: 13,
      color: '#555',
      fontWeight:'400',
      fontFamily: 'montserratMeduim',
  
    },
    infoLabel: {
      fontWeight: '500',
      color: '#777',
      fontFamily: 'montserratMeduim',
  
    },
    playButton: {
      marginTop: 16,
      backgroundColor: '#2563EB',
      paddingVertical: 12,
      borderRadius: 8,
      alignItems: 'center',
    },
    playButtonText: {
      color: '#fff',
      fontWeight: '600',
      fontSize: 15,
      fontFamily: 'montserratMeduim',
  
    },
    rulesCard: {
      backgroundColor: '#fff',
      marginBottom: 16,
      borderRadius: 14,
      borderWidth: 1,
      borderColor: '#ddd',
      padding: 16,
      width: screenWidth * 0.9,
      alignSelf: 'center',
       
    },
    rulesTitle: {
      fontSize: 18,
      fontWeight: '700',
      marginBottom: 4,
      color: '#111',
      fontFamily: 'montserratMeduim',
  
    },
    rulesSubtitle: {
      fontSize: 14,
      color: '#555',
      marginBottom: 10,
      fontWeight:'400',
      fontFamily: 'montserratMeduim',
  
    },
    rulesSectionTitle: {
      fontSize: 15,
      fontWeight: '600',
      marginBottom: 6,
      fontFamily: 'montserratMeduim',
  
    },
    listItem: {
      marginBottom: 4,
      paddingLeft: 10,
    },
  });

  export default  LosersGameList