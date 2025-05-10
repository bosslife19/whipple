import { StyleSheet } from "react-native";

const FLipCoin = StyleSheet.create({
    container: {
      padding: 20,
      alignItems: 'center',
    
      marginBottom:"50%"
    },
    title: {
      fontSize: 22,
      fontWeight: '700',
      marginBottom: 24,
      fontFamily: 'PoppinsBold',
  
    },
    coinContainer: {
      width: 160,
      height: 160,
      marginBottom: 24,
      perspective: 1000,
    },
    coinFace: {
      width: "100%",
      height: "100%",
      borderRadius: 80,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 6,
      borderColor: '#1069a8',
    },
    coinBase: {
      backgroundColor: '#4789B9',
    },
    coinText: {
      fontSize: 50,
      fontWeight: 'bold',
      fontFamily: 'Grotesk',
  
      color: '#f3f4f5',
    },
    button: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#0A1931',
      paddingVertical: 22,
      paddingHorizontal: 32,
      borderRadius: 10,
      marginBottom: 16,
      // width:"100%"
    },
      FlipButton: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#0A1931',
      paddingVertical: 22,
      paddingHorizontal: 32,
      borderRadius:  5,
      marginBottom: 16,
      // width:"100%"
    },
    buttonText: {
      color: '#fff',
      fontWeight: '600',
      fontSize: 14,
      textAlign:"center",
      fontFamily: 'montserratMeduim',
  
      flex:1
    },
      buttonTexts: {
      color: '#fff',
      fontWeight: '600',
      fontSize: 14,
      textAlign:"center",
      fontFamily: 'montserratMeduim',
  
     },
    resultContainer: {
      alignItems: 'center',
    },
    resultText: {
      fontSize: 18,
      fontWeight: '600',
      fontFamily: 'PoppinsBold',
  
    },
    odds: {
      fontSize: 14,
      fontWeight:'400',
      color: '#6b7280',
      marginTop: 4,
      fontFamily: 'montserratMeduim',
  
    },
    card: {
      width: '100%',
       borderRadius: 12,
      padding: 10,
      gap:10,
      marginTop: 20,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '600',
      marginBottom: 12,
      fontFamily: 'montserratMeduim',
  
    },
    label: {
      fontSize: 14,
      fontWeight: '500',
      marginBottom: 4,
      color: '#374151',
      fontFamily: 'montserratMeduim',
  
    },
    input: {
      borderWidth: 1,
      borderColor: '#d1d5db',
      borderRadius: 8,
      padding: 15,
      fontSize: 16,
      marginBottom: 12,
    },
    amountControls: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 12,
      gap:5
    },
    controlView:{
      borderWidth:1,
      padding:10,
      
      borderRadius:5,
      borderColor:"#0A1931"
    },
    controlLabel: {
      fontSize: 13,
      fontWeight: '700',
      textAlign:"center",
      fontFamily: 'montserratMeduim',
  
    },
    amountButtons: {
      flexDirection: 'row',
      // gap: 7,
      borderWidth:1,
      padding:10,
      borderRadius:5,
      borderColor:"#0A1931",
      alignItems:"center"
    },
    amountControlBtn: {
      fontSize: 24,
      paddingHorizontal: 12,
      paddingVertical: 2,
      fontFamily: 'montserratMeduim',
      fontWeight:'400',
      color: '#0A1931',
    },
    quickAmounts: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
      justifyContent: 'space-between',
      marginBottom: 16,
      
    },
    quickBtn: {
      backgroundColor: '#f3f4f6',
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 8,
      borderWidth:1,
      width:"30%"
    },
    quickBtnText: {
      fontSize: 13,
      fontWeight: '700',
      fontFamily: 'montserratMeduim',
  
      color: '#111827',
    },
    totals: {
      marginBottom: 16,
      backgroundColor:'#1F3C6A',
      padding:10,
      gap:5,
      borderRadius:5
    },
    totalRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 4,
    },
    totalLabel: {
      fontSize: 14,
      fontFamily: 'montserratMeduim',
      fontWeight:'400',
      color: '#fff',
    },
    totalValue: {
      fontSize: 14,
      fontFamily: 'montserratMeduim',
      fontWeight:'400',
      color: '#fff',
    },
    walletText: {
      fontSize: 14,
      color: '#fff',
      fontWeight:'400',
      fontFamily: 'montserratMeduim',
  
    },
    infoBox: {
      backgroundColor: '#f9fafb',
      padding: 16,
      borderRadius: 12,
      marginTop: 20,
      width: '100%',
      borderWidth:1,
      borderColor:'#e5e7eb'
    },
    infoTitle: {
      fontWeight: '400',
      fontSize: 16,
      fontFamily: 'PoppinsBold',
  
      marginBottom: 8,
    },
    infoText: {
      fontSize: 13,
      fontFamily: 'PoppinsLight',
      fontWeight:'400',
      color: '#4b5563',
    },
  });

  export default FLipCoin