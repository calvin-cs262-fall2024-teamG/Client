import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PropertyDetailsScreen from '../screens/propertydetails';
import PropertiesScreen from '../screens/propertylist';
import FavoritesScreen from '../screens/favorites';
import ProfileScreen from '../screens/profile';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

/**
 * Properties Stack Navigator
 * This navigator is responsible for the Properties screen and the Property Details screen.
 * It uses a stack navigator to allow for navigation between these screens.
 * The stack navigator is configured to not show the header and to detach inactive screens.
 * The Property Details screen is configured to be gesture-enabled.
 *
 * @returns {*}
 */
const PropertiesStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="PropertiesList"
      screenOptions={{ headerShown: false, detachInactiveScreens: false }}
    >
      <Stack.Screen
        name="PropertiesList"
        component={PropertiesScreen}
      />
      <Stack.Screen
        name="PropertyDetails"
        component={PropertyDetailsScreen}
        options={{
          gestureEnabled: true
        }}
      />
    </Stack.Navigator>
  );
}

/**
 * Favorites Stack Navigator
 * This navigator is responsible for the Favorites screen and the Property Details screen.
 * It uses a stack navigator to allow for navigation between these screens.
 * The stack navigator is configured to not show the header and to detach inactive screens.
 * The Property Details screen is configured to be gesture-enabled.
 *
 * @returns {*}
 */
const FavoritesStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="FavoritesList"
      screenOptions={{ headerShown: false, detachInactiveScreens: false }}
    >
      <Stack.Screen
        name="FavoritesList"
        component={FavoritesScreen}
      />
      <Stack.Screen
        name="PropertyDetails"
        component={PropertyDetailsScreen}
        options={{
          gestureEnabled: true
        }}
      />
    </Stack.Navigator>
  );
}

/**
 * Tab Navigator
 * This navigator is responsible for the bottom tab navigation.
 * It uses a bottom tab navigator to allow for navigation between the Properties, Favorites, and Profile screens.
 * The tab navigator is configured to show icons and labels for each tab.
 * The initial route is set to the Properties screen.
 *
 * @returns {*}
 */
const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Properties"
      screenOptions={({ route }) => ({
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#e0e0e0',
          height: 85, // Increased height
          paddingBottom: 30, // Increased bottom padding for iOS home indicator
          paddingTop: 8,
        },
        tabBarActiveTintColor: '#8C2131',
        tabBarInactiveTintColor: '#666',
        headerShown: false,
        tabBarLabelStyle: {
          fontSize: 12,
          paddingBottom: 5, // Add some space between icon and text
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Properties') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Favorites') {
            iconName = focused ? 'heart' : 'heart-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="Properties"
        component={PropertiesStackNavigator}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoritesStackNavigator}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
};


export default TabNavigator;