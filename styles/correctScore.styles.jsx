import { StyleSheet } from "react-native";

const CorrectSCores = StyleSheet.create({
  container: {
    padding: 16,
 
    height:'100%'
    // flex: 1,
  },
   bottomModalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'transparent',
  },
  popupBox: {
    // width:'10%',
    backgroundColor: '#fff',
    padding: 16,
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
    marginVertical:10,
    marginHorizontal:20,
    elevation:5
  },
  popupText: {
    color: '#0F172A',
    // textAlign: 'center',
    fontSize: 12,
  },
   backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap:10,
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderColor: '#ccc',
    marginBottom: 24,
    alignSelf: 'flex-start',
  },
  backIcon: {
    marginRight: 8,
    fontSize: 16,
  },
    backText: {
    fontSize: 14,
    fontWeight: '500',
  },
  title: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#000',
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 16,
    color: 'gray',
  },
  card: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 20,
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  dateText: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 10,
  },
  matchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  teamSection: {
    width: '40%',
    alignItems: 'center',
  },
  teamText: {
    fontWeight: '600',
    marginBottom: 8,
  },
  vsText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  dropdown: {
    borderWidth: 1,
    borderColor: '#aaa',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    minWidth: 80,
    backgroundColor: '#fff',
  },
  dropdownActive: {
    backgroundColor: '#7659A7',
  },
  blackText: {
    color: '#000',
    textAlign: 'center',
  },
  whiteText: {
    color: '#fff',
    textAlign: 'center',
  },
  confirmButton: {
    backgroundColor: '#9985F1',
    paddingVertical: 16,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 24,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  noteText: {
    textAlign: 'center',
    fontSize: 12,
    color: 'gray',
    marginTop: 12,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 16,
    width: 120,
  },
  option: {
    paddingVertical: 10,
    alignItems: 'center',
  },
});

export default CorrectSCores