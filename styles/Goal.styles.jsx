import { StyleSheet } from "react-native";

const Goalstyles = StyleSheet.create({
    card: {
      backgroundColor: '#fff',
      padding: 24,
      
      alignItems: 'center',
    },
    header: {
      fontSize: 22,
      fontWeight: '700',
      marginBottom: 20,
      color: '#333',
    },
    field: {
      width: '100%',
      height: 260,
      objectFit:"cover",
      backgroundColor: '#6AAC4B',
      borderRadius: 12,
      borderWidth: 1,
      borderColor: '#cce7e1',
      // marginBottom: 24,
      position: 'relative',
      overflow: 'hidden',
    },
    fieldHeader: {
      flexDirection: 'row',
      backgroundColor: 'transparent',
      borderBottomWidth: 1,
      borderColor: '#ccc',
      // height: 60,
      alignItems: 'center',
      paddingTop:5
    },
    segment: {
      flex: 1,
      borderRightWidth: 1,
      borderColor: '#ccc',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 10,
    },
    segmentText: {
      width:30,
      height:20,
      zIndex:10000
    },
    ballWrapper: {
      position: 'absolute',
      width: 40,
      height: 40,
      alignItems: 'center',
      justifyContent: 'center',
      zIndex:1000,
      
    },
    ball: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: '#ff5722',
      borderWidth: 2,
      borderColor: '#fff',
      shadowColor: '#000',
      shadowOpacity: 0.3,
      shadowOffset: { width: 1, height: 2 },
      shadowRadius: 4,
    },
    button: {
      flexDirection: 'row',
      backgroundColor: '#0A1931',
      paddingVertical: 14,
      paddingHorizontal: 30,
      borderRadius: 8,
      alignItems: 'center',
      marginTop: 20,
    },
    buttonText: {
      color: '#fff',
      fontWeight: '600',
      fontSize: 16,
    },
    message: {
      fontSize: 16,
      fontWeight: '500',
      marginVertical: 20,
      color: '#333',
    },
  });

  export default Goalstyles