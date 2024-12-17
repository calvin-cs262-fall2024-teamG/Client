import React, { useState } from 'react';
import styles from '../style/styles';
import { auth } from '../config/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Alert, ImageBackground } from 'react-native';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity, StatusBar, TextInput } from 'react-native';
import cityMapImage from '../style/city-map-4320755_640.png'
import { Ionicons } from '@expo/vector-icons';
import { createStudent, studentExists } from '../services/controllers';


/**
 * Create Account Screen
 * This screen is responsible for creating a new user account.
 * It allows the user to enter an email and password, and then creates a new user account using Firebase Authentication.
 * If the account is created successfully, the user is navigated to the Main screen.
 * If the account creation fails, an error message is displayed.
 *
 * @export
 * @param {{ navigation: any; }} param0
 * @param {*} param0.navigation
 * @returns
 */
export default function CreateAccountScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  
  /**
   * sign Up Function
   * This function is responsible for creating a new user account using Firebase Authentication.
   * It first checks if the password and confirm password match.
   * If the passwords match, it attempts to create a new user account using the provided email and password.
   * If the account is created successfully, it navigates to the Main screen.
   * If the account creation fails, it displays an error message.
   * If the email is already in use, it displays a specific error message.
   * If the password is too weak, it displays a specific error message.
   * If the email is invalid, it displays a specific error message.
   *
   * @async
   * @param {*} email
   * @param {*} password
   * @returns {*}
   */
  const signUp = async (email, password) => {
    try {
      if (password !== confirmPassword) {
        Alert.alert('Error', 'Passwords do not match');
        return;
      }

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      if (!await studentExists(email)) await createStudent(email);
      
      console.log('User account created:', userCredential.user);
      navigation.navigate('Main', {
        screen: 'Properties',
        params: {screen: 'PropertiesList' }
        });
    } catch (error) {
      let errorMessage = error.message;
      /** Customize error messages for better user experience */
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'This email is already registered. Please use a different email or try logging in.';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'Password should be at least 6 characters long.';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Please enter a valid email address.';
      }
      Alert.alert('Error', errorMessage);
    }
  };

  return (
     <ImageBackground
            source={cityMapImage}
            style={styles.backgroundImage}
            resizeMode="cover"
        >
            <View style={styles.Lcontainer}>
                <StatusBar backgroundColor="#8C2131" barStyle="light-content" />

                      {/* Help Button */}
      <TouchableOpacity
        style={styles.helpButton}
        onPress={() => navigation.navigate('Help')}
      >
        <Ionicons name="help-circle-outline" size={24} color="#fff" />
      </TouchableOpacity>
                
                {/* New red box container */}
                <View style={styles.redBoxContainer}>
                    <View style={styles.textBox}>
                        <Text style={styles.text1}>Welcome to</Text>
                        <Text style={styles.text2}>RentScout</Text>
                    </View>
                    <View style={{ padding: 10 }} />

      <TextInput
        style={styles.Linput}
        placeholder="Email"
        placeholderTextColor="#aaaaaa"
        value={email}
        onChangeText={(text) => setEmail(text)}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.Linput}
        placeholder="Password"
        placeholderTextColor="#aaaaaa"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
        autoCapitalize="none"
      />

      <TextInput
        style={styles.Linput}
        placeholder="Confirm Password"
        placeholderTextColor="#aaaaaa"
        value={confirmPassword}
        onChangeText={(text) => setConfirmPassword(text)}
        secureTextEntry
        autoCapitalize="none"
      />

      <TouchableOpacity
        style={styles.Lbutton}
        onPress={async () => {
          setIsLoading(true);
          try {
            await signUp(email, password);
          } catch (error) {
            Alert.alert('Error', error.message);
          } finally {
            setIsLoading(false);
          }
        }}
        disabled={isLoading}>
        <Text style={styles.LbuttonText}>Create Account</Text>
      </TouchableOpacity>

      <View style={styles.helperTextContainer}>
        <Text style={styles.helperText}>Please use your Calvin University email address</Text>
      </View>

      <View style={styles.Lfooter}>
        <Text style={styles.LfooterText}>Already have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Auth', {
          screen: 'LogIn',
          params: { screen: 'LogInScreen' }
        })}>
          <Text style={styles.Llink}> Log In</Text>
        </TouchableOpacity>
      </View>
    </View>
    </View>
    </ImageBackground>
  );
}

CreateAccountScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
