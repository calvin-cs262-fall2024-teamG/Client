import { ImageBackground, Image, StatusBar, Text, View, TouchableOpacity, Button, FlatList, TextInput } from 'react-native';
import React, { useState } from 'react';
import styles from '../style/styles'; //Import the styles from styles.js


export default function CreateAccountScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <View style={styles.Lcontainer}>
        <StatusBar barStyle="light-content" />
        <Text style={styles.Ltitle}>Create an Account</Text>

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

        <TouchableOpacity style={styles.Lbutton} onPress={() => navigation.navigate('Properties')}>
        <Text style={styles.LbuttonText}>Create Account</Text>
        </TouchableOpacity>

        </View>
    );
}
