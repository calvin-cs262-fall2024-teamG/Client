import { StatusBar } from 'react-native';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import styles from './styles'; //Import the styles from styles.js

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
    { id: '4', name: 'Property 4' },
    { id: '5', name: 'Property 5' },
    { id: '6', name: 'Property 6' },
    { id: '7', name: 'Property 7' },
    { id: '8', name: 'Property 8' },
  ];

  return (
    <View style={styles.propertiesContainer}>
      <StatusBar style="light" />
      <Text style={styles.propertiesTitle}>Properties</Text>
      <FlatList
        data={properties}
        renderItem={({ item }) => (
        <Text
          style={styles.propertyItem}
          onPress={() => navigation.navigate('PropertyDetails', {
            item: item,
          })}
        >
          {item.name}
        </Text>)
      }
        keyExtractor={item => item.id}
      />
    </View>
  );
}

function PropertyDetailsScreen({ route, navigation }) {
  const { item } = route.params;
  return (
    <View style={styles.propertiesContainer}>
      <StatusBar style="light" />
      <Text style={styles.propertiesTitle}>Property Details</Text>
      <Text style={styles.propertyItem}>ID: {item.id}</Text>
      <Text style={styles.propertyItem}>Name: {item.name}</Text>
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
        <Stack.Screen name="PropertyDetails" component={PropertyDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;