import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigator from './navigation/TabNavigator';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import LogInScreen from './screens/login';
import CreateAccountScreen from './screens/createaccount';
import HelpScreen from './screens/help';

/**
 * Stack navigator instance for managing screen navigation
 * @type {Object}
 */
const Stack = createStackNavigator();

/**
 * Main Application Component
 * Manages the application's navigation structure and screen hierarchy
 * @component
 * @returns {JSX.Element} The root application component
 * @description
 * This is the root component of the application that sets up:
 * - Safe area handling for different devices
 * - Navigation container and stack navigation
 * - Screen hierarchy and navigation flow
 * - Status bar configuration
 * 
 * Navigation Flow:
 * - Auth (Login) -> Initial screen
 * - CreateAccount -> Account creation screen
 * - Main -> Tab navigator with main app functionality
 * - Help -> Help and documentation screen
 * 
 * @example
 * // Usage in index.js or similar entry point
 * import App from './App';
 * 
 * registerRootComponent(App);
 */
export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {/* 
           * Authentication Screen
           * @screen
           * @name Auth
           * @component LogInScreen
           * @description Initial login screen for user authentication
           */}
          <Stack.Screen name="Auth" component={LogInScreen} />

          {/* 
           * Create Account Screen
           * @screen
           * @name CreateAccount
           * @component CreateAccountScreen
           * @description Screen for new user registration
           */}
          <Stack.Screen name="CreateAccount" component={CreateAccountScreen} />

          {/* 
           * Main Application Screen
           * @screen
           * @name Main
           * @component TabNavigator
           * @description Main application interface with tab navigation
           */}
          <Stack.Screen name="Main" component={TabNavigator} />

          {/* 
           * Help Screen
           * @screen
           * @name Help
           * @component HelpScreen
           * @description Help and documentation screen
           */}
          <Stack.Screen name="Help" component={HelpScreen} />
        </Stack.Navigator>
        <StatusBar style="auto" />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

/**
 * Navigation Configuration Types
 * @typedef {Object} NavigationConfig
 * @property {Object} Auth - Login screen configuration
 * @property {Object} CreateAccount - Account creation screen configuration
 * @property {Object} Main - Main application screen configuration
 * @property {Object} Help - Help screen configuration
 */

/**
 * Screen Props Interface
 * @typedef {Object} ScreenProps
 * @property {Object} navigation - Navigation object for screen transitions
 * @property {Object} route - Route information and parameters
 */

/**
 * Navigation State Interface
 * @typedef {Object} NavigationState
 * @property {string} currentScreen - Currently active screen
 * @property {Object} params - Navigation parameters
 * @property {boolean} isAuthenticated - Authentication status
 */

/**
 * Application Features
 * @namespace AppFeatures
 * @property {Object} Authentication - User authentication handling
 * @property {Object} Navigation - Screen navigation management
 * @property {Object} SafeArea - Safe area handling for different devices
 * @property {Object} StatusBar - Status bar configuration
 */

/**
 * Screen Components
 * @namespace Screens
 * @property {Component} LogInScreen - User authentication screen
 * @property {Component} CreateAccountScreen - New user registration screen
 * @property {Component} TabNavigator - Main application navigation
 * @property {Component} HelpScreen - Help and documentation screen
 */

