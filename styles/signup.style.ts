// signup.style.ts
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#f9f9f9',
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    height: 48,
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    color:"grey"
  },
  button: {
    marginTop: 8,
    backgroundColor: '#4f46e5', // indigo-600
    borderRadius: 8,
    overflow: 'hidden',
  },
   text: {
    fontSize: 14,
    color: '#444',
  },
  buttonText: {
    color: '#fff',
    paddingVertical: 14,
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  linkText: {
    color: '#4f46e5',
    fontWeight: '600',
    marginLeft: 4,
  },
  googleButton: {
    backgroundColor: '#fff',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    paddingVertical: 14,
    marginTop: 12,
  },
  googleButtonText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
  },
});



