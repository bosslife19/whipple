import { StyleSheet } from "react-native";

const PRIMARY_COLOR = '#1A4ED8'; // Deep Blue

const Votes = StyleSheet.create({
  container: {
    padding: 24,
    flexGrow: 1,
    backgroundColor: '#F8FAFC',
    height: '100%',
  },
  header: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 8,
    color: '#0F172A',
  },
  subHeader: {
    fontSize: 18,
    color: '#334155',
    marginBottom: 6,
  },
  description: {
    fontSize: 14,
    color: '#475569',
    marginBottom: 20,
  },
  radioContainer: {
    marginTop: 12,
    gap: 14,
  },
  radioBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 16,
    elevation: 1,
  },
  radioBoxSelected: {
    borderColor: PRIMARY_COLOR,
    backgroundColor: '#EFF6FF',
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: PRIMARY_COLOR,
    marginRight: 12,
  },
  radioCircleSelected: {
    backgroundColor: PRIMARY_COLOR,
  },
  radioLabel: {
    fontSize: 16,
    color: '#1E293B',
    fontWeight: '500',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  button: {
    flex: 1,
    marginHorizontal: 6,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButton: {
    borderColor: PRIMARY_COLOR,
    borderWidth: 1,
    backgroundColor: '#fff',
  },
  submitButton: {
    backgroundColor: PRIMARY_COLOR,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Votes