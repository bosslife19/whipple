import { Dimensions, StyleSheet } from "react-native";

const { width: screenWidth } = Dimensions.get('window');

const gameCates = StyleSheet.create({
    main: {
      backgroundColor: '#F9FAFB',
      height:"100%"
      // flex: 1,
    },
    scrollContainer: {
      // padding: 16,
      paddingBottom: "100%",
    },
    btn:{
    width:"100%",
    backgroundColor:"#0F172A",
    padding:15,
    borderBottomLeftRadius:10,
    borderBottomRightRadius:10
    },
    topBar: {
      flexDirection: 'row',
      paddingHorizontal: 16,
      paddingVertical: 10,
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    searchInput: {
      flex: 1,
      backgroundColor: '#fff',
      borderRadius: 8,
      paddingHorizontal: 10,
      borderColor: '#ddd',
      borderWidth: 1,
      marginRight: 8,
      fontSize: 12,
      height: 43,
    },
    pickerWrapper: {
      width: 150,
      backgroundColor: '#fff',
      borderRadius: 8,
      borderColor: '#ddd',
      borderWidth: 1,
      overflow: 'hidden',
    },
    picker: {
      height: 49,
      width: '100%',
    },
    section: {
      marginBottom: 24,
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: '700',
      color: '#1F2937',
      marginBottom: 12,
      marginLeft:25,
      fontFamily:"PoppinsReg",
      textTransform: 'uppercase',
    },
    row: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 10,
      justifyContent:"center",
      marginHorizontal:"auto"
    }, 
    card: {
      width: (screenWidth - 48) / 1,
      backgroundColor: '#fff',
      borderRadius: 10,
      
      // paddingBottom:8,
      marginBottom: 12,
      elevation: 2,
      flexDirection:"column",
      justifyContent:"space-between",
      gap:6
    },
    imageWrapper: {
      position: 'relative',
      width: '100%',
      height: 120,
      borderRadius: 8,
      overflow: 'hidden',
      marginHorizontal:"auto"
    },
    image: {
      width: '100%',
      height: '100%',
      borderTopLeftRadius: 8,
      borderTopRightRadius: 8,
      // objectFit:"contain"
    },
    imageBadge: {
      position: 'absolute',
      top: 0,
      left: 0,
      backgroundColor: '#FACC15',
      color: '#212121',
      fontSize: 12,
      fontWeight: 'bold',
      paddingHorizontal: 6,
      paddingVertical: 3,
      borderBottomRightRadius: 4,
      zIndex: 1,
    },
    gameTitle: {
      fontSize: 14,
      fontWeight: '600',
      marginTop: 5,
      color: '#1F2937',
      fontFamily:"PoppinsReg",
      paddingHorizontal: 12,
    },
    description: {
      fontSize: 12,
      color: '#555',
      fontFamily:"PoppinsReg",
      paddingHorizontal: 12,
      // marginTop: 4,
    },
    variantLabel: {
      fontWeight: '600',
      marginTop: 6,
      fontSize: 12,
      fontFamily:"PoppinsReg",
      paddingHorizontal: 12,
    },
    variantText: {
      fontSize: 12,
      color: '#333',
      fontFamily:"PoppinsReg",
  
      marginLeft: 4,
    },
    noResults: {
      fontSize: 16,
      textAlign: 'center',
      color: '#888',
      marginTop: 20,
      fontFamily:"PoppinsReg",
  
    }, 
  });

  export default gameCates