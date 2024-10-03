import { StatusBar } from 'react-native';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

function HomeScreen({ navigation }) {
  return (
    <View style={styles.homeContainer}>
      <StatusBar style="light" />
      <Text style={styles.text1}>
        Welcome to
        {'\n'}
        <Text style={styles.text2}>RentScout</Text>
      </Text>
      <View style={{ padding: 10 }} />
      <Button
        title="Start Scouting"
        onPress={() => navigation.navigate('Properties')}
      />
    </View>
  );
}

function PropertiesScreen({ navigation }) {
  const properties = [
    { id: '1', name: 'Property 1' },
    { id: '2', name: 'Property 2' },
    { id: '3', name: 'Property 3' },
  ];

  return (
    <View style={styles.propertiesContainer}>
      <StatusBar style="light" />
      <Text style={styles.propertiesTitle}>Properties</Text>
      <FlatList
        data={properties}
        renderItem={({ item }) => <Text style={styles.propertyItem}>{item.name}</Text>}
        keyExtractor={item => item.id}
      />
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Properties" component={PropertiesScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

const styles = StyleSheet.create({
  statusBar: {
    backgroundColor: '#4E0101',
    barStyle: 'light-content',
  },
  
  homeContainer: {
    flex: 1,
    backgroundColor: '#4E0101',
    alignItems: 'center',
    justifyContent: 'center',
  },

  text1: {
    color: '#ffffff',
    fontFamily: 'Verdana',
    fontSize: 20,
    textAlign: 'center',
  },

  text2: {
    color: '#ffffff',
    fontFamily: 'Impact',
    fontSize: 35,
  },

  propertiesContainer: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
    paddingHorizontal: 20,
  },

  propertiesTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  propertyItem: {
    fontSize: 18,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});
