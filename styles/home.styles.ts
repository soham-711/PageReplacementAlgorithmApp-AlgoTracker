// styles/home.styles.ts
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f2f4f8',
  },
  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#1a1a1a',
  },
  subheading: {
    fontSize: 16,
    color: '#555',
    marginBottom: 16,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 12,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  aboutText: {
    fontSize: 14,
    color: '#444',
    marginBottom: 10,
    lineHeight: 22,
  },
  downloadButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  docsHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 12,
  },
  docCard: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  docTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#222',
    marginBottom: 6,
  },
  docContent: {
    fontSize: 14,
    color: '#444',
    lineHeight: 20,
  },
});
