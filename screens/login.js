import { ImageBackground, Image, StatusBar, Text, View, TouchableOpacity, Button, FlatList, TextInput } from 'react-native';
import React, { useState } from 'react';
import styles from '../style/styles';
import { auth } from '../config/firebase'; // Update this path to where your firebase.js is located
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Alert } from 'react-native';

export default function LogInScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const signIn = async (email, password) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log('Signed in:', userCredential.user);
            navigation.navigate('Main', {
                screen: 'Properties',
                params: { screen: 'PropertiesList' }
              });
        } catch (error) {
            Alert.alert('Error', error.message);
        }
    };

    return (
        <View style={styles.Lcontainer}>
            <StatusBar backgroundColor="#8C2131" barStyle="light-content" />
            <Text style={styles.Ltitle}>Welcome Back</Text>

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
                <Text style={styles.LfooterText}>Don't have an account?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('CreateAccount')}>
                    <Text style={styles.Llink}> Sign Up</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
