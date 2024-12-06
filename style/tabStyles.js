import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    flex: 1,
    paddingBottom: 60, // Height of tab bar
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingBottom: 70, // Extra padding for scroll views
  }
});