import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.text1}>
        Welcome to
        <Text style={styles.text2}> RentScout</Text>
      </Text>
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4E0101',
    alignItems: 'center',
    justifyContent: 'center',
  },

  text1: {
    color: '#ffffff',
    fontFamily: 'Verdana',
    fontSize: '20',
  },

  text2: {
    color: '#ffffff',
    fontFamily: 'Impact',
    fontSize: '35',
  },
});
