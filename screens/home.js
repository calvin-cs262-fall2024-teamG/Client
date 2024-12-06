import React from 'react';
import PropTypes from 'prop-types';
import { ImageBackground, StatusBar, Text, View, TouchableOpacity } from 'react-native';
import styles from '../style/styles'; //Import the styles from styles.js
import cityMapImage from '../style/city-map-4320755_640.png'

export default function HomeScreen({ navigation }) {
    return (
        <ImageBackground
            source={cityMapImage}
            style={styles.backgroundImage}
            resizeMode="cover" // Ensure the image covers the entire screen
        >
            <View style={styles.homeContainer}>
            <StatusBar backgroundColor="#8C2131" barStyle="light-content" />
                <View style={styles.textBox}>
                    <Text style={styles.text1}>Welcome to</Text>
                    <Text style={styles.text2}>RentScout</Text>
                </View>
                <View style={{ padding: 10 }} />
                <TouchableOpacity
                    style={styles.button}
                    //onPress={() => navigation.navigate('MainTabs')}
                    onPress={() => navigation.navigate('LogIn')}
                >
                    <Text style={styles.filtersText}>Log In</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
}

HomeScreen.propTypes = {
    navigation: PropTypes.shape({
        navigate: PropTypes.func.isRequired,
    }).isRequired,
};