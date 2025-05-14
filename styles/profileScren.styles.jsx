import { StyleSheet } from "react-native";

const Profilescs = StyleSheet.create({
    container: {
      // flex: 1,
      padding: 16,
      backgroundColor: '#fff',
      height:'100%'
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    tabList: {
      flexDirection: 'row',
      backgroundColor: '#eee',
      borderRadius: 8,
      marginBottom: 20,
      overflow: 'hidden',
    },
    tabButton: {
      flex: 1,
      paddingVertical: 10,
      alignItems: 'center',
      backgroundColor: '#eee',
    },
    tabButtonActive: {
      backgroundColor: '#fff',
    },
    tabText: {
      fontSize: 14,
      color: '#555',
    },
    tabTextActive: {
      fontWeight: 'bold',
      color: '#000',
    },
    card: {
      backgroundColor: '#fff',
      padding: 16,
      borderRadius: 8,
      shadowColor: '#000',
      shadowOpacity: 0.05,
      shadowRadius: 4,
      borderWidth: 1,
      borderColor: '#ccc',
      marginBottom: 20,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '600',
      marginBottom: 16,
    },
    inputGroup: {
      marginBottom: 12,
    },
    label: {
      fontSize: 14,
      fontWeight: '500',
      marginBottom: 4,
    },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 6,
      padding: 10,
      fontSize: 16,
    },
    saveButton: {
      backgroundColor: '#6C47FF',
      padding: 12,
      borderRadius: 6,
      marginTop: 12,
      alignItems: 'center',
    },
    saveButtonText: {
      color: '#fff',
      fontWeight: '600',
    },
    description: {
      fontSize: 14,
      color: '#555',
      marginBottom: 12,
    },
    referralRow: {
      flexDirection: 'row',
      backgroundColor: '#f2f2f2',
      padding: 12,
      borderRadius: 6,
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 12,
    },
    referralCode: {
      fontFamily: 'monospace',
      fontWeight: '600',
    },
    copyButton: {
      paddingHorizontal: 10,
      paddingVertical: 6,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 6,
    },
    shareRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: 10,
    },
    shareButton: {
      flex: 1,
      padding: 12,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 6,
      alignItems: 'center',
    },
    logoutContainer: {
      marginTop: 30,
      alignItems: 'center',
    },
    logoutButton: {
      borderWidth: 1,
      borderColor: '#ddd',
      padding: 12,
      borderRadius: 6,
      backgroundColor: '#ffecec',
    },
    logoutText: {
      color: '#cc0000',
      fontWeight: '600',
    },
  });


  export default Profilescs