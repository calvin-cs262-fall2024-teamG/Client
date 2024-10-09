import { Image, StatusBar, Text, View, Button, FlatList } from 'react-native';
import styles from '../styles'; //Import the styles from styles.js
import properties from '../properties'; //Import the properties from properties.js


export default function PropertiesScreen({ navigation }) {
  return (
    <View style={styles.propertiesContainer}>
      <StatusBar style="light" />
      <Text style={styles.propertiesTitle}>Properties</Text>
      <FlatList
        data={properties}
        renderItem={({ item }) => (
        <Text
          style={styles.propertyItem}
          onPress={() => navigation.navigate('PropertyDetails', {
            item: item,
          })}
        >
          {item.address}
        </Text>)
      }
        keyExtractor={item => item.id}
      />
    </View>
  );
}