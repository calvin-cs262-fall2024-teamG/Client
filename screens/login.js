import React, { useState } from 'react';
import styles from '../style/styles';
import { auth } from '../config/firebase'; // Update this path to where your firebase.js is located
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Alert, ImageBackground } from 'react-native';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity, StatusBar, TextInput } from 'react-native';
import cityMapImage from '../style/city-map-4320755_640.png'
import { Ionicons } from '@expo/vector-icons';
import { createStudent, studentExists } from '../services/controllers';

/**
 * Login Screen Component that handles user authentication
 * @param {object} props - Component props
 * @param {object} props.navigation - Navigation object for screen transitions
 * @returns {JSX.Element} Rendered LogInScreen component
 */
export default function LogInScreen({ navigation }) {
    /**
     * State for user email
     * @type {[string, function]} email - Email state and setter
     */
    const [email, setEmail] = useState('');

    /**
     * State for user password
     * @type {[string, function]} password - Password state and setter
     */
    const [password, setPassword] = useState('');

    /**
     * State for loading indicator
     * @type {[boolean, function]} isLoading - Loading state and setter
     */
    const [isLoading, setIsLoading] = useState(false);

    /**
     * Handles user sign-in process
     * @async
     * @param {string} email - User's email address
     * @param {string} password - User's password
     * @returns {Promise<void>}
     * @throws {Error} When authentication fails
     */
    const signIn = async (email, password) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);

            if (!await studentExists(email)) await createStudent(email);

            console.log('Signed in:', userCredential.user);
            navigation.navigate('Main', {
                screen: 'Properties',
                params: {
                    screen: 'PropertiesList',
                }
              });
        } catch (error) {
            Alert.alert('Error', error.message);
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

                    <TouchableOpacity 
                        style={styles.Lbutton} 
                        onPress={async () => {
                            setIsLoading(true);
                            try {
                                await signIn(email, password);
                            } catch (error) {
                                Alert.alert('Error', error.message);
                            } finally {
                                setIsLoading(false);
                            }
                        }}
                        disabled={isLoading}>
                        <Text style={styles.LbuttonText}>Log In</Text>
                    </TouchableOpacity>

                    <View style={styles.helperTextContainer}>
                        <Text style={styles.helperText}>Please use your Calvin University email address</Text>
                    </View>

                    <View style={styles.Lfooter}>
                        <Text style={styles.LfooterText}>Don&apos;t have an account?</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('CreateAccount')}>
                            <Text style={styles.Llink}> Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ImageBackground>
    );
}

LogInScreen.propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
    }).isRequired,
  };
