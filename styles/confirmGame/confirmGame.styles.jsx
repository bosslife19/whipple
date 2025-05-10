import { StyleSheet } from "react-native";

const ConfirmsSTy = StyleSheet.create({
    container: {
      padding: 16,
      paddingBottom: 40,
    },
    header: {
      marginBottom: 20,
    },
    title: {
      fontSize: 22,
      fontWeight: '700',
      fontFamily: 'montserratMeduim',

    },
    subTitle: {
      fontSize: 14,
      color: '#666',
      fontFamily: 'montserratMeduim',

    },
    card: {
      backgroundColor: '#fff',
      padding: 16,
      borderRadius: 10,
      marginBottom: 20,
      elevation: 2,
    },
    cards: {
      padding: 10,
      backgroundColor: '#ffffff',
      borderRadius: 12,
     },
    titles: {
      fontSize: 14,
      fontWeight: '700',
      color: '#1f2937',
      marginBottom: 10,
      fontFamily: 'montserratMeduim',

    },
    descriptions: {
      fontSize: 12,
      color: '#4b5563',
      fontFamily: 'montserratMeduim',

      lineHeight: 22,
    },
    highlight: {
      fontWeight: '600',
      fontFamily: 'montserratMeduim',

      color: '#4F46E5', // blue-600
    },
    success: {
      fontWeight: '600',
      fontFamily: 'montserratMeduim',

      color: '#16a34a', // green-600
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '600',
      fontFamily: 'montserratMeduim',

      marginBottom: 10,
    },
    info: {
      fontSize: 14,
      color: '#666',
      fontFamily: 'montserratMeduim',

      marginBottom: 10,
    },
    detailRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 16,
    },
    label: {
      fontSize: 13,
      color: '#888',
      fontFamily: 'montserratMeduim',

    },
    value: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 12,
      fontFamily: 'montserratMeduim',

    },
    numberGrid: {
      flexDirection: 'row',
      justifyContent: 'center',
      flexWrap:"wrap",
      gap: 10,
      marginBottom: 20,
    },
    numberButton: {
      backgroundColor: '#f3f4f6',
      width: 50,
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 5,
    },
    selectedNumber: {
      backgroundColor: '#4F46E5',
    },
    selectedTexts:{
      color:"#fff",
      fontFamily: 'montserratMeduim',

    },
    numberText: {
      fontSize: 16,
      fontWeight: 'bold',
      fontFamily: 'montserratMeduim',

      color:"#212121"
    },
    selectionCountText: {
      fontSize: 13,
      // textAlign: 'center',
      marginTop: 10,
      fontFamily: 'montserratMeduim',

      color:"rgb(107 114 128)"
    },
    buttonRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 20,
    },
    primaryBtn: {
      backgroundColor: '#4F46E5',
      paddingVertical: 15,
      paddingHorizontal: 24,
      borderRadius: 6,
      marginVertical:10
    },
    primaryBtnText: {
      color: '#fff',
      fontWeight: '600',
      textAlign:"center",
      fontFamily: 'montserratMeduim',

    },
    secondaryBtn: {
      borderColor: '#ccc',
      borderWidth: 1,
      paddingVertical: 12,
      paddingHorizontal: 24,
      borderRadius: 6,
    },
    secondaryBtnText: {
      color: '#333',
      fontWeight: '600',
      fontFamily: 'montserratMeduim',

    },
  });
  
  export default ConfirmsSTy