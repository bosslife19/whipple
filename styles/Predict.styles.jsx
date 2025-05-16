import { StyleSheet } from "react-native";

const Predicts = StyleSheet.create({
  container: {
    padding: 16,
    // backgroundColor: '#fff',
    },
 winButton: {
  backgroundColor: '#35B464',
  borderColor: '#35B464',
},
drawButton: {
  backgroundColor: '#7659A7',
  borderColor: 'purple',
},
selectedText: {
  color: '#fff',
  fontWeight: '500',
},
defaultText: {
  color: '#000',
  fontWeight: '500',
},
  backText: {
    fontSize: 14,
    fontWeight: '500',
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
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000',
  },
  subtitle: {
    fontSize: 16,
    color: '#888',
  },
  card: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    marginBottom: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    shadowColor: '#000',
    elevation: 2,
  },
  date: {
    fontSize: 12,
    color: '#888',
    marginBottom: 8,
  },
  matchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  teamColumn: {
    width: '40%',
    alignItems: 'center',
  },
  teamName: {
    fontWeight: '500',
    marginBottom: 8,
    textAlign: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 8,
  },
  outcomeButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: '#fff',
    marginHorizontal: 4,
  },
  vsText: {
    fontWeight: 'bold',
  },
  confirmSection: {
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 16,
  },
  confirmButton: {
    backgroundColor: '#9985F1',
    paddingVertical: 15,
    paddingHorizontal: 32,
    borderRadius: 8,
  },
  confirmButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  note: {
    fontSize: 12,
    color: '#888',
    marginTop: 8,
    textAlign: 'center',
  },
});


export default Predicts