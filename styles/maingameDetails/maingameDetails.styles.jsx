import { StyleSheet } from "react-native";

const maingamess = StyleSheet.create({
    container: {
      // flex: 1,
      padding: 20,
      backgroundColor: '#F7F8FA',
      height:"100%"
    },
    title: {
      fontSize: 26,
      fontWeight: '700',
      textAlign: 'center',
      marginBottom: 20,
      color: '#fff',  
      fontFamily: "montserratMeduim"
  
  },
  timeRow: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 30,
    },
    timeUnitBox: {
      backgroundColor: '#1F3C6A',
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderRadius: 10,
      marginHorizontal: 4,
    },
    colon: {
      fontSize: 20,
      fontWeight: '600',
      color: '#1e3a8a',
      fontFamily: "montserratMeduim",
    },
    
    timeBox: {
      backgroundColor: '#1e3a8a',
      paddingVertical: 12,
      borderRadius: 10,
      marginBottom: 30,
      alignItems: 'center',
    },
    timeText: {
      color: '#fff',
      fontSize: 20,
      fontWeight: '600',
      fontFamily: "montserratMeduim"
  
    },
    bottomSection: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    leftColumn: {
      flex: 1,
    },
    infoBox: {
      backgroundColor: '#0A1931',
      padding: 14,
      marginBottom: 10,
      borderRadius: 10,
      elevation: 2,
    },
    infoLabel: {
      fontSize: 14,
      color: '#fff',
      fontFamily: "montserratMeduim"
  
    },
    infoValue: {
      fontSize: 16,
      fontWeight: 'bold',
      marginTop: 4,
      color: '#fff',
      fontFamily: "montserratMeduim"
  
    },
    rightBox: {
      flex: 1,
      backgroundColor: '#0A1931',
      padding: 14,
      borderRadius: 10,
      elevation: 2,
      marginLeft: 10,
      alignItems: 'center',
    },
    stats: {
      fontSize: 14,
      marginTop: 6,
      fontWeight: '500',
      color: '#fff',
      fontFamily: "montserratMeduim"
  
    },
    letterBoxContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginTop: 25,
       justifyContent: 'center',
      gap:20
    },
    letterBox: {
      width: '35%',
      height:"30%",
      aspectRatio: 1,
      backgroundColor: '#2563eb',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
      marginBottom: 15,
    },
    letterText: {
      fontSize: 40,
      fontWeight: '700',
      color: '#fff',
      fontFamily: "montserratMeduim"
  
    },
    modalOverlay: {
      flex: 1,
      justifyContent: 'flex-end',
      backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
      backgroundColor: '#fff',
      borderRadius: 14,
      paddingHorizontal: 20,
      paddingBottom: 60,
      paddingTop: 20,
  
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: '700',
      marginBottom: 15,
      fontFamily: "montserratMeduim"
  
    },
    amountOptions: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 20,
      flexWrap:"wrap",
      gap:20
    },
    amountBtn: {
      // width:70,
      backgroundColor: '#fff',
      borderColor:"#0A1931",
      borderWidth:1,
      paddingVertical: 10,
      paddingHorizontal: 15,
      borderRadius: 8,
    },
    amountText: {
      fontSize: 10,
      fontWeight: '600',
      color: '#0A1931',
      fontFamily: "montserratMeduim"
  
    },
    input: {
      borderWidth: 1,
      borderColor: '#cbd5e1',
      borderRadius: 20,
      padding: 20,
      marginBottom: 20,
      backgroundColor:"#505762",
      color:"#fff",
      fontSize: 16,
    },
    confirmBtn: {
      backgroundColor: '#007BFF',
      padding: 19,
      borderRadius: 13,
      alignItems: 'center',
    },
    confirmText: {
      color: '#fff',
      fontWeight: '500',
  
      fontFamily: "montserratMeduim"
  
    },
    cancelBtn: {
      marginTop: 10,
      alignItems: 'center',
    },
    cancelText: {
      color: '#dc2626',
      fontSize: 14,
      fontFamily: "montserratMeduim"
  
    },
  });

  export default maingamess