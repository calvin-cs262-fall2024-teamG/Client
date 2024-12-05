import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { Image, StatusBar, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import styles from '../style/styles'; //Import the styles from styles.js
import StarRating from '../style/5stars'; //Import the StarRating from 5stars.js
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function PropertyDetailsScreen({ route, navigation }) {
  const { item } = route.params;
  const [isFavorite, setIsFavorite] = useState(false);
  const isFocused = useIsFocused();

  // Check favorite status when screen is focused or when favorites are updated
  useEffect(() => {
    checkIfFavorite();
  }, [isFocused, route.params?.favoritesUpdated]);

  const checkIfFavorite = async () => {
    try {
      const savedFavorites = await AsyncStorage.getItem('favorites');
      if (savedFavorites) {
        const favorites = JSON.parse(savedFavorites);
        setIsFavorite(favorites.some(fav => fav.id === item.id));
      } else {
        setIsFavorite(false);
      }
    } catch (error) {
      console.error('Error checking favorites:', error);
      setIsFavorite(false);
    }
  };

  const toggleFavorite = async () => {
    try {
      const savedFavorites = await AsyncStorage.getItem('favorites');
      let favorites = savedFavorites ? JSON.parse(savedFavorites) : [];
      if (isFavorite) {
        // Remove from favorites
        
      } else {
        // Add to favorites if not already present
        if (!favorites.some(fav => fav.id === item.id)) {
          favorites.push(item);
        }
      }

      await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
      setIsFavorite(!isFavorite);

      // Notify FavoritesScreen of the change
      if (navigation.getParent()) {
        navigation.getParent().setParams({ favoritesUpdated: Date.now() });
      }
    } catch (error) {
      console.error('Error updating favorites:', error);
    }
  };

    return (
      <ScrollView style={styles.propertiesContainer} contentContainerStyle={{ paddingBottom: 75 }}>
        <StatusBar backgroundColor="#8C2131" barStyle="light-content" />
  
        {item.banner_image && (
          <Image
            source={{ uri: item.banner_image }}
            style={styles.propertyImage}
            imageAlign="center"
          />
        )}
  
      <View style={styles.propertyDetailsTitleContainer}>
        <Text style={styles.propertiesDetailsText}>Property Details</Text>
        <TouchableOpacity
          style={styles.editFavoritesButton}
          onPress={toggleFavorite}
        >
          <Text style={styles.editFavoritesButtonText}>
            {isFavorite ? 'Remove' : 'Add to Favorites'}
          </Text>
        </TouchableOpacity>
      </View>
  
        {/* <Text style={styles.propertyItem}>ID: {item.id}</Text> */}
        <Text style={styles.propertyItem}>Rating: {item.rating}</Text>
        <View style={styles.propertyItem}>
            <StarRating rating={item.rating} />
        </View>
        <Text style={styles.propertyItem}>Address: {item.address}</Text>
        <Text style={styles.propertyItem}>Beds: {item.beds}</Text>
        <Text style={styles.propertyItem}>Baths: {item.baths}</Text>
        <Text style={styles.propertyItem}>Estimated Cost: ${item.estimated_cost}</Text>
        <Text style={styles.propertyItem}>Distance from Campus: {item.distance_from_campus} miles</Text>
        <Text style={styles.propertyItem}>Distance from Bus Stop: {item.distance_from_bus_stop} miles</Text>
        <Text style={styles.propertyItem}>Pet Friendly: {item.pet_friendly ? 'Yes' : 'No'}</Text>
  
        <Text style={styles.contactInfoText}>Contact Information</Text>
        <Text style={styles.propertyItem}>Landlord Name: {item.landlord_name}</Text>
        {item.contact_phone && (
          <Text style={styles.propertyItem}>Phone: {item.contact_phone}</Text>
        )}
        {item.contact_email && (
          <Text style={styles.propertyItem}>Email: {item.contact_email}</Text>
        )}
        
      </ScrollView>
    );
  }

  PropertyDetailsScreen.propTypes = {
    route: PropTypes.shape({
      params: PropTypes.shape({
        item: PropTypes.shape({
          id: PropTypes.string.isRequired,
          banner_image: PropTypes.string,
          rating: PropTypes.number,
          address: PropTypes.string,
          beds: PropTypes.number,
          baths: PropTypes.number,
          estimated_cost: PropTypes.number,
          distance_from_campus: PropTypes.number,
          distance_from_bus_stop: PropTypes.number,
          pet_friendly: PropTypes.bool,
          landlord_name: PropTypes.string,
          contact_phone: PropTypes.string,
          contact_email: PropTypes.string,
        }).isRequired,
        favoritesUpdated: PropTypes.bool,
      }).isRequired,
    }).isRequired,
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
      getParent: PropTypes.func.isRequired,
    }).isRequired,
  };
