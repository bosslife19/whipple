import { StyleSheet } from 'react-native';

const ColorRou = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 20,
    fontFamily: "montserratMeduim",

  },
  wheelContainer: {
    width: 256,
    height: 256,
    borderRadius: 128,
    overflow: 'hidden',
    borderWidth: 4,
    borderColor: '#e0e0e0',
    marginBottom: 40,
  },
  wheel: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  centerDot: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 16,
    height: 16,
    backgroundColor: '#333',
    borderRadius: 8,
    transform: [{ translateX: -8 }, { translateY: -8 }],
    zIndex: 10,
  },
  arrow: {
    position: 'absolute',
    top: 0,
    left: '50%',
    transform: [{ translateX: -12 }, { translateY: -20 }],
    width: 19,
    height: 40,
    backgroundColor: '#333',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  selectedText: {
    fontSize: 16,
    fontFamily: "montserratMeduim",

    fontWeight: '500',
    marginBottom: 6,
  },
  selectedColors: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  colorBox: {
    paddingHorizontal: '9%',
    paddingVertical: '5%',
    borderRadius: 5,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2467ec',
    paddingVertical: 20,
    borderRadius: 8,
    width: '100%',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontFamily: "montserratMeduim",

    flex: 1,
  },
  rightBox: {
    flex: 1,
    padding: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: "montserratMeduim",

    marginBottom: 10,
  },
 
  slice: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    clipPath: 'polygon(50% 50%, 0% 0%, 25% 0%)', // Placeholder
    opacity: 1,
  },
  wheelCenter: {
    position: 'absolute',
    width: 12,
    height: 12,
    backgroundColor: '#333',
    borderRadius: 6,
    top: '50%',
    left: '50%',
    marginLeft: -6,
    marginTop: -6,
    zIndex: 10,
  },
  pointer: {
    position: 'absolute',
    width: 12,
    height: 20,
    backgroundColor: '#333',
    top: -10,
    left: '50%',
    marginLeft: -6,
  },
  spinButton: {
    backgroundColor: '#1E40AF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  spinText: {
    color: '#fff',
    fontWeight: 'bold',
    fontFamily: "montserratMeduim",

  },
  label: {
    fontSize: 14,
    marginBottom: 6,
    fontFamily: "montserratMeduim",

  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
    borderRadius: 6,
  },
  amountRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  grayText: {
    color: 'gray',
    fontFamily: "montserratMeduim",

  },
  boldText: {
    fontWeight: 'bold',
    fontFamily: "montserratMeduim",

  },
  walletText: {
    marginBottom: 20,
    fontSize: 14,
    color: 'gray',
    fontFamily: "montserratMeduim",

  },
  disabledButton: {
    backgroundColor: '#ccc',
    paddingVertical: 14,
    borderRadius: 6,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontFamily: "montserratMeduim",

  },
  howItWorksBox: {
    backgroundColor: '#F9FAFB',
    padding: 10,
    borderRadius: 6,
    marginTop: 20,
  },
  howItWorksTitle: {
    fontWeight: 'bold',
    marginBottom: 4,
    fontFamily: "montserratMeduim",

  },
  howItWorksText: {
    color: 'gray',
    fontSize: 13,
    fontFamily: "montserratMeduim",

  },
});

export default ColorRou;
