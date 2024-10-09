import { Image, StatusBar, Text, View, Button, FlatList } from 'react-native';
import styles from '../styles'; //Import the styles from styles.js


export default function HomeScreen({ navigation }) {
    return (
        <View style={styles.homeContainer}>
        <StatusBar style="light" />
        <Text style={styles.text1}>
            Welcome to
            {'\n'}
            <Text style={styles.text2}>RentScout</Text>
        </Text>
        <View style={{ padding: 10 }} />
        <Button
            title="Start Scouting"
            onPress={() => navigation.navigate('Properties')}
        />
        </View>
    );
}
