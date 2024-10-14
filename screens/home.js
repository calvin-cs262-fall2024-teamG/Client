import { ImageBackground, Image, StatusBar, Text, View, TouchableOpacity, Button, FlatList } from 'react-native';
import styles from '../style/styles'; //Import the styles from styles.js


export default function HomeScreen({ navigation }) {
    return (
        <ImageBackground
            source={require('../style/city-map-4320755_640.png')}
            style={styles.backgroundImage}
        >
            <View style={styles.homeContainer}>
                <StatusBar style="light" />
                <View style={styles.textBox}>
                    <Text style={styles.text1}>
                        Welcome to
                        {'\n'}
                        <Text style={styles.text2}>RentScout</Text>
                    </Text>
                </View>
                <View style={{ padding: 10 }} />
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('Properties')}
                >
                    <Text style={styles.buttonText}>Start Scouting</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
}