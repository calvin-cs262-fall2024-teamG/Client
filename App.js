import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text } from 'react-native';

import HomeScreen from './screens/home'; //Import the HomeScreen from screens/home.js
import PropertiesScreen from './screens/propertylist'; //Import the PropertiesScreen from screens/propertylist.js
import PropertyDetailsScreen from './screens/propertydetails'; //Import the PropertyDetailsScreen from screens/propertydetails.js
import LogInScreen from './screens/login'; //Import the LogInScreen from screens/login.js
import CreateAccountScreen from './screens/createaccount'; //Import the CreateAccountScreen from screens/createaccount.js
import Header from './screens/header'; //Import the Header from screens/header.js

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="LogIn" component={LogInScreen_header} />
        <Stack.Screen name="CreateAccount" component={CreateAccountScreen_header} />
        <Stack.Screen name="Properties" component={PropertiesScreen_header} />
        <Stack.Screen name="PropertyDetails" component={PropertyDetailsScreen_header} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


const LogInScreen_header = (props) => (
  <>
    <Header title="Log In" />
    <LogInScreen {...props} />
  </>
);

const CreateAccountScreen_header = (props) => (
  <>
    <Header title="Create Account" />
    <CreateAccountScreen {...props} />
  </>
);

const PropertiesScreen_header = (props) => (
  <>
    <Header title="Properties" />
    <PropertiesScreen {...props} />
  </>
);

const PropertyDetailsScreen_header = (props) => (
  <>
    <Header title="Property Details" />
    <PropertyDetailsScreen {...props} />
  </>
);

// const ProfileScreen = () => (
//   <View>
//     <Text>Profile Content</Text>
//   </View>
// );

export default App;
