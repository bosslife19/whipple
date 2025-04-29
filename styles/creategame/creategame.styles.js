import { StyleSheet } from "react-native";

const creategame = StyleSheet.create({
    container: {
      // flex: 1,
      backgroundColor: '#111827',  
      
      paddingHorizontal: 20,
      paddingTop:10,
      height:"100%"
    },
    title: {
      fontSize: 16,
      fontWeight: '700',
      color: '#fff',
      marginBottom: 3,
      fontFamily: "montserratMeduim"
    },
    subtitle: {
      fontSize: 12,
      color: '#6B7280',
      
      fontFamily: "montserratMeduim"
    },
    label: {
      fontSize: 12,
      fontWeight: '500',
      marginTop: 10,
      color: '#fff',
      fontFamily: "montserratMeduim"
  
    },
    input: {
      backgroundColor: '#1F3C6A',
      padding: 18,
      borderRadius: 20,
      borderColor: '#1F3C6A',
      borderWidth: 1,
      marginTop: 6,
       color: '#fff',
      fontFamily: "montserratMeduim",
    },
    durationRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 8,
      borderRadius:10,
       overflow:"hidden",
       color:"#fff",
    },
    picker: {
      flex: 1,
      height: 50,
      color:"#fff",
      backgroundColor:"#1F3C6A",
      marginHorizontal:3,
      fontSize:12
    },
    summary: {
       marginTop: 20,
    backgroundColor: '#1F3C6A',
    padding: 12,
    borderRadius: 8,
     flexDirection: 'column',
    justifyContent: 'space-between', // Space out the texts evenly
     },
    flexD:{
      flexDirection:"row",
      justifyContent: 'space-between', // Space out the texts evenly
    },
    summaryText: {
        fontFamily: "montserratMeduim",
      marginBottom: 10, // Adds space between each Text component
      fontSize: 12,      // Optional: Adjust font size as necessary
      color: '#fff',     // Optional: Adjust color as needed
    },
    summaryTitle: {
        fontFamily: "montserratMeduim",
      fontWeight: '700',
      marginBottom: 6,
     },
    publishBtn: {
      marginTop: 20,
      backgroundColor: '#FF8C00',
      paddingVertical: 20,
      borderRadius: 10,
      alignItems: 'center',
    },
    publishText: {
      color: '#fff',
      fontWeight: '600',
      fontSize: 16,
      fontFamily: "montserratMeduim",
    },
    bottomText: {
      marginTop: 30,
      alignItems: 'center',
     },
    note: {
      fontWeight: '700',
      fontSize: 14,
      color: '#1F2937',
      fontFamily: "montserratMeduim",

    },
    noteSub: {
      fontSize: 12,
      color: '#6B7280',
      textAlign: 'center',
      marginTop: 4,
      fontFamily: "montserratMeduim",

    },
    modalOverlay: {
      flex: 1,
      height:"100%",
      justifyContent: 'flex-end',
      backgroundColor: 'rgba(0,0,0,0.3)',
    },
    modalContent: {
        backgroundColor: 'rgb(53, 52, 52)',
    //   backgroundColor: 'white',
      padding: 20,
      zIndex:10000,
    //   height:"70%",
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      flexDirection:"column",
      gap:20
    //   justifyContent:"space-around"
    //   alignItems: 'center',
    },
    // In creategame.styles.js
selectButton: {
    paddingVertical: 10,
    paddingHorizontal: 25,
    backgroundColor: '#334159',
    borderRadius: 10,
    // marginLeft: 10,
  },
  
  selectedOption: {
    backgroundColor: '#007BFF',
  },
  
  selectText: {
    color: '#fff',
    fontFamily: "montserratMeduim",

  },
  
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    maxWidth:300,
    marginLeft:"auto"
  },
  
  confirmBtn: {
    backgroundColor: '#334159',
    paddingVertical: 10,
    borderRadius: 5,
    flex: 0.5,
    marginRight: 5,
  },
  
  cancelBtn: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    borderRadius: 5,
    flex: 0.3,
    marginLeft: 5,
  },
  
  confirmText: {
    color: '#fff',
    textAlign: 'center',
    fontFamily: "montserratMeduim",
    fontSize:10
  },
  
  cancelText: {
    color: '#fff',
    fontFamily: "montserratMeduim",
    textAlign: 'center',
    fontSize:10
  },  
    modalTitle: {
      fontSize: 18,
      fontWeight: '700',
      color: '#fff',
      marginBottom: 10,
      fontFamily: "montserratMeduim",

    },
    enterGameBtn: {
      marginTop: 20,
      backgroundColor: '#10B981',
      paddingVertical: 12,
      paddingHorizontal: 30,
      borderRadius: 8,
    },
    enterGameText: {
      color: '#fff',
      fontWeight: '600',
      fontFamily: "montserratMeduim",

    },
  });

  export default  creategame