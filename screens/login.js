import { ImageBackground, Image, StatusBar, Text, View, TouchableOpacity, Button, FlatList, TextInput } from 'react-native';
import React, { useState } from 'react';
import styles from '../style/styles'; //Import the styles from styles.js


export default function LogInScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

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

      <TouchableOpacity style={styles.Lbutton} onPress={() => navigation.navigate('Properties')}>
        <Text style={styles.LbuttonText}>Log In</Text>
      </TouchableOpacity>

      <View style={styles.Lfooter}>
        <Text style={styles.LfooterText}>Don't have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('CreateAccount')}>
          <Text style={styles.Llink}> Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
    );
}