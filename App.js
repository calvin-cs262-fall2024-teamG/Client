import { Image, StatusBar, Text, View, Button, FlatList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import styles from './styles'; //Import the styles from styles.js
import properties from './properties'; //Import the properties from properties.js

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
          {item.address}
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

      {item.banner_image && (
        <Image
          source={{ uri: item.banner_image }}
          style={styles.propertyImage}
        />
      )}

      <Text style={styles.propertiesTitle}>Property Details</Text>

      <Text style={styles.propertyItem}>ID: {item.id}</Text>
      <Text style={styles.propertyItem}>Rating: {item.rating}</Text>
      <Text style={styles.propertyItem}>Address: {item.address}</Text>
      <Text style={styles.propertyItem}>Beds: {item.beds}</Text>
      <Text style={styles.propertyItem}>Baths: {item.baths}</Text>
      <Text style={styles.propertyItem}>Estimated Cost: ${item.estimated_cost}</Text>
      <Text style={styles.propertyItem}>Distance from Campus: {item.distance_from_campus} miles</Text>
      <Text style={styles.propertyItem}>Pet Friendly: {item.pet_friendly ? 'Yes' : 'No'}</Text>

      <Text style={styles.propertiesTitle}>Contact Information</Text>
      {item.contact_phone && (
        <Text style={styles.propertyItem}>Phone: {item.contact_phone}</Text>
      )}
      {item.contact_email && (
        <Text style={styles.propertyItem}>Email: {item.contact_email}</Text>
      )}
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