import { Image, StatusBar, Text, View, Button, FlatList, ScrollView } from 'react-native';
import styles from '../style/styles'; //Import the styles from styles.js
import properties from '../properties'; //Import the properties from properties.js
import StarRating from '../style/5stars'; //Import the StarRating from 5stars.js

export default function PropertyDetailsScreen({ route, navigation }) {
    const { item } = route.params;
    return (
      <ScrollView style={styles.propertiesContainer} contentContainerStyle={{ paddingBottom: 75 }}>
        <StatusBar style="light" />
  
        {item.banner_image && (
          <Image
            source={{ uri: item.banner_image }}
            style={styles.propertyImage}
          />
        )}
  
        <Text style={styles.propertiesTitle}>Property Details</Text>
  
        <Text style={styles.propertyItem}>ID: {item.id}</Text>
        <Text style={styles.propertyItem}>Rating: {item.rating}</Text>
        <View style={styles.propertyItem}>
            <StarRating rating={item.rating} />
        </View>
        <Text style={styles.propertyItem}>Address: {item.address}</Text>
        <Text style={styles.propertyItem}>Beds: {item.beds}</Text>
        <Text style={styles.propertyItem}>Baths: {item.baths}</Text>
        <Text style={styles.propertyItem}>Estimated Cost: ${item.estimated_cost}</Text>
        <Text style={styles.propertyItem}>Distance from Campus: {item.distance_from_campus} miles</Text>
        <Text style={styles.propertyItem}>Pet Friendly: {item.pet_friendly ? 'Yes' : 'No'}</Text>
  
        <Text style={styles.propertiesTitle}>Contact Information</Text>
        {item.contact_phone && (
          <Text style={styles.propertyItem}>Phone: {item.contact_phone}</Text>
        )}
        {item.contact_email && (
          <Text style={styles.propertyItem}>Email: {item.contact_email}</Text>
        )}
      </ScrollView>
    );
  }