import { StyleSheet } from "react-native";

const WheelSPins = StyleSheet.create({
    container: {
      padding: 24,
      alignItems: 'center',
    },
    header: {
      fontSize: 25,
      fontWeight: '700',
      marginBottom: 24,
      textAlign:"left",
      fontFamily: "PoppinsBold",
    },
    triangle: {
      zIndex: 1,
      width: 0,
      height: 0,
      borderLeftWidth: 8,
      borderRightWidth: 8,
      borderBottomWidth: 16,
      borderLeftColor: 'transparent',
      borderRightColor: 'transparent',
      borderBottomColor: 'red',
    },
    outerCircle: {
      width: 266,
      height: 266,
      backgroundColor: '#007BFF',
      borderRadius: 128,
      justifyContent: 'center',
     
      alignItems: 'center',
      marginBottom: 24,
    },
     outerCircles: {
      width: 266,
      height: 266,
      backgroundColor: '#000000CC',
      borderRadius: 128,
      justifyContent: 'center',
     
      alignItems: 'center',
      marginBottom: 24,
    },
    innerCircle: {
      width: 250,
      height: 250,
      backgroundColor: '#E0E0E0',
       borderRadius: 120,
      justifyContent: 'center',
      alignItems: 'center',
    },
    numberGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      gap: 8,
      width: 128,
    },
     numberGrids: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      gap: 8,
      // width: "78%",
    },
    numberBox: {
      width: 32,
      height: 32,
      backgroundColor: '#fff',
      borderRadius: 16,
      justifyContent: 'center',
      alignItems: 'center',
      margin: 4,
    },
    numberText: {
      fontWeight: '500',
      fontFamily: "montserratMeduim",
    },
    spinButton: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#334159',
      paddingHorizontal: 35,
      paddingVertical: 16,
      borderRadius: 8,
      marginVertical: 16,
    },
    spinButtonText: {
      color: '#FFF',
      fontSize: 14,
      fontWeight: '500',
      marginRight: 8,
      textAlign:"center",
      fontFamily: "montserratMeduim",
      lineHeight:24
    },
    fullWidth: {
      width: '100%',
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '600',
      marginBottom: 12,
      color: '#fff',
      fontFamily: "montserratMeduim",
    },
    inputGroup: {
      marginBottom: 24,
    },
    inputLabel: {
      fontSize: 14,
      color: '#fff',
      fontWeight:'400',
      marginBottom: 4,
      fontFamily: "montserratMeduim",
    },
    input: {
      // height: 40,
      borderWidth: 1,
      borderColor: '#D1D5DB',
      borderRadius: 6,
      paddingVertical: 22,
      paddingHorizontal:15,
      flex:1,
      fontSize: 16,
      color:"#fff",
      backgroundColor: '#334159',
    },
    amountDetails: {
      marginBottom: 24,
    },
    rowBetween: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 8,
    },
    detailLabel: {
      fontSize: 13,
      color: '#fff',
      fontFamily: "montserratMeduim",
      fontWeight:'500'
    },
    detailValue: {
      fontWeight: '500',
      fontFamily: "montserratMeduim",
      color: '#fff',
    },
    totalLabel: {
      fontSize: 15,
      fontWeight: '600',
      color: '#fff',
    },
    totalValue: {
      fontSize: 15,
      fontWeight: '700',
      fontFamily: "montserratMeduim",
      color: '#fff',
    },
    wallet: {
      marginBottom: 24,
    },
    walletText: {
      fontSize: 13,
      fontWeight:'400',
      fontFamily: "montserratMeduim",
      color: '#fff',
    },
    walletAmount: {
      fontWeight: '600',
      fontFamily: "montserratMeduim",
      color: '#fff',
    },
    publishButton: {
      backgroundColor: '#A1A1AA',
      paddingVertical: 22,
      paddingHorizontal: 32,
      borderRadius: 6,
      alignItems: 'center',
      opacity: 0.6,
    },
    publishText: {
      color: '#fff',
      fontWeight: '600',
      fontFamily: "montserratMeduim",
      fontSize: 14,
      textAlign:"center",
      width:"100%"
    },
    infoCard: {
      borderRadius: 12,
      borderWidth: 1,
      borderColor: '#334159',
      backgroundColor: '#334159',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 2,
      marginTop: 15,
    },
    cardContent: {
      padding: 16,
    },
    cardTitle: {
      fontWeight: '700',
      fontSize: 16,
      fontFamily: "PoppinsReg",
      color:"#fff",
      marginBottom: 8,
    },
    cardText: {
      fontSize: 13,
      fontWeight:'400',
      fontFamily: "PoppinsReg",
      color:"#f3f4f5",
    },
  });


  export default WheelSPins