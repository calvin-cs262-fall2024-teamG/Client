import { Image, StatusBar, Text, View, Button, FlatList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import styles from './style/styles'; //Import the styles from styles.js
import properties from './properties'; //Import the properties from properties.js

import HomeScreen from './screens/home'; //Import the HomeScreen from screens/home.js
import PropertiesScreen from './screens/propertylist'; //Import the PropertiesScreen from screens/propertylist.js
import PropertyDetailsScreen from './screens/propertydetails'; //Import the PropertyDetailsScreen from screens/propertydetails.js
import LogInScreen from './screens/login'; //Import the LogInScreen from screens/login.js
import CreateAccountScreen from './screens/createaccount'; //Import the CreateAccountScreen from screens/createaccount.js

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="LogIn" component={LogInScreen} />
        <Stack.Screen name="CreateAccount" component={CreateAccountScreen} />
        <Stack.Screen name="Properties" component={PropertiesScreen} />
        <Stack.Screen name="PropertyDetails" component={PropertyDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;