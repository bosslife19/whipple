import { StyleSheet } from "react-native";

const CreateGames2 = StyleSheet.create({
    scrollContainer: {
      flexGrow: 1,
      justifyContent: 'flex-start',
      // height:"120%"
     },
    container: {
      flex: 1,
      padding: 24,
      backgroundColor: '#E5E7EB',
       height:"100%",
       marginBottom:"70%"
    },
    title: {
      fontSize: 21,
      fontWeight: 'bold',
      marginBottom: 10,
      fontFamily: 'montserratMeduim',
    },
    detailText: {
        fontSize: 14,
        color: '#333',
        fontWeight:'400',
        fontFamily: 'montserratMeduim',
        marginVertical: 2,
      },
      breakdownCard: {
        backgroundColor: '#F7F9FC',
        borderRadius: 8,
        padding: 8,
        marginTop: 16,
        
      },
      
      breakdownTitle: {
        fontSize: 16,
        fontWeight: '600',
         fontFamily: 'montserratMeduim',
        color: '#1A1A1A',
        marginBottom: 10,
      },
      
      breakdownRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
      },
      
      breakdownLabel: {
        fontSize: 14,
        color: '#444',
        fontWeight:'400',
        fontFamily: 'montserratMeduim',
      },
      
      breakdownValue: {
        fontSize: 14,
        fontWeight:'400',
        fontFamily: 'montserratMeduim',
        color: '#111',
      },
            
    subtitle: {
      fontSize: 14,
      color: '#666',
      marginBottom: 20,
      fontWeight:'400',
      fontFamily: 'montserratMeduim',    
    },
    grid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 10,
      marginTop: 10,
    },
    numberBtn: {
      width: 40,
      height: 40,
      borderRadius: 8,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 10,
      marginBottom: 10,
    },
    numberBtnActive: {
      backgroundColor: '#4F46E5',
    },
    numberText: {
      fontSize: 14,
      fontWeight: '500',
      color: '#111',
      fontFamily: 'montserratMeduim',
    },
    numberTextActive: {
      color: '#fff',
      fontWeight: 'bold',
      fontFamily: 'montserratMeduim',
    },
    selectedDisplay: {
      marginBottom: 16,
      paddingVertical: 8,
      paddingHorizontal: 12,
      backgroundColor: '#EEF2FF',
      borderRadius: 6,
    },
    selectedText: {
      fontSize: 16,
      color: '#4F46E5',
      fontWeight: '500',
      fontFamily: 'montserratMeduim',
    },
    card: {
      borderRadius: 12,
      borderWidth: 1,
      borderColor: '#ddd',
      backgroundColor: '#f9f9f9',
      shadowColor: '#000',
      shadowOpacity: 0.05,
      shadowRadius: 6,
      marginTop: 50,
      marginBottom: 50,
    },
    cardHeader: {
      padding: 16,
      borderBottomWidth: 1,
      borderColor: '#eee',
    },
    cardTitle: {
      fontSize: 18,
      fontWeight: '600',
      fontFamily: 'montserratMeduim',
    },
    cardBody: {
      padding: 16,
    },
    label: {
      fontSize: 14,
      fontWeight: '500',
      marginBottom: 6,
      fontFamily: 'montserratMeduim',
    },
    input: {
      // height: 40,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 6,
      paddingHorizontal: 10,
      paddingVertical:20,
      marginBottom: 16,
      backgroundColor: '#fff',
    },
    publishBtn: {
      backgroundColor: '#4F46E5',
      paddingVertical: 10,
      borderRadius: 6,
      alignItems: 'center',
    },
    publishBtnText: {
      color: '#fff',
      fontWeight: '600',
      fontSize: 16,
      fontFamily: 'montserratMeduim',
    },
    disabledBtn: {
      backgroundColor: '#ccc',
    },
  });

  export default  CreateGames2